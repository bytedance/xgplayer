import { TrackType, AudioCodecType } from './types'

export class AudioTrack {
  id = 2

  /** @readonly */
  type = TrackType.AUDIO

  codecType = AudioCodecType.AAC

  pid = -1

  codec = ''

  sequenceNumber = 0

  sampleDuration = 0

  timescale = 0

  formatTimescale = 0

  baseMediaDecodeTime = 0

  duration = 0

  warnings = []

  /** @type {import('./audio-sample').AudioSample[]} */
  samples = []

  baseDts = 0

  sampleSize = 16

  sampleRate = 0

  channelCount = 0

  objectType = 0

  sampleRateIndex = 0

  /** @type {number[]} */
  config = []

  present = false

  isVideoEncryption = false

  isAudioEncryption = false

  kid = null

  /** @type {any} */
  ext

  reset () {
    this.sequenceNumber = 0
    this.timescale = 0
    this.sampleDuration = 0
    this.sampleRate = 0
    this.channelCount = 0
    this.baseMediaDecodeTime = 0
    this.present = false
    this.pid = -1
    this.codec = ''
    this.samples = []
    this.config = []
    this.warnings = []
  }

  /**
   * @returns {boolean}
   */
  exist () {
    return !!(this.sampleRate && this.channelCount && this.codec && this.codecType === AudioCodecType.AAC)
  }

  /**
   * @returns {boolean}
   */
  hasSample () {
    return !!this.samples.length
  }

  get isEncryption (){
    return this.isAudioEncryption
  }
}
