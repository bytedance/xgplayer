(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer'), require('xgplayer-transmuxer-context'), require('xgplayer-transmuxer-codec-avc'), require('xgplayer-transmuxer-buffer-stream'), require('xgplayer-transmuxer-model-trackmeta'), require('xgplayer-transmuxer-constant-events'), require('xgplayer-transmuxer-buffer-xgbuffer'), require('xgplayer-transmuxer-loader-fetch')) :
  typeof define === 'function' && define.amd ? define(['xgplayer', 'xgplayer-transmuxer-context', 'xgplayer-transmuxer-codec-avc', 'xgplayer-transmuxer-buffer-stream', 'xgplayer-transmuxer-model-trackmeta', 'xgplayer-transmuxer-constant-events', 'xgplayer-transmuxer-buffer-xgbuffer', 'xgplayer-transmuxer-loader-fetch'], factory) :
  (global = global || self, global.H264Player = factory(global.Player, global.Context, global.xgplayerTransmuxerCodecAvc, global.XgStream, global.xgplayerTransmuxerModelTrackmeta, global.Events, global.LoaderBuffer, global.FetchLoader));
}(this, (function (Player, Context, xgplayerTransmuxerCodecAvc, XgStream, xgplayerTransmuxerModelTrackmeta, Events, LoaderBuffer, FetchLoader) { 'use strict';

  Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;
  Context = Context && Object.prototype.hasOwnProperty.call(Context, 'default') ? Context['default'] : Context;
  XgStream = XgStream && Object.prototype.hasOwnProperty.call(XgStream, 'default') ? XgStream['default'] : XgStream;
  Events = Events && Object.prototype.hasOwnProperty.call(Events, 'default') ? Events['default'] : Events;
  LoaderBuffer = LoaderBuffer && Object.prototype.hasOwnProperty.call(LoaderBuffer, 'default') ? LoaderBuffer['default'] : LoaderBuffer;
  FetchLoader = FetchLoader && Object.prototype.hasOwnProperty.call(FetchLoader, 'default') ? FetchLoader['default'] : FetchLoader;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var H264Demuxer = function () {
    function H264Demuxer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, H264Demuxer);

      this._player = options.player;

      this.videoMeta = new xgplayerTransmuxerModelTrackmeta.VideoTrackMeta();
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

        var units = this.unusedUnits.concat(xgplayerTransmuxerCodecAvc.NalUnit.getNalunits(stream));

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
          var golomb = new xgplayerTransmuxerCodecAvc.Golomb(new Uint8Array(unit.body));
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

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var asmSupported = function asmSupported() {
    try {
      (function MyAsmModule() {
        'use asm';
      })();
      return true;
    } catch (err) {
      // will never show...
      return false;
    }
  };

  var Raw264Player = function (_Player) {
    _inherits(Raw264Player, _Player);

    _createClass$1(Raw264Player, null, [{
      key: 'isSupported',
      value: function isSupported() {
        var wasmSupported = 'WebAssembly' in window;

        var WebComponentSupported = 'customElements' in window && window.customElements.define;
        var isComponentDefined = void 0;
        if (WebComponentSupported) {
          isComponentDefined = window.customElements.get('mobile-video');
        }
        return (wasmSupported || asmSupported) && isComponentDefined;
      }
    }]);

    function Raw264Player(props) {
      _classCallCheck$1(this, Raw264Player);

      if (!props.mediaType) {
        props.mediaType = 'mobile-video';
        if (props.videoConfig) {
          props.videoConfig.preloadtime = props.preloadTime || 5;
        } else {
          props.videoConfig = {
            preloadtime: props.preloadTime || 5
          };
        }
      }

      var _this = _possibleConstructorReturn(this, (Raw264Player.__proto__ || Object.getPrototypeOf(Raw264Player)).call(this, props));

      _this.video.setAttribute('noaudio', true);
      _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);
      _this.hasPlayed = false;
      _this.hasStart = false;
      return _this;
    }

    _createClass$1(Raw264Player, [{
      key: 'start',
      value: function start() {
        if (this.hasStart) {
          return;
        } else {
          this.hasStart = true;
        }
        this.context = new Context(Events.HlsAllowedEvents);
        this.context.registry('LOADER_BUFFER', LoaderBuffer);
        this.core = this.context.registry('RAW_264_CONTROLLER', H264Demuxer)({ player: this, fps: this.config.fps });
        this.context.registry('FETCH_LOADER', FetchLoader);
        this.context.init();
        if (!this.config.isLive) {
          this.core.load(this.config.url);
        }

        _get(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'start', this).call(this);
        this.video.preloadTime = this.config.preloadTime;
        this.video.addEventListener('timeupdate', this.handleTimeupdate, false);
      }
    }, {
      key: 'replay',
      value: function replay() {
        this.video._cleanBuffer();
        this.currentTime = 0;
        this.start();
        this.play();
      }
    }, {
      key: 'handleTimeupdate',
      value: function handleTimeupdate() {
        if (!this.config.isLive && this.currentTime >= this.duration) {
          this.video._cleanBuffer();
          this.pause();
          this.emit('ended');
        } else if (this.config.isLive && this.buffered.end(0) - this.currentTime > 0.1) {
          this.currentTime = this.buffered.end(0) - 0.1;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy(isDelDom) {
        _get(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'destroy', this).call(this, isDelDom);
        this.core.destroy();
        this.context.destroy();
        this.core = null;
        this.context = null;
      }
    }, {
      key: 'pushBuffer',
      value: function pushBuffer(arr) {
        if (!this.hasStart) {
          return this.start();
        }
        if (this.buffer) {
          this.buffer.push(arr);
          this.core.handleDataLoaded();
        }
      }
    }, {
      key: 'buffer',
      get: function get() {
        return this.context.getInstance('LOADER_BUFFER');
      }
    }, {
      key: 'currentTime',
      set: function set(time) {
        var oldTime = _get(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
        var buffered = this.getBufferedRange();
        if (buffered[0] <= time && buffered[1] >= time) {
          this.video.currentTime = time;
        } else {
          this.video.currentTime = oldTime;
        }
      },
      get: function get() {
        return _get(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
      }
    }, {
      key: 'duration',
      get: function get() {
        if (this.core && this.core.duration) {
          return this.core.duration;
        }
        return this.video.duration;
      }
    }]);

    return Raw264Player;
  }(Player);

  return Raw264Player;

})));
//# sourceMappingURL=index.js.map
