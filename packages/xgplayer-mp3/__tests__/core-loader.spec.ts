import { NetLoader } from 'xgplayer-streaming-shared'
import { MP3 } from '../src/mp3'
import type { MP3Segment } from '../src/types'

const mockLoad = jest.spyOn(NetLoader.prototype, 'load')
const mockAppend = jest.fn()
const mockUpdateDuration = jest.fn()
const mockEndOfStream = jest.fn()
let mockRanges: Array<[number, number]> = []

jest.spyOn(NetLoader.prototype, 'cancel').mockResolvedValue(undefined)

jest.mock('../src/buffer-service', () => ({
  BufferService: class {
    async reset() {}
    async evictBuffer() {}
    destroy() {}
    updateDuration = mockUpdateDuration
    endOfStream = mockEndOfStream
    async appendSegment(segment: MP3Segment, discontinuity: boolean) {
      mockAppend(segment, discontinuity)
      const ranges = [...mockRanges, [segment.startTime, segment.endTime] as [number, number]]
        .sort((left, right) => left[0] - right[0])
      mockRanges = []
      for (const range of ranges) {
        const previous = mockRanges[mockRanges.length - 1]
        if (previous && range[0] - previous[1] <= 0.1) {
          previous[1] = Math.max(previous[1], range[1])
        } else {
          mockRanges.push(range)
        }
      }
    }
  }
}))

function createFrames(count: number): Uint8Array {
  const data = new Uint8Array(count * 432)
  for (let offset = 0; offset < data.length; offset += 432) {
    data.set([0xff, 0xf3, 0xa8, 0xc4], offset)
  }
  return data
}

function withTrailingID3(audio: Uint8Array): Uint8Array {
  const payloadSize = 100 * 1024
  const data = new Uint8Array(audio.length + 10 + payloadSize)
  data.set(audio)
  data.set([0x49, 0x44, 0x33, 4, 0, 0], audio.length)
  for (let i = 0; i < 4; i++) {
    data[audio.length + 6 + i] = (payloadSize >> (21 - i * 7)) & 0x7f
  }
  return data
}

function serveRanges(data: Uint8Array): void {
  mockLoad.mockImplementation(async (_url: unknown, options: { range?: [number, number] } = {}) => {
    if (!options.range) throw new Error('Expected a Range request')
    const [start, requestedEnd] = options.range
    const end = Math.min(requestedEnd, data.length - 1)
    return {
      data: data.subarray(start, end + 1),
      response: {
        status: 206,
        headers: {
          'content-range': `bytes ${start}-${end}/${data.length}`
        }
      }
    }
  })
}

function createMedia(): HTMLMediaElement {
  const media = document.createElement('audio')
  Object.defineProperties(media, {
    currentTime: { configurable: true, value: 0, writable: true },
    paused: { configurable: true, value: true, writable: true },
    ended: { configurable: true, value: false, writable: true },
    readyState: { configurable: true, value: 4, writable: true },
    buffered: {
      configurable: true,
      get: () => ({
        length: mockRanges.length,
        start: (index: number) => mockRanges[index][0],
        end: (index: number) => mockRanges[index][1]
      })
    }
  })
  return media
}

async function flushPromises(): Promise<void> {
  for (let i = 0; i < 80; i++) await Promise.resolve()
}

describe('MP3 core and loader integration', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    mockRanges = []
    mockUpdateDuration.mockResolvedValue(undefined)
    mockEndOfStream.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('consumes a trailing ID3 tag and ends at the measured audio duration', async () => {
    serveRanges(withTrailingID3(createFrames(28)))
    const media = createMedia()
    const core = new MP3({ media, url: 'audio.mp3', segmentDuration: 1 })

    await core.load()
    await flushPromises()

    expect(mockAppend).toHaveBeenCalledTimes(1)
    expect(mockAppend.mock.calls[0][0].endTime).toBeCloseTo(1.008)
    expect(mockEndOfStream).toHaveBeenCalledTimes(1)
    expect(mockEndOfStream).toHaveBeenCalledWith()
    expect(mockUpdateDuration.mock.calls.at(-1)?.[0]).toBeCloseTo(1.008)
    expect(mockUpdateDuration.mock.invocationCallOrder.at(-1)).toBeLessThan(
      mockEndOfStream.mock.invocationCallOrder[0]
    )
    const requestsAtEnd = mockLoad.mock.calls.length
    Object.defineProperty(media, 'paused', { value: false })
    media.currentTime = 0.8
    media.dispatchEvent(new Event('playing'))
    jest.advanceTimersByTime(1000)
    await flushPromises()
    expect(mockLoad).toHaveBeenCalledTimes(requestsAtEnd)
    expect(mockEndOfStream).toHaveBeenCalledTimes(1)
    core.destroy()
  })

  test('fills the active range continuation after seeking back from EOF', async () => {
    serveRanges(createFrames(3500))
    const media = createMedia()
    const core = new MP3({ media, url: 'audio.mp3', segmentDuration: 10 })
    await core.load('audio.mp3', 120)
    expect(mockEndOfStream).toHaveBeenCalledTimes(1)
    mockRanges = [[30, 40], [120, 126]]
    mockAppend.mockClear()
    mockEndOfStream.mockClear()
    Object.defineProperty(media, 'paused', { value: false })
    media.currentTime = 35

    media.dispatchEvent(new Event('seeking'))
    jest.advanceTimersByTime(1)
    await flushPromises()

    const segment: MP3Segment = mockAppend.mock.calls[0][0]
    expect(segment.startTime).toBeLessThanOrEqual(40)
    expect(segment.endTime).toBeGreaterThan(40)
    expect(segment.range[0]).toBeGreaterThan(470000)
    expect(segment.range[0]).toBeLessThan(490000)
    expect(mockAppend.mock.calls[0][1]).toBe(true)
    expect(mockRanges[0][1]).toBeGreaterThanOrEqual(75)
    expect(mockEndOfStream).not.toHaveBeenCalled()
    core.destroy()
  })
})
