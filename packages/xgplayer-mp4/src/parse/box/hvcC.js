import Box from '../box'
import Stream from '../stream'
import SpsParser from './sps'

Box.hvcC = function () {
  let stream = new Stream(this.data)
  this.configVersion = stream.readUint8()
  this.profile = stream.readUint8()
  this.profileCompatibility = stream.readUint32()
  this.constraintIndicatorFlags = []
  for (let i = 0; i < 6; i++) {
    this.constraintIndicatorFlags.push(Number(stream.readUint8()).toString(16))
  }
  this.levelIdc = stream.readUint8()
  this.profileCompatibilityIndications = stream.readUint32()
  this.bitDepthLumaMinus8 = stream.readUint8()
  this.bitDepthChromaMinus8 = stream.readUint8()
  this.avgFrameRate = stream.readUint16()
  this.constantFrameRate = stream.readUint8()
  this.numOfArrays = stream.readUint8()

  this.vpsHeader = stream.readUint24()
  this.vpsLength = stream.readUint16()
  let vps = []
  for (let i = 0; i < this.vpsLength; i++) {
    vps.push(Number(stream.readUint8()).toString(16))
  }
  this.vps = vps

  this.spsHeader = stream.readUint24()
  this.spsLength = stream.readUint16()
  let sps = []
  for (let i = 0; i < this.spsLength; i++) {
    sps.push(Number(stream.readUint8()).toString(16))
  }
  // this.spsInfo = SpsParser.parseSPS(new Uint8Array(sps))
  this.sequence = sps

  this.ppsHeader = stream.readUint24()
  this.ppsLength = stream.readUint16()
  let pps = []
  for (let i = 0; i < this.ppsLength; i++) {
    pps.push(Number(stream.readUint8()).toString(16))
  }
  this.pps = pps

  let last = []; let dataviewLength = stream.dataview.byteLength
  while (stream.position < dataviewLength) {
    last.push(stream.readUint8())
  }
  this.last = last
  delete this.subBox
  // delete this.data
  stream = null
}
