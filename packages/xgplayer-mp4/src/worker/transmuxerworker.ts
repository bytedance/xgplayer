import { FMP4Demuxer, FMP4Remuxer, MP4Demuxer } from 'xgplayer-transmuxer'
import type { WorkerRequest, WorkerResponse, WorkerTransmuxResult } from '../types'

interface WorkerScope {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
  postMessage: (message: WorkerResponse, transfer?: Transferable[]) => void
}

const workerScope = self as unknown as WorkerScope
let demuxer: MP4Demuxer | FMP4Demuxer | null = null
let remuxer: FMP4Remuxer | null = null
let needInitSegment = true
let isFragmentMP4 = false

function ensureInstances(): {
  demuxer: MP4Demuxer | FMP4Demuxer
  remuxer: FMP4Remuxer
} {
  if (!demuxer || !remuxer) throw new Error('worker is not configured')
  return { demuxer, remuxer }
}

function reset() {
  demuxer = null
  remuxer = null
  needInitSegment = true
  isFragmentMP4 = false
}

/**
 * Worker 线程：在主线程外完成 mp4 → fmp4 的 demux + remux。
 * 与主线程 BufferService 保持同一套 xgplayer-transmuxer 接口（demux / remux），
 * 返回已切好的 init/segment 以及 source 创建所需的 type/codec 信息。
 */
workerScope.onmessage = (event) => {
  const message = event.data
  switch (message.method) {
    case 'init': {
      reset()
      break
    }
    case 'configure': {
      isFragmentMP4 = message.isFragmentMP4
      demuxer = isFragmentMP4
        ? new FMP4Demuxer(undefined, undefined, undefined)
        : new MP4Demuxer(message.videoSegments, message.audioSegments, undefined, {
            memoryOpt: message.memoryOpt
          })
      remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack, {})
      needInitSegment = true
      break
    }
    case 'transmux': {
      const { id, args } = message
      const instances = ensureInstances()
      const data = new Uint8Array(message.buffer)
      let result: WorkerTransmuxResult
      try {
        const { videoTrack, audioTrack } = isFragmentMP4
          ? (instances.demuxer as FMP4Demuxer).demuxPart(data, args.dataStart, args.moov)
          : (instances.demuxer as MP4Demuxer).demux(
              data,
              args.dataStart,
              args.videoIndexRange,
              args.audioIndexRange,
              args.moov
            )
        const remuxResult = instances.remuxer.remux(needInitSegment)
        needInitSegment = false

        const transfers = new Set<ArrayBuffer>()
        const take = (segment?: Uint8Array) => {
          if (segment?.buffer instanceof ArrayBuffer) transfers.add(segment.buffer)
          return segment
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
        workerScope.postMessage({ method: 'transmux', id, result }, Array.from(transfers))
      } catch (error) {
        workerScope.postMessage({
          method: 'transmux',
          id,
          error: {
            message: error instanceof Error ? error.message : 'worker transmux error'
          }
        })
      }
      break
    }
    case 'reset': {
      reset()
      break
    }
  }
}
