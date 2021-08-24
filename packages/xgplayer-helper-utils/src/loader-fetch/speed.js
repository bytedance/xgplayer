export default class Speed {
    _sampleQueue =[]
    _speed = 500000 // 500KB/s as default
    _recentSpeed = 500000
    _timer = 0
    _dit = 0
    _contentLength = 0
    _speedDown = false // represent download speed is downward trend

    /**
     * for fetch request
     * @param {Fetch Header} header
     */
    recordLoading (header) {
      const contentLength = header.get('content-length') || 0

      if (!contentLength) return

      this._contentLength = contentLength

      // calc expceted download time base on avg download speed
      const expcetedTime = Math.floor(contentLength / this._speed * 1000) // ms

      // can downloaded within 50ms
      if (expcetedTime < 50) return

      this._dit = performance.now()

      this._startTick(contentLength, expcetedTime)
    }

    recordLoaded () {
      this._cleanTimer()

      const cost = performance.now() - this._dit // ms

      this._addSample(Math.floor(this._contentLength / cost))
    }

    // for fetch streaming request
    recordChunk (byteLength) {
      this._contentLength += byteLength

      if (!this._timer) {
        this._dit = performance.now()
        this._startTickForStream()
      }
    }

    _startTick (contentLength, interval) {
      this._cleanTimer()

      this._timer = setInterval(() => {
        const cost = performance.now() - this._dit

        this._addSample(Math.floor(contentLength / cost))
      }, interval)
    }

    _startTickForStream () {
      this._timer = setInterval(() => {
        const cost = performance.now() - this._dit

        this._addSample(Math.floor(this._contentLength / cost))

        this._dit = performance.now()

        this._contentLength = 0
      }, 500)
    }

    /**
     *
     * for stream: add sample every 500ms
     * for normal fetch request: add smpale sporadic， depend on donwload speed at that time
     *
     * @param {number} sample  KB/s
     */
    _addSample (sample) {
      this._recentSpeed = sample * 1000

      if (sample < 50) return

      if (this._sampleQueue.length > 10) {
        this._sampleQueue = this._sampleQueue.slice(5)
      }

      this._sampleQueue.push(sample)

      this._calcAvgSpeed(this._sampleQueue)
    }

    _calcAvgSpeed (list) {
      const len = list.length

      const avg = list.reduce((all, c) => {
        all += c
        return all
      }, 0) / len

      this._speed = Math.floor(avg) * 1000 // B/s

      console.log('speed: ', this._speed)
    }

    _cleanTimer () {
      clearTimeout(this._timer)
    }

    clean () {
      this._cleanTimer()
    }

    destroy () {
      clearTimeout(this._timer)
    }

    // average speed  (bps)
    get avgSpeed () {
      return this._speed * 8
    }

    // instant speed, there are shaking (bps)
    get recentSpeed () {
      return this._recentSpeed * 8
    }
}
