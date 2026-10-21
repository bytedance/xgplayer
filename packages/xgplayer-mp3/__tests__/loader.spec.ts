var mockLoad: jest.Mock
var mockCancel: jest.Mock
var mockLoggerEnable: jest.Mock
var mockLoggerNames: string[]

jest.mock('xgplayer-streaming-shared', () => {
  mockLoad = jest.fn()
  mockCancel = jest.fn().mockResolvedValue(undefined)
  mockLoggerEnable = jest.fn()
  mockLoggerNames = []
  return {
    Logger: class {
      static enable = mockLoggerEnable
      static disable = jest.fn()
      constructor(
        name: string,
        _config: unknown
      ) {
        mockLoggerNames.push(name)
      }
      debug() {}
      error() {}
      log() {}
      warn() {}
    },
    NetLoader: class {
      load = mockLoad
      cancel = mockCancel
    }
  }
})

import { getConfig } from '../src/config'
import { MP3Loader } from '../src/loader'
import type { MP3LoadResult, MP3Segment } from '../src/types'

function requireSegment(result: MP3LoadResult | undefined): MP3Segment {
  expect(result?.segment).toBeTruthy()
  if (!result?.segment) throw new Error('Expected an MP3 segment')
  return result.segment
}

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

function createMPEG1Frames(count: number): Uint8Array {
  const frame = new Uint8Array(417)
  frame.set([0xff, 0xfb, 0x90, 0x64])
  return concat(...Array.from({ length: count }, () => frame))
}

function headers(values: Record<string, string>): Headers {
  return {
    get: (name: string) => values[name.toLowerCase()] || null
  } as Headers
}

function plainHeaders(values: Record<string, string>): Record<string, string> {
  return values
}

function mockRangeResponse(data: Uint8Array): void {
  mockLoad.mockImplementation((_url: string, options: { range?: [number, number] }) => {
    const start = options.range?.[0] ?? 0
    const end = Math.min(options.range?.[1] ?? data.length - 1, data.length - 1)
    return Promise.resolve({
      data: data.subarray(start, end + 1),
      response: {
        status: 206,
        headers: headers({
          'content-length': String(end - start + 1),
          'content-range': `bytes ${start}-${end}/${data.length}`
        })
      }
    })
  })
}

