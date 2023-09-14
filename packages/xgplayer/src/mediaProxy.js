import EventEmitter from 'eventemitter3'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Errors, { ERROR_TYPE_MAP } from './error'
import { URL_CHANGE, WAITING, VIDEO_EVENTS, SOURCE_ERROR, SOURCE_SUCCESS } from './events'
/**
 * @typedef { import ('eventemitter3') } EventEmitter
 */
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
 * } } IMediaProxy
 */

function emitVideoEvent (eventKey, e) {
  if (!this || !this.emit) {
    return
  }
  if (eventKey === 'error') {
    this.errorHandler(eventKey, e.error)
  } else {
    this.emit(eventKey, e)
  }
}

// 获取包装EventsMiddleware后的VIDEO_EVENT
function getVideoEventHandler (eventKey, player) {
  return (e, _err) => {
    const eData = {
      player,
      eventName: eventKey,
      originalEvent: e,
      detail: e.detail || {},
      timeStamp: e.timeStamp,
      currentTime: player.currentTime,
      duration: player.duration,
      paused: player.paused,
      ended: player.ended,
      isInternalOp: !!player._internalOp[e.type], // 是否是内部操作，不反应到UI上
      muted: player.muted,
      volume: player.volume,
      host: Util.getHostFromUrl(player.currentSrc),
      vtype: player.vtype
    }
    player.removeInnerOP(e.type)
    if (eventKey === 'timeupdate') {
      player._currentTime = player.media && player.media.currentTime
    }

    // 避免playbackRate和defaultPlaybackRate同时设置导致多次触发事件
    if (eventKey === 'ratechange') {
      const _rate = player.media ? player.media.playbackRate : 0
      if (_rate && player._rate === _rate) {
        return
      }
      player._rate = player.media && player.media.playbackRate
    }

    if (eventKey === 'durationchange') {
      player._duration = player.media.duration
    }

    if (eventKey === 'volumechange') {
      eData.isMutedChange = player._lastMuted !== player.muted
      player._lastMuted = player.muted
    }

    if (eventKey === 'error') {
      eData.error = _err || player.video.error
    }

    // 执行video相关事件中间件能力
    if (player.mediaEventMiddleware[eventKey]) {
      const callback = emitVideoEvent.bind(player, eventKey, eData)
      try {
        player.mediaEventMiddleware[eventKey].call(player, eData, callback)
      } catch (err) {
        emitVideoEvent.call(player, eventKey, eData)
        throw err
      }
    } else {
      emitVideoEvent.call(player, eventKey, eData)
    }
  }
}

/**
 * @extends { EventEmitter }
 */
class MediaProxy extends EventEmitter {
  constructor (options) {
    super(options)
    /**
     * @private
     */
    this._hasStart = false
    /**
     * @private
     */
    this._currentTime = 0
    /**
     * @private
     */
    this._duration = 0
    /**
     * @private
     */
    this._internalOp = {}
    /**
     * @private
     */
    this._lastMuted = false

    /**
     * @type {string}
     * 当前播放类型
     */
    this.vtype = 'MP4'

    /**
     * @type {number}
     * @private
     */
    this._rate = -1
    /**
     * @description 初始化时添加在video上的属性集合
     * @type { {[propName: string]: any } }
     */
    this.mediaConfig = Object.assign({}, {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'x5-playsinline': options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options.x5VideoPlayerFullscreen,
      'x5-video-orientation': options['x5-video-orientation'] || options.x5VideoOrientation,
      airplay: options.airplay,
      'webkit-airplay': options.airplay,
      tabindex: options.tabindex | 0,
      mediaType: options.mediaType || 'video',
      'data-index': -1
    }, options.videoConfig, options.videoAttributes)
    /**
     * @description Compatible with WeChat webview
     * "x5-playsinline' and 'x5-video-player-type' only one needs to exist
     * @doc https://x5.tencent.com/docs/video.html
     */
    const playerType = options['x5-video-player-type'] || options.x5VideoPlayerType
    if (Sniffer.isWeixin && Sniffer.os.isAndroid && playerType) {
      this.mediaConfig['x5-video-player-type'] = playerType
      delete this.mediaConfig.playsinline
      delete this.mediaConfig['webkit-playsinline']
      delete this.mediaConfig['x5-playsinline']
    }

    if (options.loop) {
      this.mediaConfig.loop = 'loop'
    }

    // Warning：一些移动端浏览器需要设置DOM属性，否则会导致非静音切换频地址后开播失败
    if (options.autoplayMuted && !Object.prototype.hasOwnProperty.call(this.mediaConfig, 'muted')) {
      this.mediaConfig.muted = true
    }

    /**
     * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IMediaProxy | null }
     */
    this.media = Util.createDom(this.mediaConfig.mediaType, '', this.mediaConfig, '')

    if (options.defaultPlaybackRate) {
      this.media.defaultPlaybackRate = this.media.playbackRate = options.defaultPlaybackRate
    }

    if (Util.typeOf(options.volume) === 'Number') {
      this.volume = options.volume
    }

    if (options.autoplayMuted) {
      this.media.muted = true
      this._lastMuted = true
    }
    if (options.autoplay) {
      this.media.autoplay = true
    }

    /**
     * @private
     */
    this._interval = {}
    /**
     * @readonly
     */
    this.mediaEventMiddleware = {}
    this.attachVideoEvents()
  }

