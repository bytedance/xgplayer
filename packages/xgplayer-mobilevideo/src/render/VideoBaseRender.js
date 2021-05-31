/* eslint-disable no-undef */
import { logger } from 'xgplayer-helper-utils'
import BaseRender from './BaseRender'
import VideoTimeRange from './VideoTimeRange'
import FrameQueue from './FrameQueue'
import DecodeEstimate from './DecodeEstimate'
import TickTimer from '../helper/TickTimer'
import Events from '../events'

const HAVE_NOTHING = 0
const HAVE_METADATA = 1
const HAVE_CURRENT_DATA = 2
const HAVE_FUTURE_DATA = 3
const HAVE_ENOUGH_DATA = 4

const MEDIA_ERR_DECODE = 3

export default class VideoBaseRender extends BaseRender {
  constructor (config, parent) {
    super(config, parent)
    this._timeRange = new VideoTimeRange(this)
    this._decodeEstimate = new DecodeEstimate(this)
    this._frameQueue = new FrameQueue(this) // the queue of uncompressed frame
    this._canvas = config.canvas || document.createElement('canvas')
    this._lastTimeupdate = 0
    this._renderCost = 0
    this._canAutoPlay = true
    this._videoDecode = false
    this._frameRender = null
    this._render = this._render.bind(this)
    this._tickTimer = new TickTimer(this._render)
    this._initCanvas()
    this._bindEvents()
  }

  get canAutoPlay () {
    return this._canAutoPlay
  }

  get canvas () {
    return this._canvas
  }

  get timescale () {
    if (!this._meta) return 1000
    return this._meta.timescale || 1000
  }

  get fps () {
    return this._decodeEstimate.fps || (this._meta && this._meta.frameRate && this._meta.frameRate.fps) || 24
  }

  get decodeFps () {
    return this._decodeEstimate.decodeFps
  }

  get decodeCost () {
    return this._decodeEstimate.decodeCost
  }

  get renderCost () {
    return this._renderCost
  }

  get totalSize () {
    return this._timeRange.totalSize
  }

  get bitrate () {
    return this._timeRange.bitrate
  }

  set bitrate (v) {
    this._timeRange.bitrate = v
  }

  get gopLength () {
    return this._decodeEstimate.gopLength
  }

  get is540p () {
    return this._canvas.height < 720
  }

  get duration () {
    return this._timeRange.duartion
  }

  get buffered () {
    return this._timeRange.buffered
  }

  get interval () {
    return Math.floor(1000 / this.fps)
  }
  // video first frame dts
  get baseDts () {
    return this._timeRange.baseDts
  }

  // noAudio时使用
  get currentTime () {
    return this._timeRange.getCurrentTime(this.preciseVideoDts)
  }

  get timelinePosition () {
    return this._parent.timelinePosition
  }

  set lastTimelinePosition (ts) {
    this._lastTimelinePosition = ts
  }

  // the startTime on timeline of the buffer audioCtx current playing
  // noAudio: the time record by perforamce.now() when play start or restart after waiting or stream changed
  get lastTimelinePosition () {
    return this._lastTimelinePosition || 0
  }

  set audioSyncDts (dts) {
    this._audioDts = dts
  }

  // the first sample's dts of the buffer audioCtx current playing
  get audioSyncDts () {
    return this._audioDts || this.baseDts
  }

  // the precise video dts sync to timeline time
  get preciseVideoDts () {
    return this.audioSyncDts + Math.floor((this.timelinePosition - this.lastTimelinePosition) * 1000)
  }

  get readyState () {
    let len = this._frameQueue.length
    if (!len) return HAVE_NOTHING
    if (len >= 8) return HAVE_ENOUGH_DATA
    if (len >= 4) return HAVE_FUTURE_DATA
    if (len >= 2) return HAVE_CURRENT_DATA
    return HAVE_METADATA
  }

  get isHevc () {
    return this._wasmDecodeController.isHevc
  }

  // 区分软硬解
  get videoDecode () {
    return this._videoDecode
  }

  /** ************ video render 独有的需要在 timeline调用的方法 *************************/

