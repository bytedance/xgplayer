import {logger} from 'xgplayer-helper-utils';
import Events from '../events';
import BaseRender from './BaseRender';
import AudioTimeRange from './AudioTimeRange';
import {initBgSilenceAudio, playSlienceAudio} from '../helper/audio-helper';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const MEDIA_ERR_DECODE = 3;

const ERROR_MSG = {
  INIT_AUDIO_ERR: 'create new AudioContext error',
  DECODE_ERR: 'audio data decode error'
};

export default class AudioRender extends BaseRender {
  constructor (config, parent) {
    super(config, parent);
    this.TAG = 'AudioRender';
    this._timeRange = new AudioTimeRange(this);
    this._lastTimeLineTime = 0; // 用于seek时记录seek位置,audioCtx重新实例化，audioCtx.currentTime从0开始
    this._sampleQueue = [];
    this._source = null;
    this._audioCanAutoplay = true;
    this._lastBuffer = null;
    this._onSourceBufferEnded = this._onSourceBufferEnded.bind(this);
    this._initAudioCtx(config.volume || 0.6);
    this._bindEvents();
  }

  get currentTime () {
    if (!this._audioCtx) return 0;
    return this._lastTimeLineTime + this._audioCtx.currentTime;
  }

  get duration () {
    return this._timeRange.duration;
  }

  get preloadTime () {
    return this.isLive ? 1 : 0;
  }

  get timescale () {
    if (!this._meta) return 1000;
    return this._meta.timescale || 1000;
  }

  get buffered () {
    return this._timeRange.buffered;
  }

  get ctxState () {
    return this._audioCtx.state;
  }

  get audioCanAutoplay () {
    return this._audioCanAutoplay;
  }

