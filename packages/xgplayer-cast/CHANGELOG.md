# Changelog

## [3.0.27](https://github.com/bytedance/xgplayer/compare/v3.0.26...v3.0.27) (2026-10-28)

### Bug Fixes

- **monorepo:** Harden cast lifecycle handling and TypeScript buffer compatibility. ([2f135fc](https://github.com/bytedance/xgplayer/commit/2f135fc492e0adf3ece53babb043edf3804d7b21))
- **monorepo:** Include package changelogs in npm distributions. ([87cf0de](https://github.com/bytedance/xgplayer/commit/87cf0ded4749631e650dc8517c6bff38557d5e36))

## [3.0.26](https://github.com/bytedance/xgplayer/compare/v3.0.25...v3.0.26) (2026-07-15)

### Maintenance

- No user-facing changes.

## [3.0.25](https://github.com/bytedance/xgplayer/compare/v3.0.24...v3.0.25) (2026-07-15)

### Features

- 🎸 add xgplayer-cast plugin with AirPlay support ([bd2378c](https://github.com/bytedance/xgplayer/commit/bd2378cc5510f8a92099266f68938bf5c997ce92))
- **cast:** add Chromecast i18n strings and finalize API docs ([dc8bf0b](https://github.com/bytedance/xgplayer/commit/dc8bf0b1cd3baf4530b10b1d41b9c310f1836374))
- **cast:** add configurable chromecast sdk loader ([1bb3ad6](https://github.com/bytedance/xgplayer/commit/1bb3ad6a898a1133e2cbf65dcdafa3d7fb7656b8))
- **cast:** initialize chromecast context and events ([d920ff3](https://github.com/bytedance/xgplayer/commit/d920ff35eb1d5863db4ada1b8e72ba40fad9c071))
- **cast:** normalize chromecast configuration ([0227674](https://github.com/bytedance/xgplayer/commit/022767422cd74e9ce6054ee8d2e2d3830dacdc84))
- **cast:** preserve playback handoff state ([dda4493](https://github.com/bytedance/xgplayer/commit/dda4493355a06b3e0c2615d5a13bad8318f3c5ef))
- **cast:** request chromecast session and load remote media ([5d0f3c5](https://github.com/bytedance/xgplayer/commit/5d0f3c51ed0d6eca6183c6072dfdf9b38d1f8895))
- **cast:** resolve castable media source for chromecast ([c3067c7](https://github.com/bytedance/xgplayer/commit/c3067c78804a8954f0b89656b264372afe4f5ea5))

### Bug Fixes

- 🐛 (cast) 修复投屏后，自动播放配置不生效问题 ([c116e35](https://github.com/bytedance/xgplayer/commit/c116e359e064cca9d75eca93caaca5e66536f8fd))
- **cast:** correct cast icon to standard Cast shape with inner arcs ([febc1cc](https://github.com/bytedance/xgplayer/commit/febc1ccabdbe229051bdc6b87815f477dedb57d3))
- **cast:** detect protocols via adapter capability ([bb85460](https://github.com/bytedance/xgplayer/commit/bb854604973974dd0de7c4ee0f014d62245dcda3))
- **cast:** emit disconnect after local restore ([2d43796](https://github.com/bytedance/xgplayer/commit/2d4379669083687f774d2eedf0d988203402cd28))
- **cast:** fix CAST_STATE_CHANGED not firing on init ([6e34ba8](https://github.com/bytedance/xgplayer/commit/6e34ba812a1e1f1076271f4f12466375edfe28e3))
- **cast:** harden airplay and chromecast handling ([043ea0a](https://github.com/bytedance/xgplayer/commit/043ea0a30c8457d3f226c3a958f396ee738b1800))
- **cast:** harden AirPlay and Chromecast handoff ([927b5ec](https://github.com/bytedance/xgplayer/commit/927b5ecd2c6fec871eb77ede5046abd76f6f4157))
- **cast:** harden cast media handoff ([3cda009](https://github.com/bytedance/xgplayer/commit/3cda0098ef552fc7ac7a1949c53b722dad8ddb2b))
- **cast:** harden chromecast media handling ([bac69ec](https://github.com/bytedance/xgplayer/commit/bac69ec55ca0125719ec3ccfd7959964f993258e))
- **cast:** preserve AirPlay resume time ([0464017](https://github.com/bytedance/xgplayer/commit/0464017212d91a7c27334779d5cfb4ad1abce6eb))
- **cast:** refine protocol icons ([ab27707](https://github.com/bytedance/xgplayer/commit/ab27707760785ed6f5bccafb46a9faa0fc064d41))
- **cast:** resolve chromecast media urls ([748099a](https://github.com/bytedance/xgplayer/commit/748099a700053a3cd708c3621fcc2b7d3d209fa7))
- **cast:** restore local MSE after AirPlay exit ([e8ef93f](https://github.com/bytedance/xgplayer/commit/e8ef93f1b1c4bf593ef6abc6c70339efd1d86671))
- **cast:** restore local state after cast ends ([71c8190](https://github.com/bytedance/xgplayer/commit/71c81901167235fff359f03c6f5884ece8c6bc98))
- **cast:** simplify plugin destroy cleanup ([0441fe6](https://github.com/bytedance/xgplayer/commit/0441fe6831532cabc67bcf7166de6c836eb6b6f8))
- **cast:** tighten receiver handoff timing ([d95bda9](https://github.com/bytedance/xgplayer/commit/d95bda91659d2057a3492e54c6cc5377c0b5e7ba))
- **cast:** unify receiver media resolution ([d628624](https://github.com/bytedance/xgplayer/commit/d6286241bf1e5ce64395195c655593867f1a5b7e))
- **cast:** update cast icon to standard Cast/Chromecast shape ([ba8ee1c](https://github.com/bytedance/xgplayer/commit/ba8ee1cc2e3421a19ccc63a156ba40b01f8a8bcb))
- **hls:** use source element for Safari AirPlay auto MSE ([5a22d6c](https://github.com/bytedance/xgplayer/commit/5a22d6c801d989cbd1000c29ecba01f7c33b0e6c))

## [3.0.24](https://github.com/bytedance/xgplayer/compare/v3.0.23...v3.0.24) (2026-03-18)

### Maintenance

- No user-facing changes.

## [3.0.23](https://github.com/bytedance/xgplayer/compare/v3.0.22...v3.0.23) (2025-08-05)

### Maintenance

- No user-facing changes.
