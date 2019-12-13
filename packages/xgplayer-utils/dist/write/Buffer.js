'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _concatTypedArray = require('concat-typed-array');

var _concatTypedArray2 = _interopRequireDefault(_concatTypedArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let Buffer = function () {
  function Buffer(buffer) {
    _classCallCheck(this, Buffer);

    this.buffer = buffer || new Uint8Array(0);
  }

  _createClass(Buffer, [{
    key: 'write',
    value: function write() {
      for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
        buffer[_key] = arguments[_key];
      }

      buffer.forEach(item => {
        this.buffer = (0, _concatTypedArray2.default)(Uint8Array, this.buffer, item);
      });
    }
  }], [{
    key: 'writeUint32',
    value: function writeUint32(value) {
      return new Uint8Array([value >> 24, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff]);
    }
  }, {
    key: 'readAsInt',
    value: function readAsInt(arr) {
      let temp = '';

      function padStart4Hex(hexNum) {
        let hexStr = hexNum.toString(16);
        return hexStr.padStart(2, '0');
      }

      arr.forEach(num => {
        temp += padStart4Hex(num);
      });
      return parseInt(temp, 16);
    }
  }]);

  return Buffer;
}();

exports.default = Buffer;