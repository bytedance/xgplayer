import Box from '../box'
Box.hdlr = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.fill(4)
  stream.writeStr(data.handleType)
  stream.fill(12)
  stream.writeStr(data.name)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
