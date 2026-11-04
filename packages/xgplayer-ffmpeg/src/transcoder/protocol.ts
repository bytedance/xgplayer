import type { FFmpegLoadConfig, FFmpegProgress, FFmpegStage } from '../types'

/** Only cloneable values cross the Worker boundary. */
export type HTTPRequestOptions = Omit<RequestInit, 'signal' | 'headers' | 'body'> & {
  headers?: Record<string, string>
  body?: Blob
}

export interface TranscodeRequest {
  type: 'start'
  source: string
  requestOptions?: HTTPRequestOptions
  maxInputBytes?: number
  ffmpeg: FFmpegLoadConfig
  /** Encoding arguments; the Worker owns the nonseekable output pipe. */
  args: string[]
  inputArguments: readonly string[]
}

export type WorkerRequest = TranscodeRequest | { type: 'ack'; id: number }

export type WorkerEvent =
  | { type: 'ready' }
  | { type: 'metadata'; duration: number }
  | { type: 'chunk'; id: number; data: Uint8Array<ArrayBuffer> }
  | { type: 'progress'; data: FFmpegProgress }
  | { type: 'done' }
  | { type: 'error'; stage: FFmpegStage; message: string }
