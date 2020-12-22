import {logger} from 'xgplayer-helper-utils';

const TOLERANCE = 1;

export default class VideoTimeRange {
  constructor (parent) {
    this.TAG = 'VideoTimeRange';
    this._parent = parent;
    this._baseDts = -1;
    this._lastDuration = 0;
    this._duration = 0;
    this._bitrate = 0;
    /**
     * buffers说明
     * type buffer = {
     *    start:number,
     *    end:number,
     *    duration:number,
     *    frames:Array<frame>
     * }
     * type buffers = Array<buffer>
     *
     */
    this._buffers = [];

    /**
     *  对直播数据,只存在_currentFrameQueue的概念,数据只在一个队列中消费
     *  对点播,每个分片就是一个buffer结构,存在_buffers概念,_currentFrameQueue为当前
     *    正在播放的buffer.frames
     */
    this._currentFrameQueue = [];

    /**
     * 对点播,帧数据被渲染后当前帧不能被丢弃,需要一个索引标识正在渲染的帧
     */
    this._frameIndexInQueue = 0;
    this._delayEstimateList = [];
  }

  get isLive () {
    return this._parent.isLive;
  }

  get baseDts () {
    return this._baseDts;
  }

  get duartion () {
    return this._duration;
  }

  get buffered () {
    return {
      length: this._duration ? 1 : 0,
      start: () => 0,
      end: () => this._duration
    };
  }

  get frameLength () {
    return this._currentFrameQueue.length;
  }

  get bitrate () {
    return this._bitrate;
  }

  set bitrate (v) {
    this._bitrate = v;
  }

  get lastDuration () {
    return this._lastDuration;
  }

  // no audio 时
  getCurrentTime (cDts) {
    return this._lastDuration + (cDts - this._baseDts) / 1000;
  }

  resetDts (dts) {
    this._baseDts = dts;
  }

  _caclBaseDts (frame) {
    if (this._baseDts !== -1) return;
    if (!frame) return;
    this._baseDts = frame.dts;
    logger.log(this.TAG, 'set baseDts: ', this._baseDts, 'frame len:', this._currentFrameQueue.length);
  }

  // for live + no audio
  _updateDuration (frames) {
    let len = frames.length;
    let last = frames[len - 1];

    for (let i = 0; i < len; i++) {
      let f = frames[i];
      if (f && f.options && f.options.meta) {
        let pre = frames[i - 1] || this._currentFrameQueue[this._currentFrameQueue.length - 1];
        if (pre) {
          this._lastDuration += (pre.dts - this._baseDts) / 1000;
        } else {
          this._lastDuration = this._duration;
        }
        logger.log(
          this.TAG,
          'updateBaseDts,record lastDuration:',
          this._lastDuration
        );
        this._baseDts = f.dts;
        break;
      }
    }

    if (last) {
      this._duration = (last.dts - this._baseDts) / 1000 + this._lastDuration;
    }
  }

  _estimateBitRate (frames) {
    let len = frames.length;
    if (len <= 2) {
      this._delayEstimateList = this._delayEstimateList.concat(frames);
      len = this._delayEstimateList.length;
      if (len <= 30) return;
      frames = this._delayEstimateList;
      this._delayEstimateList = [];
    };
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += frames[i].data.length;
    }
    let delta = frames[len - 1].dts - frames[0].dts;

    let bitrate = sum / delta // KB/s
    this._bitrate = parseInt(bitrate * 8000); // bps
  }

  _appendVodBuffer (frames) {
    if (!frames.length) return;
    // record baseDts for pre frame
    frames.forEach(item => {
      item.baseDts = this._baseDts;
    });
    let frame0 = frames[0];
    let frameN = frames[frames.length - 1];
    let start = (frame0.dts - this._baseDts) / 1000;
    let end = (frameN.dts - this._baseDts) / 1000;
    logger.log(this.TAG, `add new buffer range [${start} , ${end}]`)
    if (!this._buffers.filter(x => x.start === start).length) {
      this._buffers.push({
        start,
        end,
        duartion: end - start,
        frames: frames.slice()
      })
    }

    this._buffers.sort((a, b) => a.start > b.start ? 1 : -1)
  }

  append (frames, updateDuration) {
    this._caclBaseDts(frames[0]);

    if (updateDuration) {
      this._updateDuration(frames);
    }

    this._estimateBitRate(frames);

    if (this.isLive) {
      this._currentFrameQueue = this._currentFrameQueue.concat(frames);
      return;
    }

    this._appendVodBuffer(frames)
  }

  getFrame () {
    let f;
    if (this.isLive) {
      return this._currentFrameQueue.shift();
    }

    // the current frame to play
    f = this._currentFrameQueue[this._frameIndexInQueue];

    // the current buffer range play finish
    if (!f) {
      // get the last frame
      f = this._currentFrameQueue[--this._frameIndexInQueue];

      if (!f) return;

      // switch to next buffer range followed
      this.switchBuffer((f.dts - f.baseDts) / 1000);

      return this.getFrame();
    }
    this._frameIndexInQueue++;
    return f;
  }

  // swith to new buffer range for vod
  switchBuffer (time) {
    let buffer = this._buffers.filter(x => (x.start < time + TOLERANCE) && (x.end > time + TOLERANCE))[0];

    if (buffer) {
      logger.log(this.TAG, `switch video buffer, time:${time} , buffer:[${buffer.start} , ${buffer.end}]`)
      this._currentFrameQueue = buffer.frames.slice();
    } else {
      this._currentFrameQueue = [];
    }
    this._frameIndexInQueue = 0;
  }

  nextFrame () {
    return this._currentFrameQueue[0];
  }

  getDtsOfTime (time) {
    let delta = time - this._lastDuration;
    return this._baseDts + delta * 1000;
  }
}
