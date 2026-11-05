import { FFmpegError } from '../types'
import { BlockCache } from './block-cache'

export interface HTTPSourceOptions {
  requestOptions?: RequestInit
  blockSize?: number
  cacheBytes?: number
  maxInputBytes?: number
}

interface BlockRequest {
  controller: AbortController
  promise: Promise<Uint8Array<ArrayBuffer>>
  consumers: number
}

export interface SourceStats {
  downloadedBytes: number
  totalBytes: number
  cacheBytes: number
  cacheHits: number
  rangeRequests: number
}

/** A fixed HTTP file. AVIO owns cursors; this owner only reads absolute bytes. */
export class HTTPSource {
  private readonly cache: BlockCache
  private readonly pending = new Map<number, BlockRequest>()
  private requestsFinished: Promise<void> = Promise.resolve()
  private readonly blockSize: number
  private length = 0
  private etag: string | null = null
  private closed = false
  private downloaded = 0
  private hits = 0
  private requests = 0

  constructor(
    private readonly url: string,
    private readonly options: HTTPSourceOptions = {}
  ) {
    this.blockSize = options.blockSize ?? 128 * 1024
    this.cache = new BlockCache(options.cacheBytes ?? 8 * 1024 * 1024)
    for (const value of [this.blockSize, this.cache.limit]) {
      if (!Number.isSafeInteger(value) || value <= 0)
        throw new FFmpegError('download', 'Source byte budgets must be positive integers')
    }
    const request = options.requestOptions
    if (request?.body != null || (request?.method && request.method !== 'GET'))
      throw new FFmpegError(
        'download',
        'Random-access sources require GET without a body'
      )
    if (new Headers(request?.headers).has('Range'))
      throw new FFmpegError('download', 'The source owns HTTP Range headers')
  }

  get size(): number {
    return this.length
  }

  get stats(): SourceStats {
    return {
      downloadedBytes: this.downloaded,
      totalBytes: this.length,
      cacheBytes: this.cache.size,
      cacheHits: this.hits,
      rangeRequests: this.requests
    }
  }

  async open(signal: AbortSignal): Promise<void> {
    if (!this.length) await this.block(0, signal)
  }

  async readAt(
    offset: number,
    length: number,
    signal: AbortSignal
  ): Promise<Uint8Array<ArrayBuffer>> {
    this.checkActive(signal)
    if (
      !this.length ||
      !Number.isSafeInteger(offset) ||
      offset < 0 ||
      offset > this.length ||
      !Number.isSafeInteger(length) ||
      length < 0
    )
      throw new FFmpegError('download', 'Invalid source read position')
    if (offset === this.length || !length) return new Uint8Array(0)
    const start = Math.floor(offset / this.blockSize) * this.blockSize
    const block = await this.block(start, signal)
    this.checkActive(signal)
    return block.subarray(offset - start, Math.min(block.length, offset - start + length))
  }

  close(): void {
    this.closed = true
    for (const request of this.pending.values()) request.controller.abort()
    this.pending.clear()
    this.cache.clear()
  }

  private async block(
    offset: number,
    signal: AbortSignal
  ): Promise<Uint8Array<ArrayBuffer>> {
    this.checkActive(signal)
    const cached = this.cache.get(offset)
    if (cached) {
      this.hits++
      return cached
    }
    let request = this.pending.get(offset)
    if (request?.controller.signal.aborted) {
      this.pending.delete(offset)
      request = undefined
    }
    if (!request) {
      const controller = new AbortController()
      const promise = this.requestsFinished.then(() => {
        this.checkActive(controller.signal)
        return this.fetchBlock(offset, controller.signal)
      })
      this.requestsFinished = promise.then(
        () => undefined,
        () => undefined
      )
      request = { controller, promise, consumers: 0 }
      this.pending.set(offset, request)
      void promise
        .finally(() => {
          if (this.pending.get(offset) === request) this.pending.delete(offset)
        })
        .catch(() => undefined)
    }
    request.consumers++
    const shared = request
    return new Promise((resolve, reject) => {
      let finished = false
      const finish = (): boolean => {
        if (finished) return false
        finished = true
        signal.removeEventListener('abort', abort)
        shared.consumers--
        if (!shared.consumers) shared.controller.abort()
        return true
      }
      const abort = (): void => {
        if (finish()) reject(new DOMException('Source read cancelled', 'AbortError'))
      }
      signal.addEventListener('abort', abort, { once: true })
      shared.promise.then(
        (data) => {
          if (finish()) resolve(data)
        },
        (error: unknown) => {
          if (finish()) reject(error)
        }
      )
      if (signal.aborted) abort()
    })
  }

