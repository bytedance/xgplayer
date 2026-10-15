interface MockMSE {
  mediaSource: MediaSource | null
  bindMedia: jest.Mock<Promise<void>, [HTMLMediaElement]>
  unbindMedia: jest.Mock<Promise<void>, []>
  createSource: jest.Mock<void, [string, string]>
  append: jest.Mock<Promise<void>, [string, BufferSource, unknown?]>
  remove: jest.Mock<Promise<void>, [string, number, number, unknown?]>
  endOfStream: jest.Mock<Promise<void>, []>
}

interface MockTrack {
  type: string
  codec: string
  exist: jest.Mock<boolean, []>
}

interface MockDemuxer {
  videoTrack: MockTrack
  audioTrack: MockTrack
  demux: jest.Mock<
    { videoTrack: MockTrack; audioTrack: MockTrack },
    unknown[]
  >
  reset: jest.Mock<void, []>
}

interface MockFragmentDemuxer {
  videoTrack: MockTrack
  audioTrack: MockTrack
  demuxPart: jest.Mock<
    { videoTrack: MockTrack; audioTrack: MockTrack },
    unknown[]
  >
}

interface MockRemuxer {
  remux: jest.Mock<
    {
      videoInitSegment: Uint8Array
      audioInitSegment: Uint8Array
      videoSegment: Uint8Array
      audioSegment: Uint8Array
    },
    [boolean]
  >
  reset: jest.Mock<void, []>
}

interface MockWorkerTrack {
  type: string
  codec: string
  initSegment?: Uint8Array
  segment?: Uint8Array
}

interface MockWorker {
  configure: jest.Mock<void, [unknown[], unknown[], boolean, boolean]>
  transmux: jest.Mock<
    Promise<{ video: MockWorkerTrack | null; audio: MockWorkerTrack | null }>,
    [Uint8Array, number, unknown, unknown, unknown]
  >
  reset: jest.Mock<void, []>
  destroy: jest.Mock<void, []>
}

var mockMSE: MockMSE
var mockVideoTrack: MockTrack
var mockAudioTrack: MockTrack
var mockDemuxer: MockDemuxer
var mockFragmentDemuxer: MockFragmentDemuxer
var mockRemuxer: MockRemuxer
var mockWorker: MockWorker

jest.mock('xgplayer-streaming-shared', () => {
  mockMSE = {
    mediaSource: null,
    bindMedia: jest.fn(),
    unbindMedia: jest.fn(),
    createSource: jest.fn(),
    append: jest.fn(),
    remove: jest.fn(),
    endOfStream: jest.fn()
  }
  class StreamingError extends Error {
    errorType = 'other'
    errorCode = 1
    errorMessage = this.message
    originError: unknown

    static create(
      type: unknown,
      _subType?: unknown,
      origin?: unknown
    ): StreamingError {
      if (type instanceof StreamingError) return type
      const cause = type instanceof Error ? type : origin
      const error = new StreamingError(
        cause instanceof Error ? cause.message : 'streaming error'
      )
      error.originError = cause
      error.errorMessage = error.message
      return error
    }
  }
  return {
    ERR: {
      REMUX: 'remux',
      MEDIA: 'media',
      SUB_TYPES: {
        FMP4: 'fmp4',
        MSE_APPEND_BUFFER: 'mse_append_buffer',
        MSE_OTHER: 'mse_other'
      }
    },
    StreamingError,
    MSE: jest.fn(() => mockMSE),
    Buffer: {
      get: jest.fn(),
      start: jest.fn(),
      end: jest.fn()
    }
  }
})

jest.mock('xgplayer-transmuxer', () => {
  mockVideoTrack = {
    type: 'video',
    codec: 'avc1.64001f',
    exist: jest.fn()
  }
  mockAudioTrack = {
    type: 'audio',
    codec: 'mp4a.40.2',
    exist: jest.fn()
  }
  mockDemuxer = {
    videoTrack: mockVideoTrack,
    audioTrack: mockAudioTrack,
    demux: jest.fn(),
    reset: jest.fn()
  }
  mockFragmentDemuxer = {
    videoTrack: mockVideoTrack,
    audioTrack: mockAudioTrack,
    demuxPart: jest.fn()
  }
  mockRemuxer = {
    remux: jest.fn(),
    reset: jest.fn()
  }
  return {
    MP4Demuxer: jest.fn(() => mockDemuxer),
    FMP4Demuxer: jest.fn(() => mockFragmentDemuxer),
    FMP4Remuxer: jest.fn(() => mockRemuxer)
  }
})

jest.mock('../src/worker', () => {
  class WorkerTaskCancelledError extends Error {}
  mockWorker = {
    configure: jest.fn(),
    transmux: jest.fn(),
    reset: jest.fn(),
    destroy: jest.fn()
  }
  return {
    __esModule: true,
    default: jest.fn(() => mockWorker),
    WorkerTaskCancelledError
  }
})

