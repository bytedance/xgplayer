import { Airplay } from '../src/platform/airplay'

function createAirplay(pluginOverrides = {}, playerOverrides = {}) {
  const root = document.createElement('div')
  const player = {
    root,
    media: document.createElement('video'),
    video: null,
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    i18n: { CAST_UNMUTE_TIP: 'Please unmute before casting' },
    config: {}
  }
  Object.assign(player, playerOverrides)
  const plugin = {
    player,
    _suspendMSEPlugin: jest.fn(),
    _resumeMSEPlugin: jest.fn(),
    ...pluginOverrides
  }
  return {
    airplay: new Airplay(plugin),
    player,
    plugin
  }
}

describe('Airplay muted tip cleanup', () => {
  test('does not throw if tip DOM was removed by external cleanup', () => {
    const { airplay, player } = createAirplay()
    const tip = document.createElement('div')
    player.root.appendChild(tip)
    airplay._tipDom = tip

    tip.remove()

    expect(() => airplay._gcTip()).not.toThrow()
    expect(airplay._tipDom).toBe(null)
  })
})

describe('Airplay native source preparation', () => {
  const originalAvailability = window.WebKitPlaybackTargetAvailabilityEvent
  const originalGlobalAvailability = global.WebKitPlaybackTargetAvailabilityEvent

  beforeEach(() => {
    jest.useFakeTimers()
    window.WebKitPlaybackTargetAvailabilityEvent = function WebKitPlaybackTargetAvailabilityEvent() {}
    global.WebKitPlaybackTargetAvailabilityEvent =
      window.WebKitPlaybackTargetAvailabilityEvent
  })

  afterEach(() => {
    window.WebKitPlaybackTargetAvailabilityEvent = originalAvailability
    global.WebKitPlaybackTargetAvailabilityEvent = originalGlobalAvailability
    jest.useRealTimers()
  })

  test('adds network source fallback before opening picker without switching playback', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' },
        preProcessUrl: jest.fn((url, ext) => {
          expect(ext).toEqual(
            expect.objectContaining({
              scene: 'cast',
              protocol: 'airplay'
            })
          )
          return { url }
        })
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })

    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(player.media.getAttribute('src')).toBe(null)
    expect(
      player.media.querySelector('source[data-xgplayer-cast-airplay="true"]')
    ).toEqual(
      expect.objectContaining({
        src: 'https://cdn.example.com/main.m3u8'
      })
    )
    expect(
      player.media
        .querySelector('source[data-xgplayer-cast-airplay="true"]')
        .getAttribute('type')
    ).toBe('application/vnd.apple.mpegurl')
    expect(player.media.load).not.toHaveBeenCalled()
    expect(player.media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('adds AirPlay fallback source next to MMS source before opening picker', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'disableRemotePlayback', {
      configurable: true,
      writable: true,
      value: true
    })
    const mseSource = document.createElement('source')
    mseSource.src = 'blob:https://example.com/mms'
    media.appendChild(mseSource)
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })

    const airplaySource = player.media.querySelector(
      'source[data-xgplayer-cast-airplay="true"]'
    )
    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(player.media.disableRemotePlayback).toBe(false)
    expect(player.media.getAttribute('src')).toBe(null)
    expect(airplaySource.src).toBe('https://cdn.example.com/main.m3u8')
    expect(player.media.querySelector('source[src^="blob:"]')).toBe(mseSource)
    expect(player.media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('adds AirPlay fallback source while keeping MSE blob src before opening picker', () => {
    const media = document.createElement('video')
    media.src = 'blob:https://example.com/mse'
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })

    const airplaySource = player.media.querySelector(
      'source[data-xgplayer-cast-airplay="true"]'
    )
    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(player.media.getAttribute('src')).toBe('blob:https://example.com/mse')
    expect(airplaySource.src).toBe('https://cdn.example.com/main.m3u8')
    expect(player.media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('keeps srcObject while opening picker and only adds AirPlay fallback source', () => {
    const srcObject = { type: 'ManagedMediaSource' }
    const media = document.createElement('video')
    Object.defineProperty(media, 'srcObject', {
      configurable: true,
      writable: true,
      value: srcObject
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })

    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(player.media.srcObject).toBe(srcObject)
    expect(player.media.getAttribute('src')).toBe(null)
    expect(
      player.media.querySelector('source[data-xgplayer-cast-airplay="true"]').src
    ).toBe('https://cdn.example.com/main.m3u8')
    expect(player.media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('switches to native source after AirPlay target is selected', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    Object.defineProperty(media, 'webkitCurrentPlaybackTargetIsWireless', {
      configurable: true,
      value: true
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })
    airplay._onTargetChange()

    expect(plugin._suspendMSEPlugin).toHaveBeenCalled()
    expect(player.media.src).toBe('https://cdn.example.com/main.m3u8')
    expect(player.media.load).toHaveBeenCalled()
    expect(player.emit).toHaveBeenCalledWith('cast_target_change', {
      protocol: 'airplay',
      isCasting: true
    })
  })

  test('seeks to the latest local point during native handoff', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    Object.defineProperty(media, 'webkitCurrentPlaybackTargetIsWireless', {
      configurable: true,
      value: true
    })
    Object.defineProperty(media, 'duration', {
      configurable: true,
      value: 120
    })
    media.currentTime = 27
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({
      protocol: 'airplay',
      handoffState: { protocol: 'airplay', paused: false, currentTime: 27 }
    })
    media.currentTime = 33
    airplay._onTargetChange()
    media.dispatchEvent(new Event('loadedmetadata'))

    expect(player.media.currentTime).toBe(33)
  })

  test('does not reapply native source while currentSrc still reports the detached blob', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    Object.defineProperty(media, 'webkitCurrentPlaybackTargetIsWireless', {
      configurable: true,
      value: true
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' }
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })
    airplay._onTargetChange()
    airplay._onTargetChange()

    expect(plugin._suspendMSEPlugin).toHaveBeenCalledTimes(1)
    expect(player.media.load).toHaveBeenCalledTimes(1)
  })

  test('marks installed media element as AirPlay capable without changing remote playback policy', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'disableRemotePlayback', {
      configurable: true,
      writable: true,
      value: true
    })
    media.setAttribute('disableRemotePlayback', '')
    media.webkitShowPlaybackTargetPicker = jest.fn()
    const { airplay, player } = createAirplay({}, { media })

    airplay.install()

    expect(player.media.getAttribute('x-webkit-airplay')).toBe('allow')
    expect(player.media.hasAttribute('disableRemotePlayback')).toBe(true)
    expect(player.media.disableRemotePlayback).toBe(true)
    expect(player.on).toHaveBeenCalledWith('cast_request', airplay._onRequestCast)
  })

  test('allows remote playback when user opens the AirPlay picker', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'https://cdn.example.com/main.m3u8'
    })
    Object.defineProperty(media, 'disableRemotePlayback', {
      configurable: true,
      writable: true,
      value: true
    })
    media.setAttribute('disableRemotePlayback', '')
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, player } = createAirplay(
      {},
      {
        media,
        config: {}
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })

    expect(player.media.hasAttribute('disableRemotePlayback')).toBe(false)
    expect(player.media.disableRemotePlayback).toBe(false)
    expect(player.media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('does not open picker when blob source cannot be resolved to a network URL', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, plugin } = createAirplay(
      {},
      {
        media,
        config: {}
      }
    )

    try {
      airplay._onRequestCast({ protocol: 'airplay' })

      expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
      expect(media.webkitShowPlaybackTargetPicker).not.toHaveBeenCalled()
    } finally {
      warnSpy.mockRestore()
    }
  })

  test('does not suspend MSE plugin when picker is opened without selecting a route', () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' },
        preProcessUrl: (url) => ({ url })
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })
    jest.runOnlyPendingTimers()

    expect(plugin._suspendMSEPlugin).not.toHaveBeenCalled()
    expect(plugin._resumeMSEPlugin).not.toHaveBeenCalled()
    expect(media.webkitShowPlaybackTargetPicker).toHaveBeenCalled()
  })

  test('restores streaming plugin after native AirPlay handoff disconnects', () => {
    let isWireless = true
    const media = document.createElement('video')
    Object.defineProperty(media, 'currentSrc', {
      configurable: true,
      value: 'blob:https://example.com/mse'
    })
    Object.defineProperty(media, 'webkitCurrentPlaybackTargetIsWireless', {
      configurable: true,
      get: () => isWireless
    })
    media.load = jest.fn()
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const { airplay, plugin } = createAirplay(
      {},
      {
        media,
        config: { url: 'https://cdn.example.com/main.m3u8' },
        preProcessUrl: (url) => ({ url })
      }
    )

    airplay._onRequestCast({ protocol: 'airplay' })
    airplay._onTargetChange()
    isWireless = false
    airplay._onTargetChange()
    jest.advanceTimersByTime(1000)

    expect(plugin._suspendMSEPlugin).toHaveBeenCalled()
    expect(plugin._resumeMSEPlugin).toHaveBeenCalled()
  })

  test('restores local playback point and state after native AirPlay handoff disconnects', async () => {
    const media = document.createElement('video')
    media.currentTime = 64
    Object.defineProperty(media, 'paused', {
      configurable: true,
      value: false
    })

    const { airplay, player, plugin } = createAirplay({}, { media })
    airplay._nativeHandoffActive = true

    await expect(airplay._restoreNativeHandoff()).resolves.toBe(true)

    expect(plugin._resumeMSEPlugin).toHaveBeenCalledWith(
      expect.objectContaining({
        protocol: 'airplay',
        currentTime: 64,
        paused: false
      })
    )
    expect(player.media.currentTime).toBe(64)
    expect(player.play).toHaveBeenCalled()
    expect(player.pause).not.toHaveBeenCalled()
  })
})
