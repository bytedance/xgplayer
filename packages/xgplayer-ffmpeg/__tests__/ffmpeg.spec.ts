import EventEmitter from 'eventemitter3'
import type { PipelineOutput } from '../src/transcoder/protocol'
import type { FFmpegOptions } from '../src/types'

interface Pull {
  resolve(value: { output: PipelineOutput; progress: object }): void
  reject(error: Error): void
}
const mockStreams: MockTranscoder[] = []
class MockTranscoder {
  pending: Pull[] = []
  open = jest.fn().mockResolvedValue({
    duration: 100, mimeType: 'audio/mp4', codec: 'aac', sampleRate: 44100, channels: 2
  })
  seek = jest.fn().mockResolvedValue(undefined)
  close = jest.fn().mockResolvedValue(undefined)
  cancel = jest.fn(() => {
    for (const pull of this.pending) pull.reject(new DOMException('cancelled', 'AbortError'))
    this.pending = []
  })
  destroy = jest.fn(() => this.cancel())
  pull = jest.fn((signal: AbortSignal) => new Promise((resolve, reject) => {
    const pending = { resolve, reject }
    this.pending.push(pending)
    signal.addEventListener('abort', () => {
      this.pending = this.pending.filter((item) => item !== pending)
      reject(new DOMException('cancelled', 'AbortError'))
    }, { once: true })
  }))
  push(output: PipelineOutput): void {
    const pull = this.pending.shift()
    if (!pull) throw new Error('Production is blocked')
    pull.resolve({ output, progress: { progress: 0.1, time: 1, downloadedBytes: 131072, inputEnded: false } })
  }
}
jest.mock('../src/transcoder/transcoder', () => ({
  Transcoder: jest.fn(() => {
    const stream = new MockTranscoder()
    mockStreams.push(stream)
    return stream
  })
}))

class MockSourceBuffer extends EventTarget {
  timestampOffset = 0
  appendWindowStart = 0
  appendWindowEnd = Infinity
  updating = false
  hold = false
  abort = jest.fn()
  appendBuffer = jest.fn((data: Uint8Array) => {
    this.updating = true
    if (data.length === 16) {
      const [start, end] = new Float64Array(data.buffer)
      const ranges = [...this.owner.ranges, [start, end]].sort((a, b) => a[0] - b[0])
      this.owner.ranges = ranges.reduce<number[][]>((result, range) => {
        const previous = result.at(-1)
        if (previous && previous[1] >= range[0]) previous[1] = Math.max(previous[1], range[1])
        else result.push(range)
        return result
      }, [])
    }
    if (!this.hold) queueMicrotask(() => this.complete())
  })
  constructor(private readonly owner: MockMSE) { super() }
  complete(): void { this.updating = false; this.dispatchEvent(new Event('updateend')) }
}
class MockMSE extends EventEmitter {
  ranges: number[][] = []
  streaming = true
  mediaSource = Object.assign(new EventTarget(), { duration: Infinity, readyState: 'open' })
  sb = new MockSourceBuffer(this)
  bindMedia = jest.fn().mockResolvedValue(undefined)
  unbindMedia = jest.fn().mockResolvedValue(undefined)
  createSource = jest.fn()
  updateDuration = jest.fn(async (duration: number) => { this.mediaSource.duration = duration })
  remove = jest.fn(async (_type: string, start: number, end: number) => {
    this.ranges = this.ranges.flatMap(([a, b]) => [
      ...(a < start ? [[a, Math.min(b, start)]] : []),
      ...(b > end ? [[Math.max(a, end), b]] : [])
    ])
  })
  endOfStream = jest.fn(async () => { this.mediaSource.readyState = 'ended' })
  get duration() { return this.mediaSource.duration }
  getSourceBuffer() { return this.sb }
  buffered() {
    return { length: this.ranges.length,
      start: (index: number) => this.ranges[index][0],
      end: (index: number) => this.ranges[index][1] }
  }
}
const mockBuffers: MockMSE[] = []
jest.mock('xgplayer-streaming-shared', () => ({
  MSE: Object.assign(jest.fn(() => {
    const mse = new MockMSE()
    mockBuffers.push(mse)
    return mse
  }), { BUFFERED_CHANGE: 'bufferedchange', isSupported: jest.fn().mockReturnValue(true) })
}))

