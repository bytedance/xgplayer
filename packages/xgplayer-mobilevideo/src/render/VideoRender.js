import EventEmitter from 'events';
import HevcWorker from 'worker!../decoder/hevc-worker.js';
import AvcWorker from 'worker!../decoder/worker.js';
import { logger } from 'xgplayer-helper-utils';
import VideoTimeRange from './VideoTimeRange';
import FrameRender from './FrameRender';
import DecodeEstimate from './DecodeEstimate';
import TickTimer from '../helper/TickTimer';
import Events from '../events';
import {
  H264_DECODER_URL,
  H265_DECODER_URL,
  ASM_H264_DECODER_URL,
  ASM_H265_DECODER_URL
} from '../config';

const HAVE_NOTHING = 0;
const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;
const HAVE_ENOUGH_DATA = 4;

const MEDIA_ERR_DECODE = 3;

export default class VideoRender extends EventEmitter {
  constructor (config, parent) {
    super();
    this.TAG = 'VideoRender';
    this._config = config;
    this._parent = parent;
    this._timeRange = new VideoTimeRange();
    this._decodeEstimate = new DecodeEstimate(this);
    this._frameQueue = []; // the queue of uncompressed frame
    this._canvas = config.canvas || document.createElement('canvas');
    this._meta = null;
    this._decoder = null; //  decoder worker instance
    this._frameRender = null; // FrameRender instance
    this._ready = false; // 初始解码ready,可播
    this._noAudio = false;
    this._wasmReady = false;
    this._degrade = !window.WebAssembly;
    this._avccpushed = false;
    this._lastTimeupdate = 0;
    this._inDecoding = false;
    this._lastDecodingDts = 0;
    this._startRender = this._startRender.bind(this);
    this._render = this._render.bind(this);
    this._tickTimer = new TickTimer(this._render);
    this._initCanvas();
    this._bindEvents();
  }

  get canvas () {
    return this._canvas;
  }

  get isHevc () {
    return (this._meta || {}).codec === 'hev1.1.6.L93.B0';
  }

  get timescale () {
    if (!this._meta) return 1000;
    return this._meta.timescale || 1000;
  }

  get fps () {
    return (
      (this._meta && this._meta.frameRate && this._meta.frameRate.fps) || this._decodeEstimate.fps || 24
    );
  }

  get decodeFps () {
    return this._decodeEstimate.decodeFps;
  }

  get decodeCost () {
    return this._decodeEstimate.decodeCost;
  }

  get bitrate () {
    return this._timeRange.bitrate;
  }

  set bitrate (v) {
    this._timeRange.bitrate = v;
  }

  get duration () {
    return this._timeRange.duartion;
  }

  get buffered () {
    return this._timeRange.buffered;
  }

  get interval () {
    return Math.floor(1000 / this.fps);
  }

  // video first frame dts
  get baseDts () {
    return this._timeRange.baseDts;
  }

  // noAudio时使用
  get currentTime () {
    return (
      this._timeRange.lastDuration +
      (this.preciseVideoDts - this.baseDts) / 1000
    );
  }

  get timelinePosition () {
    return this._parent.timelinePosition;
  }

  set lastTimelinePosition (ts) {
    this._lastTimelinePosition = ts;
  }

  // the startTime on timeline of the buffer audioCtx current playing
  // noAudio: the time record by perforamce.now() when play start or restart after waiting or stream changed
  get lastTimelinePosition () {
    return this._lastTimelinePosition || 0;
  }

  set audioSyncDts (dts) {
    this._audioDts = dts;
  }

  // the first sample's dts of the buffer audioCtx current playing
  get audioSyncDts () {
    return this._audioDts || this.baseDts;
  }

  // the precise video dts sync to timeline time
  get preciseVideoDts () {
    return (
      this.audioSyncDts +
      (this.timelinePosition - this.lastTimelinePosition) * 1000
    );
  }

