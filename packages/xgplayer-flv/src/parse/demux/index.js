import { LOADER_EVENTS, DEMUX_EVENTS } from '../../../../xgplayer-utils/src/constants/events'
import AMFParser from './AMFParser'
import SPSParser from '../../../../xgplayer-utils/src/h264/SPSParser'
import { AudioTrackMeta, VideoTrackMeta } from '../../../../xgplayer-utils/src/models/trackMeta'
import {VideoTrack, AudioTrack} from '../../../../xgplayer-buffer/src'

class FlvDemuxer {
  constructor () {
    this._firstFragmentLoaded = false
    this._trackNum = 0
    this._hasScript = false
  }

  init () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this))
  }

  /**
   * if the flv head is valid
   * @param data
   * @returns {boolean}
   */
  static isFlvFile (data) {
    return !(data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01)
  }

  /**
   * If the stream has audio or video.
   * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
   */
  static getPlayType (streamFlag) {
    const result = {
      hasVideo: false,
      hasAudio: false
    }

    if (streamFlag & 0x01 > 0) {
      result.hasVideo = true
    }

    if (streamFlag & 0x04 > 0) {
      result.hasAudio = true
    }

    return result
  }

  handleDataLoaded () {
    this.parseFlvStream()
  }

  parseFlvStream () {
    if (!this._firstFragmentLoaded) {
      if (this.loaderBuffer.length < 13) {
        return
      }
      const header = this.loaderBuffer.shift(13)
      this.parseFlvHeader(header)
      this.parseFlvStream() // 递归调用，继续解析flv流
    } else {
      if (this.loaderBuffer.length < 11) {
        return
      }
      if (this._parseFlvTag()) {
        this.parseFlvStream() // 递归调用，继续解析flv流
      }
    }
  }

  parseFlvHeader (header) {
    if (!FlvDemuxer.isFlvFile(header)) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('invalid flv file'))
      this.parseFlvStream()
    } else {
      this._firstFragmentLoaded = true
      const playType = FlvDemuxer.getPlayType(header[4])

      if (playType.hasVideo) {
        this.initVideoTrack()
      }

      if (playType.hasAudio) {
        this.initAudioTrack()
      }
    }
    this.handleDataLoaded()
  }

  /**
   * init default video track configs
   */
  initVideoTrack () {
    this._trackNum++
    let videoTrack = new VideoTrack()
    videoTrack.meta = new VideoTrackMeta()
    videoTrack.id = videoTrack.meta.id = this._trackNum

    this.tracks.videoTrack = videoTrack
  }

  /**
   * init default audio track configs
   */
  initAudioTrack () {
    this._trackNum++
    let audioTrack = new AudioTrack()
    audioTrack.meta = new AudioTrackMeta()
    audioTrack.id = audioTrack.meta.id = this._trackNum

    this.tracks.audioTrack = audioTrack
  }

  /**
   * Package the data as the following data structure
   * {
   *    data: Uint8Array. the Stream data.
   *    info: The first byte info of the Tag.
   *    tagType: 8、9、18
   *    timeStamp: the timestemp
   * }
   */
  _parseFlvTag () {
    if (this.loaderBuffer.length < 11) {
      return null
    }
    let chunk = this._parseFlvTagHeader()
    if (chunk) {
      this._processChunk(chunk)
    }
    return chunk
  }

  /**
   * Parse the 11 byte tag Header
   */
  _parseFlvTagHeader () {
    let offset = 0
    let chunk = {}

    let tagType = this.loaderBuffer.toInt(offset, 1)
    offset += 1

    // 2 bit FMS reserved, 1 bit filtered, 5 bit tag type
    chunk.filtered = (tagType & 32) >>> 5
    chunk.tagType = tagType & 31

    // 3 Byte datasize
    chunk.datasize = this.loaderBuffer.toInt(offset, 3)
    offset += 3

    if ((chunk.tagType !== 8 && chunk.tagType !== 9 && chunk.tagType !== 11 && chunk.tagType !== 18) ||
      this.loaderBuffer.toInt(8, 3) !== 0) {
      if (this.loaderBuffer && this.loaderBuffer.length > 0) {
        this.loaderBuffer.shift(1)
      }
      this.logger.warn(this.TAG, 'tagType ' + chunk.tagType)
      return null
    }

    if (this.loaderBuffer.length < chunk.datasize + 15) {
      return null
    }

    // read the data.
    this.loaderBuffer.shift(4)

    // 3 Byte timestamp
    let timestamp = this.loaderBuffer.toInt(0, 3)
    this.loaderBuffer.shift(3)

    // 1 Byte timestampExt
    let timestampExt = this.loaderBuffer.shift(1)[0]
    if (timestampExt > 0) {
      timestamp += timestampExt * 0x1000000
    }

    chunk.dts = timestamp

    // streamId
    this.loaderBuffer.shift(3)
    return chunk
  }

  _processChunk (chunk) {
    switch (chunk.tagType) {
      case 18:
        this._parseScriptData(chunk)
        break
      case 8:
        this._parseAACData(chunk)
        break
      case 9:
        this._parseHevcData(chunk)
        break
      case 11:
        // for some CDN that did not process the currect RTMP messages
        this.loaderBuffer.shift(3)
        break
      default:
        this.loaderBuffer.shift(1)
    }
  }

  /**
   * parse flv script data
   * @param chunk
   * @private
   */
  _parseScriptData (chunk) {
    let audioTrack = this.tracks.audioTrack
    let videoTrack = this.tracks.videoTrack

    let data = this.loaderBuffer.shift(chunk.datasize)

    const info = new AMFParser().resolve(data, data.length)

    const onMetaData = this._context.onMetaData = info ? info.onMetaData : undefined

    // fill mediaInfo
    this._context.mediaInfo.duration = onMetaData.duration
    this._context.mediaInfo.hasVideo = onMetaData.hasVideo
    this._context.mediaInfo.hsaAudio = onMetaData.hasAudio

    let validate = this._datasizeValidator(chunk.datasize)
    if (validate) {
      this.emit(DEMUX_EVENTS.MEDIA_INFO)
      this._hasScript = true
    }

    // Edit default meta.
    if (audioTrack && !audioTrack.hasSpecificConfig) {
      let meta = audioTrack.meta
      if (onMetaData.audiosamplerate) {
        meta.sampleRate = onMetaData.audiosamplerate
      }

      if (onMetaData.audiochannels) {
        meta.channelCount = onMetaData.audiochannels
      }

      switch (onMetaData.audiosamplerate) {
        case 44100:
          meta.sampleRateIndex = 4
          break
        case 22050:
          meta.sampleRateIndex = 7
          break
        case 11025:
          meta.sampleRateIndex = 10
          break
      }
    }
    if (videoTrack && !videoTrack.hasSpecificConfig) {
      let meta = videoTrack.meta
      if (typeof onMetaData.framerate === 'number') {
        let fpsNum = Math.floor(onMetaData.framerate * 1000)
        if (fpsNum > 0) {
          let fps = fpsNum / 1000
          if (!meta.frameRate) {
            meta.frameRate = {}
          }
          meta.frameRate.fixed = true
          meta.frameRate.fps = fps
          meta.frameRate.fps_num = fpsNum
          meta.frameRate.fps_den = 1000
        }
      }
    }
  }

  _aacSequenceHeaderParser (data) {
    let ret = {}
    ret.hasSpecificConfig = true
    ret.objectType = data[1] >>> 3
    ret.sampleRateIndex = ((data[1] & 7) << 1) | (data[2] >>> 7)
    ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex)
    ret.channelCount = (data[2] & 120) >>> 3
    ret.frameLength = (data[2] & 4) >>> 2
    ret.dependsOnCoreCoder = (data[2] & 2) >>> 1
    ret.extensionFlagIndex = data[2] & 1

    ret.codec = `mp4a.40.${ret.objectType}`
    return ret
  }

  _parseAACData (chunk) {
    let track = this.tracks.audioTrack
    if (!track) {
      return
    }

    let meta = track.meta

    if (!meta) {
      meta = new AudioTrackMeta()
    }

    let info = this.loaderBuffer.shift(1)[0]

    chunk.data = this.loaderBuffer.shift(chunk.datasize - 1)

    let format = (info & 240) >>> 4

    track.format = format

    if (format !== 10) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error(`invalid audio format: ${format}`))
    }

    if (format === 10 && !this._hasAudioSequence) {
      meta.sampleRate = this._switchAudioSamplingFrequency(info)
      meta.sampleRateIndex = (info & 12) >>> 2
      meta.frameLenth = (info & 2) >>> 1
      meta.channelCount = info & 1
      meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale)
    }

    let audioSampleRate = meta.audioSampleRate
    let audioSampleRateIndex = meta.sampleRateIndex
    let refSampleDuration = meta.refSampleDuration

    delete chunk.tagType
    let validate = this._datasizeValidator(chunk.datasize)

    if (chunk.data[0] === 0) { // AAC Sequence Header
      let aacHeader = this._aacSequenceHeaderParser(chunk.data)
      audioSampleRate = aacHeader.audiosamplerate || meta.audioSampleRate
      audioSampleRateIndex = aacHeader.sampleRateIndex || meta.sampleRateIndex
      refSampleDuration = Math.floor(1024 / audioSampleRate * meta.timescale)

      meta.channelCount = aacHeader.channelCount
      meta.sampleRate = audioSampleRate
      meta.sampleRateIndex = audioSampleRateIndex
      meta.refSampleDuration = refSampleDuration
      meta.duration = this._context.mediaInfo.duration * meta.timescale

      const audioMedia = this._context.mediaInfo.audio

      // fill audio media info
      audioMedia.codec = aacHeader.codec
      audioMedia.channelCount = aacHeader.channelCount
      audioMedia.sampleRate = audioSampleRate
      audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex

      if (this._hasScript && !this._hasAudioSequence && (!this.tracks.videoTrack || this._hasVideoSequence)) {
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
      } else if (this._hasScript && this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE)
      }
      ;
      this._hasAudioSequence = true
    } else {
      chunk.data = chunk.data.slice(1, chunk.data.length)
      track.samples.push(chunk)
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
    }

    if (!validate) {
      this.logger.warn(this.TAG, 'TAG length error at ' + chunk.datasize)
    }
  }

  /**
   * parse hevc/avc video data
   * @param chunk
   * @private
   */
  _parseHevcData (chunk) {
    // header
    let info = this.loaderBuffer.shift(1)[0]
    chunk.frameType = (info & 0xf0) >>> 4
    chunk.isKeyframe = chunk.frameType === 5
    // let tempCodecID = this.tracks.videoTrack.codecID
    let codecID = info & 0x0f
    this.tracks.videoTrack.codecID = codecID

    // hevc和avc的header解析方式一样
    chunk.avcPacketType = this.loaderBuffer.shift(1)[0]
    chunk.cts = this.loaderBuffer.toInt(0, 3)
    this.loaderBuffer.shift(3)

    // 12 for hevc, 7 for avc
    if (codecID === 12) {
      const data = this.loaderBuffer.shift(chunk.datasize - 5)
      chunk.data = data

      if (Number.parseInt(chunk.avcPacketType) !== 0) {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`)
        }
        let nalu = {}
        let r = 0
        nalu.cts = chunk.cts
        nalu.dts = chunk.dts
        while (chunk.data.length > r) {
          let sizes = chunk.data.slice(Number.parseInt(r), 4 + r)
          nalu.size = sizes[3]
          nalu.size += sizes[2] * 256
          nalu.size += sizes[1] * 256 * 256
          nalu.size += sizes[0] * 256 * 256 * 256
          r += 4
          nalu.data = chunk.data.slice(Number.parseInt(r), nalu.size + r)
          r += nalu.size
          this.tracks.videoTrack.samples.push(nalu)
          this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
        }
      } else if (Number.parseInt(chunk.avcPacketType) === 0) {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`)
        } else {
          this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
        }
      }
    } else if (codecID === 7) {
      let data = this.loaderBuffer.shift(chunk.datasize - 5)
      if (data[4] === 0 && data[5] === 0 && data[6] === 0 && data[7] === 1) {
        let avcclength = 0
        for (let i = 0; i < 4; i++) {
          avcclength = avcclength * 256 + data[i]
        }
        avcclength -= 4
        data = data.slice(4, data.length)
        data[3] = avcclength % 256
        avcclength = (avcclength - data[3]) / 256
        data[2] = avcclength % 256
        avcclength = (avcclength - data[2]) / 256
        data[1] = avcclength % 256
        data[0] = (avcclength - data[1]) / 256
      }

      chunk.data = data
      // If it is AVC sequece Header.
      if (chunk.avcPacketType === 0) {
        this._avcSequenceHeaderParser(chunk.data)
        let validate = this._datasizeValidator(chunk.datasize)
        if (validate) {
          if (this._hasScript && !this._hasVideoSequence) {
            this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
          } else if (this._hasScript && this._hasVideoSequence) {
            this.emit(DEMUX_EVENTS.VIDEO_METADATA_CHANGE)
          }
          this._hasVideoSequence = true
        }
      } else {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`)
        }
        this.tracks.videoTrack.samples.push(chunk)
        this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
      }
    } else {
      this.logger.warn(this.TAG, `video codeid is ${codecID}`)
      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1)
      if (!this._datasizeValidator(chunk.datasize)) {
        this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`)
      }
      this.tracks.videoTrack.samples.push(chunk)
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
    }
    delete chunk.tagType
  }

  /**
   * parse avc metadata
   * @param data
   * @private
   */
  _avcSequenceHeaderParser (data) {
    let track = this.tracks.videoTrack

    if (!track) {
      return
    }

    let offset = 0

    if (!track.meta) {
      track.meta = new VideoTrackMeta()
    }
    let meta = track.meta

    meta.configurationVersion = data[0]
    meta.avcProfileIndication = data[1]
    meta.profileCompatibility = data[2]
    meta.avcLevelIndication = data[3] / 10
    meta.nalUnitLength = (data[4] & 0x03) + 1

    let numOfSps = data[5] & 0x1f
    offset = 6
    let config = {}

    // parse SPS
    for (let i = 0; i < numOfSps; i++) {
      let size = data[offset] * 255 + data[offset + 1]
      offset += 2

      let sps = new Uint8Array(size)
      for (let j = 0; j < size; j++) {
        sps[j] = data[offset + j]
      }

      // codec string
      let codecString = 'avc1.'
      for (let j = 1; j < 4; j++) {
        let h = sps[j].toString(16)
        if (h.length < 2) {
          h = '0' + h
        }
        codecString += h
      }

      meta.codec = codecString

      offset += size
      this.tracks.videoTrack.sps = sps
      config = SPSParser.parseSPS(sps)
    }

    let numOfPps = data[offset]

    offset++

    for (let i = 0; i < numOfPps; i++) {
      let size = data[offset] * 255 + data[offset + 1]
      offset += 2
      let pps = new Uint8Array(size)
      for (let j = 0; j < size; j++) {
        pps[j] = data[offset + j]
      }
      offset += size
      this.tracks.videoTrack.pps = pps
    }

    Object.assign(meta, SPSParser.toVideoMeta(config))

    // fill video media info
    const videoMedia = this._context.mediaInfo.video

    videoMedia.codec = meta.codec
    videoMedia.profile = meta.profile
    videoMedia.level = meta.level
    videoMedia.chromaFormat = meta.chromaFormat
    videoMedia.frameRate = meta.frameRate
    videoMedia.parRatio = meta.parRatio
    videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth
    videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight

    meta.duration = this._context.mediaInfo.duration * meta.timescale
    meta.avcc = new Uint8Array(data.length)
    meta.avcc.set(data)
    track.meta = meta
  }

  /**
   * choose audio sample rate
   * @param samplingFrequencyIndex
   * @returns {number}
   * @private
   */
  _switchAudioSampleRate (samplingFrequencyIndex) {
    let samplingFrequencyList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350]
    return samplingFrequencyList[samplingFrequencyIndex]
  }

  /**
   * choose audio sampling frequence
   * @param info
   * @returns {number}
   * @private
   */
  _switchAudioSamplingFrequency (info) {
    let samplingFrequencyIndex = (info & 12) >>> 2
    let samplingFrequencyList = [5500, 11025, 22050, 44100, 48000]
    return samplingFrequencyList[samplingFrequencyIndex]
  }

  /**
   * choose audio channel count
   * @param info
   * @returns {number}
   * @private
   */
  _switchAudioChannel (info) {
    let sampleTrackNumIndex = info & 1
    let sampleTrackNumList = [1, 2]
    return sampleTrackNumList[sampleTrackNumIndex]
  }

  /**
   * check datasize is valid use 4 Byte after current tag
   * @param datasize
   * @returns {boolean}
   * @private
   */
  _datasizeValidator (datasize) {
    let datasizeConfirm = this.loaderBuffer.toInt(0, 4)
    this.loaderBuffer.shift(4)
    return datasizeConfirm === datasize + 11
  }

  get loaderBuffer () {
    if (this._context.getInstance('LOADER_BUFFER')) {
      return this._context.getInstance('LOADER_BUFFER')
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('找不到 loaderBuffer 实例'))
    }
  }

  get tracks () {
    return this._context.getInstance('TRACKS')
  }

  get logger () {
    return this._context.getInstance('LOGGER')
  }
}

export default FlvDemuxer
