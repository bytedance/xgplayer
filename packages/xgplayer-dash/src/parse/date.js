class UTC {
  constructor () {
    const time = new Date()
    time.setFullYear(1904)
    time.setMonth(0)
    time.setDate(1)
    time.setHours(0)
    time.setMinutes(0)
    time.setSeconds(0)
    this.time = time
  }

  setTime (value) {
    this.time.setTime(this.time.getTime() + value * 1)
    return this.time.toLocaleString()
  }
}

export default UTC
