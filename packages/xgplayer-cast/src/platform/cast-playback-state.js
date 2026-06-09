export function isPlayerPaused(player) {
  if (typeof player?.paused === 'boolean') {
    return player.paused
  }

  const media = player?.media || player?.video
  if (typeof media?.paused === 'boolean') {
    return media.paused
  }

  return true
}

export function normalizeCastCurrentTime(value) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  const currentTime = Number(value)
  return Number.isFinite(currentTime) && currentTime >= 0 ? currentTime : null
}

export function getPlayerCurrentTime(player) {
  const media = player?.media || player?.video
  const candidates = [player?.currentTime, media?.currentTime]

  for (const value of candidates) {
    const currentTime = normalizeCastCurrentTime(value)
    if (currentTime !== null) {
      return currentTime
    }
  }

  return 0
}

export function captureCastPlaybackState(player, protocol) {
  return {
    protocol,
    paused: isPlayerPaused(player),
    currentTime: getPlayerCurrentTime(player)
  }
}

export function getConfiguredCastAutoplay(config) {
  return typeof config?.autoplayOnCast === 'boolean' ? config.autoplayOnCast : undefined
}
