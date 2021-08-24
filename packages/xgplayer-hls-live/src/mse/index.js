import { BasePlugin, Events } from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-helper-utils'
import HlsLiveController from '../hls-live-controller'
import defaultConfig from './config'

const HlsAllowedEvents = EVENTS.HlsAllowedEvents

export default class HlsLivePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLive'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      options: {},
      loadTimeout: 10000,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000
    })
  }

  get version () {
    return '__VERSION__'
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    this._initHlsCtr()
    this.emit('core_inited', this.hls)
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            return this.hls?.mse?.url
          },
          configurable: true
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  _initHlsCtr () {
    const { url } = this.player.config
    this._context = new Context(this.player, this.config, HlsAllowedEvents)

    this.hls = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({
      isMobile: false,
      ...this.config
    })
    this._context.init()
    this.hls.load(url)
    this._bindPlayerEvents()
  }

  _bindPlayerEvents () {
    this.player?.useHooks('play', this._handlePlay)
    this.player?.useHooks('pause', this._handlePause)

    this.on(Events.URL_CHANGE, this._handleUrlChange)
    this.on(Events.DEFINITION_CHANGE, this._handleDefinitionChange)
    this.on(Events.DESTROY, this.destroy)
  }

  _handlePlay = () => {
    if (!this.player || !this.player.video) return Promise.resolve()

    const { video } = this.player

    return Promise.all([
      // for browser not allowed autoplay
      video.readyState ? video.play().catch(() => {}) : Promise.resolve(),
      this._destroyInternal().then(() => {
        this._bindPlayerEvents()
        // playHook -> videoPlay() -> start()
        this.player.hasStart = false
      })
    ])
  }

  _handlePause = () => {
    this._destroyInternal()
  }

  _handleUrlChange = (url) => {
    if (!this.player) return

    this.player.config.url = url
    this._reloadStream()
  }

  _handleDefinitionChange = (change) => {
    const { to } = change
    this._handleUrlChange(to)
  }

  _reloadStream = () => {
    this.player?.play()
  }

  switchURL = (url) => {
    return this._handleUrlChange(url)
  }

  destroy = () => {
    this._destroyInternal()
  }

  _destroyInternal = () => {
    if (!this.hls || !this.hls.mse || !this._context) return Promise.resolve()
    return this.hls.mse
      .destroy()
      .then(() => {
        if (!this._context) return
        super.offAll()
        this._context.destroy()
        this.hls = null
        this._context = null
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /** @type {HlsLiveController} */
  get core () {
    return this.hls
  }

  get loader () {
    return this._context?.getInstance('TS_LOADER')
  }

  get context () {
    return this._context
  }

  static isSupported () {
    return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  }
}
