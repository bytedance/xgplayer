import { Event } from '../constants'
import type { Hls } from '../index'
import type {
  MasterPlaylist,
  MediaPlaylist,
  MediaSegment
} from '../manifest-loader/parser/model'
import { clamp } from '../utils'
import { Stream } from './stream'

export class Playlist {
  readonly hls: Hls
  streams: Stream[] = []
  currentStream: Stream | null = null
  dvrWindow = 0
  private _segmentPointer = -1

  constructor(hls: Hls) {
    this.hls = hls
  }

  get lowLatency(): boolean | undefined {
    return this.currentStream?.lowLatency
  }

  get lastSegment(): MediaSegment | null | undefined {
    return this.currentStream?.lastSegment
  }

  get currentSegment(): MediaSegment | undefined {
    return this.currentSegments?.[this._segmentPointer]
  }

  get nextSegment(): MediaSegment | undefined {
    return this.currentSegments?.[this._segmentPointer + 1]
  }

  get currentSegments(): MediaSegment[] | undefined {
    return this.currentStream?.segments
  }

  get currentSubtitleEndSn(): number | undefined {
    return this.currentStream?.currentSubtitleEndSn
  }

  get liveEdge(): number | undefined {
    return this.currentStream?.liveEdge
  }

  set liveEdge(end: number) {
    if (this.currentStream) {
      this.currentStream.liveEdge = end
    }
  }

  get totalDuration(): number {
    return this.currentStream?.totalDuration || 0
  }

  get seekRange(): [number, number] | undefined {
    const segments = this.currentSegments
    if (!segments || !segments.length) return undefined
    return [segments[0].start, segments[segments.length - 1].end]
  }

  get nbSegments(): number {
    return this.currentSegments?.length || 0
  }

  get isEmpty(): boolean {
    return !this.currentSegments?.length
  }

  get isLive(): boolean | undefined {
    return this.currentStream?.live
  }

  get hadSegmentLoaded(): boolean {
    return this._segmentPointer !== -1
  }

  get hasSubtitle(): boolean {
    return !!this.currentStream?.currentSubtitleStream
  }

  getAudioSegment(seg: MediaSegment): MediaSegment | undefined {
    return this.currentStream?.getAudioSegment(seg)
  }

  moveSegmentPointer(pos?: number | null) {
    if (pos === null || pos === undefined) pos = this._segmentPointer + 1
    const segmentCount = this.currentSegments?.length
    if (segmentCount === undefined) return
    this._segmentPointer = clamp(pos, -1, segmentCount)
  }

  reset() {
    this.streams = []
    this.currentStream = null
    this.dvrWindow = 0
    this._segmentPointer = -1
  }

  getSegmentByIndex(index?: number): MediaSegment | undefined {
    if (index === undefined) return
    return this.currentSegments?.[index]
  }

  setNextSegmentByIndex(index = 0) {
    this._segmentPointer = index - 1
  }

  setNextSegmentBySN(sn: number | null = 0): number | undefined {
    const preIndex = this.currentSegments?.findIndex((x) => x.sn === sn)
    if (preIndex !== undefined && preIndex !== -1) {
      this.setNextSegmentByIndex(preIndex + 1)
    }
    return preIndex
  }

  findSegmentIndexByTime(time: number): number | undefined {
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

  upsertPlaylist(
    playlist: MasterPlaylist | MediaPlaylist | undefined,
    audioPlaylist?: MediaPlaylist,
    subtitlePlaylist?: MediaPlaylist
  ) {
    if (!playlist) return
    if ('isMaster' in playlist) {
      this.streams.length = playlist.streams.length
      playlist.streams
        .filter((x) => x.url)
        .forEach((stream, i) => {
          if (this.streams[i]) {
            this.streams[i].update(stream)
          } else {
            this.streams[i] = new Stream(stream)
          }
        })
      this.currentStream = this.streams[0] || null
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
        this.currentStream = this.streams[0] = new Stream(
          playlist,
          audioPlaylist,
          subtitlePlaylist
        )
      }
    }

    const currentStream = this.currentStream

    if (currentStream) {
      if (this.hls.isLive && !this.dvrWindow) {
        this.dvrWindow = currentStream.segments.reduce((a, c) => {
          a += c.duration
          return a
        }, 0)
      }
    }
  }

  updateSegmentsRanges(sn: number, start: number) {
    const segs = this.currentSegments?.filter((x) => x.sn >= sn)
    segs?.forEach((s) => {
      s.start = start
      start = s.end
    })
  }

  switchSubtitle(lang: string) {
    this.currentStream?.switchSubtitle(lang)
  }

  clearOldSegment(maxPlaylistSize = this.hls.config.maxPlaylistSize || 50) {
    const stream = this.currentStream
    if (!this.dvrWindow || !stream) return
    const startTime = stream.endTime - this.dvrWindow
    if (startTime <= 0) return
    const segments = stream.segments
    if (segments.length <= maxPlaylistSize) return

    this._segmentPointer = stream.clearOldSegment(startTime, this._segmentPointer)
  }

  checkSegmentTrackChange(cTime: number, nbSb: number): MediaSegment | undefined {
    const index = this.findSegmentIndexByTime(cTime)
    if (index === undefined) return
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

    if (next.hasAudio !== seg.hasAudio || next.hasVideo !== seg.hasVideo) return next
  }

  feedbackLiveEdge(segment: MediaSegment, bufferEnd: number) {
    const segs = this.currentSegments
    if (!segs) return
    const isLast = this.lastSegment?.sn === segment.sn
    if (isLast) {
      this.liveEdge = bufferEnd
      return
    }

    this.updateSegmentsRanges(segment.sn + 1, bufferEnd)
  }
}
