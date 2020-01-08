import Stream from './stream'
import Errors from '../error'
class Box {
  constructor () {
    this.headSize = 8
    this.size = 0
    this.type = ''
    this.subBox = []
    this.start = -1
  }
  readHeader (stream) {
    this.start = stream.position
    this.size = stream.readUint32()
    this.type = String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8())
    if (this.size === 1) {
      this.size = stream.readUint64()
    } else if (this.size === 0) {
      if (this.type !== 'mdat') {
        throw new Errors('parse', '', {line: 19, handle: '[Box] readHeader', msg: 'parse mp4 mdat box failed'})
      }
    }
    if (this.type === 'uuid') {
      let uuid = []
      for (let i = 0; i < 16; i++) {
        uuid.push(stream.readUint8())
      }
    }
  }
  readBody (stream) {
    let end = this.size - stream.position + this.start
    let type = this.type
    this.data = stream.buffer.slice(stream.position, stream.position + end)
    stream.position += this.data.byteLength
    let parser
    if (Box.containerBox.find(item => item === type)) {
      parser = Box.containerParser
    } else {
      parser = Box[type]
    }
    if (parser && parser instanceof Function) {
      parser.call(this)
    }
  }
  read (stream) {
    this.readHeader(stream)
    this.readBody(stream)
  }

  static containerParser () {
    let stream = new Stream(this.data)
    let size = stream.buffer.byteLength
    let self = this
    while (stream.position < size) {
      let box = new Box()
      box.readHeader(stream)
      self.subBox.push(box)
      box.readBody(stream)
    }
    delete self.data
    stream = null
  }
}

Box.containerBox = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl', 'mvex', 'moof', 'traf', 'mfra']

export default Box
