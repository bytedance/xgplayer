/** @jest-environment node */
import type { WorkerEvent, WorkerRequest } from '../src/transcoder/protocol'

const mockRuntime = { run: jest.fn(), acknowledge: jest.fn() }
const mockPost = jest.fn()
let mockSend: ((event: WorkerEvent, transfer?: Transferable[]) => void) | undefined
jest.mock('../src/worker/runtime', () => ({
  StreamingWorker: jest.fn((post: typeof mockSend) => {
    mockSend = post
    return mockRuntime
  })
}))

interface TestScope {
  onmessage: ((event: { data: WorkerRequest }) => void) | null
  postMessage: typeof mockPost
}

describe('streaming Worker entry', () => {
  const scope = globalThis as unknown as TestScope
  let onmessage: PropertyDescriptor | undefined
  let postMessage: PropertyDescriptor | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    mockRuntime.run.mockResolvedValue(undefined)
    onmessage = Object.getOwnPropertyDescriptor(globalThis, 'onmessage')
    postMessage = Object.getOwnPropertyDescriptor(globalThis, 'postMessage')
    Object.defineProperty(globalThis, 'postMessage', { value: mockPost, configurable: true })
    jest.isolateModules(() => { require('../src/worker/index') })
  })

  afterEach(() => {
    if (onmessage) Object.defineProperty(globalThis, 'onmessage', onmessage)
    else Reflect.deleteProperty(globalThis, 'onmessage')
    if (postMessage) Object.defineProperty(globalThis, 'postMessage', postMessage)
    else Reflect.deleteProperty(globalThis, 'postMessage')
  })

  test('routes source and output acknowledgements to the same runtime', () => {
    const source: WorkerRequest = {
      type: 'start', source: 'https://example.com/a.wma', args: [], inputArguments: [],
      ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' }
    }
    scope.onmessage?.({ data: source })
    scope.onmessage?.({ data: { type: 'ack', id: 3 } })
    expect(mockRuntime.run).toHaveBeenCalledWith(source)
    expect(mockRuntime.acknowledge).toHaveBeenCalledWith(3)
  })

  test('preserves the transfer list and reports unexpected runtime rejection', async () => {
    const data = new Uint8Array([1])
    mockSend?.({ type: 'chunk', id: 1, data }, [data.buffer])
    expect(mockPost).toHaveBeenCalledWith({ type: 'chunk', id: 1, data }, [data.buffer])
    mockRuntime.run.mockRejectedValueOnce(new Error('Unexpected runtime failure'))
    scope.onmessage?.({ data: {
      type: 'start', source: 'https://example.com/a.wma', args: [], inputArguments: [],
      ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' }
    } })
    await Promise.resolve()
    expect(mockPost).toHaveBeenCalledWith({
      type: 'error', stage: 'runtime', message: 'Unexpected runtime failure'
    })
  })
})
