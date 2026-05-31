import Player from '../../packages/xgplayer/src/index'
import CastPlugin from '../../packages/xgplayer-cast/src/index'
import { resolveCastMedia } from '../../packages/xgplayer-cast/src/platform/cast-media'
// import HlsPlugin from '../../packages/xgplayer-hls/src/index'
import HlsJSPlugin from '../../packages/xgplayer-hls.js/src/index'

const query = new URLSearchParams(location.search)
const fakeChromecastMode = query.get('fakeChromecast')
const diagnostics = {
  fakeChromecast: fakeChromecastMode || 'off',
  isSecureContext: window.isSecureContext,
  protocol: location.protocol,
  castFrameworkReady: false,
  chromeCastReady: false,
  castState: 'unknown',
  availability: 'unknown',
  target: 'unknown',
  lastRequest: 'none',
  lastResolvedMedia: 'none',
  lastLoad: 'none',
  lastError: 'none',
  userAgent: navigator.userAgent
}

function updateDiagnostics(patch = {}) {
  Object.assign(diagnostics, patch, {
    castFrameworkReady: !!window.cast?.framework,
    chromeCastReady: !!window.chrome?.cast
  })

  const root = document.getElementById('cast-diagnostics')
  if (!root) return

  root.innerHTML = Object.entries(diagnostics)
    .map(
      ([key, value]) => `<p><strong>${key}:</strong> <code>${String(value)}</code></p>`
    )
    .join('')
}

function createFakeChromecastLoader() {
  return async () => {
    const listeners = {}
    let castState =
      fakeChromecastMode === 'no-devices' ? 'NO_DEVICES_AVAILABLE' : 'NOT_CONNECTED'
    let currentSession = null

    const dispatch = (type, payload) => {
      const handlers = listeners[type] || []
      handlers.forEach((handler) => handler(payload))
      if (type === 'CAST_STATE_CHANGED') {
        updateDiagnostics({ castState: payload.castState })
      }
    }

    const castContext = {
      setOptions(options) {
        updateDiagnostics({ receiverApplicationId: options.receiverApplicationId })
      },
      addEventListener(type, handler) {
        listeners[type] = listeners[type] || []
        listeners[type].push(handler)
      },
      removeEventListener(type, handler) {
        listeners[type] = (listeners[type] || []).filter((item) => item !== handler)
      },
      getCastState() {
        return castState
      },
      async requestSession() {
        updateDiagnostics({ lastRequest: 'requestSession()' })
        if (castState === 'NO_DEVICES_AVAILABLE') {
          updateDiagnostics({ lastError: 'Fake Chromecast has no devices available' })
          throw new Error('Fake Chromecast has no devices available')
        }

        currentSession = {
          async loadMedia(request) {
            const media = request.mediaInfo
            updateDiagnostics({
              lastLoad: `${media.contentType || 'unknown'} ${media.contentId || ''}`,
              lastError: 'none'
            })
            if (query.get('fakeChromecastLoad') === 'fail') {
              updateDiagnostics({ lastError: 'Fake Chromecast loadMedia failed' })
              throw new Error('Fake Chromecast loadMedia failed')
            }
          }
        }
        castState = 'CONNECTED'
        dispatch('SESSION_STATE_CHANGED', { sessionState: 'SESSION_STARTED' })
        dispatch('CAST_STATE_CHANGED', { castState })
      },
      getCurrentSession() {
        return currentSession
      }
    }

    window.chrome = window.chrome || {}
    window.chrome.cast = {
      AutoJoinPolicy: {
        ORIGIN_SCOPED: 'origin_scoped',
        TAB_AND_ORIGIN_SCOPED: 'tab_and_origin_scoped'
      },
      media: {
        DEFAULT_MEDIA_RECEIVER_APP_ID: 'CC1AD845',
        MediaInfo: function MediaInfo(contentId, contentType) {
          this.contentId = contentId
          this.contentType = contentType
        },
        LoadRequest: function LoadRequest(mediaInfo) {
          this.mediaInfo = mediaInfo
          this.autoplay = undefined
        }
      }
    }

    window.cast = {
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
            return castContext
          }
        }
      }
    }

    window.__fakeChromecast = {
      setCastState(nextState) {
        castState = nextState
        if (nextState !== 'CONNECTED') {
          currentSession = null
        }
        dispatch('CAST_STATE_CHANGED', { castState })
      },
      endSession() {
        currentSession = null
        castState = 'NOT_CONNECTED'
        dispatch('SESSION_STATE_CHANGED', { sessionState: 'SESSION_ENDED' })
        dispatch('CAST_STATE_CHANGED', { castState })
      }
    }

    updateDiagnostics({ castState })
  }
}

