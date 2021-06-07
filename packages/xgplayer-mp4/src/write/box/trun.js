import Box from '../box'
Box.trun = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.version)
  stream.writeUint24(data.flag)
  stream.writeUint32(data.sampleCount)
  stream.writeInt32(data.dataOffset)
  if (data.firstSampleFlags) {
    stream.writeUint32(data.firstSampleFlags)
    if (data.sampleDuration) {
      data.samples.forEach(item => {
        stream.writeUint32(item.size)
        stream.writeUint32(item.offsetTime)
      })
    } else {
      data.samples.forEach(item => {
        stream.writeUint32(item.duration)
        stream.writeUint32(item.size)
        stream.writeUint32(item.offsetTime)
      })
    }
  } else {
    if (data.sampleDuration) {
      data.samples.forEach(item => {
        stream.writeUint32(item.size)
      })
    } else {
      data.samples.forEach(item => {
        stream.writeUint32(item.duration)
        stream.writeUint32(item.size)
      })
    }
  }

  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  }
  delete this.data
}
