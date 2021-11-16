import Box from '../box'
import Stream from '../stream'


Box.schm = function () {
  let stream = new Stream(this.data)
	this.scheme_version = stream.readUint32();
  this.scheme_type = '';
  for (var i = 0; i < 4; i++) {
    this.scheme_type += String.fromCharCode(stream.readUint8());
  }
	if (this.flags & 0x000001) {
    this.scheme_uri = '';
    for (var i = 0; i < this.size - this.hdr_size - 8; i++) {
      this.scheme_uri += String.fromCharCode(stream.readUint8());
    }
	}
}
