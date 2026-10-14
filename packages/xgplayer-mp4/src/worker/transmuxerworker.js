import { FMP4Remuxer, MP4Demuxer } from 'xgplayer-transmuxer'

/**
 * Worker 线程：在主线程外完成 mp4 → fmp4 的 demux + remux。
 * 与主线程 BufferService 保持同一套 xgplayer-transmuxer 接口（demux / remux），
 * 返回已切好的 init/segment 以及 source 创建所需的 type/codec 信息。
 */
let demuxer = null
let remuxer = null
let needInitSegment = true

function ensureInstances() {
  if (!demuxer) demuxer = new MP4Demuxer()
  if (!remuxer) remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack)
}

onmessage = function (e) {
  const { method, id, args } = e.data
  switch (method) {
    case 'init': {
      demuxer = null
      remuxer = null
      needInitSegment = true
      break
    }
    case 'transmux': {
      ensureInstances()
      const data = new Uint8Array(e.data.buffer)
      const { dataStart, videoIndexRange, audioIndexRange, moov } = args
      let result
      try {
        const { videoTrack, audioTrack } = demuxer.demux(
          data,
          dataStart,
          videoIndexRange,
          audioIndexRange,
          moov
        )
        const remuxResult = remuxer.remux(needInitSegment)
        needInitSegment = false

        const transfers = []
        const take = (seg) => {
          if (seg?.buffer) transfers.push(seg.buffer)
          return seg
        }
        result = {
          video: videoTrack.exist()
            ? {
                type: videoTrack.type,
                codec: videoTrack.codec,
                initSegment: take(remuxResult.videoInitSegment),
                segment: take(remuxResult.videoSegment)
              }
            : null,
          audio: audioTrack.exist()
            ? {
                type: audioTrack.type,
                codec: audioTrack.codec,
                initSegment: take(remuxResult.audioInitSegment),
                segment: take(remuxResult.audioSegment)
              }
            : null
        }
        this.postMessage({ method: 'transmux', id, result }, transfers)
      } catch (err) {
        this.postMessage({
          method: 'transmux',
          id,
          error: { message: err?.message || 'worker transmux error' }
        })
      }
      break
    }
    case 'reset': {
      demuxer?.reset()
      remuxer?.reset()
      needInitSegment = true
      break
    }
    default:
    //
  }
}
