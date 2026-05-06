import { Chromecast } from '../src/platform/chromecast'
import { resetSdkPromise } from '../src/platform/chromecast-sdk'

function createPluginStub() {
  const handlers = {}
  return {
    config: { autoplayOnCast: true },
    player: {
      config: { url: 'https://example.com/video.m3u8' },
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
}

function buildCastFrameworkMock({ onAddEventListener } = {}) {
  return {
    framework: {
      CastContextEventType: {
        CAST_STATE_CHANGED: 'CAST_STATE_CHANGED',
        SESSION_STATE_CHANGED: 'SESSION_STATE_CHANGED'
      },
      CastState: {
        NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE',
        NOT_CONNECTED: 'NOT_CONNECTED',
        CONNECTED: 'CONNECTED'
      },
      SessionState: {
        SESSION_STARTED: 'SESSION_STARTED',
        SESSION_RESUMED: 'SESSION_RESUMED',
        SESSION_ENDED: 'SESSION_ENDED'
      },
      CastContext: {
        getInstance() {
          return {
            setOptions: jest.fn(),
            addEventListener: onAddEventListener || jest.fn(),
            removeEventListener: jest.fn(),
            getCastState: jest.fn(() => 'NO_DEVICES_AVAILABLE'),
            getCurrentSession: jest.fn(() => null)
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

  test('emits cast_target_change isCasting:true on SESSION_STARTED', async () => {
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
    sessionStateHandler({ sessionState: 'SESSION_STARTED' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_target_change', {
      protocol: 'chromecast',
      isCasting: true
    })
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
    sessionStateHandler({ sessionState: 'SESSION_ENDED' })

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_target_change', {
      protocol: 'chromecast',
      isCasting: false
    })
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
    const plugin = createPluginStub()
    // No window.cast/chrome set — SDK loader will fail
    const chromecast = new Chromecast(plugin, {
      sdkUrl: '',
      sdkLoader: null,
      loadSdkTimeout: 10
    })

    await chromecast.install()

    expect(plugin.player.emit).toHaveBeenCalledWith('cast_availability_change', {
      protocol: 'chromecast',
      availability: 'not-available'
    })
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
  })
})
