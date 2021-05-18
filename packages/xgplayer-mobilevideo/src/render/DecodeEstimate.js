import { logger } from 'xgplayer-helper-utils'
import Events from '../events'

const MAX_QUEUE_LENGTH = 5
const MAX_LOW_FPS_RECORD = 30

export default class DecodeEstimate {
  constructor (parent) {
    this.TAG = 'DecodeEstimate'
    this._needEstimate = true
    this._parent = parent
    this._lastDecodeDot = 0
    this._lastDecodeCost = 0
    this._lastFrameDts = 0
    this._dtsDeltas = []
    this._decodeCosts = []
    this._lowDecodeQueue = []
    this._fps = 0
    this._decodeFps = 0
    this._gopLength = 0
  }

  get fps () {
    return this._fps
  }

  get decodeFps () {
    return this._decodeFps
  }

  get decodeCost () {
    return this._lastDecodeCost
  }

  get gopLength () {
    return this._gopLength
  }

  updateGopCount () {
    this._gopLength++
  }

  needEstimateFps () {
    this._needEstimate = true
  }

  addDecodeInfo (frameInfo = { dts: 0 }) {
    this._estimateDecodeFps(frameInfo)
    this._estimateFps(frameInfo)
  }

  resetDecodeDot (v) {
    this._lastDecodeDot = v || 0
  }

  reset () {
    this._decodeCosts = []
    this._lowDecodeQueue = []
  }

  _estimateFps (frameInfo) {
    if (!this._needEstimate) return

    if (!this._lastFrameDts) {
      this._lastFrameDts = frameInfo.dts
      return
    }

    let delta = frameInfo.dts - this._lastFrameDts
    this._lastFrameDts = frameInfo.dts

    if (Math.abs(delta) > 200) return

    this._dtsDeltas.push(delta)

    let len = this._dtsDeltas.length

    if (len < MAX_QUEUE_LENGTH) return

    this._fps = Math.ceil(1000 / this._avg(this._dtsDeltas, len))
    console.log(this.TAG, 'estimate fps:', this._fps)
    this._needEstimate = false
  }

  _estimateDecodeFps (frameInfo) {
    if (!this._lastDecodeDot) {
      this._lastDecodeDot = performance.now()
      return
    }

    let now = performance.now()
    let cost = now - this._lastDecodeDot
    this._lastDecodeDot = now
    frameInfo.cost = cost

    if (cost < 0.5) return

    this._lastDecodeCost = cost
    this._decodeCosts.push(cost)
    let len = this._decodeCosts.length

    if (len < MAX_QUEUE_LENGTH) return

    let avg = this._avg(this._decodeCosts, len)
    this._decodeFps = Math.floor(1000 / avg)
    this._decodeCosts = []
    this._lowDecodeDetect()
  }

  _avg (list, len) {
    let sum = list.reduce((all, c) => {
      all += c
      return all
    }, 0)
    return Math.floor(sum / len) || 1
  }

  // 低延迟检测逻辑
  _lowDecodeDetect () {
    // 解码太低
    if (!this._decodeFps) {
      this._parent.emit(Events.VIDEO.DECODE_LOW_FPS)
      return
    }

    if (this._decodeFps < this._fps + 3) {
      this._lowDecodeQueue.push(this._decodeFps)
    } else {
      this._lowDecodeQueue.pop()
    }
    if (this._lowDecodeQueue.length > MAX_LOW_FPS_RECORD) {
      // 大约连续的 30 * 5 = 150帧 解码效率比较低时
      this._lowDecodeQueue = []
      logger.log(this.TAG, '解码效率过低,应该降级')
      this._parent.emit(Events.VIDEO.DECODE_LOW_FPS)
    }
  }
}
