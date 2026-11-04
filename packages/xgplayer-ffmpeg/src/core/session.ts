import { MSE } from 'xgplayer-streaming-shared'
import { Transcoder } from '../transcoder/transcoder'
import {
  FFmpegError,
  type FFmpegMetadata,
  type FFmpegOptions,
  type FFmpegOutputProfile,
  type FFmpegProgress
} from '../types'

interface SessionEvents {
  ready(metadata: FFmpegMetadata): void
  progress(event: FFmpegProgress): void
  error(error: FFmpegError): void
  seek(time: number): void
}

// TimeRanges excludes its end; leave room for media clock rounding when seeking.
const BUFFER_END_MARGIN = 0.05

/** One source owns its Worker, MSE, startup result and cancellation together. */
export class LoadSession {
  readonly ready: Promise<number>
  private readonly controller = new AbortController()
  private readonly transcoder: Transcoder
  private readonly mse: MSE
  private readonly waiters = new Set<() => void>()
  private readonly targetTime: number
  private resolve!: (time: number) => void
  private reject!: (reason: Error) => void
  private initialized = false
  private duration = Number.POSITIVE_INFINITY
  private timeout: ReturnType<typeof setTimeout> | null
  private disposal: Promise<void> | null = null

  constructor(
    private readonly media: HTMLMediaElement,
    private readonly options: FFmpegOptions,
    private readonly profile: FFmpegOutputProfile,
    startTime: number,
    private readonly events: SessionEvents
  ) {
    this.targetTime = Number.isFinite(startTime) ? Math.max(0, startTime) : 0
    this.transcoder = new Transcoder(options, profile)
    this.mse = new MSE(undefined, {
      preferMMS: options.preferMMS,
      attachMode: options.mseAttachMode
    })
    this.ready = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.timeout = setTimeout(() => {
      events.error(new FFmpegError('transcode', 'Media startup timed out'))
    }, options.timeout ?? 120000)
  }

  async open(): Promise<void> {
    this.checkActive()
    for (const event of ['timeupdate', 'seeking', 'waiting']) {
      this.media.addEventListener(event, this.onMediaEvent)
    }
    this.media.addEventListener('error', this.onMediaError)
    await this.mse.bindMedia(this.media)
    this.checkActive()
    this.mse.mediaSource?.addEventListener('startstreaming', this.onMediaEvent)
    this.mse.on(MSE.BUFFERED_CHANGE, this.onBufferedChange)
    this.mse.createSource(this.profile.type, this.profile.mimeType)
    await this.mse.updateDuration(Number.POSITIVE_INFINITY)
    this.checkActive()
  }

  async run(source: string): Promise<void> {
    this.checkActive()
    await this.transcoder.run(
      source,
      this.controller.signal,
      (chunk) => this.append(chunk),
      (event) => {
        if (!this.controller.signal.aborted) this.events.progress(event)
      },
      (duration) => this.updateDuration(duration)
    )
    this.checkActive()
    await this.finish()
  }

  fail(error: FFmpegError): void {
    this.reject(error)
  }

  dispose(): Promise<void> {
    if (this.disposal) return this.disposal
    this.clearTimeout()
    this.reject(new DOMException('Media load cancelled', 'AbortError'))
    this.controller.abort()
    this.transcoder.destroy()
    this.wake()
    for (const event of ['timeupdate', 'seeking', 'waiting']) {
      this.media.removeEventListener(event, this.onMediaEvent)
    }
    this.media.removeEventListener('error', this.onMediaError)
    this.mse.off(MSE.BUFFERED_CHANGE, this.onBufferedChange)
    this.mse.mediaSource?.removeEventListener('startstreaming', this.onMediaEvent)
    this.disposal = this.mse.unbindMedia().catch((reason: unknown) => {
      throw new FFmpegError('buffer', 'Cannot detach media buffer', reason)
    })
    return this.disposal
  }

  private async append(chunk: Uint8Array<ArrayBuffer>): Promise<void> {
    while (true) {
      this.checkActive()
      const time = this.initialized ? this.media.currentTime : this.targetTime
      await this.trimBuffer(time)
      this.checkActive()
      if (
        this.mse.bufferEnd(this.profile.type) < time + (this.options.bufferAhead ?? 20) &&
        (!this.initialized || this.mse.streaming)
      )
        break
      await new Promise<void>((resolve) => this.waiters.add(resolve))
    }
    await this.mse.append(this.profile.type, chunk)
    this.checkActive()
    if (this.media.error) throw new FFmpegError('buffer', this.media.error.message)
    if (
      !this.initialized &&
      this.mse.bufferEnd(this.profile.type) > this.targetTime + BUFFER_END_MARGIN
    )
      this.markReady(this.targetTime, this.duration)
  }

  private async trimBuffer(time: number): Promise<void> {
    const end = this.mse.bufferEnd(this.profile.type)
    const removeEnd = Math.min(time, end) - (this.options.bufferBehind ?? 20)
    if (removeEnd > this.mse.bufferStart(this.profile.type)) {
      await this.mse.remove(this.profile.type, 0, removeEnd)
    }
  }

  private async finish(): Promise<void> {
    const end = this.mse.bufferEnd(this.profile.type)
    if (!end) throw new FFmpegError('transcode', 'FFmpeg produced no playable media')
    await this.updateDuration(end)
    await this.mse.endOfStream()
    this.checkActive()
    if (!this.initialized) this.markReady(Math.max(0, end - BUFFER_END_MARGIN), end)
  }

  private markReady(time: number, duration: number): void {
    this.clearTimeout()
    this.initialized = true
    this.media.currentTime = time
    this.resolve(time)
    this.events.ready({ duration, mimeType: this.profile.mimeType })
  }

  private async updateDuration(duration: number): Promise<void> {
    this.checkActive()
    await this.mse.updateDuration(duration)
    this.checkActive()
    this.duration = duration
  }

  private onMediaEvent = (event?: Event): void => {
    if (this.controller.signal.aborted) return
    if (this.initialized && event?.type === 'seeking') this.recoverSeek()
    this.wake()
  }

  private onBufferedChange = (): void => {
    this.onMediaEvent()
  }

  private onMediaError = (): void => {
    if (this.controller.signal.aborted || !this.media.error) return
    this.events.error(new FFmpegError('buffer', this.media.error.message))
  }

  private recoverSeek(): void {
    const ranges = this.mse.buffered(this.profile.type)
    const time = this.media.currentTime
    if (ranges?.length) {
      for (let index = 0; index < ranges.length; index++) {
        if (time >= ranges.start(index) && time < ranges.end(index)) return
      }
      // Keep reading toward a later target; native seeking handles the final endpoint.
      if (time >= ranges.end(ranges.length - 1)) return
    }
    this.events.seek(time)
  }

  private wake(): void {
    for (const resolve of this.waiters) resolve()
    this.waiters.clear()
  }

  private clearTimeout(): void {
    if (this.timeout !== null) clearTimeout(this.timeout)
    this.timeout = null
  }

  private checkActive(): void {
    if (this.controller.signal.aborted)
      throw new DOMException('Media load cancelled', 'AbortError')
  }
}
