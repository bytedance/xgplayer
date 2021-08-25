import EventEmitter from 'eventemitter3'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Errors, { ERROR_TYPE_MAP } from './error'
import { URL_CHANGE, DESTROY } from './events'
/**
 * @typedef { {
 *   duration: number,
 *   currentTime: number,
 *   muted: boolean,
 *   defaultMuted: boolean,
 *   volume: number,
 *   playbackRate: number,
 *   defaultPlaybackRate: number,
 *   autoplay: boolean,
 *   readonly paused: boolean,
 *   readonly ended: boolean,
 *   readonly networkState: number,
 *   readonly readyState: number,
 *   readonly seeking: boolean,
 *   src: any,
 *   play: Function,
 *   pause: Function,
 * } } IVideoProxy
 */
const VIDEO_EVENTS = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked',
  'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange',
  'loadeddata', 'loadstart', 'emptied', 'ratechange', 'progress', 'stalled', 'suspend', 'abort']

function emitEvents (eventKey, e) {
  if (!this || !this.emit) {
    return
  }
  if (eventKey === 'error') {
    this.errorHandler(eventKey)
  } else {
    this.emit(eventKey, e)
  }
}

function getHandler (eventName, player) {
  const funName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
  if (player[funName] && typeof player[funName] === 'function') {
    player.on(eventName, player[funName])
  }
  return (e) => {
    const eventKey = eventName
    e.player = player
    e.eventName = eventName

    if (eventKey === 'timeupdate') {
      player._currentTime = player.video && player.video.currentTime
    }

    if (eventName === 'durationchange') {
      player._duration = player.video.duration
    }

    // 执行video相关事件中间件能力
    if (player.videoEventMiddleware[eventName]) {
      const callback = emitEvents.bind(player)
      try {
        player.videoEventMiddleware[eventName].call(player, e, callback)
      } catch (e) {
        emitEvents.call(player, eventKey, e)
        throw e
      }
    } else {
      emitEvents.call(player, eventKey, e)
    }
  }
}
class VideoProxy extends EventEmitter {
  /**
   * @param {any} options
   */
  constructor (options) {
    super(options)
    /**
     * @private
     */
    this._currentTime = 0
    /**
     * @private
     */
    this._duration = 0
    /**
     * @description 初始化时添加在video上的属性集合
     * @type { {[propName: string]: any; } }
     */
    this.videoConfig = Object.assign({}, {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'x5-playsinline': options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options.x5VideoPlayerFullscreen,
      'x5-video-orientation': options['x5-video-orientation'] || options.x5VideoOrientation,
      airplay: options.airplay,
      'webkit-airplay': options.airplay,
      tabindex: 2,
      mediaType: options.mediaType || 'video'
    }, options.videoConfig, options.videoAttributes)
    /**
     * @description Compatible with WeChat webview
     * "x5-playsinline' and 'x5-video-player-type' only one needs to exist
     * @doc https://x5.tencent.com/docs/video.html
     */
    const playerType = options['x5-video-player-type'] || options.x5VideoPlayerType
    if (Sniffer.isWeixin && Sniffer.os.isAndroid && playerType) {
      this.videoConfig['x5-video-player-type'] = playerType
      delete this.videoConfig.playsinline
      delete this.videoConfig['webkit-playsinline']
      delete this.videoConfig['x5-playsinline']
    }

    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }

    /**
     * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null }
     */
    this.video = Util.createDom(this.videoConfig.mediaType, '', this.videoConfig, '')

    // if (options.defaultPlaybackRate) {
    //   this.video.defaultPlaybackRate = this.video.playbackRate = options.defaultPlaybackRate
    // }

    if (options.autoplayMuted) {
      this.video.muted = true
    }
    if (options.autoplay) {
      this.video.autoplay = true
    }

