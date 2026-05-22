import { MSE, StreamingError, ERR, MSEErrorType, Buffer } from 'xgplayer-streaming-shared'
import { MP4Demuxer, FMP4Remuxer } from 'xgplayer-transmuxer'

export class BufferService {
  _demuxer = new MP4Demuxer()
  _remuxer = null
  _mse = null
  _softVideo = null
  _needInitSegment = true
  _sourceCreated = false

  constructor (mp4, softDecode) {
    this.mp4 = mp4
    if (softDecode) {
      this._softVideo = mp4.media
    } else {
      this._remuxer = new FMP4Remuxer(this._demuxer.videoTrack, this._demuxer.audioTrack)
      this._mse = new MSE()
      this._mse.bindMedia(mp4.media)
    }
  }

  async appendBuffer (data, dataStart, videoFrames, audioFrames, moov) {
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
    const { videoTrack, audioTrack } = this._demuxer.demux(data, dataStart, videoIndexRange, audioIndexRange, moov)
    const videoType = videoTrack.type
    const audioType = audioTrack.type

    const mse = this._mse
    if (mse) {
      if (!this._sourceCreated) {
        if (videoTrack.exist()) {
          mse.createSource(videoType, `video/mp4;codecs=${videoTrack.codec}`)
          this._sourceCreated = true
        }
        if (audioTrack.exist()) {
          mse.createSource(audioType, `audio/mp4;codecs=${audioTrack.codec}`)
          this._sourceCreated = true
        }
      }

      let remuxResult
      try {
        remuxResult = this._remuxer.remux(this._needInitSegment)
      } catch (error) {
        throw new StreamingError(ERR.REMUX, ERR.SUB_TYPES.FMP4, error)
      }
      this._needInitSegment = false

      const p = []
      if (remuxResult.videoInitSegment) p.push(mse.append(videoType, remuxResult.videoInitSegment))
      if (remuxResult.audioInitSegment) p.push(mse.append(audioType, remuxResult.audioInitSegment))
      if (remuxResult.videoSegment) p.push(mse.append(videoType, remuxResult.videoSegment))
      if (remuxResult.audioSegment) p.push(mse.append(audioType, remuxResult.audioSegment))

      return Promise.all(p).catch(error => {
        if (error.type === MSEErrorType.CANCELLED) return
        throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_APPEND_BUFFER, error)
      })
    } else if (this._softVideo) {
      this._softVideo.appendBuffer(videoTrack, audioTrack)
    }
  }

  async evictBuffer (bufferBehind) {
    const media = this.mp4.media
    if (!this._mse || !this._demuxer || !media || !bufferBehind || bufferBehind < 0) return
    const currentTime = media.currentTime
    const removeEnd = currentTime - bufferBehind
    if (removeEnd <= 0) return
    const start = Buffer.start(Buffer.get(media))
    if (start + 1 >= removeEnd) return
    const demuxer = this._demuxer

    const p = [];
    [demuxer.videoTrack, demuxer.audioTrack].forEach((track) => {
      if (track.exist()) {
        p.push(this._mse.remove(track.type, 0, removeEnd))
      }
    })

    return Promise.all(p)
      .catch((error) => {
        if (error.type === MSEErrorType.CANCELLED) return
        throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error)
      })
  }

  async reset () {
    if (this._mse) {
      await this._mse.unbindMedia()
      await this._mse.bindMedia(this.mp4.media)
      this._mseOpened = false
    }
    this._sourceCreated = false
    this._needInitSegment = true
  }

  async endOfStream () {
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

  async destroy () {
    const mse = this._mse
    this._mse = null
    this._softVideo = null
    this._demuxer = null
    this._remuxer = null

    if (mse) {
      await mse.unbindMedia()
    }
  }
}