import { Buffer, MSE } from 'xgplayer-streaming-shared'
import { BufferService } from '../src/mp4/buffer-service'
import { getConfig } from '../src/mp4/config'
import { WorkerTaskCancelledError } from '../src/worker'

function createService(options: Record<string, unknown> = {}) {
  const media = document.createElement('video')
  Object.defineProperty(media, 'currentTime', {
    configurable: true,
    value: 20,
    writable: true
  })
  const mp4 = { media }
  const config = getConfig({ media, ...options })
  return {
    media,
    service: new BufferService(mp4 as never, config)
  }
}

describe('BufferService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockMSE.bindMedia.mockResolvedValue(undefined)
    mockMSE.unbindMedia.mockResolvedValue(undefined)
    mockMSE.append.mockResolvedValue(undefined)
    mockMSE.remove.mockResolvedValue(undefined)
    mockMSE.endOfStream.mockResolvedValue(undefined)
    mockVideoTrack.exist.mockReturnValue(true)
    mockAudioTrack.exist.mockReturnValue(true)
    mockDemuxer.demux.mockReturnValue({
      videoTrack: mockVideoTrack,
      audioTrack: mockAudioTrack
    })
    mockFragmentDemuxer.demuxPart.mockReturnValue({
      videoTrack: mockVideoTrack,
      audioTrack: mockAudioTrack
    })
    mockRemuxer.remux.mockReturnValue({
      videoInitSegment: new Uint8Array([1]),
      audioInitSegment: new Uint8Array([2]),
      videoSegment: new Uint8Array([3]),
      audioSegment: new Uint8Array([4])
    })
    mockWorker.transmux.mockResolvedValue({
      video: null,
      audio: null
    })
    Object.defineProperty(global, 'Worker', {
      configurable: true,
      value: class {}
    })
  })

  afterEach(() => {
    Reflect.deleteProperty(global, 'Worker')
  })

  test('passes MMS options to MSE and binds only when reset starts a load', async () => {
    const { media, service } = createService({
      preferMMS: true,
      mseAttachMode: 'source-element'
    })

    expect(MSE).toHaveBeenCalledWith(undefined, {
      preferMMS: true,
      attachMode: 'source-element'
    })
    expect(mockMSE.bindMedia).not.toHaveBeenCalled()

    await service.reset()
    expect(mockMSE.unbindMedia).toHaveBeenCalledTimes(1)
    expect(mockMSE.bindMedia).toHaveBeenCalledWith(media)
  })

  test('resets demux, remux, worker and source state on URL changes', async () => {
    const { service } = createService({ enableWorker: true })
    service.setSegmentList([], [], false)
    service._sourceCreated = true

    await service.reset()

    expect(mockWorker.reset).toHaveBeenCalled()
    expect(service._demuxer).toBeNull()
    expect(service._remuxer).toBeNull()
    expect(service._sourceCreated).toBe(false)
  })

  test('creates separate audio/video sources once and appends all outputs', async () => {
    const { service } = createService()
    const frames = [{ index: 0 }, { index: 2 }]
    service.setSegmentList([{ frames }], [{ frames }], false)

    await service.appendBuffer(new Uint8Array([1, 2]), 10, frames, frames, {})
    await service.appendBuffer(new Uint8Array([3, 4]), 20, frames, frames, {})

    expect(mockDemuxer.demux).toHaveBeenNthCalledWith(
      1,
      new Uint8Array([1, 2]),
      10,
      [0, 2],
      [0, 2],
      {}
    )
    expect(mockMSE.createSource).toHaveBeenCalledTimes(2)
    expect(mockMSE.createSource).toHaveBeenCalledWith(
      'video',
      'video/mp4;codecs=avc1.64001f'
    )
    expect(mockMSE.createSource).toHaveBeenCalledWith(
      'audio',
      'audio/mp4;codecs=mp4a.40.2'
    )
    expect(mockMSE.append).toHaveBeenCalledTimes(8)
    expect(mockRemuxer.remux).toHaveBeenNthCalledWith(1, true)
    expect(mockRemuxer.remux).toHaveBeenNthCalledWith(2, false)
  })

  test('uses the custom media buffer API in soft-decode mode', async () => {
    const appendBuffer = jest.fn()
    const endOfStream = jest.fn()
    const media = document.createElement('video')
    Object.assign(media, { appendBuffer, endOfStream })
    const config = getConfig({ media, softDecode: true })
    const service = new BufferService({ media } as never, config)
    service.setSegmentList([{ frames: [{ index: 0 }] }], [], false)

    await service.appendBuffer(
      new Uint8Array([1]),
      0,
      [{ index: 0 }],
      undefined,
      {}
    )
    await service.endOfStream()

    expect(MSE).not.toHaveBeenCalled()
    expect(appendBuffer).toHaveBeenCalledWith(mockVideoTrack, mockAudioTrack)
    expect(endOfStream).toHaveBeenCalled()
  })

  test('demuxes fragmented MP4 segments without sample index ranges', async () => {
    const { service } = createService()
    const moov = { type: 'moov' }
    const data = new Uint8Array([1, 2, 3])
    service.setSegmentList([{ frames: [] }], [{ frames: [] }], true)

    await service.appendBuffer(data, 100, undefined, undefined, moov)

    expect(mockFragmentDemuxer.demuxPart).toHaveBeenCalledWith(data, 100, moov)
    expect(mockDemuxer.demux).not.toHaveBeenCalled()
    expect(mockMSE.createSource).toHaveBeenCalledTimes(2)
    expect(mockMSE.append).toHaveBeenCalledTimes(4)
  })

  test('does not append stale worker data on reset cancellation', async () => {
    mockWorker.transmux.mockRejectedValue(
      new WorkerTaskCancelledError('worker reset')
    )
    const { service } = createService({ enableWorker: true })
    service.setSegmentList([{ frames: [{ index: 0 }] }], [], false)

    await service.appendBuffer(
      new Uint8Array([1]),
      0,
      [{ index: 0 }],
      undefined,
      {}
    )

    expect(mockWorker.destroy).not.toHaveBeenCalled()
    expect(mockDemuxer.demux).not.toHaveBeenCalled()
    expect(mockMSE.append).not.toHaveBeenCalled()
  })

  test('falls back to the main thread after a real worker failure', async () => {
    mockWorker.transmux.mockRejectedValue(new Error('worker crashed'))
    const { service } = createService({ enableWorker: true })
    service.setSegmentList([{ frames: [{ index: 0 }] }], [], false)

    await service.appendBuffer(
      new Uint8Array([1]),
      0,
      [{ index: 0 }],
      undefined,
      {}
    )

    expect(mockWorker.destroy).toHaveBeenCalled()
    expect(mockDemuxer.demux).toHaveBeenCalled()
    expect(mockMSE.append).toHaveBeenCalled()
  })

  test('routes fragmented MP4 through the worker and evicts its sources', async () => {
    mockWorker.transmux.mockResolvedValue({
      video: {
        type: 'video',
        codec: 'avc1.64001f',
        initSegment: new Uint8Array([1]),
        segment: new Uint8Array([2])
      },
      audio: {
        type: 'audio',
        codec: 'mp4a.40.2',
        initSegment: new Uint8Array([3]),
        segment: new Uint8Array([4])
      }
    })
    ;(Buffer.get as jest.Mock).mockReturnValue({ length: 1 })
    ;(Buffer.start as jest.Mock).mockReturnValue(0)
    mockVideoTrack.exist.mockReturnValue(false)
    mockAudioTrack.exist.mockReturnValue(false)
    const { service } = createService({ enableWorker: true })
    const data = new Uint8Array([1, 2, 3])
    service.setSegmentList([{ frames: [] }], [{ frames: [] }], true)

    await service.appendBuffer(data, 100, undefined, undefined, {})
    await service.evictBuffer(10)

    expect(mockWorker.configure).toHaveBeenCalledWith(
      [{ frames: [] }],
      [{ frames: [] }],
      false,
      true
    )
    expect(mockWorker.transmux).toHaveBeenCalledWith(
      data,
      100,
      undefined,
      undefined,
      {}
    )
    expect(mockMSE.remove).toHaveBeenCalledWith('video', 0, 10, undefined)
    expect(mockMSE.remove).toHaveBeenCalledWith('audio', 0, 10, undefined)
  })

  test('evicts old audio and video buffers and destroys without rebinding', async () => {
    ;(Buffer.get as jest.Mock).mockReturnValue({ length: 1 })
    ;(Buffer.start as jest.Mock).mockReturnValue(0)
    const { service } = createService()
    const frames = [{ index: 0 }]
    service.setSegmentList([{ frames }], [{ frames }], false)
    await service.appendBuffer(
      new Uint8Array([1]),
      0,
      frames,
      frames,
      {}
    )
    mockMSE.remove.mockClear()

    await service.evictBuffer(10)
    expect(mockMSE.remove).toHaveBeenCalledWith('video', 0, 10, undefined)
    expect(mockMSE.remove).toHaveBeenCalledWith('audio', 0, 10, undefined)

    await service.destroy()
    expect(mockMSE.unbindMedia).toHaveBeenCalledTimes(1)
    expect(mockMSE.bindMedia).not.toHaveBeenCalled()
  })
})
