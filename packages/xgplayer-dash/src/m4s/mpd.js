import EventEmitter from 'eventemitter3'
import util from '../util/index.js'
import XHR from '../util/xhr'
import Xml2Json from './xml2json'

function parseMPD (ctx) {
  let xmlString
  if (typeof ctx === 'string') {
    xmlString = ctx
  }
  if (ctx instanceof ArrayBuffer) {
    const uint8arr = new Uint8Array(ctx)
    xmlString = String.fromCharCode.apply(null, uint8arr)
  }
  if (!xmlString) {
    return null
  }
  /**
   * <ContentProtection schemeIdUri="urn:uuid:5E629AF5-38DA-4063-8977-97FFBD9902D4">
   *  <mas:MarlinContentIds>
   *    <mas:MarlinContentId>urn:marlin:kid:5d92bb7de814a7a972d12cc70003043b</mas:MarlinContentId>
   *  </mas:MarlinContentIds>
   *  <MarlinContentIds>
   *    <MarlinContentIds> xx </MarlinContentIds>
   *  </MarlinContentIds>
   *  标签前有前缀，解析会报错，正则去掉前缀
   */
  // xmlString = xmlString.replace(/<([A-z]*:?)*:/g, '<').replace(/<\/([A-z]*:?)*:/g, '</');
  xmlString = xmlString.replace(/<(\/)?(\w+:)+(\w+)/g, '<$1$3')
  return Xml2Json.parse(xmlString)
}

class MPD extends EventEmitter {
  constructor (url) {
    super()
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
  }

  fetch (url) {
    const self = this
    const meta = { TYPE: 'LIVE', ENDLIST: '' }
    const segments = []
    return new Promise((resolve, reject) => {
      new XHR({ type: '', url }).then((res) => {
        const ctx = res.responseText
        if (ctx) {
          const repID = []
          const result = parseMPD(ctx)
          if (result.type === 'static') {
            meta.TYPE = 'VOD'
          }
          if (result.minBufferTime) {
            meta.minBufferTime = util.durationConvert(result.minBufferTime)
          }
          if (result.maxSegmentDuration) {
            meta.maxSegmentDuration = util.durationConvert(result.maxSegmentDuration)
          }
          if (result.mediaPresentationDuration) {
            self.duration = util.durationConvert(result.mediaPresentationDuration)
          }
          let MpdBaseURL = ''
          if (result.BaseURL) {
            MpdBaseURL = result.BaseURL[0]
          }
          const Period = result.Period[0]
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
              if (repID.indexOf(rItem.id) > -1) {
                rItem.id = (parseInt(repID[repID.length - 1]) + 1).toString()
              }
              repID.push(rItem.id)
              let initSegment = ''
              const mediaSegments = []
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
                const start = parseInt(ST.startNumber)
                const end = start + Math.ceil(self.duration / segmentDuration) - 1
                for (let i = start; i <= end; i++) {
                  const startTime = segmentDuration * (i - start)
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
                self.mediaList.video.push({
                  id: rItem.id,
                  baseURL,
                  initSegment: baseURL + initSegment.replace('$RepresentationID$', rItem.id),
                  inited: false,
                  mediaSegments,
                  mimeType,
                  codecs,
                  width,
                  height,
                  maxWidth,
                  maxHeight,
                  frameRate,
                  sar,
                  startWithSAP,
                  bandwidth,
                  timescale,
                  duration,
                  encrypted
                })
              } else if (mimeType === 'audio/mp4') {
                self.mediaList.audio.push({
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
          resolve({ meta, segments })
        } else {
          reject(new Error('parse error'))
        }
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  }

  init (url) {
    const self = this
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
    const self = this
    const mediaResults = {}

    if (this.type === 'vod' || time !== undefined) {
      ['video', 'audio'].forEach(mediaType => {
        const mo = self.mediaList[mediaType][self.mediaList[mediaType].selectedIdx]
        if (mo) {
          mediaResults[mediaType] = mo.mediaSegments.filter((item) => {
            return ((item.start <= time && time < item.end) || (item.start <= time - item.segmentDuration && time - item.segmentDuration < item.end) || (item.start <= time + item.segmentDuration && time + item.segmentDuration < item.end)) && !item.downloaded
          })
        }
      })
    }
    return mediaResults
  }
}

export default MPD
