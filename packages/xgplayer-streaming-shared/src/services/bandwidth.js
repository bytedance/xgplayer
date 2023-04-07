export class BandwidthService {
  _chunkSpeeds = [] // bps
  _speeds = [] // bps

  addRecord (totalByte, ms) {
    if (!totalByte || !ms) return
    this._speeds.push(8000 * totalByte / ms)
    this._speeds = this._speeds.slice(-3)
  }

  addChunkRecord (totalByte, ms) {
    if (!totalByte || !ms) return
    this._chunkSpeeds.push(8000 * totalByte / ms)
    this._chunkSpeeds = this._chunkSpeeds.slice(-100)
  }

  getAvgSpeed () {
    if (!this._chunkSpeeds.length && !this._speeds.length) return 0
    if (this._speeds.length) {
      return this._speeds.reduce((a, c) => (a += c)) / this._speeds.length
    }
    return this._chunkSpeeds.reduce((a, c) => (a += c)) / this._chunkSpeeds.length
  }

  getLatestSpeed () {
    if (!this._chunkSpeeds.length && !this._speeds.length) return 0
    if (this._speeds.length) {
      return this._speeds[this._speeds.length - 1]
    }
    return this._chunkSpeeds[this._chunkSpeeds.length - 1]
  }

  reset () {
    this._chunkSpeeds = []
    this._speeds = []
  }
}
