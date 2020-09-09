import BaseRender from './BaseRender'
import HevcWorker from 'worker!../decoder/hevc-worker.js';
import AvcWorker from 'worker!../decoder/worker.js';
import { logger } from 'xgplayer-helper-utils';
import VideoTimeRange from './VideoTimeRange';
import FrameRender from './FrameRender';
import FrameQueue from './FrameQueue';
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

const MAX_DECODE_ONCE_DEFAULT = 16;
const CONTINUE_DECODE_THRESHOLD_DEFAULT = MAX_DECODE_ONCE_DEFAULT / 2;

const MAX_DECODE_ONCE_FAST = 80;

export default class VideoRender extends BaseRender {
  constructor (config, parent) {
    super(config, parent);
    this.TAG = 'VideoRender';
    this._timeRange = new VideoTimeRange();
    this._decodeEstimate = new DecodeEstimate(this);
    this._frameQueue = new FrameQueue(this); // the queue of uncompressed frame
    this._canvas = config.canvas || document.createElement('canvas');
    this._wasmWorkers = []; //  decoder worker instance
    this._frameRender = null; // FrameRender instance
    this._wasmReady = false;
    this._degrade = !window.WebAssembly;
    this._avccpushed = false;
    this._inDecoding = false;
    this._lastTimeupdate = 0;
    this._maxDecodeOnce = MAX_DECODE_ONCE_DEFAULT;
    this._continueDecodeThreshold = CONTINUE_DECODE_THRESHOLD_DEFAULT;
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
      this._decodeEstimate.fps || (this._meta && this._meta.frameRate && this._meta.frameRate.fps) || 24
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

  get gopLength () {
    return this._decodeEstimate.gopLength;
  }

  get is540p () {
    return this._canvas.height < 720
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
    let len = this._frameQueue.length;
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

  switchToMultiWorker (preloadTime) {
    // 新建worker
    this._initDecodeWorker(true);
    this.once(Events.VIDEO.VIDEO_DECODER_INIT, (decoder) => {
      // ready 之后才可用
      if (this._wasmWorkers.length >= 2) return;

      let nextFrame = this._timeRange.nextFrame();
      let currentGopId = nextFrame ? nextFrame.gopId : 0;

      // 当前正在解码的gop沿用老worker
      let odd = (currentGopId - 1) % 2;

      if (odd) {
        this._wasmWorkers.unshift(decoder);
      } else {
        this._wasmWorkers.push(decoder)
      }

      this._decodeEstimate.reset();
    })

    logger.log(this.TAG, `fps:${this.fps} , gopLength:${this._decodeEstimate.gopLength}`)

    // 大约 [80,120] 帧
    let maxDecodeOnce = Math.max(
      Math.min( // 防止gop过大、preloadTime过大
        (this._decodeEstimate.gopLength) * 2,
        (preloadTime || 2) * this.fps
      ),
      MAX_DECODE_ONCE_FAST
    )
    this._maxDecodeOnce = maxDecodeOnce;
    this._continueDecodeThreshold = parseInt(maxDecodeOnce / 2);

    logger.log(this.TAG, `maxDecodeOnce = ${maxDecodeOnce}`);
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
    super._bindEvents();

    let waitingTimer;

    // 同步时机
    // 1. 音频一小段buffer起播时
    // 2. 对noAudio的场景 1. 视频变流时,dts发生变化 2. 卡顿waiting后,_parent.timelinePosition已不准确
    this._parent.on(Events.TIMELINE.SYNC_DTS, (dts) => {
      let nextFrame = this._frameQueue.nextFrame();
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

      let unSync = this._frameQueue.avSync(dts);
      if (this._noAudio && unSync) {
        let len = this._timeRange.deletePassed(dts);
        console.warn(`delete ${len} compressed frame`);
      }
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

  _setMetadata (type, meta) {
    if (type === 'audio') return;
    logger.warn(this.TAG, 'video set metadata');

    this._meta = meta;
    let fps = meta && meta.frameRate && meta.frameRate.fps;
    if (fps) {
      logger.log(this.TAG, 'detect fps:', fps);
    } else {
      logger.warn(this.TAG, 'no detect fps,start estimate');
    }
    if (!this._wasmWorkers.length) {
      this._initDecodeWorker();
    } else if (this._wasmReady) {
      this._wasmWorkers.forEach(x => {
        this._pushAvcc(x, meta)
      })
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

  _initDecodeWorker (delay) {
    const { decoder, url } = this._selectWorker();
    this._avccpushed = false;
    this._bindWorkerEvent(decoder);
    decoder.postMessage({
      msg: 'init',
      meta: this._meta,
      url
    });
    if (!delay) {
      this._wasmWorkers.push(decoder)
    }
  }

  _bindWorkerEvent (decoder) {
    const _whenFail = (msg, from) => {
      if (this._degrade) {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          'error',
          this._assembleErr(msg)
        );
      } else {
        logger.log(this.TAG, 'use asm: ', msg, from);
        this._degrade = true;
        this._destroyWorker(decoder);
        this._initDecodeWorker();
      }
    }

    decoder.onMessage = (e) => {
      const { msg } = e.data;
      switch (msg) {
        case 'DECODER_READY':
          logger.log(this.TAG, 'wasm worker ready ', performance.now());
          this._wasmReady = true;
          this.emit(Events.VIDEO.VIDEO_DECODER_INIT, decoder);
          if (!this._avccpushed) {
            this._pushAvcc(decoder, this._meta);
          }
          this._startDecode();
          break;
        case 'DECODED':
          this._inDecoding = true;
          this._decodeEstimate.addDecodeInfo(e.data.info)
          this._frameQueue.append(e.data)
          this._checkToDecode();
          break;
        case 'BATCH_FINISH_FLAG':
          decoder.using = 0;
          this._inDecoding = false;
          this._decodeEstimate.resetDecodeDot();
          break;
        case 'LOG':
          // console.log('video decoder worker: LOG:',msg,e.data.log, performance.now());
          break;
        case 'INIT_FAILED':
          _whenFail(e.data.log, 1);
          break;
        default:
          console.error('invalid messaeg', e);
      }
    };

    decoder.onError = e => {
      _whenFail(e.message, 2);
    }

    decoder.addEventListener('message', decoder.onMessage);

    decoder.addEventListener('error', decoder.onError);
  }

  _doPause () {
    this._tickTimer.stop();
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
    let len = this._maxDecodeOnce;
    let rest = this._timeRange.frameLength
    let onlyOne = rest === 1;

    while (len >= 0) {
      let sample = this._timeRange && this._timeRange.shift();
      if (!sample) break;
      this._decodeSample(sample, onlyOne);
      len--;
    }

    if (rest) {
      this._inDecoding = true;
      this._wasmWorkers.filter(x => x.using).forEach(worker => {
        worker.postMessage({
          msg: 'finish_flag'
        })
      })
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
    if (this._frameQueue.length < this._continueDecodeThreshold && !this._inDecoding) {
      this._startDecode();
    }
  }

  _startRender () {
    this._tickTimer.start(this.interval);
  }

  _render () {
    let frame = this._frameQueue.nextFrame();
    if (!frame || !this._timeRange) {
      logger.log(this.TAG, 'lack frame', this._inDecoding);
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
      logger.log(this.TAG, `render delay:${_renderDelay} , timelinePosition:${this.preciseVideoDts} , dts:${info.dts} , cost:${info.cost} , gopID:${info.gopId} , rest:${this._frameQueue.length}, buffer frame:${this._timeRange.frameLength}`)
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
    let len = this._wasmWorkers.length;
    let gopId = 0;
    if (sample.gopId) {
      gopId = sample.gopId - 1;
      if (gopId === 0) {
        this._decodeEstimate.updateGopCount();
      }
    }
    const worker = this._wasmWorkers[gopId % len];
    worker.using = 1;
    if (sample.options && sample.options.meta) {
      this._meta = sample.options.meta;
      logger.warn(this.TAG, 'detect metadata! flush decoder');
      this._pushAvcc(worker, sample.options.meta);
      // 换流更新
      if (this._noAudio) {
        this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, sample.dts);
      }
    }

    if (onlyOne) {
      this._decodeEstimate.resetDecodeDot(performance.now());
    }

    worker.postMessage({
      msg: 'decode',
      data: sample.data,
      info: {
        dts: sample.dts,
        pts: sample.pts || sample.dts + sample.cts,
        key: sample.isKeyframe,
        gopId,
        isGop: sample.isGop
      }
    });
  }

  _destroyWorker (decoder) {
    logger.log(this.TAG, 'destroy worker...');

    if (decoder) {
      decoder.removeEventListener('message', decoder.onMessage);
      decoder.removeEventListener('error', decoder.onError);
      decoder.postMessage({ msg: 'destroy' });
      decoder.terminate();
      this._wasmWorkers = this._wasmWorkers.filter(x => x !== decoder);
      return;
    }

    this._wasmWorkers.forEach(worker => {
      worker.postMessage({ msg: 'destroy' });
      worker.terminate();
    })
    this._wasmWorkers = [];
  }

  _destroy () {
    this._destroyWorker();
    this._tickTimer.destroy();
    this._frameQueue.destroy();
    this._frameRender.destroy();
    this._canvas = null;
    this._timeRange = null;
    this._decodeEstimate = null;
    this._parent = null;
    this.removeAllListeners();
  }
}
