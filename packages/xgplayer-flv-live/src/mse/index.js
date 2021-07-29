import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context } from 'xgplayer-helper-utils'
import FLV from './flv-live'
import defaultConfig from '../config'

const flvAllowedEvents = EVENTS.FlvAllowedEvents

/**
 *  拉流播放逻辑
 *  *指定autoplay:true
 *    xgplayer初始化后执行start()
 *      start() -> pluginsManager.beforeInit(this) -> _startInit() -> videoPlay()
 *      等插件列表初始化ready后,监听canplay事件，等canplay触发后，调用video.play()，处理video.play()是否自动播放了
 *
 * *指定autoplay:false
 *    config.videoInit 默认为true, xgplayer初始化后执行start()
 *       start() -> pluginsManager.beforeInit(this) -> _startInit()
 *
 * start插件什么时候展示
 *  autoplay:flase
 *  autoplay:true 但是浏览器不允许自动播放
 *
 *
 * *点击start插件播放
 *  点击start插件主要是为了调用videoPlay(), 通过hook实现直播插件层重新拉流逻辑
 *
 */

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
    this._bindPlayerEvents()
    this._stopStreamWhenNotAutoPlay()
  }

  beforePlayerInit () {
    this._initFlvCtr()
    this.player.switchURL = this._switchURLHandler
    // video.src 设置成mse中生成的blob地址
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

  _stopStreamWhenNotAutoPlay () {
    this.once(Events.CANPLAY, () => {
      if (!this.playerConfig.autoplay) {
        this._pauseHandler()
      }
    })
  }

  _initFlvCtr () {
    const context = new Context(this.player, this.config, flvAllowedEvents)
    const flv = context.registry('FLV_CONTROLLER', FLV)()
    context.init()
    this.flv = flv
    this.context = context
    this.mse = flv.mse
    this._bindFlvEvents(flv)
    this._loadStream()
    this.emit('core_inited', flv)
  }

  _bindFlvEvents () {
    const flv = this.flv

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, this._onLoadCompleteHandler)

    flv.on(EVENTS.MSE_EVENTS.MSE_WRONG_TRACK_ADD, this._onMseWrongTrackAddHandler)
  }

  _bindPlayerEvents () {
    this.player.useHooks('play', this._playHandler)
    this.player.useHooks('pause', this._pauseHandler)

    this.on(Events.SEEKING, this._seekingHandler)
    this.on(Events.DESTROY, this._destroyHandler)
    this.on(Events.URL_CHANGE, this._switchURLHandler)
    this.on(Events.DEFINITION_CHANGE, this._definitionChangeHandler)
  }

  /** ********* flv controller event handlers *********************** */

  _onLoadCompleteHandler = () => {
    const { player, flv } = this

    // 直播完成，待播放器播完缓存后发送关闭事件
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

  _onMseWrongTrackAddHandler = () => {
    this._reloadStream()
  }
  /** ********* flv event handlers end *********************** */

  /** *********** player event handler *********************** */
  _playHandler = () => {
    if (!this.player || !this.player.video) return Promise.resolve()

    const { video } = this.player

    // 兼容safari下不允许自动播放时, click  handler里面需要直接调用 video.play() 点击播放才能生效
    return Promise.all(
      [
        video.readyState ? video.play().catch(() => {}) : Promise.resolve(),
        this._destroyInternal().then(() => {
          this._bindPlayerEvents()
          // player中重新走 playHook -> videoPlay() -> start()流程
          this.player.hasStart = false
        })
      ])
  }

  _pauseHandler = () => {
    if (this.flv) {
      this.flv.pause()
    }
  }

  _seekingHandler = () => {
    if (!this.player || !this.player.getBufferedRange) return
    const time = this.player.currentTime
    const range = this.player.getBufferedRange()
    if (time > range[1] || time < range[0]) {
      this.flv && this.flv.seek(this.player.currentTime)
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

  _loadStream (time = this.player.currentTime) {
    if (this.player && this.core) {
      this.core.seek(time)
    }
  }

  _reloadStream () {
    this.player.play()
  }

  _waitBackupStream (flv, ctx) {
    return new Promise((resolve, reject) => {
      let mediaLength = 3
      const _waitReadyHandler = () => {
        mediaLength -= 1
        if (mediaLength === 0 && this.player) {
        // ensure switch smoothly
          this.emit('switch_completed')
          flv.on(EVENTS.DEMUX_EVENTS.ISKEYFRAME, flv._handleKeyFrame)
          flv.off(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, _waitReadyHandler)
          resolve()
          flv.urlSwitching = true
        }
      }

      flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
        this.emit('switch_error')
        ctx.destroy()
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      })

      flv.off(EVENTS.DEMUX_EVENTS.ISKEYFRAME, flv._handleKeyFrame)
      flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, _waitReadyHandler)
    })
  }

  _switchURLInternal (url, abr) {
    this.player.config.url = url
    if (!abr) {
      this.player.currentTime = 0
      this._reloadStream()
      return
    }

    const context = new Context(this.player, this.config, flvAllowedEvents)
    let flv

    if (abr) {
      const compat = this.context.getInstance('COMPATIBILITY')
      flv = context.registry('FLV_CONTROLLER', FLV)(this.mse,
        {
          baseDts: compat.getBaseDts()
        })
    } else {
      flv = context.registry('FLV_CONTROLLER', FLV)(this.mse)
    }

    context.init()

    this._waitBackupStream(flv, context)
      .then(() => {
        this.flv = flv
        this.mse.resetContext(context, !!abr)
        this.context.destroy()
        this.context = context
        this._bindFlvEvents()
      })

    flv.loadData(url)

    this.emit('core_inited', flv)
  }

  _destroyInternal () {
    if (!this.context) return Promise.resolve()

    if (this.flv && this.context) {
      const loader = this.context.getInstance('FETCH_LOADER')
      loader && loader.destroy()
    }

    const clear = () => {
      if (!this.context) return
      this.context.destroy()
      this.flv = null
      this.context = null
      super.offAll()
    }
    return this.flv && this.flv.mse ? this.flv.mse.destroy().then(clear) : Promise.resolve(clear())
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
