import { ExpGolomb } from '../../src/utils'

describe('ExpGolomb', () => {

  test('count remaining bits across word boundaries and exhaustion', () => {
    const eg = new ExpGolomb(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff]))
    expect(eg.bitsLeft()).toBe(40)
    expect(eg.bitsPos()).toBe(0)
    eg.readBits(29)
    expect(eg.bitsLeft()).toBe(11)
    expect(eg.bitsPos()).toBe(29)
    expect(eg.byteAligned()).toBe(false)
    eg.readBits(7)
    expect(eg.bitsLeft()).toBe(4)
    expect(eg.bitsPos()).toBe(36)
    eg.readBits(4)
    expect(eg.bitsLeft()).toBe(0)
    expect(eg.bitsPos()).toBe(40)
    expect(eg.byteAligned()).toBe(true)
    expect(new ExpGolomb(new Uint8Array()).bitsLeft()).toBe(0)
  })

  test('read and skip validate the available bit range', () => {
    const reader = new ExpGolomb(new Uint8Array([0xff]))
    expect(reader.readBits(0)).toBe(0)
    expect(reader.bitsLeft()).toBe(8)
    expect(() => reader.readBits(9)).toThrow('Cannot read beyond available bits')
    expect(reader.bitsLeft()).toBe(8)
    expect(() => reader.skipBits(9)).toThrow('Cannot skip beyond available bits')
    reader.skipBits(8)
    expect(reader.bitsLeft()).toBe(0)
    expect(reader.bitsPos()).toBe(8)
  })

  test('load the next word after skipping exactly 32 bits', () => {
    const reader = new ExpGolomb(new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]))
    reader.skipBits(32)
    expect(reader.bitsLeft()).toBe(8)
    expect(reader.readBits(8)).toBe(0x9a)
  })

  test('Throw error when not enough data', () => {
    expect(() => {
      new ExpGolomb()
    }).toThrow('ExpGolomb data params is required')

    expect(() => {
      const eg = new ExpGolomb(new Uint8Array([0x1, 0x1, 0x1, 0x1, 0x1]))
      eg.readBits(40)
    }).toThrow('Cannot read more than 32 bits')

    expect(() => {
      const eg = new ExpGolomb(new Uint8Array([]))
      eg.readEG()
    }).toThrow('No bytes available')
  })

  test('Read and skip data', () => {
    let eg = new ExpGolomb(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0xff]));
    expect(eg.skipLZ()).toBe(32)
    expect(eg.readBits(8)).toBe(0xff)

    eg = new ExpGolomb(new Uint8Array([0x15, 0xab, 0x40, 0xc8, 0xff]))
    expect(eg.skipLZ()).toBe(3)
    eg.skipBits(1)
    expect(eg.readUByte()).toBe(0x5a)

    eg = new ExpGolomb(new Uint8Array([0x15, 0x00, 0x00, 0x28, 0x00, 0x0a, 0x00, 0x00]))
    expect(eg.readUEG()).toBe(9)
    eg.skipBits(17)
    expect(eg.readUEG()).toBe(4)
    eg.readBits(13)
    expect(eg.readUEG()).toBe(4)
  })

  test('Parse AVC SPS', () => {
    const eg = new ExpGolomb(new Uint8Array([
      0x27, 0x42, 0xe0, 0x0b,
      0xa9, 0x18, 0x60, 0x9d,
      0x80, 0x35, 0x06, 0x01,
      0x06, 0xb6, 0xc2, 0xb5,
      0xef, 0x7c, 0x04
    ]))

    expect(eg.readUByte()).toBe(0x27) // NAL type
    expect(eg.readUByte()).toBe(66) // profile_idc
    expect(eg.readBits(4)).toBe(0x0E) // constraints
    eg.skipBits(4)
    expect(eg.readUByte()).toBe(11) // level_idc
    expect(eg.readUEG()).toBe(0) // seq_parameter_set_id
    expect(eg.readUEG()).toBe(1) // log2_max_frame_num_minus4
    expect(eg.readUEG()).toBe(0) // pic_order_cnt_type
    expect(eg.readUEG()).toBe(3) // log2_max_pic_order_cnt_lsb_minus4
    expect(eg.readUEG()).toBe(2) // max_num_ref_frames
    expect(eg.readBits(1)).toBe(0) // gaps_in_frame_num_value_allowed_flag
    expect(eg.readUEG()).toBe(11) // pic_width_in_mbs_minus1
    expect(eg.readUEG()).toBe(8) // pic_height_in_map_units_minus1
    expect(eg.readBits(1)).toBe(1) // frame_mbs_only_flag
    expect(eg.readBits(1)).toBe(1) // direct_8x8_inference_flag
    expect(eg.readBits(1)).toBe(0) // frame_cropping_flag
  })

})
