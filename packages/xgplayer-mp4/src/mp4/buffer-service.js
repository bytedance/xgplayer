import { Buffer, ERR, MSE, MSEErrorType, StreamingError } from 'xgplayer-streaming-shared'
import { FMP4Remuxer, MP4Demuxer } from 'xgplayer-transmuxer'
import TransmuxerWorkerControl from '../worker'

export class BufferService {
  _demuxer = new MP4Demuxer()
  _remuxer = null
  _mse = null
  _softVideo = null
  _needInitSegment = true
  _sourceCreated = false
  _worker = null

  constructor(mp4, config = {}) {
    this.mp4 = mp4
    this._config = config
    const softDecode = config.softDecode
    if (softDecode) {
      this._softVideo = mp4.media
    } else {
      this._remuxer = new FMP4Remuxer(this._demuxer.videoTrack, this._demuxer.audioTrack)
      this._mse = new MSE(null, {
        preferMMS: config.preferMMS,
        attachMode: config.mseAttachMode
      })
      this._mse.bindMedia(mp4.media)
      this._initWorker()
    }
  }

  get isMMS() {
    return this._mse ? !!this._mse.isMMS?.() : false
  }

  async appendBuffer(data, dataStart, videoFrames, audioFrames, moov) {
    if (!data || !data.length) return
    let videoIndexRange
    let audioIndexRange
    if (videoFrames) {
      videoIndexRange = [videoFrames[0].index, videoFrames[videoFrames.length - 1].index]
    }
    if (audioFrames) {
      audioIndexRange = [audioFrames[0].index, audioFrames[audioFrames.length - 1].index]
    }
    if (!videoIndexRange && !audioIndexRange) return

    if (this._softVideo) {
      const { videoTrack, audioTrack } = this._demuxer.demux(
        data,
        dataStart,
        videoIndexRange,
        audioIndexRange,
        moov
      )
      this._softVideo.appendBuffer(videoTrack, audioTrack)
      return
    }

    if (!this._mse) return

    // Worker 路径：demux + remux 在 worker 线程完成，失败时回退主线程
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
        // worker 异常，销毁 worker 回退主线程重试本段
        this._worker.destroy()
        this._worker = null
        this._needInitSegment = true
      }
    }

    return this._appendByMain(data, dataStart, videoIndexRange, audioIndexRange, moov)
  }

  async _appendByMain(data, dataStart, videoIndexRange, audioIndexRange, moov) {
    const mse = this._mse
    const { videoTrack, audioTrack } = this._demuxer.demux(
      data,
      dataStart,
      videoIndexRange,
      audioIndexRange,
      moov
    )
    const videoType = videoTrack.type
    const audioType = audioTrack.type

    this._ensureSource(
      videoTrack.exist() && { type: videoType, codec: videoTrack.codec },
      audioTrack.exist() && { type: audioType, codec: audioTrack.codec }
    )

    let remuxResult
    try {
      remuxResult = this._remuxer.remux(this._needInitSegment)
    } catch (error) {
      throw new StreamingError(ERR.REMUX, ERR.SUB_TYPES.FMP4, error)
    }
    this._needInitSegment = false

    const p = []
    if (remuxResult.videoInitSegment)
      p.push(mse.append(videoType, remuxResult.videoInitSegment))
    if (remuxResult.audioInitSegment)
      p.push(mse.append(audioType, remuxResult.audioInitSegment))
    if (remuxResult.videoSegment) p.push(mse.append(videoType, remuxResult.videoSegment))
    if (remuxResult.audioSegment) p.push(mse.append(audioType, remuxResult.audioSegment))

    return this._appendAll(p)
  }

  async _appendByWorker(data, dataStart, videoIndexRange, audioIndexRange, moov) {
    const mse = this._mse
    const res = await this._worker.transmux(
      data,
      dataStart,
      videoIndexRange,
      audioIndexRange,
      moov
    )
    if (!res) return

    this._ensureSource(
      res.video && { type: res.video.type, codec: res.video.codec },
      res.audio && { type: res.audio.type, codec: res.audio.codec }
    )

    const p = []
    if (res.video?.initSegment)
      p.push(mse.append(res.video.type, new Uint8Array(res.video.initSegment)))
    if (res.audio?.initSegment)
      p.push(mse.append(res.audio.type, new Uint8Array(res.audio.initSegment)))
    if (res.video?.segment)
      p.push(mse.append(res.video.type, new Uint8Array(res.video.segment)))
    if (res.audio?.segment)
      p.push(mse.append(res.audio.type, new Uint8Array(res.audio.segment)))

    return this._appendAll(p)
  }

  _ensureSource(video, audio) {
    if (this._sourceCreated) return
    const mse = this._mse
    if (video) {
      mse.createSource(video.type, `video/mp4;codecs=${video.codec}`)
      this._sourceCreated = true
    }
    if (audio) {
      mse.createSource(audio.type, `audio/mp4;codecs=${audio.codec}`)
      this._sourceCreated = true
    }
  }

  _appendAll(p) {
    return Promise.all(p).catch((error) => {
      if (error.type === MSEErrorType.CANCELLED) return
      throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_APPEND_BUFFER, error)
    })
  }

  async evictBuffer(bufferBehind) {
    const media = this.mp4.media
    if (!this._mse || !this._demuxer || !media || !bufferBehind || bufferBehind < 0)
      return
    const currentTime = media.currentTime
    const removeEnd = currentTime - bufferBehind
    if (removeEnd <= 0) return
    const start = Buffer.start(Buffer.get(media))
    if (start + 1 >= removeEnd) return
    const demuxer = this._demuxer

    const p = []
    ;[demuxer.videoTrack, demuxer.audioTrack].forEach((track) => {
      if (track.exist()) {
        p.push(this._mse.remove(track.type, 0, removeEnd))
      }
    })

    return Promise.all(p).catch((error) => {
      if (error.type === MSEErrorType.CANCELLED) return
      throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error)
    })
  }

  async reset() {
    if (this._mse) {
      await this._mse.unbindMedia()
      await this._mse.bindMedia(this.mp4.media)
      this._mseOpened = false
    }
    this._worker?.reset()
    this._sourceCreated = false
    this._needInitSegment = true
  }

  async endOfStream() {
    if (this._mse) {
      if (this._sourceCreated) {
        try {
          await this._mse.endOfStream()
        } catch (error) {
          if (error.type === MSEErrorType.CANCELLED) return
          throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error)
        }
      }
    }
    if (this._softVideo) {
      this._softVideo.endOfStream()
    }
  }

  async destroy() {
    const mse = this._mse
    this._mse = null
    this._softVideo = null
    this._demuxer = null
    this._remuxer = null
    this._worker?.destroy()
    this._worker = null

    if (mse) {
      await mse.unbindMedia()
    }
  }

  _initWorker() {
    const config = this._config
    if (!config.enableWorker || typeof Worker === 'undefined') return
    try {
      this._worker = new TransmuxerWorkerControl()
    } catch {
      // Worker 创建失败时回退主线程转封装
      this._worker = null
    }
  }
}
