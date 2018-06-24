import EventEmitter from 'event-emitter'
import M3U8 from './ts/m3u8'
import Parser from './ts/parser'
import TS from './ts/ts'
import Buffer from './fmp4/buffer'
import MP4 from './fmp4/mp4'
import Task from './media/task'
import MSE from './media/mse'
import Download from './util/download'

class HLS {
  constructor (url) {
    EventEmitter(this)
    let mse = new MSE()
    this.mse = mse
    this.url = url
    this.init(url)
    this.inited = false
    this.cache = new Buffer()
  }
  init (url) {
    let m3u8 = new M3U8(url)
    let hls = this
    m3u8.once('ready', () => {
      this.type = m3u8.type
      if (hls.type === 'vod') {
        hls.seek(0)
      } else {
        if (hls.seeker) {
          clearInterval(hls.seeker)
        }
        this.once('end', () => {
          if (hls.seeker) {
            clearInterval(hls.seeker)
          }
        })
        hls.seek()
        hls.seeker = setInterval(function () {
          hls.seek()
        }, 2000)
      }
    })
    m3u8.once('end', () => {
      if (this.type === 'live') {
        this.mse.endOfStream()
      }
    })
    this.m3u8 = m3u8
  }
  seek (time) {
    let segment = this.m3u8.seek(time)
    if (segment.length && !segment[0].downloaded) {
      new Task(segment[0].url, (res) => {
        let ts = new Parser(res)
        this.parse(ts)
        let url = segment[0].url
        this.m3u8.segments.every(item => {
          if (item.url !== url) {
            return true
          } else {
            item.downloaded = true
            return false
          }
        })
      })
    }
  }
  parse (ts, segment) {
    let pes = []; let video = []; let audio = []; let self = this
    ts.pes.forEach(item => {
      let _pes = new TS.PES(item)
      pes.push(_pes)
      if (_pes.type === 'video') {
        video.push(_pes)
      }
      if (_pes.type === 'audio') {
        audio.push(_pes)
      }
    })
    video.some(item => {
      if (item.ES.sps.length) {
        let es = item.ES
        let as = audio[0].ES
        let duration = 0
        self.m3u8.segments.forEach(item => {
          duration += item.duration * 1
        })
        self.meta = {
          sps: es.sps,
          pps: es.pps,
          width: es.info.width,
          height: es.info.height,
          pixelRatio: es.info.pixelRatio,
          channelCount: as.channel,
          timescale: as.frequence,
          samplerate: as.frequence,
          profile: as.profile,
          duration: duration,
          audioConfig: audio[0].ES.audioConfig
        }
        return false
      }
    })
    self.videoSamples = video
    self.audioSamples = audio
    if (self.meta) {
      if (self.startDTS === undefined) {
        self.startDTS = Math.min(video[0].dts, audio[0].pts)
      }
      self.initSegment(self.meta)
    } else {
      self.seek()
    }
  }
  initSegment (data) {
    if (!this.inited) {
      let buffer = new Buffer()
      buffer.write(MP4.ftyp())
      buffer.write(MP4.moov(data))
      this.mse.appendBuffer(buffer.buffer)
      this.inited = true
      this.cache.write(buffer.buffer)
    }
    this.createVideoFragment()
    this.createAudioFragment()
  }
  addFragment (data) {
    let buffer = new Buffer()
    buffer.write(MP4.moof(data))
    buffer.write(MP4.mdat(data))
    this.mse.appendBuffer(buffer.buffer)
    this.cache.write(buffer.buffer)
    this.mse.once('updateend', () => {
      this.update()
    })
  }
  createVideoFragment () {
    let video = this.videoSamples

    let samplesLength = video.length

    let sampleDuration = (video[samplesLength - 1].dts - video[0].dts) / samplesLength
    let samples, startDTS
    startDTS = this.startDTS
    samples = video.map((item, idx) => {
      let duration
      if (idx + 1 === samplesLength) {
        duration = sampleDuration
      } else {
        duration = video[idx + 1].dts - item.dts
      }
      return {
        size: item.ES.buffer.byteLength,
        duration: duration,
        offset: item.pts - item.dts,
        buffer: item.ES.buffer,
        key: !!item.ES.pps.length
      }
    })
    this.addFragment({
      id: 1,
      time: video[0].dts - startDTS,
      firstFlags: 0x2000000,
      flags: 0xf01,
      samples: samples
    })
  }
  createAudioFragment () {
    let audio = this.audioSamples; let samplesLength = audio.length; let startPTS = this.startDTS || 0
    let samples, duration
    samples = audio.map((item, idx) => {
      if (idx + 1 === samplesLength) {
        duration = (audio[samplesLength - 1].pts - audio[0].pts) / samplesLength
      } else {
        duration = audio[idx + 1].pts - item.pts
      }
      return {
        size: item.ES.buffer.byteLength,
        duration,
        offset: 0,
        buffer: item.ES.buffer,
        key: true
      }
    })
    this.addFragment({
      id: 2,
      time: audio[0].pts - startPTS,
      firstFlags: 0x00,
      flags: 0x701,
      samples: samples
    })
  }
  reset () {
    this.init(this.url)
  }

  update () {
    let sourceBuffer = this.mse.sourceBuffer
    let segments = this.m3u8.segments
    let buffer = sourceBuffer.buffered; let start; let end
    for (let i = 0, len = buffer.length; i < len; i++) {
      start = buffer.start(i)
      end = buffer.end(i)
      for (let j = 0, jLen = segments.length, segment; j < jLen; j++) {
        segment = segments[i]
        if (segment.start >= start && segment.end <= end) {
          segment.downloaded = true
        }
      }
    }
  }

  download () {
    new Download('ts.mp4', this.cache.buffer)
  }
}

export default HLS
