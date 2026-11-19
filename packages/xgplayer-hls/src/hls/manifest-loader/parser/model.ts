export class MasterPlaylist {
  version = 0
  streams: MasterStream[] = []
  readonly isMaster = true
}

export const MediaType = {
  Audio: 'AUDIO',
  Video: 'VIDEO',
  SubTitle: 'SUBTITLE',
  ClosedCaptions: 'CLOSED-CAPTIONS'
} as const

// #EXT-X-KEY KEYFORMAT values
// urn:uuid: https://dashif.org/identifiers/content_protection/
const KeySystems = {
  CLEAR_KEY: 'org.w3.clearkey',
  FAIRPLAY: [
    'urn:uuid:94ce86fb-07ff-4f43-adb8-93d2fa968ca2',
    'com.apple.streamingkeydelivery'
  ],
  WIDEVINE: [
    'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
    'com.widevine.alpha',
    'com.widevine'
  ],
  PLAYREADY: ['urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95', 'com.microsoft.playready']
}

type NestedString = string | NestedString[]

function flatArray(arr: NestedString[]): string[] {
  let ret: string[] = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      ret = ret.concat(flatArray(item))
    } else {
      ret.push(item)
    }
  }

  return ret
}

export class MediaStream {
  id = 0
  url = ''
  default = false
  autoSelect = false
  forced = false
  group = ''
  name = ''
  lang = ''
  segments: MediaSegment[] = []
  endSN = 0
}

export class AudioStream extends MediaStream {
  mediaType = MediaType.Audio
  channels = 0
}

export class VideoStream extends MediaStream {
  mediaType = MediaType.Video
}

export class SubTitleStream extends MediaStream {
  mediaType = MediaType.SubTitle
}

export class ClosedCaptionsStream extends MediaStream {
  mediaType = MediaType.ClosedCaptions
}

export class MasterStream {
  id = 0
  bitrate = 0
  width = 0
  height = 0
  name = ''
  url = ''
  audioCodec: string | undefined = ''
  videoCodec: string | undefined = ''
  textCodec: string | undefined = ''
  audioGroup = ''
  subtitleGroup?: string
  audioStreams: AudioStream[] = []
  subtitleStreams: SubTitleStream[] = []
  closedCaptionsStream: ClosedCaptionsStream[] = []
}

export interface DateRangeAttributes extends Record<string, string | Date | undefined> {
  ID?: string
  CLASS?: string
  DURATION?: string
  CUE?: string
  'X-CUE'?: string
  END_ON_NEXT?: string
  'X-ASSET-URI'?: string
  'X-ASSET-LIST'?: string
  _startDate?: Date
  _endDate?: Date
}

export class MediaPlaylist {
  version = 0
  url = ''
  type: string | undefined = '' // upper case
  startCC = 0
  endCC = 0
  startSN = 0
  endSN = 0
  totalDuration = 0
  targetDuration = 0
  partTargetDuration = 0
  canSkipUntil = 0
  canSkipDateRanges = false
  skippedSegments = 0
  canBlockReload = false
  partHoldBack = 0
  live = true
  lowLatency = false
  endPartIndex = 0
  segments: MediaSegment[] = []
  dateRanges: Record<string, DateRangeAttributes> = {}
  preloadHint?: Record<string, string>
  nextSN?: string
  nextIndex?: string
}

export class MediaSegment {
  sn = 0 // Media Sequence Number
  cc = 0
  url = ''
  parentUrl = ''
  title = ''
  start = 0
  duration = 0
  dataTime: string | undefined = ''
  key: MediaSegmentKey | null = null
  byteRange: [number, number] | null = null
  isInitSegment = false
  initSegment: MediaSegment | null = null
  isLast = false
  hasAudio = false
  hasVideo = false

  independent = false
  partIndex = 0

  constructor(parentUrl = '') {
    this.parentUrl = parentUrl
  }

  get end() {
    return this.start + this.duration
  }

  setTrackExist(v: boolean, a: boolean) {
    this.hasVideo = v
    this.hasAudio = a
  }

  setByteRange(data: string, prevSegment?: MediaSegment) {
    const bytes = data.split('@')
    let start = 0
    if (bytes.length === 1 && prevSegment && prevSegment.byteRange) {
      start = prevSegment.byteRange[1] || 0
      if (start) start += 1
    } else {
      start = parseInt(bytes[1] ?? '')
    }
    this.byteRange = [start, start + parseInt(bytes[0]) - 1]
  }
}

export class MediaSegmentKey {
  method = ''
  url = ''
  iv: Uint8Array | null = null
  keyFormat = ''
  keyFormatVersions = ''

  constructor(segKey?: MediaSegmentKey) {
    if (segKey instanceof MediaSegmentKey) {
      this.method = segKey.method
      this.url = segKey.url
      this.keyFormat = segKey.keyFormat
      this.keyFormatVersions = segKey.keyFormatVersions
      if (segKey.iv) this.iv = new Uint8Array(segKey.iv)
    }
  }

  clone(sn?: number | null) {
    const key = new MediaSegmentKey(this)
    if (sn !== null && sn !== undefined) key.setIVFromSN(sn)
    return key
  }

  setIVFromSN(sn: number) {
    if (!this.iv && this.method === 'AES-128' && typeof sn === 'number' && this.url) {
      this.iv = new Uint8Array(16)
      for (let i = 12; i < 16; i++) {
        this.iv[i] = (sn >> (8 * (15 - i))) & 0xff
      }
    }
  }

  isSegmentEncrypted() {
    const { method } = this
    return method === 'AES-128' // || method === 'AES-256' || method === 'AES-256-CTR'
  }

  isValidKeySystem() {
    const isKeyFormatValid =
      flatArray([
        KeySystems.CLEAR_KEY,
        KeySystems.FAIRPLAY,
        KeySystems.WIDEVINE,
        KeySystems.PLAYREADY
      ]).indexOf(this.keyFormat) > -1
    if (!isKeyFormatValid) {
      return false
    }

    const isMethodValid =
      ['SAMPLE-AES', 'SAMPLE-AES-CENC', 'SAMPLE-AES-CTR'].indexOf(this.method) > -1
    if (!isMethodValid) {
      return false
    }
    return true
  }

  isSupported() {
    if (!this.method) {
      return false
    }
    if (this.isSegmentEncrypted()) {
      return true
    } else if (this.isValidKeySystem()) {
      return true
    }
    return false
  }
}

export class HlsUrlParameters {
  msn: string | number | undefined
  part: string | number | undefined
  skip: string | undefined

  constructor(msn?: string | number, part?: string | number, skip?: string) {
    this.msn = msn
    this.part = part
    this.skip = skip
  }

  addDirectives(uri: string): string {
    const url = new self.URL(uri)
    if (this.msn !== undefined) {
      url.searchParams.set('_HLS_msn', this.msn.toString())
    }
    if (this.part) {
      url.searchParams.set('_HLS_part', this.part.toString())
    }
    if (this.skip) {
      url.searchParams.set('_HLS_skip', this.skip)
    }
    return url.href
  }
}
