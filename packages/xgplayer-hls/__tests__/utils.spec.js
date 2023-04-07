import { clamp } from '../src/hls/utils'

describe('Utils', () => {

  test('clamp', () => {
    expect(clamp(1, 0, 2)).toBe(1)
    expect(clamp(-1, 0, 2)).toBe(0)
    expect(clamp(3, 0, 2)).toBe(2)
    expect(clamp(0, 0, 2)).toBe(0)
    expect(clamp(2, 0, 2)).toBe(2)
  })

})
