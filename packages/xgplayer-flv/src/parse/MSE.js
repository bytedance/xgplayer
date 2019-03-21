import EventEmitter from 'event-emitter'
let count = 0
class MSE {
  constructor (mediaElement) {
    this.codecs = 'video/mp4; codecs="avc1.64001E, mp4a.40.5"'
    let self = this
    EventEmitter(this)
    this.mediaSource = new window.MediaSource()
    mediaElement.src = window.URL.createObjectURL(this.mediaSource)
    this.url = mediaElement.src
    this.handleSourceOpen = this.onSourceOpen.bind(this)
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen)

    this.mediaSource.addEventListener('sourceclose', function () {
      self.emit('sourceclose')
    })
  }

  onSourceOpen () {
    const self = this
    self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs)
    self.sourceBuffer.addEventListener('error', function (e) {
      self.emit('error', {
        type: 'sourceBuffer',
        error: e
      })
    })
    self.sourceBuffer.addEventListener('updateend', function (e) {
      self.emit('updateend')
    })
    self.emit('sourceopen')
    self.sourceBuffer.addEventListener('error', function (e) {
      self.emit('error', {
        type: 'mediaSource',
        error: e
      })
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

  appendBuffer (buffer) {
    let sourceBuffer = this.sourceBuffer
    if (sourceBuffer.updating === false && this.state === 'open') {
      sourceBuffer.appendBuffer(buffer)
      return true
    } else {
      if (this.state === 'closed') {
        this.emit('error', {
          type: 'sourceBuffer',
          error: new Error('mediaSource is not attached to video or mediaSource is closed')
        })
      } else if (this.state === 'ended') {
        this.emit('error', {
          type: 'sourceBuffer',
          error: new Error('mediaSource is closed')
        })
      } else {
        if (sourceBuffer.updating === true) {
          this.emit('warn', {
            type: 'sourceBuffer',
            error: new Error('mediaSource is busy')
          })
        }
        return false
      }
    }
  }

  destroy () {
    // this.mediaSource.removeEventListener('sourceopen', this.handleSourceOpen)
    this.__ee__ = {}
    // this.mediaSource = null
    // this.endOfStream()
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
