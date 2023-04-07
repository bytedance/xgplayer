jest.mock('xgplayer-transmuxer')
jest.mock('xgplayer-streaming-shared')

import { FlvDemuxer, FMP4Remuxer } from 'xgplayer-transmuxer'
import { MSE, Buffer } from 'xgplayer-streaming-shared'
import { BufferService } from '../../src/flv/services'

describe('BufferService', () => {
  const data = new Uint8Array([1, 2, 3])

  const { EVENT } = jest.requireActual('xgplayer-streaming-shared')
  const { VideoTrack, AudioTrack, MetadataTrack, WarningType } = jest.requireActual('xgplayer-transmuxer')
  const videoTrack = new VideoTrack()
  const audioTrack = new AudioTrack()
  const metadataTrack = new MetadataTrack()
  videoTrack.samples = [
    { keyframe: true, pts: 1 },
    { keyframe: false, pts: 2 },
    { keyframe: true, pts: 3 },
  ]
  metadataTrack.seiSamples = [
    { data: {} }
  ]
  metadataTrack.flvScriptSamples = [{}]
  videoTrack.warnings = [
    { type: WarningType.LARGE_AV_SHIFT },
    { type: WarningType.LARGE_VIDEO_GAP },
    { type: WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK },
  ]
  audioTrack.warnings = [
    { type: WarningType.LARGE_AUDIO_GAP },
    { type: WarningType.AUDIO_FILLED },
    { type: WarningType.AUDIO_DROPPED },
  ]
  videoTrack.codec = 'video-codec'
  audioTrack.codec = 'audio-codec'
  videoTrack.exist = jest.fn().mockReturnValue(true)
  audioTrack.exist = jest.fn().mockReturnValue(true)

  Buffer.start.mockReturnValue(0)

  const media = { currentTime: 20 }
  const flv = jest.fn().mockImplementation(() => {
    return {
      media: media,
      emit: jest.fn()
    }
  })()

  const demuxAndFix = jest.fn()
  FlvDemuxer.mockImplementation(() => {
    return {
      videoTrack,
      audioTrack,
      metadataTrack,
      demuxAndFix
    }
  })

  const videoInitSegment = 1
  const audioInitSegment = 2
  const audioSegment = 11
  const videoSegment = 22
  const remux = jest.fn().mockImplementation((init) => {
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
      updateDuration
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('appendBuffer', async () => {
    const bs = new BufferService(flv)

    await bs.appendBuffer(data)
    expect(open).toHaveBeenCalled()
    expect(demuxAndFix).toHaveBeenCalledTimes(1)
    expect(demuxAndFix).toHaveBeenLastCalledWith(data, true, false, 0)
    expect(createSource).toHaveBeenCalledTimes(2)
    expect(createSource).toHaveBeenNthCalledWith(1, videoTrack.type, `video/mp4;codecs=${videoTrack.codec}`)
    expect(createSource).toHaveBeenNthCalledWith(2, audioTrack.type, `audio/mp4;codecs=${audioTrack.codec}`)
    expect(remux).toHaveBeenCalledTimes(1)
    expect(remux).toHaveBeenLastCalledWith(true)
    expect(append).toHaveBeenCalledTimes(4)
    expect(append).toHaveBeenNthCalledWith(1, videoTrack.type, videoInitSegment)
    expect(append).toHaveBeenNthCalledWith(2, audioTrack.type, audioInitSegment)
    expect(append).toHaveBeenNthCalledWith(3, videoTrack.type, videoSegment)
    expect(append).toHaveBeenNthCalledWith(4, audioTrack.type, audioSegment)

    expect(flv.emit).toHaveBeenCalledTimes(14)
    
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.LARGE_AV_FIRST_FRAME_GAP_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.LARGE_VIDEO_DTS_GAP_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.LARGE_AUDIO_DTS_GAP_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.AUDIO_GAP_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.STREAM_EXCEPTION, { type: EVENT.AUDIO_OVERLAP_DETECT })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.KEYFRAME, { pts: 1 })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.KEYFRAME, { pts: 3 })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.SEI, { data: {}, sei: { code: undefined, content: undefined, dts: undefined } })
    expect(flv.emit).toHaveBeenCalledWith(EVENT.FLV_SCRIPT_DATA, {})

    await bs.appendBuffer(data)
    expect(open).toHaveBeenCalledTimes(1)
    expect(demuxAndFix).toHaveBeenLastCalledWith(data, false, true, 0)
    expect(remux).toHaveBeenLastCalledWith(false)
    expect(append).toHaveBeenNthCalledWith(5, videoTrack.type, videoSegment)
    expect(append).toHaveBeenNthCalledWith(6, audioTrack.type, audioSegment)
    expect(flv.emit.mock.calls.filter(x => x[0] === EVENT.METADATA_PARSED).length).toBe(2)
  })

  test('evictBuffer', async () => {
    const bs = new BufferService(flv)

    await bs.evictBuffer(20)
    expect(remove).not.toHaveBeenCalled()
    await bs.evictBuffer(19.9)
    expect(remove).not.toHaveBeenCalled()
  })

  test('seamlessSwitch', async () => {
    const bs = new BufferService(flv)

    await bs.appendBuffer(data)

    bs.seamlessSwitch()
    await bs.appendBuffer(data)
    expect(demuxAndFix).toHaveBeenNthCalledWith(1, data, true, false, 0)
    expect(demuxAndFix).toHaveBeenNthCalledWith(2, data, true, true, 0)
    expect(remux).toHaveBeenCalledTimes(2)
    expect(remux).toHaveBeenNthCalledWith(1, true)
    expect(remux).toHaveBeenNthCalledWith(2, true)
  })

  test('unContiguous', async () => {
    const bs = new BufferService(flv)

    await bs.appendBuffer(data)

    bs.unContiguous(100)
    await bs.appendBuffer(data)

    expect(demuxAndFix).toHaveBeenNthCalledWith(1, data, true, false, 0)
    expect(demuxAndFix).toHaveBeenNthCalledWith(2, data, false, false, 100)
    expect(remux).toHaveBeenCalledTimes(2)
    expect(remux).toHaveBeenNthCalledWith(1, true)
    expect(remux).toHaveBeenNthCalledWith(2, false)
  })

  test('updateDuration', async () => {
    const bs = new BufferService(flv)

    await bs.updateDuration(11)
    expect(updateDuration).toHaveBeenCalledWith(11)
  })

  test('endOfStream', async () => {
    const bs = new BufferService(flv)

    await bs.endOfStream()
    expect(endOfStream).not.toHaveBeenCalled()
    await bs.appendBuffer(data)
    await bs.endOfStream()
    expect(endOfStream).toHaveBeenCalled()
  })

  test('reset', async () => {
    const bs = new BufferService(flv)

    await bs.reset()
    expect(unbindMedia).toHaveBeenCalled()
    expect(bindMedia).toHaveBeenCalledWith(media)
  })

  test('destroy', async () => {
    const bs = new BufferService(flv)

    await bs.destroy()
    expect(unbindMedia).toHaveBeenCalled()
    await bs.destroy()
    expect(unbindMedia).toHaveBeenCalledTimes(1)
  })

})
