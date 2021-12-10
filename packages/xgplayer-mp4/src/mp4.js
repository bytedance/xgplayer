import EventEmitter from 'event-emitter'
import Parser from './parse'
import Buffer from './fmp4/buffer'
import FMP4 from './fmp4/mp4'
import Task from './media/task'
import util from './util'
import Errors from './error'
import {CUSTOM_EVENTS, TASK_ERROR} from './constants'
import Player from 'xgplayer'

class MP4 {
  /**
   * [constructor 构造函数]
   * @param {String} url                      [视频地址]
   * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
   */
  constructor (url, xhrSetup, player, chunkSize = Math.pow(25, 4), ext = {}) {
    EventEmitter(this)
    this.url = url
    this.xhrSetup = xhrSetup
    this.CHUNK_SIZE = chunkSize
    this.player = player
    this.ext = ext
    this.timeRage = []
    this.canDownload = true
    this.init()
    Player.util.once(this, 'moovReady', this.moovParse.bind(this))
  }

  /**
   * [getData 根据字节区间下载二进制数据]
   * @param  {Number} [start=0]  [起始字节]
   * @param  {Number} [end=start + this.CHUNK_SIZE] [截止字节]
   */
  getData (start = 0, end = start + this.CHUNK_SIZE - 1) {
    let self = this
    return new Promise((resolve, reject) => {
      let task = new Task(this.url, [
        start, end
      ], this.xhrSetup, (data)=>{
        if(self.hasDestroyed){
          return;
        }
        resolve(data)
      }, self.ext)
      // Player.util.once(task, 'error', err => {
      //   self.emit('error', err)
      // })

      Player.util.once(task, CUSTOM_EVENTS.MEDIA_EXPIRED, ()=>{
        self.player && self.player.onMediaExpired();
      });

      Player.util.once(task, TASK_ERROR, params => {
        //非403状态或者非200，206状态逻辑
        reject({code: params.code, status: params.status})
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
      vps,
      profile,
      width,
      height
    let channelCount,
      sampleRate,
      decoderConfig
    let hvc1Data, hvcCData
    let pixelRatio = [1, 1]
    if (!Array.isArray(traks)) {
      traks = [traks]
    }
    traks.forEach(trak => {
      let hdlr = util.findBox(trak, 'hdlr')
      let mdhd = util.findBox(trak, 'mdhd')
      if (!hdlr || !mdhd) {
        self.emit('error', new Errors('parse', '', {line: 101, handle: '[MP4] moovParse', url: self.url}))
        return
      }
      let stsd = util.findBox(trak, 'stsd')
      let codecBox = stsd.subBox[0]
      if (hdlr.handleType === 'vide') {
        let avcC = util.findBox(trak, 'avcC')
        let hvcC
        if(!avcC) {
          hvcC = util.findBox(trak, 'hvcC')
        }
        
        let tkhd = util.findBox(trak, 'tkhd')
        videoTrak = trak
        videoTimeScale = mdhd.timescale
        if (avcC) {
          videoCodec = `${codecBox.type}.` + util.toHex(avcC.profile, avcC.profileCompatibility, avcC.AVCLevelIndication).join('')
          sps = avcC.sequence
          pixelRatio = [avcC.spsInfo.par_ratio.width, avcC.spsInfo.par_ratio.height]
          if (avcC.spsInfo.codec_size) {
            width = avcC.spsInfo.codec_size.width
            height = avcC.spsInfo.codec_size.height
          }
          pps = avcC.pps && avcC.pps.map((item) => Number(`0x${item}`))
          profile = avcC.profile
        } else if(hvcC) {
          hvcCData = hvcC.data
          let hvc1 = util.findBox(trak, 'hvc1')
          if(hvc1) {
            hvc1Data = hvc1.data
            width = hvc1.width
            height = hvc1.height
          }
          videoCodec = `${codecBox.type}.` + util.toHex(hvcC.profile, hvcC.profileCompatibility, hvcC.profileCompatibilityIndications).join('')
          vps = hvcC.vps && hvcC.vps.map((item) => Number(`0x${item}`))
          sps = hvcC.sequence
          // pixelRatio = [hvcC.spsInfo.par_ratio.width, hvcC.spsInfo.par_ratio.height]
          // if (hvcC.spsInfo.codec_size) {
          //   width = hvcC.spsInfo.codec_size.width
          //   height = hvcC.spsInfo.codec_size.height
          // }
          pps = hvcC.pps && hvcC.pps.map((item) => Number(`0x${item}`))
          profile = hvcC.profile
        } else {
          videoCodec = `${codecBox.type}`
        }
        if (tkhd && !width) {
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
    if (!sps) return
    // this.videoTrak = Merge({}, videoTrak)
    // this.audioTrak = audioTrak ? Merge({}, audioTrak) : null
    this.videoTrak = videoTrak;
    this.audioTrak = audioTrak ? audioTrak : null
    let mdat = this._boxes.find(item => item.type === 'mdat')
    let videoDuration = util.seekTrakDuration(videoTrak, videoTimeScale)
    let audioDuration = audioTrak ? util.seekTrakDuration(audioTrak, audioTimeScale) : videoDuration
    this.mdatStart = mdat ? mdat.start : 0
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
          mvhd.duration / mvhd.timeScale
        ])
      }
    })
    this.meta = {
      videoCodec,
      audioCodec,
      createTime: mvhd.createTime,
      modifyTime: mvhd.modifyTime,
      duration: mvhd.duration / mvhd.timeScale,
      timeScale: mvhd.timeScale,
      videoDuration,
      videoTimeScale,
      audioDuration,
      audioTimeScale,
      endTime: Math.min(videoDuration, audioDuration),
      vps,
      sps,
      pps,
      width,
      height,
      profile,
      pixelRatio,
      channelCount,
      sampleRate,
      audioConfig: decoderConfig,
      hvc1Data,
      hvcCData,
      ext: {
        videoTrak: this.videoTrak,
        audioTrak: this.audioTrak,
        mdatStart: this.mdatStart,
        timeRage: this.timeRage,
      },
      stss: this._stssObj
    }
    this.emit('metaReady', this.meta)
  }

  /**
   * [init 实例的初始化，主要是获取视频的MOOV元信息]
   */
  init () {
    let self = this
    self.getData().then(res => {
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

    let cttsObj = type === 'video' ? this._cttsObj : null;
    let stscObj = type === 'video' ? this._stscVideoObj : this._stscAudioObj;
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
          time: util.seekSampleTime(stts, cttsObj, item),
          offset: util.seekSampleOffset(stsc, stco, stsz, item, mdatStart, stscObj)
        })
      })
    } else if (end !== 0) {
      for (let i = start; i < end; i++) {
        samples.push({
          idx: i,
          size: stsz.entries[i],
          time: util.seekSampleTime(stts, cttsObj, i),
          offset: util.seekSampleOffset(stsc, stco, stsz, i, mdatStart, stscObj)
        })
      }
    } else {
      samples = {
        idx: start,
        size: stsz.entries[start],
        time: util.seekSampleTime(stts, cttsObj, start),
        offset: util.seekSampleOffset(stsc, stco, stsz, start, mdatStart, stscObj)
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
    let stsc = util.findBox(videoTrak, 'stsc') // chunk~samples
    let ctts = util.findBox(videoTrak, 'ctts') // offset-compositime
    this._cttsObj = null;
    if(ctts){
      this._cttsObj = {};
      let count = 0;
      for(let i = 0; i < ctts.entry.length; i++){
        let entry = ctts.entry[i];
        for(let j = 0; j < entry.count; j++){
          this._cttsObj[count] = entry.offset;
          count += 1;
        }
      }
    }

    this._stscVideoObj = {};
    let sampleCount = 0;
    for(let i = 0; i < stsc.count - 1; i++){
      let entry = stsc.entries[i];
      for(let j = 0; j < entry.chunk_count *  entry.samples_per_chunk; j++){
          sampleCount ++;
          this._stscVideoObj[sampleCount] = entry;
      }
    }

    let frames = this.getSamplesByOrders('video', stss.entries.map(item => item - 1))
    this._stssObj = stss;
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
    let stsc = util.findBox(this.audioTrak, 'stsc') // chunk~samples
    this._stscAudioObj = {};
    let sampleCount = 0;
    for(let i = 0; i < stsc.count - 1; i++){
      let entry = stsc.entries[i];
      for(let j = 0; j < entry.chunk_count *  entry.samples_per_chunk; j++){
          sampleCount ++;
          this._stscAudioObj[sampleCount] = entry;
      }
    }
    let videoFrames = this.videoKeyFrames
    let audioIndex = []
    audioIndex = videoFrames.map(item => {
      return util.seekOrderSampleByTime(audioStts, audioScale, item.time.time / videoScale)
    })
    this._audioFrames = audioIndex
    return this._audioFrames
  }

  packMeta() {
    if (!this.meta) {
      return
    }
    let buffer = new Buffer()
    buffer.write(FMP4.ftyp())
    buffer.write(FMP4.moov(this.meta))
    // this.cache.write(buffer.buffer)
    return buffer.buffer
  }

  getRangeFromTime(time){
    let fragIndex = this.getFragmentIdx(time);
    let range = this.getFragRange(fragIndex)
    if(range === [0, 0]) return null;
    return {
      range,
      fragIndex,
    }
  }

  getFragmentIdx(time){
    let timeStart = Math.round(time * this.meta.videoTimeScale)
    let fragIndex
    let videoFrames = this.videoKeyFrames
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
    if (this.audioTrak) {
      let audioFrames = this.audioKeyFrames
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
    return fragIndex;
  }

  seek (time) {
    let fragIndex = this.getFragmentIdx(time);
    this.timeRage[fragIndex].downloaded = true;
    return this.loadFragment(fragIndex)
  }

  getFragRange (fragIndex) {
    let videoFrame = this.videoKeyFrames[fragIndex]
    let start = videoFrame.offset
    let end
    if (this.audioTrak) {
      let audioFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex].order, 0)
      start = Math.min(start, audioFrame.offset)
    }
    if (fragIndex < this.videoKeyFrames.length - 1) {
      let videoNextFrame = this.videoKeyFrames[fragIndex + 1]
      end = videoNextFrame.offset
      if (this.audioTrak) {
        let audioNextFrame = this.getSamplesByOrders('audio', this.audioKeyFrames[fragIndex + 1].order, 0)
        end = Math.max(end, audioNextFrame.offset)
      }
    }
    if (window.isNaN(start) || (end !== undefined && window.isNaN(end))) {
      this.emit('error', new Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: this.url }))
      return [0, 0]
    }
    return [start + this.mdatStart, end ? this.mdatStart + end : '']
  }
  loadFragment (fragIndex) {
    let self = this
    let range = this.getFragRange(fragIndex)
    if(range === [0, 0]) return false;
    return this.getData(range[0], range[1]).then((dat) => {
      return self.createFragment(new Uint8Array(dat), range[0] - this.mdatStart, fragIndex)
    })
    .then(buf => {
      return buf
    })
  }
  addFragment (data) {
    let buffer = new Buffer()
    return new Promise(resolve => {
      buffer.write(FMP4.moof(data))
      buffer.write(FMP4.mdat(data))
      // this.cache.write(buffer.buffer)
      resolve(buffer.buffer)
    })
  }
  getVideoBuffer(mdatData, start, fragIndex) {
    let self = this
    let videoFlags = 0xf01
    let framesIndex = self.videoKeyFrames.map((item) => item.idx)
    let _samples = self.getSamplesByOrders('video', framesIndex[fragIndex], framesIndex[fragIndex + 1])
    let samples = _samples.map((item, idx) => {
      return {
        size: item.size,
        duration: item.time.duration,
        offset: item.time.offset,
        buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
        key: idx === 0,
        idx: item.idx
      }
    })
    return this.addFragment({
      id: 1,
      time: _samples[0].time.time,
      firstFlags: 0x2000000,
      flags: videoFlags,
      samples,
      sampleOffset: _samples[0].idx,
      fragIndex
    })
  }
  getAudioBuffer(mdatData, start, fragIndex) {

    let self = this
    let audioFlags = 0x701

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
    return this.addFragment({
      id: 2,
      time: _samples[0].time.time,
      firstFlags: 0x00,
      flags: audioFlags,
      samples,
      sampleOffset: _samples[0].idx,
      fragIndex
    })
  }
  createFragment (mdatData, start, fragIndex) {
    let self = this

    let resBuffers = []
    let promises = [
      self.getVideoBuffer(mdatData, start, fragIndex)
    ]
    if (this.audioTrak) {
      promises.push(self.getAudioBuffer(mdatData, start, fragIndex))
    }
    return Promise.all(promises)
    .then(buffers => {
      resBuffers.push(buffers[0])
      if (buffers && buffers[1]) {
        resBuffers.push(buffers[1])
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
      return buffer
    })
  }

  update(url){
    this.url = url;
  }

  destroy(){
    if(this.hasDestroyed){
      return;
    }
    for (let k in this) {
      delete this[k]
    }
    this.hasDestroyed = true;
  }
}

export default MP4
