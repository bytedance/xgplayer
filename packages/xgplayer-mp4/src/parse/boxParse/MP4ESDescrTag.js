import Box from '../box'
import MP4DecConfigDescrTag from './MP4DecConfigDescrTag'
import SLConfigDescriptor from './SLConfigDescriptor'

export default function MP4ESDescrTag (stream) {
  const box = new Box()
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
  box.subBox.push(MP4DecConfigDescrTag(stream))
  box.subBox.push(SLConfigDescriptor(stream))
  return box
}
