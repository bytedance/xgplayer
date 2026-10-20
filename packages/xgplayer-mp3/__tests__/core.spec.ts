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
    currentTime: { configurable: true, value: 0, writable: true },
    paused: { configurable: true, value: true, writable: true },
    ended: { configurable: true, value: false, writable: true },
    readyState: { configurable: true, value: 0, writable: true }
  })
  return media
}

function createSegment(overrides: Record<string, unknown> = {}) {
  return {
    data: new Uint8Array([0xff, 0xf3, 0xa8, 0xc4]),
    range: [45, 476] as [number, number],
    index: 0,
    startTime: 0,
    endTime: 0.036,
    nextOffset: 477,
    isLast: false,
    ...overrides
  }
}

async function flushPromises(times = 5): Promise<void> {
  for (let i = 0; i < times; i++) await Promise.resolve()
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((res) => {
    resolve = res
  })
  return { promise, resolve }
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
    mockBufferService.reset.mockResolvedValue(undefined)
    mockBufferService.appendSegment.mockResolvedValue(undefined)
    mockBufferService.evictBuffer.mockResolvedValue(undefined)
    mockBufferService.endOfStream.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('loads metadata and appends a frame-aligned MP3 segment', async () => {
    const segment = createSegment({ isLast: true })
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
    expect(core.isInitialized).toBe(true)
    core.destroy()
  })

  test('falls back to time zero when the requested restore time is out of range', async () => {
    const segment = createSegment({
      data: new Uint8Array([1]),
      range: [45, 46],
      endTime: 1,
      nextOffset: 47
    })
    mockLoader.loadSegmentByTime.mockResolvedValue(segment)
    const core = new MP3({ media: createMedia(), url: 'audio.mp3' })

    const restoredTime = await core.load('audio.mp3', 20)

    expect(restoredTime).toBe(0)
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(0)
    core.destroy()
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
    core.destroy()
  })

  test('invalidates the core synchronously on destroy', async () => {
    const core = new MP3({ media: createMedia(), url: 'audio.mp3' })

    expect(core.destroy()).toBeUndefined()
    expect(mockLoader.destroy).toHaveBeenCalledTimes(1)
    expect(mockBufferService.destroy).toHaveBeenCalledTimes(1)
    await expect(core.load()).rejects.toThrow('has been destroyed')
  })

  test('binds and unbinds media events as a group', () => {
    const media = createMedia()
    const addEventListener = jest.spyOn(media, 'addEventListener')
    const removeEventListener = jest.spyOn(media, 'removeEventListener')
    const core = new MP3({ media, url: 'audio.mp3' })

    expect(addEventListener.mock.calls.map(([event]) => event)).toEqual([
      'seeking',
      'playing',
      'ended'
    ])

    core.destroy()

    expect(removeEventListener.mock.calls.map(([event]) => event)).toEqual([
      'seeking',
      'playing',
      'ended'
    ])
  })

  test('ignores stale out-of-buffer seek cancellation callbacks', async () => {
    const media = createMedia()
    const firstCancel = createDeferred<void>()
    const secondCancel = createDeferred<void>()
    mockLoader.cancel
      .mockReturnValueOnce(firstCancel.promise)
      .mockReturnValueOnce(secondCancel.promise)
    mockLoader.loadSegmentByTime.mockResolvedValue(createSegment())
    const core = new MP3({ media, url: 'audio.mp3' })
    await core.load()
    mockLoader.loadSegmentByTime.mockClear()

    media.currentTime = 3
    media.dispatchEvent(new Event('seeking'))
    media.currentTime = 7
    media.dispatchEvent(new Event('seeking'))

    firstCancel.resolve()
    await flushPromises()
    expect(mockLoader.loadSegmentByTime).not.toHaveBeenCalled()

    secondCancel.resolve()
    await flushPromises()
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledTimes(1)
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(7)

    core.destroy()
  })
})
