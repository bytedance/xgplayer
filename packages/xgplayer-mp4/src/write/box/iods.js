import Box from '../box'
Box.iods = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  data.content.forEach(item => {
    stream.writeUint8(item)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
