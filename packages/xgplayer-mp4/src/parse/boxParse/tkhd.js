import Stream from '../stream'
import UTC from '../date'

export default function tkhd () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3, 0)
  if (this.version === 1) {
    this.create = stream.readUint64()
    this.modify = stream.readUint64()
    this.createTime = new UTC().setTime(this.create * 1000)
    this.modifyTime = new UTC().setTime(this.modify * 1000)
    this.trackID = stream.readUint32()
    this.reserverd = stream.readUint32()
    this.duration = stream.readUint64()
  } else {
    this.create = stream.readUint32()
    this.modify = stream.readUint32()
    this.createTime = new UTC().setTime(this.create * 1000)
    this.modifyTime = new UTC().setTime(this.modify * 1000)
    this.trackID = stream.readUint32()
    this.reserverd = stream.readUint32()
    this.duration = stream.readUint32()
  }
  stream.readUint64()
  this.layer = stream.readInt16()
  this.alternate_group = stream.readInt16()
  this.volume = stream.readInt16() >> 8
  stream.readUint16()
  // 视频转换矩阵
  const matrix = []
  for (let i = 0; i < 9; i++) {
    matrix.push(stream.readUint16() + '.' + stream.readUint16())
  }
  this.matrix = matrix
  this.width = stream.readUint16() + '.' + stream.readUint16()
  this.height = stream.readUint16() + '.' + stream.readUint16()
  delete this.data
  delete this.subBox
  stream = null
}
