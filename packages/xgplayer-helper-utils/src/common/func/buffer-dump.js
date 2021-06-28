if (typeof window !== 'undefined') {
  window.TimeRanges.prototype.dump = function () {
    let len = this.length
    let ret = ''

    for (let i = 0; i < len; i++) {
      ret += `${this.start(i)}~${this.end(i)} `
    };
    console.log(ret)
  }
}
