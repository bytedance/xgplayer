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
      loadTimeout: 10000,
      fetchOptions: {},
      preloadTime: 5,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000
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
    this.replay = this.replay.bind(this)
    this.switchURL = this.switchURL.bind(this)
  }

  beforePlayerInit () {
    this.player.switchURL = this.switchURL
    if (!this._context) {
      this._context = new Context(this.player, this.config, HlsAllowedEvents)
    }
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)()
    this._context.init()
    this.hls.load(this.player.config.url)
    this.__initEvents()
    this.emit('core_inited', this.hls)
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            return this.hls?.mse?.url
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  handleUrlChange (url) {
    this.hls?.mse?.destroy().then(() => {
      super.offAll()
      this.player.config.url = url
      this._context?.destroy()
      this._context = null
      this.player.video.src = ''
      this.player.video.load()
      this.player.hasStart = false
      this.player.start()
    })
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

  __initEvents () {
    this.once('canplay', () => {
      if (this.config && this.config.autoplay) {
        this.play()
      }
      const { config } = this.player
      if (config && config.startTime) {
        this.player.currentTime = config.startTime
      }
    })

    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DESTROY, this.destroy)
    this.on(Events.REPLAY, this.replay)
  }

  replay () {
    this.hls.mse.cleanBuffers().then(() => {
      this.player.pause()
      this.hls._compat.reset()
      this.hls._playlist.clearDownloaded()
      this.hls.seek(0)
    })
  }

  initHlsBackupEvents (hls, ctx) {
    hls.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      if (!this.player.video.src) {
        const mse = hls.mse
        this.player.start(mse.url)
      }
    })
    hls.once(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
      this.hls = hls

      this.hls.mse.cleanBuffers().then(() => {
        this.hls.mse.resetContext(ctx)
        this.hls.mse.doAppend()
        this._context.destroy()
        this._context = ctx
        this.emit('core_inited', hls)
      })
    })

    hls.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      ctx.destroy()
    })
  }

  switchURL (url) {
    this.handleUrlChange(url)
  }

  destroy () {
    return new Promise((resolve) => {
      if (this._context) {
        this._context.destroy()
      }
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

  get context () {
    return this._context
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  }
}

export default HlsVodPlayer
