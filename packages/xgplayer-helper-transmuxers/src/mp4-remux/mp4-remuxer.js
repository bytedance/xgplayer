/* eslint-disable no-useless-return */
import { logger } from 'xgplayer-helper-utils'
import EventEmitter from 'eventemitter3'
import Buffer from './buffer'
import Mp4 from './mp4'

const DEFAULT_SAMPLE_DURATION = 40

export default class Mp4Box extends EventEmitter {
  constructor ({ videoMeta, audioMeta, curTime, options }) {
    super()
    this._dtsBase = curTime * 1000
    this._options = options || {}
    this._samplePerChunk = this._options.sampleNumberPerChunk || 100
    this._videoMeta = videoMeta
    this._audioMeta = audioMeta

    this._audioDtsBase = null
    this._videoDtsBase = -1
    this._isDtsBaseInited = false

    this.isFirstVideo = true
    this.isFirstAudio = true

    this.videoAllDuration = 0
    this.audioAllDuration = 0
    this.audioSamples = []
    this.audioRemuxed = 0
    this.videoRemuxed = 0
    this.mp4Durations = {
      keys: []
    }
    this.ctsNum = 0
  }

  static get EVENTS () {
    return {
      MEDIA_SEGMENT: 'MEDIA_SEGMENT',
      INIT_SEGMENT: 'INIT_SEGMENT',
      RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT',
      TRACK_REMUXED: 'TRACK_REMUXED'
    }
  }

  get videoMeta () {
    return this._videoMeta
  }

  set videoMeta (meta) {
    this._videoMeta = meta
  }

  get audioMeta () {
    return this._audioMeta
  }

  set audioMeta (meta) {
    this._audioMeta = meta
  }

  destroy () {
    this._dtsBase = -1
    this._isDtsBaseInited = false
  }

  remux (audioTrack, videoTrack) {
    if (!audioTrack && !videoTrack) {
      return
    }
    if (!videoTrack) {
      this.remuxMp4(audioTrack, 'audio')
    }
    if (!audioTrack) {
      this.remuxMp4(videoTrack, 'video')
    }
    if (audioTrack && videoTrack) {
      this.remuxMix(audioTrack, videoTrack)
    }

    logger.groupEnd()
  }

