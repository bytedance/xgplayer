import Buffer from './buffer'
const UINT32_MAX = Math.pow(2, 32) - 1
class FMP4 {
  static type (name) {
    return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)])
  }

  static size (value) {
    return Buffer.writeUint32(value)
  }

  static extension (version, flag) {
    return new Uint8Array([
      version,
      (flag >> 16) & 0xff,
      (flag >> 8) & 0xff,
      flag & 0xff
    ])
  }

  static ftyp () {
    const buffer = new Buffer()
    buffer.write(FMP4.size(28), FMP4.type('ftyp'), new Uint8Array([
      0x69, 0x73, 0x6F, 0x35, // iso5,
      0x00, 0x00, 0x00, 0x01, // minor_version: 0x00
      0x4D, 0x34, 0x41, 0x20, // M4A,
      0x69, 0x73, 0x6F, 0x35, // iso5,
      0x64, 0x61, 0x73, 0x68 // dash
    ]))
    return buffer.buffer
  }

  static moov (data) {
    const buffer = new Buffer(); let size = 8

    const mvhd = FMP4.mvhd(data.duration, data.timeScale)
    const trak = FMP4.audioTrak(data)
    const mvex = FMP4.mvex(data.duration, data.timeScale)
    const udtaBuffer = new Buffer()
    const bytes = new Uint8Array([
      0x00, 0x00, 0x00, 0x55, 0x75, 0x64, 0x74, 0x61, 0x00, 0x00, 0x00, 0x4D, 0x6D, 0x65, 0x74, 0x61,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x68, 0x64, 0x6C, 0x72, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x6D, 0x64, 0x69, 0x72, 0x61, 0x70, 0x70, 0x6C, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x69, 0x6C, 0x73, 0x74, 0x00, 0x00, 0x00,
      0x0C, 0x2D, 0x2D, 0x2D, 0x2D, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x2D, 0x2D, 0x2D,
      0x2D, 0x00, 0x00, 0x00, 0x00
    ])
    udtaBuffer.write(new Uint8Array(bytes))
    const udta = udtaBuffer.buffer;
    [mvhd, trak, mvex, udta].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('moov'), mvhd, mvex, trak, udta)
    return buffer.buffer
  }

  static mvhd (duration, timeScale) {
    const buffer = new Buffer()
    duration *= timeScale
    duration = 0
    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    const bytes = new Uint8Array([
      0x01, // version 1
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      (timeScale >> 24) & 0xff,
      (timeScale >> 16) & 0xff,
      (timeScale >> 8) & 0xff,
      timeScale & 0xff, // timeScale
      (upperWordDuration >> 24),
      (upperWordDuration >> 16) & 0xff,
      (upperWordDuration >> 8) & 0xff,
      upperWordDuration & 0xff,
      (lowerWordDuration >> 24),
      (lowerWordDuration >> 16) & 0xff,
      (lowerWordDuration >> 8) & 0xff,
      lowerWordDuration & 0xff,
      0x00, 0x01, 0x00, 0x00, // 1.0 rate
      0x01, 0x00, // 1.0 volume
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0xff, 0xff, 0xff, 0xff // next_track_ID
    ])
    buffer.write(FMP4.size(8 + bytes.length), FMP4.type('mvhd'), new Uint8Array(bytes))
    return buffer.buffer
  }

  static audioTrak (data) {
    const buffer = new Buffer(); let size = 8
    const tkhd = FMP4.tkhd({
      id: 1,
      duration: data.audioDuration,
      timeScale: data.audioTimeScale,
      width: 0,
      height: 0,
      type: 'audio'
    })
    const mdia = FMP4.mdia({
      type: 'audio',
      timeScale: data.audioTimeScale,
      duration: data.audioDuration,
      channelCount: data.channelCount,
      sampleRate: data.sampleRate,
      audioConfig: data.audioConfig
    })
    const udtaBuffer = new Buffer()
    const bytes = new Uint8Array([
      0x00, 0x00, 0x00, 0x2C,
      0x6C, 0x75, 0x64, 0x74,
      0x00, 0x00, 0x00, 0x24,
      0x74, 0x6C, 0x6F, 0x75,
      0x01, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x00, 0x00,
      0x48, 0x54, 0x84, 0x23,
      0x05, 0x01, 0x72, 0x23,
      0x03, 0x72, 0x13, 0x04,
      0x7D, 0x13, 0x05, 0x73,
      0x13, 0x06, 0x04, 0x13
    ])
    udtaBuffer.write(FMP4.size(52), FMP4.type('udta'), new Uint8Array(bytes))
    const udta = udtaBuffer.buffer;
    [tkhd, mdia, udta].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('trak'), tkhd, mdia, udta)
    return buffer.buffer
  }

  static tkhd (data) {
    const buffer = new Buffer()
    const id = data.id
    let duration = data.duration * data.timeScale
    duration = 0
    const width = 0

    const height = 0

    const type = data.type

    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))

    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    const content = new Uint8Array([
      0x01, // version 1
      0x00, 0x00, 0x07, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      (id >> 24) & 0xff,
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      id & 0xff, // track_ID
      0x00, 0x00, 0x00, 0x00, // reserved
      (upperWordDuration >> 24),
      (upperWordDuration >> 16) & 0xff,
      (upperWordDuration >> 8) & 0xff,
      upperWordDuration & 0xff,
      (lowerWordDuration >> 24),
      (lowerWordDuration >> 16) & 0xff,
      (lowerWordDuration >> 8) & 0xff,
      lowerWordDuration & 0xff,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, // layer
      0x00, type === 'video' ? 0x01 : 0x00, // alternate_group
      type === 'audio' ? 0x01 : 0x00, 0x00, // non-audio track volume
      0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      (width >> 8) & 0xff,
      width & 0xff,
      0x00, 0x00, // width
      (height >> 8) & 0xff,
      height & 0xff,
      0x00, 0x00 // height
    ])
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('tkhd'), content)
    return buffer.buffer
  }

  static edts (data) {
    const buffer = new Buffer(); const duration = data.duration; const mediaTime = data.mediaTime
    buffer.write(FMP4.size(36), FMP4.type('edts'))
    // elst
    buffer.write(FMP4.size(28), FMP4.type('elst'))
    buffer.write(new Uint8Array([
      0x00, 0x00, 0x00, 0x01, // entry count
      (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff,
      (mediaTime >> 24) & 0xff, (mediaTime >> 16) & 0xff, (mediaTime >> 8) & 0xff, mediaTime & 0xff,
      0x00, 0x00, 0x00, 0x01 // media rate
    ]))
    return buffer.buffer
  }

  static mdia (data) {
    const buffer = new Buffer(); let size = 8
    const mdhd = FMP4.mdhd(data.timeScale)
    const hdlr = FMP4.hdlr(data.type)
    const minf = FMP4.minf(data);
    [mdhd, hdlr, minf].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('mdia'), mdhd, hdlr, minf)
    return buffer.buffer
  }

  static mdhd (timeScale, duration = 0) {
    const buffer = new Buffer()
    duration *= timeScale
    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    const content = new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      (timeScale >> 24) & 0xff, (timeScale >> 16) & 0xff, (timeScale >> 8) & 0xff, timeScale & 0xff,
      (upperWordDuration >> 24),
      (upperWordDuration >> 16) & 0xff,
      (upperWordDuration >> 8) & 0xff,
      upperWordDuration & 0xff,
      (lowerWordDuration >> 24),
      (lowerWordDuration >> 16) & 0xff,
      (lowerWordDuration >> 8) & 0xff,
      lowerWordDuration & 0xff,
      0x55, 0xc4, // 'und' language
      0x00, 0x00
    ])
    buffer.write(FMP4.size(12 + content.byteLength), FMP4.type('mdhd'), FMP4.extension(1, 0), content)
    return buffer.buffer
  }

  static hdlr (type) {
    const buffer = new Buffer()
    const value = [0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x56, 0x69, 0x64, 0x65,
      0x6f, 0x48, 0x61, 0x6e,
      0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]
    if (type === 'audio') {
      value.splice(8, 4, ...[0x73, 0x6f, 0x75, 0x6e])
      value.splice(24, 13, ...[0x53, 0x6f, 0x75, 0x6e,
        0x64, 0x48, 0x61, 0x6e,
        0x64, 0x6c, 0x65, 0x72, 0x00])
    }
    buffer.write(FMP4.size(8 + value.length), FMP4.type('hdlr'), new Uint8Array(value))
    return buffer.buffer
  }

  static minf (data) {
    const buffer = new Buffer(); let size = 8
    const vmhd = data.type === 'video' ? FMP4.vmhd() : FMP4.smhd()
    const dinf = FMP4.dinf()
    const stbl = FMP4.stbl(data);
    [vmhd, dinf, stbl].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('minf'), vmhd, dinf, stbl)
    return buffer.buffer
  }

  static vmhd () {
    const buffer = new Buffer()
    buffer.write(FMP4.size(20), FMP4.type('vmhd'), new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x01, // flags
      0x00, 0x00, // graphicsmode
      0x00, 0x00,
      0x00, 0x00,
      0x00, 0x00 // opcolor
    ]))
    return buffer.buffer
  }

  static smhd () {
    const buffer = new Buffer()
    buffer.write(FMP4.size(16), FMP4.type('smhd'), new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
    ]))
    return buffer.buffer
  }

  static dinf () {
    const buffer = new Buffer()
    const dref = [0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // entry_count
      0x00, 0x00, 0x00, 0x0c, // entry_size
      0x75, 0x72, 0x6c, 0x20, // 'url' type
      0x00, // version 0
      0x00, 0x00, 0x01 // entry_flags
    ]
    buffer.write(FMP4.size(36), FMP4.type('dinf'), FMP4.size(28), FMP4.type('dref'), new Uint8Array(dref))
    return buffer.buffer
  }

  static stbl (data) {
    const buffer = new Buffer(); let size = 8
    const stsd = FMP4.stsd(data)
    const stts = FMP4.stts()
    const stsc = FMP4.stsc()
    const stsz = FMP4.stsz()
    const stco = FMP4.stco();
    [stsd, stts, stsc, stsz, stco].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('stbl'), stsd, stts, stsc, stsz, stco)
    return buffer.buffer
  }

  static stsd (data) {
    const buffer = new Buffer(); let content
    if (data.type === 'audio') {
      // if (!data.isAAC && data.codec === 'mp4') {
      //     content = FMP4.mp3(data);
      // } else {
      //
      // }
      // 支持mp4a
      content = FMP4.mp4a(data)
    } else {
      content = FMP4.avc1(data)
    }
    buffer.write(FMP4.size(16 + content.byteLength), FMP4.type('stsd'), FMP4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content)
    return buffer.buffer
  }

  static mp4a (data) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, data.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      (data.sampleRate >> 8) & 0xff,
      data.sampleRate & 0xff, //
      0x00, 0x00
    ])
    const esds = FMP4.esds(data.audioConfig)
    buffer.write(FMP4.size(8 + content.byteLength + esds.byteLength), FMP4.type('mp4a'), content, esds)
    return buffer.buffer
  }

  static esds (config = [43, 146, 8, 0]) {
    const configlen = config.length
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags

      0x03, // descriptor_type
      0x17 + configlen, // length
      0x00, 0x00, // es_id
      0x00, // stream_priority

      0x04, // descriptor_type
      0x0f + configlen, // length
      0x40, // codec : mpeg4_audio
      0x15, // stream_type
      0x00, 0x00, 0x00, // buffer_size
      0x00, 0x00, 0x00, 0x00, // maxBitrate
      0x00, 0x00, 0x00, 0x00, // avgBitrate

      0x05 // descriptor_type
    ].concat([configlen]).concat(config).concat([0x06, 0x01, 0x02]))
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('esds'), content)
    return buffer.buffer
  }

  static avc1 (data) {
    const buffer = new Buffer(); const size = 40// 8(avc1)+8(avcc)+8(btrt)+16(pasp)
    const sps = data.sps; const pps = data.pps; const width = data.width; const height = data.height; const hSpacing = data.pixelRatio[0]; const vSpacing = data.pixelRatio[1]
    const avcc = new Uint8Array([
      0x01, // version
      sps[1], // profile
      sps[2], // profile compatible
      sps[3], // level
      0xfc | 3,
      0xE0 | 1 // 目前只处理一个sps
    ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff]).concat(sps).concat(1).concat([pps.length >>> 8 & 0xff, pps.length & 0xff]).concat(pps))
    const avc1 = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      (width >> 8) & 0xff,
      width & 0xff, // width
      (height >> 8) & 0xff,
      height & 0xff, // height
      0x00, 0x48, 0x00, 0x00, // horizresolution
      0x00, 0x48, 0x00, 0x00, // vertresolution
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // frame_count
      0x12,
      0x64, 0x61, 0x69, 0x6C, // dailymotion/hls.js
      0x79, 0x6D, 0x6F, 0x74,
      0x69, 0x6F, 0x6E, 0x2F,
      0x68, 0x6C, 0x73, 0x2E,
      0x6A, 0x73, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // compressorname
      0x00, 0x18, // depth = 24
      0x11, 0x11]) // pre_defined = -1
    const btrt = new Uint8Array([
      0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
      0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
      0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
    ])
    const pasp = new Uint8Array([
      (hSpacing >> 24), // hSpacing
      (hSpacing >> 16) & 0xff,
      (hSpacing >> 8) & 0xff,
      hSpacing & 0xff,
      (vSpacing >> 24), // vSpacing
      (vSpacing >> 16) & 0xff,
      (vSpacing >> 8) & 0xff,
      vSpacing & 0xff
    ])

    buffer.write(
      FMP4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), FMP4.type('avc1'), avc1,
      FMP4.size(8 + avcc.byteLength), FMP4.type('avcC'), avcc,
      FMP4.size(20), FMP4.type('btrt'), btrt,
      FMP4.size(16), FMP4.type('pasp'), pasp
    )
    return buffer.buffer
  }

  static stts () {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stts'), content)
    return buffer.buffer
  }

  static stsc () {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stsc'), content)
    return buffer.buffer
  }

  static stco () {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stco'), content)
    return buffer.buffer
  }

  static stsz () {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
    ])
    buffer.write(FMP4.size(20), FMP4.type('stsz'), content)
    return buffer.buffer
  }

  static mvex (duration, timeScale) {
    const buffer = new Buffer(); let size = 8
    const mehd = FMP4.mehd(duration * timeScale)
    const trex = FMP4.trex(1)
    const trep = FMP4.trep(1);

    [mehd, trex, trep].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('mvex'), mehd, trex, trep)
    return buffer.buffer
  }

  static mehd (duration) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      (duration >> 24),
      (duration >> 16) & 0xff,
      (duration >> 8) & 0xff,
      (duration & 0xff)
    ])
    buffer.write(FMP4.size(16), FMP4.type('mehd'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }

  static trex (id) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      (id >> 24),
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      (id & 0xff), // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x04, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x1e, 0x84, 0x80 // default_sample_flags
    ])
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('trex'), content)
    return buffer.buffer
  }

  static trep (id) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      (id >> 24),
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      (id & 0xff) // track_ID
    ])
    buffer.write(FMP4.size(16), FMP4.type('trep'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }

  static moof (data) {
    const buffer = new Buffer(); let size = 8
    const mfhd = FMP4.mfhd()
    const traf = FMP4.traf(data);
    [mfhd, traf].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('moof'), mfhd, traf)
    return buffer.buffer
  }

  static mfhd () {
    const buffer = new Buffer()
    const content = Buffer.writeUint32(FMP4.sequence)
    FMP4.sequence += 1
    buffer.write(FMP4.size(16), FMP4.type('mfhd'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }

  static traf (data) {
    const buffer = new Buffer(); let size = 8
    const tfhd = FMP4.tfhd(1)
    const tfdt = FMP4.tfdt(data.time)
    const trun = FMP4.trun(data);
    [tfhd, tfdt, trun].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('traf'), tfhd, tfdt, trun)
    return buffer.buffer
  }

  static tfhd (id) {
    const buffer = new Buffer()
    const content = Buffer.writeUint32(id)
    buffer.write(FMP4.size(16), FMP4.type('tfhd'), FMP4.extension(0, 131072), content)
    return buffer.buffer
  }

  static tfdt (time) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      (time >> 24),
      (time >> 16) & 0xff,
      (time >> 8) & 0xff,
      (time & 0xff)
    ])
    buffer.write(FMP4.size(16), FMP4.type('tfdt'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }

  static trun (data) {
    const buffer = new Buffer()
    const sampleCount = Buffer.writeUint32(data.samples.length)
    // mdat-header 8
    // moof-header 8
    // mfhd 16
    // traf-header 8
    // thhd 16
    // tfdt 20
    // trun-header 12
    // sampleCount 4
    // data-offset 4
    // samples.length
    const offset = Buffer.writeUint32(92 + 4 * data.samples.length)
    buffer.write(FMP4.size(20 + 4 * data.samples.length), FMP4.type('trun'), FMP4.extension(0, 513), sampleCount, offset)
    data.samples.forEach((item, idx) => {
      buffer.write(Buffer.writeUint32(item.size))
    })
    return buffer.buffer
  }

  static mdat (data) {
    const buffer = new Buffer(); let size = 8
    data.samples.forEach(item => {
      size += item.size
    })
    buffer.write(FMP4.size(size), FMP4.type('mdat'))
    data.samples.forEach(item => {
      buffer.write(item.buffer)
    })
    return buffer.buffer
  }
}

FMP4.sequence = 1

export default FMP4
