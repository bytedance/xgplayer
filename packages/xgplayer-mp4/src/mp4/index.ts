import EventEmitter from 'eventemitter3'
import MP4Loader from 'xgplayer-mp4-loader'
import {
  Buffer,
  EVENT,
  isMediaPlaying,
  MSE,
  StreamingError
} from 'xgplayer-streaming-shared'
import type {
  LoadedSegment,
  MP4Config,
  MP4MediaElement,
  MP4Metadata,
  MP4Options
} from '../types'
import { BufferService } from './buffer-service'
import { getConfig } from './config'

export class MP4 extends EventEmitter {
  static version = __VERSION__

  readonly media: MP4MediaElement
  readonly _config: MP4Config
  readonly _bufferService: BufferService
  readonly _loader: MP4Loader

  _prevSegmentEndTime = 0
  _loading = false
  _inited = false

  private _loadingId = 0
  private _loadId = 0
  private _loadQueue: Promise<number> = Promise.resolve(0)
  private _destroyed = false
  private _tickTimer: ReturnType<typeof setTimeout> | null = null
  private _lastCurrentTime = 0
  private _bufferBreakTimer: ReturnType<typeof setTimeout> | null = null
  private _waitAdjustTimeCnt = 0
  private _waitInBufferTimer: ReturnType<typeof setTimeout> | null = null
  private _downloadComplete = false
  private _fatalError = false

  constructor(options: MP4Options) {
    super()
    this._config = getConfig(options)
    this.media = this._config.media
    if (this._config.softDecode) {
      this.media.setPlayMode?.('VOD')
    }
    this._bufferService = new BufferService(this, this._config)
    this._loader = new MP4Loader(this._getLoaderConfig())

    this.media.addEventListener('seeking', this._onSeeking)
    this.media.addEventListener('waiting', this._onWaiting)
    this.media.addEventListener('playing', this._onPlaying)
    this.media.addEventListener('ended', this._onEnded)
  }

  static isSupported(softDecode = false) {
    return softDecode ? typeof WebAssembly !== 'undefined' : MSE.isSupported()
  }

  get isMMS() {
    return this._bufferService.isMMS
  }

  load(url?: string, startTime = 0): Promise<number> {
    if (this._destroyed) {
      return Promise.reject(new Error('MP4 core has been destroyed'))
    }
    const nextUrl = url || this._loader.url || this._config.url
    if (!nextUrl) {
      return Promise.reject(new Error('Source url is missing'))
    }

    const loadId = ++this._loadId
    const task = this._loadQueue
      .catch(() => undefined)
      .then(() => this._load(nextUrl, loadId, startTime))
    this._loadQueue = task
    return task
  }

  async destroy() {
    if (this._destroyed) return
    this._destroyed = true
    this._loadId++
    this.media.removeEventListener('seeking', this._onSeeking)
    this.media.removeEventListener('waiting', this._onWaiting)
    this.media.removeEventListener('playing', this._onPlaying)
    this.media.removeEventListener('ended', this._onEnded)
    this._stopMonitoring()
    this._loading = false

    // destroy 不能复用 reload 的 reset：BufferService.reset 会重新绑定 MSE，
    // 在降级到原生 video 时会覆盖刚恢复的原始 URL。
    await Promise.all([
      this._loader.destroy().catch(() => undefined),
      this._bufferService.destroy().catch(() => undefined)
    ])
  }

  private async _load(url: string, loadId: number, startTime: number): Promise<number> {
    if (!this._isActiveLoad(loadId)) return 0
    this._stopTick()
    this._clearBufferBreakTimer()
    this._clearWaitInBufferTimer()
    this._loading = false
    this._inited = false
    this._prevSegmentEndTime = 0
    this._waitAdjustTimeCnt = 0
    this._downloadComplete = false
    this._fatalError = false

    try {
      // changeUrl 内部会 reset loader；这里不再额外 reset，避免同一次加载取消两遍。
      await Promise.all([
        this._loader.changeUrl(url, url, undefined, undefined),
        this._bufferService.reset()
      ])
    } catch (error) {
      if (!this._isActiveLoad(loadId)) return 0
      const streamingError = this._toStreamingError(error)
      this._emitError(streamingError, false)
      throw streamingError
    }
    if (!this._isActiveLoad(loadId)) return 0

    this._config.url = url
    this._lastCurrentTime = this.media.currentTime
    this._startTick(this._config.tickInterval)
    const restored = await this._loadSegment(startTime, loadId)
    if (!restored && startTime > 0 && this._isActiveLoad(loadId)) {
      await this._loadSegment(0, loadId)
      return 0
    }
    return startTime
  }

