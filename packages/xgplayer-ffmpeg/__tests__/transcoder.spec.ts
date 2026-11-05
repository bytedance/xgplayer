import { Transcoder } from '../src/transcoder/transcoder'
import { createAudioProfile } from '../src/profiles/audio'
import type { WorkerCommand, WorkerEvent, WorkerRequest } from '../src/transcoder/protocol'
import type { FFmpegOptions } from '../src/types'

jest.mock('xgplayer-streaming-shared', () => ({
  MSE: { isSupported: jest.fn().mockReturnValue(true) }
}))

class MockWorker {
  static instances: MockWorker[] = []
  onmessage: ((event: MessageEvent<WorkerEvent>) => void) | null = null
  onerror: ((event: ErrorEvent) => void) | null = null
  onmessageerror: (() => void) | null = null
  postMessage = jest.fn<void, [WorkerRequest]>()
  terminate = jest.fn()
  constructor() { MockWorker.instances.push(this) }
  get command(): WorkerCommand {
    const command = this.postMessage.mock.calls.at(-1)?.[0]
    if (!command || command.type === 'cancel') throw new Error('No native command')
    return command
  }
  reply(event: WorkerEvent): void { this.onmessage?.({ data: event } as MessageEvent<WorkerEvent>) }
}

const metadata = { duration: 100, codec: 'aac', sampleRate: 44100, channels: 2, mimeType: 'audio/mp4' }
const signal = () => new AbortController().signal
function setup(extra: Partial<FFmpegOptions> = {}) {
  return new Transcoder({
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' }, ...extra
  }, createAudioProfile())
}
async function open(client: Transcoder) {
  const result = client.open('https://example.com/a.wma', signal())
  const worker = MockWorker.instances.at(-1)!
  worker.reply({ ...worker.command, type: 'opened', metadata })
  await result
  return worker
}

