import { Buffer } from '../src/buffer'

function createRanges(ranges) {
  return {
    length: ranges.length,
    start: (index) => ranges[index][0],
    end: (index) => ranges[index][1]
  }
}

describe('Buffer', () => {
  test('returns a stable empty buffer shape', () => {
    expect(Buffer.info()).toEqual({
      start: 0,
      end: 0,
      buffers: [],
      remaining: 0
    })
  })

  test('merges small holes and reports playback position', () => {
    const ranges = createRanges([
      [0, 5],
      [5.05, 10]
    ])

    expect(Buffer.info(ranges, 4, 0.1)).toMatchObject({
      start: 0,
      end: 10,
      buffers: [[0, 10]],
      remaining: 6,
      currentTime: 4,
      behind: 4,
      length: 10
    })
  })

  test('detects whether a position is buffered', () => {
    const media = { buffered: createRanges([[2, 4]]) }

    expect(Buffer.isBuffered(media, 3)).toBe(true)
    expect(Buffer.isBuffered(media, 5)).toBe(false)
  })
})
