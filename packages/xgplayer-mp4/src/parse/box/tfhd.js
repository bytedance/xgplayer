import Box from '../box'
import Stream from '../stream'

Box.tfhd = function () {
    let stream = new Stream(this.data)
    this.version = stream.readUint8()
    this.flag = Stream.readByte(stream.dataview, 3)

    // trackId: view.getUint32(4)
    this.track_id = stream.readUint32();

    let baseDataOffsetPresent = (this.flag & 0xff) & 0x01;
    let sampleDescriptionIndexPresent = (this.flag & 0xff) & 0x02;
    let defaultSampleDurationPresent = (this.flag & 0xff) & 0x08;
    let defaultSampleSizePresent = (this.flag & 0xff) & 0x10;
    let defaultSampleFlagsPresent = (this.flag & 0xff) & 0x20;

    let i = 8;
    if (baseDataOffsetPresent) {
        i += 4; // truncate top 4 bytes
        this.baseDataOffset = stream.readUint32();
        i += 4;
    }
    if (sampleDescriptionIndexPresent) {
        this.sampleDescriptionIndex = stream.readUint32();
        i += 4;
    }
    if (defaultSampleDurationPresent) {
        this.defaultSampleDuration = stream.readUint32();
        i += 4;
    }
    if (defaultSampleSizePresent) {
        this.defaultSampleSize = stream.readUint32();
        i += 4;
    }
    if (defaultSampleFlagsPresent) {
        this.defaultSampleFlags = stream.readUint32();
    }

    delete this.subBox
    delete this.data
    stream = null
}
