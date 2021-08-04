import { logger } from 'xgplayer-helper-utils'
import { getBuffered } from './helper'

export class GapJumper {
  _lastCurrentTime = -1

  tryJump (video, gapDistance = 0.1) {
    if (
      !video ||
      video.paused ||
      video.ended ||
      video.playbackRate === 0 ||
      video.readyState === 0
    ) return

    const currentTime = video.currentTime

    if (this._lastCurrentTime !== currentTime) {
      this._lastCurrentTime = currentTime
      return
    }

    const buffered = getBuffered(video)

    if (!buffered.length) return

    let jumpTo = 0
    let lastEndTime = 0
    for (let i = 0, l = buffered.length; i < l; i++) {
      const startTime = buffered.start(i)
      if (currentTime < startTime && currentTime >= lastEndTime) {
        jumpTo = startTime + 0.1
        break
      }
      lastEndTime = buffered.end(i) - 0.5
    }

    if (!jumpTo) {
      const endTime = buffered.end(buffered.length - 1)
      if (endTime > currentTime) {
        jumpTo = Math.min(currentTime + gapDistance, endTime)
      }
    }

    if (jumpTo) {
      logger.warn('GapJumper', `Jump: ${video.currentTime} -> ${jumpTo}`)
      video.currentTime = jumpTo
    }
  }
}
