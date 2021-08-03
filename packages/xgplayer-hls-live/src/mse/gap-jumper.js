import { logger } from 'xgplayer-helper-utils'

export class GapJumper {
  _lastCurrentTime = -1

  tryJump (video, maxDelay = 10) {
    if (
      !video ||
      video.paused ||
      video.ended ||
      video.seeking ||
      video.playbackRate === 0 ||
      video.readyState === 0
    ) return

    const currentTime = video.currentTime
    if (this._lastCurrentTime !== currentTime) {
      this._lastCurrentTime = currentTime
      return
    }
    this._lastCurrentTime = currentTime

    const buffered = GapJumper.getBuffered(video)
    if (!buffered.length) return

    const minStart = buffered.end(buffered.length - 1) - maxDelay

    let jumpTo = 0
    if (minStart > currentTime) {
      jumpTo = minStart
    } else {
      let lastEndTime = 0
      for (let i = 0, l = buffered.length; i < l; i++) {
        const startTime = buffered.start(i)
        if (currentTime < startTime && currentTime >= lastEndTime) {
          jumpTo = startTime + 0.1
          break
        }
        lastEndTime = buffered.end(i) - 0.5
      }
    }

    if (jumpTo) {
      logger.warn('GapJumper', `Jump: ${video.currentTime} -> ${jumpTo}`)
      video.currentTime = jumpTo
    }
  }

  static getBuffered (video) {
    try {
      return video.buffered
    } catch (e) {
      return {
        length: 0,
        start: () => 0,
        end: () => 0
      }
    }
  }
}
