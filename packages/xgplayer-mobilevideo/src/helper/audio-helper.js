/* eslint-disable no-undef */
/**
 *
 * ios  WebAudio 在系统静音下 播放没有声音
 * hack: 创建背景Audio元素,静音且循环播放，用户交互后取消静音。
 * 在 ios safari、飞书webview、chrome下WebAudio可正常
 */

function initBgSilenceAudio () {
  if (document.querySelector('#hackAudioPP')) return

  let silenceMp3 =
    'data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='
  let tmp = document.createElement('div')
  tmp.innerHTML = "<audio id='hackAudioPP'></audio>"
  document.body.appendChild(tmp)
  let audio = tmp.children.item(0)
  audio.controls = false
  audio.preload = 'auto'
  audio.innerHTML = `<source src=${silenceMp3} type="audio/mpeg"></source>`
  audio.muted = true
  audio.loop = true
  // fix ios下大部分webview存在页面进度条一直不消失问题
  // audio.load();
  audio.play().catch(() => {})
}

let ele

function playSlienceAudio () {
  let MVideo = customElements.get('mobile-video')
  if (MVideo.nobgAudio) return
  let audio = ele || (ele = document.querySelector('#hackAudioPP'))
  if (!audio) {
    initBgSilenceAudio()
  }
  if (audio.paused === false && audio.muted === false) return
  audio.muted = false
  audio.play().catch((e) => {
    console.log('bgAudio: ', e.message)
  })
}

function pauseSlienceAudio () {
  let audio = ele || (ele = document.querySelector('#hackAudioPP'))
  if (audio) {
    audio.pause()
  }
}

export { initBgSilenceAudio, playSlienceAudio, pauseSlienceAudio }
