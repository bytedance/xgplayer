import Player from '../../packages/xgplayer/src'
import HlsPlayer from '../../packages/xgplayer-hls/src'

localStorage.setItem('xgd', 1)
function defaultOpt() {
  return {
    isLive: false,
    autoplay: false,
    autoplayMuted: false,
    retryTimes: 3,
    retryCount: 3,
    retryDelay: 1000,
    loadTimeout: 10000,
    preloadTime: 180,
    bufferBehind: 10,
    maxJumpDistance: 3,
    startTime: 0
  }
}
var cachedOpt = localStorage.getItem('xg:test:hls:opt')
try { cachedOpt = JSON.parse(cachedOpt) } catch (error) { cachedOpt = undefined }
var opts = Object.assign({
  url: 'https://test-streams.mux.dev/x36xhzz/url_0/193039199_mp4_h264_aac_hd_7.m3u8',
}, defaultOpt(), cachedOpt)
var testPoint = Number(localStorage.getItem('xg:test:hls:point'))
if (isNaN(testPoint)) testPoint = 0

window.onload = function () {
  var dTestPoint = document.getElementById('test-point')
  var dTestPointDesc = document.getElementById('test-point-desc')

  var doPresetUrl = document.getElementById('preset-url')
  var doUrl = document.getElementById('url')
  var doIsLive = document.getElementById('is-live')
  var doAutoplay = document.getElementById('autoplay')
  var doAutoplayMuted = document.getElementById('autoplay-muted')
  var doLoadTimeout = document.getElementById('load-timeout')
  var doRetryCount = document.getElementById('retry-count')
  var doRetryDelay = document.getElementById('retry-delay')
  var doFetchOptions = document.getElementById('fetch-options')
  var doPreloadTime = document.getElementById('preload-time')
  var doBufferBehind = document.getElementById('buffer-behind')
  var doMaxJumpDistance = document.getElementById('max-jump-distance')
  var doStartTime = document.getElementById('start-time')
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

  var dStreamsContainer = document.getElementById('streams')
  var dStreamForce = document.getElementById('stream-force')
  var dVideoStreams = document.getElementById('video-streams')
  var dAudioStreams = document.getElementById('audio-streams')

  var dlEvent = document.getElementById('event')
  var dlError = document.getElementById('error')

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
    opts[key] = value
    localStorage.setItem('xg:test:hls:opt', JSON.stringify(opts))
    dsOption.innerHTML = '<pre>' + JSON.stringify(opts, null, 2) + '</pre>'
  }
  function resetOpts() {
    opts = Object.assign({ url: opts.url }, defaultOpt())
    localStorage.setItem('xg:test:hls:opt', JSON.stringify(opts))
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
        // mediaType: 'live-video',
        el: document.getElementById('player'),
        plugins: [HlsPlayer],
        url: opts.url,
        isLive: opts.isLive,
        startTime: opts.startTime,
        autoplay: opts.autoplay,
        autoplayMuted: opts.autoplayMuted,
        hls: Object.assign({}, opts, {
          fetchOptions: Object.assign({
            referrer: 'no-referrer',
            referrerPolicy: 'no-referrer'
          }, opts.fetchOptions)
        })
      });
      dlEvent.innerHTML = ''
      dlError.innerHTML = ''

      function pushEvent(name, value, container) {
        container = container || dlEvent
        // console.debug('[test]', name, value)
        if (container === dlEvent && logFilter && !logFilter(name, value)) {
          return
        }

        if (name === 'core.metadataparsed' || name === 'core.demuxedtrack') {
          return { '_': '数据过大，请查看devtools' }
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

      dStreamForce.checked = true
      function refreshStreams() {
        var hls = player.plugins.hls.core
        var streams = hls.streams
        var currentStream = hls.currentStream
        var streams = hls.streams
        dStreamsContainer.style.display = 'none'
        dVideoStreams.innerHTML = ''
        dAudioStreams.innerHTML = ''
        if (streams.length > 2) {
          dStreamsContainer.style.display = 'block'
          streams.forEach(s => {
            var texts = []
            if (s.width && s.height) texts.push(s.width + 'x' + s.height)
            if (s.videoCodec) texts.push(s.videoCodec.split('.')[0])
            if (s.bitrate) texts.push(Math.round(s.bitrate / 8192) + 'KBs')
            var button = document.createElement('button')
            button.setAttribute('class', 'py-1 px-2 mt-1 text-white shadow-md mr-2 ' + (currentStream.id === s.id ? 'bg-red-500' : 'bg-green-500'))
            button.textContent = texts.join('/')
            button.onclick = function () {
              hls.switchStream(s.id, dStreamForce.checked).then(function (s) {
                if (s && s.segments.length && !hls.isLive) {
                  refreshStreams()
                }
              })
            }
            dVideoStreams.appendChild(button)
          })
        }
        if (currentStream.audioStreams.length > 2) {
          dStreamsContainer.style.display = 'block'
          var currentAudio = currentStream.currentAudioStream
          currentStream.audioStreams.forEach(s => {
            var texts = []
            if (s.name) texts.push(s.name)
            if (s.lang) texts.push(s.lang)
            if (s.channels) texts.push(s.channels)
            var button = document.createElement('button')
            button.setAttribute('class', 'py-1 px-2 mt-1 text-white shadow-md mr-2 ' + (currentAudio.id === s.id ? 'bg-red-500' : 'bg-green-500'))
            button.textContent = texts.join('/')
            button.onclick = function () {
              hls.switchAudioStream(s.id, dStreamForce.checked).then(function (s) {
                if (s && s.segments.length && !hls.isLive) {
                  refreshStreams()
                }
              })
            }
            dAudioStreams.appendChild(button)
          })
        }
      }
      player.on('core_event', function (event) {
        if (event.eventName === HlsPlayer.EVENT.STREAM_PARSED) {
          refreshStreams()
        }
      })
    }
  }

  function highlight(d) { d.classList.add('bg-yellow-300') }
  function show(d, h) { d.style.display = 'block'; if (h) highlight(d) }

  var logFilter
  var desc = ''
  switch (testPoint) {
    case 0: {
      show(doAutoplay)
      show(doAutoplayMuted)
      show(doLoadTimeout)
      show(doRetryCount)
      show(doRetryDelay)
      show(doFetchOptions)
      show(doPreloadTime)
      show(doBufferBehind)
      show(doMaxJumpDistance)
      show(doStartTime)
      show(doTargetLatency)
      show(doMaxLatency)
      show(doDisconnectTime)
    }
      break;
    case 1: {
      desc = '设置高亮三个参数。<br>查看"开发者工具"的Network面板是否进行相应次数的重试<br>查看“日志”是否触发相应次数的重试事件“core.loadretry”、请求开始“core.loadstart”和请求完成“core.loadcomplete”'
      show(doLoadTimeout, true)
      show(doRetryCount, true)
      show(doRetryDelay, true)
      highlight(dlEvent)
      logFilter = function (name) {
        return name === 'core.loadretry' || name === 'core.loadcomplete' || name === 'core.loadstart'
      }
    }
      break;
    case 2: {
      desc = '设置高亮两个参数，并观察状态区域中的“剩余缓存时长”和“当前时间之前缓存时长”是否与设置的值差不多（允许一定的误差）'
      show(doPreloadTime, true)
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
      dbSwitchUrl.style.background = "rgb(245, 158, 11)"
      dbSetUrl.style.background = "rgb(245, 158, 11)"
    }
      break;
    case 5: {
      desc = '设置点播的开始时间参数，查看视频是否在该时间点播放。点击 “seek” 按钮或拖动进度条，进行跳转播放时间，观察是否跳转成功。视频播放结束是否出现重播按钮，点击可以重播，点击重播按钮也可以重播。'
      show(doStartTime, true)
      dbReplay.style.background = "rgb(245, 158, 11)"
      dbSeek.style.background = "rgb(245, 158, 11)"
    }
      break;
    case 6: {
      desc = '设置该参数，然后在直播中暂停，等待设置该参数差不多的时间，然后点播放按钮，观察直播是否拉流（出现黑屏）。等待小于该时间点播放可以连续播放不会重新拉流（不黑屏）'
      show(doDisconnectTime, true)
    }
      break;
  }
  dTestPointDesc.innerHTML = desc

  inp(doUrl).value = opts.url
  inp(doIsLive).checked = opts.isLive
  inp(doAutoplay).checked = opts.autoplay
  inp(doAutoplayMuted).checked = opts.autoplayMuted
  inp(doLoadTimeout).value = opts.loadTimeout
  inp(doRetryCount).value = opts.retryCount
  inp(doRetryDelay).value = opts.retryDelay
  inp(doFetchOptions).value = opts.fetchOptions || ''
  inp(doPreloadTime).value = opts.preloadTime
  inp(doBufferBehind).value = opts.bufferBehind
  inp(doMaxJumpDistance).value = opts.maxJumpDistance
  inp(doStartTime).value = opts.startTime
  inp(doTargetLatency).value = opts.targetLatency
  inp(doMaxLatency).value = opts.maxLatency
  inp(doDisconnectTime).value = opts.disconnectTime

  inp(doUrl).onchange = function () { updateOpts('url', this.value) }
  inp(doIsLive).onchange = function () { updateOpts('isLive', this.checked) }
  inp(doAutoplay).onchange = function () { updateOpts('autoplay', this.checked) }
  inp(doAutoplayMuted).onchange = function () { updateOpts('autoplayMuted', this.checked) }
  inp(doLoadTimeout).onchange = function () { updateOpts('loadTimeout', this.value) }
  inp(doRetryCount).onchange = function () { updateOpts('retryCount', this.value) }
  inp(doRetryDelay).onchange = function () { updateOpts('retryDelay', this.value) }
  inp(doFetchOptions).onchange = function () { updateOpts('fetchOptions', this.value, 'object') }
  inp(doPreloadTime).onchange = function () { updateOpts('preloadTime', this.value) }
  inp(doBufferBehind).onchange = function () { updateOpts('bufferBehind', this.value) }
  inp(doMaxJumpDistance).onchange = function () { updateOpts('maxJumpDistance', this.value) }
  inp(doStartTime).onchange = function () { updateOpts('startTime', this.value) }
  inp(doTargetLatency).onchange = function () { updateOpts('targetLatency', this.value) }
  inp(doMaxLatency).onchange = function () { updateOpts('maxLatency', this.value) }
  inp(doDisconnectTime).onchange = function () { updateOpts('disconnectTime', this.value) }

  doPresetUrl.getElementsByTagName('select')[0].onchange = function () {
    if (this.value) {
      updateOpts('url', this.value)
      inp(doUrl).value = this.value
      initPlayer()
    }
  }

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
    var startTime = window.prompt('[点播]开始播放时间点', 0)
    startTime = Number(startTime)
    if (isNaN(startTime)) startTime = 0
    player.switchURL(url, startTime).then(res=> console.log('switchURL success', res)).catch(err => console.error('switchURL error', err))
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
    localStorage.setItem('xg:test:hls:point', this.value)
    resetOpts()
  }

  setTimeout(function () {
    var lastPlayback = null
    var fps = 0
    setInterval(function () {
      if (player && player.plugins.hls) {
        var t = player.currentTime
        var hls = player.plugins.hls.core
        if (!hls) {
          return
        }
        var buf = hls.bufferInfo()
        var pq = hls.playbackQuality()
        var sp = hls.speedInfo()
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
