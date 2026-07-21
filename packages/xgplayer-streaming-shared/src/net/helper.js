import { isDate, isObject } from '../is'

export function getRangeValue (value) {
  if (!value || value[0] === null || value[0] === undefined || (value[0] === 0 && (value[1] === null || value[1] === undefined))) {
    return
  }
  let ret = 'bytes=' + value[0] + '-'
  if (value[1]) ret += value[1]
  return ret
}

function encode (val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function setUrlParams (url, params) {
  if (!url) return
  if (!params) return url
  let v
  const str = Object.keys(params).map(k => {
    v = params[k]
    if (v === null || v === undefined) return
    if (Array.isArray(v)) {
      k = k + '[]'
    } else {
      v = [v]
    }

    return v.map(x => {
      if (isDate(x)) {
        x = x.toISOString()
      } else if (isObject(x)) {
        x = JSON.stringify(x)
      }
      return `${encode(k)}=${encode(x)}`
    }).join('&')
  }).filter(Boolean).join('&')

  if (str) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + str
  }

  return url
}

export function getRangeResponseMismatchReason (requestRange, contentRangeValue, contentLengthValue) {
  if (!Array.isArray(requestRange) || requestRange.length < 2) return ''
  const parsedContentRange = parseContentRange(contentRangeValue)
  if (!parsedContentRange) return ''

  const requestStart = parseInt(requestRange[0], 10)
  const requestEnd = normalizeRequestRangeEnd(requestRange[1])
  if (Number.isNaN(requestStart)) return ''

  if (parsedContentRange.start !== requestStart) {
    return 'response range start does not match request range'
  }
  if (requestEnd !== null && parsedContentRange.end !== requestEnd) {
    return 'response range end does not match request range'
  }

  const contentLength = parseInt(contentLengthValue || '', 10)
  if (Number.isNaN(contentLength)) return ''

  const responseLength = parsedContentRange.end - parsedContentRange.start + 1
  if (contentLength !== responseLength) {
    return 'content-length does not match content-range'
  }

  return ''
}

function normalizeRequestRangeEnd (value) {
  if (value === null || value === undefined || value === '') return null
  const end = parseInt(value, 10)
  if (Number.isNaN(end) || end === 0) return null
  return end
}

function parseContentRange (value) {
  if (!value || typeof value !== 'string') return null
  const match = value.match(/^bytes\s+(\d+)-(\d+)\/(?:\d+|\*)$/i)
  if (!match) return null
  const start = parseInt(match[1], 10)
  const end = parseInt(match[2], 10)
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return null
  return { start, end }
}

export function createResponse (
  data,
  done,
  response,
  contentLength,
  age,
  startTime,
  firstByteTime,
  index,
  range,
  vid,
  priOptions
) {
  age = (age !== null && age !== undefined) ? parseFloat(age) : null
  contentLength = parseInt(contentLength || '0', 10)
  if (Number.isNaN(contentLength)) contentLength = 0
  const options = { range, vid, index, contentLength, age, startTime, firstByteTime, endTime: Date.now(), priOptions }
  return { data, done, options, response }
}

export function calculateSpeed (byteLen, milliSecond) {
  return Math.round(byteLen * 8 * 1000 / milliSecond / 1024) // Kb/s
}