  private async _loadSegment(time: number | undefined, loadId: number): Promise<boolean> {
    if (!this._isActiveLoad(loadId)) return false
    if (this._loading && this._loadingId === loadId) return false
    const currentTime = this.media.currentTime
    const preloadTime = this.media.paused
      ? this._config.minBufferLength
      : this._config.maxBufferLength
    if (this._prevSegmentEndTime > currentTime + preloadTime) return true

    this._loading = true
    this._loadingId = loadId
    let result: LoadedSegment | undefined
    try {
      result =
        time !== undefined
          ? ((await this._loader.loadSegmentByTime(time, undefined)) as
              | LoadedSegment
              | undefined)
          : ((await this._loader.loadNextSegment(undefined)) as LoadedSegment | undefined)
    } catch (error) {
      this._finishLoading(loadId)
      if (!this._isActiveLoad(loadId)) return false
      const streamingError = StreamingError.network(error)
      this._emitError(streamingError)
      throw streamingError
    }
    if (!this._isActiveLoad(loadId)) {
      this._finishLoading(loadId)
      return false
    }
    if (!result) {
      this._finishLoading(loadId)
      return false
    }

    this._prevSegmentEndTime = Math.min(
      result.video?.endTime ?? Infinity,
      result.audio?.endTime ?? Infinity
    )
    const metadata = this._loader.meta as MP4Metadata
    try {
      this._bufferService.setSegmentList(
        this._loader.videoSegments,
        this._loader.audioSegments,
        metadata.isFragmentMP4 === true
      )
      await this._bufferService.appendBuffer(
        result.data,
        result.options.range[0],
        result.video?.frames,
        result.audio?.frames,
        metadata.moov
      )
      if (!this._isActiveLoad(loadId)) {
        this._finishLoading(loadId)
        return false
      }
      await this._bufferService.evictBuffer(this._config.bufferBehind)
    } catch (error) {
      this._finishLoading(loadId)
      if (!this._isActiveLoad(loadId)) return false
      const streamingError = this._toStreamingError(error)
      this._emitError(streamingError)
      throw streamingError
    }

    this._inited = true
    this._finishLoading(loadId)
    const segmentIndex = result.video?.index ?? result.audio?.index ?? 0
    if (this._loader.isLastSegment(segmentIndex)) {
      try {
        await this._completeDownload()
      } catch (error) {
        if (!this._isActiveLoad(loadId)) return false
        const streamingError = this._toStreamingError(error)
        this._emitError(streamingError, false)
        throw streamingError
      }
    } else {
      void this._loadSegment(undefined, loadId).catch(() => undefined)
    }
    return true
  }

  private async _completeDownload() {
    await this._bufferService.endOfStream()
    this._downloadComplete = true
  }

  private _onSeeking = async () => {
    if (this._destroyed || this._fatalError) return
    const seekTime = this.media.currentTime
    const { video, audio } = this._loader.getSegmentByTime(seekTime)
    const segment = video || audio
    if (!segment || this._loader.isSegmentLoading(segment.index)) return

    const buffered = Buffer.get(this.media)
    if (buffered) {
      const info = Buffer.info(buffered, seekTime, 0.1)
      if (info.end && (info.end >= segment.endTime || info.end >= this.media.duration)) {
        return
      }
    }

    const loadId = this._loadId
    await this._loader.cancel()
    if (!this._isActiveLoad(loadId)) return
    this._loading = false
    this._downloadComplete = false
    this._prevSegmentEndTime = 0
    void this._loadSegment(seekTime, loadId).catch(() => undefined)
    this._startTick()
  }

  private _startTick(time = 0) {
    this._stopTick()
    if (!this._destroyed) this._tickTimer = setTimeout(this._tick, time)
  }

  private _stopTick() {
    if (this._tickTimer) clearTimeout(this._tickTimer)
    this._tickTimer = null
  }

