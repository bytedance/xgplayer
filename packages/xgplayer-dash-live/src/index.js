import { BasePlugin, Events } from 'xgplayer'
import Dash from './dash-live'
import defaultConfig from './config'
import { Context } from 'xgplayer-helper-utils'

export default class DashPlayer extends BasePlugin {
  static isSupported () {
    return window.MediaSource || window.WebKitMediaSource
  }

  static get pluginName () {
    return 'dashLive'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      options: {},
      loadTimeout: 10000,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000,
      preloadTime: 5
    })
  }

  constructor (options) {
    super(options)
    this.autoPlayStarted = false
    // this.player.useHooks('play', this.reload.bind(this))
  }

  beforePlayerInit () {
    const { url } = this.player.config
    this._context = new Context(this.player, this.config)

    this.dash = this._context.registry('DASH_CONTROLLER', Dash)({
      isMobile: false,
      ...this.config
    })
    this._context.init()
    this.dash.load(url)
    this._initEvents()
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            return this.dash.mse.url
          },
          configurable: true
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  _initEvents () {
    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.on(Events.DESTROY, this.destroy)
    const canUse = this.player.useHooks && this.player.useHooks('play', this.playForHooks.bind(this))
    if (this.playerConfig.autoplay) {
      this.on(Events.AUTOPLAY_STARTED, () => {
        this.autoPlayStarted = true
      })
    }
    if (!canUse) {
      this.on(Events.PLAY, this.play)
    }
  }

  _offEvents () {
    this.off(Events.URL_CHANGE, this.handleUrlChange)
    this.off(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.off(Events.DESTROY, this.destroy)
    this.off(Events.PLAY, this.play)
  }

  handleUrlChange = (url) => {
    this.player.config.url = url
    let request
    if (this.dash.mse) {
      request = this.dash.mse.destroy()
    } else {
      request = Promise.resolve()
    }
    request.then(() => {
      this._offEvents()
      this._context.destroy()
      this._context = null
      this.player.video.currentTime = 0
      this.played = false

      if (!this.player.paused) {
        this.player.pause()
        this.once('canplay', () => {
          this.player.video.play()
        })
      } else {
        this.player.video.play()
      }

      this.player.started = false
      this.player.hasStart = false
      this._context = new Context(this.player, this.config)
      this.player.start()
    })
  }

  handleDefinitionChange = (change) => {
    const { to } = change
    this.handleUrlChange(to)
  }

  playForHooks () {
    if (this.playerConfig.autoplay && this.autoPlayStarted === false) {
      // autoplay not started
      return
    }
    if (this.playerConfig.videoInit && this.player.played.length === 0) {
      return
    }
    this._offEvents()
    return this.reload()
  }

  play = () => {
    if (this.played && this.player.played.length) {
      this.played = false
      this._offEvents()
      return this.reload()
    }
    this.played = true
  }

  pause = () => {
    this._destroy()
  }

  reload () {
    return this._destroy().then(() => {
      this._context = new Context(this.player, this.config)
      this.player.hasStart = false
      this.player.start()
      this.player.addClass('xgplayer-is-enter')
      this.player.once('canplay', () => {
        this.player.video.play()
      })
    })
  }

  _destroy () {
    if (!this.dash || !this.dash.mse || !this._context) return Promise.resolve()
    return this.dash.mse.destroy().then(() => {
      if (!this._context) return
      this._context.destroy()
      this.dash = null
      this._context = null
    }).catch(e => {})
  }

  destroy () {
    super.offAll()
    this._destroy()
  }

  get core () {
    return this.dash
  }
}