    /**
     * @private
     */
    this._interval = {}
    /**
     * @readonly
     */
    this.videoEventMiddleware = {}
    this.attachVideoEvents()
  }

  /**
   * @description set middleware
   * @param { {[propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
   */
  setEventsMiddleware (middlewares) {
    Object.keys(middlewares).map(key => {
      this.videoEventMiddleware[key] = middlewares[key]
    })
  }

  /**
   * @description remove middleware
   * @param { { [propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
   */
  removeEventsMiddleware (middlewares) {
    Object.keys(middlewares).map(key => {
      delete this.videoEventMiddleware[key]
    })
  }

  /**
   * Add media eventListener to the video object
   * @param { any } [video]
   */
  attachVideoEvents (video) {
    if (!this.evHandlers) {
      /**
       * @private
       */
      this._evHandlers = VIDEO_EVENTS.map(item => {
        return {
          [item]: getHandler(item, this)
        }
      })
    }
    if (!video) {
      video = this.video
    }
    this._evHandlers.map(item => {
      const eventKey = Object.keys(item)[0]
      video.addEventListener(eventKey, item[eventKey], false)
    })
  }

  /**
   * @description remove media eventListener from the video object
   * @param { any } [video]
   */
  detachVideoEvents (video) {
    if (!video) {
      video = this.video
    }
    this._evHandlers.map(item => {
      const eventKey = Object.keys(item)[0]
      video.removeEventListener(Object.keys(item)[0], item[eventKey], false)
    })
  }

  /**
   * @description Media Error handler
   * @param { string } eventName
   */
  errorHandler (name, error = null) {
    if (this.video && (this.video.error || error)) {
      const _e = this.video.error || error
      const type = _e.code ? ERROR_TYPE_MAP[_e.code] : 'other'
      this.emit(name, new Errors(this, {
        errorType: type,
        errorCode: _e.code,
        errorMessage: _e.message || ''
      }))
    }
  }

  destroy () {
    if (this.video) {
      if (this.video.pause) {
        this.video.pause()
      }
      this.video.removeAttribute('src') // empty source
      // this.video.load()
    }
    this._currentTime = 0
    this._duration = 0
    this.videoConfig = null
    for (const k in this._interval) {
      clearInterval(this._interval[k])
      this._interval[k] = null
    }
    this.emit(DESTROY)
    this.detachVideoEvents()
    this._evHandlers.map(item => {
      const eventKey = Object.keys(item)[0]
      const funName = `on${eventKey.charAt(0).toUpperCase()}${eventKey.slice(1)}`
      if (typeof this[funName] === 'function') {
        this.off(eventKey, this[funName])
      }
    })
    this._evHandlers = null
    this.video = null
    this.videoEventMiddleware = {}
    this.removeAllListeners()
  }

  /**
   *
   * @returns {  Promise<void> | null }
   */
  play () {
    return this.video ? this.video.play() : null
  }

  pause () {
    this.video && this.video.pause()
  }

  /**
   *
   * @param { string } type
   * @returns { boolean }
   */
  canPlayType (type) {
    return this.video.canPlayType(type)
  }

  /**
   *
   * @param { any } [buffered]
   * @returns { Array<number> }
   */
  getBufferedRange (buffered) {
    const range = [0, 0]
    if (!this.video) {
      return range
    }
    if (!buffered) {
      buffered = this.video.buffered
    }
    const currentTime = this.video.currentTime
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i)
        range[1] = buffered.end(i)
        if (range[0] <= currentTime && currentTime <= range[1]) {
          break
        }
      }
    }
    if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
      return range
    } else {
      return [0, 0]
    }
  }

  /**
   * @type { boolean }
   * @description 设置/返回 自动播放属性
   */
  set autoplay (isTrue) {
    this.video.autoplay = isTrue
  }

  get autoplay () {
    return this.video.autoplay
  }

  /**
   * @type { TimeRanges }
   * @description  返回当前缓冲的TimeRange对象集合
   */
  get buffered () {
    return this.video.buffered
  }

  /**
   * @type { Array<{start: number, end: number}> }
   * @description  返回当前自定义的缓存列表
   */
  get buffered2 () {
    return Util.getBuffered2(this.video.buffered)
  }

  /**
   * @type { {start: number, end: number} }
   */
  get bufferedPoint () {
    const _buffered = this.video.buffered
    const ret = {
      start: 0,
      end: 0
    }
    if (!_buffered || _buffered.length === 0) {
      return ret
    }
    for (let i = 0; i < _buffered.length; i++) {
      if ((_buffered.start(i) <= this.currentTime || _buffered.start(i) < 0.1) && _buffered.end(i) >= this.currentTime) {
        return {
          start: _buffered.start(i),
          end: _buffered.end(i)
        }
      }
    }
    return ret
  }

  /**
   * @type { string}
   * @description 设置/返回是否跨域
   * */
  get crossOrigin () {
    return this.video.crossOrigin
  }

  set crossOrigin (isTrue) {
    this.video.crossOrigin = isTrue
  }

  /**
   * @type { string }
   * @description 设置/返回视频播放地址
   * */
  get currentSrc () {
    return this.video.currentSrc
  }

  set currentSrc (src) {
    this.video.currentSrc = src
  }

  /**
   * @type { number }
   * @description 设置/返回视频当前播放时间
   * */
  get currentTime () {
    return this.video.currentTime !== undefined ? this.video.currentTime : this._currentTime
  }

  set currentTime (time) {
    this.video.currentTime = time
  }

  /**
   * @type { boolean }
   * 设置/返回视频默认静音
   * */
  get defaultMuted () {
    return this.video.defaultMuted
  }

  set defaultMuted (isTrue) {
    this.video.defaultMuted = isTrue
  }

  /**
   * @type { number }
   * @description 返回视频时长，单位：s
   * */
  get duration () {
    return this._duration
  }

  /**
   * @type { boolean }
   * @description  回视频是否播放结束
   * */
  get ended () {
    return this.video.ended
  }

  /**
   * @type { MediaError }
   * @description the player current error
   */
  get error () {
    return this.video.error
  }

  /**
   * @type { string }
   * @description return error description text
   */
  get errorNote () {
    const err = this.video.error
    if (!err) {
      return ''
    }
    const status = [
      'MEDIA_ERR_ABORTED',
      'MEDIA_ERR_NETWORK',
      'MEDIA_ERR_DECODE',
      'MEDIA_ERR_SRC_NOT_SUPPORTED'
    ]
    return status[err.code - 1]
  }

  /**
   * @type { boolean }
   * @description 否开启了循环播放
   */
  get loop () {
    return this.video.loop
  }

  set loop (isTrue) {
    this.video.loop = isTrue
  }

  /**
   * @type { boolean }
   * @description 静音
   */
  get muted () {
    return this.video.muted
  }

  set muted (isTrue) {
    this.video.muted = isTrue
  }

  /**
   * @type { number }
   * @description  返回视频的当前网络状态
   */
  get networkState () {
    return this.video.networkState
  }

  /**
   * @type { boolean }
   * @description  回当前视频是否是暂停状态
   */
  get paused () {
    return this.video.paused
  }

  /**
   * @type { number }
   * @description 返回/设置倍速
   */
  get playbackRate () {
    return this.video.playbackRate
  }

  set playbackRate (rate) {
    this.video.defaultPlaybackRate = rate
    this.video.playbackRate = rate
  }

  /**
   * @type { TimeRanges }
   */
  get played () {
    return this.video.played
  }

  /**
   * @type { boolean }
   */
  get preload () {
    return this.video.preload
  }

  set preload (isTrue) {
    this.video.preload = isTrue
  }

  /**
   * @type { string }
   * @description 回视频的就绪状态
   */
  get readyState () {
    return this.video.readyState
  }

  /**
   * @type { boolean }
   * @description 当前视频是否可以seek
   */
  get seekable () {
    return this.video.seekable
  }

  /**
   * @type { boolean }
   * @description 当前视频是否处于seeking状态下
   */
  get seeking () {
    return this.video.seeking
  }

  /**
   * @type { any }
   * @description 设置/返回当前视频的地址
   */
  get src () {
    return this.video.src
  }

  set src (url) {
    this.emit(URL_CHANGE, url)
    // this.video.pause()
    this._currentTime = 0
    this._duration = 0
    // Some firefox versions firefox Cannot recognize currentSrc of type Blob
    if (/^blob/.test(this.video.currentSrc) || /^blob/.test(this.video.src)) { // has transmuxer core
      this.onWaiting()
      return
    }
    this.video.src = url
  }

  /**
   * @type { number }
   * @description 设置/返回视频的音量
   */
  get volume () {
    return this.video.volume
  }

  set volume (vol) {
    this.video.volume = vol
  }

  /** ******************* 以下api只有申明作用,具体实现依赖EventEmitter ******************/

  /**
   *
   * @param { string } event
   * @param { any } [data]
   * @returns
   */
   emit (event, data, ...args) {
     super.emit(event, data, ...args)
   }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  on (event, callback, ...args) {
    super.on(event, callback, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  once (event, callback, ...args) {
    super.on(event, callback, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  off (event, callback, ...args) {
    super.on(event, callback, ...args)
  }

  removeListener () {
    super.removeListener()
  }
}

export default VideoProxy
