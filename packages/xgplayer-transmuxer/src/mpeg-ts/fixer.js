import { AudioSample, WarningType } from '../model'
import { AAC } from '../codec'
import { isSafari } from '../utils'
import { AudioCodecType } from '../model/types'

const LARGE_AV_FIRST_FRAME_GAP = 90000 / 2 // 500ms
const AUDIO_GAP_OVERLAP_THRESHOLD_COUNT = 3
const MAX_SILENT_FRAME_DURATION = 90000 // 1s
const AUDIO_EXCETION_LOG_EMIT_DURATION = 5 * 90000 // 5s
const MAX_VIDEO_FRAME_DURATION = 90000 // 1s
const MAX_DTS_DELTA_WITH_NEXT_CHUNK = 90000 / 2 // 500ms
const LARGE_AV_FIRST_FRAME_FORCE_FIX_THRESHOLD = 90000 * 5 // 5s

export class TsFixer {
  constructor (videoTrack, audioTrack, metadataTrack, fixerConfig) {
    this.videoTrack = videoTrack
    this.audioTrack = audioTrack
    this.metadataTrack = metadataTrack

    this._baseDts = -1
    this._baseVideoDts = -1
    this._baseAudioDts = -1
    this._baseDtsInited = false

    this._audioNextPts = undefined
    this._videoNextDts = undefined

    this._audioTimestampBreak = false
    this._videoTimestampBreak = false

    this._lastAudioExceptionGapDot = 0
    this._lastAudioExceptionOverlapDot = 0
    this._lastAudioExceptionLargeGapDot = 0

    this._needForceFixLargeGap = fixerConfig?.forceFixLargeGap
    this._largeGapThreshold = fixerConfig?.largeGapThreshold || LARGE_AV_FIRST_FRAME_FORCE_FIX_THRESHOLD
  }

  fix (startTime = 0, discontinuity = false, contiguous = true) {
    startTime = Math.round(startTime * 90000)
    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack

    const vSamples = videoTrack.samples
    const aSamples = audioTrack.samples

    if (!vSamples.length && !aSamples.length) return

    const firstVideoSample = vSamples[0]
    const firstAudioSample = aSamples[0]
    // consider av delta
    let vaDelta = 0

    if (vSamples.length && aSamples.length) {
      vaDelta = firstVideoSample.dts - firstAudioSample.pts
    }

    if (!this._baseDtsInited) {
      this._calculateBaseDts(this.audioTrack, this.videoTrack)
    }

    // recalc baseDts
    if (discontinuity) {
      this._calculateBaseDts(this.audioTrack, this.videoTrack)
      this._baseDts -= startTime
      this._baseAudioDts -= startTime
      this._baseVideoDts -= startTime
    }

    // id discontinue, recalc nextDts, consider av delta of firstframe
    if (!contiguous) {
      /**
       *  segment.start = min(a, v)
       *  segment.start
       *      |
       *      a
       *       -- vaDelta --
       *                   v
       */
      this._videoNextDts = vaDelta > 0 ? startTime + vaDelta : startTime
      this._audioNextPts = vaDelta > 0 ? startTime : startTime - vaDelta

      if (this._needForceFixLargeGap){
        this._videoNextDts = 0
        this._audioNextPts = 0
      }
      const vDeltaToNextDts = firstVideoSample ? firstVideoSample.dts - this._baseDts - this._videoNextDts : 0
      const aDeltaToNextDts = firstAudioSample ? firstAudioSample.pts - this._baseDts - this._audioNextPts : 0

      if (Math.abs(vDeltaToNextDts || aDeltaToNextDts) > MAX_VIDEO_FRAME_DURATION) {
        this._calculateBaseDts(this.audioTrack, this.videoTrack)
        this._baseDts -= startTime
      }
    }

    this._resetBaseDtsWhenStreamBreaked()

    // fix audio first
    this._fixAudio(audioTrack)

    this._fixVideo(videoTrack)

    if (this.metadataTrack.exist()) {
      const timescale = this.metadataTrack.timescale
      this.metadataTrack.seiSamples.forEach(s => {
        s.pts = s.originPts - this._baseDts
        s.time = Math.max(0, s.pts) / timescale
      })
    }

    if (videoTrack.samples.length) {
      videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts
    }
    if (audioTrack.samples.length) {
      audioTrack.baseMediaDecodeTime = audioTrack.samples[0].pts * audioTrack.timescale / 90000
    }
  }

