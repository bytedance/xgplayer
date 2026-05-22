/* eslint-disable no-unused-vars */
import Box from './box'
import Concat from 'concat-typed-array'
import Stream from './stream'
import * as SubBox from './box/*.js'

class Parse {
  constructor (buffer) {
    this.buffer = null
    this.boxes = []
    this.nextBox = null
    this.start = 0
    const self = this
    if (self.buffer) {
      Concat(Uint8Array, self.buffer, buffer)
    } else {
      self.buffer = buffer
    }
    const bufferLength = buffer.byteLength
    buffer.position = 0
    const stream = new Stream(buffer)
    while (bufferLength - stream.position >= 8) {
      const box = new Box()
      box.readHeader(stream)
      if (box.size - 8 <= (bufferLength - stream.position)) {
        box.readBody(stream)
        self.boxes.push(box)
      } else {
        if (box.type === 'mdat') {
          box.readBody(stream)
          self.boxes.push(box)
        } else {
          self.nextBox = box
          stream.position -= 8
          break
        }
      }
    }
    self.buffer = new Uint8Array(self.buffer.slice(stream.position))
  }
}

export default Parse
