import { BasePlugin, Errors, Events } from 'xgplayer'
import { EVENT, MSE, StreamingError } from 'xgplayer-streaming-shared'
import { MP4 } from './mp4'
import type { MP4MediaElement, MP4Options } from './types'

type Player = BasePlugin['player']

export class MP4Plugin extends BasePlugin {
  static MP4 = MP4
  static isStreamingPlugin = true

  static get pluginName() {
    return 'mp4'
  }

  mp4: MP4 | null = null

  private _degraded = false
  private _nativeSwitchURL: Player['switchURL'] | null = null
  private _nativePlayNext: Player['playNext'] | null = null
  private _nativeChangeDefinition: Player['changeDefinition'] | null = null
  private _nativeHandleSource: boolean | null = null
  private _sourceChangeId = 0
  private _eventsBound = false

  get core(): MP4 | null {
    return this.mp4
  }

  get version(): string {
    return MP4.version
  }

  get softDecode(): boolean {
    const mediaType = this.player?.config?.mediaType
    return !!mediaType && mediaType !== 'video' && mediaType !== 'offscreen-video'
  }

  async beforePlayerInit() {
    const player = this.player
    const mp4Config = this.mp4Config
    const url = this.getStringUrl(player.config.url)
    const media = this.getMedia(player)

    if (this.mp4) {
      const previous = this.mp4
      this.mp4 = null
      await previous.destroy()
    }

    // 非字符串 URL 不属于 MP4 range-loader 的输入范围；硬解环境无法创建
    // MediaSource（含 MMS-only 且未开启 preferMMS）时交回原生 video。
    if (
      !url ||
      !media ||
      (!this.softDecode && !MSE.isSupported(undefined, mp4Config.preferMMS === true))
    ) {
      this._restoreNativeApi()
      this._restoreSourceHandling()
      return
    }

    this._degraded = false
    this._sourceChangeId++
    this._captureAndProxyNativeApi(player)

    const core = new MP4({
      softDecode: this.softDecode,
      media,
      url,
      ...mp4Config
    })
    this.mp4 = core

    if (this.softDecode) {
      Object.assign(player, { forceDegradeToVideo: () => undefined })
      media.addEventListener('lowdecode', this._onLowDecode)
    } else {
      BasePlugin.defineGetterOrSetter(player, {
        __url: {
          get: () => media.src || this.getStringUrl(player.config.url),
          configurable: true
        }
      })
    }

    if (!this._eventsBound) {
      this.on(Events.URL_CHANGE, this._onSwitchURL)
      this.on(Events.DESTROY, this.destroy)
      this._eventsBound = true
    }
    this._transError(core)
    // 首次加载不阻塞 Player beforeInit；错误由 core EVENT.ERROR 和此 catch 统一降级。
    void core.load(url).catch((error) => this._onFatalError(error))
  }

  destroy = () => {
    const player = this.player
    this._sourceChangeId++
    this._restoreNativeApi()
    const core = this.mp4
    this.mp4 = null
    this.getMedia(player)?.removeEventListener('lowdecode', this._onLowDecode)
    const destroyPromise = core?.destroy()
    this._restoreSourceHandling(player)
    if (destroyPromise) void destroyPromise.catch(() => undefined)
  }

  static isSupported(softDecode?: boolean) {
    return MP4.isSupported(softDecode)
  }

  private _onLowDecode = () => {
    const player = this.player
    const media = this.getMedia(player)
    if (!media) return

    player.emit('lowdecode', media.degradeInfo)
    player.emit('core_event', {
      ...media.degradeInfo,
      eventName: EVENT.LOWDECODE
    })
  }

  private _onSwitchURL: Player['switchURL'] = (url) => {
    const player = this.player
    const nextUrl = this.getStringUrl(url)
    if (!this.mp4 || !nextUrl) {
      return this._nativeSwitchURL?.call(this.player, url) || null
    }
    player.config.url = nextUrl
    const core = this.mp4
    const loadPromise = this._reloadAtCurrentTime(core, nextUrl)
    void loadPromise.catch((error) => this._onFatalError(error))
    return loadPromise
  }

  private _onPlayNext: Player['playNext'] = (config = {}) => {
    const player = this.player
    const nextUrl = this.getStringUrl(config.url || player.config.url)
    if (!this.mp4 || !nextUrl) {
      return this._nativePlayNext?.call(this.player, config)
    }

    player.resetState()
    player.setConfig(config)
    this._sourceChangeId++
    const loadPromise = this.mp4.load(nextUrl)
    void loadPromise.catch((error) => this._onFatalError(error))
    void Promise.resolve(player.play()).catch(() => undefined)
    player.emit(Events.PLAYNEXT, config)
    return loadPromise
  }

