import { AudioTrack, TrackType, AudioCodecType } from '../../src'

describe('AudioTrack', () => {

  test('All', () => {
    const track = new AudioTrack()
    expect(track.id).toBe(2)
    expect(track.pid).toBe(-1)
    expect(track.type).toBe(TrackType.AUDIO)
    expect(track.codecType).toBe(AudioCodecType.AAC)
    expect(track.codec).toBe('')
    expect(track.timescale).toBe(0)
    expect(track.present).toBe(false)
    expect(track.sequenceNumber).toBe(0)
    expect(track.baseMediaDecodeTime).toBe(0)
    expect(track.sampleDuration).toBe(0)
    expect(track.duration).toBe(0)
    expect(track.sampleRate).toBe(0)
    expect(track.sampleSize).toBe(16)
    expect(track.channelCount).toBe(0)
    expect(track.baseDts).toBe(0)
    expect(track.warnings).toEqual([])
    expect(track.samples).toEqual([])
    expect(track.config).toEqual([])
    expect(track.exist()).toBe(false)
    track.samples.push({})
    expect(track.exist()).toBe(false)
    track.sampleRate = 1
    track.channelCount = 1
    track.codec = 'c'
    expect(track.exist()).toBe(true)
    track.reset()
    expect(track.exist()).toBe(false)
  })

})
