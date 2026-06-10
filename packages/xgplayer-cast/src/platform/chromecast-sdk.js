let sdkPromise = null

// Exported only for use in tests — do not call in production code
export function resetSdkPromise() {
  sdkPromise = null
}

function _verifySdkReady() {
  if (!window.cast?.framework || !window.chrome?.cast) {
    throw new Error('Chromecast sender sdk loaded but cast APIs are not ready')
  }
}

function _doLoad(config) {
  if (typeof config.sdkLoader === 'function') {
    return Promise.resolve(config.sdkLoader()).then(_verifySdkReady)
  }

  if (!config.sdkUrl) {
    return Promise.reject(new Error('Chromecast sdkUrl or sdkLoader is required'))
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const timer = setTimeout(() => {
      reject(new Error('Chromecast sender sdk load timeout'))
    }, config.loadSdkTimeout || 3000)

    // Preserve any existing __onGCastApiAvailable set by the host page
    const _prev = window.__onGCastApiAvailable
    window.__onGCastApiAvailable = (isAvailable) => {
      _prev?.(isAvailable)
      clearTimeout(timer)
      if (isAvailable) {
        resolve()
      } else {
        reject(new Error('Chromecast sender sdk unavailable'))
      }
    }

    script.src = config.sdkUrl
    script.async = true
    script.onerror = () => {
      clearTimeout(timer)
      reject(new Error('Chromecast sender sdk load error'))
    }

    document.head.appendChild(script)
  })
}

export function loadChromecastSdk(config) {
  if (sdkPromise) {
    return sdkPromise
  }

  if (
    typeof config.sdkLoader !== 'function' &&
    window.cast?.framework &&
    window.chrome?.cast
  ) {
    sdkPromise = Promise.resolve()
    return sdkPromise
  }

  // Wrap with failure-reset so failed loads can be retried
  sdkPromise = _doLoad(config).catch((error) => {
    sdkPromise = null
    throw error
  })

  return sdkPromise
}
