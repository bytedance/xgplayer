import Concat from 'concat-typed-array';

class Buffer {
    constructor () {
        this.buffer = new Uint8Array(0);
    }
    write (buffer) {
        this.buffer = Concat(Uint8Array, this.buffer, buffer);
    }
}

export default Buffer;
