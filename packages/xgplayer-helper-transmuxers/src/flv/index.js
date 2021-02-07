import { AudioTrackMeta, VideoTrackMeta, Stream, VideoTrack, AudioTrack } from 'xgplayer-helper-models';
import { avc, hevc } from 'xgplayer-helper-codec';
import { EVENTS } from 'xgplayer-helper-utils';
import AMFParser from './amf-parser'

const { SpsParser, NalUnit } = avc;
const { SpsParserHEVC, NalUnitHEVC } = hevc;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;

class FlvDemuxer {
  constructor () {
    this._firstFragmentLoaded = false
    this._trackNum = 0
    this._hasScript = false
    this._videoMetaChange = false
    this._audioMetaChange = false
    this.gopId = 0
  }

  init () {
    this.on(DEMUX_EVENTS.DEMUX_START, this.doParseFlv.bind(this))
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

  doParseFlv () {
    if (!this._firstFragmentLoaded) {
      if (this.loaderBuffer.length < 13) {
        return
      }
      const header = this.loaderBuffer.shift(13)
      this.parseFlvHeader(header)
      this.doParseFlv() // 递归调用，继续解析flv流
    } else {
      if (this.loaderBuffer.length < 11) {
        return
      }
      let chunk;

      let loopMax = 10000 // 防止死循环产生
      try {
        do {
          // console.log('mark4')
          chunk = this._parseFlvTag()
        } while (chunk && loopMax-- > 0)
      } catch (e) {}

      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
    }
  }

  parseFlvHeader (header) {
    if (!FlvDemuxer.isFlvFile(header)) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('invalid flv file'))
      this.doParseFlv()
    } else {
      this._firstFragmentLoaded = true
      // const playType = FlvDemuxer.getPlayType(header[4])

      this._context.mediaInfo.hasAudio = (header[4] >>> 2) === 1
      this._context.mediaInfo.hasVideo = (header[4] & 1) === 1

      this.initVideoTrack()
      this.initAudioTrack()
    }
    this.doParseFlv()
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

    if (chunk.tagType !== 8 && chunk.tagType !== 9 && chunk.tagType !== 11 && chunk.tagType !== 18) {
      if (this.loaderBuffer && this.loaderBuffer.length > 0) {
        this.loaderBuffer.shift(1)
      }
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('tagType ' + chunk.tagType), false)
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

    // 4 + 3 + 3 = 11 字节 TagHeader
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
    if (typeof onMetaData.hasAudio === 'boolean') {
      this._context.mediaInfo.hsaAudio = onMetaData.hasAudio
    }
    if (typeof onMetaData.hasVideo === 'boolean') {
      this._context.mediaInfo.hasVideo = onMetaData.hasVideo
    }

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

  // ISO中定义的AudioSpecificConfig
  // *  audioObjectType    5bit
  // *  samplingFrquecyIndex   4bit
  // *  if(samplingFrquencyIndex === 0xf)
  // *     samplingFrequency   24bit
  // *  channelConfiguration   4bit |01111000|
  _aacSequenceHeaderParser (data) {
    let ret = {}
    ret.hasSpecificConfig = true
    ret.objectType = data[1] >>> 3
    ret.originObjectType = ret.objectType
    ret.sampleRateIndex = ((data[1] & 7) << 1) | (data[2] >>> 7)
    ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex)
    ret.channelCount = (data[2] & 120) >>> 3
    ret.frameLength = (data[2] & 4) >>> 2
    ret.dependsOnCoreCoder = (data[2] & 2) >>> 1
    ret.extensionFlagIndex = data[2] & 1

    let userAgent = window.navigator.userAgent.toLowerCase();
    let extensionSamplingIndex;

    let config;
    let samplingIndex = ret.sampleRateIndex;

