export type MSEAttachMode = 'auto' | 'src' | 'source-element'
export type MPEGVersion = 1 | 2 | 2.5
export type MP3SeekMode = 'cbr' | 'xing' | 'vbri'

export interface MP3RequestOptions extends RequestInit {
  loaderType?: 'fetch' | 'xhr'
  request?: Request
  params?: Record<string, string | number | boolean | null | undefined>
  responseType?: 'arraybuffer'
  processMaxGapTime?: number
  firstMaxChunkSize?: number
}

export interface MP3Options {
  media?: HTMLMediaElement
  url?: string
  vid?: string
  maxBufferLength?: number
  minBufferLength?: number
  bufferBehind?: number
  segmentDuration?: number
  tickInterval?: number
  probeSize?: number
  maxProbeSize?: number
  syncSearchSize?: number
  retry?: number
  retryCount?: number
  retryDelay?: number
  timeout?: number
  reqOptions?: MP3RequestOptions | null
  closeDowngrade?: boolean
  preferMMS?: boolean
  mseAttachMode?: MSEAttachMode
}

export interface MP3Config extends MP3Options {
  media: HTMLMediaElement
  url: string
  vid: string
  maxBufferLength: number
  minBufferLength: number
  bufferBehind: number
  segmentDuration: number
  tickInterval: number
  probeSize: number
  maxProbeSize: number
  syncSearchSize: number
  retry: number
  retryDelay: number
  timeout: number
  reqOptions: MP3RequestOptions | null
  closeDowngrade: boolean
  preferMMS: boolean
  mseAttachMode: MSEAttachMode
}

export interface MP3FrameHeader {
  bitRate: number
  channelCount: number
  channelMode: number
  frameLength: number
  layer: 3
  paddingBit: number
  protectionBit: number
  sampleRate: number
  sampleRateIndex: number
  samplesPerFrame: number
  version: MPEGVersion
}

export interface MP3Frame {
  offset: number
  end: number
  duration: number
  header: MP3FrameHeader
}

export interface MP3SeekPoint {
  time: number
  offset: number
}

export interface MP3Metadata {
  fileSize: number
  firstFrameOffset: number
  dataSize: number
  duration: number
  bitRate: number
  sampleRate: number
  channelCount: number
  version: MPEGVersion
  layer: 3
  samplesPerFrame: number
  frameDuration: number
  isVBR: boolean
  seekMode: MP3SeekMode
  frameCount?: number
  xingToc?: Uint8Array
  seekPoints?: MP3SeekPoint[]
}

export interface MP3Segment {
  data: Uint8Array
  range: [number, number]
  index: number
  startTime: number
  endTime: number
  nextOffset: number
  isLast: boolean
}
