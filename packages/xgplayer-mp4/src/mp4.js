import EventEmitter from 'event-emitter'
import Merge from 'deepmerge'
import Parser from './parse'
import Buffer from './fmp4/buffer'
import FMP4 from './fmp4/mp4'
import Task from './media/task'
import util from './util'
import Errors from './error'

class MP4 {
  /**
     * [constructor 构造函数]
     * @param {String} url                      [视频地址]
     * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
     */
  constructor (url, options, chunkSize = Math.pow(25, 4)) {
    EventEmitter(this)
    this.url = url
    this.withCredentials = options.withCredentials
    FMP4.videoOnly = this.videoOnly = options.videoOnly || false
    this.CHUNK_SIZE = chunkSize
    this.init(url)
    this.once('moovReady', this.moovParse.bind(this))
    this.cache = new Buffer()
    this.bufferCache = new Set()
    this.timeRage = []
    this.canDownload = true
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
      ], this.withCredentials, resolve)
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
      let hdlr = util.findBox(trak, 'hdlr')
      let mdhd = util.findBox(trak, 'mdhd')
      if (!hdlr || !mdhd) {
        self.emit('error', new Errors('parse', '', {line: 72, handle: '[MP4] moovParse', url: self.url}))
        return
      }
      if(hdlr.handleType === 'vide' && self.videoOnly) {
        let elst = util.findBox(trak, 'elst')
        trak.empty_duration = 0
        if (elst.empty_duration) {
          trak.empty_duration = elst.empty_duration * mdhd.timescale / mvhd.timeScale;
        }
                  
        trak.time_offset = elst.start_time - trak.empty_duration;
      }

      let stsd = util.findBox(trak, 'stsd')
      let codecBox = stsd.subBox[0]
      if (hdlr.handleType === 'vide') {
        let avcC = util.findBox(trak, 'avcC')
        let tkhd = util.findBox(trak, 'tkhd')
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
    this.videoTrak = Merge({}, videoTrak)
    if(!audioTrak){
       FMP4.videoOnly = this.videoOnly = true
    }
    if(!this.videoOnly) {
      this.audioTrak = Merge({}, audioTrak)
    }
    let mdat = this._boxes.find(item => item.type === 'mdat')
    let videoDuration = util.seekTrakDuration(videoTrak, videoTimeScale)
    let audioDuration
    if(!this.videoOnly) {
      audioDuration = util.seekTrakDuration(audioTrak, audioTimeScale)
    }
    this.mdatStart = mdat.start
    let vf = this.videoKeyFrames
    let videoKeyFramesLength = vf.length - 1
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
    if(!this.videoOnly) {
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
    let self = this
    self.getData().then((res) => {
      let parsed

      let moovStart = 0

      let moov

      let boxes
      try {
        parsed = new Parser(res)
      } catch (e) {
        self.emit('error', e.type ? e : new Errors('parse', '', {line: 176, handle: '[MP4] init', msg: e.message}))
        return false
      }
      self._boxes = boxes = parsed.boxes
      boxes.every(item => {
        moovStart += item.size
        if (item.type === 'moov') {
          moov = item
          self.moovBox = moov
          self.emit('moovReady', moov)
          return false
        } else {
          return true
        }
      })
      if (!moov) {
        let nextBox = parsed.nextBox
        if (nextBox) {
          if (nextBox.type === 'moov') {
            self.getData(moovStart, moovStart + nextBox.size + 28).then(res => {
              let parsed = new Parser(res)
              self._boxes = self._boxes.concat(parsed.boxes)
              moov = parsed.boxes.filter(box => box.type === 'moov')
              if (moov.length) {
                self.moovBox = moov[0]
                self.emit('moovReady', moov)
              } else {
                self.emit('error', new Errors('parse', '', {line: 203, handle: '[MP4] init', msg: 'not find moov box'}))
              }
            })
          } else {
            self.emit('error', new Errors('parse', '', {line: 207, handle: '[MP4] init', msg: 'not find moov box'}))
          }
        } else {
          self.getData(moovStart, '').then(res => {
            let parsed = new Parser(res)
            if (parsed) {
              self._boxes = self._boxes.concat(parsed.boxes)
              parsed.boxes.every(item => {
                if (item.type === 'moov') {
                  moov = item
                  self.moovBox = moov
                  self.emit('moovReady', moov)
                  return false
                } else {
                  return true
                }
              })
            } else {
              self.emit('error', new Errors('parse', '', {line: 225, handle: '[MP4] init', msg: 'not find moov box'}))
            }
          })
        }
      }
    }).catch(() => {
      self.emit('error', new Errors('network', '', {line: 231, handle: '[MP4] getData', msg: 'getData failed'}))
    })
  }

  getSamplesByOrders (type = 'video', start, end) {
    let trak = type === 'video'
      ? this.videoTrak
      : this.audioTrak
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
    let videoTrak = this.videoTrak
    let stss = util.findBox(videoTrak, 'stss')
    let frames = this.getSamplesByOrders('video', stss.entries.map(item => item - 1))
    this._videoFrames = frames
    return frames
  }

  get audioKeyFrames () {
    if (this._audioFrames) {
      return this._audioFrames
    }
    let videoScale = util.findBox(this.videoTrak, 'mdhd').timescale
    let audioScale = util.findBox(this.audioTrak, 'mdhd').timescale
    let audioStts = util.findBox(this.audioTrak, 'stts').entry
    let videoFrames = this.videoKeyFrames
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
    let buffer = new Buffer()
    buffer.write(FMP4.ftyp())
    buffer.write(FMP4.moov(this.meta))
    this.cache.write(buffer.buffer)
    return buffer.buffer
  }

  seek (time) {
    let timeStart = time * this.meta.videoTimeScale
    let fragIndex

    let videoFrames = this.videoKeyFrames
    let audioFrames
    if(!this.videoOnly) {
      audioFrames = this.audioKeyFrames
    }
    videoFrames.every((item, idx) => {
      let nowTime = item.time.time

      let nextTime = videoFrames[idx + 1]
        ? videoFrames[idx + 1].time.time
        : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndex = idx
        return false
      } else {
        return true
      }
    })
    if(!this.videoOnly) {
      audioFrames.every((item, idx) => {
        let nowTime = item.startTime

        let nextTime = audioFrames[idx + 1]
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
  loadFragment (fragIndex) {
    let start,
      end
    let videoFrame = this.videoKeyFrames[fragIndex]
    let audioFrame
    start = videoFrame.offset
    if(!this.videoOnly) {
      audioFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex].order, 0)
      start = Math.min(videoFrame.offset, audioFrame.offset)
    }
    if (fragIndex < this.videoKeyFrames.length - 1) {
      let videoNextFrame = this.videoKeyFrames[fragIndex + 1]
      let audioNextFrame
      end = videoNextFrame.offset
      if(!this.videoOnly) {
        audioNextFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex + 1].order, 0)
        end = Math.max(videoNextFrame.offset, audioNextFrame.offset)
      }
    }
    let self = this
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      self.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }))
      return false
    }
    if (this.bufferCache.has(fragIndex)) {
      return Promise.resolve(null)
    } else {
      return this.getData(
        start + self.mdatStart, end
          ? self.mdatStart + end
          : '').then((dat) => {
        return self.createFragment(new Uint8Array(dat), start, fragIndex)
      })
    }
  }
  addFragment (data) {
    let buffer = new Buffer()
    buffer.write(FMP4.moof(data))
    buffer.write(FMP4.mdat(data))
    this.cache.write(buffer.buffer)
    return buffer.buffer
  }
  createFragment (mdatData, start, fragIndex) {
    let self = this
    let resBuffers = []
    this.bufferCache.add(fragIndex)
    {
      let framesIndex = self.videoKeyFrames.map((item) => item.idx)
      let _samples = self.getSamplesByOrders('video', framesIndex[fragIndex], framesIndex[fragIndex + 1])
      let samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({id: 1, time: _samples[0].time.time, firstFlags: 0x2000000, flags: 0xf01, samples}))
    }
    if(!this.videoOnly) {
      let _samples = this.getSamplesByOrders(
        'audio', this.audioKeyFrames[fragIndex].order, this.audioKeyFrames[fragIndex + 1]
          ? this.audioKeyFrames[fragIndex + 1].order
          : undefined)
      let samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({id: 2, time: _samples[0].time.time, firstFlags: 0x00, flags: 0x701, samples: samples}))  
    }
    
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

  cut (start, end) {
    let self = this
    this.bufferCache.clear()
    let timeStart = start * this.meta.videoTimeScale
    let timeEnd = end * this.meta.videoTimeScale
    let fragIndexStart
    let fragIndexEnd

    let videoFrames = this.videoKeyFrames
    let audioFrames = this.audioKeyFrames
    videoFrames.every((item, idx) => {
      let nowTime = item.time.time

      let nextTime = videoFrames[idx + 1]
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
      let nowTime = item.startTime

      let nextTime = audioFrames[idx + 1]
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
    let start,
      end
    let videoStartFrame = this.videoKeyFrames[fragIndexStart]
    let audioStartFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndexStart].order, 0)
    start = Math.min(videoStartFrame.offset, audioStartFrame.offset)
    let videoEndFrame = this.videoKeyFrames[fragIndexEnd]
    let audioEndFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndexEnd].order, 0)
    end = Math.max(videoEndFrame.offset, audioEndFrame.offset)
    let self = this
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      self.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }))
      return false
    }
    return this.getData(
      start + self.mdatStart, end
        ? self.mdatStart + end
        : '').then((dat) => {
      return self.createFragmentForCut(new Uint8Array(dat), start, fragIndexStart, end, fragIndexEnd)
    })
  }
  createFragmentForCut (mdatData, start, fragIndexStart, end, fragIndexEnd) {
    let self = this
    let resBuffers = []
    {
      let framesIndex = self.videoKeyFrames.map((item) => item.idx)
      let _samples = self.getSamplesByOrders('video', framesIndex[fragIndexStart], framesIndex[fragIndexEnd])
      let samples = _samples.map((item, idx) => {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        }
      })
      resBuffers.push(this.addFragment({id: 1, time: 0, firstFlags: 0x2000000, flags: 0xf01, samples}))
    }
    let _samples = this.getSamplesByOrders(
      'audio', this.audioKeyFrames[fragIndexStart].order, this.audioKeyFrames[fragIndexEnd]
        ? this.audioKeyFrames[fragIndexEnd].order
        : undefined)
    let samples = _samples.map((item, idx) => {
      return {
        size: item.size,
        duration: item.time.duration,
        offset: item.time.offset,
        buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
        key: idx === 0
      }
    })
    resBuffers.push(this.addFragment({id: 2, time: 0, firstFlags: 0x00, flags: 0x701, samples: samples}))

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
}

export default MP4
