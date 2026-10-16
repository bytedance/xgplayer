/* Lightweight validation: JSON manifest + syntax-check all src JS files. */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const vm = require('vm')

const root = path.resolve(__dirname, '..')
let failed = 0

// 1. manifest.json is valid JSON
try {
  JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
  console.log('✓ manifest.json valid')
} catch (e) {
  console.error('✗ manifest.json invalid:', e.message)
  failed++
}

// 2. syntax-check every .js under src
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p)
    else if (name.endsWith('.js')) {
      try {
        execSync(`node --check "${p}"`, { stdio: 'pipe' })
        console.log('✓', path.relative(root, p))
      } catch (e) {
        console.error('✗', path.relative(root, p), '\n', e.stderr.toString())
        failed++
      }
    }
  }
}
walk(path.join(root, 'src'))

// 3. execute the MAIN-world probe against a representative MMS instance
try {
  class MockTimeRanges {
    constructor(ranges) {
      this.ranges = ranges
      this.length = ranges.length
    }

    start(index) {
      return this.ranges[index].start
    }

    end(index) {
      return this.ranges[index].end
    }
  }

  const messages = []
  const intervals = []
  const listeners = {}
  const overlays = []
  let clock = 1
  let located = false
  const sourceBuffer = {
    mimeType: 'video/mp4;codecs=avc1.640028',
    updating: true,
    mode: 'segments',
    timestampOffset: 0,
    appendWindowStart: 0,
    appendWindowEnd: Infinity,
    buffered: new MockTimeRanges([{ start: 0, end: 12 }])
  }
  const audioSourceBuffer = {
    mimeType: 'audio/mp4;codecs=mp4a.40.2',
    updating: false,
    mode: 'segments',
    timestampOffset: 0,
    appendWindowStart: 0,
    appendWindowEnd: Infinity,
    buffered: new MockTimeRanges([{ start: 0, end: 11.9 }])
  }
  const mediaSource = {
    readyState: 'open',
    duration: 120,
    streaming: false,
    [Symbol.toStringTag]: 'ManagedMediaSource'
  }
  const mse = {
    mediaSource,
    media: {
      currentTime: 6,
      currentSrc: 'blob:https://example.test/internal-mse',
      paused: false,
      ended: false
    },
    url: 'blob:https://example.test/internal-mse',
    _sourceElement: {},
    _sourceBuffer: { video: sourceBuffer, audio: audioSourceBuffer },
    _queue: {
      video: [{ opName: 'appendBuffer', context: { start: 10, end: 12 } }],
      audio: []
    },
    _mseFullFlag: { video: false, audio: true },
    createSource() {},
    append() {
      return Promise.resolve()
    },
    remove() {
      return Promise.resolve()
    },
    endOfStream() {
      return Promise.resolve()
    }
  }
  const subscribedEvents = []
  const core = {
    _bufferService: { _mse: mse },
    on(type) {
      subscribedEvents.push(type)
    },
    off() {}
  }
  const hlsPlugin = { core: null }
  const playerPlugins = { hls: hlsPlugin }
  const player = {
    playerId: 'mse-fixture',
    config: {
      url: [
        { src: 'https://cdn.example.test/video.mp4', type: 'video/mp4' },
        { src: 'https://cdn.example.test/video.webm', type: 'video/webm' }
      ]
    },
    media: mse.media,
    root: {
      scrollIntoView() {
        located = true
      },
      getBoundingClientRect() {
        return { left: 10, top: 20, width: 640, height: 360 }
      }
    },
    state: 2,
    duration: 120,
    on() {},
    off() {}
  }
  const playerPrototype = {}
  Object.defineProperty(playerPrototype, 'plugins', {
    get() {
      return playerPlugins
    }
  })
  Object.setPrototypeOf(player, playerPrototype)
  const pausedPlayer = {
    playerId: 'paused-fixture',
    config: { url: 'https://cdn.example.test/paused.mp4' },
    media: { currentTime: 0, paused: true, ended: false },
    state: 2,
    on() {},
    off() {},
    plugins: {}
  }
  let getterReads = 0
  const vodMedia = {
    currentTime: 8,
    currentSrc: 'blob:https://example.test/vod-dash-mse',
    paused: false,
    ended: false
  }
  const vodMse = {
    ...mse,
    media: vodMedia,
    url: vodMedia.currentSrc
  }
  const vodPlugin = {
    pluginName: 'dashplugin',
    stale: { mse },
    _kernal: {
      __dash__: {
        dash: { mse: vodMse }
      }
    }
  }
  Object.defineProperty(vodPlugin, 'dangerousGetter', {
    enumerable: true,
    get() {
      getterReads++
      throw new Error('structural discovery executed a getter')
    }
  })
  const vodPlayer = {
    playerId: 'vod-fixture',
    config: { url: 'https://cdn.example.test/vod.mp4' },
    state: 2,
    duration: 120,
    on() {},
    off() {},
    plugins: { dashplugin: vodPlugin }
  }
  const vodPlayerPrototype = {}
  Object.defineProperty(vodPlayerPrototype, 'video', {
    get() {
      return vodMedia
    }
  })
  Object.setPrototypeOf(vodPlayer, vodPlayerPrototype)
  let contractSubscriptions = 0
  const contractMedia = {
    currentTime: 4,
    currentSrc: 'blob:https://example.test/contract-mse',
    paused: false,
    ended: false
  }
  const contractPlugin = {
    pluginName: 'contract-plugin',
    [Symbol.for('player.devtools.provider')]: {
      version: 1,
      probes: {
        mse: {
          collect() {
            return {
              engine: 'MSE',
              readyState: 'open',
              currentTime: contractMedia.currentTime,
              duration: 40,
              pendingOperations: 0,
              sourceBufferCount: 0,
              full: false,
              currentTimeCovered: false,
              tracks: [],
              marker: 'contract-wins'
            }
          },
          subscribe() {
            contractSubscriptions++
            return () => {}
          }
        }
      }
    },
    // A valid structural candidate proves the explicit contract takes priority.
    legacy: { mse: vodMse }
  }
  const contractPlayer = {
    playerId: 'contract-fixture',
    config: { url: 'https://cdn.example.test/contract.mp4' },
    media: contractMedia,
    state: 2,
    duration: 40,
    on() {},
    off() {},
    plugins: { custom: contractPlugin }
  }
  const deepMedia = { currentTime: 0, paused: true, ended: false }
  let deepMse = { mse: { ...mse, media: deepMedia } }
  for (let i = 0; i < 6; i++) deepMse = { next: deepMse }
  const deepPlayer = {
    playerId: 'deep-fixture',
    config: { url: 'https://cdn.example.test/deep.mp4' },
    media: deepMedia,
    state: 2,
    on() {},
    off() {},
    plugins: { deep: { pluginName: 'deep-plugin', branch: deepMse } }
  }
  const methodMedia = {
    currentTime: 10,
    currentSrc: 'blob:https://example.test/method-mse',
    paused: false,
    ended: false
  }
  const methodMediaSource = {
    readyState: 'open',
    duration: 60,
    [Symbol.toStringTag]: 'MediaSource'
  }
  const methodSourceBuffers = {
    video: sourceBuffer,
    audio: audioSourceBuffer
  }
  const methodQueues = {
    video: [{ opName: 'append', context: { start: 10, end: 12 } }],
    audio: []
  }
  const methodWrapper = {
    media: methodMedia,
    mediaSource: methodMediaSource,
    url: methodMedia.currentSrc,
    getSourceBuffer(type) {
      return methodSourceBuffers[type]
    },
    buffered(type) {
      return methodSourceBuffers[type]?.buffered
    },
    getOperationQueue(type) {
      return methodQueues[type]
    },
    isFull(type) {
      return type === 'audio'
    },
    endOfStream() {}
  }
  const methodPlayer = {
    playerId: 'method-fixture',
    config: { url: 'https://cdn.example.test/method.mp4' },
    media: methodMedia,
    state: 2,
    on() {},
    off() {},
    plugins: {
      custom: { pluginName: 'method-plugin', engine: { wrapper: methodWrapper } }
    }
  }
  const nativeSourceBuffer = {
    mimeType: 'video/mp4;codecs=avc1.640028',
    updating: false,
    mode: 'segments',
    timestampOffset: 0,
    appendWindowStart: 0,
    appendWindowEnd: Infinity,
    buffered: new MockTimeRanges([{ start: 0, end: 5 }])
  }
  const nativeMediaSource = {
    readyState: 'open',
    duration: 30,
    sourceBuffers: [nativeSourceBuffer],
    [Symbol.toStringTag]: 'MediaSource'
  }
  const nativeMedia = {
    currentTime: 2,
    currentSrc: 'blob:https://example.test/native-mse',
    srcObject: nativeMediaSource,
    paused: false,
    ended: false
  }
  const nativePlayer = {
    playerId: 'native-fixture',
    config: { url: 'https://cdn.example.test/native.mp4' },
    media: nativeMedia,
    state: 2,
    on() {},
    off() {},
    plugins: {
      custom: {
        pluginName: 'native-plugin',
        runtime: { mediaSource: nativeMediaSource }
      }
    }
  }
  function Player() {}
  Player.instManager = {
    forEach(fn) {
      fn(player)
      fn(pausedPlayer)
      fn(vodPlayer)
      fn(contractPlayer)
      fn(deepPlayer)
      fn(methodPlayer)
      fn(nativePlayer)
    },
    getActiveId() {
      return player.playerId
    }
  }
  const window = {
    pre_build_xgplayer: { default: Player },
    addEventListener(type, listener) {
      ;(listeners[type] ||= []).push(listener)
    },
    dispatchEvent(event) {
      ;(listeners[event.type] || []).forEach((listener) => listener(event))
    },
    postMessage(message) {
      messages.push(message)
    }
  }
  class MockCustomEvent {
    constructor(type, options = {}) {
      this.type = type
      this.detail = options.detail
    }
  }
  const context = {
    window,
    document: {
      querySelectorAll: () => [],
      createElement: () => ({
        style: {},
        appendChild(child) {
          this.child = child
        }
      }),
      documentElement: {
        appendChild(node) {
          node.parentNode = this
          overlays.push(node)
        },
        removeChild(node) {
          const index = overlays.indexOf(node)
          if (index >= 0) overlays.splice(index, 1)
        }
      }
    },
    location: { href: 'https://example.test/watch' },
    navigator: { userAgent: 'probe-validator' },
    performance: { timeOrigin: 0, now: () => clock },
    CustomEvent: MockCustomEvent,
    TimeRanges: MockTimeRanges,
    URL,
    setInterval(fn) {
      intervals.push(fn)
      return intervals.length
    },
    requestAnimationFrame(fn) {
      fn()
    },
    setTimeout() {
      return 1
    },
    clearTimeout() {},
    console,
    WeakSet,
    Map,
    Set,
    Symbol,
    Object,
    Array,
    String,
    Number,
    Math,
    Date,
    JSON
  }

  vm.runInNewContext(
    fs.readFileSync(path.join(root, 'src/inject/inject.js'), 'utf8'),
    context
  )
  hlsPlugin.core = core
  clock += 1000
  intervals[1]()
  mse.append('video', new Uint8Array(32), { segment: 3 })
  mse.remove('video', 1, 2, { reason: 'validator' })
  mse.createSource('text', 'application/mp4;codecs=wvtt')
  mse.endOfStream()
  window.dispatchEvent({
    type: 'message',
    data: {
      source: 'player-devtools-panel',
      v: 1,
      type: 'highlight-instance',
      playerId: player.playerId
    }
  })

  const instances = messages
    .filter((message) => message.type === 'instances')
    .slice(-1)[0]
  const metrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === player.playerId
  )
  const vodMetrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === vodPlayer.playerId
  )
  const contractMetrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === contractPlayer.playerId
  )
  const deepMetrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === deepPlayer.playerId
  )
  const methodMetrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === methodPlayer.playerId
  )
  const nativeMetrics = messages.find(
    (message) =>
      message.type === 'metrics' && message.payload.playerId === nativePlayer.playerId
  )
  const overview = instances.payload.instances.find(
    (instance) => instance.id === player.playerId
  ).overview
  const pausedOverview = instances.payload.instances.find(
    (instance) => instance.id === pausedPlayer.playerId
  ).overview
  const snapshot = metrics.payload.metrics.mse
  const vodSnapshot = vodMetrics.payload.metrics.mse
  const contractSnapshot = contractMetrics.payload.metrics.mse
  const deepSnapshot = deepMetrics.payload.metrics.mse
  const methodSnapshot = methodMetrics.payload.metrics.mse
  const nativeSnapshot = nativeMetrics.payload.metrics.mse
  const mseOperationEvents = messages.filter(
    (message) => message.type === 'event' && message.payload.probeId === 'mse'
  )

  if (
    overview.url !== player.config.url[0].src ||
    overview.playing !== true ||
    pausedOverview.playing !== false
  ) {
    throw new Error('Player identity or playback state snapshot is incorrect')
  }
  if (
    snapshot.engine !== 'MMS' ||
    snapshot.readyState !== 'open' ||
    snapshot.attachMode !== 'source-element' ||
    snapshot.pendingOperations !== 1 ||
    snapshot.sourceBufferCount !== 2 ||
    snapshot.full !== true ||
    snapshot.currentTimeCovered !== true ||
    Math.abs(snapshot.avEndDelta - 0.1) > 0.0001 ||
    snapshot.tracks[0].bufferAhead !== 6 ||
    snapshot.tracks[0].currentOperation.name !== 'appendBuffer' ||
    snapshot.source !== 'structural' ||
    snapshot.confidence !== 'best-effort' ||
    snapshot.adapter !== 'xg-mse' ||
    !subscribedEvents.includes('core.appendbuffer') ||
    !located ||
    !overlays[0]?.child?.textContent.includes('mse-fixture · playing')
  ) {
    throw new Error('MSE snapshot did not preserve the expected diagnostic state')
  }
  if (
    vodSnapshot.plugin !== 'dashplugin' ||
    vodSnapshot.source !== 'structural' ||
    vodSnapshot.confidence !== 'best-effort' ||
    vodSnapshot.sourceBufferCount !== 2 ||
    vodSnapshot.objectUrl !== vodMedia.currentSrc ||
    vodSnapshot.adapter !== 'xg-mse' ||
    getterReads !== 0
  ) {
    throw new Error('Bounded structural MSE discovery is incorrect or read a getter')
  }
  if (
    contractSnapshot.marker !== 'contract-wins' ||
    contractSnapshot.plugin !== 'contract-plugin' ||
    contractSnapshot.source !== 'contract' ||
    contractSnapshot.confidence !== 'exact' ||
    contractSubscriptions !== 1
  ) {
    throw new Error('Explicit MSE capability contract did not take priority')
  }
  if (
    deepSnapshot.plugin !== 'deep-plugin' ||
    deepSnapshot.source !== 'structural' ||
    deepSnapshot.sourceBufferCount !== 2 ||
    deepSnapshot.adapter !== 'xg-mse'
  ) {
    throw new Error('Structural MSE discovery did not reach the deep fixture')
  }
  if (
    methodSnapshot.plugin !== 'method-plugin' ||
    methodSnapshot.adapter !== 'method-wrapper' ||
    methodSnapshot.sourceBufferCount !== 2 ||
    methodSnapshot.pendingOperations !== 1 ||
    methodSnapshot.full !== true ||
    methodSnapshot.currentTimeCovered !== true
  ) {
    throw new Error(
      `Method-based MSE adapter did not normalize the wrapper: ${JSON.stringify(methodSnapshot)}`
    )
  }
  if (
    nativeSnapshot.plugin !== 'player' ||
    nativeSnapshot.adapter !== 'native-media-source' ||
    nativeSnapshot.engine !== 'MSE' ||
    nativeSnapshot.attachMode !== 'src-object' ||
    nativeSnapshot.sourceBufferCount !== 1 ||
    nativeSnapshot.tracks[0].type !== 'video' ||
    nativeSnapshot.currentTimeCovered !== true
  ) {
    throw new Error(
      `Native MediaSource adapter did not normalize the source: ${JSON.stringify(nativeSnapshot)}`
    )
  }
  const operations = Object.fromEntries(
    mseOperationEvents.map((message) => [message.payload.type, message.payload.data])
  )
  if (
    operations['mse.append']?.track !== 'video' ||
    operations['mse.append']?.byteLength !== 32 ||
    operations['mse.remove']?.start !== 1 ||
    operations['mse.remove']?.end !== 2 ||
    operations['mse.createSource']?.mimeType !== 'application/mp4;codecs=wvtt' ||
    !operations['mse.endOfStream']
  ) {
    throw new Error(
      `MSE operation observer did not emit normalized events: ${JSON.stringify(operations)}`
    )
  }
  console.log('✓ MSE probe snapshot')
} catch (e) {
  console.error('✗ MSE probe snapshot\n', e)
  failed++
}

process.exit(failed ? 1 : 0)
