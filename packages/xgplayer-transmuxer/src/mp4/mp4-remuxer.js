import { TrackType } from '../model'
import { MP4 } from './mp4'
import { concatUint8Array } from '../utils'

export class MP4Remuxer {
  /**
   * @param {import('../model').VideoTrack} videoTrack
   * @param {import('../model').AudioTrack} audioTrack
   */
  constructor (videoTrack, audioTrack) {
    this.videoTrack = videoTrack
    this.audioTrack = audioTrack
  }

  /**
   * @returns {import('./fmp4-remuxer').RemuxResult}
   */
  remux (videoTrack, audioTrack) {
    this.videoTrack = videoTrack || this.videoTrack
    this.audioTrack = audioTrack || this.audioTrack

    const hasVideo = videoTrack?.exist() && videoTrack?.hasSample()
    const hasAudio = audioTrack?.exist() && audioTrack?.hasSample()

    let videoSegment
    let audioSegment
    if (hasVideo && hasAudio) {
      videoSegment = this._remuxMix(videoTrack, audioTrack)
    } else if (hasVideo) {
      videoSegment = this._remuxTrack(videoTrack)
    } else if (hasAudio) {
      audioSegment = this._remuxTrack(audioTrack)
    }

    if (videoTrack) {
      videoTrack.samples = []
    }

    if (audioTrack) {
      audioTrack.samples = []
    }

    return {
      videoSegment,
      audioSegment
    }
  }

  _remuxMix (videoTrack, audioTrack) {
    const ftyp = MP4.ftyp([videoTrack, audioTrack])
    const { mdatData: video, chunkOffset } = this._remuxData(videoTrack, ftyp.byteLength + 8)
    const { mdatData: audio } = this._remuxData(audioTrack, chunkOffset)

    const mdat = MP4.mdat(concatUint8Array(video, audio))
    const moov = MP4.moovMP4([videoTrack, audioTrack])

    videoTrack.ext = undefined
    audioTrack.ext = undefined

    videoTrack.samples = []
    audioTrack.samples = []

    return concatUint8Array(ftyp, mdat, moov)
  }

  _remuxTrack (track) {
    const ftyp = MP4.ftyp([track])

    const { mdatData } = this._remuxData(track, ftyp.byteLength + 8)
    const mdat = MP4.mdat(mdatData)
    const moov = MP4.moovMP4([track])

    track.ext = undefined
    track.samples = []

    return concatUint8Array(ftyp, mdat, moov)
  }

  _remuxData (track, chunkOffset) {
    const isVideo = track.type === TrackType.VIDEO
    const samples = track.samples

    let mdatSize = 0
    if (isVideo) {
      samples.forEach((s) => {
        mdatSize += s.units.reduce((t, c) => (t + c.byteLength), 0)
        mdatSize += (s.units.length * 4)
      })
    } else {
      mdatSize = samples.reduce((t, c) => (t + c.size), 0)
    }

    const mdatData = new Uint8Array(mdatSize)
    const mdatView = new DataView(mdatData.buffer)

    const ext = track.ext = {
      stts: [],
      stsc: [],
      stsz: [],
      stco: [],
      stss: [],
      ctts: []
    }

    const samplesPerChunk = 1
    let dataOffset = 0
    let totalDuration = 0
    let sample
    const sampleLen = samples.length
    for (let i = 0; i < sampleLen; i++) {
      sample = samples[i]
      totalDuration += sample.duration

      let sampleSize = isVideo ? 0 : sample.size
      if (isVideo) {
        sample.units.forEach((u) => {
          mdatView.setUint32(dataOffset, u.byteLength)
          dataOffset += 4
          mdatData.set(u, dataOffset)
          dataOffset += u.byteLength
          sampleSize += (4 + u.byteLength)
        })
      } else {
        mdatData.set(sample.data, dataOffset)
        dataOffset += sampleSize
      }
      sample.size = sampleSize
      ext.stsz.push(sampleSize)

      if (isVideo) this._fillCttsSamples(ext.ctts, sample.cts)
      this._fillSttsSamples(ext.stts, sample, samples[i + 1])
      this._fillStcoSamples(ext.stco, i, samplesPerChunk, chunkOffset)
      chunkOffset += sampleSize

      if (isVideo && sample.keyframe) {
        ext.stss.push(i + 1)
      }
    }

    track.duration = totalDuration
    this._fillStscSamples(ext.stsc, sampleLen, samplesPerChunk)

    return {
      mdatData,
      chunkOffset
    }
  }

  _fillSttsSamples (sttsSamples, cur, next) {
    const lastSample = sttsSamples[sttsSamples.length - 1]

    if (next) {
      if (!lastSample || lastSample.value !== cur.duration) {
        sttsSamples.push({ value: cur.duration, count: 1 })
      } else {
        lastSample.count++
      }
      return
    }

    if (lastSample) {
      lastSample.count++
    } else {
      sttsSamples.push({ value: 40, count: 1 })
    }
  }

  _fillCttsSamples (cttsSamples, cts) {
    const lastSample = cttsSamples[cttsSamples.length - 1]

    if (!lastSample || lastSample.value !== cts) {
      cttsSamples.push({ value: cts, count: 1 })
    } else {
      lastSample.count++
    }
  }

  _fillStcoSamples (stcoSamples, index, samplePerChunk, chunkOffset) {
    if (!(index % samplePerChunk)) {
      stcoSamples.push(chunkOffset)
    }
  }

  _fillStscSamples (samples, sampleCount, samplesPerChunk) {
    if (sampleCount <= samplesPerChunk) {
      samples.push({ firstChunk: 1, samplesPerChunk: sampleCount, sampleDescIndex: 1 })
    } else {
      const len = Math.floor(sampleCount / samplesPerChunk)
      const remaining = sampleCount % samplesPerChunk
      samples.push({ firstChunk: 1, samplesPerChunk, sampleDescIndex: 1 })
      if (remaining) {
        samples.push({ firstChunk: len + 1, samplesPerChunk: remaining, sampleDescIndex: 1 })
      }
    }
  }
}