import { FFmpeg } from '../src/core/ffmpeg'
import { FLAC_MIME, createAudioProfile } from '../src/profiles/audio'
import { FFmpegError } from '../src/types'

function options(extra: Partial<FFmpegOptions> = {}): FFmpegOptions {
  return { media: document.createElement('audio'),
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' },
    bufferAhead: 4, bufferLow: 2, bufferBehind: 2, ...extra }
}
async function flush() { for (let i = 0; i < 50; i++) await Promise.resolve() }
function segment(start: number, end: number): PipelineOutput {
  return { kind: 'media', start, end, timestampOffset: 0,
    data: new Uint8Array(new Float64Array([start, end]).buffer) }
}
async function start(time = 0, duration = 100) {
  const core = new FFmpeg(options(), createAudioProfile())
  mockStreams[0].open.mockResolvedValue({
    duration, mimeType: 'audio/mp4', codec: 'aac', sampleRate: 44100, channels: 2
  })
  const loading = core.load('https://example.com/a.wma', time)
  await flush()
  const stream = mockStreams[0]
  stream.push({ kind: 'init', data: new Uint8Array([0]), timestampOffset: -0.025 })
  await flush()
  return { core, loading, stream, mse: mockBuffers[0] }
}
async function ready() {
  const result = await start()
  result.stream.push(segment(0, 1))
  await result.loading
  await flush()
  return result
}

