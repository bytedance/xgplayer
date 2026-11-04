/** @jest-environment node */
import { createAudioProfile } from '../src/profiles/audio'
import { Transcoder } from '../src/transcoder/transcoder'
import type { FFmpegOptions } from '../src/types'
import { FFmpegError } from '../src/types'
import type { TranscodeRequest, WorkerEvent, WorkerRequest } from '../src/transcoder/protocol'

class MockWorker {
  static instances: MockWorker[] = []
  request!: TranscodeRequest
  messages: WorkerRequest[] = []
  onmessage: ((event: { data: WorkerEvent }) => void) | null = null
  onerror: ((event: { message: string }) => void) | null = null
  onmessageerror: (() => void) | null = null
  terminate = jest.fn()
  constructor() { MockWorker.instances.push(this) }
  postMessage(request: WorkerRequest) {
    this.messages.push(request)
    if (request.type === 'start') this.request = request
  }
  send(data: WorkerEvent) { this.onmessage?.({ data }) }
  output(id: number, bytes = [3, 4]) {
    this.send({ type: 'chunk', id, data: new Uint8Array(bytes) })
  }
}

function setup(overrides: Partial<FFmpegOptions> = {}) {
  const options: FFmpegOptions = {
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' },
    ...overrides
  }
  const transcoder = new Transcoder(options, createAudioProfile())
  const controller = new AbortController()
  const progress = jest.fn()
  const chunk = jest.fn().mockResolvedValue(undefined)
  return { transcoder, controller, progress, chunk }
}

async function flush() {
  for (let i = 0; i < 15; i++) await Promise.resolve()
}

const source = 'https://example.com/sample.wma'

