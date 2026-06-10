import type { CastPlayer, CastRouteState } from '../types'

export function isLocalPaused(player: CastPlayer) {
  if (typeof player?.paused === 'boolean') {
    return player.paused
  }

  const media = player?.media || player?.video
  if (typeof media?.paused === 'boolean') {
    return media.paused
  }

  return true
}

export function toNonNegativeTime(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  const currentTime = Number(value)
  return Number.isFinite(currentTime) && currentTime >= 0 ? currentTime : null
}

export function getLocalTime(player: CastPlayer) {
  const currentTime = getLocalTimeOrNull(player)
  return currentTime !== null ? currentTime : 0
}

export function getLocalTimeOrNull(player: CastPlayer) {
  const media = player?.media || player?.video
  const candidates = [player?.currentTime, media?.currentTime]

  for (const value of candidates) {
    const currentTime = toNonNegativeTime(value)
    if (currentTime !== null) {
      return currentTime
    }
  }

  return null
}

export function captureLocalStateForCast(
  player: CastPlayer,
  protocol?: string
): CastRouteState {
  return {
    protocol,
    paused: isLocalPaused(player),
    currentTime: getLocalTime(player)
  }
}

export function seekLocalToTime(player: CastPlayer, currentTime: unknown) {
  const resolvedCurrentTime = toNonNegativeTime(currentTime)
  if (resolvedCurrentTime === null) {
    return false
  }

  const media = player?.media || player?.video
  try {
    if (player && player.currentTime !== undefined) {
      player.currentTime = resolvedCurrentTime
      return true
    }
    if (media) {
      media.currentTime = resolvedCurrentTime
      return true
    }
  } catch {
    return false
  }

  return false
}

export async function applyRouteStateToLocal(
  player: CastPlayer,
  routeState: CastRouteState | null
) {
  if (!routeState) {
    return false
  }

  seekLocalToTime(player, routeState.currentTime)

  if (routeState.paused) {
    player?.pause?.()
    return true
  }

  try {
    await player?.play?.()
  } catch (error) {
    if (error?.name !== 'AbortError') {
      throw error
    }
  }
  return true
}

export function getConfiguredCastAutoplay(config: CastPlayer) {
  return typeof config?.autoplayOnCast === 'boolean' ? config.autoplayOnCast : undefined
}
