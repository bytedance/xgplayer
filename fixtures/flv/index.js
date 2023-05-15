import Player from '../../packages/xgplayer/src'
import FlvPlayer from '../../packages/xgplayer-flv/src'

localStorage.setItem('xgd', 1)
function defaultOpt() {
  return {
    isLive: true,
    autoplay: false,
    autoplayMuted: false,
    retryTimes: 3,
    retryCount: 3,
    retryDelay: 1000,
    analyzeDuration: 5000,
    loadTimeout: 10000,
    bufferBehind: 10,
    maxJumpDistance: 3,
    maxReaderInterval: 5000,
    seamlesslyReload: false
  }
}
var cachedOpt = localStorage.getItem('xg:test:flv:opt')
try { cachedOpt = JSON.parse(cachedOpt) } catch (error) { cachedOpt = undefined }
var opts = Object.assign({
  // url: 'https://1011.hlsplay.aodianyun.com/demo/game.flv',
  url: 'https://pull-flv-l1.douyincdn.com/stage/stream-399911386870710302_ld.flv?keeptime=00093a80&wsSecret=84c8c84e064fb6c6aaad6ec54c5c8247&wsTime=63315a10&abr_pts=1950715',
}, defaultOpt(), cachedOpt)
var testPoint = Number(localStorage.getItem('xg:test:flv:point'))

if (isNaN(testPoint)) testPoint = 0

