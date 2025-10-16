import Player, { SimplePlayer, Util } from '../../packages/xgplayer/src/index'
import { TextTrack } from '../../packages/xgplayer/src/index'
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
    // url: "./heatmap.mp4",
    url : 'https://imp.volccdn.com/obj/vcloud-imp-lite/aideo_sample_1.mp4',
    pip: true,
    loop: false,
    autoplay: false,
    autoplayMuted: true,
    videoInit: true,
    preloadTime: 20,
    width: '96%',
    ignores:[],
    plugins: [],
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
    // timeSegmentsControls:{
    //   disable: false,
    //   segments: [{start: 0, end: 10}]
    // },
    keyboard: {
      seekStep: 2
    },
    progresspreview: {
      // 使用新的独立配置
      textModeTimePrefix: '高光·',
      imageModeTimePrefix: '片段·',
      ispots: [
        {
          time: 10,
          text: '精彩片段',
          image: 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image',
          type: 'image',
          id: 'spot1',
          width: 160
        },
        {
          time: 30,
          text: 'Gus冷笑揭穿Walter的谎言，紧张气氛瞬间升级',
          type: 'text',
          id: 'spot2'
        },
        {
          time: 60,
          text: '重要节点重要节点重要节点重要节点重要节点重要节点重要节点重要节点重要节点重要节点重要节点',
          image: 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image',
          type: 'image',
          id: 'spot3'
        },
        {
          time: 90,
          text: '异步加载图片示例',
          type: 'image',
          // 故意不提供image，展示加载状态，稍后异步更新
          id: 'spot4'
        },
        {
          time: 120,
          text: '文本示例11111231231321',
          type: 'text',
          id: 'spot5'
        }
      ],
      // defaultText: '默认提示文本',
      // defaultImage: 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image'
    },
    // progresspreview: {
    //   // width: 88.23,
    //   // height: 50,
    //   mode: 'short'
    // },
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
    height: 300,
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

  // 动态更新图片示例 - 演示hover状态下的loading到图片渲染过程
  setTimeout(() => {
    console.log('开始异步加载 spot4 的图片...')
    console.log('提示：请hover到90秒处的故事点，观察从loading到图片渲染的过程')
    // 模拟异步加载图片，延迟更长以便观察
    simulateAsyncImageLoadWithDelay('spot4', 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image', 3000)
  }, 2000)

  // 批量异步更新示例
  setTimeout(() => {
    console.log('批量更新多个故事点图片...')
    batchUpdateImages([
      { id: 'spot1', url: 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image' },
      { id: 'spot3', url: 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image' }
    ])
  }, 8000)
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
    text: '预览了', // 打点处的自定义文案
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

// 模拟异步加载图片的函数
function simulateAsyncImageLoad(id, imageUrl) {
  console.log(`开始加载故事点 ${id} 的图片...`)
  
  // 模拟网络延迟
  setTimeout(() => {
    try {
      // 使用新的 updateDotImage API 更新图片
      player0.plugins.progresspreview.updateDotImage(id, imageUrl)
      console.log(`故事点 ${id} 图片加载完成: ${imageUrl}`)
    } catch (error) {
      console.error(`故事点 ${id} 图片加载失败:`, error)
    }
  }, Math.random() * 2000 + 1000) // 1-3秒随机延迟
}

// 带指定延迟的异步加载图片函数，用于演示hover状态下的渲染过程
function simulateAsyncImageLoadWithDelay(id, imageUrl, delay = 3000) {
  console.log(`开始加载故事点 ${id} 的图片，延迟 ${delay}ms...`)
  console.log(`请在 ${delay}ms 内hover到对应的故事点，观察loading到图片渲染的过程`)
  
  // 添加倒计时提示
  let countdown = Math.floor(delay / 1000)
  const countdownInterval = setInterval(() => {
    console.log(`倒计时: ${countdown}秒 - 请hover到故事点 ${id}`)
    countdown--
    if (countdown < 0) {
      clearInterval(countdownInterval)
    }
  }, 1000)
  
  setTimeout(() => {
    try {
      console.log(`开始更新故事点 ${id} 的图片...`)
      
      // 检查当前是否在hover状态
      const progressPreview = player0.plugins.progresspreview
      const isHovering = progressPreview._curDot && progressPreview._curDot.getAttribute('data-id') === id
      console.log(`当前hover状态: ${isHovering ? '正在hover' : '未hover'}`)
      
      // 使用新的 updateDotImage API 更新图片
      progressPreview.updateDotImage(id, imageUrl)
      console.log(`故事点 ${id} 图片更新完成: ${imageUrl}`)
      
      if (isHovering) {
        console.log(`✅ 成功！正在hover状态下更新了图片，应该能看到实时变化`)
      } else {
        console.log(`ℹ️ 当前未在hover状态，图片已更新但需要重新hover才能看到`)
      }
    } catch (error) {
      console.error(`故事点 ${id} 图片加载失败:`, error)
    }
  }, delay)
}

// 批量更新图片的函数
function batchUpdateImages(imageList) {
  imageList.forEach((item, index) => {
    setTimeout(() => {
      simulateAsyncImageLoad(item.id, item.url)
    }, index * 500) // 每个图片间隔500ms开始加载
  })
}

// 动态创建带异步图片的故事点
function createAsyncImageDot(time, text, id) {
  const player = player0
  
  // 先创建无图片的故事点（显示loading状态）
  player.plugins.progresspreview.createDot({
    id: id,
    time: time,
    text: text,
    image: '', // 初始为空
    type: 'image'
  })
  
  // 异步加载图片
  setTimeout(() => {
    const imageUrl = 'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image'
    player.plugins.progresspreview.updateDotImage(id, imageUrl, true) // 第三个参数为true表示立即显示
    console.log(`动态创建的故事点 ${id} 图片加载完成`)
  }, 2000)
}

// 实时更新图片示例
function updateImageInRealTime(id) {
  const imageUrls = [
    'https://voddemo-cover.volcvod.com/tos-vod-cn-v-8a997967cc533b04/d3a738bc5a2b458dae1c045908118b63~tplv-vod-noop.image',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ]
  
  let currentIndex = 0
  const interval = setInterval(() => {
    const imageUrl = imageUrls[currentIndex]
    player0.plugins.progresspreview.updateDotImage(id, imageUrl)
    console.log(`实时更新故事点 ${id} 图片: ${imageUrl}`)
    
    currentIndex = (currentIndex + 1) % imageUrls.length
    
    // 更新3次后停止
    if (currentIndex === 0) {
      clearInterval(interval)
      console.log(`故事点 ${id} 实时更新完成`)
    }
  }, 3000)
}

// 将函数暴露到全局，方便在控制台测试
window.simulateAsyncImageLoad = simulateAsyncImageLoad
window.simulateAsyncImageLoadWithDelay = simulateAsyncImageLoadWithDelay
window.batchUpdateImages = batchUpdateImages
window.createAsyncImageDot = createAsyncImageDot
window.updateImageInRealTime = updateImageInRealTime
