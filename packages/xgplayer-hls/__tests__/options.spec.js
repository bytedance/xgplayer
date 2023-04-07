import { getConfig } from '../src/hls/config'

describe('getOption', () => {

  test('default options', () => {
    const opts = getConfig()

    expect(opts.retryCount).toBe(3)
    expect(opts.retryDelay).toBe(1000)
    expect(opts.loadTimeout).toBe(10000)
    expect(opts.preloadTime).toBe(30)
    expect(opts.softDecode).toBe(false)
    expect(opts.bufferBehind).toBe(10)
    expect(opts.maxJumpDistance).toBe(3)
    expect(opts.startTime).toBe(0)
    expect(opts.fetchOptions).toBe(undefined)
    expect(opts.isLive).toBe(undefined)
  })

  test('override options', () => {
    const opts = getConfig({
      retryTimes: 1,
      retryDelay: undefined,
      softDecode: true,
      startTime: 0,
      url: 'xxx'
    })

    expect(opts.retryTimes).toBe(1)
    expect(opts.retryCount).toBe(3)
    expect(opts.retryDelay).toBe(undefined)
    expect(opts.loadTimeout).toBe(10000)
    expect(opts.preloadTime).toBe(30)
    expect(opts.softDecode).toBe(true)
    expect(opts.bufferBehind).toBe(10)
    expect(opts.maxJumpDistance).toBe(3)
    expect(opts.startTime).toBe(0)
    expect(opts.fetchOptions).toBe(undefined)
    expect(opts.isLive).toBe(undefined)
    expect(opts.url).toBe('xxx')
  })

})
