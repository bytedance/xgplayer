import { Buffer } from '../buffer'

export class GapService {
  _prevCurrentTime = 0

  do (media, maxJumpDistance = 3, isLive, seekThreshold = 1) {
    if (!media) return

    const currentTime = media.currentTime
    let jumpTo = 0

    if (this._prevCurrentTime === currentTime) {
      const info = Buffer.info(Buffer.get(media), currentTime)
      if (!info.buffers.length) return
      if (
        (isLive && info.nextStart) ||
        (info.nextStart && info.nextStart - currentTime < maxJumpDistance)
      ) {
        jumpTo = info.nextStart + 0.1
      } else if (info.end && info.end - currentTime > seekThreshold && !media.seeking) {
        jumpTo = currentTime + 0.1
      }
    }

    this._prevCurrentTime = currentTime

    if (jumpTo && currentTime !== jumpTo) {
      media.currentTime = jumpTo
    }
  }
}
