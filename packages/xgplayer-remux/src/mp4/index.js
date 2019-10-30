import {
  EVENTS,
  sniffer,
  MediaSegmentList,
  Buffer
} from 'xgplayer-utils';
import Fmp4 from './fmp4'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS

export default class Mp4Remuxer {
  constructor () {
    this._dtsBase = 0
    this._isDtsBaseInited = false
    this._audioNextDts = null
    this._videoNextDts = null
    this._videoSegmentList = new MediaSegmentList('video')
    this._audioSegmentList = new MediaSegmentList('audio')
    const {browser} = sniffer
    this._fillSilenceFrame = browser === 'ie'

    this.isFirstVideo = true
    this.isFirstAudio = true

    this.videoAllDuration = 0
    this.audioAllDuration = 0
  }

  init () {
    this.on(REMUX_EVENTS.REMUX_MEDIA, this.remux.bind(this))
    this.on(REMUX_EVENTS.REMUX_METADATA, this.onMetaDataReady.bind(this))
    this.on(REMUX_EVENTS.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this))
  }

  destroy () {
    this._dtsBase = -1
    this._dtsBaseInited = false
    this._videoNextDts = null
    this._audioNextDts = null
    this._videoSegmentList.clear()
    this._audioSegmentList.clear()
    this._videoSegmentList = null
    this._audioSegmentList = null
  }

  remux () {
    const { audioTrack, videoTrack } = this._context.getInstance('TRACKS')
    !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack)

    this._remuxVideo(videoTrack)
    this._remuxAudio(audioTrack)
  }

  resetDtsBase () {
    // for hls 中途切换 meta后seek
    this._dtsBase = 0
    this._dtsBaseInited = false
  }

  seek () {
    this._videoNextDts = null
    this._audioNextDts = null
    this._videoSegmentList.clear()
    this._audioSegmentList.clear()
  }

  onMetaDataReady (type) {
    let track

    if (type === 'audio') {
      const { audioTrack } = this._context.getInstance('TRACKS')
      track = audioTrack;
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS')
      track = videoTrack;
    }

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.mimetype = track.meta.codec;
    source.init = this.remuxInitSegment(type, track.meta);
    // source.inited = false;

    // this.resetDtsBase()
    this.emit(REMUX_EVENTS.INIT_SEGMENT, type)
  }

  remuxInitSegment (type, meta) {
    let initSegment = new Buffer()
    let ftyp = Fmp4.ftyp()
    let moov = Fmp4.moov({ type, meta: meta })

    initSegment.write(ftyp, moov)
    return initSegment;
  }

  calcDtsBase (audioTrack, videoTrack) {
    if (!audioTrack.samples.length && !videoTrack.samples.length) {
      return;
    }

    let audioBase = Infinity
    let videoBase = Infinity

    if (audioTrack.samples && audioTrack.samples.length) {
      audioBase = audioTrack.samples[0].dts
    }
    if (videoTrack.samples && videoTrack.samples.length) {
      videoBase = videoTrack.samples[0].dts
    }

    this._dtsBase = Math.min(audioBase, videoBase)
    this._isDtsBaseInited = true
  }

  _remuxVideo (videoTrack) {
    const track = videoTrack

    if (!videoTrack.samples || !videoTrack.samples.length) {
      return
    }

    let {samples} = track
    let firstDts = -1

    let initSegment = null
    const mp4Samples = []
    const mdatBox = {
      samples: []
    }

    let maxLoop = 10000
    while (samples.length && maxLoop-- > 0) {
      console.log('mark2')
      const avcSample = samples.shift()

      const { isKeyframe, options } = avcSample
      if (!this.isFirstAudio && options && options.meta) {
        initSegment = this.remuxInitSegment('video', options.meta)
        options.meta = null
        samples.unshift(avcSample)
        if (!options.isContinue) {
          this.resetDtsBase()
        }
        break;
      }

      let dts = avcSample.dts - this._dtsBase

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

      let mdatSample = {
        buffer: [],
        size: 0
      }
      mdatBox.samples.push(mdatSample)
      mdatSample.buffer.push(avcSample.data)
      mdatSample.size += avcSample.data.byteLength

      let sampleDuration = 0
      if (samples.length >= 1) {
        const nextDts = samples[0].dts - this._dtsBase
        sampleDuration = nextDts - dts
      } else {
        if (mp4Samples.length >= 1) { // lastest sample, use second last duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration
        } else { // the only one sample, use reference duration
          sampleDuration = this.videoMeta.refSampleDuration
        }
      }
      this.videoAllDuration += sampleDuration
      // console.log(`dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, `duration: ${sampleDuration}`, avcSample)
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

      if (isKeyframe) {
        this.emit(REMUX_EVENTS.RANDOM_ACCESS_POINT, pts)
      }
    }

    let moofMdat = new Buffer()
    if (mp4Samples.length) {
      const moof = Fmp4.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      })
      const mdat = Fmp4.mdat(mdatBox)
      moofMdat.write(moof, mdat)

      this.writeToSource('video', moofMdat)
    }

    if (initSegment) {
      this.writeToSource('video', initSegment)

      if (samples.length) {
        // second part of stream change
        track.samples = samples;
        return this._remuxVideo(track)
      }
    }

    this.isFirstVideo = false
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'video')

    const lastSample = mp4Samples[mp4Samples.length - 1]
    this._videoNextDts = lastSample.dts + lastSample.duration;
    track.samples = []
    track.length = 0
  }

  _remuxAudio (track) {
    const {samples} = track
    let firstDts = -1
    let mp4Samples = []

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
      console.log('mark3')
      let sample = samples.shift()
      const { data, options } = sample
      if (!this.isFirstAudio && options && options.meta) {
        initSegment = this.remuxInitSegment('audio', options.meta)
        options.meta = null;
        samples.unshift(sample)
        if (!options.isContinue) {
          this.resetDtsBase()
        }
        break;
      }

      let dts = sample.dts - this._dtsBase
      const originDts = dts
      if (!isFirstDtsInited) {
        firstDts = dts
        isFirstDtsInited = true
      }

      let sampleDuration = 0

      if (this.audioMeta.refSampleDurationFixed) {
        sampleDuration = this.audioMeta.refSampleDurationFixed
      } else if (samples.length >= 1) {
        const nextDts = samples[0].dts - this._dtsBase;
        sampleDuration = nextDts - dts
      } else {
        if (mp4Samples.length >= 1) { // use second last sample duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration
        } else { // the only one sample, use reference sample duration
          sampleDuration = this.audioMeta.refSampleDuration
        }
      }

      // console.log('remux audio ', dts)
      this.audioAllDuration += sampleDuration
      const mp4Sample = {
        dts,
        pts: dts,
        cts: 0,
        size: data.byteLength,
        duration: sample.duration ? sample.duration : sampleDuration,
        flags: {
          isLeading: 0,
          dependsOn: 2,
          isDependedOn: 1,
          hasRedundancy: 0,
          isNonSync: 0
        },
        isKeyframe: true,
        originDts,
        type: 'audio'
      }

      let mdatSample = {
        buffer: [],
        size: 0
      }
      mdatSample.buffer.push(data)
      mdatSample.size += data.byteLength

      mdatBox.samples.push(mdatSample)

      mp4Samples.push(mp4Sample)
    }

    const moofMdat = new Buffer()

    if (mp4Samples.length) {
      const moof = Fmp4.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      })
      const mdat = Fmp4.mdat(mdatBox)
      moofMdat.write(moof, mdat)

      this.writeToSource('audio', moofMdat)
    }

    if (initSegment) {
      this.writeToSource('audio', initSegment)
      if (samples.length) {
        // second part of stream change
        track.samples = samples;
        return this._remuxAudio(track)
      }
    }

    this.isFirstAudio = false
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'audio', moofMdat)

    const lastSample = mp4Samples[mp4Samples.length - 1]
    this._videoNextDts = lastSample.dts + lastSample.duration;
    track.samples = []
    track.length = 0
  }

  writeToSource (type, buffer) {
    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.data.push(buffer)
  }

  initSilentAudio (dts, duration) {
    const unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount)
    return {
      dts,
      pts: dts,
      cts: 0,
      duration,
      unit,
      size: unit.byteLength,
      originDts: dts,
      type: 'video'
    }
  }

  get videoMeta () {
    return this._context.getInstance('TRACKS').videoTrack.meta
  }
  get audioMeta () {
    return this._context.getInstance('TRACKS').audioTrack.meta
  }

  static getSilentFrame (channelCount) {
    if (channelCount === 1) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80])
    } else if (channelCount === 2) {
      return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80])
    } else if (channelCount === 3) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e])
    } else if (channelCount === 4) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38])
    } else if (channelCount === 5) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38])
    } else if (channelCount === 6) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0])
    }
    return null
  }
}
