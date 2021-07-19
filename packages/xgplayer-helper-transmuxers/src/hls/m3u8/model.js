import { getAbsoluteUrl, getCodecs } from './utils'

export class MasterPlaylist {
  version = 0
  streams = [] // MasterStream
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

  constructor (attr, url, parentUrl) {
    this.bitrate = parseInt(attr['AVERAGE-BANDWIDTH'] || attr.BANDWIDTH)
    this.name = attr.NAME
    this.url = getAbsoluteUrl(url, parentUrl)
    if (attr.RESOLUTION) {
      const [w, h] = attr.RESOLUTION.split('x')
      this.width = parseInt(w)
      this.height = parseInt(h)
    }
    if (attr.CODECS) {
      const codecs = attr.CODECS.split(/[ ,]+/).filter(Boolean)
      this.videoCodec = getCodecs('video', codecs)
      this.audioCodec = getCodecs('audio', codecs)
      this.textCodec = getCodecs('text', codecs)
    }
  }
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
  duration = 0
  key = null // MediaSegmentKey
  byteRange = null // [start, end]
  isInitSegment = false
  initSegment = null // MediaSegment
}

export class MediaSegmentKey {
  method = ''
  url = ''
  iv = null // Uint8Array
  keyFormat = ''
  keyFormatVersions = ''

  constructor (attr, parentUrl) {
    if (attr instanceof MediaSegmentKey) {
      this.method = attr.method
      this.url = attr.url
      this.keyFormat = attr.keyFormat
      this.keyFormatVersions = attr.keyFormatVersions
      if (attr.iv) this.iv = new Uint8Array(attr.iv)
    } else if (attr) {
      this.method = attr.METHOD
      this.url = getAbsoluteUrl(attr.URI, parentUrl)
      this.keyFormat = attr.KEYFORMAT || 'identity'
      this.keyFormatVersions = attr.KEYFORMATVERSIONS
      if (attr.IV) {
        let str = attr.IV.slice(2)
        str = (str.length & 1 ? '0' : '') + str
        this.iv = new Uint8Array(str.length / 2)
        for (let i = 0, l = str.length / 2; i < l; i++) {
          this.iv[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16)
        }
      }
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
