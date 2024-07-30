import Player, { SimplePlayer, Util } from '../../packages/xgplayer/src/index'
import Magnifier from '../../packages/xgplayer/src/plugins/magnifier'
// import HeatMap from '../../packages/xgplayer/src/plugins/heatmap'
import { I18N } from '../../packages/xgplayer/src'
// import DynamicBg from '../../packages/xgplayer/src/plugins/dynamicBg'
const headmapData = [
  {
    'score': 0.53271484375,
    'time': 2.733333
  },
  {
    'score': 0.5302734375,
    'time': 3.233333
  },
  {
    'score': 0.386962890625,
    'time': 3.6
  },
  {
    'score': 0.46044921875,
    'time': 3.733333
  },
  {
    'score': 0.442138671875,
    'time': 4.233333
  },
  {
    'score': 0.4541015625,
    'time': 4.733333
  },
  {
    'score': 0.4755859375,
    'time': 5.2
  },
  {
    'score': 0.4990234375,
    'time': 5.233333
  },
  {
    'score': 0.49560546875,
    'time': 5.733333
  },
  {
    'score': 0.53662109375,
    'time': 6.233333
  },
  {
    'score': 0.51318359375,
    'time': 6.733333
  },
  {
    'score': 0.4970703125,
    'time': 7.233333
  },
  {
    'score': 0.419189453125,
    'time': 7.733333
  },
  {
    'score': 0.44677734375,
    'time': 8.233333
  },
  {
    'score': 0.176953125,
    'time': 8.733333
  },
  {
    'score': 0.666015625,
    'time': 8.933333
  },
  {
    'score': 0.541015625,
    'time': 9.233333
  },
  {
    'score': 0.501953125,
    'time': 9.733333
  },
  {
    'score': 0.521484375,
    'time': 10.233333
  },
  {
    'score': 0.546875,
    'time': 10.733333
  },
  {
    'score': 0.50390625,
    'time': 11.233333
  },
  {
    'score': 0.52783203125,
    'time': 11.733333
  },
  {
    'score': 0.55224609375,
    'time': 12.233333
  },
  {
    'score': 0.2638671875,
    'time': 12.733333
  },
  {
    'score': 0.35322265625,
    'time': 13.233333
  },
  {
    'score': 0.57080078125,
    'time': 13.733333
  },
  {
    'score': 0.546875,
    'time': 14.233333
  },
  {
    'score': 0.57958984375,
    'time': 14.733333
  },
  {
    'score': 0.517578125,
    'time': 15.233333
  },
  {
    'score': 0.49853515625,
    'time': 15.733333
  },
  {
    'score': 0.56005859375,
    'time': 16.233333
  },
  {
    'score': 0.50146484375,
    'time': 16.733333
  },
  {
    'score': 0.50634765625,
    'time': 17.233333
  },
  {
    'score': 0.60400390625,
    'time': 17.733333
  },
  {
    'score': 0.55810546875,
    'time': 18.233333
  },
  {
    'score': 0.58544921875,
    'time': 18.733333
  },
  {
    'score': 0.56396484375,
    'time': 19.233333
  },
  {
    'score': 0.58056640625,
    'time': 19.733333
  },
  {
    'score': 0.5634765625,
    'time': 20.233333
  },
  {
    'score': 0.546875,
    'time': 20.733333
  },
  {
    'score': 0.5341796875,
    'time': 21.233333
  },
  {
    'score': 0.4609375,
    'time': 21.733333
  },
  {
    'score': 0.548828125,
    'time': 22.233333
  },
  {
    'score': 0.49169921875,
    'time': 22.733333
  },
  {
    'score': 0.5869140625,
    'time': 23.233333
  },
  {
    'score': 0.61962890625,
    'time': 27.733333
  },
  {
    'score': 0.60986328125,
    'time': 28.233333
  },
  {
    'score': 0.63818359375,
    'time': 28.733333
  },
  {
    'score': 0.66162109375,
    'time': 29.233333
  },
  {
    'score': 0.55078125,
    'time': 29.5
  },
  {
    'score': 0.424560546875,
    'time': 29.533333
  },
  {
    'score': 0.485595703125,
    'time': 29.7
  },
  {
    'score': 0.4560546875,
    'time': 29.733333
  },
  {
    'score': 0.455810546875,
    'time': 30.233333
  },
  {
    'score': 0.66064453125,
    'time': 36.233333
  },
  {
    'score': 0.69970703125,
    'time': 36.733333
  },
  {
    'score': 0.6796875,
    'time': 37.233333
  },
  {
    'score': 0.626953125,
    'time': 37.733333
  },
  {
    'score': 0.61865234375,
    'time': 38.233333
  },
  {
    'score': 0.6455078125,
    'time': 38.733333
  },
  {
    'score': 0.64013671875,
    'time': 39.233333
  },
  {
    'score': 0.69970703125,
    'time': 39.733333
  },
]
console.log('vconsole')
window.Util = Util
window.POS = {
  "h": 0.40625,
  "y": 0.1899999976158142
}
// 全局配置语言
I18N.extend([
  {
    LANG: 'zh',
    TEXT: {
      PAUSE_TIPS: '暂停0',
      PLAY_TIPS: '起播0'
    }
  },
  {
    LANG: 'en',
    TEXT: {
      PAUSE_TIPS: 'Pause0',
      PLAY_TIPS: 'Play0'
    }
  }
])

