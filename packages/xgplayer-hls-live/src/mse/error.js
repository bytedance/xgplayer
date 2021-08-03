
function createError (type, code, msg, originError) {
  return {
    type, code, msg, originError
  }
}

export class Err {
  static M3U8Parse (originError) {
    return createError(
      'm3u8-parse', 900, originError.message || 'm3u8 parse failed', originError
    )
  }
}