describe('MSE demand and source lifecycle', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['queueMicrotask'] })
    mockStreams.length = mockBuffers.length = 0
    Object.defineProperty(globalThis, 'Worker', { value: jest.fn(), configurable: true })
  })
  afterEach(() => jest.useRealTimers())

  test('startup uses the real first playable boundary and exact negative offset', async () => {
    const { core, loading, stream, mse } = await start()
    const event = jest.fn()
    core.on('ready', event)
    expect(mse.sb.timestampOffset).toBe(-0.025)
    stream.push(segment(0.0687755, 1.09))
    await expect(loading).resolves.toBe(0.0687755)
    expect(core.media.currentTime).toBe(0.0687755)
    expect(event).toHaveBeenCalledWith(expect.objectContaining({ duration: 100, sampleRate: 44100 }))
    expect(mse.endOfStream).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('seeking to zero uses the delayed first sample and stops at the normal high water mark', async () => {
    const { core, loading, stream } = await start()
    stream.push(segment(0.0687755, 1.09))
    await loading
    await flush()
    core.media.currentTime = 0
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.seek).toHaveBeenLastCalledWith(0, expect.any(AbortSignal))
    stream.push(segment(0.0687755, 1.09))
    await flush()
    expect(core.media.currentTime).toBe(0.0687755)
    stream.push(segment(1.09, 4.2))
    await flush()
    expect(stream.pending).toHaveLength(0)
    await core.destroy()
  })

  test('high/low water marks stop pull commands and resume only after playback advances', async () => {
    const { core, stream, mse } = await ready()
    stream.push(segment(1, 4))
    await flush()
    const pulls = stream.pull.mock.calls.length
    expect(stream.pending).toHaveLength(0)
    core.media.currentTime = 1
    core.media.dispatchEvent(new Event('timeupdate'))
    await flush()
    expect(stream.pull).toHaveBeenCalledTimes(pulls)
    core.media.currentTime = 3
    core.media.dispatchEvent(new Event('timeupdate'))
    await flush()
    expect(stream.pending).toHaveLength(1)
    expect(mse.remove).toHaveBeenCalledWith('audio', 0, 1)
    await core.destroy()
  })

  test('unbuffered forward and backward seeks reuse Worker and MSE', async () => {
    const { core, stream, mse } = await ready()
    for (const target of [80, 10]) {
      core.media.currentTime = target
      core.media.dispatchEvent(new Event('seeking'))
      await flush()
      expect(stream.seek).toHaveBeenLastCalledWith(target, expect.any(AbortSignal))
      stream.push({ kind: 'init', data: new Uint8Array([0]), timestampOffset: 0 })
      await flush()
      stream.push(segment(target - 0.3, target + 1))
      await flush()
    }
    expect(mockStreams).toHaveLength(1)
    expect(mse.bindMedia).toHaveBeenCalledTimes(1)
    expect(mse.unbindMedia).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('a buffered seek continues without a native seek or playback call', async () => {
    const { core, stream } = await ready()
    const play = jest.spyOn(core.media, 'play').mockResolvedValue(undefined)
    stream.push(segment(1, 4))
    await flush()
    core.media.currentTime = 2
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.seek).not.toHaveBeenCalled()
    expect(play).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('source-switch startup seeks directly to the requested time', async () => {
    const { core, loading, stream } = await start(80)
    expect(stream.seek).toHaveBeenCalledWith(80, expect.any(AbortSignal))
    stream.push(segment(79.7, 81))
    await expect(loading).resolves.toBe(80)
    await core.destroy()
  })

  test('MMS stops pulling at endstreaming and resumes on startstreaming', async () => {
    const { core, stream, mse } = await ready()
    mse.streaming = false
    stream.push(segment(1, 2))
    await flush()
    const calls = stream.pull.mock.calls.length
    expect(stream.pending).toHaveLength(0)
    mse.streaming = true
    mse.mediaSource.dispatchEvent(new Event('startstreaming'))
    await flush()
    expect(stream.pull).toHaveBeenCalledTimes(calls + 1)
    await core.destroy()
  })

  test.each(['empty', 'hole'])('MMS %s eviction recovers from the missing current range', async (mode) => {
    const { core, stream, mse } = await ready()
    stream.push(segment(1, 4))
    await flush()
    mse.ranges = mode === 'empty' ? [] : [[0, 0.5], [2, 4]]
    mse.emit('bufferedchange')
    await flush()
    expect(stream.seek).toHaveBeenCalledWith(0, expect.any(AbortSignal))
    expect(mse.unbindMedia).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('an unbuffered MMS seek prepares one playable window while streaming is disabled', async () => {
    const { core, stream, mse } = await ready()
    mse.streaming = false
    core.media.currentTime = 80
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.seek).toHaveBeenCalledWith(80, expect.any(AbortSignal))
    stream.push({ kind: 'init', data: new Uint8Array([0]), timestampOffset: 0 })
    await flush()
    stream.push(segment(79.7, 81))
    await flush()
    expect(stream.pending).toHaveLength(0)
    expect(mse.ranges).toContainEqual([79.7, 81])
    await core.destroy()
  })

  test('EOS follows the final append and preserves the declared source duration', async () => {
    const { core, stream, mse } = await ready()
    stream.push(segment(1, 2))
    await flush()
    stream.push({ kind: 'eof' })
    await flush()
    expect(mse.endOfStream).toHaveBeenCalledTimes(1)
    expect(mse.updateDuration).toHaveBeenLastCalledWith(100)
    expect(mse.endOfStream.mock.invocationCallOrder[0]).toBeGreaterThan(mse.sb.appendBuffer.mock.invocationCallOrder.at(-1)!)
    await core.destroy()
  })

  test('a missing seek target after EOS reopens production on the same MediaSource', async () => {
    const { core, stream, mse } = await ready()
    stream.push({ kind: 'eof' })
    await flush()
    core.media.currentTime = 80
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.seek).toHaveBeenCalledWith(80, expect.any(AbortSignal))
    expect(stream.pending).toHaveLength(1)
    expect(mockBuffers).toHaveLength(1)
    await core.destroy()
  })

  test('a new init after EOS restores the declared duration instead of encoder padding', async () => {
    const { core, stream, mse } = await ready()
    stream.push({ kind: 'eof' })
    await flush()
    core.media.currentTime = 80
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    mse.sb.appendBuffer.mockImplementationOnce(() => {
      mse.mediaSource.duration = 100.02
      queueMicrotask(() => mse.sb.complete())
    })
    stream.push({ kind: 'init', data: new Uint8Array([0]), timestampOffset: 0 })
    await flush()
    expect(mse.mediaSource.duration).toBe(100)
    expect(mse.updateDuration).toHaveBeenLastCalledWith(100)
    await core.destroy()
  })

  test('an old append must settle before a newer seek changes SourceBuffer attributes', async () => {
    const { core, stream, mse } = await ready()
    mse.sb.hold = true
    stream.push(segment(1, 2))
    await flush()
    core.media.currentTime = 80
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.seek).not.toHaveBeenCalled()
    mse.sb.hold = false
    mse.sb.complete()
    await flush()
    expect(stream.seek).toHaveBeenCalledWith(80, expect.any(AbortSignal))
    await core.destroy()
  })

  test('quota reclaims real obsolete ranges and retries the owned segment once', async () => {
    const { core, stream, mse } = await ready()
    core.media.currentTime = 10
    mse.ranges = [[0, 1], [10, 11]]
    mse.sb.appendBuffer.mockImplementationOnce(() => { throw new DOMException('full', 'QuotaExceededError') })
    stream.push(segment(11, 12))
    await flush()
    expect(mse.remove).toHaveBeenCalledWith('audio', 0, 1)
    expect(mse.ranges).toEqual([[10, 12]])
    await core.destroy()
  })

  test('replacement cancels startup while retaining the shared Worker owner', async () => {
    const { core, loading, mse } = await start()
    const old = loading.catch((error: Error) => error)
    const next = core.load('https://example.com/b.flac')
    await flush()
    expect(await old).toMatchObject({ name: 'AbortError' })
    expect(mockStreams).toHaveLength(1)
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
    mockStreams[0].push(segment(0, 1))
    await next
    expect(mockStreams[0].open).toHaveBeenCalledTimes(2)
    await core.destroy()
  })

  test('destroy cancels a held append and waits for the same disposal', async () => {
    const { core, stream, mse } = await ready()
    mse.sb.hold = true
    stream.push(segment(1, 2))
    await flush()
    const closing = core.destroy()
    expect(core.destroy()).toBe(closing)
    await closing
    expect(stream.destroy).toHaveBeenCalledTimes(1)
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
  })

  test('startup timeout emits one error and stops pending work', async () => {
    const { core, loading } = await start()
    const failed = loading.catch((error: Error) => error)
    const errors = jest.fn()
    core.on('error', errors)
    jest.advanceTimersByTime(120001)
    expect(await failed).toMatchObject({ message: 'Media startup timed out' })
    await flush()
    expect(errors).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('media decoder errors after ready dispose the session and close the native source', async () => {
    const { core, stream, mse } = await ready()
    const errors = jest.fn()
    core.on('error', errors)
    Object.defineProperty(core.media, 'error', { value: { message: 'decode failed' }, configurable: true })
    core.media.dispatchEvent(new Event('error'))
    await flush()
    expect(errors).toHaveBeenCalledWith(expect.objectContaining({ stage: 'buffer', message: 'decode failed' }))
    expect(stream.close).toHaveBeenCalled()
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('an input without declared duration receives its final duration only at EOF', async () => {
    const { core, loading, stream, mse } = await start(0, Infinity)
    stream.push({ kind: 'yield' })
    await flush()
    stream.push(segment(0, 1))
    await loading
    await flush()
    stream.push({ kind: 'eof' })
    await flush()
    expect(mse.updateDuration).toHaveBeenLastCalledWith(1)
    expect(mse.endOfStream).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('an empty successful input is an error instead of a playable EOS', async () => {
    const { core, loading, stream, mse } = await start()
    const failed = loading.catch((error: Error) => error)
    stream.push({ kind: 'eof' })
    expect(await failed).toMatchObject({ message: 'FFmpeg produced no playable audio', stage: 'transcode' })
    expect(mse.endOfStream).not.toHaveBeenCalled()
    await core.destroy()
  })

  test.each(['quota', 'source'])('unrecoverable %s append errors close the session', async (mode) => {
    const { core, loading, stream, mse } = await start()
    const failed = loading.catch((error: Error) => error)
    if (mode === 'quota')
      mse.sb.appendBuffer.mockImplementationOnce(() => { throw { originError: new DOMException('full', 'QuotaExceededError') } })
    else mse.sb.appendBuffer.mockImplementationOnce(() => queueMicrotask(() => mse.sb.dispatchEvent(new Event('error'))))
    stream.push(segment(0, 1))
    expect(await failed).toMatchObject({ stage: 'buffer' })
    await flush()
    expect(mse.unbindMedia).toHaveBeenCalled()
    expect(mse.remove).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('quota reclaims a future disjoint range outside the protected playback window', async () => {
    const { core, stream, mse } = await ready()
    mse.ranges = [[0, 1], [50, 60]]
    mse.sb.appendBuffer.mockImplementationOnce(() => { throw new DOMException('full', 'QuotaExceededError') })
    stream.push(segment(1, 2))
    await flush()
    expect(mse.remove).toHaveBeenCalledWith('audio', 50, 60)
    expect(mse.ranges).toEqual([[0, 2]])
    await core.destroy()
  })

  test('opening after destroy is rejected and an empty core closes safely', async () => {
    const core = new FFmpeg(options(), createAudioProfile())
    await core.destroy()
    await expect(core.load('https://example.com/a.wma')).rejects.toThrow('destroyed')
    expect(mockBuffers).toHaveLength(0)
  })

  test('a failed media bind preserves its cause and frees the native session', async () => {
    const core = new FFmpeg(options(), createAudioProfile())
    const cause = new Error('sourceopen failed')
    // Each session owns its own mock instance; set the failure before open resolves.
    const loading = core.load('https://example.com/a.wma')
    mockBuffers[0].bindMedia.mockRejectedValueOnce(cause)
    await expect(loading).rejects.toMatchObject({ stage: 'buffer', reason: cause })
    await core.destroy()
  })

  test.each(['auto', 'aac'] as const)('unsupported %s MSE fails before native open', async (outputCodec) => {
    const support = jest.requireMock('xgplayer-streaming-shared').MSE.isSupported as jest.Mock
    support.mockReturnValue(false)
    const core = new FFmpeg(options(), createAudioProfile({ outputCodec }))
    try {
      await expect(core.load('https://example.com/a.wma')).rejects.toMatchObject({ stage: 'runtime' })
      expect(mockStreams[0].open).not.toHaveBeenCalled()
    } finally {
      support.mockReturnValue(true)
      await core.destroy()
    }
  })

  test('auto output can start when only FLAC MSE is supported', async () => {
    const support = jest.requireMock('xgplayer-streaming-shared').MSE.isSupported as jest.Mock
    support.mockImplementation((mime: string) => mime === FLAC_MIME)
    const core = new FFmpeg(options(), createAudioProfile())
    mockStreams[0].open.mockResolvedValue({
      duration: 3, mimeType: FLAC_MIME, codec: 'flac', sampleRate: 16000, channels: 1
    })
    try {
      const loading = core.load('https://example.com/a.flac')
      await flush()
      mockStreams[0].push(segment(0, 1))
      await expect(loading).resolves.toBe(0)
      expect(mockBuffers[0].createSource).toHaveBeenCalledWith('audio', FLAC_MIME)
    } finally {
      support.mockReturnValue(true)
      await core.destroy()
    }
  })

  test('terminal failures report resource cleanup errors while the core is still alive', async () => {
    const { core, loading, stream, mse } = await start()
    const errors = jest.fn()
    core.on('error', errors)
    const detach = new Error('detach failed')
    const close = new Error('close failed')
    mse.unbindMedia.mockRejectedValueOnce(detach)
    stream.close.mockRejectedValueOnce(close)
    const failed = loading.catch((error: Error) => error)
    stream.pending[0].reject(new FFmpegError('transcode', 'native failed'))
    await failed
    await flush()
    expect(errors).toHaveBeenCalledTimes(3)
    expect(errors.mock.calls[0][0].message).toBe('native failed')
    expect(errors.mock.calls.slice(1).map(([error]) => error.reason))
      .toEqual(expect.arrayContaining([detach, close]))
    await core.destroy()
  })

  test.each([{ bufferLow: 4 }, { bufferAhead: 0 }, { bufferBehind: -1 }, { cacheBytes: 0 },
    { maxInputBytes: Infinity }, { timeout: -1 }, { segmentDuration: NaN },
    { ffmpeg: { workerURL: '', coreURL: '', wasmURL: '' } }
  ])(
    'validates demand budgets before creating resources: %p', (extra) => {
      expect(() => new FFmpeg(options(extra), createAudioProfile())).toThrow()
    }
  )
})
