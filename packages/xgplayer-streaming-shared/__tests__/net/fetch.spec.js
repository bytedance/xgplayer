import { FetchLoader } from '../../src/net/fetch'
import { ResponseType } from '../../src/net/types'

const logger = {
  debug: jest.fn()
}

describe('FetchLoader', () => {
  const realFetch = global.fetch

  beforeEach(() => {
    logger.debug.mockClear()
  })

  afterEach(() => {
    global.fetch = realFetch
  })

  test('rejects range request when status is not 206 and response is not redirected', async () => {
    const arrayBuffer = jest.fn(async () => new ArrayBuffer(10))
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      redirected: false,
      url: 'https://example.com/video.mp4',
      headers: {
        get: jest.fn(() => '10')
      },
      arrayBuffer
    }))

    await expect(new FetchLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 0],
      responseType: ResponseType.ARRAY_BUFFER,
      rangeRequestMustReturn206: true
    })).rejects.toMatchObject({
      message: 'bad response,range request must return 206 unless redirected',
      response: {
        status: 200,
        redirected: false
      }
    })
    expect(arrayBuffer).not.toHaveBeenCalled()
  })

  test('allows range request when redirected', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 200,
      redirected: true,
      url: 'https://redirected.example.com/video.mp4',
      headers: {
        get: jest.fn(() => '10')
      },
      arrayBuffer: async () => new ArrayBuffer(10)
    }))

    const res = await new FetchLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 0],
      responseType: ResponseType.ARRAY_BUFFER,
      rangeRequestMustReturn206: true
    })

    expect(res.response.status).toBe(200)
    expect(res.response.url).toBe('https://redirected.example.com/video.mp4')
  })

  test('allows range request when status is 206', async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      status: 206,
      redirected: false,
      url: 'https://example.com/video.mp4',
      headers: {
        get: jest.fn(() => '10')
      },
      arrayBuffer: async () => new ArrayBuffer(10)
    }))

    const res = await new FetchLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 0],
      responseType: ResponseType.ARRAY_BUFFER,
      rangeRequestMustReturn206: true
    })

    expect(res.response.status).toBe(206)
  })
})
