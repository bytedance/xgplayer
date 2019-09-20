import Concat from 'concat-typed-array'

class Buffer {
  constructor (buffer) {
    this.buffer = buffer || new Uint8Array(0)
  }

  write (...buffer) {
    buffer.forEach(item => {
      this.buffer = Concat(Uint8Array, this.buffer, item)
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

  static readAsInt (arr) {
    let temp = ''

    function padStart4Hex (hexNum) {
      let hexStr = hexNum.toString(16)
      return hexStr.padStart(2, '0')
    }

    arr.forEach(num => {
      temp += padStart4Hex(num)
    })
    return parseInt(temp, 16)
  }
}

export default Buffer