  _fixVideo (videoTrack) {
    const samples = videoTrack.samples

    if (!samples.length) return
    samples.forEach(x => {
      x.dts -= this._needForceFixLargeGap ? this._baseVideoDts : this._baseDts
      x.pts -= this._needForceFixLargeGap ? this._baseVideoDts : this._baseDts
    })

    if (this._videoNextDts === undefined) {
      const samp0 = samples[0]
      this._videoNextDts = samp0.dts
    }

    const len = samples.length
    let sampleDuration = 0
    const firstSample = samples[0]
    const nextSample = samples[1]
    const vDelta = this._videoNextDts - firstSample.dts

    if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
      videoTrack.warnings.push({
        type: WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK,
        nextDts: this._videoNextDts / 90,
        firstSampleDts: firstSample.dts / 90,
        nextSampleDts: (samples[1]?.dts || 0) / 90,
        sampleDuration: vDelta / 90
      })

      // resolve first frame first
      firstSample.dts += vDelta
      firstSample.pts += vDelta


      // check to ajust the whole segment
      if (nextSample && Math.abs(nextSample.dts - firstSample.dts) > MAX_VIDEO_FRAME_DURATION) {
        this._videoTimestampBreak = true
        samples.forEach((x, i) => {
          if (i === 0) return
          x.dts += vDelta
          x.pts += vDelta
        })
      } else {
        for (let i = 1; i < len - 1; i++) {
          const dts = samples[i]?.dts
          const prevDts = samples[i - 1 ].dts
          if (dts && dts - prevDts < 0) {
            samples[i].dts += vDelta
            samples[i].pts += vDelta
          }
        }
      }
    }

    let refSampleDurationInt
    if (videoTrack.fpsNum && videoTrack.fpsDen) {
      refSampleDurationInt = videoTrack.timescale * (videoTrack.fpsDen / videoTrack.fpsNum)
    }

    // fps inaccuracy
    if (refSampleDurationInt < 90 * 10) { // < 10ms per frame
      refSampleDurationInt = 0
    }

    if (!refSampleDurationInt) {
      const first = videoTrack.samples[0]
      const second = videoTrack.samples[1]
      // 100ms default
      refSampleDurationInt = len === 1 ? 9000 : Math.floor((second.dts - first.dts))
    }

