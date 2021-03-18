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
    this.handleWriteData = this.handleWriteData.bind(this);
    this.handleWriteMeta = this.handleWriteMeta.bind(this);
  }

  init() {
    this.on('REMUX_WRITE_DATA', this.handleWriteData)
    this.on('REMUX_WRITE_META', this.handleWriteMeta)
  }

  handleWriteMeta (type, mime, initData) {
    let source = this.getSource(type);
    if (!source) {
      source = this.createSource(type);
    }

    source.mimetype = mime;
    source.init = initData;
  }

  handleWriteData (type, buffer, bufferDuration) {
    let source = this.getSource(type);
    if (!source) {
      source = this.createSource(type);
    }
    source.data.push(buffer)
    if (bufferDuration) {
      source.bufferDuration = bufferDuration + (source.bufferDuration || 0)
    }
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
    this.clear();
  }
}

export default PreSource;
