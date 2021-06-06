/* eslint-disable no-undef */
import { logger } from 'xgplayer-helper-utils'
import VideoBaseRender from './VideoBaseRender'
import WasmDecodeController from '../wasm-decoder/wasm-decode-controller'
import FrameRender from './FrameRender'
import Events from '../events'

export default class VideoRenderFromWasm extends VideoBaseRender {
  constructor (config, parent) {
    super(config, parent)
    this.TAG = 'VideoRenderFromWasm'
    this._wasmDecodeController = new WasmDecodeController(this)
    this._workerMessageCallback = this._workerMessageCallback.bind(this)
    this._workerErrorCallback = this._workerErrorCallback.bind(this)
  }

  get wasmInitCost () {
    return this._wasmDecodeController.wasmInitCost
  }

  get hevcThread () {
    return this.decodeMode === 1
  }

  get decodeMode () {
    return this._wasmDecodeController.decoderMode
  }

  get isHevc () {
    return this._wasmDecodeController.isHevc
  }

  /** ************ video render 独有的需要在 timeline调用的方法 *************************/

  switchToMultiWorker () {
    // 新建worker
    this._wasmDecodeController.addDecodeWorker()
  }

  // 链路: audioRender中选择好要播放的buffer后,调整seek时间,通知 videoRender开始切换buffer、解码, 点播时
  ajustSeekTime (time) {
    logger.log(this.TAG, 'ajust seek time: ', time)
    this._wasmDecodeController.flushDecoder()
    this._switchVideoBuffer(time)
  }

  canSeek () {
    return true
  }
  /** ************ video render 独有的需要 timeline调用的方法 end *************************/

  _bindEvents () {
    super._bindEvents();

    let waitingTimer

    // 低延迟卡顿码率递减计算
    this.on(Events.VIDEO.VIDEO_WAITING, () => {
      console.log(this.TAG, 'videoRender waiting handler')
      if (this.bitrate === 0) return
      clearInterval(waitingTimer)
      let i = 1
      waitingTimer = setInterval(() => {
        logger.log(this.TAG, '卡顿', i)
        console.log(this.TAG, '卡顿', i)
        i++
        this.bitrate = this.bitrate / i
        if (this.bitrate < 40000) {
          // 5KB
          this.bitrate = 0
          clearInterval(waitingTimer)
        }
      }, 1000)
    })

    this._parent.on(Events.TIMELINE.START_RENDER, () => {
      clearInterval(waitingTimer)
    })

    this._parent.on(Events.TIMELINE.DESTROY, () => {
      clearInterval(waitingTimer)
    })
  }

  /** ************ 主流程 *************************/
  _workerErrorCallback (msg) {
    this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', this._assembleErr(msg))
  }

  _workerMessageCallback ({ type, data }) {
    switch (type) {
      case 'DECODER_READY':
        if (!this._frameRender) {
          let config = Object.assign(this._config, {
            meta: this._meta,
            canvas: this._canvas
          })
          try {
            this._frameRender = new FrameRender(config)
          } catch (e) {
            this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', this._assembleErr(e && e.message))
          }
        }
        this._startDecode()
        break
      case 'RECEIVE_FRAME':
        if (this._inChaseFrame) return
        this._receiveFrame(data)
        break
      case 'BATCH_FINISH':
        if (!this._decodeEstimate) return
        this._decodeEstimate.resetDecodeDot()
        if (this._inChaseFrame) {
          this._inChaseFrame = false
          this._frameQueue.empty()
        }
        break
    }
  }

  _initDecoder () {
    this._wasmDecodeController.init(this._workerMessageCallback, this._workerErrorCallback, this._meta)
  }

  _appendChunk (videoTrack) {
    this._timeRange.append(videoTrack.samples, this._noAudio, !this.videoDecode)
    videoTrack.samples = []
    videoTrack.samples = []
    if (!this.isLive && !this._timeRange.frameLength) {
      this._switchVideoBuffer(this._parent.currentTime)
    }
    if (!this._ready && this._wasmDecodeController.wasmReady && this._noAudio) {
      this._startDecode()
    }
    if (this._noAudio) {
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.DURATION_CHANGE)
    }
    if (!this._frameQueue.length && !this._wasmDecodeController.inDecoding) {
      this._startDecode()
    }
  }

  // 1. decoder初始化预解码几帧
  // 2. render 过程,帧数过少时解码新帧
  _startDecode () {
    this._wasmDecodeController.doDecode()
  }

  _switchVideoBuffer (time) {
    this._timeRange.switchBuffer(time)
    this._setMetadata('video', this._meta)
    this._startDecode()
  }

  // 检测需要解码的时机
  // 1. 解码worker初始化完成,提前解几帧
  // 2. 渲染ticker中
  _checkToDecode () {
    if (this._frameQueue.length < this._wasmDecodeController.needToDecode) {
      this._startDecode()
    }
  }

  _render (force) {
    let frame = this._frameQueue.nextFrame()
    if (!frame || !this._timeRange) {
      logger.log(this.TAG, 'lack frame', this._wasmDecodeController.inDecoding)
      this._checkToDecode()

      // waiting
      if (this._noAudio && !this._timeRange.frameLength) {
        this._ready = false
        console.log(this.TAG, 'trigger video waiting')
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

    if (!force && _renderDelay > 0 && _renderDelay < 60000) {
      // 60s
      return
    }

    this._frameQueue.shift(this.preciseVideoDts)

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
    this._renderCost = performance.now() - ts
    this._checkToDecode()
  }
  /** ************ 主流程 end *************************/

  // 软解追帧
  _doChaseFrame ({ frame }) {
    this._inChaseFrame = true
    this._timeRange.deletePassed(frame.dts)
    this._frameQueue.empty()
  }

  _destroy (reuseWorker) {
    super.destroy();
    if (this._wasmDecodeController) {
      this._wasmDecodeController.destroy(reuseWorker)
    }
    this._wasmDecodeController = null
  }
}
