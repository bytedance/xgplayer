/** @jest-environment node */
const mockReceive = jest.fn().mockResolvedValue(undefined)
jest.mock('../src/worker/runtime', () => ({
  StreamingWorker: jest.fn(() => ({ receive: mockReceive }))
}))
import type { WorkerRequest } from '../src/transcoder/protocol'
import { StreamingWorker } from '../src/worker/runtime'

test('the Worker entry routes control and native commands through the same owner', () => {
  const scope = globalThis as unknown as {
    onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
    postMessage: jest.Mock
  }
  scope.postMessage = jest.fn()
  require('../src/worker/index')
  scope.onmessage?.({ data: { type: 'cancel', epoch: 2 } } as MessageEvent<WorkerRequest>)
  expect(mockReceive).toHaveBeenCalledWith({ type: 'cancel', epoch: 2 })
  const post = (StreamingWorker as jest.Mock).mock.calls[0][0]
  const event = { type: 'complete', id: 1, epoch: 2 }
  post(event)
  expect(scope.postMessage).toHaveBeenCalledWith(event, undefined)
  scope.onmessage = null
})
