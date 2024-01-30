/* c8 ignore next 4 */
export { ExpGolomb } from './exp-golomb'
export { Logger } from './logger'
export { UTF8 } from './utf8'
export * from './env'

export function concatUint8Array (...arr) {
  arr = arr.filter(Boolean)
  const data = new Uint8Array(arr.reduce((p, c) => p + c.byteLength, 0))
  let prevLen = 0
  arr.forEach((d) => {
    data.set(d, prevLen)
    prevLen += d.byteLength
  })
  return data
}

export const MAX_SIZE = Math.pow(2, 32)

export function readBig16 (data, i = 0) {
  return (data[i] << 8) + (data[i + 1] || 0)
}

export function readBig24 (data, i = 0) {
  return (data[i] << 16) + (data[i + 1] << 8) + (data[i + 2] || 0)
}

export function readBig32 (data, i = 0) {
  return (data[i] << 24 >>> 0) + (data[i + 1] << 16) + (data[i + 2] << 8) + (data[i + 3] || 0)
}

export function readInt32 (data, i = 0) {
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength)
  return dv.getInt32(i)
}

export function readBig64 (data, i = 0) {
  return readBig32(data, i) * MAX_SIZE + readBig32(data, i + 4)
}

export function readInt64 (data, i = 0) {
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength)
  return (dv.getUint32(i) << 32) | dv.getUint32(i + 4)
}

export function getAvcCodec (codecs) {
  let codec = 'avc1.'
  let h
  for (let i = 0; i < 3; i++) {
    h = codecs[i].toString(16)
    if (h.length < 2) h = `0${h}`
    codec += h
  }
  return codec
}

export function formatIV (arr) {
  let iv = ''
  arr.forEach(value => {
    iv += bufferToString(value)
  })
  if (iv.length <= 32) {
    const len = 32 - iv.length
    for (let i = 0; i < len; i++) {
      iv += '0'
    }
  }
  return iv
}

export function parse (a) {
  if (!Array.isArray(a)) {
    const arr = []
    let value = ''
    for (let i = 0; i < a.length; i++) {
      if (i % 2) {
        value = a[i - 1] + a[i]
        arr.push(parseInt(value, 16))
        value = ''
      }
    }
    return arr
  }
  return a.map(item => { return parseInt(item, 16) })
}
function bufferToString (value) {
  return ('0' + (Number(value).toString(16))).slice(-2).toUpperCase()
}

export function hashVal (str) {
  let hash = 0; let i; let chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash
}
