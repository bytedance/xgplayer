import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'
import Util from './utils/util'
import Sniffer from './utils/sniffer'
import Errors from './error'
import {URL_CHANGE, DESTROY} from './events'

const VIDEO_EVENTS = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked',
  'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange',
  'loadeddata', 'loadstart', 'emptied', 'ratechange', 'progress', 'stalled', 'suspend', 'abort']

function getHandler (eventName, player) {
  const funName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
  if (player[funName] && typeof player[funName] === 'function') {
    player.on(eventName, player[funName])
  }
  return (e) => {
    let eventKey = eventName
    e.player = player

    if (eventKey === 'timeupdate') {
      player._currentTime = player.video && player.video.currentTime
    }

    if (eventName === 'durationchange') {
      player._duration = player.video.duration
    }

    if (eventKey === 'error') {
      player.errorHandler(eventKey)
    } else {
      player.emit(eventKey, e)
    }
  }
}

class Proxy {
  constructor (options) {
    this._hasStart = false
    this._currentTime = 0
    this._duration = 0
    this.videoConfig = Object.assign({}, {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'x5-playsinline': options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options['x5VideoPlayerFullscreen'],
      'x5-video-orientation': options['x5-video-orientation'] || options['x5VideoOrientation'],
      airplay: options['airplay'],
      'webkit-airplay': options['airplay'],
      tabindex: 2,
      mediaType: options.mediaType || 'video'
    }, options.videoConfig, options.videoAttrbutes);
    /**
     * @description 微信内部同层播放兼容
     * x5-playsinline和x5-video-player-type互斥，只需要存在一个即可
     * @doc https://x5.tencent.com/docs/video.html
     */
    const playerType = options['x5-video-player-type'] || options['x5VideoPlayerType']
    if (Sniffer.isWeixin && Sniffer.os.isAndroid && playerType) {
      this.videoConfig['x5-video-player-type'] = playerType
      delete this.videoConfig['playsinline']
      delete this.videoConfig['webkit-playsinline']
      delete this.videoConfig['x5-playsinline']
    }

    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }
    if (options.defaultPlaybackRate) {
      this.videoConfig.defaultPlaybackRate = options.defaultPlaybackRate
    }

    this.video = Util.createDom(this.videoConfig.mediaType, '', this.videoConfig, '')
    if (options.autoplayMuted) {
      this.video.muted = true
    }
    if (options.autoplay) {
      this.video.autoplay = true
    }

    EventEmitter(this)
    this._interval = {}
    this.attachVideoEvents()
  }

  attachVideoEvents (video) {
    if (!this.evHandlers) {
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
   * 解除video事件回调
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
   * 错误监听处理逻辑抽离
   */
  errorHandler (name) {
    if (this.video && this.video.error) {
      this.emit(name, new Errors('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src,
        this.ended, {
          line: 162,
          msg: this.error,
          handle: 'Constructor'
        }, this.video.error.code, this.video.error))
    }
  }

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
      this.video.load()
    }
    this._currentTime = 0;
    this._duration = 0;
    for (let k in this._interval) {
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

  play () {
    return this.video ? this.video.play() : null
  }

  pause () {
    this.video && this.video.pause()
  }

  canPlayType (type) {
    return this.video.canPlayType(type)
  }

  getBufferedRange () {
    let range = [0, 0]
    if (!this.video) {
      return range
    }
    let video = this.video
    let buffered = video.buffered
    let currentTime = video.currentTime
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

  set autoplay (isTrue) {
    this.video.autoplay = isTrue
  }

  get autoplay () {
    return this.video.autoplay
  }

  get buffered () {
    return this.video.buffered
  }

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
      if (_buffered.start(i) <= this.currentTime && _buffered.end(i) >= this.currentTime) {
        return {
          start: _buffered.start(i),
          end: _buffered.end(i)
        }
      }
    }
    return ret
  }

  get crossOrigin () {
    return this.video.crossOrigin
  }

  set crossOrigin (isTrue) {
    this.video.crossOrigin = isTrue
  }

  get currentSrc () {
    return this.video.currentSrc
  }

  set currentSrc (src) {
    this.video.currentSrc = src
  }

  get currentTime () {
    return this.video.currentTime || this._currentTime
  }

  set currentTime (time) {
    this.video.currentTime = time
  }

  get defaultMuted () {
    return this.video.defaultMuted
  }

  set defaultMuted (isTrue) {
    this.video.defaultMuted = isTrue
  }

  get duration () {
    return this._duration
  }

  get ended () {
    return this.video.ended
  }

  get error () {
    let err = this.video.error
    if (!err) {
      return null
    }
    let status = [
      'MEDIA_ERR_ABORTED',
      'MEDIA_ERR_NETWORK',
      'MEDIA_ERR_DECODE',
      'MEDIA_ERR_SRC_NOT_SUPPORTED'
    ]
    return status[err.code - 1]
  }

  get loop () {
    return this.video.loop
  }

  set loop (isTrue) {
    this.video.loop = isTrue
  }
  get muted () {
    return this.video.muted
  }
  set muted (isTrue) {
    this.video.muted = isTrue
  }
  get networkState () {
    let status = [
      'NETWORK_EMPTY',
      'NETWORK_IDLE',
      'NETWORK_LOADING',
      'NETWORK_NO_SOURCE'
    ]
    return status[this.video.networkState]
  }

  get paused () {
    return this.video.paused
  }

  get playbackRate () {
    return this.video.playbackRate
  }

  set playbackRate (rate) {
    this.video.defaultPlaybackRate = rate
    this.video.playbackRate = rate
  }

  get played () {
    return this.video.played
  }

  get preload () {
    return this.video.preload
  }

  set preload (isTrue) {
    this.video.preload = isTrue
  }

  get readyState () {
    let status = [
      'HAVE_NOTHING',
      'HAVE_METADATA',
      'HAVE_CURRENT_DATA',
      'HAVE_FUTURE_DATA',
      'HAVE_ENOUGH_DATA']
    return status[this.video.readyState]
  }

  get seekable () {
    return this.video.seekable
  }

  get seeking () {
    return this.video.seeking
  }

  get src () {
    return this.video.src
  }

  set src (url) {
    this.emit(URL_CHANGE, url)
    // this.video.pause()
    this._currentTime = 0;
    this._duration = 0;

    if (/^blob/.test(this.video.currentSrc)) { // has transmuxer core
      this.onWaiting();
      return;
    }
    this.video.src = url
  }

  get volume () {
    return this.video.volume
  }

  set volume (vol) {
    this.video.volume = vol
  }
}

export default Proxy
