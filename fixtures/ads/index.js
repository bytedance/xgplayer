import AdPlugin, { AdEvents } from '../../packages/xgplayer-ads/src'
import { Logger } from '../../packages/xgplayer-streaming-shared/src/logger'
import Player from '../../packages/xgplayer/src/index.umd'

let settings = {}
const dbApplyOpt = document.getElementById('apply-opt')
const doPresetUrl = document.getElementById('ima-preset-url')
const doAdsRequest = document.getElementById('ima-ads-request')
const doAdsResponse = document.getElementById('ima-ads-response')

// TODO: delete
Logger.enable()

function generateAdTagUrl() {
  return doPresetUrl.getElementsByTagName('input')[0].value
}

function generateAdsRequest(settings) {
  if (settings.useAdsRequest) {
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
}

function generateAdsResponse() {
  // Response video ads.
}

function initSetting() {
  function defaultOpt() {
    return {
      useAdsRequest: true,
      useAdsResponse: false
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
    adTagUrl: doPresetUrl.getElementsByTagName('input')[0].value
  })

  return opts
}

function newPlayer () {
  if (window.player) {
    window.player.destroy()
  }
  window.player = new Player({
    id: 'video',
    url: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4',
    autoplay: true,
    width: '80%',
    height: 700,
    plugins: [AdPlugin],
    ad: {
      adType: 'ima',
      ima: {
        adsRequest: generateAdsRequest(settings),
        adsResponse: settings.adsResponse,
        adTagUrl: settings.adTagUrl
      }
    }
  })

  player.on(AdEvents.AD_PLAY, function (e) {
    console.log('=====> AD_PLAY', e)
  })

  player.on(AdEvents.AD_PAUSE, function (e) {
    console.log('=====> AD_PAUSE', e)
  })
}

function initPlayer() {
  settings = initSetting()

  console.log('settings', settings)

  if (settings.useAdsResponse && settings.adTagUrl) {
    fetch(settings.adTagUrl)
      .then(res => res.text())
      .then(data => {
        settings.adsResponse = data
        newPlayer()
      })
  } else {
    newPlayer()
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
