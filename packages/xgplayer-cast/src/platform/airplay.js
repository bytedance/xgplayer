import { Util } from 'xgplayer'
import {
  applyRouteStateToLocal,
  captureLocalStateForCast,
  getLocalTime,
  toNonNegativeTime
} from './cast-handoff-state'
import { resolveCastMedia } from './cast-media'

const AIRPLAY_ROUTE_SETTLE_DELAY_MS = 1000

export function isAirPlayAvailable(player) {
  const video = player?.media || player?.video

  if (!video) {
    return false
  }

  return (
    typeof video.webkitShowPlaybackTargetPicker === 'function' &&
    typeof WebKitPlaybackTargetAvailabilityEvent === 'function'
  )
}

export class Airplay {
  constructor(plugin) {
    this.plugin = plugin
    this.player = plugin.player
    this._lastCastingState = null
    this._airplaySourceEl = null
    this._airplayMedia = null
    this._handoffState = null
    this._nativeHandoffActive = false
    this._emitCastingFalseDebounced = Util.debounce(async () => {
      const media = this.player?.media || this.player?.video
      const stillWireless = !!media?.webkitCurrentPlaybackTargetIsWireless
      if (!stillWireless) {
        await this._restoreNativeHandoff()
        this._emitCastTargetChange(false)
      }
    }, AIRPLAY_ROUTE_SETTLE_DELAY_MS)
  }

  install() {
    if (!isAirPlayAvailable(this.player)) {
      return
    }
    const media = this.player.media || this.player.video

    if (media instanceof HTMLMediaElement) {
      media.setAttribute('x-webkit-airplay', 'allow')
      media.addEventListener(
        'webkitplaybacktargetavailabilitychanged',
        this._onTargetAvailabilityChange
      )
      media.addEventListener(
        'webkitcurrentplaybacktargetiswirelesschanged',
        this._onTargetChange
      )
    }

    this.player.on('cast_request', this._onRequestCast)
  }

  /**
   * @private
   */
  _onTargetAvailabilityChange = (e) => {
    this.player.emit('cast_availability_change', {
      protocol: 'airplay',
      availability: e.availability
    })
  }

  /**
   * @private
   */
  _onTargetChange = () => {
    const video = this.player.media || this.player.video
    const isWireless = !!video.webkitCurrentPlaybackTargetIsWireless

    if (isWireless && this._hasMSESource(video)) {
      // MSE/MMS sources are sender-local. Switch only after WebKit confirms a
      // remote route so opening the picker does not disturb local playback.
      if (!this._activateNativeSource(video)) {
        return
      }
    }

    // Route changes may briefly bounce false during AirPlay handover.
    // Emit true immediately, but confirm false after a short settle window.
    if (isWireless) {
      this._emitCastingFalseDebounced.cancel()
      this._emitCastTargetChange(true)
      return
    }

    this._emitCastingFalseDebounced()
  }

  _prepareNativeSource(mediaEl) {
    const castMedia = this._resolveAirPlayMedia()
    if (!castMedia) {
      return false
    }

    this._airplayMedia = castMedia
    this._allowRemotePlayback(mediaEl)
    this._installAirPlaySource(mediaEl, castMedia)
    return true
  }

  _activateNativeSource(mediaEl) {
    const castMedia = this._airplayMedia || this._resolveAirPlayMedia()
    if (!castMedia) {
      return false
    }

    if (this._nativeHandoffActive && this._isNativeSourceApplied(mediaEl, castMedia)) {
      return true
    }

    const currentTime = this._getHandoffCurrentTime(mediaEl)

    this.plugin?._suspendMSEPlugin?.()
    this._nativeHandoffActive = true
    this._applyNativeSource(mediaEl, castMedia)
    mediaEl.addEventListener(
      'loadedmetadata',
      () => {
        if (currentTime > 0 && Number.isFinite(mediaEl.duration)) {
          try {
            mediaEl.currentTime = Math.min(currentTime, mediaEl.duration)
          } catch {
            // ignore seek failures while Safari is switching AirPlay routes
          }
        }
      },
      { once: true }
    )

    return true
  }

  async _restoreNativeHandoff() {
    this._handoffState = null
    if (!this._nativeHandoffActive) {
      return false
    }

    const routeState = captureLocalStateForCast(this.player, 'airplay')
    this._nativeHandoffActive = false
    this._airplayMedia = null
    try {
      await this.plugin?._resumeMSEPlugin?.()
    } catch (error) {
      console.warn('Failed to restore streaming plugin after AirPlay:', error)
    }
    return this._applyRouteStateToLocal(routeState)
  }

