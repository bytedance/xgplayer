# Changelog

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Features

- add resume content callback ([9cdbd5b](https://github.com/bytedance/xgplayer/commit/9cdbd5b2884fa0bcdb18b6ab1d4f223707015717))

### Bug Fixes

- plugin插件增加存储除root外的额外dom的extraEls属性 ([b9d0fe0](https://github.com/bytedance/xgplayer/commit/b9d0fe07d658280b2e311d65928270bd5d842682))
- 修复ad修饰插件timeIcon的额外dom不能正常显示隐藏的问题 ([262db24](https://github.com/bytedance/xgplayer/commit/262db2421314b32ac1c6c5263975e6f664394337))

## [3.0.22](https://github.com/bytedance/xgplayer/compare/v3.0.21...v3.0.22) (2025-05-06)

### Bug Fixes

- tv shouldBlockVideoContent
- 🐛 (Ads) content video is blocked to play in TV
- 🐛 (Ads) fix ads plugin umd exports
- 🐛 (Ads) always autoplay for LG & Samsung TV

## [3.0.21](https://github.com/bytedance/xgplayer/compare/v3.0.20...v3.0.21) (2025-02-24)

### Maintenance

- No changes recorded.

## [3.0.20](https://github.com/bytedance/xgplayer/compare/v3.0.19...v3.0.20) (2024-08-22)

### Features

- 🎸 (xgplayer-ads) 增加xgplayer-ads插件，丰富xgplayer货币化能力
- 🎸 (xgplayer-ads) 支持IMA SDK插件内异步加载
- 🎸 (xgplayer-ads) 实现AdUIManager，对Play/Time等UI进行广告适配
- 🎸 (xgplayer-ads) 支持广告期间，不显示播控UI
- 🎸 (xgplayer-ads) 广告UI独立于内容UI

### Bug Fixes

- 🐛 (xgplayer-ads) 修复广告无配置的情况下，内容无法自动播放的问题
- 🐛 (xgplayer-ads) 针对非广告时，隐藏广告容器，以支持内容区域可操作
- (xgplayer-ads) 非autoplay时播放器初始化被阻塞
- 🐛 (xgplayer-ads) 修复广告被用户跳过后，广告容器依旧展示的问题
- 🐛 (xgplayer-ads) 修复前贴片广告容器展示的时机，减少内容漏出的时机
- 🐛 (xgplayer-ads) 广告播放时，隐藏replay组件
- 🐛 (xgplayer-ads) pod中非最后一个广告，则不隐藏广告容器，减少内容和广告之间的切换

### Code Refactoring

- 💡 (xgplayer-ads) 完善IMA SDK集成能力
- 💡 (xgplayer-ads) 增加adUIManager销毁处理
