import EventEmitter from 'eventemitter3'
import { Util } from 'xgplayer'
import Errors from '../error'

class MSE extends EventEmitter {
  constructor() {
    super()
    this.codecs = []
    this.sourceBuffer = {}
    this.mediaSource = new MediaSource()
    this.url = URL.createObjectURL(this.mediaSource)
    this.queue = {}
    this.updating = false
    this.mediaSource.addEventListener('sourceopen', () => {
      this.emit('sourceopen')
    })
    this.mediaSource.addEventListener('sourceclose', () => {
      this.emit('sourceclose')
    })
  }

  get state() {
    return this.mediaSource.readyState
  }

  get duration() {
    return this.mediaSource.duration
  }

  set duration(value) {
    this.mediaSource.duration = value
  }

  addSourceBuffer(codecs) {
    this.codecs.push(codecs)
    const sourceBuffer = this.mediaSource.addSourceBuffer(codecs)
    this.sourceBuffer[codecs] = sourceBuffer
    sourceBuffer.addEventListener('error', e => {
      this.emit(
        'error',
        new Errors('mse', '', {
          line: 16,
          handle: '[MSE] constructor sourceopen',
          msg: e.message
        })
      )
    })
    sourceBuffer.addEventListener('updateend', _e => {
      this.emit(`${codecs} updateend`)
      if (this.queue[codecs] && Util.typeOf(this.queue[codecs]) === 'Array') {
        const buffer = this.queue[codecs].shift()
        if (buffer) {
          if (sourceBuffer.updating === false && this.state === 'open') {
            sourceBuffer.appendBuffer(buffer)
          } else {
            this.queue[codecs].unshift(buffer)
          }
        }
      }
    })
  }

  appendBuffer(codecs, buffer) {
    const sourceBuffer = this.sourceBuffer[codecs]
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

  removeBuffer(codecs, start, end) {
    if (this.sourceBuffer[codecs].updating === false && this.state === 'open') {
      this.sourceBuffer[codecs].remove(start, end)
    }
  }

  endOfStream() {
    if (this.state === 'open') {
      this.mediaSource.endOfStream()
    }
  }

  static isSupported(codecs) {
    return window.MediaSource?.isTypeSupported(codecs)
  }
}

export default MSE
