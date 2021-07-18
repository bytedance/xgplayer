import { EVENTS, logger } from 'xgplayer-helper-utils'
import Base from './base'

const MAX_VIDEO_FRAME_DURATION = 1000 // ms

const { COMPATIBILITY_EVENTS } = EVENTS

class FlvCompatibility extends Base {
  constructor () {
    super()
    this.TAG = 'FlvCompatibility'
  }

  doFix () {
    this.fixVideoRefSampleDuration(this.videoTrack)

    if (!this._baseDtsInited) {
      this._calculateBaseDts(this.audioTrack, this.videoTrack)
    }

    if (!this._baseDtsInited) return

    this._resetBaseDtsWhenStreamBreaked()

    this._doFixVideo(this.videoTrack)

    this._doFixAudio(this.audioTrack)
  }

  _doFixVideo (videoTrack) {
    let samples = videoTrack.samples

    if (!samples.length) return

    // 先以baseDts为基准 偏移dts、pts
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
      this._videoNextDts = this._videoBaseDts - this._baseDts
    }

    let len = samples.length
    let sampleDuration = 0
    let refSampleDurationInt = Math.floor(this.videoTrack.meta.refSampleDuration)
    for (let i = 0; i < len; i++) {
      let dts = samples[i].dts
      if (i < len - 1) {
        sampleDuration = samples[i + 1].dts - dts
      } else if (lastSample) {
        sampleDuration = lastSample.dts - dts
      } else {
        sampleDuration = refSampleDurationInt
      }

      if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
        // dts异常
        logger.log(this.TAG, `视频duration异常: dts=${dts}, duration=${sampleDuration}`)
        this._videoTimestampBreak = true
        sampleDuration = refSampleDurationInt

        // emit stream breaked
        this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
          msg: FlvCompatibility.EXCEPTION.LARGE_VIDEO_DTS_GAP_DETECT,
          info: {
            dts,
            originDts: samples[i].originDts,
            sampleDuration,
            refSampleDurationInt
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