describe('MP3Loader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLoggerNames.length = 0
  })

  test('enables shared logger when openLog is configured', () => {
    new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        openLog: true
      })
    )

    expect(mockLoggerEnable).toHaveBeenCalledTimes(1)
  })

  test('uses a stable logger namespace instead of appending the URL', () => {
    new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'https://example.com/audio/very-long-file-name.mp3'
      })
    )

    expect(mockLoggerNames).toEqual(['MP3Loader'])
  })

  test('reads plain lowercase headers returned by the XHR loader', async () => {
    const data = concat(createID3(), createFrames(8))
    mockLoad.mockResolvedValue({
      data,
      response: {
        status: 206,
        headers: plainHeaders({
          'content-length': String(data.length),
          'content-range': `bytes 0-${data.length - 1}/${data.length}`
        })
      }
    })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3'
      })
    )

    const metadata = await loader.loadMetadata()

    expect(metadata.fileSize).toBe(data.length)
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
    const segment = requireSegment(await loader.loadSegmentByTime(0))

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
    const segment = requireSegment(await loader.loadSegmentByTime(3))

    expect(segment?.startTime).toBeLessThanOrEqual(3)
    expect(segment?.endTime).toBeGreaterThan(3)
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
    let result = await loader.loadSegmentByTime(0)
    while (result && !result.endOfFile) {
      result = await loader.loadNextSegment()
    }

    expect(result?.endOfFile).toBe(true)
    requireSegment(result)
    expect(loader.hasNextSegment).toBe(false)
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

  test('tries the configured maximum probe size before failing', async () => {
    const data = concat(createID3(180 * 1024), createFrames(40))
    mockRangeResponse(data)
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        probeSize: 128 * 1024,
        maxProbeSize: 192 * 1024
      })
    )

    const metadata = await loader.loadMetadata()

    expect(metadata.firstFrameOffset).toBe(180 * 1024 + 10)
    expect(mockLoad).toHaveBeenNthCalledWith(2, 'audio.mp3', {
      range: [0, 192 * 1024 - 1],
      responseType: 'arraybuffer'
    })
  })

  test('maps near-end seeks to the final complete frame', async () => {
    const data = createFrames(200)
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
    const result = await loader.loadSegmentByTime(7.19)
    const segment = requireSegment(result)

    expect(result?.endOfFile).toBe(true)
    expect(segment?.startTime).toBeLessThan(7.19)
    expect(segment?.endTime).toBeGreaterThan(7.19)
    expect(segment?.data.subarray(0, 4)).toEqual(
      new Uint8Array([0xff, 0xf3, 0xa8, 0xc4])
    )
  })

  test('expands a segment request across a large inter-frame ID3 tag', async () => {
    const leadingFrames = createFrames(28)
    const data = concat(leadingFrames, createID3(100 * 1024), createFrames(40))
    mockRangeResponse(data)
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3',
        segmentDuration: 1
      })
    )

    await loader.loadMetadata()
    const first = requireSegment(await loader.loadSegmentByTime(0))
    const second = requireSegment(await loader.loadNextSegment())

    expect(first?.range[1]).toBe(leadingFrames.length - 1)
    expect(second?.range[0]).toBeGreaterThan(leadingFrames.length + 100 * 1024)
    expect(second?.data.subarray(0, 4)).toEqual(
      new Uint8Array([0xff, 0xf3, 0xa8, 0xc4])
    )
  })

  test('corrects underestimated CBR duration after a complete linear scan', async () => {
    const data = createMPEG1Frames(200)
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
    let result = await loader.loadSegmentByTime(0)
    while (result && !result.endOfFile) {
      result = await loader.loadNextSegment()
    }

    expect(result?.endOfFile).toBe(true)
    expect(loader.metadata?.duration).toBeCloseTo((200 * 1152) / 44100)
  })

  test('reports EOF and corrects duration after a trailing ID3 tag', async () => {
    const audio = createFrames(28)
    const data = concat(audio, createID3(100 * 1024))
    mockRangeResponse(data)
    const loader = new MP3Loader(getConfig({
      media: document.createElement('audio'),
      url: 'audio.mp3',
      segmentDuration: 1
    }))

    const metadata = await loader.loadMetadata()
    expect(metadata.duration).toBeGreaterThan(9)
    const first = await loader.loadSegmentByTime(0)
    requireSegment(first)
    expect(first?.endOfFile).toBe(false)
    expect(loader.hasNextSegment).toBe(true)

    const result = await loader.loadNextSegment()

    expect(result).toEqual({ segment: null, endOfFile: true })
    expect(loader.hasNextSegment).toBe(false)
    expect(loader.nextTime).toBeCloseTo(28 * 0.036)
    expect(loader.metadata?.duration).toBeCloseTo(28 * 0.036)
    expect(mockLoad.mock.calls.at(-1)?.[1].range[1]).toBe(data.length - 1)
    const requestsAtEnd = mockLoad.mock.calls.length
    expect(await loader.loadNextSegment()).toEqual({ segment: null, endOfFile: true })
    expect(mockLoad).toHaveBeenCalledTimes(requestsAtEnd)
  })

  test('can resume reading from an earlier time after reaching EOF', async () => {
    mockRangeResponse(createFrames(200))
    const loader = new MP3Loader(getConfig({
      media: document.createElement('audio'),
      url: 'audio.mp3',
      segmentDuration: 1
    }))

    expect((await loader.loadSegmentByTime(7))?.endOfFile).toBe(true)
    expect(loader.hasNextSegment).toBe(false)

    const result = await loader.loadSegmentByTime(1)

    expect(result?.endOfFile).toBe(false)
    expect(requireSegment(result).startTime).toBeLessThanOrEqual(1)
    expect(loader.hasNextSegment).toBe(true)
    const next = requireSegment(await loader.loadNextSegment())
    expect(next.startTime).toBeCloseTo(requireSegment(result).endTime)
  })

  test('does not report EOF from a random seek into trailing metadata', async () => {
    const data = concat(createFrames(28), createID3(100 * 1024))
    mockRangeResponse(data)
    const loader = new MP3Loader(getConfig({
      media: document.createElement('audio'),
      url: 'audio.mp3',
      segmentDuration: 1
    }))
    await loader.loadMetadata()

    expect(await loader.loadSegmentByTime(9)).toBeUndefined()
    expect(loader.metadata?.duration).toBeGreaterThan(9)
  })

  test('falls back to HEAD content-length when content-range is not exposed', async () => {
    const data = concat(createID3(), createFrames(8))
    mockLoad
      .mockResolvedValueOnce({
        data,
        response: {
          status: 206,
          headers: headers({ 'content-length': String(data.length) })
        }
      })
      .mockResolvedValueOnce({
        data: '',
        response: {
          status: 200,
          headers: headers({ 'content-length': String(data.length) })
        }
      })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3'
      })
    )

    const metadata = await loader.loadMetadata()

    expect(metadata.fileSize).toBe(data.length)
    expect(mockLoad).toHaveBeenNthCalledWith(2, 'audio.mp3', {
      method: 'HEAD',
      responseType: 'text'
    })
  })

  test('requires total file size when range and HEAD responses both omit it', async () => {
    const data = concat(createID3(), createFrames(4))
    mockLoad
      .mockResolvedValueOnce({
        data,
        response: {
          status: 206,
          headers: headers({ 'content-length': String(data.length) })
        }
      })
      .mockResolvedValueOnce({
        data: '',
        response: {
          status: 200,
          headers: headers({})
        }
      })
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3'
      })
    )

    await expect(loader.loadMetadata()).rejects.toThrow(
      'must expose the complete file size'
    )
  })

  test('invalidates pending loads synchronously on destroy', async () => {
    let resolveLoad: ((value: unknown) => void) | undefined
    mockLoad.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveLoad = resolve
      })
    )
    const loader = new MP3Loader(
      getConfig({
        media: document.createElement('audio'),
        url: 'audio.mp3'
      })
    )

    const loadPromise = loader.loadMetadata()
    expect(loader.destroy()).toBeUndefined()
    resolveLoad?.({
      data: concat(createID3(), createFrames(4)),
      response: {
        status: 200,
        headers: headers({})
      }
    })

    await expect(loadPromise).rejects.toThrow('loader has been destroyed')
    expect(loader.metadata).toBeNull()
    expect(mockCancel).toHaveBeenCalled()
  })
})
