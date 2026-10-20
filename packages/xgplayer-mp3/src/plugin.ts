import { BasePlugin, Errors, Events } from 'xgplayer'
import { EVENT, StreamingError } from 'xgplayer-streaming-shared'
import { MP3 } from './mp3'
import type { MP3Options } from './types'

type Player = BasePlugin['player']

export class MP3Plugin extends BasePlugin {
  static MP3 = MP3
  static isStreamingPlugin = true

  static get pluginName(): string {
    return 'mp3'
  }

  mp3: MP3 | null = null

  private degraded = false
  private nativeSwitchURL: Player['switchURL'] | null = null
  private nativePlayNext: Player['playNext'] | null = null
  private nativeChangeDefinition: Player['changeDefinition'] | null = null
  private nativeHandleSource: boolean | null = null
  private sourceChangeId = 0
  private eventsBound = false

  get core(): MP3 | null {
    return this.mp3
  }

  get version(): string {
    return MP3.version
  }

  async beforePlayerInit(): Promise<void> {
    const player = this.player
    const url = this.getStringUrl(player.config.url)
    const media = player.media as HTMLMediaElement | null

    if (this.mp3) {
      const previous = this.mp3
      this.mp3 = null
      await previous.destroy()
    }

    if (!url || !media || !MP3.isSupported(this.mp3Config.preferMMS === true)) {
      this.restoreNativeApi()
      this.restoreSourceHandling()
      return
    }

    this.degraded = false
    this.sourceChangeId++
    this.captureAndProxyNativeApi(player)

    const core = new MP3({
      media,
      url,
      ...this.mp3Config
    })
    this.mp3 = core

    BasePlugin.defineGetterOrSetter(player, {
      __url: {
        get: () => media.src || this.getStringUrl(player.config.url),
        configurable: true
      }
    })

    if (!this.eventsBound) {
      this.on(Events.URL_CHANGE, this.onSwitchURL)
      this.on(Events.DESTROY, this.destroy)
      this.eventsBound = true
    }
    this.transError(core)
    void core.load(url).catch((error) => this.onFatalError(error))
  }

  destroy = (): void => {
    this.sourceChangeId++
    this.restoreNativeApi()
    const core = this.mp3
    this.mp3 = null
    const destroyPromise = core?.destroy()
    this.restoreSourceHandling()
    if (destroyPromise) void destroyPromise.catch(() => undefined)
  }

  static isSupported(preferMMS = false): boolean {
    return MP3.isSupported(preferMMS)
  }

  private onSwitchURL: Player['switchURL'] = (url) => {
    const nextUrl = this.getStringUrl(url)
    if (!this.mp3 || !nextUrl) {
      return this.nativeSwitchURL?.call(this.player, url) || null
    }
    this.player.config.url = nextUrl
    const core = this.mp3
    const loadPromise = this.reloadAtCurrentTime(core, nextUrl)
    void loadPromise.catch((error) => this.onFatalError(error))
    return loadPromise
  }

  private onPlayNext: Player['playNext'] = (config = {}) => {
    const player = this.player
    const nextUrl = this.getStringUrl(config.url || player.config.url)
    if (!this.mp3 || !nextUrl) {
      return this.nativePlayNext?.call(player, config)
    }

    player.resetState()
    player.setConfig(config)
    this.sourceChangeId++
    const loadPromise = this.mp3.load(nextUrl)
    void loadPromise.catch((error) => this.onFatalError(error))
    void Promise.resolve(player.play()).catch(() => undefined)
    player.emit(Events.PLAYNEXT, config)
    return loadPromise
  }

  private onChangeDefinition: Player['changeDefinition'] = (definition, from) => {
    const player = this.player
    const url = this.getStringUrl(definition.url)
    if (!this.mp3 || !url) {
      return this.nativeChangeDefinition?.call(player, definition, from)
    }

    const definitionConfig = player.config.definition
    if (Array.isArray(definitionConfig?.list)) {
      definitionConfig.list.forEach((item) => {
        if (definition.definition === item.definition) player.curDefinition = item
      })
    }
    if (typeof definition.bitrate === 'string') {
      definition.bitrate = Number.parseInt(definition.bitrate, 10) || 0
    }

    player.emit(Events.DEFINITION_CHANGE, { from, to: definition })
    player.config.url = url
    const core = this.mp3
    const loadPromise = this.reloadAtCurrentTime(core, url)
    void loadPromise
      .then((restored) => {
        if (restored) {
          player.emit(Events.AFTER_DEFINITION_CHANGE, { from, to: definition })
        }
      })
      .catch((error) => this.onFatalError(error))
    return loadPromise
  }

