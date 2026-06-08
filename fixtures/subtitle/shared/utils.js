const UNSAFE_DEMO_SELECTOR = [
  'xg-text-track img',
  'xg-text-track script',
  'xg-text-track svg',
  'xg-text-track [onerror]',
  'xg-text-track [onload]',
  '.timeline-list img',
  '.timeline-list script',
  '.timeline-list svg',
  '.timeline-list [onerror]',
  '.timeline-list [onload]'
].join(', ')

export function getMedia (player) {
  return player && (player.media || player.video)
}

export function formatTime (time) {
  if (!Number.isFinite(time)) {
    return '00:00'
  }
  const minute = Math.floor(time / 60)
  const second = Math.floor(time % 60)
  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

export function decodeSubtitleText (text) {
  if (text === null || text === undefined) {
    return ''
  }
  return String(text)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, '\'')
    .replace(/&amp;/g, '&')
}

export function formatCueText (text = []) {
  const lines = Array.isArray(text) ? text : [text]
  return lines
    .map(item => decodeSubtitleText(item).replace(/(?:\\[nN]|\r\n|\r|\n)+/g, '\n').trim())
    .filter(Boolean)
    .join('\n')
}

export function getUnsafeDemoNodeCount () {
  return document.querySelectorAll(UNSAFE_DEMO_SELECTOR).length
}
