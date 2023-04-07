# MP4Loader

MP4Loader 可以自定义加载单个 MP4 文件。

## API

### 参数

```js
{
  vid: '', // 视频 id，默认为 视频 url
  moovEnd: 8000, // moov 盒子结束
  segmentDuration: 5, // 期望的一个视频分片时长，实际会在该时长附近
  maxDownloadInfoSize: 30, // 最大下载信息数组记录大小
  cache: null, // 自定义 cache 对象
  loaderType: LoaderType.FETCH, // loader 类型，默认 fetch，不支持时会自动降级为 xhr
  retry: 0, // 重试次数
  retryDelay: 0, // ms，每次重试间隔
  timeout: 0, // 请求超时时间，默认不设置
  request: null, // 请求 Request 对象
  onTimeout: undefined, // 超时回调钩子
  onRetryError: undefined, // 单次重试回调钩子
  transformRequest: undefined, // 请求前会调用，可用来修改请求参数
  transformResponse: undefined, // 响应后会调用，可以修改响应对象
  url: '', // mp4 地址
  params: undefined, // url 查询参数，为普通对象
  method: 'GET', // 请求方法
  headers: {}, // 自定义 header
  body: undefined, // post 请求体
  mode: undefined, // 同 fetch
  credentials: undefined, // 同 fetch
  cache: undefined, // 同 fetch
  redirect: undefined, // 同 fetch
  referrer: undefined, // 同 fetch
  referrerPolicy: undefined, // 同 fetch
  integrity: undefined, // 同 fetch
}
```

### 属性

```js
const loader = new Loader()

loader.vid // 视频 vid，用于缓存 key
loader.meta // 视频元数据
// {
//   videoCodec, // 视频编码字符串
//   audioCodec, // 音频编码字符串
//   width, // 宽度
//   height, // 高度
//   audioChannelCount, // 音频通道数
//   audioSampleRate, // 音频采样率
//   duration, // 视频时长
//   moov // MP4Parser moov 对象
// }
loader.downloadInfo // 网络下载信息数组
// {
//   startTime, // 开始下载时间戳
//   endTime,   // 结束下载时间戳
//   size,      // 下载数据大小
//   range      // range 范围 [start, end]
// }
loader.cache // loader 当前的 cache 对象
```

### 方法

#### loadMeta



