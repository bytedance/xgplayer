import Box from '../box'

Box.elst = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.entries.length)
  let version = data.version
  data.entries.forEach(item => {
    if (version === 1) {
      stream.writeUint64(item.segment_duration)
      stream.writeUint64(item.media_time)
    } else {
      stream.writeUint32(item.segment_duration)
      stream.writeInt32(item.media_time)
    }
    stream.writeInt16(item.media_rate_integer)
    stream.writeInt16(item.media_rate_fraction)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
