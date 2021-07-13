import Player from '/player.mjs'

new Player({
  id: 'video',
  url: 'https://v-cdn.zjol.com.cn/280443.mp4',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});
