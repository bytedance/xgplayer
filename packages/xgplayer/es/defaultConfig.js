export default function getDefaultConfig() {
  return {
    id: '', // 播放器容器id
    el: null, // 播放器容器dom
    url: '', // 播放url
    width: 600, // 播放器宽度,单位px
    height: 337.5, // 播放器高度,单位px
    fluid: false, // 是否启用流式布局
    fitVideoSize: 'auto', // fixWidth/fixHeight/auto
    volume: 0.6, // 默认音量
    autoplay: false, // 是否自动播放
    autoplayMuted: false, // 是否自动静音
    loop: false, // 是否循环播放
    videoInit: false, // 是否优先显示视频首帧， mobile模式下无效
    poster: '', // 封面图地址
    defaultPlaybackRate: 1, // 默认播放倍数
    execBeforePluginsCall: null, // 默认插件组装前回调
    closeVideoClick: false, // 是否通过video的click/touchend行为切换播放暂停
    closeVideoDblclick: false, // 是否通过双击行为触发全屏切换
    closePlayerBlur: false, // 是个否启用鼠标移动激活行为
    leavePlayerTime: 0, // 延迟触发时间
    closePlayVideoFocus: false, // 是否关闭play时触发focus
    closeFocusVideoFocus: false, // 是否支持播放器移动鼠标时触发focus
    closeControlsBlur: false, // 鼠标移出播放器控制条范围时触发focus事件
    videoAttrbutes: {}, // video扩展属性
    // 是否删除
    ignores: [],
    whitelist: [],
    inactive: 3000,
    lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
    controls: true,
    controlsList: [],
    // 内置插件相关配置
    screenShot: false, // 截图插件
    rotate: false, // 旋转插件
    pip: false, // pip插件
    mini: false, // 迷你小窗插件
    cssFullscreen: true, // 页面全屏
    keyShortcut: true // 是否开启快捷键
  };
}