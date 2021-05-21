import { logger, EVENTS } from 'xgplayer-helper-utils'
import EventEmitter from 'events'
import Events from '../events'

import VideoDecoder from './video-decoder'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const MAX_FRAMESIZE = 40
const MIN_FRAMESIZE = 20
const DEFAULT_FPS = 15
const LEVELS = [
  { base: 720, level: 0 },
  { base: 540, level: 1 },
  { base: 360, level: 2 }
]

export default class VideoDecoderController extends EventEmitter {
  constructor (config, parent) {
    super()
    this.TAG = 'VideoDecoderController'
    this._decoder = new VideoDecoder(config)
    this._bindEvents()
    this._isInit = false
    this._isDataReady = false
    // 当前解码器的状态
    this._ready = false
    this._remux = null
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
    // -1表示使用的是原始分辨率
    this._currentLevel = -1
    this._handleInitSegment = this._handleInitSegment.bind(this)
    this._handleKeyFrameVideo = this._handleKeyFrameVideo.bind(this)
    this._handleMediaSegmentVideo = this._handleMediaSegmentVideo.bind(this)
  }

  _bindEvents () {
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this))
    // this.on(Events.DECODE_EVENTS.INIT, this._init.bind(this))
    // this.on(Events.DECODE_EVENTS.DATAREADY, this._checkReady.bind(this))
    // this.on(Events.AUDIO.AUDIO_SYNC_DTS, this._checkValidBlob.bind(this))
    // this.on(Events.DECODE_EVENTS.INIT_SEGMENT, this._checkDataReady.bind(this))
    // this.on(Events.DECODE_EVENTS.MEDIA_SEGMENT, this._checkDataReady.bind(this))
    // this.on(Events.DECODE_EVENTS.FRAME_MAX_COUNY, this._onMaxFrame.bind(this))
    // this.on(Events.DECODE_EVENTS.FRAME_MIN_COUNY, this._onMinFrame.bind(this))
    // this.on(Events.DECODE_EVENTS.CHASE_VIDEO_FRAME, this._onChaseFrame.bind(this))
    // this.on(Events.DECODE_EVENTS.RENDE_END, this._onRendend.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.APPEND_VIDEO, this._onAppendVideo.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.PLAY_FAILED, this._onPlayFailed.bind(this))
    this._decoder.on('error', this._onError.bind(this))
    // 每解码一张图片，触发一次
    this._decoder.on(Events.DECODE_EVENTS.DECODED, this._onDecoded.bind(this))
    this._decoder.on(Events.DECODE_EVENTS.FIRST_FRAME, this._onFirstFrame.bind(this))
    // 一个fmp4分段解码完成，触发一次
    this._decoder.on(Events.DECODE_EVENTS.FRAGMENT_END, this._onFragmentEnd.bind(this))
    this._decoder.on('fps', (...args) => {
      // console.log('dtime')
      let pars = [this._metaFPS, ...args]
      this.emit('fps', ...pars)
    })
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
    let frameInfo = this._buildFrameInfo(imageData, pts)
    this._parent.emit(Events.DECODE_EVENTS.DECODED, frameInfo)
  }
  _onFirstFrame (frame, pts) {
    let frameInfo = this._buildFrameInfo(frame, pts)
    this._parent.emit(Events.DECODE_EVENTS.FIRST_FRAME, frameInfo)
  }

  _onFragmentEnd (decodeFPS) {
    this._lastFragmentEndTime = Date.now()
    console.log(this.TAG, '_onFragmentEnd ,_isDecodePause:', this._isDecodePause, 'decodeFPS:', decodeFPS)
    if (decodeFPS) {
      this._reduceResolution(decodeFPS)
    }
    this._isInDecoding = false
    this._hasDoSeek = false
    this._inDecodeId = -1
    this._currentInfo = null
    console.log(this.TAG, '_onFragmentEnd _blobURLList length:', this._blobURLList.length, '_isDecodePause:', this._isDecodePause)
    if (this._blobURLList.length && !this._isDecodePause) {
      this.startDecode()
    } else {
      this.loadNextHandle = setInterval(() => {
        if (this._blobURLList.length && !this._isDecodePause && this._isVideoOnRun && !this._isInDecoding) {
          console.log(this.TAG, '_onFragmentEnd, setInterval start next mp4 decode')
          this.startDecode()
          clearInterval(this.loadNextHandle)
        }
      }, 50)
    }
  }
  _onError (error, firstEmit) {
    this._isInDecoding = false
    this._parent.emit('error', error, firstEmit)
  }
  _handleDecodeControl (num) {
    if (typeof num === 'number') {
      // 根据解码出来的图片帧数量，来决定是否暂停解码
      this._isDecodePause = num > MAX_DECODE_ONCE_FAST
    }
  }
  _checkReady () {
    if (this._isDataReady && this._isInit) {
      // 解码器准备完毕
      this.ready = true
      console.log(this.TAG, 'checkReady trigger ready')
      this._parent.emit(Events.DECODE_EVENTS.READY)
    }
  }
  /**
   * 是否有解码数据，需要initSegment和mediaSegment都有数据，才能拼装成一个fmp4
   */
  _checkDataReady () {
    if (this.initSegmentVideoData && this._mediaSegmentReady) {
      this._isDataReady = true
      // this.emit(Events.DECODE_EVENTS.DATAREADY)
      this._checkReady()
    }
  }

  // 判断解码速度，是否降低分辨率
  _reduceResolution (decodeFPS) {
    if (decodeFPS && decodeFPS < DEFAULT_FPS) {
      this._minFPSTime++
    } else {
      this._minFPSTime = 0
    }
    // 连续3次fps小于DEFAULT_FPS
    if (this._minFPSTime > 3) {
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
    // if (decodeFPS && decodeFPS < DEFAULT_FPS) {
    //   let videoWidth = this._videoWidth
    //   let videoHeight = this._videoHeight
    //   let levelInfo = null
    //   levelInfo = this._findLevel(videoHeight, this._currentLevel)

    //   if (levelInfo) {
    //     this._currentLevel = levelInfo.level
    //     this.width = levelInfo.base * (videoWidth / videoHeight)
    //     this.height = levelInfo.base
    //     this._decoder.emit('outputresolutionchange', this.width, this.height)
    //   }
    // }
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
      console.log(this.TAG, '_remuxMetaData, start REMUX_METADATA')
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
      console.log(this.TAG, e)
    }
  }

  _pushBlob (info) {
    this._blobURLList.push(info)
  }

  _removeRemuxLinstener () {
    console.log(this.TAG, '_removeRemuxLinstener, remove event listener')
    let remux = this.remux
    remux.off(REMUX_EVENTS.INIT_SEGMENT, this._handleInitSegment)
    remux.off(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrameVideo)
    remux.off(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegmentVideo)
  }

  _bindRemuxEvents (remux) {
    console.log(this.TAG, '_bindRemuxEvents, remux add event listener')
    remux.on(REMUX_EVENTS.INIT_SEGMENT, this._handleInitSegment)
    remux.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrameVideo)
    remux.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegmentVideo)
  }

  _handleKeyFrameVideo (pts) {
    try {
      const { videoTrack } = this._remux._context.getInstance('TRACKS')
      console.log(this.TAG, '_handleKeyFrame, keyFrame dts:', videoTrack.samples[0].dts, 'sample length:', videoTrack.samples.length)
      let samples = videoTrack.samples || []
      let startDts = samples[0].dts
      let endDts = samples[samples.length - 1].dts

      let timeScale = (videoTrack && videoTrack.meta.timeScale) || 1000
      // 每个gop小于2s，则不remuxe
      let gopDuration = (endDts - startDts) / timeScale

      if (!this._fDuration) {
        this._fDuration = gopDuration
      }
      if (gopDuration < 2) {
        console.log(
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
      this.currentFramentDts = samples[0].dts
      this.currentFragmentDuration = endDts - startDts

      if (this.currentFramentDts < this._startDts) {
        videoTrack.samples = []
        return
      }
      // 更新remux的_videoDtsBase，保证每个gop生成的fragment时间戳从0开始
      this._remux._videoDtsBase = samples[0].dts
      // 开始remux fmp4的mdat
      this.remux.emit(REMUX_EVENTS.REMUX_MEDIA)
      videoTrack.samples = []
    } catch (e) {}
  }

  _handleInitSegment (type) {
    console.log(this.TAG, `remux INIT_SEGMENT has been emited`, 'type:', type)
    if (type === 'video') {
      let source = this._getVideoSource()
      this.initSegmentVideoData = source.init
      // this.emit(Events.DECODE_EVENTS.INIT_SEGMENT)
      this._checkDataReady()
    }
  }

  _handleMediaSegmentVideo (type) {
    if (type === 'video') {
      try {
        console.log(this.TAG, `remux MediaSegment has been emited`)
        if (!this._videoDtsBase) {
          this._videoDtsBase = this._remux._videoDtsBase
          console.log(this.TAG, '_handleMediaSegment, videoDtsBase:', this._videoDtsBase, 'firstDts:', this.firstDts)
        }

        let videoSource = this._getVideoSource()
        let videoMoofMdat = this._getVideoGopData(videoSource)
        // 消费掉数据后，要清空fmp4数据
        videoSource.data.shift()
        this._mediaSegmentReady = true
        let fmp4 = this._moofMdatAppendtoInitSegment(videoMoofMdat)
        videoMoofMdat = null
        let blobUrl = this._createBlobURL(fmp4)
        let info = {
          blobUrl,
          dts: this.currentFramentDts,
          duration: this.currentFragmentDuration
        }
        this._pushBlob(info)

        if (!this._isDataReady) {
          // this.emit(Events.DECODE_EVENTS.MEDIA_SEGMENT)
          this._checkDataReady()
        }
      } catch (e) {
        console.error('error:', e)
      }
    }
  }

  _moofMdatAppendtoInitSegment (buffer) {
    let initSegmentVideoData = this.initSegmentVideoData
    if (!initSegmentVideoData) {
      return
    }
    try {
      let fmp4Data = new Uint8Array(buffer.buffer.byteLength + initSegmentVideoData.buffer.byteLength)
      fmp4Data.set(initSegmentVideoData.buffer, 0)
      fmp4Data.set(buffer.buffer, initSegmentVideoData.buffer.byteLength)
      // buffer = null
      return fmp4Data
    } catch (error) {
      console.error('_moofMdatAppendtoInitSegment', error)
    }
  }

  _createBlobURL (buffer) {
    if (!buffer) {
      return
    }
    let blob = new Blob([buffer.buffer], {
      type: 'video/mp4'
    })
    return window.URL.createObjectURL(blob)
  }

  _getVideoGopData (videoSource) {
    let data = new Uint8Array(0)
    let buffer
    videoSource.data.forEach((item, index) => {
      if (index === 0) {
        data = item
      } else {
        buffer = new Uint8Array(data.buffer.byteLength + item.buffer.byteLength)
        buffer.set(data.buffer, 0)
        buffer.set(item.buffer, data.buffer.byteLength)
        data = buffer
      }
    })

    return data
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
        if (playPromise != undefined) {
          playPromise
            .then(() => {
              this._playSuccess = true
            })
            .catch(() => {
              this._playSuccess = false
            })
        } else {
          this._playSuccess = true
        }
      }
    }
  }

  frameRendend (imageObj) {
    if (imageObj.dom) {
      // console.error(this.TAG, 'frameRendend', this._decoder._canvasList.length)
      // 重新设置canvas大小，可以清空画布，减少GPU内存占用。如果设置值<videoWidth，有可能会增加cpu利用率
      imageObj.dom.width = 0
      this._decoder._canvasList.push(imageObj)
    } else {
      logger.error(this.TAG, '_onRendend', 'imageObj. is error', imageObj)
    }
  }

  checkValidBlob (audioDTS) {
    // if (!this._isVideoOnRun) {
    this._blobURLList = this._blobURLList.filter((item) => {
      if (item.dts < audioDTS) {
        URL.revokeObjectURL(item.blobUrl)
      }
      return item.dts >= audioDTS
    })
    logger.error(this.TAG, 'checkValidBlob', this._blobURLList.length)
    // }
  }

  chaseVideoFrame (keyFrame) {
    console.log(this.TAG, keyFrame, keyFrame.frame.dts, this.currentFramentDts)
    let frame = keyFrame.frame
    let startDts = frame.dts
    this._startDts = startDts
    // currentFramentDts 最新gop的起始pts
    if (startDts === this.currentFramentDts) {
      console.log(this.TAG, '_onChaseFrame', '_inDecodeId:', this._inDecodeId, 'currentFramentDts:', this.currentFramentDts)
      // 当前正在解码的gop不是chase需要的
      if (this._inDecodeId > 0 && this._inDecodeId < startDts) {
        // todo 停止解码，开始下一个gop的解码
        console.log(
          this.TAG,
          '_onChaseFrame, _inDecodeId > 0 && _inDecodeId < startDts, _inDecodeId:',
          this._inDecodeId,
          'startDts:',
          startDts
        )
        this.stopDecode()
        this._blobURLList = this._blobURLList.filter((item) => {
          return item.dts >= startDts
        })
        this.startDecode()
        return
      }
      // 正在解码的就是chase到的gop
      if (this._inDecodeId === startDts) {
        console.log(this.TAG, '_onChaseFrame, _inDecodeId === startDts, startDts:', startDts)
        this.stopDecode()
        this.reStrartDecode(this._currentInfo)
        return
      }
      if (this._inDecodeId === -1) {
        console.log(this.TAG, '_onChaseFrame', '_inDecodeId==-1')
        this.startDecode()
      }
      //  this.emit('chaseframeend', true)
    }
    // 当前gop还没有完成
    if (startDts > this.currentFramentDts) {
      console.log(
        this.TAG,
        '_onChaseFrame, startDts > currentFramentDts, startDts:',
        startDts,
        'currentFramentDts:',
        this.currentFramentDts
      )
      this.stopDecode()
      this._blobURLList = []
    }
    // 触发waiting后，在触发追帧操作，会出现这种情况
    if (startDts < this.currentFramentDts) {
      console.log(
        this.TAG,
        '_onChaseFrame, startDts < currentFramentDts, startDts:',
        startDts,
        'currentFragmentDts:',
        this.currentFragmentDts
      )

      if (startDts > this._inDecodeId) {
        // 过滤掉比startDts小的blob
        this._blobURLList = this._blobURLList.filter((item) => {
          return item.dts >= startDts
        })
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
    this._frameDuration = parseInt(1000 / this._metaFPS)
    this._isInit = true
    console.log(`${this.TAG} has inited`)
    this._isInit = true
    this._checkReady()
  }

  reStrartDecode (info) {
    if (info) {
      try {
        console.log(this.TAG, 'reStrartDecode')
        this._isInDecoding = true
        this._inDecodeId = info.dts
        this._currentInfo = info
        this._decoder.startDecode(info, this._metaFPS, this._startTime)
        this._startTime = 0
        this._hasDoSeek = false
      } catch (e) {
        console.error('load error', e)
      }
    }
  }

  stopDecode () {
    this._isInDecoding = false
    this._inDecodeId = -1
    this._currentInfo = null
    this._decoder.stopDecode()
  }

  startDecode () {
    if (this._isInDecoding) {
      console.warn(this.TAG, 'startDecode', 'this decoder is in decoding')
      return
    }
    let blobURLLength = this._blobURLList.length
    if (this._decoder && blobURLLength) {
      console.log(this.TAG, 'startDecode', 'blob url length:', blobURLLength)
      let info = this._blobURLList.shift() || {}
      try {
        console.log(this.TAG, 'startDecode')
        this._isInDecoding = true
        this._inDecodeId = info.dts
        this._currentInfo = info
        this._decoder.startDecode(info, this._metaFPS)
      } catch (e) {
        console.error('load error', e)
      }
    }
  }

  canSeek (keyFrame) {
    let dts = keyFrame.frame.dts
    // console.log('can seek video decoceer:', dts, this._inDecodeId, this.currentFramentDts)
    if (this.currentFramentDts >= dts && this._isInDecoding) {
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

  initRemux (remux) {
    this.remux = remux
    this._remuxMetaData()
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
    // this._decoder.destroy()
    // this._removeRemuxLinstener()
    // this._mediaSegmentReady = false
  }
  /**
   * 解码器是否空闲
   * 1、待解码的blob为0
   * 2、没有正在解码
   * 3、页面不处于隐藏状态（隐藏状态是可以不解码）
   */
  get isIDLE () {
    console.log(this.TAG, 'isIDEL', 'blob length:', this._blobURLList.length, '_isInDecoding:', this._isInDecoding, 'isVideoOnRun:', this._isVideoOnRun)
    return !this._blobURLList.length && !this._isInDecoding && this._isVideoOnRun
  }

  get ready () {
    return this._ready
  }

  set ready (value) {
    this._ready = value
  }

  set remux (remux) {
    if (!this._remux) {
      this._remux = remux
      this._bindRemuxEvents(remux)
    }
  }

  get remux () {
    return this._remux
  }

  get isInit () {
    return this._isInit
  }
}
