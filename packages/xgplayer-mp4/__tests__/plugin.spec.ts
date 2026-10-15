jest.mock('../src/mp4', () => {
  const cores: Array<{
    config: Record<string, unknown>
    load: jest.Mock
    destroy: jest.Mock
    on: jest.Mock
    _inited: boolean
  }> = []
  const MP4 = jest.fn().mockImplementation((config) => {
    const core = {
      config,
      load: jest
        .fn()
        .mockImplementation((_url: string, startTime = 0) =>
          Promise.resolve(startTime)
        ),
      destroy: jest.fn().mockResolvedValue(undefined),
      on: jest.fn(),
      _inited: false
    }
    cores.push(core)
    return core
  })
  Object.assign(MP4, {
    cores,
    version: 'test',
    isSupported: jest.fn().mockReturnValue(true)
  })
  return { MP4 }
})

jest.mock('xgplayer', () => {
  class BasePlugin {
    static defineGetterOrSetter(target: object, descriptors: PropertyDescriptorMap) {
      Object.defineProperties(target, descriptors)
    }

    player: unknown
    config: Record<string, unknown> = {}
    on = jest.fn()
  }

  class Errors {
    constructor(_player: unknown, info: Record<string, unknown>) {
      Object.assign(this, info)
    }
  }

  return {
    BasePlugin,
    Errors,
    Events: {
      URL_CHANGE: 'url_change',
      DESTROY: 'destroy',
      PLAYNEXT: 'playnext',
      DEFINITION_CHANGE: 'definition_change',
      AFTER_DEFINITION_CHANGE: 'after_definition_change',
      ERROR: 'error'
    }
  }
})

import { Events } from 'xgplayer'
import { EVENT, MSE } from 'xgplayer-streaming-shared'
import { MP4 } from '../src/mp4'
import { MP4Plugin } from '../src/plugin'

type MockCore = {
  config: Record<string, unknown>
  load: jest.Mock
  destroy: jest.Mock
  on: jest.Mock
  _inited: boolean
}

const mockMP4 = MP4 as unknown as jest.Mock & {
  cores: MockCore[]
}

function createPlayer(overrides: Record<string, unknown> = {}) {
  const video = document.createElement('video')
  const nativeSwitchURL = jest.fn()
  const nativePlayNext = jest.fn()
  const nativeChangeDefinition = jest.fn()
  const player = {
    config: {
      url: 'video.mp4',
      mediaType: 'video',
      mp4: {},
      ...((overrides.config as object) || {})
    },
    video,
    media: video,
    handleSource: true,
    switchURL: nativeSwitchURL,
    playNext: nativePlayNext,
    changeDefinition: nativeChangeDefinition,
    resetState: jest.fn(),
    setConfig: jest.fn(),
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    emit: jest.fn(),
    currentTime: 0,
    paused: true,
    ended: false,
    curDefinition: null,
    _currentTime: 0,
    _duration: 0,
    ...overrides,
    nativeSwitchURL,
    nativePlayNext,
    nativeChangeDefinition
  }
  player.setConfig.mockImplementation((config) => {
    Object.assign(player.config, config)
  })
  player.resetState.mockImplementation(() => {
    player._currentTime = 0
    player._duration = 0
  })
  return player
}

function attachPlayer(plugin: MP4Plugin, player: ReturnType<typeof createPlayer>) {
  const target = plugin as unknown as {
    player: typeof player
    config: Record<string, unknown>
  }
  target.player = player
  target.config = player.config.mp4
}

