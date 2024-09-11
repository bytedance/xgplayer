class IntervalTimer {
  constructor () {
    this.timeID = null
    this.func = null
  }

  repeat (func, ms) {
    if (this.func === null) {
      this.func = func
    }

    if (this.func !== func) {
      return
    }

    this.timeID = setTimeout(() => {
      func()
      this.repeat(func, ms)
    }, ms)
  }

  clear () {
    clearTimeout(this.timeID)
  }
}

export default IntervalTimer
