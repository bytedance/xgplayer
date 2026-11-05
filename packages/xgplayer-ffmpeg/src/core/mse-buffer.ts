import { MSE } from 'xgplayer-streaming-shared'
import type { PipelineOutput } from '../transcoder/protocol'
import { FFmpegError, type FFmpegOptions } from '../types'

export interface BufferedRange {
  start: number
  end: number
}

/** All local mutations share one queue, including precise SourceBuffer attributes. */
export class MSEBuffer {
  readonly mse: MSE
  private tail: Promise<void> = Promise.resolve()
  private closed = false
  private readonly controller = new AbortController()
  private duration = Infinity

  constructor(options: FFmpegOptions) {
    this.mse = new MSE(undefined, {
      preferMMS: options.preferMMS,
      attachMode: options.mseAttachMode
    })
  }

  async open(media: HTMLMediaElement, mimeType: string, duration: number): Promise<void> {
    await this.mse.bindMedia(media)
    this.checkActive()
    this.mse.createSource('audio', mimeType)
    this.duration = duration
    await this.enqueue(async () => {
      await this.mse.updateDuration(duration)
    })
  }

  get ranges(): BufferedRange[] {
    const buffered = this.mse.buffered('audio')
    const ranges: BufferedRange[] = []
    for (let index = 0; buffered && index < buffered.length; index++)
      ranges.push({ start: buffered.start(index), end: buffered.end(index) })
    return ranges
  }

  containing(time: number): BufferedRange | undefined {
    return this.ranges.find((range) => time >= range.start && time < range.end)
  }

  append(
    output: Extract<PipelineOutput, { kind: 'init' | 'media' }>,
    signal: AbortSignal
  ): Promise<void> {
    return this.enqueue(async () => {
      if (signal.aborted) return
      if (output.kind === 'init') {
        const sb = this.mse.getSourceBuffer('audio')
        if (!sb) throw new FFmpegError('buffer', 'Audio SourceBuffer is missing')
        // timestampOffset reopens an ended MediaSource. Abort only after reopen,
        // while idle; it resets parser state without removing buffered audio.
        sb.timestampOffset = output.timestampOffset
        sb.abort()
        sb.appendWindowStart = 0
        sb.appendWindowEnd = this.duration
      }
      await this.appendBytes(output.data)
      // Appending after EOS can restore the previous coded-frame end, including
      // encoder padding. Keep the declared source duration after reopening.
      if (Number.isFinite(this.duration) && this.mse.duration !== this.duration)
        await this.mse.updateDuration(this.duration)
    })
  }

  trim(time: number, behind: number): Promise<void> {
    return this.enqueue(async () => {
      const end = time - behind
      if (end > 0 && this.ranges.some((range) => range.start < end))
        await this.mse.remove('audio', 0, end)
    })
  }

  /** Retry quota only when real ranges outside the protected playback window exist. */
  reclaim(time: number, ahead: number): Promise<boolean> {
    let removed = false
    return this.enqueue(async () => {
      for (const range of this.ranges) {
        if (range.start < time - 1) {
          await this.mse.remove('audio', range.start, Math.min(range.end, time - 1))
          removed = true
        }
        if (range.end > time + ahead) {
          await this.mse.remove('audio', Math.max(range.start, time + ahead), range.end)
          removed = true
        }
      }
    }).then(() => removed)
  }

  finish(end: number, signal: AbortSignal): Promise<void> {
    return this.enqueue(async () => {
      if (signal.aborted) return
      if (!Number.isFinite(this.duration)) {
        this.duration = end
        await this.mse.updateDuration(end)
      }
      await this.mse.endOfStream()
    })
  }

  async close(): Promise<void> {
    this.closed = true
    this.controller.abort()
    await this.mse.unbindMedia()
  }

  private appendBytes(data: Uint8Array<ArrayBuffer>): Promise<void> {
    const sb = this.mse.getSourceBuffer('audio')
    if (!sb)
      return Promise.reject(new FFmpegError('buffer', 'Audio SourceBuffer is missing'))
    return new Promise((resolve, reject) => {
      const cleanup = (): void => {
        sb.removeEventListener('updateend', complete)
        sb.removeEventListener('error', error)
        this.controller.signal.removeEventListener('abort', abort)
      }
      const complete = (): void => {
        cleanup()
        resolve()
      }
      const error = (): void => {
        cleanup()
        reject(new FFmpegError('buffer', 'SourceBuffer rejected the audio segment'))
      }
      const abort = (): void => {
        cleanup()
        reject(new DOMException('Media buffer detached', 'AbortError'))
      }
      sb.addEventListener('updateend', complete, { once: true })
      sb.addEventListener('error', error, { once: true })
      this.controller.signal.addEventListener('abort', abort, { once: true })
      try {
        sb.appendBuffer(data)
      } catch (reason) {
        cleanup()
        reject(reason)
      }
    })
  }

  private enqueue(operation: () => Promise<void>): Promise<void> {
    const result = this.tail.then(async () => {
      this.checkActive()
      await operation()
      this.checkActive()
    })
    this.tail = result.catch(() => undefined)
    return result
  }

  private checkActive(): void {
    if (this.closed) throw new DOMException('Media buffer detached', 'AbortError')
  }
}
