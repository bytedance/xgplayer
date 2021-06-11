import Stream from '../stream'

export default function vmhd () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = [stream.readUint8(), stream.readUint8(), stream.readUint8()]
  this.graphicsmode = stream.readUint16()
  this.opcolor = [stream.readUint16(), stream.readUint16(), stream.readUint16()]
  delete this.subBox
  delete this.data
  stream = null
}
