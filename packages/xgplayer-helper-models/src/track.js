export default class Track {
  constructor () {
    /** @type {number} */
    this.id = -1
    /** @type {number} */
    this.sequenceNumber = 0
    /** @type {*} */
    this.samples = []
    /** @type {*} */
    this.droppedSamples = []
    /** @type {number} */
    this.length = 0
  }

  reset () {
    this.sequenceNumber = 0
    this.samples = []
    this.length = 0
  }

  destroy () {
    this.reset()
    this.id = -1
  }
}

export class AudioTrack extends Track {
  constructor () {
    super()
    /** @type {string} */
    this.TAG = 'AudioTrack'
    /** @type {string} */
    this.type = 'audio'
  }
}

export class VideoTrack extends Track {
  constructor () {
    super()
    /** @type {string} */
    this.TAG = 'VideoTrack'
    /** @type {string} */
    this.type = 'video'
    /** @type {number} */
    this.dropped = 0
    /** @type {number} */
    this.sequenceNumber = 0
  }

  reset () {
    this.sequenceNumber = 0
    this.samples = []
    this.length = 0
    this.dropped = 0
  }
}

export class Tracks {
  constructor () {
    this.audioTrack = null
    this.videoTrack = null
  }

  destroy () {
    this.audioTrack = null
    this.videoTrack = null
  }
}
