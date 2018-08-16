# 播放器监控与数据上报

TODOs:

- [ ] 完善获取上报的数据
- [ ] 上报错误时，重试与下次重试机制
- [ ] 增加校验，防止刷数据

## 使用方式:

```javascript
import Player from "xgplayer"
import "player-logger"

new Player({
  // 必传 vid / uid
  vid: "",
  uid: "",
  ...
})
```

## 上报方式:

1.主动上报:

```javascript
/**
 * 可选传入上报数据，如果不填，则使用监控插件收集的数据进行上报操作
 */
player.emit('DATA_REPORT' [, reportData])
```

2.基于事件捕获:

插件通过对player的常用事件进行监听，整合信息后进行上报工作。

## 插件的上报时机为:

- 首次播放时
- 发生错误时，[错误分类](https://wiki.bytedance.net/pages/viewpage.action?pageId=177233456)
- 播放、暂停时
- 视频结束时
- Seek完毕时

## 引入 tea:

在视频播放时与报错时，上报到tea进行记录。

## 引用:

本插件具体上报的数据细节详参: [上报数据](https://wiki.bytedance.net/pages/viewpage.action?pageId=175564275)

对于异常的抛出，应该遵循：[自研播放器之错误监控规范](https://wiki.bytedance.net/pages/viewpage.action?pageId=177233456)

与tea对接后，设计的事件: [自研播放器上报tea](https://wiki.bytedance.net/pages/viewpage.action?pageId=179412453)


## 使用方式:

关于category、action、label和value的定义，可以参见 cnzz、baidu和gtag自定义事件的说明
const player = new Player({
  ...otherConfig,
  loggers: [{
    type: 'cnzz' | 'baidu' | 'gtag' | 'raven',
    options: { //以下为默认值，可以传入以覆盖
        category: 'video',
        actions: { // 覆盖事件触发时的action
            error: 'error',
            complete: 'complete',
            play: 'play',
            pause: 'pause',
            end: 'end',
            ready: 'ready',
            seek: 'seek',
            unload: 'unload'
        },
        label: player.config.url, // label 的值
        value: { // label 的值
            error: (player) => player.currentTime,
            complete: (player) => player.currentTime,
            play: (player) => player.currentTime,
            pause: (player) => player.currentTime,
            end: (player) => player.currentTime,
            unload: (player) => player.currentTime,
            seek: (player) => player.currentTime,
            ready: (player) => player.currentTime
        }
    }
  }]
})
## ChangeLog:

### v1.0:

- 已接入 tea，appid为 1300

### v2.0

- 接入 CNZZ、Gtag、百度统计
- 支持同时向多个统计发送事件