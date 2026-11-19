export const ERR = {
  MANIFEST: 'manifest',
  NETWORK: 'network',
  NETWORK_TIMEOUT: 'network_timeout',
  NETWORK_FORBIDDEN: 'network_forbidden',
  NETWORK_NOTFOUND: 'network_notfound',
  NETWROK_RANGE_NOT_SATISFIABLE: 'network_range_not_satisfiable',
  DEMUX: 'demux',
  REMUX: 'remux',
  MEDIA: 'media',
  DRM: 'drm',
  OTHER: 'other',
  RUNTIME: 'runtime',
  SUB_TYPES: {
    FLV: 'FLV',
    HLS: 'HLS',
    MP4: 'MP4',
    FMP4: 'FMP4',
    MSE_ADD_SB: 'MSE_ADD_SB',
    MSE_APPEND_BUFFER: 'MSE_APPEND_BUFFER',
    MSE_OTHER: 'MSE_OTHER',
    MSE_FULL: 'MSE_FULL',
    MSE_CHANGE_TYPE: 'MSE_CHANGE_TYPE',
    OPTION: 'OPTION',
    DASH: 'DASH',
    LICENSE: 'LICENSE',
    CUSTOM_LICENSE: 'CUSTOM_LICENSE',
    MSE_HIJACK: 'MSE_HIJACK',
    EME_HIJACK: 'EME_HIJACK',
    SIDX: 'SIDX',
    NO_CANPLAY_ERROR: 'NO_CANPLAY_ERROR',
    BUFFERBREAK_ERROR: 'BUFFERBREAK_ERROR',
    WAITING_TIMEOUT_ERROR: 'WAITING_TIMEOUT_ERROR',
    MEDIA_ERR_ABORTED: 'MEDIA_ERR_ABORTED',
    MEDIA_ERR_NETWORK: 'MEDIA_ERR_NETWORK',
    MEDIA_ERR_DECODE: 'MEDIA_ERR_DECODE',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
    MEDIA_ERR_CODEC_NOT_SUPPORTED: 'MEDIA_ERR_CODEC_NOT_SUPPORTED',
    MEDIA_ERR_URL_EMPTY: 'MEDIA_ERR_URL_EMPTY'
  }
} as const

export type StreamingErrorType = Exclude<
  (typeof ERR)[Exclude<keyof typeof ERR, 'SUB_TYPES'>],
  object
>

export type StreamingErrorSubType = (typeof ERR.SUB_TYPES)[keyof typeof ERR.SUB_TYPES]

export const ERR_CODE = {
  [ERR.MANIFEST]: {
    HLS: 1100,
    DASH: 1200
  },
  [ERR.NETWORK]: 2100,
  [ERR.NETWORK_TIMEOUT]: 2101,
  [ERR.NETWORK_FORBIDDEN]: 2103,
  [ERR.NETWORK_NOTFOUND]: 2104,
  [ERR.NETWROK_RANGE_NOT_SATISFIABLE]: 2116,
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
    MSE_HIJACK: 5204,
    MSE_CHANGE_TYPE: 5205,
    EME_HIJACK: 5301
  },
  [ERR.DRM]: {
    LICENSE: 7100,
    CUSTOM_LICENSE: 7200
  },
  [ERR.OTHER]: 8000,
  [ERR.RUNTIME]: {
    NO_CANPLAY_ERROR: 9001,
    BUFFERBREAK_ERROR: 9002,
    WAITING_TIMEOUT_ERROR: 9003
  }
} as const

type ErrorCodeMap = (typeof ERR_CODE)[StreamingErrorType]

interface NetworkErrorLike {
  isTimeout?: boolean
  url?: unknown
  response?: {
    status?: unknown
  }
}

export class StreamingError extends Error {
  errorType: StreamingErrorType
  originError: unknown
  ext: unknown
  errorCode: number
  errorMessage: string

  constructor(
    type: StreamingErrorType,
    subType: StreamingErrorSubType | null = null,
    origin: unknown = null,
    payload: unknown = null,
    message = ''
  ) {
    super(message || getErrorMessage(origin))
    this.errorType = type === ERR.NETWORK_TIMEOUT ? ERR.NETWORK : type
    this.originError = origin
    this.ext = payload
    this.errorCode = getErrorCode(type, subType)
    this.errorMessage = this.message
  }

  static create(
    type: unknown,
    subType: StreamingErrorSubType | null = null,
    origin: unknown = null,
    payload: unknown = null,
    message = ''
  ): StreamingError {
    if (type instanceof StreamingError) return type
    if (type instanceof Error) {
      return new StreamingError(ERR.OTHER, subType, type, payload, message)
    }
    return new StreamingError(
      isStreamingErrorType(type) ? type : ERR.OTHER,
      subType,
      origin,
      payload,
      message
    )
  }

  static network(error: unknown): StreamingError {
    const networkError = toNetworkError(error)
    return new StreamingError(
      networkError.isTimeout ? ERR.NETWORK_TIMEOUT : ERR.NETWORK,
      null,
      error instanceof Error ? error : null,
      {
        url: networkError.url,
        response: networkError.response,
        httpCode: networkError.response?.status
      }
    )
  }
}

function getErrorCode(
  type: StreamingErrorType,
  subType: StreamingErrorSubType | null
): number {
  const code: ErrorCodeMap = ERR_CODE[type]
  if (typeof code === 'number') return code
  if (subType && subType in code) {
    return (
      (code as Partial<Record<StreamingErrorSubType, number>>)[subType] ||
      ERR_CODE[ERR.OTHER]
    )
  }
  return ERR_CODE[ERR.OTHER]
}

function isStreamingErrorType(value: unknown): value is StreamingErrorType {
  return typeof value === 'string' && value in ERR_CODE
}

function getErrorMessage(origin: unknown): string | undefined {
  if (!origin || typeof origin !== 'object' || !('message' in origin)) return
  const message = origin.message
  return typeof message === 'string' ? message : undefined
}

function toNetworkError(error: unknown): NetworkErrorLike {
  return error && typeof error === 'object' ? (error as NetworkErrorLike) : {}
}
