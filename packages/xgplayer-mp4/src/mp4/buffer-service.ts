import { Buffer, ERR, MSE, StreamingError } from 'xgplayer-streaming-shared'
import { FMP4Demuxer, FMP4Remuxer, MP4Demuxer } from 'xgplayer-transmuxer'
import type {
  MP4Config,
  MP4MediaElement,
  SegmentFrame,
  SegmentIndexRange,
  WorkerTransmuxResult
} from '../types'
import TransmuxerWorkerControl, { WorkerTaskCancelledError } from '../worker'
import type { MP4 } from '.'

interface SourceInfo {
  type: string
  codec: string
}

export class BufferService {
  _demuxer: MP4Demuxer | FMP4Demuxer | null = null
  _remuxer: FMP4Remuxer | null = null
  _mse: MSE | null = null
  _softVideo: MP4MediaElement | null = null
  _needInitSegment = true
  _sourceCreated = false
  _worker: TransmuxerWorkerControl | null = null

  private _sourceTypes = new Set<string>()
  private _isFragmentMP4 = false
  private _destroyed = false
  private readonly _config: MP4Config
  private readonly mp4: MP4

  constructor(mp4: MP4, config: MP4Config) {
    this.mp4 = mp4
    this._config = config
    if (config.softDecode) {
      this._softVideo = mp4.media
    } else {
      this._mse = new MSE(undefined, {
        preferMMS: config.preferMMS,
        attachMode: config.mseAttachMode
      })
      this._initWorker()
    }
  }

  get isMMS() {
    const mediaSource = this._mse?.mediaSource
    return /ManagedMediaSource/i.test(Object.prototype.toString.call(mediaSource))
  }

  setSegmentList(
    videoSegments: unknown[],
    audioSegments: unknown[],
    isFragmentMP4: boolean
  ) {
    if (this._destroyed || this._demuxer) return
    this._isFragmentMP4 = isFragmentMP4
    const demuxer = isFragmentMP4
      ? new FMP4Demuxer(undefined, undefined, undefined)
      : new MP4Demuxer(videoSegments, audioSegments, undefined, {
          memoryOpt: this._config.memoryOpt
        })
    this._demuxer = demuxer
    if (!this._softVideo) {
      this._remuxer = new FMP4Remuxer(demuxer.videoTrack, demuxer.audioTrack, {})
      this._worker?.configure(
        videoSegments,
        audioSegments,
        this._config.memoryOpt === true,
        isFragmentMP4
      )
    }
  }

  async appendBuffer(
    data: Uint8Array,
    dataStart: number,
    videoFrames: SegmentFrame[] | undefined,
    audioFrames: SegmentFrame[] | undefined,
    moov: unknown
  ) {
    if (this._destroyed || !data?.length) return
    const videoIndexRange = this.getIndexRange(videoFrames)
    const audioIndexRange = this.getIndexRange(audioFrames)
    if (!this._isFragmentMP4 && !videoIndexRange && !audioIndexRange) return

    if (this._softVideo) {
      const demuxer = this._demuxer
      if (!demuxer) return
      const { videoTrack, audioTrack } = this._demux(
        demuxer,
        data,
        dataStart,
        videoIndexRange,
        audioIndexRange,
        moov
      )
      this._softVideo.appendBuffer?.(videoTrack, audioTrack)
      return
    }

    if (!this._mse) return

    // Worker 路径：demux + remux 在 worker 线程完成，失败时回退主线程。
    if (this._worker) {
      try {
        return await this._appendByWorker(
          data,
          dataStart,
          videoIndexRange,
          audioIndexRange,
          moov
        )
      } catch (error) {
        if (error instanceof StreamingError) throw error
        // reset/destroy 会主动取消旧任务，不能把旧数据回落到新流的主线程状态中。
        if (error instanceof WorkerTaskCancelledError) return
        this._worker.destroy()
        this._worker = null
        this._needInitSegment = true
      }
    }

    return this._appendByMain(data, dataStart, videoIndexRange, audioIndexRange, moov)
  }

