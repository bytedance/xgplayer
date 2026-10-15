const mockLoader = {
  url: '',
  meta: { moov: {}, isFragmentMP4: false },
  videoSegments: [],
  audioSegments: [],
  changeUrl: jest.fn(),
  loadSegmentByTime: jest.fn(),
  loadNextSegment: jest.fn(),
  isLastSegment: jest.fn(),
  getSegmentByTime: jest.fn(),
  isSegmentLoading: jest.fn(),
  cancel: jest.fn(),
  destroy: jest.fn()
}

const mockBufferService = {
  isMMS: false,
  reset: jest.fn(),
  setSegmentList: jest.fn(),
  appendBuffer: jest.fn(),
  evictBuffer: jest.fn(),
  endOfStream: jest.fn(),
  destroy: jest.fn()
}

jest.mock('xgplayer-mp4-loader', () => ({
  __esModule: true,
  default: jest.fn(() => mockLoader)
}))

jest.mock('../src/mp4/buffer-service', () => ({
  BufferService: jest.fn(() => mockBufferService)
}))

import { Buffer, EVENT } from 'xgplayer-streaming-shared'
import MP4Loader from 'xgplayer-mp4-loader'
import { MP4 } from '../src/mp4'

function createMedia() {
  const media = document.createElement('video')
  Object.defineProperties(media, {
    paused: { configurable: true, value: true, writable: true },
    ended: { configurable: true, value: false, writable: true },
    readyState: { configurable: true, value: 0, writable: true }
  })
  return media
}