  private captureAndProxyNativeApi(player: Player): void {
    this.nativeSwitchURL ||= player.switchURL
    this.nativePlayNext ||= player.playNext
    this.nativeChangeDefinition ||= player.changeDefinition
    this.nativeHandleSource ??= player.handleSource
    player.handleSource = false
    player.switchURL = this.onSwitchURL
    player.playNext = this.onPlayNext
    player.changeDefinition = this.onChangeDefinition
  }

  private restoreNativeApi(): void {
    const player = this.player
    if (this.nativeSwitchURL && player.switchURL === this.onSwitchURL) {
      player.switchURL = this.nativeSwitchURL
    }
    if (this.nativePlayNext && player.playNext === this.onPlayNext) {
      player.playNext = this.nativePlayNext
    }
    if (
      this.nativeChangeDefinition &&
      player.changeDefinition === this.onChangeDefinition
    ) {
      player.changeDefinition = this.nativeChangeDefinition
    }
    this.nativeSwitchURL = null
    this.nativePlayNext = null
    this.nativeChangeDefinition = null
  }

  private restoreSourceHandling(player: Player = this.player): void {
    if (this.nativeHandleSource == null) return
    player.handleSource = this.nativeHandleSource
    this.nativeHandleSource = null
  }

  private async reloadAtCurrentTime(core: MP3, url: string): Promise<boolean> {
    const player = this.player
    const currentTime =
      !player.ended && Number.isFinite(player.currentTime) ? player.currentTime : 0
    const paused = player.paused
    const sourceChangeId = ++this.sourceChangeId

    const restoredTime = await core.load(url, currentTime)
    if (this.mp3 !== core || sourceChangeId !== this.sourceChangeId) return false

    if (player.currentTime !== restoredTime) player.currentTime = restoredTime
    if (paused) player.pause()
    else await Promise.resolve(player.play()).catch(() => undefined)
    return true
  }

  private transError(core: MP3): void {
    core.on(EVENT.ERROR, (error) => {
      if (this.mp3 === core) void this.onFatalError(error)
    })
  }

  private onFatalError = async (reason: unknown): Promise<void> => {
    const player = this.player
    if (this.degraded) return

    const error = this.createPlayerError(reason)
    const vtype = this.mp3?._inited ? 'MP3_2' : 'MP3_1'
    player.vtype = vtype
    player.emit('playCatch', vtype, error)
    this.degraded = true

    if (this.mp3Config.closeDowngrade) {
      player.emit(Events.ERROR, error)
      return
    }

    const url = this.getStringUrl(player.config.url)
    const currentTime = player.currentTime
    const paused = player.paused
    const core = this.mp3
    this.sourceChangeId++
    this.mp3 = null
    this.restoreNativeApi()

    if (core) await core.destroy()
    this.restoreSourceHandling(player)

    const media = player.media as HTMLMediaElement | null
    if (!media || !url) return
    const onLoadedMetadata = (): void => {
      media.removeEventListener('loadedmetadata', onLoadedMetadata)
      if (currentTime) media.currentTime = currentTime
      if (paused) player.pause()
      else void Promise.resolve(player.play()).catch(() => undefined)
    }
    media.addEventListener('loadedmetadata', onLoadedMetadata)
    media.src = url
  }

  private get mp3Config(): MP3Options {
    return this.config
  }

  private createPlayerError(reason: unknown): unknown {
    const error =
      reason instanceof StreamingError
        ? reason
        : StreamingError.create(
            reason instanceof Error ? reason : new Error(String(reason)),
            undefined,
            undefined,
            undefined,
            undefined
          )
    return new Errors(this.player, {
      errorType: error.errorType || 'other',
      errorCode: error.errorCode || 0,
      errorMessage: error.errorMessage || error.message || 'MP3 playback error',
      originError: error.originError || error,
      ext: error.ext || {}
    })
  }

  private getStringUrl(url: unknown): string {
    if (typeof url === 'string') return url
    if (url && typeof url === 'object' && 'url' in url && typeof url.url === 'string') {
      return url.url
    }
    return ''
  }
}
