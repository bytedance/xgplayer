import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context } from 'xgplayer-helper-utils'
import FLV from 'xgplayer-flv-vod/src/flv-vod-controller'

const flvAllowedEvents = EVENTS.FlvAllowedEvents

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvVod'
  }

  static get defaultConfig () {
    return Object.assign({}, {
      options: {},
      loadTimeout: 10000,
      retryCount: 3,
      retryDelay: 0
    })
  }

  get version () {
    return '__VERSION__'
  }

  constructor (config) {
    super(config)
    this._bindPlayerEvents()
  }

  beforePlayerInit () {
    this._initFlvCtr()
    this.player.switchURL = this._switchURLHandler
    // video.src: the blob url create by mse component
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            return this.mse.url
          },
          configurable: true
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  _initFlvCtr () {
    const context = new Context(this.player, this.config, flvAllowedEvents)
    const flv = context.registry('FLV_CONTROLLER', FLV)()
    context.init()
    this.flv = flv
    this.context = context
    this.mse = flv.mse
    this._loadStream()
    this.emit('core_inited', flv)
  }

  _bindPlayerEvents () {
    this.player.useHooks('replay', this._replayHandler)
    this.on(Events.SEEKING, this._seekingHandler)
    this.on(Events.DESTROY, this._destroyHandler)
    this.on(Events.URL_CHANGE, this._switchURLHandler)
    this.on(Events.DEFINITION_CHANGE, this._definitionChangeHandler)
  }

  /** ********* flv event handlers end *********************** */

  /** *********** player event handler *********************** */

  _replayHandler = () => {
    return this._destroyInternal().then(() => {
      this._bindPlayerEvents()
      this.player.hasStart = false
    })
  }

  _seekingHandler = () => {
    if (!this.player) return

    const time = this.player.currentTime
    const range = this.player.getBufferedRange()

    if (time === 0) {
      this.player.replay()
      return
    }

    if (time > range[1] || time < range[0]) {
      this?.flv?.seek(this.player.currentTime)
    }
  }

  _definitionChangeHandler = (change) => {
    const { to } = change
    this._switchURLInternal(to)
  }

  _switchURLHandler = (url, abr) => {
    this._switchURLInternal(url, abr)
  }

  _destroyHandler = () => {
    return this._destroyInternal()
  }

  /** *********** player event handler end *********************** */

  _loadStream () {
    if (this.player && this.core) {
      this.core.loadData()
    }
  }

  _switchURLInternal (url) {
    if (!this.player) return

    this.player.config.url = url
    this.player.currentTime = 0
    return this._destroyInternal().then(() => {
      this._bindPlayerEvents()
      this.player.hasStart = false
      this.player.play()
    })
  }

  _destroyInternal () {
    if (!this.context) return Promise.resolve()

    if (this.flv && this.context) {
      const loader = this.context.getInstance('FETCH_LOADER')
      loader && loader.destroy()
    }

    const clear = () => {
      this.context?.destroy()
      this.flv = null
      this.context = null
      super.offAll()
    }
    return this?.flv?.mse?.destroy().then(clear) || Promise.resolve(clear())
  }

  destroy () {
    return this._destroyInternal()
  }

  get core () {
    return this.flv
  }

  get context () {
    return this._context
  }

  set context (ctx) {
    this._context = ctx
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  }
}

export default FlvPlayer
