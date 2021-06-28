import { BasePlugin, Events, Util } from 'xgplayer'
import { EVENTS, Context } from 'xgplayer-helper-utils'
import FLV from './flv-live'
import defaultConfig from './config'

const flvAllowedEvents = EVENTS.FlvAllowedEvents

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLive'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      preloadTime: 5,
      retryCount: 3,
      retryDelay: 0
    })
  }

  constructor (config) {
    super(config)
    this._context = new Context(this.player, this.config, flvAllowedEvents)
    this.loaderCompleteTimer = null
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.destroy = this.destroy.bind(this)
    this.switchURL = this.switchURL.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)

    this.autoPlayStarted = false
    this.played = false

    this.canUseHooks = this.player.useHooks && this.player.useHooks('play', this.playHook.bind(this))
    this.initEvents()
  }

  beforePlayerInit () {
    this.initFlv()
    this.context.init()
    this.loadData()
    this.player.switchURL = this.switchURL
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        '__url': {
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

  initFlvEvents (flv) {
    const player = this.player
    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      Util.addClass(player.root, 'xgplayer-is-live')
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (flv && flv._context) {
        const loader = flv._context.getInstance('FETCH_LOADER')
        loader && loader.cancel()
      }
      if (!player.paused) {
        this.loaderCompleteTimer = setInterval(() => {
          if (!player || !player.video) return window.clearInterval(this.loaderCompleteTimer)
          const end = player.getBufferedRange()[1]
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended')
            window.clearInterval(this.loaderCompleteTimer)
          }
        }, 200)
      } else {
        player.emit('ended')
      }
    })

    flv.on(EVENTS.REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE, (type, dtses) => {
      this.player && this.player.emit(EVENTS.REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE, type, dtses)
    })
    flv.on(EVENTS.MSE_EVENTS.MSE_WRONG_TRACK_ADD, () => {
      this.reload()
    })
  }

  initFlvBackupEvents (flv, ctx, keepBuffer) {
    flv.off(EVENTS.DEMUX_EVENTS.ISKEYFRAME, flv._handleKeyFrame)
    let mediaLength = 3
    flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
      mediaLength -= 1
      if (mediaLength === 0 && this.player) {
        // ensure switch smoothly
        this.flv = flv
        this.mse.resetContext(ctx, keepBuffer)
        this.context.destroy()
        this._context = ctx
        this.emit('switch_completed')
        flv.on(EVENTS.DEMUX_EVENTS.ISKEYFRAME, flv._handleKeyFrame)
        flv.urlSwitching = true
      }
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (flv && flv._context) {
        const loader = flv._context.getInstance('FETCH_LOADER')
        loader && loader.cancel()
      }
      if (!this.paused) {
        this.loaderCompleteTimer = setInterval(() => {
          if (!this.player || !this.player.video) return window.clearInterval(this.loaderCompleteTimer)
          const end = this.player.getBufferedRange()[1]
          if (Math.abs(this.player.currentTime - end) < 0.5) {
            this.emit('ended')
            window.clearInterval(this.loaderCompleteTimer)
          }
        }, 200)
      } else {
        this.emit('ended')
      }
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      this.emit('switch_error')
      ctx.destroy()
    })

    flv.on(EVENTS.REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE, (type, dtses) => {
      this.player && this.player.emit(EVENTS.REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE, type, dtses)
    })
    flv.on(EVENTS.MSE_EVENTS.MSE_WRONG_TRACK_ADD, () => {
      this.reload()
    })
  }

  initEvents () {
    this.on('seeking', () => {
      const time = this.player.currentTime
      const range = this.player.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.flv && this.flv.seek(this.player.currentTime)
      }
    })
    if (!this.canUseHooks) {
      this.on(Events.PLAY, this.play)
    }
    if (!this.canUseHooks) {
      this.on(Events.PAUSE, this.pause)
    } else if (!this.player._originPause) {
      this.player._originPause = this.player.pause.bind(this.player)
      this.player.pause = () => {
        this.player._originPause()
        this.pause()
      }
    }
    this.on(Events.DESTROY, this.destroy)
    this.on(Events.URL_CHANGE, this.switchURL)
    this.on(Events.DEFINITION_CHANGE, this.switchURL)
    if (this.playerConfig.autoplay) {
      this.on(Events.AUTOPLAY_STARTED, () => {
        this.autoPlayStarted = true
      })
    }
  }

  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)()
    this.initFlvEvents(flv)
    this.flv = flv
    this.mse = flv.mse
    this.emit('core_inited', flv)
    return flv
  }

  playHook () {
    if (this.playerConfig.autoplay && this.autoPlayStarted === false) {
      // autoplay not started
      return
    }
    if (this.playerConfig.videoInit && this.player.played.length === 0) {
      return
    }
    return this.reload()
  }

  play () {
    if (this.playerConfig.autoplay && this.autoPlayStarted === false) {
      // autoplay not started
      this.played = true
      return
    }
    if (this.played && (this.player.hasStart || this.player.played.length)) {
      this.played = false
      return this.reload()
    }
    this.played = true
  }

  reload () {
    return this._destroy().then(() => {
      this.initEvents()
      this._context = new Context(this.player, this.config, flvAllowedEvents)
      setTimeout(() => {
        if (!this.player) return
        this.player.hasStart = false
        this.player.start()
        this.player.addClass('xgplayer-is-enter')
        // used for autoplay:false
        this.player.once('canplay', () => {
          if (!this.player || this.player.config.autoplay) return
          this.player.video.play()
        })
      })
    })
  }

  pause () {
    if (this.playerConfig.autoplay && this.autoPlayStarted === false) {
      return
    }
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.player.currentTime) {
    if (this.player && this.core) {
      this.core.seek(time)
    }
  }

  destroy () {
    return this._destroy()
  }

  _destroy () {
    if (!this.context) return Promise.resolve()
    if (this.flv && this.context) {
      const loader = this.context.getInstance('FETCH_LOADER')
      loader && loader.destroy()
    }
    const clear = () => {
      if (!this.context) return
      this.context.destroy()
      this.flv = null
      this._context = null
      this.played = false
      if (this.loaderCompleteTimer) {
        window.clearInterval(this.loaderCompleteTimer)
      }
      super.offAll()
    }
    return this.flv && this.flv.mse ? this.flv.mse.destroy().then(clear) : Promise.resolve(clear())
  }

  handleDefinitionChange (change) {
    const { to } = change
    this.switchURL(to)
  }

  switchURL (url, abr) {
    this.played = false
    this.player.config.url = url
    if (!abr) {
      this.player.currentTime = 0
      // clean buffer to avoid play repeatedly
      this.reload()
      return
    }

    const context = new Context(this.player, this.config, flvAllowedEvents)
    let flv
    if (abr) {
      const { _dtsBase, _videoDtsBase, _audioDtsBase, _isDtsBaseInited } = this.context.getInstance('MP4_REMUXER')
      flv = context.registry('FLV_CONTROLLER', FLV)(this.mse, {
        remux: {
          _dtsBase, _videoDtsBase, _audioDtsBase, _isDtsBaseInited
        }
      })
    } else {
      flv = context.registry('FLV_CONTROLLER', FLV)(this.mse)
    }
    context.init()
    this.initFlvBackupEvents(flv, context, !!abr)
    flv.loadData(url)
    this.emit('core_inited', flv)
  }

  get core () {
    return this.flv
  }

  get context () {
    return this._context
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  }
}

export default FlvPlayer
