/* eslint-disable camelcase */
const util = {}

util.nowTime = () => {
  try {
    return parseInt(performance.now(), 10)
  } catch {
    return new Date().getTime()
  }
}

/**
 * 合并音视频两段 Uint8Array（任一为空则跳过）。
 */
util.concatData = (video, audio) => {
  const buffers = [video, audio].filter(Boolean)
  let size = 0
  buffers.forEach((item) => {
    size += item.byteLength
  })
  const buffer = new Uint8Array(size)
  let offset = 0
  buffers.forEach((item) => {
    buffer.set(item, offset)
    offset += item.byteLength
  })
  return buffer
}

export default util
