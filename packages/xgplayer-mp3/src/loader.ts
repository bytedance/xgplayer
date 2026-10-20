import { Logger, NetLoader } from 'xgplayer-streaming-shared'
import {
  MP3ParserError,
  parseMP3Metadata,
  scanMP3Frames,
  timeToByteOffset
} from './parser'
import type { MP3Config, MP3Metadata, MP3Segment } from './types'

interface NetworkResponse {
  data?: Uint8Array
  response?: Response
}

interface RangeData {
  data: Uint8Array
  end: number
  fileSize: number
  start: number
}

function getFileSize(response: Response | undefined, dataLength: number): number {
  const contentRange = response?.headers?.get('content-range')
  const match = contentRange?.match(/\/(\d+)$/)
  if (match) return Number.parseInt(match[1], 10)
  if (response?.status === 200) return dataLength
  return 0
}

export class MP3Loader {
  readonly logger: Logger

  metadata: MP3Metadata | null = null
  url: string

  private readonly config: MP3Config
  private readonly netLoader: NetLoader
  private fullData: Uint8Array | null = null
  private currentIndex = -1
  private currentOffset = 0
  private currentTime = 0
  private linearFromStart = false

  constructor(config: MP3Config) {
    this.config = config
    this.url = config.url
    this.logger = new Logger(`MP3Loader_${config.vid || config.url}`, undefined)
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

  async changeUrl(url: string): Promise<void> {
    await this.reset()
    this.url = url
  }

  async loadMetadata(): Promise<MP3Metadata> {
    if (this.metadata) return this.metadata

    let probeEnd = this.config.probeSize - 1
    let lastError: unknown
    while (probeEnd < this.config.maxProbeSize) {
      const range = await this.loadRange(0, probeEnd)
      const fileSize = this.fullData?.byteLength || this.getRangeFileSize(range)
      if (!fileSize) {
        throw new Error(
          'MP3 Range response must expose Content-Range with the complete file size'
        )
      }

      try {
        this.metadata = parseMP3Metadata(range.data, fileSize)
        this.currentOffset = this.metadata.firstFrameOffset
        this.currentTime = 0
        return this.metadata
      } catch (error) {
        lastError = error
        if (
          !(error instanceof MP3ParserError) ||
          !['MP3_FRAME_NOT_FOUND', 'MP3_PROBE_INCOMPLETE'].includes(error.code)
        ) {
          throw error
        }
      }

      if (range.end >= fileSize - 1) break
      probeEnd = Math.min(fileSize - 1, Math.max(probeEnd + 1, (probeEnd + 1) * 2) - 1)
    }

    throw lastError instanceof Error ? lastError : new Error('Cannot parse MP3 metadata')
  }

  async loadSegmentByTime(time: number): Promise<MP3Segment | undefined> {
    const metadata = await this.loadMetadata()
    if (time < 0 || time >= metadata.duration) return

    this.linearFromStart = time === 0
    const offset = timeToByteOffset(metadata, time)
    const segment = await this.loadSegment(offset, time, this.currentIndex + 1, true)
    if (segment) {
      this.setCurrentSegment(segment)
      this.correctDurationAtEnd(segment)
    }
    return segment
  }

  async loadNextSegment(): Promise<MP3Segment | undefined> {
    await this.loadMetadata()
    const segment = await this.loadSegment(
      this.currentOffset,
      this.currentTime,
      this.currentIndex + 1,
      false
    )
    if (segment) {
      this.setCurrentSegment(segment)
      this.correctDurationAtEnd(segment)
    }
    return segment
  }

  async cancel(): Promise<void> {
    await this.netLoader.cancel()
  }

  async reset(): Promise<void> {
    await this.cancel()
    this.metadata = null
    this.fullData = null
    this.currentIndex = -1
    this.currentOffset = 0
    this.currentTime = 0
    this.linearFromStart = false
  }

  async destroy(): Promise<void> {
    await this.reset()
  }

  private async loadSegment(
    estimatedOffset: number,
    startTime: number,
    index: number,
    seek: boolean
  ): Promise<MP3Segment | undefined> {
    const metadata = this.metadata
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
    if (!segment.isLast || !this.linearFromStart || !this.metadata) return
    this.metadata.duration = segment.endTime
  }

  private getRangeFileSize(range: RangeData): number {
    return range.fileSize
  }

  private async loadRange(start: number, end: number): Promise<RangeData> {
    if (this.fullData) {
      const rangeEnd = Math.min(end, this.fullData.byteLength - 1)
      return {
        data: this.fullData.subarray(start, rangeEnd + 1),
        start,
        end: rangeEnd,
        fileSize: this.fullData.byteLength
      }
    }

    const result = (await this.netLoader.load(this.url, {
      range: [start, end],
      responseType: 'arraybuffer'
    })) as NetworkResponse | undefined
    if (!result?.data?.length) throw new Error('Empty MP3 network response')

    const response = result.response
    if (response?.status === 200) {
      this.fullData = result.data
      const rangeEnd = Math.min(end, result.data.byteLength - 1)
      return {
        data: result.data.subarray(start, rangeEnd + 1),
        start,
        end: rangeEnd,
        fileSize: result.data.byteLength
      }
    }

    const fileSize = getFileSize(response, result.data.byteLength)
    if (!fileSize) {
      throw new Error(
        'MP3 Range response must expose Content-Range with the complete file size'
      )
    }
    const contentRange = response?.headers?.get('content-range')
    const match = contentRange?.match(/^bytes\s+(\d+)-(\d+)\//i)
    const responseStart = match ? Number.parseInt(match[1], 10) : start
    const responseEnd = match
      ? Number.parseInt(match[2], 10)
      : responseStart + result.data.byteLength - 1
    if (responseStart !== start) {
      throw new Error(`Unexpected MP3 range start: ${responseStart}, expected ${start}`)
    }

    return {
      data: result.data,
      start: responseStart,
      end: responseEnd,
      fileSize
    }
  }
}
