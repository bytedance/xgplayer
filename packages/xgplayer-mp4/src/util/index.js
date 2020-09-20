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
util.stscOffset = function (stsc, sample_order) {
  let chunk_index; let samples_offset = ''
  let chunk_start = stsc.entries.filter((item) => {
    return item.first_sample <= sample_order && sample_order < item.first_sample + item.chunk_count * item.samples_per_chunk
  })[0]
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

util.seekSampleOffset = function (stsc, stco, stsz, order, mdatStart) {
  let chunkOffset = util.stscOffset(stsc, order + 1)
  let result = stco.entries[chunkOffset.chunk_index - 1] + util.sum.apply(null, stsz.entries.slice(chunkOffset.samples_offset[0] - 1, chunkOffset.samples_offset[1] - 1)) - mdatStart
  if (result === undefined) {
    throw `result=${result},stco.length=${stco.entries.length},sum=${util.sum.apply(null, stsz.entries.slice(0, order))}`
  } else if (result < 0) {
    throw `result=${result},stco.length=${stco.entries.length},sum=${util.sum.apply(null, stsz.entries.slice(0, order))}`
  }
  return result
}

util.seekSampleTime = function (stts, ctts, order, time_offset=0) {
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
  if (ctts) {
    let ct = 0
    ctts.entry.every(item => {
      ct += item.count
      if (order < ct) {
        offset = item.offset
        return false
      } else {
        return true
      }
    })
  }
  if (!time) {
    time = startTime + (order - count) * duration
  }
  time -= time_offset
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

export default util
