/** @jest-environment node */
import { AsyncifyRunner } from '../src/worker/asyncify'
import { type FFmpegCore, loadCore } from '../src/worker/core'
import { StreamingWorker } from '../src/worker/runtime'
import type { TranscodeRequest, WorkerEvent } from '../src/transcoder/protocol'

jest.mock('invalid-ffmpeg-core', () => ({ default: null }), { virtual: true })

class MockCore implements FFmpegCore {
  state = 0
  phase = 0
  count = 0
  ret = -1
  buffer = new Int8Array(8)
  devices = new Map<number, Parameters<FFmpegCore['FS']['registerDevice']>[1]>()
  FS = {
    makedev: (_major: number, minor: number) => minor,
    registerDevice: (id: number, device: Parameters<FFmpegCore['FS']['registerDevice']>[1]) => {
      this.devices.set(id, device)
    },
    mkdev: jest.fn(),
    open: jest.fn(() => ({ fd: 3 })),
    ErrnoError: class extends Error {
      constructor(code: number) { super(String(code)) }
    }
  }
  asm = {
    asyncify_get_state: () => this.state,
    asyncify_start_unwind: () => { this.state = 1 },
    asyncify_stop_unwind: () => { this.state = 0 },
    asyncify_start_rewind: () => { this.state = 2 },
    asyncify_stop_rewind: () => { this.state = 0 }
  }
  HEAPU32 = new Uint32Array(32)
  DEFAULT_ARGS = ['ffmpeg', '-nostdin']
  DEFAULT_ARGS_FFPROBE = ['ffprobe']
  _malloc = jest.fn(() => 8)
  stringsToPtr = jest.fn(() => 128)
  setLogger = jest.fn<void, [Parameters<FFmpegCore['setLogger']>[0]]>()
  setProgress = jest.fn()
  streamProbe = jest.fn(() => {
    this.setLogger.mock.calls.at(-1)?.[0]({ type: 'stdout', message: '{"format":{}}' })
    this.ret = 0
    return true
  })
  streamExec = jest.fn(() => {
    while (true) {
      if (this.phase === 0) {
        const size = this.devices.get(0)?.read?.({ seekable: false }, this.buffer, 0, this.buffer.length)
        if (this.state === 1) return false
        this.count = size || 0
        if (!this.count) break
        this.phase = 1
      }
      if (this.phase === 1) {
        this.devices.get(1)?.write?.({ seekable: false }, this.buffer, 0, this.count)
        if (this.state === 1) return false
        if (!this.readUntilEOF) break
        this.phase = 0
      }
    }
    this.ret = this.exitCode
    return true
  })

  constructor(private readonly readUntilEOF = false, private readonly exitCode = 0) {}
}

async function flush() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}

function setup(untilEOF = false, code = 0) {
  const core = new MockCore(untilEOF, code)
  const events: WorkerEvent[] = []
  const worker = new StreamingWorker((event) => {
    events.push(event)
  })
  const request: TranscodeRequest = {
    type: 'start', source: 'https://example.com/audio.wma',
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' },
    args: ['-i', '/input'], inputArguments: []
  }
  return { core, worker, events, request }
}

