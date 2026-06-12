import type {
  CastMediaInfo,
  CastPlayer,
  CastPluginLike,
  CastRouteState,
  ChromecastConfig
} from '../types'
import {
  applyRouteStateToLocal,
  getConfiguredCastAutoplay,
  getLocalTimeOrNull,
  isLocalPaused,
  toNonNegativeTime
} from './cast-handoff-state'
import { resolveCastMedia } from './cast-media'
import { ChromecastRemoteController } from './chromecast-remote-controller'
import { loadChromecastSdk } from './chromecast-sdk'

const MEDIA_INFO_FIELDS = [
  'contentUrl',
  'streamType',
  'duration',
  'metadata',
  'customData',
  'hlsSegmentFormat',
  'hlsVideoSegmentFormat'
]

interface ChromecastMediaIdentity {
  key: string
  url: string
}

function getMediaIdentity(castMedia: CastMediaInfo): ChromecastMediaIdentity {
  const { url, contentType } = castMedia
  return {
    url,
    key: JSON.stringify({
      url,
      contentType,
      contentUrl: castMedia.contentUrl,
      hlsSegmentFormat: castMedia.hlsSegmentFormat,
      hlsVideoSegmentFormat: castMedia.hlsVideoSegmentFormat
    })
  }
}

export class Chromecast {
  plugin: CastPluginLike | null
  player: CastPlayer | null
  config: ChromecastConfig
  castContext: any
  session: any
  _castState: string | null
  _isCasting: boolean
  _loadedMedia: ChromecastMediaIdentity | null
  _pendingMedia: ChromecastMediaIdentity | null
  _lastLoadAutoplay: boolean
  _pendingLocalRestoreState: CastRouteState | null
  remoteController: ChromecastRemoteController | null

  constructor(plugin: CastPluginLike, config: ChromecastConfig) {
    this.plugin = plugin
    this.player = plugin.player
    this.config = config
    this.castContext = null
    this.session = null
    this._castState = null
    this._isCasting = false
    this._loadedMedia = null
    this._pendingMedia = null
    this._lastLoadAutoplay = false
    this._pendingLocalRestoreState = null
    this.remoteController = new ChromecastRemoteController(this.player)
  }

  async install() {
    try {
      await loadChromecastSdk(this.config)
      // Guard: destroy() may have been called during the async SDK load
      if (!this.player) return
      if (!window.cast?.framework || !window.chrome?.cast) {
        throw new Error('Chromecast sender sdk is not ready')
      }
      this._initCastContext()
      this.remoteController.install()
      this.player.on('cast_request', this._onRequestCast)
    } catch (error) {
      console.warn('[xgplayer-cast] chromecast install failed:', error)
      this._emitError('sdk_load_failed', error)
      this.player?.emit('cast_availability_change', {
        protocol: 'chromecast',
        availability: 'not-available'
      })
    }
  }

  _initCastContext() {
    const castContext = window.cast.framework.CastContext.getInstance()

    // Register listeners before setOptions so we don't miss the synchronous
    // CAST_STATE_CHANGED that CAF may fire during initialization.
    castContext.addEventListener(
      window.cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this._onCastStateChanged
    )
    castContext.addEventListener(
      window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      this._onSessionStateChanged
    )

    castContext.setOptions({
      receiverApplicationId:
        this.config.receiverApplicationId ||
        window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: this._mapAutoJoinPolicy(this.config.autoJoinPolicy)
    })

    this.castContext = castContext

    // Emit the current cast state immediately so button availability is correct
    // even if no CAST_STATE_CHANGED event fires (e.g. state was already set).
    this._onCastStateChanged({ castState: castContext.getCastState?.() })
  }

  _mapAutoJoinPolicy(policy: string) {
    const key = (policy || 'origin_scoped').toUpperCase().replace(/-/g, '_')
    return (
      window.chrome.cast.AutoJoinPolicy?.[key] ??
      window.chrome.cast.AutoJoinPolicy?.ORIGIN_SCOPED
    )
  }

  _getCastAvailability(castState: string | null) {
    const states = window.cast?.framework?.CastState || {}
    if (
      !castState ||
      castState === states.NO_DEVICES_AVAILABLE ||
      castState === 'NO_DEVICES_AVAILABLE'
    ) {
      return 'not-available'
    }

    const availableStates = [
      states.NOT_CONNECTED,
      states.CONNECTING,
      states.CONNECTED,
      'NOT_CONNECTED',
      'CONNECTING',
      'CONNECTED'
    ]
    return availableStates.includes(castState) ? 'available' : 'not-available'
  }

  _onCastStateChanged = ({ castState }: { castState?: string | null } = {}) => {
    this._castState = castState
    this.player?.emit('cast_availability_change', {
      protocol: 'chromecast',
      availability: this._getCastAvailability(castState)
    })
  }

