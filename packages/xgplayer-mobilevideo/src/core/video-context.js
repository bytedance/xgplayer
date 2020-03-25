// import Workerify from 'webworkify-webpack'
// eslint-disable-next-line import/no-webpack-loader-syntax
import VideoWorker from 'worker!./worker.js';
import Stream from 'xgplayer-transmuxer-buffer-stream';
import { NalUnit } from 'xgplayer-transmuxer-codec-avc';
// import Render from 'xgplayer-render/src';
import Render from './yuv-canvas'
import SourceBuffer from '../models/sourcebuffer';
import TimeRanges from '../models/time-ranges';
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
    this.preloadTime = this.config.preloadTime || 3;
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
    this.wasmworker = new VideoWorker();
    this.wasmworker.postMessage({
      msg: 'init',
      meta: this.meta
    })
    this.wasmworker.addEventListener('message', this.handleMessage);
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
    if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
      let sample = this.source.get();
      if (sample) {
        this._lastSampleDts = sample.dts;
        this._analyseNal(sample);
      }

      while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
        sample = this.source.get();
        if (sample) {
          this._analyseNal(sample);
          this._lastSampleDts = sample.dts;
        }
      }
    }
  }

  _analyseNal (sample) {
    let nals = NalUnit.getNalunits(new Stream(sample.data.buffer));

    let length = 0;
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      length += nal.body.byteLength + 4;
    }
    let offset = 0;
    let data = new Uint8Array(length);
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      data.set([0, 0, 0, 1], offset);
      offset += 4;
      data.set(new Uint8Array(nal.body), offset);
      offset += nal.body.byteLength;
    }
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data,
      info: {
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
    let {dts} = data.info
    this._decodedFrames[dts] = data;
    let decodedFrameLen = Object.keys(this._decodedFrames).length;
    if (this.readyStatus == HAVE_METADATA && decodedFrameLen > 0) {
      this.readyStatus = HAVE_CURRENT_DATA
      this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'loadeddata')
    }
    if (this._seekState == SEEKED) {
      this.readyStatus = HAVE_CURRENT_DATA
      this._seekState = NOT_SEEK
    }
    if (decodedFrameLen > 10) {
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
    return new Promise((resolve) => {
      this.playFinish = resolve
    }).then(() => {
      this.playFinish = null
    })
  }

  _onTimer (currentTime) {
    if (this.paused) {
      return false;
    }

    if (this.meta) {
      let frameTimes = Object.keys(this._decodedFrames);
      if (frameTimes.length > 0) {
        this.currentTime = currentTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
          frameTime = Number.parseInt(frameTimes[i - 1]);
        }

        let frame = this._decodedFrames[frameTime];
        if (frame) {
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
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

          return true;
        } else {
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
        this._decoderInited = true;
        this.pushAvcc(this.meta)
        break;
      case 'DECODED':
        this._onDecoded(msg.data);
        break;
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
      currentRange.start = (currentRange.start - this._baseDts) / 1000
      currentRange.end = (currentRange.end - this._baseDts) / 1000
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
