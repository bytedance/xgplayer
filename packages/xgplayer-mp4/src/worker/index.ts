import type {
  SegmentIndexRange,
  WorkerRequest,
  WorkerResponse,
  WorkerTransmuxResult
} from '../types'
import TransmuxerWorker from './transmuxerworker?worker&inline'

interface PendingTask {
  resolve: (result: WorkerTransmuxResult) => void
  reject: (error: Error) => void
}

export class WorkerTaskCancelledError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WorkerTaskCancelledError'
  }
}

/**
 * Worker 转封装控制器：把 mp4→fmp4 的 demux/remux 放到 Worker 线程执行，避免主线程卡顿。
 * 对外提供 Promise 化的 transmux 接口，内部用自增 id 关联请求与回包。
 */
export default class TransmuxerWorkerControl {
  private _id = 0
  private _pending = new Map<number, PendingTask>()
  worker: Worker | null = new TransmuxerWorker()

  constructor() {
    if (!this.worker) return
    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { method, id, result, error } = event.data
      if (method !== 'transmux') return
      const task = this._pending.get(id)
      if (!task) return
      this._pending.delete(id)
      if (error) task.reject(new Error(error.message))
      else if (result) task.resolve(result)
      else task.reject(new Error('worker returned an empty transmux result'))
    }
    this.worker.onerror = (event) => {
      this._rejectAll(new Error(event.message || 'worker runtime error'))
    }
    this.worker.onmessageerror = () => {
      this._rejectAll(new Error('worker message error'))
    }
    this.post({ method: 'init' })
  }

  transmux(
    data: Uint8Array,
    dataStart: number,
    videoIndexRange: SegmentIndexRange | undefined,
    audioIndexRange: SegmentIndexRange | undefined,
    moov: unknown
  ): Promise<WorkerTransmuxResult> {
    const worker = this.worker
    if (!worker) return Promise.reject(new Error('worker destroyed'))
    const id = ++this._id
    // 拷贝一份用于 transfer，避免影响调用方持有的 data
    const buffer = data.slice().buffer as ArrayBuffer
    return new Promise((resolve, reject) => {
      this._pending.set(id, { resolve, reject })
      try {
        const request: WorkerRequest = {
          method: 'transmux',
          id,
          buffer,
          args: { dataStart, videoIndexRange, audioIndexRange, moov }
        }
        worker.postMessage(request, [buffer])
      } catch (error) {
        this._pending.delete(id)
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    })
  }

  configure(
    videoSegments: unknown[],
    audioSegments: unknown[],
    memoryOpt: boolean,
    isFragmentMP4: boolean
  ) {
    this.post({
      method: 'configure',
      videoSegments,
      audioSegments,
      memoryOpt,
      isFragmentMP4
    })
  }

  reset() {
    this._rejectAll(new WorkerTaskCancelledError('worker reset'))
    this.post({ method: 'reset' })
  }

  destroy() {
    this._rejectAll(new WorkerTaskCancelledError('worker destroyed'))
    this.worker?.terminate()
    this.worker = null
  }

  private post(message: WorkerRequest, transfer: Transferable[] = []) {
    this.worker?.postMessage(message, transfer)
  }

  private _rejectAll(error: Error) {
    this._pending.forEach((task) => task.reject(error))
    this._pending.clear()
  }
}
