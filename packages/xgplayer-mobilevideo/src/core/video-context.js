// import Workerify from 'webworkify-webpack'
// eslint-disable-next-line import/no-webpack-loader-syntax
import VideoWorker from 'worker!./worker.js';
import BackupVideoWorker from 'worker!./backupWorker.js';
import Render from './yuv-canvas'
import SourceBuffer from '../models/sourcebuffer';
import TimeRanges from '../models/time-ranges';
// import BackUpCodec from './backup-codec';
import EventEmitter from 'events';

const HAVE_NOTHING = 0;
const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;
const HAVE_ENOUGH_DATA = 4;

const NOT_SEEK = 1;
const SEEKING = 2;
const SEEKED = 4;

export const VIDEO_CANVAS_EVENTS = {
  VIDEO_EVENTS: 'VIDEO_EVENTS'
}

class VideoCanvas extends EventEmitter {
  constructor (config) {
    super();
    this.config = Object.assign({}, config);
    this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
    this.source = new SourceBuffer({type: 'video'});
    this.onFirstFrame = undefined;
    this.oncanplay = undefined;
    this.initParameters()
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.top = 0;
    this.canvas.style.bottom = 0;
    this.canvas.style.left = 0;
    this.canvas.style.right = 0;
    this.canvas.style.margin = 'auto';
    this.canvas.style.position = 'absolute';
    this.handleMessage = this.handleMessage.bind(this);
    this.useBackupTimer = null;
  }

  initParameters () {
    this.meta = undefined;
    this.readyStatus = HAVE_NOTHING;
    this.paused = true;
    this.currentTime = 0;
    this._seekState = NOT_SEEK;
    this._avccpushed = false;
    this._decodedFrames = {};
    this._lastSampleDts = undefined;
    this._baseDts = undefined;
    this._lastRenderTime = null
    this.playFinish = null
    this._seekState = NOT_SEEK;
  }

  reset () {
    this.initParameters()
    this.source.reset();
  }

  pause () {
    this.paused = true;
  }

  initWasmWorker () {
    // eslint-disable-next-line no-undef
    window._shimWorkerDocument = document;
    window._shimWorkerWindow = window;
    this.initWorker(false)
  }

  initWorker (isBackup) {
    if (this.wasmworker) {
      this.destroyWorker();
    }
    const VideoWorkerCls = isBackup ? BackupVideoWorker : VideoWorker;
    this.wasmworker = new VideoWorkerCls(false);
    this.wasmworker.onmessage = isBackup ? (msg) => {
      if (msg.data.msg === 'INIT_FAILED') {
        this.emit('error', new Error('backup worker init failed'));
      } else {
        this.handleMessage(msg);
      }
    } : this.handleMessage;

    this.wasmworker.postMessage({
      msg: 'init',
      meta: this.meta
    });
  }

  setVideoMetaData (meta) {
    this.meta = meta;
    if (!this._decoderInited) {
      this.initWasmWorker();
      return
    }
    this.wasmworker.postMessage({
      msg: 'updatemeta',
      meta: this.meta
    })
    this.pushAvcc(meta)
  }

  pushAvcc (meta) {
    this._avccpushed = true;
    let data = new Uint8Array(meta.sps.byteLength + 4);
    data.set([0, 0, 0, 1])
    data.set(meta.sps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    })

