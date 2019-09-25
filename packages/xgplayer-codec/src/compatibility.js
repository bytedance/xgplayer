import {EVENTS} from 'xgplayer-utils'
import AAC from './aac/aac-helper'

const {REMUX_EVENTS} = EVENTS

class Compatibility {
  constructor () {
    this.nextDts = 0
    this._firstAudioSample = null
    this._firstVideoSample = null
  }

  init () {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this))
  }

  doFix () {
    this.doFixAudio()
  }

  doFixVideo () {
    let {samples: videoSamples, meta} = this.videoTrack
    let {samples: audioSamples} = this.audioTrack

    if (!videoSamples || !videoSamples.length) {
      return
    }

    if (!this._firstVideoSample) {
      this._firstVideoSample = videoSamples[0]
    }
  }

  doFixAudio () {
    let {samples: audioSamples, meta} = this.audioTrack
    if (!audioSamples || !audioSamples.length) {
      return
    }

    audioSamples = audioSamples.filter(sample => sample.dts >= 0)
    if (audioSamples.length === 0) {
      return
    }

    const silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount)

    // step0. 首帧pts太大、与video首帧间距大的问题
    if (!this._firstAudioSample) {
      const firstSample = Compatibility.findFirstAudioSample(audioSamples) // 寻找dts最小的帧作为首个音频帧
      const firstSampleIdx = audioSamples.indexOf(firstSample)

      audioSamples.splice(0, firstSampleIdx)

      this._firstAudioSample = firstSample // record first audio frame for fill

      // 修复与视频首帧距离太大的问题
      if (this._firstVideoSample) {
        const videoFirstPts = this._firstVideoSample.pts ? this._firstVideoSample.pts : this._firstVideoSample.dts + this._firstVideoSample.cts

        if (firstSample.dts - videoFirstPts > 2 * meta.refSampleDuration) {
          const silentSampleCount = (firstSample.dts - videoFirstPts) / meta.refSampleDuration - 1

          for (let i = 0; i < silentSampleCount; i++) {
            const silentSample = {
              data: silentFrame,
              datasize: silentFrame.byteLength,
              dts: videoFirstPts + i * meta.refSampleDuration,
              filtered: 0
            }

            audioSamples.unshift(silentSample)
          }
        }
      }
    }

    let gap
    const firstDts = audioSamples[0].dts

    if (this.nextDts) {
      gap = firstDts - this.nextDts
    } else {
      this.nextDts = audioSamples[audioSamples.length - 1].dts + meta.refSampleDuration
    }

    // step1. 处理samples段之间的丢帧情况
    // 当发现duration差距大于2帧时进行补帧
    if (gap > 2 * meta.refSampleDuration) {
      const silentFrameCount = Math.floor(gap / meta.refSampleDuration - 1)

      for (let i = 0; i < silentFrameCount; i++) {
        const silentSample = {
          data: silentFrame,
          datasize: silentFrame.byteLength,
          dts: this.nextDts + i * meta.refSampleDuration,
          filtered: 0
        }

        this.audioTrack.samples.unshift(silentSample)
      }
    } else if (gap > (-1 * meta.refSampleDuration)) {
      // 当差距在两帧之间时将第一帧的dts强行定位到期望位置
      audioSamples[0].dts = this.nextDts
    } else {
      // 发生了dts的倒退，丢帧
      audioSamples.shift()
    }

    // step3. 修复samples段内部的dts异常问题
    const droppedIdxArr = []
    let current = null// 当前用于比较的基准帧
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      if (droppedIdxArr.indexOf(i) < 0 && !current) {
        // 对于将要丢弃的帧，不进行比较
        current = audioSamples[i]
      }
      const next = audioSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > 2 * meta.refSampleDuration) {
        // 两帧之间间隔太大，需要补空白帧
        let silentFrameCount = Math.floor(duration / meta.refSampleDuration - 1)
        while (silentFrameCount > 0) {
          silentFrameCount--
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: current.dts + meta.refSampleDuration,
            filtered: 0
          }
          audioSamples.splice(i, 0, silentSample)
        }
      } else if (duration < 0) {
        // 将下一帧标记为丢弃
        this.audioTrack.droppedSamples.push({
          dts: next.dts,
          datasize: next.datasize
        })

        droppedIdxArr.push(i + 1)
      } else {
        current = null
      }
    }

    this.audioTrack.samples = audioSamples
  }

  /**
   * 寻找dts最小的sample
   * @param samples
   */
  static findFirstAudioSample (samples) {
    if (!samples.length) {
      return null
    }
    return samples.sort((a, b) => {
      return a.dts - b.dts
    })[0]
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
