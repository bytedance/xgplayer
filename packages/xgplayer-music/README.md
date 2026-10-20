# xgplayer-music

`xgplayer-music` 是 xgplayer 3.x 的音乐播放界面与播放列表 preset。它将播放器切换为
音频模式，并提供封面、标题、上一首、下一首、快退、快进、循环模式、AB 循环、歌词
和频谱分析等音乐场景能力。

它不解析 MP3 帧、不创建 MediaSource，也不负责 HTTP Range、转封装或音频 codec
兼容。媒体仍由浏览器原生 `<audio>` 或其他 streaming plugin 加载。

```text
xgplayer-music
  ├─ MusicPreset：音乐布局与控制组件
  ├─ Music：播放列表、切歌、循环、AB 循环
  ├─ Analyze：Web Audio 频谱可视化
  └─ Lyric：LRC 歌词解析和同步

媒体加载
  ├─ 浏览器原生 <audio src>
  └─ xgplayer-mp3 / xgplayer-hls 等 streaming plugin
```

## 安装

使用同一主版本的稳定包：

```bash
yarn add xgplayer@3 xgplayer-music@3
```

或者：

```bash
npm install xgplayer@3 xgplayer-music@3
```

## 基础用法

```html
<div id="player"></div>
```

```js
import Player from 'xgplayer'
import MusicPreset from 'xgplayer-music'
import 'xgplayer/dist/index.min.css'
import 'xgplayer-music/dist/index.min.css'

const list = [
  {
    src: 'https://example.com/audio/episode-1.m4a',
    vid: 'episode-1',
    title: 'Episode 1',
    poster: 'https://example.com/posters/episode-1.jpg'
  },
  {
    src: 'https://example.com/audio/episode-2.m4a',
    vid: 'episode-2',
    title: 'Episode 2',
    poster: 'https://example.com/posters/episode-2.jpg'
  }
]

const player = new Player({
  id: 'player',
  url: list[0].src,
  width: '100%',
  height: 70,

  // xgplayer 3.x 使用 presets（复数）。
  // 保留 default preset，MusicPreset 在其基础上替换为音乐布局。
  presets: ['default', MusicPreset],

  music: {
    list,
    mode: 'order',
    timeScale: 15
  }
})
```

`MusicPreset` 会自动设置：

- `mediaType: 'audio'`
- `controls.mode: 'flex'`
- `controls.initShow: true`
- `marginControls: true`
- 音乐场景需要的内置控制组件与忽略项

因此不需要再手动复制这些配置。`url` 建议显式设置为 `list[0].src`，便于其他
streaming plugin 在初始化阶段拿到首个媒体地址。

## 与 xgplayer-mp3 的区别

两个包解决的是不同层级的问题：

| 能力 | `xgplayer-music` | `xgplayer-mp3` |
| --- | --- | --- |
| 主要职责 | 音乐 UI、播放列表和交互 | 独立 MP3 的加载、索引与 MSE 播放 |
| 输入格式 | 任何浏览器或其他插件可播放的音频 | MPEG-1/2/2.5 Audio Layer III |
| 创建 `audio/mpeg` SourceBuffer | 否 | 是 |
| HTTP Range 与预加载 | 否 | 是 |
| ID3、Xing、Info、VBRI 解析 | 否 | 是 |
| CBR/VBR seek 映射 | 否 | 是 |
| 上一首、下一首、循环模式 | 是 | 否 |
| 封面、标题、歌词、频谱 | 是 | 否 |

简单判断：

- 只需要音乐样式、播放列表和切歌：使用 `xgplayer-music`。
- 只需要独立 MP3 的 MSE/Range 播放：使用 `xgplayer-mp3`。
- 两者都需要：同时使用。

### 与 xgplayer-mp3 组合

```bash
yarn add xgplayer@3 xgplayer-music@3 xgplayer-mp3@3
```

