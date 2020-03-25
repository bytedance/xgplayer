import EVENTS from 'xgplayer-transmuxer-constant-events'
import AAC from 'xgplayer-transmuxer-codec-aac'
import Sniffer from 'xgplayer-utils-sniffer';
import { caculate } from 'xgplayer-utils';

const isSafari = Sniffer.browser === 'safari'

const { REMUX_EVENTS } = EVENTS

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

    this.videoLastSample = null
    this.audioLastSample = null // stash last sample for duration compat

    this._videoLargeGap = 0
    this._audioLargeGap = 0

    this.audioUnsyncTime = 0;
  }

  init () {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this))
  }

  reset () {
    this.nextAudioDts = null // 估算下一段音频数据的dts
    this.nextVideoDts = null // 估算下一段视频数据的dts

    this.lastAudioSamplesLen = 0 // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0 // 上一段视频数据的长度

    this.lastVideoDts = undefined // 上一段音频数据的dts
    this.lastAudioDts = undefined // 上一段视频数据的dts

    // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
    // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

    this._audioLargeGap = 0;
    this._videoLargeGap = 0;

    // this._firstAudioSample = null
    // this._firstVideoSample = null
    // this._firstAudioSample = null
    // this._firstVideoSample = null
    this.videoLastSample = null
    this.audioLastSample = null

    this.filledAudioSamples = [] // 补充音频帧（）
    this.filledVideoSamples = [] // 补充视频帧（）

    this.audioUnsyncTime = 0;
  }

  doFix () {
    const { isFirstAudioSamples, isFirstVideoSamples } = this.getFirstSample()

    this.recordSamplesCount()

    if (this._firstVideoSample) {
      this.fixVideoRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples)
    }
    if (this._firstAudioSample && isFirstAudioSamples) {
      this.fixAudioRefSampleDuration(this.audioTrack.meta)
    }

    const { changed: videoChanged, changedIdxes: videoChangedIdxes } = Compatibility.detectChangeStream(this.videoTrack.samples, isFirstVideoSamples)
    if (videoChanged) {
      let disContinue = false
      for (let i = 0; i < videoChangedIdxes.length; i++) {
        if (this.fixChangeStreamVideo(videoChangedIdxes[i], isFirstVideoSamples)) {
          disContinue = true
        }
      }
      if (!disContinue) {
        this.doFixVideo(isFirstVideoSamples)
      }
    } else {
      this.doFixVideo(isFirstVideoSamples)
    }

    const { changed: audioChanged, changedIdxes: audioChangedIdxes } = Compatibility.detectChangeStream(this.audioTrack.samples, isFirstAudioSamples)
    if (audioChanged) {
      let disContinue = false
      for (let i = 0; i < audioChangedIdxes.length; i++) {
        if (this.fixChangeStreamAudio(audioChangedIdxes[i], isFirstAudioSamples)) {
          disContinue = true
        }
      }
      if (!disContinue) {
        this.doFixAudio(isFirstAudioSamples)
      } else {
        return;
      }
    } else {
      this.doFixAudio(isFirstAudioSamples)
    }

    this.removeInvalidSamples()
  }

  doFixVideo (first, streamChangeStart) {
    let {samples: videoSamples, meta} = this.videoTrack

    // console.log('next video', this.nextVideoDts)
    for (let i = 0, len = videoSamples.length; i < len; i++) {
      const sample = videoSamples[i]
      sample.originDts = sample.dts
      sample.originPts = sample.pts
    }

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return
    }

    // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

    const firstSample = videoSamples[0]

    if (!first && (this.videoLastSample === null && firstSample.options && firstSample.options.start)) {
      if (streamChangeStart) {
        streamChangeStart = firstSample.options.start;
      }
    }
    if (!first && !streamChangeStart && this.videoLastSample && Compatibility.detectLargeGap(this.videoLastSample ? this.videoLastSample.dts : 0, firstSample.dts + this._videoLargeGap)) {
      // large gap 不准确，出现了非换流场景的时间戳跳变
      this._videoLargeGap = this.videoLastSample.dts + meta.refSampleDuration - firstSample.dts
    }
    // step0.修复hls流出现巨大gap，需要强制重定位的问题
    if (this._videoLargeGap !== 0) {
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap)
    }

    if (!first && streamChangeStart) {
      this._videoLargeGap = streamChangeStart - firstSample.dts
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap)
    }

    // step1. 修复与audio首帧差距太大的问题
    if (first && this._firstAudioSample) {
      const videoFirstDts = this._firstVideoSample.originDts
      const audioFirstDts = this._firstAudioSample.originDts || this._firstAudioSample.dts
      const gap = videoFirstDts - audioFirstDts
      if (gap > (2 * meta.refSampleDuration) && gap < (10 * meta.refSampleDuration)) {
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
        this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample
      } else if (Math.abs(gap) > (2 * meta.refSampleDuration) && !this._videoLargeGap) {
        this._videoLargeGap = -1 * gap
        Compatibility.doFixLargeGap(videoSamples, -1 * gap)
      }
    }

    const curLastSample = videoSamples.pop();
    if (videoSamples.length) {
      videoSamples[videoSamples.length - 1].duration = curLastSample.dts - videoSamples[videoSamples.length - 1].dts
    }

    if (this.videoLastSample) {
      const videoLastSample = this.videoLastSample;
      videoLastSample.duration = firstSample.dts - videoLastSample.dts;
      videoSamples.unshift(this.videoLastSample)
    }

    videoSamples.forEach((sample, idx) => {
      if (idx !== 0 && idx !== videoSamples.length - 1) {
        const pre = videoSamples[idx - 1];
        const next = videoSamples[idx + 1];
        if (sample.dts - pre.dts < 5) {
          sample.dts = (pre.dts + next.dts) / 2
          sample.pts = (pre.pts + next.pts) / 2
        }
      }
    })

    this.videoLastSample = curLastSample;

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio (first, streamChangeStart) {
    let {samples: audioSamples, meta} = this.audioTrack
    // console.log('dofixaudio')
    if (!audioSamples || !audioSamples.length) {
      return
    }
    // console.log('next audio', this.nextAudioDts)
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      const sample = audioSamples[i]
      sample.originDts = sample.dts
    }

    // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

    const samplesLen = audioSamples.length;
    const silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount)
    const iRefSampleDuration = Math.floor(meta.refSampleDuration)

    const firstSample = this._firstAudioSample

    let _firstSample = audioSamples[0]

    if (!first && (this.nextAudioDts === null && _firstSample.options.start)) {
      if (streamChangeStart) {
        streamChangeStart = _firstSample.options.start;
      }
    }

    if (!first && !streamChangeStart && this.nextAudioDts && Compatibility.detectLargeGap(this.nextAudioDts || 0, _firstSample.dts + this._audioLargeGap)) {
      // large gap 不准确，出现了非换流场景的时间戳跳变
      this._audioLargeGap = this.nextAudioDts + meta.refSampleDuration - _firstSample.dts;
    }

    // 对audioSamples按照dts做排序
    if (this._audioLargeGap !== 0) {
      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap)
    } else if (!first && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample.dts))) {
      if (streamChangeStart) {
        this.nextAudioDts = streamChangeStart // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }
      this._audioLargeGap = this.nextAudioDts - _firstSample.dts

      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap)
    }
    // step0. 首帧与video首帧间距大的问题
    if (this._firstVideoSample && first) {
      const videoFirstPts = this._firstVideoSample.originDts || this._firstVideoSample.dts
      const gap = firstSample.dts - videoFirstPts

      if (gap === this._videoLargeGap) {
        // already fixed by doFixVideo
      } else if (gap > meta.refSampleDuration && gap < (10 * meta.refSampleDuration)) {
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
        this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample
      } else if (gap < -1 * meta.refSampleDuration) {
        this._audioLargeGap = -1 * gap
        Compatibility.doFixLargeGap(audioSamples, -1 * gap)
      }
    }

    let gap
    const firstDts = audioSamples[0].dts

    if (this.nextAudioDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于1帧时进行补帧
      gap = firstDts - this.nextAudioDts
      const absGap = Math.abs(gap)

      if (gap >= iRefSampleDuration && gap < (10 * iRefSampleDuration)) {
        const silentFrameCount = Math.ceil(gap / iRefSampleDuration)

        for (let i = 0; i < silentFrameCount; i++) {
          const computed = firstDts - (i + 1) * iRefSampleDuration
          const silentSample = {
            dts: computed > this.nextAudioDts ? computed : this.nextAudioDts,
            pts: computed > this.nextAudioDts ? computed : this.nextAudioDts,
            datasize: silentFrame.byteLength,
            filtered: 0,
            data: silentFrame
          }

          this.filledAudioSamples.push({
            dts: silentSample.dts,
            size: silentSample.data.byteLength
          })
          this.audioTrack.samples.unshift(silentSample)
          _firstSample = silentSample;
        }
      } else if (absGap < meta.refSampleDuration && absGap > 0) {
        // 当差距比较小的时候将音频帧重定位
        // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
        _firstSample.dts = this.nextAudioDts
        _firstSample.pts = this.nextAudioDts
      } else if (gap < 0 && absGap < iRefSampleDuration) {
        Compatibility.doFixLargeGap(audioSamples, (-1 * gap))
      }
    }

    const unSyncDuration = meta.refSampleDuration - iRefSampleDuration
    audioSamples.forEach((sample, idx) => {
      if (idx !== 0) {
        const lastSample = audioSamples[idx - 1]
        sample.dts = sample.pts = lastSample.dts + lastSample.duration
      }
      sample.duration = iRefSampleDuration;
      this.audioUnsyncTime = caculate.fixedFloat(this.audioUnsyncTime + unSyncDuration, 2)
      if (this.audioUnsyncTime >= 1) {
        sample.duration += 1;
        this.audioUnsyncTime -= 1;
      }
    });
    const lastSample = audioSamples[audioSamples.length - 1];
    const lastDts = lastSample.dts;
    const lastDuration = lastSample.duration;
    // const lastSampleDuration = audioSamples.length >= 2 ? lastOriginDts - audioSamples[audioSamples.length - 2].originDts : meta.refSampleDuration

    this.lastAudioSamplesLen = samplesLen;
    this.nextAudioDts = lastDts + (lastDuration || iRefSampleDuration)

    this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples)
  }

  fixChangeStreamVideo (changeIdx) {
    const { samples } = this.videoTrack;
    const prevDts = changeIdx === 0 ? this.videoLastSample ? this.videoLastSample.dts : this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 100

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        }
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return false
    }

    this.emit(REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE)

    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const changeSample = samples[changeIdx]

    let streamChangeStart

    this._videoLargeGap = 0;
    this.videoLastSample = null;
    if (changeSample.options && changeSample.options.start) {
      streamChangeStart = changeSample.options.start;
    } else {
      streamChangeStart = prevDts - this.videoDtsBase
    }

    this.videoTrack.samples = samples.slice(0, changeIdx);

    this.doFixVideo(false);

    this.videoTrack.samples = samples.slice(changeIdx);

    this.doFixVideo(false, streamChangeStart);

    this.videoTrack.samples = firstPartSamples.concat(secondPartSamples)

    return true;
  }

  fixChangeStreamAudio (changeIdx) {
    const { samples, meta } = this.audioTrack;

    const prevDts = changeIdx === 0 ? this.lastAudioDts : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 1000;

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        }
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return false
    }
    this.emit(REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE)
    this._audioLargeGap = 0;
    this.nextAudioDts = null;
    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const changeSample = samples[changeIdx]

    let streamChangeStart
    if (changeSample.options && changeSample.options.start) {
      streamChangeStart = changeSample.options.start;
    } else {
      streamChangeStart = prevDts - this.audioDtsBase;
      changeSample.options.isContinue = true;
    }

    this.audioTrack.samples = firstPartSamples;

    this.doFixAudio(false);

    this.audioTrack.samples = secondPartSamples;

    this.doFixAudio(false, streamChangeStart);

    this.audioTrack.samples = firstPartSamples.concat(secondPartSamples)

    return true;
  }

  getFirstSample () {
    // 获取video和audio的首帧数据
    let {samples: videoSamples} = this.videoTrack
    let {samples: audioSamples} = this.audioTrack

    let isFirstVideoSamples = false;
    let isFirstAudioSamples = false;

    if (!this._firstVideoSample && videoSamples.length) {
      this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples)
      this.removeInvalidSamples()
      isFirstVideoSamples = true
    }

    if (!this._firstAudioSample && audioSamples.length) {
      this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples) // 寻找dts最小的帧作为首个音频帧
      this.removeInvalidSamples()
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
  fixVideoRefSampleDuration (meta, samples) {
    const allSamplesCount = this.allVideoSamplesCount;
    const firstDts = this._firstVideoSample.dts;
    const filledSamplesCount = this.filledVideoSamples.length;
    if (!Compatibility.isRefSampleDurationValid(meta.refSampleDuration)) {
      if (samples.length >= 1) {
        const lastDts = samples[samples.length - 1].dts

        const fixed = Math.floor((lastDts - firstDts) / ((allSamplesCount + filledSamplesCount) - 1)); // 将refSampleDuration重置为计算后的平均值

        if (Compatibility.isRefSampleDurationValid(fixed)) {
          meta.refSampleDuration = fixed;
        }
      }
    } else if (meta.refSampleDuration) {
      if (samples.length >= 5) {
        const lastDts = samples[samples.length - 1].dts
        const firstDts = samples[0].dts
        const durationAvg = (lastDts - firstDts) / (samples.length - 1)
        if (durationAvg > 0 && durationAvg < 1000) {
          const fixed = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
          if (Compatibility.isRefSampleDurationValid(fixed)) {
            meta.refSampleDuration = fixed;
          }
        }
      }
    }

    if (!Compatibility.isRefSampleDurationValid(meta.refSampleDuration)) {
      meta.refSampleDuration = 66;
    }
  }

  fixAudioRefSampleDuration (meta) {
    meta.refSampleDuration = caculate.fixedFloat(meta.timescale * 1024 / meta.sampleRate, isSafari ? 0 : 2);
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
    const firstAudioSample = this.audioTrack.samples[0]
    const firstVideoSample = this.videoTrack.samples[0]
    // const { _firstVideoSample, _firstAudioSample } = this

    if (firstAudioSample) {
      this.audioTrack.samples = this.audioTrack.samples.filter((sample, index) => {
        if (sample === firstAudioSample) {
          return true;
        }
        return sample.dts > firstAudioSample.dts
      })
    }

    if (firstVideoSample) {
      this.videoTrack.samples = this.videoTrack.samples.filter((sample, index) => {
        if (sample === firstVideoSample) {
          return true;
        }
        return sample.dts > firstVideoSample.dts
      })
    }
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

  static isRefSampleDurationValid (refSampleDuration) {
    return refSampleDuration && refSampleDuration > 0 && !Number.isNaN(refSampleDuration)
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

  static detectLargeGap (nextDts, firstSampleDts) {
    if (nextDts === null) {
      return;
    }
    return nextDts - firstSampleDts >= 1000 || firstSampleDts - nextDts >= 1000 // fix hls流出现大量流dts间距问题
  }

  static doFixLargeGap (samples, gap) {
    // console.log('fix large gap ', gap)
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
  static detectChangeStream (samples, isFirst) {
    let changed = false;
    let changedIdxes = [];
    for (let i = 0, len = samples.length; i < len; i++) {
      const sample = samples[i]
      if (sample.options && sample.options.meta && !(isFirst && (i === 0))) {
        changed = true
        changedIdxes.push(i)
        // break;
      }
    }

    return {
      changed,
      changedIdxes
    }
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

  get dtsBase () {
    const remuxer = this._context.getInstance('MP4_REMUXER');
    if (remuxer) {
      return remuxer._dtsBase
    }
    return 0
  }

  get audioDtsBase () {
    const remuxer = this._context.getInstance('MP4_REMUXER');
    if (remuxer && remuxer._audioDtsBase !== null) {
      return remuxer._audioDtsBase
    }

    return this.dtsBase
  }

  get videoDtsBase () {
    const remuxer = this._context.getInstance('MP4_REMUXER');
    if (remuxer && remuxer._videoDtsBase !== null) {
      return remuxer._videoDtsBase
    }

    return this.dtsBase
  }
}
export default Compatibility;
