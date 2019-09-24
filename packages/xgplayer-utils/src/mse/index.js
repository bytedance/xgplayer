class MSE {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.container = this.configs.container;
    this.mediaSource = null;
    this.sourceBuffers = {};
  }

  init () {
    let _this = this;
    // eslint-disable-next-line no-undef
    this.mediaSource = new self.MediaSource();
    this.mediaSource.addEventListener('sourceopen', (e) => {
      _this.addSourceBuffers();
    });
    this.container.src = URL.createObjectURL(this.mediaSource);
    this.url = this.container.src;
    this.container.addEventListener('timeupdate', () => {
      this.emit('TIME_UPDATE', this.container);
    })
  }

  addSourceBuffers () {
    if (this.mediaSource.readyState !== 'open') {
      return;
    }

    let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
    if (sources.sources.audio && sources.sources.video) {
      if (Object.keys(this.sourceBuffers).length >= 2) {
        return;
      }
      for (let i = 0, k = Object.keys(sources.sources).length; i < k; i++) {
        let source = sources.sources[Object.keys(sources.sources)[i]]
        let mime = (Object.keys(sources.sources)[i] === 'video') ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype
        let sourceBuffer = this.mediaSource.addSourceBuffer(mime);
        this.sourceBuffers[Object.keys(sources.sources)[i]] = sourceBuffer;
        sourceBuffer.addEventListener('updateend', () => {
          this.doAppend()
        });
        this.doAppend();
      }
    }
  }

  doAppend () {
    let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
    if (sources) {
      for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
        let type = Object.keys(this.sourceBuffers)[i]
        let sourceBuffer = this.sourceBuffers[type];
        if (!sourceBuffer.updating) {
          let source = sources.sources[type];
          if (source && !source.inited) {
            sourceBuffer.appendBuffer(source.init.buffer.buffer);
            source.inited = true;
          } else if (source) {
            let data = source.data.shift()
            if (data) {
              sourceBuffer.appendBuffer(data.buffer.buffer);
            }
          }
        }
      }
    }
  }
}
export default MSE;
