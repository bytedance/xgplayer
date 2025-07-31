/* eslint-disable no-unused-vars */

import Concat from 'concat-typed-array'
import Box from './box'
import Stream from './stream'

class Parse {
  constructor(buffer) {
    this.buffer = null
    this.boxes = []
    this.nextBox = null
    this.start = 0
    if (this.buffer) {
      Concat(Uint8Array, this.buffer, buffer)
    } else {
      this.buffer = buffer
    }
    const bufferLength = buffer.byteLength
    buffer.position = 0
    const stream = new Stream(buffer)
    while (bufferLength - stream.position >= 8) {
      const box = new Box()
      box.readHeader(stream)
      if (box.size - 8 <= bufferLength - stream.position) {
        box.readBody(stream)
        this.boxes.push(box)
      } else {
        if (box.type === 'mdat') {
          box.readBody(stream)
          this.boxes.push(box)
        } else {
          this.nextBox = box
          stream.position -= 8
          break
        }
      }
    }
    this.buffer = new Uint8Array(this.buffer.slice(stream.position))
  }
}

export default Parse
