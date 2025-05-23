import Player from 'xgplayer'
import AdPlugin, { AdEvents } from 'xgplayer-ads'
import HlsPlugin from 'xgplayer-hls'
import { Logger } from 'xgplayer-streaming-shared'

let settings = {}
const dbApplyOpt = document.getElementById('apply-opt')
const doPresetUrl = document.getElementById('ima-preset-url')
const doAdsRequest = document.getElementById('ima-ads-request')
const doAdsResponse = document.getElementById('ima-ads-response')
const doAutoPlay = document.getElementById('autoplay')
const doShowControls = document.getElementById('showControls')
const doResetPlayerOpt = document.getElementById('reset-player')

// TODO: delete
Logger.enable()

function generateAdTagUrl() {
  return doPresetUrl.getElementsByTagName('input')[0].value
}

function generateAdsRequest() {
  // Request video ads.
  const adsRequest = new google.ima.AdsRequest()
  adsRequest.adTagUrl = generateAdTagUrl()

  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = 640
  adsRequest.linearAdSlotHeight = 400

  adsRequest.nonLinearAdSlotWidth = 640
  adsRequest.nonLinearAdSlotHeight = 150

  return adsRequest
}

function generateAdsResponse() {
  // Response video ads.
}

function initSetting() {
  function defaultOpt() {
    return {
      useAdsRequest: true,
      useAdsResponse: false,
      adTagUrl: ''
    }
  }
  var cachedOpt = localStorage.getItem('xg:test:ads:opt')
  try {
    cachedOpt = JSON.parse(cachedOpt)
  } catch (error) {
    cachedOpt = undefined
  }
  var opts = Object.assign({}, defaultOpt(), cachedOpt, {
    useAdsRequest: doAdsRequest.getElementsByTagName('input')[0].checked,
    useAdsResponse: doAdsResponse.getElementsByTagName('input')[0].checked,
    adsResponse: doAdsResponse.getElementsByTagName('textarea')[0].value,
    adTagUrl: doPresetUrl.getElementsByTagName('input')[0].value,
    autoplay: doAutoPlay.getElementsByTagName('input')[0].checked,
    controls: doShowControls.getElementsByTagName('input')[0].checked,
    resetPlayer: doResetPlayerOpt.getElementsByTagName('input')[0].checked
  })

  return opts
}

function initIMAConfigure() {
  const obj = {
    debug: true,
    locale: 'en',
    adTagUrl: '',
    adsRequest: null,
    adsResponse: null
  }

  if (settings.adsResponse) {
    const parser = new DOMParser();
    obj.adsResponse = parser.parseFromString(settings.adsResponse.trim(), "application/xml")
  } else if (settings.useAdsRequest) {
    obj.adsRequest = generateAdsRequest()
  } else if (settings.adTagUrl) {
    obj.adTagUrl = settings.adTagUrl
  }
  return obj
}

function newPlayer(imaConfigure) {
  let player = window.player

  if (!settings.resetPlayer && player) {
    player.plugins.ad.reset()
    player.plugins.ad.updateConfig({
      adsRequest: generateAdsRequest(settings),
      adsResponse: settings.adsResponse,
      adTagUrl: settings.adTagUrl
    })
    player.plugins.ad.requestAds()
    player.once(AdEvents.IMA_AD_LOADED, () => {
      console.log('=====> IMA_AD_LOADED')
      player?.plugins.ad.playAds()
    })
    return
  }
  if (player) {
    player.destroy()
  }

  window.player = player = new Player({
    id: 'video',
    url: '//pull-demo.volcfcdnrd.com/live/st-4536521.m3u8',
    // url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
    // url: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4',
    autoplay: settings.autoplay,
    width: '80%',
    height: 700,
    isLive: true,
    plugins: [HlsPlugin, AdPlugin],
    ad: {
      adType: 'ima',
      ima: imaConfigure,
      controls: settings.controls
    }
  })

  player.on(AdEvents.AD_PLAY, function (e) {
    console.log('=====> AD_PLAY', e)
  })

  player.on(AdEvents.AD_PAUSE, function (e) {
    console.log('=====> AD_PAUSE', e)
  })
}

async function initPlayer() {
  settings = initSetting()

  console.log('settings', settings)

  if (settings.useAdsResponse && settings.adTagUrl) {
    const res = await fetch(settings.adTagUrl)
    const data = await res.text()

    const imaConfigure = initIMAConfigure()
    imaConfigure.adsResponse = data
    newPlayer(imaConfigure)
  } else {
    const imaConfigure = initIMAConfigure()
    newPlayer(imaConfigure)
  }
}

dbApplyOpt.addEventListener('click', function () {
  initPlayer()
})

doPresetUrl.getElementsByTagName('select')[0].onchange = function () {
  if (this.value) {
    const input = doPresetUrl.getElementsByTagName('input')[0]
    input.value = this.value
    initPlayer()
  }
}
