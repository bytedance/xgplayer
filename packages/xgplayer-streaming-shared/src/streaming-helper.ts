export const NEW_ARRAY_MAX_CNT = 10

export type PlaybackQuality = Partial<
  Pick<VideoPlaybackQuality, 'droppedVideoFrames' | 'totalVideoFrames' | 'creationTime'>
>

interface PlaybackQualityMedia extends HTMLMediaElement {
  getVideoPlaybackQuality?: HTMLVideoElement['getVideoPlaybackQuality']
  webkitDroppedFrameCount?: number
  webkitDecodedFrameCount?: number
}

type Falsy = false | null | undefined

export function isMediaPlaying(media?: HTMLMediaElement | null): boolean {
  return !!(
    media &&
    !media.paused &&
    !media.ended &&
    media.playbackRate !== 0 &&
    media.readyState !== 0
  )
}

export function getVideoPlaybackQuality(
  media?: HTMLMediaElement | null
): PlaybackQuality {
  if (!media) return {}
  const video = media as PlaybackQualityMedia
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

export function concatUint8Array(
  ...arr: Array<Uint8Array | Falsy>
): Uint8Array | undefined {
  const arrays = arr.filter((item): item is Uint8Array => !!item)
  if (arrays.length < 2) return arrays[0]
  const size = arrays.reduce((p, c) => p + c.byteLength, 0)
  const data = newUint8Array(size)
  if (!data) return
  let prevLen = 0
  arrays.forEach((d) => {
    data.set(d, prevLen)
    prevLen += d.byteLength
  })
  return data
}

export function newUint8Array(size: number): Uint8Array | undefined {
  let cnt = 0
  let array: Uint8Array | undefined
  while (cnt < NEW_ARRAY_MAX_CNT) {
    try {
      array = new Uint8Array(size)
      if (array && array.byteLength > 0) {
        break
      } else {
        cnt++
      }
    } catch (error) {
      if (cnt < NEW_ARRAY_MAX_CNT) {
        cnt++
      } else {
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(`new array failed final,${message}`)
      }
    }
  }
  return array
}

export function sleep(t = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, t))
}
