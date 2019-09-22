export default class Track {
  /**
   * The constructor.
   */
  constructor () {
    this.id = -1
    this.sequenceNumber = 0
    this.samples = []
    this.length = 0
  }

  /**
   * Reset the track.
   */
  reset () {
    this.sequenceNumber = 0
    this.samples = []
    this.length = 0
  }
  /**
   * destroy the track.
   */
  distroy () {
    this.reset()
    this.id = -1
  }
}

export class Tracks {
  constructor () {
    this.audioTrack = null
    this.videoTrack = null
  }
}
