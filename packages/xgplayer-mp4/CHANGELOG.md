# Changelog

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- **mp4:** add memoryOpt demux mode ([7dde665](https://github.com/bytedance/xgplayer/commit/7dde665802e83489498b59597fd920b4df1993d3))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Bug Fixes

- check if video track has segments before accessing ([2fd2725](https://github.com/bytedance/xgplayer/commit/2fd272553471e2d8ff8af160eea14327b813482b))
- ensure audio track is not empty before accessing segments ([5c50ca7](https://github.com/bytedance/xgplayer/commit/5c50ca7dbd62cdf7322198030b368e692950c1ed))

## [3.0.22](https://github.com/bytedance/xgplayer/compare/v3.0.21...v3.0.22) (2025-05-06)

### Bug Fixes

- (xgplayer-mp4) 修复了当AV1视频流没有colr（颜色信息）box时出现的undefined错误

## [3.0.19](https://github.com/bytedance/xgplayer/compare/v3.0.18...v3.0.19) (2024-07-19)

### Features

- **xgplayer-mp4、xgplayer-transmuxer:** 支持fmp4 + av1解析播放、seek等能力
