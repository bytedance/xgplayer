import { Playlist } from '../src/hls/playlist'
import { MasterPlaylist, MasterStream, MediaPlaylist, MediaSegment } from '../src/hls/manifest-loader/parser/model'

describe('Playlist', () => {

  test('empty playlist', () => {
    const playlist = new Playlist()

    expect(playlist.lastSegment).toBe(undefined)
    expect(playlist.currentLevel).toBe(undefined)
    expect(playlist.prevSegment).toBe(undefined)
    expect(playlist.currentSegment).toBe(undefined)
    expect(playlist.currentSegments).toBe(undefined)
    expect(playlist.liveEdge).toBe(undefined)
    expect(playlist.seekRange).toBe(undefined)
    expect(playlist.streams).toEqual([])
  })

  test('upsert and reset master playlist', () => {
    const playlist = new Playlist({})

    const master = new MasterPlaylist()
    const masterStream1 = new MasterStream()
    const masterStream2 = new MasterStream()

    masterStream1.url = 'url1'
    masterStream2.url = 'url2'
    masterStream1.bitrate = 1
    masterStream2.bitrate = 2
    master.streams.push(masterStream1)
    master.streams.push(masterStream2)

    playlist.upsertPlaylist(master)

    expect(playlist.streams.length).toBe(2)
    expect(playlist.currentStream.url).toBe(masterStream1.url)
    expect(playlist.currentStream.bitrate).toBe(masterStream1.bitrate)
    expect(playlist.currentSegments).toEqual([])
    expect(playlist.seekRange).toBe(undefined)

    masterStream1.url = 'url11'
    masterStream1.bitrate = 11

    playlist.upsertPlaylist(master)
    expect(playlist.streams.length).toBe(2)
    expect(playlist.currentStream.url).toBe(masterStream1.url)
    expect(playlist.currentStream.bitrate).toBe(masterStream1.bitrate)
    expect(playlist.currentSegments).toEqual([])
    expect(playlist.seekRange).toBe(undefined)

    playlist.reset()

    expect(playlist.streams.length).toBe(0)
    expect(playlist.currentStream).toBe(null)
    expect(playlist.currentSegments).toBe(undefined)
  })

  test('upsert media playlist and segments', () => {
    const playlist = new Playlist({ isLive: true })

    const media = new MediaPlaylist()
    media.endSN = 2
    media.segments = [
      { url: '1', start: 0, duration: 10 },
      { url: '2', start: 10, duration: 10 },
      { url: '3', start: 20, duration: 10 }
    ].map((x, i) => {
      const seg = new MediaSegment()
      seg.url = x.url
      seg.start = x.start
      seg.duration = x.duration
      seg.sn = i
      return seg
    })

    playlist.upsertPlaylist(media)

    expect(playlist.lastSegment).toEqual(media.segments[2])
    expect(playlist.nextSegment).toEqual(media.segments[0])
    expect(playlist.prevSegment).toBe(undefined)
    expect(playlist.currentSegments).toEqual(media.segments)
    expect(playlist.currentStream.segments).toEqual(media.segments)
    expect(playlist.seekRange).toEqual([0, 30])

    const media2 = new MediaPlaylist()
    media2.endSN = 5
    media2.segments.push(...[
      { url: '4', start: 0, duration: 10 },
      { url: '5', start: 10, duration: 10 },
      { url: '6', start: 20, duration: 10 }
    ].map((x, i) => {
      const seg = new MediaSegment()
      seg.url = x.url
      seg.start = x.start
      seg.duration = x.duration
      seg.sn = i + 3
      return seg
    }))

    playlist.upsertPlaylist(media2)

    expect(playlist.lastSegment).toEqual(media2.segments[2])
    expect(playlist.lastSegment.end).toEqual(60)
    expect(playlist.nextSegment).toEqual(media.segments[0])
    expect(playlist.prevSegment).toBe(undefined)
    expect(playlist.currentSegments).toEqual(media.segments.concat(media2.segments))
    expect(playlist.currentStream.segments).toEqual(media.segments.concat(media2.segments))
    expect(playlist.seekRange).toEqual([0, 60])

    expect(playlist.findSegmentIndexByTime(0)).toEqual(0)
    expect(playlist.findSegmentIndexByTime(10)).toEqual(1)
    expect(playlist.findSegmentIndexByTime(60)).toEqual(5)
    expect(playlist.findSegmentIndexByTime(62)).toBe(undefined)
    expect(playlist.findSegmentIndexByTime(-1)).toBe(undefined)
    expect(playlist.getSegmentByIndex(-1)).toBe(undefined)
    expect(playlist.getSegmentByIndex(6)).toBe(undefined)
    expect(playlist.getSegmentByIndex(3)).toBe(media2.segments[0])
    
    playlist.moveSegmentPointer()
    expect(playlist.nextSegment).toEqual(media.segments[1])
    playlist.moveSegmentPointer(2)
    expect(playlist.currentSegment).toEqual(media.segments[2])
    playlist.moveSegmentPointer(-1)
    expect(playlist.nextSegment).toBe(media.segments[0])

    playlist.moveSegmentPointer(2)

    playlist.reset()
    expect(playlist.lastSegment).toBe(undefined)
    expect(playlist.currentLevel).toBe(undefined)
    expect(playlist.prevSegment).toBe(undefined)
    expect(playlist.currentSegment).toBe(undefined)
    expect(playlist.currentSegments).toBe(undefined)
    expect(playlist.liveEdge).toBe(undefined)
    expect(playlist.seekRange).toBe(undefined)
    expect(playlist.streams).toEqual([])
  })

})
