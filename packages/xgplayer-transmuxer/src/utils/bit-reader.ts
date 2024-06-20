import { ByteReader } from './byte-reader'

export class BitReader {
  private val: number
  size: number
  offset = 0
  constructor(val: number, size: number) {
    this.val = val
    this.size = size
  }
  static fromByte(byte: ByteReader, len: number) {
    return new BitReader(byte.read(len), len << 3)
  }
  skip(len: number) {
    this.offset += len
  }
  read(len: number) {
    const unreadLength = this.size - this.offset - len

    if (unreadLength >= 0) {
      let bits = 0, i = 0
      this.offset += len
      // 32位及以上的整数不支持位移运算，使用 / + Math.pow 规避
      if (this.size > 31) {
        for (; i < len; i++) {
          bits += Math.pow(2, i)
        }
        return this.val / Math.pow(2, unreadLength) & bits
      } else {
        for (; i < len; i++) {
          bits += 1 << i
        }
        return this.val >>> unreadLength & bits
      }
    }
    throw new Error(`the number of the read operation exceeds the total length limit of bits`)
  }
}