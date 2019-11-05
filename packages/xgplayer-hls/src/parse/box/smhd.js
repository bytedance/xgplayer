import Box from '../box'
import Stream from '../stream'

Box.smhd = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.balance = stream.readInt8() + '.' + stream.readInt8()
  delete this.subBox
  delete this.data
  stream = null
}
