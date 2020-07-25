(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer'), require('xgplayer-transmuxer-context'), require('xgplayer-transmuxer-buffer-stream'), require('xgplayer-transmuxer-model-trackmeta'), require('xgplayer-transmuxer-constant-events'), require('xgplayer-transmuxer-buffer-xgbuffer'), require('xgplayer-transmuxer-loader-fetch')) :
  typeof define === 'function' && define.amd ? define(['xgplayer', 'xgplayer-transmuxer-context', 'xgplayer-transmuxer-buffer-stream', 'xgplayer-transmuxer-model-trackmeta', 'xgplayer-transmuxer-constant-events', 'xgplayer-transmuxer-buffer-xgbuffer', 'xgplayer-transmuxer-loader-fetch'], factory) :
  (global = global || self, global.H264Player = factory(global.Player, global.Context$1, global.XgStream, global.xgplayerTransmuxerModelTrackmeta, global.Events$1, global.LoaderBuffer, global.FetchLoader$1));
}(this, (function (Player, Context$1, XgStream, xgplayerTransmuxerModelTrackmeta, Events$1, LoaderBuffer, FetchLoader$1) { 'use strict';

  Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;
  Context$1 = Context$1 && Object.prototype.hasOwnProperty.call(Context$1, 'default') ? Context$1['default'] : Context$1;
  XgStream = XgStream && Object.prototype.hasOwnProperty.call(XgStream, 'default') ? XgStream['default'] : XgStream;
  Events$1 = Events$1 && Object.prototype.hasOwnProperty.call(Events$1, 'default') ? Events$1['default'] : Events$1;
  LoaderBuffer = LoaderBuffer && Object.prototype.hasOwnProperty.call(LoaderBuffer, 'default') ? LoaderBuffer['default'] : LoaderBuffer;
  FetchLoader$1 = FetchLoader$1 && Object.prototype.hasOwnProperty.call(FetchLoader$1, 'default') ? FetchLoader$1['default'] : FetchLoader$1;

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Golomb = function () {
    function Golomb(uint8array) {
      _classCallCheck(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass(Golomb, [{
      key: 'destroy',
      value: function destroy() {
        this._buffer = null;
      }
    }, {
      key: '_fillCurrentWord',
      value: function _fillCurrentWord() {
        var bufferBytesLeft = this._totalBytes - this._bufferIndex;

        var bytesRead = Math.min(4, bufferBytesLeft);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
        this._currentWord = new DataView(word.buffer).getUint32(0);

        this._bufferIndex += bytesRead;
        this._currentWordBitsLeft = bytesRead * 8;
      }
    }, {
      key: 'readBits',
      value: function readBits(size) {
        var bits = Math.min(this._currentWordBitsLeft, size); // :uint
        var valu = this._currentWord >>> 32 - bits;
        if (size > 32) {
          throw new Error('Cannot read more than 32 bits at a time');
        }
        this._currentWordBitsLeft -= bits;
        if (this._currentWordBitsLeft > 0) {
          this._currentWord <<= bits;
        } else if (this._totalBytes - this._bufferIndex > 0) {
          this._fillCurrentWord();
        }

        bits = size - bits;
        if (bits > 0 && this._currentWordBitsLeft) {
          return valu << bits | this.readBits(bits);
        } else {
          return valu;
        }
      }
    }, {
      key: 'readBool',
      value: function readBool() {
        return this.readBits(1) === 1;
      }
    }, {
      key: 'readByte',
      value: function readByte() {
        return this.readBits(8);
      }
    }, {
      key: '_skipLeadingZero',
      value: function _skipLeadingZero() {
        var zeroCount = void 0;
        for (zeroCount = 0; zeroCount < this._currentWordBitsLeft; zeroCount++) {
          if ((this._currentWord & 0x80000000 >>> zeroCount) !== 0) {
            this._currentWord <<= zeroCount;
            this._currentWordBitsLeft -= zeroCount;
            return zeroCount;
          }
        }
        this._fillCurrentWord();
        return zeroCount + this._skipLeadingZero();
      }
    }, {
      key: 'readUEG',
      value: function readUEG() {
        // unsigned exponential golomb
        var leadingZeros = this._skipLeadingZero();
        return this.readBits(leadingZeros + 1) - 1;
      }
    }, {
      key: 'readSEG',
      value: function readSEG() {
        // signed exponential golomb
        var value = this.readUEG();
        if (value & 0x01) {
          return value + 1 >>> 1;
        } else {
          return -1 * (value >>> 1);
        }
      }
    }]);

    return Golomb;
  }();

  var _createClass$1 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SPSParser = function () {
    function SPSParser() {
      _classCallCheck$1(this, SPSParser);
    }

    _createClass$1(SPSParser, null, [{
      key: '_ebsp2rbsp',
      value: function _ebsp2rbsp(uint8array) {
        var src = uint8array;
        var srcLength = src.byteLength;
        var dst = new Uint8Array(srcLength);
        var dstIdx = 0;

        for (var i = 0; i < srcLength; i++) {
          if (i >= 2) {
            if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
              continue;
            }
          }
          dst[dstIdx] = src[i];
          dstIdx++;
        }

        return new Uint8Array(dst.buffer, 0, dstIdx);
      }
    }, {
      key: 'parseSPS',
      value: function parseSPS(uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);
        var gb = new Golomb(rbsp);

        gb.readByte();
        var profileIdc = gb.readByte();
        gb.readByte();
        var levelIdc = gb.readByte();
        gb.readUEG();

        var profile_string = SPSParser.getProfileString(profileIdc);
        var level_string = SPSParser.getLevelString(levelIdc);
        var chroma_format_idc = 1;
        var chroma_format = 420;
        var chroma_format_table = [0, 420, 422, 444];
        var bit_depth = 8;

        if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128 || profileIdc === 138 || profileIdc === 144) {
          chroma_format_idc = gb.readUEG();
          if (chroma_format_idc === 3) {
            gb.readBits(1);
          }
          if (chroma_format_idc <= 3) {
            chroma_format = chroma_format_table[chroma_format_idc];
          }

          bit_depth = gb.readUEG() + 8;
          gb.readUEG();
          gb.readBits(1);
          if (gb.readBool()) {
            var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
            for (var i = 0; i < scaling_list_count; i++) {
              if (gb.readBool()) {
                if (i < 6) {
                  SPSParser._skipScalingList(gb, 16);
                } else {
                  SPSParser._skipScalingList(gb, 64);
                }
              }
            }
          }
        }
        gb.readUEG();
        var pic_order_cnt_type = gb.readUEG();
        if (pic_order_cnt_type === 0) {
          gb.readUEG();
        } else if (pic_order_cnt_type === 1) {
          gb.readBits(1);
          gb.readSEG();
          gb.readSEG();
          var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
          for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
            gb.readSEG();
          }
        }
        gb.readUEG();
        gb.readBits(1);

        var pic_width_in_mbs_minus1 = gb.readUEG();
        var pic_height_in_map_units_minus1 = gb.readUEG();

        var frame_mbs_only_flag = gb.readBits(1);
        if (frame_mbs_only_flag === 0) {
          gb.readBits(1);
        }
        gb.readBits(1);

        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;

        var frame_cropping_flag = gb.readBool();
        if (frame_cropping_flag) {
          frame_crop_left_offset = gb.readUEG();
          frame_crop_right_offset = gb.readUEG();
          frame_crop_top_offset = gb.readUEG();
          frame_crop_bottom_offset = gb.readUEG();
        }

        var par_width = 1,
            par_height = 1;
        var fps = 0,
            fps_fixed = true,
            fps_num = 0,
            fps_den = 0;

        var vui_parameters_present_flag = gb.readBool();
        if (vui_parameters_present_flag) {
          if (gb.readBool()) {
            // aspect_ratio_info_present_flag
            var aspect_ratio_idc = gb.readByte();
            var par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
            var par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

            if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
              par_width = par_w_table[aspect_ratio_idc - 1];
              par_height = par_h_table[aspect_ratio_idc - 1];
            } else if (aspect_ratio_idc === 255) {
              par_width = gb.readByte() << 8 | gb.readByte();
              par_height = gb.readByte() << 8 | gb.readByte();
            }
          }

          if (gb.readBool()) {
            gb.readBool();
          }
          if (gb.readBool()) {
            gb.readBits(4);
            if (gb.readBool()) {
              gb.readBits(24);
            }
          }
          if (gb.readBool()) {
            gb.readUEG();
            gb.readUEG();
          }
          if (gb.readBool()) {
            var num_units_in_tick = gb.readBits(32);
            var time_scale = gb.readBits(32);
            fps_fixed = gb.readBool();

            fps_num = time_scale;
            fps_den = num_units_in_tick * 2;
            fps = fps_num / fps_den;
          }
        }

        var parScale = 1;
        if (par_width !== 1 || par_height !== 1) {
          parScale = par_width / par_height;
        }

        var crop_unit_x = 0,
            crop_unit_y = 0;
        if (chroma_format_idc === 0) {
          crop_unit_x = 1;
          crop_unit_y = 2 - frame_mbs_only_flag;
        } else {
          var sub_wc = chroma_format_idc === 3 ? 1 : 2;
          var sub_hc = chroma_format_idc === 1 ? 2 : 1;
          crop_unit_x = sub_wc;
          crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
        }

        var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
        var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

        codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
        codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

        var present_width = Math.ceil(codec_width * parScale);

        gb.destroy();
        gb = null;

        return {
          profile_string: profile_string,
          level_string: level_string,
          bit_depth: bit_depth,
          chroma_format: chroma_format,
          chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

          frame_rate: {
            fixed: fps_fixed,
            fps: fps,
            fps_den: fps_den,
            fps_num: fps_num
          },

          par_ratio: {
            width: par_width,
            height: par_height
          },

          codec_size: {
            width: codec_width,
            height: codec_height
          },

          present_size: {
            width: present_width,
            height: codec_height
          }
        };
      }
    }, {
      key: '_skipScalingList',
      value: function _skipScalingList(gb, count) {
        var lastScale = 8;
        var nextScale = 8;
        var deltaScale = 0;
        for (var i = 0; i < count; i++) {
          if (nextScale !== 0) {
            deltaScale = gb.readSEG();
            nextScale = (lastScale + deltaScale + 256) % 256;
          }
          lastScale = nextScale === 0 ? lastScale : nextScale;
        }
      }
    }, {
      key: 'getProfileString',
      value: function getProfileString(profileIdc) {
        switch (profileIdc) {
          case 66:
            return 'Baseline';
          case 77:
            return 'Main';
          case 88:
            return 'Extended';
          case 100:
            return 'High';
          case 110:
            return 'High10';
          case 122:
            return 'High422';
          case 244:
            return 'High444';
          default:
            return 'Unknown';
        }
      }
    }, {
      key: 'getLevelString',
      value: function getLevelString(levelIdc) {
        return (levelIdc / 10).toFixed(1);
      }
    }, {
      key: 'getChromaFormatString',
      value: function getChromaFormatString(chroma) {
        switch (chroma) {
          case 420:
            return '4:2:0';
          case 422:
            return '4:2:2';
          case 444:
            return '4:4:4';
          default:
            return 'Unknown';
        }
      }
    }, {
      key: 'toVideoMeta',
      value: function toVideoMeta(spsConfig) {
        var meta = {};
        if (spsConfig && spsConfig.codec_size) {
          meta.codecWidth = spsConfig.codec_size.width;
          meta.codecHeight = spsConfig.codec_size.height;
          meta.presentWidth = spsConfig.present_size.width;
          meta.presentHeight = spsConfig.present_size.height;
        }

        meta.profile = spsConfig.profile_string;
        meta.level = spsConfig.level_string;
        meta.bitDepth = spsConfig.bit_depth;
        meta.chromaFormat = spsConfig.chroma_format;

        meta.parRatio = {
          width: spsConfig.par_ratio.width,
          height: spsConfig.par_ratio.height
        };

        meta.frameRate = spsConfig.frame_rate;

        var fpsDen = meta.frameRate.fps_den;
        var fpsNum = meta.frameRate.fps_num;
        meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum));
        return meta;
      }
    }]);

    return SPSParser;
  }();

  var _createClass$2 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var RBSP = function () {
    function RBSP() {
      _classCallCheck$2(this, RBSP);
    }

    _createClass$2(RBSP, null, [{
      key: "EBSP2RBSP",

      /**
       * convert EBSP to RBSP
       * @param data {Uint8Array}
       * @returns {Uint8Array}
       * @constructor
       */
      value: function EBSP2RBSP(data) {
        return data.filter(function (el, idx) {
          if (idx < 2) {
            return true;
          } else {
            return !(data[idx - 2] === 0 && data[idx - 1] === 0 && el === 3);
          }
        });
      }

      /**
       * @param data {Uint8Array}
       * @constructor
       */

    }, {
      key: "EBSP2SODB",
      value: function EBSP2SODB(data) {
        var lastByte = data[data.byteLength - 1];
        if (lastByte && lastByte === 128) {
          return data.slice(0, data.byteLength - 1);
        }

        return data;
      }
    }]);

    return RBSP;
  }();

  var _createClass$3 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var u8aToString = function u8aToString(data) {
    var result = '';
    for (var i = 0; i < data.byteLength; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  };

  var SEIParser = function () {
    function SEIParser() {
      _classCallCheck$3(this, SEIParser);
    }

    _createClass$3(SEIParser, null, [{
      key: '_resolveNalu',
      value: function _resolveNalu(data) {
        if (data.length >= 1) {
          return RBSP.EBSP2SODB(RBSP.EBSP2RBSP(data.slice(1)));
        }
        return null;
      }
      /**
       *
       * @param data {Uint8Array}
       */

    }, {
      key: 'parse',
      value: function parse(data) {
        var sodb = SEIParser._resolveNalu(data);

        var _SEIParser$switchPayl = SEIParser.switchPayloadType(sodb),
            payloadType = _SEIParser$switchPayl.payloadType,
            offset = _SEIParser$switchPayl.offset;

        var content = sodb.slice(offset);

        switch (payloadType) {
          case 5:
            return SEIParser.user_data_unregistered(content);
          default:
            return {
              code: payloadType,
              content: content
            };
        }
      }

      /**
       *
       * @param data
       * @returns {{payloadType: number, offset: number}}
       */

    }, {
      key: 'switchPayloadType',
      value: function switchPayloadType(data) {
        var dv = new DataView(data.buffer);
        var payloadType = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadType += 255;
        }
        payloadType += dv.getUint8(offset++);

        return {
          payloadType: payloadType,
          offset: offset
        };
      }

      /**
       *
       * @param data {Uint8Array}
       * @return {{ payloadLength: number, offset: number }}
       */

    }, {
      key: 'getPayloadLength',
      value: function getPayloadLength(data) {
        var dv = new DataView(data.buffer);

        var payloadLength = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadLength += 255;
        }
        payloadLength += dv.getUint8(offset++);

        return {
          payloadLength: payloadLength,
          offset: offset
        };
      }

      /**
       * resolve 0x05 user data unregistered
       * @param data {Uint8Array}
       */
      // eslint-disable-next-line camelcase

    }, {
      key: 'user_data_unregistered',
      value: function user_data_unregistered(data) {
        var _SEIParser$getPayload = SEIParser.getPayloadLength(data),
            payloadLength = _SEIParser$getPayload.payloadLength,
            offset = _SEIParser$getPayload.offset;

        if (payloadLength < 16) {
          return {
            uuid: '',
            content: null
          };
        }
        var payload = data.slice(offset);

        var uuid = u8aToString(payload.slice(0, 16));
        var content = u8aToString(payload.slice(16, payloadLength));

        return {
          code: 5, // for user data unregistered
          uuid: uuid,
          content: content
        };
      }
    }]);

    return SEIParser;
  }();

  var _createClass$4 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Nalunit = function () {
    function Nalunit() {
      _classCallCheck$4(this, Nalunit);
    }

    _createClass$4(Nalunit, null, [{
      key: 'getNalunits',
      value: function getNalunits(buffer) {
        if (buffer.length - buffer.position < 4) {
          return [];
        }

        var buf = buffer.dataview;
        var position = buffer.position;
        if (buf.getInt32(position) === 1 || buf.getInt16(position) === 0 && buf.getInt8(position + 3) === 1) {
          return Nalunit.getAnnexbNals(buffer);
        } else {
          return Nalunit.getAvccNals(buffer);
        }
      }
    }, {
      key: 'getAnnexbNals',
      value: function getAnnexbNals(buffer) {
        var nals = [];
        var position = Nalunit.getHeaderPositionAnnexB(buffer);
        var start = position.pos;
        var end = start;
        while (start < buffer.length - 4) {
          var header = buffer.buffer.slice(start, start + position.headerLength);
          if (position.pos === buffer.position) {
            buffer.skip(position.headerLength);
          }
          position = Nalunit.getHeaderPositionAnnexB(buffer);
          end = position.pos;
          var body = new Uint8Array(buffer.buffer.slice(start + header.byteLength, end));
          var unit = { header: header, body: body };
          Nalunit.analyseNal(unit);
          if (unit.type <= 9 && unit.type !== 0) {
            nals.push(unit);
          }
          buffer.skip(end - buffer.position);
          start = end;
        }
        return nals;
      }
    }, {
      key: 'getAvccNals',
      value: function getAvccNals(buffer) {
        // buffer.buffer = RBSP.EBSP2RBSP(new Uint8Array(buffer.buffer)).buffer;
        // buffer.dataview = new DataView(buffer.buffer)
        // buffer.dataview.position = 0;
        var nals = [];
        while (buffer.position < buffer.length - 4) {
          var length = buffer.dataview.getInt32(buffer.dataview.position);
          if (buffer.length - buffer.position >= length) {
            var header = buffer.buffer.slice(buffer.position, buffer.position + 4);
            buffer.skip(4);
            var body = new Uint8Array(buffer.buffer.slice(buffer.position, buffer.position + length));
            buffer.skip(length);
            var unit = { header: header, body: body };
            Nalunit.analyseNal(unit);
            if (unit.type <= 9 && unit.type !== 0) {
              nals.push(unit);
            }
          } else {
            break;
          }
        }
        return nals;
      }
    }, {
      key: 'analyseNal',
      value: function analyseNal(unit) {
        var type = unit.body[0] & 0x1f;
        unit.type = type;
        switch (type) {
          case 1:
            // NDR
            unit.ndr = true;
            break;
          case 5:
            // IDR
            unit.idr = true;
            break;
          case 6:
            // SEI
            unit.sei = SEIParser.parse(unit.body);
            break;
          case 7:
            // SPS
            unit.sps = SPSParser.parseSPS(unit.body);
            break;
          case 8:
            // PPS
            unit.pps = true;
            break;
        }
      }
    }, {
      key: 'getHeaderPositionAnnexB',
      value: function getHeaderPositionAnnexB(buffer) {
        // seperate
        var pos = buffer.position;
        var headerLength = 0;
        var bufferLen = buffer.length;
        while (headerLength !== 3 && headerLength !== 4 && pos < bufferLen - 4) {
          if (buffer.dataview.getInt16(pos) === 0) {
            if (buffer.dataview.getInt16(pos + 2) === 1) {
              // 0x000001
              headerLength = 4;
            } else if (buffer.dataview.getInt8(pos + 2) === 1) {
              headerLength = 3;
            } else {
              pos++;
            }
          } else {
            pos++;
          }
        }

        if (pos === bufferLen - 4) {
          if (buffer.dataview.getInt16(pos) === 0) {
            if (buffer.dataview.getInt16(pos + 2) === 1) {
              // 0x000001
              headerLength = 4;
            }
          } else {
            pos++;
            if (buffer.dataview.getInt16(pos) === 0 && buffer.dataview.getInt8(pos) === 1) {
              // 0x0000001
              headerLength = 3;
            } else {
              pos = bufferLen;
            }
          }
        }
        return { pos: pos, headerLength: headerLength };
      }
    }, {
      key: 'getAvcc',
      value: function getAvcc(sps, pps) {
        var ret = new Uint8Array(sps.byteLength + pps.byteLength + 11);
        ret[0] = 0x01;
        ret[1] = sps[1];
        ret[2] = sps[2];
        ret[3] = sps[3];
        ret[4] = 255;
        ret[5] = 225;

        var offset = 6;

        ret.set(new Uint8Array([sps.byteLength >>> 8 & 0xff, sps.byteLength & 0xff]), offset);
        offset += 2;
        ret.set(sps, offset);
        offset += sps.byteLength;

        ret[offset] = 1;
        offset++;

        ret.set(new Uint8Array([pps.byteLength >>> 8 & 0xff, pps.byteLength & 0xff]), offset);
        offset += 2;
        ret.set(pps, offset);
        return ret;
      }
    }]);

    return Nalunit;
  }();

  var NalUnit = Nalunit;
  var Golomb$1 = Golomb;

  var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var H264Demuxer = function () {
    function H264Demuxer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$5(this, H264Demuxer);

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

    _createClass$5(H264Demuxer, [{
      key: 'init',
      value: function init() {
        this.initEvents();
      }
    }, {
      key: 'initEvents',
      value: function initEvents() {
        this.on(Events$1.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this));
        this.on(Events$1.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this));
      }
    }, {
      key: 'load',
      value: function load(url) {
        this.emit(Events$1.LOADER_EVENTS.LADER_START, url);
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
          var golomb = new Golomb$1(new Uint8Array(unit.body));
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

  var _createClass$6 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var mp4 = 'data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw';

  // Detect iOS browsers < version 10
  var oldIOS = typeof navigator !== 'undefined' && parseFloat(('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) < 10 && !window.MSStream;

  // Detect native Wake Lock API support
  // const nativeWakeLock = 'wakeLock' in navigator;
  var nativeWakeLock = false;
  console.log('nativeWakeLock', nativeWakeLock);

  var NoSleep = function () {
    function NoSleep() {
      var _this = this;

      _classCallCheck$6(this, NoSleep);

      if (oldIOS) {
        this.noSleepTimer = null;
      } else {
        // Set up no sleep video element
        this.noSleepVideo = document.createElement('video');

        this.noSleepVideo.setAttribute('title', 'No Sleep');
        this.noSleepVideo.setAttribute('playsinline', '');

        this._addSourceToVideo(this.noSleepVideo, 'mp4', mp4);

        this.noSleepVideo.addEventListener('loadedmetadata', function () {
          _this.noSleepVideo.setAttribute('loop', '');
        });
      }
    }

    _createClass$6(NoSleep, [{
      key: '_addSourceToVideo',
      value: function _addSourceToVideo(element, type, dataURI) {
        var source = document.createElement('source');
        source.src = dataURI;
        source.type = 'video/' + type;
        element.appendChild(source);
      }
    }, {
      key: 'enable',
      value: function enable() {

        if (oldIOS) {
          this.disable();
          console.warn('\n        NoSleep enabled for older iOS devices. This can interrupt\n        active or long-running network requests from completing successfully.\n        See https://github.com/richtr/NoSleep.js/issues/15 for more details.\n      ');
          this.noSleepTimer = window.setInterval(function () {
            if (!document.hidden) {
              window.location.href = window.location.href.split('#')[0];
              window.setTimeout(window.stop, 0);
            }
          }, 15000);
        } else {
          this.noSleepVideo.play().catch(function (e) {});
        }
      }
    }, {
      key: 'disable',
      value: function disable() {
        if (oldIOS) {
          if (this.noSleepTimer) {
            console.warn('\n          NoSleep now disabled for older iOS devices.\n        ');
            window.clearInterval(this.noSleepTimer);
            this.noSleepTimer = null;
          }
        } else {
          this.noSleepVideo.pause();
        }
      }
    }]);

    return NoSleep;
  }();

  (function () {

    var n = window.Document.prototype.createElement,
        p = window.Document.prototype.createElementNS,
        aa = window.Document.prototype.importNode,
        ba = window.Document.prototype.prepend,
        ca = window.Document.prototype.append,
        da = window.DocumentFragment.prototype.prepend,
        ea = window.DocumentFragment.prototype.append,
        q = window.Node.prototype.cloneNode,
        r = window.Node.prototype.appendChild,
        t = window.Node.prototype.insertBefore,
        u = window.Node.prototype.removeChild,
        v = window.Node.prototype.replaceChild,
        x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        y = window.Element.prototype.attachShadow,
        z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        A = window.Element.prototype.getAttribute,
        B = window.Element.prototype.setAttribute,
        C = window.Element.prototype.removeAttribute,
        D = window.Element.prototype.getAttributeNS,
        E = window.Element.prototype.setAttributeNS,
        F = window.Element.prototype.removeAttributeNS,
        G = window.Element.prototype.insertAdjacentElement,
        fa = window.Element.prototype.insertAdjacentHTML,
        ha = window.Element.prototype.prepend,
        ia = window.Element.prototype.append,
        ja = window.Element.prototype.before,
        ka = window.Element.prototype.after,
        la = window.Element.prototype.replaceWith,
        ma = window.Element.prototype.remove,
        na = window.HTMLElement,
        H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        oa = window.HTMLElement.prototype.insertAdjacentElement,
        pa = window.HTMLElement.prototype.insertAdjacentHTML;var qa = new Set();"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
      return qa.add(a);
    });function ra(a) {
      var b = qa.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
    }var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function I(a) {
      var b = a.isConnected;if (void 0 !== b) return b;if (sa(a)) return !0;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
        a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
      }return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }function J(a) {
      var b = a.children;if (b) return Array.prototype.slice.call(b);b = [];for (a = a.firstChild; a; a = a.nextSibling) {
        a.nodeType === Node.ELEMENT_NODE && b.push(a);
      }return b;
    }
    function K(a, b) {
      for (; b && b !== a && !b.nextSibling;) {
        b = b.parentNode;
      }return b && b !== a ? b.nextSibling : null;
    }
    function L(a, b, c) {
      for (var f = a; f;) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var d = f;b(d);var e = d.localName;if ("link" === e && "import" === d.getAttribute("rel")) {
            f = d.import;void 0 === c && (c = new Set());if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) {
              L(f, b, c);
            }f = K(a, d);continue;
          } else if ("template" === e) {
            f = K(a, d);continue;
          }if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) {
            L(d, b, c);
          }
        }f = f.firstChild ? f.firstChild : K(a, f);
      }
    }function M(a, b, c) {
      a[b] = c;
    }function ta(a) {
      var b = document;this.c = a;this.a = b;this.b = void 0;N(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
    }function ua(a) {
      a.b && a.b.disconnect();
    }ta.prototype.f = function (a) {
      var b = this.a.readyState;"interactive" !== b && "complete" !== b || ua(this);for (b = 0; b < a.length; b++) {
        for (var c = a[b].addedNodes, f = 0; f < c.length; f++) {
          N(this.c, c[f]);
        }
      }
    };function va() {
      var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
        a.b = b;a.a && b(a.a);
      });
    }function wa(a) {
      if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
    }function O(a) {
      this.f = new Map();this.g = new Map();this.l = new Map();this.i = !1;this.b = a;this.j = new Map();this.c = function (b) {
        return b();
      };this.a = !1;this.h = [];this.m = a.f ? new ta(a) : void 0;
    }O.prototype.o = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");xa(this, a);this.f.set(a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };
    O.prototype.define = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");xa(this, a);za(this, a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };function xa(a, b) {
      if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (P(a, b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (a.i) throw Error("A custom element is already being defined.");
    }
    function za(a, b, c) {
      a.i = !0;var f;try {
        var d = function d(m) {
          var w = e[m];if (void 0 !== w && !(w instanceof Function)) throw Error("The '" + m + "' callback must be a function.");return w;
        },
            e = c.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var g = d("connectedCallback");var h = d("disconnectedCallback");var k = d("adoptedCallback");var l = (f = d("attributeChangedCallback")) && c.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.i = !1;
      }c = { localName: b, constructorFunction: c,
        connectedCallback: g, disconnectedCallback: h, adoptedCallback: k, attributeChangedCallback: f, observedAttributes: l, constructionStack: [] };a.g.set(b, c);a.l.set(c.constructorFunction, c);return c;
    }O.prototype.upgrade = function (a) {
      N(this.b, a);
    };
    function ya(a) {
      if (!1 !== a.a) {
        a.a = !1;for (var b = [], c = a.h, f = new Map(), d = 0; d < c.length; d++) {
          f.set(c[d], []);
        }N(a.b, document, { upgrade: function upgrade(k) {
            if (void 0 === k.__CE_state) {
              var l = k.localName,
                  m = f.get(l);m ? m.push(k) : a.g.has(l) && b.push(k);
            }
          } });for (d = 0; d < b.length; d++) {
          Q(a.b, b[d]);
        }for (d = 0; d < c.length; d++) {
          for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) {
            Q(a.b, g[h]);
          }(e = a.j.get(e)) && wa(e);
        }c.length = 0;
      }
    }O.prototype.get = function (a) {
      if (a = P(this, a)) return a.constructorFunction;
    };
    O.prototype.whenDefined = function (a) {
      if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.j.get(a);if (b) return b.c;b = new va();this.j.set(a, b);var c = this.g.has(a) || this.f.has(a);a = -1 === this.h.indexOf(a);c && a && wa(b);return b.c;
    };O.prototype.polyfillWrapFlushCallback = function (a) {
      this.m && ua(this.m);var b = this.c;this.c = function (c) {
        return a(function () {
          return b(c);
        });
      };
    };
    function P(a, b) {
      var c = a.g.get(b);if (c) return c;if (c = a.f.get(b)) {
        a.f.delete(b);try {
          return za(a, b, c());
        } catch (f) {
          R(f);
        }
      }
    }window.CustomElementRegistry = O;O.prototype.define = O.prototype.define;O.prototype.upgrade = O.prototype.upgrade;O.prototype.get = O.prototype.get;O.prototype.whenDefined = O.prototype.whenDefined;O.prototype.polyfillDefineLazy = O.prototype.o;O.prototype.polyfillWrapFlushCallback = O.prototype.polyfillWrapFlushCallback;function S() {
      var a = T && T.noDocumentConstructionObserver,
          b = T && T.shadyDomFastWalk;this.b = [];this.c = [];this.a = !1;this.shadyDomFastWalk = b;this.f = !a;
    }function U(a, b, c, f) {
      var d = window.ShadyDOM;if (a.shadyDomFastWalk && d && d.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) {
          c(a[b]);
        }
      } else L(b, c, f);
    }function Aa(a, b) {
      a.a = !0;a.b.push(b);
    }function Ba(a, b) {
      a.a = !0;a.c.push(b);
    }function V(a, b) {
      a.a && U(a, b, function (c) {
        return W(a, c);
      });
    }
    function W(a, b) {
      if (a.a && !b.__CE_patched) {
        b.__CE_patched = !0;for (var c = 0; c < a.b.length; c++) {
          a.b[c](b);
        }for (c = 0; c < a.c.length; c++) {
          a.c[c](b);
        }
      }
    }function X(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state ? a.connectedCallback(f) : Q(a, f);
      }
    }function Y(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state && a.disconnectedCallback(f);
      }
    }
    function N(a, b, c) {
      c = void 0 === c ? {} : c;var f = c.s,
          d = c.upgrade || function (g) {
        return Q(a, g);
      },
          e = [];U(a, b, function (g) {
        a.a && W(a, g);if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
            var k = g.import;if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = !0;var l = new Set();f && (f.forEach(function (m) {
                return l.add(m);
              }), l.delete(k));N(a, k, { s: l, upgrade: d });
            }
          });
        } else e.push(g);
      }, f);for (b = 0; b < e.length; b++) {
        d(e[b]);
      }
    }
    function Q(a, b) {
      try {
        var c = b.ownerDocument,
            f = c.__CE_registry;var d = f && (c.defaultView || c.__CE_isImportDocument) ? P(f, b.localName) : void 0;if (d && void 0 === b.__CE_state) {
          d.constructionStack.push(b);try {
            try {
              if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }b.__CE_state = 1;b.__CE_definition = d;if (d.attributeChangedCallback && b.hasAttributes()) {
            var e = d.observedAttributes;
            for (d = 0; d < e.length; d++) {
              var g = e[d],
                  h = b.getAttribute(g);null !== h && a.attributeChangedCallback(b, g, null, h, null);
            }
          }I(b) && a.connectedCallback(b);
        }
      } catch (k) {
        R(k);
      }
    }S.prototype.connectedCallback = function (a) {
      var b = a.__CE_definition;if (b.connectedCallback) try {
        b.connectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };S.prototype.disconnectedCallback = function (a) {
      var b = a.__CE_definition;if (b.disconnectedCallback) try {
        b.disconnectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };
    S.prototype.attributeChangedCallback = function (a, b, c, f, d) {
      var e = a.__CE_definition;if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
        e.attributeChangedCallback.call(a, b, c, f, d);
      } catch (g) {
        R(g);
      }
    };
    function Ca(a, b, c, f) {
      var d = b.__CE_registry;if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = P(d, c))) try {
        var e = new d.constructorFunction();if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
        return e;
      } catch (g) {
        return R(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, W(a, b), b;
      }b = null === f ? n.call(b, c) : p.call(b, f, c);W(a, b);return b;
    }
    function R(a) {
      var b = a.message,
          c = a.sourceURL || a.fileName || "",
          f = a.line || a.lineNumber || 0,
          d = a.column || a.columnNumber || 0,
          e = void 0;void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", { cancelable: !0, message: b, filename: c, lineno: f, colno: d, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
        Object.defineProperty(this, "defaultPrevented", { configurable: !0, get: function get() {
            return !0;
          } });
      });void 0 === e.error && Object.defineProperty(e, "error", { configurable: !0, enumerable: !0, get: function get() {
          return a;
        } });window.dispatchEvent(e);e.defaultPrevented || console.error(a);
    }var Da = new function () {}();function Ea(a) {
      window.HTMLElement = function () {
        function b() {
          var c = this.constructor;var f = document.__CE_registry.l.get(c);if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var d = f.constructionStack;if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, W(a, d), d;var e = d.length - 1,
              g = d[e];if (g === Da) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
          d[e] = Da;Object.setPrototypeOf(g, c.prototype);W(a, g);return g;
        }b.prototype = na.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
      }();
    }function Z(a, b, c) {
      function f(d) {
        return function (e) {
          for (var g = [], h = 0; h < arguments.length; ++h) {
            g[h] = arguments[h];
          }h = [];for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];m instanceof Element && I(m) && k.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
              h.push(m);
            } else h.push(m);
          }d.apply(this, g);for (g = 0; g < k.length; g++) {
            Y(a, k[g]);
          }if (I(this)) for (g = 0; g < h.length; g++) {
            k = h[g], k instanceof Element && X(a, k);
          }
        };
      }void 0 !== c.prepend && M(b, "prepend", f(c.prepend));void 0 !== c.append && M(b, "append", f(c.append));
    }
  function Fa(a) {
      M(Document.prototype, "createElement", function (b) {
        return Ca(a, this, b, null);
      });M(Document.prototype, "importNode", function (b, c) {
        b = aa.call(this, b, !!c);this.__CE_registry ? N(a, b) : V(a, b);return b;
      });M(Document.prototype, "createElementNS", function (b, c) {
        return Ca(a, this, c, b);
      });Z(a, Document.prototype, { prepend: ba, append: ca });
    }function Ga(a) {
      function b(c, f) {
        Object.defineProperty(c, "textContent", { enumerable: f.enumerable, configurable: !0, get: f.get, set: function set(d) {
            if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
              var e = void 0;if (this.firstChild) {
                var g = this.childNodes,
                    h = g.length;if (0 < h && I(this)) {
                  e = Array(h);for (var k = 0; k < h; k++) {
                    e[k] = g[k];
                  }
                }
              }f.set.call(this, d);if (e) for (d = 0; d < e.length; d++) {
                Y(a, e[d]);
              }
            }
          } });
      }M(Node.prototype, "insertBefore", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = t.call(this, c, f);if (I(this)) for (f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);f = t.call(this, c, f);d && Y(a, c);I(this) && X(a, c);return f;
      });M(Node.prototype, "appendChild", function (c) {
        if (c instanceof DocumentFragment) {
          var f = J(c);c = r.call(this, c);if (I(this)) for (var d = 0; d < f.length; d++) {
            X(a, f[d]);
          }return c;
        }f = c instanceof Element && I(c);d = r.call(this, c);f && Y(a, c);I(this) && X(a, c);return d;
      });M(Node.prototype, "cloneNode", function (c) {
        c = q.call(this, !!c);this.ownerDocument.__CE_registry ? N(a, c) : V(a, c);return c;
      });M(Node.prototype, "removeChild", function (c) {
        var f = c instanceof Element && I(c),
            d = u.call(this, c);f && Y(a, c);return d;
      });M(Node.prototype, "replaceChild", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = v.call(this, c, f);if (I(this)) for (Y(a, f), f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);var e = v.call(this, c, f),
            g = I(this);g && Y(a, f);d && Y(a, c);g && X(a, c);return e;
      });x && x.get ? b(Node.prototype, x) : Aa(a, function (c) {
        b(c, { enumerable: !0, configurable: !0, get: function get() {
            for (var f = [], d = this.firstChild; d; d = d.nextSibling) {
              d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
            }return f.join("");
          }, set: function set(f) {
            for (; this.firstChild;) {
              u.call(this, this.firstChild);
            }null != f && "" !== f && r.call(this, document.createTextNode(f));
          } });
      });
    }function Ha(a) {
      function b(f) {
        return function (d) {
          for (var e = [], g = 0; g < arguments.length; ++g) {
            e[g] = arguments[g];
          }g = [];for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];l instanceof Element && I(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) {
              g.push(l);
            } else g.push(l);
          }f.apply(this, e);for (e = 0; e < h.length; e++) {
            Y(a, h[e]);
          }if (I(this)) for (e = 0; e < g.length; e++) {
            h = g[e], h instanceof Element && X(a, h);
          }
        };
      }var c = Element.prototype;void 0 !== ja && M(c, "before", b(ja));void 0 !== ka && M(c, "after", b(ka));void 0 !== la && M(c, "replaceWith", function (f) {
        for (var d = [], e = 0; e < arguments.length; ++e) {
          d[e] = arguments[e];
        }e = [];for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];k instanceof Element && I(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
            e.push(k);
          } else e.push(k);
        }h = I(this);la.apply(this, d);for (d = 0; d < g.length; d++) {
          Y(a, g[d]);
        }if (h) for (Y(a, this), d = 0; d < e.length; d++) {
          g = e[d], g instanceof Element && X(a, g);
        }
      });void 0 !== ma && M(c, "remove", function () {
        var f = I(this);ma.call(this);f && Y(a, this);
      });
    }function Ia(a) {
      function b(d, e) {
        Object.defineProperty(d, "innerHTML", { enumerable: e.enumerable, configurable: !0, get: e.get, set: function set(g) {
            var h = this,
                k = void 0;I(this) && (k = [], U(a, this, function (w) {
              w !== h && k.push(w);
            }));e.set.call(this, g);if (k) for (var l = 0; l < k.length; l++) {
              var m = k[l];1 === m.__CE_state && a.disconnectedCallback(m);
            }this.ownerDocument.__CE_registry ? N(a, this) : V(a, this);return g;
          } });
      }function c(d, e) {
        M(d, "insertAdjacentElement", function (g, h) {
          var k = I(h);g = e.call(this, g, h);k && Y(a, h);I(g) && X(a, h);return g;
        });
      }
      function f(d, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling) {
            l.push(h);
          }for (k = 0; k < l.length; k++) {
            N(a, l[k]);
          }
        }M(d, "insertAdjacentHTML", function (h, k) {
          h = h.toLowerCase();if ("beforebegin" === h) {
            var l = this.previousSibling;e.call(this, h, k);g(l || this.parentNode.firstChild, this);
          } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        });
      }y && M(Element.prototype, "attachShadow", function (d) {
        d = y.call(this, d);if (a.a && !d.__CE_patched) {
          d.__CE_patched = !0;for (var e = 0; e < a.b.length; e++) {
            a.b[e](d);
          }
        }return this.__CE_shadowRoot = d;
      });z && z.get ? b(Element.prototype, z) : H && H.get ? b(HTMLElement.prototype, H) : Ba(a, function (d) {
        b(d, { enumerable: !0, configurable: !0, get: function get() {
            return q.call(this, !0).innerHTML;
          }, set: function set(e) {
            var g = "template" === this.localName,
                h = g ? this.content : this,
                k = p.call(document, this.namespaceURI, this.localName);for (k.innerHTML = e; 0 < h.childNodes.length;) {
              u.call(h, h.childNodes[0]);
            }for (e = g ? k.content : k; 0 < e.childNodes.length;) {
              r.call(h, e.childNodes[0]);
            }
          } });
      });M(Element.prototype, "setAttribute", function (d, e) {
        if (1 !== this.__CE_state) return B.call(this, d, e);var g = A.call(this, d);B.call(this, d, e);e = A.call(this, d);a.attributeChangedCallback(this, d, g, e, null);
      });M(Element.prototype, "setAttributeNS", function (d, e, g) {
        if (1 !== this.__CE_state) return E.call(this, d, e, g);var h = D.call(this, d, e);E.call(this, d, e, g);g = D.call(this, d, e);a.attributeChangedCallback(this, e, h, g, d);
      });M(Element.prototype, "removeAttribute", function (d) {
        if (1 !== this.__CE_state) return C.call(this, d);var e = A.call(this, d);C.call(this, d);null !== e && a.attributeChangedCallback(this, d, e, null, null);
      });M(Element.prototype, "removeAttributeNS", function (d, e) {
        if (1 !== this.__CE_state) return F.call(this, d, e);var g = D.call(this, d, e);F.call(this, d, e);var h = D.call(this, d, e);g !== h && a.attributeChangedCallback(this, e, g, h, d);
      });oa ? c(HTMLElement.prototype, oa) : G && c(Element.prototype, G);pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);Z(a, Element.prototype, { prepend: ha, append: ia });Ha(a);
    }var T = window.customElements;function Ja() {
      var a = new S();Ea(a);Fa(a);Z(a, DocumentFragment.prototype, { prepend: da, append: ea });Ga(a);Ia(a);a = new O(a);document.__CE_registry = a;Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: a });
    }T && !T.forcePolyfill && "function" == typeof T.define && "function" == typeof T.get || Ja();window.__CE_installPolyfill = Ja;
  }).call(self);

  //# sourceMappingURL=custom-elements.min.js.map

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */

  /**
   * This shim allows elements written in, or compiled to, ES5 to work on native
   * implementations of Custom Elements v1. It sets new.target to the value of
   * this.constructor so that the native HTMLElement constructor can access the
   * current under-construction element's definition.
   */
  (function () {
    if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined || window.customElements === undefined ||
    // The webcomponentsjs custom elements polyfill doesn't require
    // ES2015-compatible construction (`super()` or `Reflect.construct`).
    window.customElements.polyfillWrapFlushCallback) {
      return;
    }
    var BuiltInHTMLElement = HTMLElement;
    /**
     * With jscompiler's RECOMMENDED_FLAGS the function name will be optimized away.
     * However, if we declare the function as a property on an object literal, and
     * use quotes for the property name, then closure will leave that much intact,
     * which is enough for the JS VM to correctly set Function.prototype.name.
     */
    var wrapperForTheName = {
      'HTMLElement': /** @this {!Object} */function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], /** @type {!Function} */this.constructor);
      }
    };
    window.HTMLElement = wrapperForTheName['HTMLElement'];
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();

  TimeRanges.prototype.dump = function () {
      var len = this.length;
      var ret = '';

      for (var i = 0; i < len; i++) {
          ret += this.start(i) + '~' + this.end(i) + ' ';
      }    console.log(ret);
  };

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
    LOADER_RESPONSE_HEADERS: 'LOADER_RESPONSE_HEADERS',
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
    DETECT_AUDIO_GAP: 'DETECT_AUDIO_GAP',
    DETECT_AUDIO_OVERLAP: 'DETECT_AUDIO_OVERLAP',
    RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT'
  };

  var MSE_EVENTS = {
    SOURCE_UPDATE_END: 'SOURCE_UPDATE_END',
    MSE_ERROR: 'MSE_ERROR'

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

  var _EVENTS = {
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

  var _createClass$7 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Playlist = function () {
    function Playlist(configs) {
      _classCallCheck$7(this, Playlist);

      this._baseURL = '';
      this._list = {};
      this._ts = {};
      this.version = 0;
      this.sequence = -1;
      this.targetduration = 0;
      this.duration = 0;
      this.fragLength = 0;
      this._lastget = undefined;
      this._audoclear = configs.autoclear || false;
      this.downloadedUrls = [];
    }

    _createClass$7(Playlist, [{
      key: 'push',
      value: function push(ts, duration, discontinue, id) {
        if (!this._ts[ts]) {
          this._ts[ts] = { duration: duration,
            downloaded: false,
            downloading: false,
            start: this.duration,
            discontinue: !!discontinue,
            id: id
          };
          this._list[this.duration] = ts;
          this.duration += duration;
          this.fragLength += 1;
        }
      }
    }, {
      key: 'deleteFrag',
      value: function deleteFrag(url) {
        if (this._ts[url]) {
          if (this._ts[url].start > this._lastget.time) {
            this._lastget = {
              duration: this._ts[url].duration,
              time: this._ts[url].start,
              downloaded: false,
              downloading: false,
              url: url,
              id: this._ts[url].id
            };
          }
          delete this._list[this._ts[url].start];
          delete this._ts[url];
          this.fragLength -= 1;
        }
      }
    }, {
      key: 'pushM3U8',
      value: function pushM3U8(data, deletepre) {
        // 常规信息替换
        if (!data) {
          throw new Error('No m3u8 data received.');
        }
        this.version = data.version;
        this.targetduration = data.targetduration;
        if (data.encrypt && !this.encrypt) {
          this.encrypt = data.encrypt;
        }

        if (!data.sequence) {
          data.sequence = 0;
        }

        // 新分片信息
        if (data.sequence > this.sequence) {
          this.sequence = data.sequence;
          var newfraglist = [];
          for (var i = 0; i < data.frags.length; i++) {
            var frag = data.frags[i];
            if (!this._ts[frag.url] && this.downloadedUrls.indexOf(frag.url) < 0) {
              newfraglist.push(frag.url);
              this.push(frag.url, frag.duration, frag.discontinue, frag.id);
            }
          }

          if (newfraglist.length < 1) {
            throw new Error('Can not read ts file list.');
          }

          if (deletepre) {
            var tslist = this.getTsList();
            for (var _i = 0; _i < tslist.length; _i++) {
              if (newfraglist.indexOf(tslist[_i]) < 0) {
                this.deleteFrag(tslist[_i]);
              }
            }
          }
        } else {
          throw new Error('Old m3u8 file received, ' + data.sequence + ' , ' + this.sequence);
        }
      }
    }, {
      key: 'getTsList',
      value: function getTsList() {
        return Object.keys(this._ts);
      }
    }, {
      key: 'downloaded',
      value: function downloaded(tsname, isloaded) {
        var ts = this._ts[tsname];
        if (ts) {
          ts.downloaded = isloaded;
        }
      }
    }, {
      key: 'downloading',
      value: function downloading(tsname, loading) {
        var ts = this._ts[tsname];
        if (ts) {
          ts.downloading = loading;
        }
      }
    }, {
      key: 'getTsByName',
      value: function getTsByName(name) {
        return this._ts[name];
      }
    }, {
      key: 'getTs',
      value: function getTs(time) {
        var timelist = Object.keys(this._list);
        var ts = void 0;

        if (time === undefined) {
          if (this._lastget) {
            time = this._lastget.time + this._lastget.duration;
          } else {
            time = 0;
          }
        }

        if (timelist.length < 1 || time >= this.duration) {
          return undefined;
        }
        timelist = timelist.sort(function (a, b) {
          return parseFloat(a) - parseFloat(b);
        });
        for (var i = 0; i < timelist.length; i++) {
          if (time >= parseInt(timelist[i])) {
            var url = this._list[timelist[i]];
            var downloaded = this._ts[url].downloaded;
            var downloading = this._ts[url].downloading;
            ts = {
              url: url,
              downloaded: downloaded,
              downloading: downloading,
              time: parseInt(timelist[i]),
              duration: parseInt(this._ts[url].duration),
              id: this._ts[url].id
            };
            if (this.autoclear) {
              delete this._ts[this._lastget.url];
              delete this._list[this._lastget.time];
            }
            this._lastget = ts;
          } else {
            break;
          }
        }
        if (ts) {
          this.downloadedUrls.push(ts.url);
        }
        return ts;
      }
    }, {
      key: 'getLastDownloadedTs',
      value: function getLastDownloadedTs() {
        var timelist = Object.keys(this._list);
        var found = void 0;
        for (var i = 0; i < timelist.length; i++) {
          var url = this._list[timelist[i]];
          var downloaded = this._ts[url].downloaded;
          var downloading = this._ts[url].downloading;
          if (downloaded) {
            found = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
          } else {
            break;
          }
        }

        return found;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this._baseURL = '';
        this._list = {};
        this._ts = {};
        this.version = 0;
        this.sequence = -1;
        this.targetduration = 0;
        this.duration = 0;
        this._lastget = undefined;
      }
    }, {
      key: 'clearDownloaded',
      value: function clearDownloaded() {
        for (var i = 0, l = Object.keys(this._ts).length; i < l; i++) {
          var ts = this._ts[Object.keys(this._ts)[i]];
          ts.downloaded = false;
          ts.downloading = false;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._baseURL = '';
        this._list = {};
        this._ts = {};
        this.version = 0;
        this.sequence = -1;
        this.targetduration = 0;
        this.duration = 0;
        this.fragLength = 0;
        this._lastget = undefined;
        this._audoclear = false;
      }
    }, {
      key: 'list',
      get: function get() {
        return this._list;
      }
    }, {
      key: 'baseURL',
      set: function set(baseURL) {
        if (this.baseURL !== baseURL) {
          this.clear();
          this._baseURL = baseURL;
        }
      },
      get: function get() {
        return this._baseURL;
      }
    }]);

    return Playlist;
  }();

  var _createClass$8 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Presource = function Presource() {
    _classCallCheck$8(this, Presource);

    this.mimetype = '';
    this.init = null;
    this.data = [];
  };

  var PreSource = function () {
    function PreSource() {
      _classCallCheck$8(this, PreSource);

      this.sources = {};
    }

    _createClass$8(PreSource, [{
      key: 'getSource',
      value: function getSource(source) {
        return this.sources[source];
      }
    }, {
      key: 'createSource',
      value: function createSource(name) {
        this.sources[name] = new Presource();
        return this.sources[name];
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.sources = {};
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.sources = {};
      }
    }]);

    return PreSource;
  }();

  var _createClass$9 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck$9(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass$9(Stream, [{
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$a = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$a(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Track = function () {
    /**
     * The constructor.
     */
    function Track() {
      _classCallCheck$a(this, Track);

      this.id = -1;
      this.sequenceNumber = 0;
      this.samples = [];
      this.droppedSamples = [];
      this.length = 0;
    }

    /**
     * Reset the track.
     */

    _createClass$a(Track, [{
      key: 'reset',
      value: function reset() {
        this.sequenceNumber = 0;
        this.samples = [];
        this.length = 0;
      }
      /**
       * destroy the track.
       */

    }, {
      key: 'distroy',
      value: function distroy() {
        this.reset();
        this.id = -1;
      }
    }]);

    return Track;
  }();

  var AudioTrack = function (_Track) {
    _inherits(AudioTrack, _Track);

    /**
     * The constructor for audio track.
     */
    function AudioTrack() {
      _classCallCheck$a(this, AudioTrack);

      var _this = _possibleConstructorReturn(this, (AudioTrack.__proto__ || Object.getPrototypeOf(AudioTrack)).call(this));

      _this.TAG = 'AudioTrack';
      _this.type = 'audio';
      return _this;
    }

    return AudioTrack;
  }(Track);

  var VideoTrack = function (_Track2) {
    _inherits(VideoTrack, _Track2);

    /**
     * The constructor for video track.
     */
    function VideoTrack() {
      _classCallCheck$a(this, VideoTrack);

      var _this2 = _possibleConstructorReturn(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

      _this2.TAG = 'VideoTrack';
      _this2.type = 'video';
      _this2.dropped = 0;
      return _this2;
    }
    /**
     * reset the video track.
     */

    _createClass$a(VideoTrack, [{
      key: 'reset',
      value: function reset() {
        this.sequenceNumber = 0;
        this.samples = [];
        this.length = 0;
        this.dropped = 0;
      }
    }]);

    return VideoTrack;
  }(Track);

  var Tracks = function () {
    function Tracks() {
      _classCallCheck$a(this, Tracks);

      this.audioTrack = null;
      this.videoTrack = null;
    }

    _createClass$a(Tracks, [{
      key: 'destroy',
      value: function destroy() {
        this.audioTrack = null;
        this.videoTrack = null;
      }
    }]);

    return Tracks;
  }();

  var _createClass$b = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var XgBuffer = function () {
    /**
     * A buffer to store loaded data.
     *
     * @class LoaderBuffer
     * @param {number} length - Optional the buffer size
     */
    function XgBuffer(length) {
      _classCallCheck$b(this, XgBuffer);

      this.length = length || 0;
      this.historyLen = length || 0;
      this.array = [];
      this.offset = 0;
    }

    /**
     * The function to push data.
     *
     * @param {Uint8Array} data - The data to push into the buffer
     */

    _createClass$b(XgBuffer, [{
      key: "push",
      value: function push(data) {
        this.array.push(data);
        this.length += data.byteLength;
        this.historyLen += data.byteLength;
      }

      /**
       * The function to shift data.
       *
       * @param {number} length - The size of shift.
       */

    }, {
      key: "shift",
      value: function shift(length) {
        if (this.array.length < 1) {
          return new Uint8Array(0);
        }

        if (length === undefined) {
          return this._shiftBuffer();
        }
        if (this.offset + length === this.array[0].length) {
          var _ret = this.array[0].slice(this.offset, this.offset + length);
          this.offset = 0;
          this.array.shift();
          this.length -= length;
          return _ret;
        }

        if (this.offset + length < this.array[0].length) {
          var _ret2 = this.array[0].slice(this.offset, this.offset + length);
          this.offset += length;
          this.length -= length;
          return _ret2;
        }

        var ret = new Uint8Array(length);
        var tmpoff = 0;
        while (this.array.length > 0 && length > 0) {
          if (this.offset + length < this.array[0].length) {
            var tmp = this.array[0].slice(this.offset, this.offset + length);
            ret.set(tmp, tmpoff);
            this.offset += length;
            this.length -= length;
            length = 0;
            break;
          } else {
            // console.log('mark1')
            var templength = this.array[0].length - this.offset;
            ret.set(this.array[0].slice(this.offset, this.array[0].length), tmpoff);
            this.array.shift();
            this.offset = 0;
            tmpoff += templength;
            this.length -= templength;
            length -= templength;
          }
        }
        return ret;
      }

      /**
       * Function to clear the buffer.
       */

    }, {
      key: "clear",
      value: function clear() {
        this.array = [];
        this.length = 0;
        this.offset = 0;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.historyLen = 0;
      }

      /**
       * Function to shift one unit8Array.
       */

    }, {
      key: "_shiftBuffer",
      value: function _shiftBuffer() {
        this.length -= this.array[0].length;
        this.offset = 0;
        return this.array.shift();
      }

      /**
       * Convert uint8 data to number.
       *
       * @param {number} start - the start postion.
       * @param {number} length - the length of data.
       */

    }, {
      key: "toInt",
      value: function toInt(start, length) {
        var retInt = 0;
        var i = this.offset + start;
        while (i < this.offset + length + start) {
          if (i < this.array[0].length) {
            retInt = retInt * 256 + this.array[0][i];
          } else if (this.array[1]) {
            retInt = retInt * 256 + this.array[1][i - this.array[0].length];
          }

          i++;
        }
        return retInt;
      }
    }]);

    return XgBuffer;
  }();

  var _createClass$c = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$c(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioTrackMeta = function () {
    function AudioTrackMeta(meta) {
      _classCallCheck$c(this, AudioTrackMeta);

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

    _createClass$c(AudioTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
      }
    }]);

    return AudioTrackMeta;
  }();

  var VideoTrackMeta = function () {
    function VideoTrackMeta(meta) {
      _classCallCheck$c(this, VideoTrackMeta);

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

    _createClass$c(VideoTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
        this.sps = null;
        this.pps = null;
      }
    }]);

    return VideoTrackMeta;
  }();

  var _createClass$d = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$d(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioTrackSample = function () {
    function AudioTrackSample(info) {
      _classCallCheck$d(this, AudioTrackSample);

      var _default = AudioTrackSample.getDefault();
      if (!info) {
        return _default;
      }
      var sample = Object.assign({}, _default, info);

      return sample;
    }

    _createClass$d(AudioTrackSample, null, [{
      key: "getDefault",
      value: function getDefault() {
        return {
          dts: null,
          pts: null,
          data: new Uint8Array()
        };
      }
    }]);

    return AudioTrackSample;
  }();

  var VideoTrackSample = function () {
    function VideoTrackSample(info) {
      _classCallCheck$d(this, VideoTrackSample);

      var _default = VideoTrackSample.getDefault();

      if (!info) {
        return _default;
      }
      var sample = Object.assign({}, _default, info);

      return sample;
    }

    _createClass$d(VideoTrackSample, null, [{
      key: "getDefault",
      value: function getDefault() {
        return {
          dts: null,
          pts: null,
          isKeyframe: false, // is Random access point
          originDts: null,
          data: new Uint8Array()
        };
      }
    }]);

    return VideoTrackSample;
  }();

  var _createClass$e = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$e(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var isObjectFilled = function isObjectFilled(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null) {
          return false;
        }
      }
    }
    return true;
  };

  var MediaInfo = function () {
    function MediaInfo() {
      _classCallCheck$e(this, MediaInfo);

      this.mimeType = null;
      this.duration = null;

      this.hasVideo = null;
      this.video = {
        codec: null,
        width: null,
        height: null,
        profile: null,
        level: null,
        frameRate: {
          fixed: true,
          fps: 25,
          fps_num: 25000,
          fps_den: 1000
        },
        chromaFormat: null,
        parRatio: {
          width: 1,
          height: 1
        }
      };

      this.hasAudio = null;

      this.audio = {
        codec: null,
        sampleRate: null,
        sampleRateIndex: null,
        channelCount: null
      };
    }

    _createClass$e(MediaInfo, [{
      key: "isComplete",
      value: function isComplete() {
        return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
      }
    }], [{
      key: "isBaseInfoReady",
      value: function isBaseInfoReady(mediaInfo) {
        return isObjectFilled(mediaInfo);
      }
    }, {
      key: "isVideoReady",
      value: function isVideoReady(mediaInfo) {
        if (!mediaInfo.hasVideo) {
          return true;
        }

        return isObjectFilled(mediaInfo.video);
      }
    }, {
      key: "isAudioReady",
      value: function isAudioReady(mediaInfo) {
        if (!mediaInfo.hasAudio) {
          return true;
        }

        return isObjectFilled(mediaInfo.video);
      }
    }]);

    return MediaInfo;
  }();

  var MediaInfo$1 = MediaInfo;

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function () {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';

    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler) return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = this._events;
    if (!events) return this;

    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;
        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;

    events = this._events;
    if (!events) return this;

    // not listening for removeListener, no need to emit
    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
      }
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events) ret = [];else {
      evlistener = events[type];
      if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--) copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  };

  var _createClass$f = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn$1(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$1(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$1(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$f(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DIRECT_EMIT_FLAG = '__TO__';

  var Context = function () {
    function Context() {
      var allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck$f(this, Context);

      this._emitter = new EventEmitter();
      if (!this._emitter.off) {
        this._emitter.off = this._emitter.removeListener;
      }

      this.mediaInfo = new MediaInfo$1();
      this._instanceMap = {}; // 所有的解码流程实例
      this._clsMap = {}; // 构造函数的map
      this._inited = false;
      this.allowedEvents = allowedEvents;
      this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    }

    /**
     * 从上下文中获取解码流程实例，如果没有实例，构造一个
     * @param tag
     * @param args
     * @returns {*}
     */

    _createClass$f(Context, [{
      key: 'getInstance',
      value: function getInstance(tag) {
        var instance = this._instanceMap[tag];
        if (instance) {
          return instance;
        } else {
          // throw new Error(`${tag}实例尚未初始化`)
          return null;
        }
      }

      /**
       * 初始化具体实例
       * @param tag
       * @param args
       */

    }, {
      key: 'initInstance',
      value: function initInstance(tag) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var a = args[0],
            b = args[1],
            c = args[2],
            d = args[3];

        if (this._clsMap[tag]) {
          var newInstance = new this._clsMap[tag](a, b, c, d);
          this._instanceMap[tag] = newInstance;
          if (newInstance.init) {
            newInstance.init(); // TODO: lifecircle
          }
          return newInstance;
        } else {
          throw new Error(tag + "\u672A\u5728context\u4E2D\u6CE8\u518C");
        }
      }

      /**
       * 避免大量的initInstance调用，初始化所有的组件
       * @param config
       */

    }, {
      key: 'init',
      value: function init(config) {
        if (this._inited) {
          return;
        }
        for (var tag in this._clsMap) {
          // if not inited, init an instance
          if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
            this.initInstance(tag, config);
          }
        }
        this._inited = true;
      }

      /**
       * 注册一个上下文流程，提供安全的事件发送机制
       * @param tag
       * @param cls
       */

    }, {
      key: 'registry',
      value: function registry(tag, cls) {
        var _this2 = this;

        var emitter = this._emitter;
        var checkMessageName = this._isMessageNameValid.bind(this);
        var self = this;
        var enhanced = function (_cls) {
          _inherits$1(enhanced, _cls);

          function enhanced(a, b, c) {
            _classCallCheck$f(this, enhanced);

            var _this = _possibleConstructorReturn$1(this, (enhanced.__proto__ || Object.getPrototypeOf(enhanced)).call(this, a, b, c));

            _this.listeners = {};
            _this.onceListeners = {};
            _this.TAG = tag;
            _this._context = self;
            return _this;
          }

          _createClass$f(enhanced, [{
            key: 'on',
            value: function on(messageName, callback) {
              checkMessageName(messageName);

              if (this.listeners[messageName]) {
                this.listeners[messageName].push(callback);
              } else {
                this.listeners[messageName] = [callback];
              }

              emitter.on('' + messageName + DIRECT_EMIT_FLAG + tag, callback); // 建立定向通信监听
              return emitter.on(messageName, callback);
            }

            /**
             * 在某个事件触发前执行
             * @param messageName
             * @param callback
             */

          }, {
            key: 'before',
            value: function before(messageName, callback) {
              checkMessageName(messageName);
              if (self._hooks[messageName]) {
                self._hooks[messageName].push(callback);
              } else {
                self._hooks[messageName] = [callback];
              }
            }
          }, {
            key: 'once',
            value: function once(messageName, callback) {
              checkMessageName(messageName);

              if (this.onceListeners[messageName]) {
                this.onceListeners[messageName].push(callback);
              } else {
                this.onceListeners[messageName] = [callback];
              }

              emitter.once('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
              return emitter.once(messageName, callback);
            }
          }, {
            key: 'emit',
            value: function emit(messageName) {
              checkMessageName(messageName);
              // console.log('emit ', messageName);

              var beforeList = self._hooks ? self._hooks[messageName] : null;

              if (beforeList) {
                for (var i = 0, len = beforeList.length; i < len; i++) {
                  var callback = beforeList[i];
                  callback();
                }
              }

              for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              return emitter.emit.apply(emitter, [messageName].concat(args));
            }

            /**
             * 定向发送给某个组件单例的消息
             * @param messageName
             * @param args
             */

          }, {
            key: 'emitTo',
            value: function emitTo(tag, messageName) {
              checkMessageName(messageName);

              for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
              }

              return emitter.emit.apply(emitter, ['' + messageName + DIRECT_EMIT_FLAG + tag].concat(args));
            }
          }, {
            key: 'off',
            value: function off(messageName, callback) {
              checkMessageName(messageName);
              return emitter.off(messageName, callback);
            }
          }, {
            key: 'removeListeners',
            value: function removeListeners() {
              var hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

              for (var messageName in this.listeners) {
                if (hasOwn(messageName)) {
                  var callbacks = this.listeners[messageName] || [];
                  for (var i = 0; i < callbacks.length; i++) {
                    var callback = callbacks[i];
                    emitter.off(messageName, callback);
                    emitter.off('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
                  }
                }
              }

              for (var _messageName in this.onceListeners) {
                if (hasOwn(_messageName)) {
                  var _callbacks = this.onceListeners[_messageName] || [];
                  for (var _i = 0; _i < _callbacks.length; _i++) {
                    var _callback = _callbacks[_i];
                    emitter.off(_messageName, _callback);
                    emitter.off('' + _messageName + DIRECT_EMIT_FLAG + tag, _callback);
                  }
                }
              }
            }

            /**
             * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
             */

          }, {
            key: 'destroy',
            value: function destroy() {
              // step1 unlisten events
              this.removeListeners();
              this.listeners = {};

              // step2 release from context
              delete self._instanceMap[tag];
              if (_get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this)) {
                return _get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this).call(this);
              }
            }
          }]);

          return enhanced;
        }(cls);
        this._clsMap[tag] = enhanced;

        /**
         * get instance immediately
         * e.g const instance = context.registry(tag, Cls)(config)
         * */
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this2.initInstance.apply(_this2, [tag].concat(args));
        };
      }

      /**
       * 各个模块处理seek
       * @param time
       */

    }, {
      key: 'seek',
      value: function seek(time) {
        this._emitter.emit(_EVENTS.PLAYER_EVENTS.SEEK, time);
      }

      /**
       * 对存在的实例进行
       */

    }, {
      key: 'destroyInstances',
      value: function destroyInstances() {
        var _this3 = this;

        Object.keys(this._instanceMap).forEach(function (tag) {
          if (_this3._instanceMap[tag].destroy) {
            _this3._instanceMap[tag].destroy();
          }
        });
      }

      /**
       * 编解码流程无需关注事件的解绑
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._emitter = null;
        this.allowedEvents = [];
        this._clsMap = null;
        this._context = null;
        this._hooks = null;
        this.destroyInstances();
      }

      /**
       * 对信道进行收拢
       * @param messageName
       * @private
       */

    }, {
      key: '_isMessageNameValid',
      value: function _isMessageNameValid(messageName) {
        if (!this.allowedEvents.indexOf(messageName) < 0) {
          throw new Error('unregistered message name: ' + messageName);
        }
      }
    }]);

    return Context;
  }();

  var _createClass$g = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$g(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CRYTO_EVENTS$1 = _EVENTS.CRYTO_EVENTS;

  var Crypto = function () {
    function Crypto(config) {
      _classCallCheck$g(this, Crypto);

      this.inputBuffer = config.inputbuffer;
      this.outputBuffer = config.outputbuffer;
      this.key = config.key;
      this.iv = config.iv;
      this.method = config.method;

      this.crypto = window.crypto || window.msCrypto;
    }

    _createClass$g(Crypto, [{
      key: 'init',
      value: function init() {
        this.on(CRYTO_EVENTS$1.START_DECRYPT, this.decript.bind(this));
      }
    }, {
      key: 'decript',
      value: function decript() {
        var _this = this;

        if (!this.aeskey) {
          var sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
          sbkey.then(function (key) {
            _this.aeskey = key;
            _this.decriptData();
          });
        } else {
          this.decriptData();
        }
      }
    }, {
      key: 'decriptData',
      value: function decriptData() {
        var _this2 = this;

        var inputbuffer = this._context.getInstance(this.inputBuffer);
        var outputbuffer = this._context.getInstance(this.outputBuffer);
        var data = inputbuffer.shift();
        if (data) {
          this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(function (res) {
            outputbuffer.push(new Uint8Array(res));
            _this2.emit(CRYTO_EVENTS$1.DECRYPTED);
            _this2.decriptData(data);
          });
        }
      }
    }]);

    return Crypto;
  }();

  var _createClass$h = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$h(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var KeySystems = {
    WIDEVINE: 'com.widevine.alpha',
    PLAYREADY: 'com.microsoft.playready'
  };

  var MAX_LICENSE_REQUEST_FAILURES = 3;

  var EME = function () {
    function EME(_ref) {
      var config = _ref.config,
          player = _ref.player;

      _classCallCheck$h(this, EME);

      this.licenseUrl = config.licenseUrl;
      this.mediaKeySystemConfigs = config.mediaKeySystemConfigs;
      this.keySystem = config.keySystem || KeySystems.WIDEVINE;
      this.video = player.video;
      this.mediaKeysList = [];
      this.requestLicenseFailureCount = 0;
    }

    _createClass$h(EME, [{
      key: 'init',
      value: function init() {
        this.on('ManifestParsed', this.onManifestParsed.bind(this));
      }
    }, {
      key: 'onManifestParsed',
      value: function onManifestParsed(data) {
        var _this = this;

        var mediaKeySystemConfigs = this.mediaKeySystemConfigs || this.createWidevineMediaKeySystemConfigurations(data.audioCodecs, data.videoCodecs);

        navigator.requestMediaKeySystemAccess(this.keySystem, mediaKeySystemConfigs).then(function (keySystemAccess) {
          return keySystemAccess.createMediaKeys();
        }).then(function (mediaKeys) {
          _this.video.setMediaKeys(mediaKeys);
        });

        this.video.addEventListener('encrypted', this.onMediaEncrypted.bind(this));
      }
    }, {
      key: 'onKeySessionMessage',
      value: function onKeySessionMessage(keySession, message) {
        this.requestLicense(message, function (data) {
          keySession.update(data);
        });
      }
    }, {
      key: 'requestLicense',
      value: function requestLicense(keyMessage, callback) {
        try {
          var url = this.licenseUrl;
          var xhr = this.createLicenseXhr(url, keyMessage, callback);
          xhr.send(keyMessage);
        } catch (e) {}
      }
    }, {
      key: 'createLicenseXhr',
      value: function createLicenseXhr(url, keyMessage, callback) {
        var xhr = new window.XMLHttpRequest();

        xhr.open('POST', url, true);

        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = this.onLicenseRequestReadyStageChange.bind(this, xhr, url, keyMessage, callback);
        return xhr;
      }
    }, {
      key: 'onLicenseRequestReadyStageChange',
      value: function onLicenseRequestReadyStageChange(xhr, url, keyMessage, callback) {
        switch (xhr.readyState) {
          case 4:
            if (xhr.status === 200) {
              this.requestLicenseFailureCount = 0;
              callback(xhr.response);
            } else {
              this.requestLicenseFailureCount++;

              if (this.requestLicenseFailureCount > MAX_LICENSE_REQUEST_FAILURES) {
                return;
              }
              this.requestLicense(keyMessage, callback);
            }
            break;
        }
      }
    }, {
      key: 'onMediaEncrypted',
      value: function onMediaEncrypted(e) {
        var _this2 = this;

        var keySession = this.video.mediaKeys.createSession();
        keySession.addEventListener('message', function (event) {
          _this2.onKeySessionMessage(keySession, event.message);
        }, false);
        keySession.generateRequest(e.initDataType, e.initData);
      }
    }, {
      key: 'createWidevineMediaKeySystemConfigurations',
      value: function createWidevineMediaKeySystemConfigurations(audioCodecs, videoCodecs) {
        return [{
          videoCapabilities: videoCodecs.map(function (codec) {
            return {
              contentType: 'video/mp4; codecs="' + codec + '"'
            };
          })
        }];
      }
    }], [{
      key: 'isSupported',
      value: function isSupported() {
        var checkIsIncompatibleBrowser = function checkIsIncompatibleBrowser() {
          var ua = navigator.userAgent;
          var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
          var isMSBrowser = ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0;
          var isFirefox = ua.indexOf('Firefox') > 0;
          var isEdge = ua.indexOf('Edge') > 0;
          return isSafari || isMSBrowser || isFirefox || isEdge;
        };
        return !!navigator.requestMediaKeySystemAccess && !checkIsIncompatibleBrowser();
      }
    }]);

    return EME;
  }();

  var _createClass$i = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$i(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MSE_EVENTS$1 = _EVENTS.MSE_EVENTS;

  var MSE = function () {
    function MSE(configs, context) {
      _classCallCheck$i(this, MSE);

      if (context) {
        this._context = context;
        this.emit = context._emitter.emit.bind(context._emitter);
      }

      this.TAG = 'MSE';

      this.configs = Object.assign({}, configs);
      this.container = this.configs.container;
      this.mediaSource = null;
      this.sourceBuffers = {};
      this.preloadTime = this.configs.preloadTime || 1;
      this.onSourceOpen = this.onSourceOpen.bind(this);
      this.onTimeUpdate = this.onTimeUpdate.bind(this);
      this.onUpdateEnd = this.onUpdateEnd.bind(this);
      this.onWaiting = this.onWaiting.bind(this);
      this.opened = false;
    }

    _createClass$i(MSE, [{
      key: 'init',
      value: function init() {
        // eslint-disable-next-line no-undef
        this.mediaSource = new self.MediaSource();
        this.mediaSource.addEventListener('sourceopen', this.onSourceOpen);
        this._url = null;
        this.container.addEventListener('timeupdate', this.onTimeUpdate);
        this.container.addEventListener('waiting', this.onWaiting);
      }
    }, {
      key: 'resetContext',
      value: function resetContext(newCtx) {
        this._context = newCtx;
        this.emit = newCtx._emitter.emit.bind(newCtx._emitter);
        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
          if (!buffer.updating) {
            MSE.clearBuffer(buffer);
          }
        }
      }
    }, {
      key: 'onTimeUpdate',
      value: function onTimeUpdate() {
        this.emit('TIME_UPDATE', this.container);
      }
    }, {
      key: 'onWaiting',
      value: function onWaiting() {
        this.emit('WAITING', this.container);
      }
    }, {
      key: 'onSourceOpen',
      value: function onSourceOpen() {
        this.opened = true;
        this.addSourceBuffers();
      }
    }, {
      key: 'onUpdateEnd',
      value: function onUpdateEnd() {
        this.emit(MSE_EVENTS$1.SOURCE_UPDATE_END);
        this.doAppend();
      }
    }, {
      key: 'addSourceBuffers',
      value: function addSourceBuffers() {
        if (this.mediaSource.readyState !== 'open' || !this.opened) {
          return;
        }
        var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
        var tracks = this._context.getInstance('TRACKS');
        var track = void 0;
        if (!sources || !tracks) {
          return;
        }

        sources = sources.sources;
        var add = false;
        for (var i = 0, k = Object.keys(sources).length; i < k; i++) {
          var type = Object.keys(sources)[i];
          add = false;
          if (type === 'audio') {
            track = tracks.audioTrack;
          } else if (type === 'video') {
            track = tracks.videoTrack;
            // return;
          }
          if (track && sources[type].init !== null && sources[type].data.length) {
            add = true;
          }
        }

        if (add) {
          if (Object.keys(this.sourceBuffers).length > 1) {
            return;
          }
          for (var _i = 0, _k = Object.keys(sources).length; _i < _k; _i++) {
            var _type = Object.keys(sources)[_i];
            if (this.sourceBuffers[_type]) {
              continue;
            }
            var source = sources[_type];
            var mime = _type === 'video' ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype;

            try {
              var sourceBuffer = this.mediaSource.addSourceBuffer(mime);
              this.sourceBuffers[_type] = sourceBuffer;
              sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
            } catch (e) {
              this.emit(MSE_EVENTS$1.MSE_ERROR, this.TAG, new Error(e.message));
            }
          }
          if (Object.keys(this.sourceBuffers).length === 2) {
            this.doAppend();
          }
        }
      }
    }, {
      key: 'doAppend',
      value: function doAppend() {
        if (Object.keys(this.sourceBuffers).length < 2) {
          return;
        }
        var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
        if (sources) {
          for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
            var type = Object.keys(this.sourceBuffers)[i];
            var sourceBuffer = this.sourceBuffers[type];
            var source = sources.sources[type];
            if (source && !source.inited) {
              try {
                // console.log('append buffser init: ', type, source.init)
                sourceBuffer.appendBuffer(source.init.buffer.buffer);
                source.inited = true;
              } catch (e) {
                // DO NOTHING
              }
            } else if (source) {
              var data = source.data.shift();
              if (data) {
                try {
                  sourceBuffer.appendBuffer(data.buffer.buffer);
                } catch (e) {
                  source.data.unshift(data);
                }
              }
            }
          }
        }
      }
    }, {
      key: 'endOfStream',
      value: function endOfStream() {
        var readyState = this.mediaSource.readyState;

        if (readyState === 'open') {
          try {
            this.mediaSource.endOfStream();
          } catch (e) {
            // log
          }
        }
      }
    }, {
      key: 'remove',
      value: function remove(end) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
          if (!buffer.updating) {
            // console.log('remove', start, end)
            buffer.remove(start, end);
          }
        }
      }
    }, {
      key: 'cleanBuffers',
      value: function cleanBuffers() {
        var _this = this;

        var taskList = [];

        var _loop = function _loop(i) {
          var buffer = _this.sourceBuffers[Object.keys(_this.sourceBuffers)[i]];

          var task = void 0;
          if (buffer.updating) {
            task = new Promise(function (resolve) {
              var doCleanBuffer = function doCleanBuffer() {
                var retryTime = 3;

                var clean = function clean() {
                  if (!buffer.updating) {
                    MSE.clearBuffer(buffer);
                    buffer.addEventListener('updateend', function () {
                      resolve();
                    });
                  } else if (retryTime > 0) {
                    setTimeout(clean, 200);
                    retryTime--;
                  } else {
                    resolve();
                  }
                };

                setTimeout(clean, 200);
                buffer.removeEventListener('updateend', doCleanBuffer);
              };
              buffer.addEventListener('updateend', doCleanBuffer);
            });
          } else {
            task = new Promise(function (resolve) {
              MSE.clearBuffer(buffer);
              buffer.addEventListener('updateend', function () {
                resolve();
              });
            });

            // task = Promise.resolve()
          }

          taskList.push(task);
        };

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          _loop(i);
        }

        return Promise.all(taskList);
      }
    }, {
      key: 'removeBuffers',
      value: function removeBuffers() {
        var _this2 = this;

        var taskList = [];

        var _loop2 = function _loop2(i) {
          var buffer = _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
          buffer.removeEventListener('updateend', _this2.onUpdateEnd);

          var task = void 0;
          if (buffer.updating) {
            task = new Promise(function (resolve) {
              var doCleanBuffer = function doCleanBuffer() {
                var retryTime = 3;

                var clean = function clean() {
                  if (!buffer.updating) {
                    MSE.clearBuffer(buffer);
                    buffer.addEventListener('updateend', function () {
                      resolve();
                    });
                  } else if (retryTime > 0) {
                    setTimeout(clean, 200);
                    retryTime--;
                  } else {
                    resolve();
                  }
                };

                setTimeout(clean, 200);
                buffer.removeEventListener('updateend', doCleanBuffer);
              };
              buffer.addEventListener('updateend', doCleanBuffer);
            });
          } else {
            task = new Promise(function (resolve) {
              MSE.clearBuffer(buffer);
              buffer.addEventListener('updateend', function () {
                resolve();
              });
            });

            // task = Promise.resolve()
          }

          taskList.push(task);
        };

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          _loop2(i);
        }

        return Promise.all(taskList);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        this.container.removeEventListener('timeupdate', this.onTimeUpdate);
        this.container.removeEventListener('waiting', this.onWaiting);
        this.mediaSource.removeEventListener('sourceopen', this.onSourceOpen);
        return this.removeBuffers().then(function () {
          for (var i = 0; i < Object.keys(_this3.sourceBuffers).length; i++) {
            var _buffer = _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
            _this3.mediaSource.removeSourceBuffer(_buffer);
            delete _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
          }

          _this3.endOfStream();
          window.URL.revokeObjectURL(_this3.url);

          _this3.url = null;
          _this3.configs = {};
          _this3.container = null;
          _this3.mediaSource = null;
          _this3.sourceBuffers = {};
          _this3.preloadTime = 1;

          _this3.onSourceOpen = null;
          _this3.onTimeUpdate = null;
          _this3.onUpdateEnd = null;
          _this3.onWaiting = null;
        });
      }
    }, {
      key: 'url',
      set: function set(val) {
        this._url = val;
      },
      get: function get() {
        if (!this._url) {
          this._url = window.URL.createObjectURL(this.mediaSource);
        }
        return this._url;
      }
    }], [{
      key: 'clearBuffer',
      value: function clearBuffer(buffer) {
        try {
          var buffered = buffer.buffered;
          var bEnd = 0.1;
          for (var i = 0, len = buffered.length; i < len; i++) {
            bEnd = buffered.end(i);
          }
          buffer.remove(0, bEnd);
        } catch (e) {
          // DO NOTHING
        }
      }
    }]);

    return MSE;
  }();

  var _createClass$j = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$j(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BROWSER_EVENTS$1 = _EVENTS.BROWSER_EVENTS;
  var hidden = void 0;
  var visibilityChange = void 0;

  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  var PageVisibility = function () {
    function PageVisibility() {
      _classCallCheck$j(this, PageVisibility);

      this.callbacks = {
        onShow: [],
        onHidden: []
      };
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.init();
    }

    _createClass$j(PageVisibility, [{
      key: 'init',
      value: function init() {
        document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
      }
    }, {
      key: 'handleVisibilityChange',
      value: function handleVisibilityChange() {
        this.emit(BROWSER_EVENTS$1.VISIBILITY_CHANGE, document[hidden]);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        document.removeEventListener(visibilityChange, this.handleVisibilityChange);
      }
    }]);

    return PageVisibility;
  }();

  var le = function () {
    var buf = new ArrayBuffer(2);
    new DataView(buf).setInt16(0, 256, true); // little-endian write
    return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
  }();

  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _typeof$2 = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  };

  var _createClass$k = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$k(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LOADER_EVENTS$1 = _EVENTS.LOADER_EVENTS;
  var READ_STREAM = 0;
  var READ_TEXT = 1;
  var READ_JSON = 2;
  var READ_BUFFER = 3;

  var FetchLoader = function () {
    function FetchLoader(configs) {
      _classCallCheck$k(this, FetchLoader);

      this.configs = Object.assign({}, configs);
      this.url = null;
      this.status = 0;
      this.error = null;
      this._reader = null;
      this._canceled = false;
      this._destroyed = false;
      this.readtype = this.configs.readtype;
      this.buffer = this.configs.buffer || 'LOADER_BUFFER';
      this._loaderTaskNo = 0;
    }

    _createClass$k(FetchLoader, [{
      key: 'init',
      value: function init() {
        this.on(LOADER_EVENTS$1.LADER_START, this.load.bind(this));
      }
    }, {
      key: 'fetch',
      value: function (_fetch) {
        function fetch(_x, _x2) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (url, params) {
        var timer = null;
        return Promise.race([fetch(url, params), new Promise(function (resolve, reject) {
          timer = setTimeout(function () {
            reject(new Error('fetch timeout'));
          }, 1e4); // 10s
        })]).then(function (response) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          return response;
        });
      })
    }, {
      key: 'internalLoad',
      value: function internalLoad(url, params, retryTimes) {
        var _this2 = this;

        return this.fetch(this.url, params).then(function (response) {
          _this2.emit(LOADER_EVENTS$1.LOADER_RESPONSE_HEADERS, _this2.TAG, response.headers);

          if (response.ok) {
            _this2.status = response.status;
            Promise.resolve().then(function () {
              _this2._onFetchResponse(response);
            });

            return Promise.resolve(response);
          }

          if (retryTimes-- > 0) {
            return _this2.internalLoad(url, params, retryTimes);
          } else {
            _this2.loading = false;
            _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, new Error(response.status + ' (' + response.statusText + ')'));
          }
        }).catch(function (error) {
          _this2.loading = false;
          if (retryTimes-- > 0) {
            return _this2.internalLoad(url, params, retryTimes);
          } else {
            _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, error);
            throw error;
          }
        });
      }
    }, {
      key: 'load',
      value: function load(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var retryTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

        this.url = url;

        this._canceled = false;

        // TODO: Add Ranges
        var params = this.getParams(opts);
        this.loading = true;
        return this.internalLoad(url, params, retryTimes);
      }
    }, {
      key: '_onFetchResponse',
      value: function _onFetchResponse(response) {
        var _this = this;
        var buffer = this._context.getInstance(this.buffer);
        this._loaderTaskNo++;
        var taskno = this._loaderTaskNo;
        if (response.ok === true) {
          switch (this.readtype) {
            case READ_JSON:
              response.json().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(data);
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
                  }
                }
              });
              break;
            case READ_TEXT:
              response.text().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(data);
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
                  }
                }
              });
              break;
            case READ_BUFFER:
              response.arrayBuffer().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(new Uint8Array(data));
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
                  }
                }
              });
              break;
            case READ_STREAM:
            default:
              return this._onReader(response.body.getReader(), taskno);
          }
        }
      }
    }, {
      key: '_onReader',
      value: function _onReader(reader, taskno) {
        var _this3 = this;

        var buffer = this._context.getInstance(this.buffer);
        if (!buffer && this._reader || this._destroyed) {
          try {
            this._reader.cancel();
          } catch (e) {
            // DO NOTHING
          }
        }

        this._reader = reader;
        if (this.loading === false) {
          return;
        }

        // reader read function returns a Promise. get data when callback and has value.done when disconnected.
        // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
        this._reader && this._reader.read().then(function (val) {
          if (_this3._canceled || _this3._destroyed) {
            if (_this3._reader) {
              try {
                _this3._reader.cancel();
              } catch (e) {
                // DO NOTHING
              }
            }
            return;
          }
          if (val.done) {
            _this3.loading = false;
            _this3.status = 0;
            Promise.resolve().then(function () {
              _this3.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
            });
            return;
          }

          buffer.push(val.value);
          Promise.resolve().then(function () {
            _this3.emit(LOADER_EVENTS$1.LOADER_DATALOADED, buffer);
          });
          return _this3._onReader(reader, taskno);
        }).catch(function (error) {
          _this3.loading = false;
          _this3.emit(LOADER_EVENTS$1.LOADER_ERROR, _this3.TAG, error);
          throw error;
        });
      }
    }, {
      key: 'getParams',
      value: function getParams(opts) {
        var options = Object.assign({}, opts);
        var headers = new Headers();

        var params = {
          method: 'GET',
          headers: headers,
          mode: 'cors',
          cache: 'default'

          // add custmor headers
          // 添加自定义头
        };if (_typeof$2(this.configs.headers) === 'object') {
          var configHeaders = this.configs.headers;
          for (var key in configHeaders) {
            if (configHeaders.hasOwnProperty(key)) {
              headers.append(key, configHeaders[key]);
            }
          }
        }

        if (_typeof$2(options.headers) === 'object') {
          var optHeaders = options.headers;
          for (var _key in optHeaders) {
            if (optHeaders.hasOwnProperty(_key)) {
              headers.append(_key, optHeaders[_key]);
            }
          }
        }

        if (options.cors === false) {
          params.mode = 'same-origin';
        }

        // withCredentials is disabled by default
        // withCredentials 在默认情况下不被使用。
        if (options.withCredentials) {
          params.credentials = 'include';
        }

        // TODO: Add ranges;
        return params;
      }
    }, {
      key: 'cancel',
      value: function cancel() {
        if (this._reader) {
          try {
            this._reader.cancel();
          } catch (e) {
            // 防止failed: 200错误被打印到控制台上
          }
          this._reader = null;
          this.loading = false;
        }
        this._canceled = true;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._destroyed = true;
        this.cancel();
      }
    }], [{
      key: 'type',
      get: function get() {
        return 'loader';
      }
    }]);

    return FetchLoader;
  }();

  var _createClass$l = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck$l(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DevLogger = function () {
    function DevLogger() {
      var _this = this;

      _classCallCheck$l(this, DevLogger);

      try {

        var matched = /xgd=(\d)/.exec(document.cookie);
        this._status = !!matched;
        this._level = matched && matched[1];
      } catch (e) {
        this._status = false;
      }

      ["group", "groupEnd", "log", "warn", "error"].forEach(function (funName) {
        _this[funName] = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
          var _console;

          if (!_this._status) return;
          var tagName = arg1;
          var args = [arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10].filter(function (x) {
            return x !== undefined;
          });
          (_console = console)[funName].apply(_console, ["[" + tagName + "]:"].concat(_toConsumableArray(args)));
        };
      });
    }

    _createClass$l(DevLogger, [{
      key: "enable",
      get: function get() {
        return this._status;
      }

      // more detailed log output

    }, {
      key: "long",
      get: function get() {
        return this._level === '2';
      }
    }]);

    return DevLogger;
  }();

  var _devLogger = new DevLogger();

  var logger = _devLogger;

  var Events = {
    AUDIO: {
      AUDIO_READY: 'audio_ready',
      AUDIO_WAITING: 'audio_waiting'
    },
    VIDEO: {
      VIDEO_DECODER_INIT: 'video_decode_init',
      VIDEO_READY: 'video_ready',
      VIDEO_WAITING: 'video_waiting',
      AUTO_RUN: 'auto_run',
      DECODE_LOW_FPS: 'decode_low_fps'
    },
    TIMELINE: {
      PLAY_EVENT: 'play_event',
      SET_METADATA: 'set_metadata',
      APPEND_CHUNKS: 'append_chunks',
      START_RENDER: 'start_render',
      DO_PAUSE: 'do_pause',
      SYNC_DTS: 'sync_dts',
      UPDATE_VOLUME: 'update_volume',
      UPDATE_PRELOAD_TIME: 'update_preloadtime',
      NO_AUDIO: 'no_audio',
      DESTROY: 'destroy',
      READY: 'ready'
    },
    VIDEO_EVENTS: {
      WAITING: 'waiting',
      CANPLAY: 'canplay',
      PLAY: 'play',
      PLAYING: 'playing',
      PAUSE: 'pause',
      LOADEDDATA: 'loadeddata',
      TIMEUPDATE: 'timeupdate',
      DURATION_CHANGE: 'durationchange',
      VOLUME_CHANGE: 'volumechange',
      ERROR: 'error',
      // 自定义
      DECODE_FPS: 'decodefps',
      LOW_DECODE: 'lowdecode'
    }
  };

  var _createClass$m = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$m(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioTimeRange = function () {
    function AudioTimeRange() {
      _classCallCheck$m(this, AudioTimeRange);

      this._buffers = [];
      this._duration = 0;
    }

    _createClass$m(AudioTimeRange, [{
      key: "append",
      value: function append(source, duration, startDts) {
        this._buffers.push({
          start: this._duration,
          end: this._duration + duration,
          startDts: startDts,
          source: source
        });
        this._duration += duration;
      }
    }, {
      key: "shift",
      value: function shift() {
        return this._buffers.shift();
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration;
      }
    }, {
      key: "buffered",
      get: function get() {
        var _this = this;

        return {
          length: 1,
          start: function start() {
            return 0;
          },
          end: function end() {
            return _this._duration;
          }
        };
      }
    }]);

    return AudioTimeRange;
  }();

  /**
   *
   * ios  WebAudio 在系统静音下 播放没有声音
   * hack: 创建背景Audio元素,静音且循环播放，用户交互后取消静音。
   * 在 ios safari、飞书webview、chrome下WebAudio可正常
   */

  function initBgSilenceAudio() {
    if (document.querySelector('#hackAudioPP')) return;

    var silenceMp3 = 'data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
    var tmp = document.createElement('div');
    tmp.innerHTML = '<audio id=\'hackAudioPP\'></audio>';
    document.body.appendChild(tmp);
    var audio = tmp.children.item(0);
    audio.controls = false;
    audio.preload = 'auto';
    audio.src = silenceMp3;
    // audio.src = 'http://10.1.9.110:8887/_media/1.mp3';
    audio.muted = true;
    audio.loop = true;
    audio.load();
    audio.play().catch(function (e) {});
  }

  var ele = void 0;

  function playSlienceAudio() {
    var audio = ele || (ele = document.querySelector('#hackAudioPP'));
    if (!audio) {
      initBgSilenceAudio();
      return;
    }
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(function (e) {});
    }
  }

  var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$n = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$n(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$3(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$3(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AudioContext = window.AudioContext || window.webkitAudioContext;

  var MEDIA_ERR_DECODE = 3;

  var ERROR_MSG = {
    INIT_AUDIO_ERR: 'create new AudioContext error',
    DECODE_ERR: 'audio data decode error'
  };

  var AudioRender = function (_EventEmitter) {
    _inherits$2(AudioRender, _EventEmitter);

    function AudioRender(config, parent) {
      _classCallCheck$n(this, AudioRender);

      var _this = _possibleConstructorReturn$2(this, (AudioRender.__proto__ || Object.getPrototypeOf(AudioRender)).call(this));

      _this.TAG = 'AudioRender';
      _this._config = config;
      _this._parent = parent;
      _this._timeRange = new AudioTimeRange();
      _this._sampleQueue = [];
      _this._ready = false;
      _this._meta = null;
      _this._noAudio = false;
      _this._source = null;
      _this._onSourceBufferEnded = _this._onSourceBufferEnded.bind(_this);
      _this._initAudioCtx(config.volume || 0.6);
      _this._bindEvents();
      return _this;
    }

    _createClass$n(AudioRender, [{
      key: 'resume',
      value: function resume() {
        return this._audioCtx.resume();
      }
    }, {
      key: '_assembleErr',
      value: function _assembleErr(msg) {
        var err = new Error(msg);
        err.code = MEDIA_ERR_DECODE;
        return err;
      }
    }, {
      key: '_initAudioCtx',
      value: function _initAudioCtx(volume) {
        var _this2 = this;

        this._audioCtx = new AudioContext();
        if (!this._audioCtx) {
          logger.warn(this.TAG, 'create webaudio error!');
          // AudioRender在Timeline constructor中实例化,timeline error handler还未绑定,异步触发
          setTimeout(function () {
            _this2._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', _this2._assembleErr(ERROR_MSG.INIT_AUDIO_ERR));
          });
          return;
        }
        this._gainNode = this._audioCtx.createGain();
        this._gainNode.gain.value = volume;
        this._gainNode.connect(this._audioCtx.destination);
        this._audioCtx.suspend();
        initBgSilenceAudio();
      }
    }, {
      key: '_emitTimelineEvents',
      value: function _emitTimelineEvents(e, v, d) {
        this._parent.emit(e, v, d);
      }
    }, {
      key: '_bindEvents',
      value: function _bindEvents() {
        var _this3 = this;

        this._audioCtx.addEventListener('statechange', function () {
          if (!_this3._audioCtx) return;
          if (_this3._audioCtx.state === 'running' && _this3._ready) {
            _this3._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAYING);
          }
        });

        this._parent.on(Events.TIMELINE.SET_METADATA, function (type, meta) {
          if (type === 'video') return;
          if (_this3._noAudio) return;
          logger.warn(_this3.TAG, 'audio set metadata');
          _this3._meta = meta;
        });

        this._parent.on(Events.TIMELINE.APPEND_CHUNKS, this._appendChunk.bind(this));

        this._parent.on(Events.TIMELINE.START_RENDER, this._startRender.bind(this));

        this._parent.on(Events.TIMELINE.DO_PAUSE, function () {
          _this3._audioCtx.suspend();
        });

        this._parent.on(Events.TIMELINE.UPDATE_VOLUME, function (v) {
          if (!_this3._gainNode) return;
          _this3._gainNode.gain.value = v;
          _this3._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.VOLUME_CHANGE);
        });

        // this._parent.on(Events.TIMELINE.UPDATE_PRELOAD_TIME, (v) => {
        //   this._config.preloadTime = v;
        // });

        this._parent.on(Events.TIMELINE.DESTROY, function () {
          _this3._destroy();
        });

        this._parent.on(Events.TIMELINE.NO_AUDIO, function () {
          _this3._noAudio = true;
        });
      }

      // receive new compressed samples

    }, {
      key: '_appendChunk',
      value: function _appendChunk(_, audioTrack) {
        if (this._noAudio) return;

        var samples = audioTrack.samples,
            meta = audioTrack.meta;

        if (meta && samples.length) {
          this._sampleQueue = this._sampleQueue.concat(samples);
          audioTrack.samples = [];
          this._assembleAAC();
        }
      }
    }, {
      key: '_checkMetaChange',
      value: function _checkMetaChange(sampleQueue, len) {
        var index = -1;
        for (var i = 0; i < len; i++) {
          var op = sampleQueue[i].options;
          if (op && op.meta) {
            index = i;
            logger.warn(this.TAG, 'detect metadata! index=' + i + ' ,dts=' + sampleQueue[i].dts);
            break;
          }
        }
        return index;
      }
    }, {
      key: '_assembleAAC',
      value: function _assembleAAC() {
        var _this4 = this;

        var len = this._sampleQueue.length;
        var samp0 = this._sampleQueue[0];
        var sampLast = this._sampleQueue[len - 1];
        var metaChangeIndex = this._checkMetaChange(this._sampleQueue, len);

        if (metaChangeIndex === -1) {
          if ((sampLast.dts - samp0.dts) / this.timescale < this.preloadTime) {
            return;
          }
        }

        var toDecode = void 0;

        if (metaChangeIndex === -1) {
          toDecode = this._sampleQueue;
          this._sampleQueue = [];
        } else {
          // 采样队列中间换流,前后部分分开
          toDecode = this._sampleQueue.splice(0, metaChangeIndex || len);
        }

        if (!toDecode.length) return;

        var adtss = toDecode.map(function (sample, index) {
          if (index === metaChangeIndex) {
            _this4._meta = sample.options.meta;
          }
          return AudioRender.getAACData(_this4._meta, sample);
        });

        var chunkBuffer = AudioRender.combileData(adtss);

        this._audioCtx.decodeAudioData(chunkBuffer.buffer, function (uncompress) {
          var _source = _this4._audioCtx.createBufferSource();
          _source.buffer = uncompress;
          _source.loop = false;
          _this4._timeRange.append(_source, uncompress.duration, metaChangeIndex === -1 ? samp0.dts : 0);

          if (!_this4._ready) {
            // init background Audio ele
            _this4._ready = true;
            _this4.emit(Events.AUDIO.AUDIO_READY);
          }
          _this4._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.DURATION_CHANGE);
        }, function () {
          _this4._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', _this4._assembleErr(ERROR_MSG.DECODE_ERR));
        });
      }
    }, {
      key: '_onSourceBufferEnded',
      value: function _onSourceBufferEnded() {
        if (logger.long) {
          logger.log(this.TAG, 'source play end! currentTime:' + this.currentTime + ' , duration:' + this.duration);
        }
        this._startRender();
      }
    }, {
      key: '_startRender',
      value: function _startRender() {
        if (this._noAudio) return;

        if (this._audioCtx.state === 'suspended') {
          this._audioCtx.resume();
          playSlienceAudio();
        }
        var buffer = this._timeRange.shift();
        if (!buffer) {
          this._ready = false;
          this._audioCtx.suspend();
          this.emit(Events.AUDIO.AUDIO_WAITING);
          return;
        }

        this._source = null;

        var _source = buffer.source;
        // 保存引用,移动浏览器下,对source的回收机制有差异，不保存引用会提前回收,导致ended事件不触发
        this._source = _source;
        _source.addEventListener('ended', this._onSourceBufferEnded);
        _source.connect(this._gainNode);
        _source.start();

        if (buffer.startDts) {
          this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, buffer.startDts);
        }
      }
    }, {
      key: '_destroy',
      value: function _destroy() {
        logger.log(this.TAG, 'destroy audio...');
        this._audioCtx.close();
        this._audioCtx = null;
        this._sampleQueue = null;
        this._timeRange = null;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        if (!this._audioCtx) return 0;
        return this._audioCtx.currentTime;
      }
    }, {
      key: 'duration',
      get: function get() {
        return this._timeRange.duration;
      }
    }, {
      key: 'preloadTime',
      get: function get() {
        return 2;
      }
    }, {
      key: 'timescale',
      get: function get() {
        if (!this._meta) return 1000;
        return this._meta.timescale || 1000;
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this._timeRange.buffered;
      }
    }, {
      key: 'ctxState',
      get: function get() {
        return this._audioCtx.state;
      }
    }], [{
      key: 'getAACData',
      value: function getAACData(meta, sample) {
        var buffer = new Uint8Array(sample.data.byteLength + 7);
        var adts = AudioRender.getAdts(meta, sample.data);
        buffer.set(adts);
        buffer.set(sample.data, 7);
        return buffer;
      }
    }, {
      key: 'combileData',
      value: function combileData(samples) {
        // get length
        var length = 0;
        for (var i = 0, k = samples.length; i < k; i++) {
          length += samples[i].byteLength;
        }

        var ret = new Uint8Array(length);
        var offset = 0;
        // combile data;
        for (var _i = 0, _k = samples.length; _i < _k; _i++) {
          ret.set(samples[_i], offset);
          offset += samples[_i].byteLength;
        }
        return ret;
      }
    }, {
      key: 'getAdts',
      value: function getAdts(meta, data) {
        var adts = new Uint8Array(7);

        // 设置同步位 0xfff 12bit
        adts[0] = 0xff;
        adts[1] = 0xf0;

        // Object data (没什么人用MPEG-2了，HLS和FLV也全是MPEG-4，这里直接0)  1bit
        // Level always 00 2bit
        // CRC always 1 1bit
        adts[1] = adts[1] | 0x01;

        // profile 2bit
        adts[2] = 0xc0 & meta.originObjectType - 1 << 6;

        // sampleFrequencyIndex
        adts[2] = adts[2] | 0x3c & meta.sampleRateIndex << 2;

        // private bit 0 1bit
        // chanel configuration 3bit
        adts[2] = adts[2] | 0x01 & meta.channelCount >> 2;
        adts[3] = 0xc0 & meta.channelCount << 6;

        // original_copy: 0 1bit
        // home: 0 1bit

        // adts_variable_header()
        // copyrighted_id_bit 0 1bit
        // copyrighted_id_start 0 1bit

        // aac_frame_length 13bit;
        var aacframelength = data.byteLength + 7;

        adts[3] = adts[3] | 0x03 & aacframelength >> 11;
        adts[4] = 0xff & aacframelength >> 3;
        adts[5] = 0xe0 & aacframelength << 5;

        // adts_buffer_fullness 0x7ff 11bit
        adts[5] = adts[5] | 0x1f;
        adts[6] = 0xfc;

        // number_of_raw_data_blocks_in_frame 0 2bit;
        return adts;
      }
    }]);

    return AudioRender;
  }(EventEmitter);

  var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol(),
      SCRIPT_TYPE = 'application/javascript',
      BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
      URL = window.URL || window.webkitURL,
      Worker = window.Worker;

  /**
   * Returns a wrapper around Web Worker code that is constructible.
   *
   * @function shimWorker
   *
   * @param { String }    filename    The name of the file
   * @param { Function }  fn          Function wrapping the code of the worker
   */
  function shimWorker(filename, fn) {
      return function ShimWorker(forceFallback) {
          var o = this;

          if (!fn) {
              return new Worker(filename);
          } else if (Worker && !forceFallback) {
              // Convert the function's inner code to a string to construct the worker
              var source = `${fn}`.replace(/^function.+?{/, '').slice(0, -1),
                  objURL = createSourceObject(source);

              this[TARGET] = new Worker(objURL);
              URL.revokeObjectURL(objURL);
              return this[TARGET];
          } else {
              var selfShim = {
                  postMessage: m => {
                      if (o.onmessage) {
                          setTimeout(() => o.onmessage({ data: m, target: selfShim }));
                      }
                  }
              };

              fn.call(selfShim);
              this.postMessage = m => {
                  setTimeout(() => selfShim.onmessage({ data: m, target: o }));
              };
              this.isThisThread = true;
          }
      };
  }
  // Test Worker capabilities
  if (Worker) {
      var testWorker,
          objURL = createSourceObject('self.onmessage = function () {}'),
          testArray = new Uint8Array(1);

      try {
          // No workers via blobs in Edge 12 and IE 11 and lower :(
          if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
              throw new Error('Not available');
          }
          testWorker = new Worker(objURL);

          // Native browser on some Samsung devices throws for transferables, let's detect it
          testWorker.postMessage(testArray, [testArray.buffer]);
      } catch (e) {
          Worker = null;
      } finally {
          URL.revokeObjectURL(objURL);
          if (testWorker) {
              testWorker.terminate();
          }
      }
  }

  function createSourceObject(str) {
      try {
          return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
      } catch (e) {
          var blob = new BlobBuilder();
          blob.append(str);
          return URL.createObjectURL(blob.getBlob(type));
      }
  }

  var HevcWorker = new shimWorker("../decoder/hevc-worker.js", function (window, document) {
    var self = this;
    // 目前仅支持yuv420

    // const H265_DECODER_URL =
    //   "https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_1592202936266.js";

    function shimImportScripts(src) {
      return fetch(src).then(function (res) {
        return res.text();
      }).then(function (text) {
        eval(text);
        self.Module = Module;
        self.addOnPostRun = addOnPostRun;
      });
    }

    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
      this.inited = false;
      this.infoId = 0;
      this.self = self;
      this.meta = this.self.meta;
      this.ts = 0;
      this.infolist = [];
      self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
      self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return Module.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      Module._broadwayInit();
      this.offset = Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, infoid, sliceType) {
      if (this.infolist[0] && this.infolist[0].isGop && sliceType !== 2) {
        this.self.postMessage({
          msg: 'LOG',
          log: 'drop sample'
        });
        return;
      }

      var info = this.infolist.shift();
      var yRowcount = height;
      var uvRowcount = height / 2;
      var yLinesize = width;
      var uvLinesize = width / 2;
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      // this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;

      this.self.postMessage({
        msg: 'DECODED',
        width: width,
        height: height,
        yLinesize: yLinesize,
        uvLinesize: uvLinesize,
        info: info,
        buffer: buffer
      }, [buffer]);
    };

    Decoder.prototype.broadwayOnBroadwayInited = function () {
      if (this.inited) {
        return;
      }
      this.inited = true;
      this.self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      var time = parseInt(new Date().getTime());
      var infoid = time - Math.floor(time / 10e8) * 10e8;
      this.infolist.push(info);
      if (info && info.isGop) {
        this.infolist = [info];
        Module._broadwayFlushStream(infoid);
      }
      Module.HEAPU8.set(data, this.offset);
      Module._broadwayPlayStream(data.length, this.infoId);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      self.postMessage({
        msg: 'LOG',
        log: 'do post run'
      });
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(url) {
      if (!decoder) {
        var task = void 0;

        if (!self.importScripts) {
          task = shimImportScripts(url);
        } else {
          task = new Promise(function (resolve, reject) {
            if (!self.console) {
              self.console = {
                log: function log() {},
                warn: function warn() {},
                info: function info() {},
                error: function error() {}
              };
            }
            try {
              self.importScripts(url);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        }

        task.then(function () {
          addOnPostRun(onPostRun.bind(self));
          setTimeout(function () {
            if (!decoder || !decoder.inited) {
              console.log('auto instance Decoder!');
              onPostRun.call(self);
            }
          }, 5000);
        }).catch(function (e) {
          self.postMessage({
            msg: 'INIT_FAILED',
            log: e.message
          });
        });
      }
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'worker inited'
            });
            init(data.url);
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            self.postMessage({
              msg: 'DECODE_FINISH',
              dts: data.info ? data.info.dts : 0
            });
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

  var AvcWorker = new shimWorker("../decoder/worker.js", function (window, document) {
    var self = this;
    // const H264_DECODER_URL =
    //   "https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js";

    function shimImportScripts(src) {
      return fetch(src).then(function (res) {
        return res.text();
      }).then(function (text) {
        eval(text);
        self.Module = Module;
        self.addOnPostRun = addOnPostRun;
      });
    }

    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;

    var Decoder = function Decoder(self) {
      this.inited = false;
      this.self = self;
      this.meta = this.self.meta;
      this.infolist = {};
      self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
      self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return Module.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      Module._broadwayInit();
      this.broadwayOnBroadwayInited();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;

      this.self.postMessage({
        msg: 'DECODED',
        width: width,
        height: height,
        yLinesize: yLinesize,
        uvLinesize: uvLinesize,
        info: info,
        buffer: buffer
      }, [buffer]);
    };

    Decoder.prototype.broadwayOnBroadwayInited = function () {
      this.inited = true;
      this.self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      var time = parseInt(new Date().getTime());
      var infoid = time - Math.floor(time / 10e8) * 10e8;
      this.infolist[infoid] = info;
      this.streamBuffer.set(data);
      Module._broadwayPlayStream(data.length, infoid);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      self.postMessage({
        msg: 'LOG',
        log: 'do post run'
      });

      decoder = new Decoder(this);
      decoder.init();
    }

    function init(url) {
      if (!decoder) {
        var task = void 0;
        if (!self.importScripts) {
          task = shimImportScripts(url);
        } else {
          task = new Promise(function (resolve, reject) {
            if (!self.console) {
              self.console = {
                log: function log() {},
                warn: function warn() {},
                info: function info() {},
                error: function error() {}
              };
            }
            try {
              self.importScripts(url);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        }

        task.then(function () {
          addOnPostRun(onPostRun.bind(self));

          setTimeout(function () {
            if (!decoder || !decoder.inited) {
              console.log('auto instance Decoder!');
              onPostRun.call(self);
            }
          }, 5000);
        }).catch(function (e) {
          self.postMessage({
            msg: 'INIT_FAILED',
            log: e.message
          });
        });
      }
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'worker inited'
            });
            init(data.url);
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            self.postMessage({
              msg: 'DECODE_FINISH',
              dts: data.info ? data.info.dts : 0
            });
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

  var _createClass$o = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$o(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function bitRateFormate(v) {
    if (v > 1000) {
      return (v / 1000).toFixed(2) + 'MB/s';
    }
    return v.toFixed(2) + 'KB/s';
  }

  var VideoTimeRange = function () {
    function VideoTimeRange() {
      _classCallCheck$o(this, VideoTimeRange);

      this.TAG = 'VideoTimeRange';
      this._baseDts = -1;
      this._lastDuration = 0;
      this._duration = 0;
      this._bitrate = '0KB/s';
      this._compressFrame = [];
    }

    _createClass$o(VideoTimeRange, [{
      key: '_caclBaseDts',
      value: function _caclBaseDts(frame) {
        if (this._baseDts !== -1) return;
        if (!frame) return;
        this._baseDts = frame.dts;
        logger.log(this.TAG, 'set baseDts: ', this._baseDts, 'frame len:', this._compressFrame.length);
      }
    }, {
      key: '_updateDuration',
      value: function _updateDuration(frames) {
        var len = frames.length;
        var last = frames[len - 1];

        for (var i = 0; i < len; i++) {
          var f = frames[i];
          if (f && f.options && f.options.meta) {
            var pre = frames[i - 1] || this._compressFrame[this._compressFrame.length - 1];
            if (pre) {
              this._lastDuration += (pre.dts - this._baseDts) / 1000;
            } else {
              this._lastDuration = this._duration;
            }
            logger.log(this.TAG, 'updateBaseDts,record lastDuration:', this._lastDuration);
            this._baseDts = f.dts;
            break;
          }
        }

        if (last) {
          this._duration = (last.dts - this._baseDts) / 1000 + this._lastDuration;
        }
      }
    }, {
      key: '_estimateBitRate',
      value: function _estimateBitRate(frames) {
        var len = frames.length;
        if (!len) return;
        var sum = 0;
        for (var i = 0; i < len; i++) {
          sum += frames[i].data.length;
        }
        var delta = frames[len - 1].dts - frames[0].dts;

        var bitrate = sum / delta; // KB/s
        this._bitrate = bitRateFormate(bitrate);
      }
    }, {
      key: 'append',
      value: function append(frames, upDuration) {
        this._caclBaseDts(frames[0]);

        if (upDuration) {
          this._updateDuration(frames);
        }
        this._estimateBitRate(frames);
        this._compressFrame = this._compressFrame.concat(frames);
      }
    }, {
      key: 'deletePassed',
      value: function deletePassed(dts) {
        var len = this._compressFrame.length;
        this._compressFrame = this._compressFrame.filter(function (x) {
          return x.dts > dts;
        });
        return len - this._compressFrame.length;
      }
    }, {
      key: 'shift',
      value: function shift() {
        var f = this._compressFrame.shift();
        return f;
      }
    }, {
      key: 'baseDts',
      get: function get() {
        return this._baseDts;
      }
    }, {
      key: 'duartion',
      get: function get() {
        return this._duration;
      }
    }, {
      key: 'buffered',
      get: function get() {
        var _this = this;

        return {
          length: 1,
          start: function start() {
            return 0;
          },
          end: function end() {
            return _this._duration;
          }
        };
      }
    }, {
      key: 'bitrate',
      get: function get() {
        return this._bitrate;
      }
    }, {
      key: 'lastDuration',
      get: function get() {
        return this._lastDuration;
      }
    }]);

    return VideoTimeRange;
  }();

  var _createClass$p = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$p(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var YUVCanvas = function () {
    function YUVCanvas(configs) {
      _classCallCheck$p(this, YUVCanvas);

      this.configs = Object.assign({}, configs);
      this.canvas = this.configs.canvas;
      this.meta = Object.assign({}, this.configs.meta);
      this._initMeta();
      // this.canvas.style.width = configs.style.width;
      // this.canvas.style.height = configs.style.height;
      this._initContextGL();
      if (this.contextGL) {
        this._initProgram();
        this._initBuffers();
        this._initTextures();
      }  }

    _createClass$p(YUVCanvas, [{
      key: '_initMeta',
      value: function _initMeta() {
        this.chroma = this.meta.chromaFormat;
        this.height = this.meta.presentHeight;
        this.width = this.meta.presentWidth;
        this.canvas.width = this.meta.presentWidth;
        this.canvas.height = this.meta.presentHeight;
      }
    }, {
      key: '_initContextGL',
      value: function _initContextGL() {
        var canvas = this.canvas;
        var gl = null;

        var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
        var nameIndex = 0;

        while (!gl && nameIndex < validContextNames.length) {
          var contextName = validContextNames[nameIndex];

          try {
            if (this.contextOptions) {
              gl = canvas.getContext(contextName, this.contextOptions);
            } else {
              gl = canvas.getContext(contextName);
            };
            logger.log('YUVCanvas', 'use=', contextName);
            break;
          } catch (e) {
            gl = null;
          }

          if (!gl || typeof gl.getParameter !== 'function') {
            gl = null;
          }

          ++nameIndex;
        }
        this.contextGL = gl;
      }
    }, {
      key: '_initProgram',
      value: function _initProgram() {
        var gl = this.contextGL;

        // vertex shader is the same for all types
        var vertexShaderScript;
        var fragmentShaderScript;
        vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');

        fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');

        var YUV2RGB = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderScript);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
        }

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderScript);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
        }

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
        }

        gl.useProgram(program);

        var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
        gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);

        this.shaderProgram = program;
      }
    }, {
      key: '_initBuffers',
      value: function _initBuffers() {
        var gl = this.contextGL;
        var program = this.shaderProgram;

        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

        var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
        gl.enableVertexAttribArray(vertexPosRef);
        gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

        var texturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var texturePosRef = gl.getAttribLocation(program, 'texturePos');
        gl.enableVertexAttribArray(texturePosRef);
        gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.texturePosBuffer = texturePosBuffer;

        var uTexturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
        gl.enableVertexAttribArray(uTexturePosRef);
        gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.uTexturePosBuffer = uTexturePosBuffer;

        var vTexturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
        gl.enableVertexAttribArray(vTexturePosRef);
        gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.vTexturePosBuffer = vTexturePosBuffer;
      }
    }, {
      key: '_initTextures',
      value: function _initTextures() {
        var gl = this.contextGL;
        var program = this.shaderProgram;
        var yTextureRef = this._initTexture();
        var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
        gl.uniform1i(ySamplerRef, 0);
        this.yTextureRef = yTextureRef;

        var uTextureRef = this._initTexture();
        var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
        gl.uniform1i(uSamplerRef, 1);
        this.uTextureRef = uTextureRef;

        var vTextureRef = this._initTexture();
        var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
        gl.uniform1i(vSamplerRef, 2);
        this.vTextureRef = vTextureRef;
      }
    }, {
      key: '_initTexture',
      value: function _initTexture() {
        var gl = this.contextGL;

        var textureRef = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);

        return textureRef;
      }
    }, {
      key: '_drawPictureGL',
      value: function _drawPictureGL(data, width, height, yLinesize, uvLinesize) {
        var ylen = yLinesize * height;
        var uvlen = uvLinesize * height / 2;
        if (this.chroma === 444 || this.chroma === 422) {
          uvlen *= 2;
        }
        data = new Uint8Array(data);
        var renderData = {
          yData: data.subarray(0, ylen),
          uData: data.subarray(ylen, ylen + uvlen),
          vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
        };
        this._drawPictureGL420(renderData, width, height, yLinesize, uvLinesize);
      }
    }, {
      key: '_drawPictureGL420',
      value: function _drawPictureGL420(data, width, height, yLinesize, uvLinesize) {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var uTexturePosBuffer = this.uTexturePosBuffer;
        var vTexturePosBuffer = this.vTexturePosBuffer;

        var yTextureRef = this.yTextureRef;
        var uTextureRef = this.uTextureRef;
        var vTextureRef = this.vTextureRef;

        var yData = data.yData;
        var uData = data.uData;
        var vData = data.vData;

        var yDataPerRow = yLinesize;
        var yRowCnt = height;

        var uDataPerRow = uvLinesize;
        var uRowCnt = height / 2;

        if (this.chroma === 422 || this.chroma === 444) {
          uRowCnt = height;
        }

        var vDataPerRow = uvLinesize;
        var vRowCnt = uRowCnt;

        var ratiow = this.canvas.width / this.width;
        var ratioh = this.canvas.height / this.height;
        var left = 0;
        var top = 0;
        var w = this.canvas.width;
        var h = this.canvas.height;
        if (ratiow < ratioh) {
          h = this.height * this.canvas.width / this.width;
          top = parseInt((this.canvas.height - this.height * this.canvas.width / this.width) / 2);
        } else {
          w = this.width * this.canvas.height / this.height;
          left = parseInt((this.canvas.width - this.width * this.canvas.height / this.height) / 2);
        }
        gl.viewport(left, top, w, h);

        var texturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

        var uTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

        var vTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }, {
      key: '_drawPictureRGB',
      value: function _drawPictureRGB(data) {}
    }, {
      key: 'render',
      value: function render(data, width, height, yLinesize, uvLinesize) {
        var gl = this.contextGL;
        // console.log(data, width, height, yLinesize, uvLinesize)
        if (gl) {
          this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
        } else {
          this._drawPictureRGB(data);
        }
      }
    }, {
      key: 'resetMeta',
      value: function resetMeta(meta) {
        this.meta = Object.assign({}, meta);
        this._initMeta();
      }
    }]);

    return YUVCanvas;
  }();

  var _createClass$q = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$q(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MAX_QUEUE_LENGTH = 10;
  var MAX_LOW_FPS_RECORD = 20;

  var DecodeEstimate = function () {
    function DecodeEstimate(parent) {
      _classCallCheck$q(this, DecodeEstimate);

      this.TAG = 'DecodeEstimate';
      this._needEstimate = true;
      this._parent = parent;
      this._lastDecodeDot = 0;
      this._lastDecodeCost = 0;
      this._lastFrameDts = 0;
      this._dtsDeltas = [];
      this._decodeCosts = [];
      this._lowDecodeQueue = [];
      this._fps = 0;
      this._decodeFps = 0;
    }

    _createClass$q(DecodeEstimate, [{
      key: 'needEstimateFps',
      value: function needEstimateFps() {
        this._needEstimate = true;
      }
    }, {
      key: 'addDecodeInfo',
      value: function addDecodeInfo() {
        var frameInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { dts: 0 };

        this._estimateDecodeFps();
        this._estimateFps(frameInfo);
      }
    }, {
      key: 'resetDecodeDot',
      value: function resetDecodeDot() {
        this._lastDecodeDot = 0;
      }
    }, {
      key: '_estimateFps',
      value: function _estimateFps(frameInfo) {
        if (!this._needEstimate) return;

        if (!this._lastFrameDts) {
          this._lastFrameDts = frameInfo.dts;
          return;
        }

        var delta = frameInfo.dts - this._lastFrameDts;
        this._lastFrameDts = frameInfo.dts;

        if (Math.abs(delta) > 100) return;

        this._dtsDeltas.push(delta);

        var len = this._dtsDeltas.length;

        if (len < MAX_QUEUE_LENGTH) return;

        this._fps = Math.ceil(1000 / this._avg(this._dtsDeltas, len));
        logger.log(this.TAG, 'estimate fps:', this._fps);
        this._needEstimate = false;
      }
    }, {
      key: '_estimateDecodeFps',
      value: function _estimateDecodeFps() {
        if (!this._lastDecodeDot) {
          this._lastDecodeDot = performance.now();
          return;
        }

        var now = performance.now();
        var cost = now - this._lastDecodeDot;
        this._lastDecodeDot = now;

        if (cost < 0.5) return;

        this._lastDecodeCost = cost;
        this._decodeCosts.push(cost);
        var len = this._decodeCosts.length;

        if (len < MAX_QUEUE_LENGTH) return;

        var avg = this._avg(this._decodeCosts, len);
        this._decodeFps = Math.floor(1000 / avg);
        this._decodeCosts = [];
        this._lowDecodeDetect();
      }
    }, {
      key: '_avg',
      value: function _avg(list, len) {
        var sum = list.reduce(function (all, c) {
          all += c;
          return all;
        }, 0);
        return Math.floor(sum / len) || 1;
      }

      // 低延迟检测逻辑

    }, {
      key: '_lowDecodeDetect',
      value: function _lowDecodeDetect() {
        if (this._decodeFps < this._fps) {
          this._lowDecodeQueue.push(this._decodeFps);
        } else {
          this._lowDecodeQueue.pop();
        }
        if (this._lowDecodeQueue.length > MAX_LOW_FPS_RECORD) {
          // 大约连续的 20 * 10 = 200帧 解码效率比较低时
          this._lowDecodeQueue = [];
          logger.log(this.TAG, '解码效率过低,应该降级');
          this._parent.emit(Events.VIDEO.DECODE_LOW_FPS);
        }
      }
    }, {
      key: 'fps',
      get: function get() {
        return this._fps;
      }
    }, {
      key: 'decodeFps',
      get: function get() {
        return this._decodeFps;
      }
    }, {
      key: 'decodeCost',
      get: function get() {
        return this._lastDecodeCost;
      }
    }]);

    return DecodeEstimate;
  }();

  var H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js';

  var ASM_H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_asm_1589261792455.js';

  var H265_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_1592202936266.js';

  var ASM_H265_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_asm_1594191692633.js';

  var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$r = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$r(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$3(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$4(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$4(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var HAVE_NOTHING = 0;
  var HAVE_METADATA = 1;
  var HAVE_CURRENT_DATA = 2;
  var HAVE_FUTURE_DATA = 3;
  var HAVE_ENOUGH_DATA = 4;

  var MEDIA_ERR_DECODE$1 = 3;

  var VideoRender = function (_EventEmitter) {
    _inherits$3(VideoRender, _EventEmitter);

    function VideoRender(config, parent) {
      _classCallCheck$r(this, VideoRender);

      var _this = _possibleConstructorReturn$3(this, (VideoRender.__proto__ || Object.getPrototypeOf(VideoRender)).call(this));

      _this.TAG = 'VideoRender';
      _this._config = config;
      _this._parent = parent;
      _this._timeRange = new VideoTimeRange();
      _this._decodeEstimate = new DecodeEstimate(_this);
      _this._frameQueue = []; // the queue of uncompressed frame
      _this._canvas = config.canvas || document.createElement('canvas');
      _this._meta = null;
      _this._decoder = null; //  decoder worker instance
      _this._frameRender = null; // FrameRender instance
      _this._ready = false; // 初始解码ready,可播
      _this._noAudio = false;
      _this._wasmReady = false;
      _this._clearId = -1;
      _this._degrade = false;
      _this._avccpushed = false;
      _this._lastTimeupdate = 0;
      _this._inDecoding = false;
      _this._lastDecodingDts = 0;
      _this._startRender = _this._startRender.bind(_this);
      _this._initCanvas();
      _this._bindEvents();
      return _this;
    }

    _createClass$r(VideoRender, [{
      key: 'updateReady',
      value: function updateReady() {
        this._whenReady();
      }
    }, {
      key: '_assembleErr',
      value: function _assembleErr(msg) {
        var err = new Error(msg);
        err.code = MEDIA_ERR_DECODE$1;
        return err;
      }
    }, {
      key: '_emitTimelineEvents',
      value: function _emitTimelineEvents(e, v, d) {
        this._parent.emit(e, v, d);
      }
    }, {
      key: '_initCanvas',
      value: function _initCanvas() {
        this._canvas.style.maxWidth = '100%';
        this._canvas.style.maxHeight = '100%';
        this._canvas.style.top = 0;
        this._canvas.style.bottom = 0;
        this._canvas.style.left = 0;
        this._canvas.style.right = 0;
        this._canvas.style.margin = 'auto';
        this._canvas.style.position = 'absolute';
      }
    }, {
      key: '_bindEvents',
      value: function _bindEvents() {
        var _this2 = this;

        this._parent.on(Events.TIMELINE.SET_METADATA, function (type, meta) {
          if (type === 'audio') return;
          logger.warn(_this2.TAG, 'video set metadata');
          _this2._setMetadata(meta);
        });

        this._parent.on(Events.TIMELINE.APPEND_CHUNKS, this._appendChunk.bind(this));

        this._parent.on(Events.TIMELINE.START_RENDER, this._startRender);

        // 同步时机
        // 1. 音频一小段buffer起播时
        // 2. 对noAudio的场景 1. 视频变流时,dts发生变化 2. 卡顿waiting后,_parent.timelinePosition已不准确
        this._parent.on(Events.TIMELINE.SYNC_DTS, function (dts) {
          var nextFrame = _this2._frameQueue[0];
          _this2.lastTimelinePosition = _this2.timelinePosition;
          if (_this2._noAudio) {
            dts = dts || nextFrame && nextFrame.info.dts || 0;
          }
          _this2.audioSyncDts = dts;
          if (logger.long) {
            logger.log(_this2.TAG, 'audio current buffer play finish,dts=', dts, 'currentTime:', _this2._parent.currentTime, 'next video frame dts:', nextFrame && nextFrame.info.dts);
          }

          // 1. 换流 音频播完,视频还存在几帧之前的流没播完时
          // 2. 暂时的 a > v
          while (nextFrame) {
            var delta = nextFrame.info.dts - dts;
            if (delta > 10000 || delta < -100) {
              logger.warn(_this2.TAG, 'detect a-v sync problem,delete nextFrame');
              _this2._frameQueue.shift();
              nextFrame = _this2._frameQueue[0];
              continue;
            }
            break;
          }
        });

        this._parent.on(Events.TIMELINE.DO_PAUSE, function () {
          clearTimeout(_this2._clearId);
          _this2._clearId = 0;
        });

        this._parent.on(Events.TIMELINE.DESTROY, function () {
          _this2._destroy();
        });

        this._parent.on(Events.TIMELINE.NO_AUDIO, function () {
          _this2._noAudio = true;
        });

        this.on(Events.VIDEO.AUTO_RUN, this._startRender.bind(this));
      }
    }, {
      key: '_bindWorkerEvent',
      value: function _bindWorkerEvent(decoder) {
        var _this3 = this;

        decoder.addEventListener('message', function (e) {
          var msg = e.data.msg;

          switch (msg) {
            case 'DECODER_READY':
              logger.log(_this3.TAG, 'wasm worker ready ', performance.now());
              _this3._wasmReady = true;
              _this3.emit(Events.VIDEO.VIDEO_DECODER_INIT);
              if (!_this3._avccpushed) {
                _this3._pushAvcc(_this3._decoder, _this3._meta);
              }
              _this3._startDecode();
              break;
            case 'DECODED':
              _this3._frameQueue.push(e.data);
              _this3._decodeEstimate.addDecodeInfo(e.data.info);
              _this3._checkToDecode();
              break;
            case 'DECODE_FINISH':
              if (_this3._lastDecodingDts === e.data.dts) {
                _this3._inDecoding = false;
                _this3._decodeEstimate.resetDecodeDot();
              }
              break;
            case 'LOG':
              // console.log('video decoder worker: LOG:',msg,e.data.log, performance.now());
              break;
            case 'INIT_FAILED':
              if (_this3._degrade) {
                _this3._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', _this3._assembleErr(e.data.log));
              } else {
                _this3._degrade = true;
                _this3._destroyWorker();
                _this3._initWorker();
              }

              break;
            default:
              console.error('invalid messaeg', e);
          }
        });

        decoder.addEventListener('error', function (e) {
          _this3._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, 'error', _this3._assembleErr(e.message));
        });
      }
    }, {
      key: '_setMetadata',
      value: function _setMetadata(meta) {
        this._meta = meta;
        var fps = meta && meta.frameRate && meta.frameRate.fps;
        if (fps) {
          logger.log(this.TAG, 'detect fps:', fps);
        } else {
          logger.warn(this.TAG, 'no detect fps,start estimate');
        }
        if (!this._decoder) {
          this._initWorker();
        } else if (this._wasmReady) {
          this._pushAvcc(this._decoder, meta);
        }
      }
    }, {
      key: '_selectWorker',
      value: function _selectWorker() {
        logger.log(this.TAG, 'start init worker:', performance.now(), 'hevc:', this.isHevc, 'degrade:', this._degrade);
        if (this.isHevc) {
          return {
            decoder: new HevcWorker(),
            url: this._degrade ? ASM_H265_DECODER_URL : H265_DECODER_URL
          };
        }
        return {
          decoder: new AvcWorker(),
          url: this._degrade ? ASM_H264_DECODER_URL : H264_DECODER_URL
        };
      }
    }, {
      key: '_initWorker',
      value: function _initWorker() {
        var _selectWorker2 = this._selectWorker(),
            decoder = _selectWorker2.decoder,
            url = _selectWorker2.url;

        this._decoder = decoder;
        this._bindWorkerEvent(this._decoder);
        this._decoder.postMessage({
          msg: 'init',
          meta: this._meta,
          url: url
        });
      }
    }, {
      key: '_pushAvcc',
      value: function _pushAvcc(worker, meta) {
        logger.log(this.TAG, 'push metadata, init codec context');
        this._avccpushed = true;
        worker.postMessage({
          msg: 'updatemeta',
          meta: meta
        });
        var vps = meta.rawVps || meta.vps;
        var sps = meta.rawSps || meta.sps;
        var pps = meta.rawPps || meta.pps;
        if (vps) {
          var _data = new Uint8Array(vps.byteLength + 4);
          _data.set([0, 0, 0, 1]);
          _data.set(vps, 4);
          worker.postMessage({
            msg: 'decode',
            data: _data
          });
        }

        var data = new Uint8Array(sps.byteLength + 4);
        data.set([0, 0, 0, 1]);
        data.set(sps, 4);
        worker.postMessage({
          msg: 'decode',
          data: data
        });

        data = new Uint8Array(pps.byteLength + 4);
        data.set([0, 0, 0, 1]);
        data.set(pps, 4);
        worker.postMessage({
          msg: 'decode',
          data: data
        });

        if (!this._frameRender) {
          var config = Object.assign({ meta: meta, canvas: this._canvas }, this.config);
          this._frameRender = new YUVCanvas(config);
        } else {
          this._frameRender.resetMeta(meta);
        }
      }
    }, {
      key: '_appendChunk',
      value: function _appendChunk(videoTrack) {
        this._timeRange.append(videoTrack.samples, this._noAudio);
        videoTrack.samples = [];
        if (!this._ready && this._wasmReady && this._noAudio) {
          this._startDecode();
        }
        if (this._noAudio) {
          this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.DURATION_CHANGE);
        }
      }

      // 1. decoder初始化预解码几帧
      // 2. render 过程,帧数过少时解码新帧

    }, {
      key: '_startDecode',
      value: function _startDecode() {
        var len = 15;
        while (len >= 0) {
          var sample = this._timeRange && this._timeRange.shift();
          if (!sample) break;
          this._decodeSample(sample);
          len--;
        }
      }
    }, {
      key: '_whenReady',
      value: function _whenReady() {
        this._ready = true;
        this.emit(Events.VIDEO.VIDEO_READY);
        this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOADEDDATA);
        if (this._noAudio) {
          this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAYING);
        }
      }

      // 检测需要解码的时机
      // 1. 解码worker初始化完成,提前解几帧
      // 2. 渲染ticker中

    }, {
      key: '_checkToDecode',
      value: function _checkToDecode() {
        if (!this._ready) {
          if (this.readyState >= HAVE_FUTURE_DATA) {
            this._whenReady();
          }
          return;
        }
        if (!this._inDecoding && this.readyState < HAVE_FUTURE_DATA) {
          this._startDecode();
        }
      }
    }, {
      key: '_startRender',
      value: function _startRender() {
        if (this._clearId) {
          clearTimeout(this._clearId);
        }

        var frame = this._frameQueue && this._frameQueue[0];
        if (!frame || !this._timeRange) {
          logger.log(this.TAG, 'lack frame');
          this._checkToDecode();
          this._clearId = setTimeout(this._startRender, this.interval);
          // waiting
          if (this._noAudio) {
            this._ready = false;
            this.emit(Events.VIDEO.VIDEO_WAITING);
          }
          return;
        }

        var info = frame.info;

        var _renderDelay = info.dts - this.preciseVideoDts;

        if (_renderDelay > this.interval) {
          this._clearId = setTimeout(this._startRender, this.interval);
          return;
        }

        this._frameQueue.shift();

        if (Math.abs(this._lastTimeupdate - info.dts) > 250) {
          this._emitTimelineEvents(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE);
          this._lastTimeupdate = info.dts;
        }

        if (logger.long) {
          logger.log(this.TAG, 'render delay:' + _renderDelay + ' , timelinePosition:' + this.preciseVideoDts + ' , dts:' + info.dts + ' , rest:' + this._frameQueue.length);
        }

        this._frameRender.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);
        this._checkToDecode();
        this._clearId = setTimeout(this._startRender, 25);
      }
    }, {
      key: '_decodeSample',
      value: function _decodeSample(sample) {
        if (sample.options && sample.options.meta) {
          this._meta = sample.options.meta;
          logger.warn(this.TAG, 'detect metadata! flush decoder');
          this._pushAvcc(this._decoder, sample.options.meta);
          // 换流更新
          if (this._noAudio) {
            this._emitTimelineEvents(Events.TIMELINE.SYNC_DTS, sample.dts);
          }
        }

        var gopId = 0;
        if (sample.gopId) {
          gopId = sample.gopId - 1;
        }
        // const worker = this.wasmworkers[gopId % MAX_WORKER_NUM];
        this._inDecoding = true;
        this._lastDecodingDts = sample.dts;
        this._decoder.postMessage({
          msg: 'decode',
          data: sample.data,
          info: {
            dts: sample.dts,
            pts: sample.pts || sample.dts + sample.cts,
            key: sample.isKeyframe,
            gopId: gopId,
            isGop: sample.isGop || false
          }
        });
      }
    }, {
      key: '_destroyWorker',
      value: function _destroyWorker() {
        if (this._decoder) {
          logger.log(this.TAG, 'destroy worker...');
          this._decoder.postMessage({ msg: 'destroy' });
          this._decoder.terminate();
        }
      }
    }, {
      key: '_destroy',
      value: function _destroy() {
        this._destroyWorker();
        this._canvas = null;
        this._timeRange = null;
        this._frameQueue = null;
        this._decodeEstimate = null;
        this._frameRender = null;
        clearTimeout(this._clearId);
      }
    }, {
      key: 'canvas',
      get: function get() {
        return this._canvas;
      }
    }, {
      key: 'isHevc',
      get: function get() {
        return (this._meta || {}).codec === 'hev1.1.6.L93.B0';
      }
    }, {
      key: 'timescale',
      get: function get() {
        if (!this._meta) return 1000;
        return this._meta.timescale || 1000;
      }
    }, {
      key: 'fps',
      get: function get() {
        return this._meta && this._meta.frameRate && this._meta.frameRate.fps || this._decodeEstimate.fps || 24;
      }
    }, {
      key: 'decodeFps',
      get: function get() {
        return this._decodeEstimate.decodeFps;
      }
    }, {
      key: 'decodeCost',
      get: function get() {
        return this._decodeEstimate.decodeCost;
      }
    }, {
      key: 'bitrate',
      get: function get() {
        return this._timeRange.bitrate;
      }
    }, {
      key: 'duration',
      get: function get() {
        return this._timeRange.duartion;
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this._timeRange.buffered;
      }
    }, {
      key: 'interval',
      get: function get() {
        return Math.floor(1000 / this.fps);
      }
    }, {
      key: 'running',
      get: function get() {
        return this._clearId !== 0;
      }

      // video first frame dts

    }, {
      key: 'baseDts',
      get: function get() {
        return this._timeRange.baseDts;
      }

      // noAudio时使用

    }, {
      key: 'currentTime',
      get: function get() {
        return this._timeRange.lastDuration + (this.preciseVideoDts - this.baseDts) / 1000;
      }
    }, {
      key: 'timelinePosition',
      get: function get() {
        return this._parent.timelinePosition;
      }
    }, {
      key: 'lastTimelinePosition',
      set: function set(ts) {
        this._lastTimelinePosition = ts;
      }

      // the startTime on timeline of the buffer audioCtx current playing
      // noAudio: the time record by perforamce.now() when play start or restart after waiting or stream changed

      , get: function get() {
        return this._lastTimelinePosition || 0;
      }
    }, {
      key: 'audioSyncDts',
      set: function set(dts) {
        this._audioDts = dts;
      }

      // the first sample's dts of the buffer audioCtx current playing

      , get: function get() {
        return this._audioDts || this.baseDts;
      }

      // the precise video dts sync to timeline time

    }, {
      key: 'preciseVideoDts',
      get: function get() {
        return this.audioSyncDts + (this.timelinePosition - this.lastTimelinePosition) * 1000;
      }
    }, {
      key: 'readyState',
      get: function get() {
        var len = this._frameQueue && this._frameQueue.length;
        if (!len) return HAVE_NOTHING;
        if (len >= 8) return HAVE_ENOUGH_DATA;
        if (len >= 4) return HAVE_FUTURE_DATA;
        if (len >= 2) return HAVE_CURRENT_DATA;
        return HAVE_METADATA;
      }
    }]);

    return VideoRender;
  }(EventEmitter);

  var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$s = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$s(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$4(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$5(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$5(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var TimeLine = function (_EventEmitter) {
    _inherits$4(TimeLine, _EventEmitter);

    function TimeLine(config, parent) {
      _classCallCheck$s(this, TimeLine);

      var _this = _possibleConstructorReturn$4(this, (TimeLine.__proto__ || Object.getPrototypeOf(TimeLine)).call(this));

      _this.TAG = 'TimeLine';
      _this._parent = parent;
      _this.videoRender = new VideoRender(config, _this);
      _this.audioRender = new AudioRender(config, _this);
      _this._readyStatus = {
        audio: false,
        video: false
      };
      _this._paused = true;
      _this._noAudio = false;
      _this._bindEvent();
      return _this;
    }

    _createClass$s(TimeLine, [{
      key: '_bindEvent',
      value: function _bindEvent() {
        var _this2 = this;

        this.audioRender.on(Events.AUDIO.AUDIO_READY, function () {
          logger.log(_this2.TAG, 'audio ready!');
          _this2._readyStatus.audio = true;
          if (_this2._readyStatus.video) {
            _this2._startRender();
          }
        });

        this.audioRender.on(Events.AUDIO.AUDIO_WAITING, function () {
          if (_this2._noAudio) return;
          logger.warn(_this2.TAG, 'lack data, audio waiting,currentTime:', _this2.currentTime);
          _this2.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
          _this2.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE);
          _this2.emit(Events.TIMELINE.DO_PAUSE);
          _this2._readyStatus.audio = false;
        });

        // only used for no audio exist
        this.videoRender.on(Events.VIDEO.VIDEO_WAITING, function () {
          logger.warn(_this2.TAG, 'lack data, video waiting');
          _this2.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
          _this2.emit(Events.TIMELINE.DO_PAUSE);
          _this2._readyStatus.video = false;
        });

        this.videoRender.on(Events.VIDEO.VIDEO_DECODER_INIT, function () {
          logger.log(_this2.TAG, 'video decoder init!');
          setTimeout(function () {
            if (!_this2._readyStatus.video) {
              logger.warn(_this2.TAG, 'video 首次解码无解码帧返回! auto ready!');
              _this2.videoRender.updateReady();
            }
          }, 1000);
        });

        this.onVideoReady = function () {
          logger.log(_this2.TAG, 'video ready!');
          _this2._readyStatus.video = true;
          if (_this2._readyStatus.audio) {
            _this2._startRender();
          }
        };

        this.videoRender.on(Events.VIDEO.VIDEO_READY, this.onVideoReady);

        this.videoRender.on(Events.VIDEO.DECODE_LOW_FPS, function () {
          if (_this2.currentTime < 20) return;
          if (_this2._paused) return;
          _this2.pause();
          _this2.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOW_DECODE);
        });

        this.on(Events.TIMELINE.NO_AUDIO, function () {
          _this2._noAudio = true;
          _this2._readyStatus.audio = true;
        });
      }
    }, {
      key: '_startRender',
      value: function _startRender() {
        if (this._parent.error) return;
        if (this._noAudio) {
          this.emit(Events.TIMELINE.SYNC_DTS, 0);
        }
        logger.log(this.TAG, 'startRender: time=', this.currentTime);
        this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.CANPLAY);
        this.emit(Events.TIMELINE.START_RENDER);
        this.emit(Events.TIMELINE.READY);
      }
    }, {
      key: 'resetReadyStatus',
      value: function resetReadyStatus() {
        this._readyStatus = {
          audio: false,
          video: false
        };
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var resumed = false;

          if (_this3._noAudio) {
            resumed = true;
          } else {
            _this3.audioRender.resume().then(function () {
              logger.log(_this3.TAG, 'audioCtx 开始播放');
              resumed = true;
            });
          }

          setTimeout(function () {
            _this3.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE);
            if (!resumed) {
              logger.log(_this3.TAG, 'audioCtx 不能自动播放');
              reject();
              return;
            }
            _this3._paused = false;
            _this3.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAY);
            resolve();
          }, 30);
        });
      }
    }, {
      key: 'pause',
      value: function pause() {
        var _this4 = this;

        if (this._paused) return;
        this.emit(Events.TIMELINE.DO_PAUSE);
        setTimeout(function () {
          _this4._paused = true;
          _this4.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PAUSE);
        }, 10);
      }
    }, {
      key: 'seek',
      value: function seek() {
        this._paused = true;
      }
    }, {
      key: 'ready',
      get: function get() {
        return this._readyStatus.video && this._readyStatus.audio;
      }
    }, {
      key: 'played',
      get: function get() {
        var _this5 = this;

        return {
          length: this.currentTime ? 1 : 0,
          start: function start() {
            return 0;
          },
          end: function end() {
            return _this5.currentTime;
          }
        };
      }
    }, {
      key: 'decodeFps',
      get: function get() {
        return this.videoRender.decodeFps;
      }
    }, {
      key: 'decodeCost',
      get: function get() {
        return this.videoRender.decodeCost;
      }
    }, {
      key: 'fps',
      get: function get() {
        return this.videoRender.fps;
      }
    }, {
      key: 'bitrate',
      get: function get() {
        return this.videoRender.bitrate;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        if (this._noAudio) return this.videoRender.currentTime;
        return this.audioRender.currentTime;
      }
    }, {
      key: 'timelinePosition',
      get: function get() {
        if (this._noAudio) return performance.now() / 1000; // s
        return this.audioRender.currentTime;
      }
    }, {
      key: 'canvas',
      get: function get() {
        return this.videoRender.canvas;
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.videoRender.readyState;
      }
    }, {
      key: 'buffered',
      get: function get() {
        if (this._noAudio) return this.videoRender.buffered;
        return this.audioRender.buffered;
      }
    }, {
      key: 'duration',
      get: function get() {
        if (this._noAudio) return this.videoRender.duration;
        return this.audioRender.duration;
      }
    }, {
      key: 'paused',
      get: function get() {
        return this._paused;
      }
    }]);

    return TimeLine;
  }(EventEmitter);

  var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$t = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$t(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$5(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$6(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$5(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$6(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
  }
  Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(_CustomElement, HTMLElement);

  var MVideo = function (_CustomElement2) {
    _inherits$5(MVideo, _CustomElement2);

    function MVideo() {
      _classCallCheck$t(this, MVideo);

      var _this = _possibleConstructorReturn$5(this, (MVideo.__proto__ || Object.getPrototypeOf(MVideo)).call(this));

      _this.TAG = 'MVideo';
      _this._init();
      return _this;
    }

    _createClass$t(MVideo, [{
      key: '_init',
      value: function _init() {
        var _this2 = this;

        this.timeline = new TimeLine({
          preloadTime: this.preloadTime,
          volume: this.volume,
          canvas: this.querySelector('canvas')
        }, this);
        this._noSleep = new NoSleep();
        this._logFirstFrame = false;
        this._playRequest = null;
        this._bindEvents();
        setTimeout(function () {
          if (_this2.noAudio) {
            _this2.setNoAudio();
          }
        });
      }
    }, {
      key: '_bindEvents',
      value: function _bindEvents() {
        var _this3 = this;

        this.timeline.on(Events.TIMELINE.PLAY_EVENT, function (status, data) {
          if (status === 'canplay') {
            if (!_this3.querySelector('canvas')) {
              _this3.appendChild(_this3.canvas);
            }
          }
          if (status === 'error') {
            _this3._err = data;
            logger.warn(_this3.TAG, 'detect error:', data.message);
            _this3.pause();
          }
          if (status === 'ended') {
            _this3.pause();
          }
          _this3._innerDispatchEvent(status);
        });
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        logger.log(this.TAG, 'video disconnected');
        this.destroy();
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        logger.log(this.TAG, 'video connected to document');
        if (!this.timeline) {
          this._init();
        }
      }
    }, {
      key: 'handleMediaInfo',
      value: function handleMediaInfo() {
        this._logFirstFrame = false;
      }
    }, {
      key: 'play',
      value: function play() {
        var _this4 = this;

        logger.log(this.TAG, 'mvideo called play(),to reset video:', this.timeline.ready, this.timeline.paused);

        // 暂停后起播
        // 初始化后不能自动播放,手动播放
        if (this.timeline.ready && this.timeline.paused) {
          this.destroy();
          this._init();
          this.timeline.resetReadyStatus();
          this._playRequest = null;
        }

        this._playRequest = this._playRequest || new Promise(function (resolve, reject) {
          _this4._innerDispatchEvent('timeupdate');
          _this4._innerDispatchEvent('play');
          _this4._innerDispatchEvent('waiting');
          _this4._noSleep.enable();
          _this4.timeline.once('ready', function () {
            _this4._playRequest = null;
            _this4.timeline.play().then(resolve).catch(reject);
          });
        });

        return this._playRequest;
      }
    }, {
      key: 'pause',
      value: function pause() {
        this._playRequest = null;
        this.timeline.pause();
        this._noSleep.disable();
      }
    }, {
      key: 'load',
      value: function load() {}
    }, {
      key: 'onDemuxComplete',
      value: function onDemuxComplete(videoTrack, audioTrack) {
        if (this.error || !this.timeline) return;
        if (!this._logFirstFrame) {
          var vSam0 = videoTrack.samples[0];
          var aSam0 = this.noAudio ? null : audioTrack.samples[0];
          if (vSam0 && aSam0 || vSam0 && this.noAudio) {
            logger.log(this.TAG, 'video firstDts:' + vSam0.dts + ' , audio firstDts:' + (this.noAudio ? 0 : aSam0.dts));
            this._logFirstFrame = true;
          }
        }
        this.timeline.emit(Events.TIMELINE.APPEND_CHUNKS, videoTrack, audioTrack);
      }
    }, {
      key: 'setNoAudio',
      value: function setNoAudio() {
        logger.log(this.TAG, 'video set noAudio!');
        this.timeline.emit(Events.TIMELINE.NO_AUDIO);
        this.noAudio = true;
      }
    }, {
      key: 'setAudioMeta',
      value: function setAudioMeta(meta) {
        this.timeline.emit(Events.TIMELINE.SET_METADATA, 'audio', meta);
      }
    }, {
      key: 'setVideoMeta',
      value: function setVideoMeta(meta) {
        this.timeline.emit(Events.TIMELINE.SET_METADATA, 'video', meta);
      }
    }, {
      key: 'handleEnded',
      value: function handleEnded() {
        this.timeline.emit(Events.TIMELINE.PLAY_EVENT, 'ended');
      }
    }, {
      key: 'handleErr',
      value: function handleErr(code, message) {
        this._err = {};
        this._err.code = code;
        this._err.message = message;
        this.timeline.emit(Events.TIMELINE.PLAY_EVENT, 'error');
      }
    }, {
      key: '_innerDispatchEvent',
      value: function _innerDispatchEvent(type) {
        this.dispatchEvent(new Event(type));
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        logger.log(this.TAG, 'call destroy');
        this.timeline.emit(Events.TIMELINE.DESTROY);
        this.timeline = null;
        this._err = null;
        this._noSleep = null;
      }
    }, {
      key: 'noAudio',
      get: function get() {
        return this.getAttribute('noaudio') === 'true';
      },
      set: function set(val) {
        this.setAttribute('noaudio', val);
      }
    }, {
      key: 'canvas',
      get: function get() {
        return this.timeline.canvas;
      }
    }, {
      key: 'width',
      get: function get() {
        return this.getAttribute('width') || this.videoWidth;
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('width', pxVal);
        this.style.width = pxVal;
        this.canvas.width = val;
      }
    }, {
      key: 'height',
      get: function get() {
        return this.getAttribute('height');
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('height', pxVal);
        this.style.height = pxVal;
        this.canvas.height = val;
      }
    }, {
      key: 'videoWidth',
      get: function get() {
        return this.canvas.width;
      }
    }, {
      key: 'videoHeight',
      get: function get() {
        return this.canvas.height;
      }
    }, {
      key: 'volume',
      get: function get() {
        return Number(this.getAttribute('volume'));
      },
      set: function set(v) {
        if (v <= 0) {
          v = 0;
        }
        if (v >= 1) {
          v = 1;
        }
        this.setAttribute('volume', v);
        this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v);
      }
    }, {
      key: 'muted',
      get: function get() {
        return this.getAttribute('muted') === 'true' || this.volume == 0;
      },
      set: function set(v) {
        this.setAttribute('muted', v);
        this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v ? 0 : this.volume);
      }
    }, {
      key: 'currentTime',
      get: function get() {
        var c = this.timeline.currentTime;
        var d = this.timeline.duration;
        return c > d ? d : c;
      },
      set: function set(v) {
        this.timeline.seek(v);
      }
    }, {
      key: 'duration',
      get: function get() {
        return this.timeline.duration;
      }
    }, {
      key: 'seeking',
      get: function get() {
        return false;
      }
    }, {
      key: 'paused',
      get: function get() {
        return this.timeline.paused;
      }
    }, {
      key: 'fps',
      get: function get() {
        return this.timeline.fps;
      }
    }, {
      key: 'decodeFps',
      get: function get() {
        return this.timeline.decodeFps;
      }
    }, {
      key: 'decodeCost',
      get: function get() {
        return this.timeline.decodeCost;
      }
    }, {
      key: 'bitrate',
      get: function get() {
        return this.timeline.bitrate;
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.timeline.readyState;
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this.timeline.buffered;
      }
    }, {
      key: 'src',
      get: function get() {
        return this.getAttribute('src');
      },
      set: function set(val) {
        this.setAttribute('src', val);
      }
    }, {
      key: 'playbackRate',
      set: function set(v) {},
      get: function get() {
        return 1;
      }
    }, {
      key: 'networkState',
      get: function get() {
        return 0;
      }
    }, {
      key: 'preloadTime',
      get: function get() {
        var attrPreloadTime = this.getAttribute('preloadtime');
        if (attrPreloadTime) {
          var preloadTime = Number.parseFloat(attrPreloadTime);
          if (preloadTime > 0 && !Number.isNaN(preloadTime)) {
            return preloadTime;
          }
        }
        return Infinity;
      },
      set: function set(val) {
        if (val && Number(val) > 0) {
          this.setAttribute('preloadtime', val);
        }
      }
    }, {
      key: 'error',
      get: function get() {
        return this._err;
      }
    }]);

    return MVideo;
  }(_CustomElement);

  customElements.define('mobile-video', MVideo);

  var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _createClass$u = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$u(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _inherits$6(Raw264Player, _Player);

    _createClass$u(Raw264Player, null, [{
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
      _classCallCheck$u(this, Raw264Player);

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

      var _this = _possibleConstructorReturn$6(this, (Raw264Player.__proto__ || Object.getPrototypeOf(Raw264Player)).call(this, props));

      _this.video.setAttribute('noaudio', true);
      _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);
      _this.hasPlayed = false;
      _this.hasStart = false;
      return _this;
    }

    _createClass$u(Raw264Player, [{
      key: 'start',
      value: function start() {
        if (this.hasStart) {
          return;
        } else {
          this.hasStart = true;
        }
        this.context = new Context$1(Events$1.HlsAllowedEvents);
        this.context.registry('LOADER_BUFFER', LoaderBuffer);
        this.core = this.context.registry('RAW_264_CONTROLLER', H264Demuxer)({ player: this, fps: this.config.fps });
        this.context.registry('FETCH_LOADER', FetchLoader$1);
        this.context.init();
        if (!this.config.isLive) {
          this.core.load(this.config.url);
        }

        _get$1(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'start', this).call(this);
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
        _get$1(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'destroy', this).call(this, isDelDom);
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
        var oldTime = _get$1(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
        var buffered = this.getBufferedRange();
        if (buffered[0] <= time && buffered[1] >= time) {
          this.video.currentTime = time;
        } else {
          this.video.currentTime = oldTime;
        }
      },
      get: function get() {
        return _get$1(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
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
