interface MP4Util {
  nowTime: () => number
  concatData: (video?: Uint8Array | null, audio?: Uint8Array | null) => Uint8Array
}

const util: MP4Util = {
  nowTime: () => {
    try {
      return parseInt(String(performance.now()), 10)
    } catch {
      return Date.now()
    }
  },

  /**
   * 合并音视频两段 Uint8Array（任一为空则跳过）。
   */
  concatData: (video, audio) => {
    const buffers = [video, audio].filter(
      (item): item is Uint8Array => item instanceof Uint8Array
    )
    const size = buffers.reduce((total, item) => total + item.byteLength, 0)
    const buffer = new Uint8Array(size)
    let offset = 0
    buffers.forEach((item) => {
      buffer.set(item, offset)
      offset += item.byteLength
    })
    return buffer
  }
}

export default util
