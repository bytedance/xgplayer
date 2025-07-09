import EventEmitter from 'eventemitter3'
import { Events } from 'xgplayer'
// import PlayerWorker from './worker?worker&inline'
import { EVENT } from 'xgplayer-streaming-shared'

export default class Main extends EventEmitter {
  constructor (opts) {
    super()
    this._opts = opts
    this.media = this._opts.media || document.createElement('video')
    this.preProcessUrl = this._opts.preProcessUrl
    this._opts.media = null
    this._opts.preProcessUrl = null
    // this._worker = new PlayerWorker()
    this._worker = opts?._worker
    this._bindInteractionEvent()
    if (this._opts.streamRes) {
      delete this._opts.streamRes
    }
    if (this._opts?._worker) {
      delete this._opts._worker
    }
    this._postMessage('init', this._opts)
    this.unbindvts = []
    this._bindpostMediaEvent()
    this.loader = {}
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
        this.media.play().catch(() => { })
        break
      case 'removeAttribute':
        this.media.removeAttribute(data.data.attr)
        break
      // case 'disableRemotePlayback':
      //   this.media.disableRemotePlayback = data.data.val
      //   break
      case 'load':
        this.media.load()
        this._postMessage({ type: 'loadSuccess'})
        break
      case 'core_event':
        this.emit(data.data.eventName, data.data.data)
        break
      case 'transferCost':
        this.transferCost = data.transferCost
        break
      case 'setCurrentTime':
        this.media.currentTime = data.data.currentTime
        break
      case 'setPlaybackRate':
        this.media.playbackRate = data.data.playbackRate
        break
      default:
        break
    }
  }

  _postMessage = (type, data, transfer) => {
    this._worker.postMessage({
      type,
      data
    }, transfer)
  }

  _bindpostMediaEvent () {
    Events.VIDEO_EVENTS.forEach(evtName => {
      const listener = e => {
        const buffered = []
        if (this.media.buffered.length) {
          for (let i = 0; i < this.media.buffered.length; i++) {
            buffered.push([this.media.buffered.start(i), this.media.buffered.end(i)])
          }
        }
        this._postMessage('media_event', {
          eventName: evtName,
          data: {
            seeking: this.media.seeking,
            currentTime: this.media.currentTime,
            readyState: this.media.readyState,
            paused: this.media.paused,
            ended: this.media.ended,
            playbackRate: this.media.playbackRate,
            buffered: JSON.stringify(buffered)
          }
        })
      }
      this.media.addEventListener(evtName, listener)
      this.unbindvts.push(() => {
        this.media.removeEventListener(evtName, listener)
      })
    })
  }

  replay () {
    this._postMessage({
      type: 'replay'
    })
  }

  load (url, reuseMse = false, stream) {
    const transfor = []
    if (stream) {
      transfor.push(stream)
    }
    this._postMessage('load', {
      url: this.getFinalUrl(url),
      reuseMse,
      stream
    }, transfor)
  }

  switchURL (url, seamless) {
    this._postMessage('switchURL', {
      url: this.getFinalUrl(url),
      seamless
    })
  }

  getFinalUrl (url) {
    if (url) this._opts.url = url.startsWith('http') ? url : `${location.protocol}${url}`
    let finnalUrl = (url = this._opts.url)
    if (this._opts.preProcessUrl) {
      finnalUrl = this._opts.preProcessUrl(url).url
    }
    this.loader.finnalUrl = finnalUrl
    return finnalUrl
  }

  destroy () {
    this._worker.terminate()
    this.unbindvts.forEach(unbind => {
      unbind()
    })
  }

  static isSupported () {
    return globalThis.MediaSource && globalThis.MediaSource.canConstructInDedicatedWorker === true && globalThis.MediaSourceHandle
  }
}