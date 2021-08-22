import { EVENTS, logger } from 'xgplayer-helper-utils'
import Base from './base'

const MAX_VIDEO_FRAME_DURATION = 1000 // ms
const MAX_DTS_DELTA_WITH_NEXT_CHUNK = 200 // ms
const VIDEO_EXCETION_LOG_EMIT_DURATION = 5000 // 5s

const { COMPATIBILITY_EVENTS } = EVENTS

class FlvCompatibility extends Base {
  constructor () {
    super()
    this.TAG = 'FlvCompatibility'
    this._lastVideoExceptionLargeGapDot = 0
    this._lastVideoExceptionChunkFirstDtsDot = 0
  }

  _doFix () {
    this._fixVideoRefSampleDuration(this.videoTrack)

    if (!this._baseDtsInited) {
      this._calculateBaseDts(this.audioTrack, this.videoTrack)
    }

    if (!this._baseDtsInited) return

    this._resetBaseDtsWhenStreamBreaked()

    this._doFixAudio(this.audioTrack)

    this._doFixVideo(this.videoTrack)
  }

  _doFixVideo (videoTrack) {
    let samples = videoTrack.samples

    if (!samples.length) return

    // offset dts、pts of frame first by baseDts
    samples.forEach(x => {
      x.originDts = x.dts
      x.pts = x.originPts = x.dts + x.cts
      x.dts -= this._baseDts
      x.pts -= this._baseDts
      // eslint-disable-next-line no-self-assign
      x.cts = x.cts
    })

    let lastSample = samples.pop()

    if (this._videoLastSample) {
      samples.unshift(this._videoLastSample)
    }

    this._videoLastSample = lastSample

    if (!samples.length) return

    if (this._videoNextDts === undefined) {
      let samp0 = samples[0]
      this._videoNextDts = samp0.dts
    }

    let len = samples.length
    let sampleDuration = 0
    let firstSample = samples[0]
    let nextSample = samples[1]
    let refSampleDurationInt = Math.floor(this.videoTrack.meta.refSampleDuration)
    let vDelta = this._videoNextDts - firstSample.dts

    if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
      // emit large delta of first sample with expect
      if (Math.abs(firstSample.dts - this._lastVideoExceptionChunkFirstDtsDot) > VIDEO_EXCETION_LOG_EMIT_DURATION) {
        this._lastVideoExceptionChunkFirstDtsDot = firstSample.dts
        this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
          type: FlvCompatibility.EXCEPTION.MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT,
          info: {
            videoNextDts: this._videoNextDts,
            firstSampleDts: firstSample.dts,
            nextSampleDts: nextSample ? nextSample.dts : 0,
            vDelta
          }
        })
      }

      logger.log(this.TAG, `video: large delta of firstframe.dts with excepted, firstSampleDts=${firstSample.dts} nextSampleDts=${nextSample ? nextSample.dts : 0},  _videoNextDts=${this._videoNextDts}, delta=${vDelta}`)

      // resolve first frame only
      firstSample.dts += vDelta
      firstSample.pts += vDelta
    }

    for (let i = 0; i < len; i++) {
      let dts = samples[i].dts
      let nextSample = samples[i + 1]

      if (i < len - 1) {
        sampleDuration = nextSample.dts - dts
      } else if (lastSample) {
        sampleDuration = lastSample.dts - dts
      } else {
        sampleDuration = refSampleDurationInt
      }

      if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
        // emit stream breaked
        if (Math.abs(dts - this._lastVideoExceptionLargeGapDot) > VIDEO_EXCETION_LOG_EMIT_DURATION) {
          this._lastVideoExceptionLargeGapDot = dts
          this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
            type: FlvCompatibility.EXCEPTION.LARGE_VIDEO_DTS_GAP_DETECT,
            info: {
              dts,
              originDts: samples[i].originDts,
              nextDts: this._videoNextDts,
              nextSampleDts: nextSample ? nextSample.dts : 0,
              sampleDuration,
              refSampleDurationInt,
              currentTime: dts / 1000
            }
          })
        }

        logger.log(this.TAG, `video: duration exception: currentTime=${dts / 1000}s,  dts=${dts}, nextSampleDts=${nextSample ? nextSample.dts : 0} duration=${sampleDuration}, _audioTimestampBreak=${this._audioTimestampBreak}`)

        this._videoTimestampBreak = true

        // check if only video breaked
        sampleDuration = this._audioTimestampBreak ? refSampleDurationInt : sampleDuration
      }

      samples[i].duration = sampleDuration
      this._videoNextDts += sampleDuration
    }
  }

  _doFixAudio (audioTrack) {
    let samples = audioTrack.samples

    if (!samples.length) return

    // offset origin timestamp
    samples.forEach(x => {
      x.originDts = x.dts
      x.originPts = x.dts + x.cts
      x.dts -= this._baseDts
      x.pts = x.dts
      x.cts = 0
    })

    let lastSample = samples.pop()

    if (this._audioLastSample) {
      samples.unshift(this._audioLastSample)
    }

    this._audioLastSample = lastSample

    if (!samples.length) return

    this._doFixAuidoInternal(audioTrack, samples)
  }
}
export default FlvCompatibility
