import { ERR, StreamingError } from '../src/error'

describe('StreamingError', () => {
  test('creates an other error from an Error instance', () => {
    const origin = new Error('failed')
    const error = StreamingError.create(origin)

    expect(error.errorType).toBe(ERR.OTHER)
    expect(error.errorCode).toBe(8000)
    expect(error.originError).toBe(origin)
    expect(error.message).toBe('failed')
  })

  test('maps subtype codes', () => {
    const error = new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_FULL)

    expect(error.errorType).toBe(ERR.MEDIA)
    expect(error.errorCode).toBe(5203)
  })

  test('wraps network metadata', () => {
    const origin = Object.assign(new Error('timeout'), {
      isTimeout: true,
      url: 'https://example.com/video',
      response: { status: 504 }
    })
    const error = StreamingError.network(origin)

    expect(error.errorType).toBe(ERR.NETWORK)
    expect(error.errorCode).toBe(2101)
    expect(error.ext).toEqual({
      url: origin.url,
      response: origin.response,
      httpCode: 504
    })
  })
})
