import Box from '../box'

export default function SLConfigDescriptor (stream) {
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
  box.SL = stream.readUint8()
  delete box.subBox
  return box
}
