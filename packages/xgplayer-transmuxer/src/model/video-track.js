import { TrackType, VideoCodecType } from './types'

export class VideoTrack {
  id = 1

  /** @readonly */
  type = TrackType.VIDEO

  codecType = VideoCodecType.AVC

  pid = -1 // ts use

  /** @type {Uint8Array | Object} */
  hvcC = undefined

  codec = ''

  timescale = 0

  formatTimescale = 0

  sequenceNumber = 0

  baseMediaDecodeTime = 0

  baseDts = 0

  duration = 0

  warnings = []

  /** @type {import('./video-sample').VideoSample[]} */
  samples = []

  /** @type {Uint8Array[]} */
  pps = []

  /** @type {Uint8Array[]} */
  sps = []

  /** @type {Uint8Array[]} */
  vps = []

  fpsNum = 0

  fpsDen = 0

  /** @type {[number, number]} */
  sarRatio = [] // [hSpacing, vSpacing]

  width = 0

  height = 0

  nalUnitSize = 4

  present = false

  isVideoEncryption = false

  isAudioEncryption = false

  isVideo = true

  kid = null

  pssh = null

  /** @type {any} */
  ext

  reset () {
    this.sequenceNumber =
    this.width =
    this.height =
    this.fpsDen =
    this.fpsNum =
    this.duration =
    this.baseMediaDecodeTime =
    this.timescale = 0
    this.codec = ''
    this.present = false
    this.pid = -1
    this.pps = []
    this.sps = []
    this.vps = []
    this.sarRatio = []
    this.samples = []
    this.warnings = []
    this.hvcC = null
  }

  get firstDts () {
    return this.samples.length ? this.samples[0].dts : null
  }

  get firstPts () {
    return this.samples.length ? this.samples[0].pts : null
  }

  get samplesDuration () {
    if (this.samples.length > 0) {
      const first = this.samples[0]
      const last = this.samples[this.samples.length - 1]
      return last.dts - first.dts + last.duration
    }
    return 0
  }

  /**
   * @returns {boolean}
   */
  exist () {
    if (/av01/.test(this.codec)) {
      return true
    }
    return !!(this.pps.length && this.sps.length && this.codec)
  }

  /**
   * @returns {boolean}
   */
  hasSample () {
    return !!this.samples.length
  }

  get isEncryption (){
    return this.isVideoEncryption
  }
}
