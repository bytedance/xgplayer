import Box from '../box'
Box.tfdt = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  if (data.version === 0) {
    stream.writeUint32(data.decodeTime)
  } else {
    stream.writeUint64(data.decodeTime)
  }
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