```js
import Player from 'xgplayer'
import MusicPreset from 'xgplayer-music'
import MP3Plugin from 'xgplayer-mp3'
import 'xgplayer/dist/index.min.css'
import 'xgplayer-music/dist/index.min.css'

const list = [
  {
    src: 'https://example.com/audio/talk-1.mp3',
    vid: 'talk-1',
    title: 'Talk 1',
    poster: 'https://example.com/posters/talk-1.jpg'
  },
  {
    src: 'https://example.com/audio/talk-2.mp3',
    vid: 'talk-2',
    title: 'Talk 2',
    poster: 'https://example.com/posters/talk-2.jpg'
  }
]

const player = new Player({
  id: 'player',
  url: list[0].src,
  width: '100%',
  height: 70,
  presets: ['default', MusicPreset],
  plugins: [MP3Plugin],

  music: {
    list,
    mode: 'order'
  },

  mp3: {
    maxBufferLength: 40,
    minBufferLength: 5,
    bufferBehind: 30,
    segmentDuration: 10
  }
})
```

组合后：

1. `MusicPreset` 注册音乐控制组件和 `Music` 播放列表插件。
2. `MP3Plugin` 接管独立 MP3 的 SourceBuffer、Range 和 seek。
3. Music 调用 `player.playNext()` 切歌时，MP3Plugin 加载下一条 MP3，并保留
   xgplayer 的播放状态与生命周期。
4. 浏览器不支持 `audio/mpeg` MSE，或者 MP3 超出支持范围时，MP3Plugin 默认降级到
   原生 `<audio src>`；Music UI 与播放列表仍然可用。

有关 MP3 codec、MPEG Audio Version、ID3、CBR/VBR 和服务端 Range 要求，请参阅
[`xgplayer-mp3` README](https://github.com/bytedance/xgplayer/tree/main/packages/xgplayer-mp3#readme)。

## Music 配置

| 配置 | 默认值 | 说明 |
| --- | --- | --- |
| `list` | `[]` | 播放列表 |
| `mode` | `'order'` | 播放模式 |
| `timeScale` | `15` | 快进和快退秒数 |
| `preloadNext` | `true` | 播放超过一半后预加载下一首 |
| `abCycle` | `null` | AB 循环配置 |
| `offline` | `false` | 使用 xgplayer database 的离线缓存能力 |

播放列表项：

```ts
interface MusicListItem {
  src: string
  vid: string | number
  title?: string
  poster?: string
}
```

注意字段名是 `src`，不是 `url`。

### 播放模式

| mode | 行为 |
| --- | --- |
| `order` | 顺序播放，列表末尾停止 |
| `sloop` | 单曲循环 |
| `loop` | 列表循环 |
| `random` | 随机播放 |

## Music API

通过 `player.plugins.music` 访问：

```js
const music = player.plugins.music

music.next()
music.prev()
music.forward()
music.backward()
music.setIndex(2)
music.add({
  src: 'https://example.com/audio/new-track.m4a',
  vid: 'new-track',
  title: 'New track'
})
music.remove('new-track')
music.updateList(nextList)

music.mode = 'random'
music.timeScale = 10
```

AB 循环：

```js
music.setAbCycle(10, 20, true, {
  text: 'Repeat',
  color: '#0fdc78'
})

music.removeAbCycle()
```

事件：

```js
player.on('change', (item) => {
  console.log('current music item', item)
})

player.on('abCycle_ended', () => {
  console.log('AB cycle ended')
})
```

## 频谱分析

`Analyze` 使用 Web Audio API 读取播放器的媒体元素：

```html
<canvas id="spectrum"></canvas>
```

```js
import { Analyze } from 'xgplayer-music'

const analyze = new Analyze(player, document.querySelector('#spectrum'), {
  mode: 'bars',
  fftSize: 8192,
  colors: ['#0fdc78', '#27d2bf'],
  bgColor: '#171717'
})

// 不再使用时
analyze.destroy()
```

跨域媒体必须正确配置 CORS，否则 `MediaElementAudioSourceNode` 无法读取音频数据，
频谱会静音或不可用：

```js
const player = new Player({
  // ...
  videoConfig: {
    crossOrigin: 'anonymous'
  }
})
```

媒体服务器同时需要返回匹配的 `Access-Control-Allow-Origin`。

## 歌词

```js
import { Lyric } from 'xgplayer-music'

const lyric = new Lyric([lrcText], document.querySelector('#lyric'))
if (lyric.bind(player)) {
  lyric.show()
}
```

歌词实例会根据 `timeupdate` 发出 `lyricUpdate`，并更新当前歌词行。销毁或切换歌词前
应调用：

```js
lyric.unbind(player)
```

## 本地开发

```bash
yarn
yarn dev:music
```

## License

[MIT](https://opensource.org/licenses/MIT)
