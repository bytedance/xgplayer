import Player, { Danmu } from '../../packages/xgplayer/src/index'

window.player = new Player({
  id: 'player',
  url: 'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
  plugins: [Danmu],
  danmu: {
    comments: [
      {
        id: '1',
        start: 2000,
        duration: 10000,
        txt: 'XGPlayer 弹幕示例',
        mode: 'scroll',
        style: {
          color: '#ff9500',
          fontSize: '20px'
        }
      }
    ],
    area: {
      start: 0,
      end: 0.5
    },
    defaultOpen: true
  }
})
