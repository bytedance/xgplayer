import Box from '../box'
import Stream from '../stream'
Box.MP4DecConfigDescrTag = function (data, output) {
  const stream = new Stream(new Uint8Array(data.size).buffer)
  stream.writeUint8(data.type)
  if (data.extend) {
    for (let i = 0; i < 3; i++) {
      stream.writeUint8(0x80)
    }
    stream.writeUint8(data.size - 5)
  } else {
    stream.writeUint8(data.size - 2)
  }
  stream.writeUint8(data.typeID)
  stream.writeUint8(data.streamUint)
  stream.writeUint24(data.bufferSize)
  stream.writeUint32(data.maximum)
  stream.writeUint32(data.average)
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
  Box.MP4DecSpecificDescrTag(data.subBox[0], output)
}
