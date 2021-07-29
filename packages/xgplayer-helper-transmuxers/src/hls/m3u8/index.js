import { parseMasterPlaylist } from './master'
import { parseMediaPlaylist } from './media'
import { getLines } from './utils'

export default class M3U8Parser {
  /**
   * @param {string} text
   * @param {string} parentUrl
   * @returns {MasterPlaylist | MediaPlaylist}
   */
  static parse (text = '', parentUrl) {
    if (!text.includes('#EXTM3U')) throw new Error('Invalid m3u8 file')

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
    return text.includes('#EXTINF:') || text.includes('#EXT-X-TARGETDURATION:')
  }
}
