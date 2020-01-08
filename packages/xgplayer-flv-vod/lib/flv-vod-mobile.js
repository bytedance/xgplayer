'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flvVod = require('./flv-vod');

var _flvVod2 = _interopRequireDefault(_flvVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VodMobileController = function (_VodController) {
  _inherits(VodMobileController, _VodController);

  function VodMobileController() {
    _classCallCheck(this, VodMobileController);

    return _possibleConstructorReturn(this, (VodMobileController.__proto__ || Object.getPrototypeOf(VodMobileController)).apply(this, arguments));
  }

  _createClass(VodMobileController, [{
    key: '_handleDemuxComplete',
    value: function _handleDemuxComplete() {
      if (this._player.video) {
        var _context$getInstance = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance.videoTrack,
            audioTrack = _context$getInstance.audioTrack;

        this._player.video.onDemuxComplete(videoTrack, audioTrack);
      }
    }
  }, {
    key: '_handleMetadataParsed',
    value: function _handleMetadataParsed(type) {
      if (type === 'audio') {
        // 将音频meta信息交给audioContext，不走remux封装
        var _context$getInstance2 = this._context.getInstance('TRACKS'),
            audioTrack = _context$getInstance2.audioTrack;

        if (audioTrack && audioTrack.meta) {
          this._setMetaToAudio(audioTrack.meta);
        }
      } else {
        var _context$getInstance3 = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance3.videoTrack;

        if (videoTrack && videoTrack.meta) {
          this._setMetaToVideo(videoTrack.meta);
        }
      }
    }
  }, {
    key: '_setMetaToAudio',
    value: function _setMetaToAudio(audioMeta) {
      if (this._player.video) {
        this._player.video.setAudioMeta(audioMeta);
      }
    }
  }, {
    key: '_setMetaToVideo',
    value: function _setMetaToVideo(videoMeta) {
      if (this._player.video) {
        this._player.video.setVideoMeta(videoMeta);
      }
    }
  }]);

  return VodMobileController;
}(_flvVod2.default);

exports.default = VodMobileController;