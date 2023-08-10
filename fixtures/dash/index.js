import Player from '../../packages/xgplayer/src'
import DashPlugin from '../../packages/xgplayer-dash/src'

new Player({
  id: 'mse',
  url: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
  dashOpts: {
    drm: {
    }
  },
  height: window.innerHeight,
  width: window.innerWidth,
  plugins: [DashPlugin]
});
