import Stream from '../stream'

export default function ftyp () {
  let stream = new Stream(this.data)
  this.major_brand = String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8())
  this.minor_version = stream.readUint32()
  let compatibleBrands = []
  for (let i = 0, len = Math.floor((stream.buffer.byteLength - 8) / 4); i < len; i++) {
    compatibleBrands.push(String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8()))
  }
  this.compatible_brands = compatibleBrands
  stream = null
  delete this.subBox
  delete this.data
}
