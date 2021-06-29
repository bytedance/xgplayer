import Buffer from './buffer'
import Fmp4 from './fmp4'

class Mp4 extends Fmp4 {
  static moov ({ type, meta }) {
    let size = 8
    let mvhd = Mp4.mvhd(meta.duration, meta.timescale)
    let trak

    if (type === 'video') {
      trak = Mp4.videoTrak(meta)
    } else {
      trak = Mp4.audioTrak(meta)
    }

    [mvhd, trak].forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'moov', mvhd, trak)
  }
  static videoTrak (data) {
    let size = 8

    let tkhd = Mp4.tkhd({
      id: 1,
      duration: data.duration,
      timescale: data.timescale || 1000,
      width: data.presentWidth,
      height: data.presentHeight,
      type: 'video'
    })
    let mdia = Mp4.mdia({
      type: 'video',
      timescale: data.timescale || 1000,
      duration: data.duration,
      avcc: data.avcc,
      parRatio: data.parRatio,
      width: data.presentWidth,
      height: data.presentHeight,
      streamType: data.streamType,
      sampleDeltas: data.sampleDeltas,
      keyFrames: data.keyFrames,
      sampleCtss: data.sampleCtss,
      chunks: data.chunks,
      sampleSizes: data.sampleSizes,
      chunksOffset: data.chunksOffset
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'trak', tkhd, mdia)
  }
  static mdia (data) {
    let size = 8
    let mdhd = Mp4.mdhd(data.timescale, data.duration)
    let hdlr = Mp4.hdlr(data.type)
    let minf = Mp4.minf(data);
    [mdhd, hdlr, minf].forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'mdia', mdhd, hdlr, minf)
  }
  static minf (data) {
    let size = 8
    let vmhd = data.type === 'video' ? Mp4.vmhd() : Mp4.smhd()
    let dinf = Mp4.dinf()
    let stbl = Mp4.stbl(data);
    [vmhd, dinf, stbl].forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'minf', vmhd, dinf, stbl)
  }
  static stbl (data) {
    let size = 8
    let stsd = Mp4.stsd(data)
    let stts = Mp4.stts(data.sampleDeltas)
    let stss = Mp4.stss(data.keyFrames)
    let ctts = Mp4.ctts(data.sampleCtss)
    let stsc = Mp4.stsc(data.chunks)
    let stsz = Mp4.stsz(data.sampleSizes)
    let stco = Mp4.stco(data.chunksOffset);
    [stsd, stts, stss, ctts, stsc, stsz, stco].forEach(item => {
    // [stsd, stts, stss, stsc, stsz, stco].forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'stbl', stsd, stts, stss, ctts, stsc, stsz, stco)
    // return Mp4.initBox(size, 'stbl', stsd, stts, stss, stsc, stsz, stco)
  }
  /**
   * @description dts-sample的映射表，可以计算出每个sample的dts
   * @param {object} data
   */
  static stts (data) {
    let entryCount = data.length
    let uCount = new Uint8Array([
      (entryCount >> 24),
      (entryCount >> 16) & 0xff,
      (entryCount >> 8) & 0xff,
      entryCount & 0xff
    ])
    let entryByteLength = 8 * entryCount
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < entryCount; i++) {
      let count = data[i].deltaCount
      let delta = data[i].delta
      let uDelta = new Uint8Array([
        (count >> 24),
        (count >> 16) & 0xff,
        (count >> 8) & 0xff,
        count & 0xff,
        (delta >> 24),
        (delta >> 16) & 0xff,
        (delta >> 8) & 0xff,
        delta & 0xff
      ])
      uEntry.set(uDelta, offset)
      offset += 8
    }
    let buffer = new Buffer()
    buffer.write(Mp4.size(12 + 4 + entryByteLength), Mp4.type('stts'), Mp4.extension(0, 0), uCount, uEntry)
    return buffer.buffer
  }

  /**
   * @description 可以计算出pts，保存了每个sample与dts的差值
   * @param {object} data
   */
  static ctts (data) {
    let entryCount = data.length
    let uCount = new Uint8Array([
      (entryCount >> 24),
      (entryCount >> 16) & 0xff,
      (entryCount >> 8) & 0xff,
      entryCount & 0xff
    ])
    let entryByteLength = 8 * entryCount
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < entryCount; i++) {
      let count = data[i].ctsCount
      let delta = data[i].cts
      let uDelta = new Uint8Array([
        (count >> 24),
        (count >> 16) & 0xff,
        (count >> 8) & 0xff,
        count & 0xff,
        (delta >> 24),
        (delta >> 16) & 0xff,
        (delta >> 8) & 0xff,
        delta & 0xff
      ])
      uEntry.set(uDelta, offset)
      offset += 8
    }
    let buffer = new Buffer()
    buffer.write(Mp4.size(12 + 4 + entryByteLength), Mp4.type('ctts'), Mp4.extension(0, 0), uCount, uEntry)
    return buffer.buffer
  }

  /**
   * @description trunk和sample的映射表
   * @param {object} data
   */
  static stsc (data) {
    let entryCount = data.length
    let uCount = new Uint8Array([
      (entryCount >> 24),
      (entryCount >> 16) & 0xff,
      (entryCount >> 8) & 0xff,
      entryCount & 0xff
    ])
    let entrySize = 12
    let entryByteLength = entrySize * entryCount
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < entryCount; i++) {
      let firstChunk = data[i].firstChunk
      let samplesPerChunk = data[i].samplesPerChunk
      let index = data[i].sampleDescIndex
      let uDelta = new Uint8Array([
        (firstChunk >> 24),
        (firstChunk >> 16) & 0xff,
        (firstChunk >> 8) & 0xff,
        firstChunk & 0xff,
        (samplesPerChunk >> 24),
        (samplesPerChunk >> 16) & 0xff,
        (samplesPerChunk >> 8) & 0xff,
        samplesPerChunk & 0xff,
        (index >> 24),
        (index >> 16) & 0xff,
        (index >> 8) & 0xff,
        index & 0xff
      ])
      uEntry.set(uDelta, offset)
      offset += entrySize
    }
    let buffer = new Buffer()
    buffer.write(Mp4.size(12 + 4 + entryByteLength), Mp4.type('stsc'), Mp4.extension(0, 0), uCount, uEntry)
    return buffer.buffer
  }

  /**
   * @description 每个sample的字节数
   */
  static stsz (data) {
    let count = data.length
    let entryByteLength = 4 * count
    let uSampleSize = new Uint8Array([
      0x00, 0x00, 0x00, 0x00
    ])
    let uCount = new Uint8Array([
      (count >> 24),
      (count >> 16) & 0xff,
      (count >> 8) & 0xff,
      count & 0xff
    ])
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < count; i++) {
      let size = data[i]
      let uSize = new Uint8Array([
        (size >> 24),
        (size >> 16) & 0xff,
        (size >> 8) & 0xff,
        size & 0xff
      ])
      uEntry.set(uSize, offset)
      offset += 4
    }
    let buffer = new Buffer()
    // headersize + countsize + entryByteLength
    buffer.write(Mp4.size(12 + 4 + 4 + entryByteLength), Mp4.type('stsz'), Mp4.extension(0, 0), uSampleSize, uCount, uEntry)
    return buffer.buffer
  }

  /**
   * @description 关键帧列表，表示哪个sample时关键帧
   */
  static stss (data) {
    let count = data.length
    let entryByteLength = 4 * count
    let uCount = new Uint8Array([
      (count >> 24),
      (count >> 16) & 0xff,
      (count >> 8) & 0xff,
      count & 0xff
    ])
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < count; i++) {
      let index = data[i]
      let uDelta = new Uint8Array([
        (index >> 24),
        (index >> 16) & 0xff,
        (index >> 8) & 0xff,
        index & 0xff
      ])
      uEntry.set(uDelta, offset)
      offset += 4
    }
    let buffer = new Buffer()
    // headersize + countsize + entryByteLength
    buffer.write(Mp4.size(12 + 4 + entryByteLength), Mp4.type('stss'), Mp4.extension(0, 0), uCount, uEntry)
    return buffer.buffer
  }

  /**
   * @description chunk offset表，存储了chunk在文件中的偏移量
   */
  static stco (data) {
    let count = data.length
    let entryByteLength = 4 * count

    let uCount = new Uint8Array([
      (count >> 24),
      (count >> 16) & 0xff,
      (count >> 8) & 0xff,
      count & 0xff
    ])
    let uEntry = new Uint8Array(entryByteLength)
    let offset = 0
    for (let i = 0; i < count; i++) {
      let size = data[i]
      let uSize = new Uint8Array([
        (size >> 24),
        (size >> 16) & 0xff,
        (size >> 8) & 0xff,
        size & 0xff
      ])
      uEntry.set(uSize, offset)
      offset += 4
    }
    let buffer = new Buffer()

    buffer.write(Mp4.size(12 + 4 + entryByteLength), Mp4.type('stco'), Mp4.extension(0, 0), uCount, uEntry)
    return buffer.buffer
  }
}

export default Mp4
