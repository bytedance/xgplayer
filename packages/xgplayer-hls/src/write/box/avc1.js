import Box from '../box';
Box.avc1 = function (data, output) {
    let stream = this.stream;
    stream.fill(6);
    stream.writeUint16(data.dataReferenceIndex);
    stream.fill(16);
    stream.writeUint16(data.width);
    stream.writeUint16(data.height);
    stream.writeUint32(data.horizresolution);
    stream.writeUint32(data.vertresolution);
    stream.fill(4);
    stream.writeUint16(data.frameCount);
    stream.fill(32);
    stream.writeUint16(data.depth);
    stream.fill(2);
    output.write(new Uint8Array(stream.buffer.slice(0, stream.position)));
    let self = this;
    data.subBox.forEach(item=>{
        let box = new Box(item, self.output);
        self.subBox.push(box);
        box.writeBody();
    });
    let writeSize = stream.position;
    self.subBox.forEach(item=>{
        writeSize += item.stream.position + 8;
    });
    if (writeSize !== data.size - 8) {
        throw `${data.type} box incomplete`;
    } else {
        self.outputSize = writeSize;
    }
    delete this.data;
};
