import Demuxer from './Demuxer'
import SPSParser from '../SPSParser'
import DataView4Read from '../../utils/DataView4Read'
import { EventTypes } from '../../constants/types'
import Buffer from '../../write/Buffer'
export default class VideoDemuxer extends Demuxer {
  constructor (store) {
    super(store)
    this.CLASS_NAME = this.constructor.name
    this.readOffset = 0
    this.data = new Uint8Array(0)
    this.currentTag = null
    this._store.videoMetaData = null
  }

  resetStatus () {
    this.readOffset = 0
    this.data = new Uint8Array(0)
    this.currentTag = null
  }

  resolve (tag) {
    this.data = tag.body
    this.currentTag = tag
    const firstUI8 = this.readData(1)[0]
    const frameType = (firstUI8 & 0xF0) >>> 4
    const codecId = firstUI8 & 0x0F
    if (codecId !== 7) {
      /** 1: JPEG
            * 2: H263
            * 3: Screen video
            * 4: On2 VP6
            * 5: On2 VP6
            * 6: Screen videoversion 2
            * 7: AVC
            */
      this.error(`unsupported codecId: ${codecId}`)
      return
    }
    this._parseAVCPacket(frameType)

    this.resetStatus()
  }

  _parseAVCPacket (frameType) {
    if (this.unreadLength < 4) {
      this.error('Invalid Avc Tag')
    }
    const isLe = this._store.isLe
    const { buffer } = this.data
    const dv = new DataView(buffer, this.readOffset, this.unreadLength)
    const packageType = dv.getUint8(0)

    let cpsTime = dv.getUint32(0, !isLe) & 0x00FFFFFF
    cpsTime = (cpsTime << 8) >> 8
    this.readOffset += 4

    switch (packageType) {
      case 0: {
        const { position, tagSize } = this.currentTag

        this._store.metaEndPosition = position + Buffer.readAsInt(tagSize) + 4 // 缓存scriptTag结束的位置，replay使用
        this._parseAVCDecoderConfigurationRecord()
        break
      }
      case 1: {
        this._parseAVCVideoData(frameType, cpsTime)
        break
      }
      case 2: {
        break
      }
      default: {
        // 报错
      }
    }
  }

