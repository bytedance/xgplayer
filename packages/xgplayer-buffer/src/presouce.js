class Source {
  constructor () {
    this.mimetype = '';
    this.init = null;
    this.data = [];
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
    this.sources[name] = new Source();
    return this.sources[name];
  }

  clear () {
    this.sources = {};
  }
}

export default PreSource;
