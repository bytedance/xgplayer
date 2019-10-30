import {EVENTS} from 'xgplayer-utils'
import AAC from './aac/aac-helper'

const {REMUX_EVENTS, DEMUX_EVENTS} = EVENTS

class Compatibility {
  constructor () {
    this.nextAudioDts = 0 // 模拟下一段音频数据的dts
    this.nextVideoDts = 0 // 模拟下一段视频数据的dts

    this.lastAudioSamplesLen = 0 // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0 // 上一段视频数据的长度

    this.lastVideoDts = undefined // 上一段音频数据的长度
    this.lastAudioDts = undefined // 上一段视频数据的长度

    this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
    this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

    this._firstAudioSample = null
    this._firstVideoSample = null

    this.filledAudioSamples = [] // 补充音频帧（）
    this.filledVideoSamples = [] // 补充视频帧（）

    this._videoLargeGap = 0
    this._audioLargeGap = 0
  }

  init () {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this))
  }

  reset () {
    this.nextAudioDts = null // 估算下一段音频数据的dts
    this.nextVideoDts = null // 估算下一段视频数据的dts

    this.lastAudioSamplesLen = 0 // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0 // 上一段视频数据的长度

    this.lastVideoDts = undefined // 上一段音频数据的长度
    this.lastAudioDts = undefined // 上一段视频数据的长度

    // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
    // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

    // this._firstAudioSample = null
    // this._firstVideoSample = null

    this.filledAudioSamples = [] // 补充音频帧（）
    this.filledVideoSamples = [] // 补充视频帧（）
  }

  doFix () {
    const { isFirstAudioSamples, isFirstVideoSamples } = this.getFirstSample()

    // this.removeInvalidSamples()

    this.recordSamplesCount()

    if (this._firstVideoSample) {
      this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples)
    }
    if (this._firstAudioSample) {
      this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples)
    }

    const { changed: videoChanged, changedIdx: videoChangedIdx } = Compatibility.detactChangeStream(this.videoTrack.samples)
    if (videoChanged && !isFirstAudioSamples) {
      this.fixChangeStreamVideo(videoChangedIdx)
    } else {
      this.doFixVideo(isFirstVideoSamples)
    }

    const { changed: audioChanged, changedIdx: audioChangedIdx } = Compatibility.detactChangeStream(this.audioTrack.samples)
    if (audioChanged) {
      this.fixChangeStreamAudio(audioChangedIdx)
    } else {
      this.doFixAudio(isFirstAudioSamples)
    }

    // this.removeInvalidSamples()
  }

  doFixVideo (first, streamChangeStart) {
    let {samples: videoSamples, meta} = this.videoTrack

    if (meta.frameRate && meta.frameRate.fixed === false) {
      return;
    }

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return
    }

    // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

    const firstSample = videoSamples[0]

    const samplesLen = videoSamples.length;

    // step0.修复hls流出现巨大gap，需要强制重定位的问题
    if (this._videoLargeGap > 0) {
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap)
    }

    if (firstSample.dts !== this._firstVideoSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextVideoDts, firstSample))) {
      if (streamChangeStart) {
        this.nextVideoDts = streamChangeStart // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }

      this._videoLargeGap = this.nextVideoDts - firstSample.dts
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap)
    }

    const firstDts = firstSample.dts

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

          this.filledVideoSamples.push({
            dts: clonedFirstSample.dts,
            size: clonedFirstSample.data.byteLength
          })
        }
      }
    }

    let gap
    // step2. 修复samples段之间的间距问题、
    if (this.nextVideoDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于2帧时进行补帧
      gap = firstDts - this.nextVideoDts
      const absGap = Math.abs(gap)
      if (gap > (2 * meta.refSampleDuration)) {
        const fillFrameCount = Math.floor(gap / meta.refSampleDuration)

        for (let i = 0; i < fillFrameCount; i++) {
          const clonedSample = Object.assign({}, videoSamples[0])
          const computed = firstDts - (i + 1) * meta.refSampleDuration

          clonedSample.dts = computed > this.nextVideoDts ? computed : this.nextVideoDts // 补的第一帧一定要是nextVideoDts
          clonedSample.pts = clonedSample.dts + clonedSample.cts

          this.videoTrack.samples.unshift(clonedSample)

          this.filledVideoSamples.push({
            dts: clonedSample.dts,
            size: clonedSample.data.byteLength
          })
        }
      } else if (absGap <= meta.refSampleDuration && absGap > 0) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        // console.log('重定位视频帧dts', videoSamples[0].dts, this.nextVideoDts)
        videoSamples[0].dts = this.nextVideoDts
        videoSamples[0].originDts = videoSamples[0].dts
        videoSamples[0].cts = videoSamples[0].cts !== undefined ? videoSamples[0].cts : videoSamples[0].pts - videoSamples[0].dts
        videoSamples[0].pts = videoSamples[0].dts + videoSamples[0].cts
      } else if (gap < 0) {
        // 出现大的gap
        Compatibility.doFixLargeGap(videoSamples, (-1 * gap))
      }
    }
    const lastDts = videoSamples[videoSamples.length - 1].dts;

    const lastSampleDuration = videoSamples.length >= 2 ? lastDts - videoSamples[videoSamples.length - 2].dts : meta.refSampleDuration

    this.lastVideoSamplesLen = samplesLen
    this.nextVideoDts = lastDts + lastSampleDuration
    this.lastVideoDts = lastDts

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
          if (fillFrame < next.dts) {
            videoSamples.splice(i, 0, fillFrame)

            this.filledVideoSamples.push({
              dts: fillFrame.dts,
              size: fillFrame.data.byteLength
            })
          }

          fillFrameIdx++
          i++;
        }
      }
    }

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio (first, streamChangeStart) {
    let {samples: audioSamples, meta} = this.audioTrack

    if (!audioSamples || !audioSamples.length) {
      return
    }
    // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

    const samplesLen = audioSamples.length;
    const silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount)

    const firstSample = this._firstAudioSample

    const _firstSample = audioSamples[0]
    // 对audioSamples按照dts做排序
    // audioSamples = Compatibility.sortAudioSamples(audioSamples)
    if (this._audioLargeGap > 0) {
      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap)
    }

    if (_firstSample.dts !== this._firstAudioSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample))) {
      if (streamChangeStart) {
        this.nextAudioDts = streamChangeStart // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }
      this._audioLargeGap = this.nextAudioDts - _firstSample.dts
      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap)
    }
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

          this.filledAudioSamples.push({
            dts: silentSample.dts,
            size: silentSample.data.byteLength
          })
        }
      }
    }

    let gap
    const firstDts = audioSamples[0].dts

    if (this.nextAudioDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于1帧时进行补帧
      gap = firstDts - this.nextAudioDts
      const absGap = Math.abs(gap)

      if (absGap > meta.refSampleDuration && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
        meta.refSampleDurationFixed = undefined
      }

      if (gap > (2 * meta.refSampleDuration)) {
        if (samplesLen === 1 && this.lastAudioSamplesLen === 1) {
          // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
          meta.refSampleDurationFixed = meta.refSampleDurationFixed !== undefined ? meta.refSampleDurationFixed + gap : meta.refSampleDuration + gap
        } else {
          const silentFrameCount = Math.floor(gap / meta.refSampleDuration)

          for (let i = 0; i < silentFrameCount; i++) {
            const computed = firstDts - (i + 1) * meta.refSampleDuration
            const silentSample = Object.assign({}, audioSamples[0], {
              dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
            })

            this.filledAudioSamples.push({
              dts: silentSample.dts,
              size: silentSample.data.byteLength
            })
            this.audioTrack.samples.unshift(silentSample)
          }
        }
      } else if (absGap <= meta.refSampleDuration && absGap > 0) {
        // 当差距比较小的时候将音频帧重定位
        // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
        audioSamples[0].dts = this.nextAudioDts
        audioSamples[0].pts = this.nextAudioDts
      } else if (gap < 0) {
        Compatibility.doFixLargeGap(audioSamples, (-1 * gap))
      }
    }
    const lastDts = audioSamples[audioSamples.length - 1].dts;
    const lastSampleDuration = audioSamples.length >= 2 ? lastDts - audioSamples[audioSamples.length - 2].dts : meta.refSampleDuration

    this.lastAudioSamplesLen = samplesLen;
    this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration
    this.lastAudioDts = lastDts

    // step3. 修复samples段内部的dts异常问题
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      const current = audioSamples[i]
      const next = audioSamples[i + 1]

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;
      audioSamples[i].duration = duration;
      /*
      if (duration > (2 * meta.refSampleDuration)) {
        // 两帧之间间隔太大，需要补空白帧
        /**
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

          this.filledAudioSamples.push({
            dts: silentSample.dts,
            size: silentSample.data.byteLength
          })

          frameIdx++
          i++ // 不对静音帧做比较
        }
      } */
    }

    this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples)
  }

  fixChangeStreamVideo (changeIdx) {
    const { samples, meta } = this.videoTrack;
    const prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        }
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return this.doFixVideo(false)
    }

    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const firstSample = samples[0]

    const changeSample = secondPartSamples[0]
    const firstPartDuration = changeSample.dts - firstSample.dts
    const streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null

    this.videoTrack.samples = samples.slice(0, changeIdx);

    this.doFixVideo(false);

    this.videoTrack.samples = samples.slice(changeIdx);

    this.doFixVideo(false, streamChangeStart);

    this.videoTrack.samples = firstPartSamples.concat(secondPartSamples)
  }

  fixChangeStreamAudio (changeIdx) {
    const { samples, meta } = this.audioTrack;

    const prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        }
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return this.doFixAudio(false)
    }

    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const firstSample = samples[0]

    const changeSample = secondPartSamples[0]
    const firstPartDuration = changeSample.dts - firstSample.dts
    const streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null

    this.audioTrack.samples = firstPartSamples;

    this.doFixAudio(false);

    this.audioTrack.samples = secondPartSamples;

    this.doFixAudio(false, streamChangeStart);

    this.audioTrack.samples = firstPartSamples.concat(secondPartSamples)
  }

  getFirstSample () {
    // 获取video和audio的首帧数据
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

    return {
      isFirstVideoSamples,
      isFirstAudioSamples
    }
  }

  /**
   * 在没有refSampleDuration的问题流中，
   */
  fixRefSampleDuration (meta, samples) {
    const isVideo = meta.type === 'video'
    const allSamplesCount = isVideo ? this.allVideoSamplesCount : this.allAudioSamplesCount
    const firstDts = isVideo ? this._firstVideoSample.dts : this._firstAudioSample.dts
    const filledSamplesCount = isVideo ? this.filledVideoSamples.length : this.filledAudioSamples.length

    if (!meta.refSampleDuration || meta.refSampleDuration <= 0 || Number.isNaN(meta.refSampleDuration)) {
      if (samples.length >= 1) {
        const lastDts = samples[samples.length - 1].dts

        meta.refSampleDuration = Math.floor((lastDts - firstDts) / ((allSamplesCount + filledSamplesCount) - 1)); // 将refSampleDuration重置为计算后的平均值
      }
    } else if (meta.refSampleDuration) {
      if (samples.length >= 5) {
        const lastDts = samples[samples.length - 1].dts
        const firstDts = samples[0].dts
        const durationAvg = (lastDts - firstDts) / (samples.length - 1)

        meta.refSampleDuration = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
      }
    }
  }

  /**
   * 记录截止目前一共播放了多少帧
   */
  recordSamplesCount () {
    const { audioTrack, videoTrack } = this

    this.allAudioSamplesCount += audioTrack.samples.length
    this.allVideoSamplesCount += videoTrack.samples.length
  }

  /**
   * 去除不合法的帧（倒退、重复帧）
   */
  removeInvalidSamples () {
    const { _firstVideoSample, _firstAudioSample } = this

    this.audioTrack.samples = this.audioTrack.samples.filter((sample) => {
      return sample.dts >= _firstAudioSample.dts && (this.lastAudioDts === undefined || sample.dts > this.lastAudioDts)
    })

    this.videoTrack.samples = this.videoTrack.samples.filter((sample) => {
      return sample.dts >= _firstVideoSample.dts && (this.lastVideoDts === undefined || sample.dts > this.lastVideoDts)
    })
  }

  getStreamChangeStart (sample) {
    if (sample.options && sample.options.start) {
      return sample.options.start - this.dtsBase;
    }
    return Infinity
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
      return a.dts - b.dts;
    })

    for (let i = 0, len = sorted.length; i < len; i++) {
      if (sorted[i].isKeyframe) {
        return sorted[i]
      }
    }
  }

  static detectLargeGap (nextDts, firstSample) {
    if (nextDts === null) {
      return;
    }
    const curDts = firstSample.dts || 0
    const cond1 = nextDts - curDts >= 1000 || curDts - nextDts >= 1000 // fix hls流出现大量流dts间距问题
    const cond2 = firstSample.options && firstSample.options.discontinue

    return cond1 || cond2
  }

  static doFixLargeGap (samples, gap) {
    for (let i = 0, len = samples.length; i < len; i++) {
      const sample = samples[i];
      sample.dts += gap
      if (sample.pts) {
        sample.pts += gap
      }
    }
  }

  /**
   * 中途换流
   */
  static detactChangeStream (samples) {
    let changed = false;
    let changedIdx = -1;
    for (let i = 0, len = samples.length; i < len; i++) {
      if (samples[i].options && samples[i].options.meta) {
        changed = true
        changedIdx = i;
        break;
      }
    }

    return {
      changed,
      changedIdx
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

  get dtsBase () {
    const remuxer = this._context.getInstance('MP4_REMUXER');
    if (remuxer) {
      return remuxer._dtsBase
    }
    return 0
  }
}
export default Compatibility;
