# Changelog

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- **streaming-shared:** add process gap timeout for fetch loader ([1fbe93d](https://github.com/bytedance/xgplayer/commit/1fbe93d4f1b50765ed1073f3fa09d8c292d7f64c))
- **streaming-shared:** propagate first-byte RTT ([9c42222](https://github.com/bytedance/xgplayer/commit/9c42222f9ccafc0837001f907c31fcd9f2b8d42a))
- **streaming-shared:** 增加动态超时、RTT 和网络错误上报 ([9a0f368](https://github.com/bytedance/xgplayer/commit/9a0f368404abe0860380b938d02ff73448a8ffc5))

### Bug Fixes

- **cast:** preserve AirPlay fallback with MSE attach mode ([40de9b7](https://github.com/bytedance/xgplayer/commit/40de9b7c15a0db5fa32cfc6eec9e2735a5f9aa04))
- **cast:** restore local MSE after AirPlay exit ([e8ef93f](https://github.com/bytedance/xgplayer/commit/e8ef93f1b1c4bf593ef6abc6c70339efd1d86671))
- **hls:** use source element for Safari AirPlay auto MSE ([5a22d6c](https://github.com/bytedance/xgplayer/commit/5a22d6c801d989cbd1000c29ecba01f7c33b0e6c))
- **mp4-loader:** reduce moov meta buffer memory usage ([cee4569](https://github.com/bytedance/xgplayer/commit/cee4569bce5b88801539c4e1a8c53a9bd6988dc6))
- **mp4-loader:** report Uint8Array allocation failures ([c7dc56b](https://github.com/bytedance/xgplayer/commit/c7dc56b3285fafa9c9ea15862bf79b5ad754b3b2))
- **streaming-shared:** handle MSE abort queue errors ([309c226](https://github.com/bytedance/xgplayer/commit/309c226269d34e66513f3a07145f0913af7415a9))
- **streaming-shared:** refine MSE clearOpQueues behavior ([838ad30](https://github.com/bytedance/xgplayer/commit/838ad30952edaff7e2b1cfe57fa9e50251411e23))
- **streaming-shared:** reset received length and use subarray cache ([02cbef9](https://github.com/bytedance/xgplayer/commit/02cbef9e79b8f061b3cf33dae57e5675930f91ee))
- **streaming:** remove unsafe static MSE logger ([eb3a0f0](https://github.com/bytedance/xgplayer/commit/eb3a0f07a9993767f69e475878863a46153ecc33))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Features

- 更改默认mms为true ([af621ea](https://github.com/bytedance/xgplayer/commit/af621eacb682db74bbbb0afd6e756060c1885b77))
- 静态方法支持mms透传 ([3dabdf7](https://github.com/bytedance/xgplayer/commit/3dabdf7d5c987c795bbaabb61c7cc6a01ad579b5))

## next.34

### Features

- 增加公共错误码信息

## next.33

### Bug Fixes

- getStats() 统计帧率不准确问题
