interface MockTrack {
  type: string
  codec: string
  exist: jest.Mock<boolean, []>
}

interface MockDemuxer {
  videoTrack: MockTrack
  audioTrack: MockTrack
  demux: jest.Mock
}

interface MockFragmentDemuxer {
  videoTrack: MockTrack
  audioTrack: MockTrack
  demuxPart: jest.Mock
}

interface MockRemuxer {
  remux: jest.Mock
}

var mockDemuxer: MockDemuxer
var mockFragmentDemuxer: MockFragmentDemuxer
var mockRemuxer: MockRemuxer

jest.mock('xgplayer-transmuxer', () => {
  const videoTrack = {
    type: 'video',
    codec: 'avc1.64001f',
    exist: jest.fn().mockReturnValue(true)
  }
  const audioTrack = {
    type: 'audio',
    codec: 'mp4a.40.2',
    exist: jest.fn().mockReturnValue(true)
  }
  mockDemuxer = {
    videoTrack,
    audioTrack,
    demux: jest.fn()
  }
  mockFragmentDemuxer = {
    videoTrack,
    audioTrack,
    demuxPart: jest.fn()
  }
  mockRemuxer = {
    remux: jest.fn()
  }
  return {
    MP4Demuxer: jest.fn(() => mockDemuxer),
    FMP4Demuxer: jest.fn(() => mockFragmentDemuxer),
    FMP4Remuxer: jest.fn(() => mockRemuxer)
  }
})

import { FMP4Demuxer, MP4Demuxer } from 'xgplayer-transmuxer'
import type { WorkerRequest, WorkerResponse } from '../src/types'
import '../src/worker/transmuxerworker'

function send(message: WorkerRequest) {
  const handler = self.onmessage as (event: MessageEvent<WorkerRequest>) => void
  handler(new MessageEvent('message', { data: message }))
}

describe('transmuxer worker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFragmentDemuxer.demuxPart.mockReturnValue({
      videoTrack: mockFragmentDemuxer.videoTrack,
      audioTrack: mockFragmentDemuxer.audioTrack
    })
    mockRemuxer.remux.mockReturnValue({
      videoInitSegment: new Uint8Array([1]),
      audioInitSegment: new Uint8Array([2]),
      videoSegment: new Uint8Array([3]),
      audioSegment: new Uint8Array([4])
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('uses FMP4Demuxer for fragmented MP4 tasks without sample ranges', () => {
    const postMessage = jest
      .spyOn(self, 'postMessage')
      .mockImplementation(() => undefined)
    const moov = { type: 'moov' }
    const buffer = new Uint8Array([1, 2, 3]).buffer

    send({
      method: 'configure',
      videoSegments: [{ frames: [] }],
      audioSegments: [{ frames: [] }],
      memoryOpt: false,
      isFragmentMP4: true
    })
    send({
      method: 'transmux',
      id: 1,
      buffer,
      args: {
        dataStart: 100,
        moov
      }
    })

    expect(FMP4Demuxer).toHaveBeenCalledWith(undefined, undefined, undefined)
    expect(MP4Demuxer).not.toHaveBeenCalled()
    expect(mockFragmentDemuxer.demuxPart).toHaveBeenCalledWith(
      new Uint8Array(buffer),
      100,
      moov
    )
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining<WorkerResponse>({
        method: 'transmux',
        id: 1,
        result: expect.objectContaining({
          video: expect.objectContaining({ type: 'video' }),
          audio: expect.objectContaining({ type: 'audio' })
        })
      }),
      expect.any(Array)
    )
  })
})
