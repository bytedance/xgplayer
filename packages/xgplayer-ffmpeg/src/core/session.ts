import { MSE } from 'xgplayer-streaming-shared'
import type { PipelineOutput } from '../transcoder/protocol'
import type { Transcoder } from '../transcoder/transcoder'
import {
  FFmpegError,
  type FFmpegMetadata,
  type FFmpegOptions,
  type FFmpegProgress
} from '../types'
import { MSEBuffer } from './mse-buffer'

interface SessionEvents {
  ready(metadata: FFmpegMetadata): void
  progress(event: FFmpegProgress): void
  error(error: FFmpegError): void
}

interface PlaybackEpoch {
  controller: AbortController
  target: number
  seek: boolean
  preparing: boolean
}

const END_MARGIN = 0.05

/** One demand loop owns startup, seeking, backpressure and MMS range recovery. */
export class LoadSession {
  readonly ready: Promise<number>
  private readonly buffer: MSEBuffer
  private readonly controller = new AbortController()
  private readonly waiters = new Set<() => void>()
  private epoch: PlaybackEpoch
  private metadata: FFmpegMetadata | null = null
  private initialized = false
  private producing = true
  private eof = false
  private cursor = 0
  private resolve!: (time: number) => void
  private reject!: (reason: Error) => void
  private timeout: ReturnType<typeof setTimeout> | null
  private disposal: Promise<void> | null = null

  constructor(
    private readonly media: HTMLMediaElement,
    private readonly options: FFmpegOptions,
    private readonly transcoder: Transcoder,
    startTime: number,
    private readonly events: SessionEvents
  ) {
    this.epoch = {
      controller: new AbortController(),
      target: Number.isFinite(startTime) ? Math.max(0, startTime) : 0,
      seek: startTime > 0,
      preparing: true
    }
    this.buffer = new MSEBuffer(options)
    this.ready = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.timeout = setTimeout(
      () => events.error(new FFmpegError('transcode', 'Media startup timed out')),
      options.timeout ?? 120000
    )
  }

  async run(source: string): Promise<void> {
    this.metadata = await this.transcoder.open(source, this.controller.signal)
    this.checkActive()
    const duration = this.metadata.duration
    if (Number.isFinite(duration))
      this.epoch.target = Math.min(this.epoch.target, Math.max(0, duration - END_MARGIN))
    await this.buffer.open(this.media, this.metadata.mimeType, duration)
    this.checkActive()
    for (const event of ['timeupdate', 'seeking', 'waiting', 'play', 'pause'])
      this.media.addEventListener(event, this.onMediaEvent)
    this.media.addEventListener('error', this.onMediaError)
    this.buffer.mse.mediaSource?.addEventListener('startstreaming', this.onMediaEvent)
    this.buffer.mse.mediaSource?.addEventListener('endstreaming', this.onMediaEvent)
    this.buffer.mse.on(MSE.BUFFERED_CHANGE, this.onBufferedChange)
    while (!this.controller.signal.aborted) {
      const epoch = this.epoch
      try {
        if (epoch.seek) {
          await this.transcoder.seek(epoch.target, epoch.controller.signal)
          if (!this.isActive(epoch)) continue
          epoch.seek = false
          this.cursor = epoch.target
          this.eof = false
          this.producing = true
        }
        const time = this.initialized ? this.media.currentTime : epoch.target
        const ahead = Math.max(0, (this.buffer.containing(time)?.end ?? time) - time)
        if (ahead >= (this.options.bufferAhead ?? 20)) this.producing = false
        if (ahead < (this.options.bufferLow ?? (this.options.bufferAhead ?? 20) / 2))
          this.producing = true
        if (
          this.eof ||
          !this.producing ||
          (this.initialized && !epoch.preparing && !this.buffer.mse.streaming)
        ) {
          await this.wait()
          continue
        }
        await this.buffer.trim(time, this.options.bufferBehind ?? 20)
        if (!this.isActive(epoch)) continue
        const result = await this.transcoder.pull(epoch.controller.signal)
        if (!this.isActive(epoch)) continue
        this.events.progress(result.progress)
        const output = result.output
        if (output.kind === 'yield') continue
        if (output.kind === 'eof') {
          this.eof = true
          const ranges = this.buffer.ranges
          if (!ranges.length)
            throw new FFmpegError('transcode', 'FFmpeg produced no playable audio')
          await this.buffer.finish(this.cursor, epoch.controller.signal)
          if (this.isActive(epoch) && !this.initialized)
            this.markReady(
              Math.max(
                ranges[ranges.length - 1].start,
                ranges[ranges.length - 1].end - END_MARGIN
              )
            )
          continue
        }
        await this.append(output, epoch)
        if (!this.isActive(epoch)) continue
        if (output.kind === 'media') {
          this.cursor = output.end
          // Seeking to zero has the same first-sample boundary as startup.
          // Otherwise a delayed first frame leaves demand at an unfillable hole.
          if (
            this.initialized &&
            epoch.preparing &&
            epoch.target === 0 &&
            output.start > 0
          ) {
            const first = this.buffer.containing(output.start)
            if (first) {
              epoch.target = first.start
              this.media.currentTime = first.start
            }
          }
          if (this.buffer.containing(epoch.target)) epoch.preparing = false
          if (!this.initialized) {
            // Source timestamps can begin after zero (e.g. WMA decoder delay).
            // Use the real first playable boundary without shifting its clock.
            const playable = this.buffer.ranges.find(
              (range) =>
                range.end > epoch.target &&
                range.start <= Math.max(epoch.target, output.start) + END_MARGIN
            )
            if (playable) this.markReady(Math.max(epoch.target, playable.start))
          }
        }
      } catch (reason) {
        if (!this.isActive(epoch)) continue
        throw reason
      }
    }
  }

