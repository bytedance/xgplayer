import {expect} from 'chai'
import Buffer from '../src/fmp4/buffer'

describe('Buffer', () => {
  it('Buffer writeUint32', () => {
    expect(Buffer.writeUint32(24)).to.eql(new Uint8Array([0, 0, 0, 24]))
  })
})
