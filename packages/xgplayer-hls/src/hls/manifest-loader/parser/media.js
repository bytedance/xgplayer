import { MediaPlaylist, MediaSegment, MediaSegmentKey } from './model'
import { getAbsoluteUrl, parseAttr, parseTag } from './utils'

export function parseMediaPlaylist (lines, parentUrl) {
  const media = new MediaPlaylist()
  media.url = parentUrl
  let curSegment = new MediaSegment()
  let curInitSegment = null
  let curKey = null
  let totalDuration = 0
  let curSN = 0
  let curCC = 0
  let index = 0
  let line
  let endOfList = false


  // eslint-disable-next-line no-cond-assign
  while (line = lines[index++]) {
    if (endOfList) {
      break
    }
    if (line[0] !== '#') { // url
      curSegment.sn = curSN
      curSegment.cc = curCC
      curSegment.url = getAbsoluteUrl(line, parentUrl)
      if (curKey) curSegment.key = curKey.clone(curSN)
      if (curInitSegment) curSegment.initSegment = curInitSegment
      media.segments.push(curSegment)
      curSegment = new MediaSegment()
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
      case 'ENDLIST': {
        const lastSegment = media.segments[media.segments.length - 1]
        if (lastSegment) {
          lastSegment.isLast = true
        }
        media.live = false
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
      case 'EXTINF': {
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
        if (attr.METHOD !== 'AES-128') throw new Error(`encrypt ${attr.METHOD}/${attr.KEYFORMAT} is not supported`)
        curKey = new MediaSegmentKey()
        curKey.method = attr.METHOD
        curKey.url = /^blob:/.test(attr.URI) ? attr.URI : getAbsoluteUrl(attr.URI, parentUrl)
        curKey.keyFormat = attr.KEYFORMAT || 'identity'
        curKey.keyFormatVersions = attr.KEYFORMATVERSIONS
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
        curSegment = new MediaSegment()
      }
        break
      default:
    }
  }

  media.segments = media.segments.filter(x => x.duration !== 0)

  const lastSegment = media.segments[media.segments.length - 1]
  if (lastSegment) media.endSN = lastSegment.sn

  media.totalDuration = totalDuration
  media.endCC = curCC

  return media
}
