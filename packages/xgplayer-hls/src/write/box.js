import Stream from './stream';
class Box {
    constructor (obj, output) {
        this.size = obj.size;
        this.type = obj.type;
        this.stream = new Stream(new Uint8Array(this.size - 8).buffer);
        this.data = obj;
        this.output = output;
        this.subBox = [];
        let header = new Stream(new Uint8Array(8).buffer);
        header.writeUint32(obj.size);
        header.writeStr(obj.type);
        output.write(new Uint8Array(header.buffer));
    }
    writeBody () {
        let self = this;
        let data = this.data;
        if (Box.containerBox.find(item=>item === self.type)) {
            data.subBox.forEach(item=>{
                let box = new Box(item, self.output);
                self.subBox.push(box);
                box.writeBody();
            });
        } else {
            let run = Box[self.type];
            if (run && run instanceof Function) {
                run.call(self, data, self.output);
            } else {
                throw `write:error,${self.type} write nothing`;
            }
        }
    }
}

Box.containerBox = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl', 'mvex', 'moof', 'mvex', 'traf', 'mfra'];


export default Box;
