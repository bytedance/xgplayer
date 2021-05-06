/**
 * @typedef {Object} VideoMediaInfo
 * @property {string|null} codec
 * @property {number|null} width
 * @property {number|null} height
 * @property {string|null} profile
 * @property {{fixed: boolean,fps: number,fps_num: number,fps_den: number}} frameRate
 * @property {string|null} chromaFormat
 * @property {{width:number,height:number}} parRatio
 */

/**
 * @typedef {Object} AudioMediaInfo
 * @property {string|null} codec
 * @property {number|null} sampleRate
 * @property {number|null} sampleRateIndex
 * @property {number|null} channelCount
 */

/**
 * @param {Object} obj
 * @return {boolean}
 */
const isObjectFilled = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        return false
      }
    }
  }
  return true
}

export default class MediaInfo {
  constructor () {
    this.mimeType = null
    this.duration = null

    /** @type {boolean} */
    this.hasVideo = false
    /**
     * video media info
     * @type {VideoMediaInfo}
     */
    this.video = {
      codec: null,
      width: null,
      height: null,
      profile: null,
      level: null,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      chromaFormat: null,
      parRatio: {
        width: 1,
        height: 1
      }
    }
    /** @type {boolean} */
    this.hasAudio = false

    /**
     * video media info
     * @type {AudioMediaInfo}
     */
    this.audio = {
      codec: null,
      sampleRate: null,
      sampleRateIndex: null,
      channelCount: null
    }
  }

  isComplete () {
    return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this)
  }

  static isBaseInfoReady (mediaInfo) {
    return isObjectFilled(mediaInfo)
  }

  static isVideoReady (mediaInfo) {
    if (!mediaInfo.hasVideo) {
      return true
    }

    return isObjectFilled(mediaInfo.video)
  }

  static isAudioReady (mediaInfo) {
    if (!mediaInfo.hasAudio) {
      return true
    }

    return isObjectFilled(mediaInfo.video)
  }
}
