import { FlvDemuxer } from '../../src'
import { readFile, readMovie, trackSnapshotTest } from '../test-utils'

describe('FlvDemuxer', () => {

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  test('invalid flv file', () => {
    const demuxer = new FlvDemuxer()

    expect(() => {
      demuxer.demuxAndFix(new Uint8Array([0, 76, 86, 1, 5, 0, 0, 0, 9, 0, 0, 0, 0]))
    }).toThrow()
  })

  test('flv-avc', () => {
    const [file, snap] = readMovie('flv-avc.flv')
    const demuxer = new FlvDemuxer()
    const { videoTrack, audioTrack } = demuxer.demux(file, true, false)

    trackSnapshotTest(snap, videoTrack, audioTrack)
  })

  test('flv-hevc', () => {
    const file = readFile('flv/h265_aac_44100.flv')
    const demuxer = new FlvDemuxer()
    const { videoTrack } = demuxer.demuxAndFix(file)

    expect(videoTrack.vps.length).toBeTruthy()
  })

  test('parse pcma audio: h264_pcma_channel1_8000' , () => {
    const file = readFile('flv/h264_pcma_channel1_8000.flv')
    const demuxer = new FlvDemuxer()
    const { audioTrack } = demuxer.demuxAndFix(file)

    // g711的过滤
    expect(audioTrack.codecType).toBe('g7110a')
    // expect(audioTrack.codec).toBe('g7110a')
    // expect(audioTrack.sampleRate).toBe(8000)
    // expect(audioTrack.channelCount).toBe(1)
    // expect(audioTrack.sampleSize).toBe(16)
    // expect(audioTrack.sampleDuration).toBe(40)
  })

  test('parse pcmu audio: h264_pcmu_channel1_8000' , () => {
    const file = readFile('flv/h264_pcmu_channel1_8000.flv')
    const demuxer = new FlvDemuxer()
    const { audioTrack } = demuxer.demuxAndFix(file)

    expect(audioTrack.codecType).toBe('g7110m')
    // expect(audioTrack.codec).toBe('g7110m')
    // expect(audioTrack.sampleRate).toBe(8000)
    // expect(audioTrack.channelCount).toBe(1)
    // expect(audioTrack.sampleSize).toBe(16)
  })

  test("parse mp3, no support: mp3.flv", () => {
    const file = readFile('flv/mp3.flv')
    const demuxer = new FlvDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file)

    expect(videoTrack.exist()).toBe(false)
    expect(audioTrack.exist()).toBe(false)
  })

  test('parse flv header: h264_only', () => {
    const file = readFile('flv/h264_only.flv')
    const demuxer = new FlvDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file)

    expect(videoTrack.exist()).toBe(true)
    expect(audioTrack.exist()).toBe(false)
  })

  test('parse flv : h264_aac_48000', () => {
    const file = readFile('flv/h264_aac_48000.flv')
    const demuxer = new FlvDemuxer()
    const { videoTrack, audioTrack } = demuxer.demuxAndFix(file)

    expect(audioTrack.codecType).toBe('aac')
    expect(audioTrack.sampleRate).toBe(48000)
    expect(audioTrack.timescale).toBe(48000)
    expect(audioTrack.channelCount).toBe(2)

    expect(videoTrack.sps.length).toBeTruthy()
    expect(videoTrack.pps.length).toBeTruthy()
    expect(videoTrack.timescale).toBe(1000)
    expect(videoTrack.codec).toBe('avc1.640034')
  })

  test("parse metadataTrack" , () => {
    const file = readFile('flv/h265_aac_44100.flv')
    const demuxer = new FlvDemuxer()
    const { metadataTrack } = demuxer.demuxAndFix(file)

    expect(metadataTrack.flvScriptSamples.length).toBe(1)
    const flvSample = metadataTrack.flvScriptSamples[0]
    expect(flvSample.time).toBe(0)
    expect(flvSample.data.onMetaData.audiosamplerate).toBe(44100)
    expect(flvSample.data.onMetaData.platform).toBe('iOS')
    expect(flvSample.data.onMetaData.push_protocol).toBe('rtmp')
    expect(flvSample.data.onMetaData.videodatarate).toBe(976.5625)

    expect(metadataTrack.seiSamples.length).toBe(4)
    expect(metadataTrack.seiSamples[0].time).toBe(0)
    expect(metadataTrack.seiSamples[1].time).toBe(2)
    expect(metadataTrack.seiSamples[2].time).toBe(4)
    expect(metadataTrack.seiSamples[3].time).toBe(5.999)
  })
})
