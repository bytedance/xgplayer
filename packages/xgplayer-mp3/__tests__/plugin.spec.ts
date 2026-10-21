jest.mock('../src/mp3', () => {
  const cores: Array<{
    load: jest.Mock
    destroy: jest.Mock
    on: jest.Mock
    isInitialized: boolean
  }> = []
  const MP3 = jest.fn().mockImplementation(() => {
    const core = {
      load: jest
        .fn()
        .mockImplementation((_url: string, startTime = 0) =>
          Promise.resolve(startTime)
        ),
      destroy: jest.fn(),
      on: jest.fn(),
      isInitialized: false
    }
    cores.push(core)
    return core
  })
  Object.assign(MP3, {
    cores,
    disableLogger: jest.fn(),
    enableLogger: jest.fn(),
    version: 'test',
    isSupported: jest.fn().mockReturnValue(true)
  })
  return { MP3 }
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
      URL_CHANGE: 'urlchange',
      DESTROY: 'destroy',
      PLAYNEXT: 'playnext',
      DEFINITION_CHANGE: 'definition_change',
      AFTER_DEFINITION_CHANGE: 'after_definition_change',
      ERROR: 'error'
    }
  }
})

import { Events } from 'xgplayer'
import { MP3 } from '../src/mp3'
import { MP3Plugin } from '../src/plugin'

type MockCore = {
  load: jest.Mock
  destroy: jest.Mock
  on: jest.Mock
  isInitialized: boolean
}

const mockMP3 = MP3 as unknown as jest.Mock & {
  cores: MockCore[]
  disableLogger: jest.Mock
  enableLogger: jest.Mock
  isSupported: jest.Mock
}

function createPlayer(overrides: Record<string, unknown> = {}) {
  const audio = document.createElement('audio')
  const player = {
    config: {
      url: 'audio.mp3',
      mediaType: 'audio',
      mp3: {},
      ...((overrides.config as object) || {})
    },
    media: audio,
    handleSource: true,
    preProcessUrl: jest.fn((url: string) => ({ url })),
    switchURL: jest.fn(),
    playNext: jest.fn(),
    changeDefinition: jest.fn(),
    resetState: jest.fn(),
    setConfig: jest.fn(),
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    emit: jest.fn(),
    currentTime: 0,
    paused: true,
    ended: false,
    curDefinition: null,
    ...overrides
  }
  return player
}

function attachPlayer(plugin: MP3Plugin, player: ReturnType<typeof createPlayer>) {
  const target = plugin as unknown as {
    player: typeof player
    config: Record<string, unknown>
  }
  target.player = player
  target.config = player.config.mp3
}

function emitCoreError(core: MockCore, error: Error) {
  const errorListener = core.on.mock.calls.find(
    ([event]) => event === 'error'
  )?.[1] as ((error: Error) => void) | undefined

  expect(errorListener).toEqual(expect.any(Function))
  errorListener?.(error)
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: Error) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

async function flushPromises(): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve()
}