  _onSessionStateChanged = async ({ sessionState }: { sessionState?: string } = {}) => {
    const {
      SESSION_STARTED,
      SESSION_RESUMED,
      SESSION_ENDED,
      SESSION_ENDING,
      SESSION_START_FAILED,
      SESSION_RESUME_FAILED
    } = window.cast.framework.SessionState
    if (sessionState === SESSION_STARTED || sessionState === SESSION_RESUMED) {
      const session = this.castContext?.getCurrentSession?.()
      if (!session) {
        this.session = null
        this._isCasting = false
        this._resetRemoteLoadState()
        this._emitError(
          'session_unavailable',
          'No Chromecast session after session state changed'
        )
        return
      }

      this.session = session
      this._isCasting = true
      this.remoteController.emitState()
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: true
      })
    } else if (sessionState === SESSION_ENDING) {
      this._pendingLocalRestoreState = this._captureRemoteStateForLocal()
    } else if (
      sessionState &&
      [SESSION_ENDED, SESSION_START_FAILED, SESSION_RESUME_FAILED]
        .filter(Boolean)
        .includes(sessionState)
    ) {
      const restoreState =
        sessionState === SESSION_ENDED
          ? this._pendingLocalRestoreState || this._captureRemoteStateForLocal()
          : null
      this.session = null
      this._isCasting = false
      this._resetRemoteLoadState()
      this._pendingLocalRestoreState = null
      if (restoreState) {
        await this._applyRemoteStateToLocal(restoreState)
      }
      this.remoteController.reset()
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: false
      })
    }
  }

  canRequest() {
    return (
      !!this.castContext && this._getCastAvailability(this._castState) === 'available'
    )
  }

  isCasting() {
    return this._isCasting
  }

  async reloadMedia() {
    if (!this.isCasting()) {
      return false
    }

    try {
      return await this._loadCurrentMedia({ skipSameMedia: true })
    } catch (err) {
      console.warn('[xgplayer-cast] Chromecast media reload failed:', err)
      this._emitError('media_reload_failed', err)
      return false
    }
  }

  _onRequestCast = async ({
    protocol,
    autoplay,
    handoffState
  }: {
    protocol?: string
    autoplay?: boolean
    handoffState?: CastRouteState
  } = {}) => {
    if (protocol && protocol !== 'chromecast') return

    if (!this.castContext) {
      console.warn('[xgplayer-cast] Chromecast context is not ready')
      this._emitError('context_not_ready', 'Chromecast context is not ready')
      return
    }

    try {
      // ⚠️ requestSession() must be called within a user gesture stack on Android Chrome
      await this.castContext.requestSession()

      const session = this.castContext.getCurrentSession()
      if (!session) {
        console.warn('[xgplayer-cast] No Chromecast session after requestSession()')
        this._emitError(
          'session_unavailable',
          'No Chromecast session after requestSession()'
        )
        return
      }

      this.session = session
      this._isCasting = true
      await this._loadCurrentMedia({
        autoplay: this._resolveInitialAutoplay(autoplay),
        currentTime: this._resolveInitialCurrentTime(handoffState)
      })
    } catch (err) {
      console.warn('[xgplayer-cast] Chromecast cast request failed:', err)
      this._emitError('request_session_failed', err)
    }
  }

  async _loadCurrentMedia({
    skipSameMedia = false,
    autoplay,
    currentTime
  }: {
    skipSameMedia?: boolean
    autoplay?: boolean
    currentTime?: unknown
  } = {}) {
    const session = this.session || this.castContext?.getCurrentSession?.()
    if (!session) {
      console.warn('[xgplayer-cast] No Chromecast session for media load')
      this._emitError('session_unavailable', 'No Chromecast session for media load')
      return false
    }

    let castMedia: CastMediaInfo
    try {
      castMedia = resolveCastMedia(this.player)
    } catch (err) {
      console.warn('[xgplayer-cast] Cannot resolve cast media URL:', err.message)
      this._emitError('unsupported_source', err)
      return false
    }

    const { url, contentType } = castMedia
    const mediaIdentity = getMediaIdentity(castMedia)
    if (skipSameMedia && this._isSameMediaIdentity(mediaIdentity)) {
      return false
    }

    const mediaInfo = new window.chrome.cast.media.MediaInfo(url, contentType)
    MEDIA_INFO_FIELDS.forEach((field) => {
      if (castMedia[field] !== undefined) {
        mediaInfo[field] = castMedia[field]
      }
    })
    const request = new window.chrome.cast.media.LoadRequest(mediaInfo)
    request.autoplay = this._resolveLoadAutoplay(autoplay)
    const resolvedCurrentTime = this._resolveLoadCurrentTime(currentTime, mediaIdentity)
    if (resolvedCurrentTime > 0) {
      request.currentTime = resolvedCurrentTime
    }

    this._pendingMedia = mediaIdentity
    const localMediaState = this._pauseLocalForRemoteLoad()
    try {
      await session.loadMedia(request)
      this._loadedMedia = mediaIdentity
      this._lastLoadAutoplay = request.autoplay
      this.remoteController.emitState()
    } catch (err) {
      await this._resumeLocalAfterRemoteLoadError(localMediaState)
      this._emitError('media_load_failed', err, { media: castMedia })
      console.warn('[xgplayer-cast] Chromecast media load failed:', err)
      return false
    } finally {
      if (this._pendingMedia?.key === mediaIdentity.key) {
        this._pendingMedia = null
      }
    }
    return true
  }

  _resolveInitialAutoplay(autoplay?: boolean) {
    if (typeof autoplay === 'boolean') {
      return autoplay
    }

    const configuredAutoplay = getConfiguredCastAutoplay(this.plugin?.config)
    if (configuredAutoplay !== undefined) {
      return configuredAutoplay
    }

    return !isLocalPaused(this.player)
  }

  _resolveInitialCurrentTime(handoffState?: CastRouteState) {
    const localCurrentTime = getLocalTimeOrNull(this.player)
    if (localCurrentTime !== null) {
      return localCurrentTime
    }

    const requestCurrentTime = toNonNegativeTime(handoffState?.currentTime)
    return requestCurrentTime !== null ? requestCurrentTime : 0
  }

  _resolveLoadAutoplay(autoplay?: boolean) {
    if (typeof autoplay === 'boolean') {
      return autoplay
    }

    const configuredAutoplay = getConfiguredCastAutoplay(this.plugin?.config)
    if (configuredAutoplay !== undefined) {
      return configuredAutoplay
    }

    const remoteState = this.remoteController?.getState?.()
    if (remoteState?.available && remoteState.mediaLoaded) {
      return !remoteState.paused
    }

    return this._lastLoadAutoplay
  }

  _isSameMediaIdentity(media: ChromecastMediaIdentity) {
    return media.key === this._loadedMedia?.key || media.key === this._pendingMedia?.key
  }

  _resolveLoadCurrentTime(currentTime: unknown, media: ChromecastMediaIdentity) {
    const requestCurrentTime = toNonNegativeTime(currentTime)
    if (requestCurrentTime !== null) {
      return requestCurrentTime
    }

    const remoteState = this.remoteController?.getState?.()
    if (
      this._canReuseRemoteTime(media, remoteState) &&
      remoteState?.available &&
      remoteState.mediaLoaded
    ) {
      return toNonNegativeTime(remoteState.currentTime)
    }

    return null
  }

  _canReuseRemoteTime(media: ChromecastMediaIdentity, remoteState?: any) {
    if (media.url === this._loadedMedia?.url || media.url === this._pendingMedia?.url) {
      return true
    }

    return !this._loadedMedia && remoteState?.contentId === media.url
  }

  _resetRemoteLoadState() {
    this._loadedMedia = null
    this._pendingMedia = null
    this._lastLoadAutoplay = false
  }

  _captureRemoteStateForLocal(): CastRouteState | null {
    const remoteState = this.remoteController?.getState?.()
    if (!remoteState?.available || !remoteState.mediaLoaded) {
      return null
    }

    const currentTime = toNonNegativeTime(remoteState.currentTime)
    return {
      protocol: 'chromecast',
      paused: !!remoteState.paused,
      currentTime: currentTime ?? 0
    }
  }

  async _applyRemoteStateToLocal(remoteState: CastRouteState | null) {
    if (!remoteState) {
      return false
    }

    try {
      return await applyRouteStateToLocal(this.player, remoteState)
    } catch (error) {
      console.warn('Failed to restore local playback after Chromecast:', error)
      return false
    }
  }

  _pauseLocalForRemoteLoad() {
    if (isLocalPaused(this.player)) {
      return null
    }

    try {
      this.player?.pause?.()
      return { paused: false }
    } catch (error) {
      console.warn('Failed to pause local media before Chromecast load:', error)
    }

    return null
  }

  async _resumeLocalAfterRemoteLoadError(localMediaState: { paused: boolean } | null) {
    if (!localMediaState || localMediaState.paused) {
      return false
    }

    try {
      await this.player?.play?.()
      return true
    } catch (error) {
      console.warn('Failed to resume local media after Chromecast load failed:', error)
    }

    return false
  }

  getRemoteState() {
    return this.remoteController?.getState?.() || null
  }

  controlRemote(action: string, payload?: any) {
    return this.remoteController?.control?.(action, payload) || false
  }

  _emitError(code: string, error: any, extra = {}) {
    const message = error?.message || String(error || code)
    this.player?.emit('cast_error', {
      protocol: 'chromecast',
      code,
      message,
      error,
      ...extra
    })
  }

  destroy() {
    this.player?.off?.('cast_request', this._onRequestCast)
    if (this.castContext) {
      this.castContext.removeEventListener?.(
        window.cast?.framework?.CastContextEventType?.CAST_STATE_CHANGED,
        this._onCastStateChanged
      )
      this.castContext.removeEventListener?.(
        window.cast?.framework?.CastContextEventType?.SESSION_STATE_CHANGED,
        this._onSessionStateChanged
      )
    }
    this.castContext = null
    this.session = null
    this._castState = null
    this._isCasting = false
    this._resetRemoteLoadState()
    this._pendingLocalRestoreState = null
    this.remoteController?.destroy()
    this.remoteController = null
    this.player = null
    this.plugin = null
  }
}
