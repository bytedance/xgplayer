import { AAC } from '../codec'
import type { AudioTrack, MetadataTrack, VideoSample, VideoTrack } from '../model'
import { AudioSample, WarningType } from '../model'
import { AudioCodecType, VideoCodecType } from '../model/types'
import { isSafari } from '../utils'

const LARGE_AV_FIRST_FRAME_GAP = 90000 / 2 // 500ms
const AUDIO_GAP_OVERLAP_THRESHOLD_COUNT = 3
const MAX_SILENT_FRAME_DURATION = 90000 // 1s
const AUDIO_EXCETION_LOG_EMIT_DURATION = 5 * 90000 // 5s
const MAX_VIDEO_FRAME_DURATION = 90000 // 1s
const MAX_DTS_DELTA_WITH_NEXT_CHUNK = 90000 / 2 // 500ms
const LARGE_AV_FIRST_FRAME_FORCE_FIX_THRESHOLD = 90000 * 5 // 5s

export interface TsFixerConfig {
  forceFixLargeGap?: boolean
  largeGapThreshold?: number
  fixHevcDiscontinuity?: boolean
}

export class TsFixer {
  private videoTrack: VideoTrack
  private audioTrack: AudioTrack
  private metadataTrack: MetadataTrack
  private _baseDts: number
  private _baseVideoDts: number
  private _baseAudioDts: number
  private _baseDtsInited: boolean
  private _audioNextPts: number | undefined
  private _videoNextDts: number | undefined
  private _audioTimestampBreak: boolean
  private _videoTimestampBreak: boolean
  private _lastAudioExceptionGapDot: number
  private _lastAudioExceptionOverlapDot: number
  private _lastAudioExceptionLargeGapDot: number
  private _needForceFixLargeGap: boolean | undefined
  private _largeGapThreshold: number
  private _fixHevcDiscontinuity: boolean | undefined
  private _lastVideoDts: number | undefined
  private _lastHevcSps: Uint8Array | undefined
  private lastAudioSample: AudioSample | undefined

  constructor(
    videoTrack: VideoTrack,
    audioTrack: AudioTrack,
    metadataTrack: MetadataTrack,
    fixerConfig: TsFixerConfig = {}
  ) {
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
    this._largeGapThreshold =
      fixerConfig?.largeGapThreshold || LARGE_AV_FIRST_FRAME_FORCE_FIX_THRESHOLD
    this._fixHevcDiscontinuity = fixerConfig?.fixHevcDiscontinuity
    this._lastVideoDts = undefined
    this._lastHevcSps = undefined
  }

  fix(startTime = 0, discontinuity = false, contiguous = true) {
    startTime = Math.round(startTime * 90000)
    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack

    const vSamples = videoTrack.samples
    const aSamples = audioTrack.samples

    this._fixHevcBoundary(discontinuity, contiguous)

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

      if (this._needForceFixLargeGap) {
        this._videoNextDts = 0
        this._audioNextPts = 0
      }
      const vDeltaToNextDts = firstVideoSample
        ? firstVideoSample.dts - this._baseDts - this._videoNextDts
        : 0
      const aDeltaToNextDts = firstAudioSample
        ? firstAudioSample.pts - this._baseDts - this._audioNextPts
        : 0

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
      this.metadataTrack.seiSamples.forEach((s) => {
        s.pts = s.originPts - this._baseDts
        s.time = Math.max(0, s.pts) / timescale
      })
    }