  private _onChangeDefinition: Player['changeDefinition'] = (definition, from) => {
    const player = this.player
    const url = this.getStringUrl(definition.url)
    if (!this.mp4 || !url) {
      return this._nativeChangeDefinition?.call(this.player, definition, from)
    }

    const definitionConfig = player.config.definition
    if (Array.isArray(definitionConfig?.list)) {
      definitionConfig.list.forEach((item) => {
        if (definition.definition === item.definition) player.curDefinition = item
      })
    }
    if (typeof definition.bitrate === 'string') {
      definition.bitrate = parseInt(definition.bitrate, 10) || 0
    }

    player.emit(Events.DEFINITION_CHANGE, { from, to: definition })
    player.config.url = url
    const core = this.mp4
    const loadPromise = this._reloadAtCurrentTime(core, url)
    void loadPromise
      .then((restored) => {
        if (restored) {
          player.emit(Events.AFTER_DEFINITION_CHANGE, { from, to: definition })
        }
      })
      .catch((error) => this._onFatalError(error))
    return loadPromise
  }

  private _captureAndProxyNativeApi(player: Player) {
    // beforePlayerInit 可能重入，只保存最初的原生实现，不能把代理自身当成原生方法。
    this._nativeSwitchURL ||= player.switchURL
    this._nativePlayNext ||= player.playNext
    this._nativeChangeDefinition ||= player.changeDefinition
    this._nativeHandleSource ??= player.handleSource
    player.handleSource = false
    player.switchURL = this._onSwitchURL
    player.playNext = this._onPlayNext
    player.changeDefinition = this._onChangeDefinition
  }

  private _restoreNativeApi() {
    const player = this.player
    if (this._nativeSwitchURL && player.switchURL === this._onSwitchURL) {
      player.switchURL = this._nativeSwitchURL
    }
    if (this._nativePlayNext && player.playNext === this._onPlayNext) {
      player.playNext = this._nativePlayNext
    }
    if (
      this._nativeChangeDefinition &&
      player.changeDefinition === this._onChangeDefinition
    ) {
      player.changeDefinition = this._nativeChangeDefinition
    }
    this._nativeSwitchURL = null
    this._nativePlayNext = null
    this._nativeChangeDefinition = null
  }

  private _restoreSourceHandling(player: Player = this.player) {
    if (this._nativeHandleSource == null) return
    player.handleSource = this._nativeHandleSource
    this._nativeHandleSource = null
  }

  private async _reloadAtCurrentTime(core: MP4, url: string): Promise<boolean> {
    const player = this.player
    const currentTime =
      !player.ended && Number.isFinite(player.currentTime) ? player.currentTime : 0
    const paused = player.paused
    const sourceChangeId = ++this._sourceChangeId

    const restoredTime = await core.load(url, currentTime)
    if (this.mp4 !== core || sourceChangeId !== this._sourceChangeId) return false

    if (player.currentTime !== restoredTime) player.currentTime = restoredTime
    if (paused) {
      player.pause()
    } else {
      await Promise.resolve(player.play()).catch(() => undefined)
    }
    return true
  }

  private _transError(core: MP4) {
    core.on(EVENT.ERROR, (error) => {
      if (this.mp4 === core) void this._onFatalError(error)
    })
  }

  private _onFatalError = async (reason: unknown) => {
    const player = this.player
    if (this._degraded) return

    const error = this.createPlayerError(reason)
    const vtype = this.mp4?._inited ? 'MP4_2' : 'MP4_1'
    player.vtype = vtype
    player.emit('playCatch', vtype, error)
    this._degraded = true

    if (this.mp4Config.closeDowngrade) {
      player.emit(Events.ERROR, error)
      return
    }

    const url = this.getStringUrl(player.config.url)
    const currentTime = player.currentTime
    const paused = player.paused
    const core = this.mp4
    this._sourceChangeId++
    this.mp4 = null
    this._restoreNativeApi()

    // 先彻底卸载 MSE，再写入原生 URL。反向执行会被异步 unbind 清掉新 URL。
    if (core) await core.destroy()
    this._restoreSourceHandling(player)

    const media = this.getMedia(player)
    if (!media || !url) return
    const onLoadedMetadata = () => {
      media.removeEventListener('loadedmetadata', onLoadedMetadata)
      if (currentTime) media.currentTime = currentTime
      if (paused) player.pause()
      else void Promise.resolve(player.play()).catch(() => undefined)
    }
    media.addEventListener('loadedmetadata', onLoadedMetadata)
    media.src = url
  }

  private getMedia(player: Player): MP4MediaElement | null {
    return player.media as MP4MediaElement | null
  }

  private get mp4Config(): MP4Options {
    return this.config
  }

  private createPlayerError(reason: unknown) {
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
      errorMessage: error.errorMessage || error.message || 'MP4 playback error',
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
