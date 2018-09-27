import Box from '../box'

Box.dref = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.entryCount)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  let self = this
  data.subBox.forEach(item => {
    let box = new Box(item, self.output)
    self.subBox.push(box)
    box.writeBody()
  })
  let writeSize = stream.position
  self.subBox.forEach(item => {
    writeSize += item.stream.position + 8
  })
  if (writeSize !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
