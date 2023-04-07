import Box from '../box'

Box.esds = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  Box.MP4ESDescrTag(data.subBox[0], output)
  this.outputSize = data.size - 8
  delete this.data
}
