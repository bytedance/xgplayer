import { MasterPlaylist, MasterStream, AudioStream, SubTitleStream, MediaStream } from './model'
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
  const audioStreams = []
  const subtitleStreams = []

  // eslint-disable-next-line no-cond-assign
  while (line = lines[index++]) {
    const tag = parseTag(line)
    if (!tag) continue
    const [name, data] = tag
    if (name === 'VERSION') {
      master.version = parseInt(data)
    } else if (name === 'MEDIA' && data) {
      const attr = parseAttr(data)
      let stream
      switch (attr.TYPE) {
        case 'AUDIO':
          stream = new AudioStream()
          break
        case 'SUBTITLES':
          stream = new SubTitleStream()
          break
        default:
          stream = new MediaStream()
      }

      stream.url = getAbsoluteUrl(attr.URI, parentUrl)
      stream.default = attr.DEFAULT === 'YES'
      stream.autoSelect = attr.AUTOSELECT === 'YES'
      stream.group = attr['GROUP-ID']
      stream.name = attr.NAME
      stream.lang = attr.LANGUAGE
      if (attr.CHANNELS) {
        stream.channels = Number(attr.CHANNELS.split('/')[0])
        if (Number.isNaN(stream.channels)) stream.channels = 0
      }

      if (attr.TYPE === 'AUDIO' && attr.URI) {
        audioStreams.push(stream)
      }

      if (attr.TYPE === 'SUBTITLES') {
        subtitleStreams.push(stream)
      }

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
      stream.audioGroup = attr.AUDIO
      stream.subtitleGroup = attr.SUBTITLES

      master.streams.push(stream)
    }
  }
  master.streams.forEach((s, i) => { s.id = i })

  if (audioStreams.length) {
    audioStreams.forEach((s, i) => { s.id = i })
    master.streams.forEach((stream) => {
      if (stream.audioGroup) {
        stream.audioStreams = audioStreams.filter(x => x.group === stream.audioGroup)
      }
    })
  }

  if (subtitleStreams.length) {
    subtitleStreams.forEach((s, i) => { s.id = i })
    master.streams.forEach((stream) => {
      if (stream.subtitleGroup) {
        stream.subtitleStreams = subtitleStreams.filter(x => x.group === stream.subtitleGroup)
      }
    })
  }

  return master
}
