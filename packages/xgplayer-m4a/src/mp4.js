import EventEmitter from 'event-emitter'
import Merge from 'deepmerge'
import Parser from './parse'
import Buffer from './fmp4/buffer'
import FMP4 from './fmp4/mp4'
import Task from './media/task'
// import Download from './util/download'
import util from './util'
import { Util } from 'xgplayer'
import Errors from './error'

class MP4 {
  /**
     * [constructor 构造函数]
     * @param {String} url                      [视频地址]
     * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
     */
  constructor (url, chunkSize = 1024) {
    EventEmitter(this)
    this.url = url
    this.CHUNK_SIZE = chunkSize
    this.reqTimeLength = 5
    this.init(url)
    this.once('mdatReady', this.moovParse.bind(this))
    this.cache = new Buffer()
    this.bufferCache = new Set()
    this.mdatCache = []
    this.timeRage = []
    this.canDownload = true
    this.cut = false
  }

  /**
     * [getData 根据字节区间下载二进制数据]
     * @param  {Number} [start=0]  [起始字节]
     * @param  {Number} [end=start + this.CHUNK_SIZE] [截止字节]
     */
  getData (start = 0, end = start + this.CHUNK_SIZE) {
    let self = this
    return new Promise((resolve, reject) => {
      let task = new Task(this.url, [
        start, end
      ], resolve)
      task.once('error', err => {
        self.emit('error', err)
      })
    })
  }

  /**
     * [moovParse 解析视频信息]
     * @return {[type]} [description]
     */
  moovParse () {
    let self = this
    let moov = this.moovBox
    let mvhd = util.findBox(moov, 'mvhd')
    let traks = util.findBox(moov, 'trak')
    let audioTrak
    let audioCodec
    let audioTimeScale
    let channelCount,
      sampleRate,
      decoderConfig
    if (Util.typeOf(traks) !== 'Array') {
      traks = [traks]
    }
    traks.forEach(trak => {
      let hdlr = util.findBox(trak, 'hdlr')
      let mdhd = util.findBox(trak, 'mdhd')
      if (!hdlr || !mdhd) {
        self.emit('error', new Errors('parse', '', {line: 72, handle: '[MP4] moovParse', url: self.url}))
        return
      }
      let stsd = util.findBox(trak, 'stsd')
      let codecBox = stsd.subBox[0]
      if (hdlr.handleType === 'soun') {
        audioTrak = trak
        let esds = util.findBox(trak, 'esds')
        let mp4a = util.findBox(trak, 'mp4a')
        let ESDescriptor = util.findBox(trak, 5)
        audioTimeScale = mdhd.timescale
        if (esds) {
          audioCodec = `${codecBox.type}.` + util.toHex(esds.subBox[0].subBox[0].typeID) + `.${esds.subBox[0].subBox[0].subBox[0].type}`
        } else {
          audioCodec = `${codecBox.type}`
        }
        if (ESDescriptor && ESDescriptor.EScode) {
          decoderConfig = ESDescriptor.EScode.map((item) => Number(`0x${item}`))
        }
        if (mp4a) {
          channelCount = mp4a.channelCount
          sampleRate = mp4a.sampleRate
        }
      }
    })
    this.audioTrak = Merge({}, audioTrak)
    let mdat = this._boxes.find(item => item.type === 'mdat')
    let audioDuration = parseFloat(util.seekTrakDuration(audioTrak, audioTimeScale))
    this.mdatStart = mdat.start
    this.sampleCount = util.sampleCount(util.findBox(this.audioTrak, 'stts').entry)

    let audioFrame, audioNextFrame
    let stts = util.findBox(this.audioTrak, 'stts').entry
    for (let i = 0; i < audioDuration; i += this.reqTimeLength) {
      audioFrame = util.seekOrderSampleByTime(stts, audioTimeScale, i)
      if (i + this.reqTimeLength < audioDuration) {
        audioNextFrame = util.seekOrderSampleByTime(stts, audioTimeScale, i + this.reqTimeLength)
        this.timeRage.push([
          {time: audioFrame.startTime, order: audioFrame.order},
          {time: audioNextFrame.startTime, order: audioNextFrame.order}
        ])
      } else {
        this.timeRage.push([
          {time: audioFrame.startTime, order: audioFrame.order},
          {time: audioDuration, order: this.sampleCount - 1}
        ])
      }
    }
    // console.log('this.timeRage')
    // console.log(this.timeRage)
    this.meta = {
      audioCodec,
      createTime: mvhd.createTime,
      modifyTime: mvhd.modifyTime,
      duration: mvhd.duration / mvhd.timeScale,
      timeScale: mvhd.timeScale,
      audioDuration,
      audioTimeScale,
      endTime: audioDuration,
      channelCount,
      sampleRate,
      audioConfig: decoderConfig
    }
  }

