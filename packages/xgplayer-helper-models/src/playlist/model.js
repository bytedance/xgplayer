export class MasterPlaylist {
  version = 0
  streams = [] // MasterStream
  get isMaster () {
    return true
  }
}

export class MasterStream {
  bitrate = 0
  width = 0
  height = 0
  name = ''
  url = ''
  audioCodec = ''
  videoCodec = ''
  textCodec = ''
}

export class MediaPlaylist {
  version = 0
  type = '' // upper case
  startCC = 0
  endCC = 0
  startSN = 0
  endSN = 0
  totalDuration = 0
  targetDuration = 0
  live = true
  segments = [] // MediaSegment
}

export class MediaSegment {
  sn = 0 // Media Sequence Number
  cc = 0
  url = ''
  title = ''
  start = 0
  duration = 0
  key = null // MediaSegmentKey
  byteRange = null // [start, end]
  isInitSegment = false
  initSegment = null // MediaSegment
  isLast = false

  get end () {
    return this.start + this.duration
  }

  setByteRange (data, prevSegment) {
    this.byteRange = [0]
    const bytes = data.split('@')
    if (bytes.length === 1 && prevSegment && prevSegment.byteRange) {
      this.byteRange[0] = prevSegment.byteRange[1] || 0
    } else {
      this.byteRange[0] = parseInt(bytes[1])
    }
    this.byteRange[1] = this.byteRange[0] + parseInt(bytes[0])
  }
}

export class MediaSegmentKey {
  method = ''
  url = ''
  iv = null // Uint8Array
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
    if (sn != null) key.setIVFromSN(sn)
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
}
