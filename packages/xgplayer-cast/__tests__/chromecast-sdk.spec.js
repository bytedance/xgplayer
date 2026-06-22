import { loadChromecastSdk, resetSdkPromise } from '../src/platform/chromecast-sdk'

describe('loadChromecastSdk', () => {
  beforeEach(() => {
    // MUST reset module-level singleton to prevent test cross-contamination
    resetSdkPromise()
    document.head.innerHTML = ''
    delete window.__onGCastApiAvailable
    delete window.cast
    delete window.chrome
  })

  test('rejects when no sdkUrl and no sdkLoader', async () => {
    await expect(
      loadChromecastSdk({ sdkUrl: '', sdkLoader: null, loadSdkTimeout: 10 })
    ).rejects.toThrow('Chromecast sdkUrl or sdkLoader is required')
  })

  test('appends script tag and resolves when __onGCastApiAvailable(true)', async () => {
    const promise = loadChromecastSdk({
      sdkUrl: 'https://example.com/cast_sender.js',
      sdkLoader: null,
      loadSdkTimeout: 1000
    })

    const script = document.head.querySelector('script')
    expect(script).not.toBeNull()
    expect(script.src).toBe('https://example.com/cast_sender.js')

    window.__onGCastApiAvailable(true)
    await expect(promise).resolves.toBeUndefined()
  })

  test('rejects when __onGCastApiAvailable(false)', async () => {
    const promise = loadChromecastSdk({
      sdkUrl: 'https://example.com/cast_sender.js',
      sdkLoader: null,
      loadSdkTimeout: 1000
    })

    window.__onGCastApiAvailable(false)
    await expect(promise).rejects.toThrow('Chromecast sender sdk unavailable')
  })

  test('uses sdkLoader when provided and verifies SDK readiness', async () => {
    window.cast = { framework: {} }
    window.chrome = { cast: {} }

    const sdkLoader = jest.fn().mockResolvedValue(undefined)
    await expect(
      loadChromecastSdk({ sdkUrl: '', sdkLoader, loadSdkTimeout: 1000 })
    ).resolves.toBeUndefined()
    expect(sdkLoader).toHaveBeenCalled()
  })

  test('sdkLoader rejects if SDK not ready after loader resolves', async () => {
    // sdkLoader resolves but window.cast/chrome.cast are still absent
    const sdkLoader = jest.fn().mockResolvedValue(undefined)
    await expect(
      loadChromecastSdk({ sdkUrl: '', sdkLoader, loadSdkTimeout: 1000 })
    ).rejects.toThrow('cast APIs are not ready')
  })

  test('failure resets singleton so it can be retried', async () => {
    const promise1 = loadChromecastSdk({ sdkUrl: '', sdkLoader: null, loadSdkTimeout: 10 })
    await expect(promise1).rejects.toThrow()

    // After failure, singleton should be null — retry should work
    window.cast = { framework: {} }
    window.chrome = { cast: {} }
    const promise2 = loadChromecastSdk({ sdkUrl: '', sdkLoader: null, loadSdkTimeout: 10 })
    await expect(promise2).resolves.toBeUndefined()
  })

  test('resolves immediately when SDK already loaded', async () => {
    window.cast = { framework: {} }
    window.chrome = { cast: {} }
    await expect(
      loadChromecastSdk({ sdkUrl: 'https://example.com/cast_sender.js', sdkLoader: null, loadSdkTimeout: 1000 })
    ).resolves.toBeUndefined()
    // No script tag should be added since SDK was already present
    expect(document.head.querySelector('script')).toBeNull()
  })

  test('preserves existing __onGCastApiAvailable callback', async () => {
    const existingCallback = jest.fn()
    window.__onGCastApiAvailable = existingCallback

    const promise = loadChromecastSdk({
      sdkUrl: 'https://example.com/cast_sender.js',
      sdkLoader: null,
      loadSdkTimeout: 1000
    })

    window.__onGCastApiAvailable(true)
    await promise

    expect(existingCallback).toHaveBeenCalledWith(true)
  })
})
