import { TsDemuxer, FMP4Demuxer, FMP4Remuxer, WarningType } from 'xgplayer-transmuxer'
import { ERR, StreamingError, Logger, concatUint8Array } from 'xgplayer-streaming-shared'
import { Event } from '../../constants'

const logger = new Logger('Transmuxer')

export class Transmuxer {
  _initSegmentId = ''

  constructor (hls, isMP4, needRemux) {
    this.hls = hls
    this._demuxer = isMP4 ? new FMP4Demuxer() : new TsDemuxer()
    this._isMP4 = isMP4
    if (needRemux) this._remuxer = new FMP4Remuxer(this._demuxer.videoTrack, this._demuxer.audioTrack)
  }

  transmux (videoChunk, audioChunk, discontinuity, contiguous, startTime, needInit) {
    const demuxer = this._demuxer
    try {
      if (this._isMP4) {
        demuxer.demux(videoChunk, audioChunk)
      } else {
        demuxer.demuxAndFix(concatUint8Array(videoChunk, audioChunk), discontinuity, contiguous, startTime)
      }
    } catch (error) {
      throw new StreamingError(ERR.DEMUX, ERR.SUB_TYPES.HLS, error)
    }

    const { videoTrack, audioTrack, metadataTrack } = demuxer

    const newId = `${videoTrack.codec}/${videoTrack.width}/${videoTrack.height}/${audioTrack.codec}/${audioTrack.config}`
    if (newId !== this._initSegmentId) {
      this._initSegmentId = newId
      needInit = true
    }

    this._fireEvents(videoTrack, audioTrack, metadataTrack, discontinuity || needInit)

    this.hls.emit(Event.DEMUXED_TRACK, {videoTrack, audioTrack})

    if (this._remuxer) {
      try {
        const {
          videoInitSegment,
          videoSegment,
          audioInitSegment,
          audioSegment
        } = this._remuxer.remux(needInit)
        const v = concatUint8Array(videoInitSegment, videoSegment)
        const a = concatUint8Array(audioInitSegment, audioSegment)
        return [v ? { codec: videoTrack.codec, data: v } : undefined, a ? { codec: audioTrack.codec, data: a } : undefined]
      } catch (error) {
        throw new StreamingError(ERR.REMUX, ERR.SUB_TYPES.FMP4, error)
      }
    } else {
      return [videoTrack, audioTrack]
    }
  }

  _fireEvents (videoTrack, audioTrack, metadataTrack, discontinuity) {
    logger.debug(videoTrack.samples, audioTrack.samples)

    if (discontinuity) {
      if (videoTrack.exist()) {
        this.hls.emit(Event.METADATA_PARSED, {
          type: 'video',
          track: videoTrack,
          meta: {
            codec: videoTrack.codec,
            timescale: videoTrack.timescale,
            width: videoTrack.width,
            height: videoTrack.height,
            sarRatio: videoTrack.sarRatio,
            baseDts: videoTrack.baseDts
          }
        })
      }

      if (audioTrack.exist()) {
        this.hls.emit(Event.METADATA_PARSED, {
          type: 'audio',
          track: audioTrack,
          meta: {
            codec: audioTrack.codec,
            channelCount: audioTrack.channelCount,
            sampleRate: audioTrack.sampleRate,
            timescale: audioTrack.timescale,
            baseDts: audioTrack.baseDts
          }
        })
      }

      logger.debug('discontinuity', videoTrack, audioTrack)
    }

    videoTrack.warnings.forEach(warn => {
      let type
      switch (warn.type) {
        case WarningType.LARGE_AV_SHIFT:
          type = Event.LARGE_AV_FIRST_FRAME_GAP_DETECT
          break
        case WarningType.LARGE_VIDEO_GAP:
          type = Event.LARGE_VIDEO_DTS_GAP_DETECT
          break
        case WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK:
          type = Event.MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT
          break
        default:
      }

      if (type) this.hls.emit(Event.STREAM_EXCEPTION, { ...warn, type })
      logger.warn('video exception', warn)
    })

    audioTrack.warnings.forEach(warn => {
      let type
      switch (warn.type) {
        case WarningType.LARGE_AUDIO_GAP:
          type = Event.LARGE_AUDIO_DTS_GAP_DETECT
          break
        case WarningType.AUDIO_FILLED:
          type = Event.AUDIO_GAP_DETECT
          break
        case WarningType.AUDIO_DROPPED:
          type = Event.AUDIO_OVERLAP_DETECT
          break
        default:
      }

      if (type) this.hls.emit(Event.STREAM_EXCEPTION, { ...warn, type })
      logger.warn('audio exception', warn)
    })

    videoTrack.samples.forEach((sample) => {
      if (sample.keyframe) {
        this.hls.emit(Event.KEYFRAME, { pts: sample.pts })
      }
    })

    metadataTrack.seiSamples.forEach(sei => {
      this.hls.emit(Event.SEI, {
        ...sei,
        originPts: sei.originPts / 90, // sei 统一时间单位为毫秒
        sei: {
          code: sei.data.type,
          content: sei.data.payload,
          dts: sei.pts
        }
      })
    })
  }
}
