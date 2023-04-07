import { parseMasterPlaylist } from './master'
import { parseMediaPlaylist } from './media'
import { getLines } from './utils'

export class M3U8Parser {
  static parse (text = '', parentUrl) {
    if (!text.includes('#EXTM3U')) throw new Error('Invalid m3u8 file')

    const lines = getLines(text)

    if (M3U8Parser.isMediaPlaylist(text)) {
      return parseMediaPlaylist(lines, parentUrl)
    }
    return parseMasterPlaylist(lines, parentUrl)
  }

  static isMediaPlaylist (text) {
    return text.includes('#EXTINF:') || text.includes('#EXT-X-TARGETDURATION:')
  }
}
