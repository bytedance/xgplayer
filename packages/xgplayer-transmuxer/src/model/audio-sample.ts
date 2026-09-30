export class AudioSample {
  duration = 1024
  flag = { dependsOn: 2, isNonSyncSample: 0 }
  keyframe = true
  originPts: number
  pts: number
  dts: number
  data: Uint8Array
  size: number
  sampleOffset: number | undefined

  constructor(pts: number, data: Uint8Array, duration?: number, sampleOffset?: number) {
    this.originPts = this.pts = this.dts = pts
    this.data = data
    this.size = data.byteLength
    this.sampleOffset = sampleOffset
    if (duration) this.duration = duration
  }
}
