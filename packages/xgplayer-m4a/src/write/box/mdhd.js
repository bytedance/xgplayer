import Box from '../box'
Box.mdhd = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  let version = data.version
  if (version === 1) {
    stream.writeUint64(data.create)
    stream.writeUint64(data.modify)
    stream.writeUint32(data.timescale)
    stream.writeUint64(data.duration)
  } else {
    stream.writeUint32(data.create)
    stream.writeUint32(data.modify)
    stream.writeUint32(data.timescale)
    stream.writeUint32(data.duration)
  }
  stream.writeUint16(data.language)
  stream.writeUint16()
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
