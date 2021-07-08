import Stream from '../stream'

export default function smhd () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.balance = stream.readInt8() + '.' + stream.readInt8()
  delete this.subBox
  delete this.data
  stream = null
}
