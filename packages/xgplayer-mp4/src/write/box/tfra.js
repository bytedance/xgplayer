import Box from '../box'
Box.tfra = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.trackID)
  stream.writeUint32(data.trafTurnSampleNumber)
  stream.writeUint32(data.entries.length)
  let version = data.version
  data.entries.forEach(item => {
    if (version === 1) {
      stream.writeUint64(item.time)
      stream.writeUint64(item.moofOffset)
    } else {
      stream.writeUint32(item.time)
      stream.writeUint32(item.moofOffset)
    }
    stream.writeUint8(1)
    stream.writeUint8(1)
    stream.writeUint8(1)
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
