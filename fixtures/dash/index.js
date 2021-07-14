import Dash from '/main.mjs';
import Player from '/player.mjs'

const player = new Player({
  id: 'video',
  plugins: [Dash],
  url: 'https://cmafref.akamaized.net/cmaf/live-ull/2006350/akambr/out.mpd',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});

