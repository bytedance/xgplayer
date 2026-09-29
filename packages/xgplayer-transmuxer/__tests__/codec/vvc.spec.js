import { VVC } from '../../src/codec'
import { ExpGolomb } from '../../src/utils'

function nal (type) {
  return new Uint8Array([0, type << 3])
}

describe('VVC', () => {
  test('gets nal info from units', () => {
    expect(VVC.getNalInfo([nal(9)])).toEqual({
      nalTypes: [9],
      randomAccessType: 'cra',
      rasl: false
    })

    expect(VVC.getNalInfo([nal(3)])).toEqual({
      nalTypes: [3],
      randomAccessType: '',
      rasl: true
    })

    expect(VVC.getNalInfo([nal(7), nal(9)])).toEqual({
      nalTypes: [7, 9],
      randomAccessType: 'idr',
      rasl: false
    })
  })

  test('aligns general constraint parsing from the final loaded word', () => {
    const data = new Uint8Array(20)
    data[6] = 0x20 // gci_present_flag at bit position 50
    const eg = new ExpGolomb(data)
    eg.skipBits(50)

    expect(VVC._parseGeneralConstraintsInfo(eg)).toEqual({
      gciPresentFlag: 1
    })
    expect(eg.bitsPos()).toBe(136)
    expect(eg.byteAligned()).toBe(true)
  })
})
