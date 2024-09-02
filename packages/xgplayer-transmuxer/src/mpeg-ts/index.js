import { TsFixer } from './fixer'
import { AVC, AAC, HEVC, NALu, MPEG } from '../codec'
import { VideoSample, AudioSample, VideoCodecType, VideoTrack, AudioTrack, MetadataTrack, SeiSample } from '../model'
import { Logger, concatUint8Array } from '../utils'
import { AudioCodecType } from '../model/types'

const logger = new Logger('TsDemuxer')

export class TsDemuxer {
  _pmtId = -1
  _remainingPacketData = null
  _videoPesData = []
  _audioPesData = []
  _gopId = 0

  /**
   * @param {VideoTrack} [videoTrack]
   * @param {AudioTrack} [audioTrack]
   * @param {MetadataTrack} [metadataTrack]
   */
  constructor (videoTrack, audioTrack, metadataTrack, fixerConfig = {}) {
    this.videoTrack = videoTrack || new VideoTrack()
    this.audioTrack = audioTrack || new AudioTrack()
    this.metadataTrack = metadataTrack || new MetadataTrack()
    this._fixer = new TsFixer(this.videoTrack, this.audioTrack, this.metadataTrack, fixerConfig)
  }

  /**
   * @param {Uint8Array} data
   * @param {boolean} [discontinuity=false]
   * @param {boolean} [contiguous=true]
   * @returns {import('../flv').DemuxResult}
   */
  demux (data, discontinuity = false, contiguous = true) {
    const { audioTrack, videoTrack, metadataTrack } = this

    if (discontinuity) {
      this._pmtId = -1
      videoTrack.reset()
      audioTrack.reset()
      metadataTrack.reset()
    }

    if (!contiguous || discontinuity) {
      this._remainingPacketData = null
      this._videoPesData = []
      this._audioPesData = []
    } else {
      videoTrack.samples = []
      audioTrack.samples = []
      metadataTrack.seiSamples = []
      videoTrack.warnings = []
      audioTrack.warnings = []

      if (this._remainingPacketData) {
        data = concatUint8Array(this._remainingPacketData, data)
        this._remainingPacketData = null
      }
    }

    let dataLen = data.length
    const remainingLength = dataLen % 188
    if (remainingLength) {
      this._remainingPacketData = data.subarray(dataLen - remainingLength)
      dataLen -= remainingLength
    }

    let videoPid = videoTrack.pid
    let audioPid = audioTrack.pid

    for (let start = 0; start < dataLen; start += 188) {
      if (data[start] !== 0x47) throw new Error('TS packet did not start with 0x47')
      const payloadUnitStartIndicator = !!(data[start + 1] & 0x40)
      const pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2]
      const adaptationFiledControl = (data[start + 3] & 0x30) >> 4

      let offset
      if (adaptationFiledControl > 1) {
        offset = start + 5 + data[start + 4]
        if (offset === start + 188) continue
      } else {
        offset = start + 4
      }

      switch (pid) {
        case 0: // PAT
          if (payloadUnitStartIndicator) offset += data[offset] + 1
          this._pmtId = ((data[offset + 10] & 0x1f) << 8) | data[offset + 11]
          break
        case this._pmtId: {
          if (payloadUnitStartIndicator) offset += data[offset] + 1
          const tableEnd = offset + 3 + (((data[offset + 1] & 0x0f) << 8) | data[offset + 2]) - 4
          const programInfoLength = ((data[offset + 10] & 0x0f) << 8) | data[offset + 11]
          offset += 12 + programInfoLength

          while (offset < tableEnd) {
            const esPid = ((data[offset + 1] & 0x1f) << 8) | data[offset + 2]
            switch (data[offset]) {
              case 0x0f: // AAC ADTS
                audioTrack.pid = audioPid = esPid
                break
              case 0x03:
              case 0x04:
                audioTrack.pid = audioPid = esPid
                audioTrack.codecType = AudioCodecType.MP3
                break
              case 0x1b: // AVC
                if (videoPid !== -1) break
                videoTrack.codecType = VideoCodecType.AVC
                videoTrack.pid = videoPid = esPid
                break
              case 0x24: // HEVC
                if (videoPid !== -1) break
                videoTrack.codecType = VideoCodecType.HEVC
                videoTrack.pid = videoPid = esPid
                break
              default:
                logger.warn(`Unsupported stream. type: ${data[offset]}, pid: ${esPid}`)
            }

            offset += (((data[offset + 3] & 0x0f) << 8) | data[offset + 4]) + 5
          }
        }
          break
        case videoPid:
          if (payloadUnitStartIndicator && this._videoPesData.length) {
            this._parseVideoData()
          }
          this._videoPesData.push(data.subarray(offset, start + 188))
          break
        case audioPid:
          if (payloadUnitStartIndicator && this._audioPesData.length) {
            this._parseAudioData()
          }
          this._audioPesData.push(data.subarray(offset, start + 188))
          break
        case 17:
        case 0x1fff:
          break
        default:
          logger.warn(`Unknown pid: ${pid}`)
      }
    }