describe('MP4Plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockMP4.cores.length = 0
    jest.spyOn(MSE, 'isSupported').mockReturnValue(true)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('loads the initial URL and installs all compatibility proxies', async () => {
    const player = createPlayer()
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)

    await plugin.beforePlayerInit()

    const core = mockMP4.cores[0]
    expect(core.config).toMatchObject({
      media: player.video,
      url: 'video.mp4',
      softDecode: false
    })
    expect(core.load).toHaveBeenCalledWith('video.mp4')
    expect(player.switchURL).not.toBe(player.nativeSwitchURL)
    expect(player.playNext).not.toBe(player.nativePlayNext)
    expect(player.changeDefinition).not.toBe(player.nativeChangeDefinition)
    expect(player.handleSource).toBe(false)
  })

  test('does not take over when hard decode has no MediaSource support', async () => {
    jest.spyOn(MSE, 'isSupported').mockReturnValue(false)
    const player = createPlayer()
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)

    await plugin.beforePlayerInit()

    expect(mockMP4).not.toHaveBeenCalled()
    expect(player.switchURL).toBe(player.nativeSwitchURL)
    expect(player.handleSource).toBe(true)
  })

  test('routes switchURL and playNext through the current core', async () => {
    const player = createPlayer({
      currentTime: 12,
      paused: false,
      _currentTime: 12,
      _duration: 90
    })
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]

    const switchResult = player.switchURL('switch.mp4')
    await switchResult
    expect(core.load).toHaveBeenNthCalledWith(2, 'switch.mp4', 12)
    expect(player.config.url).toBe('switch.mp4')
    expect(player.currentTime).toBe(12)
    expect(player.play).toHaveBeenCalled()

    const nextConfig = { url: 'next.mp4', autoplay: true }
    const nextResult = player.playNext(nextConfig)
    expect(nextResult).toBe(core.load.mock.results[2].value)
    expect(player.resetState).toHaveBeenCalled()
    expect(player.setConfig).toHaveBeenCalledWith(nextConfig)
    expect(player._currentTime).toBe(0)
    expect(player._duration).toBe(0)
    expect(player.play).toHaveBeenCalled()
    expect(player.emit).toHaveBeenCalledWith(Events.PLAYNEXT, nextConfig)
  })

  test('emits AFTER_DEFINITION_CHANGE only after the new definition loads', async () => {
    let resolveLoad: ((startTime: number) => void) | undefined
    const player = createPlayer({
      currentTime: 24,
      paused: true,
      config: {
        url: 'video.mp4',
        mediaType: 'video',
        mp4: {},
        definition: {
          list: [{ definition: 'hd', url: 'hd.mp4', bitrate: 1200 }]
        }
      }
    })
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]
    core.load.mockImplementationOnce(
      () =>
        new Promise<number>((resolve) => {
          resolveLoad = resolve
        })
    )

    const to = { definition: 'hd', url: 'hd.mp4', bitrate: '1200' }
    const result = player.changeDefinition(to)

    expect(player.emit).toHaveBeenCalledWith(Events.DEFINITION_CHANGE, {
      from: undefined,
      to
    })
    expect(player.emit).not.toHaveBeenCalledWith(
      Events.AFTER_DEFINITION_CHANGE,
      expect.anything()
    )
    resolveLoad?.(24)
    await result
    await Promise.resolve()
    expect(core.load).toHaveBeenLastCalledWith('hd.mp4', 24)
    expect(player.currentTime).toBe(24)
    expect(player.pause).toHaveBeenCalled()
    expect(to.bitrate).toBe(1200)
    expect(player.curDefinition).toEqual({
      definition: 'hd',
      url: 'hd.mp4',
      bitrate: 1200
    })
    expect(player.emit).toHaveBeenCalledWith(Events.AFTER_DEFINITION_CHANGE, {
      from: undefined,
      to
    })
  })

  test('starts from zero when switching after playback ended', async () => {
    const player = createPlayer({
      currentTime: 90,
      paused: true,
      ended: true
    })
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]

    await player.switchURL('replay.mp4')

    expect(core.load).toHaveBeenNthCalledWith(2, 'replay.mp4', 0)
    expect(player.currentTime).toBe(0)
    expect(player.pause).toHaveBeenCalled()
  })

  test('uses the start time returned by the core after an out-of-range fallback', async () => {
    const player = createPlayer({
      currentTime: 120,
      paused: false
    })
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]
    core.load.mockResolvedValueOnce(0)

    await player.switchURL('shorter.mp4')

    expect(core.load).toHaveBeenNthCalledWith(2, 'shorter.mp4', 120)
    expect(player.currentTime).toBe(0)
    expect(player.play).toHaveBeenCalled()
  })

  test('restores native APIs and source handling synchronously on destroy', async () => {
    const player = createPlayer()
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]
    core.destroy.mockReturnValue(new Promise<void>(() => undefined))

    plugin.destroy()

    expect(player.switchURL).toBe(player.nativeSwitchURL)
    expect(player.playNext).toBe(player.nativePlayNext)
    expect(player.changeDefinition).toBe(player.nativeChangeDefinition)
    expect(player.handleSource).toBe(true)
    expect(core.destroy).toHaveBeenCalled()
  })

  test('waits for MSE destruction before assigning the native fallback URL', async () => {
    let resolveDestroy: (() => void) | undefined
    const player = createPlayer()
    player.video.src = 'blob:http://localhost/mse'
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]
    core.destroy.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveDestroy = resolve
        })
    )

    const fatal = plugin as unknown as {
      _onFatalError: (error: Error) => Promise<void>
    }
    const fallback = fatal._onFatalError(new Error('append failed'))
    await Promise.resolve()
    expect(player.video.src).toContain('blob:')
    expect(player.handleSource).toBe(false)

    resolveDestroy?.()
    await fallback
    expect(player.video.src).toContain('/video.mp4')
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(player.nativeSwitchURL)
    expect(player.emit).toHaveBeenCalledWith(
      'playCatch',
      'MP4_1',
      expect.anything()
    )
  })

  test('closeDowngrade reports only one player error without destroying core', async () => {
    const player = createPlayer({
      config: {
        url: 'video.mp4',
        mediaType: 'video',
        mp4: { closeDowngrade: true }
      }
    })
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const core = mockMP4.cores[0]
    const fatal = plugin as unknown as {
      _onFatalError: (error: Error) => Promise<void>
    }

    await fatal._onFatalError(new Error('failed'))
    await fatal._onFatalError(new Error('failed again'))

    expect(core.destroy).not.toHaveBeenCalled()
    expect(player.emit.mock.calls.filter(([event]) => event === Events.ERROR)).toHaveLength(
      1
    )
  })

  test('ignores errors emitted by an obsolete core', async () => {
    const player = createPlayer()
    const plugin = new MP4Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const oldCore = mockMP4.cores[0]
    const errorHandler = oldCore.on.mock.calls.find(
      ([event]) => event === EVENT.ERROR
    )[1]

    await plugin.beforePlayerInit()
    errorHandler(new Error('late old-core error'))
    await Promise.resolve()

    expect(plugin.core).toBe(mockMP4.cores[1])
    expect(plugin.on).toHaveBeenCalledTimes(2)
    expect(player.emit).not.toHaveBeenCalledWith(
      'playCatch',
      expect.anything(),
      expect.anything()
    )
  })
})
