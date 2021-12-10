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
    let buffer = new Buffer()
    buffer.write(FMP4.size(24), FMP4.type('ftyp'), new Uint8Array([
      0x69, 0x73, 0x6F, 0x36, // isom,
      0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x36, // isom
      0x64, 0x61, 0x73, 0x68 // avc1
    ]))
    return buffer.buffer
  }
  static moov (data) {
    let buffer = new Buffer(); let size = 8
    let mvhd = FMP4.mvhd(data.duration, data.timeScale)
    let mvex = FMP4.mvex(data.duration, data.timeScale)
    let trak1 = FMP4.videoTrak(data)
    let trak2 = new Uint8Array([])
    if (data.channelCount) {
      trak2 = FMP4.audioTrak(data);
    }
    [mvhd, mvex, trak1, trak2].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('moov'), mvhd, mvex, trak1, trak2)
    return buffer.buffer
  }
  static mvhd (duration, timescale) {
    let buffer = new Buffer()
    duration *= timescale
    // const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))
    // const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    let bytes = new Uint8Array([
      0x00, // version 1
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // creation_time
      0x00, 0x00, 0x00, 0x00, // modification_time
      (timescale >> 24) & 0xff,
      (timescale >> 16) & 0xff,
      (timescale >> 8) & 0xff,
      timescale & 0xff, // timescale
      (duration >> 24) & 0xff,
      (duration >> 16) & 0xff,
      (duration >> 8) & 0xff,
      duration & 0xff, // duration
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
      0x00, 0x00, 0x00, 0x03 // next_track_ID
    ])
    buffer.write(FMP4.size(8 + bytes.length), FMP4.type('mvhd'), new Uint8Array(bytes))
    return buffer.buffer
  }
  static videoTrak (data) {
    let buffer = new Buffer(); let size = 8
    let tkhd = FMP4.tkhd({
      id: 1,
      duration: data.videoDuration,
      timescale: data.videoTimeScale,
      width: data.width,
      height: data.height,
      type: 'video'
    })
    let mdia = FMP4.mdia({
      type: 'video',
      timescale: data.videoTimeScale,
      duration: data.videoDuration,
      vps: data.vps,
      sps: data.sps,
      pps: data.pps,
      pixelRatio: data.pixelRatio,
      width: data.width,
      height: data.height,
      videoCodec: data.videoCodec,
      hvc1Data: data.hvc1Data,
      hvcCData: data.hvcCData,
      stss: data.stss
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('trak'), tkhd, mdia)
    return buffer.buffer
  }
  static audioTrak (data) {
    let buffer = new Buffer(); let size = 8
    let tkhd = FMP4.tkhd({
      id: 2,
      duration: data.audioDuration,
      timescale: data.audioTimeScale,
      width: 0,
      height: 0,
      type: 'audio'
    })
    let channelCount = data.channelCount
    let sampleRate = data.sampleRate
    let mdia = FMP4.mdia({
      type: 'audio',
      timescale: data.audioTimeScale,
      duration: data.audioDuration,
      channelCount,
      sampleRate,
      audioConfig: data.audioConfig
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('trak'), tkhd, mdia)
    return buffer.buffer
  }
  static tkhd (data) {
    let buffer = new Buffer()
    let id = data.id

    let duration = data.duration * data.timeScale

    let width = data.width

    let height = data.height

    let type = data.type

    // let upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))

    // let lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    let content = new Uint8Array([
      0x00, // version 1
      0x00, 0x00, 0x03, // flags
      0x00, 0x00, 0x00, 0x00, // creation_time
      0xD9, 0xAC, 0xEC, 0x56, // modification_time
      (id >> 24) & 0xff,
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      id & 0xff, // track_ID
      0x00, 0x00, 0x00, 0x00, // reserved
      (duration >> 24) & 0xff,
      (duration >> 16) & 0xff,
      (duration >> 8) & 0xff,
      duration & 0xff, // duration
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
    let buffer = new Buffer(); let duration = data.duration; let mediaTime = data.mediaTime
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
    let buffer = new Buffer(); let size = 8
    let mdhd = FMP4.mdhd(data.timescale)
    let hdlr = FMP4.hdlr(data.type)
    let minf = FMP4.minf(data);
    [mdhd, hdlr, minf].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('mdia'), mdhd, hdlr, minf)
    return buffer.buffer
  }
  static mdhd (timescale, duration = 0) {
    let buffer = new Buffer()
    duration *= timescale
    const upperWordDuration = Math.floor(duration / (UINT32_MAX + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1))
    let content = new Uint8Array([
      0x00, 0x00, 0x00, 0x00, // creation_time
      0xD9, 0x14, 0x25, 0x5A, // modification_time
      (timescale >> 24) & 0xff, (timescale >> 16) & 0xff, (timescale >> 8) & 0xff, timescale & 0xff,
      0x00, 0x00, 0x00, 0x00, // duration
      0x15, 0xC7, // 'und' language
      0x00, 0x00
    ])
    buffer.write(FMP4.size(12 + content.byteLength), FMP4.type('mdhd'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }
  static hdlr (type) {
    let buffer = new Buffer()
    let value = [0x00, // version 0
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
    let buffer = new Buffer(); let size = 8
    let vmhd = data.type === 'video' ? FMP4.vmhd() : FMP4.smhd()
    let dinf = FMP4.dinf()
    let stbl = FMP4.stbl(data);
    [vmhd, dinf, stbl].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('minf'), vmhd, dinf, stbl)
    return buffer.buffer
  }
  static vmhd () {
    let buffer = new Buffer()
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
    let buffer = new Buffer()
    buffer.write(FMP4.size(16), FMP4.type('smhd'), new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
    ]))
    return buffer.buffer
  }
  static dinf () {
    let buffer = new Buffer()
    let dref = [0x00, // version 0
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
    let buffer = new Buffer(); let size = 8
    let stsd = FMP4.stsd(data)
    let stts = FMP4.stts()
    let stsc = FMP4.stsc()
    let stsz = FMP4.stsz()
    let stco = FMP4.stco();
    if(data.type === 'video') {
      let stss = FMP4.stss(data.stss);
      [stsd, stts, stss, stsc, stsz, stco].forEach(item => {
        size += item.byteLength
      })
      buffer.write(FMP4.size(size), FMP4.type('stbl'), stsd, stts, stss, stsc, stsz, stco)
    } else {
      [stsd, stts, stsc, stsz, stco].forEach(item => {
        size += item.byteLength
      })
      buffer.write(FMP4.size(size), FMP4.type('stbl'), stsd, stts, stsc, stsz, stco)
    }
    
    return buffer.buffer
  }
  static stsd (data) {
    let buffer = new Buffer(); let content
    if (data.type === 'audio') {
      content = FMP4.mp4a(data)
    } else if (data.videoCodec.indexOf('hvc1') > -1) {
      content = FMP4.hvc1(data)
    } else {
      content = FMP4.avc1(data)
    }
    buffer.write(
      FMP4.size(16 + content.byteLength), 
      FMP4.type('stsd'), 
      FMP4.extension(0, 0), 
      new Uint8Array([0x00, 0x00, 0x00, 0x01]),
      content
    )
    return buffer.buffer
  }
  static mp4a (data) {
    let buffer = new Buffer()
    let content = new Uint8Array([
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
    let esds = FMP4.esds(data.audioConfig)
    buffer.write(FMP4.size(8 + content.byteLength + esds.byteLength), FMP4.type('mp4a'), content, esds)
    return buffer.buffer
  }
  static esds (config = [43, 146, 8, 0]) {
    const configlen = config.length
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags

      0x03, // descriptor_type
      0x17 + configlen, // length
      0x00, 0x01, // es_id
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
    let buffer = new Buffer(); let size = 40// 8(avc1)+8(avcc)+8(btrt)+16(pasp)
    let sps = data.sps; let pps = data.pps; let width = data.width; let height = data.height; let hSpacing = data.pixelRatio[0]; let vSpacing = data.pixelRatio[1]
    let avcc = new Uint8Array([
      0x01, // version
      sps[1], // profile
      sps[2], // profile compatible
      sps[3], // level
      0xfc | 3,
      0xE0 | 1 // 目前只处理一个sps
    ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff]).concat(sps).concat(1).concat([pps.length >>> 8 & 0xff, pps.length & 0xff]).concat(pps))
    let avc1 = new Uint8Array([
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
    let btrt = new Uint8Array([
      0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
      0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
      0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
    ])
    let pasp = new Uint8Array([
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
  static hvc1 (data) {
    const buffer = new Buffer()
    const content = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      (data.width >> 8) & 0xFF,
      data.width & 0xff, // width
      (data.height >> 8) & 0xFF,
      data.height & 0xff, // height
      0x00, 0x48, 0x00, 0x00, // horizresolution
      0x00, 0x48, 0x00, 0x00, // vertresolution
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // frame_count
      0x00,
      0x00, 0x00, 0x00, 0x00, // dailymotion/hls.js
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // compressorname
      0x00, 0x18, // depth = 24
      0xFF, 0xFF,
    ]);

    buffer.write(
      FMP4.size(8 + content.byteLength + 8 + data.hvcCData.byteLength + 10), FMP4.type('hvc1'), content,
      FMP4.size(8 + data.hvcCData.byteLength), FMP4.type('hvcC'), new Uint8Array(data.hvcCData),
      FMP4.size(10), FMP4.type('fiel'), new Uint8Array([0x01, 0x00])
    )
    return buffer.buffer
  }
  static stts () {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stts'), content)
    return buffer.buffer
  }
  static stss (stssObj) {
    let buffer = new Buffer()
    let entries = [];
    stssObj.entries.forEach(item => {
      entries.push(item >> 24)
      entries.push((item >> 16) & 0xff)
      entries.push((item >> 8) & 0xff)
      entries.push(item & 0xff)
    })
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      (stssObj.count >> 24), // entry_count
      (stssObj.count >> 16) & 0xff,
      (stssObj.count >> 8) & 0xff,
      stssObj.count & 0xff,
    ].concat(entries))
    buffer.write(FMP4.size(8+8+4*stssObj.count), FMP4.type('stss'), content)
    return buffer.buffer
  }
  static stsc () {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stsc'), content)
    return buffer.buffer
  }
  static stco () {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    buffer.write(FMP4.size(16), FMP4.type('stco'), content)
    return buffer.buffer
  }
  static stsz () {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
    ])
    buffer.write(FMP4.size(20), FMP4.type('stsz'), content)
    return buffer.buffer
  }
  static mvex (duration, timeScale) {
    let buffer = new Buffer()
    let mehd = Buffer.writeUint32(duration * timeScale)
    buffer.write(FMP4.size(88), FMP4.type('mvex'), FMP4.size(16), FMP4.type('mehd'), FMP4.extension(0, 0), mehd, FMP4.trex1(1), FMP4.trex2(2))
    return buffer.buffer
  }
  static trex (id) {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      (id >> 24),
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      (id & 0xff), // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x00, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ])
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('trex'), content)
    return buffer.buffer
  }
  static trex1 (id) {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      (id >> 24),
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      (id & 0xff), // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x02, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x01, 0x00, 0x00 // default_sample_flags
    ])
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('trex'), content)
    return buffer.buffer
  }
  static trex2 (id) {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      (id >> 24),
      (id >> 16) & 0xff,
      (id >> 8) & 0xff,
      (id & 0xff), // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x04, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x02, 0x00, 0x00, 0x00 // default_sample_flags
    ])
    buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('trex'), content)
    return buffer.buffer
  }
  static moof (data) {
    let buffer = new Buffer(); let size = 8
    let mfhd = FMP4.mfhd(data)
    let traf = FMP4.traf(data);
    [mfhd, traf].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('moof'), mfhd, traf)
    return buffer.buffer
  }
  static mfhd (data) {
    let buffer = new Buffer()
    let content = null;
    if (data.id === 1) {
      content = Buffer.writeUint32((data.fragIndex || 0) + 1)
    }
    else {
      content = Buffer.writeUint32((data.fragIndex || 0) + 1)
    }
    buffer.write(FMP4.size(16), FMP4.type('mfhd'), FMP4.extension(0, 0), content)
    return buffer.buffer
  }
  static traf (data) {
    let buffer = new Buffer(); let size = 8
    let tfhd = FMP4.tfhd(data.id)
    let tfdt = FMP4.tfdt(data, data.time)
    let sdtp = FMP4.sdtp(data)
    let trun = FMP4.trun(data, sdtp.byteLength);
    [tfhd, tfdt, sdtp, trun].forEach(item => {
      size += item.byteLength
    })
    buffer.write(FMP4.size(size), FMP4.type('traf'), tfhd, tfdt, sdtp, trun)
    return buffer.buffer
  }
  static tfhd (id) {
    let buffer = new Buffer()
    let content = Buffer.writeUint32(id)
    buffer.write(FMP4.size(16), FMP4.type('tfhd'), new Uint8Array([
      0x00, 0x02, 0x00, 0x00
    ]), content)
    return buffer.buffer
  }
  static tfdt (data, time) {
    let buffer = new Buffer()
    let upper = Math.floor(time / (UINT32_MAX + 1))
    let lower = Math.floor(time % (UINT32_MAX + 1))
    buffer.write(FMP4.size(20), FMP4.type('tfdt'), FMP4.extension(1, 0), Buffer.writeUint32(upper), Buffer.writeUint32(lower))
    return buffer.buffer
  }
  static trun (data, sdtpLength) {
    let id = data.id
    let ceil = id === 1 ? 16 : 12
    let buffer = new Buffer()
    let sampleCount = Buffer.writeUint32(data.samples.length)
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
    let offset = Buffer.writeUint32(8 + 8 + 16 + 8 + 16 + 20 + 12 + 4 + 4 + ceil * data.samples.length + sdtpLength)
    buffer.write(FMP4.size(20 + ceil * data.samples.length), FMP4.type('trun'), FMP4.extension(0, data.flags), sampleCount, offset)
    data.samples.forEach((item, idx) => {
      buffer.write(Buffer.writeUint32(item.duration))
      buffer.write(Buffer.writeUint32(item.size))
      if (id === 1) {
        buffer.write(Buffer.writeUint32(item.key ? 0x02000000 : 0x01010000))
        buffer.write(Buffer.writeUint32(item.offset))
      } else {
        buffer.write(Buffer.writeUint32(0x1000000))
      }
    })
    return buffer.buffer
  }
  static sdtp (data) {
    let buffer = new Buffer()
    buffer.write(FMP4.size(12 + data.samples.length), FMP4.type('sdtp'), FMP4.extension(0, 0))
    data.samples.forEach(item => {
      buffer.write(new Uint8Array(data.id === 1 ? [item.key ? 32 : 16] : [16]))
    })
    return buffer.buffer
  }
  static mdat (data) {
    let buffer = new Buffer(); 
    let size = 8;
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

export default FMP4