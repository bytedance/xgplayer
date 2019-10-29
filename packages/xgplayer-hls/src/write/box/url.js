import Box from '../box';
Box['url '] = function (data, output) {
    let stream = this.stream;
    stream.writeUint8(data.version);
    data.flag.forEach(item=>{
        stream.writeUint8(item);
    });
    data.location.forEach(item=>{
        stream.writeUint8(item);
    });
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    if (stream.position !== data.size - 8) {
        throw `${data.type} box incomplete`;
    }
    delete this.data;
};
