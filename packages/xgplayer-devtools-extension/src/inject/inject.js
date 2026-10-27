/**
 * Player DevTools — MAIN world probe (self-contained, no module imports).
 *
 * Injected into the page's MAIN world so it can access the real `Player`,
 * `InstManager` and live player/stream instances. Communicates with the
 * content script via window.postMessage.
 *
 * Sections: constants · serialize · discovery · probes · recorder · bridge.
 */
;(() => {
  if (window.__PLAYER_DEVTOOLS__) return
  window.__PLAYER_DEVTOOLS__ = { version: '0.1.0' }

  // ---------------------------------------------------------------- constants
  const PV = 1
  const SRC_INJECT = 'player-devtools-inject'
  const SRC_PANEL = 'player-devtools-panel'
  const OUT = {
    INSTANCES: 'instances',
    EVENT: 'event',
    REPLAY: 'replay',
    METRICS: 'metrics',
    LOGS: 'logs',
    SNAPSHOT: 'snapshot',
    ERROR: 'error'
  }
  const IN = {
    SELECT_INSTANCE: 'select-instance',
    SET_DEBUG: 'set-debug',
    ENABLE_LOGGER: 'enable-logger',
    START_RECORD: 'start-record',
    STOP_RECORD: 'stop-record',
    REQUEST_SNAPSHOT: 'request-snapshot',
    REQUEST_REPLAY: 'request-replay',
    HIGHLIGHT_INSTANCE: 'highlight-instance',
    INVOKE: 'invoke',
    PING: 'ping'
  }
  const INVOKE_WHITELIST = ['play', 'pause', 'seek', 'switchURL', 'reload', 'destroy']
  const HIGH_FREQ = ['timeupdate', 'progress', 'core.speed', 'real_time_speed']
  const MSE_DISCOVERY_EVENTS = [
    'loadedmetadata',
    'progress',
    'canplay',
    'mseAttaching',
    'mseAttached',
    'dashready',
    'playertypechange',
    'dashStateChange'
  ]
  const MSE_REBIND_EVENTS = [
    'mseAttaching',
    'mseAttached',
    'dashready',
    'playertypechange'
  ]
  const PLAYER_ID_ATTR = 'data-xgplayerid'
  // Debug beacon contract — must match InstManager in the player source.
  const PLAYER_DT_EVENT = '__player_devtools__'
  const PLAYER_DT_SCAN = '__player_devtools_scan__'
  const PLAYER_DT_HOOK = '__PLAYER_DEVTOOLS_HOOK__'
  const DEVTOOLS_PROVIDER = Symbol.for('player.devtools.provider')
  const MSE_SCAN_MAX_DEPTH = 10
  const MSE_SCAN_MAX_NODES = 400
  const MSE_SCAN_MAX_PROPERTIES = 256
  const MSE_SCAN_MIN_SCORE = 6
  const MSE_SCAN_MISS_TTL = 750
  const PAGE_ORIGIN = window.location.origin
  const sessionIdBytes = new Uint8Array(16)
  crypto.getRandomValues(sessionIdBytes)
  const SESSION_ID =
    's_' +
    Array.from(sessionIdBytes, (value) => value.toString(16).padStart(2, '0')).join('')

  const nowTs = () => (performance.timeOrigin || 0) + performance.now()

  // ---------------------------------------------------------------- serialize
  const SIMPLE = [
    'Boolean',
    'Number',
    'String',
    'Undefined',
    'Null',
    'Date',
    'Object',
    'Array'
  ]
  const typeOf = (v) => Object.prototype.toString.call(v).slice(8, -1)

  function trim(obj, maxDepth, depth, seen) {
    maxDepth = maxDepth || 3
    depth = depth || 1
    seen = seen || new WeakSet()
    if (typeof obj === 'function')
      return '[Function' + (obj.name ? ' ' + obj.name : '') + ']'
    if (obj === null || typeof obj !== 'object') return obj
    const t = typeOf(obj)
    if (t === 'Array' && obj.length > 50 && depth > 1) return 'Array[' + obj.length + ']'
    if (!SIMPLE.includes(t)) {
      if (t.endsWith('Array') || t === 'ArrayBuffer')
        return t + '[' + (obj.length != null ? obj.length : obj.byteLength) + ']'
      return t
    }
    if (seen.has(obj)) return '[Circular]'
    if (depth > maxDepth) return t === 'Array' ? 'Array[' + obj.length + ']' : '{…}'
    seen.add(obj)
    if (t === 'Array')
      return obj.slice(0, 50).map((v) => trim(v, maxDepth, depth + 1, seen))
    const out = {}
    for (const k in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, k)) continue
      if (k[0] === '_' && depth > 1) continue
      try {
        out[k] = trim(obj[k], maxDepth, depth + 1, seen)
      } catch {
        out[k] = '[Unserializable]'
      }
    }
    return out
  }

  function readRanges(ranges) {
    const out = []
    if (!ranges) return out
    try {
      for (let i = 0; i < ranges.length; i++)
        out.push({ start: ranges.start(i), end: ranges.end(i) })
    } catch {}
    return out
  }

  // ---------------------------------------------------------------- discovery
  // Beacon first (player broadcasts add/remove), then three-tier fallback for
  // players without the beacon: InstManager → [data-xgplayerid] media → emit patch.
  const instances = new Map() // playerId -> { player, probeCleanups, cleanup, meta }
  let selectedId = null

  function findPlayerCtor() {
    const g = window
    const roots = [g.Player, g.XgPlayer, g.xgplayer, g.Xgplayer, g.pre_build_xgplayer]
    const seen = new Set()
    for (const root of roots) {
      let candidates = [root]
      try {
        candidates = candidates.concat(root?.default, root?.Player)
      } catch {}
      for (const candidate of candidates) {
        if (seen.has(candidate)) continue
        seen.add(candidate)
        if (
          typeof candidate === 'function' &&
          (candidate.instManager || candidate.getCurrentUserActivePlayerId)
        )
          return candidate
      }
    }
    return null
  }

  function getInstManager() {
    const Ctor = findPlayerCtor()
    return Ctor && Ctor.instManager ? Ctor.instManager : null
  }

  function playerIdOf(player) {
    return player && (player.playerId != null ? String(player.playerId) : null)
  }

  // Highest priority: the player broadcasts add/remove via a window CustomEvent
  // (needs a player build with the beacon). Zero business coupling — no global
  // `Player` required. Sets the handshake flag, then requests a full replay so
  // instances created before the probe injected are backfilled (e.g. Douyin).
  let beaconBound = false
  function discoverViaBeacon() {
    window[PLAYER_DT_HOOK] = true
    if (!beaconBound) {
      beaconBound = true
      window.addEventListener(PLAYER_DT_EVENT, (e) => {
        const d = (e && e.detail) || {}
        if (d.action === 'remove') unregisterInstance(playerIdOf(d.player))
        else registerInstance(d.player)
      })
    }
    try {
      window.dispatchEvent(new CustomEvent(PLAYER_DT_SCAN))
    } catch {}
  }

  function discoverViaInstManager() {
    const im = getInstManager()
    if (!im || typeof im.forEach !== 'function') return false
    im.forEach((p) => registerInstance(p))
    // Listen for future adds/removes (InstManager is an EventEmitter).
    if (im.on && !im.__xgdtHooked) {
      im.__xgdtHooked = true
      try {
        im.on('add', (p) => registerInstance(p))
        im.on('remove', (p) => unregisterInstance(playerIdOf(p)))
      } catch {}
    }
    return instances.size > 0
  }

  function discoverViaDom() {
    const els = document.querySelectorAll('[' + PLAYER_ID_ATTR + ']')
    const im = getInstManager()
    els.forEach((el) => {
      const id = el.getAttribute(PLAYER_ID_ATTR)
      if (!id || instances.has(id)) return
      let player = null
      if (im && im.find) player = im.find((p) => String(p.playerId) === id)
      if (player) registerInstance(player)
    })
    return instances.size > 0
  }

  // Last-resort: patch EventEmitter.prototype.emit to catch player-like emitters.
  function patchEmit() {
    const protos = new Set()
    const grab = (obj) => {
      const pr = obj && Object.getPrototypeOf(obj)
      if (pr && typeof pr.emit === 'function') protos.add(pr)
    }
    const im = getInstManager()
    if (im) grab(im)
    if (!protos.size) {
      // Try to grab from any registered instance.
      instances.forEach(({ player }) => grab(player))
    }
    protos.forEach((proto) => {
      if (proto.__xgdtEmit) return
      const orig = proto.emit
      proto.__xgdtEmit = orig
      proto.emit = function (type, data) {
        try {
          if (this && this.playerId != null && !instances.has(String(this.playerId)))
            registerInstance(this)
        } catch {}
        return orig.apply(this, arguments)
      }
    })
  }

  function refreshInstanceProbes(record, id) {
    activeProbes.forEach((probe) => {
      if (record.probeCleanups.has(probe.id)) return
      try {
        if (probe.detect(record.player)) {
          const off = probe.subscribe(record.player, (evt) => {
            emitEvent(id, probe.id, evt)
            if (probe.id === 'core' && MSE_DISCOVERY_EVENTS.includes(evt.type))
              scheduleMseProbeRefresh(record, id, MSE_REBIND_EVENTS.includes(evt.type))
          })
          record.probeCleanups.set(probe.id, off || null)
        }
      } catch (e) {
        reportError('probe.subscribe:' + probe.id, e)
      }
    })
  }

  function scheduleMseProbeRefresh(record, id, rebind) {
    if (rebind && record.probeCleanups.has('mse')) {
      try {
        record.probeCleanups.get('mse')?.()
      } catch {}
      record.probeCleanups.delete('mse')
    }
    if (record.probeCleanups.has('mse') || record.mseRefreshPending) return
    record.mseRefreshPending = true
    Promise.resolve().then(() => {
      record.mseRefreshPending = false
      if (instances.get(id) === record) refreshInstanceProbes(record, id)
    })
  }

  function registerInstance(player) {
    const id = playerIdOf(player)
    if (!id) return
    const existing = instances.get(id)
    if (existing) {
      refreshInstanceProbes(existing, id)
      return
    }
    const probeCleanups = new Map()
    const meta = { id, createdAt: nowTs() }
    const record = {
      player,
      probeCleanups,
      mseRefreshPending: false,
      cleanup: () =>
        probeCleanups.forEach((off) => {
          try {
            if (off) off()
          } catch {}
        }),
      meta
    }
    instances.set(id, record)
    refreshInstanceProbes(record, id)
    Promise.resolve().then(() => {
      if (instances.get(id) === record) refreshInstanceProbes(record, id)
    })
    if (!selectedId) selectedId = id
    pushInstances()
  }

  function unregisterInstance(id) {
    const rec = instances.get(id)
    if (!rec) return
    try {
      rec.cleanup()
    } catch {}
    instances.delete(id)
    if (selectedId === id)
      selectedId = instances.size ? instances.keys().next().value : null
    pushInstances()
  }

  function getPlayer(id) {
    const rec = instances.get(id || selectedId)
    return rec ? rec.player : null
  }

  let highlightOverlay = null
  let highlightTimer = null

  function removeHighlight() {
    if (highlightTimer) clearTimeout(highlightTimer)
    if (highlightOverlay?.parentNode)
      highlightOverlay.parentNode.removeChild(highlightOverlay)
    highlightOverlay = null
    highlightTimer = null
  }

  function highlightPlayer(player) {
    const target = player && (player.root || player.media || player.video)
    if (!target || typeof target.getBoundingClientRect !== 'function') return
    try {
      target.scrollIntoView({ block: 'center', inline: 'center' })
    } catch {}
    requestAnimationFrame(() => {
      removeHighlight()
      const rect = target.getBoundingClientRect()
      const media = player.media || player.video
      const playing = !!media && !media.paused && !media.ended
      const overlay = document.createElement('div')
      const label = document.createElement('div')
      overlay.style.cssText =
        'position:fixed;pointer-events:none;z-index:2147483647;border:2px solid #0fdc78;background:rgba(15,220,120,.08);box-sizing:border-box;'
      overlay.style.left = `${Math.max(0, rect.left)}px`
      overlay.style.top = `${Math.max(0, rect.top)}px`
      overlay.style.width = `${Math.max(0, rect.width)}px`
      overlay.style.height = `${Math.max(0, rect.height)}px`
      label.style.cssText =
        'position:absolute;left:-2px;top:-26px;padding:3px 7px;background:#0fdc78;color:#004d26;font:12px/18px ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap;'
      label.textContent = `Player #${playerIdOf(player)} · ${playing ? 'playing' : 'paused'}`
      overlay.appendChild(label)
      document.documentElement.appendChild(overlay)
      highlightOverlay = overlay
      highlightTimer = setTimeout(removeHighlight, 2200)
    })
  }

  // ------------------------------------------------------------------- probes
  // Each probe: { id, detect(player), collect(player), subscribe(player, emit) }
  const PROBES = []
  const activeProbes = []

  function getStreamingCore(player, name) {
    if (!player) return null
    const direct = player[`__${name}`] || player[`_${name}`]
    if (direct) return direct.core || direct[name] || direct
    const plugin = player.plugins?.[name]
    return plugin ? plugin.core || plugin[name] || plugin : null
  }

  function getHls(player) {
    return getStreamingCore(player, 'hls')
  }

  function isObjectLike(value) {
    return value != null && (typeof value === 'object' || typeof value === 'function')
  }

  // Read data descriptors only. Accessor properties are deliberately ignored so
  // capability discovery never executes arbitrary player/plugin getters.
  function dataProperty(object, key) {
    if (!isObjectLike(object)) return undefined
    let current = object
    for (let depth = 0; current && depth < 8; depth++) {
      let descriptor
      try {
        descriptor = Object.getOwnPropertyDescriptor(current, key)
      } catch {
        return undefined
      }
      if (descriptor)
        return Object.prototype.hasOwnProperty.call(descriptor, 'value')
          ? descriptor.value
          : undefined
      try {
        current = Object.getPrototypeOf(current)
      } catch {
        return undefined
      }
    }
    return undefined
  }

  function dataEntries(object, maxProperties) {
    if (!isObjectLike(object)) return []
    try {
      let keys = Reflect.ownKeys(object)
      if (maxProperties && keys.length > maxProperties) {
        const half = Math.floor(maxProperties / 2)
        keys = keys.slice(0, half).concat(keys.slice(-half))
      }
      return keys
        .map((key) => [key, Object.getOwnPropertyDescriptor(object, key)])
        .filter((entry) => Object.prototype.hasOwnProperty.call(entry[1] || {}, 'value'))
        .map((entry) => [entry[0], entry[1].value])
    } catch {
      return []
    }
  }

  function hasDataMethod(object, key) {
    return typeof dataProperty(object, key) === 'function'
  }

  function dataTypeName(object) {
    const tag = dataProperty(object, Symbol.toStringTag)
    if (typeof tag === 'string') return tag
    const constructor = dataProperty(object, 'constructor')
    return typeof constructor === 'function'
      ? dataProperty(constructor, 'name') || ''
      : ''
  }

  function getPlayerMedia(player) {
    return safeRead(
      () => player.media || player.video,
      dataProperty(player, 'media') || dataProperty(player, 'video') || null
    )
  }

  function getMseRoots(player) {
    const roots = [{ value: player, label: 'player' }]
    // `Player.plugins` is a public prototype getter in xgplayer. Only trusted
    // player roots (plugins/media/video) may invoke accessors; arbitrary getters
    // inside plugin graphs remain ignored by dataProperty/dataEntries.
    const plugins = safeRead(() => player.plugins, dataProperty(player, 'plugins'))
    dataEntries(plugins, MSE_SCAN_MAX_PROPERTIES).forEach(([key, plugin]) => {
      if (!isObjectLike(plugin)) return
      roots.push({
        value: plugin,
        label: dataProperty(plugin, 'pluginName') || String(key)
      })
    })
    return roots
  }

  function contractMseContext(roots) {
    for (const root of roots) {
      const provider = dataProperty(root.value, DEVTOOLS_PROVIDER)
      const probes = dataProperty(provider, 'probes')
      const probe = dataProperty(probes, 'mse')
      const collect = dataProperty(probe, 'collect')
      if (typeof collect !== 'function') continue
      return {
        source: 'contract',
        confidence: 'exact',
        kind: root.label,
        owner: root.value,
        probe,
        collect,
        subscribe: dataProperty(probe, 'subscribe')
      }
    }
    return null
  }

  function sourceBufferLike(object) {
    if (!isObjectLike(object)) return false
    const tag = dataTypeName(object)
    return (
      /SourceBuffer/.test(tag) ||
      (dataProperty(object, 'buffered') != null &&
        typeof dataProperty(object, 'updating') === 'boolean')
    )
  }

  function mediaSourceLike(object) {
    if (!isObjectLike(object)) return false
    const tag = dataTypeName(object)
    return (
      /MediaSource/.test(tag) || typeof dataProperty(object, 'readyState') === 'string'
    )
  }

  function scoreXgMse(candidate, playerMedia) {
    if (!isObjectLike(candidate)) return 0
    let score = 0
    const sourceBuffers = dataProperty(candidate, '_sourceBuffer')
    const sourceBufferEntries = dataEntries(sourceBuffers)
    const mediaSource = dataProperty(candidate, 'mediaSource')
    const media = dataProperty(candidate, 'media')

    if (!isObjectLike(sourceBuffers)) return 0
    score += 2
    if (sourceBufferEntries.some((entry) => sourceBufferLike(entry[1]))) score += 4
    if (mediaSourceLike(mediaSource)) score += 3
    if (hasDataMethod(candidate, 'getSourceBuffer')) score += 2
    if (hasDataMethod(candidate, 'buffered')) score += 2
    if (hasDataMethod(candidate, 'endOfStream')) score += 1
    if (hasDataMethod(candidate, 'bindMedia') || hasDataMethod(candidate, 'createSource'))
      score += 1
    if (isObjectLike(dataProperty(candidate, '_queue'))) score += 1
    if (media && playerMedia && media === playerMedia) score += 2
    return score
  }

  function scoreMethodMse(candidate, playerMedia) {
    if (!isObjectLike(candidate)) return 0
    let score = 0
    const media = dataProperty(candidate, 'media')
    if (hasDataMethod(candidate, 'getSourceBuffer')) score += 3
    if (hasDataMethod(candidate, 'buffered')) score += 2
    if (hasDataMethod(candidate, 'endOfStream')) score += 1
    if (hasDataMethod(candidate, 'bindMedia') || hasDataMethod(candidate, 'createSource'))
      score += 1
    if (mediaSourceLike(dataProperty(candidate, 'mediaSource'))) score += 2
    if (media && playerMedia && media === playerMedia) score += 2
    return score
  }

  function scoreNativeMediaSource(candidate) {
    return /^(MediaSource|ManagedMediaSource|WebKitMediaSource)$/.test(
      dataTypeName(candidate)
    )
      ? 1
      : 0
  }

  const MSE_STRUCTURE_ADAPTERS = [
    {
      id: 'xg-mse',
      minScore: MSE_SCAN_MIN_SCORE,
      score: scoreXgMse,
      collect: collectXgMse
    },
    {
      id: 'method-wrapper',
      minScore: 5,
      score: scoreMethodMse,
      collect: collectMethodMse
    },
    {
      id: 'native-media-source',
      minScore: 1,
      score: scoreNativeMediaSource,
      collect: collectNativeMediaSource
    }
  ]

  function matchMseAdapter(candidate, playerMedia) {
    for (const adapter of MSE_STRUCTURE_ADAPTERS) {
      const score = adapter.score(candidate, playerMedia)
      if (score >= adapter.minScore) return { adapter, score }
    }
    return null
  }

  function mseTraversalPriority(value, key) {
    const hint = `${dataTypeName(value)} ${String(key || '')}`
    if (/mse|mediasource/i.test(hint)) return 30
    if (/mp4|hls|flv|dash|stream|buffer|media|core|kernel|kernal/i.test(hint)) return 20
    return 0
  }

  function enqueueMseNode(queue, item) {
    let low = 0
    let high = queue.length
    while (low < high) {
      const middle = (low + high) >> 1
      if (queue[middle].priority < item.priority) high = middle
      else low = middle + 1
    }
    queue.splice(low, 0, item)
  }

  function shouldTraverseMseNode(value, player) {
    if (!isObjectLike(value) || value === player || value === window) return false
    if (typeof document !== 'undefined' && value === document) return false
    if (typeof value === 'function') return false
    const tag = dataTypeName(value)
    return !(
      tag === 'ArrayBuffer' ||
      tag === 'Promise' ||
      tag === 'WeakMap' ||
      tag === 'WeakSet' ||
      tag.endsWith('Array') ||
      /^(Window|Document|HTML|SVG|CSS|Location|Navigator|SourceBuffer|TimeRanges)/.test(
        tag
      )
    )
  }

  function resolveDataPath(root, path) {
    let value = root
    for (const key of path) {
      value = dataProperty(value, key)
      if (!isObjectLike(value)) break
    }
    return value
  }

  function structuralMseContextValid(context, roots, playerMedia) {
    if (!context || context.source !== 'structural') return false
    if (!roots.some((root) => root.value === context.root)) return false
    const media = dataProperty(context.mse, 'media') || context.boundMedia
    if (media && playerMedia && media !== playerMedia) return false
    const match = matchMseAdapter(context.mse, playerMedia)
    return (
      resolveDataPath(context.root, context.path) === context.mse &&
      match?.adapter === context.adapter
    )
  }

  function findStructuralMseContext(player, roots) {
    const playerMedia = getPlayerMedia(player)
    const pluginRoots = roots.slice(1).concat(roots.slice(0, 1))
    const queue = []
    pluginRoots.forEach((root) =>
      enqueueMseNode(queue, {
        value: root.value,
        root: root.value,
        label: root.label,
        path: [],
        depth: 0,
        eventTarget: null,
        boundMedia: null,
        priority: mseTraversalPriority(root.value, root.label)
      })
    )
    const seen = new WeakSet()
    let visited = 0

    while (queue.length && visited < MSE_SCAN_MAX_NODES) {
      const item = queue.shift()
      const candidate = item.value
      if (!isObjectLike(candidate) || seen.has(candidate)) continue
      seen.add(candidate)
      visited++

      const eventTarget =
        hasDataMethod(candidate, 'on') && hasDataMethod(candidate, 'off')
          ? candidate
          : item.eventTarget
      const match = matchMseAdapter(candidate, playerMedia)
      const candidateMedia = dataProperty(candidate, 'media') || item.boundMedia
      const mediaMatches =
        !candidateMedia || !playerMedia || candidateMedia === playerMedia
      if (match && mediaMatches) {
        return {
          source: 'structural',
          confidence: 'best-effort',
          kind: item.label,
          root: item.root,
          path: item.path,
          mse: candidate,
          core: eventTarget,
          adapter: match.adapter,
          boundMedia: candidateMedia
        }
      }
      if (item.depth >= MSE_SCAN_MAX_DEPTH) continue

      dataEntries(candidate, MSE_SCAN_MAX_PROPERTIES).forEach(([key, value]) => {
        if (key === DEVTOOLS_PROVIDER || !shouldTraverseMseNode(value, player)) return
        enqueueMseNode(queue, {
          value,
          root: item.root,
          label: item.label,
          path: item.path.concat(key),
          depth: item.depth + 1,
          eventTarget,
          boundMedia: candidateMedia,
          priority: mseTraversalPriority(value, key)
        })
      })
    }
    return null
  }

  const mseContextCache = new WeakMap()

  function getMseContext(player) {
    if (!isObjectLike(player)) return null
    const roots = getMseRoots(player)
    const contract = contractMseContext(roots)
    if (contract) return contract

    const playerMedia = getPlayerMedia(player)
    const cached = mseContextCache.get(player)
    if (cached?.context && structuralMseContextValid(cached.context, roots, playerMedia))
      return cached.context
    if (
      cached &&
      !cached.context &&
      performance.now() - cached.checkedAt < MSE_SCAN_MISS_TTL
    )
      return null

    const context = findStructuralMseContext(player, roots)
    mseContextCache.set(player, { context, checkedAt: performance.now() })
    return context
  }

  function sourceUrl(source) {
    if (typeof source === 'string') return source
    return typeof source?.src === 'string' ? source.src : ''
  }

  function safeRead(read, fallback = null) {
    try {
      return read()
    } catch {
      return fallback
    }
  }

  function collectPlayerUrl(player, media) {
    const configuredUrl = player?.config?.url
    if (!Array.isArray(configuredUrl)) return { url: configuredUrl }
    const sourceUrls = configuredUrl.map((source) => sourceUrl(source)).filter(Boolean)
    const currentUrl = media?.currentSrc || media?.src || ''
    const isInternalMseUrl =
      currentUrl.indexOf('blob:') === 0 && !sourceUrls.includes(currentUrl)
    return {
      url: (!isInternalMseUrl && currentUrl) || sourceUrls[0] || '',
      sources: trim(configuredUrl, 2)
    }
  }

  function bufferAhead(ranges, currentTime) {
    for (const range of ranges) {
      if (currentTime >= range.start && currentTime <= range.end) {
        return range.end - currentTime
      }
    }
    return 0
  }

  function collectSourceBufferTrack(sourceBuffer, type, currentTime, options = {}) {
    if (!sourceBuffer && !options.buffered) return null
    const queue = Array.isArray(options.queue) ? options.queue : []
    const ranges = readRanges(options.buffered || safeRead(() => sourceBuffer?.buffered))
    const currentOperation = queue[0]
      ? {
          name: queue[0].opName || 'unknown',
          context: trim(queue[0].context, 2)
        }
      : null
    return {
      type: String(type),
      mimeType: options.mimeType || safeRead(() => sourceBuffer?.mimeType, '') || '',
      updating: !!safeRead(() => sourceBuffer?.updating, false),
      mode: safeRead(() => sourceBuffer?.mode),
      timestampOffset: safeRead(() => sourceBuffer?.timestampOffset),
      appendWindowStart: safeRead(() => sourceBuffer?.appendWindowStart),
      appendWindowEnd: safeRead(() => sourceBuffer?.appendWindowEnd),
      buffered: ranges,
      bufferAhead: bufferAhead(ranges, currentTime),
      queueLength: queue.length,
      currentOperation,
      full: !!options.full
    }
  }

  function mseEngine(mediaSource) {
    return /ManagedMediaSource/.test(dataTypeName(mediaSource)) ? 'MMS' : 'MSE'
  }

  function wrapperRuntime(wrapper, player, tracks) {
    const mediaSource = safeRead(
      () => wrapper.mediaSource,
      dataProperty(wrapper, 'mediaSource')
    )
    const media =
      safeRead(() => wrapper.media, dataProperty(wrapper, 'media')) ||
      getPlayerMedia(player) ||
      null
    const objectUrl = safeRead(() => wrapper.url)
    let readyState = safeRead(() => mediaSource?.readyState)
    if (!readyState && safeRead(() => wrapper.isOpened, false)) readyState = 'open'
    const attachMode = dataProperty(wrapper, '_sourceElement')
      ? 'source-element'
      : safeRead(() => media?.srcObject === mediaSource, false)
        ? 'src-object'
        : objectUrl
          ? 'src'
          : 'detached'
    return {
      media,
      engine: mseEngine(mediaSource),
      readyState: readyState || 'detached',
      duration: safeRead(
        () => mediaSource?.duration,
        safeRead(() => wrapper.duration)
      ),
      streaming: safeRead(() =>
        mediaSource && 'streaming' in mediaSource
          ? mediaSource.streaming
          : wrapper.streaming
      ),
      attachMode,
      objectUrl: objectUrl || null,
      tracks
    }
  }

  function collectXgMse(mse, player) {
    const media = dataProperty(mse, 'media') || getPlayerMedia(player) || null
    const currentTime = safeRead(() => media?.currentTime, 0) || 0
    const sourceBuffers = dataProperty(mse, '_sourceBuffer')
    const queues = dataProperty(mse, '_queue')
    const fullFlags = dataProperty(mse, '_mseFullFlag')
    const tracks = dataEntries(sourceBuffers)
      .map(([type, sourceBuffer]) =>
        collectSourceBufferTrack(sourceBuffer, type, currentTime, {
          queue: dataProperty(queues, type),
          full: dataProperty(fullFlags, type)
        })
      )
      .filter(Boolean)
    return wrapperRuntime(mse, player, tracks)
  }

  function collectNativeTracks(mediaSource, currentTime) {
    const sourceBuffers = safeRead(() => mediaSource?.sourceBuffers)
    const length = Math.min(safeRead(() => sourceBuffers?.length, 0) || 0, 16)
    const tracks = []
    for (let index = 0; index < length; index++) {
      let sourceBuffer = safeRead(() => sourceBuffers[index])
      if (!sourceBuffer) sourceBuffer = safeRead(() => sourceBuffers.item(index))
      if (!sourceBuffer) continue
      const mimeType =
        safeRead(() => sourceBuffer.mimeType || sourceBuffer.type, '') || ''
      const type = /^audio\//i.test(mimeType)
        ? 'audio'
        : /^video\//i.test(mimeType)
          ? 'video'
          : `source-${index + 1}`
      tracks.push(collectSourceBufferTrack(sourceBuffer, type, currentTime, { mimeType }))
    }
    return tracks.filter(Boolean)
  }

  function collectMethodMse(wrapper, player) {
    const media =
      safeRead(() => wrapper.media, dataProperty(wrapper, 'media')) ||
      getPlayerMedia(player) ||
      null
    const currentTime = safeRead(() => media?.currentTime, 0) || 0
    const getSourceBuffer = dataProperty(wrapper, 'getSourceBuffer')
    const getBuffered = dataProperty(wrapper, 'buffered')
    const getQueue =
      dataProperty(wrapper, 'getOperationQueue') || dataProperty(wrapper, 'getQueue')
    const isFull = dataProperty(wrapper, 'isFull')
    const declaredTypes = dataProperty(wrapper, 'sourceBufferTypes')
    const types = Array.isArray(declaredTypes)
      ? declaredTypes.slice(0, 16)
      : ['video', 'audio']
    const seen = new Set()
    let tracks = types
      .map((type) => {
        const sourceBuffer = safeRead(() => getSourceBuffer.call(wrapper, type))
        if (sourceBuffer && seen.has(sourceBuffer)) return null
        if (sourceBuffer) seen.add(sourceBuffer)
        const buffered =
          typeof getBuffered === 'function'
            ? safeRead(() => getBuffered.call(wrapper, type))
            : null
        if (!sourceBuffer && !buffered) return null
        return collectSourceBufferTrack(sourceBuffer, type, currentTime, {
          buffered,
          queue:
            typeof getQueue === 'function'
              ? safeRead(() => getQueue.call(wrapper, type), [])
              : [],
          full:
            typeof isFull === 'function'
              ? safeRead(() => isFull.call(wrapper, type), false)
              : false
        })
      })
      .filter(Boolean)

    const mediaSource = safeRead(
      () => wrapper.mediaSource,
      dataProperty(wrapper, 'mediaSource')
    )
    if (!tracks.length) tracks = collectNativeTracks(mediaSource, currentTime)
    return wrapperRuntime(wrapper, player, tracks)
  }

  function collectNativeMediaSource(mediaSource, player) {
    const media = getPlayerMedia(player)
    const currentTime = safeRead(() => media?.currentTime, 0) || 0
    return {
      media,
      engine: mseEngine(mediaSource),
      readyState: safeRead(() => mediaSource.readyState, 'detached') || 'detached',
      duration: safeRead(() => mediaSource.duration),
      streaming: safeRead(() =>
        'streaming' in mediaSource ? mediaSource.streaming : null
      ),
      attachMode: safeRead(() => media?.srcObject === mediaSource, false)
        ? 'src-object'
        : media?.currentSrc?.indexOf('blob:') === 0
          ? 'src'
          : 'detached',
      objectUrl: null,
      tracks: collectNativeTracks(mediaSource, currentTime)
    }
  }

  function normalizeMseSnapshot(context, collected, player) {
    if (!collected) return null
    const media = collected.media || getPlayerMedia(player) || null
    const currentTime = safeRead(() => media?.currentTime, 0) || 0
    const tracks = Array.isArray(collected.tracks) ? collected.tracks : []
    const pendingOperations = tracks.reduce(
      (total, track) => total + (Number(track.queueLength) || 0),
      0
    )
    const audio = tracks.find((track) => track.type === 'audio')
    const video = tracks.find((track) => track.type === 'video')
    const audioEnd = audio?.buffered.length
      ? audio.buffered[audio.buffered.length - 1].end
      : null
    const videoEnd = video?.buffered.length
      ? video.buffered[video.buffered.length - 1].end
      : null
    return {
      plugin: context.kind,
      adapter: context.adapter.id,
      engine: collected.engine || 'MSE',
      readyState: collected.readyState || 'detached',
      duration: collected.duration,
      streaming: collected.streaming,
      attachMode: collected.attachMode || 'detached',
      objectUrl: collected.objectUrl || null,
      currentTime,
      pendingOperations,
      sourceBufferCount: tracks.length,
      full: tracks.some((track) => track.full),
      currentTimeCovered:
        tracks.length > 0 &&
        tracks.every((track) =>
          track.buffered.some(
            (range) => currentTime >= range.start && currentTime <= range.end
          )
        ),
      avEndDelta:
        audioEnd == null || videoEnd == null ? null : Math.abs(videoEnd - audioEnd),
      tracks,
      source: context.source,
      confidence: context.confidence
    }
  }

  function collectMse(player) {
    const context = getMseContext(player)
    if (!context) return null

    if (context.source === 'contract') {
      const snapshot = context.collect.call(context.probe, player)
      if (!snapshot || typeof snapshot !== 'object') return null
      return Object.assign({}, snapshot, {
        plugin: snapshot.plugin || context.kind,
        adapter: 'contract',
        source: 'contract',
        confidence: 'exact'
      })
    }

    return normalizeMseSnapshot(
      context,
      context.adapter.collect(context.mse, player),
      player
    )
  }

  // Core player probe: lifecycle + state + media element.
  PROBES.push({
    id: 'core',
    detect: (p) => !!p && typeof p.on === 'function',
    collect: (p) => {
      const media = p.media || p.video || null
      const playerUrl = collectPlayerUrl(p, media)
      return {
        playerId: String(p.playerId),
        url: playerUrl.url,
        sources: playerUrl.sources,
        state: p.state,
        currentTime: media && media.currentTime,
        duration: p.duration || (media && media.duration),
        paused: media && media.paused,
        ended: media && media.ended,
        seeking: media && media.seeking,
        playing: !!media && !media.paused && !media.ended,
        readyState: media && media.readyState,
        networkState: media && media.networkState,
        currentSrc: media && media.currentSrc,
        src: media && media.src,
        videoWidth: media && media.videoWidth,
        videoHeight: media && media.videoHeight,
        playbackRate: media && media.playbackRate,
        volume: media && media.volume,
        muted: media && media.muted,
        autoplay: media && media.autoplay,
        loop: media && media.loop,
        controls: media && media.controls,
        preload: media && media.preload,
        crossOrigin: media && media.crossOrigin,
        buffered: readRanges(media && media.buffered),
        seekable: readRanges(media && media.seekable),
        error:
          media && media.error
            ? { code: media.error.code, message: media.error.message }
            : null,
        config: trim(p.config, 2)
      }
    },
    subscribe: (p, emit) => {
      const EVENTS = [
        'play',
        'playing',
        'pause',
        'ended',
        'error',
        'seeking',
        'seeked',
        'waiting',
        'canplay',
        'canplaythrough',
        'durationchange',
        'volumechange',
        'loadeddata',
        'loadedmetadata',
        'ratechange',
        'progress',
        'loadstart',
        'emptied',
        'stalled',
        'suspend',
        'abort',
        'timeupdate',
        'ready',
        'urlchange',
        'complete',
        'replay',
        'destroy',
        'retry',
        'source_error',
        'definition_change',
        'bufferedChange',
        'fullscreen_change',
        'mseAttaching',
        'mseAttached',
        'dashready',
        'playertypechange',
        'dashStateChange'
      ]
      const handlers = []
      EVENTS.forEach((type) => {
        const h = (data) =>
          emit({ type, category: categoryOf(type), data: trim(data, 2) })
        try {
          p.on(type, h)
          handlers.push([type, h])
        } catch {}
      })
      return () =>
        handlers.forEach(([t, h]) => {
          try {
            p.off(t, h)
          } catch {}
        })
    }
  })

  // HLS/stream core probe: core.* events + bufferInfo/speedInfo/getStats.
  PROBES.push({
    id: 'hls',
    detect: (p) => !!getHls(p),
    collect: (p) => {
      const hls = getHls(p)
      if (!hls) return null
      const safe = (fn) => {
        try {
          return fn()
        } catch {
          return null
        }
      }
      return {
        isLive: safe(() => hls.isLive),
        bufferInfo: safe(() => hls.bufferInfo && hls.bufferInfo()),
        speedInfo: safe(() => hls.speedInfo && hls.speedInfo()),
        stats: trim(
          safe(() => hls.getStats && hls.getStats()),
          2
        ),
        currentStream: trim(
          safe(() => hls.currentStream),
          2
        ),
        baseDts: safe(() => hls.baseDts)
      }
    },
    subscribe: (p, emit) => {
      const hls = getHls(p)
      if (!hls || typeof hls.on !== 'function') return null
      const CORE = [
        'core.ttfb',
        'core.loadstart',
        'core.loadcomplete',
        'core.loadretry',
        'core.metadataparsed',
        'core.lowdecode',
        'core.switchurlsuccess',
        'core.switchurlfailed',
        'core.speed',
        'core.streamexception',
        'core.appendcost',
        'core.streamparsed',
        'core.noaudiotrack',
        'LARGE_VIDEO_DTS_GAP_DETECT',
        'LARGE_AUDIO_DTS_GAP_DETECT',
        'AUDIO_GAP_DETECT',
        'AUDIO_OVERLAP_DETECT',
        'real_time_speed',
        'error'
      ]
      const handlers = []
      CORE.forEach((type) => {
        const h = (data) =>
          emit({ type, category: categoryOf(type), data: trim(data, 2) })
        try {
          hls.on(type, h)
          handlers.push([type, h])
        } catch {}
      })
      return () =>
        handlers.forEach(([t, h]) => {
          try {
            hls.off(t, h)
          } catch {}
        })
    }
  })

  const mseOperationObservers = new WeakMap()

  function notifyMseObservers(observer, event) {
    observer.listeners.forEach((listener) => {
      try {
        listener(event)
      } catch {}
    })
  }

  function mseOperationData(method, args) {
    const data = { method }
    if (method === 'append') {
      data.track = args[0]
      data.byteLength =
        args[1] && typeof args[1].byteLength === 'number' ? args[1].byteLength : null
      data.context = trim(args[2], 2)
    } else if (method === 'appendBuffer') {
      data.videoSamples = args[0]?.samples?.length ?? null
      data.audioSamples = args[1]?.samples?.length ?? null
    } else if (method === 'remove') {
      data.track = args[0]
      data.start = args[1]
      data.end = args[2]
      data.context = trim(args[3], 2)
    } else if (method === 'clearBuffer') {
      data.start = args[0]
      data.end = args[1]
    } else if (
      method === 'createSource' ||
      method === 'changeType' ||
      method === 'createOrChangeSource'
    ) {
      data.track = args[0]
      data.mimeType = args[1]
    } else if (
      method === 'abort' ||
      method === 'setTimeoffset' ||
      method === 'setTimestampOffset'
    ) {
      data.track = args[0]
      if (/offset/i.test(method)) data.timestampOffset = args[1]
      data.context = trim(args[method === 'abort' ? 1 : 2], 2)
    } else if (method === 'setLiveSeekableRange') {
      data.start = args[0]
      data.end = args[1]
    } else if (method === 'endOfStream') {
      data.reason = args[0] || null
    } else if (method === 'bindMedia') {
      data.media = args[0]?.tagName || typeOf(args[0])
    }
    return data
  }

  function mseOperationMethods(target) {
    const methods = [
      'createSource',
      'changeType',
      'createOrChangeSource',
      'append',
      'appendBuffer',
      'remove',
      'endOfStream',
      'abort',
      'setTimeoffset',
      'setTimestampOffset',
      'setLiveSeekableRange',
      'bindMedia',
      'unbindMedia'
    ]
    if (!hasDataMethod(target, 'remove')) {
      methods.push('clearBuffer', 'clearAllBuffer')
    }
    return methods
  }

  function subscribeMseOperations(target, emit) {
    if (!isObjectLike(target)) return null
    let observer = mseOperationObservers.get(target)
    if (!observer) {
      observer = { listeners: new Set(), restores: [], depth: 0 }
      mseOperationMethods(target).forEach((method) => {
        const original = dataProperty(target, method)
        if (typeof original !== 'function') return
        const ownDescriptor = Object.getOwnPropertyDescriptor(target, method)
        if (ownDescriptor && ownDescriptor.configurable === false) return
        const wrapped = function () {
          const args = Array.prototype.slice.call(arguments)
          const outermost = observer.depth === 0
          if (outermost) {
            const event = {
              type: `mse.${method}`,
              category: 'buffer',
              data: mseOperationData(method, args)
            }
            notifyMseObservers(observer, event)
          }
          observer.depth++
          try {
            return original.apply(this, args)
          } catch (error) {
            if (outermost) {
              const event = {
                type: `mse.${method}.error`,
                category: 'error',
                data: Object.assign(mseOperationData(method, args), {
                  error: {
                    name: error?.name || 'Error',
                    message: error?.message || String(error)
                  }
                })
              }
              notifyMseObservers(observer, event)
            }
            throw error
          } finally {
            observer.depth--
          }
        }
        try {
          Object.defineProperty(target, method, {
            value: wrapped,
            configurable: true,
            writable: true,
            enumerable: ownDescriptor?.enumerable || false
          })
          observer.restores.push(() => {
            if (Object.getOwnPropertyDescriptor(target, method)?.value !== wrapped) return
            try {
              if (ownDescriptor) Object.defineProperty(target, method, ownDescriptor)
              else delete target[method]
            } catch {}
          })
        } catch {}
      })
      if (!observer.restores.length) return null
      mseOperationObservers.set(target, observer)
    }

    observer.listeners.add(emit)
    return () => {
      observer.listeners.delete(emit)
      if (observer.listeners.size) return
      observer.restores.forEach((restore) => restore())
      mseOperationObservers.delete(target)
    }
  }

  function subscribeNativeMseEvents(mediaSource, emit) {
    if (!mediaSource || typeof mediaSource.addEventListener !== 'function') return null
    const cleanups = []
    const boundSourceBuffers = new WeakSet()
    const listen = (target, type, eventType, data) => {
      if (!target || typeof target.addEventListener !== 'function') return
      const handler = () =>
        emit({
          type: eventType,
          category: /error|abort/.test(type) ? 'error' : 'buffer',
          data: typeof data === 'function' ? data() : data || {}
        })
      try {
        target.addEventListener(type, handler)
        cleanups.push(() => target.removeEventListener(type, handler))
      } catch {}
    }
    const bindSourceBuffers = () => {
      const sourceBuffers = safeRead(() => mediaSource.sourceBuffers)
      const length = Math.min(safeRead(() => sourceBuffers?.length, 0) || 0, 16)
      for (let index = 0; index < length; index++) {
        let sourceBuffer = safeRead(() => sourceBuffers[index])
        if (!sourceBuffer) sourceBuffer = safeRead(() => sourceBuffers.item(index))
        if (!sourceBuffer || boundSourceBuffers.has(sourceBuffer)) continue
        boundSourceBuffers.add(sourceBuffer)
        const details = () => ({
          index,
          mimeType: safeRead(() => sourceBuffer.mimeType || sourceBuffer.type, '') || '',
          updating: !!safeRead(() => sourceBuffer.updating, false),
          buffered: readRanges(safeRead(() => sourceBuffer.buffered))
        })
        listen(sourceBuffer, 'updatestart', 'sourcebuffer.updatestart', details)
        listen(sourceBuffer, 'updateend', 'sourcebuffer.updateend', details)
        listen(sourceBuffer, 'abort', 'sourcebuffer.abort', details)
        listen(sourceBuffer, 'error', 'sourcebuffer.error', details)
      }
    }
    listen(mediaSource, 'sourceopen', 'mediasource.open', () => {
      bindSourceBuffers()
      return { readyState: mediaSource.readyState }
    })
    listen(mediaSource, 'sourceended', 'mediasource.ended', () => ({
      readyState: mediaSource.readyState
    }))
    listen(mediaSource, 'sourceclose', 'mediasource.close', () => ({
      readyState: mediaSource.readyState
    }))
    bindSourceBuffers()
    return cleanups.length
      ? () =>
          cleanups.forEach((cleanup) => {
            try {
              cleanup()
            } catch {}
          })
      : null
  }

  function subscribeMse(player, emit) {
    const context = getMseContext(player)
    if (!context) return null
    if (context.source === 'contract') {
      return typeof context.subscribe === 'function'
        ? context.subscribe.call(context.probe, emit, player)
        : null
    }

    const cleanups = []
    const subscribe = (target, types) => {
      if (!target || typeof target.on !== 'function') return
      const handlers = []
      types.forEach((type) => {
        const handler = (data) => emit({ type, category: 'buffer', data: trim(data, 2) })
        try {
          target.on(type, handler)
          handlers.push([type, handler])
        } catch {}
      })
      if (handlers.length && typeof target.off === 'function') {
        cleanups.push(() =>
          handlers.forEach(([type, handler]) => {
            try {
              target.off(type, handler)
            } catch {}
          })
        )
      }
    }

    const operationCleanup =
      context.adapter.id === 'native-media-source'
        ? subscribeNativeMseEvents(context.mse, emit)
        : subscribeMseOperations(context.mse, emit)
    if (operationCleanup) cleanups.push(operationCleanup)

    subscribe(context.core, [
      'core.sourcebuffercreated',
      'core.mediasourceopened',
      'core.appendbuffer',
      'core.removebuffer',
      'core.buffereos'
    ])
    subscribe(player, [
      'mseAttaching',
      'mseAttached',
      'dashready',
      'playertypechange',
      'dashStateChange'
    ])
    return cleanups.length ? () => cleanups.forEach((cleanup) => cleanup()) : null
  }

  PROBES.push({
    id: 'mse',
    detect: (p) => !!getMseContext(p),
    collect: collectMse,
    subscribe: subscribeMse
  })

  // Optional internal probes — detect() fails silently in open-source builds.
  PROBES.push({
    id: 'abr',
    detect: (p) => {
      const h = getHls(p)
      return !!(h && (h.abr || h._abr || (p.config && p.config.abr)))
    },
    collect: (p) => {
      const h = getHls(p)
      const a = h && (h.abr || h._abr)
      return a ? trim(a, 2) : null
    },
    subscribe: (p, emit) => {
      const h = getHls(p)
      if (!h || typeof h.on !== 'function') return null
      const handlers = []
      ;[
        'definition_change',
        'before_definition_change',
        'after_definition_change'
      ].forEach((type) => {
        const fn = (data) => emit({ type, category: 'abr', data: trim(data, 2) })
        try {
          h.on(type, fn)
          handlers.push([type, fn])
        } catch {}
      })
      return () =>
        handlers.forEach(([t, fn]) => {
          try {
            h.off(t, fn)
          } catch {}
        })
    }
  })

  function categoryOf(type) {
    if (type === 'error' || /error|exception|lowdecode|failed/i.test(type)) return 'error'
    if (/buffer|append|remove|sourcebuffer|mediasource|eos|gap|overlap|dts/i.test(type))
      return 'buffer'
    // Network = player network-layer signals only (prefixed core.* / speed / retry).
    // Native media events (loadstart/loadeddata/loadedmetadata) are playback, not network.
    if (/ttfb|core\.load|speed|retry|switchurl/i.test(type)) return 'network'
    if (/definition|abr/i.test(type)) return 'abr'
    if (
      /seek|waiting|stalled|play|pause|canplay|ended|load|timeupdate|ratechange|replay/i.test(
        type
      )
    )
      return 'playback'
    return 'other'
  }

  // ------------------------------------------------------------------ recorder
  // Always-on bounded ring buffer of recent events. Because native media events
  // (loadstart/loadedmetadata/canplay/…) are one-shot and the player bus does
  // not replay them, the probe records from page load so a panel that connects
  // late (DevTools opened after playback started) can still replay the history.
  // `max` caps memory; high-frequency events are already throttled before here.
  const recorder = { buffer: [], max: 20000, markTs: 0 }
  function recordEvent(rec) {
    recorder.buffer.push(rec)
    if (recorder.buffer.length > recorder.max) recorder.buffer.shift()
  }

  // --------------------------------------------------------------------- bridge
  const throttleState = new Map() // key -> last sent ts
  const THROTTLE_MS = 250

  function post(type, payload, playerId) {
    if (!PAGE_ORIGIN || PAGE_ORIGIN === 'null') return
    try {
      window.postMessage(
        {
          source: SRC_INJECT,
          v: PV,
          sessionId: SESSION_ID,
          type,
          playerId,
          ts: nowTs(),
          payload
        },
        PAGE_ORIGIN
      )
    } catch {
      /* payload not clonable */
    }
  }

  function emitEvent(playerId, probeId, evt) {
    const rec = {
      playerId,
      probeId,
      type: evt.type,
      category: evt.category,
      ts: nowTs(),
      data: evt.data
    }
    if (HIGH_FREQ.includes(evt.type)) {
      const key = playerId + ':' + evt.type
      const last = throttleState.get(key) || 0
      if (rec.ts - last < THROTTLE_MS) return
      throttleState.set(key, rec.ts)
    }
    recordEvent(rec)
    post(OUT.EVENT, rec, playerId)
  }

  function reportError(where, err) {
    post(OUT.ERROR, { where, message: err && err.message, stack: err && err.stack })
  }

  function pushInstances() {
    const list = []
    const im = getInstManager()
    const activeId = im && im.getActiveId ? String(im.getActiveId()) : null
    instances.forEach(({ player, meta }, id) => {
      let overview = null
      try {
        overview = PROBES[0].collect(player)
      } catch {}
      list.push({
        id,
        active: id === activeId,
        selected: id === selectedId,
        meta,
        overview,
        probes: probeAvailability(player)
      })
    })
    post(OUT.INSTANCES, { instances: list, selectedId, sessionId: SESSION_ID })
  }

  function probeAvailability(player) {
    const map = {}
    PROBES.forEach((pr) => {
      try {
        map[pr.id] = pr.detect(player)
      } catch {
        map[pr.id] = false
      }
    })
    return map
  }

  function collectMetrics() {
    instances.forEach((record, id) => {
      refreshInstanceProbes(record, id)
      const player = record.player
      const metrics = {}
      PROBES.forEach((pr) => {
        try {
          if (pr.detect(player)) metrics[pr.id] = pr.collect(player)
        } catch {}
      })
      post(OUT.METRICS, { playerId: id, metrics }, id)
    })
  }

  function collectLogs() {
    const Ctor = findPlayerCtor()
    const Logger = findLogger()
    const out = {
      enabled: Logger ? !Logger.disabled : null,
      text: null,
      debugLevel: null
    }
    try {
      if (Ctor && Ctor.debugger != null) out.debugLevel = Ctor.debugger
    } catch {}
    post(OUT.LOGS, out)
  }

  function findLogger() {
    // Logger is not globally exposed by default; best-effort via known globals.
    return window.Logger || (window.xgplayer && window.xgplayer.Logger) || null
  }

  function buildSnapshot(playerId) {
    const id = playerId || selectedId
    const player = getPlayer(id)
    const snap = {
      sessionId: SESSION_ID,
      ts: nowTs(),
      href: location.href,
      userAgent: navigator.userAgent,
      playerId: id,
      metrics: {},
      recentEvents: recorder.buffer.slice(-500)
    }
    if (player) {
      PROBES.forEach((pr) => {
        try {
          if (pr.detect(player)) snap.metrics[pr.id] = pr.collect(player)
        } catch {}
      })
    }
    return snap
  }

  // ---------------------------------------------------------- inbound commands
  window.addEventListener('message', (ev) => {
    const msg = ev.data
    if (ev.source !== window || !msg || msg.source !== SRC_PANEL || msg.v !== PV) return
    const player = getPlayer(msg.playerId)
    switch (msg.type) {
      case IN.PING:
        pushInstances()
        break
      case IN.REQUEST_REPLAY:
        // A freshly connected panel asks for the event history captured before
        // it attached. Replay the whole ring buffer in one batched message.
        post(OUT.REPLAY, { events: recorder.buffer.slice() })
        break
      case IN.SELECT_INSTANCE:
        if (instances.has(msg.playerId)) {
          selectedId = msg.playerId
          pushInstances()
        }
        break
      case IN.HIGHLIGHT_INSTANCE:
        highlightPlayer(player)
        break
      case IN.SET_DEBUG: {
        const Ctor = findPlayerCtor()
        try {
          if (Ctor) Ctor.debugger = msg.payload && msg.payload.level
        } catch {}
        collectLogs()
        break
      }
      case IN.ENABLE_LOGGER: {
        const Logger = findLogger()
        try {
          if (Logger) {
            msg.payload && msg.payload.enabled ? Logger.enable() : Logger.disable()
          }
        } catch {}
        collectLogs()
        break
      }
      case IN.START_RECORD:
        // The ring buffer is always on; a manual recording is just a time
        // window over it. Mark the start instead of clearing captured history.
        recorder.markTs = nowTs()
        break
      case IN.STOP_RECORD:
        post(OUT.SNAPSHOT, {
          kind: 'recording',
          startedAt: recorder.markTs,
          endedAt: nowTs(),
          events: recorder.buffer.filter((e) => e.ts >= recorder.markTs)
        })
        break
      case IN.REQUEST_SNAPSHOT:
        post(OUT.SNAPSHOT, { kind: 'snapshot', snapshot: buildSnapshot(msg.playerId) })
        break
      case IN.INVOKE: {
        const { method, args } = msg.payload || {}
        if (!INVOKE_WHITELIST.includes(method)) {
          reportError('invoke', new Error('method not allowed: ' + method))
          break
        }
        try {
          player &&
            typeof player[method] === 'function' &&
            player[method].apply(player, args || [])
        } catch (e) {
          reportError('invoke:' + method, e)
        }
        break
      }
    }
  })

  // ------------------------------------------------------------------- bootstrap
  activeProbes.push.apply(activeProbes, PROBES)

  function scan() {
    discoverViaBeacon()
    const found = discoverViaInstManager()
    if (!found && instances.size === 0) discoverViaDom()
    patchEmit()
  }

  // Initial + periodic discovery and metrics polling.
  scan()
  setInterval(scan, 1500)
  setInterval(() => {
    collectMetrics()
    collectLogs()
  }, 1000)
  pushInstances()
})()
