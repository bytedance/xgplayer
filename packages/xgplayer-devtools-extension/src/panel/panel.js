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

  // Toolbar glyphs — icon-only buttons keep the top bar compact in narrow docks.
  const ICON = {
    record: '●',
    recording: '■',
    snapshot: '⤓',
    logger: '✎',
    clear: '🗑'
  }

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
    query: '',
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
    // Ask the always-on probe for the event history captured before this panel
    // connected (DevTools may be opened long after playback started).
    send('request-replay')
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
      case 'instances': {
        const prevSelected = state.selectedId
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
        // Periodic instance pushes must not rebuild the main view, or they would
        // wipe the Events list every ~1.5s (collapsing an expanded row, resetting
        // scroll). Only re-render when the selected instance actually changed.
        if (state.selectedId !== prevSelected) renderActive()
        renderStatus()
        break
      }
      case 'metrics':
        state.metrics[data.payload.playerId] = data.payload.metrics
        // Metrics feed Overview/Buffer/Media only; never re-render on the Events
        // tab, or the ~1s metrics tick would collapse any expanded row.
        if (data.payload.playerId === state.selectedId && state.activeTab !== 'timeline')
          renderActive()
        break
      case 'event':
        pushEvent(data.payload)
        break
      case 'replay':
        mergeReplay((data.payload && data.payload.events) || [])
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
    if (state.activeTab === 'timeline' && isCurrentInstance(evt))
      renderTimelineIncremental(evt)
    updateTabBadges()
  }

  // Merge the probe's pre-connection history (replay) into the live buffer.
  // De-dupe by ts+type+playerId so a reconnect — or replay overlapping with
  // live events already arriving — never double-counts. Sort by ts to keep the
  // timeline ordered, then do one full re-render (batched insert, unlike the
  // per-event incremental path).
  function mergeReplay(events) {
    if (!events.length) return
    const seen = new Set(state.events.map((e) => e.ts + '|' + e.type + '|' + e.playerId))
    let added = 0
    events.forEach((e) => {
      const key = e.ts + '|' + e.type + '|' + e.playerId
      if (seen.has(key)) return
      seen.add(key)
      state.events.push(e)
      added++
    })
    if (!added) return
    state.events.sort((a, b) => a.ts - b.ts)
    if (state.events.length > state.maxEvents)
      state.events.splice(0, state.events.length - state.maxEvents)
    if (state.activeTab === 'timeline') renderTimelineFull()
    updateTabBadges()
    renderStatus()
  }

  // Events are stored for every instance; views scope to the selected one so
  // switching instances shows only that instance's events (matching the other
  // per-instance tabs). Events without a playerId (global) are always shown.
  function isCurrentInstance(evt) {
    return evt.playerId == null || String(evt.playerId) === String(state.selectedId)
  }

  function currentEvents() {
    return state.events.filter(isCurrentInstance)
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
  // Relative gap to the previous event — the number debuggers actually read.
  const fmtDelta = (ms) =>
    ms < 1000 ? Math.round(ms) + 'ms' : (ms / 1000).toFixed(2) + 's'
  // Copy to clipboard with a brief inline confirmation on the trigger button.
  function copyText(text, btn) {
    try {
      navigator.clipboard.writeText(text)
      if (btn) {
        const prev = btn.textContent
        btn.textContent = t('copied')
        setTimeout(() => {
          btn.textContent = prev
        }, 1200)
      }
    } catch {
      /* clipboard unavailable */
    }
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
    const evts = currentEvents()
    const hasError = evts.some((e) => e.category === 'error')
    document.querySelectorAll('[data-badge]').forEach((b) => {
      if (b.dataset.badge === 'timeline') {
        b.textContent = evts.length || ''
        // Red-tint the count when the current instance has error events, so the
        // Events tab flags problems at a glance without opening the list.
        b.classList.toggle('error', hasError)
      } else {
        b.textContent = ''
        b.classList.remove('error')
      }
    })
  }

  function renderInstances() {
    const bar = $('#instanceBar')
    bar.innerHTML = ''
    if (!state.instances.length) {
      bar.appendChild(el('span', 'muted', t('noInstances')))
      return
    }
    // Single instance: a compact text line. Multiple: a dropdown so the top bar
    // stays one row high regardless of instance count (no horizontal scrolling).
    if (state.instances.length === 1) {
      const inst = state.instances[0]
      const line = el('div', 'inst-single' + (inst.active ? ' active' : ''))
      const url = (inst.overview && inst.overview.url) || ''
      line.innerHTML =
        '<span class="id">#' +
        esc(inst.id) +
        '</span>' +
        '<span class="url">' +
        esc(shortUrl(url)) +
        '</span>'
      bar.appendChild(line)
      return
    }
    const sel = el('select', 'inst-select')
    state.instances.forEach((inst) => {
      const url = (inst.overview && inst.overview.url) || ''
      const opt = el('option')
      opt.value = inst.id
      opt.textContent = (inst.active ? '● ' : '') + '#' + inst.id + ' · ' + shortUrl(url)
      if (inst.id === state.selectedId) opt.selected = true
      sel.appendChild(opt)
    })
    sel.onchange = (e) => selectInstance(e.target.value)
    bar.appendChild(sel)
  }

  function selectInstance(id) {
    state.selectedId = id
    send('select-instance', null, id)
    renderInstances()
    renderActive()
    renderStatus()
    updateTabBadges()
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
          String(currentEvents().length)
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
        c.appendChild(viewNetwork())
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
    const toolbar = el('div', 'evt-toolbar')
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
        renderTimelineRows()
      }
      filters.appendChild(lbl)
    })
    toolbar.appendChild(filters)
    const search = el('input', 'evt-search')
    search.type = 'search'
    search.placeholder = t('evtSearchPlaceholder')
    search.value = state.query
    // Re-filter rows only (not the whole shell) so the input keeps focus while typing.
    search.oninput = (e) => {
      state.query = e.target.value
      renderTimelineRows()
    }
    toolbar.appendChild(search)
    const collapse = el('button', 'btn evt-collapse', t('collapseAll'))
    collapse.onclick = () =>
      document.querySelectorAll('.evt-detail').forEach((d) => d.remove())
    toolbar.appendChild(collapse)
    wrap.appendChild(toolbar)
    const list = el('div', 'evt-list')
    list.id = 'evtList'
    wrap.appendChild(list)
    return wrap
  }

  // Current-instance events after category + text-query filtering.
  function filteredEvents() {
    const q = state.query.trim().toLowerCase()
    return currentEvents().filter((e) => {
      if (state.filters[e.category] === false) return false
      if (!q) return true
      const hay = (e.type + ' ' + JSON.stringify(e.data || '')).toLowerCase()
      return hay.indexOf(q) !== -1
    })
  }

  function renderTimelineFull() {
    const c = $('#content')
    c.innerHTML = ''
    c.appendChild(viewTimelineShell())
    renderTimelineRows()
  }

  // Rebuild only the row list (keeps the toolbar/search focus intact). Relative
  // time (+Δ) is computed against the previous visible row in this instance.
  function renderTimelineRows() {
    const list = $('#evtList')
    if (!list) return
    list.innerHTML = ''
    const rows = filteredEvents().slice(-800)
    let prevTs = null
    rows.forEach((e) => {
      list.appendChild(evtRow(e, prevTs))
      prevTs = e.ts
    })
    list.scrollTop = list.scrollHeight
  }

  function renderTimelineIncremental(e) {
    const list = $('#evtList')
    if (!list) return renderTimelineFull()
    if (!e || state.filters[e.category] === false) return
    const q = state.query.trim().toLowerCase()
    if (q) {
      const hay = (e.type + ' ' + JSON.stringify(e.data || '')).toLowerCase()
      if (hay.indexOf(q) === -1) return
    }
    const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40
    const prevTs = list.lastElementChild ? Number(list.lastElementChild.dataset.ts) : null
    list.appendChild(evtRow(e, prevTs))
    if (atBottom) list.scrollTop = list.scrollHeight
  }

  function evtRow(e, prevTs) {
    const row = el('div', 'evt-row')
    row.dataset.ts = e.ts
    // Timestamp + relative time (+Δ) form one grouped time cell (.evt-time), so
    // the delta reads as part of the timestamp and never overflows into category.
    const delta = prevTs != null ? '+' + fmtDelta(e.ts - prevTs) : ''
    row.innerHTML =
      '<span class="evt-time"><span class="t">' +
      fmtTime(e.ts) +
      '</span><span class="dt">' +
      delta +
      '</span></span>' +
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
      row.after(evtDetail(e))
    }
    return row
  }

  // Expandable JSON payload with a copy button (top-right).
  function evtDetail(e) {
    const d = el('div', 'evt-detail')
    const json = JSON.stringify(e.data, null, 2)
    const copy = el('button', 'copy-btn', t('copy'))
    copy.onclick = (ev) => {
      ev.stopPropagation()
      copyText(json, copy)
    }
    d.appendChild(copy)
    d.appendChild(el('pre', 'evt-detail-pre', esc(json)))
    return d
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
  // Under construction: the real fetch/xhr observation approach is undecided.
  // We intentionally do NOT show player "load*"/speed events here, as they are
  // not real requests and would misrepresent network activity.
  function viewNetwork() {
    const wrap = el('div')
    const card = el('div', 'card')
    card.appendChild(el('h3', null, t('netPendingTitle')))
    card.appendChild(el('div', 'muted', t('netPendingDesc')))
    wrap.appendChild(card)
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
    b.classList.toggle('recording', !!state.logs.enabled)
    b.title = t('loggerLabel', [state.logs.enabled ? t('on') : t('off')])
  }

  function toggleRecord() {
    state.recording = !state.recording
    const b = $('#btnRecord')
    b.classList.toggle('recording', state.recording)
    b.textContent = state.recording ? ICON.recording : ICON.record
    b.title = state.recording ? t('titleRecording') : t('titleRecord')
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

  // Fill the static toolbar icons + tooltips so markup stays language-neutral.
  // Buttons are icon-only (DevTools convention); the i18n label becomes the title.
  function localizeStatic() {
    const set = (sel, text, title) => {
      const n = $(sel)
      if (!n) return
      n.textContent = text
      if (title) n.title = title
    }
    set('#btnRecord', ICON.record, t('titleRecord'))
    set('#btnSnapshot', ICON.snapshot, t('titleSnapshot'))
    set('#btnLogger', ICON.logger, t('titleLogger'))
    set('#btnClear', ICON.clear, t('titleClear'))
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