  getDtsOfTime (time) {
    return this._timeRange.getDtsOfTime(time)
  }

  updateReady () {
    this._whenReady()
  }

  forceRender () {
    this._render(true)
  }

  // 根据time寻找最近的关键帧
  getChaseFrameStartPosition (time, preloadTime) {
    return this._timeRange.getChaseFrameStartPosition(time, preloadTime)
  }

  canSeek () {
    throw new Error('need override by children')
  }

  /** ************ video render 独有的需要 timeline调用的方法 end *************************/

  _assembleErr (msg) {
    let err = new Error(msg)
    err.code = MEDIA_ERR_DECODE
    return err
  }

  _emitTimelineEvents (e, v, d) {
    this._parent.emit(e, v, d)
  }

  _initCanvas () {
    this._canvas.style.margin = 'auto'
    this._canvas.style.position = 'absolute'
    this._canvas.style.pointerEvents = 'none'
  }

  _bindEvents () {
    super._bindEvents()

    this._parent.on(Events.VIDEO.UPDATE_VIDEO_FILLTYPE, (type, { width, height }) => {
      const { width: cvsWidth, height: cvsHeight } = this._canvas
      let isGapX = !width || width / height > cvsWidth / cvsHeight // 左右有黑边
      console.warn('isGapX: ', isGapX, type, cvsWidth, cvsHeight, width, height)
      if (type === 'cover') {
        if (isGapX) {
          this._canvas.style.height = 'auto'
          this._canvas.style.width = '100%'
          return
        }
        this._canvas.style.width = 'auto'
        this.canvas.style.height = '100%'
        return
      }

      if (type === 'fill') {
        this._canvas.style.width = '100%'
        this._canvas.style.height = '100%'
        return
      }

      this._canvas.style.top = 0
      this._canvas.style.bottom = 0
      this._canvas.style.left = 0
      this._canvas.style.right = 0
      this._canvas.style.maxWidth = '100%'
      this._canvas.style.maxHeight = '100%'
    })

    // 容器宽高比 > 视频宽高比， 应该左右移动
    // 容器宽高比 < 视宽高比，应该上下移动
    this._parent.on(Events.VIDEO.UPDATE_VIDEO_COVER_POSITION, ({ width, height }, left = 0, top = 0) => {
      const { width: cvsWidth, height: cvsHeight } = this._canvas
      let scaleCvsWidth = (height * cvsWidth) / cvsHeight
      let scaleCvsHeight = (width * cvsHeight) / cvsWidth
      let deltaX = width - scaleCvsWidth
      let deltaY = height - scaleCvsHeight
      let pX = deltaX * left + 'px'
      let pY = deltaY * top + 'px'
      this._canvas.style.left = pX
      this._canvas.style.top = pY
      console.warn(`cvsWidth=${cvsWidth}, cvsHeight=${cvsHeight}, scaleCvsWidth=${scaleCvsWidth}, scaleCvsHeight=${scaleCvsHeight}`)
      console.warn(`cover position: deltaX=${deltaX}, deltaY=${deltaY}, width=${width}, height=${height}, pX=${pX}, pY=${pY}`)
    })

    // 同步时机
    // 1. 音频一小段buffer起播时
    // 2. 对noAudio的场景 1. 视频变流时,dts发生变化 2. 卡顿waiting后,_parent.timelinePosition已不准确
    this._parent.on(Events.TIMELINE.SYNC_DTS, (dts) => {
      let nextFrame = this._frameQueue.nextFrame()
      this.lastTimelinePosition = this.timelinePosition
      if (this._noAudio) {
        dts = dts || (nextFrame && nextFrame.info.dts) || 0
      }
      this.audioSyncDts = dts

      this.audioSyncDts = dts

      let nextFrameDts = nextFrame && nextFrame.info && nextFrame.info.dts

      // 下一帧视频和音频时间差距较大,对外通知
      if (nextFrameDts && nextFrameDts - dts > 500) {
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LARGE_AV_GAP, {
          aDts: dts,
          vDts: nextFrameDts,
          frameLength: this._frameQueue.length,
          currentTime: this._parent.currentTime,
          duration: this._parent.duration
        })
      }

      logger.log(
        this.TAG,
        'audio current buffer play finish, next buffer dts=',
        dts,
        'currentTime:',
        this._parent.currentTime,
        'next video frame dts:',
        nextFrameDts,
        'frame length:',
        this._frameQueue.length
      )

      // 点播考虑当前分片音频播放完成，视频解码太慢,要自动切到新buffer
      if (!this._isLive) {
        let nextDecodeFrame = this._timeRange.nextFrame()
        if (nextDecodeFrame) {
          let position = (nextDecodeFrame.dts - nextDecodeFrame.baseDts) / 1000
          if (this._parent.currentTime - position > 1) {
            // 音频播完了,视频还有> 1s没解码的话,直接切到新分片
            logger.warn(this.TAG, '视频解码太慢,丢帧!')
            this.ajustSeekTime(this._parent.currentTime)
          }
        }
      }
    })

