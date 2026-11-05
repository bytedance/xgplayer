/** @jest-environment node */
import { StreamingWorker } from '../src/worker/runtime'
import { loadCore, type CoreConfig, type FFmpegCore } from '../src/worker/core'
import type { WorkerCommand, WorkerEvent } from '../src/transcoder/protocol'

const mockRead = jest.fn().mockResolvedValue(new Uint8Array([1, 2]))
const mockClose = jest.fn()
const mockStats = { downloadedBytes: 131072, totalBytes: 1000000, cacheBytes: 131072, rangeRequests: 1 }
jest.mock('../src/io/http-source', () => ({
  HTTPSource: class {
    size = 1000000
    stats = mockStats
    open = jest.fn().mockResolvedValue(undefined)
    readAt = mockRead
    close = mockClose
  }
}))

function setup(codec = 'wmav2') {
  let callbacks!: CoreConfig
  let kind = 1
  const info = { codec, sampleRate: 44100, channels: 2, duration: 100 as number | null }
  const core: FFmpegCore = {
    HEAPU8: new Uint8Array([7, 8, 9, 10, 11, 12, 13, 14]),
    UTF8ToString: (pointer) => pointer === 90
      ? JSON.stringify(info) : 'native error',
    ccall: jest.fn((name: string) => {
      switch (name) {
        case 'xp_create': return 1
        case 'xp_metadata': return 90
        case 'xp_error': return 91
        case 'xp_rate': return 44100
        case 'xp_channels': return 2
        case 'xp_pull': return kind
        case 'xp_length': return 3
        case 'xp_data': return 2
        case 'xp_start': return 80
        case 'xp_end': return 81
        case 'xp_bias': return 0.025
        case 'xp_close':
        case 'xp_release': return undefined
        default: return 0
      }
    })
  }
  const factory = jest.fn(async (config: CoreConfig) => { callbacks = config; return core })
  const post = jest.fn<void, [WorkerEvent, Transferable[]?]>()
  const worker = new StreamingWorker(post, factory)
  const request: Extract<WorkerCommand, { type: 'open' }> = {
    type: 'open', id: 1, epoch: 1, source: 'https://example.com/a.wma',
    ffmpeg: { workerURL: '/worker.js', coreURL: 'https://example.com/core.js', wasmURL: '/core.wasm' },
    audio: { outputCodec: 'auto' }, segmentDuration: 1,
    aacSupported: true, flacSupported: true
  }
  return { worker, core, factory, post, request, info, callbacks: () => callbacks,
    setKind: (value: number) => { kind = value } }
}

