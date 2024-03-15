import BasePlugin, { Events } from '../../plugin'

/**
 * @typedef { {
 *   tick?: number,
 *   stuckCount?: number,
 *   disable?: boolean,
 *   reportFrame?: number
 * } } IFullscreenConfig
 */
export default class FpsDetect extends BasePlugin {
  static get pluginName () {
    return 'FpsDetect'
  }

  static get defaultConfig () {
    return {
      disabled: false,
      tick: 1000, // tick时间，默认1000 ms
      stuckCount: 3, // 卡住次数
      reportFrame: 0 // 每次解码帧率小于多少时统计
    }
  }

  afterCreate () {
    const { player, config } = this
    const media = player.media || player.video
    this.timer = null
    this._lastDecodedFrames = 0
    this._currentStuckCount = 0
    this._lastCheckPoint = null
    this._payload = []
    if (config.disabled) return
    const getVideoPlaybackQuality = media.getVideoPlaybackQuality
    if (!getVideoPlaybackQuality) return
    this.on(Events.PLAY, () => {
      this._startTick()
    })

    this.on(Events.PAUSE, () => {
      this._stopTick()
    })

    this.on(Events.ENDED, () => {
      this._stopTick()
    })

    this.on(Events.EMPTIED, () => {
      this._stopTick()
    })
  }

  _startTick () {
    this._stopTick()
    this._timer = setTimeout(() => {
      this._checkDecodeFPS()
      this._startTick()
    }, this.config.tick)
  }

  _stopTick () {
    clearTimeout(this._timer)
    this._timer = null
  }

  _checkBuffer (curTime, buffered) {
    let enoughBuffer = false
    const buffers = []
    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i)
      const end = buffered.end(i)
      buffers.push({ start, end })
      if (start <= curTime && curTime <= end - 1) {
        enoughBuffer = true
        break
      }
    }
    return {
      enoughBuffer,
      buffers
    }
  }

  _checkStuck (curDecodedFrames, totalVideoFrames, droppedVideoFrames, checkInterval) {
    const media = this.player.media || this.player.video
    const hidden = document.hidden
    const { paused, readyState, currentTime, buffered } = media

    if (hidden || paused || readyState < 4) {
      return
    }
    const { enoughBuffer, buffers } = this._checkBuffer(currentTime, buffered)
    if (!enoughBuffer) {
      return
    }

    if (curDecodedFrames <= this.config.reportFrame) {
      this._currentStuckCount++
      this._payload.push({ currentTime, buffers, curDecodedFrames, totalVideoFrames, droppedVideoFrames, checkInterval })

      if (this._currentStuckCount >= this.config.stuckCount) {
        this.emit(Events.FPS_STUCK, this._payload)
        this._reset()
      }
    } else {
      this._reset()
    }
  }

  _reset () {
    this._payload = []
    this._currentStuckCount = 0
  }

  _checkDecodeFPS () {
    const media = this.player.media || this.player.video
    if (!media) {
      return
    }
    const { totalVideoFrames, droppedVideoFrames } = media.getVideoPlaybackQuality()

    const currTime = performance.now()
    if (totalVideoFrames) {
      if (this._lastCheckPoint) {
        const curDecoded = totalVideoFrames - this._lastDecodedFrames
        const checkInterval = currTime - this._lastCheckPoint
        this._checkStuck(curDecoded, totalVideoFrames, droppedVideoFrames, checkInterval)
      }
    }
    this._lastDecodedFrames = totalVideoFrames
    this._lastCheckPoint = currTime
  }

  destroy () {
    this._stopTick()
  }
}
