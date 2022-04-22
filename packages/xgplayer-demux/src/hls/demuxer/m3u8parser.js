/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
class M3U8Parser {
  static parse (text, baseurl = '') {
    let ret = {
      duration: 0
    };
    if (!text || !text.split) {
      return;
    }
    let refs = text.split(/\r|\n/);
    refs = refs.filter((ref) => {
      return ref;
    })
    let ref = refs.shift()
    if (!ref.match('#EXTM3U')) {
      throw new Error(`Invalid m3u8 file: not "#EXTM3U"`);
    }
    ref = refs.shift();
    let nextDiscontinue = false;
    while (ref) {
      let refm = ref.match(/#(.[A-Z|-]*):(.*)/);
      let refd = ref.match(/#(.[A-Z|-]*)/);
      if (refd && refm && refm.length > 2) {
        switch (refm[1]) {
          case 'EXT-X-VERSION':
            ret.version = parseInt(refm[2]);
            break;
          case 'EXT-X-MEDIA-SEQUENCE':
            ret.sequence = parseInt(refm[2]);
            break;
          case 'EXT-X-TARGETDURATION':
            ret.targetduration = parseFloat(refm[2]);
            break;
          case 'EXTINF':
            M3U8Parser.parseFrag(refm, refs, ret, baseurl, nextDiscontinue);
            nextDiscontinue = false;
            break;
          case 'EXT-X-KEY':
            M3U8Parser.parseDecrypt(refm[2],ret);
            break;
          default:
            break;
        }
      } if (refd && refd.length > 1) {
        switch (refd[1]) {
          case 'EXT-X-DISCONTINUITY':
            nextDiscontinue = true;
            break;
          default:
            break;
        }
      }
      ref = refs.shift()
    }
    return ret;
  }

  static parseFrag (refm, refs, ret, baseurl, discontinue) {
    if (!ret.frags) {
      ret.frags = []
    }

    const frag = {
      start: ret.duration,
      duration: parseFloat(refm[2]) * 1000
    }

    ret.duration += frag.duration;
    let nextline = refs.shift();
    if (nextline.match(/#(.*):(.*)/)) {
      nextline = refs.shift();
    }

    frag.url = getAbsoluteUrl(nextline, baseurl)

    frag.discontinue = discontinue;
    ret.frags.push(frag);
  }

  static parseDecrypt(refm, ret) {
    ret.encrypt = {};
    let refs = refm.split(',');
    for (let i in refs) { 
      let cmd = refs[i];
      if(cmd.match(/METHOD=(.*)/)) {
        ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1];
      }
      if(cmd.match(/URI="(.*)"/)) {
        ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1];
      }

      if(cmd.match(/IV=0x(.*)/)) {
        let iv = cmd.match(/IV=0x(.*)/)[1];
        let length = Math.ceil(iv.length / 2);
        ret.encrypt.ivb = new Uint8Array(length);
        for(let i = length - 1; i >=0; i--) {
          let im = parseInt(iv.substr(i * 2, 2), 16);
          ret.encrypt.ivb[i] = im;
        } 
        ret.encrypt.iv = iv;
      }
    };
  }
}

const REGEXP_ABSOLUTE_URL = /^(?:[a-zA-Z0-9+\-.]+:)?\/\//
const REGEXP_URL_PAIR = /^((?:[a-zA-Z0-9+\-.]+:)?\/\/[^/?#]*)?([^?#]*\/)?/

function getAbsoluteUrl (url, parentUrl) {
  if (!parentUrl || !url || REGEXP_ABSOLUTE_URL.test(url)) return url
  const pairs = REGEXP_URL_PAIR.exec(parentUrl)
  if (!pairs) return url
  if (url[0] === '/') return pairs[1] + url
  return pairs[1] + pairs[2] + url
}

export default M3U8Parser;
