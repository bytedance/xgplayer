import type { AudioTrack, VideoTrack } from 'xgplayer-transmuxer'

export type MSEAttachMode = 'auto' | 'src' | 'source-element'
export type SegmentIndexRange = [number, number]

export interface MP4RequestOptions extends RequestInit {
  loaderType?: 'fetch' | 'xhr'
  request?: Request
  params?: Record<string, string | number | boolean | null | undefined>
  responseType?: 'arraybuffer' | 'text' | 'json'
  processMaxGapTime?: number
  rangeRequestMustReturn206?: boolean
  rangeRequestZeroContentLengthAsError?: boolean
  firstMaxChunkSize?: number
}

export interface MP4MediaElement extends HTMLMediaElement {
  appendBuffer?: (videoTrack: VideoTrack, audioTrack: AudioTrack) => void
  degradeInfo?: Record<string, unknown>
  endOfStream?: () => void
  setPlayMode?: (mode: 'VOD') => void
}

export interface MP4Options {
  media?: MP4MediaElement
  url?: string
  vid?: string
  softDecode?: boolean
  maxBufferLength?: number
  minBufferLength?: number
  bufferBehind?: number
  tickInterval?: number
  tickInSeconds?: number
  segmentDuration?: number
  retry?: number
  retryCount?: number
  retryDelay?: number
  timeout?: number
  onProcessMinLen?: number
  responseType?: 'arraybuffer' | 'text' | 'json'
  memoryOpt?: boolean
  reqOptions?: MP4RequestOptions | null
  disableBufferBreakCheck?: boolean
  waitingTimeOut?: number
  waitingInBufferTimeOut?: number
  waitJampBufferMaxCnt?: number
  closeDowngrade?: boolean
  preferMMS?: boolean
  mseAttachMode?: MSEAttachMode
  enableWorker?: boolean
}

export interface MP4Config extends MP4Options {
  media: MP4MediaElement
  url: string
  softDecode: boolean
  maxBufferLength: number
  minBufferLength: number
  bufferBehind: number
  tickInterval: number
  retry: number
  retryDelay: number
  timeout: number
  onProcessMinLen: number
  reqOptions: MP4RequestOptions | null
  disableBufferBreakCheck: boolean
  waitingTimeOut: number
  waitingInBufferTimeOut: number
  waitJampBufferMaxCnt: number
  closeDowngrade: boolean
  preferMMS: boolean
  mseAttachMode: MSEAttachMode
  enableWorker: boolean
}

export interface SegmentFrame {
  index: number
}

export interface SegmentTrack {
  index: number
  startTime: number
  endTime: number
  frames?: SegmentFrame[]
}

export interface LoadedSegment {
  data: Uint8Array
  options: {
    range: [number, number]
  }
  video?: SegmentTrack
  audio?: SegmentTrack
}

export interface MP4Metadata {
  moov?: unknown
  isFragmentMP4?: boolean
}

export interface WorkerTransmuxTrack {
  type: string
  codec: string
  initSegment?: Uint8Array
  segment?: Uint8Array
}

export interface WorkerTransmuxResult {
  video: WorkerTransmuxTrack | null
  audio: WorkerTransmuxTrack | null
}

export interface WorkerTransmuxArgs {
  dataStart: number
  videoIndexRange?: SegmentIndexRange
  audioIndexRange?: SegmentIndexRange
  moov: unknown
}

export type WorkerRequest =
  | { method: 'init' }
  | { method: 'reset' }
  | {
      method: 'configure'
      videoSegments: unknown[]
      audioSegments: unknown[]
      memoryOpt: boolean
      isFragmentMP4: boolean
    }
  | {
      method: 'transmux'
      id: number
      buffer: ArrayBuffer
      args: WorkerTransmuxArgs
    }

export type WorkerResponse =
  | {
      method: 'transmux'
      id: number
      result: WorkerTransmuxResult
      error?: never
    }
  | {
      method: 'transmux'
      id: number
      result?: never
      error: { message: string }
    }
