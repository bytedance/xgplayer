export default {
  LANG: 'zh-cn',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: '视频下载错误'
      },
      mse: {
        code: 2,
        msg: '流追加错误'
      },
      parse: {
        code: 3,
        msg: '解析错误'
      },
      format: {
        code: 4,
        msg: '格式错误'
      },
      decoder: {
        code: 5,
        msg: '解码错误'
      },
      runtime: {
        code: 6,
        msg: '语法错误'
      },
      timeout: {
        code: 7,
        msg: '播放超时'
      },
      other: {
        code: 8,
        msg: '其他错误'
      }
    },
    HAVE_NOTHING: '没有关于音频/视频是否就绪的信息',
    HAVE_METADATA: '音频/视频的元数据已就绪',
    HAVE_CURRENT_DATA: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒',
    HAVE_FUTURE_DATA: '当前及至少下一帧的数据是可用的',
    HAVE_ENOUGH_DATA: '可用数据足以开始播放',
    NETWORK_EMPTY: '音频/视频尚未初始化',
    NETWORK_IDLE: '音频/视频是活动的且已选取资源，但并未使用网络',
    NETWORK_LOADING: '浏览器正在下载数据',
    NETWORK_NO_SOURCE: '未找到音频/视频来源',
    MEDIA_ERR_ABORTED: '取回过程被用户中止',
    MEDIA_ERR_NETWORK: '网络错误',
    MEDIA_ERR_DECODE: '解码错误',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音频/视频格式',
    REPLAY: '重播',
    ERROR: '网络连接似乎出现了问题',
    PLAY_TIPS: '播放',
    PAUSE_TIPS: '暂停',
    PLAYNEXT_TIPS: '下一集',
    DOWNLOAD_TIPS: '下载',
    ROTATE_TIPS: '旋转',
    RELOAD_TIPS: '重新载入',
    FULLSCREEN_TIPS: '进入全屏',
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '进入样式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出样式全屏',
    TEXTTRACK: '字幕',
    PIP: '画中画',
    SCREENSHOT: '截图',
    LIVE: '正在直播',
    OFF: '关闭',
    OPEN: '开启',
    MINI_DRAG: '点击按住可拖动视频',
    MINISCREEN: '小屏幕',
    REFRESH_TIPS: '请试试',
    REFRESH: '刷新',
    FORWARD: '快进中',
    LIVE_TIP: '直播'
  }
}
