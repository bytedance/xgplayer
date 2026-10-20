import EventEmitter from 'eventemitter3'
import { Buffer, EVENT, isMediaPlaying, StreamingError } from 'xgplayer-streaming-shared'
import { BufferService } from './buffer-service'
import { getConfig } from './config'
import { MP3Loader } from './loader'
import type { MP3Config, MP3Options } from './types'

export class MP3 extends EventEmitter {
  static readonly version = __VERSION__

  private readonly media: HTMLMediaElement
  private readonly config: MP3Config
  private readonly loader: MP3Loader
  private readonly bufferService: BufferService
  private initialized = false
  private loadId = 0
  private loadQueue: Promise<number> = Promise.resolve(0)
  private loading = false
  private loadingId = 0
  private destroyed = false
  private fatalError = false
  private downloadComplete = false
  private tickTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: MP3Options) {
    super()
    this.config = getConfig(options)
    this.media = this.config.media
    this.loader = new MP3Loader(this.config)
    this.bufferService = new BufferService(this.config)

    this.bindEvents()
  }

  static isSupported(preferMMS = false): boolean {
    return BufferService.isSupported(preferMMS)
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

    const loadId = ++this.loadId
    const task = this.loadQueue
      .catch(() => undefined)
      .then(() => this.loadInternal(nextUrl, loadId, startTime))
    this.loadQueue = task
    return task
  }

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.loadId++
    this.fatalError = true
    this.downloadComplete = true
    this.unbindEvents()
    this.stopTick()
    this.loading = false
    this.removeAllListeners()
    this.loader.destroy()
    this.bufferService.destroy()
  }

  private async loadInternal(
    url: string,
    loadId: number,
    startTime: number
  ): Promise<number> {
    if (!this.isActiveLoad(loadId)) return 0
    this.stopTick()
    this.loading = false
    this.initialized = false
    this.fatalError = false
    this.downloadComplete = false

    try {
      await this.loader.changeUrl(url)
      const [, metadata] = await Promise.all([
        this.bufferService.reset(),
        this.loader.loadMetadata()
      ])
      if (!this.isActiveLoad(loadId)) return 0

      this.config.url = url
      const restoredTime = startTime >= 0 && startTime < metadata.duration ? startTime : 0
      this.startTick(this.config.tickInterval)
      const restored = await this.loadSegment(restoredTime, loadId, true)
      if (!restored && restoredTime > 0 && this.isActiveLoad(loadId)) {
        await this.loadSegment(0, loadId, true)
        return 0
      }
      return restoredTime
    } catch (error) {
      if (!this.isActiveLoad(loadId)) return 0
      const streamingError = this.toStreamingError(error)
      this.emitError(streamingError, false)
      throw streamingError
    }
  }

  private async loadSegment(
    time: number | undefined,
    loadId: number,
    discontinuity: boolean
  ): Promise<boolean> {
    if (!this.isActiveLoad(loadId) || this.loading) return false
    this.loading = true
    this.loadingId = loadId

    try {
      const segment =
        time == null
          ? await this.loader.loadNextSegment()
          : await this.loader.loadSegmentByTime(time)
      if (!this.isActiveLoad(loadId)) return false
      if (!segment) return false

      const metadata = this.loader.metadata
      if (!metadata) throw new Error('MP3 metadata is missing')
      await this.bufferService.appendSegment(segment, metadata.duration, discontinuity)
      if (!this.isActiveLoad(loadId)) return false
      await this.bufferService.evictBuffer(this.config.bufferBehind)

      this.initialized = true
      if (segment.isLast) {
        await this.completeDownload()
      } else {
        const preloadTime = this.media.paused
          ? this.config.minBufferLength
          : this.config.maxBufferLength
        if (segment.endTime <= this.media.currentTime + preloadTime) {
          void Promise.resolve().then(() =>
            this.loadSegment(undefined, loadId, false).catch(() => false)
          )
        }
      }
      return true
    } catch (error) {
      if (!this.isActiveLoad(loadId)) return false
      const streamingError = this.toStreamingError(error)
      this.emitError(streamingError)
      throw streamingError
    } finally {
      this.finishLoading(loadId)
    }
  }

  private async completeDownload(): Promise<void> {
    await this.bufferService.endOfStream()
    this.downloadComplete = true
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
      if (info.remaining > 0.1) return
    }

    const loadId = this.loadId
    void this.loader.cancel().then(() => {
      if (!this.isActiveLoad(loadId)) return
      this.loading = false
      this.downloadComplete = false
      void this.loadSegment(seekTime, loadId, true).catch(() => undefined)
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
    if (this.downloadComplete || !isMediaPlaying(this.media)) return

    const buffered = Buffer.get(this.media)
    const info = buffered
      ? Buffer.info(buffered, this.media.currentTime, 0.1)
      : { remaining: 0 }
    if (info.remaining < this.config.maxBufferLength) {
      void this.loadSegment(undefined, this.loadId, false).catch(() => undefined)
    }
  }

  private emitError(error: StreamingError, endOfStream = true): void {
    if (this.fatalError) return
    this.fatalError = true
    this.downloadComplete = true
    this.stopTick()
    this.emit(EVENT.ERROR, error)
    if (endOfStream) {
      void this.bufferService.endOfStream().catch(() => undefined)
    }
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

  private isActiveLoad(loadId: number): boolean {
    return !this.destroyed && loadId === this.loadId
  }

  private finishLoading(loadId: number): void {
    if (this.loadingId === loadId) this.loading = false
  }
}
