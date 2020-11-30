import EventEmitter from 'event-emitter'
import util from './utils/util'
import Errors from './error'

class Proxy {
  constructor (options) {
    this.logParams = {
      bc: 0,
      bu_acu_t: 0,
      played: []
    }
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
    if (options.textTrack && Array.isArray(options.textTrack)) {
      if (options.textTrack.length > 0 && !options.textTrack.some(track => { return track.default })) {
        options.textTrack[0].default = true
        this.textTrackShowDefault = false
      }
      options.textTrack.some(track => {
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
    this.video = util.createDom(this.videoConfig.mediaType, textTrackDom, this.videoConfig, '')
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
    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked',
      'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata', 'loadstart'
    ].map((item) => {
      return {
        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`
      }
    })
    EventEmitter(this)

    this._interval = {}
    let lastBuffer = '0,0'
    let self = this

    this.ev.forEach(item => {
      self.evItem = Object.keys(item)[0]
      let name = Object.keys(item)[0]
      self.video.addEventListener(Object.keys(item)[0], function () {
        // fix when video destroy called and video reload
        if (!self || !self.logParams) {
          return
        }
        if (name === 'play') {
          self.hasStart = true
        } else if (name === 'canplay') {
          util.removeClass(self.root, 'xgplayer-is-enter')
        } else if (name === 'waiting') {
          self.logParams.bc++
          self.inWaitingStart = new Date().getTime()
        } else if (name === 'playing') {
          util.removeClass(self.root, 'xgplayer-is-enter')
          if (self.inWaitingStart) {
            self.logParams.bu_acu_t += new Date().getTime() - self.inWaitingStart
            self.inWaitingStart = undefined
          }
        } else if (name === 'loadeddata') {
          self.logParams.played.push({
            begin: 0,
            end: -1
          })
        } else if (name === 'seeking') {
          self.logParams.played.push({
            begin: self.video.currentTime,
            end: -1
          })
        } else if (self && self.logParams && self.logParams.played && name === 'timeupdate') {
          if (self.logParams.played.length < 1) {
            self.logParams.played.push({
              begin: self.video.currentTime,
              end: -1
            })
          }
          self.logParams.played[self.logParams.played.length - 1].end = self.video.currentTime
        }
        if (name === 'error') {
          // process the error
          self._onError(name)
        } else {
          self.emit(name, self)
        }

        if (self.hasOwnProperty('_interval')) {
          if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
            clearInterval(self._interval['bufferedChange'])
            util.setInterval(self, 'bufferedChange', function () {
              if (self.video && self.video.buffered) {
                let curBuffer = []
                for (let i = 0, len = self.video.buffered.length; i < len; i++) {
                  curBuffer.push([self.video.buffered.start(i), self.video.buffered.end(i)])
                }
                if (curBuffer.toString() !== lastBuffer) {
                  lastBuffer = curBuffer.toString()
                  self.emit('bufferedChange', curBuffer)
                }
              }
            }, 200)
          } else {
            if (name !== 'timeupdate') {
              util.clearInterval(self, 'bufferedChange')
            }
          }
        }
      }, false)
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
  get currentTime () {
    if(this.video) {
      return this.video.currentTime || 0
    } else {
      return 0
    }
  }
  set currentTime (time) {
    if (typeof isFinite === 'function' && !isFinite(time)) return
    if (util.hasClass(this.root, 'xgplayer-ended')) {
      this.once('playing', () => { this.video.currentTime = time })
      this.replay()
    } else {
      this.video.currentTime = time
    }
    this.emit('currentTimeChange')
  }
  get defaultMuted () {
    return this.video.defaultMuted
  }
  set defaultMuted (isTrue) {
    this.video.defaultMuted = isTrue
  }
  get duration () {
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
    let self = this
    if (!util.hasClass(this.root, 'xgplayer-ended')) {
      this.emit('urlchange', JSON.parse(JSON.stringify(self.logParams)))
    }
    this.logParams = {
      bc: 0,
      bu_acu_t: 0,
      played: [],
      pt: new Date().getTime(),
      vt: new Date().getTime(),
      vd: 0
    }
    this.video.pause()
    this.video.src = url
    this.emit('srcChange')
    this.logParams.playSrc = url
    this.logParams.pt = new Date().getTime()
    this.logParams.vt = this.logParams.pt
    function ldFunc () {
      self.logParams.vt = new Date().getTime()
      if (self.logParams.pt > self.logParams.vt) {
        self.logParams.pt = self.logParams.vt
      }
      self.logParams.vd = self.video.duration
      self.off('loadeddata', ldFunc)
    }
    this.once('loadeddata', ldFunc)
  }
  set poster (posterUrl) {
    let poster = util.findDom(this.root, '.xgplayer-poster')
    if (poster) {
      poster.style.backgroundImage = `url(${posterUrl})`
    }
  }
  get volume () {
    return this.video.volume
  }
  set volume (vol) {
    this.video.volume = vol
  }
  get fullscreen () {
    return util.hasClass(this.root, 'xgplayer-is-fullscreen') || util.hasClass(this.root, 'xgplayer-fullscreen-active')
  }
  get bullet () {
    return util.findDom(this.root, 'xg-danmu') ? util.hasClass(util.findDom(this.root, 'xg-danmu'), 'xgplayer-has-danmu') : false
  }
  get textTrack () {
    return util.hasClass(this.root, 'xgplayer-is-textTrack')
  }
  get pip () {
    return util.hasClass(this.root, 'xgplayer-pip-active')
  }
}

export default Proxy
