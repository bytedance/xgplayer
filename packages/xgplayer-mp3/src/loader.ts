import { Logger, NetLoader } from 'xgplayer-streaming-shared'
import { getLogSource } from './log'
import {
  MP3ParserError,
  parseMP3Metadata,
  scanMP3Frames,
  timeToByteOffset
} from './parser'
import type { MP3Config, MP3Metadata, MP3Segment } from './types'

interface NetworkResponse {
  data?: Uint8Array | string
  response?: Response
}

interface RangeData {
  data: Uint8Array
  end: number
  fileSize: number
  start: number
}

function getRangeFileSize(response: Response | undefined, dataLength: number): number {
  const contentRange = response?.headers?.get('content-range')
  const match = contentRange?.match(/\/(\d+)$/)
  if (match) return Number.parseInt(match[1], 10)
  if (response?.status === 200) return dataLength
  return 0
}

function getContentLength(response: Response | undefined): number {
  const contentLength = response?.headers?.get('content-length')
  return contentLength ? Number.parseInt(contentLength, 10) || 0 : 0
}

export class MP3Loader {
  private readonly config: MP3Config
  private readonly netLoader: NetLoader
  private readonly logger: Logger
  private _metadata: MP3Metadata | null = null
  private _url: string
  private fullData: Uint8Array | null = null
  private fileSize = 0
  private currentIndex = -1
  private currentOffset = 0
  private currentTime = 0
  private linearFromStart = false
  private destroyed = false

  constructor(config: MP3Config) {
    this.config = config
    this._url = config.url
    this.logger = new Logger('MP3Loader', undefined)
    if (config.openLog) Logger.enable()
    this.netLoader = new NetLoader({
      url: config.url,
      retry: config.retry,
      retryDelay: config.retryDelay,
      timeout: config.timeout,
      responseType: 'arraybuffer',
      logger: this.logger,
      ...(config.reqOptions || {})
    })
  }

  get metadata(): MP3Metadata | null {
    return this._metadata
  }

  get url(): string {
    return this._url
  }

  async changeUrl(url: string): Promise<void> {
    this.ensureActive()
    this.logger.log('changeUrl', {
      from: getLogSource(this._url, this.config.vid).source,
      ...getLogSource(url, this.config.vid)
    })
    await this.reset()
    this.ensureActive()
    this._url = url
  }

  async loadMetadata(): Promise<MP3Metadata> {
    this.ensureActive()
    if (this._metadata) return this._metadata

    let probeEnd = this.config.probeSize - 1
    let lastError: unknown
    this.logger.log('loadMetadata start', {
      ...getLogSource(this._url, this.config.vid),
      probeSize: this.config.probeSize,
      maxProbeSize: this.config.maxProbeSize
    })
    while (probeEnd < this.config.maxProbeSize) {
      const range = await this.loadRange(0, probeEnd)
      this.ensureActive()
      const fileSize = this.fullData?.byteLength || this.getRangeFileSize(range)
      if (!fileSize) {
        throw new Error(
          'MP3 response must expose the complete file size by Content-Range or HEAD Content-Length'
        )
      }

      try {
        this._metadata = parseMP3Metadata(range.data, fileSize)
        this.currentOffset = this._metadata.firstFrameOffset
        this.currentTime = 0
        this.logger.log('loadMetadata done', {
          ...getLogSource(this._url, this.config.vid),
          fileSize: this._metadata.fileSize,
          duration: this._metadata.duration,
          bitRate: this._metadata.bitRate,
          sampleRate: this._metadata.sampleRate,
          channelCount: this._metadata.channelCount,
          seekMode: this._metadata.seekMode,
          firstFrameOffset: this._metadata.firstFrameOffset
        })
        return this._metadata
      } catch (error) {
        lastError = error
        if (
          !(error instanceof MP3ParserError) ||
          !['MP3_FRAME_NOT_FOUND', 'MP3_PROBE_INCOMPLETE'].includes(error.code)
        ) {
          throw error
        }
        this.logger.log('loadMetadata probe incomplete', {
          ...getLogSource(this._url, this.config.vid),
          code: error.code,
          probeEnd
        })
      }

      if (range.end >= fileSize - 1) break
      probeEnd = Math.min(fileSize - 1, Math.max(probeEnd + 1, (probeEnd + 1) * 2) - 1)
      this.logger.log('loadMetadata expand probe', {
        ...getLogSource(this._url, this.config.vid),
        nextProbeEnd: probeEnd,
        fileSize
      })
    }

    throw lastError instanceof Error ? lastError : new Error('Cannot parse MP3 metadata')
  }

