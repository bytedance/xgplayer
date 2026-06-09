import { Chromecast } from '../src/platform/chromecast'
import { resetSdkPromise } from '../src/platform/chromecast-sdk'

function createPluginStub() {
  const handlers = {}
  const plugin = {
    config: {},
    player: {
      config: { url: 'https://example.com/video.m3u8' },
      paused: true,
      currentTime: 0,
      play: jest.fn().mockResolvedValue(undefined),
      pause: jest.fn(),
      on: jest.fn((event, fn) => {
        handlers[event] = fn
      }),
      off: jest.fn(),
      emit: jest.fn(),
      media: document.createElement('video')
    },
    emit: jest.fn(),
    handlers
  }
  return plugin
}

function buildCastFrameworkMock({
  onAddEventListener,
  getCastState = jest.fn(() => 'NO_DEVICES_AVAILABLE'),
  getCurrentSession = jest.fn(() => null),
  requestSession = jest.fn()
} = {}) {
  return {
    framework: {
      CastContextEventType: {
        CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
        SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
      },
      CastState: {
        NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE',
        NOT_CONNECTED: 'NOT_CONNECTED',
        CONNECTING: 'CONNECTING',
        CONNECTED: 'CONNECTED'
      },
      SessionState: {
        SESSION_STARTED: 'SESSION_STARTED',
        SESSION_RESUMED: 'SESSION_RESUMED',
        SESSION_ENDED: 'SESSION_ENDED',
        SESSION_ENDING: 'SESSION_ENDING',
        SESSION_START_FAILED: 'SESSION_START_FAILED',
        SESSION_RESUME_FAILED: 'SESSION_RESUME_FAILED'
      },
      CastContext: {
        getInstance() {
          return {
            setOptions: jest.fn(),
            addEventListener: onAddEventListener || jest.fn(),
            removeEventListener: jest.fn(),
            getCastState,
            requestSession,
            getCurrentSession
          }
        }
      }
    }
  }
}

function buildChromeMock() {
  return {
    cast: {
      media: {
        DEFAULT_MEDIA_RECEIVER_APP_ID: 'default',
        MediaInfo: function MediaInfo(contentId, contentType) {
          this.contentId = contentId
          this.contentType = contentType
        },
        LoadRequest: function LoadRequest(mediaInfo) {
          this.mediaInfo = mediaInfo
          this.autoplay = undefined
        }
      },
      AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
    }
  }
}

function muteConsoleWarn() {
  return jest.spyOn(console, 'warn').mockImplementation(() => {})
}

