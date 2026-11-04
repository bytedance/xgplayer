jest.mock('../src/core/ffmpeg', () => {
  const cores: Array<{ load: jest.Mock; destroy: jest.Mock; on: jest.Mock }> = []
  return {
    FFmpeg: Object.assign(jest.fn(() => {
      const core = {
        load: jest.fn(async (_url: string, start = 0) => start),
        destroy: jest.fn().mockResolvedValue(undefined),
        on: jest.fn()
      }
      cores.push(core)
      return core
    }), { cores, isSupported: jest.fn().mockReturnValue(true) })
  }
})

jest.mock('xgplayer', () => ({
  BasePlugin: class {
    player: unknown
    config: unknown
    on = jest.fn()
  },
  Errors: class {
    constructor(_player: unknown, info: object) { Object.assign(this, info) }
  },
  Events: {
    URL_CHANGE: 'urlchange', DESTROY: 'destroy', ERROR: 'error',
    DEFINITION_CHANGE: 'definition_change', AFTER_DEFINITION_CHANGE: 'after_definition_change'
  }
}))

import { FFmpeg } from '../src/core/ffmpeg'
import { FFmpegPlugin } from '../src/plugin'
import DefaultPlugin, { FFmpegPlugin as NamedPlugin } from '../src'
import UmdPlugin from '../src/index.umd'
import { FFmpegError } from '../src/types'

const mockAudio = FFmpeg as unknown as jest.Mock & {
  cores: Array<{ load: jest.Mock; destroy: jest.Mock; on: jest.Mock }>
}

function setup() {
  const player = {
    config: { url: 'sample.wma', definition: { list: [{ url: 'high.wma', definition: 'high' }] } },
    media: document.createElement('audio'),
    handleSource: true,
    preProcessUrl: jest.fn((url: string) => ({ url })),
    switchURL: jest.fn(),
    changeDefinition: jest.fn(),
    playNext: jest.fn(),
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    emit: jest.fn(),
    paused: false,
    currentTime: 12,
    ended: false,
    curDefinition: {}
  }
  const plugin = new FFmpegPlugin({} as never)
  Object.assign(plugin, { player, config: {} })
  return { player, plugin }
}

function emit(core: (typeof mockAudio.cores)[number], event: string, value: unknown) {
  const callback = core.on.mock.calls.find(([name]) => name === event)?.[1]
  callback?.(value)
}

async function flush() {
  for (let index = 0; index < 10; index++) await Promise.resolve()
}