describe('Asyncify HTTP streaming devices', () => {
  afterEach(() => jest.restoreAllMocks())

  test('outputs before EOF and stops reading while an output ACK is pending', async () => {
    const cancel = jest.fn()
    const reads = jest.fn()
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new ReadableStream({
      pull(controller) { reads(); controller.enqueue(new Uint8Array([255, 2])) }, cancel
    }, { highWaterMark: 0 })))
    const { worker, request, core, events } = setup()
    const running = worker.run(request, async () => core)
    await flush()
    const output = events.find((event) => event.type === 'chunk')
    expect(output).toMatchObject({ data: new Uint8Array([255, 2]), id: 1 })
    expect(reads).toHaveBeenCalledTimes(1)
    expect(events.some((event) => event.type === 'done')).toBe(false)
    worker.acknowledge(999)
    await flush()
    expect(core.ret).toBe(-1)
    worker.acknowledge(1)
    await running
    expect(events.at(-1)).toEqual({ type: 'done' })
    expect(cancel).toHaveBeenCalled()
    expect(core.stringsToPtr).toHaveBeenCalledWith([...core.DEFAULT_ARGS, ...request.args, 'pipe:3'])
    expect(core.FS.open).toHaveBeenCalledWith('/output.mp4', 'w')
    const stream = { seekable: true }
    core.devices.get(0)?.open(stream)
    expect(stream.seekable).toBe(false)
    expect(() => core.devices.get(0)?.llseek()).toThrow('70')
  })

  test('retains partially consumed input and reports actual EOF', async () => {
    const { request, core, events } = setup(true)
    const source = Uint8Array.from({ length: 20 }, (_, i) => i)
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(source, { headers: { 'Content-Length': '20' } }))
    const outputs: Uint8Array[] = []
    const runtime = new StreamingWorker((event) => {
      events.push(event)
      if (event.type === 'chunk') {
        outputs.push(event.data)
        queueMicrotask(() => runtime.acknowledge(event.id))
      }
    })
    await runtime.run(request, async () => core)
    expect(Buffer.concat(outputs)).toEqual(Buffer.from(source))
    const lastProgress = events.filter((event) => event.type === 'progress').at(-1)
    expect(lastProgress).toMatchObject({ data: { downloadedBytes: 20, totalBytes: 20, inputEnded: true } })
  })

  test('publishes probed duration before unchanged output using the same HTTP stream', async () => {
    const source = new Uint8Array([0, 255, 2, 3, 4])
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(source))
    const { request, core, events } = setup()
    request.source = 'https://example.com/media'
    core.buffer = new Int8Array(source.length)
    core.streamProbe.mockImplementation(() => {
      const size = core.devices.get(0)?.read?.({ seekable: false }, core.buffer, 0, source.length)
      if (core.state === 1) return false
      expect(size).toBe(source.length)
      core.setLogger.mock.calls.at(-1)?.[0]({
        type: 'stdout', message: '{"format":{"duration":"728.084"}}'
      })
      core.ret = 0
      return true
    })
    const outputs: Uint8Array[] = []
    const runtime = new StreamingWorker((event) => {
      events.push(event)
      if (event.type === 'chunk') {
        outputs.push(event.data)
        queueMicrotask(() => runtime.acknowledge(event.id))
      }
    })
    await runtime.run(request, async () => core)
    expect(events.find((event) => event.type === 'metadata')).toMatchObject({
      duration: 728.084
    })
    expect(events.findIndex((event) => event.type === 'metadata')).toBeLessThan(
      events.findIndex((event) => event.type === 'chunk')
    )
    expect(events.filter((event) => event.type === 'progress').at(-1))
      .toMatchObject({ data: { inputEnded: false } })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(Buffer.concat(outputs)).toEqual(Buffer.from(source))
    expect(core.stringsToPtr).toHaveBeenCalledWith([
      ...core.DEFAULT_ARGS_FFPROBE, '-v', 'error', '-probesize', '65536',
      '-analyzeduration', '1000000', '-show_entries', 'format=duration',
      '-of', 'json', '/input'
    ])
    expect(events.at(-1)).toEqual({ type: 'done' })
  })

  test('splits large output into chunks of at most 64 KiB with one ACK at a time', async () => {
    const { request, core, events } = setup()
    core.buffer = new Int8Array(140000)
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array(140000)))
    const runtime = new StreamingWorker((event) => {
      events.push(event)
      if (event.type === 'chunk') queueMicrotask(() => runtime.acknowledge(event.id))
    })
    await runtime.run(request, async () => core)
    expect(events.filter((event) => event.type === 'chunk').map((event) => event.data.length))
      .toEqual([65536, 65536, 8928])
  })

  test('uses the actual output descriptor as an explicitly nonseekable pipe', async () => {
    const { request, core, worker, events } = setup()
    core.FS.open.mockReturnValue({ fd: 7 })
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array()))
    await worker.run(request, async () => core)
    expect(core.stringsToPtr).toHaveBeenLastCalledWith([
      ...core.DEFAULT_ARGS, ...request.args, 'pipe:7'
    ])
    expect(events.at(-1)).toEqual({ type: 'done' })
  })

  test('replays consumed probe bytes on a native unknown-duration failure', async () => {
    const { request, core, events } = setup(true)
    const source = new Uint8Array([1, 2, 3, 4])
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(source))
    core.streamProbe.mockImplementation(() => {
      core.devices.get(0)?.read?.({ seekable: false }, core.buffer, 0, core.buffer.length)
      if (core.state === 1) return false
      core.ret = 1
      return true
    })
    const output: Uint8Array[] = []
    const runtime = new StreamingWorker((event) => {
      events.push(event)
      if (event.type === 'chunk') {
        output.push(event.data)
        queueMicrotask(() => runtime.acknowledge(event.id))
      }
    })
    await runtime.run(request, async () => core)
    expect(Buffer.concat(output)).toEqual(Buffer.from(source))
    expect(events.some((event) => event.type === 'metadata')).toBe(false)
    expect(events.at(-1)).toEqual({ type: 'done' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  test.each(['trap', 'json'])('fails a broken native probe %s before transcoding', async (mode) => {
    const { worker, request, core, events } = setup()
    const cancel = jest.fn()
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new ReadableStream({ cancel })))
    core.streamProbe.mockImplementation(() => {
      if (mode === 'trap') throw new WebAssembly.RuntimeError('Probe trap')
      core.setLogger.mock.calls.at(-1)?.[0]({ type: 'stdout', message: 'invalid JSON' })
      core.ret = 0
      return true
    })
    await worker.run(request, async () => core)
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'runtime' })
    expect(core.streamExec).not.toHaveBeenCalled()
    expect(cancel).toHaveBeenCalledTimes(1)
  })

  test.each(['length', 'stream'])('enforces an explicit limit from %s and cancels the response', async (mode) => {
    const cancel = jest.fn()
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new ReadableStream({
      start(controller) { controller.enqueue(new Uint8Array([1, 2, 3])) }, cancel
    }), { headers: mode === 'length' ? { 'Content-Length': '3' } : {} }))
    const { worker, request, core, events } = setup()
    request.maxInputBytes = 2
    await worker.run(request, async () => core)
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'download', message: 'Input exceeds 2 bytes' })
    expect(cancel).toHaveBeenCalled()
    expect(core.streamExec).toHaveBeenCalledTimes(mode === 'length' ? 0 : 1)
  })

  test('reports network read failures after core initialization as download errors', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new ReadableStream({
      pull(controller) { controller.error(new Error('Connection lost')) }
    })))
    const { worker, request, core, events } = setup()
    await worker.run(request, async () => core)
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'download' })
  })

  test('forwards fetch options and rejects HTTP errors without loading WASM', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 403 }))
    const { worker, request, core, events } = setup()
    request.requestOptions = { credentials: 'include' }
    const factory = jest.fn(async () => core)
    await worker.run(request, factory)
    expect(fetchMock).toHaveBeenCalledWith(request.source, request.requestOptions)
    expect(factory).not.toHaveBeenCalled()
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'download', message: 'Media request failed: HTTP 403' })
  })

  test.each(['runtime', 'transcode'] as const)('reports %s failures with their stage', async (stage) => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array()))
    const { worker, request, core, events } = setup(false, 1)
    await worker.run(request, async () => {
      if (stage === 'runtime') throw new Error('WASM unavailable')
      return core
    })
    expect(events.at(-1)).toMatchObject({ type: 'error', stage })
  })

  test('rejects a duplicate source without initializing another core', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array()))
    const { worker, request, core, events } = setup()
    const factory = jest.fn(async () => core)
    await worker.run(request, factory)
    await worker.run(request, factory)
    expect(factory).toHaveBeenCalledTimes(1)
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'runtime', message: 'Worker already received a source' })
  })

  test('preserves input statistics when the core emits transcoding progress', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Uint8Array(), { headers: { 'Content-Length': '0' } }))
    const { worker, request, core, events } = setup()
    core.streamExec.mockImplementation(() => {
      const callback = core.setProgress.mock.calls[0]?.[0] as ((event: { progress: number; time: number }) => void) | undefined
      callback?.({ progress: 1, time: 1000000 })
      core.ret = 0
      return true
    })
    await worker.run(request, async () => core)
    expect(events.filter((event) => event.type === 'progress').at(-1)).toMatchObject({
      data: { progress: 1, time: 1000000, downloadedBytes: 0, totalBytes: 0, inputEnded: false }
    })
  })

  test('reports cancellation errors before publishing done', async () => {
    const cancel = jest.fn(() => { throw new Error('Cancel failed') })
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new ReadableStream({ cancel })))
    const { worker, request, core, events } = setup()
    core.streamExec.mockImplementation(() => { core.ret = 0; return true })
    await worker.run(request, async () => core)
    expect(events.at(-1)).toMatchObject({ type: 'error', stage: 'download', message: 'Cannot close HTTP input' })
    expect(events.some((event) => event.type === 'done')).toBe(false)
    expect(cancel).toHaveBeenCalledTimes(1)
  })

  test('rejects runtime modules without a core factory', async () => {
    await expect(loadCore({
      workerURL: '/worker.js', coreURL: 'invalid-ffmpeg-core', wasmURL: '/core.wasm'
    })).rejects.toThrow('must export a factory')
  })
})

