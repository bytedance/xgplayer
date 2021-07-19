# xgplyer-livevideo

xgplyer-livevideo 是可以防止劫持、能够实现移动端软解播放的播放器，通过接受h264帧与AAC数据，实现高效、流畅的播放体验。

## 安装

```bash
npm i xgplayer-livevideo 
```

## 使用

```js
import 'xgplayer-livevideo';

const video = document.createElement('live-video');


video.setVideoMeta(videoMeta);
video.setAudioMeta(audioMeta);

video.onDemuxComplete(videoTrack, audioTrack);

```

### videoMeta关键信息

| 字段名          | 含义        |
| --------------- | ----------- |
| sps             | 视频sps     |
| pps             | 视频pps     |
| frameRate.fps   | 帧率        |
| frameRate.fixed | 是否固定fps |

### audioMeta关键信息

| 字段名          | 含义                |
| --------------- | ------------------- |
| objectType      | AAC音频等级（重要） |
| sampleRateIndex | 视频pps             |
| channelCount    | 声道数量            |

### videoTrack

| 字段名  | 含义        |
| ------- | ----------- |
| Meta    | videoMeta   |
| Samples | mediaSample |

### videoTrack

| 字段名  | 含义        |
| ------- | ----------- |
| Meta    | audioMeta   |
| Samples | mediaSample |

### mediaSample

| 字段名 | 含义     |
| ------ | -------- |
| dts    | 解码时间 |
| pts    | 展示时间 |
| data   | 帧数据   |

### 事件
livevideo的事件基本向HTML video看齐，同时有一些专有的事件向外抛出


| 事件名 | 参数 | 含义 |
| ------ | -------- | -----|
| lowdecode  | undefined | 解码效率低，建议降级/降低分辨率 |

监听到lowdecode,可以通过 video.degradeInfo拿到一些降级信息。

| 字段名 | 含义     |
| ------ | -------- |
| fps    | 视频帧率 |
| decodeFps    | 解码效率 |
| bitrate   | 视频码率   |
| url | video src 值|
|msg (option)| 错误信息 |


### video属性
大部分video属性向HTML video看齐，同时有一些特有的动态属性可以供业务访问

| 属性名名 | 类型 | 含义 |
| ------ | -------- | ----- |
| decodeFps  | number | 真实的解码速率 |
| decodeCost | number | 最近一帧的解码耗时 |
| bitrate | number | 平均码率（最近10帧数据） |
