export function getBuffered (video) {
  try {
    return video.buffered
  } catch (e) {
    return {
      length: 0,
      start: () => 0,
      end: () => 0
    }
  }
}

export function getLastBufferedEnd (video) {
  const buffered = getBuffered(video)
  if (buffered.length) {
    return buffered.end(buffered.length - 1)
  }
}

export function clamp (n, lower = 0, upper = 1) {
  return Math.max(Math.min(n, upper), lower)
}
