import Box from '../box'
Box.vmhd = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  data.flag.forEach(item => {
    stream.writeUint8(item)
  })
  stream.writeUint16(data.graphicsmode)
  data.opcolor.forEach(item => {
    stream.writeUint16(item)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
