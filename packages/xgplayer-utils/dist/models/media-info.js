"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

const isObjectFilled = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};

let MediaInfo = function () {
  function MediaInfo() {
    _classCallCheck(this, MediaInfo);

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

  _createClass(MediaInfo, [{
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

exports.default = MediaInfo;