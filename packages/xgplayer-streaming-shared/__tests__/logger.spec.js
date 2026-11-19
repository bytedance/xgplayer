import { LogCacheLevel, Logger } from '../src/logger'

describe('Logger', () => {
  afterEach(() => {
    Logger.disable()
  })

  test('uses default cache settings', () => {
    const logger = new Logger('test')

    expect(logger.logCacheLevel).toBe(LogCacheLevel.WARN)
    expect(logger.logMaxSize).toBe(200 * 1024)
  })

  test('caches and resets serializable logs', () => {
    const logger = new Logger('test', {
      logCacheLevel: LogCacheLevel.DEBUG
    })

    logger.logCache(LogCacheLevel.LOG, { value: 1 })
    const cache = logger.getLogCache()

    expect(cache).toContain('[test]')
    expect(cache).toContain('"value":1')
    expect(logger.getLogCache()).toBe('')
  })
})
