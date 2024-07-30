import { MediaPlaylist, MediaSegment, MediaSegmentKey } from './model'
import { getAbsoluteUrl, parseAttr, parseTag } from './utils'

export function parseMediaPlaylist (lines, parentUrl, useLowLatency) {
  const media = new MediaPlaylist()
  media.url = parentUrl
  let curSegment = new MediaSegment(parentUrl)
  let curInitSegment = null
  let curKey = null
  let totalDuration = 0
  let curSN = 0
  let curCC = 0
  let index = 0
  let line
  let endOfList = false
  let partSegmentIndex = 0


  // eslint-disable-next-line no-cond-assign
  while (line = lines[index++]) {
    if (line[0] !== '#') { // url
      if (media.lowLatency) {
        curSN++
        continue
      }

      curSegment.sn = curSN
      curSegment.cc = curCC
      curSegment.url = getAbsoluteUrl(line, parentUrl)
      if (curKey) curSegment.key = curKey.clone(curSN)
      if (curInitSegment) curSegment.initSegment = curInitSegment
      media.segments.push(curSegment)
      curSegment = new MediaSegment(parentUrl)
      curSN++
      continue
    }

    const tag = parseTag(line)
    if (!tag) continue
    const [name, data] = tag
    switch (name) {
      case 'VERSION':
        media.version = parseInt(data)
        break
      case 'PLAYLIST-TYPE':
        media.type = data?.toUpperCase()
        break
      case 'TARGETDURATION':
        media.targetDuration = parseFloat(data)
        break
      case 'PART-INF': {
        if (useLowLatency) {
          media.lowLatency = true
        }
        const attr = parseAttr(data)
        if (attr['PART-TARGET']) {
          media.partTargetDuration = parseFloat(attr['PART-TARGET'])
        }
      }
        break
      case 'SERVER-CONTROL':{
        const attr = parseAttr(data)
        media.canBlockReload = attr['CAN-BLOCK-RELOAD'] === 'YES'
        media.partHoldBack = parseFloat(attr['PART-HOLD-BACK'] || 0)
        media.canSkipUntil = parseFloat(attr['CAN-SKIP-UNTIL'] || 0)
        media.canSkipDateRanges = attr['CAN-SKIP-DATERANGES'] === 'YES'
      }
        break
      case 'ENDLIST': {
        endOfList = true
      }
        break
      case 'MEDIA-SEQUENCE':
        curSN = media.startSN = parseInt(data)
        break
      case 'DISCONTINUITY-SEQUENCE':
        curCC = media.startCC = parseInt(data)
        break
      case 'DISCONTINUITY':
        curCC++
        break
      case 'BYTERANGE':
        curSegment.setByteRange(data, media.segments[media.segments.length - 1])
        break
      case 'PART': {
        if (!media.lowLatency) break
        const attr = parseAttr(data)
        curSegment.duration = parseFloat(attr['DURATION'])
        curSegment.independent = attr['INDEPENDENT'] === 'YES'
        curSegment.sn = curSN
        curSegment.cc = curCC
        curSegment.partIndex = partSegmentIndex
        curSegment.start = totalDuration
        curSegment.duration = parseFloat(attr['DURATION'])
        totalDuration += curSegment.duration
        curSegment.url = getAbsoluteUrl(attr['URI'], parentUrl)
        if (curKey) curSegment.key = curKey.clone(curSN)
        if (curInitSegment) curSegment.initSegment = curInitSegment
        media.segments.push(curSegment)
        curSegment = new MediaSegment(parentUrl)
        partSegmentIndex++
      }

        break
      case 'PRELOAD-HINT':
        break
      case 'PROGRAM-DATE-TIME':
        curSegment.dataTime = data
        break
      case 'EXTINF': {
        if (media.lowLatency) {
          partSegmentIndex = 0
          break
        }
        const [duration, title] = data.split(',')
        curSegment.start = totalDuration
        curSegment.duration = parseFloat(duration)
        totalDuration += curSegment.duration
        curSegment.title = title
      }
        break
      case 'KEY': {
        const attr = parseAttr(data)
        if (attr.METHOD === 'NONE') {
          curKey = null
          break
        }
        curKey = new MediaSegmentKey()
        curKey.method = attr.METHOD
        curKey.url = /^blob:/.test(attr.URI) ? attr.URI : getAbsoluteUrl(attr.URI, parentUrl)
        curKey.keyFormat = attr.KEYFORMAT || 'identity'
        curKey.keyFormatVersions = attr.KEYFORMATVERSIONS
        if (!curKey.isSupported()) {
          throw new Error(`encrypt ${attr.METHOD}/${attr.KEYFORMAT} is not supported`)
        }
        if (attr.IV) {
          let str = attr.IV.slice(2)
          str = (str.length & 1 ? '0' : '') + str
          curKey.iv = new Uint8Array(str.length / 2)
          for (let i = 0, l = str.length / 2; i < l; i++) {
            curKey.iv[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16)
          }
        }
      }
        break
      case 'MAP': {
        const attr = parseAttr(data)
        curSegment.url = getAbsoluteUrl(attr.URI, parentUrl)
        if (attr.BYTERANGE) curSegment.setByteRange(attr.BYTERANGE)
        curSegment.isInitSegment = true
        curSegment.sn = 0
        if (curKey) {
          curSegment.key = curKey.clone(0)
        }
        curInitSegment = curSegment
        curSegment = new MediaSegment(parentUrl)
      }
        break
      default:
    }
  }

  media.segments = media.segments.filter(x => x.duration !== 0)
  const lastSegment = media.segments[media.segments.length - 1]

  if (lastSegment) {
    if (endOfList) {
      lastSegment.isLast = true

    }
    media.endSN = lastSegment.sn
    media.endPartIndex = lastSegment.partIndex
  }
  if (endOfList) {
    media.live = false
  }
  media.totalDuration = totalDuration
  media.endCC = curCC

  return media
}
