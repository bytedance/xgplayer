import Box from '../box'
import Stream from '../stream'
Box.btrt = function () {
  let stream = new Stream(this.data)
  this.bufferSizeDB = stream.readUint32()
  this.maxBitrate = stream.readUint32()
  this.avgBitrate = stream.readUint32()
  delete this.subBox
  delete this.data
  stream = null
}
