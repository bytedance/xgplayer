import CastPlugin from '../../packages/xgplayer-cast/src/index'
import HlsPlugin from '../../packages/xgplayer-hls/src/index'
import Player from '../../packages/xgplayer/src/index'

window.player = new Player({
  id: 'video',
  url: 'https://voddemo-play.volcvod.com/10501b001bdd43ae89d7c0fc3d6792b5/main.m3u8?a=0&auth_key=1869487086-0fbf6e771b6b4ca5aaf4187815b396e0-0-c87d702f2fa10a17b9cc2084f28457d3&br=966&bt=966&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=4&eid=d0be9280a2594aecba9b225bdea2c770&er=0&l=202603302155344543D4879091C2196695&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApOmZkZzg1PGVoNzhkOzxlZ2dfZy9gMHFrYTBgLS1kYy9zcy00L2JfL19eYF42Ly0vYi06Yw%3D%3D&vl=&vr=',
  airplay: true,
  // Chromecast: shorthand enables Chromecast with the default media receiver (CC1AD845).
  // Use an object for explicit control:
  // chromecast: {
  //   appId: 'CC1AD845',
  //   autoJoinPolicy: 'tab_and_origin_scoped',
  // }
  chromecast: true,
  loop: false,
  autoplay: false,
  autoplayMuted: true,
  preloadTime: 20,
  width: '96%',
  plugins: [HlsPlugin, CastPlugin],
  height: 300,
  cast: {
    autoplayOnCast: false,
  },
  hls: {
    preferMMS: true,
    preferMMSStreaming: true
  }
})

// Wire up cast control buttons
document.getElementById('btn-cast-auto').addEventListener('click', () => {
  window.player.plugins.cast?.requestCast()
})
document.getElementById('btn-cast-airplay').addEventListener('click', () => {
  window.player.plugins.cast?.requestCast('airplay')
})
document.getElementById('btn-cast-chromecast').addEventListener('click', () => {
  window.player.plugins.cast?.requestCast('chromecast')
})
