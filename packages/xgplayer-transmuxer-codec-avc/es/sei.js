var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import RBSP from './rbsp';

var u8aToString = function u8aToString(data) {
  var result = '';
  for (var i = 0; i < data.byteLength; i++) {
    result += String.fromCharCode(data[i]);
  }
  return result;
};

var SEIParser = function () {
  function SEIParser() {
    _classCallCheck(this, SEIParser);
  }

  _createClass(SEIParser, null, [{
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
          return {};
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

export default SEIParser;