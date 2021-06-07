import Stream from '../stream'

export default function iods () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  let content = []
  let length = stream.buffer.byteLength
  while (stream.position < length) {
    content.push(stream.readUint8())
  }
  this.content = content
  delete this.subBox
  delete this.data
  stream = null
}
