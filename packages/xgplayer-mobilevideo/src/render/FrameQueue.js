
import { logger } from 'xgplayer-helper-utils';

const DISCARD_THRESHOLD = -100
export default class FrameQueue {
  constructor (parent) {
    this.TAG = 'FrameQueue'
    this._parent = parent;
    this._lastGopId = 0;
    this._frames = [];
  }

  get currentTimeDts () {
    return this._parent.preciseVideoDts;
  }

  get length () {
    return this._frames.length;
  }

  append (frame) {
    if (frame.info) {
      const {dts, isGop, gopId} = frame.info;
      if (gopId && gopId < this._lastGopId && dts < this.currentTimeDts) {
        return;
      };
      if (isGop) {
        this._lastGopId = gopId;
      }
    }

    this._frames.push(frame);
    this._frames.sort((a, b) => a.info.dts > b.info.dts ? 1 : -1);
  }

  appendVodFrame (frame) {
    this._frames.push(frame);
  }

  nextFrame () {
    return this._frames[0];
  }

  shift () {
    let next = this.nextFrame();

    if (next && next.gopId && this._lastGopId && next.gopId < this._lastGopId) {
      // 过滤 上一个 gop的
      this._frames = this._frames.filter(x => x.gopId >= this._lastGopId);
      return;
    }
    return this._frames.shift();
  }

  avSync (preciseDts) {
    let unSync = false;
    let nextFrame = this.nextFrame();
    let count = 0;
    while (nextFrame) {
      let delta = nextFrame.info.dts - preciseDts;
      if (delta > 10000 || delta < DISCARD_THRESHOLD) {
        this._frames.shift();
        nextFrame = this.nextFrame();
        count++;
        unSync = true;
        continue;
      }
      break;
    }
    if (unSync) {
      logger.warn(this.TAG, `detect a-v sync problem,delete ${count} frame`);
    }
    return unSync;
  }

  destroy () {
    this._frames = [];
  }
}
