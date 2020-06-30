import EventEmitter from 'event-emitter'
import util from '../util/index.js'
import XHR from '../util/xhr'
import Xml2Json from '../util/xml2json';
class MPD {
  constructor (url) {
    this.url = url
    this.mediaList = {
      video: [],
      audio: []
    }
    this.retryMax = 10
    this.retry = 0
    this.type = 'live'
    this.isEnd = false
    this.duration = 0
    this.init(url)
    EventEmitter(this)
  }

  static parseMPD(ctx) {
    let xmlString;
    if (typeof ctx === 'string') {
        xmlString = ctx;
    }
    if (ctx instanceof ArrayBuffer) {
        let uint8arr = new Uint8Array(ctx);
        xmlString = String.fromCharCode.apply(null, uint8arr);
    }
    if (!xmlString) {
        return null;
    }
    return Xml2Json.parse(xmlString);
}

  fetch (url) {
    let self = this
    let meta = {TYPE: 'LIVE', ENDLIST: ''}
    let segments = []
    return new Promise((resolve, reject) => {
      new XHR({type: '', url}).then((res) => {
        let ctx = res.responseText
        if (ctx) {
          let mpd = MPD.parseMPD(ctx)
          if (!mpd) {
            reject(new Error('parse mpd error'));
          }
          let repID = []
          if (mpd.type === 'static') {
            meta.TYPE = 'VOD'
          }
          if (mpd.minBufferTime) {
            meta.minBufferTime = util.durationConvert(mpd.minBufferTime)
          }
          if (mpd.maxSegmentDuration) {
            meta.maxSegmentDuration = util.durationConvert(mpd.maxSegmentDuration)
          }
          if (mpd.mediaPresentationDuration) {
            self.duration = util.durationConvert(mpd.mediaPresentationDuration)
          }
          let MpdBaseURL = ''
          if(mpd.BaseURL) {
            MpdBaseURL = mpd.BaseURL[0]
          }
          let Period = mpd.Period[0]
          if (!self.duration && Period && Period.duration) {
            self.duration = util.durationConvert(Period.duration)
          }
          meta.duration = self.duration
          Period.AdaptationSet.forEach((asItem, asIndex) => {
            let mimeType = 'video/mp4'
            let codecs = 'avc1.64001E'
            let width = '640'
            let height = '360'
            let maxWidth = '640'
            let maxHeight = '360'
            let frameRate = '25'
            let sar = '1:1'
            let startWithSAP = '1'
            let bandwidth = '588633'
            if (asItem.mimeType) {
              mimeType = asItem.mimeType
              if (mimeType === 'video/mp4') {
                codecs = asItem.codecs
                width = parseFloat(asItem.width)
                height = parseFloat(asItem.height)
                maxWidth = parseFloat(asItem.maxWidth)
                maxHeight = parseFloat(asItem.maxHeight)
                frameRate = parseFloat(asItem.frameRate)
                sar = asItem.sar
                startWithSAP = asItem.startWithSAP
                bandwidth = parseFloat(asItem.bandwidth)
              } else if (mimeType === 'audio/mp4') {
                codecs = asItem.codecs
                startWithSAP = asItem.startWithSAP
                bandwidth = parseFloat(asItem.bandwidth)
              }
            }
            asItem.Representation.forEach((rItem, rIndex) => {
              if(repID.indexOf(rItem.id) > -1) {
                rItem.id = (parseInt(repID[repID.length - 1]) + 1).toString()
              }
              repID.push(rItem.id)
              let initSegment = ''
              let mediaSegments = []
              let timescale = 0
              let duration = 0
              let baseURL = url.slice(0, url.lastIndexOf('/') + 1) + MpdBaseURL
              if (rItem.mimeType) {
                mimeType = rItem.mimeType
              }
              if (rItem.mimeType) {
                mimeType = rItem.mimeType
              }
              if (mimeType === 'video/mp4') {
                if (rItem.codecs) {
                  codecs = rItem.codecs
                }
                if (rItem.width) {
                  width = parseFloat(rItem.width)
                }
                if (rItem.height) {
                  height = parseFloat(rItem.height)
                }
                if (rItem.maxWidth) {
                  maxWidth = parseFloat(rItem.maxWidth)
                }
                if (rItem.maxHeight) {
                  maxHeight = parseFloat(rItem.maxHeight)
                }
                if (rItem.frameRate) {
                  frameRate = parseFloat(rItem.frameRate)
                }
                if (rItem.sar) {
                  sar = rItem.sar
                }
                if (rItem.startWithSAP) {
                  startWithSAP = rItem.startWithSAP
                }
                if (rItem.bandwidth) {
                  bandwidth = parseFloat(rItem.bandwidth)
                }
              } else if (mimeType === 'audio/mp4') {
                if (rItem.codecs) {
                  codecs = rItem.codecs
                }
                if (rItem.startWithSAP) {
                  startWithSAP = rItem.startWithSAP
                }
                if (rItem.bandwidth) {
                  bandwidth = parseFloat(rItem.bandwidth)
                }
              }
              if (rItem.BaseURL && rItem.BaseURL.length > 0) {
                baseURL += rItem.BaseURL[0]
              }
              let ST
              if (asItem.SegmentTemplate && asItem.SegmentTemplate.length > 0) {
                ST = asItem.SegmentTemplate[0]
              }
              if (rItem.SegmentTemplate && rItem.SegmentTemplate.length > 0) {
                ST = rItem.SegmentTemplate[0]
              }
              let encrypted = false
              if (asItem.ContentProtection || rItem.ContentProtection) {
                encrypted = true
              }
              if (ST) {
                initSegment = ST.initialization
                timescale = parseFloat(ST.timescale)
                duration = parseFloat(ST.duration)
                let segmentDuration = duration / timescale
                let start = parseInt(ST.startNumber)
                let end = start + Math.ceil(self.duration / segmentDuration) - 1
                for (let i = start; i <= end; i++) {
                  let startTime = segmentDuration * (i - start)
                  let endTime = segmentDuration * (i - start + 1)
                  if (i === end) {
                    segmentDuration = self.duration - segmentDuration * (end - start)
                    endTime = self.duration
                  }
                  mediaSegments.push({
                    idx: i,
                    start: startTime,
                    end: endTime,
                    url: baseURL + ST.media.replace('$RepresentationID$', rItem.id).replace('$Number%04d$', util.preFixInterge(i, 4)),
                    downloaded: false,
                    segmentDuration
                  })
                }
              }
              if (mimeType === 'video/mp4') {
                self.mediaList['video'].push({
                  id: rItem.id,
                  baseURL,
                  initSegment: baseURL + initSegment.replace('$RepresentationID$', rItem.id),
                  inited: false,
                  mediaSegments,
                  mimeType,
                  codecs,
                  width,
                  height,
                  frameRate,
                  sar,
                  startWithSAP,
                  bandwidth,
                  timescale,
                  duration,
                  encrypted
                })
              } else if (mimeType === 'audio/mp4') {
                self.mediaList['audio'].push({
                  id: rItem.id,
                  baseURL,
                  initSegment: baseURL + initSegment.replace('$RepresentationID$', rItem.id),
                  inited: false,
                  mediaSegments,
                  mimeType,
                  codecs,
                  startWithSAP,
                  bandwidth,
                  timescale,
                  duration,
                  encrypted
                })
              }
            })
          });
          // console.log(self.mediaList['video'])
          // console.log(self.mediaList['audio'])
          // console.log('66');
          ['video', 'audio'].forEach(mediaType => {
            self.mediaList[mediaType].selectedIdx = 0
            self.mediaList[mediaType].sort((a, b) => {
              return a.bandwidth - b.bandwidth
            })
          })
         
          resolve({meta, segments})
        } else {
          reject(new Error('parse error'))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
  init (url) {
    let self = this
    this.fetch(url).then((res) => {
      self.type = res.meta.TYPE.toLocaleLowerCase()
      self.emit('ready')
    }, () => {
      console.log('mpd init reject');
      ['video', 'audio'].forEach(mediaType => {
        self.mediaList[mediaType] = []
      })
      self.retry++
      if (self.retry < self.retryMax) {
        self.init(url)
      }
    })
  }
  seek (time) {
    let self = this
    let mediaResults = {}

    if (this.type === 'vod' || time !== undefined) {
      ['video', 'audio'].forEach(mediaType => {
        let mo = self.mediaList[mediaType][self.mediaList[mediaType].selectedIdx]
        mediaResults[mediaType] = mo.mediaSegments.filter((item) => {
          return ((item.start <= time && time < item.end) || (item.start <= time - item.segmentDuration && time - item.segmentDuration < item.end) || (item.start <= time + item.segmentDuration && time + item.segmentDuration < item.end)) && !item.downloaded
        })
      })
    }
    return mediaResults
  }
}

export default MPD
