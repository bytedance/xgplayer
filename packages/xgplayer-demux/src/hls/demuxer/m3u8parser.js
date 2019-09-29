/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
class M3U8Parser {
  static parse (text, baseurl = '') {
    let ret = {
      duration: 0
    };
    let refs = text.split(/\r|\n/);
    refs = refs.filter((ref) => {
      return ref;
    })
    let ref = refs.shift()
    if (!ref.match('#EXTM3U')) {
      // TODO:M3U格式错误。
      return null;
    }
    ref = refs.shift()
    while (ref) {
      let refm = ref.match(/#(.*):(.*)/);
      if (refm && refm.length > 2) {
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
            M3U8Parser.parseFrag(refm, refs, ret, baseurl);
            break;
          default:
            break;
        }
      }
      ref = refs.shift()
    }
    return ret;
  }

  static parseFrag (refm, refs, ret, baseurl) {
    if (!ret.frags) {
      ret.frags = []
    }

    let freg = {
      start: ret.duration,
      duration: parseFloat(refm[2]) * 1000
    }

    ret.duration += freg.duration;
    let nextline = refs.shift();
    if (nextline.match(/#(.*):(.*)/)) {
      nextline = refs.shift();
    }
    freg.url = baseurl + nextline;
    ret.frags.push(freg);
  }

  static parseURL (url) {
    let baseurl = '';
    let urls = url.match(/(.*\/).*\.m3u8/);
    if (urls && urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
          baseurl = urls[i];
        }
      }
    }
    return baseurl;
  }
}

export default M3U8Parser;
