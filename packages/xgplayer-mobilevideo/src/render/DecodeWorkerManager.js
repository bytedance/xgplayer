import HevcWorker from 'web-worker:../decoder/hevc-worker.js';
import HevcThreadWorker from 'web-worker:../decoder/hevc-worker-thread.js';
import AvcWorker from 'web-worker:../decoder/worker.js';
import { logger } from 'xgplayer-helper-utils';
import EventEmitter from 'events';
import Events from '../events';
import {
  H264_DECODER_URL,
  H265_DECODER_URL,
  H265_THREAD_DECODER_URL,
  ASM_H264_DECODER_URL,
  ASM_H265_DECODER_URL
} from '../config';

const CAN_USE_HEVC_THREAD_DECODE = true && !!window.SharedArrayBuffer;
const MAX_DECODE_ONCE_DEFAULT = 16;
const CONTINUE_DECODE_THRESHOLD_DEFAULT = MAX_DECODE_ONCE_DEFAULT / 2;

const MAX_DECODE_ONCE_FAST = 80;

// 重用解码worker,只在单worker解码时使用,多worker解码时不用,并且只存储一个可复用worker
const workerCached = [];

/**
 *  wasm解码器worker管理及数据交互
 */
export default class DecodeWorkerManager extends EventEmitter {
  constructor (parent) {
    super();
    this.TAG = 'DecodeWorkerManager';
    this._parent = parent;
    this._avccpushed = false; // 初始化解码器
    this._wasmReady = false; // worker中wasm是否可用
    this._inDecoding = false;
    /**
     * 1: hevc decode with thread
     * 2: hevc | 264 decode
     * 3: hevc | 264 decode with asm.js
     */
    this._decoderMode = window.WebAssembly ? 2 : 3;
    this._maxDecodeOnce = MAX_DECODE_ONCE_DEFAULT;
    this._continueDecodeThreshold = CONTINUE_DECODE_THRESHOLD_DEFAULT;
    this._wasmWorkers = []; //  decoder worker instance
    this._meta = null;
    this._workerErrorCallback = null;
    this._workerMessageCallback = null;
  }

  get inDecoding () {
    return this._inDecoding;
  }

  get decoderMode () {
    return this._decoderMode;
  }

  get workerLength () {
    return this._wasmWorkers.length;
  }

  get wasmReady () {
    return this._wasmReady;
  }

  get needToDecode () {
    if (this._inDecoding) return 0;
    return this._continueDecodeThreshold;
  }

  get maxDecodeOnce () {
    return this._maxDecodeOnce;
  }

  get isHevc () {
    return (this._meta || {}).codec === 'hev1.1.6.L93.B0';
  }

  _selectDecodeWorker () {
    logger.log(
      this.TAG,
      'start init worker:',
      performance.now(),
      'hevc:',
      this.isHevc,
      'decoderMode:',
      this._decoderMode
    );
    if (this.isHevc) {
      return {
        decoder: this._decoderMode === 1 ? new HevcThreadWorker() : new HevcWorker(),
        url: this._decoderMode === 3 ? ASM_H265_DECODER_URL : this._decoderMode === 1 ? H265_THREAD_DECODER_URL : H265_DECODER_URL
      };
    }
    return {
      decoder: new AvcWorker(),
      url: this._decoderMode === 3 ? ASM_H264_DECODER_URL : H264_DECODER_URL
    };
  }

  _selectDecodeWorkerFromCache () {
    return {
      decoder: workerCached.pop()
    };
  }

