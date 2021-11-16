import Box from '../box'
import Stream from '../stream'

Box.frma = function () {
  let stream = new Stream(this.data)
  this.data_format = '';
  for (var i = 0; i < 4; i++) {
    this.data_format += String.fromCharCode(stream.readUint8());
  }
}
