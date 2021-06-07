import Stream from '../stream'

export default function stsc () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.count = stream.readUint32()
  let entries = []
  this.entries = entries
  for (let i = 0, count = this.count; i < count; i++) {
    entries.push({
      first_chunk: stream.readUint32(),
      samples_per_chunk: stream.readUint32(),
      sample_desc_index: stream.readUint32()
    })
  }
  for (let i = 0, count = this.count, entry, preEntry; i < count - 1; i++) {
    entry = entries[i]
    preEntry = entries[i - 1]
    entry.chunk_count = entries[i + 1].first_chunk - entry.first_chunk
    entry.first_sample = i === 0 ? 1 : preEntry.first_sample + preEntry.chunk_count * preEntry.samples_per_chunk
  }
  if (this.count === 1) {
    let entry = entries[0]
    entry.first_sample = 1
    entry.chunk_count = 0
  } else if (this.count > 1) {
    let last = entries[this.count - 1]; let pre = entries[this.count - 2]
    last.first_sample = pre.first_sample + pre.chunk_count * pre.samples_per_chunk
    last.chunk_count = 0
  }
  delete this.subBox
  delete this.data
  stream = null
}
