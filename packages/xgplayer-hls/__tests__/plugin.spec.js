jest.mock('xgplayer')
jest.mock('../src/hls')

import HlsPlugin from '../src'
import { Hls } from '../src/hls'

describe('HlsPlugin', () => {
  const { EVENT } = jest.requireActual('xgplayer-streaming-shared')

  test('static property', () => {
    expect(HlsPlugin.pluginName).toBe('hls')
    expect(HlsPlugin.Hls).toBe(Hls)

    const isSupported = jest.spyOn(Hls, 'isSupported')
    HlsPlugin.isSupported(true)
    expect(isSupported).toHaveBeenLastCalledWith(true, undefined)
  });

  test('instance property', () => {
    const plugin = new HlsPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      },
      useHooks: jest.fn()
    }

    jest.spyOn(Hls.prototype, 'load').mockImplementation(async function(){})

    plugin.beforePlayerInit()

    expect(plugin.softDecode).toBe(true)
    expect(plugin.hls).toBeTruthy()
    expect(plugin.hls).toBe(plugin.core)
    expect(plugin.version).toBe(plugin.hls.version)
  })

  test('assign method to player', () => {
    const plugin = new HlsPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      },
      useHooks: jest.fn()
    }
    plugin.beforePlayerInit()

    expect(plugin.player.switchURL).toBeTruthy()
  })

  test('should transfer event and error', () => {
    const plugin = new HlsPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      },
      useHooks: jest.fn()
    }
    plugin.hls = { on: jest.fn(), destroy: jest.fn() }
    plugin.beforePlayerInit()
    const calls = plugin.hls.on.mock.calls

    expect(calls.find(x=>x[0]===EVENT.ERROR)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.TTFB)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_START)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_RESPONSE_HEADERS)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_COMPLETE)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_RETRY)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.KEYFRAME)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.METADATA_PARSED)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SEI)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SPEED)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.STREAM_EXCEPTION)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SWITCH_URL_SUCCESS)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SWITCH_URL_FAILED)).toBeTruthy()
  })

  test('destroy', () => {
    const plugin = new HlsPlugin()
    const hlsDestroy = jest.fn()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      },
      useHooks: jest.fn()
    }
    plugin.hls = { destroy: hlsDestroy }
    plugin.beforePlayerInit()
    plugin.destroy()
    expect(hlsDestroy).toHaveBeenCalled()
  })

})
