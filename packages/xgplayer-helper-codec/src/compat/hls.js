import { EVENTS, logger } from 'xgplayer-helper-utils'
import Base from './base'

const MAX_VIDEO_FRAME_DURATION = 1000 // ms
const MAX_DTS_DELTA_WITH_NEXT_CHUNK = 500 // ms

const { COMPATIBILITY_EVENTS } = EVENTS

class HlsCompatibility extends Base {
  constructor () {
    super()
    this.TAG = 'HlsCompatibility'
    this._lastSegment = null
  }

  // id是否连续
  _isIdContinue (segment) {
    if (!this._lastSegment) return true

    if (segment.id - this._lastSegment.id === 1) return true

    return false
  }

  // 是否换流了,存在discontinue标记
  _isSegmentContinue (segment) {
    if (!this._lastSegment) return true
    if (segment.cc === this._lastSegment.cc) return true
    return false
  }

  _doFix () {
    let vSamples = this.tracks.videoTrack.samples
    let aSamples = this.tracks.audioTrack.samples

    if (!vSamples.length && !aSamples.length) return

    this._fixVideoRefSampleDuration(this.videoTrack)

    let firstVideoSample = vSamples[0]
    let firstAudioSample = aSamples[0]
    let segment = firstVideoSample ? firstVideoSample.options : firstAudioSample.options
    // 考虑这个分片的音视频dts差值
    let vaDelta = 0

    if (vSamples.length && aSamples.length) {
      vaDelta = firstVideoSample.dts - firstAudioSample.dts
    }

    if (!this._baseDtsInited) {
      this._calculateBaseDts(this.tracks.audioTrack, this.tracks.videoTrack)
    }

    // DISCONTINUE表示变流了，需要重新计算baseDts
    if (!this._isSegmentContinue(segment)) {
      let originBaseDts = this._baseDts
      this._calculateBaseDts(this.tracks.audioTrack, this.tracks.videoTrack)
      this._baseDts -= segment.start
      logger.log(this.TAG, `discontinue: _baseDts =${this._baseDts}`)

      this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
        msg: HlsCompatibility.EXCEPTION.VIDEO_DISCONTINUE_DETECT,
        info: {
          segmentStart: segment.start,
          originBaseDts,
          baseDts: this._baseDts
        }
      })
    }

    // id不连续，重新计算nextDts, 考虑上首帧av之间的gap，点播seek场景或者直播中间漏了分片
    if (!this._isIdContinue(segment)) {
      /**
       * start是和 a、v中的小者对齐的
       *  segment.start
       *      |
       *      a
       *       -- vaDelta --
       *                   v
       */
      this._videoNextDts = vaDelta > 0 ? segment.start + vaDelta : segment.start
      this._audioNextDts = vaDelta > 0 ? segment.start : segment.start - vaDelta
      logger.log(this.TAG, `id不连续: _videoNextDts=${this._videoNextDts}, _audioNextDts=${this._audioNextDts}, delta=${vaDelta}`)

      let vDeltaToNextDts = firstVideoSample ? firstVideoSample.dts - this._baseDts - this._videoNextDts : 0
      let aDeltaToNextDts = firstAudioSample ? firstAudioSample.dts - this._baseDts - this._audioNextDts : 0

      // 直播中间丢分片了
      if (Math.abs(vDeltaToNextDts || aDeltaToNextDts) > MAX_VIDEO_FRAME_DURATION) {
        // 调整baseDts
        this._calculateBaseDts(this.tracks.audioTrack, this.tracks.videoTrack)
        this._baseDts -= segment.start
        logger.log(this.TAG, `直播中间丢分片了: _videoNextDts:${this._videoNextDts}, _audioNextDts:${this._audioNextDts}, _baseDts =${this._baseDts}, vDeltaToNextDts:${vDeltaToNextDts} aDeltaToNextDts:${aDeltaToNextDts}`)
      }
    }

    this._resetBaseDtsWhenStreamBreaked()

    this._doFixVideo(this.videoTrack)

    this._doFixAudio(this.audioTrack)

    this._lastSegment = segment
  }

  _doFixVideo (videoTrack) {
    let samples = videoTrack.samples

    if (!samples.length) return

    // 先以baseDts为基准 偏移dts、pts
    samples.forEach(x => {
      x.originDts = x.dts
      x.originPts = x.pts
      x.dts -= this._baseDts
      x.pts -= this._baseDts
      x.cts = x.pts - x.dts
    })

    if (this._videoNextDts === undefined) {
      let samp0 = samples[0]
      this._videoNextDts = samp0.dts
    }

    let len = samples.length
    let sampleDuration = 0
    let firstSample = samples[0]
    let nextSample = samples[1]
    let vDelta = this._videoNextDts - firstSample.dts

    if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
      // emit large delta of first sample with expect
      this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
        msg: HlsCompatibility.EXCEPTION.MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT,
        info: {
          videoNextDts: this._videoNextDts,
          firstSampleDts: firstSample.dts,
          nextSampleDts: nextSample ? nextSample.dts : 0,
          vDelta
        }
      })
      logger.log(this.TAG, `首帧dts和期望值差距过大, firstSampleDts=${firstSample.dts} nextSampleDts=${nextSample ? nextSample.dts : 0},  _videoNextDts=${this._videoNextDts}, delta=${vDelta}`)

      // 只处理首帧
      firstSample.dts += vDelta
      firstSample.pts += vDelta

      // 是否需要整个分片调整时间戳
      if (nextSample && Math.abs(nextSample.dts - firstSample.dts) > MAX_VIDEO_FRAME_DURATION) {
        this._videoTimestampBreak = true
        samples.forEach((x, i) => {
          if (i === 0) return
          x.dts += vDelta
          x.pts += vDelta
        })
      }
    }

    let refSampleDurationInt = Math.floor(this.videoTrack.meta.refSampleDuration)

    for (let i = 0; i < len; i++) {
      let dts = samples[i].dts
      let nextSample = samples[i + 1]
      if (i < len - 1) {
        sampleDuration = nextSample.dts - dts
      } else if (samples[i - 1]) {
        sampleDuration = dts - samples[i - 1].dts
      } else {
        sampleDuration = refSampleDurationInt
      }

      if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
        // dts异常
        logger.log(this.TAG, `视频duration异常:currentTime=${dts / 1000}, dts=${dts}, nextSampleDts=${nextSample ? nextSample.dts : 0} duration=${sampleDuration}`)
        this._videoTimestampBreak = true
        sampleDuration = refSampleDurationInt

        // emit stream breaked
        this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
          msg: HlsCompatibility.EXCEPTION.LARGE_VIDEO_DTS_GAP_DETECT,
          info: {
            dts,
            originDts: samples[i].originDts,
            nextSampleDts: nextSample ? nextSample.dts : 0,
            sampleDuration,
            refSampleDurationInt,
            currentTime: dts / 1000
          }
        })
      }

      samples[i].duration = sampleDuration
      this._videoNextDts += sampleDuration
    }
  }

  _doFixAudio (audioTrack) {
    let samples = audioTrack.samples

    if (!samples.length) return

    // 先以baseDts为基准 偏移dts、pts
    samples.forEach(x => {
      x.originDts = x.dts
      x.originPts = x.pts
      x.dts -= this._baseDts
      x.pts -= this._baseDts
      x.cts = 0
    })

    this._doFixAuidoInternal(audioTrack, samples)
  }
}

export default HlsCompatibility
