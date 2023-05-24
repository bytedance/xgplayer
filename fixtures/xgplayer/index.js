import Player from '../../packages/xgplayer/src/index'
import { TextTrack } from '../../packages/xgplayer/src/index'
import { I18N } from '../../packages/xgplayer/src'

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
    url:
    [{src:'https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4'},
      {src:'https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4'},
      {src:'https://lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-720p.mp4'}],
    DynamicBg: {
      disable: false
    },
    marginControls: false,
    loop: false,
    autoplay: false,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    width: '100%',
    ignores:['playbackrate'],
    plugins: [TextTrack],
    controls: {
      // mode: 'flex',
      // initShow: true
    },
    progress: {
      // root: document.getElementById('controls0')
    },
    volume: {
      position: 'rootTop'
    },
    mobile: {
      // gestureX: false
    },
    texttrack: {
      debugger: false,
      list: [{
        label: '双语',
        language: 'double',
        id: '0',
        isDefault: true,
        url: '../subtitle/vtt/double.vtt', // [{url: './vtt/cn1.vtt'}, {url: './vtts/1-3.vtt'}, {url: './vtts/1-2.vtt'},{url: './vtts/1.vtt'}, {url: './vtts/2.vtt'}, {url: './vtts/3.vtt'},{url: './vtts/4.vtt'}, {url: './vtts/5.vtt'}, {url: './vtts/6.vtt'},{url: './vtts/7.vtt'},{url: './vtts/8.vtt'}]
        // url: 'https://sf3-xgcdn-tos.pstatp.com/obj/tos-cn-o-0004/bc9bdde6738d4865a69da7f5afaafc87'
        // url: './textTrack-1.vtt?de3fd3',
        //url: 'http://lf1-xgcdn-tos.pstatp.com/obj/tos-cn-o-0004/52ce3882d70941d5b660913cbd83d969'
      }, {
        label: '中文',
        language: 'cn',
        id: '1',
        isDefault: undefined,
        //url: 'http://tosv.byted.org/obj/tos-cn-o-0004/0edaf77715f44faebe2e348f5157280a'
        url: '../subtitle/vtt/cn.vtt'
        //url: 'http://lf1-xgcdn-tos.pstatp.com/obj/tos-cn-o-0004/52ce3882d70941d5b660913cbd83d969'
        //url: './ass/cn.ass'
      }, {
        label: '英文',
        url: '../subtitle/vtt/en.vtt',
        //url: 'http://lf6-xgcdn-tos.pstatp.com/obj/tos-cn-o-0004/d04fa4122dac42d69e8233a4dfda82fe',
        // url: './ass/double.ass',
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
      list: [
        {
          url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
          definition: '360p',
          text: '标清 360P',
          iconText: '标清'
        },
        {
          url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-480p.mp4',
          definition: '480p',
          text: {
            zh: '高清 480P',
            en: '480P'
          },
          iconText: '高清'
        },
        {
          url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
          definition: '720p',
          text: {
            zh: '超清 720P',
            en: '720P'
          },
          iconText: '超清'
        }
      ],
      defaultDefinition: '360p',
      isItemClickHide: false
    },
    // 'definition': {
    //   'text': '清晰度切换插件',
    //   'type': 'array',
    //   'checked': true,
    //   'list': [
    //     { name: '超清', url: './media/msdv3.mp4' }]
    // },
    // width: 300,
    height: 500,
    ...config
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

  window[p].on('xglog', data => {
    console.log('[xglog]', data)
    if (data.eventType === 'firstFrame' || data.eventType === 'waitingEnd') {
      addLog(
        index,
        `[xglog] eventType:${data.eventType} ${data.costTime || 0} ${data.endType || ''}`
      )
    }
  })

  window.currentTime = 0
  window[p].on('timeupdate', () => {
    if (window[p].currentTime > currentTime) {
      currentTime = window[p].currentTime
    }
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
window.init = init
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
