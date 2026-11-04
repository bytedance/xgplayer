export { FFmpeg } from './core/ffmpeg'
export { FFmpegPlugin, FFmpegPlugin as default } from './plugin'
export { AUDIO_MIME, createAudioProfile } from './profiles/audio'
export type {
  FFmpegAudioConfig,
  FFmpegLoadConfig,
  FFmpegMetadata,
  FFmpegOptions,
  FFmpegOutputProfile,
  FFmpegPluginOptions,
  FFmpegProgress,
  FFmpegRequestOptions
} from './types'
export { FFmpegError } from './types'
