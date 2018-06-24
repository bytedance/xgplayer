import Box from '../box';
Box.stsd = function (data, output) {
    let stream = this.stream;
    let self = this;
    let outputSize = 0;
    stream.writeUint8(data.version);
    stream.writeUint24(data.flag);
    stream.writeUint32(data.entryCount);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    outputSize = stream.position;
    data.subBox.forEach(item=>{
        let box = new Box(item, self.output);
        self.subBox.push(box);
        box.writeBody();
        outputSize += box.outputSize + 8;
    });
    if (outputSize !== data.size - 8) {
        throw `${data.type} box incomplete`;
    } else {
        this.outputSize = outputSize;
    }
    delete this.data;
};
