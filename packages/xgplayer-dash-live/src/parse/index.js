import xml2json from './xml2json'
import { durationConvert, isAudio, isVideo, timeToSecond } from '../util'
import MediaList from '../mediaList'

/* eslint-disable max-lines-per-function, prefer-destructuring */
export default class Parser {
  constructor () {
    this.baseURL = ''
    this.mediaList = new MediaList()
  }

  parse (res, url) {
    const result = xml2json.xml_str2json(res)
    if (result.type && result.type !== 'dynamic') {
      throw new Error('The stream is not living')
    }
    if (result.BaseURL && result.BaseURL[0]) {
      this.baseURL = result.BaseURL[0]
    } else {
      this.baseURL = this.getBaseURL(url)
    }
    this.mpdAttributes = this.getMPDAttributes(result)
    let duration = 0
    if (result.mediaPresentationDuration) {
      duration = durationConvert(result.mediaPresentationDuration)
    }
    const Period = result.Period[0]
    if (!duration && Period && Period.duration) {
      duration = durationConvert(Period.duration)
    }

    this.parseAdaptationSet(Period.AdaptationSet, duration, this.baseURL)
  }

  getBaseURL (url) {
    return url.slice(0, url.lastIndexOf('/') + 1)
  }

  parseAdaptationSet (adaptationSet, duration, url) {
    const { mediaList } = this
    let isSegmentBase = false

    adaptationSet.forEach(adaptation => {
      let { mimeType, codecs, bandwidth } = adaptation
      if (bandwidth) {
        bandwidth = parseFloat(bandwidth)
      }
      adaptation.Representation.forEach(rItem => {
        const { width, height, frameRate } = rItem
        let baseURL = url
        if (rItem.mimeType) {
          mimeType = rItem.mimeType
        }
        if (rItem.codecs) {
          codecs = rItem.codecs
        }
        if (rItem.bandwidth) {
          bandwidth = parseFloat(rItem.bandwidth)
        }
        if (rItem.BaseURL && rItem.BaseURL.length > 0) {
          baseURL += rItem.BaseURL[0]
        }
        isSegmentBase =
          (adaptation.SegmentBase && adaptation.SegmentBase.length > 0) || (rItem.SegmentBase && rItem.SegmentBase.length > 0)
        // 直播不存在SegmentBase节点
        if (!isSegmentBase) {
          let ST

          if (adaptation.SegmentTemplate && adaptation.SegmentTemplate.length > 0) {
            ST = adaptation.SegmentTemplate[0]
          } else if (rItem.SegmentTemplate && rItem.SegmentTemplate.length > 0) {
            ST = rItem.SegmentTemplate[0]
          }

          const alreadys = isVideo(mimeType) ? mediaList.video : mediaList.audio

          const already = alreadys.find(({ id }) => id === rItem.id)

          const { initSegment, mediaSegments, timescale } = this.parseSegmentTemplate(ST, rItem, baseURL)

          const options = {
            id: rItem.id,
            baseURL,
            initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, bandwidth),
            mediaSegments,
            mimeType,
            codecs,
            bandwidth,
            timescale,
            width,
            height,
            frameRate,
            duration,
            availabilityTimeOffset: ST.availabilityTimeOffset
          }
          if (isVideo(mimeType)) {
            if (already) {
              Object.assign(already, options)
            } else {
              mediaList.video.push(options)
            }
          } else if (isAudio(mimeType)) {
            if (already) {
              Object.assign(already, options)
            } else {
              mediaList.audio.push(options)
            }
          }
        }
      })
    })
    if (!isSegmentBase) {
      ['video', 'audio'].forEach(mediaType => {
        mediaList[mediaType].selectedIdx = 0
        mediaList[mediaType].sort((a, b) => {
          return b.bandwidth - a.bandwidth
        })
      })
    }
  }

  parseSegmentTemplate (segmentTemplate, representation, baseURL) {
    let initSegment = ''
    const mediaSegments = []
    let timescale = 1000
    if (!segmentTemplate) {
      return {
        initSegment,
        mediaSegments,
        timescale
      }
    }
    if (segmentTemplate && (!segmentTemplate.media || !segmentTemplate.initialization)) {
      return {
        initSegment,
        mediaSegments,
        timescale
      }
    }
    let { startNumber } = segmentTemplate
    const { initialization } = segmentTemplate
    initSegment = initialization
    timescale = parseFloat(segmentTemplate.timescale)
    startNumber = parseFloat(startNumber)
    let currentNumber = 0
    if (segmentTemplate.SegmentTimeline) {
      const sSet = segmentTemplate.SegmentTimeline[0].S
      for (let i = 0; i < sSet.length; i++) {
        const item = sSet[i]
        currentNumber = i + startNumber
        mediaSegments.push({
          idx: item.t,
          start: parseFloat(item.t),
          end: parseFloat(item.t) + parseFloat(item.d),
          url: baseURL + segmentTemplate.media.replace(/\$Time\$/g, item.t).replace(/\$RepresentationID\$/g, representation.id).replace(/\$Number\$/g, currentNumber).replace(/\$Bandwidth\$/g, representation.bandwidth),
          segmentDuration: parseFloat(item.d),
          number: currentNumber
        })
      }
    }
    return {
      initSegment,
      mediaSegments,
      timescale
    }
  }

  getMPDAttributes (result) {
    return {
      minBufferTime: durationConvert(result.minBufferTime),
      minimumUpdatePeriod: durationConvert(result.minimumUpdatePeriod),
      publishTime: timeToSecond(result.publishTime),
      availabilityStartTime: timeToSecond(result.availabilityStartTime)
    }
  }
}
