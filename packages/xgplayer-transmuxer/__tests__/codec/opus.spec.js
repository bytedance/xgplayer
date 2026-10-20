import { OPUS } from '../../src/codec'

describe('OPUS', () => {
  test('parses the identification header', () => {
    const data = new Uint8Array([
      0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64,
      0x01, 0x02, 0x38, 0x01, 0x80, 0xbb, 0x00, 0x00,
      0xfe, 0xff, 0x00
    ])

    expect(OPUS.parseHeaderPackets(data)).toEqual({
      outputGain: -2,
      sampleRate: 48000,
      channelCount: 2,
      config: [0x01, 0x02, 0x38, 0x01, 0x80, 0xbb, 0x00, 0x00, 0xfe, 0xff, 0x00],
      codec: 'opus',
      originCodec: 'opus'
    })
  })

  test('rejects invalid identification headers', () => {
    expect(OPUS.parseHeaderPackets(new Uint8Array())).toBeUndefined()
    expect(() => OPUS.parseHeaderPackets(new Uint8Array(19))).toThrow(
      'Invalid Opus MagicSignature'
    )
  })

  test('uses a fixed 20 ms frame duration', () => {
    expect(OPUS.getFrameDuration([], 90000)).toBe(20)
  })
})
