export interface LogSource {
  origin?: string
  source: string
}

const MAX_SOURCE_LENGTH = 48

function truncate(value: string): string {
  if (value.length <= MAX_SOURCE_LENGTH) return value
  return `${value.slice(0, 24)}...${value.slice(-16)}`
}

export function getLogSource(url: string, vid?: string): LogSource {
  if (vid) return { source: truncate(vid) }
  if (!url) return { source: '-' }

  try {
    const parsed = new URL(url, 'http://localhost')
    const source = parsed.pathname.split('/').filter(Boolean).pop() || parsed.hostname
    const origin = parsed.origin === 'http://localhost' ? undefined : parsed.host
    return {
      source: truncate(source || url),
      ...(origin ? { origin } : {})
    }
  } catch {
    const source = url.split(/[?#]/)[0].split('/').filter(Boolean).pop() || url
    return { source: truncate(source) }
  }
}
