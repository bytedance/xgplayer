import TransmuxerWorker from './transmuxerworker?worker&inline'

/**
 * Worker 转封装控制器：把 mp4→fmp4 的 demux/remux 放到 Worker 线程执行，避免主线程卡顿。
 * 对外提供 Promise 化的 transmux 接口，内部用自增 id 关联请求与回包。
 */
export default class TransmuxerWorkerControl {
  constructor() {
    this._id = 0
    this._pending = new Map()
    this.worker = new TransmuxerWorker()
    this.worker.onmessage = (e) => {
      const { method, id, result, error } = e.data
      if (method !== 'transmux') return
      const task = this._pending.get(id)
      if (!task) return
      this._pending.delete(id)
      if (error) task.reject(new Error(error.message))
      else task.resolve(result)
    }
    this.worker.postMessage({ method: 'init' })
  }

  transmux(data, dataStart, videoIndexRange, audioIndexRange, moov) {
    if (!this.worker) return Promise.reject(new Error('worker destroyed'))
    const id = ++this._id
    // 拷贝一份用于 transfer，避免影响调用方持有的 data
    const buffer = data.slice().buffer
    return new Promise((resolve, reject) => {
      this._pending.set(id, { resolve, reject })
      this.worker.postMessage(
        {
          method: 'transmux',
          id,
          buffer,
          args: { dataStart, videoIndexRange, audioIndexRange, moov }
        },
        [buffer]
      )
    })
  }

  reset() {
    this._rejectAll('worker reset')
    this.worker?.postMessage({ method: 'reset' })
  }

  destroy() {
    this._rejectAll('worker destroyed')
    this.worker?.terminate()
    this.worker = null
  }

  _rejectAll(reason) {
    this._pending.forEach((task) => task.reject(new Error(reason)))
    this._pending.clear()
  }
}