  /**
     * [init 实例的初始化，主要是获取视频的MOOV元信息]
     */
  init () {
    let self = this
    self.getData().then((resFir) => {
      let parsedFir
      let mdatStart = 0

      let mdat, moov, ftyp

      let boxes
      try {
        parsedFir = new Parser(resFir)
      } catch (e) {
        self.emit('error', e.type ? e : new Errors('parse', '', {line: 176, handle: '[MP4] init', msg: e.message}))
        return false
      }
      self._boxes = boxes = parsedFir.boxes
      boxes.every(item => {
        if (item.type === 'ftyp') {
          mdatStart += item.size
          ftyp = item
          self.ftypBox = ftyp
          self.ftypBuffer = resFir.slice(0, ftyp.size)
        } else if (item.type === 'mdat') {
          mdat = item
          mdat.start = mdatStart
          mdatStart += item.size
          self.mdatBox = mdat
          // self.emit('mdatReady', moov)
        }
        return true
      })
      if (!mdat) {
        let nextBox = parsedFir.nextBox
        if (nextBox) {
          if (nextBox.type === 'moov' || nextBox.type === 'free') {
            self.getData(mdatStart, mdatStart + nextBox.size + 1024).then(resSec => {
              let parsedSec = new Parser(resSec)
              self._boxes = self._boxes.concat(parsedSec.boxes)
              parsedSec.boxes.every(item => {
                if (item.type === 'moov') {
                  mdatStart += item.size
                  moov = item
                  self.moovBox = moov
                  self.moovBuffer = resSec.slice(0, moov.size)
                  return true
                } else if (item.type === 'mdat') {
                  mdat = item
                  mdat.start = mdatStart
                  mdatStart += item.size
                  self.mdatBox = mdat
                  self.emit('mdatReady', moov)
                  return false
                } else {
                  mdatStart += item.size
                  return true
                }
              })
              if (!mdat) {
                let nextBoxSec = parsedSec.nextBox
                if (nextBoxSec) {
                  if (nextBoxSec.type === 'free') {
                    self.getData(mdatStart, mdatStart + nextBoxSec.size + 1024).then(resThi => {
                      let parsedThi = new Parser(resThi)
                      self._boxes = self._boxes.concat(parsedThi.boxes)
                      parsedThi.boxes.every(item => {
                        if (item.type === 'mdat') {
                          mdat = item
                          mdat.start = mdatStart
                          self.mdatBox = mdat
                          self.emit('mdatReady', moov)
                          return false
                        } else if (item.type === 'free') {
                          self.freeBuffer = resThi.slice(0, item.size)
                          mdatStart += item.size
                          return true
                        } else {
                          mdatStart += item.size
                          return true
                        }
                      })
                      if (!mdat) {
                        self.emit('error', new Errors('parse', '', {line: 207, handle: '[MP4] init', msg: 'not find mdat box'}))
                      }
                    }).catch(() => {
                      self.emit('error', new Errors('network', '', {line: 210, handle: '[MP4] getData', msg: 'getData failed'}))
                    })
                  } else {
                    self.emit('error', new Errors('parse', '', {line: 213, handle: '[MP4] init', msg: 'not find mdat box'}))
                  }
                } else {
                  self.emit('error', new Errors('parse', '', {line: 216, handle: '[MP4] init', msg: 'not find mdat box'}))
                }
              }
            }).catch(() => {
              self.emit('error', new Errors('network', '', {line: 220, handle: '[MP4] getData', msg: 'getData failed'}))
            })
          } else {
            self.emit('error', new Errors('parse', '', {line: 223, handle: '[MP4] init', msg: 'not find mdat box'}))
          }
        } else {
          self.emit('error', new Errors('parse', '', {line: 226, handle: '[MP4] init', msg: 'not find mdat box'}))
        }
      } else {
        let nextBox = parsedFir.nextBox
        if (nextBox) {
          self.emit('error', new Errors('parse', '', {line: 223, handle: '[MP4] init', msg: 'not find moov box'}))
        } else {
          self.getData(mdatStart, mdatStart + 1024).then(resSec => {
            let parsedSec = new Parser(resSec)
            self._boxes = self._boxes.concat(parsedSec.boxes)
            parsedSec.boxes.every(item => {
              if (item.type === 'moov') {
                mdatStart += item.size
                moov = item
                self.moovBox = moov
                self.moovBuffer = resSec.slice(0, moov.size)
                self.emit('mdatReady', moov)
                return false
              } else {
                mdatStart += item.size
                return true
              }
            })
            if (!moov) {
              let nextBoxSec = parsedSec.nextBox
              if (nextBoxSec) {
                if (nextBoxSec.type === 'moov') {
                  self.getData(mdatStart, mdatStart + nextBoxSec.size - 1).then(resThi => {
                    let parsedThi = new Parser(resThi)
                    self._boxes = self._boxes.concat(parsedThi.boxes)
                    parsedThi.boxes.every(item => {
                      if (item.type === 'moov') {
                        mdatStart += item.size
                        moov = item
                        self.moovBox = moov
                        self.moovBuffer = resSec.slice(0, moov.size)
                        self.emit('mdatReady', moov)
                        return false
                      } else {
                        mdatStart += item.size
                        return true
                      }
                    })
                    if (!moov) {
                      self.emit('error', new Errors('parse', '', {line: 207, handle: '[MP4] init', msg: 'not find moov box'}))
                    }
                  }).catch(() => {
                    self.emit('error', new Errors('network', '', {line: 210, handle: '[MP4] getData', msg: 'getData failed'}))
                  })
                } else {
                  self.emit('error', new Errors('parse', '', {line: 213, handle: '[MP4] init', msg: 'not find moov box'}))
                }
              } else {
                self.emit('error', new Errors('parse', '', {line: 216, handle: '[MP4] init', msg: 'not find moov box'}))
              }
            }
          }).catch(() => {
            self.emit('error', new Errors('network', '', {line: 220, handle: '[MP4] getData', msg: 'getData failed'}))
          })
        }
      }
    }).catch(() => {
      self.emit('error', new Errors('network', '', {line: 230, handle: '[MP4] getData', msg: 'getData failed'}))
    })
  }

