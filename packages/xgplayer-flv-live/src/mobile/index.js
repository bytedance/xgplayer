import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import FLV from './flv-live-mobile'
import defaultConfig from '../config'

const flvAllowedEvents = EVENTS.FlvAllowedEvents
const CORE_EVENTS = EVENTS.CORE_EVENTS

const { softSolutionProbe } = common

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLive'
  }

  static isSupported () {
    return softSolutionProbe()
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      preloadTime: 5,
      options: {},
      loadTimeout: 10000,
      retryCount: 3,
      retryDelay: 0,
      backupURL: '',
      backupConstructor: null,
      decodeMode: 0,
      innerDegrade: 0,
      seiOnDemand: false
    })
  }

  get version () {
    return '__VERSION__'
  }

  constructor (options) {
    super(options)
    this._bindPlayerEvents()
    this._stopStreamWhenNotAutoPlay()
  }

  beforePlayerInit () {
    this._prepareForLiveVideo()
    this._initFlvCtr()
    this.player.switchURL = this._switchURLHandler
  }

  afterCreate () {
    const { video, config } = this.player
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none'
  }

  _stopStreamWhenNotAutoPlay () {
    this.once(Events.CANPLAY, () => {
      if (!this.playerConfig.autoplay) {
        this._pauseHandler()
      }
    })
  }

  _initFlvCtr = () => {
    const context = new Context(this.player, this.config, flvAllowedEvents)
    const flv = context.registry('FLV_CONTROLLER', FLV)()
    context.init()
    this.flv = flv
    this.context = context
    this._bindFlvEvents()
    this._loadStream()
    this.emit('core_inited', flv)
  }

  // append attrs to live-video
  _prepareForLiveVideo = () => {
    const { player } = this
    const preloadTime = player.config.preloadTime || this.config.preloadTime
    const innerDegrade = this.config.innerDegrade || player.config.innerDegrade
    const { video } = player

    if (!video) return

    if (innerDegrade) {
      video.setAttribute('innerdegrade', innerDegrade)
    }
    if (preloadTime) {
      video.setAttribute('preloadtime', preloadTime)
    }

    if (!player.forceDegradeToVideo) {
      player.forceDegradeToVideo = this.forceDegradeToVideo.bind(this)
    }
    if (video.setDecodeMode) {
      video.setDecodeMode(this.config.decodeMode)
    }
  }

  _bindFlvEvents () {
    let flv = this.flv

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, this._onLoadCompleteHandler)
  }

  _bindPlayerEvents () {
    this.player.useHooks('play', this._playHandler)
    this.player.useHooks('pause', this._pauseHandler)

    this.on(Events.PROGRESS, this._progressHandler)
    this.on(Events.URL_CHANGE, this._switchURLHandler)
    this.on(Events.DEFINITION_CHANGE, this._definitionChangeHandler)

    this.player.video.addEventListener('lowdecode', this._lowdecodeHandler)
    this.player.video.addEventListener('error', this._pauseHandler)
  }

  /** ********* livevideo degrade *********************** */

  _lowdecodeHandler = () => {
    const { player } = this
    const { backupURL: playerBackupURL, innerDegrade: playerInnerDegrade } = player.config
    const { backupURL: pluginBackupURL, innerDegrade: pluginInnerDegrade } = this.config

    const innerDegrade = playerInnerDegrade || pluginInnerDegrade
    const backupURL = playerBackupURL || pluginBackupURL

    const degradeInfo = this.player.video.degradeInfo
    this.emit('lowdecode', degradeInfo)
    this.flv.emitCoreEvent(CORE_EVENTS.LOWDECODE, degradeInfo)

    // degrade to mse
    if (innerDegrade === 2) {
      this._degrade()
      this._toUseMse(backupURL)
    }

    // degrade to video + m3u8
    if (innerDegrade === 3) {
      this._degrade(backupURL)
    }
  }

  /**
   * @param {string | undefined} url
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

      // replace live-video to video element
      const firstChild = player.root.firstChild

      if (firstChild.TAG === 'MVideo') {
        player.root.replaceChild(newVideo, firstChild)
      }
      const mobilePluginName = FlvPlayer.pluginName.toLowerCase()
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

  _toUseMse = (url) => {
    const { player } = this
    const backupConstructor = player.config.backupConstructor || this.config.backupConstructor || (this.wrapper && this.wrapper.constructor)
    if (!backupConstructor || !url) {
      throw new Error('need backupConstructor and backupURL')
    }
    if (backupConstructor) {
      player.config.url = url
      player.config.mediaType = 'video'
      let flvWrapper = player.registerPlugin(backupConstructor)
      flvWrapper.flvLive.beforePlayerInit()
      Promise.resolve().then(() => {
        player.video.src = player.url
      })
    }
  }

  // flv -> h5 m3u8
  // flv -> web mse
  forceDegradeToVideo = (url) => {
    this.player.removeClass('xgplayer-is-error')
    const isHls = /\.m3u8?/.test(url)
    // flv -> h5 hls
    if (isHls) {
      this._degrade(url)
      return
    }
    this._degrade()
    this._toUseMse(url)
  }
  /** ********* livevideo degrade end *********************** */

  /** *********** player event handler *********************** */

  _onLoadCompleteHandler = () => {
    const { player, flv } = this

    if (flv && flv._context) {
      const loader = flv._context.getInstance('FETCH_LOADER')
      loader && loader.cancel()
    }

    if (!this.paused) {
      const checkEnd = () => {
        if (!player || !player.video) return
        const end = player.getBufferedRange()[1]
        if (Math.abs(player.currentTime - end) < 0.5) {
          this.emit('ended')
          return
        }
        setTimeout(checkEnd, 200)
      }
      checkEnd()
      return
    }

    this.emit('ended')
  }

  _playHandler = () => {
    return this._destroyInternal().then(() => {
      this._bindPlayerEvents()
      this.player.hasStart = false
    })
  }

  _pauseHandler = () => {
    if (this.flv) {
      this.flv.pause()
    }
  }

  _switchURLHandler = (url) => {
    this._destroyInternal().then(() => {
      const { player } = this
      player.config.url = url
      this._reloadStream()
    })
  }

  _definitionChangeHandler = (change) => {
    const { to } = change
    this._switchURLHandler(to)
  }

  // for chase frame
  _progressHandler = () => {
    if (!this.player || !this.player.video) return
    const { buffered, currentTime, config } = this.player
    const preloadTime = config.preloadTime || this.config.preloadTime

    if (!buffered.length) return

    const bufferEnd = buffered.end(0)
    const waterLevel = bufferEnd - currentTime
    if (waterLevel > preloadTime * 2) {
      if (bufferEnd - preloadTime > currentTime) {
        this.player.video.currentTime = bufferEnd - preloadTime
      }
    }
  }
  /** *********** player event handler end *********************** */

  _loadStream = (time = this.player.currentTime) => {
    if (this.flv) {
      this.flv.seek(time)
    }
  }

  _reloadStream () {
    this.player?.play()
  }

  _destroyInternal () {
    return new Promise((resolve) => {
      if (!this._context) {
        resolve()
        return
      }
      this._context.destroy()
      super.offAll()
      this.player.video.removeEventListener('lowdecode', this._lowdecodeHandler)
      this.player.video.removeEventListener('error', this._pauseHandler)
      this.flv = null
      this._context = null
      resolve()
    })
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
}

export default FlvPlayer
