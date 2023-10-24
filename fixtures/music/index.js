// import Player from 'xgplayer'
// // import '../../packages/xgplayer/dist/index.min.css'
// import MusicPreset, { Music, Analyze, Lyric } from '../../packages/xgplayer-music/src'
// import '../../packages/xgplayer-music/dist/index.min.css'
// window.player = new Player({
//   id: 'vs',
//   url: '',
//   loop: false,
//   autoplay: false,
//   preloadTime:20,
//   width: "100%",
//   height: 70,
//   controls: {
//     mode: 'flex',
//     initShow: true
//   },
//   music: {
//     offline: true,
//     list: [{
//       vid: '1',
//       src: './audio/1.mp3',
//       title: '11111.mp3',
//       poster: ""
//     }, {
//       vid: '2',
//       src: './audio/2.mp3',
//       title: '22222.mp3',
//       poster: ""
//     }, {
//       vid: '3',
//       src: './audio/3.mp3',
//       title: '33333.mp3',
//       poster: "https://p3-pc-sign.douyinpic.com/image-cut-tos-priv/9cd43ffa45bfe6b52e2847c8071f9b6f~tplv-dy-resize-origshort-autoq-75:330.jpeg?x-expires=1988096400&x-signature=I7QrHLEnZfMDjJtxjXPf0M7L00A%3D&from=3213915784&s=PackSourceEnum_FEED&se=false&sc=cover&biz_tag=pcweb_cover&l=20230103173048B1113E7290F15B007F0B"
//     }, {
//       vid: '4',
//       src: './audio/4.mp3',
//       title: '444444.mp3',
//       poster: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-small.jpeg'
//     }]
//   },
//   marginControls: true,
//   // presets: ['default', MusicPreset],
//   plugins: [Music],
//   ignores: ['start', 'fullscreen', 'cssfullscreen', 'playbackrate'], 
//   mediaType: 'audio',
//   videoConfig: {
//     crossOrigin: 'anonymous'
//   },
//   mediaType: 'audio'
// });
// window.player.on('loadstart', (data) => {
//   console.log('loadstart')
// })

// window.player.on('loadeddata', (data) => {
//   console.log('loadeddata')
// })

// window.player.on('xglog', (data) => {
//   console.log('[xglog]', data)
// })

// window.player.on('user_action', (data) => {
//   console.log('[user_action]', data)
// })


// function init() {
//   window.analyze = new Analyze(player, document.querySelector('canvas'), {
//     bgColor: 'rgba(0,0,0,0.65)',
//     stroke: 1,

//   })
//   console.log('Analyze.MODES', Analyze.MODES)
//   // analyze.mode = Analyze.MODES.DOU
//     // player.on('playing', function(){
//     //   player.lyric (lyric, document.querySelector('#gc'));
//     //   player.__lyric__.show();
//     //   player.mode = 2;
//     // });
//     // document.getElementById("canvas").width = window.innerWidth;
//     // document.getElementById("canvas").height =  window.innerHeight * 0.36;
// }
// init()