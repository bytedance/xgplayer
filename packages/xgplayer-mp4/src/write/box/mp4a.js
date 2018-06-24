import Box from '../box'
Box.mp4a = function (data, output) {
  let stream = this.stream
  let self = this
  stream.fill(6)
  stream.writeUint16(data.dataReferenceIndex)
  stream.fill(8)
  stream.writeUint16(data.channelCount)
  stream.writeUint16(data.sampleSize)
  stream.fill(4)
  stream.writeUint32(data.sampleRate)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  let outputSize = stream.position
  data.subBox.forEach(item => {
    let box = new Box(item, self.output)
    self.subBox.push(box)
    box.writeBody()
    outputSize += box.outputSize + 8
  })
  if (outputSize !== data.size - 8) {
    throw new Error(`${data.type} box incomplete,outputSize=${outputSize},size=${data.size}`)
  } else {
    this.outputSize = outputSize
  }
  delete this.data
}
