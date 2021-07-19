import { MediaPlaylist, MediaSegment, MediaSegmentKey } from './model'
import { getAbsoluteUrl, parseAttr, parseTag } from './utils'

/**
 * @param {Array<string>} lines
 * @param {string} parentUrl
 * @returns {MediaPlaylist}
 */
export function parseMediaPlaylist (lines, parentUrl) {
  const media = new MediaPlaylist()
  let curSegment = new MediaSegment()
  let curInitSegment = null
  let curKey = null
  let totalDuration = 0
  let curSN = 0
  let curCC = 0
  let index = 0
  let line

  // eslint-disable-next-line no-cond-assign
  while (line = lines[index++]) {
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
      case 'ENDLIST':
        media.live = false
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
      case 'KEY':
        curKey = new MediaSegmentKey(parseAttr(data), parentUrl)
        break
      case 'BYTERANGE':
        setByteRange(data, curSegment, media.segments[media.segments.length - 1])
        break
      case 'EXTINF': {
        const [duration, title] = data.split(',')
        curSegment.duration = parseFloat(duration)
        totalDuration += curSegment.duration
        curSegment.title = title
      }
        break
      case 'MAP': {
        const attr = parseAttr(data)
        curSegment.url = getAbsoluteUrl(attr.URI, parentUrl)
        if (attr.BYTERANGE) setByteRange(attr.BYTERANGE, curSegment)
        curSegment.isInitSegment = true
        curSegment.sn = 0
        if (curKey) {
          curSegment.key = curKey.clone(0)
          // if (AES-128 && !iv) missing IV for initialization segment
        }
        curInitSegment = curSegment
        curSegment = new MediaSegment()
      }
        break
    }
  }

  const lastSegment = media.segments[media.segments.length - 1]
  if (lastSegment) media.endSN = lastSegment.sn

  media.totalDuration = totalDuration
  media.endCC = curCC

  return media
}

function setByteRange (data, segment, prevSegment) {
  segment.byteRange = [0]
  const bytes = data.split('@')
  if (bytes.length === 1 && prevSegment && prevSegment.byteRange) {
    segment.byteRange[0] = prevSegment.byteRange[1] || 0
  } else {
    segment.byteRange[0] = parseInt(bytes[1])
  }
  segment.byteRange[1] = segment.byteRange[0] + parseInt(bytes[0])
}
