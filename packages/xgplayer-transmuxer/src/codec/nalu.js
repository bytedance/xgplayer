import { readBig32 } from '../utils'

export class NALu {
  static parseAnnexB (data) {
    const len = data.length
    let start = 2
    let end = 0
    while (data[start] !== null && data[start] !== undefined && data[start] !== 1) {
      start++
    }
    start++
    end = start + 2

    if (end >= len) return []

    const units = []

    while (end < len) {
      switch (data[end]) {
        case 0:
          if (data[end - 1] !== 0) {
            end += 2
            break
          } else if (data[end - 2] !== 0) {
            end++
            break
          }

          if (start !== end - 2) units.push(data.subarray(start, end - 2))

          do {
            end++
          } while (data[end] !== 1 && end < len)
          start = end + 1
          end = start + 2
          break
        case 1:
          if (data[end - 1] !== 0 || data[end - 2] !== 0) {
            end += 3
            break
          }
          if (start !== end - 2) units.push(data.subarray(start, end - 2))
          start = end + 1
          end = start + 2
          break
        default:
          end += 3
          break
      }
    }

    if (start < len) units.push(data.subarray(start))

    return units
  }

  static parseAvcC (data, size = 4) {
    if (data.length < 4) return
    const dataLen = data.length
    const units = []

    let offset = 0
    let length
    while ((offset + size) < dataLen) {
      length = readBig32(data, offset)
      if (size === 3) length >>>= 8
      offset += size

      if (!length) continue
      if (offset + length > dataLen) {
        break
      }

      units.push(data.subarray(offset, offset + length))
      offset += length
    }

    return units
  }

  static parseSEI (unit, isHevc) {
    const len = unit.length
    let i = isHevc ? 2 : 1
    let type = 0
    let size = 0
    let uuid = ''

    while (unit[i] === 255) {
      type += 255
      i++
    }

    type += unit[i++]

    while (unit[i] === 255) {
      size += 255
      i++
    }
    size += unit[i++]

    if (type === 5 && len > i + 16) {
      for (let j = 0; j < 16; j++) {
        uuid += unit[i].toString(16)
        i++
      }
    }

    return {
      payload: unit.subarray(i), type, size, uuid
    }
  }

  static removeEPB (uint) {
    const length = uint.byteLength
    const emulationPreventionBytesPositions = []
    let i = 1

    while (i < length - 2) {
      if (uint[i] === 0 && uint[i + 1] === 0 && uint[i + 2] === 0x03) {
        emulationPreventionBytesPositions.push(i + 2)
        i += 2
      } else {
        i++
      }
    }

    if (!emulationPreventionBytesPositions.length) return uint

    const newLength = length - emulationPreventionBytesPositions.length
    const newData = new Uint8Array(newLength)

    let sourceIndex = 0
    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === emulationPreventionBytesPositions[0]) {
        sourceIndex++
        emulationPreventionBytesPositions.shift()
      }
      newData[i] = uint[sourceIndex]
    }

    return newData
  }
}
