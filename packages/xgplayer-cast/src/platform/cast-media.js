function inferContentType(url) {
  if (/\.m3u8($|\?)/i.test(url)) return 'application/x-mpegURL'
  if (/\.mpd($|\?)/i.test(url)) return 'application/dash+xml'
  if (/\.mp4($|\?)/i.test(url)) return 'video/mp4'
  return 'video/mp4'
}

function validateUrl(url, label) {
  if (!url || typeof url !== 'string') {
    throw new Error(`Cast requires a string media URL (got ${label}: ${url})`)
  }
  if (/^blob:/i.test(url)) {
    throw new Error('Cast requires a network URL, got blob URL')
  }
  if (/^mediastream:/i.test(url)) {
    throw new Error('Cast requires a network URL, got mediastream URL')
  }
}

export function resolveCastMedia(player) {
  const candidate =
    player?.curDefinition?.url ||
    player?.url ||
    player?.config?.url

  validateUrl(candidate, 'candidate')

  const processedUrl =
    typeof player.preProcessUrl === 'function'
      ? player.preProcessUrl(candidate, { scene: 'cast', protocol: 'chromecast' })
      : { url: candidate }

  if (!processedUrl || typeof processedUrl.url !== 'string') {
    throw new Error(
      'Cast: preProcessUrl must return an object with a string url property'
    )
  }

  validateUrl(processedUrl.url, 'processed')

  return {
    url: processedUrl.url,
    contentType: inferContentType(processedUrl.url)
  }
}