  _resolveAirPlayMedia() {
    let castMedia
    try {
      castMedia = resolveCastMedia(this.player, { protocol: 'airplay' })
    } catch (err) {
      console.warn('[xgplayer-cast] Cannot resolve AirPlay media URL:', err.message)
      return null
    }

    if (!castMedia?.url || /^blob:/i.test(castMedia.url)) {
      console.warn('[xgplayer-cast] AirPlay requires a receiver-readable media URL')
      return null
    }

    return castMedia
  }

  _applyNativeSource(mediaEl, castMedia) {
    this._clearMSESource(mediaEl)
    this._installAirPlaySource(mediaEl, castMedia)
    if (mediaEl.getAttribute?.('src') !== castMedia.url) {
      mediaEl.src = castMedia.url
    }
    this._allowRemotePlayback(mediaEl)

    try {
      mediaEl.load?.()
    } catch {
      // Some test environments do not implement HTMLMediaElement.load().
    }
  }

  _isNativeSourceApplied(mediaEl, castMedia) {
    const mediaSrc = mediaEl.getAttribute?.('src') || mediaEl.src || ''
    const source = mediaEl.querySelector?.('source[data-xgplayer-cast-airplay="true"]')
    const sourceSrc = source?.getAttribute('src') || source?.src || ''

    return (
      mediaSrc === castMedia.url &&
      sourceSrc === castMedia.url &&
      !mediaEl.srcObject &&
      !mediaEl.disableRemotePlayback &&
      !this._hasAttachedLocalSource(mediaEl)
    )
  }

  _needsNativeSource(mediaEl) {
    if (this._hasMSESource(mediaEl)) {
      return true
    }

    const currentSrc = mediaEl.currentSrc || mediaEl.src
    if (!currentSrc && this._hasActiveStreamingPlugin()) {
      return true
    }

    return false
  }

  _hasMSESource(mediaEl) {
    const currentSrc = mediaEl.currentSrc || mediaEl.src
    if (/^blob:/i.test(currentSrc)) {
      return true
    }

    if (mediaEl.srcObject) {
      return true
    }

    return this._getSourceElements(mediaEl).some((source) =>
      /^blob:/i.test(source.getAttribute('src') || source.src || '')
    )
  }

  _getHandoffCurrentTime(mediaEl) {
    const mediaCurrentTime = toNonNegativeTime(mediaEl?.currentTime)
    if (mediaCurrentTime !== null) {
      return mediaCurrentTime
    }

    const requestCurrentTime = toNonNegativeTime(this._handoffState?.currentTime)
    return requestCurrentTime !== null ? requestCurrentTime : getLocalTime(this.player)
  }

  _hasAttachedLocalSource(mediaEl) {
    if (mediaEl.srcObject) {
      return true
    }

    const attachedSrc = mediaEl.getAttribute?.('src') || mediaEl.src || ''
    if (/^blob:/i.test(attachedSrc)) {
      return true
    }

    return this._getSourceElements(mediaEl).some((source) =>
      /^blob:/i.test(source.getAttribute('src') || source.src || '')
    )
  }

  async _applyRouteStateToLocal(routeState) {
    try {
      return await applyRouteStateToLocal(this.player, routeState)
    } catch (error) {
      console.warn('Failed to restore local playback after AirPlay:', error)
      return false
    }
  }

  _hasActiveStreamingPlugin() {
    return Object.values(this.player?.plugins ?? {}).some(
      (plugin) => plugin?.constructor?.isStreamingPlugin === true
    )
  }

  _getSourceElements(mediaEl) {
    return Array.from(mediaEl.querySelectorAll?.('source') || [])
  }

  _allowRemotePlayback(mediaEl) {
    mediaEl.removeAttribute('disableRemotePlayback')
    if ('disableRemotePlayback' in mediaEl) {
      mediaEl.disableRemotePlayback = false
    }
    if ('webkitWirelessVideoPlaybackDisabled' in mediaEl) {
      mediaEl.webkitWirelessVideoPlaybackDisabled = false
    }
  }

