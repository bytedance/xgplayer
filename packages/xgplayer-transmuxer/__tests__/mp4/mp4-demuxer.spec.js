import { VideoCodecType } from '../../src/model'
import { MP4Demuxer } from '../../src/mp4/mp4-demuxer'
import { registerVideoCodec, unregisterVideoCodec } from '../../src/codec'

function nal (type) {
  return new Uint8Array([0, type << 3])
}

function sampleData (...units) {
  const size = units.reduce((len, unit) => len + 4 + unit.byteLength, 0)
  const data = new Uint8Array(size)
  let offset = 0
  units.forEach(unit => {
    data[offset + 3] = unit.byteLength
    offset += 4
    data.set(unit, offset)
    offset += unit.byteLength
  })
  return data
}

describe('MP4Demuxer', () => {
  afterEach(() => {
    unregisterVideoCodec('test-demux-codec')
  })

  test('marks VVC random access samples from demuxPart units', () => {
    const cra = sampleData(nal(9))
    const rasl = sampleData(nal(3))
    const data = new Uint8Array(cra.byteLength + rasl.byteLength)
    data.set(cra, 0)
    data.set(rasl, cra.byteLength)

    const demuxer = new MP4Demuxer([{
      frames: [{
        index: 0,
        offset: 0,
        size: cra.byteLength,
        dts: 0,
        pts: 0,
        duration: 40,
        keyframe: true,
        gopId: 0
      }, {
        index: 1,
        offset: cra.byteLength,
        size: rasl.byteLength,
        dts: 40,
        pts: 40,
        duration: 40,
        keyframe: false,
        gopId: 0
      }]
    }])
    demuxer.parseSamples = () => {}
    demuxer.videoTrack.codec = 'vvc1.1.6.L93.B0'
    demuxer.videoTrack.codecType = VideoCodecType.VVCC

    const { videoTrack } = demuxer.demuxPart(data, 0, [0, 1], null)

    expect(videoTrack.samples[0].sideData.vvcNalInfo.nalTypes).toEqual([9])
    expect(videoTrack.samples[0].sideData.vvcNalInfo.randomAccessType).toBe('cra')
    expect(videoTrack.samples[0].sideData.vvcNalInfo.rasl).toBe(false)
    expect(videoTrack.samples[1].sideData.vvcNalInfo.nalTypes).toEqual([3])
    expect(videoTrack.samples[1].sideData.vvcNalInfo.randomAccessType).toBe('')
    expect(videoTrack.samples[1].sideData.vvcNalInfo.rasl).toBe(true)
  })

  test('marks samples through registered codec hook', () => {
    const data = sampleData(nal(1))
    const markSample = jest.fn(({ sample }) => {
      sample.sideData = { customMarked: true }
    })
    registerVideoCodec({
      id: 'test-demux-codec',
      kind: 'video',
      codecType: 'test-demux',
      sampleEntries: ['tdem'],
      markSample
    })

    const demuxer = new MP4Demuxer([{
      frames: [{
        index: 0,
        offset: 0,
        size: data.byteLength,
        dts: 0,
        pts: 0,
        duration: 40,
        keyframe: true,
        gopId: 0
      }]
    }])
    demuxer.parseSamples = () => {}
    demuxer.videoTrack.codecType = 'test-demux'

    const { videoTrack } = demuxer.demuxPart(data, 0, [0, 0], null)

    expect(markSample).toHaveBeenCalledTimes(1)
    expect(videoTrack.samples[0].sideData.customMarked).toBe(true)
  })
})
