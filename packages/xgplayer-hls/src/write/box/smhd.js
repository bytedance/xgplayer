import Box from '../box';
Box.smhd = function (data, output) {
    let stream = this.stream;
    stream.writeUint8(data.version);
    stream.writeUint24(data.flag);
    let balance = data.balance.split('.');
    stream.writeUint8(balance[0]);
    stream.writeUint8(balance[1]);
    stream.fill(2);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    if (stream.position !== data.size - 8) {
        throw `${data.type} box incomplete`;
    } else {
        this.outputSize = stream.position;
    }
    delete this.data;
};
