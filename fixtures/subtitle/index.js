import Player from '../../packages/xgplayer/src/index'
import Subtitle from '../../packages/xgplayer-subtitles/src'
import { createTimeline } from './shared/timeline.js'
import {
  DEFAULT_TRACK_ID,
  DEMO_VIDEO_URL,
  DEMO_TRACKS,
  PLAYER_ID,
  XSS_TRACK_ID,
  cloneSubtitleTracks,
  getTrackById,
  getXssCaseByTime
} from './shared/tracks.js'
import { formatTime, getMedia, getUnsafeDemoNodeCount } from './shared/utils.js'

const state = {
  player: null,
  subtitle: null,
  activeTrackId: DEFAULT_TRACK_ID,
  subtitleOpen: true,
  statusTimer: null
}

const elements = {
  activeTrack: document.getElementById('activeTrack'),
  currentCase: document.getElementById('currentCase'),
  playbackState: document.getElementById('playbackState'),
  xssState: document.getElementById('xssState'),
  log: document.getElementById('eventLog'),
  timelineList: document.getElementById('timelineList'),
  trackControls: document.getElementById('trackControls'),
  toggleSubtitle: document.getElementById('toggleSubtitle')
}

const timeline = createTimeline({
  list: elements.timelineList,
  getMedia: () => getCurrentMedia(),
  onSeek: seekToCue
})

function getCurrentMedia () {
  return getMedia(state.player)
}

function getCurrentTimelineItems () {
  const list = state.subtitle?.currentText?.list || []
  return list.flatMap(group => group.list || [])
}

function writeLog (message) {
  const item = document.createElement('li')
  item.textContent = `${formatTime(getCurrentMedia()?.currentTime || 0)} ${message}`
  elements.log.prepend(item)

  while (elements.log.children.length > 6) {
    elements.log.removeChild(elements.log.lastChild)
  }
}

function renderTrackButtons () {
  const fragment = document.createDocumentFragment()

  DEMO_TRACKS.forEach(track => {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.trackId = track.id
    button.textContent = track.label
    button.addEventListener('click', () => switchTrack(track.id))
    fragment.appendChild(button)
  })

  elements.trackControls.replaceChildren(fragment)
}

