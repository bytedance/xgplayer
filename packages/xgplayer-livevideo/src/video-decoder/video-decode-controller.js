import { logger, EVENTS } from 'xgplayer-helper-utils'
import EventEmitter from 'eventemitter3'
import Events from '../events'
import { Mp4Box } from 'xgplayer-helper-transmuxers'

import VideoDecoder from './video-decoder'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const MAX_FRAMESIZE = 40
const MIN_FRAMESIZE = 25
const DEFAULT_FPS = 15
const LEVELS = [
  { base: 720, level: 1 },
  { base: 540, level: 2 },
  { base: 360, level: 3 }
]

export default class VideoDecoderController extends EventEmitter {
  constructor (config, parent) {
    super()
    this.TAG = 'VideoDecoderController'
    this._decoder = new VideoDecoder(config)
    this._remux = new Mp4Box({ videoMeta: null, audioMeta: null, curTime: 0 })
    this._bindEvents()
    this._isInit = false
    this._isDataReady = false
    // 当前解码器的状态
    this._ready = false
    this._blobURLList = []
    this._isInDecoding = false
    this._mediaSegmentReady = false
    this._parent = parent
    this._isDecodePause = false
    this._playSuccess = true
    this._isVideoOnRun = true
    this._startDts = 0
    this._fDuration = 0
    this._minFPSTime = 0
    this._lastPts = 0
    this._frameLengthPerFragment = 0
    this._gopBufferLength = 0
    this._maxGopDuration = 0
    this._minGopDuration = 0
    // -1表示使用的是原始分辨率
    this._currentLevel = -1
    this._endLevel = config.endLevel || 2
    // 记录当前每个fmp4的duration
    this.currentFragmentDuration = 0
    this._handleKeyFrameVideo = this._handleKeyFrameVideo.bind(this)
  }

