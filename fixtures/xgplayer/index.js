import Player, { SimplePlayer, Util } from '../../packages/xgplayer/src/index'
import { TextTrack } from '../../packages/xgplayer/src/index'
// import HeatMap from '../../packages/xgplayer/src/plugins/heatmap'
import { I18N } from '../../packages/xgplayer/src'
// import DynamicBg from '../../packages/xgplayer/src/plugins/dynamicBg'
import {data0, data2, formatData1} from './heatmap_data'
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
    url: "./heatmap.mp4",
    DynamicBg: {
      disable: false
    },
    marginControls: true,
    loop: false,
    autoplay: false,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    ignores:['playbackrate'],
    plugins: [],
    rotate: true,
    heatmap: {
      data: data2,
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
    rotate: {
      innerRotate: false
    },
    isCustomRoot: false,
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
    // timeSegmentsControls:{
    //   disable: false,
    //   segments: [{start: 0, end: 10}]
    // },
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
    width: '100%',
    height: '100%',
    miniprogress: true,
    ...config
  })
  document.getElementById('video').appendChild(window[p].root)
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
