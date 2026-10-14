import { BasePlugin, Errors, Events } from 'xgplayer'
import { EVENT, MSE } from 'xgplayer-streaming-shared'
import { MP4 } from './mp4'

export class MP4Plugin extends BasePlugin {
  static MP4 = MP4

  static isStreamingPlugin = true

  static get pluginName() {
    return 'mp4'
  }

  mp4 = null

  // 已降级到原生 video 的标记，避免重复降级 / 多次 emit
  _degraded = false

  // 被代理前的原生 player API，destroy / 降级时还原
  _nativeSwitchURL = null
  _nativePlayNext = null
  _nativeChangeDefinition = null

  get core() {
    return this.mp4
  }

  get version() {
    return MP4.version
  }

  get softDecode() {
    const mediaType = this.player?.config?.mediaType
    return !!mediaType && mediaType !== 'video' && mediaType !== 'offscreen-video'
  }

  beforePlayerInit() {
    const config = this.player.config
    const mp4Config = config.mp4 || {}

    // issue #1872: 浏览器仅支持 ManagedMediaSource（iOS 17.1+）且未开启 preferMMS 时，
    // MSE 建不出 SourceBuffer 会导致黑屏不播放。此时放手不接管，交给播放器用原生 video 播放 mp4。
    if (!config.url || (!this.softDecode && !mp4Config.preferMMS && MSE.isMMSOnly())) {
      return
    }

    if (this.mp4) this.mp4.destroy()
    this._degraded = false

    // 兼容旧版 xgplayer-mp4：代理 switchURL / playNext / changeDefinition，
    // 使其路由到瘦核心的 load()。playNext 必须代理——原生 playNext 走 resetState()
    // 不会降低 _state，RUNNING 态下 start() 直接 early-return，beforePlayerInit 不会
    // 重跑，核心也就不会重新加载新 url。
    this._nativeSwitchURL = this.player.switchURL
    this._nativePlayNext = this.player.playNext
    this._nativeChangeDefinition = this.player.changeDefinition
    this.player.switchURL = this._onSwitchURL
    this.player.playNext = this._onPlayNext
    this.player.changeDefinition = this._onChangeDefinition

    this.mp4 = new MP4({
      softDecode: this.softDecode,
      media: this.player.video,
      url: config.url,
      ...mp4Config
    })

    if (this.softDecode) {
      this.player.forceDegradeToVideo = () => {}
      this.player.video.addEventListener('lowdecode', this._onLowDecode)
    } else {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => this.player?.video?.src || this.player?.config?.url,
          configurable: true
        }
      })
    }

    this.on(Events.URL_CHANGE, this._onSwitchURL)
    this.on(Events.DESTROY, this.destroy)
    this._transError()
    this.mp4.load()
  }

  destroy = () => {
    this._restoreNativeApi()
    if (this.mp4) {
      this.mp4.destroy()
      this.mp4 = null
      this.player?.video?.removeEventListener('lowdecode', this._onLowDecode)
    }
  }

  // 还原被代理的原生 player API（destroy、以及降级到原生 video 后，让切流/切集回到原生实现）
  _restoreNativeApi() {
    const { player } = this
    if (!player) return
    if (this._nativeSwitchURL) player.switchURL = this._nativeSwitchURL
    if (this._nativePlayNext) player.playNext = this._nativePlayNext
    if (this._nativeChangeDefinition)
      player.changeDefinition = this._nativeChangeDefinition
    this._nativeSwitchURL = null
    this._nativePlayNext = null
    this._nativeChangeDefinition = null
  }

  static isSupported(softDecode) {
    return MP4.isSupported(softDecode)
  }

  _onLowDecode = () => {
    const media = this.player.video
    if (!media) return

    this.player.emit('lowdecode', media.degradeInfo)
    this.player.emit('core_event', {
      ...media.degradeInfo,
      eventName: EVENT.LOWDECODE
    })
  }

  _onSwitchURL = (url) => {
    if (!this.mp4) return this._nativeSwitchURL?.call(this.player, url)
    this.player.config.url = url
    return this.mp4.load(url)
  }

  /**
   * 代理 player.playNext，兼容旧版 xgplayer-mp4 的切换语义。
   * 原生 playNext 走 resetState()+start()，而 resetState 不降低 _state，
   * RUNNING 态下 start() 直接 early-return，瘦核心不会重新加载。这里改为显式
   * 复位状态并路由到核心 load(新url)，再恢复播放并对外 emit PLAYNEXT。
   */
  _onPlayNext = (config = {}) => {
    const { player } = this
    if (!player) return
    if (!this.mp4) return this._nativePlayNext?.call(player, config)

    player.resetState()
    player.setConfig(config)
    player._currentTime = 0
    player._duration = 0
    this.mp4.load(config.url || player.config.url)
    player.play()
    player.emit(Events.PLAYNEXT, config)
  }

  /**
   * 代理 player.changeDefinition，兼容旧版 xgplayer-mp4 的清晰度/码率切换。
   * 结构对齐原生实现（curDefinition 同步、bitrate 解析、DEFINITION_CHANGE /
   * AFTER_DEFINITION_CHANGE 事件），但加载走瘦核心的 load(to.url)。
   */
  _onChangeDefinition = (to = {}, from) => {
    const { player } = this
    if (!player) return
    if (!this.mp4) return this._nativeChangeDefinition?.call(player, to, from)

    const { definition } = player.config
    if (Array.isArray(definition?.list)) {
      definition.list.forEach((item) => {
        if (to?.definition === item.definition) player.curDefinition = item
      })
    }
    if (to?.bitrate && typeof to.bitrate !== 'number') {
      to.bitrate = parseInt(to.bitrate, 10) || 0
    }

    player.emit(Events.DEFINITION_CHANGE, { from, to })
    player.config.url = to.url
    const ret = this.mp4.load(to.url)
    Promise.resolve(ret).then(() => {
      player.emit(Events.AFTER_DEFINITION_CHANGE, { from, to })
    })
    return ret
  }

  _transError() {
    this.mp4.on(EVENT.ERROR, (err) => this._onFatalError(err))
  }

  /**
   * 致命错误处理，兼容旧版 xgplayer-mp4 的降级语义：
   * - 对外抛出 `playCatch(vtype, err)`（vtype：'MP4_1' 初始化阶段失败 / 'MP4_2' 运行时错误，
   *   由核心是否已完成首段 append 区分）。
   * - 默认（`closeDowngrade` 为假）降级到原生 video：销毁 MP4 核心（连带卸载 MSE），把原始 url
   *   赋回 `video.src`，并在 `loadedmetadata` 后恢复 currentTime 与播放/暂停状态。
   * - `closeDowngrade` 为真时不降级，直接抛出 player error。
   */
  _onFatalError = (err) => {
    const { player } = this
    if (!player || this._degraded) return

    const mp4Config = player.config?.mp4 || {}
    const error = err instanceof Errors ? err : new Errors(player, err)
    const vtype = this.mp4?._inited ? 'MP4_2' : 'MP4_1'

    player.vtype = vtype
    player.emit('playCatch', vtype, error)

    if (mp4Config.closeDowngrade) {
      player.emit(Events.ERROR, error)
      return
    }

    this._degraded = true
    const url = player.config.url
    const curTime = player.currentTime
    const paused = player.paused

    if (this.mp4) {
      this.mp4.destroy()
      this.mp4 = null
    }
    // 已交回原生 video 播放，切流 / 切集也还原到原生实现
    this._restoreNativeApi()

    const media = player.video
    if (!media || !url) return

    const onLoadedMetadata = () => {
      media.removeEventListener('loadedmetadata', onLoadedMetadata)
      if (curTime) media.currentTime = curTime
      if (paused) player.pause()
      else player.play()
    }
    media.addEventListener('loadedmetadata', onLoadedMetadata)
    media.src = url
  }
}
