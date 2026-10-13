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
    INVOKE: 'invoke',
    PING: 'ping'
  }
  const INVOKE_WHITELIST = ['play', 'pause', 'seek', 'switchURL', 'reload', 'destroy']
  const HIGH_FREQ = ['timeupdate', 'progress', 'core.speed', 'real_time_speed']
  const PLAYER_ID_ATTR = 'data-xgplayerid'
  // Debug beacon contract — must match InstManager in the player source.
  const PLAYER_DT_EVENT = '__player_devtools__'
  const PLAYER_DT_SCAN = '__player_devtools_scan__'
  const PLAYER_DT_HOOK = '__PLAYER_DEVTOOLS_HOOK__'
  const SESSION_ID = 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36)

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
  const instances = new Map() // playerId -> { player, cleanup, meta }
  let selectedId = null

  function findPlayerCtor() {
    const g = window
    const cands = [g.Player, g.XgPlayer, g.xgplayer, g.Xgplayer]
    for (const c of cands) {
      if (typeof c === 'function' && (c.instManager || c.getCurrentUserActivePlayerId))
        return c
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

  function registerInstance(player) {
    const id = playerIdOf(player)
    if (!id || instances.has(id)) return
    const cleanups = []
    const meta = { id, createdAt: nowTs() }
    instances.set(id, { player, cleanup: () => cleanups.forEach((f) => f()), meta })
    activeProbes.forEach((probe) => {
      try {
        if (probe.detect(player)) {
          const off = probe.subscribe(player, (evt) => emitEvent(id, probe.id, evt))
          if (off) cleanups.push(off)
        }
      } catch (e) {
        reportError('probe.subscribe:' + probe.id, e)
      }
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

  // ------------------------------------------------------------------- probes
  // Each probe: { id, detect(player), collect(player), subscribe(player, emit) }
  const PROBES = []
  const activeProbes = []

  function getHls(player) {
    return (
      player &&
      (player.__hls || player._hls || (player.plugins && player.plugins.hls) || null)
    )
  }

  // Core player probe: lifecycle + state + media element.
  PROBES.push({
    id: 'core',
    detect: (p) => !!p && typeof p.on === 'function',
    collect: (p) => {
      const media = p.media || p.video || null
      return {
        playerId: String(p.playerId),
        url: p.config && p.config.url,
        state: p.state,
        currentTime: media && media.currentTime,
        duration: p.duration || (media && media.duration),
        paused: media && media.paused,
        readyState: media && media.readyState,
        networkState: media && media.networkState,
        videoWidth: media && media.videoWidth,
        videoHeight: media && media.videoHeight,
        playbackRate: media && media.playbackRate,
        volume: media && media.volume,
        muted: media && media.muted,
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
        'fullscreen_change'
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
        'core.sourcebuffercreated',
        'core.mediasourceopened',
        'core.appendbuffer',
        'core.removebuffer',
        'core.buffereos',
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
    if (/ttfb|load|speed|retry|switchurl/i.test(type)) return 'network'
    if (/definition|abr/i.test(type)) return 'abr'
    if (
      /seek|waiting|stalled|play|pause|canplay|ended|timeupdate|ratechange|replay/i.test(
        type
      )
    )
      return 'playback'
    return 'other'
  }

  // ------------------------------------------------------------------ recorder
  const recorder = { active: false, buffer: [], startedAt: 0, max: 20000 }
  function recordEvent(rec) {
    if (!recorder.active) return
    recorder.buffer.push(rec)
    if (recorder.buffer.length > recorder.max) recorder.buffer.shift()
  }

  // --------------------------------------------------------------------- bridge
  const throttleState = new Map() // key -> last sent ts
  const THROTTLE_MS = 250

  function post(type, payload, playerId) {
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
        '*'
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
    recordEvent(rec)
    if (HIGH_FREQ.includes(evt.type)) {
      const key = playerId + ':' + evt.type
      const last = throttleState.get(key) || 0
      if (rec.ts - last < THROTTLE_MS) return
      throttleState.set(key, rec.ts)
    }
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
    instances.forEach(({ player }, id) => {
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
    if (!msg || msg.source !== SRC_PANEL || msg.v !== PV) return
    const player = getPlayer(msg.playerId)
    switch (msg.type) {
      case IN.PING:
        pushInstances()
        break
      case IN.SELECT_INSTANCE:
        if (instances.has(msg.playerId)) {
          selectedId = msg.playerId
          pushInstances()
        }
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
        recorder.active = true
        recorder.buffer = []
        recorder.startedAt = nowTs()
        break
      case IN.STOP_RECORD:
        recorder.active = false
        post(OUT.SNAPSHOT, {
          kind: 'recording',
          startedAt: recorder.startedAt,
          endedAt: nowTs(),
          events: recorder.buffer.slice()
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
