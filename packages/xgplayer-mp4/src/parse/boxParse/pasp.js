import Stream from '../stream'

export default function pasp () {
  let stream = new Stream(this.data)
  this.content = stream.buffer.slice(0, this.size - 8)
  delete this.subBox
  delete this.data
  stream = null
}
