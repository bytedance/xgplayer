import { AudioTrack, FMP4Remuxer, TsDemuxer, VideoTrack } from '../../src'
import { readMovie } from '../test-utils'

describe('FMP4Remuxer', () => {

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  test('empty track should return empty object', () => {
    const remuxer = new FMP4Remuxer(new VideoTrack(), new AudioTrack())
    const result = remuxer.remux()
    expect(result.videoInitSegment).toBe(undefined)
    expect(result.audioInitSegment).toBe(undefined)
    expect(result.videoSegment).toBe(undefined)
    expect(result.audioSegment).toBe(undefined)
  })

  test('create/not create init segment', () => {
    const demuxer = new TsDemuxer()
    const remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack)

    const [file] = readMovie('ts-avc.ts')
    demuxer.demuxAndFix(file)

    let result = remuxer.remux(true)
    expect(result.videoInitSegment).toBeDefined()
    expect(result.audioInitSegment).toBeDefined()
    expect(result.videoSegment).toBeDefined()
    expect(result.audioSegment).toBeDefined()

    demuxer.demuxAndFix(file)
    result = remuxer.remux(false)
    expect(result.videoInitSegment).not.toBeDefined()
    expect(result.audioInitSegment).not.toBeDefined()
    expect(result.videoSegment).toBeDefined()
    expect(result.audioSegment).toBeDefined()
  })

  test('do not create related chunk when the related track has no enough data', () => {
    const demuxer = new TsDemuxer()
    const remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack)

    const [file] = readMovie('ts-avc.ts')
    demuxer.demuxAndFix(file)

    demuxer.audioTrack.samples = []

    let result = remuxer.remux(true)
    expect(result.videoInitSegment).toBeDefined()
    expect(result.audioInitSegment).toBeDefined()
    expect(result.videoSegment).toBeDefined()
    expect(result.audioSegment).not.toBeDefined()
  })

  test('can remux hevc', () => {
    const demuxer = new TsDemuxer()
    const remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack)

    const [file] = readMovie('ts-hevc.ts')
    demuxer.demuxAndFix(file)

    let result = remuxer.remux(true)

    expect(result.videoInitSegment).toBeDefined()
    expect(result.audioInitSegment).toBeDefined()
    expect(result.videoSegment).toBeDefined()
    expect(result.audioSegment).toBeDefined()
  })

})
