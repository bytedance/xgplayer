import type { AnyRecord, CastMediaInfo, CastPlayer } from '../types'

const CONTENT_TYPE_ALIASES = {
  hls: 'application/x-mpegURL',
  m3u8: 'application/x-mpegURL',
  mpd: 'application/dash+xml',
  dash: 'application/dash+xml',
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  fmp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'video/ogg',
  ogv: 'video/ogg',
  mp2t: 'video/mp2t',
  ts: 'video/mp2t',
  m4a: 'audio/mp4',
  aac: 'audio/aac',
  mp3: 'audio/mpeg',
  mpa: 'audio/mpeg',
  wav: 'audio/wav',
  flac: 'audio/flac'
}

const MEDIA_INFO_FIELDS = [
  'contentUrl',
  'streamType',
  'duration',
  'metadata',
  'customData',
  'hlsSegmentFormat',
  'hlsVideoSegmentFormat'
]

function normalizeContentType(value: unknown) {
  if (typeof value !== 'string') {
    return null
  }

  const contentType = value.trim()
  if (!contentType) {
    return null
  }

  const lower = contentType.toLowerCase()
  if (lower.includes('/')) {
    return contentType
  }

  return CONTENT_TYPE_ALIASES[lower.replace(/^\./, '')] || null
}

function inferContentType(url: string) {
  const path = `${url}`.split(/[?#]/)[0]
  const ext = path.match(/\.([^./]+)$/)?.[1]
  return normalizeContentType(ext) || 'video/mp4'
}

function validateUrl(url: unknown, label: string) {
  if (!url || typeof url !== 'string') {
    throw new Error(`Cast requires a string media URL (got ${label}: ${url})`)
  }
  if (/^blob:/i.test(url)) {
    throw new Error('Cast requires a network URL, got blob URL')
  }
  if (/^mediastream:/i.test(url)) {
    throw new Error('Cast requires a network URL, got mediastream URL')
  }
  if (/^data:/i.test(url)) {
    throw new Error('Cast requires a network URL, got data URL')
  }
  if (/^file:/i.test(url)) {
    throw new Error('Cast requires a network URL, got file URL')
  }
}

function isNetworkUrl(url: unknown) {
  return (
    typeof url === 'string' &&
    !!url &&
    !/^blob:/i.test(url) &&
    !/^mediastream:/i.test(url) &&
    !/^data:/i.test(url) &&
    !/^file:/i.test(url)
  )
}

function pickContentType(...sources: AnyRecord[]) {
  for (const source of sources) {
    const contentType =
      normalizeContentType(source?.contentType) ||
      normalizeContentType(source?.mimeType) ||
      normalizeContentType(source?.type)
    if (contentType) {
      return contentType
    }
  }
  return null
}

function pickField(field: string, ...sources: AnyRecord[]) {
  for (const source of sources) {
    if (source && typeof source === 'object' && source[field] !== undefined) {
      return source[field]
    }
  }
}

function pickMediaInfoFields(...sources: AnyRecord[]) {
  return MEDIA_INFO_FIELDS.reduce((result, field) => {
    const value = pickField(field, ...sources)
    if (value !== undefined) {
      result[field] = value
    }
    return result
  }, {})
}

function toSourceCandidate(source: unknown, metadata: AnyRecord = {}) {
  if (!source) {
    return []
  }

  if (Array.isArray(source)) {
    return source.reduce(
      (result, item) => result.concat(toSourceCandidate(item, metadata)),
      []
    )
  }

  if (typeof source === 'string') {
    return [
      {
        url: source,
        contentType: pickContentType(metadata),
        source: metadata
      }
    ]
  }

  if (typeof source === 'object') {
    const sourceObject = source as AnyRecord
    const url = sourceObject.src || sourceObject.url
    return [
      {
        url,
        contentType: pickContentType(sourceObject, metadata),
        source: sourceObject
      }
    ]
  }

  return [{ url: source, contentType: pickContentType(metadata), source: metadata }]
}

function getMediaElementCandidates(player: CastPlayer) {
  const media = player?.media || player?.video
  if (!media) {
    return []
  }

  const sourceEls = Array.from(
    media.querySelectorAll?.('source') || []
  ) as HTMLSourceElement[]
  const candidates = sourceEls.map((source) => ({
    url: source.getAttribute('src') || source.src,
    contentType: normalizeContentType(source.getAttribute('type') || source.type),
    source
  }))

  const mediaUrl = media.currentSrc || media.src
  if (mediaUrl) {
    candidates.push({
      url: mediaUrl,
      contentType: normalizeContentType(media.getAttribute?.('type')),
      source: media
    })
  }

  return candidates
}

function resolveCandidateUrl(player: CastPlayer) {
  const candidates = [
    ...toSourceCandidate(player?.curDefinition?.url, player?.curDefinition),
    ...toSourceCandidate(player?.url),
    ...toSourceCandidate(player?.config?.url, player?.config),
    ...getMediaElementCandidates(player)
  ]
  const networkCandidate = candidates.find((candidate) => isNetworkUrl(candidate.url))
  if (networkCandidate) {
    return networkCandidate
  }

  return candidates.find((candidate) => !!candidate.url) || { url: null }
}

export function resolveCastMedia(
  player: CastPlayer,
  { protocol = 'chromecast' }: { protocol?: string } = {}
): CastMediaInfo {
  const candidate = resolveCandidateUrl(player)
  const candidateUrl = candidate?.url

  validateUrl(candidateUrl, 'candidate')

  const processedUrl =
    typeof player.preProcessUrl === 'function'
      ? player.preProcessUrl(candidateUrl, {
          scene: 'cast',
          protocol,
          contentType: candidate.contentType || undefined
        })
      : { url: candidateUrl }

  if (!processedUrl || typeof processedUrl.url !== 'string') {
    throw new Error(
      'Cast: preProcessUrl must return an object with a string url property'
    )
  }

  validateUrl(processedUrl.url, 'processed')
  const mediaInfoFields = pickMediaInfoFields(
    processedUrl,
    candidate,
    candidate.source,
    player?.config
  )

  return {
    url: processedUrl.url,
    contentType:
      pickContentType(processedUrl, candidate, candidate.source, player?.config) ||
      inferContentType(processedUrl.url),
    ...mediaInfoFields
  }
}
