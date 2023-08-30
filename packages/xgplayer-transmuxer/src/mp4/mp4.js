import { TrackType, VideoCodecType } from '../model'
import { concatUint8Array, parse /* hashVal */ } from '../utils'
import Buffer from './buffer'
// import Crypto from './crypto/crypto'
const UINT32_MAX = 2 ** 32 - 1

export class MP4 {
  static types = [
    'avc1',
    'avcC',
    'hvc1',
    'hvcC',
    'dinf',
    'dref',
    'esds',
    'ftyp',
    'hdlr',
    'mdat',
    'mdhd',
    'mdia',
    'mfhd',
    'minf',
    'moof',
    'moov',
    'mp4a',
    'mvex',
    'mvhd',
    'pasp',
    'stbl',
    'stco',
    'stsc',
    'stsd',
    'stsz',
    'stts',
    'tfdt',
    'tfhd',
    'traf',
    'trak',
    'trex',
    'tkhd',
    'vmhd',
    'smhd',
    'ctts',
    'stss',
    'styp',
    'pssh',
    'sidx',
    'sbgp',
    'saiz',
    'saio',
    'senc',
    'trun',
    'encv',
    'enca',
    'sinf',
    'btrt',
    'frma',
    'tenc',
    'schm',
    'schi',
    'mehd',
    'fiel',
    'sdtp',
    'bvc2',
    'bv2C'
  ].reduce((p, c) => {
    p[c] = [c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2), c.charCodeAt(3)]
    return p
  }, Object.create(null));

  static HDLR_TYPES = {
    video: new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61,
      0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ]),
    audio: new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61,
      0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
    ])
  }

  static FTYPAVC1 = MP4.box(MP4.types.ftyp, new Uint8Array([
    105, 115, 111, 109, // isom
    0, 0, 0, 1,
    105, 115, 111, 109,
    97, 118, 99, 49 // avc1
  ]))

  static FTYPHEV1 = MP4.box(MP4.types.ftyp, new Uint8Array([
    105, 115, 111, 109, // isom
    0, 0, 0, 1,
    105, 115, 111, 109,
    104, 101, 118, 49 // hev1
  ]))

  static DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version
    0x00, 0x00, 0x01 // entry_flags
  ])))

  static VMHD = MP4.box(MP4.types.vmhd, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphics mode
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // op color
  ]))

  static SMHD = MP4.box(MP4.types.smhd, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00 // reserved
  ]))

  static StblTable = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
  ])

  static STTS = MP4.box(MP4.types.stts, MP4.StblTable)

  static STSC = MP4.box(MP4.types.stsc, MP4.StblTable)

  static STSZ = MP4.box(MP4.types.stsz, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
  ]))

  static STCO = MP4.box(MP4.types.stco, MP4.StblTable)

  static box (type, ...payload) {
    payload = payload.filter(Boolean)
    const size = 8 + payload.reduce((p, c) => (p + c.byteLength), 0)
    const ret = new Uint8Array(size)
    ret[0] = (size >> 24) & 0xff
    ret[1] = (size >> 16) & 0xff
    ret[2] = (size >> 8) & 0xff
    ret[3] = size & 0xff
    ret.set(type, 4)
    let offset = 8
    payload.forEach((data) => {
      ret.set(data, offset)
      offset += data.byteLength
    })
    return ret
  }

  static ftyp (tracks) {
    const isHevc = tracks.find(t => t.type === TrackType.VIDEO && t.codecType === VideoCodecType.HEVC)
    return isHevc ? MP4.FTYPHEV1 : MP4.FTYPAVC1
  }

  static initSegment (tracks) {
    const ftyp = MP4.ftyp(tracks)
    // console.log('[remux],ftyp ,len ', ftyp.byteLength, hashVal(ftyp.toString()))
    const init = concatUint8Array(ftyp, MP4.moov(tracks))
    // console.log('[remux],init ,len ', init.byteLength, hashVal(init.toString()))
    return init
  }

  static pssh (data) {
    // const buffer = new Buffer()
    const content = new Uint8Array(
      [
        0x01, 0x00, 0x00, 0x00 // version
      ].concat(
        [
          0x10, 0x77, 0xef, 0xec,
          0xc0, 0xb2, 0x4d, 0x02,
          0xac, 0xe3, 0x3c, 0x1e,
          0x52, 0xe2, 0xfb, 0x4b
        ],
        [0x00, 0x00, 0x00, 0x01],
        parse(data.kid),
        [0x00, 0x00, 0x00, 0x00]
      )
    )
    return MP4.box(MP4.types.pssh, content)
  }

  static moov (tracks) {
    if (tracks[0].useEME && (tracks[0].encv || tracks[0].enca)) {
      if (!tracks[0].pssh) {
        tracks[0].pssh = {
          kid: tracks[0].kid
        }
      }
      const pssh = this.pssh(tracks[0].pssh)
      // console.log('[remux],pssh,', hashVal(pssh.toString()))
      return MP4.box(MP4.types.moov,
        MP4.mvhd(tracks[0].mvhdDurtion || tracks[0].duration, tracks[0].mvhdTimecale || tracks[0].timescale),
        MP4.mvex(tracks),
        ...tracks.map((t) => MP4.trak(t)),
        pssh)
    } else {
      return MP4.box(MP4.types.moov,
        MP4.mvhd(tracks[0].mvhdDurtion || tracks[0].duration, tracks[0].mvhdTimecale || tracks[0].timescale),
        ...tracks.map((t) => MP4.trak(t)),
        MP4.mvex(tracks)
      )
    }
  }

  static mvhd (duration, timescale = 90000) {
    const mvhd = MP4.box(MP4.types.mvhd, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // creation_time
      0x00, 0x00, 0x00, 0x00, // modification_time
      (timescale >> 24) & 0xff, (timescale >> 16) & 0xff, (timescale >> 8) & 0xff, timescale & 0xff,
      (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff,
      0x00, 0x01, 0x00, 0x00, // rate
      0x01, 0x00, // volume
      0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // matrix
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0xff, 0xff, 0xff, 0xff // todo 0xff, 0xff, 0xff, 0xff // next_track_ID
    ]))
    // console.log('[remux],mvhd, len,', mvhd.byteLength, hashVal(mvhd.toString()))
    return mvhd
  }

  static trak (track) {
    const trak = MP4.box(
      MP4.types.trak,
      MP4.tkhd(track.id, track.tkhdDuration || 0, track.width, track.height),
      MP4.mdia(track)
    )
    // console.log('[remux],trak, len,', trak.byteLength, track.id, hashVal(trak.toString()))
    return trak
  }

  static tkhd (id, duration, width = 0, height = 0) {
    const tkhd = MP4.box(MP4.types.tkhd, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x07, // flags、todo 0x07
      0x00, 0x00, 0x00, 0x00, // creation_time
      0x00, 0x00, 0x00, 0x00, // modification_time todo
      (id >> 24) & 0xff, (id >> 16) & 0xff, (id >> 8) & 0xff, id & 0xff,
      0x00, 0x00, 0x00, 0x00,
      (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff, // todo (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, // layer
      0x00, 0x00, // /*0x00*/ alternate_group  //todo type === 'video' ? 0x01 : 0x00（第二个位置）
      0x01, 0x00, // /* 0x01 */, 0x00, // non-audio track volume  //todo type === 'audio' ? 0x01 : 0x00（第一个位置）
      0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // matrix
      (width >> 8) & 0xff, width & 0xff, 0x00, 0x00,
      (height >> 8) & 0xff, height & 0xff, 0x00, 0x00
    ]))
    // console.log('[remux],tkhd, len,', tkhd.byteLength, hashVal(tkhd.toString()))
    return tkhd
  }

  static mdia (track) {
    const mdia = MP4.box(MP4.types.mdia, MP4.mdhd(track.duration, track.timescale), MP4.hdlr(track.type), MP4.minf(track))
    // console.log('[remux],mdia, len,', mdia.byteLength, hashVal(mdia.toString()))
    return mdia
  }

  static mdhd (duration, timescale = 90000) {
    const mdhd = MP4.box(MP4.types.mdhd, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // creation_time
      0x00, 0x00, 0x00, 0x00, // todo 0x00, 0x00, 0x00, 0x00, // modification_time
      (timescale >> 24) & 0xff, (timescale >> 16) & 0xff, (timescale >> 8) & 0xff, timescale & 0xff,
      (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff, // (duration >> 24) & 0xff, (duration >> 16) & 0xff, (duration >> 8) & 0xff, duration & 0xff,//todo
      0x55, 0xc4, // 'und' language (undetermined) //todo 0x15, 0xC7
      0x00, 0x00 // pre_defined
    ]))
    // console.log('[remux],mdhd, len,', mdhd.byteLength, hashVal(mdhd.toString()))
    return mdhd
  }

  static hdlr (type) {
    const hdlr = MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type])
    // console.log('[remux],hdlr, len,', hdlr.byteLength, hashVal(hdlr.toString()))
    return hdlr
  }

  static minf (track) {
    const minf = MP4.box(MP4.types.minf, track.type === TrackType.VIDEO ? MP4.VMHD : MP4.SMHD, MP4.DINF, MP4.stbl(track))
    // console.log('[remux],minf, len,', minf.byteLength, hashVal(minf.toString()))
    return minf
  }

  static stbl (track) {
    const extBox = []
    if (track && track.ext) {
      track.ext.stss && extBox.push(MP4.stss(track.ext.stss.entries))
      // track.ext.stss && extBox.push(MP4.ctts(track.ext.stss.entries))
    }
    const stbl = MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.STTS, extBox[0], MP4.STSC, MP4.STSZ, MP4.STCO)
    // console.log('[remux],stbl, len,', stbl.byteLength, hashVal(stbl.toString()))
    return stbl
  }

  static stsd (track) {
    let content
    if (track.type === 'audio') {
      if (track.useEME && track.enca) {
        content = MP4.enca(track)
        // console.log('[remux],enca, len,', content.byteLength, track.type, hashVal(content.toString()))
      } else {
        content = MP4.mp4a(track)
        // console.log('[remux],mp4a, len,', content.byteLength, track.type, hashVal(content.toString()))
      }
    } else if (track.useEME && track.encv) {
      content = MP4.encv(track)
      // console.log('[remux],encv, len,', content.byteLength, track.type, hashVal(content.toString()))
    } else {
      content = MP4.avc1hev1vvc1(track)
      // console.log('[remux],avc1hev1, len,', content.byteLength, track.type, hashVal(content.toString()))
    }
    const stsd = MP4.box(MP4.types.stsd, new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01 // entry_count
    ]), content)
    // console.log('[remux],stsd, len,', stsd.byteLength, hashVal(stsd.toString()))
    return stsd
  }

  static enca (data) {
    const channelCount = data.enca.channelCount
    const sampleRate = data.enca.sampleRate
    const content = new Uint8Array([
      0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      (sampleRate >> 8) & 0xff,
      sampleRate & 0xff, //
      0x00, 0x00
    ])
    const esds = MP4.esds(data.config)
    // console.log('[remux],esds, len,', esds.byteLength, hashVal(esds.toString()))
    const sinf = MP4.sinf(data.enca)
    // console.log('[remux],sinf, len,', sinf.byteLength, hashVal(sinf.toString()))
    return MP4.box(MP4.types.enca, content, esds, sinf)
  }

  static encv (track) {
    const sps = track.sps.length > 0 ? track.sps[0] : []
    const pps = track.pps.length > 0 ? track.pps[0] : []
    const width = track.width
    const height = track.height
    const hSpacing = track.sarRatio[0]
    const vSpacing = track.sarRatio[1]

    const content = new Uint8Array([
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
      0x11, 0x11]) // pre_defined = -1;
    const avcc = new Uint8Array([
      0x01, // version
      sps[1], // profile
      sps[2], // profile compatible
      sps[3], // level
      0xfc | 3,
      0xE0 | 1, // 目前只处理一个sps
      sps.length >>> 8 & 0xff,
      sps.length & 0xff
    ].concat(...sps).concat([
      0x01,
      pps.length >>> 8 & 0xff,
      pps.length & 0xff
    ]).concat(...pps))
    const btrt = new Uint8Array([
      0x00, 0x00, 0x58, 0x39,
      0x00, 0x0F, 0xC8, 0xC0,
      0x00, 0x04, 0x56, 0x48
    ])
    const sinf = MP4.sinf(track.encv)
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
    return MP4.box(MP4.types.encv, content, MP4.box(MP4.types.avcC, avcc), MP4.box(MP4.types.btrt, btrt), sinf, MP4.box(MP4.types.pasp, pasp))
  }

  static schi (data) {
    const content = new Uint8Array([])
    const tenc = MP4.tenc(data)
    return MP4.box(MP4.types.schi, content, tenc)
  }

  static tenc (data) {
    //  用于每个track的加密参数（包括KID、初始化向量、加密标志位），包含在TrackEncryptionBox(‘tenc’)中。
    const content = new Uint8Array(
      [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // skip
        data.default_IsEncrypted & 0xff, // default_isProtected
        data.default_IV_size & 0xff // default_Per_Sample_IV_Size
      ].concat(parse(data.default_KID)))
    return MP4.box(MP4.types.tenc, content)
  }

  static sinf (data) {
    const content = new Uint8Array([])
    const frma = new Uint8Array([
      data.data_format.charCodeAt(0),
      data.data_format.charCodeAt(1),
      data.data_format.charCodeAt(2),
      data.data_format.charCodeAt(3)
    ])
    const schm = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,
      0x63, 0x65, 0x6E, 0x63, // cenc
      0x00, 0x01, 0x00, 0x00 // version
    ])
    const schi = MP4.schi(data)
    return MP4.box(MP4.types.sinf, content, MP4.box(MP4.types.frma, frma), MP4.box(MP4.types.schm, schm), schi)
  }

  static avc1hev1vvc1 (track) {
    let config
    let typ
    if (track.codecType === VideoCodecType.HEVC) {
      config = MP4.hvcC(track)
      typ = MP4.types.hvc1
    } else if (track.codecType === VideoCodecType.VVCC){
      config = MP4.vvcC(track)
      typ = MP4.types.bvc2
    } else {
      MP4.avcC(track)
      typ = MP4.types.avc1
    }
    // const isHevc = track.codecType === VideoCodecType.HEVC
    // const typ = isHevc ? MP4.types.hvc1 : MP4.types.avc1
    // const config = isHevc ? MP4.hvcC(track) : MP4.avcC(track)
    const boxes = [
      new Uint8Array([
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // data_reference_index
        0x00, 0x00, // pre_defined
        0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
        (track.width >> 8) & 0xff, track.width & 0xff, // width
        (track.height >> 8) & 0xff, track.height & 0xff, // height
        0x00, 0x48, 0x00, 0x00, // horizresolution
        0x00, 0x48, 0x00, 0x00, // vertresolution
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // frame_count
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, // compressor name
        0x00, 0x18, // depth
        0x11, 0x11 // pre_defined = -1 //todo
      ]), config
    ]
    // console.log('[remux],avc1hev1_0, len,', boxes[0].byteLength, hashVal(boxes[0].toString()))
    // console.log('[remux],avc1hev1_1, len,', boxes[1].byteLength, hashVal(boxes[1].toString()))
    if (track.codecType === VideoCodecType.HEVC) {
      boxes.push(MP4.box(MP4.types.fiel, new Uint8Array([0x01, 0x00])))
      // console.log('[remux],fiel, len,', boxes[2].byteLength, hashVal(boxes[2].toString()))
    } else if (track.sarRatio && track.sarRatio.length > 1) {
      boxes.push(MP4.pasp(track.sarRatio))
      // console.log('[remux],pasp, len,', boxes[2].byteLength, hashVal(boxes[2].toString()))
    }
    return MP4.box(typ, ...boxes)
  }

  static avcC (track) {
    const sps = []
    const pps = []

    let len
    track.sps.forEach((s) => {
      len = s.byteLength
      sps.push((len >>> 8) & 0xff)
      sps.push(len & 0xff)
      sps.push(...s)
    })

    track.pps.forEach((p) => {
      len = p.byteLength
      pps.push((len >>> 8) & 0xff)
      pps.push(len & 0xff)
      pps.push(...p)
    })

    return MP4.box(MP4.types.avcC, new Uint8Array([
      0x01, // configurationVersion
      sps[3], // AVCProfileIndication
      sps[4], // profile_compatibility
      sps[5], // AVCLevelIndication
      0xfc | 3, // lengthSizeMinusOne
      0xe0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(...sps)
      .concat([track.pps.length]) // numOfPictureParameterSets
      .concat(...pps)))
  }

  static vvcC (track) {
    const vvcC = track.vvcC
    return MP4.box(MP4.types.bv2C, new Uint8Array(vvcC))
    // return [
    //   Fmp4.size(8 + vvcC.byteLength),
    //   Fmp4.type('vvcC'),
    //   vvcC
    // ]
  }

  static hvcC (track) {
    const hvcC = track.hvcC
    if (hvcC instanceof ArrayBuffer || hvcC instanceof Uint8Array) return hvcC
    const { vps, sps, pps } = track
    let data
    if (hvcC) {
      const pcf = hvcC.generalProfileCompatibilityFlags
      const cif = hvcC.generalConstraintIndicatorFlags
      const numOfArrays = (vps.length && 1) + (sps.length && 1) + (pps.length && 1)
      data = [
        0x01, // configurationVersion
        hvcC.generalProfileSpace << 6 | hvcC.generalTierFlag << 5 | hvcC.generalProfileIdc,
        pcf >>> 24, pcf >>> 16, pcf >>> 8, pcf,
        cif[0], cif[1], cif[2], cif[3], cif[4], cif[5],
        hvcC.generalLevelIdc,
        0xF0, 0x00, // min_spatial_segmentation_idc
        0xFC, // parallelismType
        hvcC.chromaFormatIdc | 0xFC,
        hvcC.bitDepthLumaMinus8 | 0xF8,
        hvcC.bitDepthChromaMinus8 | 0xF8,
        0x00, 0x00, // avgFrameRate
        hvcC.numTemporalLayers << 3 | hvcC.temporalIdNested << 2 | 3,
        numOfArrays
      ]
      const write = (x) => {
        data.push(x.length >> 8, x.length)
        data.push(...x)
      }
      if (vps.length) {
        data.push(0xA0, 0x00, vps.length)
        vps.forEach(write)
      }
      if (sps.length) {
        data.push(0xA1, 0x00, sps.length)
        sps.forEach(write)
      }
      if (pps.length) {
        data.push(0xA2, 0x00, pps.length)
        pps.forEach(write)
      }
    } else {
      data = [
        0x01, // configurationVersion
        0x01, // profile_space + tier_flag + profile_idc
        0x60, 0x00, 0x00, 0x00, // general_profile_compatibility
        0x90, 0x00, 0x00, 0x00, 0x00, 0x00, // constraint_indicator_flags
        0x5D, // level_idc=90
        0xF0, 0x00, 0xFC, 0xFD, // profile_compatibility_indications
        0xF8, // ‘11111’b + bitDepthLumaMinus8
        0xF8, // ‘11111’b + bitDepthChromaMinus8
        0x00, 0x00, // avgFrameRate
        0x0F, // constantFrameRate + numTemporalLayers + ‘1’b + lengthSizeMinusOne
        0x03, // numOfArrays

        // vps
        0xA0, 0x00, 0x01, // array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x18, // nalUnitLength
        0x40, 0x01, 0x0C, 0x01, 0xFF, 0xFF, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0x99, 0x98, 0x09,

        // sps
        0xA1, 0x00, 0x01, // array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x2D, // nalUnitLength
        0x42, 0x01, 0x01, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0xA0, 0x02,
        0x80, 0x80, 0x2D, 0x16, 0x59, 0x99, 0xA4, 0x93, 0x2B, 0x9A, 0x80, 0x80, 0x80, 0x82, 0x00, 0x00, 0x03, 0x00, 0x02, 0x00,
        0x00, 0x03, 0x00, 0x32, 0x10,

        // pps
        0xA2, 0x00, 0x01, // array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x07, // nalUnitLength
        0x44, 0x01, 0xC1, 0x72, 0xB4, 0x62, 0x40
      ]
    }
    return MP4.box(MP4.types.hvcC, new Uint8Array(data))
  }

  static pasp ([hSpacing, vSpacing]) {
    return MP4.box(MP4.types.pasp, new Uint8Array([
      hSpacing >> 24, (hSpacing >> 16) & 0xff, (hSpacing >> 8) & 0xff, hSpacing & 0xff,
      vSpacing >> 24, (vSpacing >> 16) & 0xff, (vSpacing >> 8) & 0xff, vSpacing & 0xff
    ]))
  }

  static mp4a (track) {
    return MP4.box(MP4.types.mp4a, new Uint8Array([
      0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
      0x00, track.channelCount,
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      (track.sampleRate >> 8) & 0xff, track.sampleRate & 0xff,
      0x00, 0x00
    ]), track.config.length ? MP4.esds(track.config) : undefined)
  }

  static esds (config) {
    const len = config.length
    const esds = MP4.box(MP4.types.esds, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      0x03, // tag
      0x17 + len, // length
      0x00, 0x00, // ES_ID
      0x00, // streamDependenceFlag, URL_flag, reserved, streamPriority
      0x04, // tag
      0x0f + len, // length
      0x40, // object type
      0x15, // streamType
      0x00, 0x06, 0x00, // bufferSizeDB
      0x00, 0x00, 0xda, 0xc0, // maxBitrate
      0x00, 0x00, 0xda, 0xc0, // avgBitrate
      0x05 // tag, DecoderSpecificInfoTag
    ].concat([len])
      .concat(config)
      .concat(
        [0x06, 0x01, 0x02]// GASpecificConfig
      )
    ))
    // console.log('[remux],esds ,len ', esds.byteLength, hashVal(esds.toString()))
    return esds
  }

  static mvex (tracks) {
    // const mehd = MP4.box(MP4.types.mehd, this.extension(0, 0), Buffer.writeUint32(tracks[0].tkhdDuration))
    // const mvex = MP4.box(MP4.types.mvex, mehd, MP4.trex1(1), MP4.trex2(2))
    // // console.log('[remux],mvex, len,', mvex.byteLength, hashVal(mvex.toString()))
    // const mvex = MP4.box(MP4.types.mvex, MP4.trex1(1), MP4.trex2(2))
    const mvex = MP4.box(MP4.types.mvex, ...tracks.map((t) => MP4.trex(t.id)))
    // console.log('[remux],mvex, len,', mvex.byteLength, hashVal(mvex.toString()))
    return mvex
  }

  static trex (id) {
    const trex = MP4.box(MP4.types.trex, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      id >> 24, (id >> 16) & 0xff, (id >> 8) & 0xff, id & 0xff, // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x00, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]))
    // console.log('[remux],trex, len,', trex.byteLength, hashVal(trex.toString()))
    return trex
  }

  static trex1 (id) {
    const trex = MP4.box(MP4.types.trex, new Uint8Array([
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
    ]))
    // console.log('[remux],trex, len,', trex.byteLength, hashVal(trex.toString()))
    return trex
  }

  static trex2 (id) {
    const trex = MP4.box(MP4.types.trex, new Uint8Array([
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
    ]))
    // console.log('[remux],trex, len,', trex.byteLength, hashVal(trex.toString()))
    return trex
  }

  static moof (tracks) {
    const moof = MP4.box(MP4.types.moof, MP4.mfhd(tracks[0].samples ? tracks[0].samples[0].gopId : 0), ...tracks.map((t) => MP4.traf(t)))
    // console.log('[remux],moof, len', moof.byteLength)
    return moof
    // return MP4.box(MP4.types.moof, MP4.mfhd(tracks[0].gopId), ...tracks.map((t) => MP4.traf(t)))
  }

  static mfhd (sequenceNumber) {
    // sequenceNumber += 1
    const mfhd = MP4.box(MP4.types.mfhd, new Uint8Array([
      0x00, // version
      0x00, 0x00, 0x00, // flags
      sequenceNumber >> 24, (sequenceNumber >> 16) & 0xff, (sequenceNumber >> 8) & 0xff, sequenceNumber & 0xff
    ]))
    // console.log('[remux],mfhd, len,', mfhd.byteLength, hashVal(mfhd.toString()))
    return mfhd
  }

  static traf (track) {
    const tfhd = MP4.tfhd(track.id)
    // console.log('[remux],tfhd, len,', tfhd.byteLength, hashVal(tfhd.toString()), ', trackid = ', track.id)
    // console.log('[remux],tfdt,baseMediaDecodeTime,', track.baseMediaDecodeTime)
    const tfdt = MP4.tfdt(track, track.baseMediaDecodeTime)
    let sencLength = 0
    let samples
    if (track.isVideo && track.videoSenc) {
      samples = track.videoSenc
      samples.forEach(function (item) {
        sencLength = sencLength + 8
        if (item.subsamples && item.subsamples.length) {
          sencLength = sencLength + 2
          sencLength = sencLength + item.subsamples.length * 6
        }
      })
    }
    track.videoSencLength = sencLength
    // console.log('[remux],tfdt, len,', tfdt.toString().length)
    // console.log('[remux],tfdt, len,', tfdt.byteLength, hashVal(tfdt.toString()))
    if (!track.useEME || (!track.isVideoEncryption && !track.isAudioEncryption)) {
      const sdtp = MP4.sdtp(track)
      // console.log('[remux],sdtp, len,', sdtp.byteLength, hashVal(sdtp.toString()))
      const offset = 16 + // tfhd
        20 + // tfdt
        8 + // traf header
        16 + // mfhd
        8 + // moof header
        8 // mdat header
      return MP4.box(MP4.types.traf, tfhd, tfdt, sdtp, MP4.trun(track.samples, sdtp.byteLength + offset))
    } else if (track.isVideoEncryption) {
      if (track.isVideo) {
        // 加密视频
        const saiz = MP4.saiz(track)
        const saio = MP4.saio(track)
        const trun = MP4.trun1(track)
        const senc = MP4.senc(track)
        const traf = MP4.box(MP4.types.traf, tfhd, tfdt, saiz, saio, trun, senc)
        // console.log('[remux],trex_video, len,', traf.byteLength, hashVal(traf.toString()))
        return traf
      } else {
        // 视频加密，音频加密和未加密处理
        if (!track.isAudioEncryption) {
          // 音频未加密
          const sbgp = MP4.sbgp()
          const trun = MP4.trun1(track)
          return MP4.box(MP4.types.traf, tfhd, tfdt, sbgp, trun)
        } else {
          // 音频加密
          const sbgp = MP4.sbgp()
          const saiz = MP4.saiz(track)
          const saio = MP4.saio(track)
          const senc = MP4.senc(track)
          const trun = MP4.trun1(track)
          const traf = MP4.box(MP4.types.traf, tfhd, tfdt, sbgp, saiz, saio, senc, trun)
          // console.log('[remux],trex_audio, len,', traf.byteLength, hashVal(traf.toString()))
          return traf
        }
      }
    } else {
      // 视频未加密，音频加密
      if (track.isVideo) {
        const trun = MP4.trun1(track)
        return MP4.box(MP4.types.traf, tfhd, tfdt, trun)
      } else {
        const sbgp = MP4.sbgp()
        const saiz = MP4.saiz(track)
        const saio = MP4.saio(track)
        const senc = MP4.senc(track)
        const trun = MP4.trun1(track)
        const traf = MP4.box(MP4.types.traf, tfhd, tfdt, sbgp, saiz, saio, senc, trun)
        // console.log('[remux],trex, len,', traf.byteLength, hashVal(traf.toString()))
        return traf
      }
    }
  }

  static sdtp (data) {
    const buffer = new Buffer()
    data.samples.forEach(item => {
      buffer.write(new Uint8Array(data.isVideo ? [item.keyframe ? 32 : 16] : [16]))
    })
    return MP4.box(MP4.types.sdtp, this.extension(0, 0), buffer.buffer)
  }

  static trun1 (data) {
    // const id = data.id
    // const ceil = id === 1 ? 12 : 4
    const buffer = new Buffer()
    const sampleCount = Buffer.writeUint32(data.samples.length)
    let offset = null
    if (data.isVideo) {
      const sencLength = data.videoSencLength
      /*
      16 + // mfhd
      16 + // tfhd
      20 + // tfdt
      17 + //saiz
      24 + //saio
      data.samples.length*16
      4(offset) + 4(sampleCount) + 12(header)  //trun
      12(header) + sencLength //senc
      8 + // traf header
      8 + // moof header
      8 // mdat header
      = 149+data.samples.length * 16 + sencLength
       */
      offset = Buffer.writeUint32(data.samples.length * 16 + sencLength + 149)
      if (!data.isVideoEncryption && data.isAudioEncryption) {
        offset = Buffer.writeUint32(data.samples.length * 16 + 92)
      }
    } else {
      /*
      16 + // mfhd
      16 + // tfhd
      20 + // tfdt
      28 + //sbgp
      4(offset) + 4(sampleCount) + 12(header)  //trun
      8 + // traf header
      8 + // moof header
      8 // mdat header
       */
      let len = data.samples.length * 12 + 124
      if (data.isAudioEncryption) {
        len = data.samples.length * 12 + 8 * data.audioSenc.length + 177
      }
      offset = Buffer.writeUint32(len)
    }

    data.samples.forEach(item => {
      buffer.write(Buffer.writeUint32(item.duration))
      buffer.write(Buffer.writeUint32(item.size))
      buffer.write(Buffer.writeUint32(item.keyframe ? 0x02000000 : 0x00010000))
      if (data.isVideo) {
        buffer.write(Buffer.writeUint32(item.cts ? item.cts : 0))
      }
    })

    return MP4.box(MP4.types.trun, this.extension(0, data.flags), sampleCount, offset, buffer.buffer)
  }

  static senc (data) {
    const buffer = new Buffer()
    const len = data.samples.length
    const ceil = data.isVideo ? 16 : 8
    const flag = data.isVideo ? 2 : 0
    let samples = []
    let samplesLength = 0
    if (data.isVideo) {
      samples = data.videoSenc
      samplesLength = data.videoSencLength
    } else {
      samples = data.audioSenc
    }
    samplesLength = samplesLength || ceil * len
    buffer.write(
      Buffer.writeUint32(16 + samplesLength), MP4.types.senc, this.extension(0, flag)
    )
    buffer.write(Buffer.writeUint32(len))
    samples.forEach(item => {
      for (let i = 0; i < item.InitializationVector.length; i++) {
        buffer.write(new Uint8Array([item.InitializationVector[i]]))
      }
      if (item.subsamples && item.subsamples.length) {
        buffer.write(Buffer.writeUint16(item.subsamples.length))
        item.subsamples.forEach(value => {
          buffer.write(Buffer.writeUint16(value.BytesOfClearData))
          buffer.write(Buffer.writeUint32(value.BytesOfProtectedData))
        })
      }
    })
    return buffer.buffer
    // return MP4.box(MP4.types.senc, this.extension(0, flag), buffer.buffer)
  }

  static saio (data) {
    let length = data.samples.length * 12 + 141
    if (!data.isVideo && data.isAudioEncryption) {
      length = 149
    }
    const content = new Uint8Array([
      0x01, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00,
      (length >> 24) & 0xff,
      (length >> 16) & 0xff,
      (length >> 8) & 0xff,
      length & 0xff
    ])
    return MP4.box(MP4.types.saio, content)
  }

  static saiz (data) {
    const samplesLength = data.samples.length
    const content = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,
      0x10, // default sample info size
      (samplesLength >> 24) & 0xff,
      (samplesLength >> 16) & 0xff,
      (samplesLength >> 8) & 0xff,
      samplesLength & 0xff
    ])
    return MP4.box(MP4.types.saiz, content)
  }

  static sbgp () {
    const content = new Uint8Array([
      0x72, 0x6F, 0x6C, 0x6C, // sgpd, grouping_type
      0x00, 0x00, 0x00, 0x01,
      0x00, 0x00, 0x01, 0x19,
      0x00, 0x00, 0x00, 0x01
    ])
    return MP4.box(MP4.types.sbgp, this.extension(0, 0), content)
  }

  static extension (version, flag) {
    return new Uint8Array([
      version,
      (flag >> 16) & 0xff,
      (flag >> 8) & 0xff,
      flag & 0xff
    ])
  }

  static tfhd (id) {
    return MP4.box(MP4.types.tfhd, new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags todo 0x00
      id >> 24, (id >> 16) & 0xff, (id >> 8) & 0xff, id & 0xff // track_ID
    ]))
  }

  static tfdt (data, baseMediaDecodeTime) {
    const upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1))
    const lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1))
    if (data.useEME && (data.isVideoEncryption || data.isAudioEncryption)) {
      return MP4.box(MP4.types.tfdt, new Uint8Array([
        0x00, // version 0
        0x00, 0x00, 0x00, // flags
        lowerWordBaseMediaDecodeTime >> 24,
        (lowerWordBaseMediaDecodeTime >> 16) & 0xff,
        (lowerWordBaseMediaDecodeTime >> 8) & 0xff,
        lowerWordBaseMediaDecodeTime & 0xff
      ]))
    } else {
      return MP4.box(MP4.types.tfdt, new Uint8Array([
        0x01, // version 1
        0x00, 0x00, 0x00, // flags
        upperWordBaseMediaDecodeTime >> 24,
        (upperWordBaseMediaDecodeTime >> 16) & 0xff,
        (upperWordBaseMediaDecodeTime >> 8) & 0xff,
        upperWordBaseMediaDecodeTime & 0xff,
        lowerWordBaseMediaDecodeTime >> 24,
        (lowerWordBaseMediaDecodeTime >> 16) & 0xff,
        (lowerWordBaseMediaDecodeTime >> 8) & 0xff,
        lowerWordBaseMediaDecodeTime & 0xff
      ]))
    }
  }

  static trun (samples, offset) {
    const sampleLen = samples.length
    const dataLen = 12 + (16 * sampleLen)
    offset += 8 + dataLen
    const data = new Uint8Array(dataLen)
    data.set([
      0x00, // version
      0x00, 0x0f, 0x01, // flags
      (sampleLen >>> 24) & 0xff, (sampleLen >>> 16) & 0xff, (sampleLen >>> 8) & 0xff, sampleLen & 0xff,
      (offset >>> 24) & 0xff, (offset >>> 16) & 0xff, (offset >>> 8) & 0xff, offset & 0xff // data_offset
    ], 0)
    for (let i = 0; i < sampleLen; i++) {
      const {
        duration, size, flag = {}, cts = 0
      } = samples[i]
      data.set([
        (duration >>> 24) & 0xff, (duration >>> 16) & 0xff, (duration >>> 8) & 0xff, duration & 0xff,
        (size >>> 24) & 0xff, (size >>> 16) & 0xff, (size >>> 8) & 0xff, size & 0xff,
        (flag.isLeading << 2) | (flag.dependsOn === null || flag.dependsOn === undefined ? 1 : flag.dependsOn),
        (flag.isDependedOn << 6) | (flag.hasRedundancy << 4) | (flag.paddingValue << 1) | (flag.isNonSyncSample === null || flag.isNonSyncSample === undefined ? 1 : flag.isNonSyncSample),
        flag.degradationPriority & (0xf0 << 8), flag.degradationPriority & 0x0f, // sample_flags
        (cts >>> 24) & 0xff, (cts >>> 16) & 0xff, (cts >>> 8) & 0xff, cts & 0xff // sample_composition_time_offset
      ], 12 + 16 * i)
    }

    return MP4.box(MP4.types.trun, data)
  }

  static moovMP4 (tracks) {
    return MP4.box(MP4.types.moov,
      MP4.mvhd(tracks[0].duration, tracks[0].timescale),
      ...tracks.map((t) => MP4.trackMP4(t)))
  }

  static trackMP4 (track) {
    return MP4.box(
      MP4.types.trak,
      MP4.tkhd(track.id, track.duration, track.width, track.height),
      MP4.mdiaMP4(track)
    )
  }

  static mdiaMP4 (track) {
    return MP4.box(MP4.types.mdia, MP4.mdhd(track.duration, track.timescale), MP4.hdlr(track.type), MP4.minfMP4(track))
  }

  static minfMP4 (track) {
    return MP4.box(MP4.types.minf, track.type === TrackType.VIDEO ? MP4.VMHD : MP4.SMHD, MP4.DINF, MP4.stblMP4(track))
  }

  static stblMP4 (track) {
    const { ext } = track
    const boxes = [
      MP4.stsd(track),
      MP4.stts(ext.stts),
      MP4.stsc(ext.stsc),
      MP4.stsz(ext.stsz),
      MP4.stco(ext.stco)
    ]

    if (ext.stss.length) {
      boxes.push(MP4.stss(ext.stss))
    }

    if (ext.ctts.length) {
      boxes.push(MP4.ctts(ext.ctts))
    }

    return MP4.box(MP4.types.stbl, ...boxes)
  }

  static stts (samples) {
    const len = samples.length
    const data = new Uint8Array(8 * len)
    let offset = 0
    samples.forEach(({ value, count }) => {
      data.set([
        count >> 24, (count >> 16) & 0xff, (count >> 8) & 0xff, count & 0xff,
        value >> 24, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff
      ], offset)
      offset += 8
    })

    return MP4.box(MP4.types.stts, concatUint8Array(new Uint8Array([
      0, 0, 0, 0,
      (len >> 24), (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
    ]), data))
  }

  static stsc (entries) {
    const len = entries.length
    const data = new Uint8Array(12 * len)
    let offset = 0
    entries.forEach(({ firstChunk, samplesPerChunk, sampleDescIndex }) => {
      data.set([
        firstChunk >> 24, (firstChunk >> 16) & 0xff, (firstChunk >> 8) & 0xff, firstChunk & 0xff,
        samplesPerChunk >> 24, (samplesPerChunk >> 16) & 0xff, (samplesPerChunk >> 8) & 0xff, samplesPerChunk & 0xff,
        sampleDescIndex >> 24, (sampleDescIndex >> 16) & 0xff, (sampleDescIndex >> 8) & 0xff, sampleDescIndex & 0xff
      ], offset)
      offset += 12
    })
    return MP4.box(MP4.types.stsc, concatUint8Array(new Uint8Array([
      0, 0, 0, 0,
      (len >> 24), (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
    ]), data))
  }

  static stsz (samplesSizes) {
    const len = samplesSizes.length
    const data = new Uint8Array(4 * len)
    let offset = 0
    samplesSizes.forEach((x) => {
      data.set([
        x >> 24, (x >> 16) & 0xff, (x >> 8) & 0xff, x & 0xff
      ], offset)
      offset += 4
    })
    return MP4.box(MP4.types.stsz, concatUint8Array(
      new Uint8Array([
        0, 0, 0, 0,
        0, 0, 0, 0,
        len >> 24, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
      ]),
      data
    ))
  }

  static stco (offsets) {
    const len = offsets.length
    const data = new Uint8Array(4 * len)
    let offset = 0
    offsets.forEach((x) => {
      data.set([
        x >> 24, (x >> 16) & 0xff, (x >> 8) & 0xff, x & 0xff
      ], offset)
      offset += 4
    })
    return MP4.box(MP4.types.stco, concatUint8Array(
      new Uint8Array([
        0, 0, 0, 0,
        len >> 24, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
      ]),
      data
    ))
  }

  static stss (keyframeIndexes) {
    const len = keyframeIndexes.length
    const data = new Uint8Array(4 * len)
    let offset = 0
    keyframeIndexes.forEach((x) => {
      data.set([
        x >> 24, (x >> 16) & 0xff, (x >> 8) & 0xff, x & 0xff
      ], offset)
      offset += 4
    })
    return MP4.box(MP4.types.stss, concatUint8Array(
      new Uint8Array([
        0, 0, 0, 0,
        len >> 24, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
      ]),
      data
    ))
  }

  static ctts (samples) {
    const len = samples.length
    const data = new Uint8Array(8 * len)
    let offset = 0
    samples.forEach(({ value, count }) => {
      data.set([
        count >> 24, (count >> 16) & 0xff, (count >> 8) & 0xff, count & 0xff,
        value >> 24, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff
      ], offset)
      offset += 8
    })
    return MP4.box(MP4.types.ctts, concatUint8Array(new Uint8Array([
      0, 0, 0, 0,
      len >> 24, (len >> 16) & 0xff, (len >> 8) & 0xff, len & 0xff
    ]), data))
  }

  static styp () {
    return MP4.box(MP4.types.styp, new Uint8Array([
      0x6D, 0x73, 0x64, 0x68,
      0x00, 0x00, 0x00, 0x00,
      0x6D, 0x73, 0x64, 0x68,
      0x6D, 0x73, 0x69, 0x78
    ]))
  }

  // data.sampleOffset 指的是samples的序列号。_samples[0].idx
  static sidx (data) {
    // const buffer = new Buffer()
    const timescale = data.timescale
    const duration = data.samples[0].duration
    const durationCount = duration * data.samples.length
    const earliestTime = data.samples[0].sampleOffset * duration
    let mdatSize = 8
    data.samples.forEach(item => {
      mdatSize += item.size
    })
    let length = 0
    if (data.isVideo) {
      let sencLength = 0
      let samples
      if (data.videoSenc) {
        samples = data.videoSenc
      }
      if (data.isVideo) {
        samples.forEach(item => {
          sencLength = sencLength + 8
          if (item.subsamples && item.subsamples.length) {
            sencLength = sencLength + 2
            sencLength = sencLength + item.subsamples.length * 6
          }
        })
      }
      data.videoSencLength = sencLength
      length = mdatSize + 141 + data.samples.length * 16 + sencLength
      if (data.useEME && data.isAudioEncryption && !data.isVideoEncryption) {
        length = mdatSize + (data.samples.length * 16) + 84
      }
    } else {
      length = mdatSize + 116 + data.samples.length * 12
      if (data.useEME && data.isAudioEncryption) {
        length = mdatSize + 169 + data.samples.length * 12 + 8 * data.audioSenc.length
      }
    }

    const content = new Uint8Array([
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, data.id & 0xff, // ref_id
      (timescale >> 24) & 0xff,
      (timescale >> 16) & 0xff,
      (timescale >> 8) & 0xff,
      timescale & 0xff, // timescale
      (earliestTime >> 24) & 0xff,
      (earliestTime >> 16) & 0xff,
      (earliestTime >> 8) & 0xff,
      earliestTime & 0xff, // earliest_presentation_time
      0x00, 0x00, 0x00, 0x00, // first_offset
      0x00, 0x00, // reserved
      0x00, 0x01, // ref_count
      // 0x00, 0x04, 0x11, 0xCF, // ref_size + ref_type
      // 0x00, 0x01, 0x0A, 0xA6, // ref_size + ref_type
      0x00, // ref_size + ref_type ref_size = moof.size + mdat.size
      (length >> 16) & 0xff,
      (length >> 8) & 0xff,
      length & 0xff,
      (durationCount >> 24) & 0xff,
      (durationCount >> 16) & 0xff,
      (durationCount >> 8) & 0xff,
      durationCount & 0xff,
      0x90, 0x00, 0x00, 0x00
    ])
    return MP4.box(MP4.types.sidx, content)
  }

  static mdat (data) {
    const mdat = MP4.box(MP4.types.mdat, data)
    // console.log('[remux],mdat ,len ', mdat.byteLength, hashVal(mdat.toString()))
    return mdat
  }
}
