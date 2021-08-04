function create (type, errorCode, originError, ext) {
  return {
    type,
    errorCode,
    msg: originError?.message,
    originError,
    ...ext
  }
}

export class Err {
  // Network
  static NETWORK (originError, url, httpCode, response) {
    return create('NETWORK', 600, originError, { url, httpCode, response })
  }

  static NETWORK_TIMEOUT (originError, url) {
    return create('NETWORK_TIMEOUT', 601, originError, { url })
  }

  static NETWORK_UNEXPECTED (originError, url) {
    return create('NETWORK_UNEXPECTED', 602, originError, { url })
  }

  static NETWORK_OTHER (originError, url) {
    return create('NETWORK_OTHER', 603, originError, { url })
  }

  // HLS
  static M3U8_PARSE (originError) {
    return create('M3U8_PARSE', 900, originError)
  }

  static M3U8_CONTENT (originError) {
    return create('M3U8_CONTENT', 901, originError)
  }

  // Demux
  static DEMUX (originError) {
    return create('DEMUX', 700, originError)
  }

  // Remux
  static REMUX (originError) {
    return create('REMUX', 800, originError)
  }

  // MSE
  static MSE (originError) {
    return create('MSE', 500, originError)
  }
}
