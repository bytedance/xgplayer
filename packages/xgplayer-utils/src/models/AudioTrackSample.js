export default class VideoTrackSample {
  constructor (info) {
    let _default = VideoTrackSample.getDefault()
    if (!info) {
      return _default
    }
    let sample = Object.assign({}, _default, info)

    return sample
  }

  static getDefaultInf () {
    return {
      dts: null,
      pts: null,
      data: new Uint8Array()
    }
  }
}
