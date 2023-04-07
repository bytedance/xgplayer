import { AudioSample } from '../../src'

describe('AudioSample', () => {

  test('All', () => {
    let sample = new AudioSample(1, new Uint8Array([1]))
    expect(sample.duration).toBe(1024)
    expect(sample.originPts).toBe(1)
    expect(sample.pts).toBe(1)
    expect(sample.data).toEqual(new Uint8Array([1]))
    expect(sample.size).toBe(1)

    sample = new AudioSample(1, new Uint8Array([1]), 2)
    expect(sample.duration).toBe(2)
  })

})
