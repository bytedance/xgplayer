import { TrackType } from './types'

export interface SeiSampleData {
  payload: Uint8Array
  type: number
  size: number
  uuid: string
}

class Sample<T> {
  time = 0 // second
  data: T
  originPts: number
  pts: number

  constructor(data: T, pts: number) {
    this.data = data
    this.originPts = this.pts = pts
  }
}

export class FlvScriptSample extends Sample<Record<string, unknown>> {}

export class SeiSample extends Sample<SeiSampleData> {}

export class MetadataTrack {
  readonly id = 3

  readonly type = TrackType.METADATA

  timescale = 0

  flvScriptSamples: FlvScriptSample[] = []

  seiSamples: SeiSample[] = []

  exist() {
    return !!((this.flvScriptSamples.length || this.seiSamples.length) && this.timescale)
  }

  reset() {
    this.timescale = 0
    this.flvScriptSamples = []
    this.seiSamples = []
  }

  hasSample() {
    return !!(this.flvScriptSamples.length || this.seiSamples.length)
  }
}
