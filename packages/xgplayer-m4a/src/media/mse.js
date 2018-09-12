import EventEmitter from 'event-emitter'
import Errors from '../error'

class MSE {
  constructor (codecs = 'audio/mp4; codecs="mp4a.40.5"') {
    let self = this
    EventEmitter(this)
    this.codecs = codecs
    this.replaying = false
    this.mediaSource = new window.MediaSource()
    this.url = window.URL.createObjectURL(this.mediaSource)
    this.queue = []
    this.updating = false
    this.mediaSource.addEventListener('sourceopen', function () {
      self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs)
      self.sourceBuffer.addEventListener('error', function (e) {
        self.emit('error', new Errors('mse', '', {line: 16, handle: '[MSE] constructor sourceopen', msg: e.message}))
      })
      self.sourceBuffer.addEventListener('updateend', function (e) {
        self.emit('updateend')
        let buffer = self.queue.shift()
        if (buffer) {
          self.sourceBuffer.appendBuffer(buffer)
        }
      })
      self.emit('sourceopen')
    })
    this.mediaSource.addEventListener('sourceclose', function () {
      self.emit('sourceclose')
    })
  }

  get state () {
    if (this.replaying) {
      return 'open'
    } else {
      return this.mediaSource.readyState
    }
  }

  get duration () {
    return this.mediaSource.duration
  }

  set duration (value) {
    this.mediaSource.duration = value
  }

  appendBuffer (buffer) {
    let sourceBuffer = this.sourceBuffer
    if (sourceBuffer.updating === false && this.state === 'open') {
      sourceBuffer.appendBuffer(buffer)
      return true
    } else {
      this.queue.push(buffer)
      return false
    }
  }

  removeBuffer (start, end) {
    this.sourceBuffer.remove(start, end)
  }

  endOfStream () {
    if (this.mediaSource.readyState === 'open') {
      this.mediaSource.endOfStream()
    }
  }

  static isSupported (codecs) {
    return window.MediaSource && window.MediaSource.isTypeSupported(codecs)
  }
}

export default MSE
