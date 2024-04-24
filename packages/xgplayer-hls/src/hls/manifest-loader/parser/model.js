export class MasterPlaylist {
  version = 0
  streams = [] // MasterStream
  /**
   * @readonly
   */
  isMaster = true
}

const MediaType = {
  Audio: 'AUDIO',
  Video: 'VIDEO',
  SubTitle: 'SUBTITLE',
  ClosedCaptions: 'CLOSED-CAPTIONS'
}

// #EXT-X-KEY KEYFORMAT values
const KeySystems = {
  CLEAR_KEY: 'org.w3.clearkey',
  FAIRPLAY: 'com.apple.streamingkeydelivery',
  WIDEVINE: 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
  PLAYREADY: 'com.microsoft.playready'
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
  segments = []
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
  audioCodec = ''
  videoCodec = ''
  textCodec = ''
  audioGroup = ''

  /** @type {AudioStream[]} */
  audioStreams = []

  /** @type {SubTitleStream[]} */
  subtitleStreams = []

  /** @type {ClosedCaptionsStream[]} */
  closedCaptionsStream = []
}

export class MediaPlaylist {
  version = 0
  url = ''
  type = '' // upper case
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
  /** @type {Array.<MediaSegment>} */
  segments = []
}

export class MediaSegment {
  sn = 0 // Media Sequence Number
  cc = 0
  url = ''
  parentUrl = ''
  title = ''
  start = 0
  duration = 0
  dataTime = ''
  /** @type {?MediaSegmentKey} */
  key = null
  byteRange = null // [start, end]
  isInitSegment = false
  /** @type {?MediaSegment} */
  initSegment = null
  isLast = false
  hasAudio = false
  hasVideo = false

  independent = false
  partIndex = 0

  constructor (parentUrl) {
    this.parentUrl = parentUrl
  }

  get end () {
    return this.start + this.duration
  }

  setTrackExist (v, a) {
    this.hasVideo = v
    this.hasAudio = a
  }

  setByteRange (data, prevSegment) {
    this.byteRange = [0]
    const bytes = data.split('@')
    if (bytes.length === 1 && prevSegment && prevSegment.byteRange) {
      this.byteRange[0] = prevSegment.byteRange[1] || 0
      if (this.byteRange[0]) this.byteRange[0] += 1
    } else {
      this.byteRange[0] = parseInt(bytes[1])
    }
    this.byteRange[1] = this.byteRange[0] + parseInt(bytes[0]) - 1
  }
}

export class MediaSegmentKey {
  method = ''
  url = ''
  /** @type {?Uint8Array} */
  iv = null
  keyFormat = ''
  keyFormatVersions = ''

  constructor (segKey) {
    if (segKey instanceof MediaSegmentKey) {
      this.method = segKey.method
      this.url = segKey.url
      this.keyFormat = segKey.keyFormat
      this.keyFormatVersions = segKey.keyFormatVersions
      if (segKey.iv) this.iv = new Uint8Array(segKey.iv)
    }
  }

  clone (sn) {
    const key = new MediaSegmentKey(this)
    if (sn !== null && sn !== undefined) key.setIVFromSN(sn)
    return key
  }

  setIVFromSN (sn) {
    if (!this.iv && this.method === 'AES-128' && typeof sn === 'number' && this.url) {
      this.iv = new Uint8Array(16)
      for (let i = 12; i < 16; i++) {
        this.iv[i] = (sn >> (8 * (15 - i))) & 0xff
      }
    }
  }

  isSegmentEncrypted () {
    const { method } = this
    return method === 'AES-128' // || method === 'AES-256' || method === 'AES-256-CTR'
  }

  isValidKeySystem () {
    const isKeyFormatValid =
      [
        KeySystems.CLEAR_KEY,
        KeySystems.FAIRPLAY,
        KeySystems.WIDEVINE,
        KeySystems.PLAYREADY
      ].indexOf(this.keyFormat) > -1
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

  isSupported () {
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
