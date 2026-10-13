/**
 * Player DevTools panel (runs in the DevTools context).
 *
 * - Connects to the background worker via a long-lived port keyed by tabId.
 * - Receives instance/metrics/event/log/snapshot messages from the page probe.
 * - Renders tabbed views and sends commands (select/record/snapshot/logger).
 */
;(() => {
  const SRC_PANEL = 'player-devtools-panel'
  const PV = 1
  const tabId = chrome.devtools.inspectedWindow.tabId

  // Localized string lookup — follows the DevTools/browser UI language via
  // chrome.i18n (locales in _locales/*). Falls back to the key if missing.
  const t = (key, subs) => chrome.i18n.getMessage(key, subs) || key

  // ------------------------------------------------------------------- state
  const state = {
    instances: [],
    selectedId: null,
    metrics: {}, // playerId -> { core, hls, abr }
    logs: { enabled: null, debugLevel: null },
    events: [], // live ring buffer for the Timeline
    maxEvents: 5000,
    recording: false,
    activeTab: 'overview',
    filters: {
      playback: true,
      buffer: true,
      network: true,
      error: true,
      abr: true,
      other: true
    },
    selectedEvent: null
  }

  const TABS = [
    { id: 'overview', label: t('tabOverview') },
    { id: 'timeline', label: t('tabTimeline') },
    { id: 'buffer', label: t('tabBuffer') },
    { id: 'network', label: t('tabNetwork') },
    { id: 'media', label: t('tabMedia') },
    { id: 'logs', label: t('tabLogs') }
  ]

  // ------------------------------------------------------------------- port
  let port
  function connect() {
    port = chrome.runtime.connect({ name: 'player-devtools-panel' })
    port.postMessage({ type: 'init', tabId })
    port.onMessage.addListener((msg) => {
      if (msg && msg.channel === 'from-page') handlePageMessage(msg.data)
    })
    port.onDisconnect.addListener(() => {
      setTimeout(connect, 500)
    })
    send('ping')
  }

  function send(type, payload, playerId) {
    try {
      port.postMessage({
        type: 'to-page',
        data: {
          source: SRC_PANEL,
          v: PV,
          type,
          payload,
          playerId: playerId || state.selectedId
        }
      })
    } catch {
      /* port down; will reconnect */
    }
  }

  // ---------------------------------------------------------- page messages
  function handlePageMessage(data) {
    switch (data.type) {
      case 'instances':
        state.instances = data.payload.instances || []
        if (
          !state.selectedId ||
          !state.instances.find((i) => i.id === state.selectedId)
        ) {
          state.selectedId =
            data.payload.selectedId ||
            (state.instances[0] && state.instances[0].id) ||
            null
        }
        renderInstances()
        renderActive()
        renderStatus()
        break
      case 'metrics':
        state.metrics[data.payload.playerId] = data.payload.metrics
        if (data.payload.playerId === state.selectedId) renderActive()
        break
      case 'event':
        pushEvent(data.payload)
        break
      case 'logs':
        state.logs = data.payload || {}
        updateLoggerBtn()
        if (state.activeTab === 'logs') renderActive()
        break
      case 'snapshot':
        onSnapshot(data.payload)
        break
      case 'error':
        console.warn('[player-devtools] page error', data.payload)
        break
    }
  }

  function pushEvent(evt) {
    state.events.push(evt)
    if (state.events.length > state.maxEvents) state.events.shift()
    if (state.activeTab === 'timeline') renderTimelineIncremental()
    updateTabBadges()
  }

  // ----------------------------------------------------------------- render
  const $ = (sel) => document.querySelector(sel)
  const el = (tag, cls, html) => {
    const e = document.createElement(tag)
    if (cls) e.className = cls
    if (html != null) e.innerHTML = html
    return e
  }
  const esc = (s) =>
    String(s == null ? '' : s).replace(
      /[&<>]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]
    )
  const fmtTime = (ts) => {
    const d = new Date(ts)
    return (
      d.toLocaleTimeString('en-GB') + '.' + String(d.getMilliseconds()).padStart(3, '0')
    )
  }
  const num = (v, d) =>
    typeof v === 'number' && isFinite(v) ? v.toFixed(d == null ? 2 : d) : '—'

  function renderTabs() {
    const nav = $('#tabs')
    nav.innerHTML = ''
    TABS.forEach((t) => {
      const tab = el('div', 'tab' + (t.id === state.activeTab ? ' active' : ''))
      tab.dataset.tab = t.id
      tab.innerHTML =
        esc(t.label) + '<span class="badge" data-badge="' + t.id + '"></span>'
      tab.onclick = () => {
        state.activeTab = t.id
        renderTabs()
        renderActive()
      }
      nav.appendChild(tab)
    })
    updateTabBadges()
  }

  function updateTabBadges() {
    document.querySelectorAll('[data-badge]').forEach((b) => {
      if (b.dataset.badge === 'timeline') b.textContent = state.events.length || ''
      else b.textContent = ''
    })
  }

  function renderInstances() {
    const bar = $('#instanceBar')
    bar.innerHTML = ''
    if (!state.instances.length) {
      bar.appendChild(el('span', 'muted', t('noInstances')))
      return
    }
    state.instances.forEach((inst) => {
      const chip = el(
        'div',
        'inst-chip' +
          (inst.active ? ' active' : '') +
          (inst.id === state.selectedId ? ' selected' : '')
      )
      const url = (inst.overview && inst.overview.url) || ''
      chip.innerHTML =
        '<span>#' + esc(inst.id) + '</span><small>' + esc(shortUrl(url)) + '</small>'
      chip.onclick = () => {
        state.selectedId = inst.id
        send('select-instance', null, inst.id)
        renderInstances()
        renderActive()
      }
      bar.appendChild(chip)
    })
  }

  function shortUrl(u) {
    if (!u) return '(no url)'
    try {
      const x = new URL(u)
      return x.pathname.split('/').pop() || x.hostname
    } catch {
      return String(u).slice(0, 24)
    }
  }

  function renderStatus() {
    $('#statusbar').textContent = state.instances.length
      ? t('statusActive', [
          String(state.instances.length),
          String(state.selectedId || '-'),
          String(state.events.length)
        ])
      : t('statusWaiting')
  }

  function renderActive() {
    renderStatus()
    const c = $('#content')
    const m = state.metrics[state.selectedId] || {}
    switch (state.activeTab) {
      case 'overview':
        c.innerHTML = ''
        c.appendChild(viewOverview(m))
        break
      case 'timeline':
        renderTimelineFull()
        break
      case 'buffer':
        c.innerHTML = ''
        c.appendChild(viewBuffer(m))
        break
      case 'network':
        c.innerHTML = ''
        c.appendChild(viewNetwork(m))
        break
      case 'media':
        c.innerHTML = ''
        c.appendChild(viewMedia(m))
        break
      case 'logs':
        c.innerHTML = ''
        c.appendChild(viewLogs())
        break
    }
  }

  function kv(obj) {
    const dl = el('dl', 'kv')
    Object.keys(obj).forEach((k) => {
      dl.appendChild(el('dt', null, esc(k)))
      const v = obj[k]
      dl.appendChild(el('dd', null, esc(typeof v === 'object' ? JSON.stringify(v) : v)))
    })
    return dl
  }

  // ---- Overview
  function viewOverview(m) {
    const wrap = el('div')
    const core = m.core
    if (!core) {
      wrap.appendChild(el('div', 'empty', t('overviewEmpty')))
      return wrap
    }
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('playerState')))
    card.appendChild(
      kv({
        playerId: core.playerId,
        url: core.url,
        state: core.state,
        currentTime: num(core.currentTime),
        duration: num(core.duration),
        paused: core.paused,
        readyState: core.readyState,
        [t('resolution')]: (core.videoWidth || '?') + '×' + (core.videoHeight || '?'),
        playbackRate: core.playbackRate,
        volume: core.volume,
        muted: core.muted,
        error: core.error ? JSON.stringify(core.error) : '—'
      })
    )
    wrap.appendChild(card)
    if (core.config) {
      const cc = el('div', 'card')
      cc.appendChild(el('h3', null, 'config'))
      cc.appendChild(kv(flat(core.config)))
      wrap.appendChild(cc)
    }
    return wrap
  }

  function flat(obj) {
    const out = {}
    Object.keys(obj || {})
      .slice(0, 40)
      .forEach((k) => {
        const v = obj[k]
        out[k] = typeof v === 'object' && v ? JSON.stringify(v).slice(0, 80) : v
      })
    return out
  }

  // ---- Timeline
  function viewTimelineShell() {
    const wrap = el('div')
    const filters = el('div', 'evt-filters')
    Object.keys(state.filters).forEach((cat) => {
      const lbl = el('label')
      lbl.innerHTML =
        '<input type="checkbox" ' +
        (state.filters[cat] ? 'checked' : '') +
        '> <span class="cat-' +
        cat +
        '">' +
        cat +
        '</span>'
      lbl.querySelector('input').onchange = (e) => {
        state.filters[cat] = e.target.checked
        renderTimelineFull()
      }
      filters.appendChild(lbl)
    })
    wrap.appendChild(filters)
    const list = el('div', 'evt-list')
    list.id = 'evtList'
    wrap.appendChild(list)
    return wrap
  }

  function renderTimelineFull() {
    const c = $('#content')
    c.innerHTML = ''
    c.appendChild(viewTimelineShell())
    const list = $('#evtList')
    const rows = state.events.filter((e) => state.filters[e.category] !== false)
    rows.slice(-800).forEach((e) => list.appendChild(evtRow(e)))
    list.scrollTop = list.scrollHeight
  }

  function renderTimelineIncremental() {
    const list = $('#evtList')
    if (!list) return renderTimelineFull()
    const e = state.events[state.events.length - 1]
    if (state.filters[e.category] === false) return
    const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40
    list.appendChild(evtRow(e))
    if (atBottom) list.scrollTop = list.scrollHeight
  }

  function evtRow(e) {
    const row = el('div', 'evt-row')
    row.innerHTML =
      '<span class="t">' +
      fmtTime(e.ts) +
      '</span>' +
      '<span class="cat-' +
      e.category +
      '">' +
      esc(e.category) +
      '</span>' +
      '<span>' +
      esc(e.type) +
      '</span>'
    row.onclick = () => {
      const existing = row.nextElementSibling
      if (existing && existing.classList.contains('evt-detail')) {
        existing.remove()
        return
      }
      const d = el('div', 'evt-detail', esc(JSON.stringify(e.data, null, 2)))
      row.after(d)
    }
    return row
  }

  // ---- Buffer
  function viewBuffer(m) {
    const wrap = el('div')
    const core = m.core
    if (!core) {
      wrap.appendChild(el('div', 'empty', t('noData')))
      return wrap
    }
    const dur =
      core.duration ||
      (core.buffered.length ? core.buffered[core.buffered.length - 1].end : 1) ||
      1
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('bufferedCurrentTime')))
    const bar = el('div', 'timeline-bar')
    core.buffered.forEach((r) => {
      const seg = el('div', 'range')
      seg.style.left = (r.start / dur) * 100 + '%'
      seg.style.width = Math.max(0.5, ((r.end - r.start) / dur) * 100) + '%'
      bar.appendChild(seg)
    })
    const cur = el('div', 'cursor')
    cur.style.left = ((core.currentTime || 0) / dur) * 100 + '%'
    bar.appendChild(cur)
    card.appendChild(bar)
    card.appendChild(
      kv({
        duration: num(dur),
        currentTime: num(core.currentTime),
        [t('bufferedRanges')]:
          core.buffered
            .map((r) => '[' + num(r.start) + ',' + num(r.end) + ']')
            .join(' ') || '—'
      })
    )
    wrap.appendChild(card)
    if (m.hls && m.hls.bufferInfo) {
      const h = el('div', 'card')
      h.appendChild(el('h3', null, 'HLS bufferInfo'))
      h.appendChild(kv(flat(m.hls.bufferInfo)))
      wrap.appendChild(h)
    }
    return wrap
  }

  // ---- Network
  function viewNetwork(m) {
    const wrap = el('div')
    if (!m.hls) {
      wrap.appendChild(el('div', 'empty', t('notStream')))
      return wrap
    }
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('speedStreamInfo')))
    card.appendChild(
      kv({
        isLive: m.hls.isLive,
        speedInfo: m.hls.speedInfo ? JSON.stringify(m.hls.speedInfo) : '—',
        baseDts: m.hls.baseDts,
        stats: m.hls.stats ? JSON.stringify(m.hls.stats).slice(0, 200) : '—'
      })
    )
    wrap.appendChild(card)
    // recent network events table
    const netEvents = state.events
      .filter((e) => e.category === 'network')
      .slice(-50)
      .reverse()
    const t2 = el('div', 'card')
    t2.appendChild(el('h3', null, t('recentNetEvents')))
    if (!netEvents.length) t2.appendChild(el('div', 'muted', t('none')))
    else {
      const tbl = el(
        'table',
        'tbl',
        '<tr><th>' +
          esc(t('colTime')) +
          '</th><th>' +
          esc(t('colEvent')) +
          '</th><th>' +
          esc(t('colDetail')) +
          '</th></tr>'
      )
      netEvents.forEach((e) => {
        const tr = el(
          'tr',
          null,
          '<td>' +
            fmtTime(e.ts) +
            '</td><td>' +
            esc(e.type) +
            '</td><td>' +
            esc(JSON.stringify(e.data).slice(0, 120)) +
            '</td>'
        )
        tbl.appendChild(tr)
      })
      t2.appendChild(tbl)
    }
    wrap.appendChild(t2)
    return wrap
  }

  // ---- Media
  function viewMedia(m) {
    const wrap = el('div')
    const core = m.core
    if (!core) {
      wrap.appendChild(el('div', 'empty', t('noData')))
      return wrap
    }
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('mediaDecode')))
    card.appendChild(
      kv({
        [t('resolution')]: (core.videoWidth || '?') + '×' + (core.videoHeight || '?'),
        readyState: core.readyState,
        networkState: core.networkState,
        error: core.error ? JSON.stringify(core.error) : '—'
      })
    )
    wrap.appendChild(card)
    if (m.hls && m.hls.currentStream) {
      const s = el('div', 'card')
      s.appendChild(el('h3', null, 'currentStream'))
      s.appendChild(kv(flat(m.hls.currentStream)))
      wrap.appendChild(s)
    }
    if (m.abr) {
      const a = el('div', 'card')
      a.appendChild(el('h3', null, t('abrInternal')))
      a.appendChild(kv(flat(m.abr)))
      wrap.appendChild(a)
    }
    return wrap
  }

  // ---- Logs
  function viewLogs() {
    const wrap = el('div')
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('kernelLogs')))
    card.appendChild(
      kv({
        [t('loggerEnabled')]:
          state.logs.enabled == null ? t('unknownNotExposed') : state.logs.enabled,
        [t('debugLevelKey')]: state.logs.debugLevel == null ? '—' : state.logs.debugLevel
      })
    )
    const row = el('div')
    const b3 = el('button', 'btn', 'debug=3')
    b3.onclick = () => send('set-debug', { level: 3 })
    const b0 = el('button', 'btn', 'debug=0')
    b0.onclick = () => send('set-debug', { level: 0 })
    b3.style.marginRight = '6px'
    row.appendChild(b3)
    row.appendChild(b0)
    card.appendChild(row)
    wrap.appendChild(card)
    wrap.appendChild(el('div', 'muted', t('loggerHint')))
    return wrap
  }

  // ------------------------------------------------------- toolbar actions
  function updateLoggerBtn() {
    const b = $('#btnLogger')
    b.textContent = t('loggerLabel', [state.logs.enabled ? t('on') : t('off')])
  }

  function toggleRecord() {
    state.recording = !state.recording
    const b = $('#btnRecord')
    b.classList.toggle('recording', state.recording)
    b.textContent = state.recording ? t('btnRecording') : t('btnRecord')
    send(state.recording ? 'start-record' : 'stop-record')
  }

  function onSnapshot(payload) {
    const name =
      payload.kind === 'recording'
        ? 'player-recording-' + Date.now() + '.json'
        : 'player-snapshot-' + Date.now() + '.json'
    download(name, JSON.stringify(payload, null, 2))
  }

  function download(filename, text) {
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  // ---------------------------------------------------------------- bootstrap
  function bindToolbar() {
    $('#btnRecord').onclick = toggleRecord
    $('#btnSnapshot').onclick = () => send('request-snapshot')
    $('#btnLogger').onclick = () =>
      send('enable-logger', { enabled: !state.logs.enabled })
    $('#btnClear').onclick = () => {
      state.events = []
      renderActive()
      updateTabBadges()
    }
  }

  // Fill the static HTML labels so markup stays language-neutral.
  function localizeStatic() {
    const set = (sel, text, title) => {
      const n = $(sel)
      if (!n) return
      n.textContent = text
      if (title) n.title = title
    }
    set('#btnRecord', t('btnRecord'), t('titleRecord'))
    set('#btnSnapshot', t('btnSnapshot'), t('titleSnapshot'))
    set('#btnLogger', t('loggerLabel', [t('off')]), t('titleLogger'))
    set('#btnClear', t('btnClear'), t('titleClear'))
    set('#statusbar', t('statusWaiting'))
  }

  document.addEventListener('DOMContentLoaded', () => {
    localizeStatic()
    bindToolbar()
    renderTabs()
    renderInstances()
    renderActive()
    connect()
  })
})()
