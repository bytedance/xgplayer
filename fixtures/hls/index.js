import Hls from '/main.mjs';
import Player from '/player.mjs'

new Player({
  id: 'video',
  plugins: [...new Hls({ isLive: true }).plugins],
  url: 'https://pull-hls-l1.ixigua.com/game/stream-109131369424093613_hd/playlist.m3u8',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});
