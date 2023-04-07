import { EVENT } from 'xgplayer-streaming-shared'

class Stats {
  encodeType = '' // hevc | avc
  audioCodec = ''
  videoCodec = ''
  domain = '' // stream url domain
  fps = 0
  bitrate = 0 // 最新1s下载数据的码率
  width = 0
  height = 0
  samplerate = 0
  channelCount = 0
  gop = 0 // 第一个gop帧数

  _bitsAccumulateSize = 0
  _bitsAccumulateDuration = 0

  constructor (timescale) {
    this._timescale = timescale
  }

  getStats () {
    return {
      encodeType: this.encodeType,
      audioCodec: this.audioCodec,
      videoCodec: this.videoCodec,
      domain: this.domain,
      fps: this.fps,
      bitrate: this.bitrate,
      width: this.width,
      height: this.height,
      samplerate: this.samplerate,
      channelCount: this.channelCount,
      gop: this.gop
    }
  }

  setEncodeType (encode) {
    this.encodeType = encode
  }

  setVideoMeta (track) {
    this.width = track.width
    this.height = track.height
    this.videoCodec = track.codec
    this.encodeType = track.codecType
    if (track.fpsNum && track.fpsDen) {
      this.fps = track.fpsNum / track.fpsDen
    }
  }

  setAudioMeta (track) {
    this.audioCodec = track.codec
    this.samplerate = track.sampleRate
    this.channelCount = track.channelCount
  }

  setDomain (responseUrl) {
    this.domain = responseUrl.split('/').slice(2, 3)[0]
  }

  updateBitrate (samples) {
    if (!this.fps || this.fps >= 100) {
      const samp0 = samples[0]
      if (samp0?.duration) {
        this.fps = Math.round(this._timescale / samp0.duration)
      }
    }
    samples.forEach(sample => {
      if (sample.gopId === 1) {
        this.gop++
      }
      this._bitsAccumulateDuration += sample.duration / (this._timescale / 1000)
      this._bitsAccumulateSize += sample.units.reduce((a, c) => (a += c.length), 0)
      if (this._bitsAccumulateDuration >= 1000) {
        this.bitrate = this._bitsAccumulateSize * 8
        this._bitsAccumulateDuration = 0
        this._bitsAccumulateSize = 0
      }
    })
  }
}

class MediaStatsService {

  _core = null

  _samples = []

  constructor (core, timescale = 1000) {
    this._core = core
    this._timescale = timescale
    this._stats = new Stats(timescale)
    this._bindEvents()
  }

  getStats () {
    const { currentTime = 0, decodeFps = 0 } = this._core?.media || {}
    return {
      ...this._stats.getStats(),
      /** @type {number} */
      downloadSpeed: this._core?.speedInfo?.().speed,

      avgSpeed: this._core?.speedInfo?.().avgSpeed,

      /** @type {number} */
      currentTime,

      /** @type {number} */
      bufferEnd: this._core?.bufferInfo()?.remaining || 0,

      /** @type {number} */
      decodeFps
    }
  }

  _bindEvents () {
    this._core.on(EVENT.DEMUXED_TRACK, (track) => this._stats.updateBitrate(track.samples))

    this._core.on(EVENT.METADATA_PARSED, e => {
      if (e.type === 'video') {
        this._stats.setVideoMeta(e.track)
      } else {
        this._stats.setAudioMeta(e.track)
      }
    })

    this._core.on(EVENT.TTFB, e => {
      this._stats.setDomain(e.responseUrl)
    })

  }

  reset () {
    this._samples = []
    this._stats = new Stats(this._timescale)
  }

}

export { MediaStatsService }
