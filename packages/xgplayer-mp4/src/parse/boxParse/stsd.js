import Box from '../box'
import Stream from '../stream'

export default function stsd () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.entryCount = stream.readUint32()
  const box = new Box()
  box.readHeader(stream)
  this.subBox.push(box)
  box.readBody(stream)
  delete this.data
  stream = null
}
