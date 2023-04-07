import Buffer from '../src/fmp4/buffer'

describe('Buffer', () => {
  test('Buffer writeUint32', () => {
    expect(Buffer.writeUint32(24)).toEqual(new Uint8Array([0, 0, 0, 24]))
  })
})
