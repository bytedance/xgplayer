import { HEVC } from '../../src/codec'

describe('HEVC', () => {

  test('parseHEVCDecoderConfigurationRecord', () => {
    const vps = [64, 1, 12, 1, 255, 255, 1, 96, 0, 0, 3, 0, 176, 0, 0, 3, 0, 0, 3, 0, 90, 23, 2, 64]
    const sps = [66, 1, 1, 1, 96, 0, 0, 3, 0, 176, 0, 0, 3, 0, 0, 3, 0, 90, 160, 4, 66, 0, 240, 88, 129, 123, 145, 100, 82, 255, 203, 159, 196, 254, 136]
    const pps = [68, 1, 192, 114, 240, 83, 36]
    const data = new Uint8Array([
      1, 1, 96, 0, 0, 0, 176, 0, 0, 0, 0, 0, 90, 240, 0, 252, 253, 248, 248, 0, 0, 15, 3, 160, 0, 1, 0, 24,
      ...vps,
      161, 0, 1, 0, 35,
      ...sps,
      162, 0, 1, 0, 7,
      ...pps
    ])

    const result = HEVC.parseHEVCDecoderConfigurationRecord(data)

    expect(result.sps.width).toBe(544)
    expect(result.sps.height).toBe(960)
    expect(result.sps.codec).toBe('hev1.1.6.L93.B0')
    expect(result.nalUnitSize).toBe(4)
    expect(result.vpsArr.length).toBe(1)
    expect(result.spsArr.length).toBe(1)
    expect(result.ppsArr.length).toBe(1)
    expect(result.vpsArr[0]).toEqual(new Uint8Array(vps))
    expect(result.spsArr[0]).toEqual(new Uint8Array(sps))
    expect(result.ppsArr[0]).toEqual(new Uint8Array(pps))
  })

  test('parseSPS', () => {
    const data = new Uint8Array([
      66, 1, 1, 1, 96, 0, 0, 0, 144, 0,
      0, 0, 0, 0, 60, 160, 12, 72, 4, 199,
      119, 150, 86, 105, 36, 202, 255, 240, 14, 208,
      14, 182, 128, 128, 0, 0, 0, 128, 0, 0,
      7, 132
    ])

    const result = HEVC.parseSPS(data)

    expect(result.width).toBe(388)
    expect(result.height).toBe(300)
    expect(result.codec).toBe('hev1.1.6.L93.B0')
  })

})
