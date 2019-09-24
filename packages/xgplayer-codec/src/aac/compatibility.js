import {  }

class Compatibility {
  constructor () {
    this.nextPts = 0
  }

  init () {
    this.before()
  }

  get track () {
    const tracks = this._context.getInstance('TRACKS')
    if (!tracks || !tracks.audioTrack) {
      return null
    }

    return tracks.audioTrack
  }
}