describe('MP4 core lifecycle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    mockLoader.url = ''
    mockLoader.meta = { moov: {}, isFragmentMP4: false }
    mockLoader.changeUrl.mockResolvedValue(undefined)
    mockLoader.loadSegmentByTime.mockResolvedValue(undefined)
    mockLoader.loadNextSegment.mockResolvedValue(undefined)
    mockLoader.isLastSegment.mockReturnValue(false)
    mockLoader.getSegmentByTime.mockReturnValue({})
    mockLoader.isSegmentLoading.mockReturnValue(false)
    mockLoader.cancel.mockResolvedValue(undefined)
    mockLoader.destroy.mockResolvedValue(undefined)
    mockBufferService.reset.mockResolvedValue(undefined)
    mockBufferService.appendBuffer.mockResolvedValue(undefined)
    mockBufferService.evictBuffer.mockResolvedValue(undefined)
    mockBufferService.endOfStream.mockResolvedValue(undefined)
    mockBufferService.destroy.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  test('reloads the configured URL when load is called without an argument', async () => {
    const core = new MP4({ media: createMedia(), url: 'initial.mp4' })
    const loaderCalls = (MP4Loader as unknown as jest.Mock).mock.calls
    const loaderConfig = loaderCalls[loaderCalls.length - 1][0]

    await core.load()

    expect(loaderConfig).not.toHaveProperty('segmentDuration')
    expect(loaderConfig).not.toHaveProperty('responseType')
    expect(loaderConfig).not.toHaveProperty('memoryOpt')
    expect(mockLoader.changeUrl).toHaveBeenCalledWith(
      'initial.mp4',
      'initial.mp4',
      undefined,
      undefined
    )
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(0, undefined)
    await core.destroy()
  })

  test('loads the segment containing the requested restore time', async () => {
    mockLoader.loadSegmentByTime.mockResolvedValue({
      data: new Uint8Array([1]),
      options: { range: [100, 199] },
      video: {
        index: 1,
        startTime: 30,
        endTime: 40,
        frames: [{ index: 1 }]
      }
    })
    mockLoader.isLastSegment.mockReturnValue(true)
    const core = new MP4({ media: createMedia(), url: 'video.mp4' })

    const restoredTime = await core.load('video.mp4', 32)

    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledWith(32, undefined)
    expect(restoredTime).toBe(32)
    await core.destroy()
  })

  test('falls back to the first segment when the restore time is out of range', async () => {
    mockLoader.loadSegmentByTime
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({
        data: new Uint8Array([1]),
        options: { range: [0, 99] },
        video: {
          index: 0,
          startTime: 0,
          endTime: 10,
          frames: [{ index: 0 }]
        }
      })
    mockLoader.isLastSegment.mockReturnValue(true)
    const core = new MP4({ media: createMedia(), url: 'shorter.mp4' })

    const restoredTime = await core.load('shorter.mp4', 90)

    expect(mockLoader.loadSegmentByTime).toHaveBeenNthCalledWith(1, 90, undefined)
    expect(mockLoader.loadSegmentByTime).toHaveBeenNthCalledWith(2, 0, undefined)
    expect(restoredTime).toBe(0)
    await core.destroy()
  })

  test('passes request settings to the loader', async () => {
    const media = createMedia()
    const core = new MP4({
      media,
      url: 'video.mp4',
      vid: 'vid-1',
      retry: 5,
      retryDelay: 1200,
      timeout: 8000,
      onProcessMinLen: 4096,
      segmentDuration: 4,
      memoryOpt: true,
      reqOptions: {
        method: 'POST',
        headers: { 'x-test': '1' }
      }
    })

    expect(MP4Loader).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'video.mp4',
        vid: 'vid-1',
        retry: 5,
        retryDelay: 1200,
        timeout: 8000,
        onProcessMinLen: 4096,
        segmentDuration: 4,
        memoryOpt: true,
        method: 'POST',
        headers: { 'x-test': '1' }
      })
    )
    await core.destroy()
  })

  test('appends the first segment, evicts old data and ends the stream', async () => {
    const segment = {
      data: new Uint8Array([1, 2, 3]),
      options: { range: [0, 99] },
      video: {
        index: 0,
        startTime: 0,
        endTime: 2,
        frames: [{ index: 0 }]
      }
    }
    mockLoader.loadSegmentByTime.mockResolvedValue(segment)
    mockLoader.isLastSegment.mockReturnValue(true)
    const core = new MP4({
      media: createMedia(),
      url: 'video.mp4',
      bufferBehind: 12
    })

    await core.load()

    expect(mockBufferService.appendBuffer).toHaveBeenCalledWith(
      segment.data,
      0,
      segment.video.frames,
      undefined,
      mockLoader.meta.moov
    )
    expect(mockBufferService.setSegmentList).toHaveBeenCalledWith(
      mockLoader.videoSegments,
      mockLoader.audioSegments,
      false
    )
    expect(mockBufferService.evictBuffer).toHaveBeenCalledWith(12)
    expect(mockBufferService.endOfStream).toHaveBeenCalled()
    expect(core._inited).toBe(true)
    await core.destroy()
  })

  test('passes fragmented MP4 metadata to the buffer service', async () => {
    const segment = {
      data: new Uint8Array([1, 2, 3]),
      options: { range: [100, 199] },
      video: {
        index: 0,
        startTime: 0,
        endTime: 2,
        frames: []
      }
    }
    mockLoader.meta = { moov: {}, isFragmentMP4: true }
    mockLoader.loadSegmentByTime.mockResolvedValue(segment)
    const core = new MP4({ media: createMedia(), url: 'fragmented.mp4' })

    await core.load()

    expect(mockBufferService.setSegmentList).toHaveBeenCalledWith(
      mockLoader.videoSegments,
      mockLoader.audioSegments,
      true
    )
    expect(mockBufferService.appendBuffer).toHaveBeenCalledWith(
      segment.data,
      100,
      [],
      undefined,
      mockLoader.meta.moov
    )
    await core.destroy()
  })

  test('serializes URL changes and prevents stale loads from appending', async () => {
    let resolveFirstChange: (() => void) | undefined
    mockLoader.changeUrl
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolveFirstChange = resolve
          })
      )
      .mockResolvedValue(undefined)

    const core = new MP4({ media: createMedia(), url: 'first.mp4' })
    const firstLoad = core.load('first.mp4')
    await Promise.resolve()
    await Promise.resolve()
    const secondLoad = core.load('second.mp4')
    expect(resolveFirstChange).toBeDefined()
    resolveFirstChange?.()

    await Promise.all([firstLoad, secondLoad])

    expect(mockLoader.changeUrl).toHaveBeenNthCalledWith(
      2,
      'second.mp4',
      'second.mp4',
      undefined,
      undefined
    )
    expect(mockLoader.loadSegmentByTime).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('destroys loader and buffer service without resetting or rebinding MSE', async () => {
    const core = new MP4({ media: createMedia(), url: 'video.mp4' })

    await core.destroy()

    expect(mockLoader.destroy).toHaveBeenCalledTimes(1)
    expect(mockBufferService.destroy).toHaveBeenCalledTimes(1)
    expect(mockBufferService.reset).not.toHaveBeenCalled()
  })

  test('emits an error when a segment request fails', async () => {
    const networkError = new Error('network failed')
    mockLoader.loadSegmentByTime.mockRejectedValue(networkError)
    const core = new MP4({ media: createMedia(), url: 'video.mp4' })
    const onError = jest.fn()
    core.on(EVENT.ERROR, onError)

    await expect(core.load()).rejects.toMatchObject({
      originError: networkError
    })
    expect(onError).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('nudges currentTime when waiting occurs inside buffered media', () => {
    const media = createMedia()
    Object.defineProperty(media, 'paused', {
      configurable: true,
      value: false,
      writable: true
    })
    Object.defineProperty(media, 'readyState', {
      configurable: true,
      value: 2,
      writable: true
    })
    jest.spyOn(Buffer, 'get').mockReturnValue({} as TimeRanges)
    jest.spyOn(Buffer, 'end').mockReturnValue(10)
    const core = new MP4({
      media,
      url: 'video.mp4',
      waitingInBufferTimeOut: 20
    })

    media.dispatchEvent(new Event('waiting'))
    jest.advanceTimersByTime(20)

    expect(media.currentTime).toBe(0.5)
    void core.destroy()
  })

  test('does not nudge currentTime after playback has already advanced', () => {
    const media = createMedia()
    Object.defineProperty(media, 'paused', {
      configurable: true,
      value: false,
      writable: true
    })
    jest.spyOn(Buffer, 'get').mockReturnValue({} as TimeRanges)
    jest.spyOn(Buffer, 'end').mockReturnValue(10)
    const core = new MP4({
      media,
      url: 'video.mp4',
      waitingInBufferTimeOut: 20
    })

    media.dispatchEvent(new Event('waiting'))
    media.currentTime = 1
    jest.advanceTimersByTime(20)

    expect(media.currentTime).toBe(1)
    void core.destroy()
  })

  test('limits buffered waiting recovery across seeking events', () => {
    const media = createMedia()
    Object.defineProperty(media, 'paused', {
      configurable: true,
      value: false,
      writable: true
    })
    jest.spyOn(Buffer, 'get').mockReturnValue({} as TimeRanges)
    jest.spyOn(Buffer, 'end').mockReturnValue(10)
    const core = new MP4({
      media,
      url: 'video.mp4',
      waitingInBufferTimeOut: 20,
      waitJampBufferMaxCnt: 2
    })

    for (let attempt = 0; attempt < 2; attempt++) {
      media.dispatchEvent(new Event('waiting'))
      jest.advanceTimersByTime(20)
      media.dispatchEvent(new Event('seeking'))
    }
    media.dispatchEvent(new Event('waiting'))
    jest.advanceTimersByTime(20)

    expect(media.currentTime).toBe(1)
    void core.destroy()
  })

  test('keeps stall monitoring active after the last segment is downloaded', async () => {
    const media = createMedia()
    Object.defineProperties(media, {
      paused: { configurable: true, value: false, writable: true },
      readyState: { configurable: true, value: 2, writable: true }
    })
    mockLoader.loadSegmentByTime.mockResolvedValue({
      data: new Uint8Array([1]),
      options: { range: [0, 99] },
      video: {
        index: 0,
        startTime: 0,
        endTime: 2,
        frames: [{ index: 0 }]
      }
    })
    mockLoader.isLastSegment.mockReturnValue(true)
    const core = new MP4({
      media,
      url: 'video.mp4',
      tickInterval: 5,
      waitingTimeOut: 20
    })
    const onError = jest.fn()
    core.on(EVENT.ERROR, onError)

    await core.load()
    jest.advanceTimersByTime(25)

    expect(mockBufferService.endOfStream).toHaveBeenCalled()
    expect(onError).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('stops stall monitoring after the first fatal error', async () => {
    const media = createMedia()
    Object.defineProperties(media, {
      paused: { configurable: true, value: false, writable: true },
      readyState: { configurable: true, value: 2, writable: true }
    })
    const core = new MP4({
      media,
      url: 'video.mp4',
      tickInterval: 5,
      waitingTimeOut: 20
    })
    const onError = jest.fn()
    core.on(EVENT.ERROR, onError)

    await core.load()
    jest.advanceTimersByTime(70)

    expect(onError).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('reports a playback stall after waitingTimeOut', () => {
    const media = createMedia()
    Object.defineProperty(media, 'paused', {
      configurable: true,
      value: false,
      writable: true
    })
    const core = new MP4({
      media,
      url: 'video.mp4',
      waitingTimeOut: 20
    })
    const onError = jest.fn()
    core.on(EVENT.ERROR, onError)

    const check = core as unknown as { _bufferBreakCheck: () => void }
    check._bufferBreakCheck()
    jest.advanceTimersByTime(20)

    expect(onError).toHaveBeenCalledTimes(1)
    void core.destroy()
  })
})
