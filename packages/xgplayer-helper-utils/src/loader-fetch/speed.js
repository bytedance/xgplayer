class Speed {
  constructor () {
    // milliseconds
    this._firstCheckpoint = 0
    this._lastCheckpoint = 0
    this._intervalBytes = 0
    this._lastSamplingBytes = 0

    this._now = Date.now
  }

  reset () {
    this._firstCheckpoint = this._lastCheckpoint = 0
    this._intervalBytes = 0
    this._lastSamplingBytes = 0
  }

  addBytes (bytes) {
    const duration = this._now() - this._lastCheckpoint
    if (this._firstCheckpoint === 0) {
      this._firstCheckpoint = this._now()
      this._lastCheckpoint = this._firstCheckpoint
      this._intervalBytes += bytes
    } else if (duration < 5000) {
      this._intervalBytes += bytes
    } else { // duration >= 1000
      this._lastSamplingBytes = this._intervalBytes / (duration / 1000)
      this._intervalBytes = bytes
      this._lastCheckpoint = this._now()
    }
  }

  get currentKBps () {
    this.addBytes(0)

    let durationSeconds = (this._now() - this._lastCheckpoint) / 1000
    if (durationSeconds === 0) durationSeconds = 1
    return (this._intervalBytes / durationSeconds) / 1024
  }

  get lastSamplingKBps () {
    this.addBytes(0)

    if (this._lastSamplingBytes !== 0) {
      return this._lastSamplingBytes / 1024
    } else { // lastSecondBytes === 0
      if (this._now() - this._lastCheckpoint >= 500) {
        // if time interval since last checkpoint has exceeded 500ms
        // the speed is nearly accurate
        return this.currentKBps
      } else {
        // We don't know
        return 0
      }
    }
  }
}

export default Speed
