export class RemuxedBuffer {
  constructor () {
    /** @type{string} */
    this.mimetype = ''
    /** @type{Uint8Array|null} */
    this.init = null
    /** @type{Uint8Array[]} */
    this.data = []
    /** @type{number} */
    this.bufferDuration = 0
  }
}

class RemuxedBufferManager {
  constructor () {
    /** @type{Object.<string, RemuxedBuffer>} */
    this.sources = {}
  }

  /**
   *
   * @param {string} name
   * @return {RemuxedBuffer}
   */
  getSource (name) {
    return this.sources[name]
  }

  /**
   * @param {string} name
   * @return {RemuxedBuffer}
   */
  createSource (name) {
    this.sources[name] = new RemuxedBuffer()
    return this.sources[name]
  }

  clear () {
    this.sources = {}
  }

  destroy () {
    this.clear()
  }
}

export default RemuxedBufferManager
