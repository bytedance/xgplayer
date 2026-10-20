import { BasePlugin, Errors, Events } from 'xgplayer'
import { EVENT, Logger, StreamingError } from 'xgplayer-streaming-shared'
import { getLogSource } from './log'
import { MP3 } from './mp3'
import type { MP3Options } from './types'

type Player = BasePlugin['player']

const logger = new Logger('MP3Plugin', undefined)

export class MP3Plugin extends BasePlugin {
  static readonly isStreamingPlugin = true

  static get pluginName(): string {
    return 'mp3'
  }

  private mp3: MP3 | null = null
  private degraded = false
  private nativeSwitchURL: Player['switchURL'] | null = null
  private nativePlayNext: Player['playNext'] | null = null
  private nativeChangeDefinition: Player['changeDefinition'] | null = null
  private nativeHandleSource: boolean | null = null
  private sourceChangeId = 0
  private eventsBound = false

  get version(): string {
    return MP3.version
  }

  beforePlayerInit(): void {
    const player = this.player
    const url = this.getStringUrl(player.config.url)
    const media = player.media as HTMLMediaElement | null
    const supported = MP3.isSupported(this.mp3Config.preferMMS === true)
    if (this.mp3Config.openLog) MP3.enableLogger()

    logger.log('beforePlayerInit', {
      ...getLogSource(url, this.mp3Config.vid),
      hasMedia: !!media,
      supported,
      closeDowngrade: this.mp3Config.closeDowngrade
    })

    if (this.mp3) {
      const previous = this.mp3
      this.mp3 = null
      logger.log('destroy previous core before reinit')
      previous.destroy()
    }

    if (!url || !media || !supported) {
      logger.warn('skip MP3 takeover', {
        hasUrl: !!url,
        hasMedia: !!media,
        supported
      })
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
    logger.log('core created', getLogSource(url, this.mp3Config.vid))

    BasePlugin.defineGetterOrSetter(player, {
      __url: {
        get: () => media.src || this.getStringUrl(player.config.url),
        configurable: true
      }
    })

    this.bindEvents()
    this.bindCoreError(core)
    void core
      .load(url)
      .then((restoredTime) => {
        if (this.mp3 === core) {
          logger.log('initial load done', {
            ...getLogSource(url, this.mp3Config.vid),
            restoredTime
          })
        }
      })
      .catch((error) => this.handleFatalError(error))
  }

  destroy(): void {
    logger.log('destroy')
    this.degraded = true
    this.sourceChangeId++
    this.restoreNativeApi()
    const core = this.mp3
    this.mp3 = null
    core?.destroy()
    this.restoreSourceHandling()
  }

  static isSupported(preferMMS = false): boolean {
    return MP3.isSupported(preferMMS)
  }

  static enableLogger(): void {
    MP3.enableLogger()
  }

  static disableLogger(): void {
    MP3.disableLogger()
  }

  private get mp3Config(): MP3Options {
    return this.config
  }

  private bindEvents(): void {
    if (this.eventsBound) return
    this.on(Events.URL_CHANGE, this.onSwitchURL)
    this.on(Events.DESTROY, () => this.destroy())
    this.eventsBound = true
  }

  private bindCoreError(core: MP3): void {
    core.on(EVENT.ERROR, (error) => {
      if (this.mp3 === core) this.handleFatalError(error)
    })
  }

  private onSwitchURL: Player['switchURL'] = (url) => {
    const nextUrl = this.getStringUrl(url)
    if (!this.mp3 || !nextUrl) {
      logger.debug('switchURL passthrough', getLogSource(nextUrl, this.mp3Config.vid))
      return this.nativeSwitchURL?.call(this.player, url) || null
    }
    logger.log('switchURL', getLogSource(nextUrl, this.mp3Config.vid))
    this.player.config.url = nextUrl
    const core = this.mp3
    const loadPromise = this.reloadAtCurrentTime(core, nextUrl)
    void loadPromise.catch((error) => this.handleFatalError(error))
    return loadPromise
  }

  private onPlayNext: Player['playNext'] = (config = {}) => {
    const player = this.player
    const nextUrl = this.getStringUrl(config.url || player.config.url)
    if (!this.mp3 || !nextUrl) {
      logger.debug('playNext passthrough', getLogSource(nextUrl, this.mp3Config.vid))
      return this.nativePlayNext?.call(player, config)
    }

    logger.log('playNext', getLogSource(nextUrl, this.mp3Config.vid))
    this.sourceChangeId++
    return this.nativePlayNext?.call(player, config)
  }

  private onChangeDefinition: Player['changeDefinition'] = (definition, from) => {
    const player = this.player
    const url = this.getStringUrl(definition.url)
    if (!this.mp3 || !url) {
      logger.debug('changeDefinition passthrough', getLogSource(url, this.mp3Config.vid))
      return this.nativeChangeDefinition?.call(player, definition, from)
    }

    logger.log('changeDefinition', {
      ...getLogSource(url, this.mp3Config.vid),
      from,
      definition: definition.definition
    })
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
      .catch((error) => this.handleFatalError(error))
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

  private restoreNativeApi(player: Player = this.player): void {
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

  private handleFatalError(reason: unknown): void {
    const player = this.player
    if (this.degraded) return

    const error = this.createPlayerError(reason)
    const vtype = this.mp3?.isInitialized ? 'MP3_2' : 'MP3_1'
    logger.error('fatal error', {
      vtype,
      closeDowngrade: this.mp3Config.closeDowngrade,
      error
    })
    player.vtype = vtype
    player.emit('playCatch', vtype, error)
    this.degraded = true

    if (this.mp3Config.closeDowngrade) {
      logger.warn('emit terminal error without native downgrade', { vtype })
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

    logger.warn('downgrade to native audio', {
      ...getLogSource(url, this.mp3Config.vid),
      currentTime,
      paused
    })
    core?.destroy()
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
