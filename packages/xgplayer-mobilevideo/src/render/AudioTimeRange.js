import {logger} from 'xgplayer-helper-utils';
const TOLERANCE = 0.5;
export default class AudioTimeRange {
  constructor (parent) {
    this.TAG = 'AudioTimeRange';
    this._parent = parent;
    this._buffers = [];
    this._duration = 0;
    this._baseDts = -1;
    this._lastBuffer = null;
  }

  get isLive () {
    return this._parent.isLive;
  }

  get duration () {
    return this._duration;
  }

  set duration (v) {
    this._duration = v;
  }

  get buffered () {
    if (this.isLive) {
      return {
        length: this._duration ? 1 : 0,
        start: () => 0,
        end: () => this._duration
      };
    }

    let buffers = this._mergeBufferRanges();
    return {
      length: buffers.length,
      start: (i) => {
        let buffer = buffers[i];
        return buffer ? buffer.start : 0;
      },
      end: (i) => {
        let buffer = buffers[i];
        return buffer ? buffer.end : Infinity;
      }
    };
  }

  resetDts (dts) {
    this._baseDts = dts;
  }

  dump () {
    let buffered = this.buffered;
    let len = buffered.length;
    let ret = '';

    for (let i = 0; i < len; i++) {
      ret += `${buffered.start(i)}~${buffered.end(i)} `;
    };
    console.log(ret)
  }

  append (source, duration, startDts) {
    if (this._baseDts === -1) {
      this._baseDts = startDts;
    }

    let start = (startDts - this._baseDts) / 1000;
    let end = start + duration;
    let buffer = {
      start,
      end,
      startDts,
      source
    };

    logger.log(this.TAG, `add new buffer range, [${start} , ${end}]`)

    // todo: 去重,排序
    if (!this._buffers.filter(x => x.start === start).length) {
      this._buffers.push(buffer);
    }

    if (this.isLive) {
      this._duration += duration;
    }
    return start;
  }

  filter (time) {
    this._buffers = this._buffers.filter(x => x.start > time);
    return this._buffers[0];
  }

  _mergeBufferRanges () {
    let buffers = this._buffers.sort((a, b) => a.start > b.start ? 1 : -1);
    let len = buffers.length;
    let ret = [];
    if (!len) return ret;

    let last = {
      start: buffers[0].start,
      end: buffers[0].end
    };

    for (let i = 1; i < len; i++) {
      let c = buffers[i];
      if (Math.abs(last.end - c.start) < TOLERANCE) {
        last.end = c.end;
      } else {
        ret.push(last);
        last = {
          start: c.start,
          end: c.end
        }
      }
    }
    ret.push(last);
    return ret;
  }

  getBuffer (time, tolerance) {
    if (this.isLive) {
      return this._buffers.shift();
    }
    let buffer = this._buffers.filter(x => (x.start < time + TOLERANCE) && (x.end > time + TOLERANCE))[0];
    logger.log(this.TAG, `get audio buffer , currentTime:${time} ,buffer:[${buffer && buffer.start} , ${buffer && buffer.end}]`);
    return buffer;
  }
}