  resume () {
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      return this._audioCtx.resume();
    }
  }

  dump () {
    return this._timeRange.dump();
  }

  _assembleErr (msg) {
    let err = new Error(msg);
    err.code = MEDIA_ERR_DECODE;
    return err;
  }

  _emitTimelineEvents (e, v, d) {
    this._parent.emit(e, v, d);
  }

  _initAudioCtx (volume) {
    logger.log(this.TAG, 'init audioCtx')
    this._audioCtx = new AudioContext();
    if (!this._audioCtx) {
      logger.warn(this.TAG, 'create webaudio error!');
      // AudioRender在Timeline constructor中实例化,timeline error handler还未绑定,异步触发
      setTimeout(() => {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(ERROR_MSG.INIT_AUDIO_ERR)
        );
      });
      return;
    }
    this._gainNode = this._audioCtx.createGain();
    this._gainNode.gain.value = volume;
    this._gainNode.connect(this._audioCtx.destination);
    this._audioCanAutoplay = this._audioCtx.state === 'running';
    logger.log(this.TAG, 'webAudio state:', this._audioCtx.state);
    initBgSilenceAudio();
    this._bindAudioCtxEvent()
    return this._audioCtx.suspend();
  }

  _bindAudioCtxEvent () {
    this._onStateChange = () => {
      if (!this._audioCtx) return;
      if (this._audioCtx.state === 'running' && this._ready) {
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAYING);
      }
    };
    this._audioCtx.addEventListener('statechange', this._onStateChange);
  }

  _bindEvents () {
    super._bindEvents();

    this._parent.on(Events.TIMELINE.UPDATE_VOLUME, (v) => {
      if (!this._gainNode) return;
      this._gainNode.gain.value = isFinite(v) ? v : 1;
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.VOLUME_CHANGE);
    });

    // 点播设置duration
    this._parent.on(Events.TIMELINE.SET_VIDEO_DURATION, v => {
      this._timeRange.duration = v;
    })
  }

  _setMetadata (type, meta) {
    if (type === 'video') return;
    if (this._noAudio) return;
    logger.warn(this.TAG, 'audio set metadata', meta);
    this._meta = meta;
  }

  // receive new compressed samples
  _appendChunk (_, audioTrack) {
    if (this._noAudio || !this._meta) return;

    let {samples, meta} = audioTrack;

    if (meta && samples.length) {
      this._sampleQueue = this._sampleQueue.concat(samples);
      audioTrack.samples = [];
      try {
        this._assembleAAC();
      } catch (e) {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(`ERROR_MSG.DECODE_ERR:${e && e.message}`)
        )
      }
    }
  }

  _resetDts (dts, type) {
    if (type === 'video') return;
    this._timeRange.resetDts(dts);
  }

  _doPlay () {
    if (this._noAudio || this._parent.seeking) {
      return;
    }
    this.resume();
  }

  _doPause () {
    if (this._noAudio) {
      return;
    }
    this._audioCtx.suspend();
  }

  _reInitAudioCtx (time) {
    this._lastTimeLineTime = time;
    this._lastBuffer = null;

    // reinit,连续seek时,新建的audioCtx还没使用过的话,不再新建
    if (this._ready && this._audioCtx.currentTime) {
      let volume = this._gainNode.gain.value;
      return this._audioCtx.close().then(() => {
        this._audioCtx.removeEventListener('statechange', this._onStateChange);
        this._audioCtx = null;
        if (this._source) {
          this._source.removeEventListener('ended', this._onSourceBufferEnded);
        }
        this._source = null;
        return this._initAudioCtx(volume);
      })
    }
    return Promise.resolve();
  }

  // 点播seek
  _doSeek (time) {
    this._reInitAudioCtx(time).then(() => {
      this._getAudioBuffer(true);
    });
  }

  // 直播追帧
  _doChaseFrame ({position}) {
    let next = this._timeRange.filter(position);
    if (!next) return;
    this._reInitAudioCtx(next.start).then(() => {
      this._startRender();
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.TIMEUPDATE
      );
    });
  }

  _assembleAAC () {
    let len = this._sampleQueue.length;
    let samp0 = this._sampleQueue[0];
    let sampLast = this._sampleQueue[len - 1];
    let less = (sampLast.dts - samp0.dts) / this.timescale < this.preloadTime;

    if (len < 500 && less) {
      return;
    }

    let adtss = this._sampleQueue.map((sample) => {
      return AudioRender.getAACData(this._meta, sample);
    });

    this._sampleQueue = [];

    let chunkBuffer = AudioRender.combileData(adtss);

    this._audioCtx.decodeAudioData(
      chunkBuffer.buffer,
      (uncompress) => {
        if (!this._timeRange) return;
        const start = this._timeRange.append(
          uncompress,
          uncompress.duration,
          samp0.dts
        );

        if (!this._ready) {
          // init background Audio ele
          let canEmit = this.isLive || Math.floor(Math.abs(start - this.currentTime)) <= Math.ceil(uncompress.duration);
          if (canEmit) {
            this._ready = true;
            this.emit(Events.AUDIO.AUDIO_READY, start);
          }
        }

        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PROGRESS);
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.DURATION_CHANGE);
      },
      (e) => {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(`ERROR_MSG.DECODE_ERR:${e && e.message}`)
        );
      }
    );
  }

  _onSourceBufferEnded () {
    if (logger.long) {
      logger.log(
        this.TAG,
        `source play end! currentTime:${this.currentTime} , duration:${this.duration}`
      );
    }
    this._startRender();
  }

  // 不精准seek,调整seek点到当前buffer开始位置
  // 两个来源: 1. seek的位置存在buffer,_getAudioBuffer中直接执行
  //          2. seek位置无buffer，等待下载,decodeAudioData()执行完后 监听 AUDIO_READY
  _ajustSeekTime (time) {
    let buffer = this._timeRange.getBuffer(time, 0);
    if (buffer) {
      logger.log(this.TAG, `ajust seek time to:`, buffer.start);
      this._lastTimeLineTime = buffer.start;
      this._parent.emit(Events.TIMELINE.ADJUST_SEEK_TIME, buffer.start)
    }
  }

  _getAudioBuffer (inSeeking) {
    let buffer = this._timeRange.getBuffer(this._lastBuffer ? this._lastBuffer.end : this.currentTime, 0);
    if (!buffer) {
      // check end  for vod
      if (!this.isLive && (this.currentTime - this.duration > -1)) {
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.ENDED)
        return;
      }
      this._ready = false;
      this._audioCtx.suspend();
      this.emit(Events.AUDIO.AUDIO_WAITING);
      if (inSeeking) {
        if (!this._onAudioReady) {
          this._onAudioReady = (time) => {
            this._ajustSeekTime(time)
          };
        }
        this.removeListener(Events.AUDIO.AUDIO_READY, this._onAudioReady)
        this.once(Events.AUDIO.AUDIO_READY, this._onAudioReady)
      }
      return;
    }
    if (inSeeking) {
      this._ajustSeekTime(buffer.start)
      this.emit(Events.AUDIO.AUDIO_READY);
      return;
    }
    return buffer;
  }

  _startRender () {
    if (this._noAudio) return;

    let buffer = this._getAudioBuffer();

    if (!buffer) return;
    if (this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
      playSlienceAudio();
    }
    this._lastBuffer = buffer;
    this._source = null;

    let _source = this._audioCtx.createBufferSource();
    _source.buffer = buffer.source;
    _source.loop = false;
    // 保存引用,移动浏览器下,对source的回收机制有差异，不保存引用会提前回收,导致ended事件不触发
    this._source = _source;
    _source.addEventListener('ended', this._onSourceBufferEnded);
    _source.connect(this._gainNode);
    _source.start();

    if (buffer.startDts) {
      this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, buffer.startDts);
    }
  }

  _destroy () {
    logger.log(this.TAG, 'destroy audio...');
    if (this._source) {
      this._source.removeEventListener('ended', this._onSourceBufferEnded);
    }
    this._audioCtx.close();
    this._audioCtx = null;
    this._sampleQueue = null;
    this._timeRange = null;
    this._parent = null;
    this.removeAllListeners();
  }

  static getAACData (meta, sample) {
    let buffer = new Uint8Array(sample.data.byteLength + 7);
    let adts = AudioRender.getAdts(meta, sample.data);
    buffer.set(adts);
    buffer.set(sample.data, 7);
    return buffer;
  }

  static combileData (samples) {
    // get length
    let length = 0;
    for (let i = 0, k = samples.length; i < k; i++) {
      length += samples[i].byteLength;
    }

    let ret = new Uint8Array(length);
    let offset = 0;
    // combile data;
    for (let i = 0, k = samples.length; i < k; i++) {
      ret.set(samples[i], offset);
      offset += samples[i].byteLength;
    }
    return ret;
  }

  static getAdts (meta, data) {
    let adts = new Uint8Array(7);

    // 设置同步位 0xfff 12bit
    adts[0] = 0xff;
    adts[1] = 0xf0;

    // Object data (没什么人用MPEG-2了，HLS和FLV也全是MPEG-4，这里直接0)  1bit
    // Level always 00 2bit
    // CRC always 1 1bit
    adts[1] = adts[1] | 0x01;

    // profile 2bit
    adts[2] = 0xc0 & ((meta.originObjectType - 1) << 6);

    // sampleFrequencyIndex
    adts[2] = adts[2] | (0x3c & (meta.sampleRateIndex << 2));

    // private bit 0 1bit
    // chanel configuration 3bit
    adts[2] = adts[2] | (0x01 & (meta.channelCount >> 2));
    adts[3] = 0xc0 & (meta.channelCount << 6);

    // original_copy: 0 1bit
    // home: 0 1bit

    // adts_variable_header()
    // copyrighted_id_bit 0 1bit
    // copyrighted_id_start 0 1bit

    // aac_frame_length 13bit;
    let aacframelength = data.byteLength + 7;

    adts[3] = adts[3] | (0x03 & (aacframelength >> 11));
    adts[4] = 0xff & (aacframelength >> 3);
    adts[5] = 0xe0 & (aacframelength << 5);

    // adts_buffer_fullness 0x7ff 11bit
    adts[5] = adts[5] | 0x1f;
    adts[6] = 0xfc;

    // number_of_raw_data_blocks_in_frame 0 2bit;
    return adts;
  }
}
