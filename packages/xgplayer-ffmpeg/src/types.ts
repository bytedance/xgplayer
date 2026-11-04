import type { MSEAttachMode } from 'xgplayer-streaming-shared'

export interface FFmpegLoadConfig {
  /** Bundled xgplayer-ffmpeg streaming Worker, not the ffmpeg.wasm wrapper. */
  workerURL: string
  /** Prepared single-thread core with Asyncify I/O and a stream entry. */
  coreURL: string
  wasmURL: string
}

export interface FFmpegProgress {
  progress: number
  time: number
  downloadedBytes: number
  totalBytes?: number
  inputEnded: boolean
}

/** Upload streams cannot cross the media Worker's structured-clone boundary. */
export type FFmpegRequestOptions = Omit<RequestInit, 'signal' | 'body'> & {
  body?: Exclude<BodyInit, ReadableStream>
}

export interface FFmpegOptions {
  media?: HTMLMediaElement
  ffmpeg: FFmpegLoadConfig
  /** Optional total input limit; streaming has no default file-size limit. */
  maxInputBytes?: number
  /** Deadline until the first playable buffer, not a limit on stream length. */
  timeout?: number
  segmentDuration?: number
  bufferAhead?: number
  bufferBehind?: number
  preferMMS?: boolean
  mseAttachMode?: MSEAttachMode
  requestOptions?: FFmpegRequestOptions
}

export interface FFmpegAudioConfig {
  /** Explicit FFmpeg demuxer and parameters for headerless audio. */
  inputFormat?: 's16le' | 's16be' | 's8' | 'u8' | 'alaw' | 'mulaw'
  inputSampleRate?: number
  inputChannels?: number
}

export interface FFmpegPluginOptions extends FFmpegOptions {
  audio?: FFmpegAudioConfig
  /** Defaults to AAC audio; custom profiles must match the supplied media element. */
  profile?: FFmpegOutputProfile
}

/** Encoding policy is separate from HTTP, Worker and MSE lifecycle. */
export interface FFmpegOutputProfile {
  readonly type: 'audio' | 'video'
  readonly mimeType: string
  readonly inputArguments: readonly string[]
  readonly outputArguments: readonly string[]
}

export interface FFmpegMetadata {
  /** FFprobe duration when known, otherwise Infinity until the final MSE append. */
  readonly duration: number
  readonly mimeType: string
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
