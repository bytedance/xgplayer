import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Errors from './error'
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

class Proxy {
  /**
   * @constructor
   * @param {any} options
   */
  constructor (options) {
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

    EventEmitter(this)
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
   * @param { Array<{[propName: string]: function}> } middlewares
   */
  setEventsMiddleware (middlewares) {
    Object.keys(middlewares).map(key => {
      this.videoEventMiddleware[key] = middlewares[key]
    })
  }

  /**
   * @description remove middleware
   * @param { Array<{[propName: string]: function}> } middlewares
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
      this.emit(name, new Errors('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src,
        this.ended, {
          line: 162,
          msg: this.error,
          handle: 'Constructor'
        }, _e.code, _e))
    }
  }

  /**
   * @type { boolean }
   */
  get hasStart () {
    return this._hasStart
  }

  set hasStart (bool) {
    if (typeof bool === 'boolean') {
      this._hasStart = bool
      this.emit('hasstart')
    }
  }

  destroy () {
    if (this.video) {
      this.video.pause()
      this.video.removeAttribute('src') // empty source
      // this.video.load()
    }
    this._currentTime = 0
    this._duration = 0
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
    allOff(this)
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
   */
  set autoplay (isTrue) {
    this.video.autoplay = isTrue
  }

  get autoplay () {
    return this.video.autoplay
  }

  /**
   * @type { TimeRanges }
   */
  get buffered () {
    return this.video.buffered
  }

  /**
   * @type { Array<{start: number, end: number}> }
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

  /** @type { string}  */
  get crossOrigin () {
    return this.video.crossOrigin
  }

  set crossOrigin (isTrue) {
    this.video.crossOrigin = isTrue
  }

  /** @type { string }  */
  get currentSrc () {
    return this.video.currentSrc
  }

  set currentSrc (src) {
    this.video.currentSrc = src
  }

  /** @type { number }  */
  get currentTime () {
    return this.video.currentTime || this._currentTime
  }

  set currentTime (time) {
    this.video.currentTime = time
  }

  /** @type { boolean }  */
  get defaultMuted () {
    return this.video.defaultMuted
  }

  set defaultMuted (isTrue) {
    this.video.defaultMuted = isTrue
  }

  /** @type { number }  */
  get duration () {
    return this._duration
  }

  /**
   * @type { boolean }
   * */
  get ended () {
    return this.video.ended
  }

  /**
   * @type { MEDIA_ERR_ABORTED | MEDIA_ERR_NETWORK | MEDIA_ERR_DECODE | MEDIA_ERR_SRC_NOT_SUPPORTED }
   */
  get error () {
    const err = this.video.error
    if (!err) {
      return null
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
   */
  get loop () {
    return this.video.loop
  }

  set loop (isTrue) {
    this.video.loop = isTrue
  }

  /**
   * @type { boolean }
   */
  get muted () {
    return this.video.muted
  }

  set muted (isTrue) {
    this.video.muted = isTrue
  }

  /**
   * @type { NETWORK_EMPTY | NETWORK_IDLE | NETWORK_LOADING | NETWORK_NO_SOURCE}
   */
  get networkState () {
    const status = [
      'NETWORK_EMPTY',
      'NETWORK_IDLE',
      'NETWORK_LOADING',
      'NETWORK_NO_SOURCE'
    ]
    return status[this.video.networkState]
  }

  /**
   * @type { boolean }
   */
  get paused () {
    return this.video.paused
  }

  /**
   * @type { number }
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
   */
  get readyState () {
    const status = [
      'HAVE_NOTHING',
      'HAVE_METADATA',
      'HAVE_CURRENT_DATA',
      'HAVE_FUTURE_DATA',
      'HAVE_ENOUGH_DATA']
    return status[this.video.readyState]
  }

  /**
   * @type { boolean }
   */
  get seekable () {
    return this.video.seekable
  }

  /**
   * @type { boolean }
   */
  get seeking () {
    return this.video.seeking
  }

  /**
   * @type { any }
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
   */
  get volume () {
    return this.video.volume
  }

  set volume (vol) {
    this.video.volume = vol
  }
}

export default Proxy
