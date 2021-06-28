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
    window.addEventListener('unload', () => {
      // 解决safari页面刷新不释放canvas占用内存问题
      this._empty()
    })
  }

  _onTimeLineSyncDTS (dts) {
    this._videoDecodeController.checkValidBlob(dts)
  }

  _onChaseVideoFrame (keyFrame) {
    this._doChaseVideoFrame(keyFrame)
  }

  _onAppendVideo (video) {
    try {
      this._parent._parent.appendChild(video)
    } catch (e) {
      cosole.error(this.TAG, 'onAppendVideo', e)
    }
  }

  _onKeyFrame () {
    logger.log(this.TAG, '_onKeyFrame,  keyframe')
    this._videoDecodeController.emit('keyFrame')
    // this._videoDecodeController.startRemux()
    // this._timeRange._currentFrameQueue = []
    // this._timeRange._buffers = []
  }

  _onError (e, firstEmit) {
    console.error(this.TAG, 'decoder error', e, firstEmit)
    // 如果第一个分段解码失败就报错
    if (!firstEmit) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', this._assembleErr(e && e.message))
    }
  }

  _onReady () {
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
    logger.log(this.TAG, 'onFirstFrame')
    this._receiveFrame(frame)
    this._firstFrame = true
    // this.forceRender(true)
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
    this._initDecoder(meta)
  }

  // 硬解追帧
  _doChaseVideoFrame (keyframe) {
    this._inChaseFrame = true
    this._chaseToFrame = keyframe
    this._videoDecodeController.chaseVideoFrame(keyframe)
  }

  _appendChunk (videoTrack) {
    let samples = videoTrack.samples
    let len = samples.length
    for (let i = 0; i < len; i++) {
      let sample = samples.shift()
      if (sample.isKeyframe) {
        this.emit('keyFrame')
      }
      this._timeRange.append([sample], this._noAudio, false)
    }
  }

  _startDecode () {
    this._videoDecodeController.startDecode()
  }

  _checkToDecode () {
    this._startDecode()
  }

  _startRender () {
    logger.log(this.TAG, '_startRender interval', this.interval)
    this._tickTimer.start(this.interval)
  }

  _render (force) {
    let frame = this._frameQueue.nextFrame()
    let preciseVideoDts = this.preciseVideoDts
    if (!frame || !this._timeRange) {
      this._videoDecodeController.checkMinFrames(this._frameQueue._frames.length)
      // logger.log(this.TAG, 'lack frame')

      if (this._parent._paused) {
        // this._doPause()
        // logger.log(this.TAG, '_render', 'pused return')
        return
      }
      if (!this._firstFrame) {
        logger.log(this.TAG, '_render', 'not first frame return')
        return
      }
      let _videoDecodeController = this._videoDecodeController
      logger.log(this.TAG, ',lack frame, _inDecoding:', this._videoDecodeController._isInDecoding, this._videoDecodeController._isDecodePause, ',_frameQueue.length:', this._frameQueue.length)
      // 在当前page隐藏时，不触发wait操作
      if (!this._frameQueue.length && _videoDecodeController.isIDLE) {
        this._ready = false
        let audioRender = this._parent.audioRender
        console.warn(this.TAG, 'trigger video waiting vdecode, preciseVideoDts:', preciseVideoDts, audioRender.currentTime, audioRender.duration, audioRender.buffered.end(0), audioRender.baseDts)
        this.emit(Events.VIDEO.VIDEO_WAITING)
      }
      this._checkToDecode()
      return
    }

    let { info } = frame

    if (!info) {
      this._frameQueue.shift()
      console.error('not info')
      return
    }

    this._renderDts = info.dts
    let _renderDelay = info.dts - preciseVideoDts
    // console.error('renderDelay')
    // 解决解码滞后积压，图片快速渲染问题，过时的图片就不渲染了

    if (_renderDelay < -150) {
      if (preciseVideoDts - this.lastPrecise > 500) {
        // console.error(this.TAG, 'preciseVideoDts error:', preciseVideoDts, this.lastPrecise, this.audioSyncDts, this.timelinePosition * 1000, this.lastTimelinePosition * 1000, Date.now())
      }
      // console.error('renderDelay:', info.dts, this.lastFrameinfo, preciseVideoDts, this.lastPrecise, "systeme:", Date.now() - this.lastTime, 'audioCurrentTime:', this.lastAudioTime, this._parent.audioRender.currentTime)
      // console.warn(this.TAG, '_render _renderDelay < 150ms, _renderDelay:', _renderDelay, 'frame length:', this._frameQueue.length, info.dts, this.preciseVideoDts, 'audioCurrentTime:', this.lastAudioTime, this._parent.audioRender.currentTime)

      let frames = this._frameQueue.frames
      let { deleteFrames, useFrames } = this._getDeleteFrames(frames, preciseVideoDts)

      frames.splice(0)

      useFrames.forEach((item) => {
        frames.push(item)
      })

      deleteFrames.forEach((item) => {
        this._videoDecodeController.frameRendend(item.buffer)
      })

      this._videoDecodeController.emit('renderDelay', _renderDelay, this._frameQueue._frames.length)
      this._videoDecodeController.checkMinFrames(this._frameQueue.length)
      return
    }
    if (!force && _renderDelay > 30 && _renderDelay < 60000) {
      // 60s
      // console.error('renderDelay> 50', info.dts, this.preciseVideoDts, _renderDelay)
      return
    }

    if (Math.abs(this._lastTimeupdate - info.dts) > 250) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE)
      this._lastTimeupdate = info.dts
    }

    if (logger.long) {
      logger.log(
        this.TAG,
        `render delay:${_renderDelay} , timelinePosition:${preciseVideoDts} , dts:${info.dts} , cost:${info.cost} , gopID:${info.gopId} , rest:${this._frameQueue.length}, buffer frame:${this._timeRange.frameLength}`
      )
    }
    // logger.log(this.TAG, '_render preciseVideoDts:', preciseVideoDts, Date.now())
    let ts = performance.now()
    this._frameRender.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize)
    if (!this.hasFirstFrame && !force) {
      this.hasFirstFrame = true
      this._parent.emit(Events.TIMELINE.PLAY_EVENT, 'firstframe')
    }
    this._videoDecodeController.frameRendend(frame.buffer)
    this._frameQueue.shift()
    this._videoDecodeController.checkMinFrames(this._frameQueue.length)
    this._videoDecodeController.emit('renderDelay', _renderDelay, this._frameQueue._frames.length)
    this._renderCost = performance.now() - ts
    // this._checkToDecode()
    if (!force) {
      if (this.lastTime) {
        let delay = preciseVideoDts - this.lastPrecise
        let sDelay = Date.now() - this.lastTime
        if (Math.abs(sDelay - delay) > 100) {
          // console.error('audio delay > 20', delay, sDelay, this.lastPrecise, preciseVideoDts)
        }
      }
      this.lastFrameinfo = info.dts
      this.lastPrecise = preciseVideoDts
      this.lastTime = Date.now()
      this.lastAudioTime = this._parent.audioRender.currentTime
    }
  }

  _destroy (reuseWorker) {
    this._empty()
    super.destroy(reuseWorker)
    this._videoDecodeController.destroy()
  }

  _doPause () {
    logger.log(this.TAG, '>>>>>>>>doPause')
    this._tickTimer.stop()
  }

  _getDeleteFrames (frames, preciseVideoDts) {
    let deleteFrames = []
    let useFrames = []
    frames.forEach((item) => {
      if (item.info && item.info.dts > preciseVideoDts) {
        useFrames.push(item)
      } else if (item.info && item.info.dts <= preciseVideoDts) {
        deleteFrames.push(item)
      }
    })
    return { deleteFrames, useFrames }
  }

  _empty () {
    if (this._videoDecodeController) {
      this._videoDecodeController.empty()
      this._frameQueue.frames.forEach((item) => {
        if (item.buffer && item.buffer.dom) {
          item.buffer.dom.width = 0
          item.buffer.dom.height = 0
          item.buffer.dom = null
        }
      })
    }
  }
}
