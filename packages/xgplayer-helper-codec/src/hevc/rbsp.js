class RBSP {
  /**
   * convert EBSP to RBSP
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   * @constructor
   */
  static EBSP2RBSP (data) {
    return data.filter((el, idx) => {
      if (idx < 2) {
        return true
      } else {
        return !(data[idx - 2] === 0 && data[idx - 1] === 0 && el === 3)
      }
    })
  }

  /**
   * @param {Uint8Array} data
   * @constructor
   */
  static EBSP2SODB (data) {
    const lastByte = data[data.byteLength - 1]
    if (lastByte && lastByte === 128) {
      return data.slice(0, data.byteLength - 1)
    }

    return data
  }
}

export default RBSP
