import { TsDemuxer } from '../../src'
import { readMovie, trackSnapshotTest } from '../test-utils'

describe('TsDemuxer', () => {

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  test('probe', () => {
    const data = new Uint8Array(500)
    data[0] = 0x47
    data[188] = 0x47
    data[188 * 2] = 0x47

    expect(TsDemuxer.probe(data)).toBe(true)

    data[188] = 0x46
    expect(TsDemuxer.probe(data)).toBe(false)
  })

  test('Not start with 0x47', () => {
    expect(() => {
      new TsDemuxer().demuxAndFix(new Uint8Array(Array(188).fill(1)))
    }).toThrow('TS packet did not start with 0x47')
  })

  test('ts-avc', () => {
    const [file, snap] = readMovie('ts-avc.ts')
    const demuxer = new TsDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file, true, false)

    trackSnapshotTest(snap, videoTrack, audioTrack)
  })

  test('ts-multi-sps', () => {
    const [file, snap] = readMovie('ts-multi-sps.ts')
    const demuxer = new TsDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file, true, false)
    trackSnapshotTest(snap, videoTrack, audioTrack)
  })

  test('ts-hevc', () => {
    const [file, snap] = readMovie('ts-hevc.ts')
    const demuxer = new TsDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file)

    trackSnapshotTest(snap, videoTrack, audioTrack)
  })

})
