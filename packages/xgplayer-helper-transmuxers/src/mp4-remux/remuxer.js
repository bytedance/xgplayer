import { logger } from 'xgplayer-helper-utils'
import EventEmitter from 'eventemitter3'
import Buffer from './buffer'
import Fmp4 from './fmp4'

/**
 * @typedef { import('xgplayer-helper-models').VideoTrack } VideoTrack
 */
/**
 * @typedef { import('xgplayer-helper-models').AudioTrack } AudioTrack
 */

export default class Mp4Remuxer extends EventEmitter {
  constructor ({ videoMeta, audioMeta, curTime }) {
    super()
    this.TAG = 'Fmp4Remuxer'
    this._dtsBase = curTime * 1000

    this._videoMeta = videoMeta
    this._audioMeta = audioMeta

    this._audioDtsBase = null
    this._videoDtsBase = null
    this._isDtsBaseInited = false

    this.isFirstVideo = true
    this.isFirstAudio = true

    this.videoAllDuration = 0
    this.audioAllDuration = 0

    this.audioRemuxed = 0
    this.videoRemuxed = 0
    this.mp4Durations = {
      keys: []
    }
  }

  static get EVENTS () {
    return {
      MEDIA_SEGMENT: 'MEDIA_SEGMENT',
      INIT_SEGMENT: 'INIT_SEGMENT',
      RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT',
      TRACK_REMUXED: 'TRACK_REMUXED'
    }
  }

  destroy () {
    this._dtsBase = -1
    this._isDtsBaseInited = false
    this.mp4Durations = {
      keys: []
    }

    this.removeAllListeners()
  }

  /**
   * @param {AudioTrack} audioTrack
   * @param {VideoTrack} videoTrack
   */
  remux (audioTrack, videoTrack) {
    !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack)
    this.remuxVideo(videoTrack)
    this.remuxAudio(audioTrack)

