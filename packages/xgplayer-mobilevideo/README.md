# xgplyer-mobilevideo

xgplyer-mobilevideo 是可以防止劫持、能够实现移动端软解播放的播放器，通过接受h264帧与AAC数据，实现高效、流畅的播放体验。

## 安装

```bash
npm i xgplayer-mobilevideo 
```

## 使用

```js
import 'xgplayer-mobilevideo';

const video = document.createElement('mobile-video');


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
