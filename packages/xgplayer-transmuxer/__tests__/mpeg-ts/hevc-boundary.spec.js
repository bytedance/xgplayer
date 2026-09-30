import { AudioTrack, MetadataTrack, VideoTrack, VideoSample, VideoCodecType } from '../../src'
import { TsFixer } from '../../src/mpeg-ts/fixer'

describe('HEVC broken-link boundaries', () => {
  let video
  let fixer
  const sample = (dts, type = 21) => {
    const result = new VideoSample(dts + 6000, dts, [new Uint8Array([type << 1, 1, 0x80])])
    if (type >= 16 && type <= 21) result.setToKeyframe()
    return result
  }
  const types = () => video.samples.map(x => (x.units[0][0] >>> 1) & 0x3f)

  beforeEach(() => {
    video = new VideoTrack()
    video.codecType = VideoCodecType.HEVC
    video.timescale = 90000
    video.fpsNum = 30
    video.fpsDen = 1
    fixer = new TsFixer(video, new AudioTrack(), new MetadataTrack(), {
      fixHevcDiscontinuity: true
    })
  })

  test.each([[true, true], [false, false]])(
    'signal BLA at discontinuity=%s, contiguous=%s without removing leading pictures',
    (discontinuity, contiguous) => {
      video.samples = [sample(0), sample(3000, 9), sample(6000, 8), sample(9000, 1)]
      fixer.fix(0, discontinuity, contiguous)
      expect(types()).toEqual([16, 9, 8, 1])
      expect(video.samples.map(x => x.pts - x.dts)).toEqual([6000, 6000, 6000, 6000])
    }
  )

  test('convert all CRA slices without mutating the input buffer or non-VCL units', () => {
    const input = new Uint8Array([42, 1, 0x80, 42, 1, 0x00])
    const aud = new Uint8Array([70, 1, 0x50])
    const first = sample(0)
    first.units = [aud, input.subarray(0, 3), input.subarray(3)]
    video.samples = [first]
    fixer.fix(0, true)
    expect(input).toEqual(new Uint8Array([42, 1, 0x80, 42, 1, 0x00]))
    expect(first.units[0]).toBe(aud)
    expect(first.units.slice(1).map(x => Array.from(x))).toEqual([[32, 1, 0x80], [32, 1, 0x00]])
  })

  test('preserve continuous CRA and recover unmarked DTS rollback without dropping samples', () => {
    video.samples = [sample(0), sample(3000, 1)]
    fixer.fix()
    video.samples = [sample(6000), sample(9000, 1)]
    fixer.fix()
    expect(types()).toEqual([21, 1])
    video.samples = [sample(6000), sample(9000, 1)]
    fixer.fix()
    expect(types()).toEqual([16, 1])
    expect(video.samples.map(x => x.dts)).toEqual([12000, 15000])
  })

  test.each([[66, 1, 6], [66, 1, 1, 0]])(
    'recognize changed in-band SPS %j with forward DTS and unchanged track metadata',
    (...bytes) => {
      const initialSps = new Uint8Array([66, 1, 1])
      video.sps = [initialSps]
      video.samples = [sample(0), sample(3000, 1)]
      video.samples[0].units.unshift(initialSps)
      fixer.fix()
      expect(video.samples[0].units[1][0]).toBe(42)

      const changedSps = Uint8Array.from(bytes)
      video.samples = [sample(6000), sample(9000, 9), sample(12000, 8)]
      video.samples[0].units.unshift(changedSps)
      fixer.fix()
      expect(video.samples[0].units[1][0]).toBe(32)
      expect(video.samples.slice(1).map(x => x.units[0][0] >>> 1)).toEqual([9, 8])
      expect(video.samples.map(x => x.dts)).toEqual([6000, 9000, 12000])
      expect(video.sps[0]).toBe(initialSps)
      expect(video.samples[0].units[0]).toBe(changedSps)

      video.samples = [sample(15000)]
      video.samples[0].units.unshift(changedSps.slice())
      fixer.fix()
      expect(video.samples[0].units[1][0]).toBe(42)
    }
  )

  test('retain the previous SPS across chunks without parameter sets', () => {
    video.samples = [sample(0)]
    video.samples[0].units.unshift(new Uint8Array([66, 1, 1]))
    fixer.fix()
    video.samples = [sample(3000)]
    fixer.fix()
    expect(types()).toEqual([21])
    video.samples = [sample(6000)]
    video.samples[0].units.unshift(new Uint8Array([66, 1, 6]))
    fixer.fix()
    expect(video.samples[0].units[1][0]).toBe(32)
  })

  test('find CRA after a leading parameter-set-only sample', () => {
    const parameterSet = new VideoSample(6000, 6000, [
      new Uint8Array([66, 1, 6])
    ])
    const cra = sample(6000)
    video.samples = [sample(0)]
    video.samples[0].units.unshift(new Uint8Array([66, 1, 1]))
    fixer.fix()

    video.samples = [parameterSet, cra, sample(9000, 9)]
    fixer.fix()

    expect(parameterSet.units[0][0]).toBe(66)
    expect(cra.units[0][0]).toBe(32)
  })

  test('forget the HEVC parameter set after a codec change', () => {
    video.samples = [sample(0)]
    video.samples[0].units.unshift(new Uint8Array([66, 1, 1]))
    fixer.fix()
    video.codecType = VideoCodecType.AVC
    video.samples = [sample(3000, 1)]
    fixer.fix()
    video.codecType = VideoCodecType.HEVC
    video.samples = [sample(6000)]
    video.samples[0].units.unshift(new Uint8Array([66, 1, 6]))
    fixer.fix()
    expect(video.samples[0].units[1][0]).toBe(42)
  })

  test.each([
    [42], [42, 0, 128], [42, 2, 128], [43, 1, 128], [170, 1, 128],
    [42, 1, 0], [38, 1, 128], [2, 1, 128]
  ])('leave unsupported or invalid NAL header %j unchanged', (...bytes) => {
    const unit = Uint8Array.from(bytes)
    const first = sample(0)
    first.units = [unit]
    video.samples = [first]
    fixer.fix(0, true)
    expect(first.units[0]).toBe(unit)
  })

  test('do not partially convert an access unit with mixed VCL types', () => {
    const first = sample(0)
    first.units.push(new Uint8Array([2, 1, 128]))
    const units = first.units
    video.samples = [first]
    fixer.fix(0, true)
    expect(first.units).toBe(units)
    expect(first.units[0][0]).toBe(42)
  })

  test.each([false, undefined])('preserve existing behavior with option=%s', enabled => {
    fixer = new TsFixer(video, new AudioTrack(), new MetadataTrack(), {
      fixHevcDiscontinuity: enabled
    })
    video.samples = [sample(0)]
    video.samples[0].units.push(new Uint8Array([66, 1, 1]))
    fixer.fix(0, true)
    expect(types()).toEqual([21])
    video.samples = [sample(2000)]
    video.samples[0].units.push(new Uint8Array([66, 1, 6]))
    fixer.fix()
    expect(types()).toEqual([21])
    expect(video.samples[0].dts).toBe(2000)
  })

  test('leave AVC timestamps and payload unchanged', () => {
    video.codecType = VideoCodecType.AVC
    video.samples = [sample(0)]
    fixer.fix(0, true)
    video.samples = [sample(2000)]
    fixer.fix()
    expect(types()).toEqual([21])
    expect(video.samples[0].dts).toBe(2000)
  })

  test('avoid DTS rollback as correction crosses the 500ms threshold', () => {
    video.samples = [sample(0), sample(48000, 1)]
    fixer.fix()
    expect(fixer._videoNextDts).toBe(51000)
    video.samples = [sample(5940), sample(8940, 1)]
    fixer.fix()
    expect(video.samples.map(x => x.dts)).toEqual([51000, 54000])
    video.samples = [sample(12030), sample(15030, 1)]
    fixer.fix()
    expect(video.samples.map(x => x.dts)).toEqual([57000, 60000])
    expect(video.samples.map(x => x.pts - x.dts)).toEqual([6000, 6000])
    expect(video.samples.map(x => x.duration)).toEqual([3000, 3000])
  })

  test('anchor next DTS to output when estimated tail duration is shorter than input', () => {
    video.samples = [sample(0), sample(3003, 1)]
    fixer.fix()
    video.samples = [sample(6006), sample(9009, 1)]
    fixer.fix()
    expect(fixer._videoNextDts).toBe(12009)
    video.samples = [sample(12012), sample(15015, 1)]
    fixer.fix()
    expect(video.samples[0].dts).toBe(12012)
    expect(fixer._videoNextDts).toBe(18015)
  })
})
