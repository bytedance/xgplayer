import Flv from '/main.mjs';
import Player from '/player.mjs'

const player = new Player({
  id: 'video',
  plugins: [...new Flv({ isLive: true }).plugins],
  url: 'https://pull-flv-l6.ixigua.com/game/stream-109134749158080942.flv',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});

