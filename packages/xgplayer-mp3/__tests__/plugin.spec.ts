jest.mock('../src/mp3', () => {
  const cores: Array<{
    load: jest.Mock
    destroy: jest.Mock
    on: jest.Mock
    _inited: boolean
  }> = []
  const MP3 = jest.fn().mockImplementation(() => {
    const core = {
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
  Object.assign(MP3, {
    cores,
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
  _inited: boolean
}

const mockMP3 = MP3 as unknown as jest.Mock & {
  cores: MockCore[]
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

describe('MP3Plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockMP3.cores.length = 0
    mockMP3.isSupported.mockReturnValue(true)
  })

  test('takes over a string URL and starts the MP3 core', async () => {
    const player = createPlayer()
    const nativeSwitchURL = player.switchURL
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)

    await plugin.beforePlayerInit()

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

    await plugin.beforePlayerInit()

    expect(mockMP3).not.toHaveBeenCalled()
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(nativeSwitchURL)
  })

  test('routes switchURL through the MP3 core and preserves time', async () => {
    const player = createPlayer({ currentTime: 12, paused: false })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()

    await player.switchURL('next.mp3')

    expect(mockMP3.cores[0].load).toHaveBeenLastCalledWith('next.mp3', 12)
    expect(player.config.url).toBe('next.mp3')
    expect(player.play).toHaveBeenCalled()
  })

  test('waits for core destruction before native fallback', async () => {
    let resolveDestroy: (() => void) | undefined
    const player = createPlayer()
    player.media.src = 'blob:http://localhost/mp3'
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    mockMP3.cores[0].destroy.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveDestroy = resolve
        })
    )

    const fatal = plugin as unknown as {
      onFatalError: (error: Error) => Promise<void>
    }
    const fallback = fatal.onFatalError(new Error('invalid MP3'))
    await Promise.resolve()
    expect(player.handleSource).toBe(false)

    resolveDestroy?.()
    await fallback
    expect(player.handleSource).toBe(true)
    expect(player.media.src).toContain('/audio.mp3')
    expect(player.emit).toHaveBeenCalledWith(
      'playCatch',
      'MP3_1',
      expect.anything()
    )
  })

  test('closeDowngrade emits one terminal player error', async () => {
    const player = createPlayer({
      config: {
        url: 'audio.mp3',
        mediaType: 'audio',
        mp3: { closeDowngrade: true }
      }
    })
    const plugin = new MP3Plugin({} as never)
    attachPlayer(plugin, player)
    await plugin.beforePlayerInit()
    const fatal = plugin as unknown as {
      onFatalError: (error: Error) => Promise<void>
    }

    await fatal.onFatalError(new Error('failed'))
    await fatal.onFatalError(new Error('failed again'))

    expect(mockMP3.cores[0].destroy).not.toHaveBeenCalled()
    expect(
      player.emit.mock.calls.filter(([event]) => event === Events.ERROR)
    ).toHaveLength(1)
  })
})
