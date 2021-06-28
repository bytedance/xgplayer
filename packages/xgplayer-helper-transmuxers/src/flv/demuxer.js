import { VideoTrackMeta, AudioTrackMeta, XGDataView, FlvTag, VideoSample } from 'xgplayer-helper-models'
import { avc, hevc } from 'xgplayer-helper-codec'
import AMFParser from './amf-parser'
import EventEmitter from 'eventemitter3'
const { SpsParser, NalUnit } = avc
const { SpsParserHEVC, NalUnitHEVC } = hevc

class FlvDemuxer extends EventEmitter {
  constructor () {
    super()
    /** @type {boolean} */
    this.headerParsed = false
    /** @type {number} */
    this.trackNum = 0
    /** @type {boolean} */
    this.hasScript = false
    /** @type {boolean} */
    this._videoMetaChange = false
    /** @type {boolean} */
    this._audioMetaChange = false
    /** @type {number} */
    this.gopId = 0
    /** @type {*}  */
    this.onMetaData = null
  }

  /**
   *
   * @return {{FILE_HEADER_PARSED: string, AUDIO_META_PARSED: string, SCRIPT_TAG_PARSED: string, AUDIO_SAMPLE_PARSED: string, VIDEO_META_PARSED: string, VIDEO_SAMPLE_PARSED: string, VIDEO_SEI_PARSED: string}}
   * @constructor
   */
  static get EVENTS () {
    return {
      FILE_HEADER_PARSED: 'FILE_HEADER_PARSED',
      SCRIPT_TAG_PARSED: 'SCRIPT_TAG_PARSED',
      AUDIO_META_PARSED: 'AUDIO_META_PARSED',
      VIDEO_META_PARSED: 'VIDEO_META_PARSED',
      VIDEO_SAMPLE_PARSED: 'VIDEO_SAMPLE_PARSED',
      AUDIO_SAMPLE_PARSED: 'AUDIO_SAMPLE_PARSED',
      VIDEO_SEI_PARSED: 'VIDEO_SEI_PARSED'
    }
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

  demux (buffer) {
    if (!this.headerParsed) {
      if (buffer.length < 13) {
        return
      }
      const header = buffer.shift(13)
      this.parseFlvHeader(header)
      this.demux(buffer) // recursive invoke
    } else {
      if (buffer.length < 11) {
        return
      }
      let flvTag

      let loopMax = 10000 // avoid Infinite loop
      do {
        flvTag = this._parseFlvTag(buffer)
      } while (flvTag && loopMax-- > 0)
    }
  }

  parseFlvHeader (header) {
    if (!FlvDemuxer.isFlvFile(header)) {
      throw new Error(`invalid flv file,${header.join(',')}`)
    } else {
      this.headerParsed = true

      const hasAudio = (header[4] >>> 2) === 1
      const hasVideo = (header[4] & 1) === 1
      this.emit(FlvDemuxer.EVENTS.FILE_HEADER_PARSED, {
        hasVideo,
        hasAudio
      })
    }
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
  _parseFlvTag (buffer) {
    const tagSize = buffer.toInt(1, 3)
    if (buffer.length < 11 + tagSize + 4) {
      // no enough data for tag parsing
      return null
    }
    let flvTag = this._parseFlvTagHeader(buffer)
    if (flvTag) {
      this._processTagData(flvTag, buffer)
      if (!this._datasizeValidator(flvTag.datasize, buffer)) {
        throw new Error('TAG length error at ' + flvTag.datasize)
      }
    }
    return flvTag
  }

  /**
   * Parse the 11 byte tag Header
   */
  _parseFlvTagHeader (buffer) {
    let offset = 0
    let flvTag = new FlvTag()

    let tagType = buffer.toInt(offset, 1)
    offset += 1

    // 2 bit FMS reserved, 1 bit filtered, 5 bit tag type
    flvTag.filtered = (tagType & 32) >>> 5
    flvTag.tagType = tagType & 31

    // 3 Byte datasize
    flvTag.datasize = buffer.toInt(offset, 3)
    offset += 3

    if (flvTag.tagType !== 8 && flvTag.tagType !== 9 && flvTag.tagType !== 11 && flvTag.tagType !== 18) {
      if (buffer && buffer.length > 0) {
        buffer.shift(1)
      }
      throw new Error('tagType ' + flvTag.tagType)
    }

    if (buffer.length < flvTag.datasize + 15) {
      return null
    }

    // read the data.
    buffer.shift(4)

    // 3 Byte timestamp
    let timestamp = buffer.toInt(0, 3)
    buffer.shift(3)

    // 1 Byte timestampExt
    let timestampExt = buffer.shift(1)[0]
    if (timestampExt > 0) {
      timestamp += timestampExt * 0x1000000
    }

    flvTag.dts = timestamp

    // streamId
    buffer.shift(3)

    // 4 + 3 + 3 + 1 = 11 字节 TagHeader
    return flvTag
  }

  _processTagData (flvTag, buffer) {
    switch (flvTag.tagType) {
      case 18:
        this._parseScriptData(flvTag, buffer)
        break
      case 8:
        this._parseAudioTag(flvTag, buffer)
        break
      case 9:
        this._parseVideoData(flvTag, buffer)
        break
      case 11:
        // for some CDN that did not process the currect RTMP messages
        buffer.shift(3)
        break
      default:
        buffer.shift(1)
    }
  }

  /**
   * parse flv script data
   * @param flvTag
   * @private
   */
  _parseScriptData (flvTag, buffer) {
    flvTag.data = buffer.shift(flvTag.datasize)
    const info = new AMFParser().resolve(flvTag.data, flvTag.data.length)

    this.onMetaData = info ? info.onMetaData : undefined
    this.emit(FlvDemuxer.EVENTS.SCRIPT_TAG_PARSED, this.onMetaData)
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

    let userAgent = window.navigator.userAgent.toLowerCase()
    let extensionSamplingIndex

    let config
    let samplingIndex = ret.sampleRateIndex

    if (userAgent.indexOf('firefox') !== -1) {
      // 火狐下 HE-AACv2编码方式 采样率是22050时候也要使用 LC-AAC
      // firefox: use SBR (HE-AAC) if freq less than 24kHz
      if (ret.sampleRateIndex >= 8) {
        ret.objectType = 5
        config = new Array(4)
        extensionSamplingIndex = samplingIndex - 3
      } else { // use LC-AAC
        ret.objectType = 2
        config = new Array(2)
        extensionSamplingIndex = samplingIndex
      }
    } else if (userAgent.indexOf('android') !== -1 || userAgent.indexOf('safari') !== -1 || userAgent.indexOf('iphone') !== -1) {
      // android: always use LC-AAC
      ret.objectType = 2
      config = new Array(2)
      extensionSamplingIndex = samplingIndex
    } else {
      // for other browsers, e.g. chrome...
      // Always use HE-AAC to make it easier to switch aac codec profile
      ret.objectType = 5
      extensionSamplingIndex = ret.sampleRateIndex
      config = new Array(4)

      if (ret.sampleRateIndex >= 6) {
        extensionSamplingIndex = ret.sampleRateIndex - 3
      } else if (ret.channelCount === 1) { // Mono channel
        ret.objectType = 2
        config = new Array(2)
        extensionSamplingIndex = ret.sampleRateIndex
      }
    }
    ret.codec = `mp4a.40.${ret.objectType}`
    config[0] = ret.objectType << 3
    config[0] |= (ret.sampleRateIndex & 0x0F) >>> 1
    config[1] = (ret.sampleRateIndex & 0x0F) << 7
    config[1] |= (ret.channelCount & 0x0F) << 3
    if (ret.objectType === 5) {
      config[1] |= ((extensionSamplingIndex & 0x0F) >>> 1)
      config[2] = (extensionSamplingIndex & 0x01) << 7
      // extended audio object type: force to 2 (LC-AAC)
      config[2] |= (2 << 2)
      config[3] = 0
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
  _parseAudioTag (tag, buffer) {
    const meta = new AudioTrackMeta()
    let info = buffer.shift(1)[0]

    tag.data = buffer.shift(tag.datasize - 1)

    let format = (info & 240) >>> 4

    if (format !== 10) {
      throw new Error(`invalid audio format: ${format}`)
    }

    if (format === 10) {
      meta.sampleRate = this._switchAudioSamplingFrequency(info)
      meta.sampleRateIndex = (info & 12) >>> 2
      meta.frameLenth = (info & 2) >>> 1
      meta.channelCount = info & 1
      meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale)
    }

    let audioSampleRate = meta.audioSampleRate
    let audioSampleRateIndex = meta.sampleRateIndex
    let refSampleDuration = meta.refSampleDuration

    // AACPacketType
    if (tag.data[0] === 0) { // AAC Sequence Header
      let aacHeader = this._aacSequenceHeaderParser(tag.data)
      audioSampleRate = aacHeader.audiosamplerate || meta.audioSampleRate
      audioSampleRateIndex = aacHeader.sampleRateIndex || meta.sampleRateIndex
      refSampleDuration = Math.floor(1024 / audioSampleRate * meta.timescale)

      meta.channelCount = aacHeader.channelCount
      meta.sampleRate = audioSampleRate
      meta.sampleRateIndex = audioSampleRateIndex
      meta.refSampleDuration = refSampleDuration
      meta.duration = this.onMetaData.duration * meta.timescale
      meta.config = aacHeader.config
      meta.objectType = aacHeader.objectType
      meta.originObjectType = aacHeader.originObjectType
      this.emit(FlvDemuxer.EVENTS.AUDIO_META_PARSED, meta)
    } else {
      tag.data = tag.data.slice(1, tag.data.length)
      this.emit(FlvDemuxer.EVENTS.AUDIO_SAMPLE_PARSED, tag)
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
  _parseVideoData (flvTag, buffer) {
    // header
    let header = buffer.shift(1)[0]
    const vSample = new VideoSample(flvTag)
    const frameType = (header & 0xf0) >>> 4
    vSample.isKeyframe = frameType === 1
    let codecID = header & 0x0f

    // hevc和avc的header解析方式一样
    flvTag.avcPacketType = buffer.shift(1)[0]
    vSample.cts = buffer.toInt(0, 3)
    vSample.cts = (vSample.cts << 8) >> 8
    buffer.shift(3)

    // 12 for hevc, 7 for avc
    if (codecID === 7 || codecID === 12) {
      let hevc = codecID === 12
      let data = buffer.shift(flvTag.datasize - 5) // 减5字节header信息
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

      vSample.data = data

      let videoMeta
      if (flvTag.avcPacketType === 0) {
        if (hevc) {
          videoMeta = this._hevcSequenceHeaderParser(data)
        } else {
          videoMeta = this._avcSequenceHeaderParser(data)
        }
        videoMeta.codecID = codecID
        this.emit(FlvDemuxer.EVENTS.VIDEO_META_PARSED, videoMeta)
      } else {
        const dv = new XGDataView(data.buffer)
        const nals = hevc ? NalUnitHEVC.getHvccNals(dv) : NalUnit.getAvccNals(dv)
        const keyTypes = hevc ? [19, 20, 21] : [5]
        for (let i = 0; i < nals.length; i++) {
          const unit = nals[i]
          hevc ? NalUnitHEVC.analyseNal(unit) : NalUnit.analyseNal(unit)

          if (unit.sei) {
            this.emit(FlvDemuxer.EVENTS.VIDEO_SEI_PARSED, Object.assign(unit.sei, {
              dts: flvTag.dts
            }))
          }
          if (keyTypes.indexOf(unit.type) > -1) {
            vSample.firstInGop = true
            this.gopId++
          }
        }

        vSample.gopId = this.gopId
        vSample.nals = nals

        this.emit(FlvDemuxer.EVENTS.VIDEO_SAMPLE_PARSED, vSample)
      }
    } else {
      throw new Error(`video codeid is ${codecID}`)
    }
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
    let offset = 0

    let meta = new VideoTrackMeta()

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
      meta.sps = sps
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
      meta.pps = pps
    }

    Object.assign(meta, SpsParser.toVideoMeta(config))

    meta.duration = this.onMetaData.duration * meta.timescale
    meta.avcc = new Uint8Array(data.length)
    meta.avcc.set(data)
    meta.streamType = 0x1b

    return meta
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
    const meta = new VideoTrackMeta()

    let offset = 0

    meta.configurationVersion = data[0]
    meta.hevcProfileSpace = (data[1] & 0xc0) >>> 6
    meta.hevcTierFlag = (data[1] & 0x20) >>> 5
    meta.hevcProfileIdc = data[1] & 0x1f
    meta.hevcProfileCompatibilityFlags = [
      data[2],
      data[3],
      data[4],
      data[5]
    ]
    meta.hevcConstraintIndicatorFlags = [
      data[6],
      data[7],
      data[8],
      data[9],
      data[10],
      data[11]
    ]
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
              meta.vps = SpsParserHEVC._ebsp2rbsp(vps)
              meta.rawVps = vps
            }
            break
          case 33:
            if (!hasSPS) {
              hasSPS = true
              sps = data.slice(offset + 2, offset + 2 + nalUnitSize)
              meta.sps = SpsParserHEVC._ebsp2rbsp(sps)
              meta.rawSps = sps
              meta.codec = 'hev1.1.6.L93.B0'
              config = SpsParserHEVC.parseSPS(sps)
            }
            break
          case 34:
            if (!hasPPS) {
              hasPPS = true
              pps = data.slice(offset + 2, offset + 2 + nalUnitSize)
              meta.pps = SpsParserHEVC._ebsp2rbsp(pps)
              meta.rawPps = pps
            }
            break
          case 39:
            // PREFIX_SEI
            break
          case 40:
            // SUFFIX_SEI
            break
          default:
            break
        }
        offset += 2 + nalUnitSize
      }
    }

    Object.assign(meta, SpsParserHEVC.toVideoMeta(config))

    meta.streamType = 0x24

    return meta
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
  _datasizeValidator (datasize, buffer) {
    let datasizeConfirm = buffer.toInt(0, 4)
    buffer.shift(4)
    return datasizeConfirm === datasize + 11
  }

  destroy () {
    super.removeAllListeners()
  }
}

export default FlvDemuxer
