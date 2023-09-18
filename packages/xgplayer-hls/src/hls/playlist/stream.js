import { Logger } from 'xgplayer-streaming-shared'

const logger = new Logger('playlist')

export class Stream {
  live = undefined
  id = 0
  bitrate = 0
  width = 0
  height = 0
  name = ''
  url = ''
  audioCodec = ''
  videoCodec = ''
  textCodec = ''

  startCC = 0
  endCC = 0
  startSN = 0
  endSN = -1
  totalDuration = 0
  targetDuration = 0

  partTargetDuration = 0
  canSkipUntil = 0
  canSkipDateRanges = false
  skippedSegments = 0
  canBlockReload = false
  partHoldBack = 0
  lowLatency = false
  endPartIndex = 0

  snDiff = null // number

  segments = []

  /** @type {import('../../parser/model').AudioStream[]} */
  audioStreams = []

  /** @type {import('../../parser/model').SubTitleStream[]} */
  subtitleStreams = []

  /** @type {import('../../parser/model').ClosedCaptionsStream[]} */
  closedCaptions = []

  /** @type {import('../../parser/model').AudioStream | null} */
  currentAudioStream = null

  /** @type {import('../../parser/model').subtitleStreams | null} */
  currentSubtitleStream = null

  /**
   * asdasd {@link AudioStream}
   */
  get lastSegment () {
    if (this.segments.length) {
      return this.segments[this.segments.length - 1]
    }
    return null
  }

  get segmentDuration () {
    return this.targetDuration || this.segments[0]?.duration || 0
  }

  get liveEdge () {
    return this.endTime
  }

  get endTime () {
    return this.lastSegment?.end || 0
  }

  get currentSubtitleEndSn () {
    return this.currentSubtitleStream?.endSN || 0
  }

  constructor (playlist, audioPlaylist, subtitlePlaylist) {
    this.update(this._setLLPlaybackPoint(playlist), audioPlaylist, subtitlePlaylist)
  }

  clearOldSegment (startTime, pointer) {
    if (this.currentAudioStream) {
      this._clearSegments(startTime, pointer)
    }

    return this._clearSegments(startTime, pointer)
  }

  getAudioSegment (seg) {
    if (!seg || !this.currentAudioStream) return
    const sn = seg.sn - this.snDiff
    return this.currentAudioStream.segments.find(x => x.sn === sn)
  }

  update (playlist, audioPlaylist) {
    this.url = playlist.url
    if (Array.isArray(playlist.segments)) { // media
      if (this.live === null || this.live === undefined) this.live = playlist.live
      this._updateSegments(playlist, this)

      this.startCC = playlist.startCC
      this.endCC = playlist.endCC
      this.startSN = playlist.startSN
      this.endSN = playlist.endSN || -1
      this.totalDuration = playlist.totalDuration
      this.targetDuration = playlist.targetDuration
      this.live = playlist.live

      this.lowLatency = playlist.lowLatency
      this.canBlockReload = playlist.canBlockReload
      this.canSkipDateRanges = playlist.canSkipDateRanges
      this.canSkipUntil = playlist.canSkipUntil
      this.partHoldBack = playlist.partHoldBack
      this.partTargetDuration = playlist.partTargetDuration
      this.skippedSegments = playlist.skippedSegments
      this.endPartIndex = playlist.endPartIndex

      if (audioPlaylist && this.currentAudioStream && Array.isArray(audioPlaylist.segments)) {
        this._updateSegments(audioPlaylist, this.currentAudioStream)
        if ((this.snDiff === null || this.snDiff === undefined) && playlist.segments.length && audioPlaylist.segments.length) {
          this.snDiff = playlist.segments[0].sn - audioPlaylist.segments[0].sn
        }
      }

    } else { // master stream
      this.id = playlist.id
      this.bitrate = playlist.bitrate
      this.width = playlist.width
      this.height = playlist.height
      this.name = playlist.name
      this.audioCodec = playlist.audioCodec
      this.videoCodec = playlist.videoCodec
      this.textCodec = playlist.textCodec
      this.audioStreams = playlist.audioStreams
      this.subtitleStreams = playlist.subtitleStreams
      if (!this.currentAudioStream && this.audioStreams.length) {
        this.currentAudioStream = this.audioStreams.find(x => x.default) || this.audioStreams[0]
      }

      if (!this.currentSubtitleStream && this.subtitleStreams.length) {
        this.currentSubtitleStream = this.subtitleStreams.find(x => x.default) || this.subtitleStreams[0]
      }
    }
  }

