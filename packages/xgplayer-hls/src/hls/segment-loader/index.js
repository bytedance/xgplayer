import { NetLoader, EVENT, BandwidthService, StreamingError } from 'xgplayer-streaming-shared'


/**
 * @typedef {import('../manifest-loader/parser/model').MediaSegment} MediaSegment
 */

export class SegmentLoader {
  /** @type {Error} */
  error = null

  constructor (hls) {
    this.hls = hls
    this._bandwidthService = new BandwidthService()
    this._mapCache = {}
    this._keyCache = {}

    const { retryCount, retryDelay, loadTimeout, fetchOptions } = this.hls.config
    this._segmentLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'arraybuffer',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })
    this._audioSegmentLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'arraybuffer',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })
    this._keyLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'arraybuffer',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })
  }

  speedInfo () {
    return {
      speed: this._bandwidthService.getLatestSpeed(),
      avgSpeed: this._bandwidthService.getAvgSpeed()
    }
  }

  /**
   * @param {MediaSegment} seg
   * @param {MediaSegment} audioSeg
   * @param {boolean} loadInit
   * @param {boolean} loadAudioInit
   */
  load (seg, audioSeg, loadInit, loadAudioInit = loadInit) {
    const toLoad = []
    if (seg) toLoad[0] = this.loadVideoSegment(seg, loadInit)
    if (audioSeg) toLoad[1] = this.loadAudioSegment(audioSeg, loadAudioInit)
    return Promise.all(toLoad)
  }

  /**
   * @param {MediaSegment} seg
   * @param {boolean} loadInit
   */
  loadVideoSegment (seg, loadInit) {
    return this._loadSegment(this._segmentLoader, seg, loadInit)
  }

  /**
   * @param {MediaSegment} seg
   * @param {boolean} loadInit
   */
  loadAudioSegment (seg, loadInit) {
    return this._loadSegment(this._audioSegmentLoader, seg, loadInit)
  }

  /**
   * @param {NetLoader} segLoader
   * @param {MediaSegment} seg
   * @param {boolean} loadInit
   */
  async _loadSegment (segLoader, seg, loadInit) {
    let map
    let key
    let keyIv
    let mapKey
    let mapKeyIv
    const toLoad = []

    this.hls.emit(EVENT.LOAD_START, { url: seg.url })
    toLoad[0] = segLoader.load(seg.url)
    if (loadInit && seg.initSegment) {
      const mapUrl = seg.initSegment.url
      map = this._mapCache[mapUrl]
      if (!map) {
        this.hls.emit(EVENT.LOAD_START, { url: mapUrl })
        toLoad[1] = segLoader.load(mapUrl).then(r => {
          if (r) {
            const l = Object.keys(this._mapCache)
            if (l > 30) this._mapCache = {}
            map = this._mapCache[mapUrl] = r.data
            this._emitOnLoaded(r, mapUrl)
          }
        })
      }
      const keyUrl = seg.initSegment.key?.url
      if (keyUrl) {
        mapKeyIv = seg.initSegment.key.iv
        mapKey = this._keyCache[keyUrl]
        if (!mapKey) {
          this.hls.emit(EVENT.LOAD_START, { url: keyUrl })
          toLoad[2] = this._keyLoader.load(keyUrl).then(r => {
            if (r) {
              mapKey = this._keyCache[keyUrl] = r.data
              this._emitOnLoaded(r, keyUrl)
            }
          })
        }
      }
    }

    const keyUrl = seg.key?.url
    if (keyUrl) {
      keyIv = seg.key.iv
      key = this._keyCache[keyUrl]
      if (!key) {
        this.hls.emit(EVENT.LOAD_START, { url: keyUrl })
        toLoad[3] = this._keyLoader.load(keyUrl).then(r => {
          if (r) {
            key = this._keyCache[keyUrl] = r.data
            this._emitOnLoaded(r, keyUrl)
          }
        })
      }
    }

    const [s] = await Promise.all(toLoad)
    if (!s) return
    const data = s.data
    this._emitOnLoaded(s, seg.url)

    return {
      data,
      map,
      key,
      mapKey,
      keyIv,
      mapKeyIv
    }
  }

  reset () {
    this.error = null
    this._mapCache = {}
    this._keyCache = {}
    this._bandwidthService.reset()
  }

  async cancel () {
    await Promise.all([this._keyLoader.cancel(), this._segmentLoader.cancel(), this._audioSegmentLoader.cancel()])
  }

  _emitOnLoaded = (res, url) => {
    const { data, response, options } = res
    const { firstByteTime, startTime, endTime, contentLength } = options || {}
    const time = endTime - startTime

    this._bandwidthService.addRecord(contentLength || data.byteLength, time)
    this.hls.emit(EVENT.SPEED, { time, byteLength: contentLength, url })
    this.hls.emit(EVENT.LOAD_COMPLETE, { url, elapsed: time || 0 })
    this.hls.emit(EVENT.TTFB, { url, responseUrl: response.url, elapsed: firstByteTime - startTime })
    this.hls.emit(EVENT.LOAD_RESPONSE_HEADERS, { headers: response.headers })
  }

  _onLoaderRetry = (error, retryTime) => {
    this.hls.emit(EVENT.LOAD_RETRY, {
      error: StreamingError.network(error),
      retryTime
    })
  }
}