  /**
   * @description 生成包含音频和视频的mp4
   * @param {*} audioTrack 音频track
   * @param {*} videoTrack 视频track
   * @returns null
   */
  remuxMix (audioTrack, videoTrack) {
    if (!audioTrack || !audioTrack.samples || !audioTrack.samples.length) {
      return
    }
    if (!videoTrack || !videoTrack.samples || !videoTrack.samples.length) {
      return
    }

    let { samples: audioSamples, meta: audioMeta } = audioTrack
    let { samples: videoSamples, meta: videoMeta } = videoTrack

    if (!audioMeta || !videoMeta) {
      return
    }
    // 如果是音视频都有，每个chunk有一个sample
    this._samplePerChunk = 1

    let mdat = null
    let moov = null
    // 1 构造ftyp
    const ftyp = Mp4.ftyp()
    const mdatBox = {
      samples: []
    }

    const firstAudioSample = audioSamples[0]
    const firstVideoSample = videoSamples[0]
    const baseDts = Math.min(firstAudioSample.dts, firstVideoSample.dts)
    const trackInfo = {
      offset: ftyp.byteLength + 8,
      audio: {
        meta: audioMeta,
        samples: audioSamples,
        length: audioSamples.length,
        sampleDuration: 0,
        trackDuration: 0,
        frameIndex: 0,
        deltas: [], // 存储每个sample的duration
        sampleCtss: [],
        chunks: [],
        sampleSizes: [],
        chunksOffset: []
      },
      video: {
        meta: videoMeta,
        samples: videoSamples,
        length: videoSamples.length,
        sampleDuration: 0,
        trackDuration: 0,
        frameIndex: 0,
        deltas: [],
        sampleCtss: [],
        chunks: [],
        sampleSizes: [],
        chunksOffset: [],
        keyFrames: []
      }
    }
    let type = null
    try {
      while (audioSamples.length || videoSamples.length) {
        let sample
        if (audioSamples.length && videoSamples.length) {
          // 每次写入dts最小的sample
          if (audioSamples[0].dts < videoSamples[0].dts) {
            sample = audioSamples.shift()
            type = 'audio'
          } else {
            sample = videoSamples.shift()
            type = 'video'
          }
        }
        // 只有音频
        if (audioSamples.length && !videoSamples.length) {
          sample = audioSamples.shift()
          type = 'audio'
        }
        // 只有视频
        if (!audioSamples.length && videoSamples.length) {
          sample = videoSamples.shift()
          type = 'video'
        }

        const { isKeyframe } = sample
        let cts
        let pts
        const dts = Math.max(0, sample.dts - baseDts)

        if (sample.cts !== undefined && type === 'video') {
          pts = sample.cts + dts
          cts = sample.cts
        }
        const currentTrackInfo = trackInfo[type]
        const sampleDuration = this.getSttsBoxData(sample, currentTrackInfo.samples[0], currentTrackInfo.deltas)
        currentTrackInfo.trackDuration = this.getDuration(currentTrackInfo.trackDuration, sampleDuration)
        this.getCttsBoxData(cts, currentTrackInfo.sampleCtss)

        const mdatSample = {
          buffer: [],
          size: 0
        }
        const sampleByteSize = sample.data.byteLength
        if (logger.long) {
          logger.log(this.TAG, `${type} dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, `isKeyframe ${isKeyframe}`, `originDts ${sample.originDts}`, `duration ${sampleDuration}`)
        }

        if (sampleDuration >= 0) {
          mdatBox.samples.push(mdatSample)
          mdatSample.buffer.push(sample.data)
          mdatSample.size += sampleByteSize
        }
        currentTrackInfo.frameIndex++
        this.getStszBoxData(sampleByteSize, currentTrackInfo.sampleSizes)
        trackInfo.offset = this.getStcoBoxData(currentTrackInfo.frameIndex, sampleByteSize, currentTrackInfo.length, trackInfo.offset, currentTrackInfo.chunksOffset)

        if (isKeyframe) {
          this.getStssBoxData(currentTrackInfo.frameIndex, currentTrackInfo.keyFrames)
        }
      }
    } catch (error) {
      console.error(error)
    }
    this.getStscBoxData(trackInfo.audio.length, trackInfo.audio.chunks)
    this.getStscBoxData(trackInfo.video.length, trackInfo.video.chunks)

    // 2构造mdat box
    if (mdatBox.samples.length) {
      mdat = Mp4.mdat(mdatBox)
    }

    // 3 构造moov box
    [
      { meta: videoMeta, type: 'video' },
      { meta: audioMeta, type: 'audio' }
    ].forEach((item) => {
      item.meta.duration = trackInfo[item.type].trackDuration
      item.meta.sampleDeltas = trackInfo[item.type].deltas
      item.meta.keyFrames = trackInfo[item.type].keyFrames
      item.meta.sampleCtss = trackInfo[item.type].sampleCtss
      item.meta.chunks = trackInfo[item.type].chunks
      item.meta.sampleSizes = trackInfo[item.type].sampleSizes
      item.meta.chunksOffset = trackInfo[item.type].chunksOffset
    })

    moov = this.mixMoov(videoMeta.duration, videoMeta.timeScale, [videoMeta, audioMeta])

    let mp4 = new Buffer()
    mp4.write(ftyp, mdat, moov)
    this.emit(Mp4Box.EVENTS.TRACK_REMUXED, type, mp4)
    // 下载mp4文件到本地，测试用
    // this.downLoadMp4(mp4)
  }

  /**
   * @description remux单独的音频或者视频生成mp4文件
   * @param {*} track 音频或者视频的track对象
   * @param {*} type 表示track类型，'audio'或者'video'
   * @returns null
   */
  remuxMp4 (track = {}, type) {
    if (!track || !track.samples || !track.samples.length) {
      return
    }

    let { samples, meta } = track

    if (!meta) {
      return
    }
    let frameIndex = 0
    let mdat = null
    let moov = null
    // 1 构造ftyp
    const ftyp = Mp4.ftyp()
    let keyFrames = []
    const mdatBox = {
      samples: []
    }

    let firstSample = samples[0]
    let baseDts = firstSample.dts || 0
    let trackDuration = 0
    let sampleDeltas = []
    let sampleCtss = []
    let chunks = []
    let sampleSizes = []
    let sampleCount = samples.length
    let chunksOffset = []
    let chunkOffset = ftyp.byteLength + 8
    let maxLoop = 10000
    try {
      while (samples.length && maxLoop-- > 0) {
        const currentSample = samples.shift()
        const { isKeyframe } = currentSample
        let cts
        let pts
        let dts = Math.max(0, currentSample.dts - baseDts)

        if (currentSample.pts !== undefined) {
          pts = currentSample.pts - baseDts
          cts = pts - dts
        }

        if (currentSample.cts !== undefined) {
          pts = currentSample.cts + dts
          cts = currentSample.cts
        }
        let sampleDuration = this.getSttsBoxData(currentSample, samples[0], sampleDeltas)
        trackDuration = this.getDuration(trackDuration, sampleDuration)
        this.getCttsBoxData(cts, sampleCtss)

        let mdatSample = {
          buffer: [],
          size: 0
        }
        let sampleByteSize = currentSample.data.byteLength
        if (logger.long) {
          logger.log(this.TAG, `video dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, isKeyframe, `originDts ${currentSample.originDts}`, `duration ${sampleDuration}`)
        }

        if (sampleDuration >= 0) {
          mdatBox.samples.push(mdatSample)
          mdatSample.buffer.push(currentSample.data)
          mdatSample.size += sampleByteSize
        }
        frameIndex++
        this.getStszBoxData(sampleByteSize, sampleSizes)
        chunkOffset = this.getStcoBoxData(frameIndex - 1, sampleByteSize, sampleCount, chunkOffset, chunksOffset)

        if (isKeyframe) {
          this.getStssBoxData(frameIndex, keyFrames)
        }
      }
    } catch (error) {
      console.error(error)
    }

    meta.duration = trackDuration
    this.getStscBoxData(sampleCount, chunks)

    // 2构造mdat box
    if (mdatBox.samples.length && track.meta) {
      mdat = Mp4.mdat(mdatBox)
    }

    // 3 构造moov box
    meta.sampleDeltas = sampleDeltas
    meta.chunks = chunks
    meta.sampleSizes = sampleSizes
    meta.chunksOffset = chunksOffset
    if (type === 'video') {
      meta.keyFrames = keyFrames
      meta.sampleCtss = sampleCtss
    }
    moov = Mp4.moov({ type: type, meta: meta })
    track.samples = []
    track.length = 0

    let mp4 = new Buffer()
    mp4.write(ftyp, mdat, moov)
    this.emit(Mp4Box.EVENTS.TRACK_REMUXED, type, mp4)
    this.ctsNum = 0
    // 下载mp4文件到本地，测试用
    // this.downLoadMp4(mp4)
  }

