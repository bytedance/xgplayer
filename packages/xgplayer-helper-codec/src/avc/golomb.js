class Golomb {
  constructor (uint8array) {
    this.TAG = 'Golomb'
    this._buffer = uint8array
    this._bufferIndex = 0
    this._totalBytes = uint8array.byteLength
    this._totalBits = uint8array.byteLength * 8
    this._currentWord = 0
    this._currentWordBitsLeft = 0
  }

  destroy () {
    this._buffer = null
  }

  _fillCurrentWord () {
    let bufferBytesLeft = this._totalBytes - this._bufferIndex
    if (bufferBytesLeft <= 0) {
      // TODO 异常处理
    }

    let bytesRead = Math.min(4, bufferBytesLeft)
    let word = new Uint8Array(4)
    word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead))
    this._currentWord = new DataView(word.buffer).getUint32(0)

    this._bufferIndex += bytesRead
    this._currentWordBitsLeft = bytesRead * 8
  }

  readBits (size) {
    let bits = Math.min(this._currentWordBitsLeft, size);// :uint
    let valu = this._currentWord >>> (32 - bits);
    if (size > 32) {
      throw new Error('Cannot read more than 32 bits at a time');
    }
    this._currentWordBitsLeft -= bits;
    if (this._currentWordBitsLeft > 0) {
      this._currentWord <<= bits;
    } else if (this._totalBytes - this._bufferIndex > 0) {
      this._fillCurrentWord();
    }

    bits = size - bits;
    if (bits > 0 && this._currentWordBitsLeft) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  }

  readBool () {
    return this.readBits(1) === 1
  }

  readByte () {
    return this.readBits(8)
  }

  _skipLeadingZero () {
    let zeroCount
    for (zeroCount = 0; zeroCount < this._currentWordBitsLeft; zeroCount++) {
      if ((this._currentWord & (0x80000000 >>> zeroCount)) !== 0) {
        this._currentWord <<= zeroCount
        this._currentWordBitsLeft -= zeroCount
        return zeroCount
      }
    }
    this._fillCurrentWord()
    return zeroCount + this._skipLeadingZero()
  }

  readUEG () { // unsigned exponential golomb
    let leadingZeros = this._skipLeadingZero()
    return this.readBits(leadingZeros + 1) - 1
  }

  readSEG () { // signed exponential golomb
    let value = this.readUEG()
    if (value & 0x01) {
      return (value + 1) >>> 1
    } else {
      return -1 * (value >>> 1)
    }
  }

  readSliceType () {
    // skip NALu type Nal unit header 8bit
    this.readByte();
    // discard first_mb_in_slice
    this.readUEG();
    // return slice_type
    return this.readUEG();
  }
}

export default Golomb
