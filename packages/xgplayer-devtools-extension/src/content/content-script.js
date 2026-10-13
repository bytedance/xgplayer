/**
 * Content script (isolated world).
 *
 * 1. Injects inject.js into the page MAIN world at document_start.
 * 2. Bridges window.postMessage (page) <-> chrome.runtime (extension).
 */
;(() => {
  const SRC_INJECT = 'player-devtools-inject'
  const SRC_PANEL = 'player-devtools-panel'

  // --- inject MAIN-world probe -------------------------------------------
  try {
    const url = chrome.runtime.getURL('src/inject/inject.js')
    const s = document.createElement('script')
    s.src = url
    s.async = false
    ;(document.head || document.documentElement).appendChild(s)
    s.onload = () => s.remove()
  } catch (e) {
    console.warn('[player-devtools] inject failed', e)
  }

  // --- page -> extension --------------------------------------------------
  window.addEventListener('message', (ev) => {
    const msg = ev.data
    if (ev.source !== window || !msg || msg.source !== SRC_INJECT) return
    try {
      chrome.runtime.sendMessage({
        channel: 'from-page',
        frameUrl: location.href,
        data: msg
      })
    } catch {
      /* extension context invalidated (panel closed) */
    }
  })

  // --- extension -> page --------------------------------------------------
  chrome.runtime.onMessage.addListener((req) => {
    if (!req || req.channel !== 'to-page' || !req.data) return
    if (req.data.source !== SRC_PANEL) return
    window.postMessage(req.data, '*')
  })
})()
