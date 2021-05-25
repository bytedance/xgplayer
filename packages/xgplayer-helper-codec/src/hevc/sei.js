import RBSP from './rbsp'

/**
 * @param {Uint8Array} data
 * @return {string}
 */
const u8aToString = (data) => {
  let result = ''
  for (let i = 0; i < data.byteLength; i++) {
    result += String.fromCharCode(data[i])
  }
  return result;
}

class SEIParser {
  static _resolveNalu (data) {
    if (data.length >= 1) {
      return RBSP.EBSP2SODB(RBSP.EBSP2RBSP(data.slice(1)))
    }
    return null;
  }

  /**
   * @param {Uint8Array} data
   * @return {{uuid: string, content: null}|{code: number, uuid: string, content: string}|{code: number, content: Uint8Array}}
   */
  static parse (data) {
    const sodb = SEIParser._resolveNalu(data);
    const {
      payloadType,
      offset
    } = SEIParser.switchPayloadType(sodb)

    const content = sodb.slice(offset)

    switch (payloadType) {
      case 5:
        return SEIParser.user_data_unregistered(content)
      default:
        return {
          code: payloadType,
          content
        }
    }
  }

  /**
   *
   * @param {Uint8Array} data
   * @returns {{payloadType: number, offset: number}}
   */
  static switchPayloadType (data) {
    const dv = new DataView(data.buffer)
    let payloadType = 0;
    let offset = 0;
    while (dv.getUint8(offset) === 255) {
      offset++
      payloadType += 255
    }
    payloadType += dv.getUint8(offset++);

    return {
      payloadType,
      offset
    }
  }

  /**
   *
   * @param {Uint8Array} data
   * @return {{ payloadLength: number, offset: number }}
   */
  static getPayloadLength (data) {
    const dv = new DataView(data.buffer)

    let payloadLength = 0;
    let offset = 0;
    while (dv.getUint8(offset) === 255) {
      offset++
      payloadLength += 255
    }
    payloadLength += dv.getUint8(offset++);

    return {
      payloadLength,
      offset
    }
  }

  /**
   * resolve 0x05 user data unregistered
   * @param {Uint8Array} data
   */
  // eslint-disable-next-line camelcase
  static user_data_unregistered (data) {
    const { payloadLength, offset } = SEIParser.getPayloadLength(data)
    if (payloadLength < 16) {
      return {
        uuid: '',
        content: null
      }
    }
    const payload = data.slice(offset)

    const uuid = u8aToString(payload.slice(0, 16));
    const content = u8aToString(payload.slice(16, payloadLength));

    return {
      code: 5, // for user data unregistered
      uuid,
      content
    }
  }
}
export default SEIParser;
