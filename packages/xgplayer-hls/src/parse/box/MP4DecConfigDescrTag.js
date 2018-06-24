import Box from '../box'
import Stream from '../stream'

Box.MP4DecConfigDescrTag = function (stream) {
  let box = new Box()
  let size
  box.type = stream.readUint8()
  size = stream.readUint8()
  if (size === 0x80) {
    box.extend = true
    stream.skip(2)
    size = stream.readUint8() + 5
  } else {
    size += 2
  }
  box.size = size
  box.typeID = stream.readUint8()
  // 6 bits stream type,1 bit upstream flag,1 bit reserved flag
  box.streamUint = stream.readUint8()
  box.bufferSize = Stream.readByte(stream.dataview, 3)
  box.maximum = stream.readUint32()
  box.average = stream.readUint32()
  box.subBox.push(Box.MP4DecSpecificDescrTag(stream))
  return box
}
