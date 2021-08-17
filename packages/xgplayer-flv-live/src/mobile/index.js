import { BasePlugin, Events, Util } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import FLV from './flv-live-mobile'
import defaultConfig from './config'
const flvAllowedEvents = EVENTS.FlvAllowedEvents
const { softSolutionProbe } = common
class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLiveMobile'
  }

  static isSupported () {
    return softSolutionProbe()
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      loadTimeout: 10000,
      preloadTime: 5,
      retryCount: 3,
      retryDelay: 0,
      innerDegrade: null
    })
  }

  get version () {
    return '__VERSION__'
  }

  constructor (options) {
    super(options)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.canplay = this.canplay.bind(this)
    this.switchURL = this.switchURL.bind(this)
    this.progress = this.progress.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)
    this.lowdecode = this.lowdecode.bind(this)
  }

  beforePlayerInit () {
    const { player } = this
    const preloadTime = player.config.preloadTime || this.config.preloadTime
    const innerDegrade = this.config.innerDegrade || player.config.innerDegrade

    if (player.video && innerDegrade) {
      player.video.setAttribute('innerdegrade', innerDegrade)
    }
    if (player.video && preloadTime) {
      player.video.setAttribute('preloadtime', preloadTime)
    }
    this._context = new Context(this.player, this.config, flvAllowedEvents)
    this.initFlv()
    this._context.init()
    this.loadData()
    this.initEvents()
    if (!player.forceDegradeToVideo) {
      player.forceDegradeToVideo = this.forceDegradeToVideo.bind(this)
    }
    if (player.video.setDecodeMode) {
      player.video.setDecodeMode(this.config.decodeMode)
    }
  }

  afterCreate () {
    const { video, config } = this.player
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none'
  }

  initFlvEvents (flv) {
    const { player } = this

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!player.paused) {
        const timer = setInterval(() => {
          if (!player || !player.video) return window.clearInterval(timer)
          const end = player.getBufferedRange()[1]
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended')
            window.clearInterval(timer)
          }
        }, 200)
      }
    })
  }

  initEvents () {
    this.on(Events.PLAY, this.play)
    this.on(Events.PAUSE, this.pause)
    this.on(Events.CANPLAY, this.canplay)
    this.on(Events.URL_CHANGE, this.switchURL)
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.on(Events.PROGRESS, this.progress)

    // autoplay:true 不能自动播放的, 停止拉流
    this.on(Events.AUTOPLAY_PREVENTED, () => {
      if (!this.flv) return
      this.flv.pause()
    })
    this.player.video.addEventListener('lowdecode', this.lowdecode)

    this.player.video.addEventListener('error', () => {
      // 报错时，调用pasue，停止http请求
      this.pause()
    })
    window.addEventListener('unload', () => {
      // this.pause()
      // let myStorage = window.localStorage
      // myStorage.setItem('pause', new Date())
    })
    // this.player.video.addEventListener('notautoplay', () => {
    //   //video硬解时，自动播放失败，调用pasue，停止http请求
    //   this.pause()
    // })
  }

  // 降级时到不同的播放方式
  lowdecode () {
    const { player } = this
    const { backupURL: playerBackupURL, innerDegrade: playerInnerDegrade } = player.config
    const { backupURL: pluginBackupURL, innerDegrade: pluginInnerDegrade } = this.config

    const innerDegrade = playerInnerDegrade || pluginInnerDegrade
    const backupURL = playerBackupURL || pluginBackupURL

    this.emit('lowdecode', this.player.video.degradeInfo)

    // 内部降级到mse
    if (innerDegrade === 2) {
      this._degrade()
      this._toUseMse(backupURL)
    }

    // h5下内部降级到video播放m3u8
    if (innerDegrade === 3) {
      this._degrade(backupURL)
    }
  }

  /**
   * @param {string | undefined} url  降级到的地址
   */
  _degrade (url) {
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
      const mobilePluginName = FlvPlayer.pluginName.toLowerCase()
      player.plugins[mobilePluginName] = null

      // play
      player.once('canplay', () => {
        player.play()
      })
    }
  }

  _toUseMse (url) {
    const { player } = this
    const backupConstructor = player.config.backupConstructor || this.config.backupConstructor
    if (!backupConstructor || !url) {
      throw new Error('need backupConstructor and backupURL')
    }
    if (backupConstructor) {
      player.config.url = url
      const flvMsePlayer = player.registerPlugin(backupConstructor)
      flvMsePlayer.beforePlayerInit()
      Promise.resolve().then(() => {
        player.video.src = player.url
        const mobilePluginName = FlvPlayer.pluginName.toLowerCase()
        player.plugins[mobilePluginName] = null
      })
    }
  }

  // 外部强制降级
  // flv -> h5 m3u8
  // flv -> web mse
  forceDegradeToVideo (url) {
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

  offEvents () {
    this.off(Events.PLAY, this.play)
    this.off(Events.PAUSE, this.pause)
    this.off(Events.CANPLAY, this.canplay)
    this.off(Events.URL_CHANGE, this.switchURL)
    this.off(Events.PROGRESS, this.progress)
    this.off(Events.DEFINITION_CHANGE, this.handleDefinitionChange)
    this.player.video.removeEventListener('lowdecode', this.lowdecode)
  }

  initFlv () {
    const flv = this._context.registry('FLV_CONTROLLER', FLV)()
    this.initFlvEvents(flv)
    this.flv = flv
    this.emit('core_inited', flv)
  }

  canplay () {
    if (!this.player.video) return
    if (this.player.config.autoplay) return

    // autoplay:false 初始化后停止拉流
    if (!this.played) {
      this.flv.pause()
    }

    if (this.player.video.buffered.length) {
      this.played = true
    }
  }

  play () {
    const { player } = this
    if (this.played) {
      this._destroy()
      player.hasStart = false
      player.start()
    } else {
      this.addLiveFlag()
    }
    this.played = true
  }

  pause () {
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.player.currentTime) {
    if (this.flv) {
      this.flv.seek(time)
    }
  }

  switchURL (url) {
    this._destroy()
    const { player } = this
    player.config.url = url
    player.hasStart = false
    player.start()
  }

  handleDefinitionChange (change) {
    const { to } = change
    this.switchURL(to)
  }

  progress () {
    if (!this.player || !this.player.video) return
    const { buffered, currentTime, config } = this.player
    const preloadTime = config.preloadTime || this.config.preloadTime
    const bufferEnd = buffered.end(0)
    const waterLevel = bufferEnd - currentTime
    if (waterLevel > preloadTime * 2) {
      if (bufferEnd - preloadTime > currentTime) {
        this.player.video.currentTime = bufferEnd - preloadTime
      }
    }
  }

  destroy () {
    this._destroy()
  }

  addLiveFlag () {
    const { player } = this
    Util.addClass(player.root, 'xgplayer-is-live')
  }

  _destroy () {
    if (!this._context) return
    this.offEvents()
    this._context.destroy()
    this.flv = null
    this._context = null
  }

  get core () {
    return this.flv
  }

  get context () {
    return this._context
  }
}

export default FlvPlayer
