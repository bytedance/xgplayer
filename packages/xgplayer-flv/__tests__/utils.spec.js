import { searchKeyframeIndex } from '../src/flv/utils'

describe('Utils', () => {

  test('searchKeyframeIndex', () => {
    expect(searchKeyframeIndex([1, 2, 3], 2)).toBe(1)
    expect(searchKeyframeIndex([1, 2, 3], 2.5)).toBe(1)
    expect(searchKeyframeIndex([1, 2, 3], 10)).toBe(2)
    expect(searchKeyframeIndex([1, 2, 3], 0)).toBe(0)
    expect(searchKeyframeIndex([1, 2, 3], -1)).toBe(0)
  })

})