describe('FFmpeg xgplayer adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAudio.cores.length = 0
  })

  test('exposes the same plugin through ES and UMD entry points', () => {
    expect(DefaultPlugin).toBe(NamedPlugin)
    expect(UmdPlugin).toBe(NamedPlugin)
    expect(NamedPlugin.isSupported()).toBe(true)
  })

  test('owns the source, preprocesses URLs and restores native APIs on destroy', async () => {
    const { player, plugin } = setup()
    const nativeSwitch = player.switchURL
    const nativeDefinition = player.changeDefinition
    player.preProcessUrl.mockImplementation((url) => ({ url: `${url}?signed=1` }))
    plugin.beforePlayerInit()
    expect(player.handleSource).toBe(false)
    expect(mockAudio.cores[0].load).toHaveBeenCalledWith('sample.wma?signed=1')
    await player.switchURL({ url: 'next.flac' })
    expect(mockAudio.cores[0].load).toHaveBeenLastCalledWith('next.flac?signed=1', 12)
    expect(player.play).toHaveBeenCalledTimes(1)
    plugin.destroy()
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(nativeSwitch)
    expect(player.changeDefinition).toBe(nativeDefinition)
    expect(mockAudio.cores[0].destroy).toHaveBeenCalledTimes(1)
  })

  test('keeps the original paused state after a successful switch', async () => {
    const { player, plugin } = setup()
    player.paused = true
    plugin.beforePlayerInit()
    await player.switchURL('next.wav')
    expect(player.pause).toHaveBeenCalled()
    expect(player.play).not.toHaveBeenCalled()
  })

  test('routes URL_CHANGE events through the core and consumes failure rejections', async () => {
    const { player, plugin } = setup()
    plugin.beforePlayerInit()
    const on = plugin.on as jest.Mock
    const listener = on.mock.calls.find(([event]) => event === 'urlchange')?.[1]
    const error = new FFmpegError('transcode', 'invalid audio')
    mockAudio.cores[0].load.mockImplementationOnce(async () => {
      emit(mockAudio.cores[0], 'error', error)
      throw error
    })
    listener('invalid.wma')
    await flush()
    expect(player.emit.mock.calls.filter(([event]) => event === 'error')).toHaveLength(1)
    expect(player.config.url).toBe('invalid.wma')
  })

  test.each([false, true])(
    'owns src assignments during preparation and restores an own descriptor: %s',
    async (ownDescriptor) => {
      const { player, plugin } = setup()
      const NativePlayer = jest.requireActual('xgplayer').SimplePlayer
      const descriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(NativePlayer.prototype), 'src'
      )
      if (!descriptor) throw new Error('Native src descriptor is missing')
      const target = player as typeof player & { src: string }
      if (ownDescriptor) Object.defineProperty(player, 'src', descriptor)
      player.emit.mockImplementation((event, value) => {
        const listener = (plugin.on as jest.Mock).mock.calls.find(([name]) => name === event)?.[1]
        listener?.(value)
      })
      plugin.beforePlayerInit()
      target.src = 'replacement.wma'
      await flush()
      expect(mockAudio.cores[0].load).toHaveBeenLastCalledWith('replacement.wma', 12)
      expect(player.media.getAttribute('src')).toBeNull()
      plugin.destroy()
      expect(Object.getOwnPropertyDescriptor(player, 'src')).toEqual(
        ownDescriptor ? descriptor : undefined
      )
    }
  )

  test('reports URL preprocessing errors for both initialization and switch', async () => {
    const { player, plugin } = setup()
    const nativeSwitch = player.switchURL
    const nativeDefinition = player.changeDefinition
    plugin.beforePlayerInit()
    player.preProcessUrl.mockImplementation(() => { throw new Error('signing failed') })
    await expect(player.switchURL('next.wma')).rejects.toThrow('signing failed')
    expect(player.emit).toHaveBeenCalledWith('error', expect.objectContaining({
      ext: { stage: 'runtime' }
    }))
    plugin.beforePlayerInit()
    expect(mockAudio.cores[1].destroy).toHaveBeenCalled()
    expect(mockAudio.cores[1].load).not.toHaveBeenCalled()
    expect(player.handleSource).toBe(true)
    expect(player.switchURL).toBe(nativeSwitch)
    expect(player.changeDefinition).toBe(nativeDefinition)
    expect(Object.getOwnPropertyDescriptor(player, 'src')).toBeUndefined()
    plugin.destroy()
  })

  test('emits definition completion only for the successful current switch', async () => {
    const { player, plugin } = setup()
    plugin.beforePlayerInit()
    const definition = player.config.definition.list[0]
    await player.changeDefinition(definition, {})
    await flush()
    expect(player.curDefinition).toBe(definition)
    expect(player.emit).toHaveBeenCalledWith(
      'after_definition_change', { from: {}, to: definition }
    )
    mockAudio.cores[0].load.mockRejectedValueOnce(new Error('failed'))
    player.emit.mockClear()
    await expect(player.changeDefinition(definition, {})).rejects.toThrow('failed')
    expect(player.emit).not.toHaveBeenCalledWith(
      'after_definition_change', expect.anything()
    )
    plugin.destroy()
  })

  test('suppresses stale switch completion after a newer source load', async () => {
    const { player, plugin } = setup()
    plugin.beforePlayerInit()
    let resolve!: (time: number) => void
    mockAudio.cores[0].load.mockImplementationOnce(() =>
      new Promise<number>((res) => { resolve = res })
    )
    const first = player.switchURL('first.wma')
    player.currentTime = 0
    player.paused = true
    await player.switchURL('second.wma')
    expect(mockAudio.cores[0].load).toHaveBeenLastCalledWith('second.wma', 12)
    resolve(12)
    await expect(first).resolves.toBe(false)
    expect(player.play).toHaveBeenCalledTimes(1)
    plugin.destroy()
  })

  test('retains the native playNext lifecycle and ignores events from old cores', () => {
    const { player, plugin } = setup()
    const nativeNext = player.playNext
    plugin.beforePlayerInit()
    const first = mockAudio.cores[0]
    player.config.url = 'next.wav'
    plugin.beforePlayerInit()
    expect(first.destroy).toHaveBeenCalled()
    expect(player.playNext).toBe(nativeNext)
    emit(first, 'error', new Error('old error'))
    emit(first, 'ready', { duration: 4 })
    expect(player.emit).not.toHaveBeenCalled()
    emit(mockAudio.cores[1], 'ready', { duration: 4 })
    expect(player.emit).toHaveBeenCalledWith('ffmpegReady', { duration: 4 })
    plugin.destroy()
  })

  test('passes a custom encoding profile to the shared core', () => {
    const { player, plugin } = setup()
    const profile = {
      type: 'video', mimeType: 'video/mp4; codecs="avc1.42E01E"',
      inputArguments: [], outputArguments: ['-c:v', 'libx264']
    }
    Object.assign(plugin, { config: { profile } })
    plugin.beforePlayerInit()
    expect(mockAudio).toHaveBeenCalledWith(expect.objectContaining({ media: player.media }), profile)
    plugin.destroy()
  })
})
