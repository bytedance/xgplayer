import Box from '../box'

Box.MP4ESDescrTag = function (stream) {
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
  box.esID = stream.readUint16()
  box.priority = stream.readUint8()
  box.subBox.push(Box.MP4DecConfigDescrTag(stream))
  box.subBox.push(Box.SLConfigDescriptor(stream))
  return box
}
