import Box from '../box'
import Stream from '../stream'

Box.ctts = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)

  this.entryCount = stream.readUint32()
  let entry = []
  this.entry = entry
  for (let i = 0, count = this.entryCount; i < count; i++) {
    entry.push({
      count: stream.readUint32(),
      offset: stream.readUint32()
    })
  }
  delete this.subBox
  delete this.data
  stream = null
}