    for (let i = 0; i < len; i++) {
      const dts = samples[i].dts
      const nextSample = samples[i + 1]
      if (i < len - 1) {
        sampleDuration = nextSample.dts - dts
      } else if (samples[i - 1]) {
        sampleDuration = Math.min(dts - samples[i - 1].dts, refSampleDurationInt)
      } else {
        sampleDuration = refSampleDurationInt
      }

      if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
        // dts exception of adjacent frame
        this._videoTimestampBreak = true

        // check if only video breaked!
        sampleDuration = this._audioTimestampBreak ? refSampleDurationInt : Math.max(sampleDuration, 30 * 90) // 30ms

        // check if sample breaked within current fragment
        const expectFragEnd = (this._audioNextPts || 0)
        if (nextSample && nextSample.dts > expectFragEnd) {
          sampleDuration = refSampleDurationInt
        }

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

      samples[i].duration = sampleDuration
      this._videoNextDts += sampleDuration
    }
  }

  _fixAudio (audioTrack) {
    const samples = audioTrack.samples

    if (!samples.length) return
    if (audioTrack.codecType === AudioCodecType.MP3) {
      if (this.lastAudioSample) {
        samples.unshift(this.lastAudioSample)
      }
      for (let index = 0; index < samples.length; index++) {
        const x = samples[index]
        if (samples[index + 1]) {
          x.duration = samples[index + 1].pts - x.pts
        } else {
          break
        }
        x.pts -= this._baseDts
        x.dts = x.pts
      }
      this.lastAudioSample = samples.pop()
      return
    }
    samples.forEach(x => {
      x.pts -= this._needForceFixLargeGap ? this._baseAudioDts : this._baseDts
      x.dts = x.pts
    })

    this._doFixAudioInternal(audioTrack, samples, 90000)
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
      this._baseAudioDts = audioBasePts
    }

    if (videoSamps.length) {
      videoTrack.baseDts = videoBaseDts = videoSamps[0].dts
      this._baseVideoDts = videoBaseDts
    }

    this._baseDts = Math.min(audioBasePts, videoBaseDts)

    const delta = videoBaseDts - audioBasePts
    let largeGap = false
    if (Number.isFinite(delta) && Math.abs(delta) > LARGE_AV_FIRST_FRAME_GAP) {
      videoTrack.warnings.push({
        type: WarningType.LARGE_AV_SHIFT,
        videoBaseDts,
        audioBasePts,
        baseDts: this._baseDts,
        delta
      })
    }
    if (Number.isFinite(delta) && Math.abs(delta) > this._largeGapThreshold * MAX_SILENT_FRAME_DURATION) {
      largeGap = true
    }
    if (!this._baseDtsInited){
      if (largeGap && this._needForceFixLargeGap) {
        this._needForceFixLargeGap = true
      } else {
        this._needForceFixLargeGap = false
      }
    }
    this._baseDtsInited = true
    return true
  }

  _resetBaseDtsWhenStreamBreaked () {
    if (this._baseDtsInited && this._videoTimestampBreak && this._audioTimestampBreak) {
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
      this._baseDts -= Math.min(this._audioNextPts, this._videoNextDts)
      this._audioLastSample = null
      this._videoLastSample = null
      this._videoTimestampBreak = false
      this._audioTimestampBreak = false
    }
  }

  _doFixAudioInternal (audioTrack, samples, timescale) {
    if (!audioTrack.sampleDuration) audioTrack.sampleDuration = AAC.getFrameDuration(audioTrack.timescale, timescale)
    const refSampleDuration = audioTrack.sampleDuration

    if (this._audioNextPts === undefined) {
      const samp0 = samples[0]
      this._audioNextPts = samp0.pts
    }

    for (let i = 0; i < samples.length; i++) {
      const nextPts = this._audioNextPts
      const sample = samples[i]
      const delta = sample.pts - nextPts

      // fill frames
      // delta >= 3 * refSampleDurationInt
      // delta <= 500s
      if (!this._audioTimestampBreak && delta >= AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration && delta <= MAX_SILENT_FRAME_DURATION && !isSafari) {
        const silentFrame = AAC.getSilentFrame(audioTrack.codec, audioTrack.channelCount) || samples[0].data.subarray()
        const count = Math.floor(delta / refSampleDuration)

        if (Math.abs(sample.pts - this._lastAudioExceptionGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
          this._lastAudioExceptionGapDot = sample.pts
        }

        audioTrack.warnings.push({
          type: WarningType.AUDIO_FILLED,
          pts: sample.pts / 90,
          originPts: sample.originPts,
          count,
          nextPts: nextPts / 90,
          refSampleDuration
        })

        for (let j = 0; j < count; j++) {
          const silentSample = new AudioSample(Math.floor(nextPts), silentFrame)
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
            pts: sample.pts / 90,
            originPts: sample.originPts,
            nextPts: nextPts / 90,
            refSampleDuration
          })
        }
        samples.splice(i, 1)
        i--
      } else {
        if (Math.abs(delta) >= MAX_SILENT_FRAME_DURATION) {
          this._audioTimestampBreak = true

          if (Math.abs(sample.pts - this._lastAudioExceptionLargeGapDot) > AUDIO_EXCETION_LOG_EMIT_DURATION) {
            this._lastAudioExceptionLargeGapDot = sample.pts
            audioTrack.warnings.push({
              type: WarningType.LARGE_AUDIO_GAP,
              time: sample.pts / 1000,
              pts: sample.pts / 90,
              originPts: sample.originPts,
              nextPts: nextPts / 90,
              sampleDuration: delta,
              refSampleDuration
            })
          }
        }

        sample.dts = sample.pts = nextPts
        this._audioNextPts += refSampleDuration
      }
    }
  }
}
