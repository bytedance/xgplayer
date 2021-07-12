# 直播版本更新记录

## live@3.0.0-alpha.120 + helper@2.4.30
>* fix: lib文件下导出的文件不是commonjs格式
>* fix (xgplayer-helper-transmuxers): 火狐下 HE-AACv2编码且采样率为22050的音频播放失败
>* fix (xgplayer-helper-transmuxers): compat.js 改动解决hls vod流重复处理首个分片时存在音画不同步问题、个别流最后几帧不播放
>* **breakchange** (xgplayer-mobilevideo): xgplayer-mobilevideo调整为xgplayer-livevideo
>* feat (xgplayer-flv-live): 新增 fftb fftd 事件用于耗时统计

## live@3.0.0-alpha.121 + helper@2.4.31
