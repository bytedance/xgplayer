class Presource {
  constructor () {
    this.mimetype = '';
    this.init = null;
    this.data = []
    this.bufferDuration = 0;
  }
}

class PreSource {
  constructor () {
    this.sources = {};
  }

  getSource (source) {
    return this.sources[source];
  }

  createSource (name) {
    this.sources[name] = new Presource();
    return this.sources[name];
  }

  clear () {
    this.sources = {};
  }

  destroy () {
    this.sources = {};
  }
}

export default PreSource;
