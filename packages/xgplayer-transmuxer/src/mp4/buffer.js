// 改造为兼容IE11
function Concat(ResultConstructor, ...arrays) {
  let totalLength = 0
  arrays.forEach(arr => {
    totalLength += arr.length
  })
  const result = new ResultConstructor(totalLength)
  let offset = 0
  arrays.forEach(arr => {
    result.set(arr, offset)
    offset += arr.length
  })
  return result
}

class Buffer {
  constructor() {
    this.buffer = new Uint8Array(0)
  }

  write(...buffer) {
    buffer.forEach(item => {
      if (item) {
        this.buffer = Concat(Uint8Array, this.buffer, item)
      } else {
        window.console.warn(item)
      }
    })
  }

  static writeUint16(value) {
    return new Uint8Array([(value >> 8) & 0xff, value & 0xff])
  }

  static writeUint32(value) {
    return new Uint8Array([
      value >> 24,
      (value >> 16) & 0xff,
      (value >> 8) & 0xff,
      value & 0xff
    ])
  }
}

export default Buffer
