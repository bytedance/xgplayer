import Concat from 'concat-typed-array'

class Buffer {
  constructor () {
    this.buffer = new Uint8Array(0)
  }

  write (...buffer) {
    const self = this
    buffer.forEach(item => {
      if (item) {
        self.buffer = Concat(Uint8Array, self.buffer, item)
      } else {
        window.console.error(item)
      }
    })
  }

  static writeUint32 (value) {
    return new Uint8Array([
      value >> 24,
      (value >> 16) & 0xff,
      (value >> 8) & 0xff,
      value & 0xff
    ])
  }
}

export default Buffer
