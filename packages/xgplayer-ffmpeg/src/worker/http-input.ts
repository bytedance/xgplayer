import type { TranscodeRequest } from '../transcoder/protocol'
import { FFmpegError, type FFmpegProgress } from '../types'

type InputProgress = Pick<FFmpegProgress, 'downloadedBytes' | 'totalBytes' | 'inputEnded'>

/** Forward-only HTTP input; retain one response chunk instead of a complete file. */
export class HTTPInput {
  private reader: ReadableStreamDefaultReader<Uint8Array> | null
  private chunk: Uint8Array | null = null
  private offset = 0
  private closing: Promise<void> | null = null
  private readFailure: { reason: unknown } | null = null
  private readonly progress: InputProgress = { downloadedBytes: 0, inputEnded: false }

  private constructor(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    private readonly limit: number | undefined,
    private readonly onProgress: (event: InputProgress) => void
  ) {
    this.reader = reader
  }

  static async open(
    request: TranscodeRequest,
    onProgress: (event: InputProgress) => void
  ): Promise<HTTPInput> {
    const response = await fetch(request.source, request.requestOptions)
    if (!response.ok)
      throw new FFmpegError('download', `Media request failed: HTTP ${response.status}`)
    if (!response.body)
      throw new FFmpegError('download', 'Media response has no readable body')
    const input = new HTTPInput(
      response.body.getReader(),
      request.maxInputBytes,
      onProgress
    )
    try {
      input.setTotalBytes(response.headers.get('content-length'))
      return input
    } catch (reason) {
      await input.close()
      throw reason
    }
  }

  async read(buffer: Int8Array, offset: number, length: number): Promise<number> {
    if (!length) return 0
    try {
      while (!this.chunk || this.offset === this.chunk.length) {
        if (this.progress.inputEnded) return 0
        const reader = this.reader
        if (!reader) throw new Error('HTTP input is closed')
        let next: ReadableStreamReadResult<Uint8Array>
        try {
          next = await reader.read()
        } catch (reason) {
          this.readFailure = { reason }
          throw reason
        }
        if (next.done) {
          this.progress.inputEnded = true
          this.reportProgress()
          return 0
        }
        this.chunk = next.value
        this.offset = 0
        this.progress.downloadedBytes += next.value.length
        this.checkSize(this.progress.downloadedBytes)
        this.reportProgress()
      }
      const size = Math.min(length, this.chunk.length - this.offset)
      buffer.set(this.chunk.subarray(this.offset, this.offset + size), offset)
      this.offset += size
      return size
    } catch (reason) {
      throw reason instanceof FFmpegError
        ? reason
        : new FFmpegError('download', 'Media stream read failed', reason)
    }
  }

  close(): Promise<void> {
    if (this.closing) return this.closing
    const reader = this.reader
    this.reader = null
    this.chunk = null
    this.closing = reader ? this.cancelReader(reader) : Promise.resolve()
    return this.closing
  }

  private async cancelReader(
    reader: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<void> {
    try {
      await reader.cancel()
    } catch (reason) {
      // Cancelling an errored stream rejects with the same stored read failure.
      if (!this.readFailure || reason !== this.readFailure.reason)
        throw new FFmpegError('download', 'Cannot close HTTP input', reason)
    } finally {
      reader.releaseLock()
    }
  }

  private setTotalBytes(header: string | null): void {
    if (header !== null && Number.isFinite(Number(header)) && Number(header) >= 0) {
      this.progress.totalBytes = Number(header)
      this.checkSize(Number(header))
    }
    this.reportProgress()
  }

  private checkSize(size: number): void {
    if (this.limit !== undefined && size > this.limit)
      throw new FFmpegError('download', `Input exceeds ${this.limit} bytes`)
  }

  private reportProgress(): void {
    this.onProgress({ ...this.progress })
  }
}
