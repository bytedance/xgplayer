import { HEVC, NALu } from '../../src/codec'

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

  test('parse slice POC from SPS and PPS state', () => {
    const sps = Uint8Array.from(Buffer.from(
      '420103016000000300000300000300000300960000a0021c801e0596452bc9264677efbeced390808080820000030002000003003c10',
      'hex'
    ))
    const pps = Uint8Array.from(Buffer.from('4401c154f8788424', 'hex'))
    const cra = Uint8Array.from(Buffer.from('2a01add31875bb8786886874', 'hex'))

    const { hvcC } = HEVC.parseSPS(NALu.removeEPB(sps))
    HEVC.parsePPS(NALu.removeEPB(pps), hvcC)
    const slice = HEVC.parseSliceHeader(cra, hvcC)

    expect(hvcC.log2MaxPicOrderCntLsb).toBe(8)
    expect(hvcC.ppsPicParameterSetId).toBe(0)
    expect(slice).toEqual({
      nalUnitType: 21,
      temporalId: 0,
      sliceType: 2,
      picOrderCntLsb: 116
    })
  })

  const config = {
    spsSeqParameterSetId: 0,
    ppsSeqParameterSetId: 0,
    ppsPicParameterSetId: 0,
    log2MaxPicOrderCntLsb: 8,
    numExtraSliceHeaderBits: 0,
    outputFlagPresentFlag: 0,
    separateColourPlaneFlag: 0
  }

  test('parse IDR without a POC field', () => {
    expect(HEVC.parseSliceHeader(new Uint8Array([38, 1, 0xac]), config)).toEqual({
      nalUnitType: 19, temporalId: 0, sliceType: 2, picOrderCntLsb: 0
    })
  })

  test('retain dimensions when optional SPS POC metadata is truncated', () => {
    const sps = new Uint8Array([66, 1, 1, ...new Array(12).fill(0), 0xa0, 0x88, 0x45, 0x80])
    const state = { log2MaxPicOrderCntLsb: 8 }
    const result = HEVC.parseSPS(sps, state)
    expect(result.width).toBe(16)
    expect(result.height).toBe(16)
    expect(state.log2MaxPicOrderCntLsb).toBeUndefined()
  })

  test('remove emulation prevention bytes before reading a slice header', () => {
    const state = { ...config, numExtraSliceHeaderBits: 7, log2MaxPicOrderCntLsb: 16 }
    const bytes = new Uint8Array([2, 1, 0xc0, 0x40, 0, 0, 3, 1])
    expect(HEVC.parseSliceHeader(bytes, state)).toEqual(
      HEVC.parseSliceHeader(NALu.removeEPB(bytes), state)
    )
    expect(HEVC.parseSliceHeader(bytes, state)).toBeDefined()
  })

  test.each([
    [], [42], [42, 1], [42, 1, 0], [42, 1, 0xac],
    [170, 1, 0xac, 0], [42, 0, 0xac, 0], [43, 1, 0xac, 0],
    [42, 2, 0xac, 0], [68, 1, 0xac, 0]
  ])('ignore unsupported or truncated slice header %j', (...bytes) => {
    expect(HEVC.parseSliceHeader(Uint8Array.from(bytes), config)).toBeUndefined()
  })

  test.each([
    { ppsSeqParameterSetId: 1 },
    { ppsPicParameterSetId: 1 },
    { log2MaxPicOrderCntLsb: 33 },
    { log2MaxPicOrderCntLsb: 0 },
    { numExtraSliceHeaderBits: 8 }
  ])('reject incompatible parameter sets %j', override => {
    expect(HEVC.parseSliceHeader(
      new Uint8Array([42, 1, 0xac, 0]), { ...config, ...override }
    )).toBeUndefined()
  })

  test('ignore truncated PPS without partially overwriting caller state', () => {
    const state = { ...config }
    expect(HEVC.parsePPS(new Uint8Array([68, 1, 0x20]), state)).toBeUndefined()
    expect(state).toEqual(config)
    expect(HEVC.parsePPS(new Uint8Array([68, 1, 0]), state)).toBeUndefined()
    expect(HEVC.parsePPS(new Uint8Array([68, 1, 0, 0, 0, 1, 0xff, 0xff, 0xff, 0xff]), state)).toBeUndefined()
  })

})