  fail(error: FFmpegError): void {
    this.reject(error)
  }

  dispose(): Promise<void> {
    if (this.disposal) return this.disposal
    this.clearTimeout()
    this.reject(new DOMException('Media load cancelled', 'AbortError'))
    this.controller.abort()
    this.epoch.controller.abort()
    this.transcoder.cancel()
    this.wake()
    for (const event of ['timeupdate', 'seeking', 'waiting', 'play', 'pause'])
      this.media.removeEventListener(event, this.onMediaEvent)
    this.media.removeEventListener('error', this.onMediaError)
    this.buffer.mse.off(MSE.BUFFERED_CHANGE, this.onBufferedChange)
    this.buffer.mse.mediaSource?.removeEventListener('startstreaming', this.onMediaEvent)
    this.buffer.mse.mediaSource?.removeEventListener('endstreaming', this.onMediaEvent)
    this.disposal = this.buffer.close()
    return this.disposal
  }

  private async append(
    output: Extract<PipelineOutput, { kind: 'init' | 'media' }>,
    epoch: PlaybackEpoch
  ): Promise<void> {
    try {
      await this.buffer.append(output, epoch.controller.signal)
    } catch (reason) {
      if (!this.isActive(epoch)) return
      const time = this.initialized ? this.media.currentTime : epoch.target
      if (
        !this.isQuota(reason) ||
        !(await this.buffer.reclaim(time, this.options.bufferAhead ?? 20))
      )
        throw reason
      if (this.isActive(epoch)) await this.buffer.append(output, epoch.controller.signal)
    }
    if (this.media.error) throw new FFmpegError('buffer', this.media.error.message)
  }

  private isQuota(reason: unknown): boolean {
    if (reason instanceof DOMException) return reason.name === 'QuotaExceededError'
    if (reason && typeof reason === 'object' && 'originError' in reason)
      return this.isQuota(reason.originError)
    return false
  }

  private onMediaEvent = (event: Event): void => {
    if (this.controller.signal.aborted) return
    if (
      this.initialized &&
      ['seeking', 'waiting', 'timeupdate', 'startstreaming'].includes(event.type)
    )
      this.recover(event.type === 'seeking')
    this.wake()
  }

  private onBufferedChange = (): void => {
    if (this.controller.signal.aborted) return
    if (this.initialized) this.recover(false)
    this.wake()
  }

  private onMediaError = (): void => {
    if (!this.controller.signal.aborted && this.media.error)
      this.events.error(new FFmpegError('buffer', this.media.error.message))
  }

  private recover(explicitSeek: boolean): void {
    const time = this.media.currentTime
    const range = this.buffer.containing(time)
    const ahead = (range?.end ?? time) - time
    const missing =
      !range || ahead < (this.options.bufferLow ?? (this.options.bufferAhead ?? 20) / 2)
    // A future disjoint range must never hide a hole before the producer cursor.
    const hole = missing && this.cursor > (range?.end ?? time) + END_MARGIN
    const end = this.metadata?.duration ?? Infinity
    if (
      (!explicitSeek && !hole) ||
      (explicitSeek &&
        range &&
        !this.epoch.seek &&
        this.cursor <= range.end + END_MARGIN) ||
      time >= end - END_MARGIN ||
      (this.epoch.seek && this.epoch.target === time)
    )
      return
    this.epoch.controller.abort()
    this.transcoder.cancel()
    this.epoch = {
      controller: new AbortController(),
      target: Math.max(0, time),
      seek: true,
      preparing: !range
    }
    this.producing = true
    this.wake()
  }

  private markReady(time: number): void {
    this.clearTimeout()
    this.initialized = true
    this.epoch.preparing = false
    this.media.currentTime = time
    this.resolve(time)
    if (this.metadata) this.events.ready(this.metadata)
  }

  private wait(): Promise<void> {
    return new Promise((resolve) => this.waiters.add(resolve))
  }

  private wake(): void {
    for (const resolve of this.waiters) resolve()
    this.waiters.clear()
  }

  private isActive(epoch: PlaybackEpoch): boolean {
    return !this.controller.signal.aborted && this.epoch === epoch
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
