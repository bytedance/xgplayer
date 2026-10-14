import EventEmitter from 'eventemitter3'
import MP4Loader from 'xgplayer-mp4-loader'
import {
  Buffer,
  EVENT,
  isMediaPlaying,
  MSE,
  StreamingError
} from 'xgplayer-streaming-shared'
import { BufferService } from './buffer-service'
import { getConfig } from './config'

export class MP4 extends EventEmitter {
  _prevSegmentEndTime = 0
  _tickTimer = null
  _loading = false
  // 是否已完成首段 append（区分初始化阶段错误与运行时错误，供降级 vtype 判定）
  _inited = false
  // 卡死检测状态
  _lastCheckTime = 0
  _lastCurrentTime = 0
  _bufferBreakTimer = null
  // seek 卡点自救计数
  _waitAdjustTimeCnt = 0
  _waitInBufferTimer = null

  constructor(config) {
    super()
    config = this._config = getConfig(config)
    this.media = this._config.media
    if (config.softDecode && this.media.setPlayMode) {
      this.media.setPlayMode('VOD')
    }
    this._bufferService = new BufferService(this, config)
    this._loader = new MP4Loader(this._getLoaderConfig(config))

    this.media.addEventListener('seeking', this._onSeeking)
    this.media.addEventListener('waiting', this._onWaiting)
  }

  static version = __VERSION__

  static isSupported() {
    return MSE.isSupported() || !!WebAssembly
  }

  get isMMS() {
    return this._bufferService?.isMMS
  }

  async load(url) {
    await this._reset()
    if (url) await this._loader.changeUrl(url)
    this._lastCurrentTime = this.media ? this.media.currentTime : 0
    this._lastCheckTime = Date.now()
    this._startTick(this._config.tickInterval)
    await this._loadSegment(0)
  }

  async destroy() {
    this.media.removeEventListener('seeking', this._onSeeking)
    this.media.removeEventListener('waiting', this._onWaiting)
    this._clearBufferBreakTimer()
    clearTimeout(this._waitInBufferTimer)
    await this._reset()
    await this._bufferService.destroy()
  }

  async _reset() {
    this._stopTick()
    this._clearBufferBreakTimer()
    await this._loader.reset()
    await this._bufferService.reset()
    this._prevSegmentEndTime = 0
    this._loading = false
    this._inited = false
    this._waitAdjustTimeCnt = 0
  }

  async _loadSegment(time) {
    if (this._loading) return
    const currentTime = this.media.currentTime
    // 预加载窗口：播放态用 maxBufferLength，暂停态用 minBufferLength
    const preloadTime = this.media.paused
      ? this._config.minBufferLength
      : this._config.maxBufferLength
    if (this._prevSegmentEndTime > currentTime + preloadTime) return

    this._loading = true
    let res
    try {
      if (time !== null && time !== undefined) {
        res = await this._loader.loadSegmentByTime(time)
      } else {
        res = await this._loader.loadNextSegment()
      }
    } catch (error) {
      this._loading = false
      return this._emitError(StreamingError.network(error))
    }
    if (!res) {
      this._loading = false
      return
    }
    this._prevSegmentEndTime = Math.min(
      res.video?.endTime || Infinity,
      res.audio?.endTime || Infinity
    )
    try {
      await this._bufferService.appendBuffer(
        res.data,
        res.options.range[0],
        res.video?.frames,
        res.audio?.frames,
        this._loader.meta.moov
      )
      await this._bufferService.evictBuffer(this._config.bufferBehind)
    } catch (error) {
      this._loading = false
      return this._emitError(StreamingError.create(error))
    }
    this._inited = true
    this._loading = false
    if (this._loader.isLastSegment(res.video?.index || res.audio?.index || 0)) {
      this._end()
    } else {
      this._loadSegment()
    }
  }

  _end() {
    this._bufferService.endOfStream()
    this._stopTick()
    this._clearBufferBreakTimer()
  }

