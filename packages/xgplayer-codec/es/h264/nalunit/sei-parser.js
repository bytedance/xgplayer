var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SEIResult = function SEIResult(type, uuid, payload) {
  _classCallCheck(this, SEIResult);

  return {
    type: type,
    uuid: uuid,
    payload: payload
  };
};

var SEIParser = function () {
  function SEIParser() {
    _classCallCheck(this, SEIParser);
  }

  _createClass(SEIParser, null, [{
    key: "parse",
    value: function parse(seiArr) {
      if (!seiArr.length) {
        return;
      }
      var payloadType = 0;
      var payloadSize = 0;
      var i = 0;
      while (seiArr.slice(i, i + 8) === 0xff) {
        payloadType += 255;
        i += 8;
      }
      payloadType += seiArr.slice(i, i + 8);
      i += 8;

      while (seiArr.slice(i, i + 8) === 0xff) {
        payloadSize += 255;
        i += 8;
      }

      payloadSize += seiArr.slice(i, i + 8);
      i += 8;

      switch (payloadType) {
        case 5:
          return Object.assign({}, SEIParser.user_data_unregistered(seiArr.slice(i, i + payloadSize)), {
            size: payloadSize,
            type: payloadType
          });
      }
    }
  }, {
    key: "user_data_unregistered",
    value: function user_data_unregistered(buffer, payloadSize) {
      var uuid = buffer.slice(0, 16);
      var content = buffer.slice(16, payloadSize - 1);
      return {
        uuid: uuid,
        content: content
      };
    }
  }]);

  return SEIParser;
}();