import Player, { SimplePlayer } from '../../packages/xgplayer/src/index'
// import Poster from '../../packages/xgplayer/src/plugins/poster'
// import Start from '../../packages/xgplayer/src/plugins/start'
import { TextTrack } from '../../packages/xgplayer/src/index'
import { I18N } from '../../packages/xgplayer/src'
// import DynamicBg from '../../packages/xgplayer/src/plugins/dynamicBg'
console.log('vconsole')
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
    url: [
      {
          "src": "//v3-web.douyinvod.com/8f1282bd3ebc6627fe6edd11ab7ab21e/649a9de1/video/tos/cn/tos-cn-ve-152c001-alinc2/owOAiQsiiMCFogZQIPAB1QZCmAEvvMVnSI2zJ/?a=6383&ch=5&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=1233&bt=1233&cs=0&ds=4&ft=GN7rKGVVywIiRZm8Zmo~xj7ScoAppB996vrKktfDfto0g3&mime_type=video_mp4&qs=0&rc=ZGZkaGY8NTQ3ZTs4M2Q6NEBpajozN285cmx1bDMzNGkzM0BhLzRhNmItNWAxNDNgLjJeYSNeMi00MmRrM2BgLS1kLS9zcw%3D%3D&l=2023062715280030A46D62A1944C09A04F&btag=e00028000"
      },
      {
          "src": "//v26-web.douyinvod.com/4d55158b93f09f1ac4d86b66bb42cc4e/649a9de1/video/tos/cn/tos-cn-ve-152c001-alinc2/owOAiQsiiMCFogZQIPAB1QZCmAEvvMVnSI2zJ/?a=6383&ch=5&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=1233&bt=1233&cs=0&ds=4&ft=GN7rKGVVywIiRZm8Zmo~xj7ScoAppB996vrKktfDfto0g3&mime_type=video_mp4&qs=0&rc=ZGZkaGY8NTQ3ZTs4M2Q6NEBpajozN285cmx1bDMzNGkzM0BhLzRhNmItNWAxNDNgLjJeYSNeMi00MmRrM2BgLS1kLS9zcw%3D%3D&l=2023062715280030A46D62A1944C09A04F&btag=e00028000"
      },
      {
          "src": "//www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cicr6inog65l740057ag&line=0&file_id=a1571ac065784bc48102e99cde7a2cda&sign=05b1511ce3feee7ed6c65a84ad9be301&is_play_url=1&source=PackSourceEnum_FEED&aid=6383"
      }
  ],
  DynamicBg: {
      disable: false
    },
    marginControls: false,
    loop: false,
    autoplay: true,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    width: '100%',
    ignores:['playbackrate'],
    plugins: [TextTrack],
    rotate: true,
    // controls: {
    //   // mode: 'normal',
    //   // initShow: true
    // },
    fullscreen: {
      rotateFullscreen: true
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
    height: 700,
    ...config
  })

  // setTimeout(() => {
  //   window[p].registerPlugin(Poster)
  // }, 10)
  window[p].once('canplay',() => {
    console.log('>>>>>canplay seek', window[p].media.seekable.end(0))
    window[p].seek(30)
    window[p].play()
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