  /**
   * @description set middleware
   * @param { {[propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
   */
  setEventsMiddleware (middlewares) {
    Object.keys(middlewares).map(key => {
      this.mediaEventMiddleware[key] = middlewares[key]
    })
  }

  /**
   * @description remove middleware
   * @param { { [propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
   */
  removeEventsMiddleware (middlewares) {
    Object.keys(middlewares).map(key => {
      delete this.mediaEventMiddleware[key]
    })
  }

  /**
   * Add media eventListener to the video object
   * @param { any } [media]
   */
  attachVideoEvents (media = this.media) {
    if (!this._evHandlers) {
      /**
       * @private
       */
      this._evHandlers = VIDEO_EVENTS.map(eventKey => {
        const funName = `on${eventKey.charAt(0).toUpperCase()}${eventKey.slice(1)}`
        if (typeof this[funName] === 'function') {
          this.on(eventKey, this[funName])
        }

        return {
          [eventKey]: getVideoEventHandler(eventKey, this)
        }
      })
    }

    this._evHandlers.forEach(item => {
      const eventKey = Object.keys(item)[0]
      media.addEventListener(eventKey, item[eventKey], false)
    })
  }

  /**
   * @description remove media eventListener from the video object
   * @param { any } [media]
   */
  detachVideoEvents (media = this.media) {
    this._evHandlers.forEach(item => {
      const eventKey = Object.keys(item)[0]
      media.removeEventListener(eventKey, item[eventKey], false)
    })

    this._evHandlers.forEach(item => {
      const eventKey = Object.keys(item)[0]
      const funName = `on${eventKey.charAt(0).toUpperCase()}${eventKey.slice(1)}`
      if (typeof this[funName] === 'function') {
        this.off(eventKey, this[funName])
      }
    })

    this._evHandlers = null
  }

  /**
   * 针对source列表播放方式添加错误监听
   * @doc https://stackoverflow.com/questions/47557135/html5-detect-the-type-of-error-when-trying-to-load-a-video-using-a-source-elem
   * @protected
   * @param { HTMLVideoElement | HTMLAudioElement } video
   * @param { Array<{src: string, type: string }>} urls
   */
  _attachSourceEvents (video, urls) {
    video.removeAttribute('src')
    video.load()
    urls.forEach((item, index) => {
      this.media.appendChild(Util.createDom('source', '', {
        src: `${item.src}`,
        type: `${item.type || ''}`,
        'data-index': index + 1
      }))
    })
    const _c = video.children
    if (!_c) {
      return
    }
    /**
     * @private
     */
    this._videoSourceCount = _c.length

    this._videoSourceIndex = _c.length

    this._vLoadeddata = (e) => {
      this.emit(SOURCE_SUCCESS, { src: e.target.currentSrc, host: Util.getHostFromUrl(e.target.currentSrc) })
    }

    /**
     * @private
     */
    let _eHandler = null

    for (let i = 0; i < this._evHandlers.length; i++) {
      if (Object.keys(this._evHandlers[i])[0] === 'error') {
        _eHandler = this._evHandlers[i]
        break
      }
    }
    // safari有些版本不是所有source都请求，导致单独使用_videoSourceIndex计算会报错
    !this._sourceError && (this._sourceError = (e) => {
      const _dIndex = parseInt(e.target.getAttribute('data-index'), 10)
      this._videoSourceIndex--
      if (this._videoSourceIndex === 0 || _dIndex >= this._videoSourceCount) {
        const _err = { code: 4, message: 'sources_load_error' }
        _eHandler ? _eHandler.error(e, _err) : this.errorHandler('error', _err)
      }
      const type = ERROR_TYPE_MAP[4]
      this.emit(SOURCE_ERROR, new Errors(this, {
        errorType: type,
        errorCode: 4,
        errorMessage: 'sources_load_error',
        mediaError: { code: 4, message: 'sources_load_error' },
        src: e.target.src
      }))
    })
    for (let i = 0; i < _c.length; i++) {
      _c[i].addEventListener('error', this._sourceError)
    }
    video.addEventListener('loadeddata', this._vLoadeddata)
  }

