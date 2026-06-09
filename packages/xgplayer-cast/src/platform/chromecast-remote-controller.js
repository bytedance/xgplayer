const REMOTE_EVENT = 'cast_remote_state_change'

function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export class ChromecastRemoteController {
  constructor(player) {
    this.player = player
    this.remotePlayer = null
    this.controller = null
    this._eventType = null
    this._lastState = null
  }

  install() {
    const framework = window.cast?.framework
    if (
      !framework?.RemotePlayer ||
      !framework?.RemotePlayerController ||
      this.controller
    ) {
      return false
    }

    this.remotePlayer = new framework.RemotePlayer()
    this.controller = new framework.RemotePlayerController(this.remotePlayer)
    this._eventType = framework.RemotePlayerEventType?.ANY_CHANGE || 'ANY_CHANGE'
    this.controller.addEventListener?.(this._eventType, this._onRemoteChange)
    this.emitState()
    return true
  }

  isAvailable() {
    return !!this.controller
  }

  getState() {
    const remote = this.remotePlayer
    if (!remote) {
      return {
        protocol: 'chromecast',
        available: false,
        connected: false,
        mediaLoaded: false
      }
    }

    const mediaInfo = remote.mediaInfo || null
    const metadata = mediaInfo?.metadata || null
    return {
      protocol: 'chromecast',
      available: true,
      connected: !!remote.isConnected,
      mediaLoaded: !!remote.isMediaLoaded,
      playerState: remote.playerState || '',
      paused: !!remote.isPaused,
      currentTime: toNumber(remote.currentTime),
      duration: toNumber(remote.duration),
      volume: toNumber(remote.volumeLevel, 1),
      muted: !!remote.isMuted,
      title: metadata?.title || '',
      contentId: mediaInfo?.contentId || ''
    }
  }

  emitState() {
    const state = this.getState()
    this._lastState = state
    this.player?.emit?.(REMOTE_EVENT, state)
    return state
  }

  reset() {
    if (this.remotePlayer) {
      this.remotePlayer.isConnected = false
      this.remotePlayer.isMediaLoaded = false
      this.remotePlayer.playerState = ''
      this.remotePlayer.isPaused = true
    }
    this._lastState = null
    this.emitState()
  }

  play() {
    if (!this.controller || !this.remotePlayer?.isPaused) {
      return false
    }
    this.controller.playOrPause?.()
    return true
  }

  pause() {
    if (!this.controller || this.remotePlayer?.isPaused) {
      return false
    }
    this.controller.playOrPause?.()
    return true
  }

  togglePlay() {
    if (!this.controller) {
      return false
    }
    this.controller.playOrPause?.()
    return true
  }

  seek(time) {
    if (!this.controller || !Number.isFinite(Number(time))) {
      return false
    }
    this.remotePlayer.currentTime = Math.max(0, Number(time))
    this.controller.seek?.()
    return true
  }

  stop() {
    if (!this.controller) {
      return false
    }
    this.controller.stop?.()
    return true
  }

  setVolume(volume) {
    if (!this.controller || !Number.isFinite(Number(volume))) {
      return false
    }
    this.remotePlayer.volumeLevel = clamp(Number(volume), 0, 1)
    this.controller.setVolumeLevel?.()
    return true
  }

  mute(muted = true) {
    if (!this.controller || this.remotePlayer?.isMuted === !!muted) {
      return false
    }
    this.controller.muteOrUnmute?.()
    return true
  }

  control(action, payload) {
    switch (action) {
      case 'play':
        return this.play()
      case 'pause':
        return this.pause()
      case 'toggle':
      case 'togglePlay':
        return this.togglePlay()
      case 'seek':
        return this.seek(payload?.time ?? payload)
      case 'stop':
        return this.stop()
      case 'setVolume':
        return this.setVolume(payload?.volume ?? payload)
      case 'mute':
        return this.mute(payload?.muted ?? true)
      case 'unmute':
        return this.mute(false)
      default:
        return false
    }
  }

  _onRemoteChange = () => {
    this.emitState()
  }

  destroy() {
    this.controller?.removeEventListener?.(this._eventType, this._onRemoteChange)
    this.remotePlayer = null
    this.controller = null
    this._eventType = null
    this._lastState = null
    this.player = null
  }
}