  _onSeeking = async () => {
    if (!this.media) return
    this._waitAdjustTimeCnt = 0
    const seekTime = this.media.currentTime
    const loader = this._loader
    const { video, audio } = loader.getSegmentByTime(seekTime)
    const seg = video || audio
    if (!seg) return
    if (loader.isSegmentLoading(seg.index)) {
      return
    }
    const info = Buffer.info(Buffer.get(this.media), seekTime, 0.1)
    if (info.end && (info.end >= seg.endTime || info.end >= this.media.duration)) return

    await loader.cancel()
    this._loading = false
    this._prevSegmentEndTime = 0
    this._loadSegment(seekTime)
    this._startTick()
  }

  _startTick(time = 0) {
    this._stopTick()
    this._tickTimer = setTimeout(this._tick, time)
  }

  _stopTick() {
    clearTimeout(this._tickTimer)
  }

  _tick = () => {
    this._stopTick()
    const media = this.media
    if (!media) return
    this._startTick(this._config.tickInterval)
    this._bufferBreakCheck()
    if (Buffer.end(Buffer.get(media)) < 0.1 || !media.readyState) return
    if (isMediaPlaying(media)) {
      this._loadSegment()
    }
  }

  /**
   * 卡死检测：播放中 currentTime 长时间不推进且 buffer 未就绪，超过 waitingTimeOut 判定卡死并报错。
   * 由 disableBufferBreakCheck 控制开关。
   */
  _bufferBreakCheck() {
    const media = this.media
    if (!media || this._config.disableBufferBreakCheck) return
    const now = Date.now()
    const advancing = media.currentTime !== this._lastCurrentTime
    if (advancing || media.paused || media.ended || !isMediaPlaying(media)) {
      this._lastCurrentTime = media.currentTime
      this._lastCheckTime = now
      this._clearBufferBreakTimer()
      return
    }
    // 停滞中：若已在缓冲区内卡顿，交给 _onWaiting 做微调；此处只处理长时间卡死
    if (!this._bufferBreakTimer) {
      this._bufferBreakTimer = setTimeout(() => {
        this._bufferBreakTimer = null
        if (!this.media || this.media.paused) return
        if (
          this.media.currentTime === this._lastCurrentTime &&
          !isMediaPlaying(this.media)
        ) {
          this._emitError(StreamingError.create(new Error('buffer break timeout')), false)
        }
      }, this._config.waitingTimeOut)
    }
  }

  _clearBufferBreakTimer() {
    if (this._bufferBreakTimer) {
      clearTimeout(this._bufferBreakTimer)
      this._bufferBreakTimer = null
    }
  }

  /**
   * seek 卡点自救：video 触发 waiting 时，若缓冲区末端距当前时间 >= 2s（说明数据其实已就绪却卡住），
   * 在 waitingInBufferTimeOut 后把 currentTime 微调 0.5s 跳过卡点，最多 waitJampBufferMaxCnt 次。
   */
  _onWaiting = () => {
    const media = this.media
    if (!media || this._config.disableBufferBreakCheck) return
    if (this._waitAdjustTimeCnt >= this._config.waitJampBufferMaxCnt) return
    const end = Buffer.end(Buffer.get(media))
    if (end - media.currentTime < 2) return
    clearTimeout(this._waitInBufferTimer)
    this._waitInBufferTimer = setTimeout(() => {
      if (!this.media) return
      if (!this.media.paused && !isMediaPlaying(this.media)) {
        this._waitAdjustTimeCnt++
        this.media.currentTime += 0.5
      }
    }, this._config.waitingInBufferTimeOut)
  }

  _emitError(error, endOfStream = true) {
    this.emit(EVENT.ERROR, error)
    if (endOfStream) {
      this._end()
    }
  }

  _getLoaderConfig(config) {
    return {
      url: config.url,
      vid: config.vid,
      retry: config.retry,
      retryDelay: config.retryDelay,
      timeout: config.timeout,
      onProcessMinLen: config.onProcessMinLen,
      segmentDuration: config.segmentDuration,
      responseType: config.responseType,
      memoryOpt: config.memoryOpt,
      ...(config.reqOptions || {})
    }
  }
}
