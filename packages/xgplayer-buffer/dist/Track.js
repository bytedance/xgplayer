"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Track {
  /**
   * The constructor.
   */
  constructor() {
    this.id = -1;
    this.sequenceNumber = 0;
    this.samples = [];
    this.droppedSamples = [];
    this.length = 0;
  }
  /**
   * Reset the track.
   */


  reset() {
    this.sequenceNumber = 0;
    this.samples = [];
    this.length = 0;
  }
  /**
   * destroy the track.
   */


  distroy() {
    this.reset();
    this.id = -1;
  }

}

exports.default = Track;

class AudioTrack extends Track {
  /**
   * The constructor for audio track.
   */
  constructor() {
    super();
    this.TAG = 'AudioTrack';
    this.type = 'audio';
  }

}

exports.AudioTrack = AudioTrack;

class VideoTrack extends Track {
  /**
   * The constructor for video track.
   */
  constructor() {
    super();
    this.TAG = 'VideoTrack';
    this.type = 'video';
    this.dropped = 0;
  }
  /**
   * reset the video track.
   */


  reset() {
    this.sequenceNumber = 0;
    this.samples = [];
    this.length = 0;
    this.dropped = 0;
  }

}

exports.VideoTrack = VideoTrack;

class Tracks {
  constructor() {
    this.audioTrack = null;
    this.videoTrack = null;
  }

  destroy() {
    this.audioTrack = null;
    this.videoTrack = null;
  }

}

exports.Tracks = Tracks;