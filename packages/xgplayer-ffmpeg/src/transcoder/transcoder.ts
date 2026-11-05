import { MSE } from 'xgplayer-streaming-shared'
import { AUDIO_MIME, FLAC_MIME } from '../profiles/audio'
import {
  FFmpegError,
  type FFmpegMetadata,
  type FFmpegOptions,
  type FFmpegOutputProfile
} from '../types'
import type { HTTPRequestOptions, WorkerCommand, WorkerEvent } from './protocol'

type CommandPayload = {
  [K in WorkerCommand['type']]: Omit<Extract<WorkerCommand, { type: K }>, 'id' | 'epoch'>
}[WorkerCommand['type']]

interface PendingCommand {
  type: WorkerCommand['type']
  resolve(event: WorkerEvent): void
  reject(reason: Error): void
  cleanup(): void
}

/** One persistent Worker; epoch changes cancel old work without replacing the module. */
export class Transcoder {
  private worker: Worker | null = null
  private epoch = 0
  private nextId = 0
  private readonly pending = new Map<number, PendingCommand>()
  private destroyed = false

  constructor(
    private readonly options: FFmpegOptions,
    private readonly profile: FFmpegOutputProfile
  ) {}

  async open(source: string, signal: AbortSignal): Promise<FFmpegMetadata> {
    this.cancel()
    const url = this.resolveSource(source)
    const event = await this.send(
      {
        type: 'open',
        source: url,
        ffmpeg: this.options.ffmpeg,
        audio: this.profile.audio,
        aacSupported: MSE.isSupported(AUDIO_MIME, this.options.preferMMS),
        flacSupported: MSE.isSupported(FLAC_MIME, this.options.preferMMS),
        cacheBytes: this.options.cacheBytes,
        maxInputBytes: this.options.maxInputBytes,
        segmentDuration: this.options.segmentDuration ?? 1,
        requestOptions: this.serializeOptions()
      },
      signal
    )
    if (event.type !== 'opened')
      throw new FFmpegError('runtime', 'Expected audio metadata')
    return event.metadata
  }

  async seek(time: number, signal: AbortSignal): Promise<void> {
    this.cancel()
    await this.send({ type: 'seek', time }, signal)
  }

  async pull(signal: AbortSignal): Promise<Extract<WorkerEvent, { type: 'output' }>> {
    const event = await this.send({ type: 'pull' }, signal)
    if (event.type !== 'output')
      throw new FFmpegError('runtime', 'Expected native output')
    return event
  }

  cancel(): void {
    this.epoch++
    for (const command of this.pending.values()) {
      command.cleanup()
      command.reject(new DOMException('Worker command cancelled', 'AbortError'))
    }
    this.pending.clear()
    this.worker?.postMessage({ type: 'cancel', epoch: this.epoch })
  }

  async close(): Promise<void> {
    this.cancel()
    if (this.worker && !this.destroyed)
      await this.send({ type: 'close' }, new AbortController().signal)
  }

  destroy(): void {
    this.destroyed = true
    this.cancel()
    this.releaseWorker()
  }

  private send(payload: CommandPayload, signal: AbortSignal): Promise<WorkerEvent> {
    if (this.destroyed)
      return Promise.reject(new FFmpegError('runtime', 'Worker client is destroyed'))
    if (signal.aborted)
      return Promise.reject(new DOMException('Worker command cancelled', 'AbortError'))
    const worker = this.getWorker()
    this.nextId += 1
    const id = this.nextId
    const request = { ...payload, id, epoch: this.epoch } as WorkerCommand
    return new Promise((resolve, reject) => {
      const abort = (): void => this.cancel()
      const timer = setTimeout(
        () => this.fault(new FFmpegError('runtime', 'Worker command timed out')),
        this.options.timeout ?? 120000
      )
      const cleanup = (): void => {
        clearTimeout(timer)
        signal.removeEventListener('abort', abort)
      }
      this.pending.set(id, { type: payload.type, resolve, reject, cleanup })
      signal.addEventListener('abort', abort, { once: true })
      try {
        worker.postMessage(request)
      } catch (reason) {
        this.fault(new FFmpegError('runtime', 'Cannot send Worker command', reason))
      }
    })
  }

  private getWorker(): Worker {
    if (this.worker) return this.worker
    const worker = (this.worker = new Worker(this.options.ffmpeg.workerURL, {
      type: 'module'
    }))
    worker.onmessage = ({ data }: MessageEvent<WorkerEvent>) => {
      if (data.epoch !== this.epoch) return
      const command = this.pending.get(data.id)
      if (!command) return
      this.pending.delete(data.id)
      command.cleanup()
      if (data.type === 'error') {
        command.reject(
          data.cancelled
            ? new DOMException(data.message, 'AbortError')
            : new FFmpegError(data.stage, data.message)
        )
        return
      }
      const expected =
        command.type === 'open'
          ? 'opened'
          : command.type === 'pull'
            ? 'output'
            : 'complete'
      if (data.type !== expected) {
        const error = new FFmpegError('runtime', 'Unexpected Worker response')
        command.reject(error)
        this.fault(error)
      } else command.resolve(data)
    }
    worker.onerror = (event) =>
      this.fault(new FFmpegError('runtime', event.message || 'Worker failed'))
    worker.onmessageerror = () =>
      this.fault(new FFmpegError('runtime', 'Cannot decode Worker response'))
    return worker
  }

  private fault(error: FFmpegError): void {
    for (const command of this.pending.values()) {
      command.cleanup()
      command.reject(error)
    }
    this.pending.clear()
    this.releaseWorker()
  }

  private releaseWorker(): void {
    if (!this.worker) return
    this.worker.onmessage = this.worker.onerror = this.worker.onmessageerror = null
    this.worker.terminate()
    this.worker = null
  }

  private serializeOptions(): HTTPRequestOptions | undefined {
    const options = this.options.requestOptions
    if (!options) return
    const headers: Record<string, string> = {}
    new Headers(options.headers).forEach((value, name) => {
      headers[name] = value
    })
    return { ...options, headers }
  }

  private resolveSource(source: string): string {
    try {
      if (typeof source !== 'string' || !source.trim()) throw new Error('Empty URL')
      const url = new URL(
        source,
        typeof document === 'undefined' ? undefined : document.baseURI
      )
      if (url.protocol !== 'http:' && url.protocol !== 'https:')
        throw new Error('Unsupported protocol')
      return url.href
    } catch (reason) {
      throw new FFmpegError('download', 'Media source must be an HTTP(S) URL', reason)
    }
  }
}
