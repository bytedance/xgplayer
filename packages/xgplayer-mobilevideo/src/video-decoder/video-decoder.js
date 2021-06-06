/**
 * @description with video element to play fmp4 videostream, and get the video RGB frame with requestAnimationFrame api.
 */
import { logger } from 'xgplayer-helper-utils'
import EventEmitter from 'eventemitter3'
import Events from '../events'

const DEFAULT_PLAYBACKRATE = 2
const CANVAS_COUNT = 45
const FRAME_DURATION = 35
const MAX_VIDEO_HEIGHT = 720

export default class VideoDecoder extends EventEmitter {
  constructor (config) {
    super()
    this.TAG = 'VideoDecoder'
    this._video = this._createVideo()
    this._IsInDecoding = false
    this._fps = 0
    // 记录requestAnimationFrame Id
    this._framId = null
    // 记录每个fmp4截取的图片数量
    this._screenShotNum = 0
    this._allPicNum = 0
    this._currentBlob = null
    this._basePTS = 0
    this._totleTime = 0
    this._isVideoONRun = true
    // 是否是第一个fmp4
    this.firstEmit = false
    this.ptsArray = []
    this._currentCanvasHeight = 0
    this._canvasList = []
    this._realFrameDuration = FRAME_DURATION
    this._maxVideoHeight = config.maxVideoHeight || MAX_VIDEO_HEIGHT
    this._minFPSTime = 0
    this._maxFPSTime = 0
    this._playFailed = false
    // this._isPhoneSafari = (Sniffer.os.isPhone && Sniffer.browser === 'safari')
    this._isPhoneSafari = false
    // console.error(this.TAG, '_isPhoneSafari', this._isPhoneSafari)
    this._createCanvasList()
    this._bindEvents()
  }

  _createCanvasList () {
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d', { alpha: false })
    // if (this._isPhoneSafari) {
    //   return
    // }
    for (let i = 0; i < CANVAS_COUNT; i++) {
      let { dom, ctx } = this._createCanvas()
      this._canvasList.push({ dom, ctx })
    }
  }
  _createCanvas () {
    let dom = document.createElement('canvas')
    let ctx = dom.getContext('2d', { alpha: false })
    return { dom, ctx }
  }

