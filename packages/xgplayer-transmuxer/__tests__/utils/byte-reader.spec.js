import { ByteReader } from '../../src/utils'

describe('ByteReader', () => {
  test('copies SharedArrayBuffer-backed input to an ArrayBuffer', () => {
    const shared = new SharedArrayBuffer(4)
    const data = new Uint8Array(shared)
    data.set([0, 1, 2, 3])

    const buffer = ByteReader.fromUint8(data.subarray(1, 3)).readToBuffer()

    expect(buffer).toBeInstanceOf(ArrayBuffer)
    expect(new Uint8Array(buffer)).toEqual(new Uint8Array([1, 2]))
  })
})
