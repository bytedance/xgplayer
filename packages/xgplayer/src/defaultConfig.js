export default function getDefaultConfig () {
  return {
    id: '', // 播放器容器id
    el: null, // 播放器容器dom
    url: '', // 播放url
    nullUrlStart: false, // 空url起播
    width: 600, // 播放器宽度,单位px
    height: 337.5, // 播放器高度,单位px
    fluid: false, // 是否启用流式布局
    fitVideoSize: 'fixed', // 播放器容器适配方式 fixWidth/fixHeight/fixed
    videoFillMode: 'auto', // video画面填充模式 fillHeight/fillWidth/fill/auto
    volume: 0.6, // 默认音量
    autoplay: false, // 是否自动播放
    autoplayMuted: false, // 是否自动静音
    loop: false, // 是否循环播放
    videoInit: true, // 是否优先显示视频首帧
    poster: '', // 封面图地址
    defaultPlaybackRate: 1, // 默认播放倍数
    execBeforePluginsCall: null, // 默认插件组装前回调
    allowSeekAfterEnded: true, // 播放结束之后是否允许seek
    closeVideoClick: false, // 是否通过video的click/touchend行为切换播放暂停
    closeVideoDblclick: false, // 是否通过双击行为触发全屏切换
    closePlayerBlur: false, // 是个否启用鼠标移动激活行为
    leavePlayerTime: 0, // 延迟触发时间
    closePlayVideoFocus: false, // 是否关闭play时触发focus
    closePauseVideoFocus: false, // 是否关闭pause时触发focus
    closeFocusVideoFocus: false, // 是否关闭播放器移动鼠标时触发focus
    closeControlsBlur: false, // 鼠标移出播放器控制条范围时触发focus事件
    videoAttrbutes: {}, // video扩展属性
    startTime: 0, // 自动播放起始时间点
    isSeekedPlay: true, // seek结束之后是否默认播放
    disableSwipeHandler: () => {
    },
    enableSwipeHandler: () => {
    },
    // 是否删除
    ignores: [],
    whitelist: [],
    inactive: 3000, // 进度条自动消失延时
    lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
    controls: true,
    controlsList: [],
    // 内置插件相关配置
    screenShot: false, // 截图插件
    rotate: false, // 旋转插件
    pip: false, // pip插件
    mini: false, // 迷你小窗插件
    cssFullscreen: true, // 页面全屏
    keyShortcut: true, // 是否开启快捷键
    presets: [],
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    playsinline: true,
    icons: {},
    commonStyle: { // 用于配置一些通用样式结构
      progressColor: '', // 进度条底色
      playedColor: '', // 播放完成部分进度条底色
      cachedColor: '', // 缓存部分进度条底色
      sliderBtnStyle: '', // 进度条滑块样式
      volumeColor: ''
    }
  }
}
