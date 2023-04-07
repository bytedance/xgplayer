import { getOption } from '../src/flv/options'

describe('getOption', () => {

  test('default options', () => {
    const opts = getOption()

    expect(opts.retryCount).toBe(3)
    expect(opts.retryDelay).toBe(1000)
    expect(opts.loadTimeout).toBe(10000)
    expect(opts.maxReaderInterval).toBe(5000)
    expect(opts.preloadTime).toBe(5)
    expect(opts.softDecode).toBe(false)
    expect(opts.bufferBehind).toBe(10)
    expect(opts.maxJumpDistance).toBe(3)
    expect(opts.analyzeDuration).toBe(20000)
    expect(opts.fetchOptions).toBe(undefined)
    expect(opts.disconnectTime).toBe(undefined)
    expect(opts.isLive).toBe(false)
    expect(opts.seamlesslyReload).toBe(false)
  })

  test('override options', () => {
    const opts = getOption({
      isLive: true,
      retryCount: 1,
      retryDelay: undefined,
      softDecode: true,
      url: 'xxx',
      analyzeDuration: 500
    })

    expect(opts.retryCount).toBe(1)
    expect(opts.retryDelay).toBe(undefined)
    expect(opts.loadTimeout).toBe(10000)
    expect(opts.maxReaderInterval).toBe(5000)
    expect(opts.preloadTime).toBe(5)
    expect(opts.softDecode).toBe(true)
    expect(opts.bufferBehind).toBe(10)
    expect(opts.maxLatency).toBe(10)
    expect(opts.disconnectTime).toBe(10)
    expect(opts.analyzeDuration).toBe(500)
    expect(opts.maxJumpDistance).toBe(3)
    expect(opts.fetchOptions).toBe(undefined)
    expect(opts.isLive).toBe(true)
    expect(opts.url).toBe('xxx')
  })

})
