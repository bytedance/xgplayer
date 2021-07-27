import { EVENTS, logger } from 'xgplayer-helper-utils'
import AAC from '../aac'

const ua = navigator.userAgent
const isSafari = /Safari/.test(ua) && /Version/.test(ua) && !/Chrome/.test(ua)

const { REMUX_EVENTS, COMPATIBILITY_EVENTS } = EVENTS

const LARGE_AV_FIRST_FRAME_GAP = 500 // ms
const AUDIO_GAP_OVERLAP_THRESHOLD_COUNT = 3
const MAX_SILENT_FRAME_DURATION = 1000 // ms
const AUDIO_EXCETION_LOG_EMIT_DURATION = 5000 // 5s

class BaseCompatibility {
  constructor () {
    this.TAG = 'HlsCompatibility'
    this._baseDts = -1
    this._baseDtsInited = false

    this._audioNextDts = undefined
    this._videoNextDts = undefined

    this._audioTimestampBreak = false
    this._videoTimestampBreak = false

    this._lastAudioExceptionGapDot = 0
    this._lastAudioExceptionOverlapDot = 0
    this._lastAudioExceptionLargeGapDot = 0

    this._videoLargeGap = 0
    this._audioLargeGap = 0
  }

  static get EXCEPTION () {
    return {
      LARGE_AV_FIRST_FRAME_GAP_DETECT: 'LARGE_AV_FIRST_FRAME_GAP_DETECT',
      LARGE_VIDEO_DTS_GAP_DETECT: 'LARGE_VIDEO_DTS_GAP_DETECT',
      LARGE_AUDIO_DTS_GAP_DETECT: 'LARGE_AUDIO_DTS_GAP_DETECT',
      AUDIO_GAP_DETECT: 'AUDIO_GAP_DETECT',
      AUDIO_OVERLAP_DETECT: 'AUDIO_OVERLAP_DETECT',
      VIDEO_DISCONTINUE_DETECT: 'VIDEO_DISCONTINUE_DETECT',
      MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT: 'MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT'
    }
  }

  static get isSafari () {
    return isSafari
  }