  _clearMSESource(mediaEl) {
    this._allowRemotePlayback(mediaEl)

    try {
      if ('srcObject' in mediaEl && mediaEl.srcObject) {
        mediaEl.srcObject = null
      }
    } catch {
      // ignore srcObject cleanup failures while Safari is detaching MMS
    }

    if (/^blob:/i.test(mediaEl.getAttribute?.('src') || mediaEl.src || '')) {
      mediaEl.removeAttribute('src')
    }

    this._getSourceElements(mediaEl).forEach((source) => {
      const src = source.getAttribute('src') || source.src || ''
      if (/^blob:/i.test(src)) {
        source.remove()
      }
    })
  }

  _installAirPlaySource(mediaEl, castMedia) {
    const url = castMedia?.url
    if (!url || !mediaEl?.appendChild) {
      return
    }

    let source = this._airplaySourceEl
    if (!source || source.parentNode !== mediaEl) {
      source =
        mediaEl.querySelector?.('source[data-xgplayer-cast-airplay="true"]') ||
        document.createElement('source')
      source.setAttribute('data-xgplayer-cast-airplay', 'true')
      mediaEl.appendChild(source)
      this._airplaySourceEl = source
    }

    source.setAttribute('src', url)
    const type = this._getAirPlayContentType(castMedia.contentType)
    if (type) {
      source.setAttribute('type', type)
    } else {
      source.removeAttribute('type')
    }
  }

  _getAirPlayContentType(contentType) {
    if (typeof contentType !== 'string') {
      return ''
    }
    if (/mpegurl/i.test(contentType)) {
      return 'application/vnd.apple.mpegurl'
    }
    return contentType
  }

  _emitCastTargetChange(isCasting) {
    if (this._lastCastingState === isCasting) {
      return
    }
    this._lastCastingState = isCasting

    this.player.emit('cast_target_change', {
      protocol: 'airplay',
      isCasting
    })
  }

  canRequest() {
    return isAirPlayAvailable(this.player)
  }

  _onRequestCast = ({ protocol, handoffState } = {}) => {
    if (protocol && protocol !== 'airplay') return
    if (!isAirPlayAvailable(this.player)) {
      return false
    }

    try {
      const mediaEl = this.player.media || this.player.video
      this._handoffState = handoffState || null
      const wasMuted = mediaEl.muted

      // WebKit 的 AirPlay 实现中，静音的Media元素会被认为不需要音频输出设备，系统因此认为没有必要将其路由到外部播放目标
      // 具体见：https://bugs.webkit.org/show_bug.cgi?id=146366
      if (wasMuted) {
        // 这里如果取消静音，可能会涉及用户隐私，谨慎操作
        // video.muted = false;

        this._gcTip()

        // 展示UI提示，告知用户需要取消静音才能投屏
        const tip = document.createElement('div')
        tip.className = 'xgplayer-cast-muted-tip'
        tip.innerText = this.player.i18n.CAST_UNMUTE_TIP
        this.player.root.appendChild(tip)
        this._tipDom = tip

        this._tipTimeout = setTimeout(() => {
          this._gcTip()
        }, 3000)
        return
      }

      if (typeof mediaEl.webkitShowPlaybackTargetPicker === 'function') {
        this._allowRemotePlayback(mediaEl)
        const needsNativeSource = this._needsNativeSource(mediaEl)
        if (needsNativeSource && !this._prepareNativeSource(mediaEl)) {
          return false
        }
        mediaEl.webkitShowPlaybackTargetPicker()
      }
    } catch {
      // ignore
    }
  }

  _gcTip() {
    if (this._tipTimeout) {
      clearTimeout(this._tipTimeout)
      this._tipTimeout = null
    }
    if (this._tipDom) {
      const tipDom = this._tipDom
      if (tipDom.parentNode) {
        tipDom.parentNode.removeChild(tipDom)
      }
      this._tipDom = null
    }
  }

  destroy() {
    if (!this.player) {
      return
    }
    this._gcTip()
    this._emitCastingFalseDebounced?.cancel?.()
    this._emitCastingFalseDebounced = null

    const media = this.player.media || this.player.video
    if (media instanceof HTMLMediaElement) {
      media.removeEventListener(
        'webkitplaybacktargetavailabilitychanged',
        this._onTargetAvailabilityChange
      )
      media.removeEventListener(
        'webkitcurrentplaybacktargetiswirelesschanged',
        this._onTargetChange
      )
    }
    this.player.off('cast_request', this._onRequestCast)
    this.player = null
    this.plugin = null
    this._lastCastingState = null
    this._airplaySourceEl = null
    this._airplayMedia = null
    this._handoffState = null
    this._nativeHandoffActive = false
  }
}
