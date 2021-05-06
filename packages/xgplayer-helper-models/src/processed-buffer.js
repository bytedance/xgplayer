export class ProcessedBuffer {
  constructor () {
    /** @type{string} */
    this.mimetype = '';
    /** @type{Uint8Array|null} */
    this.init = null;
    /** @type{Uint8Array[]} */
    this.data = []
    /** @type{number} */
    this.bufferDuration = 0;
  }
}

class ProcessedBufferManager {
  constructor () {
    this.sources = {};
  }

  getSource (source) {
    return this.sources[source];
  }

  createSource (name) {
    this.sources[name] = new ProcessedBuffer();
    return this.sources[name];
  }

  clear () {
    this.sources = {};
  }

  destroy () {
    this.sources = {};
  }
}

export default ProcessedBufferManager;
