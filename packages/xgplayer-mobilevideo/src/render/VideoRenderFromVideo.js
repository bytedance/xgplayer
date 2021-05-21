/* eslint-disable no-undef */
import { logger } from 'xgplayer-helper-utils'
import VideoBaseRender from './VideoBaseRender'
import FrameRender from './FrameRender'
import VideoDecodeController from '../video-decoder/video-decode-controller.js'
import Events from '../events'
export default class VideoRenderFromVideo extends VideoBaseRender {
  constructor (config, parent) {
    super(config, parent)
    this.TAG = 'VideoRenderFromVideo'
    this._videoDecodeController = new VideoDecodeController(config, this)
    this._canAutoPlay = true
    // 表示是不是用video标签进行解码
    this.videoContext = config.videoContext
    this.videoRemux = config.videoRemux
    this._videoDecode = config.videoDecode
    this._chaseToFrame = null
    // this._bindEvents()
  }

  set videoDecode (value) {
    this._videoDecode = value
  }

  get videoDecode () {
    return this._videoDecode
  }

  _bindEvents () {
    super._bindEvents()
    this.on('keyFrame', this._onKeyFrame.bind(this))
    this.on(Events.DECODE_EVENTS.READY, this._onReady.bind(this))
    this.on(Events.DECODE_EVENTS.DECODED, this._onDecoded.bind(this))
    this.on(Events.DECODE_EVENTS.PLAY_FAILED, this._onPlayFailed.bind(this))
    this.on('error', this._onError.bind(this))
    this.on(Events.DECODE_EVENTS.APPEND_VIDEO, this._onAppendVideo.bind(this))
    this.on(Events.DECODE_EVENTS.FIRST_FRAME, this._onFirstFrame.bind(this))
    this._parent.on(Events.DECODE_EVENTS.CHASE_VIDEO_FRAME, this._onChaseVideoFrame.bind(this))
    this._parent.on(Events.TIMELINE.SYNC_DTS, this._onTimeLineSyncDTS.bind(this))
  }

  _onTimeLineSyncDTS (dts) {
    this._videoDecodeController.checkValidBlob(dts)
  }
  _onChaseVideoFrame (keyFrame) {
    this._doChaseVideoFrame(keyFrame)
  }
  _initRemux () {
    if (this._videoDecodeController && this.videoContext) {
      let remux = this.videoContext.getInstance('MP4_REMUXER')

      if (!remux) {
        console.error('remux is', this.videoContext)
        this._videoDecodeController.initRemux(this._parent._parent.videoRemux)
        return
      }
      this._videoDecodeController.initRemux(remux)
    }
  }

  _onAppendVideo (video) {
    try {
      this._parent._parent.appendChild(video)
    } catch (e) {
      cosole.error(this.TAG, 'onAppendVideo', e)
    }
  }

  _onKeyFrame (item) {
    // 准备开始video解码
    if (this._isToVideoDecoder) {
      this._initRemux()
      this.videoDecode = true
      return
    }
    // 准备开始wasm解码
    if (this._isToWasm) {
    }
  }

