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

export function calculateSpeed (byteLen, millisec) {
  return Math.round(byteLen * 8 * 1000 / millisec / 1024)
}
