export class AudioSample {
  duration = 1024

  flag = { dependsOn: 2, isNonSyncSample: 0 }
  keyframe = true

  /**
   * @param {number} pts
   * @param {Uint8Array} data
   * @param {number} [duration=1024]
   */
  constructor (pts, data, duration, sampleOffset) {
    this.originPts = this.pts = this.dts = pts
    this.data = data
    this.size = data.byteLength
    this.sampleOffset = sampleOffset
    if (duration) this.duration = duration
  }
}
