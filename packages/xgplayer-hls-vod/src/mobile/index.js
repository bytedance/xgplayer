import { Events, BasePlugin } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import HlsVodMobileController from './hls-vod-mobile'

const { debounce, softSolutionProbe } = common

const HlsAllowedEvents = EVENTS.HlsAllowedEvents

class HlsVodMobilePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsVodMobile'
  }

  static get defaultConfig () {
    return {
      loadTimeout: 10000,
      fetchOptions: {},
      preloadTime: 5,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000,
      innerDegrade: 0
    }
  }

  get version () {
    return '__VERSION__'
  }

  constructor (options) {
    super(options)
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime.bind(this), 200)
    this.destroy = this.destroy.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.switchURL = this.switchURL.bind(this)
  }

  static isSupported () {
    return softSolutionProbe()
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    const { player } = this
    const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
    if (player.video) {
      player.video.setPlayMode('VOD')
      player.video.setAttribute('innerdegrade', innerDegrade)
    }

    if (!this._context) {
      this._context = new Context(this.player, this.config, HlsAllowedEvents)
    }
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodMobileController)()
    this._context.init()
    this.hls.load(this.player.config.url)
    this._initEvents()
    this.emit('core_inited', this.hls)
  }

  handleUrlChange (url) {
    this._switch(url)
  }

  handleDefinitionChange (change) {
    const { to } = change
    this.handleUrlChange(to)
  }

  _handleSetCurrentTime () {
    const time = parseFloat(this.player.video.currentTime)
    if (this._context) {
      this.hls.seek(time)
    }
  }

  play () {
    return this.player.play().catch((e) => {
      if (e && e.code === 20) { // fix: chrome The play() request was interrupted by a new load request.
        this.player.once('canplay', () => {
          this.player.play()
        })
      }
    })
  }

  _initEvents () {
    const { player } = this

    this.lowdecode = () => {
      this.emit('lowdecode', player.video.degradeInfo)
      const innerDegrade = player.config.innerDegrade || this.config.innerDegrade
      if (innerDegrade) {
        const currentTime = player.currentTime
        const mVideo = player.video
        const newVideo = player.video.degradeVideo
        this.destroy()
        this._context = null
        player.video = newVideo
        mVideo.degrade()
        player.once('canplay', () => {
          player.currentTime = currentTime
        })
      }
    }

    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DESTROY, this.destroy)
    player.video.addEventListener('lowdecode', this.lowdecode)
  }

  _switch (url) {
    this.config.url = url
    this._context?.destroy()
    this._context = null
    this.hls = null
    const context = new Context(this.player, this.config, HlsAllowedEvents)
    const hls = context.registry('HLS_VOD_CONTROLLER', HlsVodMobileController)()
    this._context = context
    this.hls = hls
    context.init()
    hls.load(url)
    this.emit('core_inited', hls)
  }

  switchURL (url) {
    const cTime = this.player.currentTime
    // reset MVideo timeline
    this.player.video.src = url
    this._switch(url)
    this.once(Events.PLAYING, () => {
      this.player.currentTime = cTime
    })
  }

  destroy () {
    if (this._context) {
      this._context.destroy()
    }
  }

  get core () {
    return this.hls
  }

  get context () {
    return this._context
  }
}

export default HlsVodMobilePlayer
