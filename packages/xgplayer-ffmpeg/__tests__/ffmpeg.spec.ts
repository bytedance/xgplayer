import EventEmitter from 'eventemitter3'
import type { FFmpegOptions, FFmpegOutputProfile } from '../src/types'

const mockStreams: Array<{
  run: jest.Mock
  destroy: jest.Mock
  push: (end: number) => Promise<void>
  metadata: (duration: number) => Promise<void>
  finish: () => void
  fail: (reason: Error) => void
}> = []
jest.mock('../src/transcoder/transcoder', () => ({
  Transcoder: jest.fn(() => {
    let resolve!: () => void
    let reject!: (reason: Error) => void
    const done = new Promise<void>((res, rej) => { resolve = res; reject = rej })
    const stream = {
      run: jest.fn(async (
        _source: string, _signal: AbortSignal,
        onChunk: (data: Uint8Array) => Promise<void>,
        _onProgress: unknown,
        onMetadata: (duration: number) => Promise<void>
      ) => {
        stream.push = (end) => onChunk(new Uint8Array([end]))
        stream.metadata = onMetadata
        await done
      }),
      destroy: jest.fn(() => resolve()),
      push: async (_end: number) => {},
      metadata: async (_duration: number) => {},
      finish: () => resolve(),
      fail: (reason: Error) => reject(reason)
    }
    mockStreams.push(stream)
    return stream
  })
}))

class MockMSE extends EventEmitter {
  ranges: number[][] = []
  streaming = true
  isEnded = false
  mediaSource = new EventTarget()
  bindMedia = jest.fn().mockResolvedValue(undefined)
  unbindMedia = jest.fn().mockResolvedValue(undefined)
  createSource = jest.fn()
  updateDuration = jest.fn().mockResolvedValue(undefined)
  append = jest.fn(async (_type: string, data: Uint8Array) => {
    this.ranges = [[this.ranges[0]?.[0] || 0, data[0]]]
  })
  remove = jest.fn(async (_type: string, _start: number, end: number) => {
    this.ranges = this.ranges.map(([a, b]) => [Math.max(a, end), b])
  })
  endOfStream = jest.fn(async () => { this.isEnded = true })
  bufferStart() { return this.ranges[0]?.[0] || 0 }
  bufferEnd() { return this.ranges[0]?.[1] || 0 }
  buffered() {
    return {
      length: this.ranges.length,
      start: (index: number) => this.ranges[index][0],
      end: (index: number) => this.ranges[index][1]
    }
  }
}
const mockBuffers: MockMSE[] = []
jest.mock('xgplayer-streaming-shared', () => ({
  MSE: Object.assign(jest.fn(() => {
    const mse = new MockMSE()
    mockBuffers.push(mse)
    return mse
  }), {
    AUDIO: 'audio', BUFFERED_CHANGE: 'bufferedchange',
    isSupported: jest.fn().mockReturnValue(true)
  })
}))

import { AUDIO_MIME, createAudioProfile } from '../src/profiles/audio'
import { FFmpeg } from '../src/core/ffmpeg'
import { FFmpegError } from '../src/types'

function options(overrides: Partial<FFmpegOptions> = {}): FFmpegOptions {
  return {
    media: document.createElement('audio'),
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' },
    bufferAhead: 4, bufferBehind: 2, ...overrides
  }
}

async function flush() {
  for (let i = 0; i < 30; i++) await Promise.resolve()
}

async function start(startTime = 0) {
  const core = new FFmpeg(options(), createAudioProfile())
  const loading = core.load('sample.wma', startTime)
  await flush()
  return { core, loading, stream: mockStreams[0], mse: mockBuffers[0] }
}