  getSamplesByOrders (type = 'audio', start, end) {
    let trak = this.audioTrak
    let stsc = util.findBox(trak, 'stsc') // chunk~samples
    let stsz = util.findBox(trak, 'stsz') // sample-size
    let stts = util.findBox(trak, 'stts') // sample-time
    let stco = util.findBox(trak, 'stco') // chunk-offset
    let ctts = util.findBox(trak, 'ctts') // offset-compositime
    let mdatStart = this.mdatStart
    let samples = []
    end = end !== undefined
      ? end
      : stsz.entries.length
    if (start instanceof Array) {
      start.forEach((item, idx) => {
        samples.push({
          idx: item,
          size: stsz.entries[item],
          time: util.seekSampleTime(stts, ctts, item),
          offset: util.seekSampleOffset(stsc, stco, stsz, item, mdatStart)
        })
      })
    } else if (end !== 0) {
      for (let i = start; i < end; i++) {
        samples.push({
          idx: i,
          size: stsz.entries[i],
          time: util.seekSampleTime(stts, ctts, i),
          offset: util.seekSampleOffset(stsc, stco, stsz, i, mdatStart)
        })
      }
    } else {
      samples = {
        idx: start,
        size: stsz.entries[start],
        time: util.seekSampleTime(stts, ctts, start),
        offset: util.seekSampleOffset(stsc, stco, stsz, start, mdatStart)
      }
    }
    return samples
  }

