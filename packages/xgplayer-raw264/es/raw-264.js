var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { NalUnit, SpsParser, SEIParser, Golomb } from 'xgplayer-transmuxer-codec-avc';
import XgStream from 'xgplayer-transmuxer-buffer-stream';
import { VideoTrackMeta } from 'xgplayer-transmuxer-model-trackmeta';
import Events from 'xgplayer-transmuxer-constant-events';

var H264Demuxer = function () {
  function H264Demuxer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, H264Demuxer);

    this._player = options.player;

    this.videoMeta = new VideoTrackMeta();
    this.videoTrack = {
      samples: []
    };
    this.unusedUnits = [];
    this.fps = options.fps || 30;
    this.currentSampleIdx = 0;
    this.duration = 0;
    this.sps = null;
    this.pps = null;

    this.dataLoadedTimer = null;
  }

  _createClass(H264Demuxer, [{
    key: 'init',
    value: function init() {
      this.initEvents();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on(Events.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this));
      this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this));
    }
  }, {
    key: 'load',
    value: function load(url) {
      this.emit(Events.LOADER_EVENTS.LADER_START, url);
    }
  }, {
    key: 'handleDataLoaded',
    value: function handleDataLoaded() {
      var _this = this;

      var buffer = this.buffer;

      if (!buffer) {
        return;
      }
      if (this.dataLoadedTimer) {
        clearTimeout(this.dataLoadedTimer);
        this.dataLoadedTimer = null;
      }

      var data = buffer.shift(buffer.length);
      buffer.clear();
      var stream = new XgStream(data.buffer);

      var units = this.unusedUnits.concat(NalUnit.getNalunits(stream));

      if (!this._player.config.isLive) {
        if (units.length > 1) {
          var lastUnit = units.pop();
          var pushBackData = new Uint8Array(lastUnit.body.byteLength + 4);
          pushBackData.set(new Uint8Array(lastUnit.header), 0);
          pushBackData.set(lastUnit.body, 4);
          buffer.push(pushBackData);

          this.pushToMobileVideo(units);
          if (this.buffer.length) {
            this.dataLoadedTimer = setTimeout(function () {
              _this.handleDataLoaded();
            }, 500);
          }
        } else if (units.length === 1) {
          buffer.push(new Uint8Array(data));
          this.dataLoadedTimer = setTimeout(function () {
            _this.handleDataLoaded();
          }, 500);
        }
      } else {
        this.pushToMobileVideo(units);
      }
    }
  }, {
    key: 'pushToMobileVideo',
    value: function pushToMobileVideo(units) {
      var _this2 = this;

      var _H264Demuxer$unitsToS = H264Demuxer.unitsToSamples(units),
          samples = _H264Demuxer$unitsToS.samples,
          unused = _H264Demuxer$unitsToS.unused;

      this.unusedUnits = unused;

      samples.forEach(function (sample) {
        var ts = Math.floor(1000 * _this2.currentSampleIdx++ / _this2.fps);
        sample.dts = sample.pts = ts;
        if (sample.sps) {
          _this2.sps = true;
          _this2.videoMeta.sps = sample.data.slice(4);
          _this2.videoMeta.presentHeight = sample.sps.present_size.height;
          _this2.videoMeta.presentWidth = sample.sps.present_size.width;
        } else if (sample.pps) {
          _this2.pps = true;
          _this2.videoMeta.pps = sample.data.slice(4);
        } else {
          _this2.videoTrack.samples.push(sample);
        }
      });

      if (this.sps && this.pps) {
        this._player.video.setVideoMeta(this.videoMeta);
        this.sps = null;
        this.pps = null;
      }
      if (!this.intervalId && !this._player.config.isLive) {
        this.intervalId = setInterval(function () {
          _this2.handleDataLoaded();
        }, 500);
      } else {
        this._player.video.onDemuxComplete(this.videoTrack);
      }
      this.duration = Math.round(Math.floor(this.currentSampleIdx / this.fps));
      this._player.emit('durationchange');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._player = null;
      this.videoMeta = null;
      this.videoTrack = {
        samples: []
      };
      this.fps = null;
      this.currentSampleIdx = null;
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }, {
    key: 'buffer',
    get: function get() {
      return this._context.getInstance('LOADER_BUFFER');
    }
  }], [{
    key: 'unitsToSamples',
    value: function unitsToSamples(units) {
      var temp = [];
      var samples = [];
      units.forEach(function (unit) {
        var golomb = new Golomb(new Uint8Array(unit.body));
        golomb.readByte();
        if (!golomb.readUEG() || unit.sps || unit.pps) {
          // first_mb_slice
          if (temp.length) {
            samples.push(H264Demuxer.combineUnits(temp));
          }
          temp = [unit];
        } else {
          temp.push(unit);
        }
      });

      return {
        samples: samples,
        unused: temp
      };
    }
  }, {
    key: 'combineUnits',
    value: function combineUnits(units) {
      var sps = void 0,
          pps = void 0;
      var dataSize = units.reduce(function (result, unit) {
        if (unit.sps) {
          sps = unit.sps;
        } else if (unit.pps) {
          pps = unit.pps;
        }
        return result + unit.header.byteLength + unit.body.byteLength;
      }, 0);

      var data = new Uint8Array(dataSize);
      var offset = 0;
      var isKeyframe = void 0;
      units.forEach(function (unit) {
        data.set(new Uint8Array(unit.header), offset);
        offset += unit.header.byteLength;
        data.set(unit.body, offset);
        offset += unit.body.byteLength;
        if (unit.idr) {
          isKeyframe = true;
        }
      });

      return {
        data: data,
        sps: sps,
        pps: pps,
        isKeyframe: isKeyframe
      };
    }
  }]);

  return H264Demuxer;
}();

export default H264Demuxer;