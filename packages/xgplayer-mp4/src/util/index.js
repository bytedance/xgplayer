let util = {}

/**
 * [使用递归查询指定type的box]
 * var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
 * @param  {Object} root [JSON对象]
 * @param  {String} type [box的类型]
 * @param  {?Array} type [box]
 * @return {Object|Array<Object>|undefined} [box]
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
  let charstr = String(pad); let len = length >> 0; let maxlen = Math.ceil(len / charstr.length)
  let chars = []; let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
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

/**
 * [计算音视频数据在Mdat中的偏移量]
 * @param  {Array} stsc         [块偏移量]
 * @param  {Number} sample_order [帧次序]
 * @return {Object}              [块的位置和当前帧的偏移数]
 */
util.stscOffset = function (stsc, sample_order, stscObj) {
  let chunk_index; let samples_offset = ''
  // let chunk_start = stsc.entries.filter((item) => {
  //   return item.first_sample <= sample_order && sample_order < item.first_sample + item.chunk_count * item.samples_per_chunk
  // })[0]
  let chunk_start = stscObj[sample_order];
  if (!chunk_start) {
    let last_chunk = stsc.entries.pop()
    stsc.entries.push(last_chunk)
    let chunk_offset = Math.floor((sample_order - last_chunk.first_sample) / last_chunk.samples_per_chunk)
    let last_chunk_index = last_chunk.first_chunk + chunk_offset
    let last_chunk_first_sample = last_chunk.first_sample + last_chunk.samples_per_chunk * chunk_offset
    return {
      chunk_index: last_chunk_index,
      samples_offset: [last_chunk_first_sample, sample_order]
    }
  } else {
    let chunk_offset = Math.floor((sample_order - chunk_start.first_sample) / chunk_start.samples_per_chunk)
    let chunk_offset_sample = chunk_start.first_sample + chunk_offset * chunk_start.samples_per_chunk
    chunk_index = chunk_start.first_chunk + chunk_offset
    samples_offset = [chunk_offset_sample, sample_order]
    return {
      chunk_index: chunk_index,
      samples_offset
    }
  }
}

util.seekSampleOffset = function (stsc, stco, stsz, order, mdatStart, stscObj) {
  let chunkOffset = util.stscOffset(stsc, order + 1, stscObj)
  let result = stco.entries[chunkOffset.chunk_index - 1] + util.sum.apply(null, stsz.entries.slice(chunkOffset.samples_offset[0] - 1, chunkOffset.samples_offset[1] - 1)) - mdatStart
  if (result === undefined) {
    throw `result=${result},stco.length=${stco.entries.length},sum=${util.sum.apply(null, stsz.entries.slice(0, order))}`
  } else if (result < 0) {
    throw `result=${result},stco.length=${stco.entries.length},sum=${util.sum.apply(null, stsz.entries.slice(0, order))}`
  }
  return result
}

util.seekSampleTime = function (stts, cttsObj, order) {
  let time; let duration; let count = 0; let startTime = 0; let offset = 0
  stts.entry.every(item => {
    duration = item.sampleDuration
    if (order < count + item.sampleCount) {
      time = startTime + (order - count) * item.sampleDuration
      return false
    } else {
      count += item.sampleCount
      startTime += item.sampleCount * duration
      return true
    }
  })
  if (cttsObj) {
    if(cttsObj[order]){
      offset = cttsObj[order]
    }
  }
  if (!time) {
    time = startTime + (order - count) * duration
  }
  return {time, duration, offset}
}

util.seekOrderSampleByTime = function (stts, timeScale, time) {
  let startTime = 0; let order = 0; let count = 0; let itemDuration
  stts.every((item, idx) => {
    itemDuration = item.sampleCount * item.sampleDuration / timeScale
    if (time <= startTime + itemDuration) {
      order = count + Math.ceil((time - startTime) * timeScale / item.sampleDuration)
      startTime = startTime + Math.ceil((time - startTime) * timeScale / item.sampleDuration) * item.sampleDuration / timeScale
      return false
    } else {
      startTime += itemDuration
      count += item.sampleCount
      return true
    }
  })
  return {order, startTime}
}

util.seekTrakDuration = function (trak, timeScale) {
  let stts = util.findBox(trak, 'stts'); let duration = 0
  stts.entry.forEach(item => {
    duration += item.sampleCount * item.sampleDuration
  })
  return Number(duration / timeScale).toFixed(4)
}

util.StringToArrayBuffer = function (str) {
  let arr = new ArrayBuffer(str.length)
  let view = new Uint8Array(arr)
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i)
  }
  return arr
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
util.fromCharCode = function (array) {
  let max = 16000
  let ret = ''
  for (let i = 0; i < array.length; i += max) {
    let subArray = array.subarray(i, i + max)
    ret += String.fromCharCode.apply(null, subArray)
  }

  return ret
}
util.ArrayBufferToString = function (arr) {
  let str = ''
  let view = new Uint8Array(arr)
  for (let i = 0; i < view.length; i++) {
    str += String.fromCharCode(view[i])
  }
  return str
}
util.Base64ToHex = function (str) {
  let bin = window.atob(str.replace(/-/g, '+').replace(/_/g, '/'))
  let res = ''
  for (let i = 0; i < bin.length; i++) {
    res += ('0' + bin.charCodeAt(i).toString(16)).substr(-2)
  }
  return res
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

util.bufferToString = function (value) {
  return ("0"+(Number(value).toString(16))).slice(-2).toUpperCase()
}
util.strToBuf = function (str) {
  let buffer = []
  for(let i = 0; i < str.length; i = i + 2) {
    buffer.push(
      parseInt(str[i] + str[i + 1], 16)
    )
  }
  return new Uint8Array(buffer)
}
util.str2hex = function (str) {
  if(str === "") {
    return ""
  }
  let arr = [];
  for(let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i))
  }
  return arr
}
util.parse = function (a) {
  if (!Array.isArray(a)) {
    let arr = [];
    let value = '';
    for(let i = 0; i < a.length; i++) {
      if (i % 2) {
        value = a[i - 1] + a[ i ]
        arr.push(parseInt(value, 16))
        value = ''
      }
    }
    return arr
  }
  return a.map(item => {return parseInt(item, 16)})
}
export default util
