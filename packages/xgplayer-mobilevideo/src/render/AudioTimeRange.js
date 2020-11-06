export default class AudioTimeRange {

  constructor () {
    this._buffers = [];
    this._duration = 0;
  }

  get duration () {
    return this._duration;
  }

  get buffered () {
    return {
      length: this._duration ? 1 : 0,
      start: () => 0,
      end: () => this._duration
    };
  }

  append (source, duration, startDts) {
    this._buffers.push({
      start: this._duration,
      end: this._duration + duration,
      startDts,
      source
    });
    this._duration += duration;
  }

  shift () {
    return this._buffers.shift();
  }
}
