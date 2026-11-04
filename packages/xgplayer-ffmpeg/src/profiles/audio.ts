import { type FFmpegAudioConfig, FFmpegError, type FFmpegOutputProfile } from '../types'

export const AUDIO_MIME = 'audio/mp4; codecs="mp4a.40.2"'

export function createAudioProfile(options: FFmpegAudioConfig = {}): FFmpegOutputProfile {
  const inputArguments: string[] = []
  for (const value of [options.inputSampleRate, options.inputChannels]) {
    if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
      throw new FFmpegError('transcode', 'Raw audio parameters must be positive')
    }
  }
  if (options.inputFormat) {
    if (!options.inputSampleRate || !options.inputChannels) {
      throw new FFmpegError('transcode', 'Raw audio requires sample rate and channels')
    }
    inputArguments.push(
      '-f',
      options.inputFormat,
      '-ar',
      String(options.inputSampleRate),
      '-ac',
      String(options.inputChannels)
    )
  }
  return {
    type: 'audio',
    mimeType: AUDIO_MIME,
    inputArguments,
    outputArguments: [
      '-map',
      '0:a:0',
      '-vn',
      '-sn',
      '-dn',
      '-c:a',
      'aac',
      '-profile:a',
      'aac_low',
      '-ar',
      '48000',
      '-ac',
      '2',
      '-b:a',
      '128k'
    ]
  }
}
