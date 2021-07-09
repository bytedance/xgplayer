import { TsFrag } from 'xgplayer-helper-models'
/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
class M3U8Parser {
  /**
   * @param {string} text
   * @param {string} baseurl
   * @return {{duration: number}}
   */
  static parse (text, baseurl = '') {
    let ret = {
      duration: 0
    }
    if (!text || !text.split) {
      return
    }
    let refs = text.split(/\r|\n/)
    refs = refs.filter((ref) => {
      return ref
    })
    let ref = refs.shift()
    if (!ref.match('#EXTM3U')) {
      throw new Error(`Invalid m3u8 file: not "#EXTM3U"`)
    }
    ref = refs.shift()
    let nextDiscontinue = false
    let nextId = 0
    while (ref) {
      let refm = ref.match(/#(.[A-Z|-]*):(.*)/)
      let refd = ref.match(/#(.[A-Z|-]*)/)
      if (refd && refm && refm.length > 2) {
        switch (refm[1]) {
          case 'EXT-X-VERSION':
            ret.version = parseInt(refm[2])
            break
          case 'EXT-X-MEDIA-SEQUENCE':
            ret.sequence = parseInt(refm[2])
            break
          case 'EXT-X-TARGETDURATION':
            ret.targetduration = parseFloat(refm[2])
            break
          case 'EXTINF':
            nextId = M3U8Parser.parseFrag(refm, refs, ret, baseurl, nextDiscontinue, nextId)
            nextDiscontinue = false
            break
          case 'EXT-X-KEY':
            M3U8Parser.parseDecrypt(refm[2], ret)
            break
          default:
            break
        }
      } if (refd && refd.length > 1) {
        switch (refd[1]) {
          case 'EXT-X-DISCONTINUITY':
            nextDiscontinue = true
            break
          case 'EXT-X-ENDLIST':
            let last = ret.frags[ret.frags.length - 1]
            last.isLast = true
            ret.end = true
            break
          default:
            break
        }
      }
      ref = refs[nextId++]
    }
    return ret
  }

  /**
   *
   * @param {string[]}refm
   * @param {string[]}refs
   * @param {*} ret
   * @param {string} baseurl
   * @param {boolean} discontinue
   * @param {number} nextId
   * @return {*}
   */
  static parseFrag (refm, refs, ret, baseurl, discontinue, nextId) {
    if (!ret.frags) {
      ret.frags = []
    }

    let frag = new TsFrag({
      start: ret.duration,
      duration: parseInt(parseFloat(refm[2]) * 1000)
    })

    if (frag.duration < 200) {
      return nextId
    }

    ret.duration += frag.duration
    let nextline = refs[nextId++]
    if (nextline.match(/#(.*):(.*)/) || nextline.match(/^#/)) {
      nextline = refs[nextId++]
    }
    if (nextline.length > 0 && nextline.charAt(0) === '/' && baseurl.match(/.*\/\/.*\.\w+/g)) {
      baseurl = baseurl.match(/.*\/\/.*\.\w+/g)[0]
    }
    if (nextline.match(/.*:\/\/.*/)) {
      const isHTTPS = M3U8Parser.isHTTPS
      if ((M3U8Parser.envisHttps || (M3U8Parser.envisHttps = isHTTPS(window.location.href))) && !isHTTPS(nextline)) {
        nextline = nextline.replace('http:', 'https:')
      }
      frag.url = nextline
    } else {
      frag.url = baseurl + nextline
    }
    frag.discontinue = discontinue
    // add id
    if (ret.frags.length) {
      let last = ret.frags[ret.frags.length - 1]
      frag.id = last.id + 1
      frag.cc = discontinue ? last.cc + 1 : last.cc
    } else {
      frag.id = ret.sequence || 1
      frag.cc = 0
    }
    ret.frags.push(frag)
    return nextId
  }

  /**
   * @param {string} url
   * @return {string}
   */
  static parseURL (url) {
    let baseurl = ''
    let urls = url.match(/(.*\/).*\.m3u8/)
    if (urls && urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
          baseurl = urls[i]
        }
      }
    }
    return baseurl
  }

  /**
   * @param {string[]}refm
   * @param {*} ret
   */
  static parseDecrypt (refm, ret) {
    ret.encrypt = {}
    let refs = refm.split(',')
    for (let i in refs) {
      let cmd = refs[i]
      if (cmd.match(/METHOD=(.*)/)) {
        ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1]
      }
      if (cmd.match(/URI="(.*)"/)) {
        ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1]
      }

      if (cmd.match(/IV=0x(.*)/)) {
        let iv = cmd.match(/IV=0x(.*)/)[1]
        let length = Math.ceil(iv.length / 2)
        ret.encrypt.ivb = new Uint8Array(length)
        for (let i = length - 1; i >= 0; i--) {
          let im = parseInt(iv.substr(i * 2, 2), 16)
          ret.encrypt.ivb[i] = im
        }
        ret.encrypt.iv = iv
      }
    };
  }

  /**
   * @param {string} url
   * @return {boolean}
   */
  static isHTTPS (url) {
    const httpsUrlRegex = /^https:\/\//i
    return httpsUrlRegex.test(url)
  }
}

export default M3U8Parser
