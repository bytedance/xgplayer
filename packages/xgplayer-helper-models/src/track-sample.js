/**
 * @typedef {Object} TAudioSample
 * @property {number} dts
 * @property {number} pts
 * @property {number} originDts
 * @property {Uint8Array} data
 */

/**
 * @typedef {Object} TVideoSample
 * @property {number} dts
 * @property {number} pts
 * @property {boolean} isKeyframe
 * @property {number} originDts
 * @property {Uint8Array} data
 * @property {Array<any>} nals
 */

export class AudioSample {
  constructor (info) {
    let _default = AudioSample.getDefault()
    if (!info) {
      return _default
    }
    return Object.assign({}, _default, info)
  }

  /**
   * default audio sample
   * @return {TAudioSample}
   */
  static getDefault () {
    return {
      dts: -1,
      pts: -1,
      originDts: -1,
      data: new Uint8Array()
    }
  }
}

export class VideoSample {
  /**
   * @constructor
   * @param info
   * @return {TVideoSample}
   */
  constructor (info) {
    let _default = VideoSample.getDefault()

    if (!info) {
      return _default
    }
    let sample = Object.assign({}, _default, info)

    return sample
  }

  /**
   * default video sample
   * @return {TVideoSample}
   */
  static getDefault () {
    return {
      dts: -1,
      pts: -1,
      isKeyframe: false, // is Random access point
      originDts: -1,
      data: new Uint8Array(),
      nals: []
    }
  }
}