  /**
   * 移除source列表错误事件监听
   * @protected
   * @param { HTMLVideoElement | HTMLAudioElement } video
   */
  _detachSourceEvents (video) {
    const _c = video.children
    if (!_c || _c.length === 0 || !this._sourceError) {
      return
    }
    for (let i = 0; i < _c.length; i++) {
      _c[i].removeEventListener('error', this._sourceError)
    }
    while (_c.length > 0) {
      video.removeChild(_c[0])
    }
    this._vLoadeddata && video.removeEventListener('loadeddata', this._vLoadeddata)
  }

  /**
   * @description Media Error handler
   * @param { string } eventName
   */
  errorHandler (name, error = null) {
    if (this.media && (this.media.error || error)) {
      let _e = this.media.error || error
      const type = _e.code ? ERROR_TYPE_MAP[_e.code] : 'other'
      let message = _e.message
      if (!this.media.currentSrc) {
        message = 'empty_src'
        _e = {
          code: 6,
          message
        }
      }
      this.emit(name, new Errors(this, {
        errorType: type,
        errorCode: _e.code,
        errorMessage: _e.message || '',
        mediaError: _e
      }))
    }
  }

  destroy () {
    if (this.media) {
      if (this.media.pause) {
        this.media.pause()
        this.media.muted = true
      }
      this.media.removeAttribute('src') // empty source
      this.media.load()
    }
    this._currentTime = 0
    this._duration = 0
    this.mediaConfig = null
    for (const k in this._interval) {
      if (Object.prototype.hasOwnProperty.call(this._interval, k)) {
        clearInterval(this._interval[k])
        this._interval[k] = null
      }
    }
    this.detachVideoEvents()
    this.media = null
    this.mediaEventMiddleware = {}
    this.removeAllListeners()
  }

  /**
   * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IMediaProxy | null }
   * @deprecated Property [video] is renamed to [media],you can access using player.media
   */
  get video () {
    return this.media
  }

  /**
   * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IMediaProxy | null }
   * @deprecated Property [video] is renamed to [media],you can access using player.media= xx
   */
  set video (media) {
    this.media = media
  }

  /**
   *
   * @returns {  Promise<void> | null }
   */
  play () {
    const ret = this.media ? this.media.play() : null
    return ret
  }

  pause () {
    this.media && this.media.pause()
  }

  load () {
    this.media && this.media.load()
  }

  /**
   *
   * @param { string } type
   * @returns { boolean }
   */
  canPlayType (type) {
    return this.media ? this.media.canPlayType(type) : false
  }

  /**
   *
   * @param { any } [buffered]
   * @returns { Array<number> }
   */
  getBufferedRange (buffered) {
    const range = [0, 0]
    if (!this.media) {
      return range
    }
    if (!buffered) {
      buffered = this.media.buffered
    }
    const currentTime = this.media.currentTime
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
    this.media && (this.media.autoplay = isTrue)
  }

  get autoplay () {
    return this.media ? this.media.autoplay : false
  }

  /**
   * @type { TimeRanges | null }
   * @description  返回当前缓冲的TimeRange对象集合
   */
  get buffered () {
    return this.media ? this.media.buffered : null
  }

  /**
   * @type { Array<{start: number, end: number}> | null}
   * @description  返回当前自定义的缓存列表
   */
  get buffered2 () {
    return this.media && this.media.buffered ? Util.getBuffered2(this.media.buffered) : null
  }

  /**
   * @type { {start: number, end: number} }
   */
  get bufferedPoint () {
    const ret = {
      start: 0,
      end: 0
    }
    if (!this.media) {
      return ret
    }
    const _buffered = this.media.buffered
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
    return this.media ? this.media.crossOrigin : ''
  }

  set crossOrigin (isTrue) {
    this.media && (this.media.crossOrigin = isTrue)
  }

  /**
   * @type { string }
   * @description 设置/返回视频播放地址
   * */
  get currentSrc () {
    return this.media ? this.media.currentSrc : ''
  }

  set currentSrc (src) {
    this.media && (this.media.currentSrc = src)
  }

  /**
   * @type { number }
   * @description 设置/返回视频当前播放时间
   * */
  get currentTime () {
    if (!this.media) {
      return 0
    }
    return this.media.currentTime !== undefined ? this.media.currentTime : this._currentTime
  }

