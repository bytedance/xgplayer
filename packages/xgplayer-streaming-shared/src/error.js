export const ERR = {
  MANIFEST: 'manifest',
  NETWORK: 'network',
  NETWORK_TIMEOUT: 'network_timeout',
  NETWORK_FORBIDDEN:'network_forbidden',
  NETWROK_RANGE_NOT_SATISFIABLE:'network_range_not_satisfiable',
  DEMUX: 'demux',
  REMUX: 'remux',
  MEDIA: 'media',
  DRM: 'drm',
  OTHER: 'other',
  RUNTIME:'runtime',

  SUB_TYPES: {
    FLV: 'FLV',
    HLS: 'HLS',
    MP4: 'MP4',
    FMP4: 'FMP4',
    MSE_ADD_SB: 'MSE_ADD_SB',
    MSE_APPEND_BUFFER: 'MSE_APPEND_BUFFER',
    MSE_OTHER: 'MSE_OTHER',
    MSE_FULL: 'MSE_FULL',
    OPTION: 'OPTION',
    DASH:'DASH',
    LICENSE:'LICENSE',
    CUSTOM_LICENSE:'CUSTOM_LICENSE',
    MSE_HIJACK:'MSE_HIJACK',
    EME_HIJACK:'EME_HIJACK',
    SIDX:'SIDX',
    NO_CANPLAY_ERROR:'NO_CANPLAY_ERROR',
    BUFFERBREAK_ERROR:'BUFFERBREAK_ERROR',
    MEDIA_ERR_ABORTED:'MEDIA_ERR_ABORTED',
    MEDIA_ERR_NETWORK:'MEDIA_ERR_NETWORK',
    MEDIA_ERR_DECODE:'MEDIA_ERR_DECODE',
    MEDIA_ERR_SRC_NOT_SUPPORTED:'MEDIA_ERR_SRC_NOT_SUPPORTED',
    MEDIA_ERR_CODEC_NOT_SUPPORTED:'MEDIA_ERR_CODEC_NOT_SUPPORTED',
    MEDIA_ERR_URL_EMPTY:'MEDIA_ERR_URL_EMPTY'
  }
}

export const ERR_CODE = {
  [ERR.MANIFEST]: {
    HLS: 1100,
    DASH:1200
  },
  [ERR.NETWORK]: 2100,
  [ERR.NETWORK_TIMEOUT]: 2101,
  [ERR.NETWORK_FORBIDDEN]:2103,
  [ERR.NETWROK_RANGE_NOT_SATISFIABLE]:2116,
  [ERR.DEMUX]: {
    FLV: 3100,
    HLS: 3200,
    MP4: 3300,
    FMP4: 3400,
    SIDX: 3410
  },
  [ERR.REMUX]: {
    FMP4: 4100,
    MP4: 4200
  },
  [ERR.MEDIA]: {
    MEDIA_ERR_ABORTED: 5101,
    MEDIA_ERR_NETWORK: 5102,
    MEDIA_ERR_DECODE: 5103,
    MEDIA_ERR_SRC_NOT_SUPPORTED: 5104,
    MEDIA_ERR_CODEC_NOT_SUPPORTED: 5105,
    MEDIA_ERR_URL_EMPTY: 5106,
    MSE_ADD_SB: 5200,
    MSE_APPEND_BUFFER: 5201,
    MSE_OTHER: 5202,
    MSE_FULL: 5203,
    MSE_HIJACK:5204,
    EME_HIJACK:5301
  },
  [ERR.DRM]:{
    LICENSE:7100,
    CUSTOM_LICENSE:7200
  },
  [ERR.OTHER]: 8000,
  [ERR.RUNTIME]:{
    NO_CANPLAY_ERROR:9001,
    BUFFERBREAK_ERROR:9002
  }
}

export class StreamingError extends Error {
  constructor (type, subType, origin, payload, msg) {
    super(msg || origin?.message)
    this.errorType = type === ERR.NETWORK_TIMEOUT ? ERR.NETWORK : type
    this.originError = origin
    this.ext = payload
    this.errorCode = ERR_CODE[type][subType] || ERR_CODE[type]
    this.errorMessage = this.message
    if (!this.errorCode) {
      this.errorType = ERR.OTHER
      this.errorCode = ERR_CODE[this.errorType]
    }
  }

  static create (type, subType, origin, payload, msg) {
    if (type instanceof StreamingError) {
      return type
    } else if (type instanceof Error) {
      origin = type
      type = ''
    }

    if (!type) type = ERR.OTHER

    return new StreamingError(type, subType, origin, payload, msg)
  }

  static network (error) {
    return new StreamingError(
      error?.isTimeout ? ERR.NETWORK_TIMEOUT : ERR.NETWORK,
      null,
      error instanceof Error ? error : null,
      {
        url: error?.url,
        response: error?.response,
        httpCode: error?.response?.status
      }
    )
  }
}
