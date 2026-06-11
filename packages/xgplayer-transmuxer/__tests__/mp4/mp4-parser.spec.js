import { registerVideoCodec, unregisterVideoCodec } from '../../src/codec'
import { VideoTrack } from '../../src/model'
import { MP4Parser } from '../../src/mp4/mp4-parser'

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
})
