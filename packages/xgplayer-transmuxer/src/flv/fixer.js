import { AudioCodecType, AudioSample, WarningType } from '../model'
import { AAC } from '../codec'
import { isSafari } from '../utils'

const LARGE_AV_FIRST_FRAME_GAP = 500 // ms
const AUDIO_GAP_OVERLAP_THRESHOLD_COUNT = 3
const MAX_SILENT_FRAME_DURATION = 1000 // ms
const AUDIO_EXCETION_LOG_EMIT_DURATION = 5000 // 5s
const MAX_VIDEO_FRAME_DURATION = 1000 // ms
const MAX_DTS_DELTA_WITH_NEXT_CHUNK = 200 // ms
const VIDEO_EXCETION_LOG_EMIT_DURATION = 5000 // 5s
const TRACK_BREACKED_CHECK_TIME = 5

export class FlvFixer {
  constructor (videoTrack, audioTrack, metadataTrack) {
    this.videoTrack = videoTrack
    this.audioTrack = audioTrack
    this.metadataTrack = metadataTrack

    this._baseDts = -1
    this._baseDtsInited = false

    this._audioNextPts = undefined
    this._videoNextDts = undefined

    this._audioTimestampBreak = 0
    this._videoTimestampBreak = 0
    this._lastVideoDuration = 0

    this._lastAudioExceptionGapDot = -Infinity
    this._lastAudioExceptionOverlapDot = -Infinity
    this._lastAudioExceptionLargeGapDot = -Infinity

    this._lastVideoExceptionLargeGapDot = -Infinity
    this._lastVideoExceptionChunkFirstDtsDot = -Infinity
  }

  /**
   * @param {number} startTime 点播seek到的时间点
   * @param {boolean} discontinuity 是否换流
   * @param {boolean} contiguous 前后chunk时间戳是否连续
   */
  fix (startTime = 0, discontinuity = false, contiguous = true) {
    startTime = Math.round(startTime * 1000)
    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack

    if (discontinuity || !contiguous) {
      this._videoLastSample = null
      this._audioNextPts = undefined
      this._videoNextDts = undefined
      this._audioTimestampBreak = 0
      this._videoTimestampBreak = 0
      this._lastAudioExceptionGapDot = -Infinity
      this._lastAudioExceptionOverlapDot = -Infinity
      this._lastAudioExceptionLargeGapDot = -Infinity
      this._lastVideoExceptionLargeGapDot = -Infinity
      this._lastVideoExceptionChunkFirstDtsDot = -Infinity
    }

    if (discontinuity && !contiguous) {
      this._baseDtsInited = false
    }

    if (!this._baseDtsInited) {
      this._calculateBaseDts(audioTrack, videoTrack)
    }

    if (!contiguous && startTime) {
      this._audioNextPts = this._videoNextDts = startTime
    }

    const resetBaseDts = this._baseDtsInited &&
      (this._videoTimestampBreak || !this.videoTrack.exist()) &&
      (this._audioTimestampBreak || !this.audioTrack.exist())

    if (resetBaseDts) {
      this._resetBaseDtsWhenStreamBreaked()
    }

    this._fixAudio(audioTrack)

    this._fixVideo(videoTrack)

    if (this.metadataTrack.exist()) {
      const timescale = this.metadataTrack.timescale
      this.metadataTrack.seiSamples.forEach(s => {
        s.pts = s.originPts - this._baseDts
        s.time = Math.max(0, s.pts) / timescale
      })
      this.metadataTrack.flvScriptSamples.forEach(s => {
        s.pts = s.originPts - this._baseDts
        s.time = Math.max(0, s.pts) / timescale
      })
    }

    if (videoTrack.samples.length) {
      videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts
    }
    if (audioTrack.samples.length) {
      audioTrack.baseMediaDecodeTime = audioTrack.samples[0].pts * audioTrack.timescale / 1000
    }
  }

