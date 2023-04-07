import { TrackType } from './types'

class Sample {
  time = 0 // second

  /**
   * @param {Object} data
   * @param {number} pts
   */
  constructor (data, pts) {
    this.data = data
    this.originPts = this.pts = pts
  }
}

export class FlvScriptSample extends Sample {}

export class SeiSample extends Sample {}

export class MetadataTrack {
  /** @readonly */
  id = 3

  /** @readonly */
  type = TrackType.METADATA

  timescale = 0

  /** @type {FlvScriptSample[]} */
  flvScriptSamples = []

  /** @type {SeiSample[]} */
  seiSamples = []

  /**
   * @returns {boolean}
   */
  exist () {
    return !!((this.flvScriptSamples.length || this.seiSamples.length) && this.timescale)
  }

  reset () {
    this.timescale = 0
    this.flvScriptSamples = []
    this.seiSamples = []
  }

  /**
   * @returns {boolean}
   */
  hasSample () {
    return !!(this.flvScriptSamples.length || this.seiSamples.length)
  }
}
