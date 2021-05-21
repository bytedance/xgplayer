import { logger } from 'xgplayer-helper-utils'

const DISCARD_THRESHOLD = -100
export default class FrameQueue {
  constructor (parent) {
    this.TAG = 'FrameQueue'
    this._parent = parent
    this._lastGopId = 0
    this._frames = []
    this._byteSize = 0
  }

  get currentTimeDts () {
    return this._parent.preciseVideoDts
  }

  get length () {
    return this._frames.length
  }
  get frames () {
    return this._frames
  }
  append (frame) {
    if (!frame.info) return
    const { dts, isGop, gopId } = frame.info
    if (gopId && gopId < this._lastGopId && dts < this.currentTimeDts) {
      return
    }
    if (isGop) {
      this._lastGopId = gopId
    }
    this._frames.push(frame)
    this._frames.sort((a, b) => (a.info.dts > b.info.dts ? 1 : -1))
    this._byteSize += frame.buffer
  }

  appendVodFrame (frame) {
    this._frames.push(frame)
  }

  nextFrame () {
    // 低延迟 删掉多余的帧
    let len = this._frames.length
    if (this._parent.noAudio === 1 && len > 3) {
      this._frames = this._frames.slice(len - 2)
    }
    return this._frames[0]
  }

  shift (preciseVideoDts = 0) {
    let next = this.nextFrame()

    if (next && next.gopId && this._lastGopId && next.gopId < this._lastGopId) {
      // 过滤 上一个 gop的
      this._frames = this._frames.filter((x) => x.gopId >= this._lastGopId)
      return
    }
    next = this._frames.shift()
    this.deletePassed(preciseVideoDts)
    return next
  }

  avSync (preciseDts) {
    let unSync = false
    let nextFrame = this.nextFrame()
    let count = 0
    while (nextFrame) {
      let delta = nextFrame.info ? nextFrame.info.dts - preciseDts : 0
      if (!delta || delta > 10000 || delta < DISCARD_THRESHOLD) {
        this._frames.shift()
        nextFrame = this.nextFrame()
        count++
        unSync = true
        continue
      }
      break
    }
    if (unSync) {
      logger.warn(this.TAG, `detect a-v sync problem,delete ${count} frame`)
    }
    return unSync
  }

  deletePassed (dts) {
    this._frames = this._frames.filter((x) => x.info && x.info.dts > dts)
  }

  empty () {
    this._frames = []
  }

  destroy () {
    this._frames = []
    this._lastGopId = 0
  }
}
