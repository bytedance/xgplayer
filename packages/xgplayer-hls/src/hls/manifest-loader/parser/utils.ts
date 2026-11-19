const REGEXP_TAG = /^#(EXT[^:]*)(?::(.*))?$/
const REGEXP_ATTR = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g
const REGEXP_ABSOLUTE_URL = /^(?:[a-zA-Z0-9+\-.]+:)?\/\//
const REGEXP_URL_PAIR = /^((?:[a-zA-Z0-9+\-.]+:)?\/\/[^/?#]*)?([^?#]*\/)?/

import type { DateRangeAttributes } from './model'

export function getLines(text: string): string[] {
  return text
    .split(/[\r\n]/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export function parseTag(text: string): [string, string | undefined] | undefined {
  const ret = text.match(REGEXP_TAG)
  if (!ret || !ret[1]) return
  return [ret[1].replace('EXT-X-', ''), ret[2]]
}

export function parseAttr(text: string): Record<string, string> {
  const ret: Record<string, string> = {}
  let match = REGEXP_ATTR.exec(text)
  while (match) {
    ret[match[1]] = match[2] || match[3]
    match = REGEXP_ATTR.exec(text)
  }
  return ret
}

export function getAbsoluteUrl(url: string, parentUrl?: string): string {
  if (!parentUrl || !url || REGEXP_ABSOLUTE_URL.test(url)) return url
  const pairs = REGEXP_URL_PAIR.exec(parentUrl)
  if (!pairs) return url
  if (url[0] === '?') return `${parentUrl.split(/[?#]/)[0]}${url}`
  if (url[0] === '/') return `${pairs[1]}${url}`
  return `${pairs[1]}${pairs[2]}${url}`
}

const CODECS_REGEXP = {
  audio: [/^mp4a/, /^vorbis$/, /^opus$/, /^flac$/, /^[ae]c-3$/],
  video: [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/],
  text: [/^vtt$/, /^wvtt/, /^stpp/]
}

export function getCodecs(
  type: keyof typeof CODECS_REGEXP,
  codecs: string[]
): string | undefined {
  const re = CODECS_REGEXP[type]
  if (!re || !codecs || !codecs.length) return
  for (let i = 0; i < re.length; i++) {
    for (let j = 0; j < codecs.length; j++) {
      if (re[i].test(codecs[j])) return codecs[j]
    }
  }
}

export function isValidDaterange(
  attr: DateRangeAttributes,
  dateRangeWithSameId?: DateRangeAttributes
): boolean {
  let _badValueForSameId: string | undefined
  if (dateRangeWithSameId) {
    for (const key in dateRangeWithSameId) {
      if (
        Object.prototype.hasOwnProperty.call(dateRangeWithSameId, key) &&
        attr[key] !== dateRangeWithSameId[key]
      ) {
        _badValueForSameId = key
        break
      }
    }
  }

  let duration = null
  if (attr.DURATION) {
    duration = parseFloat(attr.DURATION)
    if (!Number.isFinite(duration)) {
      duration = null
    } else if (attr._endDate && attr._startDate) {
      duration = (attr._endDate.getTime() - attr._startDate.getTime()) / 1000
    }
  }

  const cue = enumeratedStringList(attr.CUE || attr['X-CUE'], {
    pre: false,
    post: false,
    once: false
  })

  return (
    !!attr.ID &&
    !_badValueForSameId &&
    Number.isFinite(attr._startDate?.getTime()) &&
    (duration === null || duration >= 0) &&
    (!(attr.END_ON_NEXT === 'YES') || !!attr.CLASS) &&
    (!attr.CUE || (!cue.pre && !cue.post) || cue.pre !== cue.post) &&
    (!(attr.CLASS === 'com.apple.hls.interstitial') ||
      'X-ASSET-URI' in attr ||
      'X-ASSET-LIST' in attr)
  )
}

function enumeratedStringList(
  attrValue: string | undefined,
  dict: Record<string, boolean>
): Record<string, boolean> {
  return (attrValue ? attrValue.split(/[ ,]+/) : []).reduce((result, identifier) => {
    result[identifier.toLowerCase()] = true
    return result
  }, dict)
}
