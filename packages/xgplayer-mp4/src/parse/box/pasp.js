import Box from '../box'
import Stream from '../stream'
Box.pasp = function () {
  let stream = new Stream(this.data)
	this.hSpacing = stream.readUint32();
	this.vSpacing = stream.readUint32();
  stream = null
}