describe('FFmpeg streaming MSE lifecycle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockBuffers.length = 0
    mockStreams.length = 0
    Object.defineProperty(globalThis, 'crossOriginIsolated', { value: false, configurable: true })
    Object.defineProperty(globalThis, 'Worker', { value: jest.fn(), configurable: true })
  })
  afterEach(() => jest.useRealTimers())

  test('becomes playable before input EOF or transcoding completes', async () => {
    const { core, loading, stream, mse } = await start()
    const ready = jest.fn()
    core.on('ready', ready)
    await stream.push(2)
    await expect(loading).resolves.toBe(0)
    expect(mse.createSource).toHaveBeenCalledWith('audio', AUDIO_MIME)
    expect(ready).toHaveBeenCalledWith({ duration: Infinity, mimeType: AUDIO_MIME })
    expect(mse.endOfStream).not.toHaveBeenCalled()
    expect(stream.destroy).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('backpressure resumes on playback and evicts old MSE audio', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.push(2)
    await loading
    await stream.push(4)
    const blocked = stream.push(6)
    await flush()
    expect(mse.append).toHaveBeenCalledTimes(2)
    core.media.currentTime = 3
    core.media.dispatchEvent(new Event('timeupdate'))
    await blocked
    expect(mse.remove).toHaveBeenCalledWith('audio', 0, 1)
    expect(mse.bufferEnd()).toBe(6)
    await core.destroy()
  })

  test('sets probed duration through MSE and keeps it while paused input is blocked', async () => {
    const { core, loading, stream, mse } = await start()
    const ready = jest.fn()
    core.on('ready', ready)
    await stream.metadata(728.084)
    await stream.push(4)
    await loading
    const blocked = stream.push(6).catch((reason: Error) => reason)
    await flush()
    expect(ready).toHaveBeenCalledWith({ duration: 728.084, mimeType: AUDIO_MIME })
    expect(mse.updateDuration).toHaveBeenLastCalledWith(728.084)
    expect(mse.endOfStream).not.toHaveBeenCalled()
    await core.destroy()
    expect(await blocked).toMatchObject({ name: 'AbortError' })
  })

  test('reconciles probed duration with the final appended sample end', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.metadata(8)
    await stream.push(2)
    await loading
    stream.finish()
    await flush()
    expect(mse.updateDuration).toHaveBeenLastCalledWith(2)
    expect(mse.endOfStream).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('rejects a duration update that completes after source replacement', async () => {
    const { core, loading, stream, mse } = await start()
    const first = loading.catch((reason: Error) => reason)
    let release!: () => void
    mse.updateDuration.mockImplementationOnce(() =>
      new Promise<void>((resolve) => { release = resolve }))
    const metadata = stream.metadata(728.084).catch((reason: Error) => reason)
    const next = core.load('next.flac')
    await flush()
    release()
    expect(await metadata).toMatchObject({ name: 'AbortError' })
    expect(await first).toMatchObject({ name: 'AbortError' })
    await mockStreams[1].push(1)
    await next
    expect(mockBuffers[1].updateDuration).toHaveBeenLastCalledWith(Infinity)
    await core.destroy()
  })

  test('waits for MMS startstreaming after playback begins', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.push(1)
    await loading
    mse.streaming = false
    const blocked = stream.push(2)
    await flush()
    expect(mse.append).toHaveBeenCalledTimes(1)
    mse.streaming = true
    mse.mediaSource.dispatchEvent(new Event('startstreaming'))
    await blocked
    expect(mse.append).toHaveBeenCalledTimes(2)
    await core.destroy()
  })

  test('finishes only after the final output append and sets finite duration', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.push(2)
    await loading
    await stream.push(3)
    stream.finish()
    await flush()
    expect(mse.updateDuration).toHaveBeenLastCalledWith(3)
    expect(mse.endOfStream).toHaveBeenCalledTimes(1)
    expect(mse.endOfStream.mock.invocationCallOrder[0]).toBeGreaterThan(
      mse.append.mock.invocationCallOrder[1]
    )
    await core.destroy()
  })

  test('restores source-switch time by consuming up to that time', async () => {
    const { core, loading, stream, mse } = await start(8)
    await stream.push(4)
    expect(core.media.currentTime).toBe(0)
    await stream.push(9)
    await expect(loading).resolves.toBe(8)
    expect(core.media.currentTime).toBe(8)
    expect(mse.remove).toHaveBeenCalledWith('audio', 0, 2)
    await core.destroy()
  })

  test('clamps a startup time beyond EOF to the final samples', async () => {
    const { core, loading, stream } = await start(8)
    await stream.push(3)
    stream.finish()
    await expect(loading).resolves.toBeCloseTo(2.95)
    await core.destroy()
  })

  test('keeps buffered seeks on the current stream', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.push(3)
    await loading
    mse.ranges = [[1, 3]]
    core.media.currentTime = 2
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(core.media.currentTime).toBe(2)
    expect(mockStreams).toHaveLength(1)
    await core.destroy()
  })

  test('keeps a forward target and resumes transcoding instead of clamping to the buffer', async () => {
    const { core, loading, stream, mse } = await start()
    await stream.push(5)
    await loading
    const blocked = stream.push(6)
    await flush()
    expect(mse.append).toHaveBeenCalledTimes(1)
    core.media.currentTime = 30
    core.media.dispatchEvent(new Event('seeking'))
    await blocked
    await stream.push(31)
    expect(core.media.currentTime).toBe(30)
    expect(mse.bufferEnd()).toBe(31)
    expect(mockStreams).toHaveLength(1)
    await core.destroy()
  })

  test.each([true, false])('reloads evicted media while preserving paused=%s', async (paused) => {
    const { core, loading, stream, mse } = await start()
    Object.defineProperty(core.media, 'paused', { value: paused, configurable: true })
    const play = jest.spyOn(core.media, 'play').mockResolvedValue(undefined)
    await stream.push(5)
    await loading
    mse.ranges = [[3, 5]]
    core.media.currentTime = 1
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(stream.destroy).toHaveBeenCalledTimes(1)
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
    expect(mockStreams[1].run.mock.calls[0][0]).toBe('sample.wma')
    expect(play).not.toHaveBeenCalled()
    await mockStreams[1].push(2)
    await flush()
    expect(core.media.currentTime).toBe(1)
    expect(play).toHaveBeenCalledTimes(paused ? 0 : 1)
    await core.destroy()
  })

  test.each(['empty', 'ended'])('rebuilds %s buffers for a missing seek target', async (state) => {
    const { core, loading, stream, mse } = await start()
    await stream.push(3)
    await loading
    if (state === 'empty') mse.ranges = []
    else {
      stream.finish()
      await flush()
      mse.ranges = [[1, 3]]
    }
    core.media.currentTime = 0
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    expect(mockStreams).toHaveLength(2)
    await mockStreams[1].push(1)
    await flush()
    expect(core.media.currentTime).toBe(0)
    await core.destroy()
  })

  test.each(['replace', 'destroy'])('cancels seek restoration on %s without resuming stale playback', async (action) => {
    const { core, loading, stream, mse } = await start()
    const play = jest.spyOn(core.media, 'play').mockResolvedValue(undefined)
    Object.defineProperty(core.media, 'paused', { value: false, configurable: true })
    await stream.push(5)
    await loading
    mse.ranges = [[3, 5]]
    core.media.currentTime = 1
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    if (action === 'replace') {
      const next = core.load('other.flac')
      await flush()
      await mockStreams[2].push(2)
      await next
    } else await core.destroy()
    await expect(mockStreams[1].push(2)).rejects.toMatchObject({ name: 'AbortError' })
    await flush()
    expect(play).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('reports playback restoration failure after a seek', async () => {
    const { core, loading, stream, mse } = await start()
    Object.defineProperty(core.media, 'paused', { value: false, configurable: true })
    jest.spyOn(core.media, 'play').mockRejectedValue(new Error('Playback refused'))
    const errors = jest.fn()
    core.on('error', errors)
    await stream.push(5)
    await loading
    mse.ranges = [[3, 5]]
    core.media.currentTime = 1
    core.media.dispatchEvent(new Event('seeking'))
    await flush()
    await mockStreams[1].push(2)
    await flush()
    expect(errors).toHaveBeenCalledWith(expect.objectContaining({
      stage: 'buffer', reason: expect.objectContaining({ message: 'Playback refused' })
    }))
    expect(mockBuffers[1].unbindMedia).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test.each(['replace', 'destroy'])('cancels a pending startup on %s', async (action) => {
    const { core, loading, stream, mse } = await start()
    const result = loading.catch((error: Error) => error)
    if (action === 'replace') {
      const next = core.load('next.flac')
      await flush()
      await mockStreams[1].push(1)
      await next
    } else await core.destroy()
    expect(await result).toMatchObject({ name: 'AbortError' })
    expect(stream.destroy).toHaveBeenCalled()
    expect(mse.unbindMedia).toHaveBeenCalled()
    await core.destroy()
  })

  test('startup timeout is cleared when playback is possible', async () => {
    const { core, loading, stream } = await start()
    const error = jest.fn()
    core.on('error', error)
    await stream.push(1)
    await loading
    jest.advanceTimersByTime(120001)
    expect(error).not.toHaveBeenCalled()
    await core.destroy()
  })

  test('startup timeout stops the Worker and emits one error', async () => {
    const { core, loading, stream } = await start()
    const result = loading.catch((error: Error) => error)
    const error = jest.fn()
    core.on('error', error)
    jest.advanceTimersByTime(120001)
    expect(await result).toMatchObject({ message: 'Media startup timed out' })
    expect(error).toHaveBeenCalledTimes(1)
    expect(stream.destroy).toHaveBeenCalled()
    await core.destroy()
  })

  test('reports stream errors after ready and releases paused consumers', async () => {
    const { core, loading, stream, mse } = await start()
    const error = jest.fn()
    core.on('error', error)
    await stream.push(4)
    await loading
    const blocked = stream.push(6).catch((reason: Error) => reason)
    stream.fail(new FFmpegError('download', 'Network interrupted'))
    await flush()
    expect(await blocked).toMatchObject({ name: 'AbortError' })
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ stage: 'download' }))
    expect(mse.unbindMedia).toHaveBeenCalled()
    await core.destroy()
  })

  test('does not attach an intermediate source cancelled before its start', async () => {
    const { core, loading } = await start()
    const first = loading.catch((error: Error) => error)
    const second = core.load('second.flac').catch((error: Error) => error)
    const third = core.load('third.wma')
    await flush()
    await mockStreams[2].push(1)
    await third
    expect(await first).toMatchObject({ name: 'AbortError' })
    expect(await second).toMatchObject({ name: 'AbortError' })
    expect(mockBuffers[1].bindMedia).not.toHaveBeenCalled()
    expect(mockBuffers[0].unbindMedia).toHaveBeenCalledTimes(1)
    expect(mockBuffers[1].unbindMedia).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('repeated destroy calls wait for the same cleanup', async () => {
    const { core, loading, mse } = await start()
    const result = loading.catch((error: Error) => error)
    let release!: () => void
    mse.unbindMedia.mockImplementation(() => new Promise<void>((resolve) => { release = resolve }))
    const closing = core.destroy()
    expect(core.destroy()).toBe(closing)
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
    release()
    await closing
    expect(await result).toMatchObject({ name: 'AbortError' })
  })

  test('media decoder errors stop a stream even while its output awaits playback', async () => {
    const { core, loading, stream, mse } = await start()
    const error = jest.fn()
    core.on('error', error)
    await stream.push(4)
    await loading
    const blocked = stream.push(6).catch((reason: Error) => reason)
    Object.defineProperty(core.media, 'error', { value: { message: 'Decoder failed' }, configurable: true })
    core.media.dispatchEvent(new Event('error'))
    expect(await blocked).toMatchObject({ name: 'AbortError' })
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ stage: 'buffer', message: 'Decoder failed' }))
    expect(mse.unbindMedia).toHaveBeenCalledTimes(1)
    await core.destroy()
  })

  test('cleanup failures after a stream error are observed', async () => {
    const { core, loading, stream, mse } = await start()
    const result = loading.catch((error: Error) => error)
    const errors = jest.fn()
    core.on('error', errors)
    mse.unbindMedia.mockRejectedValueOnce(new Error('Detach failed'))
    stream.fail(new FFmpegError('download', 'Network interrupted'))
    await result
    await flush()
    expect(errors).toHaveBeenCalledWith(expect.objectContaining({
      stage: 'buffer', message: 'Cannot detach media buffer'
    }))
    await core.destroy()
  })

  test('accepts nonisolated environments without SharedArrayBuffer', async () => {
    const previous = globalThis.SharedArrayBuffer
    Object.defineProperty(globalThis, 'SharedArrayBuffer', { value: undefined, configurable: true })
    const { core, loading, stream } = await start()
    await stream.push(1)
    await loading
    expect(FFmpeg.isSupported(AUDIO_MIME)).toBe(true)
    await core.destroy()
    Object.defineProperty(globalThis, 'SharedArrayBuffer', { value: previous })
  })

  test('routes media creation and MSE operations through a video profile', async () => {
    const profile: FFmpegOutputProfile = {
      type: 'video', mimeType: 'video/mp4; codecs="avc1.42E01E"',
      inputArguments: [], outputArguments: ['-c:v', 'libx264']
    }
    const config = options()
    delete config.media
    const core = new FFmpeg(config, profile)
    const loading = core.load('https://example.com/video.avi')
    await flush()
    await mockStreams[0].push(1)
    await loading
    expect(core.media.tagName).toBe('VIDEO')
    expect(mockBuffers[0].createSource).toHaveBeenCalledWith('video', profile.mimeType)
    expect(mockBuffers[0].append).toHaveBeenCalledWith('video', expect.any(Uint8Array))
    await core.destroy()
  })

  test.each([
    { maxInputBytes: 0 }, { timeout: -1 }, { bufferBehind: -1 },
    { ffmpeg: { workerURL: '', coreURL: '', wasmURL: '' } }
  ])('validates options before owning media resources', (invalid) => {
    expect(() => new FFmpeg(options(invalid), createAudioProfile())).toThrow()
  })
})
