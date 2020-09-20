import Demuxer from './Demuxer'
import MetaDemuxer from './MetaDemuxer'
import VideoDemuxer from './VideoDemuxer'
import AudioDemuxer from './AudioDemuxer'
import Logger from '../../utils/Log'
import metaFields from '../../constants/metaFields'

const nativeHasProp = Object.prototype.hasOwnProperty

export default class Tagdemux extends Demuxer {
  constructor (store) {
    super(store)
    this.CLASS_NAME = this.constructor.name
    this._metaDemuxer = new MetaDemuxer(store)
    this._videoDemuxer = new VideoDemuxer(store)
    this._audioDemuxer = new AudioDemuxer(store)
    this._firstParse = true
    this._dataOffset = 0
    this.handleMediaInfoReady = () => {}
    this.handleDataReady = () => {}
    this.handleMetaDataReady = () => {}
  }
  setEventBind () {
    this._videoDemuxer.handleDataReady = this.handleDataReady
    this._videoDemuxer.handleMetaDataReady = this.handleMetaDataReady
    this._videoDemuxer.handleMediaInfoReady = this.handleMediaInfoReady
    this._audioDemuxer.handleDataReady = this.handleDataReady
    this._audioDemuxer.handleMetaDataReady = this.handleMetaDataReady
    this._audioDemuxer.handleMediaInfoReady = this.handleMediaInfoReady
  }
  destroy () {
    this._metaDemuxer = null
    this._videoDemuxer = null
    this._audioDemuxer = null
  }

  resolveTags () {
    const {tags} = this._store.state

    const {_store: store} = this
    const {videoTrack, audioTrack} = store

    tags.forEach((tag) => {
      this.resolveTag(tag)
    })

    if (this._store.hasInitialMetaDispatched) {
      if (videoTrack.length || audioTrack.length) {
        this.handleDataReady(audioTrack, videoTrack)
      }
    }

    this._store.state.tags = []
  }

  resolveTag (tag) {
    switch (String(tag.tagType)) {
      case '8': // audio
        this._resolveAudioTag(tag)
        break
      case '9': // video
        this._resolveVideoTag(tag)
        break
      case '18': // metadata
        this._resolveMetaTag(tag)
        break
    }
  }

  _resolveAudioTag (tag) {
    if (tag.bodySize <= 1) {
      this.warn('Not enough data for audio tag body')
    }
    this._audioDemuxer.resolve(tag)
  }

  _resolveVideoTag (tag) {
    if (tag.bodySize <= 1) {
      this.error('Not enough data for video tag body')
      return
    }
    const {_hasVideo, hasVideoFlagOverrided} = this
    if (hasVideoFlagOverrided && !_hasVideo) {
      return
    }

    this._videoDemuxer.resolve(tag)
  }

  _initMetaData (metaData) {
    const {_store: s} = this
    if (nativeHasProp.call(metaData, 'onMetaData')) {
      if (s.hasMetaData) {
        Logger.log(`[${this.CLASS_NAME}]`, 'found another meta tag')
      }
      s.metaData = metaData
      const onMetaData = metaData.onMetaData

      metaFields.forEach(field => {
        const {name, type, parser, onTypeErr} = field
        if (Object(onMetaData[name]) instanceof type) {
          parser.call(this, s, onMetaData)
        } else {
          if (onTypeErr && onTypeErr instanceof Function) {
            onTypeErr(s, onMetaData)
          }
        }
      })

      this._store.mediaInfo._metaData = metaData
      // 同步到共享store
      if (this._store.mediaInfo.isComplete) {
        this.handleMediaInfoReady(this._store.mediaInfo)
      }
    }
  }

  _resolveMetaTag (tag) {
    const {body} = tag
    const metaObj = this._metaDemuxer.resolve(body, body.length)
    this._initMetaData(metaObj)
  }

  _parseKeyframes (keyframes) {
    let times = []
    let filePositions = []
    const {videoTimeScale, state} = this._store
    for (let i = 1; i < keyframes.times.length; i++) {
      times[times.length] = state.timeStampBase + Math.floor(keyframes.times[i] * videoTimeScale)
      filePositions[filePositions.length] = keyframes.filepositions[i]
    }

    return {
      times,
      filePositions
    }
  }
}
