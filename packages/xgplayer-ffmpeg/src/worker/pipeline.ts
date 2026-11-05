import { HTTPSource } from '../io/http-source'
import { AUDIO_MIME, FLAC_MIME } from '../profiles/audio'
import type { PipelineOutput, WorkerCommand } from '../transcoder/protocol'
import { FFmpegError, type FFmpegMetadata, type FFmpegProgress } from '../types'
import type { FFmpegCore } from './core'

interface NativeMetadata {
  duration: number | null
  codec: string
  sampleRate: number
  channels: number
}

const CANCELLED = -1414092869

/** Native entries are serialized by StreamingWorker; JS cancellation never reenters WASM. */
export class NativePipeline {
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

  constructor(private readonly getCore: () => FFmpegCore) {}

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
      if (this.interrupted()) return this.signal.aborted ? CANCELLED : -5
      const source = this.source
      if (!source) throw new FFmpegError('download', 'No active HTTP source')
      const data = await source.readAt(offset, length, this.signal)
      // Cached reads must also yield to incoming cancellation/control messages.
      await new Promise<void>((resolve) => setTimeout(resolve, 0))
      if (this.interrupted()) return this.signal.aborted ? CANCELLED : -5
      if (source.stats.downloadedBytes > this.byteLimit)
        throw new FFmpegError('download', 'Native operation exceeded its input budget')
      this.getCore().HEAPU8.set(data, destination)
      return data.length
    } catch (error) {
      if (this.signal.aborted) return CANCELLED
      this.ioError = error
      return -5
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
    this.handle = this.call('xp_create', [
      source.size,
      audio.inputFormat ?? '',
      audio.inputSampleRate ?? 0,
      audio.inputChannels ?? 0
    ])
    if (!this.handle) throw new FFmpegError('runtime', 'Cannot allocate native pipeline')
    await this.operation('xp_open')
    const info = JSON.parse(this.text('xp_metadata')) as NativeMetadata
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
    const result = this.call('xp_configure', [
      this.handle,
      copy ? 1 : 0,
      audio.sampleRate ?? 0,
      audio.channels ?? 0,
      audio.bitrate ?? 0,
      request.segmentDuration
    ])
    this.checkResult(result)
    this.metadata = {
      duration: info.duration ?? Infinity,
      codec: copy ? 'flac' : 'aac',
      sampleRate: this.call('xp_rate', [this.handle]),
      channels: this.call('xp_channels', [this.handle]),
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
    await this.operation('xp_seek', [time])
  }

  async pull(signal: AbortSignal): Promise<PipelineOutput> {
    this.requireOpen()
    this.begin(signal)
    const kind = await this.operation('xp_pull')
    this.batches += 1
    if (this.batches > 1024)
      throw new FFmpegError(
        'transcode',
        'Native processing produced no media within its batch budget'
      )
    if (kind === 0) return { kind: 'yield' }
    if (kind === 3) return { kind: 'eof' }
    if (kind !== 1 && kind !== 2)
      throw new FFmpegError('runtime', 'Unknown native output kind')
    const pointer = this.call('xp_data', [this.handle])
    const length = this.call('xp_length', [this.handle])
    const core = this.getCore()
    if (
      length <= 0 ||
      length > 8 * 1024 * 1024 ||
      pointer < 0 ||
      pointer + length > core.HEAPU8.length
    )
      throw new FFmpegError('runtime', 'Invalid native output buffer')
    const data = core.HEAPU8.slice(pointer, pointer + length)
    const timestampOffset = -this.call('xp_bias', [this.handle])
    const start = this.call('xp_start', [this.handle])
    const end = this.call('xp_end', [this.handle])
    this.release('xp_release')
    if (kind === 1) return { kind: 'init', data, timestampOffset }
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
    if (this.handle) this.release('xp_close')
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

  private call(name: string, values: Array<number | string> = []): number {
    const result = this.getCore().ccall(
      name,
      'number',
      values.map((value) => (typeof value === 'string' ? 'string' : 'number')),
      values
    )
    if (typeof result !== 'number')
      throw new FFmpegError('runtime', 'Unexpected async native entry')
    return result
  }

  private text(name: string): string {
    return this.getCore().UTF8ToString(this.call(name, [this.handle]))
  }

  private release(name: 'xp_close' | 'xp_release'): void {
    this.getCore().ccall(name, null, ['number'], [this.handle])
  }

  private async operation(name: string, values: number[] = []): Promise<number> {
    const result = await this.getCore().ccall(
      name,
      'number',
      ['number', ...values.map(() => 'number' as const)],
      [this.handle, ...values],
      { async: true }
    )
    if (typeof result !== 'number')
      throw new FFmpegError('runtime', 'Invalid native operation result')
    this.checkResult(result)
    return result
  }

  private checkResult(result: number): void {
    if (this.signal.aborted)
      throw new DOMException('Native operation cancelled', 'AbortError')
    if (this.ioError) throw this.ioError
    if (result < 0) throw new FFmpegError('transcode', this.text('xp_error'))
  }
}
