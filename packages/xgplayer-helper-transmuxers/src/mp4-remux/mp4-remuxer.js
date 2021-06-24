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
    this._samplePerChunk = this._options.sampleNumberPerChunk || 40
    this._videoMeta = videoMeta
    this._audioMeta = audioMeta

    this._audioDtsBase = null
    this._videoDtsBase = -1
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

  destroy () {
    this._dtsBase = -1
    this._isDtsBaseInited = false
  }

  remux (audioTrack, videoTrack) {
    this.remuxVideo(videoTrack)
    // this.remuxAudio(audioTrack)

    logger.groupEnd()
  }

  remuxVideo (videoTrack) {
    const track = videoTrack || {}

    if (!videoTrack || !videoTrack.samples || !videoTrack.samples.length) {
      return
    }

    let { samples, meta } = track

    if (!meta) {
      return
    }
    let firstDts = -1
    let frameIndex = 0
    let mdat = null
    let moov = null
    // 1 构造ftyp
    const ftyp = Mp4.ftyp()
    let keyFrames = []
    const mdatBox = {
      samples: []
    }

    let firstSample = videoTrack.samples[0]
    let videoDtsBase = firstSample.dts || 0
    let videoDuration = 0
    let sampleDeltas = []
    let sampleCtss = []
    let chunks = []
    let sampleSizes = []
    let sampleCount = samples.length
    let chunksOffset = []
    let firstChunkOffset = ftyp.byteLength + 8
    let chunkOffset = firstChunkOffset
    chunksOffset.push(firstChunkOffset)
    let maxLoop = 10000
    try {
      while (samples.length && maxLoop-- > 0) {
        const avcSample = samples.shift()
        const { isKeyframe } = avcSample
        let cts
        let pts
        let dts = Math.max(0, avcSample.dts - videoDtsBase)
        if (firstDts === -1) {
          firstDts = dts
        }

        if (avcSample.pts !== undefined) {
          pts = avcSample.pts - videoDtsBase
          cts = pts - dts
        }

        if (avcSample.cts !== undefined) {
          pts = avcSample.cts + dts
          cts = avcSample.cts
        }
        let sampleDuration = this.getSttsBoxData(avcSample, samples[0], sampleDeltas)
        videoDuration = this.getDuration(videoDuration, sampleDuration)
        this.getCttsBoxData(cts, sampleCtss)

        let mdatSample = {
          buffer: [],
          size: 0
        }
        let sampleByteSize = avcSample.data.byteLength
        if (logger.long) {
          logger.log(this.TAG, `video dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, isKeyframe, `originDts ${avcSample.originDts}`, `duration ${sampleDuration}`)
        }

        if (sampleDuration >= 0) {
          mdatBox.samples.push(mdatSample)
          mdatSample.buffer.push(avcSample.data)
          mdatSample.size += sampleByteSize
        }
        frameIndex++
        this.getStszBoxData(sampleByteSize, sampleSizes)
        chunkOffset = this.getStcoBoxData(frameIndex, sampleByteSize, sampleCount, chunkOffset, chunksOffset)

        if (isKeyframe) {
          this.getStssBoxData(frameIndex, keyFrames)
        }
      }
    } catch (error) {
      console.error(error)
    }

    meta.duration = videoDuration
    this.getStscBoxData(sampleCount, chunks)

    // 2构造mdat box
    if (mdatBox.samples.length && track.meta) {
      mdat = Mp4.mdat(mdatBox)
    }

    // 3 构造moov box
    meta.sampleDeltas = sampleDeltas
    meta.keyFrames = keyFrames
    meta.sampleCtss = sampleCtss
    meta.chunks = chunks
    meta.sampleSizes = sampleSizes
    meta.chunksOffset = chunksOffset
    moov = Mp4.moov({ type: 'video', meta: meta })
    track.samples = []
    track.length = 0

    let mp4 = new Buffer()
    mp4.write(ftyp, mdat, moov)
    this.emit(Mp4Box.EVENTS.TRACK_REMUXED, 'video', mp4)
    this.ctsNum = 0
    // 下载mp4文件到本地，测试用
    // this.downLoadMp4(mp4)
  }

  getSttsBoxData (avcSample, nextSample, sampleDeltas) {
    let len = sampleDeltas.length
    let delta
    // samples 数量大于等于2
    if (nextSample) {
      let dts = avcSample.dts
      let nextDts = nextSample.dts
      delta = nextDts - dts
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

  getStscBoxData (sampleCount, chunks) {
    if (sampleCount <= this._samplePerChunk) {
      chunks.push({ firstChunk: 1, samplesPerChunk: sampleCount, sampleDescIndex: 1 })
    } else {
      let len = Math.floor(sampleCount / this._samplePerChunk)
      let lastSampleNumber = sampleCount % this._samplePerChunk
      chunks.push({ firstChunk: 1, samplesPerChunk: this._samplePerChunk, sampleDescIndex: 1 })
      if (lastSampleNumber) {
        chunks.push({ firstChunk: len + 1, samplesPerChunk: lastSampleNumber, sampleDescIndex: 1 })
      }
    }
  }

  getStcoBoxData (sampleIndex, sampleSize, sampleCount, chunkOffset, chunksOffset) {
    chunkOffset += sampleSize
    if ((sampleIndex % this._samplePerChunk) === 0 && sampleIndex !== sampleCount) {
      chunksOffset.push(chunkOffset)
    }
    return chunkOffset
  }

  getStszBoxData (sampleByteSize, sampleSizes) {
    sampleSizes.push(sampleByteSize)
  }

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
