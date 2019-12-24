var isObjectFilled = function isObjectFilled(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};

var MediaInfo = function () {
  function MediaInfo() {
    babelHelpers.classCallCheck(this, MediaInfo);

    this.mimeType = null;
    this.duration = null;

    this.hasVideo = null;
    this.video = {
      codec: null,
      width: null,
      height: null,
      profile: null,
      level: null,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      chromaFormat: null,
      parRatio: {
        width: 1,
        height: 1
      }
    };

    this.hasAudio = null;

    this.audio = {
      codec: null,
      sampleRate: null,
      sampleRateIndex: null,
      channelCount: null
    };
  }

  babelHelpers.createClass(MediaInfo, [{
    key: "isComplete",
    value: function isComplete() {
      return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
    }
  }], [{
    key: "isBaseInfoReady",
    value: function isBaseInfoReady(mediaInfo) {
      return isObjectFilled(mediaInfo);
    }
  }, {
    key: "isVideoReady",
    value: function isVideoReady(mediaInfo) {
      if (!mediaInfo.hasVideo) {
        return true;
      }

      return isObjectFilled(mediaInfo.video);
    }
  }, {
    key: "isAudioReady",
    value: function isAudioReady(mediaInfo) {
      if (!mediaInfo.hasAudio) {
        return true;
      }

      return isObjectFilled(mediaInfo.video);
    }
  }]);
  return MediaInfo;
}();

export default MediaInfo;