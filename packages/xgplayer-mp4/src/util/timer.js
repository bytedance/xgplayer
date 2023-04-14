export default class Timer {
  constructor (onTick) {
    this.onTick_ = onTick
    this.cancelPending_ = null
  }

  tickAfter (delayInSeconds, callback = null) {
    this.stop()
    let alive = true
    let timeoutId = null

    this.cancelPending_ = () => {
      window.clearTimeout(timeoutId)
      alive = false
    }

    const onTick = () => {
      if (alive) {
        this.onTick_()
        if (callback) {
          callback()
        }
      }
    }

    timeoutId = window.setTimeout(onTick, delayInSeconds * 1000)

    return this
  }

  tickEvery (seconds) {
    this.tickAfter(seconds, () => {
      this.tickEvery(seconds)
    })
  }

  stop () {
    if (this.cancelPending_) {
      this.cancelPending_()
      this.cancelPending_ = null
    }
  }
}
