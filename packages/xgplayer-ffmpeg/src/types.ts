import type { MSEAttachMode } from 'xgplayer-streaming-shared'

export interface FFmpegLoadConfig {
  /** Bundled xgplayer-ffmpeg streaming Worker, not the ffmpeg.wasm wrapper. */
  workerURL: string
  /** Native audio bridge built by ffmpeg:runtime. */
  coreURL: string
  wasmURL: string
}

export interface FFmpegProgress {
  progress: number
  time: number
  downloadedBytes: number
  totalBytes?: number
  inputEnded: boolean
  cacheBytes?: number
  rangeRequests?: number
}

export type FFmpegRequestOptions = Omit<RequestInit, 'signal' | 'body' | 'method'>

export interface FFmpegOptions {
  media?: HTMLMediaElement
  ffmpeg: FFmpegLoadConfig
  /** Optional total input limit; streaming has no default file-size limit. */
  maxInputBytes?: number
  /** Deadline until the first playable buffer, not a limit on stream length. */
  timeout?: number
  segmentDuration?: number
  bufferAhead?: number
  /** Resume production below this water mark; defaults to half bufferAhead. */
  bufferLow?: number
  bufferBehind?: number
  /** HTTP block cache limit, independent of the optional total input limit. */
  cacheBytes?: number
  preferMMS?: boolean
  mseAttachMode?: MSEAttachMode
  requestOptions?: FFmpegRequestOptions
}

export interface FFmpegAudioConfig {
  /** Explicit FFmpeg demuxer and parameters for headerless audio. */
  inputFormat?: 's16le' | 's16be' | 's8' | 'u8' | 'alaw' | 'mulaw'
  inputSampleRate?: number
  inputChannels?: number
  /** Auto copies FLAC when MSE supports it, otherwise encodes AAC-LC. */
  outputCodec?: 'auto' | 'aac' | 'flac'
  /** Omit to preserve the source rate and channel layout where AAC permits. */
  sampleRate?: number
  channels?: number
  bitrate?: number
}

export interface FFmpegPluginOptions extends FFmpegOptions {
  audio?: FFmpegAudioConfig
  /** Typed audio policy for the native bridge. */
  profile?: FFmpegOutputProfile
}

/** Encoding policy is separate from HTTP, Worker and MSE lifecycle. */
export interface FFmpegOutputProfile {
  readonly type: 'audio'
  readonly mimeType: string
  readonly audio: Readonly<FFmpegAudioConfig>
}

export interface FFmpegMetadata {
  /** Native demuxer duration; Infinity if the source does not declare one. */
  readonly duration: number
  readonly mimeType: string
  readonly codec: string
  readonly sampleRate: number
  readonly channels: number
}

export type FFmpegStage = 'download' | 'runtime' | 'transcode' | 'buffer'

export class FFmpegError extends Error {
  constructor(
    readonly stage: FFmpegStage,
    message: string,
    readonly reason?: unknown
  ) {
    super(message)
    this.name = 'FFmpegError'
  }
}