  init () {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this._doFix.bind(this))
  }

  setBaseDts (timestamp) {
    this._baseDts = timestamp
    this._baseDtsInited = true
    logger.log(this.TAG, `set _baseDts=${timestamp}`)
  }

  getBaseDts () {
    return this._baseDts
  }

  doFix () {
    this._doFix()
  }

  _doFix () {
    throw new Error('need override by children')
  }

  _getSilentFrame () {
    return this._silentFrame || (this._silentFrame = AAC.getSilentFrame(this.audioTrack.meta.codec, this.audioTrack.meta.channelCount))
  }

  _calculateBaseDts (audioTrack, videoTrack) {
    // debugger
    let audioSamps = audioTrack.samples
    let videoSamps = videoTrack.samples

    if (!audioSamps.length && !videoSamps.length) {
      return false
    }

    let _audioBaseDts = Infinity
    let _videoBaseDts = Infinity

    if (audioSamps.length) {
      _audioBaseDts = audioSamps[0].dts
    }

    if (videoSamps.length) {
      _videoBaseDts = videoSamps[0].dts
    }

    this._baseDts = Math.min(_audioBaseDts, _videoBaseDts)

    let delta = _videoBaseDts - _audioBaseDts

    // 音视频首帧dts差距过大
    if (Number.isFinite(delta) && Math.abs(delta) > LARGE_AV_FIRST_FRAME_GAP) {
      this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
        msg: BaseCompatibility.EXCEPTION.LARGE_AV_FIRST_FRAME_GAP_DETECT,
        info: {
          videoBaseDts: _videoBaseDts,
          audioBaseDts: _audioBaseDts,
          delta
        }
      })
    }
    logger.log(this.TAG, `calc base dts: vBaseDts=${_videoBaseDts} aBaseDts=${_audioBaseDts} baseDts=${this._baseDts}, delta=${delta}`)

    this._baseDtsInited = true
    return true
  }

  _resetBaseDtsWhenStreamBreaked () {
    if (this._baseDtsInited && this._videoTimestampBreak && this._audioTimestampBreak) {
      /**
       * 中间发生了时间戳跳变
       *                     _audioNextDts
       *  ---------------------|
       * (_baseDts)          _videoNextDts
       * ----------------------|
       *                        <----------------
       *                                       nextVideo.dts
       * ----------------------------------------|
       *                                       nextAudio.dts
       * ---------------------------------------|
       */

      // 先根据跳变后的采样计算baseDts
      let calc = this._calculateBaseDts(this.audioTrack, this.videoTrack)

      if (!calc) return

      // 考虑上下一帧期望的dts, 为了将采样变成以nextDts开始
      this._baseDts -= Math.min(this._audioNextDts, this._videoNextDts)
      logger.warn(this.TAG, `stream breaked, 调整_baseDts: ${this._baseDts}`)
      this._audioLastSample = null
      this._videoLastSample = null
      this._videoTimestampBreak = false
      this._audioTimestampBreak = false
    }
  }

  _doFixVideo () {
    throw new Error('need override by children')
  }

  _doFixAudio () {
    throw new Error('need override by children')

    // do something

    // this._doFixAuidoInternal()
  }

  _doFixAuidoInternal (audioTrack, samples) {
    let refSampleDuration = audioTrack.meta.refSampleDuration
    let refSampleDurationInt = Math.floor(refSampleDuration)

    if (this._audioNextDts === undefined) {
      let samp0 = samples[0]
      this._audioNextDts = samp0.dts
    }

    for (let i = 0; i < samples.length; i++) {
      let nextDts = this._audioNextDts
      let sample = samples[i]
      let delta = sample.dts - nextDts

      // 需要补帧
      // >= 3帧时长 && <= 500s 范围内补帧
      if (delta >= AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDurationInt && delta <= MAX_SILENT_FRAME_DURATION && !BaseCompatibility.isSafari) {
        const silentFrame = this._getSilentFrame()
        const count = Math.floor(delta / refSampleDurationInt)

        if (Math.abs(sample.dts - this._lastAudioExceptionGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
          this._lastAudioExceptionGapDot = sample.dts
          this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
            msg: BaseCompatibility.EXCEPTION.AUDIO_GAP_DETECT,
            info: {
              dts: sample.dts,
              originDts: sample.originDts,
              nextDts: nextDts,
              count,
              refSampleDurationInt
            }
          })
        }

        logger.warn(this.TAG, `需要补${count}帧, for ${delta} ms gap`)

        for (let j = 0; j < count; j++) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            duration: refSampleDurationInt,
            dts: Math.floor(nextDts),
            filtered: 0
          }
          samples.splice(i, 0, silentSample)
          this._audioNextDts += refSampleDuration // 浮点型
          i++
        }

        i--
        // overlap 在 <= -3帧时长 && >= -500ms范围内丢帧
      } else if (delta <= -AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDurationInt && delta >= -1 * MAX_SILENT_FRAME_DURATION) {
        // 需要丢帧
        if (Math.abs(sample.dts - this._lastAudioExceptionOverlapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
          this._lastAudioExceptionOverlapDot = sample.dts
          this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
            msg: BaseCompatibility.EXCEPTION.AUDIO_OVERLAP_DETECT,
            info: {
              dts: sample.dts,
              originDts: sample.originDts,
              nextDts: nextDts,
              refSampleDurationInt
            }
          })
        }

        logger.warn(this.TAG, `需要丢帧: dts=${sample.dts}, nextDts=${nextDts}`)
        samples.splice(i, 1)
        i--
      } else {
        if (Math.abs(delta) > MAX_SILENT_FRAME_DURATION) {
          this._audioTimestampBreak = true

          if (Math.abs(sample.dts - this._lastAudioExceptionLargeGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
            this._lastAudioExceptionLargeGapDot = sample.dts
            // emit stream breaked
            this.emit(COMPATIBILITY_EVENTS.EXCEPTION, {
              msg: BaseCompatibility.EXCEPTION.LARGE_AUDIO_DTS_GAP_DETECT,
              info: {
                dts: sample.dts,
                originDts: sample.originDts,
                nextDts: nextDts,
                nextSampleDts: samples[i + 1] ? samples[i + 1].dts : 0,
                delta,
                refSampleDurationInt
              }
            })
            logger.log(this.TAG, `音频帧dts和期望值差距过大: dts=${sample.dts}, nextDts=${nextDts}`)
          }
        }

        // 音频duration非整数，以4410采样率为例，duration需要在21ms、22ms之间波动
        // 一直保持duration=21在safari下会有杂音
        let d = Math.floor(nextDts + refSampleDuration) - Math.floor(nextDts)
        sample.dts = Math.floor(nextDts)
        sample.pts = sample.dts
        sample.duration = d
        this._audioNextDts += refSampleDuration // 浮点型
      }
    }
  }

  _fixVideoRefSampleDuration (track) {
    if (!track.meta) return

    if (track.meta.refSampleDuration > 15) return

    let len = track.samples.length

    if (len <= 1) return

    let originDuration = track.meta.refSampleDuration

    let first = track.samples[0]

    let last = track.samples[len - 1]

    let duration = Math.floor((last.dts - first.dts) / (len - 1))

    track.meta.refSampleDuration = duration
    logger.log(this.TAG, `根据采样评估videoRefDuration: ${originDuration} -> ${duration}`)
  }

  get tracks () {
    return this._context.getInstance('TRACKS')
  }

  get audioTrack () {
    if (this.tracks && this.tracks.audioTrack) {
      return this.tracks.audioTrack
    }
    return {
      samples: [],
      meta: {}
    }
  }

  get videoTrack () {
    if (this.tracks && this.tracks.videoTrack) {
      return this.tracks.videoTrack
    }
    return {
      samples: [],
      meta: {}
    }
  }
}

export default BaseCompatibility
