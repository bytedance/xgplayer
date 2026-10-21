interface MockMSE {
  abort: jest.Mock
  append: jest.Mock
  bindMedia: jest.Mock
  createSource: jest.Mock
  endOfStream: jest.Mock
  remove: jest.Mock
  setTimeoffset: jest.Mock
  unbindMedia: jest.Mock
  updateDuration: jest.Mock
}

var mockMSE: MockMSE

jest.mock('xgplayer-streaming-shared', () => {
  mockMSE = {
    abort: jest.fn(),
    append: jest.fn(),
    bindMedia: jest.fn(),
    createSource: jest.fn(),
    endOfStream: jest.fn(),
    remove: jest.fn(),
    setTimeoffset: jest.fn(),
    unbindMedia: jest.fn(),
    updateDuration: jest.fn()
  }
  class StreamingError extends Error {
    static create(
      _type: unknown,
      _subType: unknown,
      origin: unknown
    ): StreamingError {
      return origin instanceof StreamingError
        ? origin
        : new StreamingError(
            origin instanceof Error ? origin.message : 'streaming error'
          )
    }
  }
  const MSE = jest.fn(() => mockMSE)
  Object.assign(MSE, {
    isSupported: jest.fn().mockReturnValue(true)
  })
  return {
    Buffer: {
      get: jest.fn(),
      start: jest.fn()
    },
    ERR: {
      MEDIA: 'media',
      SUB_TYPES: {
        MSE_APPEND_BUFFER: 'mse_append_buffer',
        MSE_OTHER: 'mse_other'
      }
    },
    MSE,
    StreamingError
  }
})

import { Buffer, MSE } from 'xgplayer-streaming-shared'
import { BufferService } from '../src/buffer-service'
import { getConfig } from '../src/config'
import type { MP3Segment } from '../src/types'

function createSegment(overrides: Partial<MP3Segment> = {}): MP3Segment {
  return {
    data: new Uint8Array([0xff, 0xf3, 0xa8, 0xc4]),
    range: [45, 476],
    index: 0,
    startTime: 0,
    endTime: 0.036,
    nextOffset: 477,
    ...overrides
  }
}

describe('MP3 BufferService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Object.values(mockMSE).forEach((mock) => mock.mockResolvedValue(undefined))
  })

  test('uses the exact MPEG Audio MIME without a codecs parameter', async () => {
    const media = document.createElement('audio')
    const service = new BufferService(getConfig({ media }))
    await service.reset()
    await service.appendSegment(createSegment(), false)
    expect(mockMSE.updateDuration).not.toHaveBeenCalled()
    await service.updateDuration(10)

    expect(MSE).toHaveBeenCalledWith(undefined, {
      preferMMS: false,
      attachMode: 'auto',
      openLog: false
    })
    expect(mockMSE.createSource).toHaveBeenCalledWith('audio', 'audio/mpeg')
    expect(mockMSE.updateDuration).toHaveBeenCalledWith(10)
    expect(mockMSE.append).toHaveBeenCalledWith(
      'audio',
      expect.any(Uint8Array),
      expect.objectContaining({
        range: [45, 476],
        startTime: 0
      })
    )
  })

  test('aborts the parser and applies timestampOffset for random seeks', async () => {
    const media = document.createElement('audio')
    const service = new BufferService(getConfig({ media }))
    await service.reset()
    await service.appendSegment(createSegment(), false)
    await service.appendSegment(
      createSegment({
        index: 1,
        startTime: 20,
        endTime: 20.036
      }),
      true
    )

    expect(mockMSE.abort).toHaveBeenCalledWith(
      'audio',
      expect.objectContaining({ startTime: 20 })
    )
    expect(mockMSE.setTimeoffset).toHaveBeenCalledWith(
      'audio',
      20,
      expect.objectContaining({ reason: 'mp3-seek' })
    )
  })

  test('evicts old audio data and unbinds without rebinding on destroy', async () => {
    const media = document.createElement('audio')
    Object.defineProperty(media, 'currentTime', {
      configurable: true,
      value: 50
    })
    ;(Buffer.get as jest.Mock).mockReturnValue({ length: 1 })
    ;(Buffer.start as jest.Mock).mockReturnValue(0)
    const service = new BufferService(getConfig({ media }))
    await service.reset()
    await service.appendSegment(createSegment(), false)

    await service.evictBuffer(10)
    expect(mockMSE.remove).toHaveBeenCalledWith(
      'audio',
      0,
      40,
      expect.objectContaining({ reason: 'mp3-buffer-behind' })
    )

    mockMSE.bindMedia.mockClear()
    expect(service.destroy()).toBeUndefined()
    expect(mockMSE.unbindMedia).toHaveBeenCalled()
    expect(mockMSE.bindMedia).not.toHaveBeenCalled()
  })

  test('does not rebind media when destroyed during reset', async () => {
    let resolveUnbind: (() => void) | undefined
    mockMSE.unbindMedia.mockReturnValueOnce(
      new Promise<void>((resolve) => {
        resolveUnbind = resolve
      })
    )
    const service = new BufferService(
      getConfig({ media: document.createElement('audio') })
    )

    const resetPromise = service.reset()
    expect(service.destroy()).toBeUndefined()
    resolveUnbind?.()
    await resetPromise

    expect(mockMSE.bindMedia).not.toHaveBeenCalled()
  })

  test('keeps duration updates separate from ending the stream', async () => {
    const service = new BufferService(getConfig({ media: document.createElement('audio') }))
    await service.reset()
    await service.appendSegment(createSegment(), false)
    mockMSE.updateDuration.mockClear()

    await service.updateDuration(1.008)

    expect(mockMSE.updateDuration).toHaveBeenCalledWith(1.008)
    expect(mockMSE.endOfStream).not.toHaveBeenCalled()
    await service.endOfStream()
    expect(mockMSE.updateDuration).toHaveBeenCalledTimes(1)
    expect(mockMSE.endOfStream).toHaveBeenCalledWith()
    expect(mockMSE.updateDuration.mock.invocationCallOrder[0]).toBeLessThan(
      mockMSE.endOfStream.mock.invocationCallOrder[0]
    )
  })

  test('does not end a detached stream after a pending duration update', async () => {
    const service = new BufferService(getConfig({ media: document.createElement('audio') }))
    await service.reset()
    await service.appendSegment(createSegment(), false)
    let resolveDuration!: () => void
    mockMSE.updateDuration.mockReturnValueOnce(new Promise<void>((resolve) => {
      resolveDuration = resolve
    }))

    const updating = service.updateDuration(1.008)
    service.destroy()
    resolveDuration()
    await updating
    await service.endOfStream()

    expect(mockMSE.endOfStream).not.toHaveBeenCalled()
  })
})