  private _tick = () => {
    this._stopTick()
    if (this._destroyed || this._fatalError) return
    this._startTick(this._config.tickInterval)
    this._bufferBreakCheck()
    const buffered = Buffer.get(this.media)
    if (!buffered || Buffer.end(buffered) < 0.1 || !this.media.readyState) return
    if (!this._downloadComplete && isMediaPlaying(this.media)) {
      void this._loadSegment(undefined, this._loadId).catch(() => undefined)
    }
  }

  private _onEnded = () => {
    this._stopMonitoring()
  }

  private _onPlaying = () => {
    if (this._fatalError) return
    this._lastCurrentTime = this.media.currentTime
    this._startTick()
  }

  /**
   * 播放态 currentTime 长时间不推进时判定卡死。paused/ended 或时间恢复推进会取消计时。
   */
  private _bufferBreakCheck() {
    if (this._config.disableBufferBreakCheck) return
    const currentTime = this.media.currentTime
    const advancing = currentTime !== this._lastCurrentTime
    if (advancing || this.media.paused || this.media.ended) {
      this._lastCurrentTime = currentTime
      this._clearBufferBreakTimer()
      return
    }
    if (this._bufferBreakTimer) return

    this._bufferBreakTimer = setTimeout(() => {
      this._bufferBreakTimer = null
      if (
        this._destroyed ||
        this.media.paused ||
        this.media.ended ||
        this.media.currentTime !== this._lastCurrentTime
      ) {
        return
      }
      this._emitError(this._toStreamingError(new Error('buffer break timeout')), false)
    }, this._config.waitingTimeOut)
  }

  /**
   * waiting 发生在已有充足 buffer 的区间内时，微调 currentTime 跳过解码卡点。
   */
  private _onWaiting = () => {
    this._clearWaitInBufferTimer()
    if (
      this._destroyed ||
      this._fatalError ||
      this._config.disableBufferBreakCheck ||
      this._waitAdjustTimeCnt >= this._config.waitJampBufferMaxCnt
    ) {
      return
    }
    const buffered = Buffer.get(this.media)
    if (!buffered || Buffer.end(buffered) - this.media.currentTime < 2) return

    const waitingTime = this.media.currentTime
    this._waitInBufferTimer = setTimeout(() => {
      this._waitInBufferTimer = null
      if (
        this._destroyed ||
        this.media.paused ||
        this.media.ended ||
        this.media.currentTime !== waitingTime
      ) {
        return
      }
      this._waitAdjustTimeCnt++
      this.media.currentTime += 0.5
    }, this._config.waitingInBufferTimeOut)
  }

  private _clearBufferBreakTimer() {
    if (this._bufferBreakTimer) clearTimeout(this._bufferBreakTimer)
    this._bufferBreakTimer = null
  }

  private _clearWaitInBufferTimer() {
    if (this._waitInBufferTimer) clearTimeout(this._waitInBufferTimer)
    this._waitInBufferTimer = null
  }

  private _stopMonitoring() {
    this._stopTick()
    this._clearBufferBreakTimer()
    this._clearWaitInBufferTimer()
  }

  private _emitError(error: StreamingError, endOfStream = true) {
    this._fatalError = true
    this._downloadComplete = true
    this._stopMonitoring()
    this.emit(EVENT.ERROR, error)
    if (endOfStream) {
      void this._bufferService.endOfStream().catch(() => undefined)
    }
  }

  private _toStreamingError(error: unknown) {
    return StreamingError.create(error, undefined, undefined, undefined, undefined)
  }

  private _isActiveLoad(loadId: number) {
    return !this._destroyed && loadId === this._loadId
  }

  private _finishLoading(loadId: number) {
    if (this._loadingId === loadId) this._loading = false
  }

  private _getLoaderConfig() {
    const config = this._config
    return {
      url: config.url,
      vid: config.vid,
      retry: config.retry,
      retryDelay: config.retryDelay,
      timeout: config.timeout,
      onProcessMinLen: config.onProcessMinLen,
      ...(config.segmentDuration == null
        ? {}
        : { segmentDuration: config.segmentDuration }),
      ...(config.responseType == null ? {} : { responseType: config.responseType }),
      ...(config.memoryOpt == null ? {} : { memoryOpt: config.memoryOpt }),
      ...(config.reqOptions || {})
    }
  }
}