describe('MP3Plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockMP3.cores.length = 0
    mockMP3.isSupported.mockReturnValue(true)
  })

  test('forwards logger controls to the MP3 core', () => {
    MP3Plugin.enableLogger()
    MP3Plugin.disableLogger()

    expect(mockMP3.enableLogger).toHaveBeenCalledTimes(1)
    expect(mockMP3.disableLogger).toHaveBeenCalledTimes(1)
  })

  test('takes over a string URL synchronously and starts the MP3 core', () => {
    const player = createPlayer()
    const nativeSwitchURL = player.switchURL
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)

    expect(plugin.beforePlayerInit()).toBeUndefined()

    expect(mockMP3).toHaveBeenCalledWith(
      expect.objectContaining({
        media: player.media,
        url: 'audio.mp3'
      })
    )
    expect(mockMP3.cores[0].load).toHaveBeenCalledWith('audio.mp3')
    expect(player.handleSource).toBe(false)
    expect(player.switchURL).not.toBe(nativeSwitchURL)
  })

  test('leaves source handling to the player when audio/mpeg MSE is unsupported', async () => {
    mockMP3.isSupported.mockReturnValue(false)
    const player = createPlayer()
    const nativeSwitchURL = player.switchURL
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)

    plugin.beforePlayerInit()

    expect(mockMP3).not.toHaveBeenCalled()
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(nativeSwitchURL)
  })

  test('routes switchURL through the MP3 core and preserves time', async () => {
    const player = createPlayer({ currentTime: 12, paused: false })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    await player.switchURL('next.mp3')

    expect(mockMP3.cores[0].load).toHaveBeenLastCalledWith('next.mp3', 12)
    expect(player.config.url).toBe('next.mp3')
    expect(player.play).toHaveBeenCalled()
  })

  test('delegates playNext to the native player lifecycle', () => {
    const player = createPlayer()
    const nativePlayNext = player.playNext
    nativePlayNext.mockReturnValue('native-result')
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    const result = player.playNext({ url: 'next.mp3' })

    expect(result).toBe('native-result')
    expect(nativePlayNext).toHaveBeenCalledWith({ url: 'next.mp3' })
    expect(player.resetState).not.toHaveBeenCalled()
    expect(player.setConfig).not.toHaveBeenCalled()
    expect(mockMP3.cores[0].load).not.toHaveBeenCalledWith('next.mp3')
  })

  test('restores native player APIs synchronously on destroy', () => {
    const player = createPlayer()
    const nativeSwitchURL = player.switchURL
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    expect(plugin.destroy()).toBeUndefined()
    expect(mockMP3.cores[0].destroy).toHaveBeenCalledTimes(1)
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(nativeSwitchURL)
  })

  test('destroys the core and restores native fallback synchronously', () => {
    const player = createPlayer()
    player.media.src = 'blob:http://localhost/mp3'
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    expect(emitCoreError(mockMP3.cores[0], new Error('invalid MP3'))).toBeUndefined()
    expect(mockMP3.cores[0].destroy).toHaveBeenCalledTimes(1)
    expect(player.handleSource).toBe(true)
    expect(player.media.src).toContain('/audio.mp3')
    expect(player.emit).toHaveBeenCalledWith(
      'playCatch',
      'MP3_1',
      expect.anything()
    )
  })

  test('closeDowngrade emits one terminal player error', () => {
    const player = createPlayer({
      config: {
        url: 'audio.mp3',
        mediaType: 'audio',
        mp3: { closeDowngrade: true }
      }
    })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    emitCoreError(mockMP3.cores[0], new Error('failed'))
    emitCoreError(mockMP3.cores[0], new Error('failed again'))

    expect(mockMP3.cores[0].destroy).not.toHaveBeenCalled()
    expect(
      player.emit.mock.calls.filter(([event]) => event === Events.ERROR)
    ).toHaveLength(1)
  })

  test('preprocesses initial and replacement URLs before loading them', async () => {
    const player = createPlayer({ currentTime: 12 })
    player.preProcessUrl.mockImplementation((url: string) => ({ url: `${url}?signed=1` }))
    const nativePlayNext = player.playNext
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()

    expect(mockMP3.cores[0].load).toHaveBeenCalledWith('audio.mp3?signed=1')
    await player.switchURL('next.mp3')
    expect(mockMP3.cores[0].load).toHaveBeenLastCalledWith('next.mp3?signed=1', 12)
    await player.changeDefinition({ url: 'high.mp3', definition: 'high' }, {})
    expect(mockMP3.cores[0].load).toHaveBeenLastCalledWith('high.mp3?signed=1', 12)
    expect(player.config.url).toBe('high.mp3')

    nativePlayNext.mockImplementation((config: { url: string }) => {
      player.config.url = config.url
      plugin.beforePlayerInit()
    })
    player.playNext({ url: 'track.mp3' })
    expect(mockMP3.cores[1].load).toHaveBeenCalledWith('track.mp3?signed=1')
    expect(player.preProcessUrl.mock.calls.map(([url]) => url)).toEqual([
      'audio.mp3', 'next.mp3', 'high.mp3', 'track.mp3'
    ])
  })

  test.each(['destroy', 'fallback'])(
    'preserves the real Player.url setter and descriptor through %s',
    (action) => {
      const player = createPlayer()
      const Player = jest.requireActual('xgplayer').SimplePlayer
      const descriptor = Object.getOwnPropertyDescriptor(Player.prototype, 'url')
      if (!descriptor) throw new Error('Player.url descriptor not found')
      Object.defineProperty(player, 'url', descriptor)
      Object.defineProperty(player, '__url', {
        value: 'original.mp3', writable: true, configurable: true, enumerable: true
      })
      const original = Object.getOwnPropertyDescriptor(player, '__url')
      const plugin = new MP3Plugin({} as never)
      attachPlayer(plugin, player)
      plugin.beforePlayerInit()
      expect(Object.getOwnPropertyDescriptor(player, '__url')).toEqual(original)

      Reflect.set(player, 'url', 'assigned.mp3')
      expect(Reflect.get(player, 'url')).toBe('assigned.mp3')
      if (action === 'destroy') plugin.destroy()
      else emitCoreError(mockMP3.cores[0], new Error('failed'))

      expect(Object.getOwnPropertyDescriptor(player, '__url')).toEqual({
        ...original, value: 'assigned.mp3'
      })
      Reflect.set(player, 'url', 'native.mp3')
      expect(Reflect.get(player, 'url')).toBe('native.mp3')
    }
  )

  test.each([false, true])(
    'preserves saved playback state on failed replacement with paused %s',
    async (paused) => {
      const player = createPlayer({ currentTime: 12, paused })
      player.preProcessUrl.mockImplementation((url: string) => ({ url: `${url}?signed=1` }))
      const plugin = new MP3Plugin({} as never)
      attachPlayer(plugin, player)
      plugin.beforePlayerInit()
      await flushPromises()
      const core = mockMP3.cores[0]
      const error = new Error('replacement failed')
      core.load.mockImplementation(async () => {
        player.currentTime = 0
        player.paused = true
        emitCoreError(core, error)
        throw error
      })

      await expect(player.switchURL('failed.mp3')).rejects.toThrow('replacement failed')
      expect(player.media.getAttribute('src')).toBe('failed.mp3?signed=1')
      player.media.dispatchEvent(new Event('loadedmetadata'))

      expect(player.media.currentTime).toBe(12)
      expect(player.play).toHaveBeenCalledTimes(paused ? 0 : 1)
      expect(player.pause).toHaveBeenCalledTimes(paused ? 1 : 0)
      expect(player.preProcessUrl).toHaveBeenCalledTimes(2)
    }
  )

  test('a superseded switch cannot degrade the current source', async () => {
    const player = createPlayer({ currentTime: 12, paused: false })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()
    await flushPromises()
    const first = createDeferred<number>()
    const second = createDeferred<number>()
    const core = mockMP3.cores[0]
    core.load
      .mockImplementationOnce(() => {
        player.currentTime = 0
        player.paused = true
        return first.promise
      })
      .mockReturnValueOnce(second.promise)

    const firstSwitch = player.switchURL('first.mp3')
    const secondSwitch = player.switchURL('second.mp3')
    expect(core.load).toHaveBeenLastCalledWith('second.mp3', 12)
    first.reject(new Error('stale source failed'))
    await expect(firstSwitch).rejects.toThrow('stale source failed')
    expect(player.emit).not.toHaveBeenCalledWith('playCatch', expect.anything(), expect.anything())
    expect(core.destroy).not.toHaveBeenCalled()

    second.resolve(12)
    await expect(secondSwitch).resolves.toBe(true)
    expect(player.currentTime).toBe(12)
    expect(player.play).toHaveBeenCalledTimes(1)
  })

  test('does not restore obsolete switch state after the replacement succeeds', async () => {
    const player = createPlayer({ currentTime: 12, paused: false })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()
    await player.switchURL('next.mp3')
    player.currentTime = 20
    player.paused = true
    player.play.mockClear()
    player.pause.mockClear()

    emitCoreError(mockMP3.cores[0], new Error('runtime error'))
    player.media.dispatchEvent(new Event('loadedmetadata'))

    expect(player.media.currentTime).toBe(20)
    expect(player.pause).toHaveBeenCalledTimes(1)
    expect(player.play).not.toHaveBeenCalled()
  })

  test('ignores an initial load rejection after the core is replaced', async () => {
    const player = createPlayer()
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    const pending = createDeferred<number>()
    const core: MockCore = {
      load: jest.fn(() => pending.promise),
      destroy: jest.fn(),
      on: jest.fn(),
      isInitialized: false
    }
    mockMP3.mockImplementationOnce(() => {
      mockMP3.cores.push(core)
      return core
    })
    plugin.beforePlayerInit()
    player.config.url = 'new.mp3'
    plugin.beforePlayerInit()
    emitCoreError(core, new Error('stale core event'))
    pending.reject(new Error('stale initial failure'))
    await flushPromises()

    expect(player.emit).not.toHaveBeenCalled()
    expect(mockMP3.cores[1].destroy).not.toHaveBeenCalled()
  })

  test('clears native fallback listeners on destroy', () => {
    const player = createPlayer({ currentTime: 12, paused: false })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    plugin.beforePlayerInit()
    emitCoreError(mockMP3.cores[0], new Error('failed'))
    plugin.destroy()

    player.media.dispatchEvent(new Event('loadedmetadata'))

    expect(player.media.currentTime).toBe(0)
    expect(player.play).not.toHaveBeenCalled()
  })
})
