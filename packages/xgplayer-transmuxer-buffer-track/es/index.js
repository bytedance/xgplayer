var Track = function () {
  /**
   * The constructor.
   */
  function Track() {
    babelHelpers.classCallCheck(this, Track);

    this.id = -1;
    this.sequenceNumber = 0;
    this.samples = [];
    this.droppedSamples = [];
    this.length = 0;
  }

  /**
   * Reset the track.
   */


  babelHelpers.createClass(Track, [{
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
  babelHelpers.inherits(AudioTrack, _Track);

  /**
   * The constructor for audio track.
   */
  function AudioTrack() {
    babelHelpers.classCallCheck(this, AudioTrack);

    var _this = babelHelpers.possibleConstructorReturn(this, (AudioTrack.__proto__ || Object.getPrototypeOf(AudioTrack)).call(this));

    _this.TAG = 'AudioTrack';
    _this.type = 'audio';
    return _this;
  }

  return AudioTrack;
}(Track);

export var VideoTrack = function (_Track2) {
  babelHelpers.inherits(VideoTrack, _Track2);

  /**
   * The constructor for video track.
   */
  function VideoTrack() {
    babelHelpers.classCallCheck(this, VideoTrack);

    var _this2 = babelHelpers.possibleConstructorReturn(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

    _this2.TAG = 'VideoTrack';
    _this2.type = 'video';
    _this2.dropped = 0;
    return _this2;
  }
  /**
   * reset the video track.
   */


  babelHelpers.createClass(VideoTrack, [{
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
    babelHelpers.classCallCheck(this, Tracks);

    this.audioTrack = null;
    this.videoTrack = null;
  }

  babelHelpers.createClass(Tracks, [{
    key: 'destroy',
    value: function destroy() {
      this.audioTrack = null;
      this.videoTrack = null;
    }
  }]);
  return Tracks;
}();