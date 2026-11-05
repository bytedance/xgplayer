import { type FFmpegAudioConfig, FFmpegError, type FFmpegOutputProfile } from '../types'

export const AUDIO_MIME = 'audio/mp4; codecs="mp4a.40.2"'
export const FLAC_MIME = 'audio/mp4; codecs="fLaC"'
const AAC_RATES = [
  7350, 8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000, 64000, 88200, 96000
]
const RAW_FORMATS = ['s16le', 's16be', 's8', 'u8', 'alaw', 'mulaw']

export function createAudioProfile(options: FFmpegAudioConfig = {}): FFmpegOutputProfile {
  for (const value of [
    options.inputSampleRate,
    options.inputChannels,
    options.sampleRate,
    options.channels,
    options.bitrate
  ]) {
    if (value !== undefined && (!Number.isSafeInteger(value) || value <= 0))
      throw new FFmpegError('transcode', 'Audio parameters must be positive integers')
  }
  if (
    options.inputFormat &&
    (!RAW_FORMATS.includes(options.inputFormat) ||
      !options.inputSampleRate ||
      !options.inputChannels)
  )
    throw new FFmpegError(
      'transcode',
      'Raw audio requires a format, sample rate and channels'
    )
  if (options.sampleRate && !AAC_RATES.includes(options.sampleRate))
    throw new FFmpegError('transcode', 'Unsupported AAC sample rate')
  if ((options.channels ?? 1) > 8 || (options.inputChannels ?? 1) > 8)
    throw new FFmpegError('transcode', 'Audio supports at most eight channels')
  if (options.outputCodec && !['auto', 'aac', 'flac'].includes(options.outputCodec))
    throw new FFmpegError('transcode', 'Unsupported output codec')
  if (
    options.outputCodec === 'flac' &&
    (options.sampleRate || options.channels || options.bitrate)
  )
    throw new FFmpegError(
      'transcode',
      'FLAC passthrough cannot change encoding parameters'
    )
  return {
    type: 'audio',
    mimeType: options.outputCodec === 'flac' ? FLAC_MIME : AUDIO_MIME,
    audio: { ...options, outputCodec: options.outputCodec ?? 'auto' }
  }
}
