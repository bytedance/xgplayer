const player = new window.xgplayer.default({
  id: 'video',
  plugins: [...new window['xgplayer-flv']({ isLive: true }).plugins],
  url: 'https://pull-flv-l6.ixigua.com/game/stream-109134749158080942.flv',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});
