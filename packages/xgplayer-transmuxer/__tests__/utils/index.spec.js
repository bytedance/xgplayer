import { concatUint8Array, readBig32, UTF8 } from '../../src/utils'

describe('Utils', () => {

  test('concatUint8Array', () => {
    expect(concatUint8Array()).toEqual(new Uint8Array([]))
    expect(concatUint8Array(
      new Uint8Array([1, 2]),
      new Uint8Array([3, 4]),
      new Uint8Array([5, 6]),
      new Uint8Array([]),
      new Uint8Array([7]),
      new Uint8Array([8]),
    )).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))
    expect(concatUint8Array(
      undefined,
      null,
      new Uint8Array([1]),
      0,
      false,
      new Uint8Array([2]),
      null,
      new Uint8Array([3]),
      ''
    )).toEqual(new Uint8Array([1, 2, 3]))
    expect(concatUint8Array(undefined, null)).toEqual(new Uint8Array())
  })
 
  test('readBig32', () => {
    expect(readBig32([0, 0, 0, 0])).toBe(0)
    expect(readBig32([0xff, 0xff, 0xff, 0xff])).toBe(0xffffffff)
    expect(readBig32([0x99, 0x88, 0x77, 0x66])).toBe(0x99887766)
    expect(readBig32([0x0, 0x1, 0x2, 0x3])).toBe(0x00010203)
    expect(readBig32([0x1, 0x2, 0x3])).toBe(0x01020300)
    expect(readBig32([0x1, 0x2, undefined, 0x3])).toBe(0x01020003)
    expect(readBig32([0x1, undefined, 0x2, 0])).toBe(0x01000200)
  })

  test('UTF8::decode', () => {
    const data = new Uint8Array([228, 184, 128, 228, 186, 140, 228, 184, 137, 97, 98, 99, 240, 160, 174, 183, 190, 223, 6320])
    expect(UTF8.decode(data)).toBe('一二三abc𠮷�߰')
  })

})
