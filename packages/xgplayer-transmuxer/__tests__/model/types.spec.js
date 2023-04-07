import { TrackType, VideoCodecType, AudioCodecType, WarningType } from '../../src'

describe('Model:types', () => {

  test('All', () => {
    expect(TrackType.VIDEO).toBe('video')
    expect(TrackType.AUDIO).toBe('audio')
    expect(TrackType.METADATA).toBe('metadata')
    expect(VideoCodecType.AVC).toBe('avc')
    expect(VideoCodecType.HEVC).toBe('hevc')
    expect(AudioCodecType.AAC).toBe('aac')
    expect(AudioCodecType.G711PCMA).toBe('g7110a')
    expect(AudioCodecType.G711PCMU).toBe('g7110m')
    expect(WarningType.LARGE_AV_SHIFT).toBe('LARGE_AV_SHIFT')
    expect(WarningType.LARGE_VIDEO_GAP).toBe('LARGE_VIDEO_GAP')
    expect(WarningType.LARGE_AUDIO_GAP).toBe('LARGE_AUDIO_GAP')
    expect(WarningType.AUDIO_FILLED).toBe('AUDIO_FILLED')
    expect(WarningType.AUDIO_DROPPED).toBe('AUDIO_DROPPED')
    expect(WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK).toBe('LARGE_VIDEO_GAP_BETWEEN_CHUNK')
  })

})