window.player = null
window.player1 = null
function init(index = 0, config = {}) {
  const p = `player${index}`
  if (window[p]) {
    window[p].destroy()
    window[p] = null
  }
  window[p] = new Player({
    id: 'video' + index,
    preProcessUrl: (url, ext) => {
      return {
        url: url
      }
    },
    url: "./3_555555_h264.mp4",
    DynamicBg: {
      disable: false
    },
    loop: false,
    autoplay: false,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    ignores:[],
    plugins: [Magnifier],
    rotate: false,
    heatmap: {
      data: headmapData,
      minValue: 0.35,
      maxValue: 1,
      mapColor: '#ddd',
      mode: 'normal'
    },
    // controls: {
    //   // mode: 'normal',
    //   // initShow: true
    // },
    fullscreen: {
      // rotateFullscreen: true
    },
    progress: {
      // root: document.getElementById('controls0')
    },
    DynamicBg: {
      disable: false
    },
    volume: {
      position: 'rootTop'
    },
    playbackRate: [1,2,3,4],
    // rotate: {
    //   innerRotate: false
    // },
    Keyboard: {
      // isGlobalTrigger: false, // Whether the shortcut key needs to be triggered globally
      // disableBodyTrigger: false,
      // disable: false,
      // playbackRate: 2, // 长按倍速限制
      isIgnoreUserActive: true // 是否忽略用户激活状态
    },
    mobile: {
      // gestureX: false
    },
    // timeSegments: ,
    timeSegmentsControls:{
      disable: false,
      segments: [{start: 0, end: 10}, {start: 50, end: 100}, {start: 200, end: 220 }, {start: 300, end: 420 }, {start: 500, end: 510 }]
    },
    keyboard: {
      seekStep: 2
    },
    progresspreview: {
      // width: 88.23,
      // height: 50,
      mode: 'short'
    },
    seekedStatus: 'auto',
    texttrack: {
      debugger: false,
      list: [{
        label: '双语',
        language: 'double',
        id: '0',
        isDefault: true,
        url: '../subtitle/vtt/double.vtt',
      }, {
        label: '中文',
        language: 'cn',
        id: '1',
        isDefault: undefined,
        url: '../subtitle/vtt/cn.vtt'
      }, {
        label: '英文',
        url: '../subtitle/vtt/en.vtt',
        id: '2',
        isDefault: false,
        language: 'en'
      }],
      updateMode: 'vod',
      isDefaultOpen: true,
      mode: 'external',
    },
    definition: {
      position: 'controlsLeft',
      list: [],
      defaultDefinition: '360p',
      isItemClickHide: false
    },
    width: 600,
    height: 337.5,
    miniprogress: true,
    ...config
  })
  window._onClick = function(id) {
    console.log(id)
  }

  // setTimeout(() => {
  //   window[p].registerPlugin(Poster)
  // }, 10)
  window[p].once('canplay',() => {
    console.log('>>>>>canplay seek', window[p].media.seekable.end(0))
    // window[p].seek(30)
    // window[p].play()
  })

  window[p].on('source_error', (data) => {
    console.error('source_error', data)
  })
  // window[p].usePluginHooks('progresspreview', 'transformTime', (plugin, time) => {
  //   plugin.setTimeContent(`~~${(time)}~~`)

  //   // 阻止插件内部默认钩子逻辑
  //   return false
  // })

  window[p].on('download_speed_change', data => {
    console.log('[download_speed_change]', data)
    // addLog(index, `[download_speed_change] speed:${data.speed}, realTimeSpeed:${data.realTimeSpeed || 0}`)
  })

  // window[p].on('xglog', data => {
  //   console.log('[xglog]', data)
  //   if (data.eventType === 'firstFrame' || data.eventType === 'waitingEnd') {
  //     addLog(
  //       index,
  //       `[xglog] eventType:${data.eventType} ${data.costTime || 0} ${data.endType || ''}`
  //     )
  //   }
  // })

  window.currentTime = 0
  window[p].on('timeupdate', () => {
    // if (window[p].currentTime > currentTime) {
    //   currentTime = window[p].currentTime
    // }
  })
  window[p].useHooks('play', () => {
    console.log('useHooks play dddd')
    return true
  })
  window[p].usePluginHooks('mobile', 'videoClick', (plugin, event, data) =>{
    console.log('mobile videoClick', event, data)
    return true
  })

  window[p].usePluginHooks('mobile', 'videoDbClick', (plugin, event, data) =>{
    console.log('mobile videoDbClick', event, data)
    return true
  })

  // window[p].usePluginHooks('progress', 'dragstart', (plugin, event, data) =>{
  //   console.log('progress', data)
  //   // TODO
  //   if (data.currentTime > currentTime) {
  //     return false
  //   }
  // })

  // window[p].usePluginHooks('progress', 'drag', (plugin, event, data) =>{
  //   // TODO
  //   if (data.currentTime > currentTime) {
  //     return false
  //   }
  // })

  window[p].on('user_action', data => {
    console.log('[user_action]', data)
  })
}

