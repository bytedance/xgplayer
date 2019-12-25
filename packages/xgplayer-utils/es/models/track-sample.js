var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var AudioTrackSample = function () {
  function AudioTrackSample(info) {
    _classCallCheck(this, AudioTrackSample);

    var _default = AudioTrackSample.getDefault();
    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  _createClass(AudioTrackSample, null, [{
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

export var VideoTrackSample = function () {
  function VideoTrackSample(info) {
    _classCallCheck(this, VideoTrackSample);

    var _default = VideoTrackSample.getDefault();

    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  _createClass(VideoTrackSample, null, [{
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