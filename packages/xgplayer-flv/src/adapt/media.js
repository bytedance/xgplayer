class Buffer {
  constructor (buffered) {
    this._buffered = buffered
  }

  get length () {
    return this._buffered.length
  }

  start (i) {
    return this._buffered[i][0]
  }

  end (i) {
    return this._buffered[i][1]
  }
}

export default class Media {
  constructor (worker) {
    this._worker = worker
    this._buffered = []
    this._currentTime = 0
    this._seeking = false
    this._readyState = 0
    this._paused = false
    this._ended = false
    this._playbackRate = 1
    this.postMessage = worker.postMessage
    this.evts = {}
  }

  // 一些属性, 通过接收主线程的定期消息，比如：timeupdate、定时器
  get buffered () {
    return this._buffered
  }
  get currentTime () {
    return this._currentTime
  }

  set currentTime (val) {
    // this.postMessage({type: 'setCurrentTime', data: { currentTime: val }})
    this.postMessage('setCurrentTime', { currentTime: val })
  }

  get seeking () {
    return this._seeking
  }

  get readyState () {
    return this._readyState
  }

  get paused () {
    return this._paused
  }

  get ended () {
    return this._ended
  }

  get playbackRate () {
    return this._playbackRate
  }
  set playbackRate (val) {
    // this.postMessage({type:'setPlaybackRate', data: { playbackRate: val }})
    this.postMessage('setPlaybackRate', { playbackRate: val })
  }

  set disableRemotePlayback (val) {}

  // 一些方法
  addEventListener (evtName, cb) {
    if (!this.evts[evtName]) {
      this.evts[evtName] = []
    }
    this.evts[evtName].push(cb)
  }

  removeEventListener (evtName, cb) {
    this.evts[evtName] = this.evts[evtName].filter(ecb => ecb !== cb)
  }

  play () {
    // this.postMessage({ type: 'play' })
    this.postMessage('play')
    return Promise.resolve()
  }

  removeAttribute (attr) {
    // this.postMessage({type: 'removeAttribute', data: {attr}})
    this.postMessage('removeAttribute', {attr})
  }

  load () {
    // this.postMessage({ type: 'load' })
    this.postMessage('load')
    return new Promise(r => {
      const cb = e => {
        if (e.data.type === 'loadSuccess') {
          r()
          this._worker.removeEventListener('message', cb)
        }
      }
      this._worker.addEventListener('message', cb)
    })
  }

  // 同步一些事件，属性
  emit (evtName, params) {
    (this.evts[evtName] || []).forEach(cb => {cb()})
    // 同步属性
    this._seeking = params.seeking
    this._currentTime = params.currentTime
    this._readyState = params.readyState
    this._paused = params.paused
    this._ended = params.ended
    this._playbackRate = params.playbackRate
    this._buffered = new Buffer(JSON.parse(params.buffered))
  }
}