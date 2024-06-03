export class ExpGolomb {
  _bytesAvailable

  _bitsAvailable = 0

  _word = 0

  constructor (data) {
    if (!data) throw new Error('ExpGolomb data params is required')
    this._data = data
    this._bytesAvailable = data.byteLength
    if (this._bytesAvailable) this._loadWord()
  }

  get bitsAvailable () {
    return this._bitsAvailable
  }

  _loadWord () {
    const position = this._data.byteLength - this._bytesAvailable
    const availableBytes = Math.min(4, this._bytesAvailable)
    if (availableBytes === 0) throw new Error('No bytes available')

    const workingBytes = new Uint8Array(4)
    workingBytes.set(this._data.subarray(position, position + availableBytes))

    this._word = new DataView(workingBytes.buffer).getUint32(0)
    this._bitsAvailable = availableBytes * 8
    this._bytesAvailable -= availableBytes
  }

  skipBits (count) {
    if (this._bitsAvailable > count) {
      this._word <<= count
      this._bitsAvailable -= count
    } else {
      count -= this._bitsAvailable
      const skipBytes = Math.floor(count / 8)
      count -= (skipBytes * 8)
      this._bytesAvailable -= skipBytes
      this._loadWord()
      this._word <<= count
      this._bitsAvailable -= count
    }
  }

  readBits (size) {
    if (size > 32) {
      throw new Error('Cannot read more than 32 bits')
    }

    let bits = Math.min(this._bitsAvailable, size)
    const val = this._word >>> (32 - bits)

    this._bitsAvailable -= bits
    if (this._bitsAvailable > 0) {
      this._word <<= bits
    } else if (this._bytesAvailable > 0) {
      this._loadWord()
    }

    bits = size - bits
    if (bits > 0 && this._bitsAvailable) {
      return (val << bits) | this.readBits(bits)
    }
    return val
  }

  skipLZ () {
    let leadingZeroCount
    for (
      leadingZeroCount = 0;
      leadingZeroCount < this._bitsAvailable;
      ++leadingZeroCount
    ) {
      if ((this._word & (0x80000000 >>> leadingZeroCount)) !== 0) {
        this._word <<= leadingZeroCount
        this._bitsAvailable -= leadingZeroCount
        return leadingZeroCount
      }
    }
    this._loadWord()
    return leadingZeroCount + this.skipLZ()
  }

  skipUEG () {
    this.skipBits(1 + this.skipLZ())
  }

  readUEG () {
    const clz = this.skipLZ()
    return this.readBits(clz + 1) - 1
  }

  readEG () {
    const val = this.readUEG()
    if (1 & val) {
      return (1 + val) >>> 1
    }
    return -1 * (val >>> 1)
  }

  readBool () {
    return this.readBits(1) === 1
  }

  readUByte () {
    return this.readBits(8)
  }

  skipScalingList (count) {
    let lastScale = 8
    let nextScale = 8
    let deltaScale
    for (let j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = this.readEG()
        nextScale = (lastScale + deltaScale + 256) % 256
      }
      lastScale = nextScale === 0 ? lastScale : nextScale
    }
  }
}