  _parseAVCDecoderConfigurationRecord () {
    if (this.unreadLength < 7) {
      this.error('Invalid AVCDecoderConfigurationRecord, lack of data!')
      return
    }

    const { mediaInfo: mi } = this._store
    // stash offset&unreadSize before parsing sps&pps
    // const tempOffset = this.readOffset
    // const tempUnreadLength = this.unreadLength

    const { _store: store } = this
    let meta = this._store.videoMetaData
    let track = this._store.videoTrack
    const dv = new DataView4Read(this.data.buffer, this)
    if (meta) {
      if (meta.avcc !== undefined) {
        this.error('found another AVCDecoderConfigurationRecord!')
      }
    } else {
      if (!store.state._hasVideo && !store.state.hasVideoFlagOverrided) {
        store.state._hasVideo = true
        store._mediaInfo.hasVideo = true
      }
      meta = store.videoMetaData = {}
      meta.type = 'video'
      meta.id = track.id
      meta.timeScale = store.videoTimeScale
      meta.duration = store.state.duration
      mi.timescale = store.videoTimeScale
    }

    const version = dv.getUint8()
    const avcProfile = dv.getUint8()
    dv.getUint8()
    dv.getUint8()
    if (version !== 1 || avcProfile === 0) {
      // 处理错误
      return
    }

    const naluLengthSize = store.state.naluLengthSize = dv.getUint(2, this.readOffset, false) + 1
    if (naluLengthSize !== 3 && naluLengthSize !== 4) {
      // 处理错误
      return
    }

    const spsLength = dv.getUint(5, null, false)
    if (spsLength === 0) {
      this.emitError('decoder', {
        line: 128,
        handler: '_parseAVCDecoderConfigurationRecord',
        msg: 'no sps in this video'
      })
      // 处理错误
      return
    } else if (spsLength > 1) {
      this.emitError('decoder', {
        line: 132,
        handler: '_parseAVCDecoderConfigurationRecord',
        msg: 'spsLength > 1'
      })
      this.warn('AVCDecoderConfigurationRecord: spsLength > 1')
    }
    let sps
    for (let i = 0; i < spsLength; i++) {
      const len = dv.getUint16()

      if (len === 0) {
        continue
      }
      sps = new Uint8Array(this.data.buffer, this.readOffset, len)
      this.readOffset += len
      const spsConfig = SPSParser.parseSPS(sps)

      if (i !== 0) {
        continue
      }

      const {
        codecSize,
        presentSize,
        profileString,
        levelString,
        chromaFormat,
        pixelRatio,
        frameRate,
        refFrames,
        bitDepth
      } = spsConfig

      meta.width = codecSize.width
      meta.height = codecSize.height
      meta.presentWidth = presentSize.width
      meta.presentHeight = presentSize.height

      meta.profile = profileString
      meta.level = levelString
      // meta.profileCompatibility = profileCompatibility;
      // meta.naluLengthSize = naluLengthSize;

      meta.bitDepth = bitDepth
      meta.chromaFormat = chromaFormat
      meta.pixelRatio = pixelRatio
      meta.frameRate = frameRate

      if (!frameRate.fixed ||
                frameRate.fpsNum === 0 ||
                frameRate.fpsDen === 0) {
        meta.frameRate = store.referFrameRate
      }

      let { fpsDen, fpsNum } = meta.frameRate
      meta.refSampleDuration = meta.timeScale * (fpsDen / fpsNum)

      let codecArr = sps.subarray(1, 4)
      let codecStr = 'avc1.'
      for (let j = 0; j < 3; j++) {
        let hex = codecArr[j].toString(16)
        hex = hex.padStart(2, '0')
        codecStr += hex
      }

      meta.codec = codecStr

      const { mediaInfo: mi } = this._store
      mi.width = meta.width
      mi.height = meta.height
      mi.fps = meta.frameRate.fps
      mi.profile = meta.profile
      mi.level = meta.level
      mi.refFrames = refFrames
      mi.pixelRatio = pixelRatio
      mi.videoCodec = codecStr
      mi.chromaFormat = chromaFormat
      if (mi.hasAudio) {
        if (mi.audioCodec) {
          mi.mimeType = `video/x-flv; codecs="${mi.videoCodec},${mi.audioCodec}"`
          mi.codec = mi.mimeType.replace('x-flv', 'mp4')
        }
      } else {
        mi.mimeType = `video/x-flv; codecs="${mi.videoCodec}"`
        mi.codec = mi.mimeType.replace('x-flv', 'mp4')
      }
    }
    let pps
    const ppsCount = dv.getUint8()
    if (!ppsCount) {
      this.emitError('decoder', {
        line: 227,
        handler: '_parseAVCDecoderConfigurationRecord',
        msg: 'no pps in this video'
      })
      this.dispatch(EventTypes.ERROR, 'no pps in this video')
      return
    } else if (ppsCount > 1) {
      this.warn(`AVCDecoderConfigurationRecord has ppsCount: ${ppsCount}`)
    }

    for (let i = 0; i < ppsCount; i++) {
      let ppsSize = dv.getUint16()

      if (!ppsSize) {
        continue
      }

      pps = new Uint8Array(this.data.buffer, this.readOffset, ppsSize)
      this.readOffset += ppsSize
    }

    mi.sps = meta.sps = sps
    mi.pps = meta.pps = pps

    if (mi.isComplete) {
      this.handleMediaInfoReady(mi)
    }
    if (store.hasInitialMetaDispatched) {
      if (store.videoTrack.length || store.audioTrack.length) {
        this.handleDataReady(store.videoTrack, store.audioTrack)
      }
    } else {
      store.state._videoInitialMetadataDispatched = true
    }

    this.handleMetaDataReady('video', meta)
  }

  _parseAVCVideoData (frameType, cpsTime) {
    let dv = new DataView4Read(this.data.buffer, this)

    let naluList = []
    let dataLen = 0
    const { naluLengthSize: naluLenSize } = this._store.state
    let ts = this._store.state.timeStampBase + this.currentTag.getTime()
    let isKeyframe = (frameType === 1)
    while (this.unreadLength > 0) {
      if (this.unreadLength < 4) {
        this.warn('not enough data for parsing AVC')
        break
      }
      const tempReadOffset = this.readOffset
      let naluSize = naluLenSize === 4 ? dv.getUint32() : dv.getUint24()
      if (naluSize > this.unreadLength) {
        return
      }

      let unitType = dv.getUint(5, this.readOffset, false)

      if (unitType === 5) {
        isKeyframe = true
      }

      let data = new Uint8Array(this.data.buffer, tempReadOffset, naluLenSize + naluSize)
      this.readOffset = tempReadOffset + naluLenSize + naluSize
      const naluUnit = {
        type: unitType,
        data
      }
      naluList.push(naluUnit)
      dataLen += data.byteLength
    }
    dv = null
    if (naluList.length) {
      const { videoTrack } = this._store
      const videoSample = {
        units: naluList,
        length: dataLen,
        dts: ts,
        cps: cpsTime,
        pts: (ts + cpsTime),
        isKeyframe,
        position: isKeyframe ? this.currentTag.position : undefined
      }
      videoTrack.samples.push(videoSample)
      videoTrack.length += dataLen
    }
  }

  readData (num) {
    const { data, readOffset } = this
    if (this.dataSize > readOffset + num) {
      this.readOffset += num
      return data.slice(readOffset, num)
    }
    return []
  }

  get dataSize () {
    return this.data.length
  }
  get unreadLength () {
    return this.dataSize - this.readOffset
  }
}
