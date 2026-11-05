import type { WorkerEvent, WorkerRequest } from '../transcoder/protocol'
import { StreamingWorker } from './runtime'

interface WorkerScope {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
  postMessage(event: WorkerEvent, transfer?: Transferable[]): void
}

const scope = globalThis as unknown as WorkerScope
const runtime = new StreamingWorker((event, transfer) =>
  scope.postMessage(event, transfer)
)
scope.onmessage = (event) => {
  void runtime.receive(event.data)
}
