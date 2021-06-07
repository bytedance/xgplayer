/* eslint-disable camelcase */
import Stream from '../stream'

export default function elst () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  let entries = []
  let entry_count = stream.readUint32()
  this.empty_duration = 0; // empty duration of the first edit list entry
  this.start_time = 0; // start time of the media
  let edit_start_index = 0;
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

    if (i === 0 && entry.media_time === -1) {
      /* if empty, the first entry is the start time of the stream
          * relative to the presentation itself */
      this.empty_duration = entry.segment_duration;
      edit_start_index = 1;
    } else if (i === edit_start_index && entry.media_time >= 0) {
      this.start_time = entry.media_time;
    }
  }

  delete this.subBox
  delete this.data
  stream = null
}
