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
  nextTime: 0,
  hasNextSegment: true,
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
  updateDuration: jest.fn(),
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
import type { MP3LoadResult, MP3Segment } from '../src/types'

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

function createSegment(overrides: Partial<MP3Segment> = {}): MP3Segment {
  return {
    data: new Uint8Array([0xff, 0xf3, 0xa8, 0xc4]),
    range: [45, 476] as [number, number],
    index: 0,
    startTime: 0,
    endTime: 0.036,
    nextOffset: 477,
    ...overrides
  }
}

function createResult(segment: MP3Segment | null, endOfFile = false): MP3LoadResult {
  return { segment, endOfFile }
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
    mockLoader.nextTime = 0
    mockLoader.hasNextSegment = true
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
    mockBufferService.updateDuration.mockResolvedValue(undefined)
    mockBufferService.endOfStream.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('loads metadata and appends a frame-aligned MP3 segment', async () => {
    const segment = createSegment()
    mockLoader.loadSegmentByTime.mockResolvedValue(createResult(segment, true))
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
      true
    )
    expect(mockBufferService.evictBuffer).toHaveBeenCalledWith(12)
    expect(mockBufferService.updateDuration).toHaveBeenCalledWith(10)
    expect(mockBufferService.updateDuration).toHaveBeenCalledTimes(1)
    expect(mockBufferService.endOfStream).toHaveBeenCalledWith()
    expect(mockBufferService.endOfStream).toHaveBeenCalledTimes(1)
    expect(mockBufferService.updateDuration.mock.invocationCallOrder[0]).toBeLessThan(
      mockBufferService.endOfStream.mock.invocationCallOrder[0]
    )
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
    mockLoader.loadSegmentByTime.mockResolvedValue(createResult(segment))
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
    mockLoader.loadSegmentByTime.mockResolvedValue(createResult(createSegment()))
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

  test('ends the stream when EOF arrives without another audio segment', async () => {
    const segment = createSegment({ endTime: 1.008 })
    mockLoader.loadSegmentByTime.mockResolvedValue(createResult(segment))
    mockLoader.loadNextSegment.mockImplementation(async () => {
      mockLoader.metadata = { ...metadata, duration: 1.008 }
      mockLoader.hasNextSegment = false
      return createResult(null, true)
    })
    const core = new MP3({ media: createMedia(), url: 'audio.mp3' })

    await core.load()
    await flushPromises(15)

    expect(mockBufferService.appendSegment).toHaveBeenCalledTimes(1)
    expect(mockBufferService.endOfStream).toHaveBeenCalledTimes(1)
    expect(mockBufferService.updateDuration).toHaveBeenCalledWith(1.008)
    expect(mockBufferService.endOfStream).toHaveBeenCalledWith()
    core.destroy()
  })

  test.each([false, true])(
    'fills a buffer hole after a backward seek, even with completed download %s',
    async (endOfFile) => {
      const media = createMedia()
      const endTime = endOfFile ? 120 : 100
      const forwardSegment = createSegment({ startTime: 90, endTime })
      mockLoader.loadSegmentByTime.mockResolvedValueOnce(createResult(forwardSegment, endOfFile))
      mockLoader.metadata = { ...metadata, duration: 120 }
      mockLoader.loadMetadata.mockResolvedValue(mockLoader.metadata)
      const core = new MP3({ media, url: 'audio.mp3', tickInterval: 500 })
      await core.load('audio.mp3', 90)
      await flushPromises()
      mockLoader.nextTime = endTime
      mockLoader.hasNextSegment = !endOfFile
      mockLoader.loadSegmentByTime.mockResolvedValue(
        createResult(createSegment({ startTime: 40, endTime: 50 }))
      )
      const ranges = [[30, 40], [60, endTime]]
      Object.defineProperties(media, {
        currentTime: { value: 35, writable: true },
        paused: { value: false, writable: true },
        readyState: { value: 4, writable: true },
        buffered: {
          configurable: true,
          value: {
            length: ranges.length,
            start: (index: number) => ranges[index][0],
            end: (index: number) => ranges[index][1]
          }
        }
      })
      mockLoader.loadSegmentByTime.mockClear()

      media.dispatchEvent(new Event('seeking'))
      jest.advanceTimersByTime(1)
      await flushPromises()

      expect(mockLoader.cancel).not.toHaveBeenCalled()
      expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(40)
      expect(mockBufferService.appendSegment).toHaveBeenLastCalledWith(
        expect.objectContaining({ startTime: 40 }), true
      )
      expect(mockBufferService.updateDuration).toHaveBeenLastCalledWith(120)
      core.destroy()
    }
  )

  test('uses the sequential cursor when it matches the current buffered range', async () => {
    const media = createMedia()
    mockLoader.loadSegmentByTime.mockResolvedValue(createResult(createSegment({ endTime: 40 })))
    const core = new MP3({ media, url: 'audio.mp3' })
    await core.load()
    mockLoader.nextTime = 40.02
    mockLoader.loadNextSegment.mockClear()
    mockLoader.loadSegmentByTime.mockClear()
    Object.defineProperties(media, {
      currentTime: { value: 35 },
      paused: { value: false },
      readyState: { value: 4 },
      buffered: {
        value: { length: 1, start: () => 0, end: () => 40 }
      }
    })

    media.dispatchEvent(new Event('seeking'))
    jest.advanceTimersByTime(1)
    await flushPromises()

    expect(mockLoader.loadNextSegment).toHaveBeenCalledTimes(1)
    expect(mockLoader.loadSegmentByTime).not.toHaveBeenCalled()
    core.destroy()
  })

  test.each(['load', 'seek', 'destroy'])(
    'does not end a superseded stream when %s happens during the final duration update',
    async (action) => {
      const media = createMedia()
      const durationUpdate = createDeferred<void>()
      mockLoader.loadSegmentByTime
        .mockResolvedValueOnce(createResult(createSegment(), true))
        .mockResolvedValue(undefined)
      mockBufferService.updateDuration.mockReturnValueOnce(durationUpdate.promise)
      const core = new MP3({ media, url: 'audio.mp3' })
      const firstLoad = core.load()
      await flushPromises(20)
      expect(mockBufferService.updateDuration).toHaveBeenCalledTimes(1)

      let nextLoad: Promise<number> | undefined
      if (action === 'load') nextLoad = core.load('next.mp3')
      else if (action === 'seek') {
        media.currentTime = 5
        media.dispatchEvent(new Event('seeking'))
      } else core.destroy()
      durationUpdate.resolve()
      await firstLoad
      await nextLoad
      await flushPromises()

      expect(mockBufferService.endOfStream).not.toHaveBeenCalled()
      core.destroy()
    }
  )

  test('stops loading and reports a segment failure without ending the stream', async () => {
    const media = createMedia()
    const error = new Error('segment request failed')
    const onError = jest.fn()
    mockLoader.loadSegmentByTime.mockResolvedValue(
      createResult(createSegment({ endTime: 40 }))
    )
    const core = new MP3({ media, url: 'audio.mp3' })
    core.on('error', onError)
    await core.load()
    mockLoader.nextTime = 40
    mockLoader.loadNextSegment.mockRejectedValueOnce(error)
    Object.defineProperties(media, {
      currentTime: { value: 35 },
      paused: { value: false },
      readyState: { value: 4 },
      buffered: {
        value: { length: 1, start: () => 0, end: () => 40 }
      }
    })

    media.dispatchEvent(new Event('playing'))
    jest.advanceTimersByTime(1)
    await flushPromises(15)

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0].message).toContain(error.message)
    expect(mockBufferService.endOfStream).not.toHaveBeenCalled()
    jest.advanceTimersByTime(10000)
    await flushPromises()
    expect(mockLoader.loadNextSegment).toHaveBeenCalledTimes(1)
    core.destroy()
  })

  test('does not end the stream when the final duration update fails', async () => {
    const onError = jest.fn()
    mockLoader.loadSegmentByTime.mockResolvedValue(
      createResult(createSegment(), true)
    )
    mockBufferService.updateDuration.mockRejectedValueOnce(new Error('duration update failed'))
    const core = new MP3({ media: createMedia(), url: 'audio.mp3' })
    core.on('error', onError)

    await expect(core.load()).rejects.toThrow('duration update failed')

    expect(onError).toHaveBeenCalledTimes(1)
    expect(mockBufferService.endOfStream).not.toHaveBeenCalled()
    expect(core.isInitialized).toBe(false)
    core.destroy()
  })
})
