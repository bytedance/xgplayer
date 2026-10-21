import {
  findFirstFrameOffset,
  parseFrameHeader,
  parseMP3Metadata,
  scanMP3Frames,
  timeToByteOffset
} from '../src/parser'

function concat(...items: Uint8Array[]): Uint8Array {
  const data = new Uint8Array(items.reduce((total, item) => total + item.length, 0))
  let offset = 0
  items.forEach((item) => {
    data.set(item, offset)
    offset += item.length
  })
  return data
}

function createID3(payloadSize = 35): Uint8Array {
  const data = new Uint8Array(10 + payloadSize)
  data.set([0x49, 0x44, 0x33, 0x04, 0x00, 0x00], 0)
  data[6] = (payloadSize >> 21) & 0x7f
  data[7] = (payloadSize >> 14) & 0x7f
  data[8] = (payloadSize >> 7) & 0x7f
  data[9] = payloadSize & 0x7f
  return data
}

function createFrame(header: number[], length: number): Uint8Array {
  const frame = new Uint8Array(length)
  frame.set(header)
  return frame
}

function writeUint16(data: Uint8Array, offset: number, value: number): void {
  data[offset] = (value >> 8) & 0xff
  data[offset + 1] = value & 0xff
}

function writeUint32(data: Uint8Array, offset: number, value: number): void {
  data[offset] = (value >>> 24) & 0xff
  data[offset + 1] = (value >>> 16) & 0xff
  data[offset + 2] = (value >>> 8) & 0xff
  data[offset + 3] = value & 0xff
}

describe('MP3 parser', () => {
  const mpeg2Layer3Header = [0xff, 0xf3, 0xa8, 0xc4]

  test('parses MPEG-2 Layer III frame details', () => {
    const frame = createFrame(mpeg2Layer3Header, 432)
    const header = parseFrameHeader(frame, 0)

    expect(header).toMatchObject({
      version: 2,
      layer: 3,
      bitRate: 96000,
      sampleRate: 16000,
      channelCount: 1,
      samplesPerFrame: 576,
      frameLength: 432
    })
  })

  test('skips repeated ID3 tags between MP3 frames', () => {
    const id3 = createID3()
    const frame = createFrame(mpeg2Layer3Header, 432)
    const data = concat(id3, frame, frame, id3, frame, frame)
    const frames = scanMP3Frames(data)

    expect(findFirstFrameOffset(data)).toBe(45)
    expect(frames).toHaveLength(4)
    expect(frames.map((item) => item.offset)).toEqual([
      45,
      477,
      954,
      1386
    ])

    const metadata = parseMP3Metadata(data, data.length)
    expect(metadata).toMatchObject({
      seekMode: 'cbr',
      firstFrameOffset: 45,
      bitRate: 96000,
      sampleRate: 16000,
      version: 2
    })
  })

  test('parses Xing frame count, byte count and seek table', () => {
    const frameLength = 417
    const first = createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    first.set([0x58, 0x69, 0x6e, 0x67], 36)
    writeUint32(first, 40, 0x7)
    writeUint32(first, 44, 1000)
    writeUint32(first, 48, 417000)
    for (let i = 0; i < 100; i++) first[52 + i] = Math.floor((i * 256) / 100)
    const data = concat(
      first,
      createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    )

    const metadata = parseMP3Metadata(data, 417000)
    expect(metadata.seekMode).toBe('xing')
    expect(metadata.frameCount).toBe(1000)
    expect(metadata.isVBR).toBe(true)
    expect(metadata.duration).toBeCloseTo((1000 * 1152) / 44100)
    expect(timeToByteOffset(metadata, metadata.duration / 2)).toBeGreaterThan(
      180000
    )
  })

  test('rejects a VBR Xing header without a seek TOC', () => {
    const frameLength = 417
    const first = createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    first.set([0x58, 0x69, 0x6e, 0x67], 36)
    writeUint32(first, 40, 0x3)
    writeUint32(first, 44, 1000)
    writeUint32(first, 48, 417000)
    const data = concat(
      first,
      createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    )

    expect(() => parseMP3Metadata(data, 417000)).toThrow(
      'VBR Xing header requires a TOC'
    )
  })

  test('parses VBRI frame and byte tables', () => {
    const frameLength = 417
    const first = createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    first.set([0x56, 0x42, 0x52, 0x49], 36)
    writeUint32(first, 46, 100000)
    writeUint32(first, 50, 1000)
    writeUint16(first, 54, 2)
    writeUint16(first, 56, 1)
    writeUint16(first, 58, 2)
    writeUint16(first, 60, 500)
    writeUint16(first, 62, 50000)
    writeUint16(first, 64, 50000)
    const data = concat(
      first,
      createFrame([0xff, 0xfb, 0x90, 0x64], frameLength)
    )

    const metadata = parseMP3Metadata(data, 100000)
    expect(metadata.seekMode).toBe('vbri')
    expect(metadata.frameCount).toBe(1000)
    expect(metadata.seekPoints).toHaveLength(3)
    expect(timeToByteOffset(metadata, metadata.duration / 2)).toBeCloseTo(50000)
  })

  test('rejects VBR without a Xing, Info or VBRI index', () => {
    const data = concat(
      createFrame([0xff, 0xfb, 0x90, 0x64], 417),
      createFrame([0xff, 0xfb, 0xa0, 0x64], 522),
      createFrame([0xff, 0xfb, 0x90, 0x64], 417)
    )

    expect(() => parseMP3Metadata(data, data.length)).toThrow(
      'VBR MP3 requires a Xing, Info, or VBRI seek header'
    )
  })

  test('limits a partial VBRI final entry to the declared frame count', () => {
    const first = createFrame([0xff, 0xfb, 0x90, 0x64], 417)
    first.set([0x56, 0x42, 0x52, 0x49], 36)
    writeUint32(first, 46, 125000)
    writeUint32(first, 50, 1250)
    writeUint16(first, 54, 3)
    writeUint16(first, 56, 1)
    writeUint16(first, 58, 2)
    writeUint16(first, 60, 500)
    writeUint16(first, 62, 50000)
    writeUint16(first, 64, 50000)
    writeUint16(first, 66, 25000)
    const data = concat(first, createFrame([0xff, 0xfb, 0x90, 0x64], 417))

    const metadata = parseMP3Metadata(data, 125000)

    expect(metadata.seekPoints?.[3].time).toBe(metadata.duration)
    expect(timeToByteOffset(metadata, metadata.duration * 0.9)).toBe(112500)
  })

  test('detects bitrate changes after the first 32 scanned frames', () => {
    const data = concat(
      ...Array.from({ length: 32 }, () => createFrame([0xff, 0xfb, 0x90, 0x64], 417)),
      createFrame([0xff, 0xfb, 0xa0, 0x64], 522)
    )

    expect(scanMP3Frames(data)).toHaveLength(33)
    expect(() => parseMP3Metadata(data, data.length)).toThrow(
      'VBR MP3 requires a Xing, Info, or VBRI seek header'
    )
  })

  test('does not treat MPEG Audio Layer II as MP3', () => {
    const layer2 = createFrame([0xff, 0xfd, 0x80, 0x00], 417)
    expect(parseFrameHeader(layer2, 0)).toBeUndefined()
  })
})
