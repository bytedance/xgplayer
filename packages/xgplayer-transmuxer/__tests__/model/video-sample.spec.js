import { VideoSample } from '../../src'

describe('AudioSample', () => {

  test('All', () => {
    const sample = new VideoSample(3, 2, [1])
    expect(sample.duration).toBe(0)
    expect(sample.originPts).toBe(3)
    expect(sample.pts).toBe(3)
    expect(sample.originDts).toBe(2)
    expect(sample.dts).toBe(2)
    expect(sample.cts).toBe(1)
    expect(sample.units).toEqual([1])
    expect(sample.keyframe).toBe(false)
    expect(sample.flag).toEqual({})

    sample.setToKeyframe()
    expect(sample.keyframe).toBe(true)
    expect(sample.flag.dependsOn).toBe(2)
    expect(sample.flag.isNonSyncSample).toBe(0)
  })

})
