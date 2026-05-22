export function isMediaPlaying (media) {
  return media && !media.paused && !media.ended && media.playbackRate !== 0 && media.readyState !== 0
}

export function getVideoPlaybackQuality (video) {
  if (!video) return {}
  if (typeof video.getVideoPlaybackQuality === 'function') {
    const info = video.getVideoPlaybackQuality()
    return {
      droppedVideoFrames: info.droppedVideoFrames || info.corruptedVideoFrames,
      totalVideoFrames: info.totalVideoFrames,
      creationTime: info.creationTime
    }
  }

  return {
    droppedVideoFrames: video.webkitDroppedFrameCount,
    totalVideoFrames: video.webkitDecodedFrameCount,
    creationTime: performance.now()
  }
}

/**
 * @param {Array.<Uint8Array>} arr
 * @returns
 */
export function concatUint8Array (...arr) {
  arr = arr.filter(Boolean)
  if (arr.length < 2) return arr[0]
  const data = new Uint8Array(arr.reduce((p, c) => p + c.byteLength, 0))
  let prevLen = 0
  arr.forEach((d) => {
    data.set(d, prevLen)
    prevLen += d.byteLength
  })
  return data
}

export function sleep (t = 0) {
  return new Promise((resolve) => setTimeout(resolve, t))
}