    this._parseVideoData()
    this._parseAudioData()

    audioTrack.formatTimescale = videoTrack.formatTimescale = videoTrack.timescale = metadataTrack.timescale = 90000

    audioTrack.timescale = audioTrack.sampleRate || 0

    return {
      videoTrack,
      audioTrack,
      metadataTrack
    }
  }

  /**
   * @param {number} [startTime=0]
   * @param {boolean} [discontinuity=false]
   * @param {boolean} [contiguous=true]
   */
  fix (startTime, discontinuity, contiguous) {
    this._fixer.fix(startTime, discontinuity, contiguous)
    return {
      videoTrack: this.videoTrack,
      audioTrack: this.audioTrack,
      metadataTrack: this.metadataTrack
    }
  }

  /**
   * @param {Uint8Array} data
   * @param {boolean} [discontinuity=false]
   * @param {boolean} [contiguous=true]
   * @param {number} [startTime=0]
   */
  demuxAndFix (data, discontinuity, contiguous, startTime) {
    this.demux(data, discontinuity, contiguous)
    return this.fix(startTime, discontinuity, contiguous)
  }

  /**
   * @param { Uint8Array } data
   * @returns {boolean}
   */
  static probe (data) {
    if (!data.length) return false
    return data[0] === 0x47 && data[188] === 0x47 && data[376] === 0x47
  }

  _parseVideoData () {
    if (!this._videoPesData.length) return
    const pes = TsDemuxer._parsePES(concatUint8Array(...this._videoPesData))
    if (!pes) {
      logger.warn('Cannot parse video pes', this._videoPesData)
      return
    }

    const units = NALu.parseAnnexB(pes.data)
    if (units) {
      this._createVideoSample(units, pes.pts, pes.dts)
    } else {
      logger.warn('Cannot parse avc units', pes)
    }

    this._videoPesData = []
  }

  _createVideoSample (units, pts, dts) {
    if (!units.length) return
    const track = this.videoTrack
    const isHevc = track.codecType === VideoCodecType.HEVC

    const sample = new VideoSample(pts, dts)
    units.forEach((unit) => {
      const type = isHevc ? (unit[0] >>> 1) & 0x3f : unit[0] & 0x1f
      switch (type) {
        case 5: // IDR
        case 16: // HEVC BLA_W_LP
        case 17: // HEVC BLA_W_RADL
        case 18: // HEVC BLA_N_LP
        case 19: // HEVC IDR_W_RADL
        case 20: // HEVC IDR_N_LP
        case 21: // HEVC CRA_NUT
        case 22: // HEVC RSV_IRAP_VCL22
        case 23: // HEVC RSV_IRAP_VCL23
          if ((!isHevc && type !== 5) || (isHevc && type === 5)) break
          sample.setToKeyframe()
          this._gopId++
          break
        case 6: // SEI
        case 39: // HEVC PREFIX_SEI
        case 40: // HEVC SUFFIX_SEI
          if ((!isHevc && type !== 6) || (isHevc && type === 6)) break
          this.metadataTrack.seiSamples.push(new SeiSample(
            NALu.parseSEI(NALu.removeEPB(unit), isHevc),
            pts
          ))
          // fix 分割nal之前只要sei信息被当做单独一个sample
          return
        case 32: // HEVC VPS
          if (!isHevc) break
          if (!track.vps.length) {
            const hvcC = HEVC.parseVPS(NALu.removeEPB(unit), track.hvcC)
            track.hvcC = track.hvcC || hvcC
            track.vps = [unit]
          }
          break
        case 7: // SPS
        case 33: // HEVC SPS
          if ((!isHevc && type !== 7) || (isHevc && type === 7)) break
          if (!track.sps.length) {
            const data = NALu.removeEPB(unit)
            const spsInfo = isHevc ? HEVC.parseSPS(data, track.hvcC) : AVC.parseSPS(data)
            track.sps = [unit]
            track.hvcC = track.hvcC || spsInfo.hvcC
            track.codec = spsInfo.codec
            track.width = spsInfo.width
            track.height = spsInfo.height
            track.sarRatio = spsInfo.sarRatio
            track.fpsNum = spsInfo.fpsNum
            track.fpsDen = spsInfo.fpsDen
          }
          break
        case 8: // PPS
        case 34: // HEVC PPS
          if ((!isHevc && type !== 8) || (isHevc && type === 8)) break
          if (!track.pps.length) track.pps = [unit]
          break
        case 9: // AUD
        case 35: // HEVC AUD
          // if ((!isHevc && type !== 9) || (isHevc && type === 9)) break
          // sample.gopId = this._gopId
          // if (sample.units.length && !keyFrame) {
          //   this._pushVideoSample(track, sample)
          //   sample = this.prevAvcSample = new VideoSample(pts, dts)
          // }
          break
        case 38: // HEVC FD_NUT
          if (isHevc) {
            let ffByteFound = false
            for (let i = 2; i < unit.byteLength; i++) {
              if (unit[i] === 0xff) {
                ffByteFound = true
                break
              }
            }
            if (!ffByteFound) {
              return
            }
          }
          break
        default:
      }
      sample.units.push(unit)
    })
    sample.gopId = this._gopId
    this._pushVideoSample(track, sample)
  }

  _pushVideoSample (track, sample) {
    if (sample.units.length) {
      if (sample.pts === null || sample.pts === undefined) {
        logger.warn('Video sample no pts', sample)
        const lastSample = track.samples[track.samples.length - 1]
        if (lastSample) {
          sample.pts = lastSample.pts
          sample.dts = lastSample.dts
        } else {
          logger.warn('Drop video sample', sample)
        }
      } else {
        track.samples.push(sample)
      }
    }
  }

  _parseAudioData () {
    if (!this._audioPesData.length) return
    const pes = TsDemuxer._parsePES(concatUint8Array(...this._audioPesData))
    if (!pes) {
      logger.warn('Cannot parse audio pes', this._audioPesData)
      return
    }

    switch (this.audioTrack.codecType) {
      case AudioCodecType.AAC:
        this._parseAacData(pes)
        break
      case AudioCodecType.MP3:
        this._parseMPEG(pes)
        break
      default:
    }

    this._audioPesData = []
  }

  _parseAacData (pes) {
    const track = this.audioTrack
    let pts = pes.pts
    if (pts === null || pts === undefined) {
      logger.warn('AAC pes not pts', track)
      if (!track.samples.length || !track.sampleRate) {
        return
      }
      pts = track.samples[track.samples.length - 1].pts + AAC.getFrameDuration(track.sampleRate)
    }

    const ret = AAC.parseADTS(pes.data, pts)
    if (ret) {
      track.codec = ret.codec
      track.channelCount = ret.channelCount
      track.sampleRate = ret.sampleRate
      track.objectType = ret.objectType
      track.sampleRateIndex = ret.samplingFrequencyIndex
      track.config = ret.config
      track.samples.push(...ret.frames.map((s) => new AudioSample(s.pts, s.data)))

      if (ret.skip) {
        logger.warn(`Skip aac adts ${ret.skip} bits`)
      }
      if (ret.remaining) {
        logger.warn(`Remaining aac adts ${ret.remaining} bits`)
      }
    } else {
      logger.warn('Cannot parse aac adts', pes)
    }
  }

  _parseMPEG (pes) {
    const data = pes.data
    const length = data.length
    let frameIndex = 0
    let offset = 0
    const pts = pes.pts
    if (pts === undefined) {
      logger.warn('[tsdemuxer]: MPEG PES unknown PTS')
      return
    }

    while (offset < length) {
      if (MPEG.isHeader(data, offset)) {
        const frame = MPEG.appendFrame(
          this.audioTrack,
          data,
          offset,
          pts,
          frameIndex
        )
        if (frame) {
          offset += frame.length
          frameIndex++
        } else {
          break
        }
      } else {
        offset++
      }
    }
  }

  static _parsePES (data) {
    const headerDataLen = data[8]
    if (headerDataLen === null || headerDataLen === undefined || data.length < (headerDataLen + 9)) return
    const startPrefix = data[0] << 16 | data[1] << 8 | data[2]
    if (startPrefix !== 1) return
    const pesLen = (data[4] << 8) + data[5]
    if (pesLen && pesLen > data.length - 6) return

    let pts
    let dts
    const ptsDtsFlags = data[7]
    if (ptsDtsFlags & 0xc0) {
      pts = (data[9] & 0x0e) * 536870912 +
        (data[10] & 0xff) * 4194304 +
        (data[11] & 0xfe) * 16384 +
        (data[12] & 0xff) * 128 +
        (data[13] & 0xfe) / 2

      if (ptsDtsFlags & 0x40) {
        dts = (data[14] & 0x0e) * 536870912 +
          (data[15] & 0xff) * 4194304 +
          (data[16] & 0xfe) * 16384 +
          (data[17] & 0xff) * 128 +
          (data[18] & 0xfe) / 2
        if (pts - dts > 60 * 90000) pts = dts
      } else {
        dts = pts
      }
    }

    return { data: data.subarray(9 + headerDataLen), pts, dts }
  }
}
