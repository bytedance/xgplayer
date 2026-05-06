import {
  DEFAULT_CHROMECAST_SDK_URL,
  normalizeChromecastConfig,
  shouldInstallChromecast
} from '../src/platform/chromecast-config'

describe('normalizeChromecastConfig', () => {
  test('returns disabled config for false', () => {
    expect(normalizeChromecastConfig(false)).toEqual(
      expect.objectContaining({ enabled: false })
    )
  })

  test('supports legacy boolean true', () => {
    expect(normalizeChromecastConfig(true)).toEqual(
      expect.objectContaining({
        enabled: true,
        sdkUrl: DEFAULT_CHROMECAST_SDK_URL,
        sdkLoader: null
      })
    )
  })

  test('merges object config', () => {
    expect(
      normalizeChromecastConfig({
        sdkUrl: 'https://example.com/cast_sender.js',
        receiverApplicationId: 'APP_ID',
        autoJoinPolicy: 'origin_scoped',
        loadSdkTimeout: 5000
      })
    ).toEqual(
      expect.objectContaining({
        enabled: true,
        sdkUrl: 'https://example.com/cast_sender.js',
        receiverApplicationId: 'APP_ID',
        autoJoinPolicy: 'origin_scoped',
        loadSdkTimeout: 5000
      })
    )
  })

  test('uses default sdkUrl when object config does not provide one', () => {
    const config = normalizeChromecastConfig({ receiverApplicationId: 'APP_ID' })
    expect(config.sdkUrl).toBe(DEFAULT_CHROMECAST_SDK_URL)
  })
})

describe('shouldInstallChromecast', () => {
  test('returns false when config is disabled', () => {
    const player = { media: document.createElement('video') }
    expect(shouldInstallChromecast(player, { enabled: false })).toBe(false)
  })

  test('returns false when no media element', () => {
    expect(shouldInstallChromecast({}, { enabled: true, sdkUrl: 'https://example.com/sdk.js' })).toBe(false)
  })

  test('returns true when enabled and sdkUrl provided', () => {
    const player = { media: document.createElement('video') }
    expect(
      shouldInstallChromecast(player, { enabled: true, sdkUrl: 'https://example.com/sdk.js' })
    ).toBe(true)
  })
})
