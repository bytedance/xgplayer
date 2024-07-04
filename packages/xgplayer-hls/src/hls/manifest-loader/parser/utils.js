const REGEXP_TAG = /^#(EXT[^:]*)(?::(.*))?$/
const REGEXP_ATTR = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g
const REGEXP_ABSOLUTE_URL = /^(?:[a-zA-Z0-9+\-.]+:)?\/\//
const REGEXP_URL_PAIR = /^((?:[a-zA-Z0-9+\-.]+:)?\/\/[^/?#]*)?([^?#]*\/)?/

export function getLines (text) {
  return text.split(/[\r\n]/).map((x) => x.trim()).filter(Boolean)
}

export function parseTag (text) {
  const ret = text.match(REGEXP_TAG)
  if (!ret || !ret[1]) return
  return [ret[1].replace('EXT-X-', ''), ret[2]]
}

export function parseAttr (text) {
  const ret = {}
  let match = REGEXP_ATTR.exec(text)
  while (match) {
    ret[match[1]] = match[2] || match[3]
    match = REGEXP_ATTR.exec(text)
  }
  return ret
}

export function getAbsoluteUrl (url, parentUrl) {
  if (!parentUrl || !url || REGEXP_ABSOLUTE_URL.test(url)) return url
  const pairs = REGEXP_URL_PAIR.exec(parentUrl)
  if (!pairs) return url
  if (url[0] === '/') return pairs[1] + url
  return pairs[1] + pairs[2] + url
}

const CODECS_REGEXP = {
  audio: [/^mp4a/, /^vorbis$/, /^opus$/, /^flac$/, /^[ae]c-3$/],
  video: [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/],
  text: [/^vtt$/, /^wvtt/, /^stpp/]
}

/**
 * @param {'audio' | 'video' | 'text'} type
 * @param {Array<string>} codecs
 * @returns {string | undefined}
 */
export function getCodecs (type, codecs) {
  const re = CODECS_REGEXP[type]
  if (!re || !codecs || !codecs.length) return
  for (let i = 0; i < re.length; i++) {
    for (let j = 0; j < codecs.length; j++) {
      if (re[i].test(codecs[j])) return codecs[j]
    }
  }
}

export function isValidDaterange(attr, dateRangeWithSameId) {
  let _badValueForSameId
  if (dateRangeWithSameId) {
    for (const key in dateRangeWithSameId) {
      if (
        Object.prototype.hasOwnProperty.call(dateRangeWithSameId, key) &&
        attr[key] !== dateRangeWithSameId[key]
      ) {
        _badValueForSameId = key;
        break;
      }
    }
  }

  let duration = null
  if (attr.DURATION) {
    duration = parseFloat(attr.DURATION)
    if (!Number.isFinite(duration)) {
      duration = null
    } else if (attr._endDate) {
      duration = (attr._endDate.getTime() - attr._startDate.getTime()) / 1000
    }
  }

  const cue = enumeratedStringList(attr.CUE || attr['X-CUE'], {
    pre: false,
    post: false,
    once: false,
  })

  return (
    !!attr.ID &&
    !_badValueForSameId &&
    Number.isFinite(attr._startDate.getTime()) &&
    (duration === null || duration >= 0) &&
    (!(attr.END_ON_NEXT === 'YES') || !!attr.CLASS) &&
    (!attr.CUE ||
      (!cue.pre && !cue.post) ||
      cue.pre !== cue.post) &&
    (!(attr.CLASS === 'com.apple.hls.interstitial') ||
      'X-ASSET-URI' in attr ||
      'X-ASSET-LIST' in attr)
  );
}

function enumeratedStringList(attrValue, dict) {
  return (attrValue ? attrValue.split(/[ ,]+/) : []).reduce(
    (result, identifier) => {
      result[identifier.toLowerCase()] = true;
      return result;
    },
    dict,
  );
}
