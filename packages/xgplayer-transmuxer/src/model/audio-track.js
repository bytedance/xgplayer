import { TrackType, AudioCodecType } from './types'

export class AudioTrack {
  id = 2

  /** @readonly */
  type = TrackType.AUDIO

  codecType = AudioCodecType.AAC

  pid = -1

  codec = ''

  container = ''

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
    return !!(
      this.sampleRate &&
      this.channelCount &&
      (this.codec || this.container) &&
      (this.codecType === AudioCodecType.AAC ||
        this.codecType === AudioCodecType.G711PCMA ||
        this.codecType === AudioCodecType.G711PCMU ||
        this.codecType === AudioCodecType.OPUS || this.codecType === AudioCodecType.MP3)
    )
  }

  /**
   * @returns {boolean}
   */
  hasSample () {
    return !!this.samples.length
  }

  get isEncryption () {
    return this.isAudioEncryption
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
}
