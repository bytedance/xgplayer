jest.mock('xgplayer-transmuxer')
jest.mock('xgplayer-streaming-shared')
jest.mock('../../src/hls/buffer-service/transmuxer')

import { TsDemuxer, FMP4Remuxer, MP4Parser } from 'xgplayer-transmuxer'
import { MSE, Buffer } from 'xgplayer-streaming-shared'
import { BufferService } from '../../src/hls/buffer-service'
import { Transmuxer } from '../../src/hls/buffer-service/transmuxer'

describe('BufferService', () => {
  const data = new Uint8Array([1, 2, 3])
  const { EVENT } = jest.requireActual('xgplayer-streaming-shared')
  const {
    MP4Parser: RealMP4Parser,
    VideoTrack,
    AudioTrack,
    MetadataTrack,
    WarningType
  } = jest.requireActual('xgplayer-transmuxer')

  MP4Parser.probe = RealMP4Parser.probe
  MP4Parser.findBox = RealMP4Parser.findBox

  const videoTrack = new VideoTrack()
  const audioTrack = new AudioTrack()
  const metadataTrack = new MetadataTrack()
  videoTrack.samples = [
    { keyframe: true, pts: 1 },
    { keyframe: false, pts: 2 },
    { keyframe: true, pts: 3 }
  ]
  metadataTrack.seiSamples = [{ data: {} }]
  videoTrack.warnings = [
    { type: WarningType.LARGE_AV_SHIFT },
    { type: WarningType.LARGE_VIDEO_GAP },
    { type: WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK }
  ]
  audioTrack.warnings = [
    { type: WarningType.LARGE_AUDIO_GAP },
    { type: WarningType.AUDIO_FILLED },
    { type: WarningType.AUDIO_DROPPED }
  ]
  videoTrack.codec = 'video-codec'
  audioTrack.codec = 'audio-codec'
  videoTrack.exist = jest.fn().mockReturnValue(true)
  audioTrack.exist = jest.fn().mockReturnValue(true)

  Buffer.start.mockReturnValue(0)

  const media = { currentTime: 20 }
  const hls = jest.fn().mockImplementation(() => {
    return {
      media: media,
      emit: jest.fn(),
      config: {}
    }
  })()

  const demuxAndFix = jest.fn()
  TsDemuxer.mockImplementation(() => {
    return {
      videoTrack,
      audioTrack,
      metadataTrack,
      demuxAndFix
    }
  })
  TsDemuxer.probe = jest.fn().mockReturnValue(true)

  const videoInitSegment = 1
  const audioInitSegment = 2
  const audioSegment = 11
  const videoSegment = 22
  const remux = jest.fn().mockImplementation(init => {
    if (init) {
      return { videoInitSegment, audioInitSegment, videoSegment, audioSegment }
    }
    return { videoSegment, audioSegment }
  })
  FMP4Remuxer.mockImplementation(() => {
    return {
      videoTrack,
      audioTrack,
      metadataTrack,
      remux
    }
  })

  const createSource = jest.fn()
  const append = jest.fn()
  const remove = jest.fn()
  const unbindMedia = jest.fn()
  const bindMedia = jest.fn()
  const endOfStream = jest.fn()
  const setLiveSeekableRange = jest.fn()
  const updateDuration = jest.fn()
  const clearAllBuffer = jest.fn()
  const getSourceBuffer = jest.fn()
  const clearBuffer = jest.fn().mockReturnValue(Promise.resolve())
  const open = jest.fn().mockReturnValue(Promise.resolve())
  MSE.mockImplementation(() => {
    return {
      endOfStream,
      createSource,
      setLiveSeekableRange,
      append,
      unbindMedia,
      bindMedia,
      open,
      remove,
      updateDuration,
      clearAllBuffer,
      clearBuffer,
      getSourceBuffer
    }
  })

  const transmux = jest.fn().mockReturnValue([])
  Transmuxer.mockImplementation(() => {
    return {
      transmux
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('constructor', async () => {
    hls.config.url = ''
    new BufferService(hls)
    expect(bindMedia).not.toHaveBeenCalled()

    hls.config.url = 'url'
    new BufferService(hls)
    expect(bindMedia).toHaveBeenCalled()
  })

  test('appendBuffer', async () => {
    const bs = new BufferService(hls)
    bs.createSource(
      new Uint8Array([0, 0, 0, 0]),
      new Uint8Array([0, 0, 0, 0]),
      // AVC Constrained Baseline Level 3
      'avc1.42401e',
      // MPEG-4 AAC-SBR
      'mp4a.40.5'
    )

    let result = await bs.appendBuffer()
    expect(result).toBe(undefined)

    result = await bs.appendBuffer(
      {
        setTrackExist: () => {}
      },
      {
        setTrackExist: () => {}
      },
      new Uint8Array([0, 0, 0, 0]),
      new Uint8Array([0, 0, 0, 0]),
      false,
      true,
      0
    )
    expect(result).toHaveLength(0)
  })

  test('removeBuffer', async () => {
    const bs = new BufferService(hls)

    await bs.removeBuffer(20, 0)
    expect(clearBuffer).not.toHaveBeenCalled()
  })

  test('evictBuffer', async () => {
    const bs = new BufferService(hls)

    await bs.evictBuffer(20)
    expect(remove).not.toHaveBeenCalled()
    await bs.evictBuffer(19.9)
    expect(remove).not.toHaveBeenCalled()
  })

  test('_handleCodecChange', async () => {
    const bs = new BufferService(hls)
    await bs._handleCodecChange(
      {
        // AVC Constrained Baseline Level 3
        codec: 'avc1.42401e'
      },
      {
        // MPEG-4 AAC-SBR
        codec: 'mp4a.40.5'
      }
    )
    expect(getSourceBuffer).toHaveBeenCalled()
  })

  test('endOfStream', async () => {
    const bs = new BufferService(hls)

    await bs.endOfStream()
    expect(endOfStream).not.toHaveBeenCalled()
  })

  test('setLiveSeekableRange', async () => {
    const bs = new BufferService(hls)

    await bs.setLiveSeekableRange(1, 2)
    expect(setLiveSeekableRange).toHaveBeenCalledWith(1, 2)
  })

  test('updateDuration', async () => {
    const bs = new BufferService(hls)

    await bs.updateDuration(11)
    expect(updateDuration).toHaveBeenCalledWith(11)
  })

  test('reset', async () => {
    const bs = new BufferService(hls)

    await bs.reset()
    expect(unbindMedia).toHaveBeenCalled()
    expect(bindMedia).toHaveBeenCalledWith(media)
  })

  test('destroy', async () => {
    const bs = new BufferService(hls)

    await bs.destroy()
    expect(unbindMedia).toHaveBeenCalled()
    await bs.destroy()
    expect(unbindMedia).toHaveBeenCalledTimes(1)
  })

  test('clearAllBuffer', async () => {
    const bs = new BufferService(hls)
    await bs.clearAllBuffer()
    expect(clearAllBuffer).toHaveBeenCalled()
  })

  test('seamlessSwitch', async () => {
    const bs = new BufferService(hls)
    bs.seamlessSwitch()
    expect(bs._needInitSegment).toBe(true)
  })
})