  _fixVideo (videoTrack) {
    const samples = videoTrack.samples

    if (!samples.length) return

    samples.forEach(x => {
      x.dts -= this._baseDts
      x.pts -= this._baseDts
    })

    let refSampleDurationInt
    if (videoTrack.fpsNum && videoTrack.fpsDen) {
      refSampleDurationInt = videoTrack.timescale * (videoTrack.fpsDen / videoTrack.fpsNum)
    } else if (videoTrack.length > 1) {
      const first = videoTrack.samples[0]
      const last = videoTrack.samples[samples.length - 1]
      refSampleDurationInt = Math.floor((last.dts - first.dts) / (samples.length - 1))
    } else {
      refSampleDurationInt = this._lastVideoDuration || 40
    }

    const lastSample = samples.pop()

    if (this._videoLastSample) {
      samples.unshift(this._videoLastSample)
    }

    this._videoLastSample = lastSample

    if (!samples.length) return

    if (this._videoNextDts === undefined) {
      const samp0 = samples[0]
      this._videoNextDts = samp0.dts
    }

    const len = samples.length
    let sampleDuration = 0
    const firstSample = samples[0]
    const vDelta = this._videoNextDts - firstSample.dts

    if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
      // emit large delta of first sample with expect
      if (Math.abs(firstSample.dts - this._lastVideoExceptionChunkFirstDtsDot) > VIDEO_EXCETION_LOG_EMIT_DURATION) {
        this._lastVideoExceptionChunkFirstDtsDot = firstSample.dts

        videoTrack.warnings.push({
          type: WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK,
          nextDts: this._videoNextDts,
          firstSampleDts: firstSample.dts,
          nextSampleDts: samples[1]?.dts,
          sampleDuration: vDelta
        })
      }

      // only video breaked
      if (this._videoTimestampBreak >= TRACK_BREACKED_CHECK_TIME) {
        this._videoNextDts = firstSample.dts
        this._videoTimestampBreak = 0
      } else {
        // resolve first frame only
        firstSample.dts += vDelta
        firstSample.pts += vDelta
        if (!this.audioTrack.exist()) {
          this._videoTimestampBreak = 1
        }
      }
    }

    for (let i = 0; i < len; i++) {
      const dts = samples[i].dts
      const nextSample = samples[i + 1]

      if (i < len - 1) {
        sampleDuration = nextSample.dts - dts
      } else if (lastSample) {
        sampleDuration = lastSample.dts - dts
      } else {
        sampleDuration = refSampleDurationInt
      }

      if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
        this._videoTimestampBreak++
        // emit stream breaked
        if (Math.abs(dts - this._lastVideoExceptionLargeGapDot) > VIDEO_EXCETION_LOG_EMIT_DURATION) {
          this._lastVideoExceptionLargeGapDot = dts
          videoTrack.warnings.push({
            type: WarningType.LARGE_VIDEO_GAP,
            time: dts / videoTrack.timescale,
            dts,
            originDts: samples[i].originDts,
            nextDts: this._videoNextDts,
            sampleDuration,
            refSampleDuration: refSampleDurationInt
          })
        }

        sampleDuration = refSampleDurationInt
      }

