import Box from '../box'
import Stream from '../stream'

Box.MP4DecSpecificDescrTag = function (data, output) {
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
  data.EScode.forEach(item => {
    stream.writeUint8(Number(`0x${item}`))
  })
  output.write(new Uint8Array(stream.buffer.slice(0, stream.position)))
}
