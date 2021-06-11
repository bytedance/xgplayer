import Box from '../box'
import Stream from '../stream'

export default function avc1 () {
  let stream = new Stream(this.data)
  const self = this
  stream.skip(6)
  this.dataReferenceIndex = stream.readUint16()
  stream.skip(16)
  this.width = stream.readUint16()
  this.height = stream.readUint16()
  this.horizresolution = stream.readUint32()
  this.vertresolution = stream.readUint32()
  stream.skip(4)
  this.frameCount = stream.readUint16()
  stream.skip(1)
  for (let i = 0; i < 31; i++) {
    String.fromCharCode(stream.readUint8())
  }
  this.depth = stream.readUint16()
  stream.skip(2)
  while (stream.buffer.byteLength - stream.position >= 8) {
    const box = new Box()
    box.readHeader(stream)
    self.subBox.push(box)
    box.readBody(stream)
  }
  delete this.data
  stream = null
}
