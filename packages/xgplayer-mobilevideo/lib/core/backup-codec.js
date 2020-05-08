'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DecoderWorker = require('worker!./Decoder.worker.js');

var _DecoderWorker2 = _interopRequireDefault(_DecoderWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackUpCodec = function () {
  function BackUpCodec() {
    var _this = this;

    _classCallCheck(this, BackUpCodec);

    // super();
    this.messageCallBack = null;

    this._decode = function (parData) {
      var parInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var copyU8 = new Uint8Array(parData.length);
      copyU8.set(parData, 0, parData.length);
      _this.worker.postMessage({ buf: copyU8.buffer, offset: 0, length: parData.length, info: parInfo }, [copyU8.buffer]); // Send data to our worker.
    };

    this._destroy = function () {
      delete _this.worker;
    };
    // 一个id不会真的作为时间戳
    this.frameCount = 1;
    this.fakeDTS = 40;
  }

  _createClass(BackUpCodec, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      try {
        this.worker = new _DecoderWorker2.default();
      } catch (e) {
        var scriptUrl = location.protocol + '//tosv.byted.org/obj/media-site/Decoder.js';
        var blob = new Blob(['importScripts(\'' + scriptUrl + '\');'], { 'type': 'application/javascript' });
        var blobUrl = URL.createObjectURL(blob);
        this.worker = new Worker(blobUrl);
      }

      var worker = this.worker;

      worker.addEventListener('message', function (e) {
        var data = e.data;
        if (data.consoleLog) {
          console.log(data.consoleLog);
          return;
        }
        ;

        // onPictureDecoded.call(self, new Uint8Array(data.buf, 0, data.length), data.width, data.height, data.infos);
        _this2.messageCallBack({
          data: {
            msg: 'DECODED',
            info: {
              dts: _this2.frameCount * _this2.fakeDTS
            },
            buffer: data.buf,
            width: data.width,
            height: data.height,
            yLinesize: data.width,
            uvLinesize: data.width / 2
          }
        });

        {
          _this2.frameCount++;
        }
      }, false);
      worker.postMessage({
        type: 'Broadway.js - Worker init', options: {
          rgb: false,
          memsize: this.memsize,
          reuseMemory: false
        }
      });
      // 通知外部初始化好了
      this.messageCallBack({
        data: {
          msg: 'DECODER_READY',
          info: {
            dts: null
          }
        }
      });
    }
  }, {
    key: 'postMessage',
    value: function postMessage(msg) {
      var type = msg.msg;
      switch (type) {
        case 'decode':
          this._decode(msg.data);
          break;
        case 'updatemeta':
          break;
        case 'destroy':
          this._destroy();
          break;
      }
    }
  }, {
    key: 'onmessage',
    set: function set(fn) {
      this.messageCallBack = fn;
    }
  }]);

  return BackUpCodec;
}();

exports.default = BackUpCodec;