/* eslint-disable camelcase */
const util = {}

util.nowTime = () => {
  try {
    return parseInt(performance.now(), 10)
  } catch (_e) {
    return Date.now()
  }
}

util.concatData = (video, audio) => {
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
