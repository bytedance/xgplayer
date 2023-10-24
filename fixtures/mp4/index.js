// import '../../packages/xgplayer-livevideo/src'
// import MP4Player from '../../packages/xgplayer-mp4/src'
import Player from '../../packages/xgplayer/src';
import Mp4Player from '../../packages/xgplayer-mp4/src';

// console.log(Player, Mp4Player)
let player=new Player({
  id: 'vs',
  autoplay: true,
  volume: 0.3,
  url:'',
  poster: "//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg",
  playsinline: true,
  thumbnail: {
    pic_num: 44,
    width: 160,
    height: 90,
    col: 10,
    row: 10,
    // urls: ['//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-thumbnail.jpg'],
  },
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
  plugins: [Mp4Player]
});
