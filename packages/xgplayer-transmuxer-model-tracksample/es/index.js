export var AudioTrackSample = function () {
  function AudioTrackSample(info) {
    babelHelpers.classCallCheck(this, AudioTrackSample);

    var _default = AudioTrackSample.getDefault();
    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  babelHelpers.createClass(AudioTrackSample, null, [{
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
    babelHelpers.classCallCheck(this, VideoTrackSample);

    var _default = VideoTrackSample.getDefault();

    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  babelHelpers.createClass(VideoTrackSample, null, [{
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