  packMeta (meta) {
    if (!meta) {
      return
    }
    let buffer = new Buffer()
    buffer.write(FMP4.ftyp())
    buffer.write(FMP4.moov(meta))
    this.cache.write(buffer.buffer)
    return buffer.buffer
  }

  seek (time, audioIndexOrder = null, audioNextIndexOrder = null) {
    let audioStts = util.findBox(this.audioTrak, 'stts').entry
    if (!audioIndexOrder) {
      audioIndexOrder = util.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time).order
    }
    if (!audioNextIndexOrder) {
      if (time + this.reqTimeLength < this.meta.audioDuration) {
        audioNextIndexOrder = util.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time + this.reqTimeLength).order
      }
    }
    if (this.bufferCache.has(audioIndexOrder)) {
      return Promise.resolve(null)
    } else {
      return this.loadFragment(audioIndexOrder, audioNextIndexOrder)
    }
  }

  loadFragment (audioIndexOrder, audioNextIndexOrder) {
    let start,
      end
    let self = this
    let audioFrame = this.getSamplesByOrders('audio', audioIndexOrder, 0)
    start = audioFrame.offset
    let audioNextFrame
    if (audioNextIndexOrder) {
      audioNextFrame = this.getSamplesByOrders('audio', audioNextIndexOrder, 0)
      end = audioNextFrame.offset - 1
    } else {
      audioNextFrame = this.getSamplesByOrders('audio', this.sampleCount - 1, 0)
      end = audioNextFrame.offset + audioNextFrame.size - 1
    }
    // console.log('start order')
    // console.log(audioIndexOrder)
    // console.log('start')
    // console.log(start + self.mdatStart)
    // console.log('end order')
    // console.log(audioNextIndexOrder)
    // console.log('end')
    // console.log(self.mdatStart + end)
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      self.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }))
      return false
    }
    return this.getData(
      start + self.mdatStart, end
        ? self.mdatStart + end
        : '').then((dat) => {
      if (end) {
        this.mdatCache.push({
          start: start + self.mdatStart,
          end: self.mdatStart + end,
          buffer: new Uint8Array(dat)
        })
      }
      return self.createFragment(new Uint8Array(dat), start, audioIndexOrder, audioNextIndexOrder)
    })
  }
  addFragment (data) {
    let buffer = new Buffer()
    buffer.write(FMP4.moof(data))
    buffer.write(FMP4.mdat(data))
    this.cache.write(buffer.buffer)
    return buffer.buffer
  }
  createFragment (mdatData, start, audioIndexOrder, audioNextIndexOrder) {
    let resBuffers = []
    this.bufferCache.add(audioIndexOrder)
    let _samples = this.getSamplesByOrders(
      'audio', audioIndexOrder, audioNextIndexOrder)
    let samples = _samples.map((item, idx) => {
      return {
        size: item.size,
        duration: item.time.duration,
        offset: item.time.offset,
        buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
        key: idx === 0
      }
    })
    resBuffers.push(this.addFragment({id: 2, time: this.cut ? 0 : _samples[0].time.time, firstFlags: 0x00, flags: 0x701, samples: samples}))
    let bufferSize = 0
    resBuffers.every(item => {
      bufferSize += item.byteLength
      return true
    })
    let buffer = new Uint8Array(bufferSize)

    let offset = 0
    resBuffers.every(item => {
      buffer.set(item, offset)
      offset += item.byteLength
      return true
    })
    return Promise.resolve(buffer)
  }

  download () {
    // new Download('fmp4.mp4', this.cache.buffer)
  }
}

export default MP4
