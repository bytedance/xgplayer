'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let Stream = function () {
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
      let loop = Math.floor(count / 4);
      let last = count % 4;
      for (let i = 0; i < loop; i++) {
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
    get: function () {
      return this.buffer.byteLength;
    }
  }, {
    key: 'position',
    set: function (value) {
      this.dataview.position = value;
    },
    get: function () {
      return this.dataview.position;
    }
  }], [{
    key: 'readByte',
    value: function readByte(buffer, size, sign) {
      let res;
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

exports.default = Stream;