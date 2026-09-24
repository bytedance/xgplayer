jest.mock('../src/util/xhr', () => jest.fn())

import mockXHR from '../src/util/xhr'
import MPD from '../src/m4s/mpd'
import util from '../src/util'

const waitForReady = (mpd) => new Promise(resolve => mpd.once('ready', resolve))

describe('MPD SegmentList parsing', () => {
  beforeEach(() => {
    mockXHR.mockReset()
  })

  test('uses sourceURL and media attributes when SegmentList points to separate files', async () => {
    mockXHR.mockResolvedValue({
      responseText: `<?xml version="1.0" encoding="UTF-8"?>
        <MPD type="static" mediaPresentationDuration="PT6S">
          <Period>
            <AdaptationSet mimeType="video/mp4" codecs="avc1.4d401e" width="640" height="360" bandwidth="1000">
              <Representation id="video">
                <SegmentList timescale="1" duration="2">
                  <Initialization sourceURL="init-$RepresentationID$.mp4" range="0-99" />
                  <SegmentURL media="seg-1.m4s" mediaRange="100-199" />
                  <SegmentURL media="https://cdn.example.com/seg-2.m4s" mediaRange="200-299" />
                  <SegmentURL media="seg-3.m4s" mediaRange="300-399" />
                </SegmentList>
              </Representation>
            </AdaptationSet>
          </Period>
        </MPD>`
    })

    const mpd = new MPD('https://example.com/live/manifest.mpd')
    await waitForReady(mpd)

    const video = mpd.mediaList.video[0]

    expect(video.initSegment).toBe('https://example.com/live/init-video.mp4')
    expect(video.initSegmentRange).toEqual([0, 99])
    expect(video.mediaSegments.map(item => item.url)).toEqual([
      'https://example.com/live/seg-1.m4s',
      'https://cdn.example.com/seg-2.m4s',
      'https://example.com/live/seg-3.m4s'
    ])
    expect(video.mediaSegments.map(item => item.range)).toEqual([
      [100, 199],
      [200, 299],
      [300, 399]
    ])
  })

  test('falls back to the representation base URL for byte-range SegmentLists', async () => {
    mockXHR.mockResolvedValue({
      responseText: `<?xml version="1.0" encoding="UTF-8"?>
        <MPD type="static" mediaPresentationDuration="PT6S">
          <Period>
            <AdaptationSet mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000">
              <Representation id="audio">
                <BaseURL>audio-track.mp4</BaseURL>
                <SegmentList timescale="1" duration="2">
                  <Initialization range="0-49" />
                  <SegmentURL mediaRange="50-149" />
                  <SegmentURL mediaRange="150-249" />
                  <SegmentURL mediaRange="250-349" />
                </SegmentList>
              </Representation>
            </AdaptationSet>
          </Period>
        </MPD>`
    })

    const mpd = new MPD('https://example.com/live/manifest.mpd')
    await waitForReady(mpd)

    const audio = mpd.mediaList.audio[0]

    expect(audio.initSegment).toBe('https://example.com/live/audio-track.mp4')
    expect(audio.initSegmentRange).toEqual([0, 49])
    expect(audio.mediaSegments.every(item => item.url === 'https://example.com/live/audio-track.mp4')).toBe(true)
    expect(audio.mediaSegments.map(item => item.range)).toEqual([
      [50, 149],
      [150, 249],
      [250, 349]
    ])
  })
})

describe('util.durationConvert', () => {
  test('converts ISO 8601 durations with any combination of H, M and S', () => {
    expect(util.durationConvert('PT1H2M3.5S')).toBe(3723.5)
    expect(util.durationConvert('PT2M3S')).toBe(123)
    expect(util.durationConvert('PT6S')).toBe(6)
    expect(util.durationConvert('PT2M')).toBe(120)
    expect(util.durationConvert('PT1H')).toBe(3600)
    expect(util.durationConvert('PT1H30M')).toBe(5400)
    expect(util.durationConvert('PT1H5S')).toBe(3605)
  })
})
