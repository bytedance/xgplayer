

const SKIP_SMALL_CHUNK = 1000
const MAX_CHUNK_SAVE_SIZE = 50
const MAX_SEGMENT_SAVE_SIZE = 3
const LONGTIME_NO_RECEIVE = 3000

export class BandwidthService {
  _chunkSpeed = 0 // bps
  _chunkCache = []
  _speeds = [] // bps
  _totalSize = 0
  _totalCost = 0

  /**
   * @typedef {{
   *  chunkCountForSpeed?: number,
   *  skipChunkSize?: number,
   *  longtimeNoReceived?: number
   * }} Opts
   *
   * @param {Opts} opts
   */
  constructor (opts) {
    this._opts = opts || {}
  }

  addRecord (totalByte, ms) {
    if (!totalByte || !ms) return
    this._speeds.push(8000 * totalByte / ms)
    this._speeds = this._speeds.slice(-MAX_SEGMENT_SAVE_SIZE)
  }

  addChunkRecord (totalByte, ms) {
    if (!totalByte || !ms || totalByte < (this._opts?.skipChunkSize || SKIP_SMALL_CHUNK)) return

    this._totalSize += totalByte
    this._totalCost += ms

    this._chunkSpeed = 8000 * totalByte / ms
    this._chunkCache.push({
      size: totalByte,
      duration: ms,
      timestamp: performance.now()
    })

    const size = this._opts?.chunkCountForSpeed || MAX_CHUNK_SAVE_SIZE

    if (this._chunkCache.length > size) {
      this._chunkCache = this._chunkCache.slice(-size)
    }
  }

  /**
   *
   * @returns { number }
   */
  getAvgSpeed () {
    if (!this._chunkCache.length && !this._speeds.length) return 0
    if (this._speeds.length) {
      return this._speeds.reduce((a, c) => (a += c)) / this._speeds.length
    }

    // for long time no chunk received, append 0 size chunk
    const lastSample = this._chunkCache[this._chunkCache.length - 1]
    const cost = performance.now() - lastSample.timestamp
    if ( cost > (this._opts?.longtimeNoReceived || LONGTIME_NO_RECEIVE)) {
      this._chunkCache.push({
        size: 0,
        duration: cost,
        timestamp: performance.now()
      })
    }

    const totalSize = this._chunkCache.reduce((a, c) => a += c.size, 0)
    const totalDuration = this._chunkCache.reduce((a, c) => a += c.duration, 0)
    return 8000 * totalSize / totalDuration
  }

  /**
   *
   * @returns { number }
   */
  getLatestSpeed () {
    if (!this._chunkCache.length && !this._speeds.length) return 0
    if (this._speeds.length) {
      return this._speeds[this._speeds.length - 1]
    }
    return this._chunkSpeed
  }

  /**
   *
   * @returns { number }
   */
  getTotalSize () {
    return this._totalSize
  }

  /**
   *
   * @returns { number }
   */
  getTotalCost () {
    return this._totalCost
  }

  reset () {
    this._chunkCache = []
    this._speeds = []
    this._totalSize = 0
    this._totalCost = 0
  }
}

