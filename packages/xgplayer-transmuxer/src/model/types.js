/** @enum {string} */
export const TrackType = {
  VIDEO: 'video',
  AUDIO: 'audio',
  METADATA: 'metadata'
}

/** @enum {string} */
export const VideoCodecType = {
  AVC: 'avc',
  HEVC: 'hevc',
  VVCC: 'vvcC'
}

/** @enum {string} */
export const AudioCodecType = {
  AAC: 'aac',
  G711PCMA: 'g7110a',
  G711PCMU: 'g7110m'
}

/** @enum {string} */
export const WarningType = {
  LARGE_AV_SHIFT: 'LARGE_AV_SHIFT',
  LARGE_VIDEO_GAP: 'LARGE_VIDEO_GAP',
  LARGE_VIDEO_GAP_BETWEEN_CHUNK: 'LARGE_VIDEO_GAP_BETWEEN_CHUNK',
  LARGE_AUDIO_GAP: 'LARGE_AUDIO_GAP',
  AUDIO_FILLED: 'AUDIO_FILLED',
  AUDIO_DROPPED: 'AUDIO_DROPPED'
}
