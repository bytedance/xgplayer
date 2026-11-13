/**
 * Content script (isolated world).
 *
 * Bridges window.postMessage (page) <-> chrome.runtime (extension).
 * The MAIN-world probe (inject.js) is now a declarative content script
 * (manifest `world: "MAIN"`, document_start), so it runs synchronously before
 * page scripts — no manual <script> injection and no fetch gap.
 */
;(() => {
  const SRC_INJECT = 'player-devtools-inject'
  const SRC_PANEL = 'player-devtools-panel'
  const PAGE_ORIGIN = window.location.origin

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
    if (!PAGE_ORIGIN || PAGE_ORIGIN === 'null') return
    window.postMessage(req.data, PAGE_ORIGIN)
  })
})()
