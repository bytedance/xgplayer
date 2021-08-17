import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import HlsLiveController from '../hls-live-controller'
import defaultConfig from './config'

const hlsAllowedEvents = EVENTS.HlsAllowedEvents
const CORE_EVENTS = EVENTS.CORE_EVENTS
const { softSolutionProbe } = common

class HlsPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLive'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      options: {},
      loadTimeout: 10000,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000,
      innerDegrade: 0
    })
  }

  static isSupported () {
    return softSolutionProbe()
  }

  get version () {
    return '__VERSION__'
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    this._prepareForLiveVideo()
    this._initHlsCtr()
    this._bindPlayerEvents()
    this.emit('core_inited', this.hls)
  }

  _prepareForLiveVideo () {
    const { player } = this
    if (player.video) {
      player.video.setAttribute('preloadtime', this.player.config.preloadTime || this.config.preloadTime)
      // for innerDegrade:true
      if (player.config.innerDegrade === true) {
        player.config.innerDegrade = 1
      }
      const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
      if (innerDegrade) {
        player.video.setAttribute('innerdegrade', innerDegrade)
      }
    }
  }

  _initHlsCtr () {
    const { player } = this
    this._context = new Context(this.player, this.config, hlsAllowedEvents)
    this.hls = this._context.registry('HLS_CONTROLLER', HlsLiveController)({
      isMobile: true,
      ...this.config
    })
    this._context.init()
    this._loadData()
    if (!player.forceDegradeToVideo) {
      player.forceDegradeToVideo = this._forceDegradeToVideo
    }
  }

  afterCreate () {
    const { video, config } = this.player
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none'
  }

  _bindPlayerEvents () {
    this.player?.useHooks('play', this._handlePlay)
    this.player?.useHooks('pause', this._handlePause)

    this.on(Events.URL_CHANGE, this._switchURL)
    this.on(Events.DEFINITION_CHANGE, this._handleDefinitionChange)

    this?.player.video?.addEventListener('lowdecode', this._lowdecode)
    this?.player.video?.addEventListener('largeavgap', this._largeavgap)
  }

  _largeavgap = () => {
    this.emit('largeavgap', this.player.video.unsyncInfo)
    this.hls.emitCoreEvent(CORE_EVENTS.LARGE_AVGAP, this.player.video.unsyncInfo)
  }

  _lowdecode = () => {
    const { player } = this

    this.emit('lowdecode', player.video.degradeInfo)
    this.hls.emitCoreEvent(CORE_EVENTS.LOWDECODE, player.video.degradeInfo)

    // degrade to video+m3u8
    const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
    if (innerDegrade === 1) {
      this._degrade(player.video.src)
    }
  }

  /**
   * @param {string} url  the live url for degrade use
   */
  _degrade = (url) => {
    const { player } = this
    const mVideo = player.video
    if (mVideo && mVideo.TAG === 'MVideo') {
      const newVideo = player.video.degradeVideo
      this.destroy()
      player.video = newVideo
      mVideo.degrade(url)
      if (url) {
        player.config.url = url
      }

      // 替换下dom元素
      const firstChild = player.root.firstChild
      if (firstChild.TAG === 'MVideo') {
        player.root.replaceChild(newVideo, firstChild)
      }

      const mobilePluginName = HlsPlayer.pluginName.toLowerCase()
      const wrapperPluginName = this.wrapper && this.wrapper.constructor.pluginName
      player.plugins[mobilePluginName] = null
      if (wrapperPluginName) {
        player.plugins[wrapperPluginName.toLowerCase()] = null
      }

      // play
      player.once('canplay', () => {
        player.play()
      })
    }
  }

  // m3u8 -> h5 m3u8
  // m3u8 -> web mse
  _forceDegradeToVideo = (url) => {
    this.player.removeClass('xgplayer-is-error')
    const { player } = this

    // 降级to video+m3u8
    const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
    if (innerDegrade === 1) {
      this._degrade(url)
    }
  }

  _handlePlay = () => {
    this._destroyInternal()
    this.player.hasStart = false
  }

  _handlePause = () => {
    this._destroyInternal()
  }

  _loadData = () => {
    const { player } = this
    this.hls?.load(player?.config.url)
  }

  _handleDefinitionChange = (change) => {
    const { to } = change
    this._switchURL(to)
  }

  _switchURL = (url) => {
    this.player.config.url = url
    this._destroyInternal()
    this._reloadStream()
  }

  _reloadStream = () => {
    this.player?.play()
  }

  switchURL = (url) => {
    this._switchURL(url)
  }

  destroy = () => {
    this._destroyInternal()
  }

  _destroyInternal = () => {
    if (!this._context) {
      return
    }
    super.offAll()
    this._context.destroy()
    this.hls = null
    this._context = null
    this.player.video.removeEventListener('lowdecode', this._lowdecode)
    this.player.video.removeEventListener('largeavgap', this._largeavgap)
  }

  get core () {
    return this.hls
  }

  get context () {
    return this._context
  }
}

export default HlsPlayer
