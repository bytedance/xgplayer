/**
 * @typedef {Object} VideoFlag
 * @property {number} [isLeading=0]
 * @property {number} [dependsOn=1]
 * @property {number} [isDependedOn=0]
 * @property {number} [hasRedundancy=0]
 * @property {number} [paddingValue=0]
 * @property {number} [degradationPriority=0]
 * @property {number} [isNonSyncSample=1]
 */

export class VideoSample {
  /** @type {VideoFlag} */
  flag = {}

  keyframe = false

  gopId = 0

  duration = 0

  size = 0

  units = []

  chromaFormat = 420

  // sampleOffset = 0

  /**
   * @param {number} pts
   * @param {number} dts
   * @param {Uint8Array[]} [units]
   */
  constructor (pts, dts, units) {
    this.originPts = this.pts = pts
    this.originDts = this.dts = dts
    if (units) this.units = units
  }

  /**
   * @returns {number}
   */
  get cts () {
    return this.pts - this.dts
  }

  setToKeyframe () {
    this.keyframe = true
    this.flag.dependsOn = 2
    this.flag.isNonSyncSample = 0
  }
}