function updateTrackButtons () {
  elements.trackControls.querySelectorAll('[data-track-id]').forEach(button => {
    const isActive = button.dataset.trackId === state.activeTrackId
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
}

function updateStatus () {
  const media = getCurrentMedia()
  const track = getTrackById(state.activeTrackId)
  const isXssTrack = state.activeTrackId === XSS_TRACK_ID
  const activeXssCase = state.subtitleOpen && isXssTrack && media
    ? getXssCaseByTime(media.currentTime)
    : null
  const hasUnsafeDemoNode = getUnsafeDemoNodeCount() > 0
  const hasExecutedXss = Boolean(window.__xgSubtitleXss)
  const hasXssIssue = hasExecutedXss || hasUnsafeDemoNode

  elements.activeTrack.textContent = state.subtitleOpen ? track.label : '关闭'
  elements.currentCase.textContent = state.subtitleOpen
    ? activeXssCase?.label || track.description || '-'
    : '-'
  elements.playbackState.textContent = media
    ? `${formatTime(media.currentTime)} / ${formatTime(media.duration)}`
    : '未初始化'
  elements.xssState.textContent = getXssStatusText(hasXssIssue, state.subtitleOpen && isXssTrack)
  elements.xssState.classList.toggle('is-danger', hasXssIssue)
  elements.toggleSubtitle.textContent = state.subtitleOpen ? '关闭字幕' : '打开字幕'

  updateTrackButtons()
  timeline.updateActive()
}

function getXssStatusText (hasXssIssue, isXssTrack) {
  if (hasXssIssue) {
    return '失败：检测到字幕或时间线中的可执行节点或脚本执行'
  }
  if (isXssTrack) {
    return '通过：字幕与时间线 HTML 仅作为文本显示'
  }
  return '未运行'
}

function createPlayer () {
  return new Player({
    id: PLAYER_ID,
    url: DEMO_VIDEO_URL,
    autoplay: true,
    autoplayMuted: true,
    height: getPlayerHeight(),
    width: '100%',
    loop: true,
    ignores: ['playbackrate'],
    startTime: 0,
    videoInit: true
  })
}

function getPlayerHeight () {
  return Math.max(420, Math.min(620, window.innerHeight - 240))
}

function createSubtitle (player) {
  return new Subtitle({
    player,
    subTitles: cloneSubtitleTracks(),
    defaultOpen: true,
    mode: 'stroke',
    line: 'double',
    offsetBottom: 8,
    fitVideo: true,
    domRender: true,
    renderMode: 'normal'
  })
}

function destroyDemo () {
  if (state.statusTimer) {
    clearInterval(state.statusTimer)
    state.statusTimer = null
  }
  if (state.subtitle) {
    state.subtitle.destroy()
    state.subtitle = null
  }
  if (state.player) {
    state.player.destroy()
    state.player = null
  }
}

function initDemo () {
  destroyDemo()

  resetXssState()
  state.activeTrackId = DEFAULT_TRACK_ID
  state.subtitleOpen = true
  elements.log.replaceChildren()
  timeline.reset()

  state.player = createPlayer()
  state.subtitle = createSubtitle(state.player)

  state.player.once('canplay', () => {
    writeLog('video canplay')
    timeline.render(getCurrentTimelineItems())
    updateStatus()
  })
  state.player.on('error', error => {
    writeLog(`video error: ${error?.message || 'unknown'}`)
    updateStatus()
  })
  state.subtitle.on('change', data => {
    state.subtitleOpen = true
    state.activeTrackId = data.id || state.activeTrackId
    resetXssState()
    writeLog(`subtitle switched: ${getTrackById(state.activeTrackId).label}`)
    timeline.render(getCurrentTimelineItems())
    updateStatus()
  })
  state.subtitle.on('off', () => {
    state.subtitleOpen = false
    writeLog('subtitle closed')
    updateStatus()
  })

  window.player0 = state.player
  window.subTitle = state.subtitle
  window.subtitleDemo = {
    player: state.player,
    subtitle: state.subtitle,
    switchTrack,
    reset: initDemo
  }

  state.statusTimer = setInterval(updateStatus, 500)
  writeLog('demo initialized')
  updateStatus()
}

async function switchTrack (trackId) {
  const track = getTrackById(trackId)
  try {
    await switchToTrack(track)
  } catch (error) {
    writeLog(`subtitle switch failed: ${error?.message || 'unknown'}`)
    updateStatus()
  }
}

function switchToTrack (track) {
  if (!state.subtitle || !track) {
    return Promise.reject(new Error('subtitle is not ready'))
  }

  return state.subtitle.switch({ id: track.id, language: track.language })
}

function resetXssState () {
  window.__xgSubtitleXss = 0
}

function toggleSubtitle () {
  if (!state.subtitle) {
    return
  }

  if (state.subtitleOpen) {
    state.subtitle.switchOff()
  } else {
    switchTrack(state.activeTrackId)
  }
}

function seekToCue (index) {
  const media = getCurrentMedia()
  const cue = timeline.getItems()[index]
  if (!media || !cue) {
    return
  }

  media.currentTime = cue.start + 0.05
  media.play().catch(() => {})
  if (state.activeTrackId === XSS_TRACK_ID) {
    resetXssState()
  }
  writeLog(`seeked to cue ${index + 1}`)
  updateStatus()
}

function bindControls () {
  renderTrackButtons()
  elements.toggleSubtitle.addEventListener('click', toggleSubtitle)
  document.getElementById('resetDemo').addEventListener('click', initDemo)
}

bindControls()
initDemo()
