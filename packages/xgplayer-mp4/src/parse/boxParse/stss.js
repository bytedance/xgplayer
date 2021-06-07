import Stream from '../stream'

export default function stss () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.count = stream.readUint32()
  let entries = []
  this.entries = entries
  for (let i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint32())
  }
  delete this.subBox
  delete this.data
  stream = null
}
