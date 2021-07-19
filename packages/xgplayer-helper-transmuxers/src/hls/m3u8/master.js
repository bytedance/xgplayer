import { MasterPlaylist, MasterStream } from './model'
import { parseAttr, parseTag } from './utils'

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
      master.streams.push(new MasterStream(parseAttr(data), lines[index++], parentUrl))
    }
  }

  return master
}
