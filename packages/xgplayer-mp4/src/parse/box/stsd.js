import Box from '../box'
import Stream from '../stream'
Box.stsd = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.entryCount = stream.readUint32()
  let box = new Box()
  box.readHeader(stream)
  this.subBox.push(box)
  box.readBody(stream)
  delete this.data
  stream = null
}
