# Changelog

## [3.0.27](https://github.com/bytedance/xgplayer/compare/v3.0.26...v3.0.27) (2026-10-28)

### Features

- **mp3:** Add standalone MP3 MSE playback with Range seek and native fallback. ([65f8649](https://github.com/bytedance/xgplayer/commit/65f86494c60872332e150c731925c06f456a2478))

### Bug Fixes

- **monorepo:** Harden cast lifecycle handling and TypeScript buffer compatibility. ([2f135fc](https://github.com/bytedance/xgplayer/commit/2f135fc492e0adf3ece53babb043edf3804d7b21))
- **monorepo:** Include package changelogs in npm distributions. ([87cf0de](https://github.com/bytedance/xgplayer/commit/87cf0ded4749631e650dc8517c6bff38557d5e36))
- **transmuxer:** accept minimum 4-byte UTF-8 sequence U+10000 ([ea781cd](https://github.com/bytedance/xgplayer/commit/ea781cdee035873ad43a802c4ee23ad65d7d937f))
- **transmuxer:** Avoid emitting zero-duration video samples for PES data without timestamps. ([65b6a0e](https://github.com/bytedance/xgplayer/commit/65b6a0ec223e3a92d55c4453df419197806967d4))
- **transmuxer:** Fix HEVC decode failures across implicit stream discontinuities. ([d72119a](https://github.com/bytedance/xgplayer/commit/d72119a14514711b5cf4ea35a33e2a6fcc53a4fc))
- **transmuxer:** Keep video samples after timestamp recovery. ([4aabb65](https://github.com/bytedance/xgplayer/commit/4aabb65d5d3ef5cf695b035b2c8d388c3edea8c5))
- **xgplayer-transmuxer:** Drop malformed AAC ADTS frames with no payload and avoid using malformed leading audio samples as gap-fill fallback. ([9bd0e3f](https://github.com/bytedance/xgplayer/commit/9bd0e3faa049641208902b770c42f03fcfe32d70))
- **xgplayer-transmuxer:** Fix Exp-Golomb reads at buffer boundaries. ([ba30105](https://github.com/bytedance/xgplayer/commit/ba3010507e82af292ea62c72d2b02d1fb50efd6a))
- **xgplayer-transmuxer:** Improve transmuxer TypeScript declaration coverage for codec and package entry exports. ([4a1ae54](https://github.com/bytedance/xgplayer/commit/4a1ae5418e0c5f05cca890f63b0ed7f44b538c39))

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- **mp4:** add memoryOpt demux mode ([7dde665](https://github.com/bytedance/xgplayer/commit/7dde665802e83489498b59597fd920b4df1993d3))
- **transmuxer:** add VVC and BVC2 codec parsing support ([b529a3f](https://github.com/bytedance/xgplayer/commit/b529a3f43353c0a1d38e955a9389b686e5442222))
- **transmuxer:** make bvc2 codec registration external ([bfcc9a1](https://github.com/bytedance/xgplayer/commit/bfcc9a1a75cb6fcd389b3d2b69ffadcb5c3c649a))
- **transmuxer:** 支持标准 VVC ([93e10e6](https://github.com/bytedance/xgplayer/commit/93e10e6a9551b641baa259f4f99bf88c95e2b4b2))

### Bug Fixes

- **mp4-loader:** reduce CTTS and MP4 parser allocations ([7e387c4](https://github.com/bytedance/xgplayer/commit/7e387c4374182a0c8c5d0b9fab387ccc9d6625fb))
- **mp4-loader:** reduce moov meta buffer memory usage ([cee4569](https://github.com/bytedance/xgplayer/commit/cee4569bce5b88801539c4e1a8c53a9bd6988dc6))
- **mp4-loader:** reuse CTTS offset state during segment parsing ([aad6108](https://github.com/bytedance/xgplayer/commit/aad6108cd4731a2c2e9349eeb623b3fc25336865))
- **mp4-loader:** 修复 Chrome M75- 负 DTS 开播失败 ([e12050a](https://github.com/bytedance/xgplayer/commit/e12050a36dd455477f4420ed35f3c6fdfa44f439))
- **mp4-loader:** 修复加密视频时长异常过大问题 ([1ab1c33](https://github.com/bytedance/xgplayer/commit/1ab1c337452a79b4c63fb7f94061dc8482966037))
- **mp4-loader:** 调整 MP4 音画同步方案 ([70e7bea](https://github.com/bytedance/xgplayer/commit/70e7bea6351f1959c61c268b043799d0b09eccfa))
- **mp4:** 修复 MP4 音画不同步问题 ([2dda8f7](https://github.com/bytedance/xgplayer/commit/2dda8f70c5b8c1ee545dd5db1cb81058d73a1c2c))
- **transmuxer:** add optional chaining for index range checks ([12c85f8](https://github.com/bytedance/xgplayer/commit/12c85f8a712c2f04395eea0b05781cfee3256478))
- **transmuxer:** clamp demux ranges and preserve remain buffer ([ce169c3](https://github.com/bytedance/xgplayer/commit/ce169c3d92faac55b99f6befc77c8e387177bdfb))
- **transmuxer:** correct next segment frame index ([5de2528](https://github.com/bytedance/xgplayer/commit/5de2528da97a43b358468a760dbfbcf370df539c))
- **transmuxer:** harden MP4 parser edge cases ([f53203d](https://github.com/bytedance/xgplayer/commit/f53203d431c115b89944f8f56e35b0ffd0f7bf4b))
- **transmuxer:** mark VVC nal info in side data ([0f1f0f9](https://github.com/bytedance/xgplayer/commit/0f1f0f9ef7abd0c918ef7a9695652aa7e4b36d5f))
- **transmuxer:** match ExpGolomb import casing ([3c69550](https://github.com/bytedance/xgplayer/commit/3c69550c012f0e1ba99b370581ff342f25922543))
- **transmuxer:** parse nclc color parameters ([bef3eae](https://github.com/bytedance/xgplayer/commit/bef3eae5e4e647d65a92cf9234945d63e008fa26))
- **transmuxer:** preserve demuxPart remain buffer metadata ([1755105](https://github.com/bytedance/xgplayer/commit/17551053ca20ccad9b80308486f9a8eb3852f2e2))
- **transmuxer:** report unregistered video codec parsers ([347276c](https://github.com/bytedance/xgplayer/commit/347276ce2dfcab161064d4417b98339632fb5e01))
- **transmuxer:** satisfy VVC codec lint rules ([74431c9](https://github.com/bytedance/xgplayer/commit/74431c98d91c7d1a9e5185ab534fa9953877d63d))
- **transmuxer:** skip audio lookup for empty ranges ([e28a0e8](https://github.com/bytedance/xgplayer/commit/e28a0e82e3c5fd44a5ff409a5243d9694f3afb67))
- **transmuxer:** 修复负 media_time 解析错误 ([c91bb57](https://github.com/bytedance/xgplayer/commit/c91bb57ec7784e9cac7b19a40ae18314bae97301))

### Performance Improvements

- **mp4-loader:** 优化首帧 demux 加载 ([c3514c9](https://github.com/bytedance/xgplayer/commit/c3514c9d0c9dc8f5516d19d5dc900bf49d86062a))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Bug Fixes

- 🐛 (mp4)  audio sample rate ([eda69e6](https://github.com/bytedance/xgplayer/commit/eda69e691742dfc5958906403bf019d776fa1ae8))
- 🐛 (mp4) retrieve audio sample rate from esds [#1830](https://github.com/bytedance/xgplayer/issues/1830) ([a74beb9](https://github.com/bytedance/xgplayer/commit/a74beb954f480fced1627028f8d8589650ae1d97))
- 🐛 build error ([0550a8a](https://github.com/bytedance/xgplayer/commit/0550a8a90b72d71232070abdaa732a008936318b))

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Bug Fixes

- 🐛 (flv) 修复flv视频宽高异常问题 ([b37cb3a](https://github.com/bytedance/xgplayer/commit/b37cb3acc2c3c241bf1a2c9fb77469383eb1b967))
