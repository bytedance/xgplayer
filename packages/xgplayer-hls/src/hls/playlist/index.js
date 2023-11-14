import { clamp } from '../utils'
import { Stream } from './stream'
import { Event } from '../constants'

export class Playlist {
  /** @type {import('./stream').Stream[]} */
  streams = []

  /** @type {import('./stream').Stream} */
  currentStream = null

  dvrWindow = 0

  _segmentPointer = -1

  constructor (hls) {
    this.hls = hls
  }

  get lowLatency () {
    return this.currentStream?.lowLatency
  }

  get lastSegment () {
    return this.currentStream?.lastSegment
  }

  get currentSegment () {
    return this.currentSegments?.[this._segmentPointer]
  }

  get nextSegment () {
    return this.currentSegments?.[this._segmentPointer + 1]
  }

  get currentSegments () {
    return this.currentStream?.segments
  }

  get currentSubtitleEndSn () {
    return this.currentStream?.currentSubtitleEndSn
  }

  get liveEdge () {
    return this.currentStream?.liveEdge
  }

  get totalDuration () {
    return this.currentStream?.totalDuration || 0
  }

  get seekRange () {
    const segments = this.currentSegments
    if (!segments || !segments.length) return
    return [
      segments[0].start,
      segments[segments.length - 1].end
    ]
  }

  get nbSegments () {
    return this.currentSegments?.length || 0
  }

  get isEmpty () {
    return !this.currentSegments?.length
  }

  get isLive () {
    return this.currentStream?.live
  }

  get hadSegmentLoaded () {
    return this._segmentPointer !== -1
  }

  get hasSubtitle () {
    return !!this.currentStream?.currentSubtitleStream
  }

  getAudioSegment (seg) {
    return this.currentStream?.getAudioSegment(seg)
  }

  moveSegmentPointer (pos) {
    if (pos === null || pos === undefined) pos = this._segmentPointer + 1
    this._segmentPointer = clamp(pos, -1, this.currentSegments?.length)
  }

  reset () {
    this.streams = []
    this.currentStream = null
    this.dvrWindow = 0
    this._segmentPointer = -1
  }

  getSegmentByIndex (index) {
    return this.currentSegments?.[index]
  }

  setNextSegmentByIndex (index = 0) {
    this._segmentPointer = index - 1
  }

  findSegmentIndexByTime (time) {
    const segments = this.currentSegments
    if (segments) {
      for (let i = 0, l = segments.length, seg; i < l; i++) {
        seg = segments[i]
        if (time >= seg.start && time < seg.end) {
          return i
        }
      }

      const lastSegment = segments[segments.length - 1]
      if (Math.abs(time - lastSegment?.end) < 0.2) return segments.length - 1
    }
  }

  upsertPlaylist (playlist, audioPlaylist, subtitlePlaylist) {
    if (!playlist) return
    if (playlist.isMaster) {
      this.streams.length = playlist.streams.length
      playlist.streams.filter(x => x.url).forEach((stream, i) => {
        if (this.streams[i]) {
          this.streams[i].update(stream)
        } else {
          this.streams[i] = new Stream(stream)
        }
      })
      this.currentStream = this.streams[0]
      // update media
    } else if (Array.isArray(playlist.segments)) {
      const stream = this.currentStream
      if (stream) {
        stream.update(playlist, audioPlaylist, subtitlePlaylist)
        const newSubtitleSegs = stream.updateSubtitle(subtitlePlaylist)
        if (newSubtitleSegs) {
          this.hls.emit(Event.SUBTITLE_SEGMENTS, {
            list: newSubtitleSegs
          })
        }
      } else {
        this.reset()
        this.currentStream = this.streams[0] = new Stream(playlist, audioPlaylist, subtitlePlaylist)
      }
    }

    const currentStream = this.currentStream

    if (currentStream) {
      if (this.hls.isLive && !this.dvrWindow) {
        this.dvrWindow = this.currentSegments.reduce((a, c) => {
          a += c.duration
          return a
        }, 0)
      }
    }
  }

  switchSubtitle (lang) {
    this.currentStream?.switchSubtitle(lang)
  }

  clearOldSegment (maxPlaylistSize = 50) {
    const stream = this.currentStream
    if (!this.dvrWindow || !stream) return
    const startTime = stream.endTime - this.dvrWindow
    if (startTime <= 0) return
    const segments = stream.segments
    if (segments.length <= maxPlaylistSize) return

    this._segmentPointer = stream.clearOldSegment(startTime, this._segmentPointer)
  }

  checkSegmentTrackChange (cTime, nbSb) {
    const index = this.findSegmentIndexByTime(cTime)
    const seg = this.getSegmentByIndex(index)

    if (!seg) return

    if (!seg.hasAudio && !seg.hasVideo) return

    // when seek
    if (nbSb !== 2 && seg.hasAudio && seg.hasVideo) return seg

    // continuous play
    if (seg.end - cTime > 0.3) return

    const next = this.getSegmentByIndex(index + 1)

    if (!next) return

    if (!next.hasAudio && !next.hasVideo) return

    if ((next.hasAudio !== seg.hasAudio || next.hasVideo !== seg.hasVideo)) return next

  }

}
