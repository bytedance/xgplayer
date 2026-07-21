import { XhrLoader } from '../../src/net/xhr'
import { ResponseType } from '../../src/net/types'

const logger = {
  debug: jest.fn()
}

class MockXMLHttpRequest {
  static nextResponse = {}

  headers = {}
  readyState = 0
  status = 200
  statusText = 'OK'
  responseURL = 'https://example.com/video.mp4'
  response = new ArrayBuffer(0)
  responseType = ''
  aborted = false

  open (method, url) {
    this.method = method
    this.url = url
  }

  setRequestHeader (key, value) {
    this.headers[key] = value
  }

  getAllResponseHeaders () {
    return MockXMLHttpRequest.nextResponse.headers || ''
  }

  send () {
    Object.assign(this, MockXMLHttpRequest.nextResponse)
    this.readyState = 2
    this.onreadystatechange?.({ target: this })
    if (!this.aborted) {
      this.readyState = 4
      this.onload?.({ target: this })
    }
  }

  abort () {
    this.aborted = true
  }
}

describe('XhrLoader', () => {
  const RealXMLHttpRequest = global.XMLHttpRequest

  beforeEach(() => {
    global.XMLHttpRequest = MockXMLHttpRequest
    MockXMLHttpRequest.nextResponse = {}
    logger.debug.mockClear()
  })

  afterAll(() => {
    global.XMLHttpRequest = RealXMLHttpRequest
  })

  test('rejects range request when status is not 206 and response is not redirected', async () => {
    MockXMLHttpRequest.nextResponse = {
      status: 200,
      headers: 'content-length: 10',
      responseURL: 'https://example.com/video.mp4',
      response: new ArrayBuffer(10)
    }

    await expect(new XhrLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 0],
      responseType: ResponseType.ARRAY_BUFFER,
      rangeRequestMustReturn206: true
    })).rejects.toMatchObject({
      message: 'bad response,range request must return 206 unless redirected',
      response: {
        status: 200,
        url: 'https://example.com/video.mp4'
      }
    })
  })

  test('allows range request when redirected', async () => {
    MockXMLHttpRequest.nextResponse = {
      status: 200,
      headers: 'content-length: 10',
      responseURL: 'https://redirected.example.com/video.mp4',
      response: new ArrayBuffer(10)
    }

    const res = await new XhrLoader().load({
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
    MockXMLHttpRequest.nextResponse = {
      status: 206,
      headers: 'content-length: 10\r\ncontent-range: bytes 0-9/100',
      responseURL: 'https://example.com/video.mp4',
      response: new ArrayBuffer(10)
    }

    const res = await new XhrLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 0],
      responseType: ResponseType.ARRAY_BUFFER,
      rangeRequestMustReturn206: true
    })

    expect(res.response.status).toBe(206)
  })

  test('rejects range request when content-range and content-length do not match request range', async () => {
    MockXMLHttpRequest.nextResponse = {
      status: 206,
      headers: 'content-length: 10\r\ncontent-range: bytes 1-10/100',
      responseURL: 'https://example.com/video.mp4',
      response: new ArrayBuffer(10)
    }

    await expect(new XhrLoader().load({
      url: 'https://example.com/video.mp4',
      logger,
      range: [0, 9],
      responseType: ResponseType.ARRAY_BUFFER
    })).rejects.toMatchObject({
      message: 'bad response,response range start does not match request range',
      response: {
        status: 206,
        url: 'https://example.com/video.mp4'
      }
    })
  })
})
