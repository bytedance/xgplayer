import Box from '../box'

Box.ctts = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.entryCount)
  data.entry.forEach(item => {
    stream.writeUint32(item.count)
    stream.writeUint32(item.offset)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
