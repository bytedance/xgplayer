# Changelog

## [3.0.27](https://github.com/bytedance/xgplayer/compare/v3.0.26...v3.0.27) (2026-10-28)

### Bug Fixes

- **monorepo:** Include package changelogs in npm distributions. ([87cf0de](https://github.com/bytedance/xgplayer/commit/87cf0ded4749631e650dc8517c6bff38557d5e36))
- **mp4:** Fix fragmented MP4 playback, source switching, buffer eviction, and stall recovery in xgplayer-mp4. ([3c417a5](https://github.com/bytedance/xgplayer/commit/3c417a580e1204631bf426823270a205abfd08a6)), closes [#1875](https://github.com/bytedance/xgplayer/issues/1875) [#1911](https://github.com/bytedance/xgplayer/issues/1911) [#1932](https://github.com/bytedance/xgplayer/issues/1932) [#1935](https://github.com/bytedance/xgplayer/issues/1935)

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- **mp4:** add memoryOpt demux mode ([7dde665](https://github.com/bytedance/xgplayer/commit/7dde665802e83489498b59597fd920b4df1993d3))
- **streaming-shared:** propagate first-byte RTT ([9c42222](https://github.com/bytedance/xgplayer/commit/9c42222f9ccafc0837001f907c31fcd9f2b8d42a))
- **streaming-shared:** 增加动态超时、RTT 和网络错误上报 ([9a0f368](https://github.com/bytedance/xgplayer/commit/9a0f368404abe0860380b938d02ff73448a8ffc5))
- **transmuxer:** add VVC and BVC2 codec parsing support ([b529a3f](https://github.com/bytedance/xgplayer/commit/b529a3f43353c0a1d38e955a9389b686e5442222))

### Bug Fixes

- **mp4-loader:** finish loading small files under 800KB ([e9a9070](https://github.com/bytedance/xgplayer/commit/e9a907056bd5d9f41a7e5a97e33ebe74ca75fc45))
- **mp4-loader:** guard empty CTTS offsets ([6c4fad1](https://github.com/bytedance/xgplayer/commit/6c4fad1486ba85415bfadad9168350e7dbe4c6a8))
- **mp4-loader:** reduce CTTS and MP4 parser allocations ([7e387c4](https://github.com/bytedance/xgplayer/commit/7e387c4374182a0c8c5d0b9fab387ccc9d6625fb))
- **mp4-loader:** reduce moov meta buffer memory usage ([cee4569](https://github.com/bytedance/xgplayer/commit/cee4569bce5b88801539c4e1a8c53a9bd6988dc6))
- **mp4-loader:** report Uint8Array allocation failures ([c7dc56b](https://github.com/bytedance/xgplayer/commit/c7dc56b3285fafa9c9ea15862bf79b5ad754b3b2))
- **mp4-loader:** reuse CTTS offset state during segment parsing ([aad6108](https://github.com/bytedance/xgplayer/commit/aad6108cd4731a2c2e9349eeb623b3fc25336865))
- **mp4-loader:** 修复 Chrome M75- 负 DTS 开播失败 ([e12050a](https://github.com/bytedance/xgplayer/commit/e12050a36dd455477f4420ed35f3c6fdfa44f439))
- **mp4-loader:** 修复 MP4 重播卡帧及卡顿问题 ([b7f205a](https://github.com/bytedance/xgplayer/commit/b7f205ab6e21b2fb087f965980328a4070628c56))
- **mp4-loader:** 修复 stsc.entries 为空数组解析异常 ([d061dd0](https://github.com/bytedance/xgplayer/commit/d061dd0e839696a16a59622f68c5281487e4f312))
- **mp4-loader:** 调整 MP4 音画同步方案 ([70e7bea](https://github.com/bytedance/xgplayer/commit/70e7bea6351f1959c61c268b043799d0b09eccfa))
- **mp4-loader:** 默认修复 MP4 edts 时间偏移 ([1f7780b](https://github.com/bytedance/xgplayer/commit/1f7780b363ee4f29d06d53617132064b5023708f))
- **mp4:** 修复 MP4 音画不同步问题 ([2dda8f7](https://github.com/bytedance/xgplayer/commit/2dda8f70c5b8c1ee545dd5db1cb81058d73a1c2c))
- **transmuxer:** 修复 Firefox 不支持负 DTS 问题 ([a557aa7](https://github.com/bytedance/xgplayer/commit/a557aa7558ebb80709f354ce1a300738edf59df3))
- **transmuxer:** 修复负 media_time 解析错误 ([c91bb57](https://github.com/bytedance/xgplayer/commit/c91bb57ec7784e9cac7b19a40ae18314bae97301))
- 修正 mp4-loader fmp4 sidx fallback ([c8f6c33](https://github.com/bytedance/xgplayer/commit/c8f6c338d4ae53665b48072fbed4ec364e2c5e19))

### Performance Improvements

- **mp4-loader:** 优化 GOP 关键帧识别性能和内存 ([bebbf88](https://github.com/bytedance/xgplayer/commit/bebbf88111a18473b7c8534deea4ed1bcd3e8661))
- **mp4-loader:** 优化首帧 demux 加载 ([c3514c9](https://github.com/bytedance/xgplayer/commit/c3514c9d0c9dc8f5516d19d5dc900bf49d86062a))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 (mp4)  audio sample rate ([eda69e6](https://github.com/bytedance/xgplayer/commit/eda69e691742dfc5958906403bf019d776fa1ae8))
- 🐛 (mp4) retrieve audio sample rate from esds [#1830](https://github.com/bytedance/xgplayer/issues/1830) ([a74beb9](https://github.com/bytedance/xgplayer/commit/a74beb954f480fced1627028f8d8589650ae1d97))
- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Maintenance

- No user-facing changes.
