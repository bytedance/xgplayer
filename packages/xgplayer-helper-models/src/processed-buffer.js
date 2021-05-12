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
    /** @type{Object.<string, ProcessedBuffer>} */
    this.sources = {};
  }

  /**
   *
   * @param {string} name
   * @return {ProcessedBuffer}
   */
  getSource (name) {
    return this.sources[name];
  }

  /**
   * @param {string} name
   * @return {ProcessedBuffer}
   */
  createSource (name) {
    this.sources[name] = new ProcessedBuffer();
    return this.sources[name];
  }

  clear () {
    this.sources = {};
  }

  destroy () {
    this.clear()
  }
}

export default ProcessedBufferManager;
