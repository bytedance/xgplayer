import Stream from '../stream'
import UTC from '../date'

export default function mvhd () {
  let stream = new Stream(this.data)

  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  this.create = stream.readUint32()
  this.modify = stream.readUint32()
  this.createTime = new UTC().setTime(this.create * 1000)
  this.modifyTime = new UTC().setTime(this.modify * 1000)
  this.timeScale = stream.readUint32()
  this.duration = stream.readUint32()
  this.rate = stream.readUint16() + '.' + stream.readUint16()
  this.volume = stream.readUint8() + '.' + stream.readUint8()
  // 越过保留的10字节
  Stream.readByte(stream.dataview, 8)
  Stream.readByte(stream.dataview, 2)
  // 视频转换矩阵
  let matrix = []
  for (let i = 0; i < 9; i++) {
    matrix.push(stream.readUint16() + '.' + stream.readUint16())
  }
  this.matrix = matrix
  Stream.readByte(stream.dataview, 24)
  this.nextTrackID = stream.readUint32()
  delete this.subBox
  delete this.data
}
