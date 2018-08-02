// refrence: https://github.com/video-dev/hls.js/blob/master/src/demux/adts.js
import Demuxer from './Demuxer'
import DataView4Read from '../../utils/DataView4Read'
// import { mp3Versions, mp3BitRate, audioSampleRate } from '../../constants/types';
import {
  soundRateTypes,
  samplingFrequencyTypes,
  EventTypes,
  browserTypes
} from '../../constants/types'
import sniffer from '../../utils/sniffer'
import Buffer from '../../write/Buffer'
export default class AudioDemuxer extends Demuxer {
  constructor (store) {
    super(store)
    this.CLASS_NAME = this.constructor.name
    this.currentTag = null
    this.data = new Uint8Array(0)
    this.readOffset = 0
    this._store.audioMetaData = null
    this.handleDataReady = () => {}
    this.handleMetaDataReady = () => {}
    this.handleMediaInfoReady = () => {}
  }
  resolve (tag) {
    const { _store: store } = this
    const { audioTrack: track } = store
    this.currentTag = tag
    this.data = tag.body
    let {
      audioMetaData: meta
    } = store

    if (!meta) {
      meta = store.audioMetaData = {}
      store.audioMetaData = this.initAudioMeta(meta)
    }

    const dv = new DataView4Read(tag.body.buffer, this)

    const sound = dv.getUint8()

    const soundFormatIdx = sound >>> 4 //  UInt4
    const soundRate = (sound & 12) >>> 2 //  UInt2
    // const soundSize = (sound & 2) >>> 1 //   UInt1
    const soundType = (sound % 1) // UInt1

    meta.audioSampleRate = soundRateTypes[soundRate]
    meta.channelCount = soundType === 0 ? 1 : 2

    if (soundFormatIdx !== 10 && soundFormatIdx !== 2) {
      this.error('only support AAC Audio format so far')
      return
    } else if (soundFormatIdx === 10) { // AAC
      const aacInfo = this._parseAACAudio()
      if (!aacInfo) {
        return
      }

      const { data: aacData, data: { sampleFreq } } = aacInfo
      if (aacInfo.packetType === 0) { // AAC sequence header
        meta.sampleRate = sampleFreq
        meta.channelCount = aacData.channelCount
        meta.codec = aacData.codec
        meta.manifestCodec = aacData.manifestCodec
        meta.config = aacData.config
        meta.refSampleDuration = 1024 / sampleFreq * meta.timeScale
        if (store.hasInitialMetaDispatched) {
          if (store.videoTrack.length || store.audioTrack.length) {
            this.handleDataReady(store.videoTrack, store.audioTrack)
          }
        } else {
          store.state._audioInitialMetadataDispatched = true
        }

        this.handleMetaDataReady('audio', meta)

        const { mediaInfo: mi } = store
        mi.audioCodec = meta.codec
        mi.audioSampleRate = meta.sampleRate
        mi.audioChannelCount = meta.channelCount
        mi.audioConfig = meta.config
        if (mi.hasVideo) {
          if (mi.videoCodec) {
            mi.mimeType = `video/x-flv; codecs="${mi.videoCodec},${mi.audioCodec}"`
            mi.codec = mi.mimeType.replace('x-flv', 'mp4')
          }
        } else {
          mi.mimeType = `video/x-flv; codecs="${mi.audioCodec}"`
          mi.codec = mi.mimeType.replace('x-flv', 'mp4')
        }

        if (mi.isComplete) {
          this.handleMediaInfoReady(mi)
        }
      } else if (aacInfo.packetType === 1) { // AAC raw frame data
        let dts = store.state.timeStampBase + this.currentTag.getTime()
        let aacSample = { unit: aacInfo.data, length: aacInfo.data.byteLength, dts: dts, pts: dts }
        track.samples.push(aacSample)
        track.length += aacInfo.data.length
      }
    }

    this.resetStatus()
  }

