import FMP4 from '../src/fmp4/mp4'

describe('FMP4', () => {
  test('parse ftyp box', () => {
    expect(FMP4.ftyp()).toEqual(new Uint8Array([
      0, 0, 0, 24,
      102, 116, 121, 112,
      105, 115, 111, 109,
      0, 0, 0, 1,
      105, 115, 111, 109,
      97, 118, 99, 49
    ]))
  })
})
