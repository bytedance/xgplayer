import { UTF8 } from '../utils'

export class AMF {
  static parse (data) {
    if (data.length < 3) return

    const ret = {}
    const name = AMF._parseValue(new DataView(data.buffer, data.byteOffset, data.byteLength))
    const value = AMF._parseValue(new DataView(data.buffer, data.byteOffset + name.size, data.byteLength - name.size))
    ret[name.data] = value.data

    return ret
  }

  static _parseValue (view) {
    const dataLen = view.byteLength
    const type = view.getUint8(0)
    let offset = 1
    let isEnd = false
    let value

    switch (type) {
      case 0: // Number(Double) type
        value = view.getFloat64(1)
        offset += 8
        break
      case 1: { // Boolean type
        value = !!view.getUint8(1)
        offset += 1
        break
      }
      case 2: { // String type
        const { data, size } = AMF._parseString(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset))
        value = data
        offset += size
      }
        break
      case 3: { // Object(s) type
        value = {}
        let terminal = 0
        if ((view.getUint32(dataLen - 4) & 0x00FFFFFF) === 9) {
          terminal = 3
        }
        while (offset < dataLen - 4) { // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
          const { size, data, isEnd } = AMF._parseObject(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset - terminal))
          if (isEnd) break
          value[data.name] = data.value
          offset += size
        }
        if (offset <= dataLen - 3) {
          const marker = view.getUint32(offset - 1) & 0x00FFFFFF
          if (marker === 9) offset += 3
        }
      }
        break
      case 8: { // ECMA array type (Mixed array)
        value = {}
        offset += 4 // ECMAArrayLength(UI32)
        let terminal = 0 // workaround for malformed MixedArrays which has missing ScriptDataObjectEnd
        if ((view.getUint32(dataLen - 4) & 0x00FFFFFF) === 9) {
          terminal = 3
        }
        while (offset < dataLen - 8) { // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
          const { size, data, isEnd } = AMF._parseObject(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset - terminal))
          if (isEnd) break
          value[data.name] = data.value
          offset += size
        }
        if (offset <= dataLen - 3) {
          const marker = view.getUint32(offset - 1) & 0x00FFFFFF
          if (marker === 9) {
            offset += 3
          }
        }
      }
        break
      case 9: // ScriptDataObjectEnd
        value = undefined
        offset = 1
        isEnd = true
        break
      case 10: { // Strict array type
        value = []
        const strictArrayLength = view.getUint32(1)
        offset += 4
        for (let i = 0; i < strictArrayLength; i++) {
          const { data, size } = AMF._parseValue(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset))
          value.push(data)
          offset += size
        }
      }
        break
      case 11: { // Date type
        const timestamp = view.getFloat64(offset) + view.getInt16(offset + 8) * 60000
        value = new Date(timestamp)
        offset += 10
      }
        break
      case 12: { // Long string type
        const length = view.getUint32(1)
        offset += 4
        value = ''
        if (length > 0) {
          value = UTF8.decode(new Uint8Array(view.buffer, view.byteOffset + offset, length))
        }
        offset += length
      }
        break
      default:
        offset = dataLen
        break
    }

    return {
      data: value,
      size: offset,
      isEnd
    }
  }

  static _parseString (view) {
    const length = view.getUint16(0)
    let data = ''
    if (length > 0) {
      data = UTF8.decode(new Uint8Array(view.buffer, view.byteOffset + 2, length))
    }

    return {
      data,
      size: 2 + length
    }
  }

  static _parseObject (view) {
    if (view.byteLength < 3) return

    const name = AMF._parseString(view)
    const value = AMF._parseValue(new DataView(view.buffer, view.byteOffset + name.size, view.byteLength - name.size))

    return {
      data: {
        name: name.data,
        value: value.data
      },
      size: name.size + value.size,
      isEnd: value.isEnd
    }
  }
}
