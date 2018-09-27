import Box from '../box'
Box.pasp = function (data, output) {
  let stream = this.stream
  stream.position = data.content.byteLength
  output.write(new Uint8Array(data.content))
  if (data.content.byteLength !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
