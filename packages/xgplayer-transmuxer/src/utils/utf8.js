export class UTF8 {
  /**
   *
   * @param {Uint8Array} uint8array
   * @return {string}
   */
  static decode(uint8array) {
    const out = []
    const input = uint8array
    let i = 0
    const length = uint8array.length

    while (i < length) {
      if (input[i] < 0x80) {
        out.push(String.fromCharCode(input[i]))
        ++i
        continue
      } else if (input[i] < 0xc0) {
        // fallthrough
      } else if (input[i] < 0xe0) {
        if (UTF8._checkContinuation(input, i, 1)) {
          const ucs4 = ((input[i] & 0x1f) << 6) | (input[i + 1] & 0x3f)
          if (ucs4 >= 0x80) {
            out.push(String.fromCharCode(ucs4 & 0xffff))
            i += 2
            continue
          }
        }
      } else if (input[i] < 0xf0) {
        if (UTF8._checkContinuation(input, i, 2)) {
          const ucs4 =
            ((input[i] & 0xf) << 12) |
            ((input[i + 1] & 0x3f) << 6) |
            (input[i + 2] & 0x3f)
          if (ucs4 >= 0x800 && (ucs4 & 0xf800) !== 0xd800) {
            out.push(String.fromCharCode(ucs4 & 0xffff))
            i += 3
            continue
          }
        }
      } else if (input[i] < 0xf8) {
        if (UTF8._checkContinuation(input, i, 3)) {
          let ucs4 =
            ((input[i] & 0x7) << 18) |
            ((input[i + 1] & 0x3f) << 12) |
            ((input[i + 2] & 0x3f) << 6) |
            (input[i + 3] & 0x3f)
          if (ucs4 > 0x10000 && ucs4 < 0x110000) {
            ucs4 -= 0x10000
            out.push(String.fromCharCode((ucs4 >>> 10) | 0xd800))
            out.push(String.fromCharCode((ucs4 & 0x3ff) | 0xdc00))
            i += 4
            continue
          }
        }
      }
      out.push(String.fromCharCode(0xfffd))
      ++i
    }

    return out.join('')
  }

  static _checkContinuation(uint8array, start, checkLength) {
    const array = uint8array
    if (start + checkLength < array.length) {
      while (checkLength--) {
        if ((array[++start] & 0xc0) !== 0x80) {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }
}
