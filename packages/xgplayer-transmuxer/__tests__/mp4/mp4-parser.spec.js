import { registerVideoCodec, unregisterVideoCodec } from '../../src/codec'
import { VideoTrack } from '../../src/model'
import { getAudioSampleRate, MP4Parser } from '../../src/mp4/mp4-parser'

function mp4Box (type, payload) {
  const data = new Uint8Array(8 + payload.length)
  data[0] = (data.length >>> 24) & 0xff
  data[1] = (data.length >>> 16) & 0xff
  data[2] = (data.length >>> 8) & 0xff
  data[3] = data.length & 0xff
  for (let i = 0; i < 4; i++) {
    data[4 + i] = type.charCodeAt(i)
  }
  data.set(payload, 8)
  return {
    start: 0,
    size: data.length,
    headerSize: 8,
    type,
    data
  }
}

function videoMoov (entries) {
  return {
    mvhd: {
      duration: 1000,
      timescale: 1000
    },
    trak: [{
      tkhd: {
        trackId: 1,
        duration: 1000
      },
      mdia: {
        hdlr: {
          handlerType: 'vide'
        },
        mdhd: {
          duration: 90000,
          timescale: 90000
        },
        minf: {
          stbl: {
            stsd: {
              entries
            }
          }
        }
      }
    }]
  }
}

describe('MP4Parser', () => {
  afterEach(() => {
    unregisterVideoCodec('missing-apply-codec')
  })

  test('throws a clear error when video stsd has no parsed entry', () => {
    expect(() => {
      MP4Parser.moovToTrack(videoMoov([]), new VideoTrack())
    }).toThrow('unknown video stsd entry')
  })

  test('throws a clear error when registered video codec cannot apply track config', () => {
    registerVideoCodec({
      id: 'missing-apply-codec',
      kind: 'video',
      sampleEntries: ['mpla'],
      configBoxes: ['mplC']
    })

    expect(() => {
      MP4Parser.moovToTrack(videoMoov([{
        type: 'mpla',
        width: 1920,
        height: 1080,
        vvcC: {
          data: new Uint8Array()
        }
      }]), new VideoTrack())
    }).toThrow('video codec parser is not registered: mpla')
  })

  test('parses AV1 ICC color profile payload', () => {
    const parsed = MP4Parser.colr(mp4Box('colr', new Uint8Array([
      0x72, 0x49, 0x43, 0x43,
      0x01, 0x02, 0x03
    ])))

    expect(parsed.colorType).toBe('rICC')
    expect(Array.from(parsed.iccProfile)).toEqual([1, 2, 3])
  })

  test('uses AV1 profile when deriving 12-bit codec strings', () => {
    const parsed = MP4Parser.av1C(mp4Box('av1C', new Uint8Array([
      0x81,
      0x48,
      0x6c,
      0x00
    ])))

    expect(parsed.codec).toBe('av01.2.08M.12')
  })

  test('falls back to zero for mp4a entries without sample rate data', () => {
    expect(getAudioSampleRate({
      type: 'mp4a',
      sampleRate: 0
    })).toBe(0)
  })
})
