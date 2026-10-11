import EventEmitter from 'eventemitter3'
import * as Events from '../src/events'
import Mp4Plugin from '../../xgplayer-mp4/src/mp4Plugin'

// Keep BasePlugin's event and destroy lifecycle without loading the UI preset.
jest.mock('xgplayer', () => {
  const { default: BasePlugin, ...exports } = jest.requireActual('../src/plugin/basePlugin')
  return { BasePlugin, ...exports }
})

// Waiting recovery does not need a network loader, demuxer or MediaSource.
jest.mock('../../xgplayer-mp4/src/mp4', () => ({
  __esModule: true,
  default: jest.fn(),
  MP4_EVENTS: {}
}))
jest.mock('xgplayer-streaming-shared', () => ({
  ...jest.requireActual('../../xgplayer-streaming-shared/src/error'),
  MSE: jest.fn()
}))

describe('MP4 buffered waiting recovery', () => {
  let player
  let plugin
  let timeout

  beforeEach(() => {
    jest.useFakeTimers()
    player = Object.assign(new EventEmitter(), {
      config: {},
      currentTime: 10,
      paused: false,
      seeking: false,
      bufferedPoint: { start: 0, end: 60 },
      buffered2: { bufferedList: [{ start: 0, end: 60 }] },
      video: { src: '' },
      removeHooks: jest.fn(),
      unRegisterPlugin: jest.fn()
    })
    plugin = new Mp4Plugin({ player, config: { ...Mp4Plugin.defaultConfig } })
    plugin.attachEvents()
    timeout = plugin.config.waitingInBufferTimeOut
  })

  afterEach(() => {
    if (plugin.player) plugin.__destroy()
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  test('does not seek after playback resumes or consume a recovery attempt', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    player.currentTime = 11
    player.emit(Events.PLAYING)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(11)
    expect(plugin._waitAdjustTimeCnt).toBe(0)

    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)
    expect(player.currentTime).toBe(11.5)
    expect(plugin._waitAdjustTimeCnt).toBe(1)
  })

  test('does not seek when paused before the recovery timeout', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    player.paused = true
    player.emit(Events.PAUSE)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })

  test('does not schedule recovery for a waiting event while paused', () => {
    player.paused = true
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })

  test('does not apply a previous waiting timeout after a new seek', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    player.currentTime = 30
    player.seeking = true
    player.emit(Events.SEEKING)
    player.seeking = false
    player.emit(Events.SEEKED)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(30)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })

  test('discards pending recovery on detach and handles events after reattaching', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    plugin.detachEvents()
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)

    plugin.attachEvents()
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    player.emit(Events.PLAYING)
    jest.advanceTimersByTime(timeout)
    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)

    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)
    expect(player.currentTime).toBe(10.5)
    expect(plugin._waitAdjustTimeCnt).toBe(1)
  })

  test('discards seek waiting when playback progresses after playing arrives before waiting', () => {
    player.currentTime = 30
    player.seeking = true
    player.emit(Events.SEEKING)
    player.emit(Events.PLAYING)
    player.emit(Events.WAITING)
    player.seeking = false
    player.emit(Events.SEEKED)
    player.currentTime = 31
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(31)
    expect(plugin._waitAdjustTimeCnt).toBe(0)

    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)
    expect(player.currentTime).toBe(31.5)
    expect(plugin._waitAdjustTimeCnt).toBe(1)
  })

  test('still recovers a stall when seeking completes without playback progress', () => {
    player.currentTime = 30
    player.seeking = true
    player.emit(Events.SEEKING)
    player.emit(Events.WAITING)
    player.seeking = false
    player.emit(Events.SEEKED)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(30.5)
    expect(plugin._waitAdjustTimeCnt).toBe(1)
  })

  test('does not seek if paused state changes before the pause event is delivered', () => {
    player.emit(Events.WAITING)
    player.paused = true
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })

  test('does not apply pending recovery after resetting the MP4 source', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    plugin._reset()
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })

  test('does not seek or accept waiting events after the plugin is destroyed', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1000)
    plugin.__destroy()
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
    expect(plugin.player).toBeNull()
  })

  test('still jumps by half a second for a persistent stall up to the recovery limit', () => {
    const limit = plugin.config.waitJampBufferMaxCnt

    for (let attempt = 1; attempt <= limit + 1; attempt++) {
      player.emit(Events.WAITING)
      jest.advanceTimersByTime(timeout - 1)
      expect(player.currentTime).toBe(10 + Math.min(attempt - 1, limit) * 0.5)
      jest.advanceTimersByTime(1)
      expect(player.currentTime).toBe(10 + Math.min(attempt, limit) * 0.5)
      expect(plugin._waitAdjustTimeCnt).toBe(Math.min(attempt, limit))
    }
  })

  test('restarts the timeout from the most recent waiting event', () => {
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout - 1)
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(1)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)

    jest.advanceTimersByTime(timeout - 1)
    expect(player.currentTime).toBe(10.5)
    expect(plugin._waitAdjustTimeCnt).toBe(1)
  })

  test.each([0, 11.9])('does not jump when the buffer ends at %s', end => {
    player.bufferedPoint = { start: 0, end }
    player.emit(Events.WAITING)
    jest.advanceTimersByTime(timeout)

    expect(player.currentTime).toBe(10)
    expect(plugin._waitAdjustTimeCnt).toBe(0)
  })
})
