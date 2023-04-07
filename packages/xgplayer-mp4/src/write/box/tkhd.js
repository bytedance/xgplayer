import Box from '../box'
Box.tkhd = function (data, output) {
  const stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  if (data.version === 1) {
    stream.writeUint64(data.create)
    stream.writeUint64(data.modify)
    stream.writeUint32(data.trackID)
    stream.writeUint32(data.reserverd)
    stream.writeUint64(data.duration)
  } else {
    stream.writeUint32(data.create)
    stream.writeUint32(data.modify)
    stream.writeUint32(data.trackID)
    stream.writeUint32(data.reserverd)
    stream.writeUint32(data.duration)
  }
  stream.fill(8)
  stream.writeInt16(data.layer)
  stream.writeInt16(data.alternate_group)
  stream.writeInt16(data.volume << 8)
  stream.fill(2)

  data.matrix.forEach(item => {
    const matrix = item.split('.')
    stream.writeUint16(matrix[0])
    stream.writeUint16(matrix[1])
  })

  const width = data.width.split('.')
  const height = data.height.split('.')
  stream.writeUint16(width[0])
  stream.writeUint16(width[1])
  stream.writeUint16(height[0])
  stream.writeUint16(height[1])
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