  private _appendByMain(
    data: Uint8Array,
    dataStart: number,
    videoIndexRange: SegmentIndexRange | undefined,
    audioIndexRange: SegmentIndexRange | undefined,
    moov: unknown
  ) {
    const mse = this._mse
    const demuxer = this._demuxer
    const remuxer = this._remuxer
    if (!mse || !demuxer || !remuxer || this._destroyed) return

    const { videoTrack, audioTrack } = this._demux(
      demuxer,
      data,
      dataStart,
      videoIndexRange,
      audioIndexRange,
      moov
    )
    this._ensureSource(
      videoTrack.exist() ? { type: videoTrack.type, codec: videoTrack.codec } : undefined,
      audioTrack.exist() ? { type: audioTrack.type, codec: audioTrack.codec } : undefined
    )

    let remuxResult
    try {
      remuxResult = remuxer.remux(this._needInitSegment)
    } catch (error) {
      throw StreamingError.create(
        ERR.REMUX,
        ERR.SUB_TYPES.FMP4,
        error,
        undefined,
        undefined
      )
    }
    this._needInitSegment = false

    const tasks: Promise<unknown>[] = []
    if (remuxResult.videoInitSegment) {
      tasks.push(
        mse.append(
          videoTrack.type,
          this.asBufferSource(remuxResult.videoInitSegment),
          undefined
        )
      )
    }
    if (remuxResult.audioInitSegment) {
      tasks.push(
        mse.append(
          audioTrack.type,
          this.asBufferSource(remuxResult.audioInitSegment),
          undefined
        )
      )
    }
    if (remuxResult.videoSegment) {
      tasks.push(
        mse.append(
          videoTrack.type,
          this.asBufferSource(remuxResult.videoSegment),
          undefined
        )
      )
    }
    if (remuxResult.audioSegment) {
      tasks.push(
        mse.append(
          audioTrack.type,
          this.asBufferSource(remuxResult.audioSegment),
          undefined
        )
      )
    }

    return this._appendAll(tasks)
  }

  private async _appendByWorker(
    data: Uint8Array,
    dataStart: number,
    videoIndexRange: SegmentIndexRange | undefined,
    audioIndexRange: SegmentIndexRange | undefined,
    moov: unknown
  ) {
    const mse = this._mse
    const worker = this._worker
    if (!mse || !worker || this._destroyed) return

    const result = await worker.transmux(
      data,
      dataStart,
      videoIndexRange,
      audioIndexRange,
      moov
    )
    if (this._destroyed) return

    this._ensureSource(
      result.video ? { type: result.video.type, codec: result.video.codec } : undefined,
      result.audio ? { type: result.audio.type, codec: result.audio.codec } : undefined
    )

    return this._appendWorkerResult(result)
  }

  private _appendWorkerResult(result: WorkerTransmuxResult) {
    const mse = this._mse
    if (!mse) return
    const tasks: Promise<unknown>[] = []
    if (result.video?.initSegment) {
      tasks.push(
        mse.append(
          result.video.type,
          this.asBufferSource(result.video.initSegment),
          undefined
        )
      )
    }
    if (result.audio?.initSegment) {
      tasks.push(
        mse.append(
          result.audio.type,
          this.asBufferSource(result.audio.initSegment),
          undefined
        )
      )
    }
    if (result.video?.segment) {
      tasks.push(
        mse.append(
          result.video.type,
          this.asBufferSource(result.video.segment),
          undefined
        )
      )
    }
    if (result.audio?.segment) {
      tasks.push(
        mse.append(
          result.audio.type,
          this.asBufferSource(result.audio.segment),
          undefined
        )
      )
    }
    return this._appendAll(tasks)
  }

