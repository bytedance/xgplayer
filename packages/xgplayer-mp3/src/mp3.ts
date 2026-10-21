import EventEmitter from 'eventemitter3'
import {
  Buffer,
  EVENT,
  isMediaPlaying,
  Logger,
  StreamingError
} from 'xgplayer-streaming-shared'
import { BufferService } from './buffer-service'
import { getConfig } from './config'
import { MP3Loader } from './loader'
import { getLogSource } from './log'
import type { MP3Config, MP3Options } from './types'

const logger = new Logger('MP3', undefined)

interface LoadContext {
  readonly url: string
}

interface RequestContext {
  readonly load: LoadContext
  readonly reason: 'load' | 'seek'
}

export class MP3 extends EventEmitter {
  static readonly version = __VERSION__

  private readonly media: HTMLMediaElement
  private readonly config: MP3Config
  private readonly loader: MP3Loader
  private readonly bufferService: BufferService
  private initialized = false
  private activeLoad: LoadContext | null = null
  private activeRequest: RequestContext | null = null
  private loadQueue: Promise<number> = Promise.resolve(0)
  private loadingRequest: RequestContext | null = null
  private destroyed = false
  private fatalError = false
  private tickTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: MP3Options) {
    super()
    this.config = getConfig(options)
    if (this.config.openLog) MP3.enableLogger()
    this.media = this.config.media
    this.loader = new MP3Loader(this.config)
    this.bufferService = new BufferService(this.config)

    this.bindEvents()
  }

  static isSupported(preferMMS = false): boolean {
    return BufferService.isSupported(preferMMS)
  }

  static enableLogger(): void {
    Logger.enable()
  }

  static disableLogger(): void {
    Logger.disable()
  }

  get isInitialized(): boolean {
    return this.initialized
  }

  load(url?: string, startTime = 0): Promise<number> {
    if (this.destroyed) {
      return Promise.reject(new Error('MP3 core has been destroyed'))
    }
    const nextUrl = url || this.loader.url || this.config.url
    if (!nextUrl) return Promise.reject(new Error('Source url is missing'))

    const load = this.startLoad(nextUrl)
    logger.log('load enqueue', {
      ...getLogSource(nextUrl, this.config.vid),
      startTime
    })
    const task = this.loadQueue
      .catch(() => undefined)
      .then(() => this.loadInternal(nextUrl, load, startTime))
    this.loadQueue = task
    return task
  }

  destroy(): void {
    if (this.destroyed) return
    logger.log('destroy')
    this.destroyed = true
    this.activeLoad = null
    this.activeRequest = null
    this.fatalError = true
    this.unbindEvents()
    this.stopTick()
    this.loadingRequest = null
    this.removeAllListeners()
    this.loader.destroy()
    this.bufferService.destroy()
  }

  private async loadInternal(
    url: string,
    load: LoadContext,
    startTime: number
  ): Promise<number> {
    if (!this.isActiveLoad(load)) return 0
    this.stopTick()
    this.loadingRequest = null
    this.initialized = false
    this.fatalError = false
    const request = this.startRequest(load, 'load')
    logger.log('load start', {
      ...getLogSource(url, this.config.vid),
      startTime
    })

    try {
      await this.loader.changeUrl(url)
      const [, metadata] = await Promise.all([
        this.bufferService.reset(),
        this.loader.loadMetadata()
      ])
      if (!this.isActiveRequest(request)) return 0

      this.config.url = url
      const restoredTime = startTime >= 0 && startTime < metadata.duration ? startTime : 0
      logger.log('metadata ready', {
        ...getLogSource(url, this.config.vid),
        duration: metadata.duration,
        bitRate: metadata.bitRate,
        sampleRate: metadata.sampleRate,
        channelCount: metadata.channelCount,
        seekMode: metadata.seekMode,
        restoredTime
      })
      this.startTick(this.config.tickInterval)
      const restored = await this.loadSegment(restoredTime, request, true)
      if (!restored && restoredTime > 0 && this.isActiveRequest(request)) {
        logger.warn('restore segment failed, fallback to start', {
          restoredTime
        })
        await this.loadSegment(0, request, true)
        return 0
      }
      logger.log('load done', {
        ...getLogSource(url, this.config.vid),
        restoredTime
      })
      return restoredTime
    } catch (error) {
      if (!this.isActiveRequest(request)) return 0
      logger.error('load failed', error)
      const streamingError = this.toStreamingError(error)
      this.emitError(streamingError)
      throw streamingError
    }
  }

  private async loadSegment(
    time: number | undefined,
    request: RequestContext,
    discontinuity: boolean
  ): Promise<boolean> {
    if (!this.isActiveRequest(request) || this.loadingRequest || this.fatalError)
      return false
    this.loadingRequest = request
    logger.debug('loadSegment start', {
      time,
      reason: request.reason,
      discontinuity
    })

    try {
      const result =
        time == null
          ? await this.loader.loadNextSegment()
          : await this.loader.loadSegmentByTime(time)
      if (!this.isActiveRequest(request)) return false
      if (!result) {
        logger.debug('loadSegment empty', { time, reason: request.reason })
        return false
      }

      const metadata = this.loader.metadata
      if (!metadata) throw new Error('MP3 metadata is missing')
      const segment = result.segment
      if (segment) {
        await this.bufferService.appendSegment(segment, discontinuity)
        if (!this.isActiveRequest(request)) return false
      }
      await this.bufferService.updateDuration(metadata.duration)
      if (!this.isActiveRequest(request)) return false
      if (segment) {
        await this.bufferService.evictBuffer(this.config.bufferBehind)
        if (!this.isActiveRequest(request)) return false

        this.initialized = true
        logger.log('loadSegment appended', {
          reason: request.reason,
          index: segment.index,
          range: segment.range,
          startTime: segment.startTime,
          endTime: segment.endTime
        })
      }

      if (result.endOfFile) {
        await this.bufferService.endOfStream()
        if (!this.isActiveRequest(request)) return false
        logger.log('end of stream')
      } else if (segment) {
        const preloadTime = this.media.paused
          ? this.config.minBufferLength
          : this.config.maxBufferLength
        if (segment.endTime <= this.media.currentTime + preloadTime) {
          void Promise.resolve().then(() =>
            this.loadNextSegment(request).catch(() => false)
          )
        }
      }
      return true
    } catch (error) {
      if (!this.isActiveRequest(request)) return false
      logger.error('loadSegment failed', error)
      const streamingError = this.toStreamingError(error)
      this.emitError(streamingError)
      throw streamingError
    } finally {
      this.finishLoading(request)
    }
  }

  private bindEvents(): void {
    this.media.addEventListener('seeking', this.onSeeking)
    this.media.addEventListener('playing', this.onPlaying)
    this.media.addEventListener('ended', this.onEnded)
  }

  private unbindEvents(): void {
    this.media.removeEventListener('seeking', this.onSeeking)
    this.media.removeEventListener('playing', this.onPlaying)
    this.media.removeEventListener('ended', this.onEnded)
  }

  private onSeeking = (): void => {
    if (this.destroyed || this.fatalError) return
    const seekTime = this.media.currentTime
    const buffered = Buffer.get(this.media)
    if (buffered) {
      const info = Buffer.info(buffered, seekTime, 0.1)
      if (info.remaining > 0.1) {
        this.startTick()
        return
      }
    }

    logger.log('seek outside buffer', { seekTime })
    const load = this.activeLoad
    if (!load) return
    const request = this.startRequest(load, 'seek')
    void this.loader.cancel().then(() => {
      if (!this.isActiveRequest(request)) return
      this.loadingRequest = null
      void this.loadSegment(seekTime, request, true).catch(() => undefined)
    })
    this.startTick()
  }

  private onPlaying = (): void => {
    if (!this.fatalError) this.startTick()
  }

  private onEnded = (): void => {
    this.stopTick()
  }

  private startTick(delay = 0): void {
    this.stopTick()
    if (!this.destroyed) this.tickTimer = setTimeout(this.tick, delay)
  }

  private stopTick(): void {
    if (this.tickTimer) clearTimeout(this.tickTimer)
    this.tickTimer = null
  }

  private tick = (): void => {
    this.stopTick()
    if (this.destroyed || this.fatalError) return
    this.startTick(this.config.tickInterval)
    if (!isMediaPlaying(this.media)) return

    const buffered = Buffer.get(this.media)
    const info = buffered
      ? Buffer.info(buffered, this.media.currentTime, 0.1)
      : { remaining: 0 }
    if (info.remaining < this.config.maxBufferLength) {
      const request = this.activeRequest
      if (!request) return
      logger.debug('tick load next segment', {
        reason: request.reason,
        currentTime: this.media.currentTime,
        remaining: info.remaining
      })
      void this.loadNextSegment(request).catch(() => undefined)
    }
  }

  private loadNextSegment(request: RequestContext): Promise<boolean> {
    if (!this.isActiveRequest(request) || this.loadingRequest || this.fatalError)
      return Promise.resolve(false)
    const buffered = Buffer.get(this.media)
    const metadata = this.loader.metadata
    const info = buffered?.length
      ? Buffer.info(buffered, this.media.currentTime, 0.1)
      : null
    const continuationTime = info
      ? info.end || this.media.currentTime
      : this.loader.nextTime
    // The cursor may belong to a different buffered range after a backward seek.
    const discontinuity = Math.abs(continuationTime - this.loader.nextTime) > 0.1
    if (discontinuity) {
      if (!metadata || continuationTime >= metadata.duration)
        return Promise.resolve(false)
      return this.loadSegment(continuationTime, request, true)
    }
    if (!this.loader.hasNextSegment) return Promise.resolve(false)
    return this.loadSegment(undefined, request, false)
  }

  private emitError(error: StreamingError): void {
    if (this.fatalError) return
    logger.error('emit error', error)
    this.fatalError = true
    this.stopTick()
    this.emit(EVENT.ERROR, error)
  }

  private toStreamingError(error: unknown): StreamingError {
    if (
      error &&
      typeof error === 'object' &&
      ('response' in error || 'isTimeout' in error)
    ) {
      return StreamingError.network(error)
    }
    return StreamingError.create(
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  private isActiveLoad(load: LoadContext): boolean {
    return !this.destroyed && this.activeLoad === load
  }

  private isActiveRequest(request: RequestContext): boolean {
    return this.isActiveLoad(request.load) && this.activeRequest === request
  }

  private startLoad(url: string): LoadContext {
    const load = { url }
    this.activeLoad = load
    this.activeRequest = null
    return load
  }

  private startRequest(
    load: LoadContext,
    reason: RequestContext['reason']
  ): RequestContext {
    const request = { load, reason }
    this.activeRequest = request
    return request
  }

  private finishLoading(request: RequestContext): void {
    if (this.loadingRequest === request) {
      this.loadingRequest = null
    }
  }
}