  /**
   * @description 生成音视频都有的mp4的moov
   * @param {*} duration 视频的时长
   * @param {*} timeScale 视频的timescale
   * @param {array} tracksMeta 音视频的meta
   * @returns null
   */
  mixMoov (duration, timeScale, tracksMeta) {
    let size = 8
    let mvhd = Mp4.mvhd(duration, timeScale)
    let tracks = []
    tracksMeta.forEach((item) => {
      let track
      if (item.type === 'video') {
        track = Mp4.videoTrak(item)
      } else {
        track = Mp4.audioTrak(item)
      }
      tracks.push(track)
    })
    const boxs = [mvhd, ...tracks]
    boxs.forEach(item => {
      size += item.byteLength
    })
    return Mp4.initBox(size, 'moov', mvhd, ...tracks)
  }

  /**
   * @description dts to sample的映射表
   * @param {*} sample 音频或者视频的一个sample
   * @param {*} nextSample sample的下一个sample
   * @param {*} sampleDeltas sample的duration
   * @returns sample的duration
   */
  getSttsBoxData (sample, nextSample, sampleDeltas) {
    let duration = sample.duration
    let len = sampleDeltas.length
    let delta
    // samples 数量大于等于2
    if (nextSample) {
      let dts = sample.dts
      let nextDts = nextSample.dts
      if (duration) {
        delta = duration
      } else {
        delta = nextDts - dts
      }
      if (!len) {
        sampleDeltas.push({ delta: delta, deltaCount: 1 })
        return delta
      }
      if (delta === sampleDeltas[len - 1].delta) {
        sampleDeltas[len - 1].deltaCount += 1
      } else {
        sampleDeltas.push({ delta: delta, deltaCount: 1 })
      }
    } else { // 最后一个sample
      // 只有一个sample
      if (!len) {
        sampleDeltas.push({ delta: DEFAULT_SAMPLE_DURATION, deltaCount: 1 })
        delta = DEFAULT_SAMPLE_DURATION
      } else {
        // 默认最后一个sample的duration与前一个相同
        sampleDeltas[len - 1].deltaCount += 1
        delta = sampleDeltas[len - 1].delta
      }
    }
    return delta
  }

