let util = {}

util.ArrayBufferToString = function (arr) {
  let str = ''
  let view = new Uint8Array(arr)
  for (let i = 0; i < view.length; i++) {
    str += String.fromCharCode(view[i])
  }
  return str
}

util.StringToArrayBuffer = function (str) {
  let arr = new ArrayBuffer(str.length)
  let view = new Uint8Array(arr)
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i)
  }
  return arr
}

util.Base64ToHex = function (str) {
  let bin = window.atob(str.replace(/-/g, '+').replace(/_/g, '/'))
  let res = ''
  for (let i = 0; i < bin.length; i++) {
    res += ('0' + bin.charCodeAt(i).toString(16)).substr(-2)
  }
  return res
}

util.HexToBase64 = function (hex) {
  let bin = ''
  for (let i = 0; i < hex.length; i += 2) {
    bin += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return window.btoa(bin).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

/**
 * [使用递归查询指定type的box]
 * var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
 * @param  {Object} root [JSON对象]
 * @param  {String} type [box的类型]
 * @return {Object}      [box]
 */
util.findBox = function (root, type, result = []) {
  if (root.type !== type) {
    if (root && root.subBox) {
      let box = root.subBox.filter(item => item.type === type)
      if (box.length) {
        box.forEach(item => result.push(item))
      } else {
        root.subBox.forEach(item => util.findBox(item, type, result))
      }
    }
  } else {
    result.push(root)
  }
  result = [].concat(result)
  return result.length > 1 ? result : result[0]
}

util.padStart = function (str, length, pad) {
  let charstr = String(pad)
  let len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  let chars = []
  let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

/**
 * [mpd时间转换]
 * @param  {Number} value [要转换的mpd时间]
 * @return {String}       [秒数]
 */
util.durationConvert = function (value) {
  let Hours = 0
  let Minutes = 0
  let Seconds = 0
  value = value.slice(value.indexOf('PT') + 2)
  if (value.indexOf('H') > -1 && value.indexOf('M') > -1 && value.indexOf('S') > -1) {
    Hours = parseFloat(value.slice(0, value.indexOf('H')))
    Minutes = parseFloat(value.slice(value.indexOf('H') + 1, value.indexOf('M')))
    Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')))
  } else if (value.indexOf('H') < 0 && value.indexOf('M') > 0 && value.indexOf('S') > -1) {
    Minutes = parseFloat(value.slice(0, value.indexOf('M')))
    Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')))
  } else if (value.indexOf('H') < 0 && value.indexOf('M') < 0 && value.indexOf('S') > -1) {
    Seconds = parseFloat(value.slice(0, value.indexOf('S')))
  }
  return Hours * 3600 + Minutes * 60 + Seconds
}

/**
 * [前补0]
 * @param  {Number} num [传入的数字]
 * @param  {Number} n [要保留的字符的长度]
 * @return {String}       [补充后的字符串]
 */
util.preFixInterge = function (num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

/**
 * [十进制转十六进制]
 * @param  {Number} value [要转换的十进制数字]
 * @return {String}       [十六进制]
 */
util.toHex = function (...value) {
  let hex = []
  value.forEach(item => {
    hex.push(util.padStart(Number(item).toString(16), 2, 0))
  })
  return hex
}

/**
 * [求和计算]
 * @param  {[type]} rst [description]
 * @return {[type]}     [description]
 */
util.sum = function (...rst) {
  let count = 0
  rst.forEach(item => { count += item })
  return count
}

util.toUTF8 = function (str) {
  // http://stackoverflow.com/a/13691499
  // Converts the given string to a URI encoded string.  If a character falls
  // in the ASCII range, it is not converted; otherwise it will be converted to
  // a series of URI escape sequences according to UTF-8.
  // Example: 'g#€' -> 'g#%E3%82%AC'
  let encoded = encodeURIComponent(str)
  // Convert each escape sequence individually into a character.  Each escape
  // sequence is interpreted as a code-point, so if an escape sequence happens
  // to be part of a multi-byte sequence, each byte will be converted to a
  // single character.
  // Example: 'g#%E3%82%AC' -> '\x67\x35\xe3\x82\xac'
  let utf8 = unescape(encoded)

  let result = new Uint8Array(utf8.length)
  for (let i = 0; i < utf8.length; ++i) {
    result[i] = utf8.charCodeAt(i)
  }
  return result.buffer
}

/**
 * Convert a hex string to a Uint8Array.
 * @param {string} str
 * @return {!Uint8Array}
 * @export
 */
util.fromHex = function (str) {
  let arr = new Uint8Array(str.length / 2)
  for (let i = 0; i < str.length; i += 2) {
    arr[i / 2] = window.parseInt(str.substr(i, 2), 16)
  }
  return arr
}

/**
 * Creates a new string from the given array of char codes.
 *
 * Using String.fromCharCode.apply is risky because you can trigger stack errors
 * on very large arrays.  This breaks up the array into several pieces to avoid
 * this.
 *
 * @param {!TypedArray} array
 * @return {string}
 */
util.fromCharCode = function (array) {
  let max = 16000
  let ret = ''
  for (let i = 0; i < array.length; i += max) {
    let subArray = array.subarray(i, i + max)
    ret += String.fromCharCode.apply(null, subArray)
  }

  return ret
}

/**
 * Convert a Uint8Array to a base64 string.  The output will always use the
 * alternate encoding/alphabet also known as "base64url".
 * @param {!Uint8Array} arr
 * @param {boolean=} padding If true, pad the output with equals signs.
 *   Defaults to true.
 * @return {string}
 * @export
 */
util.toBase64 = function (arr, padding) {
  // btoa expects a "raw string" where each character is interpreted as a byte.
  let bytes = util.fromCharCode(arr)
  padding = (padding === undefined) ? true : padding
  let base64 = window.btoa(bytes).replace(/\+/g, '-').replace(/\//g, '_')
  return padding ? base64 : base64.replace(/=*$/, '')
}

export default util
