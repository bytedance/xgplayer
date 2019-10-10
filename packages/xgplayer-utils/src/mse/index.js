class MSE {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.container = this.configs.container;
    this.mediaSource = null;
    this.sourceBuffers = {};
    this.preloadTime = this.configs.preloadTime || 1;
  }

  init () {
    // eslint-disable-next-line no-undef
    this.mediaSource = new self.MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.onSourceOpen.bind(this));
    this.container.src = URL.createObjectURL(this.mediaSource);
    this.url = this.container.src;
    this.container.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
    this.container.addEventListener('waiting', this.onWaiting.bind(this));
  }

  onTimeUpdate () {
    this.emit('TIME_UPDATE', this.container);
  }
   
  onWaiting () {
    this.emit('WAITING', this.container);
  }

  onSourceOpen () {
    this.addSourceBuffers();
  }

  onUpdateEnd () {
    this.emit('SOURCE_UPDATE_END');
    this.doAppend()
  }
  addSourceBuffers () {
    if (this.mediaSource.readyState !== 'open') {
      return;
    }
    let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
    let tracks = this._context.getInstance('TRACKS');
    let track;

    sources = sources.sources;
    let add = false;
    for (let i = 0, k = Object.keys(sources).length; i < k; i++) {
      let type = Object.keys(sources)[i];
      if (type === 'audio') {
        track = tracks.audioTrack;
      } else if (type === 'video') {
        track = tracks.videoTrack;
      }
      if (track) {
        let dur = type === 'audio' ? 21 : 40;
        if (track.meta && track.meta.refSampleDuration) dur = track.meta.refSampleDuration;
        if (sources[type].data.length >= (this.preloadTime / dur)) {
          add = true;
        }
      }
    }

    if (add) {
      if (Object.keys(this.sourceBuffers).length > 0) {
        return;
      }
      for (let i = 0, k = Object.keys(sources).length; i < k; i++) {
        let type = Object.keys(sources)[i];
        let source = sources[type]
        let mime = (type === 'video') ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype
        let sourceBuffer = this.mediaSource.addSourceBuffer(mime);
        this.sourceBuffers[type] = sourceBuffer;
        sourceBuffer.addEventListener('updateend', this.onUpdateEnd.bind(this));
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

  endOfStream () {
    if (this.mediaSource.readyState === 'open') {
      this.mediaSource.endOfStream()
    }
  }

  remove (end) {
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      if (!buffer.updating) {
        buffer.remove(0, end);
      }
    }
  }

  destroy () {
    this.container.removeEventListener('timeupdate', this.onTimeUpdate);
    this.container.removeEventListener('waiting', this.onWaiting);
    this.mediaSource.removeEventListener('sourceopen', this.onSourceOpen);
    this.configs = {};
    this.container = null;
    this.mediaSource = null;
    this.sourceBuffers = {};
    this.preloadTime = 1;
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      buffer.removeEventListener('updateend', this.onUpdateEnd);
      this.mediaSource.removeSourceBuffer(buffer);
      delete this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
    }
  }
}
export default MSE;
