import { MP4 } from './mp4'
import { concatUint8Array } from '../utils'
import { Logger } from './logger'

/**
 * @typedef {Object} RemuxResult
 * @property {Uint8Array} [videoInitSegment]
 * @property {Uint8Array} [audioInitSegment]
 * @property {Uint8Array} [videoSegment]
 * @property {Uint8Array} [audioSegment]
 */

export class FMP4Remuxer {
  /**
   * @param {import('../model').VideoTrack} videoTrack
   * @param {import('../model').AudioTrack} audioTrack
   */
  constructor (videoTrack, audioTrack, options) {
    this.videoTrack = videoTrack
    this.audioTrack = audioTrack
    const browserVersions = /Chrome\/([^.]+)/.exec(navigator.userAgent)
    this.forceFirstIDR = browserVersions && Number(browserVersions[1]) < 50
    this.log = new Logger('FMP4Remuxer', options && options.openLog ? !options.openLog : true)
  }

  /**
   * @param {boolean} [createInit=false]
   * @returns {RemuxResult}
   */
  remux (createInit = false, options = {}) {
    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack
    const hasVideo = videoTrack.exist()
    const hasAudio = audioTrack.exist()

    let videoInitSegment
    let audioInitSegment

    let initSegment
    const tracks = []

    if (createInit) {
      if (options && options.initMerge) {
        if (hasVideo) {
          tracks.push(this.videoTrack)
        }
        if (hasAudio) {
          tracks.push(this.audioTrack)
        }
        initSegment = MP4.initSegment(tracks)
      } else {
        if (hasVideo) videoInitSegment = MP4.initSegment([this.videoTrack])
        if (hasAudio) audioInitSegment = MP4.initSegment([this.audioTrack])
      }
    }

    let videoSegment
    let audioSegment
    if (hasVideo && videoTrack.hasSample()) {
      videoSegment = this._remuxVideo()
    }

    if (hasAudio && audioTrack.hasSample()) {
      audioSegment = this._remuxAudio()
    }

    videoTrack.samples = []
    audioTrack.samples = []

    return {
      initSegment,
      videoInitSegment,
      audioInitSegment,
      videoSegment,
      audioSegment
    }
  }

  _remuxVideo () {
    const track = this.videoTrack
    if (this.forceFirstIDR) {
      track.samples[0].flag = { dependsOn: 2, isNonSyncSample: 0 }
    }
    const samples = track.samples
    const isAV01 = /av01/.test(track.codec)

    let mdatSize = 0

    if (isAV01) {
      samples.forEach((s) => {
        mdatSize += s.data.byteLength
      })
    } else {
      samples.forEach((s) => {
        mdatSize += s.units.reduce((t, c) => (t + c.byteLength), 0)
        mdatSize += (s.units.length * 4)
      })
    }

    const mdata = new Uint8Array(mdatSize)

    // av1没有uints，直接写入data即可
    // todo: H.265/H.264为什么要拼接nals/uints而不直接用data？
    if (isAV01) {
      for (let i = 0, l = samples.length, offset = 0, sample; i < l; i++) {
        sample = samples[i]
        mdata.set(sample.data, offset)
        sample.size = sample.data.byteLength
        offset += sample.size
      }
    } else {
      const mdatView = new DataView(mdata.buffer)
      for (let i = 0, l = samples.length, offset = 0, sample; i < l; i++) {
        sample = samples[i]

        let sampleSize = 0
        sample.units.forEach((u) => {
          mdatView.setUint32(offset, u.byteLength)
          offset += 4
          mdata.set(u, offset)
          offset += u.byteLength
          sampleSize += (4 + u.byteLength)
        })
        sample.size = sampleSize
      }
    }
    const mdat = MP4.mdat(mdata)

    const moof = MP4.moof([track])
    return concatUint8Array(moof, mdat)

  }

  _remuxAudio () {
    const track = this.audioTrack
    const mdata = new Uint8Array(track.samples.reduce((t, c) => (t + c.size), 0))
    track.samples.reduce((offset, s) => {
      mdata.set(s.data, offset)
      return offset + s.size
    }, 0)
    const mdat = MP4.mdat(mdata)
    const moof = MP4.moof([track])
    return concatUint8Array(moof, mdat)
  }

  reset () {
    this.videoTrack.reset()
    this.audioTrack.reset()
  }
}
