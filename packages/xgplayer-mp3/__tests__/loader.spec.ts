var mockLoad: jest.Mock
var mockCancel: jest.Mock

jest.mock('xgplayer-streaming-shared', () => {
  mockLoad = jest.fn()
  mockCancel = jest.fn().mockResolvedValue(undefined)
  return {
    Logger: class {
      constructor(
        _name: string,
        _config: unknown
      ) {}
    },
    NetLoader: class {
      load = mockLoad
      cancel = mockCancel
    }
  }
})

import { getConfig } from '../src/config'
import { MP3Loader } from '../src/loader'

function concat(...items: Uint8Array[]): Uint8Array {
  const data = new Uint8Array(items.reduce((total, item) => total + item.length, 0))
  let offset = 0
  items.forEach((item) => {
    data.set(item, offset)
    offset += item.length
  })
  return data
}

function createID3(payloadSize = 35): Uint8Array {
  const data = new Uint8Array(10 + payloadSize)
  data.set([0x49, 0x44, 0x33, 0x04, 0x00, 0x00])
  data[6] = (payloadSize >> 21) & 0x7f
  data[7] = (payloadSize >> 14) & 0x7f
  data[8] = (payloadSize >> 7) & 0x7f
  data[9] = payloadSize & 0x7f
  return data
}

function createFrames(count: number): Uint8Array {
  const frame = new Uint8Array(432)
  frame.set([0xff, 0xf3, 0xa8, 0xc4])
  return concat(...Array.from({ length: count }, () => frame))
}

function headers(values: Record<string, string>): Headers {
  return {
    get: (name: string) => values[name.toLowerCase()] || null
  } as Headers
}

describe('MP3Loader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('uses a full 200 response when the server ignores Range', async () => {
    const data = concat(createID3(), createFrames(100))
    mockLoad.mockResolvedValue({
      data,
      response: {
        status: 200,
        headers: headers({ 'content-length': String(data.length) })
      }
    })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        segmentDuration: 1
      })
    )

    const metadata = await loader.loadMetadata()
    const segment = await loader.loadSegmentByTime(0)

    expect(metadata.firstFrameOffset).toBe(45)
    expect(metadata.sampleRate).toBe(16000)
    expect(segment).toMatchObject({
      startTime: 0,
      index: 0,
      range: [45, expect.any(Number)]
    })
    expect(segment?.data[0]).toBe(0xff)
    expect(mockLoad).toHaveBeenCalledTimes(1)
  })

  test('maps a seek time to a frame-aligned byte range', async () => {
    const data = concat(createID3(), createFrames(200))
    mockLoad.mockResolvedValue({
      data,
      response: {
        status: 200,
        headers: headers({ 'content-length': String(data.length) })
      }
    })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        segmentDuration: 1
      })
    )

    await loader.loadMetadata()
    const segment = await loader.loadSegmentByTime(3)

    expect(segment?.startTime).toBe(3)
    expect(segment?.range[0]).toBeGreaterThan(45)
    expect(segment?.data.subarray(0, 4)).toEqual(
      new Uint8Array([0xff, 0xf3, 0xa8, 0xc4])
    )
  })

  test('corrects CBR duration after a complete linear frame scan', async () => {
    const data = concat(
      createID3(),
      createFrames(50),
      createID3(),
      createFrames(50)
    )
    mockLoad.mockResolvedValue({
      data,
      response: {
        status: 200,
        headers: headers({ 'content-length': String(data.length) })
      }
    })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        segmentDuration: 1
      })
    )

    await loader.loadMetadata()
    let segment = await loader.loadSegmentByTime(0)
    while (segment && !segment.isLast) segment = await loader.loadNextSegment()

    expect(segment?.isLast).toBe(true)
    expect(loader.metadata?.duration).toBeCloseTo(100 * 0.036)
  })

  test('expands the probe when the leading ID3 tag is incomplete', async () => {
    const data = concat(createID3(1015), createFrames(8))
    mockLoad
      .mockResolvedValueOnce({
        data: data.subarray(0, 1024),
        response: {
          status: 206,
          headers: headers({
            'content-length': '1024',
            'content-range': `bytes 0-1023/${data.length}`
          })
        }
      })
      .mockResolvedValueOnce({
        data: data.subarray(0, 2048),
        response: {
          status: 206,
          headers: headers({
            'content-length': '2048',
            'content-range': `bytes 0-2047/${data.length}`
          })
        }
      })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        probeSize: 1024,
        maxProbeSize: 4096
      })
    )

    const metadata = await loader.loadMetadata()

    expect(metadata.firstFrameOffset).toBe(1025)
    expect(mockLoad).toHaveBeenCalledTimes(2)
  })

  test('requires total file size in a partial Range response', async () => {
    const data = concat(createID3(), createFrames(4))
    mockLoad.mockResolvedValue({
      data,
      response: {
        status: 206,
        headers: headers({ 'content-length': String(data.length) })
      }
    })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3'
      })
    )

    await expect(loader.loadMetadata()).rejects.toThrow(
      'must expose Content-Range'
    )
  })
})
