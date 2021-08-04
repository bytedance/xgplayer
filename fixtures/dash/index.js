const player = new window.xgplayer.default({
  id: 'video',
  plugins: [window['xgplayer-dash']],
  url: 'https://cmafref.akamaized.net/cmaf/live-ull/2006350/akambr/out.mpd',
  ignores: ['playbackrate','cssFullScreen'],
  loop: false,
  autoplay: false,
  preloadTime:20,
  width: "100%",
});

