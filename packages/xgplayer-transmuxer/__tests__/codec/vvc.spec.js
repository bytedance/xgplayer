import { VVC } from '../../src/codec'

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
})
