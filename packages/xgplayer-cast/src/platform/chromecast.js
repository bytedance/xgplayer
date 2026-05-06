import { loadChromecastSdk } from './chromecast-sdk'
import { resolveCastMedia } from './cast-media'

export class Chromecast {
  constructor(plugin, config) {
    this.plugin = plugin
    this.player = plugin.player
    this.config = config
    this.castContext = null
    this.session = null
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

    // Emit the current cast state immediately so button availability is correct
    // even if no CAST_STATE_CHANGED event fires (e.g. state was already set).
    this._onCastStateChanged({ castState: castContext.getCastState?.() })

    this.castContext = castContext
  }

  _mapAutoJoinPolicy(policy) {
    const key = (policy || 'origin_scoped').toUpperCase().replace(/-/g, '_')
    return (
      window.chrome.cast.AutoJoinPolicy?.[key] ??
      window.chrome.cast.AutoJoinPolicy?.ORIGIN_SCOPED
    )
  }

  _onCastStateChanged = ({ castState }) => {
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
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: true
      })
    } else if (sessionState === SESSION_ENDED) {
      this.session = null
      this.player?.emit('cast_target_change', {
        protocol: 'chromecast',
        isCasting: false
      })
    }
  }

  _onRequestCast = async ({ protocol } = {}) => {
    if (protocol && protocol !== 'chromecast') return

    if (!this.castContext) {
      console.warn('[xgplayer-cast] Chromecast context is not ready')
      return
    }

    try {
      // ⚠️ requestSession() must be called within a user gesture stack on Android Chrome
      await this.castContext.requestSession()

      const session = this.castContext.getCurrentSession()
      if (!session) {
        console.warn('[xgplayer-cast] No Chromecast session after requestSession()')
        return
      }

      let castMedia
      try {
        castMedia = resolveCastMedia(this.player)
      } catch (err) {
        console.warn('[xgplayer-cast] Cannot resolve cast media URL:', err.message)
        return
      }

      const { url, contentType } = castMedia
      const mediaInfo = new window.chrome.cast.media.MediaInfo(url, contentType)
      const request = new window.chrome.cast.media.LoadRequest(mediaInfo)
      request.autoplay = !!this.plugin.config.autoplayOnCast

      await session.loadMedia(request)
    } catch (err) {
      console.warn('[xgplayer-cast] Chromecast cast request failed:', err)
    }
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
    this.player = null
    this.plugin = null
  }
}
