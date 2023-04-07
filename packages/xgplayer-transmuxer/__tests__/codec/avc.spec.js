import { AVC } from '../../src/codec'

describe('AVC', () => {

  test('parseAVCDecoderConfigurationRecord', () => {
    const sps = [103, 100, 0, 30, 172, 178, 1, 176, 123, 196, 127, 248, 9, 192, 9, 184, 128, 0, 0, 3, 0, 128, 0, 0, 25, 71, 139, 23, 36]
    const pps = [104, 235, 204, 178, 44]
    const data = new Uint8Array([
      1, 100, 0, 30, 255, 225, 0, 29, 
      ...sps,
      1, 0, 5,
      ...pps
    ])

    const result = AVC.parseAVCDecoderConfigurationRecord(data)

    expect(result.spsArr.length).toBe(1)
    expect(result.ppsArr.length).toBe(1)
    expect(result.spsArr[0]).toEqual(new Uint8Array(sps))
    expect(result.ppsArr[0]).toEqual(new Uint8Array(pps))
    expect(result.sps.codec).toBe('avc1.64001e')
    expect(result.sps.fpsNum).toBe(50)
    expect(result.sps.fpsDen).toBe(2)
    expect(result.sps.width).toBe(850)
    expect(result.sps.height).toBe(480)
    expect(result.sps.sarRatio).toEqual([312, 311])
  })

  test('parseSPS', () => {
    const sps = new Uint8Array([
      103, 100, 0, 31, 172, 217, 64, 212, 61, 176, 17, 0, 0, 0, 1, 0, 0, 0, 120, 15, 24, 49, 150
    ])

    const result = AVC.parseSPS(sps)

    expect(result.codec).toBe('avc1.64001f')
    expect(result.chromaFormat).toBe(420)
    expect(result.fps).toBe(60)
    expect(result.fpsNum).toBe(120)
    expect(result.fpsDen).toBe(2)
    expect(result.width).toBe(848)
    expect(result.height).toBe(480)
    expect(result.sarRatio).toEqual([1, 1])
  })

})