    if (videoTrack.samples.length) {
      videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts
    }
    if (audioTrack.samples.length) {
      audioTrack.baseMediaDecodeTime =
        (audioTrack.samples[0].pts * audioTrack.timescale) / 90000
    }
  }

  /**
   * Repairs implicit HEVC decode boundaries that are not always signaled by the
   * playlist. An explicit discontinuity, non-contiguous load, SPS change, or DTS
   * rollback can leave Safari/VideoToolbox holding references from the previous
   * sequence. For a complete single-layer CRA picture, rewrite CRA_NUT to
   * BLA_W_LP so the decoder drops stale DPB/RASL references.
   *
   * The rewrite is gated by fixHevcDiscontinuity, limited to the first VCL
   * picture at a confirmed boundary, and uses copy-on-write to preserve the
   * original TS data.
   */
  private _fixHevcBoundary(discontinuity: boolean, contiguous: boolean) {
    if (!this._fixHevcDiscontinuity) return
    const { samples, codecType } = this.videoTrack
    if (codecType !== VideoCodecType.HEVC) {
      this._lastVideoDts = undefined
      this._lastHevcSps = undefined
      return
    }
    if (!samples.length) return
    const previousDts = this._lastVideoDts
    this._lastVideoDts = samples[samples.length - 1].dts

    // Parameter sets can occupy their own PES before the first VCL sample.
    // Track the latest leading SPS, then validate the first actual picture as the boundary.
    let first: VideoSample | undefined
    let sps: Uint8Array | undefined
    for (const sample of samples) {
      const sampleUnits = sample.units as Uint8Array[]
      sps = sampleUnits.find((unit) => ((unit[0] >>> 1) & 0x3f) === 33) || sps
      if (
        sampleUnits.some((unit) => unit.length >= 2 && ((unit[0] >>> 1) & 0x3f) <= 31)
      ) {
        first = sample
        break
      }
    }
    if (!first) return

    // The track keeps its initial SPS, so compare current in-band bytes for splice detection.
    // Decoder-config changes still need a separate init-segment path.
    const units = first.units as Uint8Array[]
    const previousSps = this._lastHevcSps
    const spsChanged = !!(
      sps &&
      previousSps &&
      (sps.length !== previousSps.length ||
        sps.some((value, i) => value !== previousSps[i]))
    )
    if (sps) this._lastHevcSps = sps.slice()
    const dtsRollback = previousDts !== undefined && first.dts <= previousDts
    if (!first.keyframe || (!discontinuity && contiguous && !spsChanged && !dtsRollback))
      return

    let hasCra = false
    for (const unit of units) {
      if (unit.length < 2) return
      const type = (unit[0] >>> 1) & 0x3f
      if (type > 31) continue
      // Only a complete, single-layer CRA picture can become a broken-link access point.
      if (type !== 21 || unit.length < 3 || unit[0] & 0x81 || unit[1] !== 1) return
      if (!hasCra && !(unit[2] & 0x80)) return
      hasCra = true
    }
    if (!hasCra) return

    // CRA_NUT -> BLA_W_LP signals NoRaslOutputFlag without rewriting slice payload.
    // Copy on write keeps the original TS buffer reusable by callers.
    first.units = units.map((unit) => {
      if (((unit[0] >>> 1) & 0x3f) !== 21) return unit
      const bla = unit.slice()
      bla[0] = 16 << 1
      return bla
    })
  }

  private _fixVideo(videoTrack: VideoTrack) {
    const samples = videoTrack.samples

    if (!samples.length) return
    samples.forEach((x) => {
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
    const fixHevc =
      this._fixHevcDiscontinuity && videoTrack.codecType === VideoCodecType.HEVC

    // Overlapping chunks can start behind the expected DTS. Shift the whole chunk so
    // composition offsets stay intact and correction does not oscillate around 500ms.
    if (fixHevc && vDelta > 0) {
      samples.forEach((x) => {
        x.dts += vDelta
        x.pts += vDelta
      })
    } else if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
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
      if (
        nextSample &&
        Math.abs(nextSample.dts - firstSample.dts) > MAX_VIDEO_FRAME_DURATION
      ) {
        this._videoTimestampBreak = true
        samples.forEach((x, i) => {
          if (i === 0) return
          x.dts += vDelta
          x.pts += vDelta
        })
      } else {
        for (let i = 1; i <= len - 1; i++) {
          const dts = samples[i]?.dts
          const prevDts = samples[i - 1].dts
          if (dts && dts - prevDts < 0) {
            samples[i].dts += vDelta
            samples[i].pts += vDelta
          }
        }
      }
    }

    let refSampleDurationInt = 0
    if (videoTrack.fpsNum && videoTrack.fpsDen) {
      refSampleDurationInt =
        videoTrack.timescale * (videoTrack.fpsDen / videoTrack.fpsNum)
    }

    // fps inaccuracy
    if (refSampleDurationInt < 90 * 10) {
      // < 10ms per frame
      refSampleDurationInt = 0
    }

    if (!refSampleDurationInt) {
      const first = videoTrack.samples[0]
      const second = videoTrack.samples[1]
      // 100ms default
      refSampleDurationInt = len === 1 ? 9000 : Math.floor(second.dts - first.dts)
    }

    // Anchor the next chunk to the actual output, not accumulated tail-duration estimates.
    if (fixHevc) this._videoNextDts = firstSample.dts
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
        sampleDuration = this._audioTimestampBreak
          ? refSampleDurationInt
          : Math.max(sampleDuration, 30 * 90) // 30ms

        // check if sample breaked within current fragment
        const expectFragEnd = this._audioNextPts || 0
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

  private _fixAudio(audioTrack: AudioTrack) {
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
    samples.forEach((x) => {
      x.pts -= this._needForceFixLargeGap ? this._baseAudioDts : this._baseDts
      x.dts = x.pts
    })

    this._doFixAudioInternal(audioTrack, samples, 90000)
  }

  private _calculateBaseDts(audioTrack: AudioTrack, videoTrack: VideoTrack) {
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
    if (
      Number.isFinite(delta) &&
      Math.abs(delta) > this._largeGapThreshold * MAX_SILENT_FRAME_DURATION
    ) {
      largeGap = true
    }
    if (!this._baseDtsInited) {
      if (largeGap && this._needForceFixLargeGap) {
        this._needForceFixLargeGap = true
      } else {
        this._needForceFixLargeGap = false
      }
    }
    this._baseDtsInited = true
    return true
  }

  private _resetBaseDtsWhenStreamBreaked() {
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
      this._baseDts -= Math.min(
        this._audioNextPts as number,
        this._videoNextDts as number
      )
      this._videoTimestampBreak = false
      this._audioTimestampBreak = false
    }
  }

  private _doFixAudioInternal(
    audioTrack: AudioTrack,
    samples: AudioSample[],
    timescale: number
  ) {
    if (!audioTrack.sampleDuration)
      audioTrack.sampleDuration = AAC.getFrameDuration(audioTrack.timescale, timescale)
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
      if (
        !this._audioTimestampBreak &&
        delta >= AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration &&
        delta <= MAX_SILENT_FRAME_DURATION &&
        !isSafari
      ) {
        const silentFrame =
          AAC.getSilentFrame(
            audioTrack.parsedCodec || audioTrack.codec,
            audioTrack.channelCount
          ) || samples[0].data.subarray()
        const count = Math.floor(delta / refSampleDuration)

        if (
          Math.abs(sample.pts - this._lastAudioExceptionGapDot) >
          AUDIO_EXCETION_LOG_EMIT_DURATION
        ) {
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
          const silentSample = new AudioSample(
            Math.floor(nextPts),
            silentFrame,
            undefined,
            undefined
          )
          silentSample.originPts = Math.floor(this._baseDts + nextPts)
          samples.splice(i, 0, silentSample)
          this._audioNextPts += refSampleDuration
          i++
        }

        i--
        // delta  <= -3 * refSampleDurationInt
        // delta  >= -500ms
      } else if (
        delta <= -AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration &&
        delta >= -1 * MAX_SILENT_FRAME_DURATION
      ) {
        // need discard frames
        if (
          Math.abs(sample.pts - this._lastAudioExceptionOverlapDot) >
          AUDIO_EXCETION_LOG_EMIT_DURATION
        ) {
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

          if (
            Math.abs(sample.pts - this._lastAudioExceptionLargeGapDot) >
            AUDIO_EXCETION_LOG_EMIT_DURATION
          ) {
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
