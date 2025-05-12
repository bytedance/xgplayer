/* eslint-disable no-case-declarations */
import { Events } from 'xgplayer'
import { EVENT } from 'xgplayer-streaming-shared'
import { Flv } from './flv'
import Media from './media'

export default class PlayerWorker {
  constructor () {
    this._bindWorkerEvent()
    globalThis.inPlayerWorker = true
  }

  postMessage (type, data = {}) {
    self.postMessage({
      type,
      data
    })
  }

  _bindWorkerEvent () {
    self.addEventListener('message', this._handleMessage)
  }

  _handleMessage = (e) => {
    const { data } = e
    switch (data.type) {
      case 'init':
        this.flv = new Flv({
          media: new Media(this),
          ...data.data
        })
        const setPre = this.flv._transferCost.set
        const endPre = this.flv._transferCost.end
        this.flv._transferCost.set = (event, val) => {
          setPre(event, val)
          this.postMessage('transferCost', {
            transferCost: this.flv._transferCost.transferCost
          })
        }
        this.flv._transferCost.end = (val) => {
          endPre(val)
          this.postMessage('transferCost', {
            transferCost: this.flv._transferCost.transferCost
          })
        }
        this._transError()
        this._transCoreEvent(EVENT.TTFB)
        this._transCoreEvent(EVENT.LOAD_START)
        this._transCoreEvent(EVENT.LOAD_RESPONSE_HEADERS)
        this._transCoreEvent(EVENT.LOAD_COMPLETE)
        this._transCoreEvent(EVENT.LOAD_RETRY)
        this._transCoreEvent(EVENT.SOURCEBUFFER_CREATED)
        this._transCoreEvent(EVENT.ANALYZE_DURATION_EXCEEDED)
        this._transCoreEvent(EVENT.APPEND_BUFFER)
        this._transCoreEvent(EVENT.REMOVE_BUFFER)
        this._transCoreEvent(EVENT.BUFFEREOS)
        this._transCoreEvent(EVENT.KEYFRAME)
        this._transCoreEvent(EVENT.CHASEFRAME)
        this._transCoreEvent(EVENT.METADATA_PARSED)
        this._transCoreEvent(EVENT.SEI)
        this._transCoreEvent(EVENT.SEI_IN_TIME)
        this._transCoreEvent(EVENT.FLV_SCRIPT_DATA)
        this._transCoreEvent(EVENT.STREAM_EXCEPTION)
        this._transCoreEvent(EVENT.SWITCH_URL_SUCCESS)
        this._transCoreEvent(EVENT.SWITCH_URL_FAILED)
        break
      case 'replay':
        this.flv.replay()
        break
      case 'load':
        this.flv.load(data.data.url, data.data.reuseMse, data.data.stream)
        break
      case 'switchURL':
        this.flv.switchURL(data.data.url, data.data.seamless)
        break
      case 'media_event':
        this.flv.media.emit(data.data.eventName, data.data.data)
        break
      default:
        break
    }
  }

  _transError () {
    this.flv.on(EVENT.ERROR, (err) => {
      this.postMessage('core_event', {
        eventName: Events.ERROR,
        data: {
          errorCode: err.errorCode,
          errorMessage: err.errorMessage,
          errorType: err.errorType,
          ext: err.ext
        }
      })
    })
  }

  _transCoreEvent (eventName) {
    this.flv.on(eventName, (e) => {
      this.postMessage('core_event', {
        eventName,
        data: {
          ...e,
          eventName
        }
      })
    })
  }
}

new PlayerWorker()