import Hls from '/main.mjs';
import Player from '/player.mjs'

const player = new Player({
  id: 'video',
  plugins: [...new Hls({ isLive: false }).plugins],
  url: 'https://pull-hls-l6-admin.douyincdn.com/radio/stream-109107030176301091/index.m3u8?BeginTime=1625821577&EndTime=1625821714&session_id=202107091705500100110600890041CB7&vcodec=h264',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});

player.on('SEI_PARSED', (sei) => {
  let str;
  for (let i = 0; i < sei.content.byteLength; i++) {
      str += String.fromCharCode(sei.content[i])
  }

  console.log(sei.dts, str)
})