describe('Asyncify runner failures', () => {
  test('rejects an unrecorded native command completion', async () => {
    const core = new MockCore()
    core.streamExec.mockImplementation(() => false)
    await expect(new AsyncifyRunner(core).execute([])).rejects.toThrow('exit code')
  })

  test('selects FFprobe defaults without changing the FFmpeg entry or arguments', async () => {
    const core = new MockCore()
    await new AsyncifyRunner(core).execute(['-of', 'json'], 'probe')
    expect(core.stringsToPtr).toHaveBeenCalledWith(['ffprobe', '-of', 'json'])
    expect(core.streamExec).not.toHaveBeenCalled()
    expect(core.DEFAULT_ARGS).toEqual(['ffmpeg', '-nostdin'])
  })
  test('rejects stock cores without streaming preparation', () => {
    const core = new MockCore()
    Object.assign(core, { asm: {} })
    expect(() => new AsyncifyRunner(core)).toThrow('prepared')
  })

  test('propagates traps instead of treating them as successful FFmpeg exit', async () => {
    const core = new MockCore()
    core.streamExec.mockImplementation(() => { throw new Error('unreachable') })
    await expect(new AsyncifyRunner(core).execute([])).rejects.toThrow('unreachable')
  })

  test('accepts the prepared core explicit exit result', async () => {
    const core = new MockCore()
    core.streamExec.mockImplementation(() => { core.ret = 0; return true })
    await expect(new AsyncifyRunner(core).execute([])).resolves.toBeUndefined()
  })

  test('never swallows a trap merely because its message resembles a normal abort', async () => {
    const core = new MockCore()
    core.streamExec.mockImplementation(() => { throw new WebAssembly.RuntimeError('Aborted(custom trap)') })
    await expect(new AsyncifyRunner(core).execute([])).rejects.toThrow('custom trap')
  })
})
