import Box from '../box'
import Stream from '../stream'

Box.co64 = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.count = stream.readUint32()
  let entries = []
  this.entries = entries
  for (let i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint64())
  }
  delete this.subBox
  delete this.data
  stream = null
}
