import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'
import util from './utils/util'
import Errors from './error'
import {URL_CHANGE, BUFFER_CHANGE, DESTROY} from './events'

class Proxy {
  constructor (options) {
    this._hasStart = false
    this._currentTime = 0
    this._duration = 0
    this.videoConfig = {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-playsinline': options.playsinline,
      'x5-video-player-type': options['x5-video-player-type'] || options['x5VideoPlayerType'],
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options['x5VideoPlayerFullscreen'],
      'x5-video-orientation': options['x5-video-orientation'] || options['x5VideoOrientation'],
      airplay: options['airplay'],
      'webkit-airplay': options['airplay'],
      tabindex: 2,
      mediaType: options.mediaType || 'video'
    }
    if (options.videoAttrbutes) {
      Object.keys(options.videoAttrbutes).map((key) => {
        this.videoConfig[key] = options.videoAttrbutes[key]
      })
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }
    this.video = util.createDom(this.videoConfig.mediaType, '', this.videoConfig, '')
    if (options.autoplay) {
      this.video.autoplay = true
      if (options.autoplayMuted) {
        this.video.muted = true
      }
    }

    EventEmitter(this)
    this._interval = {}
    this._initEvents()
  }

  _initEvents () {
    let lastBuffer = '0,0'
    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked',
      'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata'
    ].map((item) => {
      return {
        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`
      }
    })
    /**
     * 和video事件对应的on[EventKey]接口的触发
     * @param {String} funName
     */
    function _emitEvent (funName, player) {
      player[funName] && typeof player[funName] === 'function' && player[funName](player)
    }
    this.ev.forEach(item => {
      this.evItem = Object.keys(item)[0]
      let name = Object.keys(item)[0]
      const funName = item[name]
      this.video.addEventListener(Object.keys(item)[0], () => {
        if (name === 'error') {
          this.errorHandler(name)
          _emitEvent(funName, this)
        } else {
          this.emit(name, this)
          _emitEvent(funName, this)
        }

        if (name === 'timeupdate') {
          this._currentTime = this.video.currentTime
        }

        if (name === 'durationchange') {
          this._duration = this.video.duration
        }

        if (this.hasOwnProperty('_interval')) {
          if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
            clearInterval(this._interval['bufferedChange'])
            util.setInterval(this, 'bufferedChange', function () {
              let curBuffer = []
              for (let i = 0, len = this.video.buffered.length; i < len; i++) {
                curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)])
              }
              if (curBuffer.toString() !== lastBuffer) {
                lastBuffer = curBuffer.toString()
                this.emit(BUFFER_CHANGE, curBuffer)
              }
            }, 200)
          } else {
            if (name !== 'timeupdate') {
              util.clearInterval(this, 'bufferedChange')
            }
          }
        }
      }, false)
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
    this.pause()
    this.video.removeAttribute('src') // empty source
    this.video.load()
    this._currentTime = 0;
    this._duration = 0;
    for (let k in this._interval) {
      clearInterval(this._interval[k])
      this._interval[k] = null
    }
    this.emit(DESTROY)
    this.ev.forEach((item) => {
      const evName = Object.keys(item)[0]
      const evFunc = this[item[evName]]
      if (evFunc) {
        this.off(evName, evFunc)
      }
    });
    allOff(this)
  }

  play () {
    return this.video.play()
  }

  pause () {
    this.video.pause()
  }

  canPlayType (type) {
    return this.video.canPlayType(type)
  }

  getBufferedRange () {
    let range = [0, 0]
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
    return this._currentTime
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
    let status = [{
      en: 'MEDIA_ERR_ABORTED',
      cn: '取回过程被用户中止'
    }, {
      en: 'MEDIA_ERR_NETWORK',
      cn: '当下载时发生错误'
    }, {
      en: 'MEDIA_ERR_DECODE',
      cn: '当解码时发生错误'
    }, {
      en: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
      cn: '不支持音频/视频'
    }]
    return this.lang ? this.lang[status[err.code - 1].en] : status[err.code - 1].en
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
    let status = [{
      en: 'NETWORK_EMPTY',
      cn: '音频/视频尚未初始化'
    }, {
      en: 'NETWORK_IDLE',
      cn: '音频/视频是活动的且已选取资源，但并未使用网络'
    }, {
      en: 'NETWORK_LOADING',
      cn: '浏览器正在下载数据'
    }, {
      en: 'NETWORK_NO_SOURCE',
      cn: '未找到音频/视频来源'
    }]
    return this.lang ? this.lang[status[this.video.networkState].en] : status[this.video.networkState].en
  }

  get paused () {
    return this.video.paused
  }

  get playbackRate () {
    return this.video.playbackRate
  }

  set playbackRate (rate) {
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
    let status = [{
      en: 'HAVE_NOTHING',
      cn: '没有关于音频/视频是否就绪的信息'
    }, {
      en: 'HAVE_METADATA',
      cn: '关于音频/视频就绪的元数据'
    }, {
      en: 'HAVE_CURRENT_DATA',
      cn: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒'
    }, {
      en: 'HAVE_FUTURE_DATA',
      cn: '当前及至少下一帧的数据是可用的'
    }, {
      en: 'HAVE_ENOUGH_DATA',
      cn: '可用数据足以开始播放'
    }]
    return this.lang ? this.lang[status[this.video.readyState].en] : status[this.video.readyState]
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
    if (!this.ended) {
      this.emit(URL_CHANGE)
    }
    this.video.pause()
    this._currentTime = 0;
    this._duration = 0;
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
