var MediaSample = function () {
  function MediaSample(info) {
    var _this = this;

    babelHelpers.classCallCheck(this, MediaSample);

    var _default = MediaSample.getDefaultInf();

    if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    Object.entries(sample).forEach(function (_ref) {
      var _ref2 = babelHelpers.slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      _this[k] = v;
    });
  }

  babelHelpers.createClass(MediaSample, null, [{
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

export default MediaSample;