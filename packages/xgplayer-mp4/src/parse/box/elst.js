import Box from '../box'
import Stream from '../stream'

Box.elst = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  let entries = []
  let entry_count = stream.readUint32()
  this.entries = entries
  for (let i = 0; i < entry_count; i++) {
    let entry = {}
    entries.push(entry)
    if (this.version === 1) {
      entry.segment_duration = stream.readUint64()
      entry.media_time = stream.readUint64()
    } else {
      entry.segment_duration = stream.readUint32()
      entry.media_time = stream.readInt32()
    }
    entry.media_rate_integer = stream.readInt16()
    entry.media_rate_fraction = stream.readInt16()
  }
  delete this.subBox
  delete this.data
  stream = null
}
