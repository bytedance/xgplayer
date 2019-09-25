import {EVENTS} from 'xgplayer-utils'
import AAC from './aac/aac-helper'

const {REMUX_EVENTS} = EVENTS

class Compatibility {
  constructor () {
    this.nextAudioDts = 0
    this.nextVideoDts = 0

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

    if (!this._firstVideoSample && audioSamples.length) {
      this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples) // 寻找dts最小的帧作为首个音频帧
      isFirstAudioSamples = true
    }

    this.doFixVideo(isFirstVideoSamples)
    this.doFixAudio(isFirstAudioSamples)
  }

  doFixVideo (first) {
    let {samples: videoSamples, meta} = this.videoTrack
    let {samples: audioSamples} = this.audioTrack

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return
    }

    const firstSample = this._firstVideoSample
    const firstDts = firstSample && firstSample.pts ? firstSample.pts : firstSample.dts + firstSample.cts
    const audioFirstDts = this._firstAudioSample.dts

    // step0. 修复视频首帧为非关键帧的问题
    if (first) {
      const firstSampleIdx = firstSample ? videoSamples.indexOf(firstSample) : 0

      if (firstSampleIdx) {
        videoSamples.splice(0, firstSampleIdx)
      }
    }

    // step1. 修复与audio首帧差距太大的问题
    if (this._firstAudioSample) {
      const gap = firstDts - audioFirstDts
      if (gap > meta.refSampleDuration) {
        const fillCount = gap / meta.refSampleDuration

        for (let i = 0; i < fillCount; i++) {
          const clonedFirstSample = Object.assign({}, firstSample) // 视频头部帧缺失需要复制第一帧
          // 重新计算sample的dts和pts
          clonedFirstSample.dts = i * meta.refSampleDuration
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
      if (gap > meta.refSampleDuration) {
        const fillFrameCount = Math.floor(gap / meta.refSampleDuration)
        const clonedSample = Object.assign({}, videoSamples[0])

        for (let i = 0; i < fillFrameCount; i++) {
          clonedSample.dts = this.nextVideoDts + i * meta.refSampleDuration
          clonedSample.pts = clonedSample.dts + clonedSample.cts

          this.videoTrack.samples.unshift(clonedSample)
        }
      } else if (Math.abs(gap) < meta.refSampleDuration) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        videoSamples[0].dts = this.nextVideoDts
        videoSamples[0].pts = videoSamples[0].dts + videoSamples[0].cts
      } else if (gap < -1 * meta.refSampleDuration) {
        // 发生了dts的倒退，丢帧
        videoSamples.shift()
      }
    }

    // step2. 修复sample段之内的间距问题
    // step3. 修复samples段内部的dts异常问题
    const droppedIdxArr = []
    let current = null// 当前用于比较的基准帧
    for (let i = 0, len = videoSamples.length; i < len; i++) {
      if (droppedIdxArr.indexOf(i) < 0 && !current) {
        // 对于将要丢弃的帧，不进行比较
        current = videoSamples[i]
      }
      const next = videoSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > meta.refSampleDuration) {
        // 两帧之间间隔太大，需要补空白帧
        let fillFrameCount = Math.floor(duration / meta.refSampleDuration)

        let fillFrameIdx = 0
        while (fillFrameIdx < fillFrameCount) {
          const fillFrame = Object.assign({}, videoSamples[i] + 1)
          fillFrame.dts = current.dts + fillFrameIdx * meta.refSampleDuration
          fillFrame.pts = fillFrame.dts + fillFrame.cts
          fillFrameIdx++
          videoSamples.splice(i, 0, fillFrame)
        }
      } else if (duration < 0) {
        // 将下一帧标记为丢弃
        this.videoTrack.droppedSamples.push({
          dts: next.dts,
          datasize: next.datasize
        })

        droppedIdxArr.push(i + 1)
      } else {
        current = null
      }
    }

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio (first) {
    let {samples: audioSamples, meta} = this.audioTrack

    if (!audioSamples || !audioSamples.length || !this._firstVideoSample) {
      return
    }

    audioSamples = audioSamples.filter(sample => sample.dts >= 0)
    if (audioSamples.length === 0) {
      return
    }

    const silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount)

    // step0. 首帧pts太大、与video首帧间距大的问题
    const firstSample = this._firstAudioSample

    if (first) {
      const firstSampleIdx = firstSample ? audioSamples.indexOf(firstSample) : 0

      if (firstSampleIdx) {
        audioSamples.splice(0, firstSampleIdx)
      }
    }

    // 修复与视频首帧距离太大的问题
    if (this._firstVideoSample) {
      const videoFirstPts = this._firstVideoSample.pts ? this._firstVideoSample.pts : this._firstVideoSample.dts + this._firstVideoSample.cts

      if (firstSample.dts - videoFirstPts > meta.refSampleDuration) {
        const silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration)

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

    let gap
    const firstDts = audioSamples[0].dts

    if (this.nextAudioDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于2帧时进行补帧
      gap = firstDts - this.nextAudioDts
      if (gap > meta.refSampleDuration) {
        const silentFrameCount = Math.floor(gap / meta.refSampleDuration)

        for (let i = 0; i < silentFrameCount; i++) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: this.nextAudioDts + i * meta.refSampleDuration,
            filtered: 0
          }

          this.audioTrack.samples.unshift(silentSample)
        }
      } else if (Math.abs(gap) < meta.refSampleDuration) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        audioSamples[0].dts = this.nextAudioDts
      } else if (gap < -1 * meta.refSampleDuration) {
        // 发生了dts的倒退，丢帧
        audioSamples.shift()
      }
    }
    const lastDts = audioSamples[audioSamples.length - 1].dts;
    const lastSampleDuration = audioSamples.length >= 2 ? lastDts - audioSamples[audioSamples.length - 2].dts : meta.refSampleDuration

    this.nextAudioDts = lastDts + lastSampleDuration

    // step3. 修复samples段内部的dts异常问题
    const droppedIdxArr = []
    let current = null; // 当前用于比较的基准帧
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      if (droppedIdxArr.indexOf(i) > 0 || audioSamples[0]._isSilent) {
        continue;
      }

      current = audioSamples[i]
      const next = audioSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > 2 * meta.refSampleDuration) {
        // 两帧之间间隔太大，需要补空白帧
        let silentFrameCount = Math.floor(duration / meta.refSampleDuration)
        let frameIdx = 0

        while (frameIdx < silentFrameCount) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: current.dts + (frameIdx + 1) * meta.refSampleDuration,
            filtered: 0,
            _isSilent: true
          }
          frameIdx++

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
export default Compatibility