    this._parent.on(Events.TIMELINE.UPDATE_GL_OPTIONS, (v) => {
      this._config.glCtxOptions = v
    })

    this.on(Events.VIDEO.AUTO_RUN, this._startRender.bind(this))
  }

  /** ************ 主流程 *************************/

  _resetDts (dts, type) {
    if (type === 'audio') return
    this._timeRange.resetDts(dts)
  }

  // 接受 metadata,初始化解码器controller
  _setMetadata (type, meta) {
    if (type === 'audio') return
    logger.warn(this.TAG, 'video set metadata')
    this._meta = meta
    let fps = meta && meta.frameRate && meta.frameRate.fps
    if (fps) {
      logger.log(this.TAG, 'detect fps:', fps)
    } else {
      logger.warn(this.TAG, 'no detect fps,start estimate')
    }

    // override
    this._initDecoder()
  }

  _initDecoder () {
    throw new Error('need override by children')
  }

  _whenDecoderReady () {
    throw new Error('need override by children')
  }

  // 接受音视频数据
  _appendChunk () {
    throw new Error('need override by children')
  }

  _startDecode () {
    throw new Error('need override by children')
  }

  _receiveFrame (frame, callback) {
    if (!this._parent) {
      return
    }
    let info = frame.info || {}
    this._decodeEstimate.addDecodeInfo(info)

    if (!this._isLive) {
      let t = info && info.baseDts !== undefined && (info.dts - info.baseDts) / 1000
      if (t !== undefined && this._parent) {
        if (Math.abs(t - this._parent.currentTime) >= 4) return
      }
    }

    if (this._isLive) {
      this._frameQueue.append(frame)
    } else {
      this._frameQueue.appendVodFrame(frame)
    }

    // override
    callback && callback()

    if (!this._ready) {
      if (this.readyState >= HAVE_METADATA) {
        this._whenReady()
      }
    }
  }

  _startRender () {
    this._tickTimer.start(this.interval)
  }

  _render () {
    throw new Error('need override by children')
  }
  /** ************ 主流程 end *************************/

  /** ************** 播放行为 ***********************/
  _whenReady () {
    console.log('whenready')
    this._ready = true
    this.emit(Events.VIDEO.VIDEO_READY)

    if (this.currentTime < 10) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOADEDDATA)
    }

    if (this._noAudio) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAYING)
    }
  }

  _doPlay () {
    this._tickTimer.start()
  }

  _doPause () {
    this._tickTimer.stop()
  }

  // 清空解码帧,尝试解码seek位置buffer
  _doSeek () {
    this._tickTimer.stop()
    this._ready = false
    this._frameQueue.destroy()
  }

  _doChaseFrame () {
    throw new Error('need override by children')
  }

  /** ************** 播放行为 end ***********************/

  destroy () {
    this._tickTimer.destroy()
    this._frameQueue.destroy()
    if (this._frameRender) {
      this._frameRender.destroy()
    }
    this._canvas = null
    this._timeRange = null
    this._decodeEstimate = null
    this._parent = null
    this.removeAllListeners()
  }
}
