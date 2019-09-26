import {EVENTS} from 'xgplayer-utils'
import AAC from './aac/aac-helper'

const {REMUX_EVENTS} = EVENTS

class Compatibility {
  constructor () {
    this.nextAudioDts = 0 // 估计下一个audio sample数组的dts
    this.nextVideoDts = 0 // 估计下一个video sample数组的dts
    this.lastAudioSamplesLen = 0
    this.lastVideoSamplesLen = 0

    this._firstAudioSample = null
    this._firstVideoSample = null
  }

  init () {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this))
  }

  doFix () {
    let {samples: videoSamples} = this.videoTrack
    let {samples: audioSamples} = this.audioTrack

    let isFirstVideoSamples = false;
    let isFirstAudioSamples = false;

    if (!this._firstVideoSample && videoSamples.length) {
      this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples)
      isFirstVideoSamples = true
    }

    if (!this._firstAudioSample && audioSamples.length) {
      this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples) // 寻找dts最小的帧作为首个音频帧
      isFirstAudioSamples = true
    }

    this.doFixVideo(isFirstVideoSamples)
    this.doFixAudio(isFirstAudioSamples)
  }

  doFixVideo (first) {
    let {samples: videoSamples, meta} = this.videoTrack

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return
    }

    const firstSample = videoSamples[0]
    const firstDts = firstSample && firstSample.pts ? firstSample.pts : firstSample.dts + firstSample.cts

    const samplesLen = videoSamples.length;

    // step1. 修复与audio首帧差距太大的问题
    if (first && this._firstAudioSample) {
      const videoFirstDts = this._firstVideoSample.dts
      const audioFirstDts = this._firstAudioSample.dts
      const gap = videoFirstDts - audioFirstDts
      if (gap > (2 * meta.refSampleDuration)) {
        const fillCount = Math.floor(gap / meta.refSampleDuration)

        for (let i = 0; i < fillCount; i++) {
          const clonedFirstSample = Object.assign({}, firstSample) // 视频头部帧缺失需要复制第一帧
          // 重新计算sample的dts和pts
          clonedFirstSample.dts = videoFirstDts - (i + 1) * meta.refSampleDuration
          clonedFirstSample.pts = clonedFirstSample.dts + clonedFirstSample.cts

          videoSamples.unshift(clonedFirstSample)
        }
      }
    }

    let gap
    // step2. 修复samples段之间的间距问题、
    if (this.nextVideoDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于2帧时进行补帧
      gap = firstDts - this.nextVideoDts
      if (gap > (2 * meta.refSampleDuration)) {
        const fillFrameCount = Math.floor(gap / meta.refSampleDuration)

        for (let i = 0; i < fillFrameCount; i++) {
          const clonedSample = Object.assign({}, videoSamples[0])
          const computed = firstDts - (i + 1) * meta.refSampleDuration

          clonedSample.dts = computed > this.nextVideoDts ? computed : this.nextVideoDts // 补的第一帧一定要是nextVideoDts
          clonedSample.pts = clonedSample.dts + clonedSample.cts

          this.videoTrack.samples.unshift(clonedSample)
        }
      } else if (Math.abs(gap) < meta.refSampleDuration) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        videoSamples[0].dts = this.nextVideoDts
        videoSamples[0].cts = videoSamples[0].cts || videoSamples[0].pts - videoSamples[0].dts
        videoSamples[0].pts = videoSamples[0].dts + videoSamples[0].cts
      }
    }

    const lastDts = videoSamples[videoSamples.length - 1].dts;

    const lastSampleDuration = videoSamples.length >= 2 ? lastDts - videoSamples[videoSamples.length - 2].dts : meta.refSampleDuration

    this.lastVideoSamplesLen = samplesLen
    this.nextVideoDts = lastDts + lastSampleDuration

    // step2. 修复sample段之内的间距问题
    // step3. 修复samples段内部的dts异常问题
    for (let i = 0, len = videoSamples.length; i < len; i++) {
      const current = videoSamples[i]
      const next = videoSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > (2 * meta.refSampleDuration)) {
        // 两帧之间间隔太大，需要补空白帧
        let fillFrameCount = Math.floor(duration / meta.refSampleDuration)

        let fillFrameIdx = 0
        while (fillFrameIdx < fillFrameCount) {
          const fillFrame = Object.assign({}, next)
          fillFrame.dts = current.dts + (fillFrameIdx + 1) * meta.refSampleDuration
          fillFrame.pts = fillFrame.dts + fillFrame.cts
          fillFrameIdx++
          videoSamples.splice(i, 0, fillFrame)

          i++;
        }
      }
    }

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio (first) {
    let {samples: audioSamples, meta} = this.audioTrack

    if (!audioSamples || !audioSamples.length) {
      return
    }

    const samplesLen = audioSamples.length;
    const silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount)

    const firstSample = this._firstAudioSample

    // 对audioSamples按照dts做排序
    audioSamples = Compatibility.sortAudioSamples(audioSamples)

    // step0. 首帧与video首帧间距大的问题
    if (this._firstVideoSample && first) {
      const videoFirstPts = this._firstVideoSample.pts ? this._firstVideoSample.pts : this._firstVideoSample.dts + this._firstVideoSample.cts

      if (firstSample.dts - videoFirstPts > meta.refSampleDuration) {
        const silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration)

        for (let i = 0; i < silentSampleCount; i++) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: firstSample.dts - (i + 1) * meta.refSampleDuration,
            filtered: 0
          }

          audioSamples.unshift(silentSample)
        }
      }
    }

    let gap
    const firstDts = audioSamples[0].dts

    if (this.nextAudioDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于1帧时进行补帧
      gap = firstDts - this.nextAudioDts

      if (gap > (2 * meta.refSampleDuration)) {
        if (gap && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
          // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
          meta.refSampleDurationFixed = meta.refSampleDuration + gap
        } else {
          const silentFrameCount = Math.floor(gap / meta.refSampleDuration)

          for (let i = 0; i < silentFrameCount; i++) {
            const computed = firstDts - (i + 1) * meta.refSampleDuration
            const silentSample = Object.assign({}, audioSamples[0], {
              dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
            })
            this.audioTrack.samples.unshift(silentSample)
          }
        }
      } else {
        // 当差距在+-1帧之间时将第1帧的dts强行定位到期望位置
        audioSamples[0].dts = this.nextAudioDts
        audioSamples[0].pts = this.nextAudioDts
      }
    }
    const lastDts = audioSamples[audioSamples.length - 1].dts;
    const lastSampleDuration = audioSamples.length >= 2 ? lastDts - audioSamples[audioSamples.length - 2].dts : meta.refSampleDuration

    this.lastAudioSamplesLen = samplesLen;
    this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration

    // step3. 修复samples段内部的dts异常问题
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      const current = audioSamples[i]
      const next = audioSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > (2 * meta.refSampleDuration)) {
        // 两帧之间间隔太大，需要补空白帧
        let silentFrameCount = Math.floor(duration / meta.refSampleDuration)
        let frameIdx = 0

        while (frameIdx < silentFrameCount) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: current.dts + (frameIdx + 1) * meta.refSampleDuration,
            filtered: 0,
            isSilent: true
          }

          audioSamples.splice(i, 0, silentSample)

          frameIdx++
          i++ // 不对静音帧做比较
        }
      }
    }

    this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples)
  }

  static sortAudioSamples (samples) {
    if (samples.length === 1) {
      return samples
    }

    return samples.sort((a, b) => {
      return a.dts - b.dts
    })
  }

  /**
   * 寻找dts最小的sample
   * @param samples
   */
  static findFirstAudioSample (samples) {
    if (!samples || samples.length === 0) {
      return null
    }

    return Compatibility.sortAudioSamples(samples)[0]
  }

  static findFirstVideoSample (samples) {
    if (!samples.length) {
      return null
    }

    const sorted = samples.sort((a, b) => {
      const aPts = a.pts ? a.pts : a.dts + a.cts;
      const bPts = b.pts ? b.pts : b.dts + b.cts;

      return aPts - bPts;
    })

    for (let i = 0, len = sorted.length; i < len; i++) {
      if (sorted[i].isKeyframe) {
        return sorted[i]
      }
    }
  }

  get tracks () {
    return this._context.getInstance('TRACKS')
  }

  get audioTrack () {
    if (this.tracks) {
      return this.tracks.audioTrack
    }
    return null
  }

  get videoTrack () {
    if (this.tracks) {
      return this.tracks.videoTrack
    }
    return null
  }
}
export default Compatibility;