init()

// init(1, {
//   i18n: [
//     {
//       LANG: 'zh',
//       TEXT: {
//         PLAY_TIPS: '播放1',
//         PAUSE_TIPS: '暂停1',
//         PAUSE_TIPS1: '测试1',
//         CSSFULLSCREEN_TIPS: '网页全屏1'
//       }
//     },
//     {
//       LANG: 'en',
//       TEXT: {
//         PLAY_TIPS: 'Play1',
//         PAUSE_TIPS: 'Pause1',
//         PAUSE_TIPS1: 'test1',
//         CSSFULLSCREEN_TIPS: 'pagefullscreen1'
//       }
//     }
//   ],
//   enableContextmenu: true
// })

function addLog(index, mse) {
  const logDom = document.getElementById(`js-show-log${index}`)
  const p = document.createElement('p')
  p.innerHTML = mse
  logDom.appendChild(p)
}

function clearLog(index) {
  const logDom = document.getElementById(`js-show-log${index}`)
  const ps = logDom.getElementsByTagName('p')
  let _len = ps.length
  while (ps.length > 0) {
    logDom.removeChild(ps[0])
    _len--
  }
}

function changeLang(index) {
  const logDom = document.getElementById(`js-show-lang${index}`)
  const p = logDom.getElementsByTagName('p')
  const player = window[`player${index}`]
  if (player.lang === 'zh') {
    player.lang = 'en'
  } else if (player.lang === 'en') {
    player.lang = 'zh'
  }
  if (p.length === 0) {
    const p = document.createElement('p')
    p.innerHTML = player.lang
    logDom.appendChild(p)
  } else {
    p[0].innerHTML = player.lang
  }
  console.log('p', p)
}

function playNext(index) {
  console.log('playNext', index)
  const p = `player${index}`
  const config = {
    autoplay: true,
    url: ""
  }
  window[p].playNext(config)
  // window[p].play()
}

function destroy(index) {
  console.log('destroy', index)
  const p = `player${index}`
  window[p] && window[p].destroy()
}

window.changeLang = changeLang
window.clearLog = clearLog
window.addLog = addLog
window.playNext = playNext
window.destroy = destroy
window.initPlayer = init
window.createDot = (index) => {
  const player = window[`player${index}`]
  const time = parseInt(Math.random(1) * player.duration, 10)
  const duration = parseInt(Math.random(1) * 30 + 10, 10)
  const ISPOT = {
    time: time, // 进度条在此时间戳打点 单位为s
    text: '', // 打点处的自定义文案
    id: time, // 标记唯一标识，用于删除的时候索引
    duration: duration, // 进度条标识点的时长 默认1s【可选】单位为s
    color: '#fff', // 进度条标识点的显示颜色【可选】
    style: {}, // 指定样式
    width: 6,
    height: 6
  }
  console.log(ISPOT)
  player.plugins.progresspreview.createDot(ISPOT)
}
