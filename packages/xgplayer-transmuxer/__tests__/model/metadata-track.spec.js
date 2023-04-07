import { MetadataTrack, TrackType } from '../../src'

describe('MetadataTrack', () => {

  test('All', () => {
    const track = new MetadataTrack()
    expect(track.id).toBe(3)
    expect(track.type).toBe(TrackType.METADATA)
    expect(track.timescale).toEqual(0)
    expect(track.flvScriptSamples).toEqual([])
    expect(track.seiSamples).toEqual([])
    expect(track.exist()).toBe(false)
    track.seiSamples.push({})
    expect(track.exist()).toBe(false)
    track.timescale = 1
    expect(track.exist()).toBe(true)
    expect(track.hasSample()).toBe(true)
    track.reset()
    expect(track.exist()).toBe(false)
    expect(track.hasSample()).toBe(false)
  })

})