describe('persistent Worker client', () => {
  beforeEach(() => {
    MockWorker.instances.length = 0
    Object.defineProperty(globalThis, 'Worker', { value: MockWorker, configurable: true })
  })

  test('reuses one Worker across sources and closes without terminating the module', async () => {
    const client = setup()
    const worker = await open(client)
    await open(client)
    expect(MockWorker.instances).toHaveLength(1)
    const closing = client.close()
    worker.reply({ ...worker.command, type: 'complete' })
    await closing
    expect(worker.terminate).not.toHaveBeenCalled()
    client.destroy()
    expect(worker.terminate).toHaveBeenCalledTimes(1)
  })

  test('passes cloneable Range options and typed audio policy', async () => {
    const client = setup({ requestOptions: { credentials: 'include', headers: new Headers({ 'X-Test': 'ok' }) } })
    const worker = await open(client)
    expect(worker.command).toMatchObject({
      type: 'open', requestOptions: { credentials: 'include', headers: { 'x-test': 'ok' } },
      audio: { outputCodec: 'auto' }, aacSupported: true, flacSupported: true
    })
    client.destroy()
  })

  test('a newer seek cancels a pull immediately and ignores its late output', async () => {
    const client = setup()
    const worker = await open(client)
    const old = client.pull(signal()).catch((error: Error) => error)
    const previous = worker.command
    const seeking = client.seek(80, signal())
    const current = worker.command
    expect(await old).toMatchObject({ name: 'AbortError' })
    worker.reply({ ...previous, type: 'output', output: { kind: 'eof' }, progress: {
      progress: 1, time: 100, downloadedBytes: 0, inputEnded: true
    } })
    worker.reply({ ...current, type: 'complete' })
    await seeking
    expect(worker.terminate).not.toHaveBeenCalled()
    client.destroy()
  })

  test('aborting a command sends cancellation without killing WASM', async () => {
    const client = setup()
    const worker = await open(client)
    const controller = new AbortController()
    const pending = client.pull(controller.signal).catch((error: Error) => error)
    controller.abort()
    expect(await pending).toMatchObject({ name: 'AbortError' })
    expect(worker.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'cancel' }))
    expect(worker.terminate).not.toHaveBeenCalled()
    client.destroy()
  })

  test.each(['error', 'message', 'protocol'])('terminates a faulty %s Worker and rejects its caller', async (mode) => {
    const client = setup()
    const worker = await open(client)
    const result = client.pull(signal()).catch((error: Error) => error)
    if (mode === 'error') worker.onerror?.({ message: 'trap' } as ErrorEvent)
    else if (mode === 'message') worker.onmessageerror?.()
    else worker.reply({ ...worker.command, type: 'complete' })
    expect(await result).toMatchObject({ stage: 'runtime' })
    expect(worker.terminate).toHaveBeenCalledTimes(1)
    client.destroy()
  })

  test('propagates native errors without treating them as EOF', async () => {
    const client = setup()
    const worker = await open(client)
    const pending = client.pull(signal())
    worker.reply({ ...worker.command, type: 'error', stage: 'download', message: 'truncated' })
    await expect(pending).rejects.toMatchObject({ stage: 'download', message: 'truncated' })
    client.destroy()
  })

  test.each(['', 'blob:abc', 'file:///tmp/a'])('rejects unsupported source %s before spawning a Worker', async (source) => {
    const client = setup()
    await expect(client.open(source, signal())).rejects.toMatchObject({ stage: 'download' })
    expect(MockWorker.instances).toHaveLength(0)
    client.destroy()
  })

  test('a deadline terminates a stuck core', async () => {
    jest.useFakeTimers()
    const client = setup({ timeout: 10 })
    const worker = await open(client)
    const pending = client.pull(signal()).catch((error: Error) => error)
    jest.advanceTimersByTime(11)
    expect(await pending).toMatchObject({ message: 'Worker command timed out' })
    expect(worker.terminate).toHaveBeenCalledTimes(1)
    client.destroy()
    jest.useRealTimers()
  })

  test('destroy rejects pending calls and prevents future work', async () => {
    const client = setup()
    await open(client)
    const pending = client.pull(signal()).catch((error: Error) => error)
    client.destroy()
    expect(await pending).toMatchObject({ name: 'AbortError' })
    await expect(client.pull(signal())).rejects.toMatchObject({ stage: 'runtime' })
  })

  test('pre-aborted work does not start a Worker and native cancellation keeps the module', async () => {
    const client = setup()
    const controller = new AbortController()
    controller.abort()
    await expect(client.open('https://example.com/a.wma', controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(MockWorker.instances).toHaveLength(0)
    const worker = await open(client)
    const pending = client.pull(signal())
    worker.reply({ ...worker.command, type: 'error', stage: 'transcode', message: 'cancelled', cancelled: true })
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(worker.terminate).not.toHaveBeenCalled()
    client.destroy()
  })

  test('failed postMessage and anonymous Worker errors reject the command', async () => {
    const client = setup()
    const worker = await open(client)
    worker.postMessage.mockImplementationOnce(() => { throw new Error('clone failed') })
    await expect(client.pull(signal())).rejects.toMatchObject({ message: 'Cannot send Worker command' })
    expect(worker.terminate).toHaveBeenCalledTimes(1)
    const next = await open(client)
    const pending = client.pull(signal())
    next.onerror?.({ message: '' } as ErrorEvent)
    await expect(pending).rejects.toMatchObject({ message: 'Worker failed' })
    client.destroy()
  })

  test('ignores an unknown response identity and resolves relative sources once', async () => {
    const client = setup()
    const opening = client.open('/relative.wma', signal())
    const worker = MockWorker.instances[0]
    expect(worker.command).toMatchObject({ source: 'http://localhost/relative.wma' })
    worker.reply({ ...worker.command, id: worker.command.id + 10, type: 'opened', metadata })
    worker.reply({ ...worker.command, type: 'opened', metadata })
    await opening
    client.destroy()
  })
})
