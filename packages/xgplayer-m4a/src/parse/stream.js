import Errors from '../error'
class Stream {
  constructor (buffer) {
    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer
      this.dataview = new DataView(buffer)
      this.dataview.position = 0
    } else {
      throw new Errors('parse', '', {line: 9, handle: '[Stream] constructor', msg: 'data is valid'})
    }
  }

  set position (value) {
    this.dataview.position = value
  }

  get position () {
    return this.dataview.position
  }

  skip (count) {
    let loop = Math.floor(count / 4)
    let last = count % 4
    for (let i = 0; i < loop; i++) {
      Stream.readByte(this.dataview, 4)
    }
    if (last > 0) {
      Stream.readByte(this.dataview, last)
    }
  }

  /**
     * [readByte 从DataView中读取数据]
     * @param  {DataView} buffer [DataView实例]
     * @param  {Number} size   [读取字节数]
     * @return {Number}        [整数]
     */
  static readByte (buffer, size, sign) {
    let res
    switch (size) {
      case 1:
        if (sign) {
          res = buffer.getInt8(buffer.position)
        } else {
          res = buffer.getUint8(buffer.position)
        }
        break
      case 2:
        if (sign) {
          res = buffer.getInt16(buffer.position)
        } else {
          res = buffer.getUint16(buffer.position)
        }
        break
      case 3:
        if (sign) {
          throw 'not supported for readByte 3'
        } else {
          res = buffer.getUint8(buffer.position) << 16
          res |= buffer.getUint8(buffer.position + 1) << 8
          res |= buffer.getUint8(buffer.position + 2)
        }
        break
      case 4:
        if (sign) {
          res = buffer.getInt32(buffer.position)
        } else {
          res = buffer.getUint32(buffer.position)
        }
        break
      case 8:
        if (sign) {
          throw new Errors('parse', '', {line: 73, handle: '[Stream] readByte', msg: 'not supported for readBody 8'})
        } else {
          res = buffer.getUint32(buffer.position) << 32
          res |= buffer.getUint32(buffer.position + 4)
        }
        break
      default:
        res = ''
    }
    buffer.position += size
    return res
  }

  readUint8 () {
    return Stream.readByte(this.dataview, 1)
  }

  readUint16 () {
    return Stream.readByte(this.dataview, 2)
  }

  readUint32 () {
    return Stream.readByte(this.dataview, 4)
  }

  readUint64 () {
    return Stream.readByte(this.dataview, 8)
  }

  readInt8 () {
    return Stream.readByte(this.dataview, 1, true)
  }
  readInt16 () {
    return Stream.readByte(this.dataview, 2, true)
  }
  readInt32 () {
    return Stream.readByte(this.dataview, 4, true)
  }
}

export default Stream
