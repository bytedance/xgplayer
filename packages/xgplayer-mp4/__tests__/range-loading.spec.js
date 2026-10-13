import MP4 from '../src/mp4'
import { MP4Demuxer, MP4Parser } from 'xgplayer-transmuxer'
import { moovToMeta, moovToSegments, sidxToSegments } from 'xgplayer-mp4-loader/src/utils'
import { createRangeMedia, createSidxMedia, joinBytes } from './fixtures/range-media'

jest.mock('../src/worker', () => jest.fn(() => {
  throw new Error('Worker execution is outside the range-loading tests')
}))

const URL = 'https://range-fixture.invalid/media.mp4'

class LocalHeaders {
  constructor (entries = {}) {
    this.values = new Map(Object.entries(entries).map(([name, value]) => [name.toLowerCase(), String(value)]))
  }

  append (name, value) { this.values.set(name.toLowerCase(), String(value)) }
  get (name) { return this.values.get(name.toLowerCase()) ?? null }
}

describe('MP4 fragment range loading', () => {
  const originalFetch = global.fetch
  const originalHeaders = global.Headers
  const originalXHR = global.XMLHttpRequest
  let sourceBytes
  let requests
  let subjects
  let splitLastByte

  beforeEach(() => {
    requests = []
    subjects = []
    splitLastByte = false
    global.Headers = LocalHeaders
    global.XMLHttpRequest = class {
      open () { throw new Error('Unexpected XHR in an offline fetch test') }
    }
    // Replace transport only; the real loaders construct and consume the range.
    global.fetch = jest.fn(async (url, options) => {
      if (url !== URL || !sourceBytes) throw new Error('Unexpected network request')
      const header = options.headers instanceof LocalHeaders ? options.headers.get('Range') : options.headers.Range
      const match = /^bytes=(\d+)-(\d+)$/.exec(header)
      if (!match) throw new Error(`Unexpected Range header: ${header}`)
      const start = Number(match[1])
      const end = Number(match[2])
      if (end < start || end >= sourceBytes.length) throw new Error(`Invalid Range header: ${header}`)
      const bytes = sourceBytes.slice(start, end + 1)
      requests.push(header)
      const chunks = splitLastByte ? [bytes.slice(0, -1), bytes.slice(-1)] : [bytes]
      let delivered = 0
      return {
        ok: true,
        status: 206,
        statusText: 'Partial Content',
        redirected: false,
        url,
        headers: new LocalHeaders({
          'Content-Range': `bytes ${start}-${end}/${sourceBytes.length}`,
          'Content-Length': bytes.length
        }),
        body: {
          getReader: () => ({
            read: async () => {
              if (delivered === chunks.length) return { done: true }
              return { done: false, value: chunks[delivered++] }
            },
            cancel: async () => {}
          })
        },
        arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
      }
    })
  })

  afterEach(async () => {
    await Promise.all(subjects.map(subject => subject.MP4Loader.destroy()))
    global.fetch = originalFetch
    global.Headers = originalHeaders
    global.XMLHttpRequest = originalXHR
  })

  function createSubject (moov, segments, isFragmentMP4 = false) {
    const subject = new MP4(URL, {
      enableWorker: false,
      memoryOpt: false,
      onProcessMinLen: 0,
      timeout: 0,
      retryCount: 0,
      reqOptions: { rangeRequestMustReturn206: true }
    })
    subject.videoTrak = segments.videoSegments
    subject.audioTrak = segments.audioSegments
    // Seed metadata with the same producer used by the loader; discovery is not tested.
    subject.meta = moovToMeta(moov, isFragmentMP4)
    subject.timeRange = subject.getTimeRange()
    subjects.push(subject)
    return subject
  }

  function ordinarySubject () {
    const fixture = createRangeMedia()
    sourceBytes = fixture.bytes
    const moov = MP4Parser.moov(MP4Parser.findBox(sourceBytes, ['moov'])[0])
    const segments = moovToSegments(moov, { segmentDuration: 1, memoryOpt: false })
    expect(segments.videoSegments).toHaveLength(2)
    expect(segments.audioSegments).toHaveLength(3)
    return { fixture, moov, subject: createSubject(moov, segments) }
  }

  function observeSamples (subject, moov, fragment) {
    const demuxer = new MP4Demuxer(subject.videoTrak, subject.audioTrak, undefined, { memoryOpt: false })
    const captured = { video: [], audio: [], chunks: [] }
    // Observe the mux boundary, then use the real demuxer. Remux/MSE are outside scope.
    subject._mux = (bytes, start, fragmentIndex, state) => {
      captured.chunks.push({ start, end: start + bytes.length, state })
      const result = demuxer.demuxPart(bytes, start,
        subject.getSamplesRange(fragment, 'video'), subject.getSamplesRange(fragment, 'audio'), moov)
      for (const sample of result.videoTrack.samples) captured.video.push({ index: sample.sampleOffset, data: sample.data })
      for (const sample of result.audioTrack.samples) captured.audio.push({ index: sample.sampleOffset, data: sample.data })
    }
    return captured
  }

  test.each([1, 2])('complete bytes retain all selected samples in tail fragment %i', fragment => {
    const { fixture, moov, subject } = ordinarySubject()
    const captured = observeSamples(subject, moov, fragment)
    subject._mux(sourceBytes, 0)
    expect(captured.video).toEqual(fixture.fragments[fragment].video)
    expect(captured.audio).toEqual(fixture.fragments[fragment].audio)
  })

  test.each([
    ['network', 0],
    ['chunked-network', 1],
    ['network', 1], ['full-cache', 1], ['partial-cache', 1],
    ['network', 2], ['full-cache', 2], ['partial-cache', 2],
    ['missing-last-byte', 2]
  ])('%s retains complete samples in ordinary fragment %i', async (mode, fragment) => {
    const { fixture, moov, subject } = ordinarySubject()
    splitLastByte = mode === 'chunked-network'
    const expected = fixture.fragments[fragment]
    const captured = observeSamples(subject, moov, fragment)
    const range = subject.getFragRange(fragment)
    if (mode === 'full-cache') subject.bufferLoaded = sourceBytes
    if (mode === 'partial-cache') subject.bufferLoaded = sourceBytes.slice(0, expected.start + 4)
    if (mode === 'missing-last-byte') subject.bufferLoaded = sourceBytes.slice(0, expected.end - 1)
    const requestStart = subject.bufferLoaded.length || expected.start
    await subject.loadFragment(fragment, range)
    if (mode === 'partial-cache' || mode === 'missing-last-byte') {
      expect(subject.timeRange[fragment].downloaded).toBe(false)
      expect(requests).toEqual([])
      // The player's next loading tick requests the suffix after draining cached bytes.
      await subject.loadFragment(fragment, range)
    }
    expect(requests).toEqual(mode === 'full-cache' ? [] : [`bytes=${requestStart}-${expected.end - 1}`])
    expect(captured.video).toEqual(expected.video)
    expect(captured.audio).toEqual(expected.audio)
    expect(Math.max(...captured.chunks.map(chunk => chunk.end))).toBe(expected.end)
    expect(subject.timeRange[fragment].downloaded).toBe(true)
    expect(subject.timeRange[fragment].range).toEqual([expected.start, expected.end])
    if (splitLastByte) expect(captured.chunks.map(chunk => chunk.state)).toEqual([false, true])
  })

  test.each(['network', 'full-cache', 'partial-cache'])('finite sidx %s retains every referenced byte', async mode => {
    const fixture = createSidxMedia()
    sourceBytes = fixture.bytes
    const moov = MP4Parser.moov(MP4Parser.findBox(sourceBytes, ['moov'])[0])
    const sidx = MP4Parser.sidx(MP4Parser.findBox(sourceBytes, ['sidx'])[0])
    const segments = sidxToSegments(moov, sidx)
    const subject = createSubject(moov, segments, true)
    expect(subject.meta.isFragmentMP4).toBe(true)
    const chunks = []
    // Byte observation only: this finite sidx reference is not a decoding fixture.
    subject._mux = (bytes, start) => chunks.push({ bytes, start, end: start + bytes.length })
    if (mode === 'full-cache') subject.bufferLoaded = sourceBytes
    if (mode === 'partial-cache') subject.bufferLoaded = sourceBytes.slice(0, fixture.start + 8)
    const requestStart = subject.bufferLoaded.length || fixture.start
    const range = subject.getFragRange(0)
    await subject.loadFragment(0, range)
    if (mode === 'partial-cache') {
      expect(subject.timeRange[0].downloaded).toBe(false)
      await subject.loadFragment(0, range)
    }
    expect(requests).toEqual(mode === 'full-cache' ? [] : [`bytes=${requestStart}-${sourceBytes.length - 1}`])
    expect(joinBytes(...chunks.map(chunk => chunk.bytes))).toEqual(fixture.payload)
    expect(chunks[0].start).toBe(fixture.start)
    expect(chunks[chunks.length - 1].end).toBe(sourceBytes.length)
    expect(subject.timeRange[0].downloaded).toBe(true)
    expect(subject.timeRange[0].range).toEqual([fixture.start, sourceBytes.length])
  })
})
