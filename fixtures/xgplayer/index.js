import Player, { SimplePlayer, Util } from '../../packages/xgplayer/src/index'
// import Poster from '../../packages/xgplayer/src/plugins/poster'
// import Start from '../../packages/xgplayer/src/plugins/start'
import { TextTrack } from '../../packages/xgplayer/src/index'
import { I18N } from '../../packages/xgplayer/src'
// import DynamicBg from '../../packages/xgplayer/src/plugins/dynamicBg'
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
      console.log('>>>preProcessUrl', url, ext)
      return {
        url: `${url}&_test=1111`
      }
    },
    url: '',
    // [
    //     {
    //         "src": "//v3-weba.douyinvod.com/2857500552e19f085d24189890ff0165/6530aa8d/video/tos/cn/tos-cn-ve-15c001-alinc2/o0X7ARiEIAgyNpMfjKiCiNN5ld7OPAAKBBQeQ6/?a=6383&ch=54&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=632&bt=632&cs=2&ds=4&ft=XzJ6BM06xxouhL.D1PD12lMg4-iGNbLm-WwaU_4nU5F5JNv7T&mime_type=video_mp4&qs=15&rc=aTZpZDY4ZTM8OjY7O2c6ZUBpajN1O3Q5cjk0azMzNGkzM0AvXmAxMi0vNmIxY2NiLmJjYSNmZm0yMmRzb2VgLS1kLS9zcw%3D%3D&btag=e00030000&dy_q=1697684296&l=20231019105815487318B77115DF00DA47"
    //     },
    //     {
    //         "src": "//v26-web.douyinvod.com/11e2b45b2c9e088a66bde701b0f1fddd/6530aa8d/video/tos/cn/tos-cn-ve-15c001-alinc2/o0X7ARiEIAgyNpMfjKiCiNN5ld7OPAAKBBQeQ6/?a=6383&ch=54&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=632&bt=632&cs=2&ds=4&ft=XzJ6BM06xxouhL.D1PD12lMg4-iGNbLm-WwaU_4nU5F5JNv7T&mime_type=video_mp4&qs=15&rc=aTZpZDY4ZTM8OjY7O2c6ZUBpajN1O3Q5cjk0azMzNGkzM0AvXmAxMi0vNmIxY2NiLmJjYSNmZm0yMmRzb2VgLS1kLS9zcw%3D%3D&btag=e00030000&dy_q=1697684296&l=20231019105815487318B77115DF00DA47"
    //     },
    //     {
    //         "src": "//www.douyin.com/aweme/v1/play/?video_id=v0200fg10000chh1r6vog65q58pri0ig&line=0&file_id=fbe71de8f8f347e9902b05534acfa32f&sign=fa5a42d741ad5527ddf70a7adbca6973&is_play_url=1&source=PackSourceEnum_MIX_AWEME&aid=6383"
    //     },
    //     {
    //         "src": "//www.douyin.com/aweme/v1/play/?aid=6383&app_name=aweme&channel=channel_pc_web&device_platform=web&did=0&file_id=455c603feba54fb1afc21cceac74023b&fp=verify_lnmx61oz_AneyEmbA_UvI5_4NM1_BLMc_v9cDQxS71aFu&is_play_url=1&line=0&referer=&sign=e64285bb554bbb89efb51eadad73322e&source=PackSourceEnum_MIX_AWEME&target=7233376372733775160&user_agent=Mozilla%2F5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F118.0.0.0%20Safari%2F537.36&video_id=v0200fg10000chh1r6vog65q58pri0ig&webid=7288986370838726203&downgrade_264=1"
    //     }
    // ],
    DynamicBg: {
      disable: false
    },
    marginControls: true,
    loop: false,
    autoplay: false,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    width: '80%',
    ignores:['playbackrate'],
    plugins: [],
    rotate: true,
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
    mobile: {
      // gestureX: false
    },
    // timeSegments: ,
    timeSegmentsControls:{
      disable: false,
      segments: [{start: 0, end: 10}]
    },
    keyboard: {
      seekStep: 2
    },
    progresspreview: {
      // width: 88.23,
      // height: 50,
      mode: 'short'
    },
    thumbnail: {
      "urls": ["http://p3-sign.douyinpic.com/tos-cn-p-0015/99a06cef5a744d4cb141011c473bc43e_1695562287~tplv-noop.image?dy_q=1697167718&l=20231013112837AAD52BFD56A173017E9B&x-expires=1697171678&x-signature=1yfeS3TcWmcANU%2BWNRcYeyhs2%2FA%3D"],
      "pic_num": 361,
      "row": 37,
      "col": 10,
      "height": 136,
      "width": 240
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
    height: 700,
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

  window[p].on('source_success', (data) => {
    console.log('source_success', data)
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
  const config = {}
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