  set currentTime (time) {
    this.media && (this.media.currentTime = time)
  }

  /**
   * @type { boolean }
   * 设置/返回视频默认静音
   * */
  get defaultMuted () {
    return this.media ? this.media.defaultMuted : false
  }

  set defaultMuted (isTrue) {
    this.media && (this.media.defaultMuted = isTrue)
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
    return this.media ? this.media.ended : false
  }

  /**
   * @type { MediaError }
   * @description the player current error
   */
  get error () {
    return this.media.error
  }

  /**
   * @type { string }
   * @description return error description text
   */
  get errorNote () {
    const err = this.media.error
    if (!err) {
      return ''
    }
    const status = [
      'MEDIA_ERR_ABORTED',
      'MEDIA_ERR_NETWORK',
      'MEDIA_ERR_DECODE',
      'MEDIA_ERR_SRC_NOT_SUPPORTED'
    ]
    return status[this.media.error.code - 1]
  }

  /**
   * @type { boolean }
   * @description 否开启了循环播放
   */
  get loop () {
    return this.media ? this.media.loop : false
  }

  set loop (isTrue) {
    this.media && (this.media.loop = isTrue)
  }

  /**
   * @type { boolean }
   * @description 静音
   */
  get muted () {
    return this.media ? this.media.muted : false
  }

  set muted (isTrue) {
    if (!this.media || this.media.muted === isTrue) {
      return
    }
    this._lastMuted = this.media.muted
    this.media.muted = isTrue
  }

  /**
   * @type { 0 | 1 | 2 | 3 }
   * @description  返回视频的当前网络状态
   */
  get networkState () {
    return this.media.networkState
  }

  /**
   * @type { boolean }
   * @description  回当前视频是否是暂停状态
   */
  get paused () {
    return this.media ? this.media.paused : true
  }

  /**
   * @type { number }
   * @description 返回/设置倍速
   */
  get playbackRate () {
    return this.media ? this.media.playbackRate : 0
  }

  set playbackRate (rate) {
    if (!this.media || rate === Infinity) {
      return
    }
    this.media.defaultPlaybackRate = rate
    this.media.playbackRate = rate
  }

  /**
   * @type { TimeRanges | null}
   */
  get played () {
    return this.media ? this.media.played : null
  }

  /**
   * @type { boolean }
   */
  get preload () {
    return this.media ? this.media.preload : false
  }

  set preload (isTrue) {
    this.media && (this.media.preload = isTrue)
  }

  /**
   * @type { 0 | 1 | 2 | 3 | 4 }
   * @description 回视频的就绪状态
   */
  get readyState () {
    return this.media.readyState
  }

  /**
   * @type { boolean }
   * @description 当前视频是否可以seek
   */
  get seekable () {
    return this.media ? this.media.seekable : false
  }

  /**
   * @type { boolean }
   * @description 当前视频是否处于seeking状态下
   */
  get seeking () {
    return this.media ? this.media.seeking : false
  }

  /**
   * @type { any }
   * @description 设置/返回当前视频的地址
   */
  get src () {
    return this.media ? this.media.src : ''
  }

  set src (url) {
    if (!this.media) {
      return
    }
    this.emit(URL_CHANGE, url)
    this.emit(WAITING)
    // this.media.pause()
    this._currentTime = 0
    this._duration = 0
    // Some firefox versions firefox Cannot recognize currentSrc of type Blob
    if (/^blob/.test(this.media.currentSrc) || /^blob/.test(this.media.src)) { // has transmuxer core
      this.onWaiting()
      return
    }
    this._detachSourceEvents(this.media)
    if (Util.typeOf(url) === 'Array') {
      this._attachSourceEvents(this.media, url)
    } else if (url) {
      this.media.src = url
    } else {
      this.media.removeAttribute('src')
    }
    this.load()
  }

  /**
   * @type { number }
   * @description 设置/返回视频的音量
   */
  get volume () {
    return this.media ? this.media.volume : 0
  }

  set volume (vol) {
    if (vol === Infinity || !this.media) {
      return
    }
    this.media.volume = vol
  }

  addInnerOP (event) {
    this._internalOp[event] = true
  }

  removeInnerOP (event) {
    delete this._internalOp[event]
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
    super.once(event, callback, ...args)
  }

  /**
   *
   * @param { string } event
   * @param { (data?: any) => any } callback
   * @returns
   */
  off (event, callback, ...args) {
    super.off(event, callback, ...args)
  }

  offAll () {
    super.removeAllListeners()
  }
}

export default MediaProxy
