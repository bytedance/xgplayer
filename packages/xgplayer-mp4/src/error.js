// import { Errors } from 'xgplayer'
import version from './version'
const ERROR_CODES = {
  416: -499899,
  401: -499898,
  403: -499897,
  404: -499896,
  timeout: -499895,
  '4xx': -499894,
  '5xx': -499893,
  networkError: -499892,
  contentError: -499891,
  mse: -499971,
  mseOpen: -499972,
  mseAppend: -499973,
  boxsError: -499980, // 盒子解析失败
  moovError: -499981, // moov获取失败
  notH264: -499982,
  mdatError: -499983,
  mdhdError: -499984,
  metaError: -499985,
  muxError: -499986,
  h265Error:-499987,
  noneURL: -499988, // 视频播放地址为空
  other: -499989,
  other1: -499990,
  waitTimeout: -499791,
  onWaitInBufferRange: -499792
}

const ERROR_TYPES = {
  network: 1003,
  format: 1005,
  runtime: 1002,
  other: 9999,
  demux: 1006,
  remux: 1007
}

class NetWorkError {
  constructor (type, httpCode, context) {
    let rangeStart = 0
    let rangeEnd = 0
    if (context && context.range && context.range.length > 1) {
      rangeStart = context.range[0]
      rangeEnd = context.range[1]
    }
    return {
      errorCode: httpCode,
      errorType: type,
      errorTypeCode: ERROR_TYPES[type],
      errorMessage: context?.httpText || context?.message,
      url: context?.url,
      httpCode,
      version,
      rangeStart,
      rangeEnd,
      ext: context,
      mediaError: {
        code: httpCode,
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
      errorTypeCode: ERROR_TYPES[type],
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
  ERROR_TYPES
}
