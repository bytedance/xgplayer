import Parse from '../parse/index'
import Write from '../write/index'
import EventEmitter from 'event-emitter'
import Merge from 'deepmerge'
import util from '../util/index'
import Mvex from '../fmp4/mvex'
import Moof from '../fmp4/moof'
import Mdat from '../fmp4/mdat'
import Task from './task'

class MP4 {
  constructor (url = '', preloadTime = 10) {
    this._config = {
      url: url
    }
    this.CHUNK_SIZE = Math.pow(10, 3)
    this.boxes = []
    this.nextBox = null
    this.info = null
    this.moov = null
    this.sequence = 1
    this.status = 'unload'
    this.bufferCache = new Set()
    this.writer = new Write(this.boxes)
    EventEmitter(this)
    this.init()
  }

  init () {
    let self = this
    this.loadData().then((value) => {
      self.parse(value)
      self.getMoov().then((moov) => {
        self.boxes = self.boxes.concat(moov)
        let start = 0
        self.boxes.every(item => {
          if (item) {
            item.start = start
            start += item.size
            return true
          } else {
            return false
          }
        })
        self.getInfo()
        self.emit('ready')
      })
    })
  }

  seek (time) {
    let timeStart = time * this.info.videoTimeScale
    let fragIndex; let videoFrames = this.videoFrames; let audioFrames = this.audioFrames
    videoFrames.every((item, idx) => {
      let nowTime = item.time.time; let nextTime = videoFrames[idx + 1] ? videoFrames[idx + 1].time.time : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndex = idx
        return false
      } else {
        return true
      }
    })
    audioFrames.every((item, idx) => {
      let nowTime = item.startTime; let nextTime = audioFrames[idx + 1] ? audioFrames[idx + 1].startTime : Number.MAX_SAFE_INTEGER
      if (nowTime <= timeStart && timeStart < nextTime) {
        fragIndex = Math.min(idx, fragIndex)
        return false
      } else {
        return true
      }
    })
    if (this.bufferCache.has(fragIndex)) {
      return Promise.resolve([null, fragIndex])
    } else {
      return this.loadFragment(fragIndex)
    }
  }

  loadFragment (fragIndex) {
    let start, end
    let videoFrame = this.videoFrames[fragIndex]
    let audioFrame = this.getSamplesByOrders('audio', this.audioFrames[fragIndex].order, 0)
    start = Math.min(videoFrame.offset, audioFrame.offset)
    if (fragIndex < this.videoFrames.length - 1) {
      let videoNextFrame = this.videoFrames[fragIndex + 1]
      let audioNextFrame = this.getSamplesByOrders('audio', this.audioFrames[fragIndex + 1].order, 0)
      end = Math.max(videoNextFrame.offset, audioNextFrame.offset)
    }
    let self = this
    if (window.isNaN(start) || window.isNaN(end)) {
      throw [videoFrame, audioFrame, start, end]
    }
    return this.loadData(start + self.mdatStart, end ? self.mdatStart + end : Number.MAX_SAFE_INTEGER).then((value) => {
      return self.createFragment(new Uint8Array(value), start, fragIndex)
    })
  }

  createFragment (mdatData, start, fragIndex) {
    let vTrak = this.videoTrak
    let aTrak = this.audioTrak
    let trackIDs = []; let boxes = []
    let self = this
    trackIDs.push(util.findBox(vTrak, 'tkhd').trackID)
    trackIDs.push(util.findBox(aTrak, 'tkhd').trackID);
    (function () {
      let framesIndex = self.videoFrames.map((item) => item.idx)
      let samples = self.getSamplesByOrders('video', framesIndex[fragIndex], framesIndex[fragIndex + 1])
      let moof = new Moof({
        samples,
        trackid: trackIDs[0],
        sequence: self.sequence,
        type: 'video'
      })
      let mdat = new Mdat({
        samples,
        mdatData,
        start
      })
      boxes.push(moof.pack())
      boxes.push(mdat.pack())
    })()

    let samples = this.getSamplesByOrders('audio', this.audioFrames[fragIndex].order, this.audioFrames[fragIndex + 1] ? this.audioFrames[fragIndex + 1].order : undefined)
    let moof = new Moof({
      samples,
      trackid: trackIDs[1],
      sequence: self.sequence,
      type: 'audio'
    })
    let mdat = new Mdat({
      samples,
      mdatData,
      start
    })
    boxes.push(moof.pack())
    boxes.push(mdat.pack())
    return Promise.resolve([boxes, fragIndex])
  }

  parse (buffer) {
    let boxParse = new Parse(buffer)
    this.boxes = this.boxes.concat(boxParse.boxes)
    this.nextBox = boxParse.nextBox
    return boxParse
  }

  loadData (start = 0, end = start + this.CHUNK_SIZE) {
    return new Promise((resolve, reject) => {
      new Task(this._config.url, [start, end], resolve)
    })
  }

  getMoov () {
    let moov; let nextBox = this.nextBox; let moovStart = 0
    this.boxes.every(item => {
      moovStart += item.size
      if (item.type === 'moov') {
        moov = item
        return false
      } else {
        return true
      }
    })
    if (moov) {
      return Promise.resolve(moov)
    } else {
      if (nextBox) {
        if (nextBox.type === 'moov') {
          return this.loadData(moovStart, moovStart + nextBox.size + 28).then((value) => {
            return Promise.resolve(new Parse(value).boxes)
          })
        } else {
          return this.loadData(moovStart, moovStart + Math.pow(10, 8)).then((value) => {
            return Promise.resolve(new Parse(value).boxes)
          })
        }
      } else {
        return this.loadData(moovStart, moovStart + Math.pow(10, 8)).then((value) => {
          return Promise.resolve(new Parse(value))
        })
      }
    }
  }

  getInfo () {
    if (this.info) {
      return this.info
    }
    let moov = this.boxes.find(item => item.type === 'moov')
    let mvhd = util.findBox(moov, 'mvhd')
    let traks = util.findBox(moov, 'trak')
    let videoTrak, audioTrak
    let videoCodec, audioCodec
    let videoTimeScale, audioTimeScale
    traks.forEach(trak => {
      let hdlr = util.findBox(trak, 'hdlr')
      let mdhd = util.findBox(trak, 'mdhd')
      if (hdlr) {
        let stsd = util.findBox(trak, 'stsd')
        let codecBox = stsd.subBox[0]
        if (hdlr.handleType === 'vide') {
          let avcC = util.findBox(trak, 'avcC')
          videoTrak = trak
          videoTimeScale = mdhd.timescale
          if (avcC) {
            videoCodec = `${codecBox.type}.` + util.toHex(avcC.profile, avcC.profileCompatibility, avcC.AVCLevelIndication).join('')
          } else {
            videoCodec = `${codecBox.type}`
          }
        }
        if (hdlr.handleType === 'soun') {
          audioTrak = trak
          let esds = util.findBox(trak, 'esds')
          audioTimeScale = mdhd.timescale
          if (esds) {
            audioCodec = `${codecBox.type}.` + util.toHex(esds.subBox[0].subBox[0].typeID) + `.${esds.subBox[0].subBox[0].subBox[0].type}`
          } else {
            audioCodec = `${codecBox.type}`
          }
        }
      }
    })
    this.videoTrak = Merge({}, videoTrak)
    this.audioTrak = Merge({}, audioTrak)
    let mdat = this.boxes.find(item => item.type === 'mdat')
    this.mdatStart = mdat.start
    this.info = {
      timeScale: mvhd.timeScale,
      duration: mvhd.duration,
      videoTimeScale,
      audioTimeScale,
      videoCodec,
      audioCodec,
      createTime: mvhd.createTime,
      modifyTime: mvhd.modifyTime,
      videoDuration: util.seekTrakDuration(videoTrak, videoTimeScale),
      audioDutation: util.seekTrakDuration(audioTrak, audioTimeScale)
    }
    return this.info
  }

  getSamplesByOrders (type = 'video', start, end) {
    let trak = type === 'video' ? this.videoTrak : this.audioTrak
    let stsc = util.findBox(trak, 'stsc')// chunk~samples
    let stsz = util.findBox(trak, 'stsz')// sample-size
    let stts = util.findBox(trak, 'stts')// sample-time
    let stco = util.findBox(trak, 'stco')// chunk-offset
    let ctts = util.findBox(trak, 'ctts')// offset-compositime
    let mdatStart = this.mdatStart
    let samples = []
    end = end !== undefined ? end : stsz.entries.length
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

  get videoFrames () {
    if (this._videoFrames) { return this._videoFrames }
    let videoTrak = this.videoTrak
    let stss = util.findBox(videoTrak, 'stss')
    let frames = this.getSamplesByOrders('video', stss.entries.map(item => item - 1))
    this._videoFrames = frames
    return frames
  }

  get audioFrames () {
    if (this._audioFrames) { return this._audioFrames }
    let videoScale = util.findBox(this.videoTrak, 'mdhd').timescale
    let audioScale = util.findBox(this.audioTrak, 'mdhd').timescale
    let audioStts = util.findBox(this.audioTrak, 'stts').entry
    let videoFrames = this.videoFrames
    let audioIndex = []
    audioIndex = videoFrames.map(item => {
      return util.seekOrderSampleByTime(audioStts, audioScale, item.time.time / videoScale)
    })
    this._audioFrames = audioIndex
    return this._audioFrames
  }

  resetMeta () {
    let data = this.boxes
    let arr = []
    let ftyp = data.find((item) => item.type === 'ftyp')
    let moov = this.boxes.find(item => item.type === 'moov')
    let mvhd = util.findBox(moov, 'mvhd')
    ftyp.compatible_brands.push('iso5')
    ftyp.size += 4
    arr.push(ftyp)
    arr.push(moov)
    let traks = util.findBox(moov, 'trak')
    let total = 0
    let trackIDs = []
    traks.forEach((item, idx) => {
      let tkhd = util.findBox(item, 'tkhd')
      let mdia = util.findBox(item, 'mdia')
      let minf = util.findBox(mdia, 'minf')
      let stbl = util.findBox(minf, 'stbl')
      let stts = util.findBox(stbl, 'stts')
      let stsc = util.findBox(stbl, 'stsc')
      let stsz = util.findBox(stbl, 'stsz')
      let stco = util.findBox(stbl, 'stco')
      let ctts = util.findBox(stbl, 'ctts')
      let mdhd = util.findBox(mdia, 'mdhd')
      let esds = util.findBox(stbl, 'esds')
      if (esds) {
        esds.subBox[0].esID = 0
      }
      mdhd.duration = 0
      let count = 0
      trackIDs.push(tkhd.trackID)
      count = stts.count * 8 + stsc.count * 12 + stsz.count * 4 + stco.count * 4
      if (ctts) {
        count += ctts.entryCount * 8
        ctts.size -= ctts.entryCount * 8
        ctts.entryCount = 0
        ctts.entry = []
      }
      total += count
      stts.size -= stts.count * 8
      stts.count = 0
      stts.entry = []
      stsc.size -= stsc.count * 12
      stsc.count = 0
      stsc.entries = []
      stsz.size -= stsz.count * 4
      stsz.count = 0
      stsz.entries = []
      stco.size -= stco.count * 4
      stco.count = 0
      stco.entries = []
      stbl.size -= count
      minf.size -= count
      mdia.size -= count
      item.size -= count;
      ['stss', 'ctts'].forEach(sitem => {
        stbl.subBox.every((itm, idx) => {
          if (itm.type === sitem) {
            stbl.size -= itm.size
            minf.size -= itm.size
            mdia.size -= itm.size
            item.size -= itm.size
            moov.size -= itm.size
            stbl.subBox.splice(idx, 1)
            return false
          } else {
            return true
          }
        })
      })
    })
    moov.subBox.forEach((item, idx) => {
      if (item.type === 'udta') {
        moov.size -= item.size
        moov.subBox.splice(idx, 1)
      }
    })
    let mvex = new Mvex(mvhd.duration, trackIDs).pack()
    moov.subBox.push(mvex)
    moov.size -= total - mvex.size
    return arr
  }

  getVideoFragmentDuration () {
    let timeScale = this.info.videoTimeScale
    return this.videoFrames.map((item) => {
      return {
        idx: item.idx,
        start: item.time.time / timeScale
      }
    })
  }
}

export default MP4
