import Box from '../box'
import Stream from '../stream'
import UTC from '../date'

Box.mdhd = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  if (this.version === 1) {
    this.create = stream.readUint64()
    this.modify = stream.readUint64()
    this.createTime = new UTC().setTime(this.create * 1000)
    this.modifyTime = new UTC().setTime(this.modify * 1000)
    this.timescale = stream.readUint32()
    this.duration = stream.readUint64()
  } else {
    this.create = stream.readUint32()
    this.modify = stream.readUint32()
    this.createTime = new UTC().setTime(this.create * 1000)
    this.modifyTime = new UTC().setTime(this.modify * 1000)
    this.timescale = stream.readUint32()
    this.duration = stream.readUint32()
  }
  this.language = stream.readUint16()
  stream.readUint16()
  delete this.subBox
  delete this.data
  stream = null
}
