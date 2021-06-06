import Buffer from './buffer';

// const UINT32_MAX = Math.pow(2, 32) - 1;
class Fmp4 {
  static size (value) {
    return Buffer.writeUint32(value)
  }
  static initBox (size, name, ...content) {
    const buffer = new Buffer()
    buffer.write(Fmp4.size(size), Fmp4.type(name), ...content)
    return buffer.buffer
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
    return Fmp4.initBox(24, 'ftyp', new Uint8Array([
      0x69, 0x73, 0x6F, 0x6D, // isom,
      0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x6D, // isom
      0x61, 0x76, 0x63, 0x31 // avc1
    ]))
  }
  static ftypHEVC () {
    return Fmp4.initBox(24, 'ftyp', new Uint8Array([
      0x69, 0x73, 0x6F, 0x6D, // isom,
      0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x6D, // isom
      0x64, 0x61, 0x73, 0x68 // hev1
    ]))
  }
  static moov ({ type, meta }) {
    let size = 8
    let mvhd = Fmp4.mvhd(meta.duration, meta.timescale)
    let trak

    if (type === 'video') {
      trak = Fmp4.videoTrak(meta)
    } else {
      trak = Fmp4.audioTrak(meta)
    }

    let mvex = Fmp4.mvex(meta.duration, meta.timescale || 1000, meta.id);
    [mvhd, trak, mvex].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'moov', mvhd, trak, mvex)
  }
  static mvhd (duration, timescale = 1000) {
    // duration *= timescale;
    let bytes = new Uint8Array([
      0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
      0x00, 0x00, 0x00, 0x00, // creation_time    创建时间  （相对于UTC时间1904-01-01零点的秒数）
      0x00, 0x00, 0x00, 0x00, // modification_time   修改时间

      /**
             * timescale: 4 bytes文件媒体在1秒时间内的刻度值，可以理解为1秒长度
             */
      (timescale >>> 24) & 0xFF,
      (timescale >>> 16) & 0xFF,
      (timescale >>> 8) & 0xFF,
      (timescale) & 0xFF,

      /**
             * duration: 4 bytes该track的时间长度，用duration和time scale值可以计算track时长，比如audio track的time scale = 8000,
             * duration = 560128，时长为70.016，video track的time scale = 600, duration = 42000，时长为70
             */
      (duration >>> 24) & 0xFF,
      (duration >>> 16) & 0xFF,
      (duration >>> 8) & 0xFF,
      (duration) & 0xFF,
      0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0   推荐播放速率，高16位和低16位分别为小数点整数部分和小数部分，即[16.16] 格式，该值为1.0（0x00010000）表示正常前向播放
      /**
             * PreferredVolume(1.0, 2bytes) + reserved(2bytes)
             * 与rate类似，[8.8] 格式，1.0（0x0100）表示最大音量
             */
      0x01, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, //  reserved: 4 + 4 bytes保留位
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // 视频变换矩阵   线性代数
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
      0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre-defined 保留位
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
      0xFF, 0xFF, 0xFF, 0xFF // next_track_ID 下一个track使用的id号
    ])
    return Fmp4.initBox(8 + bytes.length, 'mvhd', new Uint8Array(bytes))
  }
  static videoTrak (data) {
    let size = 8

    let tkhd = Fmp4.tkhd({
      id: 1,
      duration: data.duration,
      timescale: data.timescale || 1000,
      width: data.presentWidth,
      height: data.presentHeight,
      type: 'video'
    })
    let mdia = Fmp4.mdia({
      type: 'video',
      timescale: data.timescale || 1000,
      duration: data.duration,
      avcc: data.avcc,
      parRatio: data.parRatio,
      width: data.presentWidth,
      height: data.presentHeight,
      streamType: data.streamType
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'trak', tkhd, mdia)
  }
  static audioTrak (data) {
    let size = 8
    let tkhd = Fmp4.tkhd({
      id: 2,
      duration: data.duration,
      timescale: data.timescale || 1000,
      width: 0,
      height: 0,
      type: 'audio'
    })
    let mdia = Fmp4.mdia({
      type: 'audio',
      timescale: data.timescale || 1000,
      duration: data.duration,
      channelCount: data.channelCount,
      samplerate: data.sampleRate,
      config: data.config
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'trak', tkhd, mdia)
  }
  static tkhd (data) {
    let id = data.id
    let duration = data.duration
    let width = data.width
    let height = data.height
    let content = new Uint8Array([
      0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
      // 0x000001 track_enabled，否则该track不被播放；
      // 0x000002 track_in_movie，表示该track在播放中被引用；
      // 0x000004 track_in_preview，表示该track在预览时被引用。
      // 一般该值为7，1+2+4 如果一个媒体所有track均未设置track_in_movie和track_in_preview，将被理解为所有track均设置了这两项；对于hint track，该值为0
      // hint track 这个特殊的track并不包含媒体数据，而是包含了一些将其他数据track打包成流媒体的指示信息。
      0x00, 0x00, 0x00, 0x00, // creation_time创建时间（相对于UTC时间1904-01-01零点的秒数）
      0x00, 0x00, 0x00, 0x00, // modification time 修改时间
      (id >>> 24) & 0xFF, // track_ID: 4 bytes id号，不能重复且不能为0
      (id >>> 16) & 0xFF,
      (id >>> 8) & 0xFF,
      (id) & 0xFF,
      0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes    保留位
      (duration >>> 24) & 0xFF, // duration: 4 bytes track的时间长度
      (duration >>> 16) & 0xFF,
      (duration >>> 8) & 0xFF,
      (duration) & 0xFF,
      0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes    保留位
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)  视频层，默认为0，值小的在上层.track分组信息，默认为0表示该track未与其他track有群组关系
      0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)    [8.8] 格式，如果为音频track，1.0（0x0100）表示最大音量；否则为0   +保留位
      0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00, // 视频变换矩阵
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
      (width >>> 8) & 0xFF, // //宽度
      (width) & 0xFF,
      0x00, 0x00,
      (height >>> 8) & 0xFF, // 高度
      (height) & 0xFF,
      0x00, 0x00
    ])
    return Fmp4.initBox(8 + content.byteLength, 'tkhd', content)
  }
  static edts (data) {
    let buffer = new Buffer()
    let duration = data.duration
    let mediaTime = data.mediaTime
    buffer.write(Fmp4.size(36), Fmp4.type('edts'))
    // elst
    buffer.write(Fmp4.size(28), Fmp4.type('elst'))
    buffer.write(new Uint8Array([
      0x00, 0x00, 0x00, 0x01, // entry count
      (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff,
      (mediaTime >> 24) & 0xff, (mediaTime >> 16) & 0xff, (mediaTime >> 8) & 0xff, mediaTime & 0xff,
      0x00, 0x00, 0x00, 0x01 // media rate
    ]))
    return buffer.buffer
  }
  static mdia (data) {
    let size = 8
    let mdhd = Fmp4.mdhd(data.timescale, data.duration)
    let hdlr = Fmp4.hdlr(data.type)
    let minf = Fmp4.minf(data);
    [mdhd, hdlr, minf].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'mdia', mdhd, hdlr, minf)
  }
  static mdhd (timescale = 1000, duration) {
    let content = new Uint8Array([
      0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
      0x00, 0x00, 0x00, 0x00, // modification_time修改时间
      (timescale >>> 24) & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
      (timescale >>> 16) & 0xFF,
      (timescale >>> 8) & 0xFF,
      (timescale) & 0xFF,
      (duration >>> 24) & 0xFF, // duration: 4 bytes  track的时间长度
      (duration >>> 16) & 0xFF,
      (duration >>> 8) & 0xFF,
      (duration) & 0xFF,
      0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
      0x00, 0x00 // pre_defined = 0
    ])
    return Fmp4.initBox(12 + content.byteLength, 'mdhd', Fmp4.extension(0, 0), content)
  }
  static hdlr (type) {
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
    return Fmp4.initBox(8 + value.length, 'hdlr', new Uint8Array(value))
  }
  static minf (data) {
    let size = 8
    let vmhd = data.type === 'video' ? Fmp4.vmhd() : Fmp4.smhd()
    let dinf = Fmp4.dinf()
    let stbl = Fmp4.stbl(data);
    [vmhd, dinf, stbl].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'minf', vmhd, dinf, stbl)
  }
  static vmhd () {
    return Fmp4.initBox(20, 'vmhd', new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x01, // flags
      0x00, 0x00, // graphicsmode
      0x00, 0x00,
      0x00, 0x00,
      0x00, 0x00 // opcolor
    ]))
  }
  static smhd () {
    return Fmp4.initBox(16, 'smhd', new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
    ]))
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
    buffer.write(Fmp4.size(36), Fmp4.type('dinf'), Fmp4.size(28), Fmp4.type('dref'), new Uint8Array(dref))
    return buffer.buffer
  }
  static stbl (data) {
    let size = 8
    let stsd = Fmp4.stsd(data)
    let stts = Fmp4.stts()
    let stsc = Fmp4.stsc()
    let stsz = Fmp4.stsz()
    let stco = Fmp4.stco();
    [stsd, stts, stsc, stsz, stco].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'stbl', stsd, stts, stsc, stsz, stco)
  }
  static stsd (data) {
    let content
    if (data.type === 'audio') {
      // if (!data.isAAC && data.codec === 'mp4') {
      //     content = FMP4.mp3(data);
      // } else {
      //
      // }

      // 支持mp4a
      content = Fmp4.mp4a(data)
    } else {
      if(data.streamType === 0x24)
      {
        content = Fmp4.hvc1(data)
      } else {
        content = Fmp4.avc1(data)
      }
    }
    return Fmp4.initBox(16 + content.byteLength, 'stsd', Fmp4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content)
  }
  static mp4a (data) {
    let content = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, data.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      (data.samplerate >> 8) & 0xff,
      data.samplerate & 0xff, //
      0x00, 0x00
    ])
    let esds = Fmp4.esds(data.config)
    return Fmp4.initBox(8 + content.byteLength + esds.byteLength, 'mp4a', content, esds)
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
    buffer.write(Fmp4.size(8 + content.byteLength), Fmp4.type('esds'), content)
    return buffer.buffer
  }
  static avc1 (data) {
    let buffer = new Buffer()
    let size = 40// 8(avc1)+8(avcc)+8(btrt)+16(pasp)
    // let sps = data.sps
    // let pps = data.pps
    let width = data.width
    let height = data.height
    let hSpacing = data.parRatio.width
    let vSpacing = data.parRatio.height
    // let avccBuffer = new Buffer()
    // avccBuffer.write(new Uint8Array([
    //   0x01, // version
    //   sps[1], // profile
    //   sps[2], // profile compatible
    //   sps[3], // level
    //   0xfc | 3,
    //   0xE0 | 1 // 目前只处理一个sps
    // ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff])))
    // avccBuffer.write(sps, new Uint8Array([1, pps.length >>> 8 & 0xff, pps.length & 0xff]), pps)

    let avcc = data.avcc
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
      Fmp4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), Fmp4.type('avc1'), avc1,
      Fmp4.size(8 + avcc.byteLength), Fmp4.type('avcC'), avcc,
      Fmp4.size(20), Fmp4.type('btrt'), btrt,
      Fmp4.size(16), Fmp4.type('pasp'), pasp
    )
    return buffer.buffer
  }
  static hvc1(track) {
    let buffer = new Buffer()
    let content = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      (track.width >> 8) & 0xFF,
      track.width & 0xff, // width
      (track.height >> 8) & 0xFF,
      track.height & 0xff, // height
      0x00, 0x48, 0x00, 0x00, // horizresolution
      0x00, 0x48, 0x00, 0x00, // vertresolution
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // frame_count
      0x00,
      0x00, 0x00, 0x00, 0x00, //dailymotion/hls.js
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // compressorname
      0x00, 0x18,   // depth = 24
      0xFF, 0xFF,
      0x00, 0x00, 0x00, 0x7A, 0x68, 0x76, 0x63, 0x43,
      0x01, //configurationVersion
      0x01, //profile_space + tier_flag + profile_idc
      0x60, 0x00, 0x00, 0x00, //general_profile_compatibility
      0x90, 0x00, 0x00, 0x00, 0x00, 0x00, //constraint_indicator_flags
      0x5D, //level_idc=90
      0xF0, 0x00, 0xFC, 0xFD, //profile_compatibility_indications
      0xF8, //‘11111’b + bitDepthLumaMinus8
      0xF8, //‘11111’b + bitDepthChromaMinus8
      0x00, 0x00, //avgFrameRate
      0x0F, //constantFrameRate + numTemporalLayers + ‘1’b + lengthSizeMinusOne
      0x03, //numOfArrays

      //vps
      0xA0, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
      0x00, 0x18, //nalUnitLength
      0x40, 0x01, 0x0C, 0x01, 0xFF, 0xFF, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0x99, 0x98, 0x09,

      //sps
      0xA1, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
      0x00, 0x2D, //nalUnitLength
      0x42, 0x01, 0x01, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0xA0, 0x02,
      0x80, 0x80, 0x2D, 0x16, 0x59, 0x99, 0xA4, 0x93, 0x2B, 0x9A, 0x80, 0x80, 0x80, 0x82, 0x00, 0x00, 0x03, 0x00, 0x02, 0x00,
      0x00, 0x03, 0x00, 0x32, 0x10,

      //pps
      0xA2, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
      0x00, 0x07, //nalUnitLength
      0x44, 0x01, 0xC1, 0x72, 0xB4, 0x62, 0x40
    ]);
    buffer.write(
      Fmp4.size(8 + content.byteLength + 10), Fmp4.type('hvc1'), content,
      Fmp4.size(10), Fmp4.type('fiel'), new Uint8Array([0x01, 0x00])
    )
    return buffer.buffer
  }
  static stts () {
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    return Fmp4.initBox(16, 'stts', content)
  }
  static stsc () {
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    return Fmp4.initBox(16, 'stsc', content)
  }
  static stco () {
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
    ])
    return Fmp4.initBox(16, 'stco', content)
  }
  static stsz () {
    let content = new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
    ])
    return Fmp4.initBox(20, 'stsz', content)
  }
  static mvex (duration, timescale = 1000, trackID) {
    let buffer = new Buffer()
    let mehd = Buffer.writeUint32(duration)
    buffer.write(Fmp4.size(56), Fmp4.type('mvex'), Fmp4.size(16), Fmp4.type('mehd'), Fmp4.extension(0, 0), mehd, Fmp4.trex(trackID))
    return buffer.buffer
  }
  static trex (id) {
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
    return Fmp4.initBox(8 + content.byteLength, 'trex', content)
  }
  static moof (data) {
    let size = 8
    let mfhd = Fmp4.mfhd()
    let traf = Fmp4.traf(data);
    [mfhd, traf].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'moof', mfhd, traf)
  }
  static mfhd () {
    let content = Buffer.writeUint32(Fmp4.sequence)
    Fmp4.sequence += 1
    return Fmp4.initBox(16, 'mfhd', Fmp4.extension(0, 0), content)
  }
  static traf (data) {
    let size = 8
    let tfhd = Fmp4.tfhd(data.id)
    let tfdt = Fmp4.tfdt(data.time)
    let sdtp = Fmp4.sdtp(data)
    let trun = Fmp4.trun(data, sdtp.byteLength);

    [tfhd, tfdt, trun, sdtp].forEach(item => {
      size += item.byteLength
    })
    return Fmp4.initBox(size, 'traf', tfhd, tfdt, trun, sdtp)
  }
  static tfhd (id) {
    let content = Buffer.writeUint32(id)
    return Fmp4.initBox(16, 'tfhd', Fmp4.extension(0, 0), content)
  }
  static tfdt (time) {
    // let upper = Math.floor(time / (UINT32_MAX + 1)),
    //     lower = Math.floor(time % (UINT32_MAX + 1));
    return Fmp4.initBox(16, 'tfdt', Fmp4.extension(0, 0), Buffer.writeUint32(time))
  }
  static trun (data, sdtpLength) {
    // let id = data.id;
    // let ceil = id === 1 ? 16 : 12;
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
    let offset = Buffer.writeUint32(8 + 8 + 16 + 8 + 16 + 16 + 12 + 4 + 4 + 16 * data.samples.length + sdtpLength)
    buffer.write(Fmp4.size(20 + 16 * data.samples.length), Fmp4.type('trun'), new Uint8Array([0x00, 0x00, 0x0F, 0x01]), sampleCount, offset)

    // let size = buffer.buffer.byteLength
    // let writeOffset = 0
    // data.samples.forEach(() => {
    //   size += 16
    // })
    //
    // let trunBox = new Uint8Array(size)

    // trunBox.set(buffer.buffer, 0)

    data.samples.forEach((item) => {
      const flags = item.flags
      // console.log(item.type, item.dts, item.duration)

      buffer.write(new Uint8Array([
        (item.duration >>> 24) & 0xFF, // sample_duration
        (item.duration >>> 16) & 0xFF,
        (item.duration >>> 8) & 0xFF,
        (item.duration) & 0xFF,
        (item.size >>> 24) & 0xFF, // sample_size
        (item.size >>> 16) & 0xFF,
        (item.size >>> 8) & 0xFF,
        (item.size) & 0xFF,
        (flags.isLeading << 2) | flags.dependsOn, // sample_flags
        (flags.isDependedOn << 6) | (flags.hasRedundancy << 4) | flags.isNonSync,
        0x00, 0x00, // sample_degradation_priority
        (item.cts >>> 24) & 0xFF, // sample_composition_time_offset
        (item.cts >>> 16) & 0xFF,
        (item.cts >>> 8) & 0xFF,
        (item.cts) & 0xFF
      ]))
      // writeOffset += 16
      // buffer.write(Buffer.writeUint32(0));
    })
    return buffer.buffer
  }
  static sdtp (data) {
    let buffer = new Buffer()
    buffer.write(Fmp4.size(12 + data.samples.length), Fmp4.type('sdtp'), Fmp4.extension(0, 0))
    data.samples.forEach(item => {
      const flags = item.flags
      const num = (flags.isLeading << 6) | // is_leading: 2 (bit)
        (flags.dependsOn << 4) | // sample_depends_on
        (flags.isDependedOn << 2) | // sample_is_depended_on
        (flags.hasRedundancy)// sample_has_redundancy

      buffer.write(new Uint8Array([num]))
    })
    return buffer.buffer
  }
  static mdat (data) {
    let buffer = new Buffer()
    let size = 8
    data.samples.forEach(item => {
      size += item.size
    })
    buffer.write(Fmp4.size(size), Fmp4.type('mdat'))
    let mdatBox = new Uint8Array(size)
    let offset = 0
    mdatBox.set(buffer.buffer, offset)
    offset += 8
    data.samples.forEach(item => {
      item.buffer.forEach((unit) => {
        mdatBox.set(unit, offset)
        offset += unit.byteLength
        // buffer.write(unit.data);
      })
    })
    return mdatBox
  }
}
Fmp4.type = (name) => {
  return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)])
}
Fmp4.sequence = 1

export default Fmp4