  get readyState () {
    let len = this._frameQueue && this._frameQueue.length;
    if (!len) return HAVE_NOTHING;
    if (len >= 8) return HAVE_ENOUGH_DATA;
    if (len >= 4) return HAVE_FUTURE_DATA;
    if (len >= 2) return HAVE_CURRENT_DATA;
    return HAVE_METADATA;
  }

  getDtsOfTime (time) {
    return this._timeRange.getDtsOfTime(time);
  }

  updateReady () {
    this._whenReady();
  }

  _assembleErr (msg) {
    let err = new Error(msg);
    err.code = MEDIA_ERR_DECODE;
    return err;
  }

  _emitTimelineEvents (e, v, d) {
    this._parent.emit(e, v, d);
  }

  _initCanvas () {
    this._canvas.style.maxWidth = '100%';
    this._canvas.style.maxHeight = '100%';
    this._canvas.style.top = 0;
    this._canvas.style.bottom = 0;
    this._canvas.style.left = 0;
    this._canvas.style.right = 0;
    this._canvas.style.margin = 'auto';
    this._canvas.style.position = 'absolute';
  }

  _bindEvents () {
    let waitingTimer;
    this._parent.on(Events.TIMELINE.SET_METADATA, (type, meta) => {
      if (type === 'audio') return;
      logger.warn(this.TAG, 'video set metadata');
      this._setMetadata(meta);
    });

    this._parent.on(
      Events.TIMELINE.APPEND_CHUNKS,
      this._appendChunk.bind(this)
    );

    this._parent.on(Events.TIMELINE.START_RENDER, this._startRender);

    // 同步时机
    // 1. 音频一小段buffer起播时
    // 2. 对noAudio的场景 1. 视频变流时,dts发生变化 2. 卡顿waiting后,_parent.timelinePosition已不准确
    this._parent.on(Events.TIMELINE.SYNC_DTS, (dts) => {
      let nextFrame = this._frameQueue[0];
      this.lastTimelinePosition = this.timelinePosition;
      if (this._noAudio) {
        dts = dts || (nextFrame && nextFrame.info.dts) || 0;
      }
      this.audioSyncDts = dts;
      if (logger.long) {
        logger.log(
          this.TAG,
          'audio current buffer play finish,dts=',
          dts,
          'currentTime:',
          this._parent.currentTime,
          'next video frame dts:',
          nextFrame && nextFrame.info.dts
        );
      }

      // 1. 换流 音频播完,视频还存在几帧之前的流没播完时
      // 2. 暂时的 a > v
      let unSync = false;
      while (nextFrame) {
        let delta = nextFrame.info.dts - dts;
        if (delta > 10000 || delta < -100) {
          logger.warn(this.TAG, 'detect a-v sync problem,delete nextFrame');
          this._frameQueue.shift();
          nextFrame = this._frameQueue[0];
          unSync = true;
          continue;
        }
        break;
      }

      if (this._noAudio && unSync) {
        let len = this._timeRange.deletePassed(dts);
        console.warn(`delete ${len} compressed frame`);
      }
    });

    this._parent.on(Events.TIMELINE.DO_PAUSE, () => {
      this._tickTimer.stop();
    });

    this._parent.on(Events.TIMELINE.DESTROY, () => {
      this._destroy();
    });

    this._parent.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true;
    });

    this._parent.on(Events.TIMELINE.UPDATE_GL_OPTIONS, (v) => {
      this._config.glCtxOptions = v;
    })

    this.on(Events.VIDEO.AUTO_RUN, this._startRender.bind(this));

    this.on(Events.VIDEO.VIDEO_WAITING, () => {
      if (this.bitrate === 0) return;
      clearInterval(waitingTimer);
      let i = 1;
      waitingTimer = setInterval(() => {
        logger.log(this.TAG, '卡顿', i);
        i++;
        this.bitrate = this.bitrate / i;
        if (this.bitrate < 40000) { // 5KB
          this.bitrate = 0;
          clearInterval(waitingTimer);
        }
      }, 1000);
    })

    this._parent.on(Events.TIMELINE.START_RENDER, () => {
      clearInterval(waitingTimer);
    });
  }

  _bindWorkerEvent (decoder) {
    const _whenFail = msg => {
      if (this._degrade) {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(msg)
        );
      } else {
        logger.log(this.TAG, 'use asm: ', msg);
        this._degrade = true;
        this._destroyWorker();
        this._initDecodeWorker();
      }
    }

    decoder.addEventListener('message', (e) => {
      const { msg } = e.data;
      switch (msg) {
        case 'DECODER_READY':
          logger.log(this.TAG, 'wasm worker ready ', performance.now());
          this._wasmReady = true;
          this.emit(Events.VIDEO.VIDEO_DECODER_INIT);
          if (!this._avccpushed) {
            this._pushAvcc(this._decoder, this._meta);
          }
          this._startDecode();
          break;
        case 'DECODED':
          this._frameQueue.push(e.data);
          this._decodeEstimate.addDecodeInfo(e.data.info)
          this._checkToDecode();
          break;
        case 'DECODE_FINISH':
          if (this._lastDecodingDts === e.data.dts) {
            this._inDecoding = false;
            this._decodeEstimate.resetDecodeDot();
          }
          break;
        case 'LOG':
          // console.log('video decoder worker: LOG:',msg,e.data.log, performance.now());
          break;
        case 'INIT_FAILED':
          _whenFail(e.data.log);
          break;
        default:
          console.error('invalid messaeg', e);
      }
    });

    decoder.addEventListener('error', (e) => {
      _whenFail(e.message);
    });
  }

  _setMetadata (meta) {
    this._meta = meta;
    let fps = meta && meta.frameRate && meta.frameRate.fps;
    if (fps) {
      logger.log(this.TAG, 'detect fps:', fps);
    } else {
      logger.warn(this.TAG, 'no detect fps,start estimate');
    }
    if (!this._decoder) {
      this._initDecodeWorker();
    } else if (this._wasmReady) {
      this._pushAvcc(this._decoder, meta)
    }
  }

  _selectWorker () {
    logger.log(this.TAG, 'start init worker:', performance.now(), 'hevc:', this.isHevc, 'degrade:', this._degrade);
    if (this.isHevc) {
      return {
        decoder: new HevcWorker(),
        url: this._degrade ? ASM_H265_DECODER_URL : H265_DECODER_URL
      };
    }
    return {
      decoder: new AvcWorker(),
      url: this._degrade ? ASM_H264_DECODER_URL : H264_DECODER_URL
    };
  }

  _initDecodeWorker () {
    const { decoder, url } = this._selectWorker();
    this._decoder = decoder;
    this._bindWorkerEvent(this._decoder);
    this._decoder.postMessage({
      msg: 'init',
      meta: this._meta,
      url
    });
  }

  _pushAvcc (worker, meta) {
    logger.log(this.TAG, 'push metadata, init codec context');
    this._avccpushed = true;
    worker.postMessage({
      msg: 'updatemeta',
      meta: meta
    });
    const vps = meta.rawVps || meta.vps;
    const sps = meta.rawSps || meta.sps;
    const pps = meta.rawPps || meta.pps;
    if (vps) {
      let data = new Uint8Array(vps.byteLength + 4);
      data.set([0, 0, 0, 1]);
      data.set(vps, 4);
      worker.postMessage({
        msg: 'decode',
        data: data
      });
    }

    let data = new Uint8Array(sps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(sps, 4);
    worker.postMessage({
      msg: 'decode',
      data: data
    });

    data = new Uint8Array(pps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(pps, 4);
    worker.postMessage({
      msg: 'decode',
      data: data
    });

    if (!this._frameRender) {
      let config = Object.assign(this._config, { meta, canvas: this._canvas });
      this._frameRender = new FrameRender(config);
    } else {
      this._frameRender.resetMeta(meta);
    }
  }

  _appendChunk (videoTrack) {
    this._timeRange.append(videoTrack.samples, this._noAudio);
    videoTrack.samples = [];
    if (!this._ready && this._wasmReady && this._noAudio) {
      this._startDecode();
    }
    if (this._noAudio) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.DURATION_CHANGE
      );
    }
  }

  // 1. decoder初始化预解码几帧
  // 2. render 过程,帧数过少时解码新帧
  _startDecode () {
    let len = 15;
    let onlyOne = this._timeRange && this._timeRange.frameLength === 1;
    while (len >= 0) {
      let sample = this._timeRange && this._timeRange.shift();
      if (!sample) break;
      this._decodeSample(sample, onlyOne);
      len--;
    }
  }

  _whenReady () {
    this._ready = true;
    this.emit(Events.VIDEO.VIDEO_READY);
    this._emitTimelineEvents(
      Events.TIMELINE.PLAY_EVENT,
      Events.VIDEO_EVENTS.LOADEDDATA
    );
    if (this._noAudio) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.PLAYING
      );
    }
  }

  // 检测需要解码的时机
  // 1. 解码worker初始化完成,提前解几帧
  // 2. 渲染ticker中
  _checkToDecode () {
    if (!this._ready) {
      if (this.readyState >= HAVE_METADATA) {
        this._whenReady();
      }
      return;
    }
    if (!this._inDecoding && this.readyState < HAVE_FUTURE_DATA) {
      this._startDecode();
    }
  }

  _startRender () {
    this._tickTimer.start();
  }

  _render () {
    let frame = this._frameQueue && this._frameQueue[0];
    if (!frame || !this._timeRange) {
      logger.log(this.TAG, 'lack frame');
      this._checkToDecode();
      // waiting
      if (this._noAudio && !this._timeRange.frameLength) {
        this._ready = false;
        this.emit(Events.VIDEO.VIDEO_WAITING);
      }
      return;
    }

    let { info } = frame;

    if (!info) {
      this._frameQueue.shift();
      return;
    }

    let _renderDelay = info.dts - this.preciseVideoDts;

    if (_renderDelay > 0) {
      return;
    }

    this._frameQueue.shift();

    if (Math.abs(this._lastTimeupdate - info.dts) > 250) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.TIMEUPDATE
      );
      this._lastTimeupdate = info.dts;
    }

    if (logger.long) {
      logger.log(this.TAG, `render delay:${_renderDelay} , timelinePosition:${this.preciseVideoDts} , dts:${info.dts} , cost:${info.cost} rest:${this._frameQueue.length}, buffer frame:${this._timeRange.frameLength}`)
    }

    this._frameRender.render(
      frame.buffer,
      frame.width,
      frame.height,
      frame.yLinesize,
      frame.uvLinesize
    );
    this._checkToDecode();
  }

  _decodeSample (sample, onlyOne) {
    if (sample.options && sample.options.meta) {
      this._meta = sample.options.meta;
      logger.warn(this.TAG, 'detect metadata! flush decoder');
      this._pushAvcc(this._decoder, sample.options.meta);
      // 换流更新
      if (this._noAudio) {
        this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, sample.dts);
      }
    }

    let gopId = 0;
    if (sample.gopId) {
      gopId = sample.gopId - 1;
    }
    // const worker = this.wasmworkers[gopId % MAX_WORKER_NUM];
    this._inDecoding = true;
    this._lastDecodingDts = sample.dts;
    if (onlyOne) {
      this._decodeEstimate.resetDecodeDot(performance.now());
    }
    this._decoder.postMessage({
      msg: 'decode',
      data: sample.data,
      info: {
        dts: sample.dts,
        pts: sample.pts || sample.dts + sample.cts,
        key: sample.isKeyframe,
        gopId,
        isGop: sample.isGop || false
      }
    });
  }

  _destroyWorker () {
    if (this._decoder) {
      logger.log(this.TAG, 'destroy worker...');
      this._decoder.postMessage({ msg: 'destroy' });
      this._decoder.terminate();
      this._decoder = null;
    }
  }

  _destroy () {
    this._destroyWorker();
    this._tickTimer.destroy();
    this._canvas = null;
    this._timeRange = null;
    this._frameQueue = null;
    this._decodeEstimate = null;
    this._frameRender = null;
    this._parent = null;
    this.removeAllListeners();
  }
}
