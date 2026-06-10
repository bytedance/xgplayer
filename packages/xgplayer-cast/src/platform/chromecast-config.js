export const DEFAULT_CHROMECAST_SDK_URL =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'

export function normalizeChromecastConfig(input) {
  if (input === false) {
    return {
      enabled: false,
      sdkUrl: '',
      sdkLoader: null,
      loadSdkTimeout: 3000,
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped'
    }
  }

  if (input === true || input == null) {
    return {
      enabled: true,
      sdkUrl: DEFAULT_CHROMECAST_SDK_URL,
      sdkLoader: null,
      loadSdkTimeout: 3000,
      receiverApplicationId: '',
      autoJoinPolicy: 'origin_scoped'
    }
  }

  return {
    enabled: input.enabled !== false,
    sdkUrl: input.sdkUrl || DEFAULT_CHROMECAST_SDK_URL,
    sdkLoader: typeof input.sdkLoader === 'function' ? input.sdkLoader : null,
    loadSdkTimeout:
      Number(input.loadSdkTimeout) > 0 ? Number(input.loadSdkTimeout) : 3000,
    receiverApplicationId: input.receiverApplicationId || '',
    autoJoinPolicy: input.autoJoinPolicy || 'origin_scoped'
  }
}

export function shouldInstallChromecast(player, config) {
  const media = player?.media || player?.video
  if (!media || !config?.enabled) {
    return false
  }

  return !!(
    window.cast?.framework ||
    window.chrome?.cast ||
    config.sdkUrl ||
    config.sdkLoader
  )
}
