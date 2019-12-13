import Workerify from 'webworkify-webpack'
import Stream from '../write/stream';
import Nalunit from 'xgplayer-codec/src/h264/nalunit';
import Render from 'xgplayer-render/src/index';
import SourceBuffer from './sourcebuffer';
import TimeRanges from '../models/TimeRanges';

class VideoCanvas {
  constructor (config) {
    this.config = Object.assign({}, config);
    this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
    this.source = new SourceBuffer({type: 'video'});
    this.preloadTime = this.config.preloadTime || 3;
    this.oncanplay = undefined;
    this.onFirstFrame = undefined;
    this.meta = undefined;
    this.readyStatus = 0;
    this.paused = true;
    this.count = 0;
    this.currentTime = 0;
    this.lastPlayed = 0;

    this._decoderInited = false;
    this._avccpushed = false;
    this._decodedFrames = {};
    this._lastSampleDts = undefined;
    this._baseDts = undefined;
    this._lastRenderTime = null
    this.playFinish = null

    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.top = 0;
    this.canvas.style.bottom = 0;
    this.canvas.style.left = 0;
    this.canvas.style.right = 0;
    this.canvas.style.margin = 'auto';
    this.canvas.style.position = 'absolute';
  }

  pause () {
    this.paused = true;
  }

  initWasmWorker () {
    let _this = this;
    this.wasmworker = Workerify(require.resolve('./worker.js'));
    this.wasmworker.postMessage({
      msg: 'init',
      meta: this.meta
    })
    this.wasmworker.addEventListener('message', msg => {
      switch (msg.data.msg) {
        case 'DECODER_READY':
          _this._decoderInited = true;
          break;
        case 'DECODED':
          this._onDecoded(msg.data);
          break;
      }
    });
  }

  setVideoMetaData (meta) {
    this.meta = meta;
    if (!this._decoderInited) {
      this.initWasmWorker();
      return
    }
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
      let format = 'YUV420';
      if (meta.chromaFormat === 422) {
        format = 'YUV422P'
      }
      let config = Object.assign({format, canvas: this.canvas}, this.config);
      this.yuvCanvas = new Render(config);
    }
    this.readyStatus = 1;
  }

  decodeVideo (videoTrack) {
    if (!this._decoderInited) {
      return
    }

    if (!this._avccpushed) {
      this.setVideoMetaData(this.meta);
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

    this._preload();
  }

  _preload () {
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
    let nals = Nalunit.getAvccNals(new Stream(sample.data.buffer));

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

  _onDecoded (data) {
    let {dts} = data.info
    this._decodedFrames[dts] = data;
    if (Object.keys(this._decodedFrames).length > 10) {
      if (this.playFinish) {
        this.playFinish()
      }
      if (this.oncanplay) {
        this.oncanplay();
      }
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
      return;
    }
    
    if (this.meta) {
      if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) {
      }
      let frameTimes = Object.keys(this._decodedFrames);
      if (frameTimes.length > 0) {
        this.currentTime = currentTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
          frameTime = Number.parseInt(frameTimes[i - 1]);
        }

        let frame = this._decodedFrames[frameTime];
        if (frame) {
          let buf = []
          if (this.meta.chromaFormat === 420) {
            
            let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
            let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
            let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
            buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
          }
          this.yuvCanvas.render(buf, frame.yLinesize, frame.height);
        }
        for (let i = 0; i < frameTimes.length; i++) {
          if (Number.parseInt(frameTimes[i]) < frameTime) {
            delete this._decodedFrames[frameTimes[i]];
          }
        }
      }
    }
    this._lastRenderTime = Date.now()
  }

  cleanBuffer () {
    if (this.currentTime > 1) {
      this.source.remove(0, this.currentTime - 1);
    }
  }

  destroy () {
    this.wasmworker.postMessage({msg: 'destroy'})
    this.wasmworker = null;
    this.canvas = null
    this.source = null
    this._decoderInited = false;
  }

  get buffered () {
    const ranges = []
    let currentRange = {
      start: null,
      end: null
    }
    for (let i = 0; i < this.source.buffer.length; i++) {
      const { start, end } = this.source.buffer[i];
      if (!currentRange.start) {
        currentRange.start = start;
      }
      if (!currentRange.end) {
        currentRange.end = end;
      }

      if (start - currentRange.end > 1000) {
        currentRange.start = currentRange.start / 1000
        currentRange.end = currentRange.end / 1000
        currentRange = {
          start,
          end
        }
      } else {
        currentRange.end = end
      }
    }

    if (currentRange.start !== null && currentRange.end !== null) {
      currentRange.start = currentRange.start / 1000
      currentRange.end = currentRange.end / 1000
      ranges.push(currentRange)
    }

    return new TimeRanges(ranges)
  }

}
export default VideoCanvas;
