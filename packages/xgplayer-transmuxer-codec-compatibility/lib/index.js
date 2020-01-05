'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerCodecAac = require('xgplayer-transmuxer-codec-aac');

var _xgplayerTransmuxerCodecAac2 = _interopRequireDefault(_xgplayerTransmuxerCodecAac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REMUX_EVENTS = _xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS;

var Compatibility = function () {
  function Compatibility() {
    _classCallCheck(this, Compatibility);

    this.nextAudioDts = 0; // 模拟下一段音频数据的dts
    this.nextVideoDts = 0; // 模拟下一段视频数据的dts

    this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

    this.lastVideoDts = undefined; // 上一段音频数据的长度
    this.lastAudioDts = undefined; // 上一段视频数据的长度

    this.allAudioSamplesCount = 0; // 音频总数据量(原始帧)
    this.allVideoSamplesCount = 0; // 视频总数据量(原始帧)

    this._firstAudioSample = null;
    this._firstVideoSample = null;

    this.filledAudioSamples = []; // 补充音频帧（）
    this.filledVideoSamples = []; // 补充视频帧（）

    this.videoLastSample = null;
    this.audioLastSample = null; // stash last sample for duration compat

    this._videoLargeGap = 0;
    this._audioLargeGap = 0;
  }

  _createClass(Compatibility, [{
    key: 'init',
    value: function init() {
      this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this));
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.nextAudioDts = null; // 估算下一段音频数据的dts
      this.nextVideoDts = null; // 估算下一段视频数据的dts

      this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
      this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

      this.lastVideoDts = undefined; // 上一段音频数据的长度
      this.lastAudioDts = undefined; // 上一段视频数据的长度

      // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
      // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

      // this._firstAudioSample = null
      // this._firstVideoSample = null
      // this._firstAudioSample = null
      // this._firstVideoSample = null
      this.videoLastSample = null;
      this.audioLastSample = null;

      this.filledAudioSamples = []; // 补充音频帧（）
      this.filledVideoSamples = []; // 补充视频帧（）
    }
  }, {
    key: 'doFix',
    value: function doFix() {
      var _getFirstSample = this.getFirstSample(),
          isFirstAudioSamples = _getFirstSample.isFirstAudioSamples,
          isFirstVideoSamples = _getFirstSample.isFirstVideoSamples;

      this.recordSamplesCount();

      if (this._firstVideoSample) {
        this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples);
      }
      if (this._firstAudioSample) {
        this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);
      }

      var _Compatibility$detact = Compatibility.detactChangeStream(this.videoTrack.samples),
          videoChanged = _Compatibility$detact.changed,
          videoChangedIdx = _Compatibility$detact.changedIdx;

      if (videoChanged && !isFirstAudioSamples) {
        this.fixChangeStreamVideo(videoChangedIdx);
      } else {
        this.doFixVideo(isFirstVideoSamples);
      }

      var _Compatibility$detact2 = Compatibility.detactChangeStream(this.audioTrack.samples),
          audioChanged = _Compatibility$detact2.changed,
          audioChangedIdx = _Compatibility$detact2.changedIdx;

      if (audioChanged) {
        this.fixChangeStreamAudio(audioChangedIdx);
      } else {
        this.doFixAudio(isFirstAudioSamples);
      }

      this.removeInvalidSamples();
    }
  }, {
    key: 'doFixVideo',
    value: function doFixVideo(first, streamChangeStart) {
      var _videoTrack = this.videoTrack,
          videoSamples = _videoTrack.samples,
          meta = _videoTrack.meta;

      // console.log('next video', this.nextVideoDts)

      for (var i = 0, len = videoSamples.length; i < len; i++) {
        var sample = videoSamples[i];
        sample.originDts = sample.dts;
      }

      if (meta.frameRate && meta.frameRate.fixed === false) {
        return;
      }

      if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
        return;
      }

      // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

      var firstSample = videoSamples[0];

      // step0.修复hls流出现巨大gap，需要强制重定位的问题
      if (this._videoLargeGap !== 0) {
        Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
      } else if (firstSample.dts !== this._firstVideoSample.dts && (streamChangeStart || this.videoLastSample && Compatibility.detectLargeGap(this.videoLastSample.dts, firstSample))) {
        if (streamChangeStart) {
          this.nextVideoDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
        } else {
          this.nextVideoDts = this.videoLastSample.dts;
        }

        this._videoLargeGap = this.nextVideoDts - firstSample.dts;
        this._audioLargeGap = Math.abs(this._audioLargeGap - this._videoLargeGap) > 1000 ? this._videoLargeGap : this._audioLargeGap;
        Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
      }

      // step1. 修复与audio首帧差距太大的问题
      if (first && this._firstAudioSample) {
        var videoFirstDts = this._firstVideoSample.originDts;
        var audioFirstDts = this._firstAudioSample.originDts || this._firstAudioSample.dts;
        var gap = videoFirstDts - audioFirstDts;
        if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
          var fillCount = Math.floor(gap / meta.refSampleDuration);

          for (var _i = 0; _i < fillCount; _i++) {
            var clonedFirstSample = Object.assign({}, firstSample); // 视频头部帧缺失需要复制第一帧
            // 重新计算sample的dts和pts
            clonedFirstSample.dts = videoFirstDts - (_i + 1) * meta.refSampleDuration;
            clonedFirstSample.pts = clonedFirstSample.dts + clonedFirstSample.cts;

            videoSamples.unshift(clonedFirstSample);

            this.filledVideoSamples.push({
              dts: clonedFirstSample.dts,
              size: clonedFirstSample.data.byteLength
            });
          }
          this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
        } else if (gap < -2 * meta.refSampleDuration && !this._videoLargeGap) {
          this._videoLargeGap = -1 * gap;
          Compatibility.doFixLargeGap(videoSamples, -1 * gap);
        }
      }

      var curLastSample = videoSamples.pop();
      if (videoSamples.length) {
        videoSamples[videoSamples.length - 1].duration = curLastSample.dts - videoSamples[videoSamples.length - 1].dts;
      }

      if (this.videoLastSample) {
        var videoLastSample = this.videoLastSample;
        videoLastSample.duration = firstSample.dts - videoLastSample.dts;
        videoSamples.unshift(this.videoLastSample);
      }

      this.videoLastSample = curLastSample;

      this.videoTrack.samples = videoSamples;
    }
  }, {
    key: 'doFixAudio',
    value: function doFixAudio(first, streamChangeStart) {
      var _audioTrack = this.audioTrack,
          audioSamples = _audioTrack.samples,
          meta = _audioTrack.meta;


      if (!audioSamples || !audioSamples.length) {
        return;
      }

      // console.log('next audio', this.nextAudioDts)
      for (var i = 0, len = audioSamples.length; i < len; i++) {
        var sample = audioSamples[i];
        sample.originDts = sample.dts;
      }

      // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

      var samplesLen = audioSamples.length;
      var silentFrame = _xgplayerTransmuxerCodecAac2.default.getSilentFrame(meta.codec, meta.channelCount);

      var firstSample = this._firstAudioSample;

      var _firstSample = audioSamples[0];
      // 对audioSamples按照dts做排序
      // audioSamples = Compatibility.sortAudioSamples(audioSamples)
      if (this._audioLargeGap !== 0) {
        Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
      } else if (_firstSample.dts !== this._firstAudioSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample))) {
        if (streamChangeStart) {
          this.nextAudioDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
        }
        this._audioLargeGap = this.nextAudioDts - _firstSample.dts;
        this._videoLargeGap = Math.abs(this._audioLargeGap - this._videoLargeGap) > 1000 ? this._audioLargeGap : this._videoLargeGap;

        Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
      }
      // step0. 首帧与video首帧间距大的问题
      if (this._firstVideoSample && first) {
        var videoFirstPts = this._firstVideoSample.originDts || this._firstVideoSample.dts;
        var _gap = firstSample.dts - videoFirstPts;
        if (_gap > meta.refSampleDuration && _gap < 10 * meta.refSampleDuration) {
          var silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration);

          for (var _i2 = 0; _i2 < silentSampleCount; _i2++) {
            var silentSample = {
              data: silentFrame,
              datasize: silentFrame.byteLength,
              dts: firstSample.dts - (_i2 + 1) * meta.refSampleDuration,
              filtered: 0
            };

            audioSamples.unshift(silentSample);

            this.filledAudioSamples.push({
              dts: silentSample.dts,
              size: silentSample.data.byteLength
            });
          }
          this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
        } else if (_gap < -1 * meta.refSampleDuration) {
          this._audioLargeGap = -1 * _gap;
          Compatibility.doFixLargeGap(audioSamples, -1 * _gap);
        }
      }

      var gap = void 0;
      var firstDts = audioSamples[0].dts;

      if (this.nextAudioDts) {
        // step1. 处理samples段之间的丢帧情况
        // 当发现duration差距大于1帧时进行补帧
        gap = firstDts - this.nextAudioDts;
        var absGap = Math.abs(gap);

        if (absGap > meta.refSampleDuration && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
          meta.refSampleDurationFixed = undefined;
        }

        if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
          if (samplesLen === 1 && this.lastAudioSamplesLen === 1) {
            // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
            meta.refSampleDurationFixed = meta.refSampleDurationFixed !== undefined ? meta.refSampleDurationFixed + gap : meta.refSampleDuration + gap;
          } else {
            var silentFrameCount = Math.floor(gap / meta.refSampleDuration);

            for (var _i3 = 0; _i3 < silentFrameCount; _i3++) {
              var computed = firstDts - (_i3 + 1) * meta.refSampleDuration;
              var _silentSample = Object.assign({}, audioSamples[0], {
                dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
              });

              this.filledAudioSamples.push({
                dts: _silentSample.dts,
                size: _silentSample.data.byteLength
              });
              this.audioTrack.samples.unshift(_silentSample);
            }
          }
        } else if (absGap <= meta.refSampleDuration && absGap > 0) {
          // 当差距比较小的时候将音频帧重定位
          // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
          audioSamples[0].dts = this.nextAudioDts;
          audioSamples[0].pts = this.nextAudioDts;
        } else if (gap < 0 && absGap <= meta.refSampleDuration) {
          Compatibility.doFixLargeGap(audioSamples, -1 * gap);
        }
      }
      var lastOriginDts = audioSamples[audioSamples.length - 1].originDts;
      var lastDts = audioSamples[audioSamples.length - 1].dts;
      var lastSampleDuration = audioSamples.length >= 2 ? lastOriginDts - audioSamples[audioSamples.length - 2].originDts : meta.refSampleDuration;

      this.lastAudioSamplesLen = samplesLen;
      this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration;
      this.lastAudioDts = lastDts;

      audioSamples[audioSamples.length - 1].duration = lastSampleDuration;

      // step3. 修复samples段内部的dts异常问题
      for (var _i4 = 0, _len = audioSamples.length; _i4 < _len; _i4++) {
        var current = audioSamples[_i4];
        var next = audioSamples[_i4 + 1];

        if (!next) {
          break;
        }

        var duration = next.dts - current.dts;
        audioSamples[_i4].duration = duration;
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
      this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples);
    }
  }, {
    key: 'fixChangeStreamVideo',
    value: function fixChangeStreamVideo(changeIdx) {
      var _videoTrack2 = this.videoTrack,
          samples = _videoTrack2.samples,
          meta = _videoTrack2.meta;

      var prevDts = changeIdx === 0 ? this.videoLastSample ? this.videoLastSample.dts : this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
      var curDts = samples[changeIdx].dts;
      var isContinue = Math.abs(prevDts - curDts) <= 2 * 1000;

      if (isContinue) {
        if (!samples[changeIdx].options) {
          samples[changeIdx].options = {
            isContinue: true
          };
        } else {
          samples[changeIdx].options.isContinue = true;
        }
        return this.doFixVideo(false);
      }

      this.emit(REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE);
      this._videoLargeGap = 0;
      var firstPartSamples = samples.slice(0, changeIdx);
      var secondPartSamples = samples.slice(changeIdx);
      var firstSample = samples[0];

      var streamChangeStart = void 0;

      if (firstSample.options && firstSample.options.start) {
        streamChangeStart = firstSample.options && firstSample.options.start ? firstSample.options.start : null;
      } else if (this.videoLastSample) {
        streamChangeStart = this.videoLastSample.dts - this.dtsBase + meta.refSampleDuration;
      }

      this.videoTrack.samples = samples.slice(0, changeIdx);

      this.doFixVideo(false);

      this.videoTrack.samples = samples.slice(changeIdx);

      this.doFixVideo(false, streamChangeStart);

      this.videoTrack.samples = firstPartSamples.concat(secondPartSamples);
    }
  }, {
    key: 'fixChangeStreamAudio',
    value: function fixChangeStreamAudio(changeIdx) {
      var _audioTrack2 = this.audioTrack,
          samples = _audioTrack2.samples,
          meta = _audioTrack2.meta;


      var prevDts = changeIdx === 0 ? this.lastAudioDts : samples[changeIdx - 1].dts;
      var curDts = samples[changeIdx].dts;
      var isContinue = Math.abs(prevDts - curDts) <= 2 * 1000;

      if (isContinue) {
        if (!samples[changeIdx].options) {
          samples[changeIdx].options = {
            isContinue: true
          };
        } else {
          samples[changeIdx].options.isContinue = true;
        }
        return this.doFixAudio(false);
      }
      this.emit(REMUX_EVENTS.DETECT_CHANGE_STREAM_DISCONTINUE);
      this._audioLargeGap = 0;

      var firstPartSamples = samples.slice(0, changeIdx);
      var secondPartSamples = samples.slice(changeIdx);
      var firstSample = samples[0];

      var streamChangeStart = void 0;
      if (firstSample.options && firstSample.options.start) {
        streamChangeStart = firstSample.options && firstSample.options.start ? firstSample.options.start : null;
      } else {
        streamChangeStart = this.lastAudioDts - this.dtsBase + meta.refSampleDuration;
      }

      this.audioTrack.samples = firstPartSamples;

      this.doFixAudio(false);

      this.audioTrack.samples = secondPartSamples;

      this.doFixAudio(false, streamChangeStart);

      this.audioTrack.samples = firstPartSamples.concat(secondPartSamples);
    }
  }, {
    key: 'getFirstSample',
    value: function getFirstSample() {
      // 获取video和audio的首帧数据
      var videoSamples = this.videoTrack.samples;
      var audioSamples = this.audioTrack.samples;


      var isFirstVideoSamples = false;
      var isFirstAudioSamples = false;

      if (!this._firstVideoSample && videoSamples.length) {
        this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples);
        this.removeInvalidSamples();
        isFirstVideoSamples = true;
      }

      if (!this._firstAudioSample && audioSamples.length) {
        this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples); // 寻找dts最小的帧作为首个音频帧
        this.removeInvalidSamples();
        isFirstAudioSamples = true;
      }

      return {
        isFirstVideoSamples: isFirstVideoSamples,
        isFirstAudioSamples: isFirstAudioSamples
      };
    }

    /**
     * 在没有refSampleDuration的问题流中，
     */

  }, {
    key: 'fixRefSampleDuration',
    value: function fixRefSampleDuration(meta, samples) {
      var isVideo = meta.type === 'video';
      var allSamplesCount = isVideo ? this.allVideoSamplesCount : this.allAudioSamplesCount;
      var firstDts = isVideo ? this._firstVideoSample.dts : this._firstAudioSample.dts;
      var filledSamplesCount = isVideo ? this.filledVideoSamples.length : this.filledAudioSamples.length;

      if (!meta.refSampleDuration || meta.refSampleDuration <= 0 || Number.isNaN(meta.refSampleDuration)) {
        if (samples.length >= 1) {
          var lastDts = samples[samples.length - 1].dts;

          meta.refSampleDuration = Math.floor((lastDts - firstDts) / (allSamplesCount + filledSamplesCount - 1)); // 将refSampleDuration重置为计算后的平均值
        }
      } else if (meta.refSampleDuration) {
        if (samples.length >= 5) {
          var _lastDts = samples[samples.length - 1].dts;
          var _firstDts = samples[0].dts;
          var durationAvg = (_lastDts - _firstDts) / (samples.length - 1);
          if (durationAvg > 0 && durationAvg < 1000) {
            meta.refSampleDuration = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
          }
        }
      }
    }

    /**
     * 记录截止目前一共播放了多少帧
     */

  }, {
    key: 'recordSamplesCount',
    value: function recordSamplesCount() {
      var audioTrack = this.audioTrack,
          videoTrack = this.videoTrack;


      this.allAudioSamplesCount += audioTrack.samples.length;
      this.allVideoSamplesCount += videoTrack.samples.length;
    }

    /**
     * 去除不合法的帧（倒退、重复帧）
     */

  }, {
    key: 'removeInvalidSamples',
    value: function removeInvalidSamples() {
      var firstAudioSample = this.audioTrack.samples[0];
      var firstVideoSample = this.videoTrack.samples[0];
      // const { _firstVideoSample, _firstAudioSample } = this

      if (firstAudioSample) {
        this.audioTrack.samples = this.audioTrack.samples.filter(function (sample, index) {
          if (sample === firstAudioSample) {
            return true;
          }
          return sample.dts > firstAudioSample.dts;
        });
      }

      if (firstVideoSample) {
        this.videoTrack.samples = this.videoTrack.samples.filter(function (sample, index) {
          if (sample === firstVideoSample) {
            return true;
          }
          return sample.dts > firstVideoSample.dts;
        });
      }
    }
  }, {
    key: 'getStreamChangeStart',
    value: function getStreamChangeStart(sample) {
      if (sample.options && sample.options.start) {
        return sample.options.start - this.dtsBase;
      }
      return Infinity;
    }
  }, {
    key: 'tracks',
    get: function get() {
      return this._context.getInstance('TRACKS');
    }
  }, {
    key: 'audioTrack',
    get: function get() {
      if (this.tracks && this.tracks.audioTrack) {
        return this.tracks.audioTrack;
      }
      return {
        samples: [],
        meta: {}
      };
    }
  }, {
    key: 'videoTrack',
    get: function get() {
      if (this.tracks && this.tracks.videoTrack) {
        return this.tracks.videoTrack;
      }
      return {
        samples: [],
        meta: {}
      };
    }
  }, {
    key: 'dtsBase',
    get: function get() {
      var remuxer = this._context.getInstance('MP4_REMUXER');
      if (remuxer) {
        return remuxer._dtsBase;
      }
      return 0;
    }
  }], [{
    key: 'sortAudioSamples',
    value: function sortAudioSamples(samples) {
      if (samples.length === 1) {
        return samples;
      }

      return samples.sort(function (a, b) {
        return a.dts - b.dts;
      });
    }

    /**
     * 寻找dts最小的sample
     * @param samples
     */

  }, {
    key: 'findFirstAudioSample',
    value: function findFirstAudioSample(samples) {
      if (!samples || samples.length === 0) {
        return null;
      }

      return Compatibility.sortAudioSamples(samples)[0];
    }
  }, {
    key: 'findFirstVideoSample',
    value: function findFirstVideoSample(samples) {
      if (!samples.length) {
        return null;
      }

      var sorted = samples.sort(function (a, b) {
        return a.dts - b.dts;
      });

      for (var i = 0, len = sorted.length; i < len; i++) {
        if (sorted[i].isKeyframe) {
          return sorted[i];
        }
      }
    }
  }, {
    key: 'detectLargeGap',
    value: function detectLargeGap(nextDts, firstSample) {
      if (nextDts === null) {
        return;
      }
      var curDts = firstSample.dts || 0;
      var cond1 = nextDts - curDts >= 1000 || curDts - nextDts >= 1000; // fix hls流出现大量流dts间距问题
      var cond2 = firstSample.options && firstSample.options.discontinue;

      return cond1 || cond2;
    }
  }, {
    key: 'doFixLargeGap',
    value: function doFixLargeGap(samples, gap) {
      // console.log('fix large gap ', gap)
      for (var i = 0, len = samples.length; i < len; i++) {
        var sample = samples[i];
        sample.dts += gap;
        if (sample.pts) {
          sample.pts += gap;
        }
      }
    }

    /**
     * 中途换流
     */

  }, {
    key: 'detactChangeStream',
    value: function detactChangeStream(samples) {
      var changed = false;
      var changedIdx = -1;
      for (var i = 0, len = samples.length; i < len; i++) {
        if (samples[i].options && samples[i].options.meta) {
          changed = true;
          changedIdx = i;
          break;
        }
      }

      return {
        changed: changed,
        changedIdx: changedIdx
      };
    }
  }]);

  return Compatibility;
}();

exports.default = Compatibility;