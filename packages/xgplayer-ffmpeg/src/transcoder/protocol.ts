import type {
  FFmpegAudioConfig,
  FFmpegLoadConfig,
  FFmpegMetadata,
  FFmpegProgress,
  FFmpegRequestOptions,
  FFmpegStage
} from '../types'

export type HTTPRequestOptions = Omit<FFmpegRequestOptions, 'headers'> & {
  headers?: Record<string, string>
}

interface Command {
  id: number
  epoch: number
}

export type WorkerCommand = Command &
  (
    | {
        type: 'open'
        source: string
        ffmpeg: FFmpegLoadConfig
        audio: Readonly<FFmpegAudioConfig>
        flacSupported: boolean
        aacSupported: boolean
        requestOptions?: HTTPRequestOptions
        cacheBytes?: number
        maxInputBytes?: number
        segmentDuration: number
      }
    | { type: 'pull' }
    | { type: 'seek'; time: number }
    | { type: 'close' }
  )

export type WorkerRequest = WorkerCommand | { type: 'cancel'; epoch: number }

export type PipelineOutput =
  | { kind: 'init'; data: Uint8Array<ArrayBuffer>; timestampOffset: number }
  | {
      kind: 'media'
      data: Uint8Array<ArrayBuffer>
      start: number
      end: number
      timestampOffset: number
    }
  | { kind: 'yield' }
  | { kind: 'eof' }

export type WorkerEvent = Command &
  (
    | { type: 'opened'; metadata: FFmpegMetadata }
    | { type: 'output'; output: PipelineOutput; progress: FFmpegProgress }
    | { type: 'complete' }
    | { type: 'error'; stage: FFmpegStage; message: string; cancelled?: boolean }
  )
