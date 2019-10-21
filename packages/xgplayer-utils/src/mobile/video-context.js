import Workerify from 'webworkify-webpack'
import Stream from '../write/stream';
import Nalunit from '../../../xgplayer-codec/src/h264/nalunit';
class VideoCanvas {
  constructor (config) {
    // this.curVideo = document.createElement('video'); // 主播放video
    // this.backupvideo = document.createElement('video'); // 替换播放video
    this.canvas = document.createElement('canvas');
    this.config = Object.assign({}, config);
    this._decoderInited = false;
    this.oncanplay = undefined;
    this.meta = undefined;
    this._avccpushed = false;
    this.initWasmWorker();
  }

  initWasmWorker() {
    let _this = this;
    this.wasmworker = Workerify(require.resolve('./decoder.js'));
    this.wasmworker.postMessage({
      msg: 'init'
    })
    this.wasmworker.addEventListener('message', msg => {
      switch(msg.data.msg) {
        case 'DECODER_READY':
          _this._decoderInited = true;
          break;
        case 'DECODED':
          console.log('decoded', msg.data.data, msg.data.width, msg.data.height, msg.data.info);
          break;
      }
    });
  }

  setVideoMetaData(meta) {
    console.log(meta);
    this.meta = meta;
    if(!this._decoderInited) {
      return
    }
    this._avccpushed = true;
    let data = new Uint8Array(meta.sps.byteLength + 4);
    data.set([0,0,0,1])
    data.set(meta.sps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    })

    data = new Uint8Array(meta.pps.byteLength + 4);
    data.set([0,0,0,1])
    data.set(meta.pps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    })
  }

  decodeVideo(videoTrack) {
    if(!this._decoderInited) {
      return
    }

    if(!this._avccpushed) {
      this.setVideoMetaData(this.meta);
    }
    let { samples } = videoTrack;
    let sample =  samples.shift();

    if(!sample) {
      return;
    }

    
    let nals = Nalunit.getAvccNals(new Stream(sample.data.buffer));
    
    let length = 0;
    for(let i=0;i<nals.length;i++) {
      let nal = nals[i];
      length += nal.body.byteLength + 4;
    }
    let offset = 0;
    let data = new Uint8Array(length);
    for(let i=0;i<nals.length;i++) {
      let nal = nals[i];
      data.set([0,0,0,1],offset);
      offset +=4;
      data.set(new Uint8Array(nal.body), offset);
      offset += nal.body.byteLength;
    }
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data,
      info: {
        dts: sample.dts,
        pts: sample.pts
      }
    })
  }
  
  play() {
    
  }
}
export default VideoCanvas;