    if (userAgent.indexOf('firefox') !== -1) {
      // firefox: use SBR (HE-AAC) if freq less than 24kHz
      if (ret.sampleRateIndex >= 6) {
        ret.objectType = 5;
        config = new Array(4);
        extensionSamplingIndex = samplingIndex - 3;
      } else { // use LC-AAC
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = samplingIndex;
      }
    } else if (userAgent.indexOf('android') !== -1 || userAgent.indexOf('safari') !== -1 || userAgent.indexOf('iphone') !== -1) {
      // android: always use LC-AAC
      ret.objectType = 2;
      config = new Array(2);
      extensionSamplingIndex = samplingIndex;
    } else {
      // for other browsers, e.g. chrome...
      // Always use HE-AAC to make it easier to switch aac codec profile
      ret.objectType = 5;
      extensionSamplingIndex = ret.sampleRateIndex;
      config = new Array(4);

      if (ret.sampleRateIndex >= 6) {
        extensionSamplingIndex = ret.sampleRateIndex - 3;
      } else if (ret.channelCount === 1) { // Mono channel
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = ret.sampleRateIndex;
      }
    }
    ret.codec = `mp4a.40.${ret.objectType}`
    config[0] = ret.objectType << 3;
    config[0] |= (ret.sampleRateIndex & 0x0F) >>> 1;
    config[1] = (ret.sampleRateIndex & 0x0F) << 7;
    config[1] |= (ret.channelCount & 0x0F) << 3;
    if (ret.objectType === 5) {
      config[1] |= ((extensionSamplingIndex & 0x0F) >>> 1);
      config[2] = (extensionSamplingIndex & 0x01) << 7;
      // extended audio object type: force to 2 (LC-AAC)
      config[2] |= (2 << 2);
      config[3] = 0;
    }
    ret.config = config
    return ret
  }

  //   TagType == 8时
  //  *                     header.filter == 1  header.filter == 1
  //  *    | AudioTagHeader | EncryptionHeader? | FilterParams? | AUDIODATA |
  //  *
  //  * AudioTagHeader结构 (1或2字节):
  //  * SoundFormat : bit1-4 表示音频格式。 0:行内pcm数据，平台字节序 3:行内pcm,小端序 10:aac格式
  //  * SoundRate : bit5-6  采样率 0=5.5kHz 1=11kHz 2=22kHz  3=44kHz
  //  * SoundSize : 采样大小 0=8bit 1采样 1=16bit 1采样
  //  * SoundType : 声道类型 0=单声道 1=立体声
  //  * AACPacketType : 1字节 如果soundFormat==10 及aac编码格式,则存在这个字节
  //  *                      0=aac 序列header , 1=aac元数据
  _parseAACData (chunk) {
    let track = this.tracks.audioTrack
    if (!track) {
      return
    }

    let meta = track.meta

    if (!meta) {
      track.meta = new AudioTrackMeta()
      meta = track.meta;
      this._context.mediaInfo.hasAudio = true;
    }

    let info = this.loaderBuffer.shift(1)[0]

    chunk.data = this.loaderBuffer.shift(chunk.datasize - 1)

    let format = (info & 240) >>> 4

    track.format = format

    if (format !== 10) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid audio format: ${format}`))
      return;
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

    // AACPacketType
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
      meta.config = aacHeader.config
      meta.objectType = aacHeader.objectType
      meta.originObjectType = aacHeader.originObjectType;

      const audioMedia = this._context.mediaInfo.audio

      // fill audio media info
      audioMedia.codec = aacHeader.codec
      audioMedia.channelCount = aacHeader.channelCount
      audioMedia.sampleRate = audioSampleRate
      audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex

      if (!this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
      } else {
        this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE)
        // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
      }
      this._hasAudioSequence = true

      this._audioMetaChange = true
    } else {
      if (this._audioMetaChange) {
        chunk.options = {
          meta: track.meta
        };
        this._audioMetaChange = false
      }

      chunk.data = chunk.data.slice(1, chunk.data.length)
      track.samples.push(chunk)
    }
    if (!validate) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('TAG length error at ' + chunk.datasize), false)
      // this.logger.warn(this.TAG, error.message)
    }
  }

  // parse hevc/avc video data
  // *  TagType == 9时
  // *                      filter == 1         filter == 1
  // *    | VideoTagHeader | EncryptionHeader? | FilterParams? | VideoDATA |
  // *
  // * VideoTagHeader结构(AVC格式 5字节):
  // * FrameType : bit 1-4  1=keyFrame  2=inter frame
  // * CodecId : bit 5-8  编码器信息  7=AVC
  // * AvcPacketType :  1字节  codecId==7时存在   0=avc序列header 1=avc nalU 2=avc end of sequence
  // * CompositionTime  : 3字节 codecId==7时存在  取值 0 或者 具体值 单位ms
  _parseHevcData (chunk) {
    // header
    let info = this.loaderBuffer.shift(1)[0]
    chunk.frameType = (info & 0xf0) >>> 4
    chunk.isKeyframe = chunk.frameType === 1
    // let tempCodecID = this.tracks.videoTrack.codecID
    let codecID = info & 0x0f
    this.tracks.videoTrack.codecID = codecID

    // hevc和avc的header解析方式一样
    chunk.avcPacketType = this.loaderBuffer.shift(1)[0]
    chunk.cts = this.loaderBuffer.toInt(0, 3)
    chunk.cts = (chunk.cts << 8) >> 8
    this.loaderBuffer.shift(3)

    // 12 for hevc, 7 for avc
    if (codecID === 7 || codecID === 12) {
      let hevc = codecID === 12;
      let data = this.loaderBuffer.shift(chunk.datasize - 5) // 减5字节header信息
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
        if (hevc) {
          this._hevcSequenceHeaderParser(chunk.data)
        } else {
          this._avcSequenceHeaderParser(chunk.data)
        }
        let validate = this._datasizeValidator(chunk.datasize)
        if (validate) {
          if (!this._hasVideoSequence) {
            this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
          } else {
            this.emit(DEMUX_EVENTS.VIDEO_METADATA_CHANGE)
            // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
          }
          this._hasVideoSequence = true
        }
        this._videoMetaChange = true
      } else {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false)
          return;
        }
        const nals = hevc ? NalUnitHEVC.getHvccNals(new Stream(chunk.data.buffer)) : NalUnit.getAvccNals(new Stream(chunk.data.buffer))
        const keyTypes = hevc ? [19, 20] : [5]
        for (let i = 0; i < nals.length; i++) {
          const unit = nals[i]
          hevc ? NalUnitHEVC.analyseNal(unit) : NalUnit.analyseNal(unit)

          if (unit.sei) {
            this.emit(DEMUX_EVENTS.SEI_PARSED, Object.assign(unit.sei, {
              dts: chunk.dts
            }))
          }
          if (keyTypes.indexOf(unit.type) > -1) {
            chunk.isGop = true
            this.gopId++
          }
        }
        codecID === 12 ? this.tracks.videoTrack.meta.streamType = 0x24 : this.tracks.videoTrack.meta.streamType = 0x1b
        if (this._videoMetaChange) {
          chunk.options = {
            meta: Object.assign({}, this.tracks.videoTrack.meta)
          }
          this._videoMetaChange = false
        }
        chunk.gopId = this.gopId
        chunk.nals = nals;
        if (chunk.isKeyframe) {
          this.emit(DEMUX_EVENTS.ISKEYFRAME, chunk.dts + chunk.cts)
        }
        this.tracks.videoTrack.samples.push(chunk)
        // this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
      }
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`video codeid is ${codecID}`), false)
      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1)
      if (!this._datasizeValidator(chunk.datasize)) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false)
      }

      this.tracks.videoTrack.samples.push(chunk)
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
    }
    delete chunk.tagType
  }

  /**
  * parse avc metadata
  *  configurationVerison = 1  uint(8)
  *  avcProfileIndication      uint(8)
  *  profile_compatibility     uint(8)
  *  avcLevelIndication        uint(8)
  *  reserved   `111111`       bit(6)
  *  lengthSizeMinusOne        uint(2)
  *  reserved   `111`          bit(3)
  *  numOfSPS                  uint(5)
  *  for(numOfSPS)
  *    spsLength               uint(16)
  *    spsNALUnit              spsLength个字节
  *  numOfPPS                  uint(8)
  *  for(numOfPPS)
  *     ppsLength              uint(16)
  *     ppsNALUnit             ppsLength个字节
  */
  _avcSequenceHeaderParser (data) {
    let track = this.tracks.videoTrack

    if (!track) {
      return
    }

    let offset = 0

    if (!track.meta) {
      track.meta = new VideoTrackMeta()
      this._context.mediaInfo.hasVideo = true;
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
      this.tracks.videoTrack.meta.sps = sps
      config = SpsParser.parseSPS(sps)
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
      this.tracks.videoTrack.meta.pps = pps
    }

    Object.assign(meta, SpsParser.toVideoMeta(config))

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
    meta.streamType = 0x1b

    track.meta = meta
  }

  /**
  * parse hevc metadata
  *  configurationVerison = 1  uint(8)
  *  generalProfileSpace       uint(2)
  *  generalTierFlag           uint(1)
  *  generalProfileIdc         uint(5)
  *  generalProfileCompatibilityFlags uint(32)
  *  generalConstraintIndicatorFlags  uint(48)
  *  generalLevelIdc           uint(8)
  *  complete_representation   bit(1)
  *  reserved   `111`          bit(3)
  *  segmentationIdc           uint(12)
  *  reserved `111111`         bit(6)
  *  parallelismType           uint(2)
  *  reserved `111111`         bit(6)
  *  chromaFormat              uint(2)
  *  reserved `11111`          bit(5)
  *  bitDepthLumaMinus8        uint(3)
  *  reserved `11111`          bit(5)
  *  bitDepthChromaMinus8      uint(3)
  *  avgFrameRate              bit(16)
  *  constantFrameRate         bit(2)
  *  numTemporalLayers         bit(3)
  *  temporalIdNested          bit(1)
  *  lengthSizeMinusOne        uint(2)
  *  numOfArrays               uint(8)
  *  for(numOfArrays)
  *    arrayCompleteness       bit(1)
  *    reserved                uint(1)
  *    nalUnitType             uint(16)
  *    numNals                 uint(16)
  *    for(numNals)
  *       nalUintLength        uint(16)
  *       nalUint              bit(8 * nalUintLength)
  */
  _hevcSequenceHeaderParser (data) {
    let track = this.tracks.videoTrack

    if (!track) {
      return
    }

    let offset = 0

    if (!track.meta) {
      track.meta = new VideoTrackMeta()
      this._context.mediaInfo.hasVideo = true;
    }
    let meta = track.meta

    meta.configurationVersion = data[0]
    meta.hevcProfileSpace = (data[1] & 0xc0) >>> 6
    meta.hevcTierFlag = (data[1] & 0x20) >>> 5
    meta.hevcProfileIdc = data[1] & 0x1f
    meta.hevcProfileCompatibilityFlags = [
      data[2],
      data[3],
      data[4],
      data[5]
    ];
    meta.hevcConstraintIndicatorFlags = [
      data[6],
      data[7],
      data[8],
      data[9],
      data[10],
      data[11]
    ];
    meta.hevcLevelIdc = data[12]
    meta.minSpatialSegmentationIdc = data[13] & 0x0f + data[14] << 4
    meta.parallelismType = data[15] & 0x03
    meta.chromaFormat = data[16] & 0x03
    meta.bitDepthLumaMinus8 = data[17] & 0x07
    meta.bitDepthChromaMinus8 = data[18] & 0x07
    meta.avgFrameRate = data[19] * 256 + data[20]
    meta.constantFrameRate = (data[21] & 0xc0) >>> 6
  	meta.numTemporalLayers = (data[21] & 0x38) >>> 3
  	meta.temporalIdNested = (data[21] & 0x04) >>> 2
  	meta.lengthSizeMinusOne = data[21] & 0x03
    let numOfArrays = data[22]

    offset = 23
    let config = {}
    let nalUnitType = 0
    let numNalus = 0
    let nalUnitSize = 0
    let hasVPS = false
    let hasSPS = false
    let hasPPS = false
    let vps, sps, pps
    for (let i = 0; i < numOfArrays; i++) {
      nalUnitType = data[offset] & 0x3f
      numNalus = data[offset + 1] * 256 + data[offset + 2]
      offset += 3
      for (let j = 0; j < numNalus; j++) {
        nalUnitSize = data[offset] * 256 + data[offset + 1]
        switch (nalUnitType) {
          case 32:
            if (!hasVPS) {
              hasVPS = true
              vps = data.slice(offset + 2, offset + 2 + nalUnitSize)
              this.tracks.videoTrack.meta.vps = SpsParserHEVC._ebsp2rbsp(vps)
              this.tracks.videoTrack.meta.rawVps = vps
            }
            break;
          case 33:
            if (!hasSPS) {
              hasSPS = true
              sps = data.slice(offset + 2, offset + 2 + nalUnitSize)
              this.tracks.videoTrack.meta.sps = SpsParserHEVC._ebsp2rbsp(sps)
              this.tracks.videoTrack.meta.rawSps = sps
              meta.codec = 'hev1.1.6.L93.B0'
              config = SpsParserHEVC.parseSPS(sps)
            }
            break;
          case 34:
            if (!hasPPS) {
              hasPPS = true
              pps = data.slice(offset + 2, offset + 2 + nalUnitSize)
              this.tracks.videoTrack.meta.pps = SpsParserHEVC._ebsp2rbsp(pps)
              this.tracks.videoTrack.meta.rawPps = pps
            }
            break;
          case 39:
            // PREFIX_SEI
            break;
          case 40:
            // SUFFIX_SEI
            break;
          default:
            break;
        }
        offset += 2 + nalUnitSize
      }
    }

    Object.assign(meta, SpsParserHEVC.toVideoMeta(config))

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

    meta.streamType = 0x24

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
    const buffer = this._context.getInstance('LOADER_BUFFER')
    if (buffer) {
      return buffer
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('找不到 loaderBuffer 实例'))
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
