import { parseMasterPlaylist } from './master'
import { parseMediaPlaylist } from './media'
import { getLines } from './utils'

export * from './model'

export default class M3U8Parser {
  /**
   * @param {string} text
   * @param {string} parentUrl
   * @returns {MasterPlaylist | MediaPlaylist}
   */
  static parse (text = '', parentUrl) {
    if (!~text.indexOf('#EXTM3U')) throw new Error('Invalid m3u8 file')

    const lines = getLines(text)

    if (M3U8Parser.isMediaPlaylist(text)) {
      return parseMediaPlaylist(lines, parentUrl)
    }
    return parseMasterPlaylist(lines, parentUrl)
  }

  /**
   * @param {string} text
   * @returns {boolean}
   */
  static isMediaPlaylist (text) {
    return ~text.indexOf('#EXTINF:') || ~text.indexOf('#EXT-X-TARGETDURATION:')
  }

  // 临时 将新对象转为老对象
  static tempAdapter (media) {
    const ret = {}
    ret.version = media.version
    ret.targetduration = media.targetDuration * 1000
    ret.end = !media.live
    ret.sequence = media.startSN
    if (media.segments[0] && media.segments[0].key) {
      ret.encrypt = {
        method: media.segments[0].key.method,
        uri: media.segments[0].key.url,
        ivb: media.segments[0].key.iv
      }
    }

    let start = 0
    let duration = 0
    ret.frags = media.segments.map(x => {
      const frag = {}
      frag.url = x.url
      frag.duration = x.duration * 1000
      frag.start = start
      frag.cc = x.cc
      frag.id = x.sn
      start += frag.duration
      duration += frag.duration
      return frag
    })
    ret.duration = duration
    console.log(ret)
    return ret
  }
}
