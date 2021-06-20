/* eslint-disable array-callback-return */
import EventEmitter from 'event-emitter'
import Merge from 'deepmerge'
import Parser from './parse'
import Buffer from './fmp4/buffer'
import FMP4 from './fmp4/mp4'
import Task from './media/task'
import util from './util'
import Errors from './error'
import Concat from 'concat-typed-array'

class MP4 {
  /**
     * [constructor 构造函数]
     * @param {String} url                      [视频地址]
     * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
     */
  constructor (url, options, chunkSize = Math.pow(25, 4)) {
    EventEmitter(this)
    this.url = url
    this.options = options
    this.withCredentials = options.withCredentials
    FMP4.videoOnly = this.videoOnly = options.videoOnly || false
    this.CHUNK_SIZE = chunkSize
    this.init(url)
    this.once('moovReady', this.moovParse.bind(this))
    this.cache = new Buffer()
    this.bufferCache = new Set()
    this.timeRage = []
    this.canDownload = true
    this.bufferLoaded = new Uint8Array(0)
    this._boxes = []
    this.count = 0
  }

  /**
     * [getData 根据字节区间下载二进制数据]
     * @param  {Number} [start=0]  [起始字节]
     * @param  {Number} [end=start + this.CHUNK_SIZE] [截止字节]
     */
  getData (start = 0, end = start + this.CHUNK_SIZE) {
    const self = this
    return new Promise((resolve, reject) => {
      const task = new Task(this.url, [start, end], this.options.headers || {}, this.withCredentials, resolve, reject)
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
    const self = this
    const moov = this.moovBox
    const mvhd = util.findBox(moov, 'mvhd')
    let traks = util.findBox(moov, 'trak')
    let videoTrak,
      audioTrak
    let videoCodec,
      audioCodec
    let videoTimeScale,
      audioTimeScale
    let sps,
      pps,
      profile,
      width,
      height
    let channelCount,
      sampleRate,
      decoderConfig
    traks = [].concat(traks)
    traks.forEach(trak => {
      const hdlr = util.findBox(trak, 'hdlr')
      const mdhd = util.findBox(trak, 'mdhd')
      if (!hdlr || !mdhd) {
        self.emit('error', new Errors('parse', '', { line: 72, handle: '[MP4] moovParse', url: self.url }))
        return
      }
      if (hdlr.handleType === 'vide' && self.videoOnly) {
        const elst = util.findBox(trak, 'elst')
        trak.empty_duration = 0
        if (elst.empty_duration) {
          trak.empty_duration = elst.empty_duration * mdhd.timescale / mvhd.timeScale
        }
        trak.time_offset = elst.start_time - trak.empty_duration
      }

      const stsd = util.findBox(trak, 'stsd')
      const codecBox = stsd.subBox[0]
      if (hdlr.handleType === 'vide') {
        const avcC = util.findBox(trak, 'avcC')
        const tkhd = util.findBox(trak, 'tkhd')
        videoTrak = trak
        videoTimeScale = mdhd.timescale
        if (avcC) {
          videoCodec = `${codecBox.type}.` + util.toHex(avcC.profile, avcC.profileCompatibility, avcC.AVCLevelIndication).join('')
          sps = avcC.sequence && avcC.sequence.map((item) => Number(`0x${item}`))
          pps = avcC.pps && avcC.pps.map((item) => Number(`0x${item}`))
          profile = avcC.profile
        } else {
          videoCodec = `${codecBox.type}`
        }
        if (tkhd) {
          width = tkhd.width
          height = tkhd.height
        }
      }
      if (hdlr.handleType === 'soun') {
        audioTrak = trak
        const esds = util.findBox(trak, 'esds')
        const mp4a = util.findBox(trak, 'mp4a')
        const ESDescriptor = util.findBox(trak, 5)
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
    this.videoTrak = Merge({}, videoTrak)
    if (!audioTrak) {
      this.videoOnly = true
    }
    if (!this.videoOnly) {
      this.audioTrak = Merge({}, audioTrak)
    }
    const mdat = this._boxes.find(item => item.type === 'mdat')
    const videoDuration = util.seekTrakDuration(videoTrak, videoTimeScale)
    let audioDuration
    if (!this.videoOnly) {
      audioDuration = util.seekTrakDuration(audioTrak, audioTimeScale)
    }
    this.mdatStart = mdat.start
    const vf = this.videoKeyFrames
    const videoKeyFramesLength = vf.length - 1
    vf.forEach((item, idx) => {
      if (idx < videoKeyFramesLength) {
        this.timeRage.push([
          item.time.time / videoTimeScale,
          vf[idx + 1].time.time / videoTimeScale
        ])
      } else {
        this.timeRage.push([
          item.time.time / videoTimeScale,
          -1
        ])
      }
    })
    this.meta = {
      videoCodec,
      createTime: mvhd.createTime,
      modifyTime: mvhd.modifyTime,
      duration: videoDuration,
      timeScale: mvhd.timeScale,
      videoDuration,
      videoTimeScale,
      endTime: videoDuration,
      sps,
      pps,
      width,
      height,
      profile,
      pixelRatio: [
        1, 1
      ],
      channelCount,
      sampleRate,
      audioConfig: decoderConfig
    }
    if (!this.videoOnly) {
      this.meta.audioCodec = audioCodec
      this.meta.audioDuration = audioDuration
      this.meta.audioTimeScale = audioTimeScale
      this.meta.duration = mvhd.duration / mvhd.timeScale
      this.meta.endTime = Math.min(videoDuration, audioDuration)
    }
  }

  /**
   * [init 实例的初始化，主要是获取视频的MOOV元信息]
   */
  init () {
    this.getMetaInfo()
  }

  checkMoovReady () {
    const moov = this._boxes.filter(box => box.type === 'moov')
    if (moov.length) {
      this.moovBox = moov[0]
      this.emit('moovReady', moov)
    } else {
      this.emit('error', new Errors('parse', '', { line: 203, handle: '[MP4] init', msg: 'not find moov box' }))
    }
  }

  getMetaInfo (start = 0, ended = 0 + this.CHUNK_SIZE) {
    let nextStart = start
    this.getData(start, ended).then(res => {
      const buffer = res.response
      nextStart += buffer.byteLength
      let parsed = null
      this.bufferLoaded = Concat(Uint8Array, this.bufferLoaded, new Uint8Array(buffer))
      try {
        let parseStart = 0
        if (this._boxes.length > 0) {
          parseStart = this._boxes[this._boxes.length - 1].size + this._boxes[this._boxes.length - 1].start
        }
        parsed = new Parser(this.bufferLoaded.buffer.slice(parseStart, ended))
        // console.log('parsed.boxes', parsed.boxes)
        this._boxes = this._boxes.concat(parsed.boxes)
        console.log('this._boxes', this._boxes)
        let moovready = false
        let mdatready = false
        let mdat = null
        // 检查moov和第一部分的mdat信息
        this._boxes.map(item => {
          if (item.type === 'moov') {
            moovready = true
          }
          if (item.type === 'mdat') {
            mdat = item
            mdatready = true
          }
        })
        if (!moovready || !mdatready) {
          const nextBox = parsed.nextBox
          if (nextBox && nextBox.type === 'moov') {
            this.getMetaInfo(nextStart, nextStart + nextBox.size + 28)
          } else if (mdatready && !nextBox) {
            // moov在mdat之后 从mdat结束为止开始请求
            nextStart = mdat.start + mdat.size
            this.getData(nextStart, '').then((res) => {
              parsed = new Parser(res.response)
              this._boxes = this._boxes.concat(parsed.boxes)
              this.checkMoovReady()
            })
          } else {
            this.getMetaInfo(nextStart, nextStart + this.CHUNK_SIZE)
          }
        } else {
          this.checkMoovReady()
        }
      } catch (e) {
        this.emit('error', e.type ? e : new Errors('parse', '', { line: 176, handle: '[MP4] init', msg: e.message }))
        throw e
      }
    }).catch(e => {
      this.emit('error', new Errors('network', '', { line: 231, handle: '[MP4] getData', msg: 'getData failed' }))
      throw e
    })
  }

  getSamplesByOrders (type = 'video', start, end) {
    const trak = type === 'video'
      ? this.videoTrak
      : this.audioTrak
    const stsc = util.findBox(trak, 'stsc') // chunk~samples
    const stsz = util.findBox(trak, 'stsz') // sample-size
    const stts = util.findBox(trak, 'stts') // sample-time
    const stco = util.findBox(trak, 'stco') // chunk-offset
    const ctts = util.findBox(trak, 'ctts') // offset-compositime
    const mdatStart = this.mdatStart
    let samples = []
    end = end !== undefined
      ? end
      : stsz.entries.length
    if (start instanceof Array) {
      start.forEach((item, idx) => {
        samples.push({
          idx: item,
          size: stsz.entries[item],
          time: util.seekSampleTime(stts, ctts, item, trak.time_offset),
          offset: util.seekSampleOffset(stsc, stco, stsz, item, mdatStart)
        })
      })
    } else if (end !== 0) {
      for (let i = start; i < end; i++) {
        samples.push({
          idx: i,
          size: stsz.entries[i],
          time: util.seekSampleTime(stts, ctts, i, trak.time_offset),
          offset: util.seekSampleOffset(stsc, stco, stsz, i, mdatStart)
        })
      }
    } else {
      samples = {
        idx: start,
        size: stsz.entries[start],
        time: util.seekSampleTime(stts, ctts, start, trak.time_offset),
        offset: util.seekSampleOffset(stsc, stco, stsz, start, mdatStart)
      }
    }
    return samples
  }

  get videoKeyFrames () {
    if (this._videoFrames) {
      return this._videoFrames
    }
    const videoTrak = this.videoTrak
    const stss = util.findBox(videoTrak, 'stss')
    const frames = this.getSamplesByOrders('video', stss.entries.map(item => item - 1))
    this._videoFrames = frames
    return frames
  }

  get audioKeyFrames () {
    if (this._audioFrames) {
      return this._audioFrames
    }
    const videoScale = util.findBox(this.videoTrak, 'mdhd').timescale
    const audioScale = util.findBox(this.audioTrak, 'mdhd').timescale
    const audioStts = util.findBox(this.audioTrak, 'stts').entry
    const videoFrames = this.videoKeyFrames
    let audioIndex = []
    audioIndex = videoFrames.map(item => {
      return util.seekOrderSampleByTime(audioStts, audioScale, item.time.time / videoScale)
    })
    this._audioFrames = audioIndex
    return this._audioFrames
  }

  packMeta () {
    if (!this.meta) {
      return
    }
    const buffer = new Buffer()
    buffer.write(FMP4.ftyp())
    buffer.write(FMP4.moov(this.meta))
    // this.cache.write(buffer.buffer)
    return buffer.buffer
  }

  seek (time) {
    const timeStart = time * this.meta.videoTimeScale
    let fragIndex

    const videoFrames = this.videoKeyFrames
    let audioFrames
    if (!this.videoOnly) {
      audioFrames = this.audioKeyFrames
    }
    videoFrames.every((item, idx) => {
      const nowTime = item.time.time

      const nextTime = videoFrames[idx + 1]
        ? videoFrames[idx + 1].time.time
        : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndex = idx
        return false
      } else {
        return true
      }
    })
    if (!this.videoOnly) {
      audioFrames.every((item, idx) => {
        const nowTime = item.startTime

        const nextTime = audioFrames[idx + 1]
          ? audioFrames[idx + 1].startTime
          : Number.MAX_SAFE_INTEGER
        if (nowTime <= timeStart && timeStart < nextTime) {
          fragIndex = Math.min(idx, fragIndex)
          return false
        } else {
          return true
        }
      })
    }
    if (this.bufferCache.has(fragIndex)) {
      return Promise.resolve(null)
    } else {
      return this.loadFragment(fragIndex)
    }
  }

  // TODO:  每次只加载一帧换成多帧加载，减少http请求次数
  loadFragment (fragIndex) {
    let start,
      end
    const videoFrame = this.videoKeyFrames[fragIndex]
    let audioFrame
    start = videoFrame.offset
    if (!this.videoOnly) {
      audioFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex].order, 0)
      start = Math.min(videoFrame.offset, audioFrame.offset)
    }
    if (fragIndex < this.videoKeyFrames.length - 1) {
      const videoNextFrame = this.videoKeyFrames[fragIndex + 1]
      let audioNextFrame
      end = videoNextFrame.offset
      if (!this.videoOnly) {
        audioNextFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex + 1].order, 0)
        end = Math.max(videoNextFrame.offset, audioNextFrame.offset)
      }
    }
    const self = this
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      self.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }))
      return false
    }
    const qStart = start + self.mdatStart
    end = end ? self.mdatStart + end : ''
    if (this.bufferCache.has(fragIndex)) {
      return Promise.resolve(null)
    } else if (end && end <= this.bufferLoaded.byteLength) {
      // console.log(`this.arraybuffer qStart:${qStart}, end:${end}`)
      return this.createFragment(new Uint8Array(this.bufferLoaded.buffer.slice(qStart, end)), start, fragIndex)
    } else {
      return this.getData(qStart, end).then((dat) => {
        return this.createFragment(new Uint8Array(dat.response), start, fragIndex)
      })
    }
  }

  addFragment (data) {
    const buffer = new Buffer()
    buffer.write(FMP4.moof(data))
    buffer.write(FMP4.mdat(data))
    // this.cache.write(buffer.buffer)
    return buffer.buffer
  }

  createFragment (mdatData, start, fragIndex) {
    const self = this
    const resBuffers = []
    this.bufferCache.add(fragIndex)
    {
      const framesIndex = self.videoKeyFrames.map((item) => item.idx)
      const _samples = self.getSamplesByOrders('video', framesIndex[fragIndex], framesIndex[fragIndex + 1])
      const samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({ id: 1, time: _samples[0].time.time, firstFlags: 0x2000000, flags: 0xf01, samples }))
    }
    if (!this.videoOnly) {
      const _samples = this.getSamplesByOrders(
        'audio', this.audioKeyFrames[fragIndex].order, this.audioKeyFrames[fragIndex + 1]
          ? this.audioKeyFrames[fragIndex + 1].order
          : undefined)
      const samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({ id: 2, time: _samples[0].time.time, firstFlags: 0x00, flags: 0x701, samples: samples }))
    }

    let bufferSize = 0
    resBuffers.every(item => {
      bufferSize += item.byteLength
      return true
    })
    const buffer = new Uint8Array(bufferSize)

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

  cut (start, end) {
    const self = this
    this.bufferCache.clear()
    const timeStart = start * this.meta.videoTimeScale
    const timeEnd = end * this.meta.videoTimeScale
    let fragIndexStart
    let fragIndexEnd

    const videoFrames = this.videoKeyFrames
    const audioFrames = this.audioKeyFrames
    videoFrames.every((item, idx) => {
      const nowTime = item.time.time

      const nextTime = videoFrames[idx + 1]
        ? videoFrames[idx + 1].time.time
        : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndexStart = idx
        return true
      } else if (nowTime <= timeEnd && timeEnd < nextTime) {
        fragIndexEnd = idx
        return false
      } else {
        return true
      }
    })
    audioFrames.every((item, idx) => {
      const nowTime = item.startTime

      const nextTime = audioFrames[idx + 1]
        ? audioFrames[idx + 1].startTime
        : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndexStart = Math.min(idx, fragIndexStart)
        return true
      } else if (nowTime <= timeEnd && timeEnd < nextTime) {
        fragIndexEnd = Math.min(idx, fragIndexEnd)
        return false
      } else {
        return true
      }
    })
    if (!fragIndexEnd) {
      fragIndexEnd = videoFrames.length
    }
    return self.loadFragmentForCut(fragIndexStart, fragIndexEnd)
  }

  loadFragmentForCut (fragIndexStart, fragIndexEnd) {
    const videoStartFrame = this.videoKeyFrames[fragIndexStart]
    const audioStartFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndexStart].order, 0)
    const start = Math.min(videoStartFrame.offset, audioStartFrame.offset)
    const videoEndFrame = this.videoKeyFrames[fragIndexEnd]
    const audioEndFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndexEnd].order, 0)
    const end = Math.max(videoEndFrame.offset, audioEndFrame.offset)
    const self = this
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      self.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }))
      return false
    }
    return this.getData(
      start + self.mdatStart, end
        ? self.mdatStart + end
        : '').then((dat) => {
      return self.createFragmentForCut(new Uint8Array(dat.response), start, fragIndexStart, end, fragIndexEnd)
    })
  }

  createFragmentForCut (mdatData, start, fragIndexStart, end, fragIndexEnd) {
    const self = this
    const resBuffers = []
    {
      const framesIndex = self.videoKeyFrames.map((item) => item.idx)
      const _samples = self.getSamplesByOrders('video', framesIndex[fragIndexStart], framesIndex[fragIndexEnd])
      const samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({ id: 1, time: 0, firstFlags: 0x2000000, flags: 0xf01, samples }))
    }
    const _samples = this.getSamplesByOrders(
      'audio', this.audioKeyFrames[fragIndexStart].order, this.audioKeyFrames[fragIndexEnd]
        ? this.audioKeyFrames[fragIndexEnd].order
        : undefined)
    const samples = _samples.map((item, idx) => {
      return {
        size: item.size,
        duration: item.time.duration,
        offset: item.time.offset,
        buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
        key: idx === 0
      }
    })
    resBuffers.push(this.addFragment({ id: 2, time: 0, firstFlags: 0x00, flags: 0x701, samples: samples }))

    let bufferSize = 0
    resBuffers.every(item => {
      bufferSize += item.byteLength
      return true
    })
    const buffer = new Uint8Array(bufferSize)

    let offset = 0
    resBuffers.every(item => {
      buffer.set(item, offset)
      offset += item.byteLength
      return true
    })
    return Promise.resolve(buffer)
  }

  clear () {
    this.cache = new Buffer()
    this.bufferCache.clear()
    // this.arraybuffer = new ArrayBuffer()
    // this.timeRage = []
  }
}

export default MP4