  _parseAACAudio () {
    if (this.unreadLength <= 1) {
      return
    }
    const aacData = {}
    let aacArray = new Uint8Array(this.data.buffer, this.readOffset, this.unreadLength)
    const packetType = aacArray[0]
    this.readOffset += 1
    aacData.packetType = packetType
    if (!packetType) {
      const { position, tagSize } = this.currentTag
      this._store.metaEndPosition = position + Buffer.readAsInt(tagSize) + 4
      aacData.data = this._parseAACAudioSpecificConfig() // AAC Sequence header
    } else {
      aacData.data = aacArray.slice(1)
    }

    return aacData
  }
  _parseAACAudioSpecificConfig () {
    const dv = new DataView4Read(this.data.buffer, this)
    const { getAndNum } = DataView4Read

    let resultObj = {
      samplingFrequency: null,
      extAudioObjectType: null,
      extAudioSamplingIdx: null
    }
    let config = {}
    const UInt0 = dv.getUint8()
    const UInt1 = dv.getUint8()

    let tempAudioObjectType
    let audioObjectType = tempAudioObjectType = UInt0 >>> 3 // UInt5
    let samplingIdx = ((UInt0 & getAndNum(5, 7)) << 1) | (UInt1 >>> 7) // UInt4
    if (samplingIdx < 0 || samplingIdx > samplingFrequencyTypes.length) {
      this.emitError('decoder', {
        line: '141',
        handle: '_parseAACAudioSpecificConfig',
        msg: `invalid samplingFrequencyIndex ${samplingIdx}`
      })
      this.dispatch(EventTypes.ERROR, `error samplingFrequencyIndex: ${samplingIdx}`)
      return
    }

    resultObj.samplingFrequency = samplingFrequencyTypes[samplingIdx]

    let channelCount = resultObj.channelCount = (UInt1 & getAndNum(1, 4)) >>> 3
    if (channelCount < 0 || channelCount > 7) {
      this.emitError('decoder', {
        line: '154',
        handle: '_parseAACAudioSpecificConfig',
        msg: `invalid Audio Channel Count: ${channelCount}`
      })
      this.dispatch(EventTypes.ERROR, `error Audio Channel Count: ${channelCount}`)
      return
    }

    if (audioObjectType === 5) { // HE-AAC
      const UInt2 = dv.getUint8()
      resultObj.extAudioSamplingIdx = ((UInt1 & getAndNum(5, 7)) << 1) | UInt2 >>> 7
      resultObj.extAudioObjectType = (UInt2 & getAndNum(1, 5)) >>> 2
    }

    if (sniffer.browser === browserTypes.FIRE_FOX) {
      if (samplingIdx >= 6) {
        // HE-AAC uses SBR, high frequencies are constructed from low frequencies
        audioObjectType = 5
        config = new Array(4)
        resultObj.extAudioSamplingIdx = samplingIdx - 3
      } else {
        audioObjectType = 2
        config = new Array(2)
        resultObj.extAudioSamplingIdx = samplingIdx
      }
    } else if (sniffer.os.isAndroid) {
      // Android : always use AAC
      audioObjectType = 2
      config = new Array(2)
      resultObj.extAudioSamplingIdx = samplingIdx
    } else {
      /*  for other browsers (Chrome/Vivaldi/Opera ...)
                always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
            */
      audioObjectType = 5
      resultObj.extensionSamplingIndex = samplingIdx
      config = new Array(4)

      if (samplingIdx >= 6) {
        resultObj.extensionSamplingIdx = samplingIdx - 3
      } else if (channelCount === 1) {
        audioObjectType = 2
        config = new Array(2)
        resultObj.extensionSamplingIndex = samplingIdx
      }
    }

    config[0] = audioObjectType << 3
    config[0] |= (samplingIdx & 0x0E) >> 1
    config[1] |= (samplingIdx & 0x01) << 7
    config[1] |= channelCount << 3
    if (audioObjectType === 5) {
      config[1] |= (resultObj.extAudioSamplingIdx & 0x0E) >> 1
      config[2] = (resultObj.extensionSamplingIdx & 0x01) << 7
      // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
      //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
      config[2] |= 2 << 2
      config[3] = 0
    }

    return {
      config,
      sampleFreq: resultObj.samplingFrequency,
      channelCount,
      codec: `mp4a.40.${audioObjectType}`,
      manifestCodec: `mp4a.40.${tempAudioObjectType}`
    }
  }

  initAudioMeta (meta) {
    const { state, audioTrack: track } = this._store

    meta.duration = state.duration
    meta.timeScale = state.timeScale
    meta.type = 'audio'
    meta.id = track.id

    return meta
  }

  resetStatus () {
    this.currentTag = null
    this.data = new Uint8Array(0)
    this.readOffset = 0
  }
  get dataSize () {
    return this.data.length
  }

  get unreadLength () {
    return this.dataSize - this.readOffset
  }
}
