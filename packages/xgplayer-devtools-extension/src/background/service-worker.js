/**
 * Background service worker — routes messages between content scripts (pages)
 * and devtools panels, keyed by tabId. MV3 module worker.
 */

/** tabId -> Set<Port> (panel connections) */
const panels = new Map()

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'player-devtools-panel') return
  let tabId = null

  port.onMessage.addListener((msg) => {
    if (msg && msg.type === 'init' && typeof msg.tabId === 'number') {
      tabId = msg.tabId
      if (!panels.has(tabId)) panels.set(tabId, new Set())
      panels.get(tabId).add(port)
      return
    }
    // Panel -> page: forward to the inspected tab's content scripts.
    if (msg && msg.type === 'to-page' && tabId != null) {
      chrome.tabs
        .sendMessage(tabId, { channel: 'to-page', data: msg.data })
        .catch(() => {})
    }
  })

  port.onDisconnect.addListener(() => {
    if (tabId != null && panels.has(tabId)) {
      panels.get(tabId).delete(port)
      if (!panels.get(tabId).size) panels.delete(tabId)
    }
  })
})

// Page -> panels: fan out to all panels inspecting that tab.
chrome.runtime.onMessage.addListener((req, sender) => {
  if (!req || req.channel !== 'from-page') return
  const tabId = sender.tab && sender.tab.id
  if (tabId == null) return
  const set = panels.get(tabId)
  if (!set) return
  for (const port of set) {
    try {
      port.postMessage({ channel: 'from-page', frameUrl: req.frameUrl, data: req.data })
    } catch {}
  }
})