  updateSubtitle (subtitlePlaylist) {
    if (!(subtitlePlaylist && this.currentSubtitleStream && Array.isArray(subtitlePlaylist.segments))) return

    const newSegs = this._updateSegments(subtitlePlaylist, this.currentSubtitleStream)
    const segs = this.currentSubtitleStream.segments
    if (segs.length > 100 ) {
      this.currentSubtitleStream.segments = segs.slice(100)
    }

    if (!newSegs) return

    return newSegs.map(x => {
      return {
        sn: x.sn,
        url: x.url,
        duration: x.duration,
        start: x.start,
        end: x.end,
        lang: this.currentSubtitleStream.lang
      }
    })
  }


  switchSubtitle (lang) {
    const toSwitch = this.subtitleStreams.find(x => x.lang === lang)
    const origin = this.currentSubtitleStream
    if (toSwitch) {
      this.currentSubtitleStream = toSwitch
      origin.segments = []
    }
  }

  _setLLPlaybackPoint (playlist) {
    if (!playlist.lowLatency || !playlist.segments.length) return playlist

    const maxStartPoint = playlist.totalDuration - playlist.partHoldBack
    const segs = playlist.segments
    let index = 0

    for (let i = 0, l = segs.length; i < l; i++) {
      if (segs[i].start <= maxStartPoint && segs[i].independent) {
        index = i
      }
    }

    const usefulSegs = segs.slice(index)
    let endTime = 0

    usefulSegs.forEach(s => {
      s.start = endTime
      endTime = s.end
    })

    playlist.segments = usefulSegs
    playlist.totalDuration = endTime
    playlist.startSN = usefulSegs[0].sn
    playlist.startCC = usefulSegs[0].cc

    logger.log(`set ll-hls playback point: SN=${playlist.startSN} partIndex=${usefulSegs[0].partIndex}, duration=${endTime}`)

    return playlist

  }

  _clearSegments (startTime, pointer) {
    let sliceStart = 0
    const segments = this.segments
    for (let i = 0, l = segments.length; i < l; i++) {
      if (segments[i].end >= startTime) {
        sliceStart = i
        break
      }
    }

    if (sliceStart > pointer) {
      sliceStart = pointer
    }

    if (sliceStart) {
      this.segments = this.segments.slice(sliceStart)
      if (this.currentAudioStream) {
        this.currentAudioStream.segments = this.currentAudioStream.segments.slice(sliceStart)
      }
    }

    return pointer - sliceStart
  }

  _updateSegments (playlist, segObj) {
    const segments = segObj.segments
    if (this.live) {
      const lowLatency = playlist.lowLatency
      const endSeg = segments[segments.length - 1]
      const endSN = endSeg?.sn || -1
      const endPartIndex = endSeg?.partIndex || 0

      let hasNew = endSN < playlist.endSN && playlist.segments.length

      if (lowLatency) {
        hasNew = hasNew || endPartIndex < playlist.endPartIndex
      }

      if (hasNew) {
        logger.log(`update segments: endSN:${endSN}, partIndex:${endPartIndex} --> endSN:${playlist.endSN}, partIndex:${playlist.endPartIndex}`)
        const index = playlist.segments.findIndex(x => x.sn === endSN && x.partIndex === endPartIndex)
        const toAppend = index < 0 ? playlist.segments : playlist.segments.slice(index + 1)

        if (segments.length && toAppend.length) {
          let endTime = endSeg.end
          const endTimeBeforeAppend = endTime
          toAppend.forEach(seg => {
            seg.start = endTime
            endTime = seg.end
          })

          logger.log(`liveEdge: ${endTimeBeforeAppend} -> ${endTime}`)

          const lastCC = endSeg?.cc || -1
          if (lastCC > toAppend[0].cc) {
            toAppend.forEach(seg => (seg.cc += lastCC))
          }
        }
        segObj.endSN = playlist.endSN
        segObj.segments = segments.concat(toAppend)

        return toAppend
      }
    } else {
      segObj.segments = playlist.segments
    }
  }

}
