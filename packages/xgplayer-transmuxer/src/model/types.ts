export const TrackType = {
  VIDEO: 'video',
  AUDIO: 'audio',
  METADATA: 'metadata'
}

export const VideoCodecType = {
  AV1: 'av1',
  AVC: 'avc',
  HEVC: 'hevc',
  VVCC: 'vvcC'
}

export const AudioCodecType = {
  AAC: 'aac',
  G711PCMA: 'g7110a',
  G711PCMU: 'g7110m',
  OPUS: 'opus',
  MP3: 'mp3'
}

export const WarningType = {
  LARGE_AV_SHIFT: 'LARGE_AV_SHIFT',
  LARGE_VIDEO_GAP: 'LARGE_VIDEO_GAP',
  LARGE_VIDEO_GAP_BETWEEN_CHUNK: 'LARGE_VIDEO_GAP_BETWEEN_CHUNK',
  LARGE_AUDIO_GAP: 'LARGE_AUDIO_GAP',
  AUDIO_FILLED: 'AUDIO_FILLED',
  AUDIO_DROPPED: 'AUDIO_DROPPED'
}

export type TrackType = string
export type VideoCodecType = string
export type AudioCodecType = string
export type WarningType = string

export interface TrackWarning {
  type: WarningType
  nextDts?: number
  nextPts?: number
  firstSampleDts?: number
  nextSampleDts?: number
  sampleDuration?: number
  time?: number
  dts?: number
  originDts?: number
  refSampleDuration?: number
  videoBaseDts?: number
  audioBasePts?: number
  baseDts?: number
  delta?: number
  pts?: number
  originPts?: number
  count?: number
}

export type TrackExtension = Record<string, unknown>
