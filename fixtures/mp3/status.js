export const STATUS_EVENTS = [
  'loadedmetadata',
  'canplay',
  'waiting',
  'playing',
  'pause',
  'ended',
  'progress',
  'timeupdate',
  'playCatch',
  'error'
]

function getBufferedRanges(player) {
  const ranges = []
  if (!player) return ranges

  for (let i = 0; i < player.buffered.length; i++) {
    ranges.push([player.buffered.start(i).toFixed(3), player.buffered.end(i).toFixed(3)])
  }
  return ranges
}

function formatTime(currentTime, duration) {
  const current = Number.isFinite(currentTime) ? currentTime.toFixed(2) : '-'
  const total = Number.isFinite(duration) ? duration.toFixed(2) : '-'
  return `${current} / ${total}`
}

function formatBuffered(ranges) {
  if (!ranges.length) return '-'
  const last = ranges[ranges.length - 1]
  return ranges.length === 1 ? `${last[0]} - ${last[1]}` : `${ranges.length} ranges`
}

function setText(target, text) {
  if (target) target.textContent = text
}

export function createStatusView(options) {
  const { target, getPlayer, getSample, isSupported } = options
  const document = target.ownerDocument
  const sampleView = document.querySelector('#status-sample')
  const timeView = document.querySelector('#status-time')
  const bufferedView = document.querySelector('#status-buffered')
  const mediaView = document.querySelector('#status-media')
  const modeView = document.querySelector('#status-mode')

  return {
    update() {
      const player = getPlayer()
      const sampleName = getSample()?.name || ''
      const status = {
        sample: sampleName,
        mseSupported: isSupported(),
        mode: 'MP3 MSE',
        downgrade: false
      }
      let buffered = []
      let currentTime = 0
      let duration = Number.NaN

      if (player) {
        buffered = getBufferedRanges(player)
        currentTime = player.currentTime
        duration = player.duration
        Object.assign(status, {
          url: player.config.url,
          currentTime: Number(player.currentTime.toFixed(3)),
          duration: Number.isFinite(player.duration)
            ? Number(player.duration.toFixed(3))
            : player.duration,
          buffered,
          mediaReadyState: player.media?.readyState,
          mediaNetworkState: player.media?.networkState
        })
      }

      setText(sampleView, sampleName || '-')
      setText(timeView, player ? formatTime(currentTime, duration) : '-')
      setText(bufferedView, formatBuffered(buffered))
      setText(
        mediaView,
        player
          ? `ready ${player.media?.readyState} / network ${player.media?.networkState}`
          : '-'
      )
      setText(modeView, `${status.mode}${status.mseSupported ? '' : ' unsupported'}`)
      target.textContent = JSON.stringify(status, null, 2)
    }
  }
}
