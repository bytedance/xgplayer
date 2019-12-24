import Concat from 'concat-typed-array';

var Buffer = function () {
  function Buffer(buffer) {
    babelHelpers.classCallCheck(this, Buffer);

    this.buffer = buffer || new Uint8Array(0);
  }

  babelHelpers.createClass(Buffer, [{
    key: 'write',
    value: function write() {
      var _this = this;

      for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
        buffer[_key] = arguments[_key];
      }

      buffer.forEach(function (item) {
        _this.buffer = Concat(Uint8Array, _this.buffer, item);
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
      var temp = '';

      function padStart4Hex(hexNum) {
        var hexStr = hexNum.toString(16);
        return hexStr.padStart(2, '0');
      }

      arr.forEach(function (num) {
        temp += padStart4Hex(num);
      });
      return parseInt(temp, 16);
    }
  }]);
  return Buffer;
}();

export default Buffer;