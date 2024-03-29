// import { Errors } from 'xgplayer'
import version from './version'
import { ERR, ERR_CODE } from 'xgplayer-streaming-shared'
const ERROR_CODES = {
  416: ERR_CODE[ERR.NETWROK_RANGE_NOT_SATISFIABLE], // -499899
  403: ERR_CODE[ERR.NETWORK_FORBIDDEN], // -499897,
  404: ERR_CODE[ERR.NETWORK_NOTFOUND], // -499896,
  timeout: ERR_CODE[ERR.NETWORK_TIMEOUT], // -499895,
  '4xx': `${ERR_CODE[ERR.NETWORK] }4XX`,// -499894,
  '5xx': `${ERR_CODE[ERR.NETWORK] }5XX`,// -499893,
  networkError: ERR_CODE[ERR.NETWORK],// -499892,
  contentError: `${ERR_CODE[ERR.NETWORK] }contentError`,// -499891,
  mse: ERR_CODE[ERR.MEDIA][ERR.SUB_TYPES.MSE_OTHER], // -499971,
  mseOpen: ERR_CODE[ERR.MEDIA][ERR.SUB_TYPES.MSE_ADD_SB], // -499972,
  mseAppend: ERR_CODE[ERR.MEDIA][ERR.SUB_TYPES.MSE_APPEND_BUFFER], // -499973,
  mse_hijack: ERR_CODE[ERR.MEDIA][ERR.SUB_TYPES.MSE_HIJACK], // -499974,
  eme_hijack: ERR_CODE[ERR.MEDIA][ERR.SUB_TYPES.EME_HIJACK], // -499975,
  metaError: ERR_CODE[ERR.DEMUX][ERR.SUB_TYPES.MP4],// -499985,
  muxError: ERR_CODE[ERR.REMUX][ERR.SUB_TYPES.FMP4],// -499986,
  other: ERR_CODE[ERR.OTHER], // -499989,
  waitTimeout: ERR_CODE[ERR.RUNTIME][ERR.SUB_TYPES.BUFFERBREAK_ERROR],// -499791,
  waitTimeoutWithHidden : ERR_CODE[ERR.RUNTIME][ERR.SUB_TYPES.WAITING_TIMEOUT_ERROR],
  drm: ERR_CODE[ERR.DRM][ERR.SUB_TYPES.LICENSE]
}
const ERROR_TYPES = ERR

/**
 * 根据httpCode获取对应的错误码
 * @param { number} httpCode
 * @returns { number }
 */
function getErrorCodeByHttpCode (httpCode) {
  return ERROR_CODES[httpCode] || httpCode
}
class NetWorkError {
  constructor (type, httpCode, context) {
    let rangeStart = 0
    let rangeEnd = 0
    if (context && context.range && context.range.length > 1) {
      rangeStart = context.range[0]
      rangeEnd = context.range[1]
    }
    const _errCode = getErrorCodeByHttpCode(httpCode)
    return {
      errorCode: _errCode,
      errorType: type,
      // errorTypeCode: ERROR_TYPES[type],
      errorMessage: context?.httpText || context?.message,
      url: context?.url,
      httpCode,
      version,
      rangeStart,
      rangeEnd,
      ext: context,
      mediaError: {
        code: _errCode,
        message: context?.httpText || context?.message
      }
    }
  }
}

class ParserError {
  constructor (type, errorCode, ext) {
    return {
      errorCode,
      errorType: type,
      // errorTypeCode: ERROR_TYPES[type],
      version,
      errorMessage: ext.msg,
      ext,
      mediaError: {
        code: errorCode,
        message: ext.msg
      }
    }
  }
}

export {
  // Errors as default,
  NetWorkError,
  ParserError,
  ERROR_CODES,
  ERROR_TYPES,
  getErrorCodeByHttpCode
}