  private _ensureSource(video?: SourceInfo, audio?: SourceInfo) {
    const mse = this._mse
    if (!mse) return
    ;[video, audio].forEach((source) => {
      if (!source || this._sourceTypes.has(source.type)) return
      mse.createSource(source.type, `${source.type}/mp4;codecs=${source.codec}`)
      this._sourceTypes.add(source.type)
    })
    this._sourceCreated = this._sourceTypes.size > 0
  }

  private _appendAll(tasks: Promise<unknown>[]) {
    return Promise.all(tasks).catch((error) => {
      throw StreamingError.create(
        ERR.MEDIA,
        ERR.SUB_TYPES.MSE_APPEND_BUFFER,
        error,
        undefined,
        undefined
      )
    })
  }

  async evictBuffer(bufferBehind: number) {
    const media = this.mp4.media
    if (!this._mse || !media || bufferBehind <= 0) return
    const removeEnd = media.currentTime - bufferBehind
    if (removeEnd <= 0) return
    const buffered = Buffer.get(media)
    if (!buffered) return
    const start = Buffer.start(buffered)
    if (start + 1 >= removeEnd) return

    const mse = this._mse
    const tasks: Promise<unknown>[] = []
    this._sourceTypes.forEach((type) => {
      tasks.push(mse.remove(type, 0, removeEnd, undefined))
    })

    return Promise.all(tasks).catch((error) => {
      throw StreamingError.create(
        ERR.MEDIA,
        ERR.SUB_TYPES.MSE_OTHER,
        error,
        undefined,
        undefined
      )
    })
  }

  async reset() {
    if (this._destroyed) return
    this._worker?.reset()
    this._demuxer = null
    this._remuxer = null
    this._sourceTypes.clear()
    this._sourceCreated = false
    this._needInitSegment = true
    this._isFragmentMP4 = false

    const mse = this._mse
    if (mse) {
      await mse.unbindMedia()
      if (!this._destroyed) await mse.bindMedia(this.mp4.media)
    }
  }

  async endOfStream() {
    if (this._mse && this._sourceCreated) {
      try {
        await this._mse.endOfStream()
      } catch (error) {
        throw StreamingError.create(
          ERR.MEDIA,
          ERR.SUB_TYPES.MSE_OTHER,
          error,
          undefined,
          undefined
        )
      }
    }
    this._softVideo?.endOfStream?.()
  }

  async destroy() {
    if (this._destroyed) return
    this._destroyed = true
    const mse = this._mse
    this._mse = null
    this._softVideo = null
    this._demuxer = null
    this._remuxer = null
    this._worker?.destroy()
    this._worker = null
    this._sourceTypes.clear()
    this._sourceCreated = false
    this._isFragmentMP4 = false

    if (mse) await mse.unbindMedia()
  }

  private _demux(
    demuxer: MP4Demuxer | FMP4Demuxer,
    data: Uint8Array,
    dataStart: number,
    videoIndexRange: SegmentIndexRange | undefined,
    audioIndexRange: SegmentIndexRange | undefined,
    moov: unknown
  ) {
    if (this._isFragmentMP4) {
      return (demuxer as FMP4Demuxer).demuxPart(data, dataStart, moov)
    }
    return (demuxer as MP4Demuxer).demux(
      data,
      dataStart,
      videoIndexRange,
      audioIndexRange,
      moov
    )
  }

  private getIndexRange(frames?: SegmentFrame[]): SegmentIndexRange | undefined {
    if (!frames?.length) return
    return [frames[0].index, frames[frames.length - 1].index]
  }

  private asBufferSource(data: Uint8Array): Uint8Array<ArrayBuffer> {
    // Transmuxer 产物均由 ArrayBuffer 创建；其旧声明仍保留 ArrayBufferLike。
    return data as Uint8Array<ArrayBuffer>
  }

  private _initWorker() {
    if (!this._config.enableWorker || typeof Worker === 'undefined') return
    try {
      this._worker = new TransmuxerWorkerControl()
    } catch {
      // Worker 创建失败时回退主线程转封装。
      this._worker = null
    }
  }
}
