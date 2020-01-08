import EventEmitter from 'event-emitter'
import Player from 'xgplayer'
import Errors from '../error'

class MSE {
  constructor () {
    let self = this
    EventEmitter(this)
    this.codecs = []
    this.sourceBuffer = {}
    this.mediaSource = new MediaSource()
    this.url = URL.createObjectURL(this.mediaSource)
    this.queue = {}
    this.updating = false
    this.mediaSource.addEventListener('sourceopen', function () {
      self.emit('sourceopen')
    })
    this.mediaSource.addEventListener('sourceclose', function () {
      self.emit('sourceclose')
    })
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

  addSourceBuffer (codecs) {
    let self = this
    this.codecs.push(codecs)
    let sourceBuffer = this.mediaSource.addSourceBuffer(codecs)
    this.sourceBuffer[codecs] = sourceBuffer
    sourceBuffer.addEventListener('error', function (e) {
      self.emit('error', new Errors('mse', '', {line: 16, handle: '[MSE] constructor sourceopen', msg: e.message}))
    })
    sourceBuffer.addEventListener('updateend', function (e) {
      self.emit(codecs + ' updateend')
      if (self.queue[codecs] && Player.util.typeOf(self.queue[codecs]) === 'Array') {
        let buffer = self.queue[codecs].shift()
        if (buffer) {
          if (sourceBuffer.updating === false && self.state === 'open') {
            sourceBuffer.appendBuffer(buffer)
          } else {
            self.queue[codecs].unshift(buffer)
          }
        }
      }
    })
  }

  appendBuffer (codecs, buffer) {
    let sourceBuffer = this.sourceBuffer[codecs]
    if (sourceBuffer.updating === false && this.state === 'open') {
      // console.log('appendBuffer true')
      sourceBuffer.appendBuffer(buffer)
      return true
    } else {
      // console.log('appendBuffer false')
      if (!this.queue[codecs]) {
        this.queue[codecs] = []
      }
      this.queue[codecs].push(buffer)
      return false
    }
  }

  removeBuffer (codecs, start, end) {
    if (this.sourceBuffer[codecs].updating === false && this.state === 'open') {
      this.sourceBuffer[codecs].remove(start, end)
    }
  }

  endOfStream () {
    if (this.state === 'open') {
      this.mediaSource.endOfStream()
    }
  }

  static isSupported (codecs) {
    return window.MediaSource && window.MediaSource.isTypeSupported(codecs)
  }
}

export default MSE
