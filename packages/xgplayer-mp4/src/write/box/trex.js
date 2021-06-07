import Box from '../box'
Box.trex = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.trackID)
  stream.writeUint32(data.index)
  stream.writeUint32(data.duration)
  stream.writeUint32(data.dsize)
  stream.writeUint32(data.flags)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
