# 直播版本更新记录

## live@3.0.0-alpha.123 + helper@2.4.33
>* feat: (xgplayer-live) 直播插件添加版本号信息 flvlive|hlslive|hlsvod.version
>* feat: (xgplayer-flv-live) sei解析支持按需抛出 flvlive:{seiOnDemand:true} 开启
>* fix: (fetch-loader) 刷新页面时 reader() throw error
>* fix: (xgplayer-livevideo) firstframe事件不触发
>* fix: (xgplayer-raw264) 对xgplayer-mobilevideo引用替换成xgplayer-livevideo


## live@3.0.0-alpha.122 + helper@2.4.32
>* feat: (xgplayer-live) 增加拉流时间可配置 loadTimeout
>* fix: (xgplayer-livevideo) hls vod seek后暂停 拉到数据后自动起播问题
>* fix: (xgplayer-hls-live) m3u8刷新间隔调整、可变
>* fix: (xgplayer-live) slardar报错治理


## live@3.0.0-alpha.121 + helper@2.4.31
>* fix: (xgplayer-helper-codec) compat中对48000采样率音频的处理会导致累计误差，造成音画不同步
>* chore: (xgplayer-flv-live) fftb事件对外暴露参数调整
>* fix: (xgplayer-helper-transmuxers) remuxer模块重构对flv abr使用的影响

## live@3.0.0-alpha.120 + helper@2.4.30
>* fix: lib文件下导出的文件不是commonjs格式
>* fix: (xgplayer-helper-transmuxers) 火狐下 HE-AACv2编码且采样率为22050的音频播放失败
>* fix: (xgplayer-helper-transmuxers) compat.js 改动解决hls vod流重复处理首个分片时存在音画不同步问题、个别流最后几帧不播放
>* **breakchange** (xgplayer-mobilevideo): xgplayer-mobilevideo调整为xgplayer-livevideo
>* feat: (xgplayer-flv-live) 新增 fftb(拉流首字节耗时) 事件用于耗时统计



