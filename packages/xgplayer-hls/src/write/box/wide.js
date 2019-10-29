import Box from '../box';
Box.wide = function (data, output) {
    let stream = this.stream;
    stream.fill(data.size - 8);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    if (stream.position !== data.size - 8) {
        throw `${data.type} box incomplete`;
    } else {
        this.outputSize = stream.position;
    }
    delete this.data;
};
