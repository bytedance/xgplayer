import { Events, BasePlugin } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import HlsVodMobileController from './hls-vod-mobile'

const { debounce, softSolutionProbe } = common

const HlsAllowedEvents = EVENTS.HlsAllowedEvents

class HlsVodMobilePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsVod'
  }

  static get defaultConfig () {
    return {
      options: {},
      loadTimeout: 10000,
      preloadTime: 5,
      retryCount: 3,
      retryDelay: 1000,
      retryTimes: 3,
      innerDegrade: 0
    }
  }

  static isSupported () {
    return softSolutionProbe()
  }

  constructor (options) {
    super(options)
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime, 200)
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    const { player } = this
    if (player.video) {
      player.video.setPlayMode('VOD')
    }
    this._initHlsCtr()
    this.emit('core_inited', this.hls)
  }

  _initHlsCtr () {
    this._context = new Context(this.player, this.config, HlsAllowedEvents)
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodMobileController)()
    this._context.init()
    this.hls.load(this.player.config.url)
    this._bindPlayerEvents()
  }

  _bindPlayerEvents () {
    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this._handleUrlChange)
    this.on(Events.DEFINITION_CHANGE, this._handleDefinitionChange)
    this.on(Events.REPLAY, this._replay)
    this.on(Events.DESTROY, this.destroy)
  }

  /** *********** player event handler *********************** */

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

  _handleUrlChangeInternal = (url) => {
    this.player.config.url = url
    this._destroyInternal()
    this.player.hasStart = false
    this._reloadStream()
  }

  _replay = () => {
    this.player.currentTime = 0
  }

  _reloadStream () {
    this.player.play()
  }

  switchURL = (url) => {
    this._handleUrlChangeInternal(url)
  }

  destroy = () => {
    this._destroyInternal()
  }

  _destroyInternal = () => {
    if (!this._context) return
    if (this._context) {
      this._context.destroy()
      this._context = null
    }
    super.offAll()
  }

  get core () {
    return this.hls
  }

  get context () {
    return this._context
  }
}

export default HlsVodMobilePlayer
