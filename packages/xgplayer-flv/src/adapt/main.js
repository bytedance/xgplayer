import EventEmitter from 'eventemitter3'
import PlayerWorker from './worker'
import { EVENT } from 'xgplayer-streaming-shared'

export default class Main extends EventEmitter {
  constructor (opts) {
    super()
    this._opts = opts
    this.media = this._opts.media || document.createElement('video')
    this.preProcessUrl = this._opts.preProcessUrl
    this._opts.media = null
    this._opts.preProcessUrl = null
    this._worker = new PlayerWorker()
    this._bindInteractionEvent()
    this.postMessage('init', this._opts)
  }

  get version () {
    return __VERSION__
  }

  get isLive () {
    return this._opts.isLive
  }

  get blobUrl () {
    return this.media.src
  }

  _bindInteractionEvent () {
    this._worker.addEventListener('message', this._handleMessage)
    this._workerSink?.addEventListener('error', e => {
      this.emit(EVENT.ERROR, {
        errorType: 'WORKER_RUNTIME_ERROR',
        errorCode: 9101,
        errorMessage: e.message || 'worker runtime error',
        originError: e
      })
    })
  }

  _handleMessage = (e) => {
    const { data } = e
    switch (data.type) {
      case 'handle':
        this.media.srcObject = e.data.handle
        break
      case 'play':
        this.media.play()
        break
      case 'removeAttribute':
        this.media.removeAttribute(data.data.attr)
        break
      // case 'disableRemotePlayback':
      //   this.media.disableRemotePlayback = data.data.val
      //   break
      case 'load':
        this.media.load()
        this.postMessage({ type: 'loadSuccess'})
        break
      default:
        break
    }
  }

  _postMessage = (type, data) => {
    this._worker.postMessage({
      type,
      data
    })
  }

  replay () {
    this._postMessage('replay')
  }

  destroy () {
    this._worker.terminate()
  }

  static isSupported () {
    return globalThis.MediaSource && globalThis.MediaSource.canConstructInDedicatedWorker === true && globalThis.MediaSourceHandle
  }
}