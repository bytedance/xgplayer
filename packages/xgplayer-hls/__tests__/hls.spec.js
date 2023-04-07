jest.mock('xgplayer-streaming-shared')
jest.mock('xgplayer-transmuxer')
jest.mock('../src/hls/buffer-service')
jest.mock('../src/hls/playlist')

import { Hls } from '../src/hls'
import { BufferService } from '../src/hls/buffer-service'
import { Playlist } from '../src/hls/playlist' 
import { Logger as TransmuxerLogger } from 'xgplayer-transmuxer'
import { NetLoader, BandwidthService, getVideoPlaybackQuality, Buffer, MSE, Logger } from 'xgplayer-streaming-shared'

describe('Hls', () => {
  const { EVENT } = jest.requireActual('xgplayer-streaming-shared')

  Buffer.info = () => ({ start: 1, buffers: [] })

  getVideoPlaybackQuality.mockImplementation(() => {
    return {
      droppedVideoFrames: 1,
      totalVideoFrames: 1,
      creationTime: 1
    }
  })

  MSE.mockImplementation(() => {
    return {
      isSupported: () => true
    }
  })

  const loggerEnable = jest.fn()
  const loggerDisable = jest.fn()
  Logger.enable = loggerEnable
  Logger.disable = loggerDisable

  const tLoggerEnable = jest.fn()
  const tLoggerDisable = jest.fn()
  TransmuxerLogger.enable = tLoggerEnable
  TransmuxerLogger.disable = tLoggerDisable

  const bufferServiceReset = jest.fn()
  const endOfStream = jest.fn()
  const bufferDestroy = jest.fn()
  const seamlessSwitch = jest.fn()
  const clearAllBuffer = jest.fn()
  BufferService.mockImplementation(() => {
    return {
      reset: bufferServiceReset,
      endOfStream,
      seamlessSwitch,
      destroy: bufferDestroy,
      clearAllBuffer
    }
  })

  const bandwidthServiceReset = jest.fn()
  const appendBuffer = jest.fn()
  BandwidthService.mockImplementation(() => {
    return {
      reset: bandwidthServiceReset,
      appendBuffer,
      addChunkRecord: jest.fn(),
      getLatestSpeed () { return 1 },
      getAvgSpeed () { return 1 },
    }
  })

  let loaderOnProgress = () => {}
  const loaderLoad = jest.fn().mockImplementation(() => {
    loaderOnProgress(undefined, true)
  })
  const loaderCancel = jest.fn()
  NetLoader.mockImplementation(({ onProgress }) => {
    loaderOnProgress = onProgress || loaderOnProgress
    return {
      load: loaderLoad,
      cancel: loaderCancel
    }
  })

  const currentStream = {}
  const streams = []
  const currentSegment = { isLast: true }
  const moveSegmentPointer = jest.fn()
  const findSegmentIndexByTime = jest.fn()
  const getAudioSegmentBySegment = jest.fn()
  const setNextSegmentByIndex = jest.fn()
  const reset = jest.fn()
  Playlist.mockImplementation(() => {
    return {
      currentStream,
      currentSegment,
      streams,
      moveSegmentPointer,
      findSegmentIndexByTime,
      reset,
      getAudioSegmentBySegment,
      setNextSegmentByIndex
    }
  })

  const media = document.createElement('video')

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('public properties', () => {
    const hls = new Hls({ media })
    expect(hls.media).toBe(media)
    expect(hls.version).toBe('test')
  })

  test('info methods', () => {
    const hls = new Hls({ media })
    expect(hls.speedInfo()).toEqual({ speed: 1, avgSpeed: 1 })
    expect(hls.bufferInfo()).toEqual({ start: 1, buffers: [] })
    expect(hls.playbackQuality()).toEqual({
      droppedVideoFrames: 1,
      totalVideoFrames: 1,
      creationTime: 1
    })
  })

  test('isSupported', () => {
    expect(Hls.isSupported()).toBe(undefined)
  })

  test('enableLogger', () => {
    Hls.enableLogger()
    expect(loggerEnable).toHaveBeenCalled()
    expect(tLoggerEnable).toHaveBeenCalled()
  })

  test('disableLogger', () => {
    Hls.disableLogger()
    expect(loggerDisable).toHaveBeenCalled()
    expect(tLoggerDisable).toHaveBeenCalled()
  })

  test('load', async () => {
    const hls = new Hls({ media })
    const emit = jest.spyOn(hls, 'emit')
    jest.useFakeTimers()
    currentSegment.url = 'url'
    currentSegment.byteRange = [0, 1]
    await hls.load('url')
    expect(bufferServiceReset).toHaveBeenCalled()
    expect(bandwidthServiceReset).toHaveBeenCalled()
    expect(loaderCancel).toHaveBeenCalled()
    expect(loaderLoad).toHaveBeenLastCalledWith('url')
  })

  test('replay', async () => {
    const hls = new Hls({ media, url: 'url' })
    const load = jest.spyOn(hls, 'load')
    load.mockImplementation(() => () => {})
    media.play = jest.fn()
    await hls.replay()
    expect(load).toHaveBeenCalled()
    expect(media.play).toHaveBeenCalled()
  })

  test('switchURL', async () => {
    const hls = new Hls({ media, isLive: true })
    const load = jest.spyOn(hls, 'load')
    load.mockImplementation(() => () => {})
    media.play = jest.fn()
    await hls.switchURL('url')
    expect(load).toHaveBeenCalled()
    expect(media.play).toHaveBeenCalled()
  })

  test('destroy', async () => {
    const hls = new Hls({ media, url: 'url' })
    const removeAllListeners = jest.spyOn(hls, 'removeAllListeners')
    await hls.destroy()
    expect(bufferDestroy).toHaveBeenCalled()
    expect(removeAllListeners).toHaveBeenCalled()
  })

  test('switchStream', async () => {
    const hls = new Hls({ media })

    currentStream.id = 0
    currentStream.segments = []
    streams[0] = currentStream
    streams[1] = { id: 1, segments: [{}] }
    currentSegment.url = 'url'
    await hls.switchStream(1)

    expect(loaderCancel).toHaveBeenCalled()
    expect(clearAllBuffer).toHaveBeenCalled()
    expect(hls.currentStream).toBe(streams[1])
  }) 

})