  _onError (e, firstEmit) {
    console.error(this.TAG, 'decoder error', e, firstEmit)
    // 如果第一个分段解码失败就报错
    if (!firstEmit) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', this._assembleErr(e && e.message))
    }
  }

  _onReady () {
    this._wasmReady = true
    if (!this._frameRender) {
      let config = Object.assign(this._config, {
        meta: this._meta,
        canvas: this._canvas,
        type: '2d'
      })
      try {
        this._frameRender = new FrameRender(config)
      } catch (e) {
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', this._assembleErr(e && e.message))
      }
    }
    this._startDecode()
  }
  _onFirstFrame (frame) {
    this._inDecoding = true
    logger.log(this.TAG, 'onFirstFrame')
    this._receiveFrame(frame)
    this._firstFrame = true
    this.forceRender(true)
  }

  _onDecoded (frame) {
    if (this._inChaseFrame) {
      this.chaseFrameAfter++
      if (this.chaseFrameAfter === 1 && this._chaseToFrame) {
        this._parent.emit(Events.DECODE_EVENTS.CHASE_VIDEO_FRAME_END, this._chaseToFrame)
        if (this._frameQueue.length) {
          let frames = this._frameQueue.frames
          frames.forEach((frame) => {
            this._videoDecodeController.frameRendend(frame.buffer)
          })
        }
        this._frameQueue.empty()
        this._videoDecodeController.checkMinFrames(this._frameQueue.length)
        this._timeRange.deletePassed(this._chaseToFrame.frame.dts)
        this._inChaseFrame = false
        this._chaseToFrame = null
        console.warn(this.TAG, 'onDecoded', '_inChaseFrame end')
      }
      // return
    } else {
      this.chaseFrameAfter = 0
    }
    this._inDecoding = true
    this._receiveFrame(frame)
  }

  _onPlayFailed (firstEmit) {
    console.warn(this.TAG, 'onPlayFailed, this._ready:', this._ready, ',firstEmit:', firstEmit, ',frame length:', this._frameQueue.length)
    // lark中video不播放，不触发loadeddata事件，播放器无法现实手动播放按钮。需要在此手动触发ready
    if (!this._ready && !firstEmit) {
      this._whenReady()
    }
    this._canAutoPlay = false
  }

  canSeek (keyFrame) {
    // viddeo decode
    return this._videoDecodeController.canSeek(keyFrame)
  }

  _initDecoder () {
    if (this._isInit) {
      return
    }
    logger.log(this.TAG, '_initDecoder')
    if (!this._videoDecodeController.remux) {
      this._initRemux()
    }
    // 为video硬解码
    if (!this._videoDecodeController.isInit) {
      this._videoDecodeController.init(this._meta)
    }
    this._isInit = true
  }

  _receiveFrame (frame) {
    super._receiveFrame(frame)
    this._videoDecodeController.checkMaxFrames(this._frameQueue._frames.length)
  }

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
    this._initDecoder()
  }

  // 硬解追帧
  _doChaseVideoFrame (keyframe) {
    this._inChaseFrame = true
    this._chaseToFrame = keyframe
    this._videoDecodeController.chaseVideoFrame(keyframe)
  }

  _appendChunk (videoTrack) {
    // 填充timeRange的信息，完成后清空buffer。视频数据从videoTrack中获取
    this._timeRange.append(videoTrack.samples, this._noAudio, false)
    // 把Samples全部清空
    this._timeRange._currentFrameQueue = []
    this._timeRange._buffers = []
  }

  // 1. decoder初始化预解码几帧
  // 2. render 过程,帧数过少时解码新帧
  _startDecode () {
    this._videoDecodeController.startDecode()
  }

  // 检测需要解码的时机
  // 1. 解码worker初始化完成,提前解几帧
  // 2. 渲染ticker中
  _checkToDecode () {
    // if (this._frameQueue.length < this._wasmDecodeController.needToDecode) {
    //   this._startDecode()
    // }
  }

  _startRender () {
    this._tickTimer.start(this.interval)
  }

  _render (force) {
    let frame = this._frameQueue.nextFrame()
    if (!frame || !this._timeRange) {
      this._videoDecodeController.checkMinFrames(this._frameQueue._frames.length)
      logger.log(this.TAG, 'lack frame')

      if (this._parent._paused) {
        this._doPause()
        logger.log(this.TAG, '_render', 'pused return')
        return
      }
      if (!this._firstFrame) {
        logger.log(this.TAG, '_render', 'not first frame return')
        return
      }
      let _videoDecodeController = this._videoDecodeController
      logger.log(this.TAG, ',lack frame, _inDecoding:', this._inDecoding, ',_frameQueue.length:', this._frameQueue.length)
      // 在当前page隐藏时，不触发wait操作
      if (!this._frameQueue.length && _videoDecodeController.isIDLE) {
        this._ready = false
        console.warn(this.TAG, 'trigger video waiting vdecode, preciseVideoDts:', this.preciseVideoDts)
        this.emit(Events.VIDEO.VIDEO_WAITING)
      }
      return
    }

    let { info } = frame

    if (!info) {
      this._frameQueue.shift()
      console.error('not info')
      return
    }

    this._renderDts = info.dts
    let _renderDelay = info.dts - this.preciseVideoDts

    // 解决解码滞后积压，图片快速渲染问题，过时的图片就不渲染了

    if (_renderDelay < -150) {
      console.warn(this.TAG, '_render _renderDelay < 150ms, _renderDelay:', _renderDelay, 'frame length:', this._frameQueue.length)
      this._frameQueue.shift(this.preciseVideoDts)
      this._videoDecodeController.frameRendend(frame.buffer)
      this._videoDecodeController.checkMinFrames(this._frameQueue.length)
      return
    }
    if (!force && _renderDelay > 0 && _renderDelay < 60000) {
      // 60s
      return
    }

    // if (!this.videoDecode) {
    // this._frameQueue.shift(this.preciseVideoDts)
    // }

    if (Math.abs(this._lastTimeupdate - info.dts) > 250) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE)
      this._lastTimeupdate = info.dts
    }

    if (logger.long) {
      logger.log(
        this.TAG,
        `render delay:${_renderDelay} , timelinePosition:${this.preciseVideoDts} , dts:${info.dts} , cost:${info.cost} , gopID:${info.gopId} , rest:${this._frameQueue.length}, buffer frame:${this._timeRange.frameLength}`
      )
    }
    let ts = performance.now()
    this._frameRender.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize)
    this._videoDecodeController.frameRendend(frame.buffer)
    this._frameQueue.shift()
    this._videoDecodeController.checkMinFrames(this._frameQueue.length)
    this._videoDecodeController.emit('renderDelay', _renderDelay, this._frameQueue._frames.length)
    this._renderCost = performance.now() - ts
    this._checkToDecode()
  }

  _destroy (reuseWorker) {
    super.destroy(reuseWorker)
    this._videoDecodeController.destroy()
  }

  _doPause () {
    logger.log(this.TAG, '>>>>>>>>doPause')
    this._tickTimer.stop()
  }
}
