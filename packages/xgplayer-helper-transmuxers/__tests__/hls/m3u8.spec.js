import M3U8Parser from '../../src/hls/m3u8/index'

describe('m3u8 parser', () => {

  test('No #EXTM3U', () => {
    expect(() => {
      M3U8Parser.parse('')
    }).toThrow('Invalid m3u8 file')
  })

  test('Master Playlist', () => {
    const ret = M3U8Parser.parse(`
    #EXTM3U
    #EXT-X-VERSION:1
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=836280,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=848x360,NAME="480"
    /sec()/mp4_h264_aac_hq.m3u8
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=836280,CODECS="mp4a.40.2,avc1.64001f",RESOLUTION=848x360,NAME="480"
    158282701_mp4_h264_aac_hq.m3u8?test=2&test2=3#hh
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=246440,CODECS="mp4a.40.5,avc1.42000d",RESOLUTION=320x136,NAME="240"
    http://xg.xg.com/video/107/282/158282701_mp4_h264_aac_ld.m3u8
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=246440,CODECS="mp4a.40.5,avc1.42000d",RESOLUTION=320x136,NAME="240"
    https://xg.com/video/107/282/158282701_mp4_h264_aac_ld.m3u8
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=460560,CODECS="mp4a.40.5,avc1.420016",RESOLUTION=512x216,NAME="380"
    video/video/158282701_mp4_h264_aac.m3u8
    #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=460560,CODECS="mp4a.40.5,avc1.420016",RESOLUTION=512x216,NAME="380"
    //xg.com/video/107/282/158282701_mp4_h264_aac.m3u8
    `,
    'http://xg.com/video/a.m3u8?query=a#hash')

    expect(ret.version).toBe(1)
    expect(ret.streams.length).toBe(6)

    expect(ret.streams[0].bitrate).toBe(836280)
    expect(ret.streams[1].bitrate).toBe(836280)
    expect(ret.streams[2].bitrate).toBe(246440)
    expect(ret.streams[3].bitrate).toBe(246440)
    expect(ret.streams[4].bitrate).toBe(460560)
    expect(ret.streams[5].bitrate).toBe(460560)

    expect(ret.streams[0].width).toBe(848)
    expect(ret.streams[1].width).toBe(848)
    expect(ret.streams[2].width).toBe(320)
    expect(ret.streams[3].width).toBe(320)
    expect(ret.streams[4].width).toBe(512)
    expect(ret.streams[5].width).toBe(512)

    expect(ret.streams[0].height).toBe(360)
    expect(ret.streams[1].height).toBe(360)
    expect(ret.streams[2].height).toBe(136)
    expect(ret.streams[3].height).toBe(136)
    expect(ret.streams[4].height).toBe(216)
    expect(ret.streams[5].height).toBe(216)

    expect(ret.streams[0].url).toBe('http://xg.com/sec()/mp4_h264_aac_hq.m3u8')
    expect(ret.streams[1].url).toBe('http://xg.com/video/158282701_mp4_h264_aac_hq.m3u8?test=2&test2=3#hh')
    expect(ret.streams[2].url).toBe('http://xg.xg.com/video/107/282/158282701_mp4_h264_aac_ld.m3u8')
    expect(ret.streams[3].url).toBe('https://xg.com/video/107/282/158282701_mp4_h264_aac_ld.m3u8')
    expect(ret.streams[4].url).toBe('http://xg.com/video/video/video/158282701_mp4_h264_aac.m3u8')
    expect(ret.streams[5].url).toBe('//xg.com/video/107/282/158282701_mp4_h264_aac.m3u8')

    expect(ret.streams[0].audioCodec).toBe('mp4a.40.2')
    expect(ret.streams[1].audioCodec).toBe('mp4a.40.2')
    expect(ret.streams[2].audioCodec).toBe('mp4a.40.5')
    expect(ret.streams[3].audioCodec).toBe('mp4a.40.5')
    expect(ret.streams[4].audioCodec).toBe('mp4a.40.5')
    expect(ret.streams[5].audioCodec).toBe('mp4a.40.5')

    expect(ret.streams[0].videoCodec).toBe('avc1.64001f')
    expect(ret.streams[1].videoCodec).toBe('avc1.64001f')
    expect(ret.streams[2].videoCodec).toBe('avc1.42000d')
    expect(ret.streams[3].videoCodec).toBe('avc1.42000d')
    expect(ret.streams[4].videoCodec).toBe('avc1.420016')
    expect(ret.streams[5].videoCodec).toBe('avc1.420016')

    expect(ret.streams[0].textCodec).toBe(undefined)
    expect(ret.streams[1].textCodec).toBe(undefined)
    expect(ret.streams[2].textCodec).toBe(undefined)
    expect(ret.streams[3].textCodec).toBe(undefined)
    expect(ret.streams[4].textCodec).toBe(undefined)
    expect(ret.streams[5].textCodec).toBe(undefined)

    expect(ret.streams[0].name).toBe('480')
    expect(ret.streams[1].name).toBe('480')
    expect(ret.streams[2].name).toBe('240')
    expect(ret.streams[3].name).toBe('240')
    expect(ret.streams[4].name).toBe('380')
    expect(ret.streams[5].name).toBe('380')
  })

  test('Media Playlist', () => {
    const ret = M3U8Parser.parse(`
    # comment
    #EX-EXT-X-PLAYLIST-TYPE:common
    #EXTM3U
    # comment
    #EXT-X-VERSION:3
    #EXT-X-PLAYLIST-TYPE:VOD
    #EXT-X-MEDIA-SEQUENCE:7794
    #EXT-X-DISCONTINUITY-SEQUENCE:20
    #EXT-X-TARGETDURATION:15
 
    #EXT-X-KEY:METHOD=AES-128,URI="/key.php?r=52",KEYFORMATVERSIONS="1/2",KEYFORMAT="id",IV=0x7c3cb56562d0a10827489996dead35eb
    
    # comment
    # comment
    # comment
    #comment
    #comment
    #EXTINF:2.833,
    #EXT-X-BYTERANGE:143068@1039452
    //xg.com/fileSequence52-A.ts
    #EXT-X-BYTERANGE:96256@943196
    #EXTINF:15.0,
    /fileSequence52-B.ts
    #EXT-X-BYTERANGE:140060@803136
    #EXTINF:13.333,
    fileSequence52-C.ts
    
    #EXT-X-MAP:URI="main.mp4",BYTERANGE="718@0"
    #EXT-X-KEY:METHOD=AES-128,URI="key.php?r=53",KEYFORMATVERSIONS="1"
    #EXT-X-DISCONTINUITY
    #EXT-X-BYTERANGE:96256
    #EXTINF:15.0,
    https://xg.com/fileSequence53-A.ts
    #EXT-X-KEY:METHOD=SAMPLE-AES,URI="key.php?r=53",KEYFORMATVERSIONS="1"
    #EXT-X-BYTERANGE:143068
    #EXTINF:15.123,title
    fileSequence53-b.ts
    #EXT-X-ENDLIST
    `,
    'https://test/video')

    expect(ret.version).toBe(3)
    expect(ret.type).toBe('VOD')
    expect(ret.live).toBe(false)
    expect(ret.targetDuration).toBe(15000)
    expect(ret.totalDuration).toBe(2.833*1000+15*1000+13.333*1000+15*1000+15.123*1000)
    expect(ret.startSN).toBe(7794)
    expect(ret.endSN).toBe(7798)
    expect(ret.startCC).toBe(20)
    expect(ret.endCC).toBe(21)
    expect(ret.segments.length).toBe(5)

    expect(ret.segments[0].sn).toBe(7794)
    expect(ret.segments[1].sn).toBe(7795)
    expect(ret.segments[2].sn).toBe(7796)
    expect(ret.segments[3].sn).toBe(7797)
    expect(ret.segments[4].sn).toBe(7798)

    expect(ret.segments[0].cc).toBe(20)
    expect(ret.segments[1].cc).toBe(20)
    expect(ret.segments[2].cc).toBe(20)
    expect(ret.segments[3].cc).toBe(21)
    expect(ret.segments[4].cc).toBe(21)

    expect(ret.segments[0].duration).toBe(2.833 * 1000)
    expect(ret.segments[1].duration).toBe(15 * 1000)
    expect(ret.segments[2].duration).toBe(13.333 * 1000)
    expect(ret.segments[3].duration).toBe(15 * 1000)
    expect(ret.segments[4].duration).toBe(15.123 * 1000)

    expect(ret.segments[0].start).toBe(0)
    expect(ret.segments[1].start).toBe(2.833 * 1000)
    expect(ret.segments[2].start).toBe(2.833 * 1000+15 * 1000)
    expect(ret.segments[3].start).toBe(2.833 * 1000+15 * 1000+13.333 * 1000)
    expect(ret.segments[4].start).toBe(2.833 * 1000+15 * 1000+13.333 * 1000+15 * 1000)

    expect(ret.segments[0].isLast).toBe(false)
    expect(ret.segments[1].isLast).toBe(false)
    expect(ret.segments[2].isLast).toBe(false)
    expect(ret.segments[3].isLast).toBe(false)
    expect(ret.segments[4].isLast).toBe(true)

    expect(ret.segments[0].url).toBe('//xg.com/fileSequence52-A.ts')
    expect(ret.segments[1].url).toBe('https://test/fileSequence52-B.ts')
    expect(ret.segments[2].url).toBe('https://test/fileSequence52-C.ts')
    expect(ret.segments[3].url).toBe('https://xg.com/fileSequence53-A.ts')
    expect(ret.segments[4].url).toBe('https://test/fileSequence53-b.ts')

    expect(ret.segments[0].byteRange).toEqual([1039452, 1039452+143068])
    expect(ret.segments[1].byteRange).toEqual([943196, 943196+96256])
    expect(ret.segments[2].byteRange).toEqual([803136, 803136+140060])
    expect(ret.segments[3].byteRange).toEqual([803136+140060, 803136+140060+96256])
    expect(ret.segments[4].byteRange).toEqual([803136+140060+96256, 803136+140060+96256+143068])

    expect(ret.segments[0].isInitSegment).toBe(false)
    expect(ret.segments[1].isInitSegment).toBe(false)
    expect(ret.segments[2].isInitSegment).toBe(false)
    expect(ret.segments[3].isInitSegment).toBe(false)
    expect(ret.segments[4].isInitSegment).toBe(false)

    expect(ret.segments[0].title).toBe('')
    expect(ret.segments[1].title).toBe('')
    expect(ret.segments[2].title).toBe('')
    expect(ret.segments[3].title).toBe('')
    expect(ret.segments[4].title).toBe('title')

    const initSegment = ret.segments[3].initSegment
    expect(initSegment.url).toBe('https://test/main.mp4')
    expect(initSegment.isInitSegment).toBe(true)
    expect(initSegment.byteRange).toEqual([0, 718])

    expect(ret.segments[0].key.method).toBe('AES-128')
    expect(ret.segments[1].key.method).toBe('AES-128')
    expect(ret.segments[2].key.method).toBe('AES-128')
    expect(ret.segments[3].key.method).toBe('AES-128')
    expect(ret.segments[4].key.method).toBe('SAMPLE-AES')

    expect(ret.segments[0].key.url).toBe('https://test/key.php?r=52')
    expect(ret.segments[1].key.url).toBe('https://test/key.php?r=52')
    expect(ret.segments[2].key.url).toBe('https://test/key.php?r=52')
    expect(ret.segments[3].key.url).toBe('https://test/key.php?r=53')
    expect(ret.segments[4].key.url).toBe('https://test/key.php?r=53')

    expect(ret.segments[0].key.keyFormat).toBe('id')
    expect(ret.segments[1].key.keyFormat).toBe('id')
    expect(ret.segments[2].key.keyFormat).toBe('id')
    expect(ret.segments[3].key.keyFormat).toBe('identity')
    expect(ret.segments[4].key.keyFormat).toBe('identity')

    expect(ret.segments[0].key.keyFormatVersions).toBe('1/2')
    expect(ret.segments[1].key.keyFormatVersions).toBe('1/2')
    expect(ret.segments[2].key.keyFormatVersions).toBe('1/2')
    expect(ret.segments[3].key.keyFormatVersions).toBe('1')
    expect(ret.segments[4].key.keyFormatVersions).toBe('1')
    
    const iv = new Uint8Array('7c 3c b5 65 62 d0 a1 08 27 48 99 96 de ad 35 eb'.split(' ').map(x => parseInt(x, 16)))
    expect(ret.segments[0].key.iv).toEqual(iv)
    expect(ret.segments[1].key.iv).toEqual(iv)
    expect(ret.segments[2].key.iv).toEqual(iv)
    expect(ret.segments[3].key.iv).toEqual(new Uint8Array([...Array(14).fill(0), 0x1e, 0x75])) // 7797
    expect(ret.segments[4].key.iv).toBe(null)
  })

})