    logger.groupEnd()
  }

  resetDtsBase () {
    this._dtsBase = 0
  }

  seek (time) {
    logger.log(this.TAG, 'set dtsBase for seek(),time=', time)
    if (!this._isDtsBaseInited) {
      this._dtsBase = time * 1000
    } else {
      this._isDtsBaseInited = false
      this._dtsBase = time * 1000
    }

    this._audioDtsBase = this._videoDtsBase = null
  }

  /**
   * @param {'video' | 'audio' } type
   * @param {*} meta
   * @return {Buffer}
   */
  remuxInitSegment (type, meta) {
    logger.log(this.TAG, 'remuxInitSegment: type=', type)
    const initSegment = new Buffer()
    const ftyp = meta.streamType === 0x24 ? Fmp4.ftypHEVC() : Fmp4.ftyp()
    const moov = Fmp4.moov({ type, meta: meta })

    initSegment.write(ftyp, moov)
    return initSegment
  }

  /**
   * @param {AudioTrack} audioTrack
   * @param {VideoTrack} videoTrack
   */
  calcDtsBase (audioTrack, videoTrack) {
    if (!audioTrack && videoTrack.samples.length) {
      const firstSample = videoTrack.samples[0]
      let start
      if (firstSample.options && firstSample.options.start) {
        start = firstSample.options.start
      }
      this._videoDtsBase = firstSample.dts - (start || this._dtsBase)
      this._isDtsBaseInited = true
      return
    }

    if ((!audioTrack || !audioTrack.samples.length) && (!videoTrack || !videoTrack.samples.length)) {
      return
    }

    let audioBase = null
    let videoBase = null
    let start = null
    if (audioTrack && audioTrack.samples && audioTrack.samples.length) {
      const firstSample = audioTrack.samples[0]
      audioBase = firstSample.dts
      if (firstSample.options && firstSample.options.start) {
        start = firstSample.options.start
      }
    }
    if (videoTrack && videoTrack.samples && videoTrack.samples.length) {
      const firstSample = videoTrack.samples[0]
      videoBase = firstSample.dts
      if (firstSample.options && firstSample.options.start) {
        start = firstSample.options.start
      }
    }

    const delta = audioBase - videoBase
    // 临时兼容逻辑， hls 考虑上av之间的差值
    if (delta < 0 && start !== null) {
      videoTrack.samples.forEach(x => {
        x.dts -= delta
        if (x.pts) {
          x.pts -= delta
        }
      })
    }

    this._videoDtsBase = (videoBase || audioBase) - (start || this._dtsBase)
    this._audioDtsBase = (audioBase || videoBase) - (start || this._dtsBase)
    this._dtsBase = Math.min(videoBase, audioBase)
    this._isDtsBaseInited = true

    logger.log(this.TAG, 'calcDtsBase')
    logger.log(this.TAG, `video first dts: ${videoBase} , start:${start} , _videoDtsBase:${this._videoDtsBase} , _dtsBase:${this._dtsBase}`)
    logger.log(this.TAG, `audio first dts: ${audioBase} , start:${start} , _audioDtsBase:${this._audioDtsBase}, _dtsBase:${this._dtsBase}`)
  }

  /**
   * @param {VideoTrack}videoTrack
   * @return {*}
   * @private
   */
  remuxVideo (videoTrack) {
    const track = videoTrack || {}

    if (!videoTrack || !videoTrack.samples || !videoTrack.samples.length) {
      return
    }

    const { samples, meta } = track

    if (!meta) return

    let firstDts = -1

    let initSegment = null
    const mp4Samples = []
    const mdatBox = {
      samples: []
    }

    let maxLoop = 10000
    while (samples.length && maxLoop-- > 0) {
      const avcSample = samples.shift()

      const { isKeyframe, options } = avcSample
      if (!this.isFirstVideo && options && options.meta) {
        initSegment = this.remuxInitSegment('video', options.meta)
        options.meta = null
        samples.unshift(avcSample)
        if (!options.isContinue) {
          this._videoDtsBase = 0
        }
        break
      }
      const dts = Math.max(0, avcSample.dts - this.videoDtsBase)
      if (firstDts === -1) {
        firstDts = dts
      }

      let cts
      let pts
      if (avcSample.pts !== undefined) {
        pts = avcSample.pts - this._dtsBase
        cts = pts - dts
      }
      if (avcSample.cts !== undefined) {
        pts = avcSample.cts + dts
        cts = avcSample.cts
      }

      const mdatSample = {
        buffer: [],
        size: 0
      }

      let sampleDuration = 0
      if (avcSample.duration) {
        sampleDuration = avcSample.duration
      } else if (samples.length >= 1) {
        const nextDts = samples[0].dts - this.videoDtsBase
        sampleDuration = nextDts - dts
      } else {
        if (mp4Samples.length >= 1) { // lastest sample, use second last duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration
        } else { // the only one sample, use reference duration
          sampleDuration = this._videoMeta.refSampleDuration
        }
      }
      this.videoAllDuration += sampleDuration
      if (logger.long) {
        logger.log(this.TAG, `video dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, isKeyframe, `originDts ${avcSample.originDts}`, `duration ${sampleDuration}`)
      }
      if (sampleDuration >= 0) {
        mdatBox.samples.push(mdatSample)
        mdatSample.buffer.push(avcSample.data)
        mdatSample.size += avcSample.data.byteLength
        //  manage same pts sample
        if (this.mp4Durations[pts]) {
          pts += this.mp4Durations[pts]
          cts = pts - dts
        }
        mp4Samples.push({
          dts,
          cts,
          pts,
          data: avcSample.data,
          size: avcSample.data.byteLength,
          isKeyframe,
          duration: sampleDuration,
          flags: {
            isLeading: 0,
            dependsOn: isKeyframe ? 2 : 1,
            isDependedOn: isKeyframe ? 1 : 0,
            hasRedundancy: 0,
            isNonSync: isKeyframe ? 0 : 1
          },
          originDts: dts,
          type: 'video'
        })
        this.mp4Durations[pts] = sampleDuration
        this.mp4Durations.keys.push(pts)
      }

      if (isKeyframe) {
        this.emit(Mp4Remuxer.EVENTS.RANDOM_ACCESS_POINT, pts)
      }
    }
    // delete too much data
    if (this.mp4Durations.keys.length > 1e4) {
      const tmp = this.mp4Durations
      this.mp4Durations = {}
      this.mp4Durations.keys = tmp.keys.slice(-100)
      this.mp4Durations.keys.forEach(key => {
        this.mp4Durations[key] = tmp[key]
      })
    }
    if (mp4Samples.length) {
      logger.log(this.TAG, 'remux to mp4 video:', [firstDts / 1000, mp4Samples[mp4Samples.length - 1].dts / 1000])
    }

    const moofMdat = new Buffer()
    if (mp4Samples.length && track.meta) {
      const moof = Fmp4.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      })
      const mdat = Fmp4.mdat(mdatBox)
      moofMdat.write(moof, mdat)

      this.segmentRemuxed('video', moofMdat, mp4Samples[mp4Samples.length - 1].pts - mp4Samples[0].pts)
    }

    if (initSegment) {
      this.segmentRemuxed('video', initSegment)

      if (samples.length) {
        // second part of stream change
        track.samples = samples
        return this.remuxVideo(track)
      }
    }

    this.isFirstVideo = false
    this.emit(Mp4Remuxer.EVENTS.TRACK_REMUXED, 'video', moofMdat)

    track.samples = []
    track.length = 0
  }

  /**
   *
   * @param {AudioTrack} track
   * @return {*}
   * @private
   */
  remuxAudio (track) {
    const { samples } = (track || {})
    let firstDts = -1
    const mp4Samples = []

    let initSegment = null
    const mdatBox = {
      samples: []
    }
    if (!samples || !samples.length) {
      return
    }

    let maxLoop = 10000
    let isFirstDtsInited = false
    while (samples.length && maxLoop-- > 0) {
      const sample = samples.shift()
      const { data, options } = sample
      if (!this.isFirstAudio && options && options.meta) {
        initSegment = this.remuxInitSegment('audio', options.meta)
        options.meta = null
        samples.unshift(sample)
        if (!options.isContinue) {
          this._audioDtsBase = 0
        }
        break
      }

      const dts = Math.max(0, sample.dts - this.audioDtsBase)
      const originDts = sample.originDts
      if (!isFirstDtsInited) {
        firstDts = dts
        isFirstDtsInited = true
      }

      let sampleDuration = 0
      if (sample.duration) {
        sampleDuration = sample.duration
      } else if (this._audioMeta.refSampleDurationFixed) {
        sampleDuration = this._audioMeta.refSampleDurationFixed
      } else if (samples.length >= 1) {
        const nextDts = samples[0].dts - this.audioDtsBase
        sampleDuration = nextDts - dts
      } else {
        if (mp4Samples.length >= 1) { // use second last sample duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration
        } else { // the only one sample, use reference sample duration
          sampleDuration = this._audioMeta.refSampleDuration
        }
      }

      if (logger.long) {
        logger.log(this.TAG, `audio dts ${dts}`, `pts ${dts}`, `originDts ${originDts}`, `duration ${sampleDuration}`)
      }
      this.audioAllDuration += sampleDuration
      const mp4Sample = {
        dts,
        pts: dts,
        cts: 0,
        size: data.byteLength,
        duration: sample.duration ? sample.duration : sampleDuration,
        flags: {
          isLeading: 0,
          dependsOn: 1,
          isDependedOn: 0,
          hasRedundancy: 0,
          isNonSync: 0
        },
        isKeyframe: true,
        originDts,
        type: 'audio'
      }

      const mdatSample = {
        buffer: [],
        size: 0
      }

      if (sampleDuration >= 0) {
        mdatSample.buffer.push(data)
        mdatSample.size += data.byteLength

        mdatBox.samples.push(mdatSample)
        mp4Samples.push(mp4Sample)
      }
    }

    const moofMdat = new Buffer()

    if (mp4Samples.length && track.meta) {
      logger.log(this.TAG, 'remux to mp4 audio:', [firstDts / 1000, mp4Samples[mp4Samples.length - 1].dts / 1000])
      const moof = Fmp4.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      })
      const mdat = Fmp4.mdat(mdatBox)
      moofMdat.write(moof, mdat)

      this.segmentRemuxed('audio', moofMdat, mp4Samples[mp4Samples.length - 1].dts - mp4Samples[0].dts)
    }

    if (initSegment) {
      this.segmentRemuxed('audio', initSegment)
      if (samples.length) {
        // second part of stream change
        track.samples = samples
        return this.remuxAudio(track)
      }
    }

    this.isFirstAudio = false
    this.emit(Mp4Remuxer.EVENTS.TRACK_REMUXED, 'audio', moofMdat)

    track.samples = []
    track.length = 0
  }

  segmentRemuxed (type, buffer, bufferDuration) {
    this.emit(Mp4Remuxer.EVENTS.MEDIA_SEGMENT, type, buffer, bufferDuration)
  }

  get videoDtsBase () {
    if (this._videoDtsBase !== null) {
      return this._videoDtsBase
    }
    return this._dtsBase
  }

  set videoDtsBase (value) {
    this._videoDtsBase = value
  }

  get audioDtsBase () {
    if (this._audioDtsBase !== null) {
      return this._audioDtsBase
    }
    return this._dtsBase
  }
}
