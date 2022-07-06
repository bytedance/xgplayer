import Box from '../box'
import Stream from '../stream'

Box.esds = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)
  try {
    let box = Box.MP4ESDescrTag(stream)
    this.subBox.push(box)
    delete this.data
    stream = null
  }catch(e) {
    console.error(e)
  }
  
}