  _bindEvents () {
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.APPEND_VIDEO, this._onAppendVideo.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.PLAY_FAILED, this._onPlayFailed.bind(this))
    this._decoder.on('error', this._onError.bind(this))
    // 每解码一张图片，触发一次
    this._decoder.on(Events.DECODE_EVENTS.DECODED, this._onDecoded.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.FIRST_FRAME, this._onFirstFrame.bind(this))
    // 一个fmp4分段解码完成，触发一次
    this._decoder.on(Events.DECODE_EVENTS.FRAGMENT_END, this._onFragmentEnd.bind(this))
    this._decoder.on('fps', (...args) => {
      // logger.log('dtime')
      let pars = [this._metaFPS, ...args, this._frameLengthPerFragment]
      this.emit('fps', ...pars)
    })
    this.on('keyFrame', this._handleKeyFrameVideo)
    this._remux.on('TRACK_REMUXED', this._onRemuxed.bind(this))
  }

  _onRemuxed (type, mp4) {
    let blobUrl = this._createBlobURL(mp4)
    let info = {
      blobUrl,
      dts: this.currentFragmentDts,
      duration: this.currentFragmentDuration,
      frameDuration: Math.floor(1000 / this._metaFPS)
    }
    this._recordGopDuration(this.currentFragmentDuration)
    this._pushBlob(info)
    logger.log(this.TAG, '_onRemuxed', 'maxgopduration:', this._maxGopDuration, '_gopBufferLength:', this._gopBufferLength)
    if (!this._isDataReady && this._gopBufferLength >= this._maxGopDuration) {
      this._checkDataReady()
    }
  }

  _onPlayFailed (firstEmit) {
    this._isInDecoding = false
    this._parent.emit(Events.DECODE_EVENTS.PLAY_FAILED, firstEmit)
  }

  _onAppendVideo (video) {
    this._parent.emit(Events.DECODE_EVENTS.APPEND_VIDEO, video)
  }

  _onVisibilityChange () {
    this._isVideoOnRun = document.visibilityState === 'visible'
    // console.warn('page _onVisibilityChange', this._isVideoOnRun)
  }

  _onDecoded (imageData, pts) {
    this._frameLengthPerFragment++
    let frameInfo = this._buildFrameInfo(imageData, pts)
    this._parent.emit(Events.DECODE_EVENTS.DECODED, frameInfo)
    this._lastPts = pts
  }

  _onFirstFrame (frame, pts) {
    let frameInfo = this._buildFrameInfo(frame, pts)
    this._parent.emit(Events.DECODE_EVENTS.FIRST_FRAME, frameInfo)
  }

  _onFragmentEnd (decodeFPS, duration) {
    logger.log(this.TAG, '_onFragmentEnd ,_isDecodePause:', this._isDecodePause, 'decodeFPS:', decodeFPS)
    if (decodeFPS) {
      this._reduceResolution(decodeFPS)
    }
    this._isInDecoding = false
    this._inDecodeId = -1
    this._currentInfo = null
    this._frameLengthPerFragment = 0
    // logger.log(this.TAG, '_onFragmentEnd _blobURLList length:', this._getBlobLength(), '_isDecodePause:', this._isDecodePause, 'inVideoOnRun:', this._isVideoOnRun)
    if (this._getBlobLength() && !this._isDecodePause) {
      this.startDecode()
    } else {
      this.loadNextHandle = setInterval(() => {
        if (this._getBlobLength() && !this._isDecodePause && this._isVideoOnRun && !this._isInDecoding) {
          logger.log(this.TAG, '_onFragmentEnd, setInterval start next mp4 decode')
          this.startDecode()
          clearInterval(this.loadNextHandle)
        }
      })
    }
  }

  _onError (error, firstEmit) {
    this._isInDecoding = false
    this._parent.emit('error', error, firstEmit)
  }

  _checkReady () {
    if (this._isDataReady && this._isInit) {
      // 解码器准备完毕
      this.ready = true
      logger.log(this.TAG, 'checkReady trigger ready')
      this._parent.emit(Events.DECODE_EVENTS.READY)
    }
  }

  /**
   * 是否有解码数据，需要initSegment和mediaSegment都有数据，才能拼装成一个fmp4
   */
  _checkDataReady () {
    this._isDataReady = true
    this._checkReady()
  }

  // 判断解码速度，是否降低分辨率
  _reduceResolution (decodeFPS) {
    logger.log(this.TAG, '_reduceResolution', 'currentLevel:', this._currentLevel, 'endLevel:', this._endLevel)
    if (decodeFPS && decodeFPS < DEFAULT_FPS) {
      this._minFPSTime++
      this._decoder.emit('fpsreduce', decodeFPS)
    } else {
      this._minFPSTime = 0
    }

    if (this._currentLevel >= this._endLevel) {
      logger.log(this.TAG, '_reduceResolution', 'trigger DECODE_LOW_FPS')
      this._parent.emit(Events.VIDEO.DECODE_LOW_FPS)
      return
    }

    // 连续5次fps小于DEFAULT_FPS
    if (this._minFPSTime > 5) {
      let videoWidth = this._videoWidth
      let videoHeight = this._videoHeight
      let levelInfo = null
      levelInfo = this._findLevel(videoHeight, this._currentLevel)
      if (levelInfo) {
        this._currentLevel = levelInfo.level
        this.width = levelInfo.base * (videoWidth / videoHeight)
        this.height = levelInfo.base
        this._decoder.emit('outputresolutionchange', this.width, this.height)
      }
      this._minFPSTime = 0
    }
  }

  _findLevel (pix, currentLevel) {
    let level = LEVELS.find((item) => {
      return item.base < pix && item.level > currentLevel
    })
    return level
  }

  _getVideoSource () {
    let preSourceBuffer = this._remux._context.getInstance('PRE_SOURCE_BUFFER')
    let source = preSourceBuffer.getSource('video')
    return source
  }

  _remuxMetaData () {
    if (this.remux) {
      logger.log(this.TAG, '_remuxMetaData, start REMUX_METADATA')
      this.remux.emit(REMUX_EVENTS.REMUX_METADATA, 'video')
    }
  }

  _buildFrameInfo (rgb, pts) {
    try {
      let width = rgb.width
      let height = rgb.height
      let yLinesize = width
      let uvLinesize = width / 2
      let msg = 'DECODED'
      let info = {
        baseDts: undefined,
        dts: pts,
        gopId: 0,
        isGop: undefined,
        key: false,
        pts: pts
      }
      let buffer = rgb
      let type = 'rgb'
      return {
        msg,
        width,
        height,
        buffer,
        yLinesize,
        uvLinesize,
        info,
        type
      }
    } catch (e) {
      logger.log(this.TAG, e)
    }
  }

  _pushBlob (info) {
    logger.log('push blob', info.dts, info.duration)
    if (info && info.duration) {
      // 记录生成的fmp4的时长，有些视频gop时长不稳定，需要fmp4的时长大于maxGopDuration.才能开始播放
      this._gopBufferLength += info.duration
    }
    this._blobURLList.push(info)
  }

  _shiftBlob () {
    let blobInfo = this._blobURLList.shift()
    if (blobInfo && blobInfo.duration) {
      this._gopBufferLength -= blobInfo.duration
    }
    return blobInfo
  }

  _filterBlob (audioDTS) {
    this._blobURLList = this._blobURLList.filter((item) => {
      if (item.dts < audioDTS) {
        URL.revokeObjectURL(item.blobUrl)
        if (item.duration) {
          this._gopBufferLength -= item.duration
        }
      }
      return item.dts >= audioDTS
    })
  }

  _emptyBlobList () {
    this._blobURLList = []
    this._gopBufferLength = 0
  }

  _getBlobLength () {
    return this._blobURLList.length
  }

  _handleKeyFrameVideo (pts) {
    try {
      // const { videoTrack } = this._remux._context.getInstance('TRACKS')
      let samples = this._parent._timeRange.frames || []
      if (!samples.length) {
        return
      }
      // let samples = videoTrack.samples || []
      let startDts = samples[0].dts
      let endDts = samples[samples.length - 1].dts
      let delay = startDts - this.endDts
      logger.log(this.TAG, '_handleKeyFrameVideo', 'startDts:', startDts, 'endDts:', endDts, 'samples length:', samples.length)
      if (this.endDts && delay > Math.floor(1000 / this._metaFPS) + 1) {
        logger.log(this.TAG, '_handleKeyFrame, keyFrame dts:', startDts, 'sample length:', samples.length, 'endDts:', endDts, 'delay:', delay)
      }
      // let timeScale = (videoTrack && videoTrack.meta.timeScale) || 1000
      // 每个gop小于2s，则不remuxe
      let gopDuration = endDts - startDts

      if (!this._fDuration) {
        this._fDuration = gopDuration
      }
      if (gopDuration < 2000) {
        logger.log(
          this.TAG,
          '_handleKeyFrame gopDuration :',
          gopDuration,
          'sample length:',
          samples.length,
          'gopStartDts:',
          startDts,
          'gopEndDts:',
          endDts
        )

        return
      }

      if (!this.firstDts) {
        this.firstDts = samples[0].dts
      }
      this.currentFragmentDts = samples[0].dts
      this.currentFragmentDuration = this._getFragmentDuration(samples)
      this.endDts = endDts

      if (this.currentFragmentDts < this._startDts) {
        console.warn(this.TAG, '_handleKeyFrameVideo', 'currentFragmentDts < this._startDts', this.currentFragmentDts, this._startDts)
        samples = []
        return
      }

      // 更新remux的_videoDtsBase，保证每个gop生成的fragment时间戳从0开始
      // this._remux.remuxer.videoDtsBase = samples[0].dts
      // 开始remux fmp4的mdat
      // this.remux.emit(REMUX_EVENTS.REMUX_MEDIA)
      this.startRemux(samples)
      samples = []
    } catch (e) {
      console.error(this.TAG, '_handleKeyFrameVideo', e)
    }
  }

  // 通过每个gop的duration进行累加，有可能多个gop不连续，计算fragment的duration不准确
  _getFragmentDuration (samples) {
    let duration = 0
    let position = 0
    if (!samples[0].isKeyframe) {
      console.error(this.TAG, '_getFragmentDuration', 'gop firstFrame is not keyframe')
    }
    samples.forEach((item, index) => {
      if (item.isKeyframe && index) {
        duration += (samples[index - 1].dts - samples[position].dts)
        position = index
      }
    })
    duration += samples[samples.length - 1].dts - samples[position].dts
    return duration
  }

  _createBlobURL (buffer) {
    if (!buffer) {
      return
    }
    let blob = new window.Blob([buffer.buffer], {
      type: 'video/mp4'
    })
    return window.URL.createObjectURL(blob)
  }

  _recordGopDuration (gopDuration) {
    let duration = gopDuration

    if (!this._minGopDuration) {
      this._minGopDuration = duration
    }

    if (duration > this._maxGopDuration) {
      this._maxGopDuration = duration
    }

    if (duration < this._minGopDuration) {
      this._minGopDuration = duration
    }
  }

  checkMaxFrames (num) {
    if (typeof num === 'number') {
      // 根据解码出来的图片帧数量，来决定是否暂停解码
      this._isDecodePause = num > MAX_FRAMESIZE
      if (this._playSuccess && this._isDecodePause) {
        this._decoder.pause()
      }
    }
  }

  checkMinFrames (num) {
    if (typeof num === 'number') {
      // 根据解码出来的图片帧数量，来决定是否暂停解码
      this._isDecodePause = !(num < MIN_FRAMESIZE)
      if (!this._isDecodePause) {
        let playPromise = this._decoder.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this._playSuccess = true
            })
            .catch(() => {
              this._playSuccess = false
            })
        } else {
          setTimeout(() => {
            this._playSuccess = true
          }, 20)
        }
      }
    }
  }

  frameRendend (imageObj) {
    if (imageObj.dom) {
      // console.error(this.TAG, 'frameRendend', this._decoder._canvasList.length)
      // 重新设置canvas大小，可以清空画布，减少GPU内存占用。如果设置值<videoWidth，有可能会增加cpu利用率
      imageObj.dom.width = 0
      imageObj.dom.height = 0
      let canvasList = this._decoder._canvasList
      let length = canvasList.length
      if (length > MAX_FRAMESIZE) {
        return
      }
      this._decoder._canvasList.push(imageObj)
    } else {
      logger.error(this.TAG, '_onRendend', 'imageObj. is error', imageObj)
    }
  }

  checkValidBlob (audioDTS) {
    this._filterBlob(audioDTS)
  }

  chaseVideoFrame (keyFrame) {
    logger.log(this.TAG, keyFrame, keyFrame.frame.dts, this.currentFragmentDts)
    let frame = keyFrame.frame
    let startDts = frame.dts
    this._startDts = startDts
    // currentFragmentDts 最新gop的起始pts
    if (startDts === this.currentFragmentDts) {
      logger.log(this.TAG, '_onChaseFrame', '_inDecodeId:', this._inDecodeId, 'currentFragmentDts:', this.currentFragmentDts)
      // 当前正在解码的gop不是chase需要的
      if (this._inDecodeId > 0 && this._inDecodeId < startDts) {
        // todo 停止解码，开始下一个gop的解码
        logger.log(
          this.TAG,
          '_onChaseFrame, _inDecodeId > 0 && _inDecodeId < startDts, _inDecodeId:',
          this._inDecodeId,
          'startDts:',
          startDts
        )
        this.stopDecode()
        // this._blobURLList = this._blobURLList.filter((item) => {
        //   return item.dts >= startDts
        // })
        this._filterBlob(startDts)
        this.startDecode()
        return
      }
      // 正在解码的就是chase到的gop
      if (this._inDecodeId === startDts) {
        logger.log(this.TAG, '_onChaseFrame, _inDecodeId === startDts, startDts:', startDts)
        this.stopDecode()
        this.reStrartDecode(this._currentInfo)
        return
      }
      if (this._inDecodeId === -1) {
        logger.log(this.TAG, '_onChaseFrame', '_inDecodeId==-1')
        this.startDecode()
      }
      //  this.emit('chaseframeend', true)
    }
    // 当前gop还没有完成
    if (startDts > this.currentFragmentDts) {
      logger.log(
        this.TAG,
        '_onChaseFrame, startDts > currentFragmentDts, startDts:',
        startDts,
        'currentFragmentDts:',
        this.currentFragmentDts
      )
      this.stopDecode()
      this._emptyBlobList()
    }
    // 触发waiting后，在触发追帧操作，会出现这种情况
    if (startDts < this.currentFragmentDts) {
      logger.log(
        this.TAG,
        '_onChaseFrame, startDts < currentFragmentDts, startDts:',
        startDts,
        'currentFragmentDts:',
        this.currentFragmentDts
      )

      if (startDts > this._inDecodeId) {
        // 过滤掉比startDts小的blob
        this._filterBlob(startDts)
        this.stopDecode()
        this.startDecode()
      }
    }
  }

  /**
   * 准备好解码器
   * @param {*} meta
   */
  init (meta) {
    if (this._isInit) {
      return
    }
    this._metaFPS = meta.frameRate.fps || 25
    this._videoWidth = meta.presentWidth
    this._videoHeight = meta.presentHeight
    this._width = this._videoWidth
    this._height = this._videoHeight
    this._frameDuration = parseInt(1000 / this._metaFPS)
    this._isInit = true
    logger.log(`${this.TAG} has inited`)
    this._isInit = true
    this._checkReady()
  }

  reStrartDecode (info) {
    if (info) {
      try {
        logger.log(this.TAG, 'reStrartDecode')
        this._isInDecoding = true
        this._inDecodeId = info.dts
        this._currentInfo = info
        this._decoder.startDecode(info, this._metaFPS, this._startTime)
        this._startTime = 0
      } catch (e) {
        console.error('load error', e)
      }
    }
  }

  stopDecode () {
    this._isInDecoding = false
    this._inDecodeId = -1
    this._currentInfo = null
    this._frameLengthPerFragment = 0
    this._decoder.stopDecode()
  }

  startDecode () {
    if (this._isInDecoding) {
      logger.log(this.TAG, 'startDecode', 'this decoder is in decoding')
      return
    }
    let blobURLLength = this._getBlobLength()
    if (this._decoder && blobURLLength) {
      logger.log(this.TAG, 'startDecode', 'blob url length:', blobURLLength)
      let info = this._shiftBlob() || {}
      try {
        logger.log(this.TAG, 'startDecode', info.dts, info.duration)
        this._isInDecoding = true
        this._inDecodeId = info.dts
        this._currentInfo = info
        this._decoder.startDecode(info, this._metaFPS)
      } catch (e) {
        console.error(this.TAG, 'startDecode', 'load error', e)
      }
    }
  }

  canSeek (keyFrame) {
    let dts = keyFrame.frame.dts
    // logger.log('can seek video decoceer:', dts, this._inDecodeId, this.currentFragmentDts)
    if (this.currentFragmentDts >= dts && this._isInDecoding) {
      if (this._inDecodeId === dts) {
        // console.error('in decodeing')
        return false
      }
      if (this._inDecodeId < dts) {
        return true
      }
      return false
    }
    return false
  }

  startRemux (samples) {
    logger.log('startRemux samples length:', samples.length)
    if (samples.length) {
      this._remux.remux(null, { samples, meta: this._parent._meta })
    } else {
      console.error('frame length is 0')
    }
  }

  canPlayType (meta) {
    if (this._decoder) {
      try {
        return this._decoder.canPlayType('video/mp4;codecs="' + meta.codec + '"')
      } catch (e) {
        console.error(e)
      }
    }
  }

  destroy () {
    this._blobURLList = []
    this._decoder.destroy()
  }

  empty () {
    logger.log('empty')
    if (this._decoder) {
      let list = this._decoder._canvasList
      logger.log(this.TAG, 'empty >>>>>>>>>>>>>>>>>>length:', list.length)
      list.forEach((item) => {
        if (item.dom) {
          logger.log('clear >>>>>>>>>>>>>>>>>>')
          item.dom.width = 0
          item.dom.height = 0
          item.dom = null
        }
      })
      return list.length
    }
  }

  /**
   * 解码器是否空闲
   * 1、待解码的blob为0
   * 2、没有正在解码
   * 3、页面不处于隐藏状态（隐藏状态是可以不解码）
   */
  get isIDLE () {
    logger.log(this.TAG, 'isIDEL', 'blob length:', this._getBlobLength(), '_isInDecoding:', this._isInDecoding, 'isVideoOnRun:', this._isVideoOnRun, '_isDecodePause', this._isDecodePause)
    return !this._getBlobLength() && !this._isInDecoding && this._isVideoOnRun
  }

  get ready () {
    return this._ready
  }

  set ready (value) {
    this._ready = value
  }

  get remux () {
    return this._remux
  }

  get isInit () {
    return this._isInit
  }
}
