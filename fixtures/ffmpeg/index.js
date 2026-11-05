import Player from '../../packages/xgplayer/src'
import FFmpegPlugin from '../../packages/xgplayer-ffmpeg/src'

const $ = (selector) => document.querySelector(selector)
let player = null
let sourceName = ''
let state = '等待加载媒体'
let ready = null
let progress = null
const log = []

function update() {
  const media = player?.media
  const ranges = media?.buffered
  $('#state').textContent = state
  $('#status').textContent = JSON.stringify(
    {
      source: sourceName,
      state,
      supported: FFmpegPlugin.isSupported(),
      crossOriginIsolated,
      currentTime: media?.currentTime,
      duration: Number.isFinite(media?.duration) ? media.duration : null,
      paused: media?.paused,
      ended: media?.ended,
      buffered: ranges
        ? Array.from({ length: ranges.length }, (_, index) => [
            ranges.start(index),
            ranges.end(index)
          ])
        : [],
      ready,
      progress,
      events: log
    },
    null,
    2
  )
}

function record(event) {
  log.push(event)
  if (log.length > 30) log.shift()
}

function getOptions() {
  const inputFormat = $('#input-format').value
  return {
    ffmpeg: {
      workerURL: '/ffmpeg-runtime/worker.js',
      coreURL: '/ffmpeg-runtime/core/ffmpeg-core.js',
      wasmURL: '/ffmpeg-runtime/core/ffmpeg-core.wasm'
    },
    bufferAhead: 8,
    bufferLow: 4,
    bufferBehind: 4,
    audio: {
      outputCodec: $('#output-codec').value,
      ...(inputFormat
        ? {
            inputFormat,
            inputSampleRate: Number($('#input-rate').value),
            inputChannels: Number($('#input-channels').value)
          }
        : {})
    }
  }
}

function createPlayer(url, name = url) {
  player?.destroy()
  ready = null
  progress = null
  log.length = 0
  sourceName = name
  state = '准备中'
  player = new Player({
    id: 'player',
    url,
    mediaType: 'audio',
    autoplay: false,
    width: '100%',
    height: 80,
    plugins: [FFmpegPlugin],
    ffmpeg: getOptions()
  })
  const instance = player
  window.player = instance
  instance.on('ffmpegProgress', (event) => {
    if (player !== instance) return
    progress = event
    update()
  })
  instance.on('ffmpegReady', (metadata) => {
    if (player !== instance) return
    ready = metadata
    state = '已可播放（流式加载）'
    record('ffmpegReady')
    update()
  })
  for (const event of ['timeupdate', 'seeking', 'seeked', 'playing', 'pause', 'ended']) {
    instance.on(event, () => {
      if (player !== instance) return
      if (event === 'ended') state = '播放结束'
      else if (event === 'playing') state = '播放中'
      else if (event === 'pause' && ready) state = '已暂停'
      if (event !== 'timeupdate') record(event)
      update()
    })
  }
  instance.on('error', (error) => {
    if (player !== instance) return
    state = `失败：${error.errorMessage || error.message || '媒体加载失败'}`
    record(state)
    update()
  })
  update()
}

function seek(time) {
  if (ready && player && Number.isFinite(time)) {
    player.currentTime = Math.max(0, Math.min(time, Math.max(0, player.duration - 0.1)))
    update()
  }
}

$('#load-url').addEventListener('click', () => {
  const url = $('#url').value.trim()
  if (url) createPlayer(url)
})
$('#switch-url').addEventListener('click', async () => {
  const url = $('#url').value.trim()
  if (!player || !url) return
  state = '准备中'
  sourceName = url
  update()
  try {
    await player.switchURL(url)
  } catch (error) {
    state = `失败：${error.message}`
    update()
  }
})
$('#play').addEventListener('click', async () => {
  if (!player) return
  try {
    await player.play()
  } catch (error) {
    state = `播放失败：${error.message}`
    update()
  }
})
$('#pause').addEventListener('click', () => player?.pause())
$('#seek').addEventListener('click', () => seek(Number($('#seek-time').value)))
$('#seek-start').addEventListener('click', () => seek(0))
$('#seek-end').addEventListener('click', () => seek(player?.duration - 1))
$('#restart').addEventListener('click', () => {
  if (!player) return
  ready = null
  state = '准备中'
  player.playNext({ url: player.config.url, autoplay: false })
  update()
})
$('#cancel').addEventListener('click', () => {
  player?.destroy()
  player = null
  window.player = null
  ready = null
  state = '已取消'
  update()
})
window.addEventListener('pagehide', () => {
  player?.destroy()
})
update()
