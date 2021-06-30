/* eslint-disable camelcase */
import Box from '../box'
import Stream from '../stream'

Box.sidx = function () {
  let stream = new Stream(this.data)
  this.version = stream.readUint8()
  this.flag = Stream.readByte(stream.dataview, 3)

  this.reference_ID = stream.readUint32()
  this.timescale = stream.readUint32()
  if (this.version === 0) {
    this.earliest_presentation_time = stream.readUint32()
    this.first_offset = stream.readUint32()
  } else {
    this.earliest_presentation_time = stream.readUint64()
    this.first_offset = stream.readUint64()
  }
  stream.readUint16()
  this.references = []
  const count = stream.readUint16()
  for (let i = 0; i < count; i++) {
    const ref = {}
    this.references.push(ref)
    let tmp_32 = stream.readUint32()
    ref.reference_type = (tmp_32 >> 31) & 0x1
    ref.referenced_size = tmp_32 & 0x7FFFFFFF
    ref.subsegment_duration = stream.readUint32()
    tmp_32 = stream.readUint32()
    ref.starts_with_SAP = (tmp_32 >> 31) & 0x1
    ref.SAP_type = (tmp_32 >> 28) & 0x7
    ref.SAP_delta_time = tmp_32 & 0xFFFFFFF
  }
  // this.first_offset += stream.position;

  delete this.subBox
  delete this.data
  stream = null
}
