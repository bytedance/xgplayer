export function parseBaseUrl (url) {
  const slashIndex = url.indexOf('/')
  const lastSlashIndex = url.lastIndexOf('/')

  if (slashIndex !== -1) {
    // if there is only '//'
    if (lastSlashIndex === slashIndex + 1) {
      return url
    }

    if (url.indexOf('?') !== -1) {
      url = url.substring(0, url.indexOf('?'))
    }

    return url.substring(0, lastSlashIndex + 1)
  }

  return ''
}
