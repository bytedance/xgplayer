import {logger} from 'xgplayer-helper-utils';
import Events from '../events';

const MAX_QUEUE_LENGTH = 10;
const MAX_LOW_FPS_RECORD = 20;

export default class DecodeEstimate {
  constructor (parent) {
    this.TAG = 'DecodeEstimate';
    this._needEstimate = true;
    this._parent = parent;
    this._lastDecodeDot = 0;
    this._lastFrameDts = 0;
    this._dtsDeltas = [];
    this._decodeCosts = [];
    this._lowDecodeQueue = [];
    this._fps = 0;
    this._decodeFps = 0;
  }

  get fps () {
    return this._fps;
  }

  get decodeFps () {
    return this._decodeFps;
  }

  needEstimateFps () {
    this._needEstimate = true;
  }

  addDecodeInfo (frameInfo = {dts: 0}) {
    this._estimateDecodeFps();
    this._estimateFps(frameInfo);
  }

  _estimateFps (frameInfo) {
    if (!this._needEstimate) return;

    if (!this._lastFrameDts) {
      this._lastFrameDts = frameInfo.dts;
      return;
    }

    let delta = frameInfo.dts - this._lastFrameDts;
    this._lastFrameDts = frameInfo.dts;

    if (Math.abs(delta) > 100) return;

    this._dtsDeltas.push(delta);

    let len = this._dtsDeltas.length;

    if (len < MAX_QUEUE_LENGTH) return;

    this._fps = Math.ceil(1000 / this._avg(this._dtsDeltas, len));
    logger.log(this.TAG, 'estimate fps:', this._fps);
    this._needEstimate = false;
  }

  _estimateDecodeFps () {
    if (!this._lastDecodeDot) {
      this._lastDecodeDot = performance.now();
      return;
    }

    let now = performance.now();
    let cost = now - this._lastDecodeDot;
    let len = this._decodeCosts.length;
    let last = this._decodeCosts[len - 1];
    this._lastDecodeDot = now;

    if (cost < 0.5 || cost / last > 10) return;

    this._decodeCosts.push(cost);

    if (len < MAX_QUEUE_LENGTH) return;

    let avg = this._avg(this._decodeCosts, len);
    this._decodeFps = Math.floor(1000 / avg);

    this._decodeCosts.splice(0, 5);
    this._lowDecodeDetect();
  }

  _avg (list, len) {
    let sum = list.reduce((all, c) => {
      all += c;
      return all;
    }, 0);
    return Math.floor(sum / len) || 1;
  }

  // 低延迟检测逻辑
  _lowDecodeDetect () {
    if (this._decodeFps < this._fps) {
      this._lowDecodeQueue.push(this._decodeFps);
    } else {
      this._lowDecodeQueue.pop();
    }
    if (this._lowDecodeQueue.length > MAX_LOW_FPS_RECORD) {
      this._lowDecodeQueue = [];
      logger.log(this.TAG, '解码效率过低,应该降级');
      this._parent.emit(Events.VIDEO.DECODE_LOW_FPS);
    }
  }
}
