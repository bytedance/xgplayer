import { HTTPSource } from '../io/http-source'
import { AUDIO_MIME, FLAC_MIME } from '../profiles/audio'
import type { PipelineOutput, WorkerCommand } from '../transcoder/protocol'
import { FFmpegError, type FFmpegMetadata, type FFmpegProgress } from '../types'
import type { FFmpegCore } from './core'
import {
  NATIVE_CANCELLED,
  NATIVE_IO_ERROR,
  NativeBindings,
  NativeOutputKind
} from './native-bindings'

/** Native entries are serialized by StreamingWorker; JS cancellation never reenters WASM. */
export class NativePipeline {
  private readonly native: NativeBindings
  private handle = 0
  private source: HTTPSource | null = null
  private signal = new AbortController().signal
  private ioError: unknown = null
  private deadline = 0
  private byteLimit = Infinity
  private metadata: FFmpegMetadata | null = null
  private target = 0
  private time = 0
  private batches = 0

  constructor(private readonly getCore: () => FFmpegCore) {
    this.native = new NativeBindings(getCore)
  }

  get progress(): FFmpegProgress {
    const stats = this.source?.stats
    const duration = this.metadata?.duration ?? Infinity
    return {
      progress: Number.isFinite(duration) ? Math.min(1, this.time / duration) : 0,
      time: this.time,
      downloadedBytes: stats?.downloadedBytes ?? 0,
      totalBytes: stats?.totalBytes,
      cacheBytes: stats?.cacheBytes,
      rangeRequests: stats?.rangeRequests,
      inputEnded: false
    }
  }

  interrupted(): boolean {
    if (performance.now() > this.deadline && !this.ioError)
      this.ioError = new FFmpegError(
        'transcode',
        'Native operation exceeded its time budget'
      )
    return this.signal.aborted || !!this.ioError
  }

  async read(offset: number, destination: number, length: number): Promise<number> {
    try {
      if (this.interrupted())
        return this.signal.aborted ? NATIVE_CANCELLED : NATIVE_IO_ERROR
      const source = this.source
      if (!source) throw new FFmpegError('download', 'No active HTTP source')
      const data = await source.readAt(offset, length, this.signal)
      // Cached reads must also yield to incoming cancellation/control messages.
      await new Promise<void>((resolve) => setTimeout(resolve, 0))
      if (this.interrupted())
        return this.signal.aborted ? NATIVE_CANCELLED : NATIVE_IO_ERROR
      if (source.stats.downloadedBytes > this.byteLimit)
        throw new FFmpegError('download', 'Native operation exceeded its input budget')
      this.getCore().HEAPU8.set(data, destination)
      return data.length
    } catch (error) {
      if (this.signal.aborted) return NATIVE_CANCELLED
      this.ioError = error
      return NATIVE_IO_ERROR
    }
  }

  async open(
    request: Extract<WorkerCommand, { type: 'open' }>,
    signal: AbortSignal
  ): Promise<FFmpegMetadata> {
    this.close()
    this.begin(signal)
    this.byteLimit = 256 * 1024
    const source = (this.source = new HTTPSource(request.source, {
      requestOptions: request.requestOptions,
      cacheBytes: request.cacheBytes,
      maxInputBytes: request.maxInputBytes
    }))
    await source.open(signal)
    const audio = request.audio
    this.handle = this.native.create(
      source.size,
      audio.inputFormat ?? '',
      audio.inputSampleRate ?? 0,
      audio.inputChannels ?? 0
    )
    if (!this.handle) throw new FFmpegError('runtime', 'Cannot allocate native pipeline')
    this.checkResult(await this.native.open(this.handle))
    const info = this.native.metadata(this.handle)
    if (
      !info.codec ||
      info.sampleRate <= 0 ||
      info.channels <= 0 ||
      (info.duration !== null && (!Number.isFinite(info.duration) || info.duration <= 0))
    )
      throw new FFmpegError('transcode', 'Invalid native audio metadata')
    const explicitEncoding = !!(audio.sampleRate || audio.channels || audio.bitrate)
    const copy =
      audio.outputCodec !== 'aac' &&
      info.codec === 'flac' &&
      request.flacSupported &&
      !explicitEncoding
    if (audio.outputCodec === 'flac' && !copy)
      throw new FFmpegError(
        'transcode',
        'FLAC passthrough requires FLAC input and compatible MSE'
      )
    if (!copy && !request.aacSupported)
      throw new FFmpegError('runtime', 'AAC MSE is not supported')
    this.checkResult(
      this.native.configure(this.handle, {
        passthrough: copy,
        sampleRate: audio.sampleRate ?? 0,
        channels: audio.channels ?? 0,
        bitrate: audio.bitrate ?? 0,
        segmentDuration: request.segmentDuration
      })
    )
    this.metadata = {
      duration: info.duration ?? Infinity,
      codec: copy ? 'flac' : 'aac',
      ...this.native.outputParameters(this.handle),
      mimeType: copy ? FLAC_MIME : AUDIO_MIME
    }
    this.byteLimit = source.stats.downloadedBytes + 4 * 1024 * 1024
    return this.metadata
  }

  async seek(time: number, signal: AbortSignal): Promise<void> {
    this.requireOpen()
    this.begin(signal)
    this.target = time
    this.batches = 0
    this.time = time
    this.byteLimit = (this.source?.stats.downloadedBytes ?? 0) + 4 * 1024 * 1024
    this.checkResult(await this.native.seek(this.handle, time))
  }

  async pull(signal: AbortSignal): Promise<PipelineOutput> {
    this.requireOpen()
    this.begin(signal)
    const kind = await this.native.pull(this.handle)
    this.checkResult(kind)
    this.batches += 1
    if (this.batches > 1024)
      throw new FFmpegError(
        'transcode',
        'Native processing produced no media within its batch budget'
      )
    if (kind === NativeOutputKind.Yield) return { kind: 'yield' }
    if (kind === NativeOutputKind.Eof) return { kind: 'eof' }
    if (kind !== NativeOutputKind.Init && kind !== NativeOutputKind.Media)
      throw new FFmpegError('runtime', 'Unknown native output kind')
    const { data, timestampOffset, start, end } = this.native.takeOutput(this.handle)
    if (kind === NativeOutputKind.Init) return { kind: 'init', data, timestampOffset }
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start)
      throw new FFmpegError('transcode', 'Invalid native media timeline')
    this.time = end
    this.batches = 0
    if (end > this.target) this.byteLimit = Infinity
    return { kind: 'media', data, start, end, timestampOffset }
  }

  close(): void {
    this.source?.close()
    this.source = null
    if (this.handle) this.native.close(this.handle)
    this.handle = 0
    this.metadata = null
    this.target = this.time = 0
    this.batches = 0
    this.byteLimit = Infinity
  }

  private begin(signal: AbortSignal): void {
    this.signal = signal
    this.ioError = null
    this.deadline = performance.now() + 30000
    if (signal.aborted) throw new DOMException('Native operation cancelled', 'AbortError')
  }

  private requireOpen(): void {
    if (!this.handle || !this.metadata)
      throw new FFmpegError('runtime', 'Native pipeline is not open')
  }

  private checkResult(result: number): void {
    if (this.signal.aborted)
      throw new DOMException('Native operation cancelled', 'AbortError')
    if (this.ioError) throw this.ioError
    if (result < 0) throw new FFmpegError('transcode', this.native.error(this.handle))
  }
}
