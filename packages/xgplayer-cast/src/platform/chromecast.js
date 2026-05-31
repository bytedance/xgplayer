import { resolveCastMedia } from './cast-media'
import { loadChromecastSdk } from './chromecast-sdk'

export class Chromecast {
  constructor(plugin, config) {
    this.plugin = plugin
    this.player = plugin.player
    this.config = config
    this.castContext = null
    this.session = null
    this._castState = null
    this._isCasting = false
    this._lastLoadedMediaKey = null
    this._pendingMediaKey = null
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

  _mapAutoJoinPolicy(policy) {
    const key = (policy || 'origin_scoped').toUpperCase().replace(/-/g, '_')
    return (
      window.chrome.cast.AutoJoinPolicy?.[key] ??
      window.chrome.cast.AutoJoinPolicy?.ORIGIN_SCOPED
    )
  }

  _onCastStateChanged = ({ castState }) => {
    this._castState = castState
    this.player?.emit('cast_availability_change', {
      protocol: 'chromecast',
      availability:
        castState === window.cast.framework.CastState.NO_DEVICES_AVAILABLE
          ? 'not-available'
          : 'available'
    })
  }

  _onSessionStateChanged = ({ sessionState }) => {
    const { SESSION_STARTED, SESSION_RESUMED, SESSION_ENDED } =
      window.cast.framework.SessionState
    if (sessionState === SESSION_STARTED || sessionState === SESSION_RESUMED) {
      this.session = this.castContext.getCurrentSession()
      this._isCasting = true
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: true
      })
    } else if (sessionState === SESSION_ENDED) {
      this.session = null
      this._isCasting = false
      this._lastLoadedMediaKey = null
      this._pendingMediaKey = null
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: false
      })
    }
  }

  canRequest() {
    const noDevices = window.cast?.framework?.CastState?.NO_DEVICES_AVAILABLE
    return !!this.castContext && this._castState !== noDevices
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

  _onRequestCast = async ({ protocol } = {}) => {
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
      await this._loadCurrentMedia()
    } catch (err) {
      console.warn('[xgplayer-cast] Chromecast cast request failed:', err)
      this._emitError('request_session_failed', err)
    }
  }

  async _loadCurrentMedia({ skipSameMedia = false } = {}) {
    const session = this.session || this.castContext?.getCurrentSession?.()
    if (!session) {
      console.warn('[xgplayer-cast] No Chromecast session for media load')
      this._emitError('session_unavailable', 'No Chromecast session for media load')
      return false
    }

    let castMedia
    try {
      castMedia = resolveCastMedia(this.player)
    } catch (err) {
      console.warn('[xgplayer-cast] Cannot resolve cast media URL:', err.message)
      this._emitError('unsupported_source', err)
      return false
    }

    const { url, contentType } = castMedia
    const mediaKey = `${contentType} ${url}`
    if (
      skipSameMedia &&
      (mediaKey === this._lastLoadedMediaKey || mediaKey === this._pendingMediaKey)
    ) {
      return false
    }

    const mediaInfo = new window.chrome.cast.media.MediaInfo(url, contentType)
    const request = new window.chrome.cast.media.LoadRequest(mediaInfo)
    request.autoplay = !!this.plugin.config.autoplayOnCast

    this._pendingMediaKey = mediaKey
    try {
      await session.loadMedia(request)
      this._lastLoadedMediaKey = mediaKey
    } catch (err) {
      this._emitError('media_load_failed', err, { media: castMedia })
      console.warn('[xgplayer-cast] Chromecast media load failed:', err)
      return false
    } finally {
      if (this._pendingMediaKey === mediaKey) {
        this._pendingMediaKey = null
      }
    }
    return true
  }

  _emitError(code, error, extra = {}) {
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
    this._lastLoadedMediaKey = null
    this._pendingMediaKey = null
    this.player = null
    this.plugin = null
  }
}
