'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let MediaSample = function () {
  function MediaSample(info) {
    _classCallCheck(this, MediaSample);

    let _default = MediaSample.getDefaultInf();

    if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
      return _default;
    }
    let sample = Object.assign({}, _default, info);

    Object.entries(sample).forEach((_ref) => {
      let [k, v] = _ref;

      this[k] = v;
    });
  }

  _createClass(MediaSample, null, [{
    key: 'getDefaultInf',
    value: function getDefaultInf() {
      return {
        dts: null,
        pts: null,
        duration: null,
        position: null,
        isRAP: false, // is Random access point
        originDts: null
      };
    }
  }]);

  return MediaSample;
}();

exports.default = MediaSample;