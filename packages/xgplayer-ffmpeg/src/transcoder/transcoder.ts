import {
  FFmpegError,
  type FFmpegOptions,
  type FFmpegOutputProfile,
  type FFmpegProgress
} from '../types'
import type { HTTPRequestOptions, TranscodeRequest, WorkerEvent } from './protocol'

interface TranscodeJob {
  readonly signal: AbortSignal
  readonly onChunk: (chunk: Uint8Array<ArrayBuffer>) => Promise<void>
  readonly onProgress: (event: FFmpegProgress) => void
  readonly onMetadata?: (duration: number) => Promise<void>
  readonly resolve: () => void
  readonly reject: (reason: Error) => void
  worker: Worker | null
  pendingChunk: number | null
  metadata: Promise<void> | null
}

/** Main-thread owner of one Worker request and its output acknowledgement. */
export class Transcoder {
  private activeJob: TranscodeJob | null = null

  constructor(
    private readonly options: FFmpegOptions,
    private readonly profile: FFmpegOutputProfile
  ) {}

  run(
    source: string,
    signal: AbortSignal,
    onChunk: TranscodeJob['onChunk'],
    onProgress: TranscodeJob['onProgress'],
    onMetadata?: TranscodeJob['onMetadata']
  ): Promise<void> {
    if (this.activeJob)
      return Promise.reject(
        new FFmpegError('runtime', 'A transcode job is already running')
      )
    let resolve!: () => void
    let reject!: (reason: Error) => void
    const completion = new Promise<void>((res, rej) => {
      resolve = res
      reject = rej
    })
    const job: TranscodeJob = {
      signal,
      onChunk,
      onProgress,
      onMetadata,
      resolve,
      reject,
      worker: null,
      pendingChunk: null,
      metadata: null
    }
    this.activeJob = job
    const abort = (): void =>
      this.fail(job, new DOMException('Media load cancelled', 'AbortError'))
    signal.addEventListener('abort', abort, { once: true })
    if (signal.aborted) abort()
    else
      void this.start(job, source).catch((reason: unknown) => {
        this.fail(
          job,
          reason instanceof FFmpegError
            ? reason
            : new FFmpegError('runtime', 'Cannot run streaming Worker', reason)
        )
      })
    return completion.finally(() => signal.removeEventListener('abort', abort))
  }

  destroy(): void {
    if (this.activeJob)
      this.fail(this.activeJob, new DOMException('Media load cancelled', 'AbortError'))
  }

  private async start(job: TranscodeJob, source: string): Promise<void> {
    const url = this.resolveSource(source)
    const request: TranscodeRequest = {
      type: 'start',
      source: url,
      requestOptions: await this.serializeOptions(url),
      maxInputBytes: this.options.maxInputBytes,
      ffmpeg: this.options.ffmpeg,
      args: this.getArguments(),
      inputArguments: this.profile.inputArguments
    }
    if (this.activeJob !== job) return
    const worker = new Worker(this.options.ffmpeg.workerURL, { type: 'module' })
    job.worker = worker
    worker.onmessage = ({ data }: MessageEvent<WorkerEvent>) => {
      if (this.activeJob !== job) return
      try {
        this.handleMessage(job, data)
      } catch (reason) {
        this.fail(
          job,
          reason instanceof FFmpegError
            ? reason
            : new FFmpegError('runtime', 'Streaming callback failed', reason)
        )
      }
    }
    worker.onerror = (event) => {
      this.fail(job, new FFmpegError('runtime', event.message || 'Worker failed'))
    }
    worker.onmessageerror = () => {
      this.fail(
        job,
        new FFmpegError('runtime', 'Cannot decode a streaming Worker message')
      )
    }
    worker.postMessage(request)
  }

