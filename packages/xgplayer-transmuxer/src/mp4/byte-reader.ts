export class ByteReader {
  private dv: DataView
  start: number
  offset: number
  end: number
  constructor(buf: ArrayBuffer, offset: number, len: number) {
    this.dv = new DataView(buf)
    this.start = this.offset = offset || this.dv.byteOffset
    this.end = len ? this.start + len : this.dv.byteLength
  }
  static fromUint8(uint8: Uint8Array) {
    return new ByteReader(uint8.buffer, uint8.byteOffset, uint8.byteLength)
  }
  static concatUint8s(args: Uint8Array[]) {
    const uint8 = new Uint8Array(args.reduce((ret, v) => ret + v.byteLength, 0))
    let offset = 0
    args.forEach((v) => {
      uint8.set(v, offset)
      offset += v.byteLength
    })
    return uint8
  }
  static concatUint8(...args: Uint8Array[]) {
    return this.concatUint8s(args)
  }
  get buffer() {
    return this.dv.buffer
  }
  get unreadLength() {
    return Math.max(this.end - this.offset, 0)
  }
  get size() {
    return this.end - this.start
  }
  readFloat(byteNum: number) {
    let val = 0
    switch (byteNum) {
      case 4:
        val = this.dv.getFloat32(this.offset)
        break
      case 8:
        val = this.dv.getFloat64(this.offset)
        break
      default:
        throw new Error(`read ${byteNum}-byte float is not supported`)
    }
    this.offset += byteNum
    return val
  }
  back(byteNum: number) {
    this.offset -= byteNum
  }
  skip(byteNum: number) {
    this.offset += byteNum
  }
  readInt(byteNum: number) {
    const offset = this.offset
    this.offset += byteNum
    switch (byteNum) {
      case 1:
        return this.dv.getInt8(offset)
      case 2:
        return this.dv.getInt16(offset)
      case 4:
        return this.dv.getInt32(offset)
      default:
        throw new Error(`read ${byteNum}-byte integers is not supported`)
    }
  }
  read(byteNum: number) {
    const offset = this.offset
    this.offset += byteNum
    switch (byteNum) {
      case 1:
        return this.dv.getUint8(offset)
      case 2:
        return this.dv.getUint16(offset)
      case 3:
        return (this.dv.getUint16(offset) << 8) + this.dv.getUint8(offset + 2)
      case 4:
        return this.dv.getUint32(offset)
      default:
        this.back(byteNum - 4)
        // js不支持32位左移，可通过+、Math.pow运算达到64位以内运算的目的
        return this.read(byteNum - 4) + this.dv.getUint32(offset) * Math.pow(256, byteNum - 4)
    }
  }
  write(byteNum: number, val: number) {
    const offset = this.offset
    this.offset += byteNum
    switch (byteNum) {
      case 1:
        return this.dv.setUint8(offset, val)
      case 2:
        return this.dv.setUint16(offset, val)
      case 3:
        return this.dv.setUint8(offset, val >>> 16),
          this.dv.setUint16(offset + 1, 0xffff & val)
      case 4:
        return this.dv.setUint32(offset, val)
      default:
        throw new Error(`write ${byteNum}-byte integers is not supported`)
    }
  }
  readToBuffer(len?: number) {
    let buffer: ArrayBuffer
    if (this.offset || len) {
      buffer = this.dv.buffer.slice(this.offset, len ? this.offset + len : undefined)
    } else {
      buffer = this.dv.buffer
    }
    this.offset += buffer.byteLength
    return buffer
  }
  readToUint8(len?: number) {
    const uint8 = new Uint8Array(this.dv.buffer, this.offset, len || this.unreadLength)
    this.offset += uint8.byteLength
    return uint8
  }
  readString(len: number) {
    let i = 0, str = ''
    for (; i < len; i++) {
      str += String.fromCharCode(this.dv.getUint8(this.offset))
      this.offset++
    }
    return str
  }
}