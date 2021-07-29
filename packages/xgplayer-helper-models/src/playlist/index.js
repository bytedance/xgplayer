import { Level } from './level'

export * from './model'
export { Level }

export class Playlist {
  _levels = []
  _currentLevelIndex = 0
  _currentSegmentIndex = -1
  _keyMap = Object.create(null) // { url: Unit8Array }

  get currentLevel () {
    return this._levels[this._currentLevelIndex]
  }

  get currentSegments () {
    if (this.currentLevel) return this.currentLevel.segments
  }

  get currentSegment () {
    const segments = this.currentSegments
    if (segments) return segments[this._currentSegmentIndex]
  }

  get lastSegment () {
    const segments = this.currentSegments
    if (segments) return segments[segments.length - 1]
  }

  backwardSegment () {
    const segments = this.currentSegments
    if (segments && this._currentSegmentIndex > 0) {
      return segments[--this._currentSegmentIndex]
    }
  }

  forwardSegment () {
    const segments = this.currentSegments
    if (segments && this._currentSegmentIndex < (segments.length - 1)) {
      return segments[++this._currentSegmentIndex]
    }
  }

  clearOldSegments () {
    const level = this.currentLevel
    if (level) {
      level.segments = level.segments.slice(this._currentSegmentIndex)
      this._currentSegmentIndex = 0
    }
  }

  reset () {
    this._level = []
    this._keyMap = Object.create(null)
    this._currentLevelIndex = 0
    this._currentSegmentIndex = -1
  }

  getKey (keyUrl) {
    if (keyUrl) return this._keyMap[keyUrl]
    return Object.values(this._keyMap)[0]
  }

  setKey (keyUrl, key) {
    this._keyMap[keyUrl] = key
  }

  findSegmentByTime (time) {
    const segments = this.currentSegments
    if (segments) {
      for (let i = 0, l = segments.length, seg; i < l; i++) {
        seg = segments[i]
        if (time >= seg.start && time < seg.end) {
          return seg
        }
      }
    }
  }

  upsertPlaylist (playlist) {
    if (!playlist) return
    if (Array.isArray(playlist.streams)) {
      this._levels.length = playlist.streams.length
      playlist.streams.sort((a, b) => (a.bitrate - b.bitrate))
      playlist.streams.filter(x => x.url).forEach((stream, i) => {
        if (this._levels[i]) {
          this._levels[i].update(stream)
        } else {
          this._levels[i] = new Level(stream, i)
        }
      })
    } else if (Array.isArray(playlist.segments)) {
      const level = this.currentLevel
      if (level) {
        level.update(playlist)
      } else {
        this.reset()
        this._levels[0] = new Level(playlist, 0)
      }
    }
  }
}