  _createVideo () {
    let video = document.createElement('video')
    video.setAttribute('muted', true)
    video.setAttribute('autoplay', true)
    video.setAttribute('controls', true)
    video.setAttribute('webkit-playsinline', true)
    video.setAttribute('playsinline', true)
    video.setAttribute('x5-video-player-type', 'h5')
    video.setAttribute('x5-video-player-type', 'h5-page')
    video.style.position = 'absolute'
    return video
  }
  _initVideo (info, time) {
    if (!info.blobUrl || typeof info.dts === 'undefined') {
      console.error(this.TAG, '_initVideo', 'input info is error, blobUrl:', info.blobUrl, 'dts:', info.dts)
      return
    }
    let blob = info.blobUrl
    this._currentBlob = blob
    this._basePTS = info.dts
    this._currentDuration = info.duration
    try {
      logger.log(this.TAG, '_initVideo, basePTS:', info.dts)
      this._setVideoSrc(blob, time)

      if (this._video.paused) {
        this._videoPlay('_initVideo')
      }
    } catch (e) {
      console.error(this.TAG, '_initVideo, load error', e)
    }
  }
  _setVideoSrc (src, time) {
    try {
      let video = this._video
      video.src = src
      video.load()
      video.playbackRate = DEFAULT_PLAYBACKRATE
    } catch (e) {
      console.error(this.TAG, '_setVideoSrc', e)
    }
  }
  _videoPlay (from) {
    let video = this._video
    logger.log(this.TAG, '_videoPlay, video is pause:', video.paused, from)

    if (video && video.paused) {
      let playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this._playFailed = false
            logger.log(this.TAG, '_videoPlay success')
          })
          .catch((error) => {
            // setTimeout(() => {
            console.error(this.TAG, '_videoPlay failed,', error.message)
            this._playFailed = true
            this.emit(Events.DECODE_EVENTS.PLAY_FAILED, this.firstEmit)
            // }, 2000)
          })
      }
    }
  }
  _removeEvents () {
    let video = this._video
    video.removeEventListener('playing', this._onPlaying.bind(this))
    video.removeEventListener('ended', this._onEnded.bind(this))
    video.removeEventListener('error', this._onError.bind(this))
    video.removeEventListener('loadeddata', this._onLoadeddata.bind(this))
    video.removeEventListener('timeupdate', this._onTimeUpdate.bind(this))
    // video.removeEventListener('seeked', () => {
    // console.error('seeked', this._vCurrentTime, this._basePTS)
    // })
  }
  _bindEvents () {
    let video = this._video
    if (!video) {
      console.error(this.TAG, '_bindEvents')
      return
    }
    // logger.log(this.TAG, '_bindEvents', 'add video events')
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this))
    video.addEventListener('playing', this._onPlaying.bind(this))
    video.addEventListener('ended', this._onEnded.bind(this))
    video.addEventListener('error', this._onError.bind(this))
    video.addEventListener('loadeddata', this._onLoadeddata.bind(this))
    video.addEventListener('timeupdate', this._onTimeUpdate.bind(this))
    video.addEventListener('pause', () => {
      // logger.log('pause')
      logger.log('on pause, currentTime, duration:', this._vCurrentTime, this._vDuration)
    })
    this.on('outputresolutionchange', this._onChange.bind(this))
    this.on('fpsreduce', (fps) => {
      // this._adaptFrameDuration(fps)
    })
  }
  _onTimeUpdate () {
    // logger.log('currentTime:', this._vCurrentTime)
    this._lastCurrentTime = this._vCurrentTime
  }

  _onVisibilityChange () {
    this._isVideoONRun = document.visibilityState === 'visible'
  }

  _onChange (width, height) {
    this._width = width
    this._height = height
  }
  _onPlaying () {
    // 上一个video没有正确结束
    if (this._IsInDecoding) {
      console.warn(this.TAG, '_onPlaying', 'last video not correct end')
      if (this._framId) {
        window.cancelAnimationFrame(this._framId)
        this._framId = null
      }
    }
    logger.log(this.TAG, '_onPlaying, video duration:', this._vDuration, 'currentTime:', this._vCurrentTime, '_lastPts:', this._lastPts)
    this._isInDecoding = true
    this._lastCurrentTime = this._vCurrentTime
    this.ptsArray = []
    this._getFrame()
  }
  _onEnded (e, from) {
    logger.log(
      this.TAG,
      '_onEnded',
      'current fmp4 duration is:',
      this._vDuration,
      '_isInDecoding:',
      this._isInDecoding,
      '_lastPts:',
      this._lastPts,
      '_realFrameDuration:',
      this._realFrameDuration,
      'from:', from
    )
    // 如果在_getFrame里执行了_onEnded方法，则ended事件则不在执行
    if (!this._isInDecoding) {
      return
    }

    this._isInDecoding = false
    this._lastMp4Duration = Math.min(this._vDuration, this._vCurrentTime)

    if (this._framId) {
      logger.log(this.TAG, '_onEnded', 'cancelAnimationFrame')
      window.cancelAnimationFrame(this._framId)
      this._framId = null
    }

    // 计算每一秒视频解码出来图片数量
    this._decodeFPS = parseInt(this._screenShotNum / (this._vDuration / 1000))

    this.emit('fps', this._screenShotNum, this._totleTime, this._vDuration, this._metaFPS, {
      height: this._currentCanvasHeight,
      relHeight: this._video.videoHeight
    })

    this._screenShotNum = 0
    this._allPicNum = 0
    this._totleTime = 0

    if (this._currentBlob) {
      URL.revokeObjectURL(this._currentBlob)
      this._currentBlob = null
      this._basePTS = 0
    }
    this.emit(Events.DECODE_EVENTS.FRAGMENT_END, this._decodeFPS, this._video.duration)
  }
  _onError () {
    this._isInDecoding = false
    let video = this._video
    console.error('video error:', video.error.code, video.error.message)
    this.emit('error', video.error, this.firstEmit)
    // return video.error
  }

  _onLoadeddata () {
    let video = this._video
    // 解决safari浏览器下，ended事件不触发问题（目前未得到验证）
    video.currentTime = 0.001
    // 首帧图片
    if (!this.firstEmit) {
      // 播放失败
      if (this._playFailed) {
        // chrome下，play失败，不能拿到首帧图片，需要把video加载到dom上，一段时间之后才能截取图片
        video.style.visibility = 'hidden'
        this.emit(Events.DECODE_EVENTS.APPEND_VIDEO, video)
        setTimeout(() => {
          logger.log(this.TAG, 'onloadeddata, setTimeout firstEmit:', this.firstEmit)
          this._getFirstFrame()
        }, 40)
      } else {
        logger.log(this.TAG, 'onloadeddata, firstEmit:', this.firstEmit)
        this._getFirstFrame()
      }
    }
  }
  _getFirstFrame () {
    let currentTime = this._vCurrentTime
    let pts = this._basePTS + currentTime
    let { imageData } = this._getImageData(pts)
    this.firstEmit = true
    this.emit(Events.DECODE_EVENTS.FIRST_FRAME, imageData, pts)
  }
  _getFrame () {
    let video = this._video
    let videoWidth = video.videoWidth
    let videoHeight = video.videoHeight
    this._allPicNum++
    if (!this._isInDecoding) {
      if (this._framId) {
        window.cancelAnimationFrame(this._framId)
        this._framId = null
      }
      return
    }

    if (videoWidth || videoHeight) {
      let currentTime = this._vCurrentTime
      let pts = this._basePTS + currentTime
      this.ptsArray.push(pts)
      // ended事件和该处代码只能执行一个，如果ended事件不触发，则进行兜底（safari下有时不触发ended事件）
      if (this._lastCurrentTime && (this._lastCurrentTime === this._vDuration)) {
        logger.log(this.TAG, '_getFrame, video ended, lastCurrentTime', this._lastCurrentTime, 'duration:', this._vDuration, 'isInDecoding:', this._isInDecoding)
        this._onEnded(null, 'getFrame')
      }

      if (this._lastPts) {
        if (pts <= this._lastPts) {
          this._framId = window.requestAnimationFrame(this._getFrame.bind(this))
          return
        }
      }

      if (this._lastPts && (pts - this._lastPts < this._realFrameDuration)) {
        // if (this._lastPts && pts - this._lastPts < parseInt(60)) {
        this._framId = window.requestAnimationFrame(this._getFrame.bind(this))
        return
      }
      this._screenShotNum++
      let imageData = null
      let res
      let sTime = Date.now()
      try {
        res = this._getImageData(pts)
        imageData = res.imageData
      } catch (e) {
        console.error(e, res, this._canvasList.length)
      }

      this._lastPts = pts
      // this._lastCurrentTime = this._vCurrentTime
      let eTime = Date.now()
      let cTime = eTime - sTime
      this._totleTime += cTime
      this.emit(Events.DECODE_EVENTS.DECODED, imageData, pts)
      this._framId = window.requestAnimationFrame(this._getFrame.bind(this))
      return
    }
    this._framId = window.requestAnimationFrame(this._getFrame.bind(this))
  }

  _getImageData () {
    let video = this._video
    let canvas
    let ctx
    let imageData
    let videoWidth = video.videoWidth
    let videoHeight = video.videoHeight
    let width = videoWidth
    let height = videoHeight

    if (this._width && this._height) {
      width = this._width
      height = this._height
    }
    // 最大不能超过720P
    if (height > this._maxVideoHeight) {
      height = this._maxVideoHeight
      width = parseInt(height * (videoWidth / videoHeight))
    }
    // if (this._isPhoneSafari) {
    //   canvas = this._canvas
    //   ctx = this._ctx
    // } else {
    imageData = this._canvasList.shift()
    if (!imageData) {
      console.warn(this.TAG, '_getImageData, _canvansList length is 0')
      imageData = this._createCanvas()
    }
    imageData.width = width
    imageData.height = height

    canvas = imageData.dom
    ctx = imageData.ctx
    // }

    this._currentCanvasHeight = height

    if (canvas.width !== width) {
      canvas.width = width
      canvas.height = height
    }
    try {
      // logger.log(this.TAG, '_getImageData', width, height, videoWidth, videoHeight)
      if (videoHeight && videoWidth && width && height) {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, width, height)
      }
      // if (this._isPhoneSafari) {
      //   imageData = ctx.getImageData(0, 0, width, height)
      // }
    } catch (e) {
      console.error(this.TAG, '_getImageData, drawImage:', e)
    }

    return { imageData }
  }

  _adaptFrameDuration (decodeFPS) {
    if (decodeFPS < 15) {
      this._minFPSTime++
    } else {
      this._minFPSTime = 0
    }

    if (decodeFPS > 17) {
      this._maxFPSTime++
    } else {
      this._maxFPSTime = 0
    }

    if (this._minFPSTime > 0 && this._decodeFPS < 15) {
      this._realFrameDuration -= 2
      if (this._realFrameDuration < 0) {
        this._realFrameDuration = 0
      }
      this._minFPSTime = 0
    }

    if (this._maxFPSTime > 0 && this._decodeFPS > 17) {
      this._realFrameDuration += 2
      this._maxFPSTime = 0
    }
    console.error('_realFrameDuration', this._realFrameDuration)
  }
  get _vDuration () {
    return parseInt(this._video.duration * 1000)
  }

  get _vCurrentTime () {
    return parseInt(this._video.currentTime * 1000)
  }
  _reset () {
    this._isInDecoding = false
    this._lastPts = 0
    this._screenShotNum = 0
    this._allPicNum = 0
    this._totleTime = 0
  }

  reStartDecode () {
    this._video.pause()
    this._reset()
    let blobUrl = this._currentBlob
    let dts = this._basePTS
    if (this._framId) {
      window.cancelAnimationFrame(this._framId)
      this._framId = null
    }
    this._initVideo({ blobUrl, dts })
  }

  doSeek (time) {
    if (this._isInDecoding) {
      if (time <= 0) {
        return
      }
      let seekTime = this._vCurrentTime / 1000 + time >= this._vDuration / 1000 ? this._vDuration / 1000 : this._vCurrentTime / 1000 + 1
      console.error('doSeek', seekTime)
      this._video.currentTime = seekTime
    }
  }
  pause () {
    if (this._isInDecoding) {
      // console.error('doPause')
      this._video.pause()
    }
  }
  play () {
    if (this._isInDecoding && this._video.paused) {
      logger.log('video play', this._vCurrentTime)
      return this._video.play()
    }
  }
  startDecode (info, metaFPS, startTime) {
    this._initVideo(info, startTime)
    this._metaFPS = metaFPS
  }
  stopDecode () {
    if (!this._video.paused) {
      this._video.pause()
      this._reset()
    }
  }
  canPlayType (codec) {
    return this._video.canPlayType(codec)
  }

  destroy () {
    this._removeEvents()
  }
  get videoWidth () {
    if (this._video) {
      return this._video.videoWidth
    }
    return 0
  }
  get videoHeight () {
    if (this._video) {
      return this._video.videoHeight
    }
    return 0
  }
}
