"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Golomb {
  constructor(uint8array) {
    this.TAG = 'Golomb';
    this._buffer = uint8array;
    this._bufferIndex = 0;
    this._totalBytes = uint8array.byteLength;
    this._totalBits = uint8array.byteLength * 8;
    this._currentWord = 0;
    this._currentWordBitsLeft = 0;
  }

  destroy() {
    this._buffer = null;
  }

  _fillCurrentWord() {
    let bufferBytesLeft = this._totalBytes - this._bufferIndex;

    if (bufferBytesLeft <= 0) {// TODO 异常处理
    }

    let bytesRead = Math.min(4, bufferBytesLeft);
    let word = new Uint8Array(4);
    word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
    this._currentWord = new DataView(word.buffer).getUint32(0, false);
    this._bufferIndex += bytesRead;
    this._currentWordBitsLeft = bytesRead * 8;
  }

  readBits(bits) {
    if (bits > 32) {// TODO
    }

    if (bits <= this._currentWordBitsLeft) {
      let result = this._currentWord >>> 32 - bits;
      this._currentWord <<= bits;
      this._currentWordBitsLeft -= bits;
      return result;
    }

    let result = this._currentWordBitsLeft ? this._currentWord : 0; // eslint-disable-next-line

    result >>> 32 - this._currentWordBitsLeft;
    let bitsNeedLeft = bits - this._currentWordBitsLeft;

    this._fillCurrentWord();

    let bitsReadNext = Math.min(bitsNeedLeft, this._currentWordBitsLeft);
    let result2 = this._currentWord >>> 32 - bitsReadNext;
    this._currentWord <<= bitsReadNext;
    this._currentWordBitsLeft -= bitsReadNext;
    result = result << bitsReadNext | result2;
    return result;
  }

  readBool() {
    return this.readBits(1) === 1;
  }

  readByte() {
    return this.readBits(8);
  }

  _skipLeadingZero() {
    let zeroCount;

    for (zeroCount = 0; zeroCount < this._currentWordBitsLeft; zeroCount++) {
      if ((this._currentWord & 0x80000000 >>> zeroCount) !== 0) {
        this._currentWord <<= zeroCount;
        this._currentWordBitsLeft -= zeroCount;
        return zeroCount;
      }
    }

    this._fillCurrentWord();

    return zeroCount + this._skipLeadingZero();
  }

  readUEG() {
    // unsigned exponential golomb
    let leadingZeros = this._skipLeadingZero();

    return this.readBits(leadingZeros + 1) - 1;
  }

  readSEG() {
    // signed exponential golomb
    let value = this.readUEG();

    if (value & 0x01) {
      return value + 1 >>> 1;
    } else {
      return -1 * (value >>> 1);
    }
  }

}

exports.default = Golomb;