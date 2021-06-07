import Box from '../box'
import Stream from '../stream'

export default function dref () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  let entryCount = stream.readUint32()
  this.entryCount = entryCount
  let self = this
  // 暂时不支持离散视频，视频的部分内容由url指定
  for (let i = 0; i < entryCount; i++) {
    let box = new Box()
    self.subBox.push(box)
    box.read(stream)
  }
  delete this.data
  stream = null
}
