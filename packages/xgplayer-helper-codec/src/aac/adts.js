export default class ADTS {
  static isHeader (data, offset) {
    // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
    // Layer bits (position 14 and 15) in header should be always 0 for ADTS
    // More info https://wiki.multimedia.cx/index.php?title=ADTS
    if (offset + 1 < data.length && ADTS.isHeaderPattern(data, offset)) {
      return true
    }

    return false
  }

  static getFrameDuration (samplerate) {
    return 1024 * 90000 / samplerate
  }

  static isHeaderPattern (data, offset) {
    return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0
  }

  static getHeaderLength (data, offset) {
    return (data[offset + 1] & 0x01 ? 7 : 9)
  }

  static getFullFrameLength (data, offset) {
    return ((data[offset + 3] & 0x03) << 11) |
      (data[offset + 4] << 3) |
      ((data[offset + 5] & 0xE0) >>> 5)
  }

  static parseFrameHeader (data, offset, pts, frameIndex, frameDuration) {
    let headerLength, frameLength, stamp
    let length = data.length

    // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
    headerLength = ADTS.getHeaderLength(data, offset)
    // retrieve frame size
    frameLength = ADTS.getFullFrameLength(data, offset)
    frameLength -= headerLength

    if ((frameLength > 0) && ((offset + headerLength + frameLength) <= length)) {
      stamp = pts + frameIndex * frameDuration
      // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
      return { headerLength, frameLength, stamp }
    }

    return undefined
  }

  static appendFrame (sampleRate, data, offset, pts, frameIndex) {
    let frameDuration = ADTS.getFrameDuration(sampleRate)
    let header = ADTS.parseFrameHeader(data, offset, pts, frameIndex, frameDuration)
    if (header) {
      let stamp = header.stamp
      let headerLength = header.headerLength
      let frameLength = header.frameLength

      // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
      let aacSample = {
        unit: data.subarray(offset + headerLength, offset + headerLength + frameLength),
        pts: stamp,
        dts: stamp
      }

      return { sample: aacSample, length: frameLength + headerLength }
    }

    return undefined
  }
}