function createChromecastConfig() {
  if (!fakeChromecastMode) {
    return true
  }

  return {
    sdkUrl: '',
    sdkLoader: createFakeChromecastLoader(),
    receiverApplicationId: 'CC1AD845',
    autoJoinPolicy: 'origin_scoped'
  }
}

const originalConsoleWarn = console.warn.bind(console)
console.warn = (...args) => {
  const message = args
    .map((item) => (item?.message ? item.message : String(item)))
    .join(' ')
  if (message.includes('[xgplayer-cast]')) {
    updateDiagnostics({ lastError: message })
  }
  originalConsoleWarn(...args)
}

window.player = new Player({
  id: 'video',
  url: 'https://voddemo-play.volcvod.com/10501b001bdd43ae89d7c0fc3d6792b5/main.m3u8?a=0&auth_key=1869487086-0fbf6e771b6b4ca5aaf4187815b396e0-0-c87d702f2fa10a17b9cc2084f28457d3&br=966&bt=966&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=4&eid=d0be9280a2594aecba9b225bdea2c770&er=0&l=202603302155344543D4879091C2196695&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApOmZkZzg1PGVoNzhkOzxlZ2dfZy9gMHFrYTBgLS1kYy9zcy00L2JfL19eYF42Ly0vYi06Yw%3D%3D&vl=&vr=',
  loop: false,
  autoplay: false,
  autoplayMuted: true,
  preloadTime: 20,
  width: '96%',
  plugins: [HlsJSPlugin, CastPlugin],
  height: 300,
  cast: {
    autoplayOnCast: false,
    chromecast: createChromecastConfig()
  },
  hls: {
    preferMMS: true,
    preferMMSStreaming: true
  }
})

window.player.on('cast_availability_change', ({ protocol, availability }) => {
  updateDiagnostics({ availability: `${protocol}:${availability}` })
})
window.player.on('cast_target_change', ({ protocol, isCasting }) => {
  updateDiagnostics({ target: `${protocol}:${isCasting ? 'casting' : 'idle'}` })
})

function getCastPlugin() {
  return window.player.getPlugin?.('cast') || window.player.plugins?.cast
}

function requestCast(protocol) {
  const plugin = getCastPlugin()
  updateDiagnostics({ lastRequest: `requestCast(${protocol || 'auto'})` })
  try {
    window.castDemoResolveMedia()
  } catch (error) {
    updateDiagnostics({ lastError: error?.message || String(error) })
  }
  plugin?.requestCast?.(protocol)
}

window.castDemoResolveMedia = () => {
  const media = resolveCastMedia(window.player)

  updateDiagnostics({
    lastResolvedMedia: `${media.contentType} ${media.url}`
  })

  return media
}

document.getElementById('btn-cast-auto')?.addEventListener('click', () => requestCast())
document
  .getElementById('btn-cast-airplay')
  ?.addEventListener('click', () => requestCast('airplay'))
document
  .getElementById('btn-cast-chromecast')
  ?.addEventListener('click', () => requestCast('chromecast'))
document
  .getElementById('btn-fake-chromecast-available')
  ?.addEventListener('click', () => {
    window.__fakeChromecast?.setCastState('NOT_CONNECTED')
  })
document.getElementById('btn-fake-chromecast-none')?.addEventListener('click', () => {
  window.__fakeChromecast?.setCastState('NO_DEVICES_AVAILABLE')
})
document.getElementById('btn-fake-chromecast-end')?.addEventListener('click', () => {
  window.__fakeChromecast?.endSession()
})

updateDiagnostics()
