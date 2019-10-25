import Workerify from 'webworkify-webpack'
import Stream from '../write/stream';
import Nalunit from '../../../xgplayer-codec/src/h264/nalunit';
import YUVCanvas from './yuv-canvas';
import SourceBuffer from './sourcebuffer';
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
    this.initWasmWorker();
  }

  initWasmWorker () {
    let _this = this;
    this.wasmworker = Workerify(require.resolve('./worker.js'));
    this.wasmworker.postMessage({
      msg: 'init'
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
      let config = Object.assign({meta, canvas: this.canvas}, this.config);
      this.yuvCanvas = new YUVCanvas(config);
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
  }

  play () {
    this.paused = false;
    this._onTimer();
  }

  _onTimer () {
    let renderCost = 0;
    const renderStart = Date.now()
    if (this.paused) {
      return;
    }
    let nextTime = 1000 / 60;
    if (this.meta) {
      if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) {
        nextTime = Math.ceil(1000 / this.meta.frameRate.fps);
      }
      let frameTimes = Object.keys(this._decodedFrames);
      if (frameTimes.length > 0) {
        this.currentTime += nextTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && frameTimes[i] - this._baseDts <= this.currentTime; i++) {
          frameTime = frameTimes[i];
          break;
        }
        let frame = this._decodedFrames[frameTime];
        if (frame) {
          if (this.oncanplay && this.readyStatus < 4) {
            this.oncanplay();
            this.readyStatus = 4;
          }
          console.log('video time', this.currentTime)
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height);
          renderCost = Date.now() - renderStart;
          delete this._decodedFrames[frameTime];
        }
      }
    }
    this._cleanBuffer();
    setTimeout(this._onTimer.bind(this), nextTime - renderCost);
  }

  _cleanBuffer () {
    this.source.remove(0, this.currentTime);
  }
}
export default VideoCanvas;
