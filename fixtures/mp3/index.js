import Player from '../../packages/xgplayer/src'
import MP3Plugin from '../../packages/xgplayer-mp3/src'

let player
let objectUrl

function createPlayer(url) {
  player?.destroy()
  player = new Player({
    id: 'player',
    url,
    mediaType: 'audio',
    autoplay: false,
    plugins: [MP3Plugin],
    mp3: {
      segmentDuration: 4,
      maxBufferLength: 16,
      minBufferLength: 4
    }
  })
  window.player = player

  const status = document.querySelector('#status')
  const updateStatus = () => {
    const buffered = []
    for (let i = 0; i < player.buffered.length; i++) {
      buffered.push([
        player.buffered.start(i).toFixed(3),
        player.buffered.end(i).toFixed(3)
      ])
    }
    status.textContent = JSON.stringify(
      {
        currentTime: player.currentTime,
        duration: player.duration,
        buffered,
        mse: !!player.plugins?.mp3?.core
      },
      null,
      2
    )
  }

  player.on('loadedmetadata', updateStatus)
  player.on('progress', updateStatus)
  player.on('timeupdate', updateStatus)
  player.on('playCatch', updateStatus)
}

document.querySelector('#load-url').addEventListener('click', () => {
  const url = document.querySelector('#url').value.trim()
  if (url) createPlayer(url)
})

document.querySelector('#file').addEventListener('change', (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  if (objectUrl) URL.revokeObjectURL(objectUrl)
  objectUrl = URL.createObjectURL(file)
  createPlayer(objectUrl)
})
