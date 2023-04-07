import Box from '../box'

Box.ftyp = function (data, output) {
  const stream = this.stream
  stream.writeStr(data.major_brand)
  stream.writeUint32(data.minor_version)
  data.compatible_brands.forEach(item => {
    stream.writeStr(item)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