describe('native Worker pipeline', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockStats.downloadedBytes = 131072
    mockRead.mockResolvedValue(new Uint8Array([1, 2]))
  })

  test('loads one module and reports actual output parameters across source changes', async () => {
    const { worker, factory, post, request, core } = setup()
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'opened', metadata: expect.objectContaining({ duration: 100, sampleRate: 44100, channels: 2, codec: 'aac' })
    }))
    await worker.receive({ ...request, id: 2, epoch: 2 })
    expect(factory).toHaveBeenCalledTimes(1)
    expect(core.ccall).toHaveBeenCalledWith('xp_close', null, ['number'], [1])
    expect(mockClose).toHaveBeenCalled()
  })

  test.each([true, false])('FLAC copies only when MSE supports it: %s', async (supported) => {
    const { worker, request, core } = setup('flac')
    request.flacSupported = supported
    await worker.receive(request)
    expect(core.ccall).toHaveBeenCalledWith('xp_configure', 'number',
      ['number', 'number', 'number', 'number', 'number', 'number'], [1, supported ? 1 : 0, 0, 0, 0, 1])
  })

  test('an explicit rate change encodes instead of silently copying FLAC', async () => {
    const { worker, request, core } = setup('flac')
    request.audio = { sampleRate: 16000 }
    await worker.receive(request)
    expect(core.ccall).toHaveBeenCalledWith('xp_configure', 'number',
      ['number', 'number', 'number', 'number', 'number', 'number'], [1, 0, 16000, 0, 0, 1])
  })

  test('returns one owned heap copy with the exact source-to-MP4 offset', async () => {
    const { worker, request, core, post, setKind } = setup()
    await worker.receive(request)
    setKind(2)
    await worker.receive({ type: 'pull', id: 2, epoch: 1 })
    const event = post.mock.calls.at(-1)?.[0]
    expect(event).toMatchObject({
      type: 'output', output: { kind: 'media', start: 80, end: 81,
        timestampOffset: -0.025, data: new Uint8Array([9, 10, 11]) }
    })
    if (event?.type !== 'output' || !('data' in event.output)) throw new Error('Missing segment')
    expect(post.mock.calls.at(-1)?.[1]).toEqual([event.output.data.buffer])
    expect(core.ccall).toHaveBeenCalledWith('xp_release', null, ['number'], [1])
    core.HEAPU8.fill(0)
    expect(event.output.data).toEqual(new Uint8Array([9, 10, 11]))
  })

  test('does no native processing or IO between explicit pull commands', async () => {
    const { worker, request, core, setKind, post } = setup()
    await worker.receive(request)
    expect(core.ccall).not.toHaveBeenCalledWith('xp_pull', expect.anything(), expect.anything(), expect.anything(), expect.anything())
    setKind(0)
    await worker.receive({ type: 'pull', id: 2, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ output: { kind: 'yield' } }), undefined)
    setKind(3)
    await worker.receive({ type: 'pull', id: 3, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      output: { kind: 'eof' }, progress: expect.objectContaining({ inputEnded: true })
    }), undefined)
  })

  test('cancel aborts JS reads immediately while the newer seek waits for WASM to return', async () => {
    const { worker, request, core, callbacks, post } = setup()
    await worker.receive(request)
    let readSignal!: AbortSignal
    let release!: () => void
    const blocked = new Promise<number>((resolve) => { release = () => resolve(-1414092869) })
    mockRead.mockImplementation((_offset, _length, signal: AbortSignal) => {
      readSignal = signal
      return new Promise((_resolve, reject) => signal.addEventListener('abort',
        () => reject(new DOMException('cancel', 'AbortError')), { once: true }))
    })
    const original = core.ccall
    core.ccall = jest.fn((name, result, types, values, options) => {
      if (name !== 'xp_pull') return original(name, result, types, values, options)
      return callbacks().readSource(131072, 0, 2).then(async (code) => {
        expect(code).toBe(-1414092869)
        return blocked
      })
    })
    const pulling = worker.receive({ type: 'pull', id: 2, epoch: 1 })
    for (let i = 0; i < 10; i++) await Promise.resolve()
    const seeking = worker.receive({ type: 'seek', id: 3, epoch: 2, time: 80 })
    expect(readSignal.aborted).toBe(true)
    expect(core.ccall).not.toHaveBeenCalledWith('xp_seek', expect.anything(), expect.anything(), expect.anything(), expect.anything())
    release()
    await pulling
    await seeking
    expect(post).toHaveBeenLastCalledWith({ type: 'complete', id: 3, epoch: 2 })
    expect(core.ccall).toHaveBeenCalledWith('xp_seek', 'number', ['number', 'number'], [1, 80], { async: true })
  })

  test('network errors remain errors at the native read boundary', async () => {
    const { worker, request, callbacks } = setup()
    await worker.receive(request)
    mockRead.mockRejectedValueOnce(new Error('connection lost'))
    expect(await callbacks().readSource(131072, 0, 2)).toBe(-5)
    expect(callbacks().isInterrupted()).toBe(true)
  })

  test('explicit FLAC on incompatible input fails and frees native resources', async () => {
    const { worker, request, post } = setup()
    request.audio = { outputCodec: 'flac' }
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'error', stage: 'transcode' }))
    expect(mockClose).toHaveBeenCalled()
  })

  test('queued stale commands never enter native code', async () => {
    const { worker, request, core } = setup()
    await worker.receive(request)
    const old = worker.receive({ type: 'seek', id: 2, epoch: 2, time: 20 })
    const next = worker.receive({ type: 'seek', id: 3, epoch: 3, time: 80 })
    await old
    await next
    expect(core.ccall).not.toHaveBeenCalledWith('xp_seek', 'number', ['number', 'number'], [1, 20], { async: true })
    expect(core.ccall).toHaveBeenCalledWith('xp_seek', 'number', ['number', 'number'], [1, 80], { async: true })
  })

  test('the core loader resolves only WASM through its supplied resource URL', async () => {
    const { core } = setup()
    const factory = jest.fn(async (_config: CoreConfig) => core)
    await loadCore({ workerURL: '/worker.js', coreURL: 'https://example.com/core.js', wasmURL: '/audio.wasm' }, {
      readSource: async () => 0, isInterrupted: () => false
    }, factory)
    const config = factory.mock.calls[0][0]
    expect(config.locateFile('ffmpeg-core.wasm')).toBe('/audio.wasm')
    expect(config.locateFile('other.js')).toBe('https://example.com/other.js')
  })

  test.each(['codec', 'rate', 'duration'])('invalid native %s metadata cannot configure output', async (mode) => {
    const { worker, request, post, info, core } = setup()
    if (mode === 'codec') info.codec = ''
    else if (mode === 'rate') info.sampleRate = 0
    else info.duration = -1
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'error', message: 'Invalid native audio metadata'
    }))
    expect(core.ccall).not.toHaveBeenCalledWith('xp_configure', expect.anything(), expect.anything(), expect.anything())
    expect(mockClose).toHaveBeenCalled()
  })

  test('unknown native duration stays unknown and AAC capability is required for encoding', async () => {
    const { worker, request, post, info } = setup()
    info.duration = null
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'opened', metadata: expect.objectContaining({ duration: Infinity })
    }))
    await worker.receive({ ...request, id: 2, epoch: 2, aacSupported: false })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'error', message: 'AAC MSE is not supported'
    }))
  })

  test.each([
    ['xp_create', 0, 'Cannot allocate native pipeline'],
    ['xp_configure', -5, 'native error'],
    ['xp_length', 0, 'Invalid native output buffer'],
    ['xp_length', 9 * 1024 * 1024, 'Invalid native output buffer'],
    ['xp_data', -1, 'Invalid native output buffer'],
    ['xp_data', 7, 'Invalid native output buffer'],
    ['xp_start', NaN, 'Invalid native media timeline'],
    ['xp_end', 80, 'Invalid native media timeline']
  ] as const)('native %s=%p fails explicitly: %s', async (name, value, message) => {
    const { worker, request, post, core, setKind } = setup()
    const original = core.ccall
    core.ccall = jest.fn((entry, result, types, values, options) =>
      entry === name ? value : original(entry, result, types, values, options))
    await worker.receive(request)
    if (!['xp_create', 'xp_configure'].includes(name)) {
      setKind(2)
      await worker.receive({ type: 'pull', id: 2, epoch: 1 })
    }
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'error', message }))
  })

  test('unknown output kinds and processing without an open source remain errors', async () => {
    const { worker, request, post, setKind } = setup()
    await worker.receive({ type: 'pull', id: 1, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ message: 'Native pipeline is not open' }))
    await worker.receive(request)
    setKind(4)
    await worker.receive({ type: 'pull', id: 2, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({ message: 'Unknown native output kind' }))
    await worker.receive({ type: 'close', id: 3, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith({ type: 'complete', id: 3, epoch: 1 })
  })

  test('input and processing budgets cannot turn excessive native reads into EOF', async () => {
    const { worker, request, post, callbacks, setKind } = setup()
    await worker.receive(request)
    mockStats.downloadedBytes = 5 * 1024 * 1024
    expect(await callbacks().readSource(0, 0, 2)).toBe(-5)
    expect(callbacks().isInterrupted()).toBe(true)
    mockStats.downloadedBytes = 131072
    setKind(0)
    for (let id = 2; id <= 1026; id++)
      await worker.receive({ type: 'pull', id, epoch: 1 })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'error', message: 'Native processing produced no media within its batch budget'
    }))
  })

  test('native deadline and missing sources stop reads before writing the heap', async () => {
    const { worker, request, callbacks } = setup()
    const now = jest.spyOn(performance, 'now').mockReturnValue(0)
    try {
      await worker.receive(request)
      now.mockReturnValue(30001)
      expect(callbacks().isInterrupted()).toBe(true)
      expect(await callbacks().readSource(0, 0, 2)).toBe(-5)
      await worker.receive({ type: 'seek', id: 2, epoch: 1, time: 10 })
      await worker.receive({ type: 'close', id: 3, epoch: 1 })
      expect(await callbacks().readSource(0, 0, 2)).toBe(-5)
      expect(mockRead).not.toHaveBeenCalled()
    } finally { now.mockRestore() }
  })

  test('a failed core load rejects open without retaining source resources', async () => {
    const { worker, factory, post, request } = setup()
    factory.mockRejectedValueOnce(new Error('WASM compile failed'))
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'error', stage: 'runtime', message: 'WASM compile failed'
    }))
  })

  test.each(['sync', 'async'])('an invalid %s ABI result cannot open the source', async (mode) => {
    const { worker, request, core, post } = setup()
    const original = core.ccall
    core.ccall = jest.fn((name, result, types, values, options) => {
      if (mode === 'sync' && name === 'xp_create') return Promise.resolve(1)
      if (mode === 'async' && name === 'xp_open') return undefined
      return original(name, result, types, values, options)
    })
    await worker.receive(request)
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'error', stage: 'runtime',
      message: mode === 'sync' ? 'Unexpected async native entry' : 'Invalid native operation result'
    }))
    expect(mockClose).toHaveBeenCalled()
  })

  test('raw input parameters cross the ABI without changing the selected output policy', async () => {
    const { worker, request, core, post } = setup('pcm_s16le')
    request.audio = { inputFormat: 's16le', inputSampleRate: 16000, inputChannels: 1 }
    await worker.receive(request)
    expect(core.ccall).toHaveBeenCalledWith('xp_create', 'number',
      ['number', 'string', 'number', 'number'], [1000000, 's16le', 16000, 1])
    expect(core.ccall).toHaveBeenCalledWith('xp_open', 'number', ['number'], [1], { async: true })
    expect(post).toHaveBeenLastCalledWith(expect.objectContaining({
      type: 'opened', metadata: expect.objectContaining({ codec: 'aac' })
    }))
  })

  test('a cached read yields to cancellation before copying bytes into WASM', async () => {
    const { worker, request, callbacks, core } = setup()
    await worker.receive(request)
    const before = core.HEAPU8.slice()
    const reading = callbacks().readSource(0, 0, 2)
    await Promise.resolve()
    await worker.receive({ type: 'cancel', epoch: 2 })
    expect(await reading).toBe(-1414092869)
    expect(core.HEAPU8).toEqual(before)
  })
})
