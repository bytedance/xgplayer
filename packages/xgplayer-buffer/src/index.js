import Track from './Track'

export class XgBuffer {
  /**
   * A buffer to store loaded data.
   *
   * @class LoaderBuffer
   * @param {number} length - Optional the buffer size
   */
  constructor (length) {
    this.length = length || 0
    this.historyLen = length || 0
    this.array = []
    this.offset = 0
  }

  /**
   * The function to push data.
   *
   * @param {number} data - The data to push into the buffer
   */
  push (data) {
    this.array.push(data)
    this.length += data.byteLength
    this.historyLen += data.byteLength
  }

  /**
   * The function to shift data.
   *
   * @param {number} length - The size of shift.
   */
  shift (length) {
    if (this.array.length < 1) {
      return new Uint8Array(0)
    }

    if (length === undefined) {
      return this._shiftBuffer()
    }
    if ((this.offset + length) === this.array[0].length) {
      let ret = this.array[0].slice(this.offset, this.offset + length)
      this.offset = 0
      this.array.shift()
      this.length -= length
      return ret
    }

    if ((this.offset + length) < this.array[0].length) {
      let ret = this.array[0].slice(this.offset, this.offset + length)
      this.offset += length
      this.length -= length
      return ret
    }

    let ret = new Uint8Array(length)
    let tmpoff = 0
    while (this.array.length > 0 && length > 0) {
      if ((this.offset + length) < this.array[0].length) {
        let tmp = this.array[0].slice(this.offset, this.offset + length)
        ret.set(tmp, tmpoff)
        this.offset += length
        this.length -= length
        length = 0
        break
      } else {
        let templength = this.array[0].length - this.offset
        ret.set(this.array[0].slice(this.offset, this.array[0].length), tmpoff)
        this.array.shift()
        this.offset = 0
        tmpoff += templength
        this.length -= templength
        length -= templength
      }
    }
    return ret
  }

  /**
   * Function to clear the buffer.
   */
  clear () {
    this.array = []
    this.length = 0
    this.offset = 0
  }

  destroy () {
    this.clear()
    this.historyLen = 0
  }

  /**
   * Function to shift one unit8Array.
   */
  _shiftBuffer () {
    this.length -= this.array[0].length
    this.offset = 0
    return this.array.shift()
  }

  /**
   * Convert uint8 data to number.
   *
   * @param {number} start - the start postion.
   * @param {number} length - the length of data.
   */
  toInt (start, length) {
    let retInt = 0
    let i = this.offset + start
    while (i < this.offset + length + start) {
      if (i < this.array[0].length) {
        retInt = retInt * 256 + this.array[0][i]
      } else if (this.array[1]) {
        retInt = retInt * 256 + this.array[1][i - this.array[0].length]
      }

      i++
    }
    return retInt
  }

  readUint8() {
    if(this.length < 1) {
      return;
    }
    return this.array[0][this.offset];
  }
}

export class AudioTrack extends Track {
  /**
   * The constructor for audio track.
   */
  constructor () {
    super()
    this.TAG = 'AudioTrack'
    this.type = 'audio'
  }
}

export class VideoTrack extends Track {
  /**
   * The constructor for video track.
   */
  constructor () {
    super()
    this.TAG = 'VideoTrack'
    this.type = 'video'
    this.dropped = 0
  }
  /**
   * reset the video track.
   */
  reset () {
    this.sequenceNumber = 0
    this.samples = []
    this.length = 0
    this.dropped = 0
  }
}
