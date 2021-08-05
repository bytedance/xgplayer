function create (errorType, errorCode, originError, ext = {}) {
  return {
    errorType,
    errorCode,
    errorMessage: originError?.message,
    originError,
    ext
  }
}

export class Err {
  // Network
  static NETWORK (originError, url, httpCode, response) {
    return create('network', 600, originError, { url, httpCode, response })
  }

  static NETWORK_TIMEOUT (originError, url) {
    return create('network', 601, originError, { url })
  }

  static NETWORK_UNEXPECTED (originError, url) {
    return create('network', 602, originError, { url })
  }

  static NETWORK_OTHER (originError, url) {
    return create('network', 603, originError, { url })
  }

  // HLS
  static M3U8_PARSE (originError) {
    return create('hls', 900, originError)
  }

  static M3U8_CONTENT (originError) {
    return create('hls', 901, originError)
  }

  // Demux
  static DEMUX (originError) {
    return create('demux', 700, originError)
  }

  // Remux
  static REMUX (originError) {
    return create('remux', 800, originError)
  }

  // MSE
  static MSE (originError) {
    return create('mse', 1000, originError)
  }
}
