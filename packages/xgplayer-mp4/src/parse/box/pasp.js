import Box from '../box'
import Stream from '../stream'
Box.pasp = function () {
  let stream = new Stream(this.data)
  this.content = stream.buffer.slice(0, this.size - 8)
  delete this.subBox
  delete this.data
  stream = null
}
