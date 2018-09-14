import Box from '../box'
Box.avcC = function (data, output) {
  let stream = this.stream
  stream.writeUint8(data.configVersion)
  stream.writeUint8(data.profile)
  stream.writeUint8(data.profileCompatibility)
  stream.writeUint8(data.AVCLevelIndication)
  stream.writeUint8(data.lengthSizeMinusOne - 1)
  stream.writeUint8(data.numOfSequenceParameterSets)
  stream.writeUint16(data.sequenceLength)
  data.sequence.forEach(item => {
    stream.writeUint8(Number('0x' + item))
  })
  stream.writeUint8(data.ppsCount)
  stream.writeUint16(data.ppsLength)
  data.pps.forEach(item => {
    stream.writeUint8(Number('0x' + item))
  })
  if (data.last.length) {
    data.last.forEach(item => {
      stream.writeUint8(item)
    })
  }

  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  if (stream.position !== data.size - 8) {
    throw new Error(`${data.type} box incomplete`)
  } else {
    this.outputSize = stream.position
  }
  delete this.data
}
