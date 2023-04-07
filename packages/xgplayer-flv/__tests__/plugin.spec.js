jest.mock('xgplayer')
jest.mock('../src/flv')

import FlvPlugin from '../src'
import { Flv } from '../src/flv'


describe('FlvPlugin', () => {
  const { EVENT } = jest.requireActual('xgplayer-streaming-shared')

  test('static property', () => {
    expect(FlvPlugin.pluginName).toBe('flv')
    expect(FlvPlugin.Flv).toBe(Flv)

    const isSupported = jest.spyOn(Flv, 'isSupported')
    FlvPlugin.isSupported(true)
    expect(isSupported).toHaveBeenLastCalledWith(true, undefined)
  });

  test('instance property', () => {
    const plugin = new FlvPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      }
    }
    plugin.beforePlayerInit()

    expect(plugin.softDecode).toBe(true)
    expect(plugin.flv).toBeTruthy()
    expect(plugin.flv).toBe(plugin.core)
    expect(plugin.version).toBe(plugin.flv.version)
  })

  test('assign method to player', () => {
    const plugin = new FlvPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      }
    }
    plugin.beforePlayerInit()

    expect(plugin.player.switchURL).toBeTruthy()
  })

  test('should transfer event and error', () => {
    const plugin = new FlvPlugin()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      }
    }
    plugin.flv = { on: jest.fn(), destroy: jest.fn() }
    plugin.beforePlayerInit()
    const calls = plugin.flv.on.mock.calls

    expect(calls.find(x=>x[0]===EVENT.ERROR)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.TTFB)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_START)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_RESPONSE_HEADERS)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_COMPLETE)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.LOAD_RETRY)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.KEYFRAME)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.METADATA_PARSED)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SEI)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SEI_IN_TIME)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.FLV_SCRIPT_DATA)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.STREAM_EXCEPTION)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SWITCH_URL_SUCCESS)).toBeTruthy()
    expect(calls.find(x=>x[0]===EVENT.SWITCH_URL_FAILED)).toBeTruthy()
  })

  test('destroy', () => {
    const plugin = new FlvPlugin()
    const flvDestroy = jest.fn()
    plugin.player = {
      config: {
        url: 'mock url',
        mediaType: 'live-video'
      }
    }
    plugin.flv = { destroy: flvDestroy }
    plugin.beforePlayerInit()
    plugin.destroy()
    expect(flvDestroy).toHaveBeenCalled()
  })

})
