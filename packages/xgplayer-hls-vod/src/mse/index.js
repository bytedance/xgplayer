import { Events, BasePlugin } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import HlsVodController from './hls-vod'

const { debounce } = common

const HlsAllowedEvents = EVENTS.HlsAllowedEvents

class HlsVodPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsVod'
  }

  static get defaultConfig () {
    return {
      preloadTime: 5,
      retryCount: 3,
      retryDelay: 0,
      fetchOptions: {}
    }
  }

  constructor (options) {
    super(options)
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime, 200)
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    this._initHlsCtr()
    this.emit('core_inited', this.hls)
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            return this.hls.mse.url
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  _initHlsCtr () {
    if (!this._context) {
      this._context = new Context(this.player, this.config, HlsAllowedEvents)
    }
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)()
    this._context.init()
    this.hls.load(this.player.config.url)
    this._bindPlayerEvents()
  }

  _bindPlayerEvents () {
    this.once(Events.CANPLAY, this._handleSetStartTime)
    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this._handleUrlChange)
    this.on(Events.DEFINITION_CHANGE, this._handleDefinitionChange)
    this.on(Events.REPLAY, this._replay)
    this.on(Events.DESTROY, this.destroy)
  }

  /** *********** player event handler *********************** */

  _handleSetStartTime = () => {
    if (this.config && this.config.autoplay) {
      this.play()
    }
    const { config } = this.player
    if (config && config.startTime) {
      this.player.currentTime = config.startTime
    }
  }

  _handleSetCurrentTime = () => {
    const time = parseFloat(this.player.video.currentTime)
    if (this._context) {
      this.hls.seek(time)
    }
  }

  _handleUrlChange = (url) => {
    this._handleUrlChangeInternal(url)
  }

  _handleDefinitionChange = (change) => {
    const { to } = change
    this._handleUrlChangeInternal(to)
  }

  _replay = () => {
    this.hls.mse.cleanBuffers().then(() => {
      this.player.pause()
      this.hls._playlist.clearDownloaded()
      this.hls.seek(0)
    })
  }

  switchURL = (url) => {
    this._handleUrlChangeInternal(url)
  }

  destroy = () => {
    return this._destroyInternal()
  }

  _handleUrlChangeInternal = (url) => {
    this.player.config.url = url
    this.player.config.startTime = this.player.currentTime
    this._destroyInternal().then(() => {
      this.player.hasStart = false
      this._reloadStream()
    })
  }

  _reloadStream () {
    this.player.play()
  }

  _destroyInternal = () => {
    return new Promise((resolve) => {
      if (!this._context) return

      if (this._context) {
        this._context.destroy()
        this._context = null
      }
      super.offAll()
      if (this.hls.mse) {
        this.hls.mse.destroy().then(() => {
          super.destroy && super.destroy()
          setTimeout(() => {
            resolve()
          }, 50)
        })
      } else {
        super.destroy && super.destroy()
        setTimeout(() => {
          resolve()
        }, 50)
      }
    })
  }

  get core () {
    return this.hls
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  }
}

export default HlsVodPlayer
