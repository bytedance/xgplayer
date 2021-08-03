import { Errors } from 'xgplayer'

// 90 开头为 HLS LIVE 相关错误

function createError (type, code, msg, originError) {
  // type, currentTime, duration, networkState, readyState, src, currentSrc,
  //  ended, errd = { line: '', handle: '', msg: '', version: '' }, errorCode, mediaError
  return new Errors(
    type, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, { msg }, code, originError
  )
}

export class Err {
  static M3U8ParseError (originError) {
    return createError(
      'm3u8-parse', 900, originError.message || 'm3u8 parse failed', originError
    )
  }
}
