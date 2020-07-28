import {logger} from 'xgplayer-helper-utils';

export default class VideoTimeRange {
  constructor () {
    this.TAG = 'VideoTimeRange';
    this._baseDts = -1;
    this._lastDuration = 0;
    this._duration = 0;
    this._bitrate = 0;
    this._compressFrame = [];
    this._delayEstimateList = [];
  }

  get baseDts () {
    return this._baseDts;
  }

  get duartion () {
    return this._duration;
  }

  get buffered () {
    return {
      length: 1,
      start: () => 0,
      end: () => this._duration
    };
  }

  get bitrate () {
    return this._bitrate;
  }

  get lastDuration () {
    return this._lastDuration;
  }

  _caclBaseDts (frame) {
    if (this._baseDts !== -1) return;
    if (!frame) return;
    this._baseDts = frame.dts;
    logger.log(this.TAG, 'set baseDts: ', this._baseDts, 'frame len:', this._compressFrame.length);
  }

  _updateDuration (frames) {
    let len = frames.length;
    let last = frames[len - 1];

    for (let i = 0; i < len; i++) {
      let f = frames[i];
      if (f && f.options && f.options.meta) {
        let pre = frames[i - 1] || this._compressFrame[this._compressFrame.length - 1];
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
      if (len <= 10) return;
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

  append (frames, upDuration) {
    this._caclBaseDts(frames[0]);

    if (upDuration) {
      this._updateDuration(frames);
    }
    this._estimateBitRate(frames);
    this._compressFrame = this._compressFrame.concat(frames);
  }

  deletePassed (dts) {
    let len = this._compressFrame.length;
    this._compressFrame = this._compressFrame.filter((x) => x.dts > dts);
    return len - this._compressFrame.length;
  }

  shift () {
    let f = this._compressFrame.shift();
    return f;
  }
}
