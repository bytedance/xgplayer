/* eslint-disable camelcase */
const util = {}

util.nowTime = function () {
  try {
    return parseInt(performance.now(), 10)
  } catch (e) {
    return new Date().getTime()
  }
}


util.concatData = function (video, audio) {
  const resBuffers = []
  let bufferSize = 0
  if (video) {
    resBuffers.push(video)
  }
  if (audio) {
    resBuffers.push(audio)
  }
  resBuffers.every(item => {
    item && (bufferSize += item.byteLength)
    return true
  })
  const buffer = new Uint8Array(bufferSize)
  let offset = 0
  resBuffers.every(item => {
    if (item) {
      buffer.set(item, offset)
      offset += item.byteLength
    }
    return true
  })
  return buffer
}

export function isMSE (video) {
  if (video.media) {
    video = video.media
  }
  if (!video || !(video instanceof HTMLMediaElement)) {
    return false
  }
  return /^blob/.test(video.currentSrc) || /^blob/.test(video.src)
}

const MONITOR_HEADERS = {
  'x-cache': 'x_cache',
  'x-response-sinfo': 'server_ip',
  'x-response-cinfo': 'x-response-cinfo',
  'content-range': 'content-range',
  'content-length':'content-length',
  'content-type':'content-type',
}
const NUM_2 = 2
export function getFileSizeFromHeaders (headers, key1) {
  // 错误日志中有undefined情况，增加判断
  // const key = MONITOR_HEADERS['content-range']
  const key = MONITOR_HEADERS[key1]
  if (headers && headers.get && headers.get(key)) {
    const range = headers.get(key)
    const splitArr = range.split('/')
    if (splitArr?.length === NUM_2){
      return splitArr[1]
    }
  }
  return null
}


export function unloadMedia (media) {
  try {
    if (media && media.src) {
      media.removeAttribute('src') // empty source
      media.load()
    }
  } catch (error) {
    //
  }
}

export function loadMedia (player, url) {
  const video = player.media || player.video
  player._detachSourceEvents(video)
  if (url instanceof Array) {
    player._attachSourceEvents(video, url)
  } else if (url) {
    video.src = url
  } else {
    video.removeAttribute('src')
  }
}


export default util
