import Box from '../box';
Box.mfhd = function (data, output) {
    let stream = this.stream;
    stream.writeUint8(data.version);
    stream.writeUint24(data.flag);
    stream.writeUint32(data.sequence);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    if (stream.position !== data.size - 8) {
        throw `${data.type} box incomplete`;
    }
    delete this.data;
};
