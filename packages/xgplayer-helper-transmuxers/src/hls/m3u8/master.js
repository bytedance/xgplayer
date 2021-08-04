import { MasterPlaylist, MasterStream } from 'xgplayer-helper-models'
import { parseAttr, parseTag, getAbsoluteUrl, getCodecs } from './utils'

/**
 * @param {Array<string>} lines
 * @param {string} parentUrl
 * @returns {MasterPlaylist}
 */
export function parseMasterPlaylist (lines, parentUrl) {
  const master = new MasterPlaylist()
  let index = 0
  let line

  // eslint-disable-next-line no-cond-assign
  while (line = lines[index++]) {
    const tag = parseTag(line)
    if (!tag) continue
    const [name, data] = tag
    if (name === 'VERSION') {
      master.version = parseInt(data)
    } else if (name === 'STREAM-INF' && data) {
      const stream = new MasterStream()
      const attr = parseAttr(data)

      stream.bitrate = parseInt(attr['AVERAGE-BANDWIDTH'] || attr.BANDWIDTH)
      stream.name = attr.NAME
      stream.url = getAbsoluteUrl(lines[index++], parentUrl)
      if (attr.RESOLUTION) {
        const [w, h] = attr.RESOLUTION.split('x')
        stream.width = parseInt(w)
        stream.height = parseInt(h)
      }
      if (attr.CODECS) {
        const codecs = attr.CODECS.split(/[ ,]+/).filter(Boolean)
        stream.videoCodec = getCodecs('video', codecs)
        stream.audioCodec = getCodecs('audio', codecs)
        stream.textCodec = getCodecs('text', codecs)
      }

      master.streams.push(stream)
    }
  }

  return master
}
