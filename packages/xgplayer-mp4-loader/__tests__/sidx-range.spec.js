import MP4Loader from '../src'
import { sidxToSegments } from '../src/utils'

const URL = 'https://example.com/fragmented.mp4'

describe('MP4Loader SIDX ranges', () => {
  test('converts referenced sizes to inclusive HTTP byte ranges', async () => {
    const segments = sidxToSegments(
      {
        trak: [
          {
            mdia: {
              hdlr: { handlerType: 'vide' }
            }
          }
        ]
      },
      {
        start: 100,
        size: 20,
        timescale: 1000,
        references: [
          { referenced_size: 16, subsegment_duration: 1000 },
          { referenced_size: 8, subsegment_duration: 1000 }
        ]
      }
    )
    const loader = new MP4Loader({ url: URL })
    loader.videoSegments = segments.videoSegments
    loader.audioSegments = segments.audioSegments
    loader._loader.load = jest.fn().mockResolvedValue({
      data: new Uint8Array([1]),
      options: { range: segments.videoSegments[0].range }
    })

    await loader.loadSegmentByTime(0)

    expect(segments.videoSegments.map((segment) => segment.range)).toEqual([
      [120, 135],
      [136, 143]
    ])
    expect(loader._loader.load).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({ range: [120, 135] })
    )
    await loader.destroy()
  })
})
