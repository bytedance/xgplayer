import Box from '../box'
Box.btrt = function (data, output) {
  const stream = this.stream
  stream.writeUint32(this.bufferSizeDB)
  stream.writeUint32(this.maxBitrate)
  stream.writeUint32(this.avgBitrate)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