describe('Chromecast', () => {
  beforeEach(() => {
    resetSdkPromise()
    delete window.cast
    delete window.chrome
  })

  test('emits cast_availability_change available on NOT_CONNECTED state', async () => {
    const plugin = createPluginStub()

    // Capture the CAST_STATE_CHANGED handler so we can fire it
    let stateChangedHandler
    const cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'CAST_STATE_CHANGED') stateChangedHandler = handler
      })
    })
    window.cast = cast
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()

    // Trigger a state change
    stateChangedHandler({ castState: 'NOT_CONNECTED' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_availability_change', {
      protocol: 'chromecast',
      availability: 'available'
    })
  })

  test('emits cast_availability_change not-available on NO_DEVICES_AVAILABLE', async () => {
    const plugin = createPluginStub()

    let stateChangedHandler
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'CAST_STATE_CHANGED') stateChangedHandler = handler
      })
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    stateChangedHandler({ castState: 'NO_DEVICES_AVAILABLE' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_availability_change', {
      protocol: 'chromecast',
      availability: 'not-available'
    })
  })

  test('treats missing initial cast state as not-available', async () => {
    const plugin = createPluginStub()

    window.cast = buildCastFrameworkMock({
      getCastState: jest.fn(() => undefined)
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_availability_change', {
      protocol: 'chromecast',
      availability: 'not-available'
    })
    expect(chromecast.canRequest()).toBe(false)
  })

  test('emits cast_target_change isCasting:true on SESSION_STARTED', async () => {
    const plugin = createPluginStub()

    let sessionStateHandler
    const session = { loadMedia: jest.fn() }
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
      }),
      getCurrentSession: jest.fn(() => session)
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_target_change', {
      protocol: 'chromecast',
      isCasting: true
    })
  })

  test('does not mark casting when SESSION_STARTED has no current session', async () => {
    const plugin = createPluginStub()

    let sessionStateHandler
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
      }),
      getCurrentSession: jest.fn(() => null)
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    expect(chromecast.isCasting()).toBe(false)
    expect(plugin.player.emit).not.toHaveBeenCalledWith('cast_target_change', {
      protocol: 'chromecast',
      isCasting: true
    })
    expect(plugin.player.emit).toHaveBeenCalledWith(
      'cast_error',
      expect.objectContaining({
        protocol: 'chromecast',
        code: 'session_unavailable',
        message: 'No Chromecast session after session state changed'
      })
    )
  })

  test('emits cast_target_change isCasting:false on SESSION_ENDED', async () => {
    const plugin = createPluginStub()

    let sessionStateHandler
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
      })
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    await sessionStateHandler({ sessionState: 'SESSION_ENDED' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_target_change', {
      protocol: 'chromecast',
      isCasting: false
    })
  })

  test('restores local playback from remote state when Chromecast session ends', async () => {
    const plugin = createPluginStub()
    let currentTimeAtCastEnd

    let sessionStateHandler
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
      })
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    plugin.player.emit.mockImplementation((event, payload) => {
      if (event === 'cast_target_change' && payload?.isCasting === false) {
        currentTimeAtCastEnd = plugin.player.currentTime
      }
    })
    chromecast.remoteController.getState = jest.fn(() => ({
      protocol: 'chromecast',
      available: true,
      connected: true,
      mediaLoaded: true,
      paused: false,
      currentTime: 52
    }))

    await sessionStateHandler({ sessionState: 'SESSION_ENDING' })
    await sessionStateHandler({ sessionState: 'SESSION_ENDED' })

    expect(plugin.player.currentTime).toBe(52)
    expect(currentTimeAtCastEnd).toBe(52)
    expect(plugin.player.play).toHaveBeenCalled()
    expect(plugin.player.pause).not.toHaveBeenCalled()
  })

  test('restores local paused state when Chromecast receiver was paused', async () => {
    const plugin = createPluginStub()

    let sessionStateHandler
    window.cast = buildCastFrameworkMock({
      onAddEventListener: jest.fn((type, handler) => {
        if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
      })
    })
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    chromecast.remoteController.getState = jest.fn(() => ({
      protocol: 'chromecast',
      available: true,
      connected: true,
      mediaLoaded: true,
      paused: true,
      currentTime: 19
    }))

    await sessionStateHandler({ sessionState: 'SESSION_ENDED' })

    expect(plugin.player.currentTime).toBe(19)
    expect(plugin.player.pause).toHaveBeenCalled()
    expect(plugin.player.play).not.toHaveBeenCalled()
  })

  test('does not crash if destroy() called during SDK load', async () => {
    const plugin = createPluginStub()
    window.cast = buildCastFrameworkMock()
    window.chrome = {
      cast: {
        media: { DEFAULT_MEDIA_RECEIVER_APP_ID: 'default' },
        AutoJoinPolicy: { ORIGIN_SCOPED: 'origin_scoped' }
      }
    }

    let resolveLoader
    const loaderPromise = new Promise((res) => { resolveLoader = res })
    const chromecast = new Chromecast(plugin, {
      sdkLoader: () => loaderPromise,
      sdkUrl: '',
      loadSdkTimeout: 1000
    })

    const installPromise = chromecast.install()
    // Destroy before SDK resolves
    chromecast.destroy()
    resolveLoader()
    // Should not throw
    await expect(installPromise).resolves.toBeUndefined()
  })

  test('emits not-available when install fails', async () => {
    const warnSpy = muteConsoleWarn()
    const plugin = createPluginStub()
    // No window.cast/chrome set — SDK loader will fail
    const chromecast = new Chromecast(plugin, {
      sdkUrl: '',
      sdkLoader: null,
      loadSdkTimeout: 10
    })

    try {
      await chromecast.install()

      expect(warnSpy).toHaveBeenCalledWith(
        '[xgplayer-cast] chromecast install failed:',
        expect.any(Error)
      )
      expect(plugin.player.emit).toHaveBeenCalledWith('cast_availability_change', {
        protocol: 'chromecast',
        availability: 'not-available'
      })
      expect(plugin.player.emit).toHaveBeenCalledWith(
        'cast_error',
        expect.objectContaining({
          protocol: 'chromecast',
          code: 'sdk_load_failed'
        })
      )
    } finally {
      warnSpy.mockRestore()
    }
  })

  test('_onRequestCast emits cast_error when context is missing', async () => {
    const warnSpy = muteConsoleWarn()
    const plugin = createPluginStub()
    const chromecast = new Chromecast(plugin, {
      sdkUrl: '',
      sdkLoader: null,
      loadSdkTimeout: 10
    })

    try {
      await chromecast._onRequestCast({ protocol: 'chromecast' })

      expect(warnSpy).toHaveBeenCalledWith('[xgplayer-cast] Chromecast context is not ready')
      expect(plugin.player.emit).toHaveBeenCalledWith(
        'cast_error',
        expect.objectContaining({
          protocol: 'chromecast',
          code: 'context_not_ready',
          message: 'Chromecast context is not ready'
        })
      )
    } finally {
      warnSpy.mockRestore()
    }
  })

  test('_onRequestCast ignores non-chromecast protocol', async () => {
    const plugin = createPluginStub()
    window.cast = buildCastFrameworkMock()
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      loadSdkTimeout: 1000
    })
    await chromecast.install()

    const requestSession = jest.fn()
    chromecast.castContext.requestSession = requestSession

    await chromecast._onRequestCast({ protocol: 'airplay' })
    expect(requestSession).not.toHaveBeenCalled()
  })

  test('_onRequestCast requests session and loads media', async () => {
    const plugin = createPluginStub()
    plugin.config = { autoplayOnCast: false }
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.url = 'https://cdn.example.com/video.mp4'
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }
    const requestSession = jest.fn().mockResolvedValue(undefined)

    let castContextInstance
    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance() {
            castContextInstance = {
              setOptions: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              getCastState: jest.fn(() => 'NOT_CONNECTED'),
              requestSession,
              getCurrentSession: () => session
            }
            return castContextInstance
          }
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    await chromecast._onRequestCast({ protocol: 'chromecast' })

    expect(requestSession).toHaveBeenCalled()
    expect(loadMedia).toHaveBeenCalledWith(
      expect.objectContaining({ autoplay: false })
    )
  })

  test('_onRequestCast uses request autoplay and pauses local playback after load', async () => {
    const plugin = createPluginStub()
    plugin.player.paused = false
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.url = 'https://cdn.example.com/video.mp4'
    plugin.player.preProcessUrl = (url) => ({ url })

    let resolveLoad
    const loadMedia = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveLoad = resolve
        })
    )
    const session = { loadMedia }
    const requestSession = jest.fn().mockResolvedValue(undefined)

    window.cast = buildCastFrameworkMock({
      getCastState: jest.fn(() => 'NOT_CONNECTED'),
      getCurrentSession: jest.fn(() => session),
      requestSession
    })
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    const requestCast = chromecast._onRequestCast({
      protocol: 'chromecast',
      autoplay: true,
      handoffState: { protocol: 'chromecast', paused: false, currentTime: 17 }
    })
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(loadMedia).toHaveBeenCalledWith(
      expect.objectContaining({ autoplay: true, currentTime: 17 })
    )
    expect(plugin.player.pause).not.toHaveBeenCalled()

    resolveLoad()
    await requestCast

    expect(plugin.player.pause).toHaveBeenCalled()
  })

  test('_onRequestCast uses false request autoplay without forcing local pause', async () => {
    const plugin = createPluginStub()
    plugin.player.paused = true
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.url = 'https://cdn.example.com/video.mp4'
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }
    const requestSession = jest.fn().mockResolvedValue(undefined)

    window.cast = buildCastFrameworkMock({
      getCastState: jest.fn(() => 'NOT_CONNECTED'),
      getCurrentSession: jest.fn(() => session),
      requestSession
    })
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    await chromecast._onRequestCast({
      protocol: 'chromecast',
      autoplay: false,
      handoffState: { protocol: 'chromecast', paused: true, currentTime: 9 }
    })

    expect(loadMedia).toHaveBeenCalledWith(
      expect.objectContaining({ autoplay: false, currentTime: 9 })
    )
    expect(plugin.player.pause).not.toHaveBeenCalled()
  })

  test('_loadCurrentMedia forwards optional MediaInfo fields', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'https://cdn.example.com/main.m3u8' }
    plugin.player.preProcessUrl = (url) => ({
      url,
      hlsSegmentFormat: 'FMP4',
      hlsVideoSegmentFormat: 'FMP4',
      customData: { token: 'abc' }
    })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }

    window.cast = buildCastFrameworkMock()
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    chromecast.session = session
    chromecast._isCasting = true

    await expect(chromecast.reloadMedia()).resolves.toBe(true)

    expect(loadMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        mediaInfo: expect.objectContaining({
          contentId: 'https://cdn.example.com/main.m3u8',
          contentType: 'application/x-mpegURL',
          hlsSegmentFormat: 'FMP4',
          hlsVideoSegmentFormat: 'FMP4',
          customData: { token: 'abc' }
        })
      })
    )
  })

  test('_onRequestCast emits cast_error when requestSession rejects', async () => {
    const plugin = createPluginStub()
    const requestError = new Error('User cancelled')
    const requestSession = jest.fn().mockRejectedValue(requestError)

    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'NOT_CONNECTED'),
            requestSession,
            getCurrentSession: () => null
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await chromecast._onRequestCast({ protocol: 'chromecast' })
    warnSpy.mockRestore()

    expect(plugin.player.emit).toHaveBeenCalledWith(
      'cast_error',
      expect.objectContaining({
        protocol: 'chromecast',
        code: 'request_session_failed',
        message: 'User cancelled',
        error: requestError
      })
    )
  })

  test('_loadCurrentMedia emits cast_error when loadMedia rejects', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadError = new Error('Receiver load failed')
    const session = { loadMedia: jest.fn().mockRejectedValue(loadError) }

    window.cast = buildCastFrameworkMock()
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    chromecast.session = session
    chromecast._isCasting = true

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(chromecast.reloadMedia()).resolves.toBe(false)
    warnSpy.mockRestore()

    expect(plugin.player.emit).toHaveBeenCalledWith(
      'cast_error',
      expect.objectContaining({
        protocol: 'chromecast',
        code: 'media_load_failed',
        message: 'Receiver load failed',
        error: loadError,
        media: expect.objectContaining({
          url: 'https://cdn.example.com/video.mp4',
          contentType: 'video/mp4'
        })
      })
    )
    expect(plugin.player.pause).not.toHaveBeenCalled()
  })

  test('reloadMedia loads changed media during an active session', async () => {
    const plugin = createPluginStub()
    plugin.config = { autoplayOnCast: true }
    plugin.player.config = { url: 'https://cdn.example.com/first.m3u8' }
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }
    let sessionStateHandler

    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn((type, handler) => {
              if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
            }),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'CONNECTED'),
            getCurrentSession: () => session
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    plugin.player.config.url = 'https://cdn.example.com/second.m3u8'

    await expect(chromecast.reloadMedia()).resolves.toBe(true)
    expect(loadMedia).toHaveBeenLastCalledWith(
      expect.objectContaining({
        autoplay: true,
        mediaInfo: expect.objectContaining({
          contentId: 'https://cdn.example.com/second.m3u8',
          contentType: 'application/x-mpegURL'
        })
      })
    )
  })

  test('reloadMedia inherits current remote playback state when autoplay is not configured', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'https://cdn.example.com/first.m3u8' }
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }
    let sessionStateHandler

    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn((type, handler) => {
              if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
            }),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'CONNECTED'),
            getCurrentSession: () => session
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })
    chromecast.remoteController.getState = jest.fn(() => ({
      protocol: 'chromecast',
      available: true,
      connected: true,
      mediaLoaded: true,
      paused: false,
      currentTime: 33
    }))

    plugin.player.config.url = 'https://cdn.example.com/second.m3u8'

    await expect(chromecast.reloadMedia()).resolves.toBe(true)
    expect(loadMedia).toHaveBeenLastCalledWith(
      expect.objectContaining({
        autoplay: true,
        currentTime: 33,
        mediaInfo: expect.objectContaining({
          contentId: 'https://cdn.example.com/second.m3u8'
        })
      })
    )
  })

  test('reloadMedia skips the same media URL after it has already loaded', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.preProcessUrl = (url) => ({ url })

    const loadMedia = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia }
    let sessionStateHandler

    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn((type, handler) => {
              if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
            }),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'CONNECTED'),
            getCurrentSession: () => session
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    await expect(chromecast.reloadMedia()).resolves.toBe(true)
    loadMedia.mockClear()

    await expect(chromecast.reloadMedia()).resolves.toBe(false)
    expect(loadMedia).not.toHaveBeenCalled()
  })

  test('reloadMedia skips duplicate media URL while loadMedia is pending', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'https://cdn.example.com/video.mp4' }
    plugin.player.preProcessUrl = (url) => ({ url })

    let resolveLoad
    const loadMedia = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveLoad = resolve
        })
    )
    const session = { loadMedia }
    let sessionStateHandler

    window.cast = {
      framework: {
        CastContextEventType: {
          CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
          SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
        },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: {
          SESSION_STARTED: 'SESSION_STARTED',
          SESSION_RESUMED: 'SESSION_RESUMED',
          SESSION_ENDED: 'SESSION_ENDED'
        },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn((type, handler) => {
              if (type === 'SESSION_STATE_CHANGED') sessionStateHandler = handler
            }),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'CONNECTED'),
            getCurrentSession: () => session
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped',
      loadSdkTimeout: 1000
    })

    await chromecast.install()
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    const firstReload = chromecast.reloadMedia()
    await expect(chromecast.reloadMedia()).resolves.toBe(false)

    expect(loadMedia).toHaveBeenCalledTimes(1)

    resolveLoad()
    await expect(firstReload).resolves.toBe(true)
  })

  test('_onRequestCast handles blob URL with warning and no crash', async () => {
    const plugin = createPluginStub()
    plugin.player.config = { url: 'blob:https://example.com/123' }
    plugin.player.url = 'blob:https://example.com/123'

    const requestSession = jest.fn().mockResolvedValue(undefined)
    const session = { loadMedia: jest.fn() }

    window.cast = {
      framework: {
        CastContextEventType: { CAST_STATE_CHANGED: 'CAST_STATE_CHANGED', SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED' },
        CastState: { NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE' },
        SessionState: { SESSION_STARTED: 'SESSION_STARTED', SESSION_RESUMED: 'SESSION_RESUMED', SESSION_ENDED: 'SESSION_ENDED' },
        CastContext: {
          getInstance: () => ({
            setOptions: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            requestSession,
            getCurrentSession: () => session
          })
        }
      }
    }
    window.chrome = buildChromeMock()

    const chromecast = new Chromecast(plugin, {
      sdkLoader: jest.fn().mockResolvedValue(undefined),
      sdkUrl: '',
      loadSdkTimeout: 1000
    })
    await chromecast.install()

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await chromecast._onRequestCast({ protocol: 'chromecast' })
    warnSpy.mockRestore()

    // loadMedia should NOT be called because URL resolution fails
    expect(session.loadMedia).not.toHaveBeenCalled()
    expect(plugin.player.emit).toHaveBeenCalledWith(
      'cast_error',
      expect.objectContaining({
        protocol: 'chromecast',
        code: 'unsupported_source',
        message: 'Cast requires a network URL, got blob URL'
      })
    )
  })
})