  private handleMessage(job: TranscodeJob, event: WorkerEvent): void {
    switch (event.type) {
      case 'ready':
        return
      case 'error':
        this.fail(job, new FFmpegError(event.stage, event.message))
        return
      case 'progress':
        job.onProgress(event.data)
        return
      case 'metadata':
        if (
          job.metadata !== null ||
          job.pendingChunk !== null ||
          !Number.isFinite(event.duration) ||
          event.duration <= 0
        )
          throw new FFmpegError('runtime', 'Invalid Worker duration metadata')
        job.metadata = this.applyMetadata(job, event.duration)
        void job.metadata.catch((reason: Error) => this.fail(job, reason))
        return
      case 'done':
        if (job.pendingChunk !== null)
          throw new FFmpegError(
            'runtime',
            'Worker completed before output was acknowledged'
          )
        void this.finish(job).catch((reason: Error) => this.fail(job, reason))
        return
      case 'chunk':
        if (job.pendingChunk !== null)
          throw new FFmpegError(
            'runtime',
            'Worker sent output before its previous acknowledgement'
          )
        job.pendingChunk = event.id
        // Awaiting playback must not block error and cancellation messages.
        void this.consume(job, event).catch((reason: unknown) => {
          this.fail(
            job,
            reason instanceof FFmpegError
              ? reason
              : new FFmpegError('runtime', 'Cannot acknowledge Worker output', reason)
          )
        })
    }
  }

  private async consume(
    job: TranscodeJob,
    event: Extract<WorkerEvent, { type: 'chunk' }>
  ): Promise<void> {
    try {
      // Metadata and chunks arrive in order, but MSE duration updates are async.
      if (job.metadata) {
        await job.metadata
        if (this.activeJob !== job) return
      }
      await job.onChunk(event.data)
    } catch (reason) {
      throw reason instanceof FFmpegError
        ? reason
        : new FFmpegError('buffer', 'Media buffer operation failed', reason)
    }
    if (this.activeJob !== job) return
    job.pendingChunk = null
    job.worker?.postMessage({ type: 'ack', id: event.id })
  }

  private async applyMetadata(job: TranscodeJob, duration: number): Promise<void> {
    try {
      await job.onMetadata?.(duration)
    } catch (reason) {
      throw reason instanceof FFmpegError
        ? reason
        : new FFmpegError('buffer', 'Cannot update media duration', reason)
    }
  }

  private async finish(job: TranscodeJob): Promise<void> {
    await job.metadata
    this.complete(job)
  }

  private complete(job: TranscodeJob, error?: Error): void {
    if (this.activeJob !== job) return
    this.activeJob = null
    if (job.worker) {
      job.worker.onmessage = null
      job.worker.onerror = null
      job.worker.onmessageerror = null
      job.worker.terminate()
      job.worker = null
    }
    if (error) job.reject(error)
    else job.resolve()
  }

  private fail(job: TranscodeJob, error: Error): void {
    this.complete(job, error)
  }

  private async serializeOptions(url: string): Promise<HTTPRequestOptions | undefined> {
    const options = this.options.requestOptions
    if (!options) return
    if (options.body && typeof options.body === 'object' && 'getReader' in options.body)
      throw new FFmpegError('download', 'Streaming request bodies are not supported')
    // Request normalizes FormData/URLSearchParams bodies and their Content-Type.
    // Its signal stays on this side; only the listed cloneable fields are sent.
    try {
      const request = new Request(url, { ...options, signal: undefined })
      const headers: Record<string, string> = Object.create(null)
      request.headers.forEach((value, name) => {
        headers[name] = value
      })
      return {
        cache: options.cache,
        credentials: options.credentials,
        headers,
        integrity: options.integrity,
        keepalive: options.keepalive,
        method: options.method,
        mode: options.mode,
        priority: options.priority,
        redirect: options.redirect,
        referrer: options.referrer === undefined ? undefined : request.referrer,
        referrerPolicy: options.referrerPolicy,
        window: options.window,
        body: options.body == null ? undefined : await request.blob()
      }
    } catch (reason) {
      throw new FFmpegError('download', 'Invalid HTTP request options', reason)
    }
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

  private getArguments(): string[] {
    return [
      '-hide_banner',
      '-nostdin',
      '-y',
      '-probesize',
      '65536',
      '-analyzeduration',
      '1000000',
      ...this.profile.inputArguments,
      '-i',
      '/input',
      ...this.profile.outputArguments,
      '-f',
      'mp4',
      '-movflags',
      '+empty_moov+default_base_moof+frag_keyframe',
      '-frag_duration',
      String(Math.round((this.options.segmentDuration ?? 1) * 1000000)),
      '-flush_packets',
      '1'
    ]
  }
}
