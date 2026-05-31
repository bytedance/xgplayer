import { Util } from 'xgplayer'

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
    this._emitCastingFalseDebounced = Util.debounce(() => {
      const media = this.player?.media || this.player?.video
      const stillWireless = !!media?.webkitCurrentPlaybackTargetIsWireless
      if (!stillWireless) {
        this._emitCastTargetChange(false)
      }
    }, 500)
  }

  install() {
    if (!isAirPlayAvailable(this.player)) {
      return
    }
    const media = this.player.media || this.player.video

    if (media instanceof HTMLMediaElement) {
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

    if (isWireless && /^blob:/.test(video.currentSrc)) {
      // Wireless State: true -> false -> true，有3次状态变化。其中第一次状态变化时，
      // AirPlay 会先用 MSE 作为选中目标，进入 wireless 状态，但这次选中会失败。
      // 应该忽略掉这次状态变化，等待第三次状态变化才真正认为进入了 AirPlay 模式
      return
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

  _onRequestCast = ({ protocol } = {}) => {
    if (protocol && protocol !== 'airplay') return
    if (!isAirPlayAvailable(this.player)) {
      return false
    }

    try {
      const mediaEl = this.player.media || this.player.video
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
  }
}