      samples[i].duration = sampleDuration
      this._videoNextDts += sampleDuration
      this._lastVideoDuration = sampleDuration
    }
  }

  _fixAudio (audioTrack) {
    const samples = audioTrack.samples
    if (!samples.length) return

    // offset origin timestamp
    samples.forEach(x => {
      x.dts = x.pts -= this._baseDts
    })

    this._doFixAudioInternal(audioTrack, samples, 1000)
  }

  _calculateBaseDts (audioTrack, videoTrack) {
    const audioSamps = audioTrack.samples
    const videoSamps = videoTrack.samples

    if (!audioSamps.length && !videoSamps.length) {
      return false
    }

    let audioBasePts = Infinity
    let videoBaseDts = Infinity

    if (audioSamps.length) {
      audioTrack.baseDts = audioBasePts = audioSamps[0].pts
    }

    if (videoSamps.length) {
      videoTrack.baseDts = videoBaseDts = videoSamps[0].dts
    }

    this._baseDts = Math.min(audioBasePts, videoBaseDts)

    const delta = videoBaseDts - audioBasePts

    if (Number.isFinite(delta) && Math.abs(delta) > LARGE_AV_FIRST_FRAME_GAP) {
      videoTrack.warnings.push({
        type: WarningType.LARGE_AV_SHIFT,
        videoBaseDts,
        audioBasePts,
        baseDts: this._baseDts,
        delta
      })
    }

    this._baseDtsInited = true
    return true
  }

  _resetBaseDtsWhenStreamBreaked () {
    /**
       * timestamp breaked
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

    // calc baseDts base on new samples
    const calc = this._calculateBaseDts(this.audioTrack, this.videoTrack)

    if (!calc) return

    // consider the expect dts for next frame
    if (!this.audioTrack.exist()){
      this._baseDts -= this._videoNextDts
    } else if (!this.videoTrack.exist()){
      this._baseDts -= this._audioNextPts
    } else {
      this._baseDts -= Math.min(this._audioNextPts, this._videoNextDts)
    }
    this._videoTimestampBreak = 0
    this._audioTimestampBreak = 0
  }

  _doFixAudioInternal (audioTrack, samples, timescale) {
    if (!audioTrack.sampleDuration) {
      audioTrack.sampleDuration = audioTrack.codecType === AudioCodecType.AAC
        ? AAC.getFrameDuration(audioTrack.timescale, timescale)
        : this._getG711Duration(audioTrack)
    }
    const refSampleDuration = audioTrack.sampleDuration

    const sampleDurationInSampleRate = audioTrack.codecType === AudioCodecType.AAC ? 1024 : refSampleDuration * audioTrack.timescale / 1000

    if (this._audioNextPts === undefined) {
      const samp0 = samples[0]
      this._audioNextPts = samp0.pts
    }

    for (let i = 0; i < samples.length; i++) {
      let nextPts = this._audioNextPts
      const sample = samples[i]
      let delta = sample.pts - nextPts

      // only audio breaked
      if (i === 0 && this._audioTimestampBreak >= TRACK_BREACKED_CHECK_TIME) {
        nextPts = this._audioNextPts = sample.dts
        delta = 0
        this._audioTimestampBreak = 0
      }

      // fill frames
      // delta >= 3 * refSampleDurationInt
      // delta <= 500s
      if (!this._audioTimestampBreak && delta >= AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration && delta <= MAX_SILENT_FRAME_DURATION && !isSafari) {
        const silentFrame = this._getSilentFrame(audioTrack) || samples[0].data.subarray()
        const count = Math.floor(delta / refSampleDuration)

        if (Math.abs(sample.pts - this._lastAudioExceptionGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
          this._lastAudioExceptionGapDot = sample.pts
          audioTrack.warnings.push({
            type: WarningType.AUDIO_FILLED,
            pts: sample.pts,
            originPts: sample.originPts,
            count,
            nextPts,
            refSampleDuration
          })
        }

        for (let j = 0; j < count; j++) {
          const silentSample = new AudioSample(Math.floor(this._audioNextPts + refSampleDuration) - Math.floor(this._audioNextPts), silentFrame, sampleDurationInSampleRate)
          silentSample.originPts = Math.floor(this._baseDts + nextPts)
          samples.splice(i, 0, silentSample)
          this._audioNextPts += refSampleDuration
          i++
        }

        i--
        // delta  <= -3 * refSampleDurationInt
        // delta  >= -500ms
      } else if (delta <= -AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration && delta >= -1 * MAX_SILENT_FRAME_DURATION) {
        // need discard frames
        if (Math.abs(sample.pts - this._lastAudioExceptionOverlapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
          this._lastAudioExceptionOverlapDot = sample.pts

          audioTrack.warnings.push({
            type: WarningType.AUDIO_DROPPED,
            pts: sample.pts,
            originPts: sample.originPts,
            nextPts,
            refSampleDuration
          })
        }
        samples.splice(i, 1)
        i--
      } else {
        if (Math.abs(delta) > MAX_SILENT_FRAME_DURATION) {
          this._audioTimestampBreak++

          if (Math.abs(sample.pts - this._lastAudioExceptionLargeGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
            this._lastAudioExceptionLargeGapDot = sample.pts
            audioTrack.warnings.push({
              type: WarningType.LARGE_AUDIO_GAP,
              time: sample.pts / 1000,
              pts: sample.pts,
              originPts: sample.originPts,
              nextPts,
              sampleDuration: delta,
              refSampleDuration
            })
          }
        }

        sample.dts = sample.pts = nextPts
        sample.duration = sampleDurationInSampleRate
        this._audioNextPts += refSampleDuration
      }
    }
  }

  _getG711Duration (track) {
    const { sampleSize, channelCount, sampleRate } = track
    const samp0 = track.samples[0]
    if (!samp0) return
    return samp0.data.byteLength * 2 / channelCount / (sampleSize / 8) / sampleRate * 1000
  }

  _getSilentFrame (track) {
    if (track.codecType === AudioCodecType.AAC) return AAC.getSilentFrame(track.codec, track.channelCount)
    return new Uint8Array(8 * track.sampleDuration * track.channelCount)
  }
}
