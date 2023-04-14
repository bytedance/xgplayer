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

export default util
