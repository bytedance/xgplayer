(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer'), require('xgplayer-transmuxer-context'), require('xgplayer-transmuxer-codec-avc'), require('xgplayer-transmuxer-buffer-stream'), require('xgplayer-transmuxer-model-trackmeta'), require('xgplayer-transmuxer-constant-events'), require('xgplayer-transmuxer-buffer-xgbuffer'), require('xgplayer-transmuxer-loader-fetch'), require('xgplayer-mobilevideo')) :
  typeof define === 'function' && define.amd ? define(['xgplayer', 'xgplayer-transmuxer-context', 'xgplayer-transmuxer-codec-avc', 'xgplayer-transmuxer-buffer-stream', 'xgplayer-transmuxer-model-trackmeta', 'xgplayer-transmuxer-constant-events', 'xgplayer-transmuxer-buffer-xgbuffer', 'xgplayer-transmuxer-loader-fetch', 'xgplayer-mobilevideo'], factory) :
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
      this.fps = options.fps || 30;
      this.currentSampleIdx = 0;
      this.duration = 0;
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
        // this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this))
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
        var data = buffer.shift(buffer.length);
        buffer.clear();
        var stream = new XgStream(data.buffer);
        var units = xgplayerTransmuxerCodecAvc.NalUnit.getNalunits(stream);

        var lastUnit = units.pop();
        var lastUnitData = new Uint8Array(lastUnit.body.byteLength + 4);
        lastUnitData.set(new Uint8Array(lastUnit.header), 0);
        lastUnitData.set(new Uint8Array(lastUnit.body), 4);
        buffer.push(lastUnitData);

        var sps = void 0;
        var pps = void 0;
        units.forEach(function (unit) {
          var ts = Math.floor(1000 * _this.currentSampleIdx++ / _this.fps);
          var currentSample = {
            dts: ts,
            pts: ts,
            data: null,
            isKeyframe: false
          };
          if (unit.sps) {
            sps = true;
            _this.videoMeta.sps = unit.body;
            _this.videoMeta.presentHeight = unit.sps.present_size.height;
            _this.videoMeta.presentWidth = unit.sps.present_size.width;
          } else if (unit.pps) {
            pps = true;
            _this.videoMeta.pps = unit.body;
          }

          var data = new Uint8Array(unit.body.byteLength + 4);
          data.set([0, 0, 0, 1], 0);
          data.set(unit.body, 4);
          currentSample.data = data;
          currentSample.isKeyframe = unit.idr;

          _this.videoTrack.samples.push(currentSample);
        });

        if (sps && pps && !this.videoMetaInited) {
          this._player.video.setVideoMeta(this.videoMeta);
          this.videoMetaInited = true;
        }
        if (!this.intervalId) {
          this.intervalId = setInterval(function () {
            if (_this.videoTrack.samples.length) {
              _this._player.video.onDemuxComplete(_this.videoTrack);
            } else {
              clearInterval(_this.intervalId);
            }
          }, 500);
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
      }
    }, {
      key: 'buffer',
      get: function get() {
        return this._context.getInstance('LOADER_BUFFER');
      }
    }]);

    return H264Demuxer;
  }();

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Raw264Player = function (_Player) {
    _inherits(Raw264Player, _Player);

    function Raw264Player(props) {
      _classCallCheck$1(this, Raw264Player);

      if (!props.mediaType) {
        props.mediaType = 'mobile-video';
      }

      var _this = _possibleConstructorReturn(this, (Raw264Player.__proto__ || Object.getPrototypeOf(Raw264Player)).call(this, props));

      _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);
      _this.hasPlayed = false;
      return _this;
    }

    _createClass$1(Raw264Player, [{
      key: 'start',
      value: function start() {

        this.context = new Context(Events.HlsAllowedEvents);
        this.context.registry('LOADER_BUFFER', LoaderBuffer);
        this.core = this.context.registry('RAW_264_CONTROLLER', H264Demuxer)({ player: this, fps: this.config.fps });
        if (!this.config.isLive) {
          this.context.registry('FETCH_LOADER', FetchLoader);
          this.core.load(this.config.url);
        }
        this.context.init();

        _get(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'start', this).call(this);
        this.video.setAttribute('noaudio', true);
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
        if (this.config.isLive) {
          this.video._cleanBuffer();
        } else {
          if (this.currentTime >= this.duration) {
            this.pause();
            this.emit('ended');
          }
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