  private async fetchBlock(
    start: number,
    signal: AbortSignal
  ): Promise<Uint8Array<ArrayBuffer>> {
    const end = this.length
      ? Math.min(this.length - 1, start + this.blockSize - 1)
      : start + this.blockSize - 1
    const headers = new Headers(this.options.requestOptions?.headers)
    headers.set('Range', `bytes=${start}-${end}`)
    if (this.etag) headers.set('If-Range', this.etag)
    this.requests++
    const response = await fetch(this.url, {
      ...this.options.requestOptions,
      method: 'GET',
      headers,
      signal
    })
    try {
      if (response.status !== 206)
        throw new FFmpegError(
          'download',
          `HTTP Range requires 206, received ${response.status}`
        )
      const encoding = response.headers.get('Content-Encoding')
      if (encoding && encoding !== 'identity')
        throw new FFmpegError(
          'download',
          'Encoded HTTP bodies cannot provide file byte offsets'
        )
      const range = response.headers.get('Content-Range')
      let expected: number
      if (range !== null) {
        const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(range)
        if (!match) throw new FFmpegError('download', 'Invalid Content-Range')
        const [, first, last, total] = match.map(Number)
        this.setSize(total)
        if (first !== start || last !== Math.min(end, total - 1))
          throw new FFmpegError(
            'download',
            'HTTP response returned a different byte range'
          )
        expected = last - first + 1
      } else {
        // Some CORS servers expose Content-Length but hide Content-Range.
        // A HEAD length plus 206 and exact body size is the explicit compatibility contract.
        if (!this.length) {
          const head = await fetch(this.url, {
            ...this.options.requestOptions,
            method: 'HEAD',
            headers: this.options.requestOptions?.headers,
            signal
          })
          if (!head.ok)
            throw new FFmpegError('download', 'Cannot determine HTTP file length')
          this.setSize(Number(head.headers.get('Content-Length')))
        }
        expected = Math.min(end, this.length - 1) - start + 1
      }
      const tag = response.headers.get('ETag')
      if (this.etag && tag && tag !== this.etag)
        throw new FFmpegError(
          'download',
          'HTTP resource changed during the source session'
        )
      if (tag && !tag.startsWith('W/')) this.etag ??= tag
      const contentLength = response.headers.get('Content-Length')
      if (contentLength !== null && Number(contentLength) !== expected)
        throw new FFmpegError(
          'download',
          'HTTP Range body length does not match the request'
        )
      if (!response.body) throw new FFmpegError('download', 'Empty HTTP Range response')
      const reader = response.body.getReader()
      const data = new Uint8Array(expected)
      let position = 0
      try {
        while (true) {
          const item = await reader.read()
          this.checkActive(signal)
          if (item.done) break
          this.downloaded += item.value.byteLength
          if (position + item.value.byteLength > expected)
            throw new FFmpegError('download', 'HTTP Range body exceeded its byte budget')
          data.set(item.value, position)
          position += item.value.byteLength
        }
        if (position !== expected)
          throw new FFmpegError('download', 'Truncated HTTP Range body')
      } finally {
        await reader.cancel()
        reader.releaseLock()
      }
      this.cache.set(start, data)
      return data
    } catch (reason) {
      if (!response.body?.locked) await response.body?.cancel()
      throw reason
    }
  }

  private setSize(size: number): void {
    if (!Number.isSafeInteger(size) || size <= 0)
      throw new FFmpegError(
        'download',
        'HTTP source must have a known, positive file length'
      )
    if (this.length && this.length !== size)
      throw new FFmpegError('download', 'HTTP resource length changed during the session')
    if (this.options.maxInputBytes !== undefined && size > this.options.maxInputBytes)
      throw new FFmpegError('download', 'HTTP source exceeds maxInputBytes')
    this.length = size
  }

  private checkActive(signal: AbortSignal): void {
    if (this.closed || signal.aborted)
      throw new DOMException('Source read cancelled', 'AbortError')
  }
}
