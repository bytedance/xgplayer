import Box from '../box'
import Stream from '../stream'
Box.MP4ESDescrTag = function (data, output) {
  let stream = new Stream(new Uint8Array(data.size).buffer)
  stream.writeUint8(data.type)
  if (data.extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUint8(0x80)
    }
    stream.writeUint8(data.size - 5)
  } else {
    stream.writeUint8(data.size - 2)
  }
  stream.writeUint16(data.esID)
  stream.writeUint8(data.priority)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  Box.MP4DecConfigDescrTag(data.subBox[0], output)
  Box.SLConfigDescriptor(data.subBox[1], output)
}
