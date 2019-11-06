export default class TimeRanges {
  constructor (ranges) {
    this.ranges = ranges || [];
  }

  start (idx) {
    return this.ranges[idx] ? this.ranges[idx].start : 0
  }

  end (idx) {
    return this.ranges[idx] ? this.ranges[idx].end : 0
  }

  add (range) {
    this.ranges.push(range)
  }

  get length () {
    return this.ranges.length
  }
}
