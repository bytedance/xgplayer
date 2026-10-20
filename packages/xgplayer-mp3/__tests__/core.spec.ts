const metadata = {
  fileSize: 1000,
  firstFrameOffset: 45,
  dataSize: 955,
  duration: 10,
  bitRate: 96000,
  sampleRate: 16000,
  channelCount: 1,
  version: 2,
  layer: 3,
  samplesPerFrame: 576,
  frameDuration: 0.036,
  isVBR: false,
  seekMode: 'cbr'
}

const mockLoader = {
  url: '',
  metadata,
  changeUrl: jest.fn(),
  loadMetadata: jest.fn(),
  loadSegmentByTime: jest.fn(),
  loadNextSegment: jest.fn(),
  cancel: jest.fn(),
  destroy: jest.fn()
}

const mockBufferService = {
  reset: jest.fn(),
  appendSegment: jest.fn(),
  evictBuffer: jest.fn(),
  endOfStream: jest.fn(),
  destroy: jest.fn()
}

jest.mock('../src/loader', () => ({
  MP3Loader: jest.fn(() => mockLoader)
}))

jest.mock('../src/buffer-service', () => ({
  BufferService: Object.assign(
    jest.fn(() => mockBufferService),
    {
      isSupported: jest.fn().mockReturnValue(true)
    }
  )
}))

import { MP3Loader } from '../src/loader'
import { MP3 } from '../src/mp3'

function createMedia(): HTMLMediaElement {
  const media = document.createElement('audio')
  Object.defineProperties(media, {
    paused: { configurable: true, value: true, writable: true },
    ended: { configurable: true, value: false, writable: true },
    readyState: { configurable: true, value: 0, writable: true }
  })
  return media
}

describe('MP3 core', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    mockLoader.url = ''
    mockLoader.metadata = metadata
    mockLoader.changeUrl.mockImplementation(async (url: string) => {
      mockLoader.url = url
    })
    mockLoader.loadMetadata.mockResolvedValue(metadata)
    mockLoader.loadSegmentByTime.mockResolvedValue(undefined)
    mockLoader.loadNextSegment.mockResolvedValue(undefined)
    mockLoader.cancel.mockResolvedValue(undefined)
    mockLoader.destroy.mockResolvedValue(undefined)
    mockBufferService.reset.mockResolvedValue(undefined)
    mockBufferService.appendSegment.mockResolvedValue(undefined)
    mockBufferService.evictBuffer.mockResolvedValue(undefined)
    mockBufferService.endOfStream.mockResolvedValue(undefined)
    mockBufferService.destroy.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('loads metadata and appends a frame-aligned MP3 segment', async () => {
    const segment = {
      data: new Uint8Array([0xff, 0xf3, 0xa8, 0xc4]),
      range: [45, 476] as [number, number],
      index: 0,
      startTime: 0,
      endTime: 0.036,
      nextOffset: 477,
      isLast: true
    }
    mockLoader.loadSegmentByTime.mockResolvedValue(segment)
    const core = new MP3({
      media: createMedia(),
      url: 'audio.mp3',
      bufferBehind: 12
    })

    const restoredTime = await core.load()

    expect(restoredTime).toBe(0)
    expect(mockLoader.changeUrl).toHaveBeenCalledWith('audio.mp3')
    expect(mockLoader.loadMetadata).toHaveBeenCalled()
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(0)
    expect(mockBufferService.appendSegment).toHaveBeenCalledWith(
      segment,
      10,
      true
    )
    expect(mockBufferService.evictBuffer).toHaveBeenCalledWith(12)
    expect(mockBufferService.endOfStream).toHaveBeenCalled()
    expect(core._inited).toBe(true)
    await core.destroy()
  })

  test('falls back to time zero when the requested restore time is out of range', async () => {
    const segment = {
      data: new Uint8Array([1]),
      range: [45, 46] as [number, number],
      index: 0,
      startTime: 0,
      endTime: 1,
      nextOffset: 47,
      isLast: false
    }
    mockLoader.loadSegmentByTime.mockResolvedValue(segment)
    const core = new MP3({ media: createMedia(), url: 'audio.mp3' })

    const restoredTime = await core.load('audio.mp3', 20)

    expect(restoredTime).toBe(0)
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(0)
    await core.destroy()
  })

  test('passes request and buffering settings to the loader', async () => {
    const media = createMedia()
    const core = new MP3({
      media,
      url: 'audio.mp3',
      probeSize: 65536,
      segmentDuration: 6,
      retry: 5,
      timeout: 9000,
      reqOptions: {
        headers: { 'x-audio-token': '1' }
      }
    })

    const calls = (MP3Loader as unknown as jest.Mock).mock.calls
    expect(calls[calls.length - 1][0]).toMatchObject({
      probeSize: 65536,
      segmentDuration: 6,
      retry: 5,
      timeout: 9000,
      reqOptions: {
        headers: { 'x-audio-token': '1' }
      }
    })
    await core.destroy()
  })
})
