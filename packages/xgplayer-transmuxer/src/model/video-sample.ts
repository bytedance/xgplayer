export interface VideoFlag {
  isLeading?: number
  dependsOn?: number
  isDependedOn?: number
  hasRedundancy?: number
  paddingValue?: number
  degradationPriority?: number
  isNonSyncSample?: number
}

export interface VvcNalInfo {
  nalTypes: number[]
  randomAccessType: string
  rasl: boolean
}

export interface VideoSampleSideData {
  vvcNalInfo?: VvcNalInfo
  [key: string]: unknown
}

export class VideoSample {
  flag: VideoFlag = {}

  keyframe = false

  gopId = 0

  duration = 0

  size = 0

  units: Uint8Array[] = []

  chromaFormat = 420

  sideData: VideoSampleSideData | null = null

  originPts: number

  pts: number

  originDts: number

  dts: number

  // sampleOffset = 0

  constructor(pts: number, dts: number, units?: Uint8Array[]) {
    this.originPts = this.pts = pts
    this.originDts = this.dts = dts
    if (units) this.units = units
  }

  get cts() {
    return this.pts - this.dts
  }

  setToKeyframe() {
    this.keyframe = true
    this.flag.dependsOn = 2
    this.flag.isNonSyncSample = 0
  }
}
