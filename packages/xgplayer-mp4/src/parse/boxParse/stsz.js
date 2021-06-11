import Stream from '../stream'

export default function stsz () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.sampleSize = stream.readUint32()
  this.count = stream.readUint32()
  const entries = []
  this.entries = entries
  for (let i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint32())
  }
  delete this.subBox
  delete this.data
  stream = null
}
