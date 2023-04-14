import EventEmitter from 'eventemitter3'
import TransmuxerWorker from './transmuxerworker?worker&inline'

export default class TransmuxerWorkerControl extends EventEmitter {
  constructor (options) {
    super()
    this.openlog = options.openLog
    this.codecType = options.codecType
    this.supportHevc = options.supportHevc
    this.worker = new TransmuxerWorker()
    this.worker.onmessage = (e) => {
      this.emit(e.data.method, e.data)
    }
    this.worker.postMessage({
      method: 'init',
      id: options.id || 0,
      args: { openlog: this.openlog, supportHevc: this.supportHevc, codecType: this.codecType}
    })
  }

  transmux (id, data, start, videoIdx, audioIdx, moov, useEME, kidValue, context) {
    const buffer = data.buffer
    this.worker && this.worker.postMessage({
      method: 'transmux',
      id,
      buffer,
      args: { start, videoIdx, audioIdx, moov, useEME, kidValue, context}
    },[buffer])
  }

  reset () {
    this.worker && this.worker.postMessage({
      method: 'reset'
    })
  }

  destroy () {
    this.worker && this.worker.terminate()
  }

}
