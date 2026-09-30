import type { HEVCDecoderConfiguration } from '../codec/hevc'
import type { TrackExtension, TrackWarning } from './types'
import { TrackType, VideoCodecType } from './types'
import type { VideoSample } from './video-sample'

export interface PsshData {
  kid: string | string[] | null
  data_size?: number
  system_id?: string[]
  buffer?: Uint8Array
}

export class VideoTrack {
  id = 1

  readonly type = TrackType.VIDEO

  codecType = VideoCodecType.AVC

  pid = -1 // ts use

  hvcC: HEVCDecoderConfiguration | null | undefined

  codec = ''

  timescale = 0

  formatTimescale = 0

  sequenceNumber = 0

  baseMediaDecodeTime = 0

  baseDts = 0

  duration = 0

  warnings: TrackWarning[] = []

  samples: VideoSample[] = []

  pps: Uint8Array[] = []

  sps: Uint8Array[] = []

  vps: Uint8Array[] = []

  fpsNum = 0

  fpsDen = 0

  sarRatio: [number, number] | [] = [] // [hSpacing, vSpacing]

  width = 0

  height = 0

  nalUnitSize = 4

  present = false

  isVideoEncryption = false

  isAudioEncryption = false

  isVideo = true

  lastKeyFrameDts = 0

  kid: string | null = null

  pssh: PsshData | null | undefined = null

  ext: TrackExtension | undefined

  reset() {
    this.sequenceNumber =
      this.width =
      this.height =
      this.fpsDen =
      this.fpsNum =
      this.duration =
      this.baseMediaDecodeTime =
      this.timescale =
        0
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

  get firstDts() {
    return this.samples.length ? this.samples[0].dts : null
  }

  get firstPts() {
    return this.samples.length ? this.samples[0].pts : null
  }

  get samplesDuration() {
    if (this.samples.length > 0) {
      const first = this.samples[0]
      const last = this.samples[this.samples.length - 1]
      return last.dts - first.dts + last.duration
    }
    return 0
  }

  exist() {
    if (/av01/.test(this.codec)) {
      return true
    }
    return !!(this.pps.length && this.sps.length && this.codec)
  }

  hasSample() {
    return !!this.samples.length
  }

  get isEncryption() {
    return this.isVideoEncryption
  }
}
