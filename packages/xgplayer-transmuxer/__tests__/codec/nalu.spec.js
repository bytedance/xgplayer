import { NALu } from '../../src/codec'

describe('NALu', () => {

  test('parseAnnexB with multiple start codes & mixed start codes', () => {
    const uint0 = [9, 240]
    const uint1 = [103, 100, 0, 31, 172, 217, 64, 212, 61, 176, 17, 0, 0, 3, 0, 1, 0, 0, 3, 0, 120, 15, 24, 49, 150]
    const uint2 = [104, 235, 226, 75, 34, 192]
    const uint3 = [226, 249, 198, 12, 0, 0, 0, 70, 83, 84, 83, 29, 1, 168, 170, 147, 1, 0, 0, 18] // 00 00 00 + not 1
    const uint4 = [226, 9, 240] // trailing zeros
    const data = new Uint8Array([
      0, 0, 0, 1,
      ...uint0,
      0, 0, 1,
      ...uint1,
      0, 0, 0, 1,
      ...uint2,
      0, 0, 0, 1,
      ...uint3,
      0, 0, 1,
      ...uint4,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // trailing zeros
    ])

    const result = NALu.parseAnnexB(data)

    expect(result.length).toBe(5)
    expect(result[0]).toEqual(new Uint8Array(uint0))
    expect(result[1]).toEqual(new Uint8Array(uint1))
    expect(result[2]).toEqual(new Uint8Array(uint2))
    expect(result[3]).toEqual(new Uint8Array(uint3))
    expect(result[4]).toEqual(new Uint8Array(uint4))
  })

  test('parseAnnexB with no NAL units', () => {
    const data = new Uint8Array([0, 0, 0, 1])
    const result = NALu.parseAnnexB(data)
    expect(result.length).toBe(0)
  })

  test('parseAvcC', () => {
    const data = new Uint8Array([
      0, 0, 0, 3, // size
      1, 2, 3,
      0, 0, 0, 2, // size
      1, 2,
      0, 0, 0, 5
    ])

    const result = NALu.parseAvcC(data)

    expect(result.length).toBe(2)
    expect(result[0]).toEqual(new Uint8Array([1, 2, 3]))
    expect(result[1]).toEqual(new Uint8Array([1, 2]))
  })

  test('parseSEI', () => {
    const payload = [...Array(256).keys()]
    const data = new Uint8Array([
      6, 5, 255, 4,
      220, 69, 233, 189, 230, 217, 72, 183, 150, 44, 216, 32, 217, 35, 238, 239, // dc45e9bde6d948b7962cd820d923eeef
      ...payload,
      1, 2, 3, 128 // payload
    ])

    const result = NALu.parseSEI(data)

    expect(result.type).toBe(5)
    expect(result.uuid).toBe('dc45e9bde6d948b7962cd820d923eeef')
    expect(result.payload).toEqual(new Uint8Array([...payload, 1, 2, 3]))
    expect(result.size).toBe(256 + 3)
  })

  test('removeEPB', () => {
    const part1 = [103, 100, 0, 31, 172, 217, 64, 212, 61, 176, 17]
    const part2 = [0, 1]
    const part3 = [0, 120, 15, 24, 49, 150]
    const data = new Uint8Array([
      ...part1,
      0, 0, 3,
      ...part2,
      0, 0, 3,
      ...part3
    ])

    const result = NALu.removeEPB(data)

    expect(result).toEqual(new Uint8Array([
      ...part1,
      0, 0,
      ...part2,
      0, 0,
      ...part3
    ]))
  })

})
