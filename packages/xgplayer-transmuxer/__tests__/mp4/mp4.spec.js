import { MP4 } from '../../src/mp4/mp4'

describe('MP4', () => {

  test('box', () => {
    const ret = MP4.box(MP4.types.moov, new Uint8Array([1, 2, 3]), new Uint8Array([3, 2, 1]))
    expect(ret).toEqual(new Uint8Array([
      0, 0, 0, 8 + 6,
      'm'.charCodeAt(0),
      'o'.charCodeAt(0),
      'o'.charCodeAt(0),
      'v'.charCodeAt(0),
      1, 2, 3, 3, 2, 1
    ]))
  })

})
