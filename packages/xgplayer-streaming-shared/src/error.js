export const ERR = {
  MANIFEST: 'manifest',
  NETWORK: 'network',
  NETWORK_TIMEOUT: 'network_timeout',
  DEMUX: 'demux',
  REMUX: 'remux',
  MEDIA: 'media',
  DRM: 'drm',
  OTHER: 'other',

  SUB_TYPES: {
    FLV: 'FLV',
    HLS: 'HLS',
    MP4: 'MP4',
    FMP4: 'FMP4',
    MSE_ADD_SB: 'MSE_ADD_SB',
    MSE_APPEND_BUFFER: 'MSE_APPEND_BUFFER',
    MSE_OTHER: 'MSE_OTHER',
    MSE_FULL: 'MSE_FULL',
    OPTION: 'OPTION'
  }
}

export const ERR_CODE = {
  [ERR.MANIFEST]: {
    HLS: 1100
  },
  [ERR.NETWORK]: 2100,
  [ERR.NETWORK_TIMEOUT]: 2101,
  [ERR.DEMUX]: {
    FLV: 3100,
    HLS: 3200,
    MP4: 3300,
    FMP4: 3400
  },
  [ERR.REMUX]: {
    FMP4: 4100,
    MP4: 4200
  },
  [ERR.MEDIA]: {
    MSE_ADD_SB: 5200,
    MSE_APPEND_BUFFER: 5201,
    MSE_OTHER: 5202,
    MSE_FULL: 5203
  },
  [ERR.OTHER]: 8000
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
