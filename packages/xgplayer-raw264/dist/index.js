(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer'), require('xgplayer-transmuxer-context'), require('xgplayer-transmuxer-codec-avc'), require('xgplayer-transmuxer-buffer-xgbuffer'), require('xgplayer-transmuxer-loader-fetch'), require('xgplayer-mobilevideo')) :
  typeof define === 'function' && define.amd ? define(['xgplayer', 'xgplayer-transmuxer-context', 'xgplayer-transmuxer-codec-avc', 'xgplayer-transmuxer-buffer-xgbuffer', 'xgplayer-transmuxer-loader-fetch', 'xgplayer-mobilevideo'], factory) :
  (global = global || self, global.H264Player = factory(global.Player, global.Context, global.xgplayerTransmuxerCodecAvc, global.LoaderBuffer, global.FetchLoader));
}(this, (function (Player, Context, xgplayerTransmuxerCodecAvc, LoaderBuffer, FetchLoader) { 'use strict';

  Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;
  Context = Context && Object.prototype.hasOwnProperty.call(Context, 'default') ? Context['default'] : Context;
  LoaderBuffer = LoaderBuffer && Object.prototype.hasOwnProperty.call(LoaderBuffer, 'default') ? LoaderBuffer['default'] : LoaderBuffer;
  FetchLoader = FetchLoader && Object.prototype.hasOwnProperty.call(FetchLoader, 'default') ? FetchLoader['default'] : FetchLoader;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass(Stream, [{
      key: 'back',
      value: function back(count) {
        this.position -= count;
      }
    }, {
      key: 'skip',
      value: function skip(count) {
        var loop = Math.floor(count / 4);
        var last = count % 4;
        for (var i = 0; i < loop; i++) {
          Stream.readByte(this.dataview, 4);
        }
        if (last > 0) {
          Stream.readByte(this.dataview, last);
        }
      }

      /**
       * [readByte 从DataView中读取数据]
       * @param  {DataView} buffer [DataView实例]
       * @param  {Number} size   [读取字节数]
       * @return {Number}        [整数]
       */

    }, {
      key: 'readUint8',
      value: function readUint8() {
        return Stream.readByte(this.dataview, 1);
      }
    }, {
      key: 'readUint16',
      value: function readUint16() {
        return Stream.readByte(this.dataview, 2);
      }
    }, {
      key: 'readUint24',
      value: function readUint24() {
        return Stream.readByte(this.dataview, 3);
      }
    }, {
      key: 'readUint32',
      value: function readUint32() {
        return Stream.readByte(this.dataview, 4);
      }
    }, {
      key: 'readUint64',
      value: function readUint64() {
        return Stream.readByte(this.dataview, 8);
      }
    }, {
      key: 'readInt8',
      value: function readInt8() {
        return Stream.readByte(this.dataview, 1, true);
      }
    }, {
      key: 'readInt16',
      value: function readInt16() {
        return Stream.readByte(this.dataview, 2, true);
      }
    }, {
      key: 'readInt32',
      value: function readInt32() {
        return Stream.readByte(this.dataview, 4, true);
      }
    }, {
      key: 'writeUint32',
      value: function writeUint32(value) {
        return new Uint8Array([value >>> 24 & 0xff, value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff]);
      }
    }, {
      key: 'length',
      get: function get() {
        return this.buffer.byteLength;
      }
    }, {
      key: 'position',
      set: function set(value) {
        this.dataview.position = value;
      },
      get: function get() {
        return this.dataview.position;
      }
    }], [{
      key: 'readByte',
      value: function readByte(buffer, size, sign) {
        var res = void 0;
        switch (size) {
          case 1:
            if (sign) {
              res = buffer.getInt8(buffer.position);
            } else {
              res = buffer.getUint8(buffer.position);
            }
            break;
          case 2:
            if (sign) {
              res = buffer.getInt16(buffer.position);
            } else {
              res = buffer.getUint16(buffer.position);
            }
            break;
          case 3:
            if (sign) {
              throw new Error('not supported for readByte 3');
            } else {
              res = buffer.getUint8(buffer.position) << 16;
              res |= buffer.getUint8(buffer.position + 1) << 8;
              res |= buffer.getUint8(buffer.position + 2);
            }
            break;
          case 4:
            if (sign) {
              res = buffer.getInt32(buffer.position);
            } else {
              res = buffer.getUint32(buffer.position);
            }
            break;
          case 8:
            if (sign) {
              throw new Error('not supported for readBody 8');
            } else {
              res = buffer.getUint32(buffer.position) << 32;
              res |= buffer.getUint32(buffer.position + 4);
            }
            break;
          default:
            res = '';
        }
        buffer.position += size;
        return res;
      }
    }]);

    return Stream;
  }();

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var AudioTrackMeta = function () {
    function AudioTrackMeta(meta) {
      _classCallCheck$1(this, AudioTrackMeta);

      var _default = {
        sampleRate: 48000,
        channelCount: 2,
        codec: 'mp4a.40.2',
        config: [41, 401, 136, 0],
        duration: 0,
        id: 2,
        refSampleDuration: 21,
        sampleRateIndex: 3,
        timescale: 1000,
        type: 'audio'
      };
      if (meta) {
        return Object.assign({}, _default, meta);
      }
      return _default;
    }

    _createClass$1(AudioTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
      }
    }]);

    return AudioTrackMeta;
  }();

  var VideoTrackMeta = function () {
    function VideoTrackMeta(meta) {
      _classCallCheck$1(this, VideoTrackMeta);

      var _default = {
        avcc: null,
        sps: new Uint8Array(0),
        pps: new Uint8Array(0),
        chromaFormat: 420,
        codec: 'avc1.640020',
        codecHeight: 720,
        codecWidth: 1280,
        duration: 0,
        frameRate: {
          fixed: true,
          fps: 25,
          fps_num: 25000,
          fps_den: 1000
        },
        id: 1,
        level: '3.2',
        presentHeight: 720,
        presentWidth: 1280,
        profile: 'High',
        refSampleDuration: 40,
        parRatio: {
          height: 1,
          width: 1
        },
        timescale: 1000,
        type: 'video'
      };

      if (meta) {
        return Object.assign({}, _default, meta);
      }
      return _default;
    }

    _createClass$1(VideoTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
        this.sps = null;
        this.pps = null;
      }
    }]);

    return VideoTrackMeta;
  }();

  var BROWSER_EVENTS = {
    VISIBILITY_CHANGE: 'VISIBILITY_CHANGE'
  };
  var PLAYER_EVENTS = {
    SEEK: 'SEEK'
  };

  var LOADER_EVENTS = {
    LADER_START: 'LOADER_START',
    LOADER_DATALOADED: 'LOADER_DATALOADED',
    LOADER_COMPLETE: 'LOADER_COMPLETE',
    LOADER_ERROR: 'LOADER_ERROR'
  };

  var DEMUX_EVENTS = {
    DEMUX_START: 'DEMUX_START',
    DEMUX_COMPLETE: 'DEMUX_COMPLETE',
    DEMUX_ERROR: 'DEMUX_ERROR',
    METADATA_PARSED: 'METADATA_PARSED',
    SEI_PARSED: 'SEI_PARSED',
    VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
    AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
    MEDIA_INFO: 'MEDIA_INFO'
  };

  var REMUX_EVENTS = {
    REMUX_METADATA: 'REMUX_METADATA',
    REMUX_MEDIA: 'REMUX_MEDIA',
    MEDIA_SEGMENT: 'MEDIA_SEGMENT',
    REMUX_ERROR: 'REMUX_ERROR',
    INIT_SEGMENT: 'INIT_SEGMENT',
    DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM',
    DETECT_CHANGE_STREAM_DISCONTINUE: 'DETECT_CHANGE_STREAM_DISCONTINUE',
    RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT'
  };

  var MSE_EVENTS = {
    SOURCE_UPDATE_END: 'SOURCE_UPDATE_END'

    // hls专有events
  };var HLS_EVENTS = {
    RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
  };

  var CRYTO_EVENTS = {
    START_DECRYPT: 'START_DECRYPT',
    DECRYPTED: 'DECRYPTED'
  };
  var ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS, PLAYER_EVENTS, BROWSER_EVENTS);

  var FlvAllowedEvents = [];
  var HlsAllowedEvents = [];

  for (var key in ALLEVENTS) {
    if (ALLEVENTS.hasOwnProperty(key)) {
      FlvAllowedEvents.push(ALLEVENTS[key]);
    }
  }

  for (var _key in ALLEVENTS) {
    if (ALLEVENTS.hasOwnProperty(_key)) {
      HlsAllowedEvents.push(ALLEVENTS[_key]);
    }
  }

  var Events = {
    ALLEVENTS: ALLEVENTS,
    HLS_EVENTS: HLS_EVENTS,
    REMUX_EVENTS: REMUX_EVENTS,
    DEMUX_EVENTS: DEMUX_EVENTS,
    MSE_EVENTS: MSE_EVENTS,
    LOADER_EVENTS: LOADER_EVENTS,
    FlvAllowedEvents: FlvAllowedEvents,
    HlsAllowedEvents: HlsAllowedEvents,
    CRYTO_EVENTS: CRYTO_EVENTS,
    PLAYER_EVENTS: PLAYER_EVENTS,
    BROWSER_EVENTS: BROWSER_EVENTS
  };

  var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var H264Demuxer = function () {
    function H264Demuxer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$2(this, H264Demuxer);

      this._player = options.player;

      this.videoMeta = new VideoTrackMeta();
      this.videoTrack = {
        samples: []
      };
      this.fps = options.fps || 30;
      this.currentSampleIdx = 0;
      this.duration = 0;
    }

    _createClass$2(H264Demuxer, [{
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
        var stream = new Stream(data.buffer);
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

  var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Raw264Player = function (_Player) {
    _inherits(Raw264Player, _Player);

    function Raw264Player(props) {
      _classCallCheck$3(this, Raw264Player);

      if (!props.mediaType) {
        props.mediaType = 'mobile-video';
      }

      var _this = _possibleConstructorReturn(this, (Raw264Player.__proto__ || Object.getPrototypeOf(Raw264Player)).call(this, props));

      _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);
      _this.hasPlayed = false;
      return _this;
    }

    _createClass$3(Raw264Player, [{
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
