import MediaInfo from '../models/MediaInfo'
class Store {
  constructor () {
    const isLe = (function () {
      const buf = new ArrayBuffer(2);
      (new DataView(buf)).setInt16(0, 256, true) // little-endian write
      return (new Int16Array(buf))[0] === 256 // platform-spec read, if equal then LE
    })()

    this.state = {
      isLe: isLe,
      _hasAudio: false,
      _hasVideo: false,
      _mediaInfo: new MediaInfo(),
      _metaData: null,
      _videoTrack: {type: 'video', id: 1, samples: [], length: 0},
      _audioTrack: {type: 'audio', id: 2, samples: [], length: 0},
      _videoMetaData: null,
      _audioMetaData: null,
      _audioInitialMetadataDispatched: false,
      _videoInitialMetadataDispatched: false,
      tags: [],
      timeStampBase: 0,
      hasVideoFlagOverrided: false,
      hasAudioFlagOverrided: false,
      timeScale: 1000,
      duration: 0,
      isLive: false,
      durationOverrided: false,
      naluLengthSize: 4,
      _referFrameRate: {
        fixed: true,
        fps: 23.976,
        fpsNum: 23976,
        fpsDen: 1000
      },
      metaEndPosition: -1
    }

    this.methods = {
      _isInitialMetadataDispatched: function () {
        const {
          _hasAudio,
          _hasVideo,
          _audioInitialMetadataDispatched,
          _videoInitialMetadataDispatched
        } = this.state
        if (_hasAudio && _hasVideo) { // both audio & video
          return _audioInitialMetadataDispatched && _videoInitialMetadataDispatched
        }
        if (_hasAudio && !_hasVideo) { // audio only
          return this._audioInitialMetadataDispatched
        }
        if (!_hasAudio && _hasVideo) { // video only
          return _videoInitialMetadataDispatched
        }
        return false
      }.bind(this)
    }
  }

  clearTags () {
    this.state.tags = []
  }
  get referFrameRate () {
    return this.state._referFrameRate
  }

  set referFrameRate (val) {
    this.state._referFrameRate = val
  }

  set mediaInfo (mediaInfo) {
    this.state._mediaInfo = mediaInfo
  }

  get mediaInfo () {
    return this.state._mediaInfo
  }

  get metaData () {
    return this.state._metaData
  }

  get hasMetaData () {
    return this.state._metaData !== null
  }

  set metaData (v) {
    this.state._metaData = v
  }

  set audioTrack (val) {
    this.state._audioTrack = val
  }

  get audioTrack () {
    return this.state._audioTrack
  }

  set videoTrack (val) {
    this.state._videoTrack = val
  }

  get videoTrack () {
    return this.state._videoTrack
  }

  set hasAudio (val) {
    this.state._hasAudio = val
    this.state._mediaInfo.hasAudio = val
  }

  get hasAudio () {
    return this.state._hasAudio
  }

  set hasVideo (val) {
    this.state._hasVideo = val
    this.state._mediaInfo.hasVideo = val
  }

  get hasVideo () {
    return this.state._hasVideo
  }

  set videoMetaData (val) {
    this.state._videoMetaData = val
  }

  get videoMetaData () {
    return this.state._videoMetaData
  }

  set audioMetaData (val) {
    this.state._audioMetaData = val
  }

  get audioMetaData () {
    return this.state._audioMetaData
  }

  get keyframes () {
    return this.state._mediaInfo.keyframes
  }
  get isSeekable () {
    return this.state._mediaInfo.hasKeyframes
  }

  get isLe () {
    return this.state.isLe
  }
  get hasInitialMetaDispatched () {
    const {
      _hasAudio,
      _hasVideo,
      _audioInitialMetadataDispatched,
      _videoInitialMetadataDispatched
    } = this.state
    if (_hasAudio && _hasVideo) {
      return _audioInitialMetadataDispatched && _videoInitialMetadataDispatched
    }
    if (_hasAudio && !_hasVideo) {
      return this._audioInitialMetadataDispatched
    }
    if (!_hasAudio && _hasVideo) {
      return _videoInitialMetadataDispatched
    }
    return false
  }

  get videoTimeScale () {
    return this.state.timeScale
  }

  get metaEndPosition () {
    return this.state.metaEndPosition
  }

  set metaEndPosition (pos) {
    this.state.metaEndPosition = pos
  }

  get isLive () {
    return this.state.isLive
  }

  set isLive (val) {
    this.state.isLive = val
  }
}

export default Store
