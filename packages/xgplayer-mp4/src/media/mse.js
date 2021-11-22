import EventEmitter from 'event-emitter'
import Errors from '../error'

class MSE {
  constructor (codecs = 'video/mp4; codecs="avc1.64001E, mp4a.40.5"', mediaType) {
    EventEmitter(this)
    this.codecs = codecs
    this.mediaSource = new window.MediaSource(mediaType)
    this.url = window.URL.createObjectURL(this.mediaSource)
    this.queue = []
    this.updating = false
    this._hasDestroyed = false;
    this._hasEndOfStream = false;
    this._hasEndOfStreamSuccess = false;
    this._onSourceOpen = this._onSourceOpen.bind(this);
    this._onMediaSourceClose = this._onMediaSourceClose.bind(this);
    this._onSourceBufferError = this._onSourceBufferError.bind(this);
    this._onSourceBufferUpdateEnd = this._onSourceBufferUpdateEnd.bind(this);
    this.mediaSource.addEventListener('sourceopen', this._onSourceOpen);
    this.mediaSource.addEventListener('sourceclose', this._onMediaSourceClose);
  }

  _onSourceOpen(){
    let self = this;
    self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs);
    self.sourceBuffer.addEventListener('error', this._onSourceBufferError);
    self.sourceBuffer.addEventListener('updateend', this._onSourceBufferUpdateEnd);
    self.emit('sourceopen')
  }

  _onSourceBufferError(e){
    this.emit('error', new Errors('mse', '', {line: 16, handle: '[MSE] constructor sourceopen', msg: e.message}))
  }

  _onSourceBufferUpdateEnd(){
    let self = this;
    self.emit('updateend');
    if(this._hasEndOfStream && !this._hasEndOfStreamSuccess){
      this._endOfStream();
      return;
    }
    let buffer = self.queue.shift()
    if (buffer && self.sourceBuffer && self.sourceBuffer.updating === false && self.state === 'open') {
      self.sourceBuffer.appendBuffer(buffer)
    } else if(buffer) {
      self.queue.unshift(buffer);
    }
  }

  _onMediaSourceClose(){
    this.emit('sourceclose')
  }

  get state () {
    return this.mediaSource.readyState
  }

  get duration () {
    return this.mediaSource.duration
  }

  set duration (value) {
    this.mediaSource.duration = value
  }

  appendBuffer (buffer) {
    if(!buffer) return;
    
    let sourceBuffer = this.sourceBuffer
    if (sourceBuffer && !sourceBuffer.updating && this.state === 'open') {
      sourceBuffer.appendBuffer(buffer)
      return true
    } else {
      this.queue.push(buffer)
      return false
    }
  }

  removeBuffer (start, end) {
    let sourceBuffer = this.sourceBuffer
    if (sourceBuffer && sourceBuffer.updating === false && this.state === 'open') {
      sourceBuffer.remove(start, end)
    }
  }

  endOfStream () {
    this._hasEndOfStream = true;
    if (this.mediaSource.readyState === 'open') {
      if(this.sourceBuffer && !this.sourceBuffer.updating){
        this._hasEndOfStreamSuccess = true;
        this._endOfStream();
      }
      
    }
  }

  _endOfStream(){
    this.queue = [];
    if(this.mediaSource.readyState === 'open'){
      this.mediaSource.endOfStream()
    }
  }

  static isSupported (codecs) {
    return window.MediaSource && window.MediaSource.isTypeSupported(codecs)
  }

  destroy(){
    if(this._hasDestroyed){
      return;
    }
    this._hasDestroyed = true;
    window.URL.revokeObjectURL(this.url);
    if(this.mediaSource) {
      this.mediaSource.removeEventListener('sourceclose', this._onMediaSourceClose);
      this.mediaSource.removeEventListener('sourceopen', this._onSourceOpen);
    }
    if(this.sourceBuffer) {
      this.sourceBuffer.removeEventListener('error', this._onSourceBufferError);
      this.sourceBuffer.removeEventListener('updateend', this._onSourceBufferUpdateEnd);
    }
  }
}

export default MSE