describe('FFmpeg asynchronous streaming bridge', () => {
  beforeEach(() => {
    MockWorker.instances = []
    Object.defineProperty(globalThis, 'Worker', { value: MockWorker, configurable: true })
  })
  afterEach(() => jest.restoreAllMocks())

  test('delivers output and download progress before EOF, then releases the Worker', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    worker.send({ type: 'ready' })
    worker.send({
      type: 'progress',
      data: { progress: 0, time: 0, downloadedBytes: 24, inputEnded: false }
    })
    worker.output(1)
    await flush()
    expect(chunk).toHaveBeenCalledWith(new Uint8Array([3, 4]))
    expect(worker.messages[1]).toEqual({ type: 'ack', id: 1 })
    expect(progress).toHaveBeenLastCalledWith(expect.objectContaining({ inputEnded: false }))
    worker.send({ type: 'done' })
    await running
    expect(worker.terminate).toHaveBeenCalledTimes(1)
  })

  test('withholds ACK until the MSE consumer accepts a chunk', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    let release!: () => void
    chunk.mockImplementation(() => new Promise<void>((resolve) => { release = resolve }))
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    worker.output(7)
    await flush()
    expect(worker.messages).toHaveLength(1)
    release()
    await flush()
    expect(worker.messages[1]).toEqual({ type: 'ack', id: 7 })
    worker.send({ type: 'done' })
    await running
  })

  test('waits for duration to be applied before consuming the first output', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    let release!: () => void
    const metadata = jest.fn(() => new Promise<void>((resolve) => { release = resolve }))
    const running = transcoder.run(source, controller.signal, chunk, progress, metadata)
    await flush()
    const worker = MockWorker.instances[0]
    worker.send({ type: 'metadata', duration: 728.084 })
    worker.output(1)
    await flush()
    expect(metadata).toHaveBeenCalledWith(728.084)
    expect(chunk).not.toHaveBeenCalled()
    expect(worker.messages).toHaveLength(1)
    release()
    await flush()
    expect(chunk).toHaveBeenCalledTimes(1)
    expect(worker.messages[1]).toEqual({ type: 'ack', id: 1 })
    worker.send({ type: 'done' })
    await running
  })

  test('waits for metadata even when the Worker completes without output', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    let release!: () => void
    const running = transcoder.run(source, controller.signal, chunk, progress,
      () => new Promise<void>((resolve) => { release = resolve }))
    await flush()
    const worker = MockWorker.instances[0]
    worker.send({ type: 'metadata', duration: 8 })
    worker.send({ type: 'done' })
    await flush()
    expect(worker.terminate).not.toHaveBeenCalled()
    release()
    await running
    expect(worker.terminate).toHaveBeenCalledTimes(1)
  })

  test.each(['error', 'abort', 'destroy'] as const)(
    'settles %s promptly while duration is updating and discards late consumption',
    async (action) => {
      const { transcoder, controller, chunk, progress } = setup()
      let release!: () => void
      const running = transcoder.run(source, controller.signal, chunk, progress,
        () => new Promise<void>((resolve) => { release = resolve }))
      const result = running.catch((reason: Error) => reason)
      await flush()
      const worker = MockWorker.instances[0]
      worker.send({ type: 'metadata', duration: 728.084 })
      worker.output(1)
      if (action === 'error') worker.send({ type: 'error', stage: 'transcode', message: 'Failed' })
      else if (action === 'abort') controller.abort()
      else transcoder.destroy()
      expect(await result).toMatchObject(action === 'error'
        ? { stage: 'transcode' } : { name: 'AbortError' })
      const next = transcoder.run(source, new AbortController().signal, chunk, progress)
      await flush()
      release()
      await flush()
      expect(chunk).not.toHaveBeenCalled()
      expect(worker.messages).toHaveLength(1)
      MockWorker.instances[1].send({ type: 'done' })
      await next
    }
  )

  test.each([new Error('Duration update failed'), new FFmpegError('buffer', 'Duration update failed')])(
    'reports duration update rejection and never appends output',
    async (failure) => {
      const { transcoder, controller, chunk, progress } = setup()
      const result = transcoder.run(source, controller.signal, chunk, progress,
        async () => { throw failure }).catch((reason: Error) => reason)
      await flush()
      const worker = MockWorker.instances[0]
      worker.send({ type: 'metadata', duration: 8 })
      worker.output(1)
      expect(await result).toMatchObject({ stage: 'buffer' })
      expect(chunk).not.toHaveBeenCalled()
      expect(worker.messages).toHaveLength(1)
    }
  )

  test.each([Infinity, NaN, 0, -1])('rejects invalid duration metadata: %s', async (duration) => {
    const { transcoder, controller, chunk, progress } = setup()
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((reason: Error) => reason)
    await flush()
    MockWorker.instances[0].send({ type: 'metadata', duration })
    expect(await result).toMatchObject({ stage: 'runtime' })
  })

  test('rejects duplicate metadata', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((reason: Error) => reason)
    await flush()
    const worker = MockWorker.instances[0]
    worker.send({ type: 'metadata', duration: 8 })
    worker.send({ type: 'metadata', duration: 8 })
    expect(await result).toMatchObject({ stage: 'runtime' })
  })

  test.each(['error', 'abort', 'destroy'] as const)(
    'terminates promptly on %s while MSE is applying backpressure',
    async (action) => {
      const { transcoder, controller, chunk, progress } = setup()
      let release!: () => void
      chunk.mockImplementation(() => new Promise<void>((resolve) => { release = resolve }))
      const running = transcoder.run(source, controller.signal, chunk, progress)
      const result = running.catch((reason: Error) => reason)
      await flush()
      const worker = MockWorker.instances[0]
      worker.output(1)
      await flush()
      if (action === 'error') worker.send({ type: 'error', stage: 'transcode', message: 'Bad packet' })
      else if (action === 'abort') controller.abort()
      else transcoder.destroy()
      expect(await result).toMatchObject(action === 'error'
        ? { stage: 'transcode', message: 'Bad packet' } : { name: 'AbortError' })
      expect(worker.terminate).toHaveBeenCalledTimes(1)
      release()
      await flush()
      expect(worker.messages).toHaveLength(1)
    }
  )

  test('reports append rejection as a buffer error without acknowledging it', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    chunk.mockRejectedValueOnce(new Error('SourceBuffer failure'))
    const running = transcoder.run(source, controller.signal, chunk, progress)
    const result = running.catch((reason: Error) => reason)
    await flush()
    MockWorker.instances[0].output(1)
    expect(await result).toMatchObject({ stage: 'buffer' })
    expect(MockWorker.instances[0].messages).toHaveLength(1)
  })

  test('serializes HTTP headers and forwards the download limit to the Worker', async () => {
    const { transcoder, controller, chunk, progress } = setup({
      requestOptions: {
        credentials: 'include', headers: new Headers({ 'X-Media': 'test' }),
        priority: 'high', window: null, referrer: 'https://example.com/page'
      },
      maxInputBytes: 1024
    })
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    expect(worker.request).toMatchObject({
      source, maxInputBytes: 1024,
      requestOptions: {
        credentials: 'include', headers: { 'x-media': 'test' },
        priority: 'high', window: null, referrer: 'https://example.com/page'
      }
    })
    worker.send({ type: 'done' })
    await running
  })

  test('resolves relative HTTP paths against the page rather than the Worker URL', async () => {
    const previous = Object.getOwnPropertyDescriptor(globalThis, 'document')
    Object.defineProperty(globalThis, 'document', {
      value: { baseURI: 'https://app.example.com/pages/player.html' },
      configurable: true
    })
    const { transcoder, controller, chunk, progress } = setup()
    try {
      const running = transcoder.run('../media/sample.wma', controller.signal, chunk, progress)
      await flush()
      const worker = MockWorker.instances[0]
      expect(worker.request.source).toBe('https://app.example.com/media/sample.wma')
      worker.send({ type: 'done' })
      await running
    } finally {
      transcoder.destroy()
      if (previous) Object.defineProperty(globalThis, 'document', previous)
      else Reflect.deleteProperty(globalThis, 'document')
    }
  })

  test('places raw audio policy before input and creates nonseekable fragmented MP4', async () => {
    const { controller, chunk, progress } = setup()
    const transcoder = new Transcoder({
      ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' }
    }, createAudioProfile({ inputFormat: 's16le', inputSampleRate: 16000, inputChannels: 1 }))
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    const args = worker.request.args
    expect(args.slice(args.indexOf('-f'), args.indexOf('-i') + 2)).toEqual([
      '-f', 's16le', '-ar', '16000', '-ac', '1', '-i', '/input'
    ])
    expect(worker.request.inputArguments).toEqual([
      '-f', 's16le', '-ar', '16000', '-ac', '1'
    ])
    expect(args[args.indexOf('-movflags') + 1])
      .toBe('+empty_moov+default_base_moof+frag_keyframe')
    expect(args).toEqual(expect.arrayContaining([
      '-f', 'mp4', '-frag_duration', '1000000', '-flush_packets', '1'
    ]))
    worker.send({ type: 'done' })
    await running
  })

  test.each(['', 'blob:https://example.com/id', 'data:audio/wav;base64,', 'file:///a.wma', 'ftp://a/a.wma'])(
    'rejects a source outside HTTP(S) before starting a Worker: %s',
    async (url) => {
      const { transcoder, controller, chunk, progress } = setup()
      await expect(transcoder.run(url, controller.signal, chunk, progress))
        .rejects.toMatchObject({ stage: 'download' })
      expect(MockWorker.instances).toHaveLength(0)
    }
  )

  test('rejects local Blob input and already cancelled loads', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    await expect(transcoder.run(new Blob(['audio']) as never, controller.signal, chunk, progress))
      .rejects.toMatchObject({ stage: 'download' })
    controller.abort()
    await expect(transcoder.run(source, controller.signal, chunk, progress))
      .rejects.toMatchObject({ name: 'AbortError' })
    expect(MockWorker.instances).toHaveLength(0)
  })

  test.each(['onerror', 'onmessageerror'] as const)('reports %s as a runtime failure', async (event) => {
    const { transcoder, controller, chunk, progress } = setup()
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((error: Error) => error)
    await flush()
    const worker = MockWorker.instances[0]
    if (event === 'onerror') worker.onerror?.({ message: 'WASM failed' })
    else worker.onmessageerror?.()
    expect(await result).toMatchObject({ stage: 'runtime' })
    expect(worker.terminate).toHaveBeenCalledTimes(1)
  })

  test('a progress callback failure settles the job and stops the Worker', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    progress.mockImplementation(() => { throw new Error('Listener failed') })
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((error: Error) => error)
    await flush()
    const worker = MockWorker.instances[0]
    worker.send({ type: 'progress', data: { progress: 0, time: 0, downloadedBytes: 1, inputEnded: false } })
    expect(await result).toMatchObject({ stage: 'runtime', message: 'Streaming callback failed' })
    expect(worker.terminate).toHaveBeenCalledTimes(1)
  })

  test.each(['chunk', 'done'] as const)('rejects an unexpected %s before output ACK', async (event) => {
    const { transcoder, controller, chunk, progress } = setup()
    let release!: () => void
    chunk.mockImplementation(() => new Promise<void>((resolve) => { release = resolve }))
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((error: Error) => error)
    await flush()
    const worker = MockWorker.instances[0]
    worker.output(1)
    if (event === 'chunk') worker.output(2)
    else worker.send({ type: 'done' })
    expect(await result).toMatchObject({ stage: 'runtime' })
    release()
    await flush()
    expect(worker.messages).toHaveLength(1)
    expect(chunk).toHaveBeenCalledTimes(1)
  })

  test('request signals supplied by JavaScript stay outside the Worker protocol', async () => {
    const external = new AbortController()
    const requestOptions = { signal: external.signal, credentials: 'include' as const }
    const { transcoder, controller, chunk, progress } = setup({ requestOptions })
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    expect(worker.request.requestOptions).not.toHaveProperty('signal')
    external.abort()
    worker.send({ type: 'done' })
    await running
  })

  test('normalizes POST form bodies and headers into cloneable data', async () => {
    const { transcoder, controller, chunk, progress } = setup({
      requestOptions: { method: 'POST', body: new URLSearchParams({ token: 'media' }) }
    })
    const running = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const worker = MockWorker.instances[0]
    expect(await worker.request.requestOptions?.body?.text()).toBe('token=media')
    expect(worker.request.requestOptions?.headers?.['content-type']).toContain('application/x-www-form-urlencoded')
    worker.send({ type: 'done' })
    await running
  })

  test('rejects streaming upload bodies before creating a Worker', async () => {
    const { transcoder, controller, chunk, progress } = setup({
      requestOptions: { method: 'POST', body: new ReadableStream() as never }
    })
    await expect(transcoder.run(source, controller.signal, chunk, progress))
      .rejects.toMatchObject({ stage: 'download', message: 'Streaming request bodies are not supported' })
    expect(MockWorker.instances).toHaveLength(0)
  })

  test('rejects invalid HTTP options with a download-stage error', async () => {
    const { transcoder, controller, chunk, progress } = setup({
      requestOptions: { method: 'GET', body: 'not a GET body' }
    })
    await expect(transcoder.run(source, controller.signal, chunk, progress))
      .rejects.toMatchObject({ stage: 'download', message: 'Invalid HTTP request options' })
    expect(MockWorker.instances).toHaveLength(0)
  })

  test('rejects overlapping jobs without cancelling the active request', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    const first = transcoder.run(source, controller.signal, chunk, progress)
    await expect(transcoder.run(source, controller.signal, chunk, progress))
      .rejects.toMatchObject({ message: 'A transcode job is already running' })
    await flush()
    expect(MockWorker.instances).toHaveLength(1)
    MockWorker.instances[0].send({ type: 'done' })
    await first
  })

  test('ignores callbacks retained from a completed Worker after a new job starts', async () => {
    const { transcoder, controller, chunk, progress } = setup()
    const first = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    const firstWorker = MockWorker.instances[0]
    const oldCallback = firstWorker.onmessage
    firstWorker.send({ type: 'done' })
    await first
    const second = transcoder.run(source, controller.signal, chunk, progress)
    await flush()
    oldCallback?.({ data: {
      type: 'progress', data: { progress: 1, time: 1, downloadedBytes: 1, inputEnded: true }
    } })
    oldCallback?.({ data: { type: 'done' } })
    oldCallback?.({ data: { type: 'metadata', duration: 100 } })
    expect(progress).not.toHaveBeenCalled()
    expect(MockWorker.instances[1].terminate).not.toHaveBeenCalled()
    MockWorker.instances[1].send({ type: 'done' })
    await second
  })

  test.each(['abort', 'destroy'] as const)('settles %s during request preparation and prevents a late Worker', async (action) => {
    let release!: (body: Blob) => void
    jest.spyOn(Request.prototype, 'blob').mockImplementation(() =>
      new Promise<Blob>((resolve) => { release = resolve })
    )
    const { transcoder, controller, chunk, progress } = setup({
      requestOptions: { method: 'POST', body: 'request' }
    })
    const result = transcoder.run(source, controller.signal, chunk, progress).catch((error: Error) => error)
    await flush()
    if (action === 'abort') controller.abort()
    else transcoder.destroy()
    expect(await result).toMatchObject({ name: 'AbortError' })
    release(new Blob(['request']))
    await flush()
    expect(MockWorker.instances).toHaveLength(0)
  })
})