  async loadSegmentByTime(time: number): Promise<MP3Segment | undefined> {
    const metadata = await this.loadMetadata()
    this.ensureActive()
    if (time < 0 || time >= metadata.duration) return

    this.linearFromStart = time === 0
    const offset = timeToByteOffset(metadata, time)
    const segment = await this.loadSegment(offset, time, this.currentIndex + 1, true)
    this.ensureActive()
    if (segment) {
      this.setCurrentSegment(segment)
      this.correctDurationAtEnd(segment)
    }
    return segment
  }

  async loadNextSegment(): Promise<MP3Segment | undefined> {
    await this.loadMetadata()
    this.ensureActive()
    const segment = await this.loadSegment(
      this.currentOffset,
      this.currentTime,
      this.currentIndex + 1,
      false
    )
    this.ensureActive()
    if (segment) {
      this.setCurrentSegment(segment)
      this.correctDurationAtEnd(segment)
    }
    return segment
  }

  async cancel(): Promise<void> {
    await this.netLoader.cancel()
  }

  private async reset(): Promise<void> {
    this.ensureActive()
    await this.cancel()
    this.ensureActive()
    this.clearState()
  }

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.clearState()
    void this.netLoader.cancel().catch(() => undefined)
  }

  private clearState(): void {
    this._metadata = null
    this.fullData = null
    this.fileSize = 0
    this.currentIndex = -1
    this.currentOffset = 0
    this.currentTime = 0
    this.linearFromStart = false
  }

  private ensureActive(): void {
    if (this.destroyed) throw new Error('MP3 loader has been destroyed')
  }

  private async loadSegment(
    estimatedOffset: number,
    startTime: number,
    index: number,
    seek: boolean
  ): Promise<MP3Segment | undefined> {
    const metadata = this._metadata
    if (!metadata) return

    const searchStart = seek
      ? Math.max(metadata.firstFrameOffset, estimatedOffset - this.config.syncSearchSize)
      : Math.max(metadata.firstFrameOffset, estimatedOffset)
    const estimatedSegmentSize = Math.ceil(
      (metadata.bitRate / 8) * this.config.segmentDuration * 1.5
    )
    const requestSize = Math.max(64 * 1024, estimatedSegmentSize)
    const requestEnd = Math.min(
      metadata.fileSize - 1,
      searchStart + requestSize + this.config.syncSearchSize - 1
    )
    this.logger.debug('loadSegment start', {
      ...getLogSource(this._url, this.config.vid),
      index,
      seek,
      startTime,
      estimatedOffset,
      searchStart,
      requestEnd
    })
    const range = await this.loadRange(searchStart, requestEnd)
    const localTarget = Math.max(0, estimatedOffset - range.start)
    const frames = scanMP3Frames(range.data, localTarget)
    if (!frames.length) {
      if (range.end >= metadata.fileSize - 1) return
      throw new Error(`Cannot find an MP3 frame near byte ${estimatedOffset}`)
    }

    const selected = []
    let duration = 0
    const availableDuration = metadata.duration - startTime
    for (const frame of frames) {
      if (
        selected.length &&
        (duration >= this.config.segmentDuration || duration >= availableDuration)
      ) {
        break
      }
      selected.push(frame)
      duration += frame.duration
    }

    const firstFrame = selected[0]
    const lastFrame = selected[selected.length - 1]
    if (!firstFrame || !lastFrame) return

    const absoluteStart = range.start + firstFrame.offset
    const absoluteEnd = range.start + lastFrame.end
    const nextOffset = absoluteEnd
    const isLast = selected.length === frames.length && range.end >= metadata.fileSize - 1

    this.logger.log('loadSegment done', {
      ...getLogSource(this._url, this.config.vid),
      index,
      frameCount: selected.length,
      range: [absoluteStart, absoluteEnd - 1],
      startTime,
      endTime: Math.min(metadata.duration, startTime + duration),
      isLast
    })

    return {
      data: range.data.subarray(firstFrame.offset, lastFrame.end),
      range: [absoluteStart, absoluteEnd - 1],
      index,
      startTime,
      endTime: Math.min(metadata.duration, startTime + duration),
      nextOffset,
      isLast
    }
  }

  private setCurrentSegment(segment: MP3Segment): void {
    this.currentIndex = segment.index
    this.currentOffset = segment.nextOffset
    this.currentTime = segment.endTime
  }

  private correctDurationAtEnd(segment: MP3Segment): void {
    if (!segment.isLast || !this.linearFromStart || !this._metadata) return
    this._metadata.duration = segment.endTime
  }

  private getRangeFileSize(range: RangeData): number {
    return range.fileSize
  }

  private async loadRange(start: number, end: number): Promise<RangeData> {
    this.ensureActive()
    if (this.fullData) {
      const rangeEnd = Math.min(end, this.fullData.byteLength - 1)
      this.logger.log('loadRange from full data', {
        ...getLogSource(this._url, this.config.vid),
        start,
        end: rangeEnd,
        fileSize: this.fullData.byteLength
      })
      return {
        data: this.fullData.subarray(start, rangeEnd + 1),
        start,
        end: rangeEnd,
        fileSize: this.fullData.byteLength
      }
    }

    const result = (await this.netLoader.load(this._url, {
      range: [start, end],
      responseType: 'arraybuffer'
    })) as NetworkResponse | undefined
    this.ensureActive()
    if (!(result?.data instanceof Uint8Array) || !result.data.length) {
      throw new Error('Empty MP3 network response')
    }

    const response = result.response
    if (response?.status === 200) {
      this.fullData = result.data
      this.fileSize = result.data.byteLength
      const rangeEnd = Math.min(end, result.data.byteLength - 1)
      this.logger.log('loadRange full response', {
        ...getLogSource(this._url, this.config.vid),
        requestRange: [start, end],
        dataLength: result.data.byteLength,
        fileSize: this.fileSize
      })
      return {
        data: result.data.subarray(start, rangeEnd + 1),
        start,
        end: rangeEnd,
        fileSize: result.data.byteLength
      }
    }

    const fileSize =
      getRangeFileSize(response, result.data.byteLength) || (await this.loadFileSize())
    this.ensureActive()
    if (!fileSize) {
      throw new Error(
        'MP3 response must expose the complete file size by Content-Range or HEAD Content-Length'
      )
    }
    this.fileSize = fileSize
    const contentRange = response?.headers?.get('content-range')
    const match = contentRange?.match(/^bytes\s+(\d+)-(\d+)\//i)
    const responseStart = match ? Number.parseInt(match[1], 10) : start
    const responseEnd = match
      ? Number.parseInt(match[2], 10)
      : responseStart + result.data.byteLength - 1
    if (responseStart !== start) {
      throw new Error(`Unexpected MP3 range start: ${responseStart}, expected ${start}`)
    }

    this.logger.log('loadRange done', {
      ...getLogSource(this._url, this.config.vid),
      requestRange: [start, end],
      responseStatus: response?.status,
      responseRange: [responseStart, responseEnd],
      dataLength: result.data.byteLength,
      fileSize
    })

    return {
      data: result.data,
      start: responseStart,
      end: responseEnd,
      fileSize
    }
  }

  private async loadFileSize(): Promise<number> {
    if (this.fileSize) return this.fileSize

    this.logger.log(
      'loadFileSize by HEAD start',
      getLogSource(this._url, this.config.vid)
    )
    const result = (await this.netLoader.load(this._url, {
      method: 'HEAD',
      responseType: 'text'
    })) as NetworkResponse | undefined
    this.ensureActive()

    this.fileSize = getContentLength(result?.response)
    this.logger.log('loadFileSize by HEAD done', {
      ...getLogSource(this._url, this.config.vid),
      fileSize: this.fileSize
    })
    return this.fileSize
  }
}
