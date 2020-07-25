import EventEmitter from 'events';
import {logger} from 'xgplayer-helper-utils';
import Events from '../events';
import AudioTimeRange from './AudioTimeRange';
import {initBgSilenceAudio, playSlienceAudio} from '../helper/audio-helper';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const MEDIA_ERR_DECODE = 3;

const ERROR_MSG = {
  INIT_AUDIO_ERR: 'create new AudioContext error',
  DECODE_ERR: 'audio data decode error'
};

export default class AudioRender extends EventEmitter {
  constructor (config, parent) {
    super();
    this.TAG = 'AudioRender';
    this._config = config;
    this._parent = parent;
    this._timeRange = new AudioTimeRange();
    this._sampleQueue = [];
    this._ready = false;
    this._meta = null;
    this._noAudio = false;
    this._source = null;
    this._onSourceBufferEnded = this._onSourceBufferEnded.bind(this);
    this._initAudioCtx(config.volume || 0.6);
    this._bindEvents();
  }

  get currentTime () {
    if (!this._audioCtx) return 0;
    return this._audioCtx.currentTime;
  }

  get duration () {
    return this._timeRange.duration;
  }

  get preloadTime () {
    return 2;
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

  resume () {
    return this._audioCtx.resume();
  }

  _assembleErr (msg) {
    let err = new Error(msg);
    err.code = MEDIA_ERR_DECODE;
    return err;
  }

  _initAudioCtx (volume) {
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
    this._audioCtx.suspend();
    initBgSilenceAudio();
  }

  _emitTimelineEvents (e, v, d) {
    this._parent.emit(e, v, d);
  }

  _bindEvents () {
    this._audioCtx.addEventListener('statechange', () => {
      if (!this._audioCtx) return;
      if (this._audioCtx.state === 'running' && this._ready) {
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAYING);
      }
    });

    this._parent.on(Events.TIMELINE.SET_METADATA, (type, meta) => {
      if (type === 'video') return;
      if (this._noAudio) return;
      logger.warn(this.TAG, 'audio set metadata');
      this._meta = meta;
    });

    this._parent.on(
      Events.TIMELINE.APPEND_CHUNKS,
      this._appendChunk.bind(this)
    );

    this._parent.on(Events.TIMELINE.START_RENDER, this._startRender.bind(this));

    this._parent.on(Events.TIMELINE.DO_PAUSE, () => {
      this._audioCtx.suspend();
    });

    this._parent.on(Events.TIMELINE.UPDATE_VOLUME, (v) => {
      if (!this._gainNode) return;
      this._gainNode.gain.value = v;
      this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.VOLUME_CHANGE);
    });

    // this._parent.on(Events.TIMELINE.UPDATE_PRELOAD_TIME, (v) => {
    //   this._config.preloadTime = v;
    // });

    this._parent.on(Events.TIMELINE.DESTROY, () => {
      this._destroy();
    });

    this._parent.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true;
    });
  }

  // receive new compressed samples
  _appendChunk (_, audioTrack) {
    if (this._noAudio || !this._meta) return;

    let {samples, meta} = audioTrack;

    if (meta && samples.length) {
      this._sampleQueue = this._sampleQueue.concat(samples);
      audioTrack.samples = [];
      this._assembleAAC();
    }
  }

  _checkMetaChange (sampleQueue, len) {
    let index = -1;
    for (let i = 0; i < len; i++) {
      let op = sampleQueue[i].options;
      if (op && op.meta) {
        index = i;
        logger.warn(
          this.TAG,
          `detect metadata! index=${i} ,dts=${sampleQueue[i].dts}`
        );
        break;
      }
    }
    return index;
  }

  _assembleAAC () {
    let len = this._sampleQueue.length;
    let samp0 = this._sampleQueue[0];
    let sampLast = this._sampleQueue[len - 1];
    let metaChangeIndex = this._checkMetaChange(this._sampleQueue, len);

    if (metaChangeIndex === -1) {
      if ((sampLast.dts - samp0.dts) / this.timescale < this.preloadTime) {
        return;
      }
    }

    let toDecode;

    if (metaChangeIndex === -1) {
      toDecode = this._sampleQueue;
      this._sampleQueue = [];
    } else {
      // 采样队列中间换流,前后部分分开
      toDecode = this._sampleQueue.splice(0, metaChangeIndex || len);
    }

    if (!toDecode.length) return;

    let adtss = toDecode.map((sample, index) => {
      if (index === metaChangeIndex) {
        this._meta = sample.options.meta;
      }
      return AudioRender.getAACData(this._meta, sample);
    });

    let chunkBuffer = AudioRender.combileData(adtss);

    this._audioCtx.decodeAudioData(
      chunkBuffer.buffer,
      (uncompress) => {
        let _source = this._audioCtx.createBufferSource();
        _source.buffer = uncompress;
        _source.loop = false;
        this._timeRange.append(
          _source,
          uncompress.duration,
          metaChangeIndex === -1 ? samp0.dts : 0
        );

        if (!this._ready) {
          // init background Audio ele
          this._ready = true;
          this.emit(Events.AUDIO.AUDIO_READY);
        }
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.DURATION_CHANGE);
      },
      () => {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(ERROR_MSG.DECODE_ERR)
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

  _startRender () {
    if (this._noAudio) return;

    if (this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
      playSlienceAudio();
    }
    let buffer = this._timeRange.shift();
    if (!buffer) {
      this._ready = false;
      this._audioCtx.suspend();
      this.emit(Events.AUDIO.AUDIO_WAITING);
      return;
    }

    this._source = null;

    let _source = buffer.source;
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
    this._audioCtx.close();
    this._audioCtx = null;
    this._sampleQueue = null;
    this._timeRange = null;
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
