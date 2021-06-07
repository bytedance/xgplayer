import Stream from '../stream'

export default function avcC () {
  let stream = new Stream(this.data)
  this.configVersion = stream.readUint8()
  this.profile = stream.readUint8()
  this.profileCompatibility = stream.readUint8()
  this.AVCLevelIndication = stream.readUint8()
  this.lengthSizeMinusOne = (stream.readUint8() & 3) + 1
  this.numOfSequenceParameterSets = stream.readUint8() & 31
  let sequenceLength = stream.readUint16()
  this.sequenceLength = sequenceLength
  let sequence = []
  for (let i = 0; i < sequenceLength; i++) {
    sequence.push(Number(stream.readUint8()).toString(16))
  }
  this.ppsCount = stream.readUint8()
  let ppsLength = stream.readUint16()
  this.ppsLength = ppsLength
  let pps = []
  for (let i = 0; i < ppsLength; i++) {
    pps.push(Number(stream.readUint8()).toString(16))
  }
  this.pps = pps
  this.sequence = sequence
  let last = []; let dataviewLength = stream.dataview.byteLength
  while (stream.position < dataviewLength) {
    last.push(stream.readUint8())
  }
  this.last = last
  delete this.subBox
  delete this.data
  stream = null
}
