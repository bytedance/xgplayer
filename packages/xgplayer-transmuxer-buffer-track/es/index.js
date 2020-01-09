var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
  /**
   * The constructor.
   */
  function Track() {
    _classCallCheck(this, Track);

    this.id = -1;
    this.sequenceNumber = 0;
    this.samples = [];
    this.droppedSamples = [];
    this.length = 0;
  }

  /**
   * Reset the track.
   */


  _createClass(Track, [{
    key: 'reset',
    value: function reset() {
      this.sequenceNumber = 0;
      this.samples = [];
      this.length = 0;
    }
    /**
     * destroy the track.
     */

  }, {
    key: 'distroy',
    value: function distroy() {
      this.reset();
      this.id = -1;
    }
  }]);

  return Track;
}();

export default Track;


export var AudioTrack = function (_Track) {
  _inherits(AudioTrack, _Track);

  /**
   * The constructor for audio track.
   */
  function AudioTrack() {
    _classCallCheck(this, AudioTrack);

    var _this = _possibleConstructorReturn(this, (AudioTrack.__proto__ || Object.getPrototypeOf(AudioTrack)).call(this));

    _this.TAG = 'AudioTrack';
    _this.type = 'audio';
    return _this;
  }

  return AudioTrack;
}(Track);

export var VideoTrack = function (_Track2) {
  _inherits(VideoTrack, _Track2);

  /**
   * The constructor for video track.
   */
  function VideoTrack() {
    _classCallCheck(this, VideoTrack);

    var _this2 = _possibleConstructorReturn(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

    _this2.TAG = 'VideoTrack';
    _this2.type = 'video';
    _this2.dropped = 0;
    return _this2;
  }
  /**
   * reset the video track.
   */


  _createClass(VideoTrack, [{
    key: 'reset',
    value: function reset() {
      this.sequenceNumber = 0;
      this.samples = [];
      this.length = 0;
      this.dropped = 0;
    }
  }]);

  return VideoTrack;
}(Track);

export var Tracks = function () {
  function Tracks() {
    _classCallCheck(this, Tracks);

    this.audioTrack = null;
    this.videoTrack = null;
  }

  _createClass(Tracks, [{
    key: 'destroy',
    value: function destroy() {
      this.audioTrack = null;
      this.videoTrack = null;
    }
  }]);

  return Tracks;
}();