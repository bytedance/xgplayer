import EventEmitter from 'event-emitter'
import { findDom, createDom, hasClass, removeClass, _clearInterval, _setInterval, on, once, getBuffered2, setStyle } from './utils/util'
import Errors from './error'

class Proxy {
  constructor (options) {
    this._hasStart = false
    this.videoConfig = {
      controls: !!options.isShowControl,
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
    if (options.muted) {
      this.videoConfig.muted = 'muted'
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop'
    }
    let textTrackDom = ''
    this.textTrackShowDefault = true
    if (options.nativeTextTrack && Array.isArray(options.nativeTextTrack)) {
      if (options.nativeTextTrack.length > 0 && !options.nativeTextTrack.some(track => { return track.default })) {
        options.nativeTextTrack[0].default = true
        this.textTrackShowDefault = false
      }
      options.nativeTextTrack.some(track => {
        if (track.src && track.label && track.default) {
          textTrackDom += `<track src="${track.src}" `
          if (track.kind) {
            textTrackDom += `kind="${track.kind}" `
          }
          textTrackDom += `label="${track.label}" `
          if (track.srclang) {
            textTrackDom += `srclang="${track.srclang}" `
          }
          textTrackDom += `${track.default ? 'default' : ''}>`
          return true
        }
      })
      this.videoConfig.crossorigin = 'anonymous'
    }
    if (options.textTrackStyle) {
      let style = document.createElement('style')
      this.textTrackStyle = style
      document.head.appendChild(style)
      let styleStr = ''
      for (let index in options.textTrackStyle) {
        styleStr += `${index}: ${options.textTrackStyle[index]};`
      }
      let wrap = options.id ? `#${options.id}` : (options.el.id ? `#${options.el.id}` : `.${options.el.className}`)
      if (style.sheet.insertRule) {
        style.sheet.insertRule(`${wrap} video::cue { ${styleStr} }`, 0)
      } else if (style.sheet.addRule) {
        style.sheet.addRule(`${wrap} video::cue`, styleStr)
      }
    }
    let el = options.el ? options.el : findDom(document, `#${options.id}`)
    const XgVideoProxy = this.constructor.XgVideoProxy
    if(XgVideoProxy && this.videoConfig.mediaType === XgVideoProxy.mediaType) {
      this.video = new XgVideoProxy(el, options)
    } else {
      this.video = createDom(this.videoConfig.mediaType, textTrackDom, this.videoConfig, '')
    }
    if (options.videoStyle) {
      Object.keys(options.videoStyle).forEach(key => {
        setStyle(this.video, key, options.videoStyle[key])
      })
    }
    if (!this.textTrackShowDefault && textTrackDom) {
      let trackDoms = this.video.getElementsByTagName('Track')
      trackDoms[0].track.mode = 'hidden'
    }
    if (options.autoplay) {
      this.video.autoplay = true
      if (options.autoplayMuted) {
        this.video.muted = true
      }
    }

    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'progress', 
      'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadedmetadata', 'loadeddata', 'loadstart'
    ].map((item) => {
      return {
        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`
      }
    })
    EventEmitter(this)

    this._interval = {}
    let lastBuffer = '0,0'
    let self = this

    const defaultVideoEventHandler = name => {
      // fix when video destroy called and video reload
      if (!this) {
        return
      }
      if (name === 'play') {
        this.hasStart = true
      } else if (name === 'canplay') {
        removeClass(this.root, 'xgplayer-is-enter')
      } else if (name === 'waiting') {
        this.inWaitingStart = new Date().getTime()
      } else if (name === 'playing') {
        removeClass(this.root, 'xgplayer-is-enter')
        if (this.inWaitingStart) {
          this.inWaitingStart = undefined
        }
      }
      if (name === 'error') {
        // process the error
        this._onError(name)
      } else {
        this.emit(name, this)
      }

      if (this.hasOwnProperty('_interval')) {
        if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
          _clearInterval(this, 'bufferedChange')
          _setInterval(this, 'bufferedChange', function () {
            if (this.video && this.video.buffered) {
              let curBuffer = []
              for (let i = 0, len = this.video.buffered.length; i < len; i++) {
                curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)])
              }
              if (curBuffer.toString() !== lastBuffer) {
                lastBuffer = curBuffer.toString()
                this.emit('bufferedChange', curBuffer)
              }
            }
          }, 200)
        } else {
          if (name !== 'timeupdate') {
            _clearInterval(this, 'bufferedChange')
          }
        }
      }
    }

    const videoEventHandler = name => {
      if(options.videoEventMiddleware && typeof options.videoEventMiddleware[name] === 'function') {
        options.videoEventMiddleware[name].call(this, this, name, defaultVideoEventHandler)
      } else {
        defaultVideoEventHandler.call(this, name);
      }
    }

    this.ev.forEach(item => {
      self.evItem = Object.keys(item)[0]
      let name = Object.keys(item)[0]
      self.video.addEventListener(Object.keys(item)[0], videoEventHandler.bind(self, name))
    })
  }
  /**
   * 错误监听处理逻辑抽离
   */
  _onError (name) {
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
    if (typeof bool === 'boolean' && bool === true && !this._hasStart) {
      this._hasStart = true
      this.emit('hasstart')
    }
  }
  destroy () {
    if (this.textTrackStyle) {
      this.textTrackStyle.parentNode.removeChild(this.textTrackStyle)
    }
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
  getBufferedRange (buffered) {
    let range = [0, 0]
    let video = this.video
    if(!buffered) buffered = video.buffered
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
  proxyOn (event, fn) {
    on(this, event, fn, 'destroy')
  }
  proxyOnce (event, fn) {
    once(this, event, fn, 'destroy')
  }
  set autoplay (isTrue) {
    if(this.video) {
      this.video.autoplay = isTrue
    }
  }
  get autoplay () {
    if(this.video) {
      return this.video.autoplay
    } else {
      return false
    }
  }
  get buffered () {
    if(this.video) {
      return this.video.buffered
    } else {
      return undefined
    }
  }
  get buffered2 () {
    return getBuffered2(this.video.buffered)
  }
  get crossOrigin () {
    if(this.video) {
      return this.video.crossOrigin
    } else {
      return false
    }
  }
  set crossOrigin (isTrue) {
    if(this.video) {
      this.video.crossOrigin = isTrue
    }
  }
  get currentSrc () {
    if(this.video) {
      return this.video.currentSrc
    } else {
      return undefined
    }
  }
  get currentTime () {
    if(this.video) {
      return this.video.currentTime || 0
    } else {
      return 0
    }
  }
  set currentTime (time) {
    if (typeof isFinite === 'function' && !isFinite(time)) return
    if (hasClass(this.root, 'xgplayer-ended')) {
      this.once('playing', () => { this.video.currentTime = time })
      this.replay()
    } else {
      this.video.currentTime = time
    }
    this.emit('currentTimeChange')
  }
  get defaultMuted () {
    if(this.video) {
      return this.video.defaultMuted
    } else {
      return false
    }
  }
  set defaultMuted (isTrue) {
    if(this.video) {
      this.video.defaultMuted = isTrue
    }
  }
  get duration () {
    if(this.config.duration) {
      if(this.video) return Math.min(this.config.duration, this.video.duration)
      else return this.config.duration
    }
    if (!this.video) return null
    return this.video.duration
  }
  get ended () {
    if(this.video) {
      return this.video.ended || false
    } else {
      return true
    }
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
    if(this.video) {
      return this.video.loop
    } else {
      return false
    }
  }
  set loop (isTrue) {
    if(this.video) {
      this.video.loop = isTrue
    }
  }
  get muted () {
    if(this.video) {
      return this.video.muted
    } else {
      return false
    }
  }
  set muted (isTrue) {
    if(this.video) {
      this.video.muted = isTrue
    }
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
    if(this.video) {
      return this.video.paused
    } else {
      return false
    }
  }
  get playbackRate () {
    if(this.video) {
      return this.video.playbackRate
    } else {
      return 1
    }
  }
  set playbackRate (rate) {
    if(this.video) {
      this.video.playbackRate = rate
    }
  }
  get played () {
    if(this.video) {
      return this.video.played
    } else {
      return undefined
    }
  }
  get preload () {
    if(this.video) {
      return this.video.preload
    } else {
      return false
    }
  }
  set preload (isTrue) {
    if(this.video) {
      this.video.preload = isTrue
    }
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
    if(this.video) {
      return this.video.seekable
    } else {
      return false
    }
  }
  get seeking () {
    if(this.video) {
      return this.video.seeking
    } else {
      return false
    }
  }
  get src () {
    if(this.video) {
      return this.video.src
    } else {
      return undefined
    }
  }
  set src (url) {
    if (!hasClass(this.root, 'xgplayer-ended')) {
      this.emit('urlchange', this.video.src)
    }
    this.autoplay = true
    this.video.pause()
    this.video.src = url
    this.emit('srcChange')
  }
  set poster (posterUrl) {
    let poster = findDom(this.root, '.xgplayer-poster')
    if (poster) {
      poster.style.backgroundImage = `url(${posterUrl})`
    }
  }
  get volume () {
    if(this.video) {
      return this.video.volume
    } else {
      return 1
    }
  }
  set volume (vol) {
    if(this.video) {
      this.video.volume = vol
    }
  }
  get fullscreen () {
    return hasClass(this.root, 'xgplayer-is-fullscreen') || hasClass(this.root, 'xgplayer-fullscreen-active')
  }
  get bullet () {
    return findDom(this.root, 'xg-danmu') ? hasClass(findDom(this.root, 'xg-danmu'), 'xgplayer-has-danmu') : false
  }
  get textTrack () {
    return hasClass(this.root, 'xgplayer-is-textTrack')
  }
  get pip () {
    return hasClass(this.root, 'xgplayer-pip-active')
  }
}

export default Proxy