    data = new Uint8Array(meta.pps.byteLength + 4);
    data.set([0, 0, 0, 1])
    data.set(meta.pps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    })

    if (!this.yuvCanvas) {
      let config = Object.assign({meta, canvas: this.canvas}, this.config);
      this.yuvCanvas = new Render(config);
    } else {
      this.yuvCanvas.resetMeta(meta);
    }
    this.readyStatus = HAVE_METADATA;
  }
  decodeVideo (videoTrack) {
    if (!this._decoderInited) {
      return
    }
    if (!this._avccpushed) {
      this.pushAvcc(this.meta);
    }
    let { samples } = videoTrack;
    let sample = samples.shift();

    while (sample) {
      if (!this._baseDts) {
        this._baseDts = sample.dts;
      }
      this.source.push(sample);
      sample = samples.shift();
    }

    this.preload();
  }

  preload () {
    const bufferedEnd = this.buffered.end(0)
    if (!this._lastSampleDts || bufferedEnd - (this.currentTime / 1000) < this.config.preloadTime) {
      let sample = this.source.get();
      if (sample) {
        this._lastSampleDts = sample.dts;
        this._analyseNal(sample);
      }

      while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.config.preloadTime * 2000) {
        sample = this.source.get();
        // console.log(sample)
        if (sample) {
          this._analyseNal(sample);
          this._lastSampleDts = sample.dts;
        }
      }
    }
  }

  _analyseNal (sample) {
    // console.log('送入解码', sample.dts,data)
    this.wasmworker.postMessage({
      msg: 'decode',
      data: sample.data,
      info: {
        decodeTime: Date.now(),
        dts: sample.dts,
        pts: sample.pts ? sample.pts : sample.dts + sample.cts,
        key: sample.isKeyframe
      }
    })
  }

  decodeVideoBuffer (buffer) {
    if (!this._decoderInited) {
      this.initWasmWorker();
      return
    }
    this.wasmworker.postMessage({
      msg: 'decode',
      data: buffer
    })
  }

  _onDecoded (data) {
    if (!data.info) {
      return;
    }
    let {dts} = data.info;
    this._decodedFrames[dts - this._baseDts] = data;
    let decodedFrameLen = Object.keys(this._decodedFrames).length;
    if (this.readyStatus == HAVE_METADATA && decodedFrameLen > 0) {
      this.readyStatus = HAVE_CURRENT_DATA
      this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'loadeddata')
    }
    if (this._seekState == SEEKED) {
      this.readyStatus = HAVE_CURRENT_DATA
      this._seekState = NOT_SEEK
    }
    if (decodedFrameLen > 1) {
      if (this.playFinish) {
        this.playFinish()
      }
      if (this.readyStatus == HAVE_CURRENT_DATA) {
        this.readyStatus = HAVE_FUTURE_DATA
        this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplay')
      }
      if (this.oncanplay) {
        this.oncanplay();
      }
      // 2s的时间
      if (this.readyStatus == HAVE_FUTURE_DATA && decodedFrameLen > 2 * (this.meta.frameRate.fps || 60)) {
        this.readyStatus = HAVE_ENOUGH_DATA;
        this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplaythrough')
      }
    } else {
      this.readyStatus = HAVE_CURRENT_DATA
    }
  }

  play () {
    this.paused = false;
    if (!this.paused) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.playFinish = resolve
    }).then(() => {
      this.playFinish = null
    })
  }

  _onTimer (currentTime) {
    // console.log(currentTime)
    if (this.paused) {
      return false;
    }

    if (this.meta) {
      let frameTimes = Object.keys(this._decodedFrames);
      // console.log(frameTimes)
      if (frameTimes.length > 0) {
        this.currentTime = currentTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) <= this.currentTime; i++) {
          frameTime = Number.parseInt(frameTimes[Math.max(i - 1, 0)]);
        }
        let frame = this._decodedFrames[frameTime];
        // console.log('source', this.source)
        // console.log('frametime,', frameTime)
        if (frame) {
          // console.log('render frame ', frameTime, Date.now())
          // let buf = []
          // if (this.meta.chromaFormat === 420) {
          //
          //   let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
          //   let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
          //   let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
          //   buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
          // }
          if (this._seekState == SEEKING) {
            this._seekState = SEEKED
            this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeked')
          }
          frameTimes.forEach((time) => {
            if (Number.parseInt(time) <= frameTime) {
              delete this._decodedFrames[time]
            }
          })
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

          return true;
        } else {
          if (frameTimes.length && Number(frameTimes[0]) > currentTime) {
            return true;
          }
          return false;
        }
      }
    }
    this._lastRenderTime = Date.now()
  }

  cleanBuffer () {
    if (this.currentTime > 1) {
      this.source.remove(0, this.currentTime - 1);
    }
    let frameTimes = Object.keys(this._decodedFrames);

    for (let i = 0; i < frameTimes.length; i++) {
      if (Number.parseInt(frameTimes[i]) < this.currentTime) {
        delete this._decodedFrames[frameTimes[i]];
      }
    }
  }

  destroy () {
    this.destroyWorker()
    this.canvas = null
    this._decodedFrames = {};
    this.source = null
    this._decoderInited = false;
    this._isSeeking = false;
  }

  destroyWorker () {
    if (this.wasmworker) {
      this.wasmworker.removeEventListener('message', this.handleMessage)
      this.wasmworker.postMessage({msg: 'destroy'})
    }
    this.wasmworker = null;
  }

  handleMessage (msg) {
    switch (msg.data.msg) {
      case 'DECODER_READY':
        console.log('wasm worker ready')
        this._decoderInited = true;
        this.pushAvcc(this.meta)
        break;
      case 'DECODED':
        this._onDecoded(msg.data);
        break;
      case 'LOG':
        // console.log(msg.data.log);
        break;
      case 'INIT_FAILED':
        this.destroyWorker();
        this.initWorker(true)
        break;
      default:
        console.error('invalid messaeg', msg);
    }
  }

  setVideoSeeking () {
    this._seekState = SEEKING
    this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeking')
  }

  get buffered () {
    const ranges = []
    let currentRange = {
      start: null,
      end: null
    }
    const decodedTimes = Object.keys(this._decodedFrames);
    if (decodedTimes.length) {
      currentRange.start = Number.parseInt(decodedTimes[0])
      currentRange.end = Number.parseInt(decodedTimes[decodedTimes.length - 1])
    }

    if (currentRange.start !== null && currentRange.end !== null) {
      currentRange.start = currentRange.start / 1000
      currentRange.end = currentRange.end / 1000
      ranges.push(currentRange)
    }

    return new TimeRanges(ranges)
  }

  get videoWidth () {
    return this.canvas.width;
  }

  get videoHeight () {
    return this.canvas.height;
  }

  get seeking () {
    return this._seekState == SEEKING
  }

  get readyState () {
    return this.readyStatus
  }
}
export default VideoCanvas;
