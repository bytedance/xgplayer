import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'

import HLS from './hls-live-mobile'
import defaultConfig from './config'
const hlsAllowedEvents = EVENTS.HlsAllowedEvents
const { softSolutionProbe } = common

class HlsPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLive'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      preloadTime: 10,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 0,
      innerDegrade: 0
    })
  }

  static isSupported () {
    return softSolutionProbe()
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
      // 先兼容传递 innerDegrade = true
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
    this.hls = this._context.registry('HLS_CONTROLLER', HLS)()
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
    const { player } = this
    this.player.useHooks('play', this._handlePlay)

    this.on(Events.URL_CHANGE, this._switchURL)
    this.on(Events.DEFINITION_CHANGE, this._handleDefinitionChange)

    player.video.addEventListener('lowdecode', this._lowdecode)
    player.video.addEventListener('largeavgap', this._largeavgap)
  }

  _largeavgap = () => {
    this.emit('largeavgap', this.player.video.unsyncInfo)
  }

  _lowdecode = () => {
    const { player } = this

    this.emit('lowdecode', player.video.degradeInfo)

    // 降级到video直接播放hls
    const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
    if (innerDegrade === 1) {
      this._degrade(player.video.src)
    }
  }

  /**
   * @description 该方法用来软解降级到video
   * @param {string} url  降级到的地址
   * @param {boolean} useMse 是否是降级到mse,true的话软解内部处理不用给video设置src
   */
  _degrade (url) {
    const { player } = this
    let mVideo = player.video
    if (mVideo && mVideo.TAG === 'MVideo') {
      let newVideo = player.video.degradeVideo
      this.destroy()
      player.video = newVideo
      mVideo.degrade(url)
      if (url) {
        player.config.url = url
      }

      // 替换下dom元素
      let firstChild = player.root.firstChild
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

  // 外部强制降级
  // m3u8 -> h5 m3u8
  // m3u8 -> web mse
  _forceDegradeToVideo = (url) => {
    this.player.removeClass('xgplayer-is-error')
    const { player } = this

    // 降级到video直接播放hls
    const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
    if (innerDegrade === 1) {
      this._degrade(url)
    }
  }

  _handlePlay = () => {
    this._destroyInternal()
    this.player.hasStart = false
  }

  _loadData () {
    const { player } = this
    if (this.hls) {
      this.hls.load(player.config.url)
    }
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

  _reloadStream () {
    if (this.player) {
      this.player.play()
    }
  }

  switchURL = (url) => {
    this._switchURL(url)
  }

  destroy () {
    this._destroyInternal()
  }

  _destroyInternal () {
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
