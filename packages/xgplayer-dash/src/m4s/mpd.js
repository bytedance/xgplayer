import EventEmitter from 'event-emitter'
import util from '../util/index.js'
import XHR from '../util/xhr'
import Task from '../media/task'
import Parser from '../parse'
import xml2js from 'xml2js'

const typeIsVideoMp4 = function (type) {
  return type === 'video/mp4'
}
const typeIsAudioMp4 = function (type) {
  return type === 'audio/mp4'
}

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
  getRangeData (url, range = []) {
    return new Promise((resolve, reject) => {
      let task = new Task(url, resolve, range)
      task.once('error', err => {
        self.emit('error', err)
      })
    })
  }
  fetch (url) {
    let self = this
    let meta = {TYPE: 'LIVE', ENDLIST: ''}
    let segments = []
    return new Promise((resolve, reject) => {
      new XHR({type: '', url}).then((res) => {
        let ctx = res.responseText
        if (ctx) {
          let parseString = xml2js.parseString
          let repID = []
          parseString(ctx, function (err, result) {
            if (err) {
              console.log('MPD解析错误:' + err)
            }
            if (result.MPD['$'].type === 'static') {
              meta.TYPE = 'VOD'
            }
            if (result.MPD['$'].minBufferTime) {
              meta.minBufferTime = util.durationConvert(result.MPD['$'].minBufferTime)
            }
            if (result.MPD['$'].maxSegmentDuration) {
              meta.maxSegmentDuration = util.durationConvert(result.MPD['$'].maxSegmentDuration)
            }
            if (result.MPD['$'].mediaPresentationDuration) {
              self.duration = util.durationConvert(result.MPD['$'].mediaPresentationDuration)
            }
            let Period = result.MPD.Period[0]
            if (!self.duration && Period['$'] && Period['$'].duration) {
              self.duration = util.durationConvert(Period['$'].duration)
            }
            meta.duration = self.duration

            let videoTaskNumber = 0
            let audioTaskNumber = 0
            let isSegmentBase  = false
            
            Period.AdaptationSet.forEach(asItem => {
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
              if (asItem['$'].mimeType) {
                mimeType = asItem['$'].mimeType
                if (typeIsVideoMp4(mimeType)) {
                  codecs = asItem['$'].codecs
                  width = parseFloat(asItem['$'].width)
                  height = parseFloat(asItem['$'].height)
                  maxWidth = parseFloat(asItem['$'].maxWidth)
                  maxHeight = parseFloat(asItem['$'].maxHeight)
                  frameRate = parseFloat(asItem['$'].frameRate)
                  sar = asItem['$'].sar
                  startWithSAP = asItem['$'].startWithSAP
                  bandwidth = parseFloat(asItem['$'].bandwidth)
                } else if (typeIsAudioMp4(mimeType)) {
                  codecs = asItem['$'].codecs
                  startWithSAP = asItem['$'].startWithSAP
                  bandwidth = parseFloat(asItem['$'].bandwidth)
                }
              }
              asItem.Representation.forEach(rItem => {
                if(repID.indexOf(rItem['$'].id) > -1) {
                  rItem['$'].id = (parseInt(repID[repID.length - 1]) + 1).toString()
                }
                repID.push(rItem['$'].id)
                let initSegment = ''
                let mediaSegments = []
                let timescale = 0
                let duration = 0
                let baseURL = url.slice(0, url.lastIndexOf('/') + 1)
                if (rItem['$'].mimeType) {
                  mimeType = rItem['$'].mimeType
                }
                if (typeIsVideoMp4(mimeType)) {
                  if (rItem['$'].codecs) {
                    codecs = rItem['$'].codecs
                  }
                  if (rItem['$'].width) {
                    width = parseFloat(rItem['$'].width)
                  }
                  if (rItem['$'].height) {
                    height = parseFloat(rItem['$'].height)
                  }
                  if (rItem['$'].maxWidth) {
                    maxWidth = parseFloat(rItem['$'].maxWidth)
                  }
                  if (rItem['$'].maxHeight) {
                    maxHeight = parseFloat(rItem['$'].maxHeight)
                  }
                  if (rItem['$'].frameRate) {
                    frameRate = parseFloat(rItem['$'].frameRate)
                  }
                  if (rItem['$'].sar) {
                    sar = rItem['$'].sar
                  }
                  if (rItem['$'].startWithSAP) {
                    startWithSAP = rItem['$'].startWithSAP
                  }
                  if (rItem['$'].bandwidth) {
                    bandwidth = parseFloat(rItem['$'].bandwidth)
                  }
                } else if (typeIsAudioMp4(mimeType)) {
                  if (rItem['$'].codecs) {
                    codecs = rItem['$'].codecs
                  }
                  if (rItem['$'].startWithSAP) {
                    startWithSAP = rItem['$'].startWithSAP
                  }
                  if (rItem['$'].bandwidth) {
                    bandwidth = parseFloat(rItem['$'].bandwidth)
                  }
                }

                if (rItem.BaseURL && rItem.BaseURL.length > 0) {
                  baseURL += rItem.BaseURL[0]
                }

                let encrypted = false
                if (asItem.ContentProtection || rItem.ContentProtection) {
                  encrypted = true
                }

                isSegmentBase = (asItem.SegmentBase && asItem.SegmentBase.length > 0) 
                              || rItem.SegmentBase && rItem.SegmentBase.length > 0
                
                if (!isSegmentBase) {
                  let ST
                  if (asItem.SegmentTemplate && asItem.SegmentTemplate.length > 0) {
                    ST = asItem.SegmentTemplate[0]
                  }
                  else if (rItem.SegmentTemplate && rItem.SegmentTemplate.length > 0) {
                    ST = rItem.SegmentTemplate[0]
                  }
                  if (ST) {
                    initSegment = ST['$'].initialization
                    timescale = parseFloat(ST['$'].timescale)
                    duration = parseFloat(ST['$'].duration)
                    let segmentDuration = duration / timescale
                    let start = parseInt(ST['$'].startNumber)
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
                        url: baseURL + ST['$'].media.replace(/\$RepresentationID\$/g, rItem['$'].id).replace(/\$Number\$/g, util.preFixInterge(i, 1)),
                        downloaded: false,
                        segmentDuration
                      })
                    }
                  } 
                  let options = {
                    id: rItem['$'].id,
                    baseURL,
                    initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem['$'].id),
                    inited: false,
                    mediaSegments,
                    mimeType,
                    codecs,
                    startWithSAP,
                    bandwidth,
                    timescale,
                    duration,
                    encrypted
                  }
                  if (typeIsVideoMp4(mimeType)) {
                    options[ 'width' ] = width
                    options[ 'height' ] = height
                    options[ 'frameRate' ] = frameRate
                    options[ 'sar' ] = sar
                    self.mediaList[ 'video' ].push(options)
                  } 
                  else if (typeIsAudioMp4(mimeType)) {
                    self.mediaList[ 'audio' ].push(options)
                  }
                }
                else {
                  let SB
                  if (asItem.SegmentBase && asItem.SegmentBase.length > 0) {
                    SB = asItem.SegmentBase[0]
                  }
                  else if (rItem.SegmentBase && rItem.SegmentBase.length > 0) {
                    SB = rItem.SegmentBase[0]
                  }
                  timescale = parseFloat(SB['$'].timescale)
                  let initStart = parseInt(SB['Initialization'][0]['$'].range.split('-')[0])
                  let initEnd = parseInt(SB['Initialization'][0]['$'].range.split('-')[1])
                  let sidxStart = parseInt(SB['$'].indexRange.split('-')[0])
                  let sidxEnd = parseInt(SB['$'].indexRange.split('-')[1])
                  mimeType === 'audio/mp4' ? audioTaskNumber++ : videoTaskNumber++
                  
                  self.getRangeData(baseURL, [sidxStart, sidxEnd])
                  .then(function (res) {
                    let parsed
                    try {
                      parsed = new Parser(res)
                      parsed.boxes.every(box => {
                        if (box.type === 'sidx') {
                          let mediaSegments = []
                          let startTime = 0
                          let endTime = 0
                          let startRange = sidxEnd + 1
                          let endRange = startRange - 1
                          box.references.forEach((subSeg, subSegIndex) => {
                            endTime += subSeg.subsegment_duration
                            endRange += subSeg.referenced_size
                            mediaSegments.push({
                              idx: subSegIndex,
                              url: baseURL,
                              start: parseInt(startTime / box.timescale),
                              end: endTime / box.timescale,
                              range: [startRange, endRange],
                              downloaded: false,
                              segmentDuration: subSeg.subsegment_duration / box.timescale,
                              reference_type: subSeg.reference_type,
                              starts_with_SAP: subSeg.starts_with_SAP,
                              SAP_type: subSeg.SAP_type,
                              SAP_delta_time: subSeg.SAP_delta_time
                            })
                            startTime = endTime + 1
                            startRange = endRange + 1
                          })
                          mediaSegments[0].startTime_ = 0
                          mediaSegments.forEach((seg, segIndex) => {
                            if(segIndex > 0) {
                              seg.startTime_ = mediaSegments[segIndex - 1].startTime_ + mediaSegments[segIndex - 1].segmentDuration
                            }
                          })
                          self.mediaList[ mimeType === 'video/mp4' ? 'video' : 'audio' ].push({
                            id: mimeType === 'video/mp4' ? '' + self.mediaList['video'].length : '0',
                            codecs: mimeType === 'video/mp4' ? 'avc1.64001E' : 'mp4a.40.2',
                            baseURL: baseURL,
                            initSegment: baseURL,
                            initSegmentRange: [initStart, initEnd],
                            inited: false,
                            mediaSegments,
                            mimeType,
                            sidxRes: res,
                            timescale: box.timescale,
                            width: parseFloat(rItem['$'].width) || width,
                            height: parseFloat(rItem['$'].height) || height,
                            bandwidth: parseFloat(rItem['$'].bandwidth),
                            encrypted
                          })
                          return false
                        } else {
                          return true
                        }
                      })
                      mimeType === 'video/mp4' ? videoTaskNumber-- : audioTaskNumber--
                      if(!videoTaskNumber && !audioTaskNumber) {
                        self.type = 'vod';
                        ['video', 'audio'].forEach(mediaType => {
                          self.mediaList[mediaType].selectedIdx = 0
                          self.mediaList[mediaType].sort((a, b) => {
                            return b.bandwidth - a.bandwidth
                          })
                        })
                        // console.log(self.mediaList['video'])
                        // console.log(self.mediaList['audio'])
                        resolve({meta, segments})
                      }
                    } catch (e) {
                      self.emit('error', e.type ? e : new Errors('parse', '', {line: 176, handle: '[MP4] init', msg: e.message}))
                      return false
                    }
                  })
                }
              })
            })

            if (!isSegmentBase) {
              ['video', 'audio'].forEach(mediaType => {
                self.mediaList[mediaType].selectedIdx = 0
                self.mediaList[mediaType].sort((a, b) => {
                  return b.bandwidth - a.bandwidth
                })
              })
              resolve({meta, segments})
            }
          })
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
