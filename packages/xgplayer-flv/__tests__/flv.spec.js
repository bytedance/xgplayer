jest.mock('xgplayer-streaming-shared')
jest.mock('xgplayer-transmuxer')
jest.mock('../src/flv/services/buffer-service.js')

import { NetLoader, BandwidthService, SeiService, getVideoPlaybackQuality, Buffer, MSE, Logger } from 'xgplayer-streaming-shared'
import { Logger as TransmuxerLogger } from 'xgplayer-transmuxer'
import { Flv } from '../src/flv'
import { BufferService } from '../src/flv/services'

describe('Flv', () => {
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
  BufferService.mockImplementation(() => {
    return {
      reset: bufferServiceReset,
      endOfStream,
      seamlessSwitch,
      destroy: bufferDestroy
    }
  })

  const seiServiceReset = jest.fn()
  SeiService.mockImplementation(() => {
    return {
      reset: seiServiceReset
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

  let loaderOnProgress
  const loaderLoad = jest.fn().mockImplementation(() => {
    loaderOnProgress(new Uint8Array([1,2,3]), true, {}, {})
  })
  const loaderCancel = jest.fn()
  NetLoader.mockImplementation(({ onProgress }) => {
    loaderOnProgress = onProgress
    return {
      load: loaderLoad,
      cancel: loaderCancel
    }
  })

  const media = document.createElement('video')

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('public properties', () => {
    const flv = new Flv({ media, isLive: true })
    expect(flv.media).toBe(media)
    expect(flv.version).toBe('test')
    expect(flv.isLive).toBe(true)
    expect(flv.seekable).toBe(false)
  })

  test('info methods', () => {
    const flv = new Flv({ media })
    expect(flv.speedInfo()).toEqual({ speed: 1, avgSpeed: 1 })
    expect(flv.bufferInfo()).toEqual({ start: 1, buffers: [] })
    expect(flv.playbackQuality()).toEqual({
      droppedVideoFrames: 1,
      totalVideoFrames: 1,
      creationTime: 1
    })
  })

  test('load', async () => {
    const flv = new Flv({ media })
    const emit = jest.spyOn(flv, 'emit')
    await flv.load('url')
    expect(bufferServiceReset).toHaveBeenCalled()
    expect(seiServiceReset).toHaveBeenCalled()
    expect(bandwidthServiceReset).toHaveBeenCalled()
    expect(loaderCancel).toHaveBeenCalled()
    expect(loaderLoad).toHaveBeenLastCalledWith({ url: 'url' })
    expect(emit).toHaveBeenCalledWith(EVENT.LOAD_START, { url: 'url' })
  })

  test('replay', async () => {
    const flv = new Flv({ media, url: 'url' })
    const load = jest.spyOn(flv, 'load')
    media.play = jest.fn(()=> Promise.resolve())
    await flv.replay()
    expect(load).toHaveBeenCalled()
    expect(media.play).toHaveBeenCalled()
    jest.useFakeTimers()
    await flv.replay(true)
    expect(load).toHaveBeenCalledTimes(1)
    expect(loaderCancel).toHaveBeenCalledTimes(3)
    jest.runAllTimers()
    expect(seamlessSwitch).toHaveBeenCalledTimes(1)
  })

  test('disconnect', async () => {
    const flv = new Flv()
    await flv.disconnect()
    expect(loaderCancel).toHaveBeenCalled()
  })

  test('switchURL', async () => {
    const flv = new Flv({ media, isLive: true })
    const load = jest.spyOn(flv, 'load')
    media.play = jest.fn(()=> Promise.resolve())
    await flv.switchURL('url')
    expect(load).toHaveBeenCalled()
    expect(media.play).toHaveBeenCalled()
    jest.useFakeTimers()
    await flv.switchURL('url', true)
    expect(load).toHaveBeenCalledTimes(1)
    expect(loaderCancel).toHaveBeenCalledTimes(3)
    jest.runAllTimers()
    expect(seamlessSwitch).toHaveBeenCalledTimes(1)
  })

  test('isSupported', () => {
    expect(Flv.isSupported()).toBe(undefined)
  })

  test('enableLogger', () => {
    Flv.enableLogger()
    expect(loggerEnable).toHaveBeenCalled()
    expect(tLoggerEnable).toHaveBeenCalled()
  })

  test('disableLogger', () => {
    Flv.disableLogger()
    expect(loggerDisable).toHaveBeenCalled()
    expect(tLoggerDisable).toHaveBeenCalled()
  })

  test('destroy', async () => {
    const flv = new Flv({ media, url: 'url' })
    const removeAllListeners = jest.spyOn(flv, 'removeAllListeners')
    await flv.destroy()
    expect(bufferDestroy).toHaveBeenCalled()
    expect(removeAllListeners).toHaveBeenCalled()
  })

})