  _bindWorkerEvent (decoder) {
    const _whenFail = (msg, from) => {
      if (this._decoderMode === 3) {
        this._workerErrorCallback(msg);
      } else {
        logger.log(this.TAG, 'use asm: ', msg, from);
        this._decoderMode = this._decoderMode === 1 ? 2 : 3; // 使用 asm
        this._destroyWorker(decoder);
        this._initDecodeWorkerInternal();
      }
    };

    decoder.onMessage = (e) => {
      const { msg } = e.data;
      switch (msg) {
        case 'DECODER_READY':
          logger.log(this.TAG, 'wasm worker ready ', performance.now());
          this._wasmReady = true;
          if (!this._avccpushed) {
            this._initDecoderInternal(decoder, this._meta);
          }
          this.emit(Events.VIDEO.VIDEO_DECODER_INIT, decoder);
          this._workerMessageCallback({
            type: 'DECODER_READY',
            data: decoder
          })
          break;
        case 'DECODED':
          this._inDecoding = true;
          this._workerMessageCallback({
            type: 'RECEIVE_FRAME',
            data: e.data
          })
          break;
        case 'BATCH_FINISH_FLAG':
          decoder.using = 0;
          this._inDecoding = false;
          this._workerMessageCallback({
            type: 'BATCH_FINISH'
          })
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

    decoder.onError = (e) => {
      _whenFail(e.message, 2);
    };

    decoder.addEventListener('message', decoder.onMessage);

    decoder.addEventListener('error', decoder.onError);
  }

  _initDecodeWorkerInternal (delay) {
    let { decoder } = this._selectDecodeWorkerFromCache();
    if (decoder) {
      logger.warn(this.TAG, 'select decoder from cache');
      this._avccpushed = false;
      this._bindWorkerEvent(decoder);
      // 不需要重新初始化wasm
      this._wasmReady = true;
      this._workerMessageCallback({
        type: 'DECODER_READY',
        data: decoder
      })
      if (!delay) {
        this._wasmWorkers.push(decoder);
      }
    } else {
      let { decoder, url } = this._selectDecodeWorker();
      this._avccpushed = false;
      this._bindWorkerEvent(decoder);
      // 初始化wasm实例
      decoder.postMessage({
        msg: 'init',
        meta: this._meta,
        url
      })
      if (!delay) {
        this._wasmWorkers.push(decoder);
      }
    }
  }

  /**
   * 初始化解码用的worker
   * @param {function} messaegCb 从worker接受的消息，回传给parent使用
   * @param {function} errCb worker error处理函数
   * @param {object} meta
   */
  initDecodeWorker (messaegCb, errCb, meta) {
    this._workerMessageCallback = messaegCb;
    this._workerErrorCallback = errCb;
    this._meta = meta;

    if (CAN_USE_HEVC_THREAD_DECODE && this.isHevc) {
      this._decoderMode = 1;
    }

    if (!this._wasmWorkers.length) {
      this._initDecodeWorkerInternal();
    } else if (this._wasmReady) {
      this._wasmWorkers.forEach((x) => {
        this._initDecoderInternal(x, meta);
      });
    }
  }

  addDecodeWorker (getCurrentGopId, gopLength) {
    // 新建worker
    this._initDecodeWorkerInternal(true);

    return new Promise((resolve) => {
      this.once(Events.VIDEO.VIDEO_DECODER_INIT, (decoder) => {
        console.log('多worker 开始!');
        // ready 之后才可用
        if (this._wasmWorkers.length >= 2) return;

        let currentGopId = getCurrentGopId();

        // 当前正在解码的gop沿用老worker
        let odd = (currentGopId - 1) % 2;

        if (odd) {
          this._wasmWorkers.unshift(decoder);
        } else {
          this._wasmWorkers.push(decoder);
        }

        // 大约 [80,120] 帧
        let maxDecodeOnce = Math.max(
          Math.min(
          // 防止gop过大、preloadTime过大
            gopLength * 2,
            120
          ),
          MAX_DECODE_ONCE_FAST
        );
        this._maxDecodeOnce = maxDecodeOnce;
        this._continueDecodeThreshold = parseInt(maxDecodeOnce / 2);

        logger.log(this.TAG, `maxDecodeOnce = ${maxDecodeOnce}`);

        resolve();
      });
    })
  }

  _initDecoderInternal (worker, meta) {
    logger.log(this.TAG, 'init decoder');
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
        msg: 'initDecoder',
        data: data
      });
    }

    let data = new Uint8Array(sps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(sps, 4);
    worker.postMessage({
      msg: 'initDecoder',
      data: data
    });

    data = new Uint8Array(pps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(pps, 4);
    worker.postMessage({
      msg: 'initDecoder',
      data: data
    });
  }

  // 用 sps、pps等初始化解码器
  initDecoder (worker, meta) {
    this._initDecoderInternal(worker, meta)
  }

  _doDecodeInternal (sample) {
    let len = this._wasmWorkers.length;
    let gopId = 0;
    if (sample.gopId) {
      gopId = sample.gopId - 1;
    }
    const worker = this._wasmWorkers[gopId % len];
    worker.using = 1;
    if (sample.options && sample.options.meta) {
      this._meta = sample.options.meta;
      logger.warn(this.TAG, 'detect metadata! flush decoder');
      this._initDecoderInternal(worker, sample.options.meta)
      // 换流更新
      // if (this._noAudio) {
      //   this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, sample.dts);
      // }
    }

    worker.postMessage({
      msg: 'decode',
      data: sample.data,
      info: {
        baseDts: sample.baseDts,
        dts: sample.dts,
        pts: sample.pts || sample.dts + sample.cts,
        key: sample.isKeyframe,
        gopId,
        isGop: sample.isGop
      }
    });
  }

  doDecode (frameList) {
    frameList.forEach(f => {
      this._doDecodeInternal(f);
    })

    this._inDecoding = true;
    this._wasmWorkers
      .filter((x) => x.using)
      .forEach((worker) => {
        worker.postMessage({
          msg: 'finish_flag'
        });
      });
  }

  flushDecoder () {
    this._wasmWorkers.forEach((worker) => {
      worker.postMessage({
        msg: 'flush'
      });
    });
  }

  _destroyWorker (decoder) {
    logger.log(this.TAG, 'destroy worker...');

    if (decoder) {
      decoder.removeEventListener('message', decoder.onMessage);
      decoder.removeEventListener('error', decoder.onError);
      decoder.postMessage({ msg: 'destroy' });
      decoder.terminate();
      this._wasmWorkers = this._wasmWorkers.filter((x) => x !== decoder);
      return;
    }

    this._wasmWorkers.forEach((worker) => {
      worker.removeEventListener('message', worker.onMessage);
      worker.removeEventListener('error', worker.onError);
      worker.postMessage({ msg: 'destroy' });
      worker.terminate();
    });
    this._wasmWorkers = [];
  }

  destroy (reuseWorker) {
    if (reuseWorker) {
      // 只在单worker时使用
      if (!workerCached.length && !this.isHevc && this._wasmWorkers.length === 1) {
        let worker = this._wasmWorkers.pop();
        worker.removeEventListener('message', worker.onMessage);
        worker.removeEventListener('error', worker.onError);
        workerCached.push(worker);
        return;
      }
    }

    this._destroyWorker();
  }
}