window.onload = function () {
  var dTestPoint = document.getElementById('test-point')
  var dTestPointDesc = document.getElementById('test-point-desc')

  var doPresetUrl = document.getElementById('preset-url')
  var doUrl = document.getElementById('url')
  var doAutoplay = document.getElementById('autoplay')
  var doAutoplayMuted = document.getElementById('autoplay-muted')
  var doSeamlesslyReload = document.getElementById('seamlessly-reload')
  var doLoadTimeout = document.getElementById('load-timeout')
  var doRetryCount = document.getElementById('retry-count')
  var doRetryDelay = document.getElementById('retry-delay')
  var doAnalyzeDuration = document.getElementById('analyze-duration')
  var doFetchOptions = document.getElementById('fetch-options')
  var doBufferBehind = document.getElementById('buffer-behind')
  var doMaxJumpDistance = document.getElementById('max-jump-distance')
  var doMaxReaderInterval = document.getElementById('max-reader-interval')
  var doTargetLatency = document.getElementById('target-latency')
  var doMaxLatency = document.getElementById('max-latency')
  var doDisconnectTime = document.getElementById('disconnect-time')

  var dbResetOpt = document.getElementById('reset-opt')
  var dbApplyOpt = document.getElementById('apply-opt')
  var dbPlay = document.getElementById('play')
  var dbPause = document.getElementById('pause')
  var dbReplay = document.getElementById('replay')
  var dbDestroy = document.getElementById('destroy')
  var dbSwitchUrl = document.getElementById('switch-url')
  var dbSetUrl = document.getElementById('set-url')
  var dbSeek = document.getElementById('seek')

  var dlEvent = document.getElementById('event')
  var dlError = document.getElementById('error')
  var dlLogPause = document.getElementById('log-pause')

  var dsSpeed = document.getElementById('speed')
  var dsFrame = document.getElementById('frame')
  var dsBuffer = document.getElementById('buffer')
  var dsOption = document.getElementById('option')

  dTestPoint.selectedIndex = testPoint
  dsOption.innerHTML = '<pre>' + JSON.stringify(opts, null, 2) + '</pre>'

  function inp(d) { return d.getElementsByTagName('input')[0] }

  var player

  function updateOpts(key, value, type) {
    if (type === 'object') {
      try {
        value = (new Function('x', 'return ' + value))()
      } catch (error) { }
    }

    if(type === 'number') {
      opts[key] = Number(value)
    }else{
      opts[key] = value
    }


    localStorage.setItem('xg:test:flv:opt', JSON.stringify(opts))
    dsOption.innerHTML = '<pre>' + JSON.stringify(opts, null, 2) + '</pre>'
  }
  function resetOpts() {
    opts = Object.assign({ url: opts.url }, defaultOpt())
    localStorage.setItem('xg:test:flv:opt', JSON.stringify(opts))
    window.location.reload()
  }
  function initPlayer() {
    if (player) {
      player.destroy()
      setTimeout(init, 100)
    } else {
      init()
    }
    function init() {
      window.player = player = new Player({
        el: document.getElementById('player'),
        plugins: [FlvPlayer],
        url: opts.url,
        isLive: opts.isLive,
        autoplay: opts.autoplay,
        autoplayMuted: opts.autoplayMuted,
        flv: opts
      });
      dlEvent.innerHTML = ''
      dlError.innerHTML = ''

      function pushEvent(name, value, container) {
        container = container || dlEvent
        if (container === dlEvent && dlLogPause.checked) return
        console.debug('[test]', name, value)
        if (container === dlEvent && logFilter && !logFilter(name, value)) {
          return
        }
        try {
          value = JSON.stringify(value)
        } catch (error) {
        }
        var record = document.createElement('div')
        record.innerHTML = '<div class="mb-2"><span class="text-base pr-2 bg-green-500 text-white">' + name + ' / ' + player.video.currentTime + '</span>' + value + '</div>'
        container.prepend(record)
      }

      player.on('loadstart', function (event) { pushEvent('loadstart', event) })
      player.on('loadeddata', function (event) { pushEvent('loadeddata', event) })
      player.on('play', function (event) { pushEvent('play', event) })
      player.on('pause', function (event) { pushEvent('pause', event) })
      player.on('ended', function (event) { pushEvent('ended', event) })
      player.on('autoplay_was_prevented', function (event) { pushEvent('autoplay_was_prevented', event) })
      player.on('playing', function (event) { pushEvent('playing', event) })
      player.on('seeking', function (event) { pushEvent('seeking', event) })
      player.on('seeked', function (event) { pushEvent('seeked', event) })
      player.on('waiting', function (event) { pushEvent('waiting', event) })
      player.on('canplay', function (event) { pushEvent('canplay', event) })
      player.on('durationchange', function (event) { pushEvent('durationchange', event) })
      player.on('ready', function (event) { pushEvent('ready', event) })
      player.on('complete', function (event) { pushEvent('complete', event) })
      player.on('urlchange', function (event) { pushEvent('urlchange', event) })
      player.on('destroy', function (event) { pushEvent('destroy', event) })
      player.on('replay', function (event) { pushEvent('replay', event) })
      player.on('retry', function (event) { pushEvent('retry', event) })
      player.on('core_event', function (event) { pushEvent(event.eventName, event) })
      player.on('error', function (event) { pushEvent(event.errorType, event, dlError) })
    }
  }

  function highlight (d) {d.classList.add('bg-yellow-300')}
  function show(d, h) { d.style.display = 'block'; if (h) highlight(d) }

  var logFilter
  var desc = ''
  switch (testPoint) {
    case 0: {
      show(doAutoplay)
      show(doAutoplayMuted)
      show(doSeamlesslyReload)
      show(doLoadTimeout)
      show(doRetryCount)
      show(doRetryDelay)
      show(doAnalyzeDuration)
      show(doFetchOptions)
      show(doBufferBehind)
      show(doMaxJumpDistance)
      show(doTargetLatency)
      show(doMaxLatency)
      show(doDisconnectTime)
      show(doMaxReaderInterval)
    }
      break;
    case 1: {
      desc = '设置高亮四个参数。<br>查看"开发者工具"的Network面板是否进行相应次数的重试<br>查看“日志”是否触发相应次数的重试事件“core.loadretry”、请求开始“core.loadstart”和请求完成“core.loadcomplete”'
      desc += '<br>拉流最大探测时间: 对于存在音、视频标识，但是一直拉取不到音、视频数据的case, 拉流数据超过设置的时长后当做无音频或者无视频起播'
      show(doLoadTimeout, true)
      show(doRetryCount, true)
      show(doRetryDelay, true)
      show(doAnalyzeDuration, true)
      highlight(dlEvent)
      logFilter = function (name) {
        return name === 'core.loadretry' || name === 'core.loadcomplete' || name === 'core.loadstart'
      }
    }
      break;
    case 2: {
      desc = '设置高亮参数，并观察状态区域中的“当前时间之前缓存时长”是否与设置的值差不多（允许一定的误差）'
      show(doBufferBehind, true)
      highlight(dsBuffer)
    }
      break;
    case 3: {
      desc = '设置高亮两个参数，观察视频是否自动播放(自动播放失败，点击播放按钮可以正常播放)，如果是静音自动播放则必须自动播放成功'
      show(doAutoplay, true)
      show(doAutoplayMuted, true)
    }
      break;
    case 4: {
      desc = '点击 API 方法中的 “切换url” 和 “设置url” 按钮，观察是否切换视频成功，并且可以播放，暂停'
      dbSwitchUrl.style.background="rgb(245, 158, 11)"
      dbSetUrl.style.background="rgb(245, 158, 11)"
    }
      break;
    case 5: {
      desc = '设置该参数，然后在直播中暂停，等待设置该参数差不多的时间，然后点播放按钮，观察直播是否拉流（出现黑屏）。等待小于该时间点播放可以连续播放不会重新拉流（不黑屏）' +
      '<br> 如果设置了无缝重拉流则不会黑屏'
      show(doDisconnectTime, true)
      show(doSeamlesslyReload, true)
    }
      break;
  }
  dTestPointDesc.innerHTML = desc

  inp(doUrl).value = opts.url
  inp(doAutoplay).checked = opts.autoplay
  inp(doAutoplayMuted).checked = opts.autoplayMuted
  inp(doSeamlesslyReload).checked = opts.seamlesslyReload
  inp(doLoadTimeout).value = opts.loadTimeout
  inp(doRetryCount).value = opts.retryCount
  inp(doRetryDelay).value = opts.retryDelay
  inp(doAnalyzeDuration).value = opts.analyzeDuration
  inp(doFetchOptions).value = opts.fetchOptions || ''
  inp(doBufferBehind).value = opts.bufferBehind
  inp(doMaxJumpDistance).value = opts.maxJumpDistance
  inp(doTargetLatency).value = opts.targetLatency
  inp(doMaxLatency).value = opts.maxLatency
  inp(doDisconnectTime).value = opts.disconnectTime
  inp(doMaxReaderInterval).value = opts.maxReaderInterval

  inp(doUrl).onchange = function () { updateOpts('url', this.value, 'string') }
  inp(doAutoplay).onchange = function () { updateOpts('autoplay', this.checked) }
  inp(doAutoplayMuted).onchange = function () { updateOpts('autoplayMuted', this.checked) }
  inp(doSeamlesslyReload).onchange = function () { updateOpts('seamlesslyReload', this.checked) }
  inp(doLoadTimeout).onchange = function () { updateOpts('loadTimeout', this.value, 'number') }
  inp(doRetryCount).onchange = function () { updateOpts('retryCount', this.value, 'number') }
  inp(doRetryDelay).onchange = function () { updateOpts('retryDelay', this.value, 'number') }
  inp(doAnalyzeDuration).onchange = function () { updateOpts('analyzeDuration', this.value, 'number') }
  inp(doFetchOptions).onchange = function () { updateOpts('fetchOptions', this.value, 'object') }
  inp(doBufferBehind).onchange = function () { updateOpts('bufferBehind', this.value, 'number') }
  inp(doMaxJumpDistance).onchange = function () { updateOpts('maxJumpDistance', this.value, 'number') }
  inp(doTargetLatency).onchange = function () { updateOpts('targetLatency', this.value, 'number') }
  inp(doMaxLatency).onchange = function () { updateOpts('maxLatency', this.value, 'number') }
  inp(doDisconnectTime).onchange = function () { updateOpts('disconnectTime', this.value, 'number') }
  inp(doMaxReaderInterval).onchange = function () { updateOpts('maxReaderInterval', this.value, 'number') }

  initPlayer()

  dbResetOpt.onclick = resetOpts
  dbApplyOpt.onclick = initPlayer
  dbPlay.onclick = function () { player.play() }
  dbPause.onclick = function () { player.pause() }
  dbReplay.onclick = function () { player.replay() }
  dbDestroy.onclick = function () { player.destroy() }
  dbSwitchUrl.onclick = function () {
    var url = window.prompt('设置的 url 地址')
    if (!url) return
    var seamless = window.prompt('是否无缝切换 “true” 或 “false”', false)
    player.switchURL(url, seamless.trim() === 'true')
  }
  dbSetUrl.onclick = function () {
    var url = window.prompt('设置的 url 地址')
    if (url) player.src = url
  }
  dbSeek.onclick = function () {
    var time = window.prompt('设置的跳转到的事件点')
    if (time == null) return
    time = Number(time)
    if (isNaN(time)) return
    player.seek(time)
  }

  dTestPoint.onchange = function () {
    localStorage.setItem('xg:test:flv:point', this.value)
    resetOpts()
  }

  setTimeout(function () {
    var lastPlayback = null
    var fps = 0
    var prevTime = 0
    setInterval(function () {
      if (player && player.plugins.flv) {
        var t = player.currentTime
        prevTime = t
        var flv = player.plugins.flv.core
        var buf = flv.bufferInfo()
        var pq = flv.playbackQuality()
        var sp = flv.speedInfo()
        if (lastPlayback) {
          fps = Math.round((pq.totalVideoFrames - lastPlayback.totalVideoFrames) / (pq.creationTime - lastPlayback.creationTime) * 1000)
        }
        lastPlayback = pq

        dsBuffer.innerHTML =
          '<p>当前时间：' + t + 's</p>' +
          '<p>剩余缓存时长：' + buf.remaining + 's</p>' +
          '<p>当前时间之前缓存时长：' + buf.behind + 's</p>' +
          '<p>总缓存时长：' + buf.length + 's</p>' +
          '<p>buffers：' + JSON.stringify(buf.buffers) + '</p>'

        dsFrame.innerHTML =
          '<p>总渲染帧数：' + pq.totalVideoFrames + '</p>' +
          '<p>掉帧数量：' + pq.droppedVideoFrames + '</p>' +
          '<p>fps:' + fps + '</p>'

        dsSpeed.innerHTML =
          '<p>当前速度：' + Math.round(sp.speed / (8 * 1024)) + 'KB/s</p>' +
          '<p>平均速度：' + Math.round(sp.avgSpeed / (8 * 1024)) + 'KB/s</p>'

      }
    }, 1000)
  })
}
