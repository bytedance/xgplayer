import Player from '../../packages/xgplayer/src/index.umd'
import AdPlugin from '../../packages/xgplayer-ads/src'

window.player = new Player({
  id: 'video',
  url: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4',
  autoplay: true,
  width: '80%',
  height: 700,
  ignores:[],
  plugins: [AdPlugin],
  ad: {
    adType: 'ima'
  }
})

player.on('adPlay', function (e) {
  console.log('=====> AD_PLAY', e)
})

player.on('adPause', function (e) {
  console.log('=====> AD_PAUSE', e)
})



// Request video ads.
const adsRequest = new google.ima.AdsRequest()
adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
  'iu=/21775744923/external/single_ad_samples&sz=640x480&' +
  'cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&' +
  'output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='

// Specify the linear and nonlinear slot sizes. This helps the SDK to
// select the correct creative if multiple are returned.
adsRequest.linearAdSlotWidth = 640
adsRequest.linearAdSlotHeight = 400

adsRequest.nonLinearAdSlotWidth = 640
adsRequest.nonLinearAdSlotHeight = 150

player.plugins.ad.requestAd(adsRequest)