  /**
   * @description 保存pts与dts的差值到ctsEntry，如果没有B帧，没有这个表
   * @param {*} cts 视频帧的cts
   * @param {*} ctsEntry 保存cts的数组
   * @returns null
   */
  getCttsBoxData (cts, ctsEntry) {
    let len = ctsEntry.length
    // 第一个sample
    if (!len) {
      this.ctsNum += 1
      ctsEntry.push({ cts, ctsCount: 1 })
      return
    }

    if (ctsEntry[len - 1].cts === cts) {
      this.ctsNum += 1
      ctsEntry[len - 1].ctsCount += 1
    } else {
      this.ctsNum += 1
      ctsEntry.push({ cts, ctsCount: 1 })
    }
  }

  /**
   * @description 生成trunk与sample的映射关系表
   * @param {*} sampleCount 一共有多少个sample
   * @param {*} chunks 保存映射关系的数组
   */
  getStscBoxData (sampleCount, chunks) {
    if (sampleCount <= this._samplePerChunk) {
      chunks.push({ firstChunk: 1, samplesPerChunk: sampleCount, sampleDescIndex: 1 })
    } else {
      const len = Math.floor(sampleCount / this._samplePerChunk)
      const lastSampleNumber = sampleCount % this._samplePerChunk
      chunks.push({ firstChunk: 1, samplesPerChunk: this._samplePerChunk, sampleDescIndex: 1 })
      if (lastSampleNumber) {
        chunks.push({ firstChunk: len + 1, samplesPerChunk: lastSampleNumber, sampleDescIndex: 1 })
      }
    }
  }

  /**
   * @description 生成chunk offset
   * @param {*} sampleIndex 当前sample的索引值
   * @param {*} sampleSize 当前sample的字节大小
   * @param {*} sampleCount track的sample的个数
   * @param {*} chunkOffset 当前sample在mp4文件中的字节便宜量
   * @param {*} chunksOffset 存储chunkoffset的数组
   * @returns 当前sample的字节偏移
   */
  getStcoBoxData (sampleIndex, sampleSize, sampleCount, chunkOffset, chunksOffset) {
    if ((sampleIndex % this._samplePerChunk) === 0) {
      chunksOffset.push(chunkOffset)
    }
    chunkOffset += sampleSize
    return chunkOffset
  }

  /**
   * @description 把每个sample的字节大小存储到sampleSizes里
   * @param {int} sampleByteSize 每个sample的字节大小
   * @param {array} sampleSizes 存储字节大小的数组
   */
  getStszBoxData (sampleByteSize, sampleSizes) {
    sampleSizes.push(sampleByteSize)
  }

  /**
   * @description 把关键帧对应的index放到keyFrames数组中
   * @param {int} sampleIndex keyframe在所有sample中的索引值
   * @param {array} keyFrames 存储keyframe的index的数组
   */
  getStssBoxData (sampleIndex, keyFrames) {
    keyFrames.push(sampleIndex)
  }

  getDuration (currentDuration, duration) {
    return currentDuration + duration
  }

  downLoadMp4 (mp4) {
    const url = window.URL.createObjectURL(new Blob([mp4.buffer]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', 'v.mp4')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
