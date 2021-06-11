// import Box from '../box'
import Stream from '../stream'
import MP4ESDescrTag from './MP4ESDescrTag'

export default function esds () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  const box = MP4ESDescrTag(stream)
  this.subBox.push(box)
  delete this.data
  stream = null
}
