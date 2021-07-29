import { EVENTS } from 'xgplayer-helper-utils'
import Remuxer from './remuxer'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS

export default class Mp4Remuxer {
  constructor (curTime = 0) {
    this.TAG = 'Mp4Remuxer'
    if (!this.remuxer) {
      this._initRemuxer()
    }
  }

  init () {
    this.on(REMUX_EVENTS.REMUX_MEDIA, this._remux.bind(this))
    this.on(REMUX_EVENTS.REMUX_METADATA, this._onMetaDataReady.bind(this))
  }

  setStreamProtocol (protocol) {
    this.remuxer.setStreamProtocol(protocol)
  }

  _initRemuxer () {
    this.remuxer = new Remuxer({
      audioMeta: null,
      videoMeta: null
    })
    this.remuxer.on(Remuxer.EVENTS.MEDIA_SEGMENT, this._writeToSource.bind(this))
    this.remuxer.on(Remuxer.EVENTS.TRACK_REMUXED, this._onTrackRemuxed.bind(this))
  }

  _remux () {
    if (!this.remuxer.videoMeta) {
      this.remuxer.videoMeta = this.videoMeta
      this.remuxer.audioMeta = this.audioMeta
    }

    const {audioTrack, videoTrack} = this._context.getInstance('TRACKS')
    return this.remuxer.remux(audioTrack, videoTrack)
  }

  _onMetaDataReady (type) {
    if (!this.remuxer) {
      this._initRemuxer()
    }
    let track

    if (type === 'audio') {
      const {audioTrack} = this._context.getInstance('TRACKS')
      track = audioTrack
    } else {
      const {videoTrack} = this._context.getInstance('TRACKS')
      track = videoTrack
    }

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER')
    let source = presourcebuffer.getSource(type)
    if (!source) {
      source = presourcebuffer.createSource(type)
    }

    source.mimetype = track.meta.codec
    source.init = this.remuxer.remuxInitSegment(type, track.meta)

    this.emit(REMUX_EVENTS.INIT_SEGMENT, type)
  }

  _onTrackRemuxed (track) {
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, track)
  }

  _writeToSource (type, buffer, bufferDuration) {
    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER')
    let source = presourcebuffer.getSource(type)
    if (!source) {
      source = presourcebuffer.createSource(type)
    }
    source.data.push(buffer)
    if (bufferDuration) {
      source.bufferDuration = bufferDuration + (source.bufferDuration || 0)
    }
  }

  get videoMeta () {
    let track = this._context.getInstance('TRACKS').videoTrack
    return track ? track.meta : null
  }

  get audioMeta () {
    let track = this._context.getInstance('TRACKS').audioTrack
    return track ? track.meta : null
  }

  destroy () {
    if (this.remuxer) {
      this.remuxer.destroy()
    }
    this.remuxer = null
  }
}
