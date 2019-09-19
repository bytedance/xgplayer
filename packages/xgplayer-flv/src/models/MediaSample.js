export default class MediaSample {
  constructor (info) {
    let _default = MediaSample.getDefaultInf()

    if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
      return _default
    }
    let sample = Object.assign({}, _default, info)

    Object.entries(sample).forEach(([k, v]) => {
      this[k] = v
    })
  }

  static getDefaultInf () {
    return {
      dts: null,
      pts: null,
      duration: null,
      position: null,
      isRAP: false, // is Random access point
      originDts: null
    }
  }
}
