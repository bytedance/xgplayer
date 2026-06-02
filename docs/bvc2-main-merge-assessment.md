# 当前分支合入 main 评估

## 合并目标

将 `codex/split-bvc2-transmuxer` 从共同祖先开始积累的功能线整体合入 `main`，让主干承接当前分支的媒体链路改动，结束后续长期维护分支。

合入后，`main` 需要包含以下能力：

- `xgplayer-transmuxer` 的标准 VVC 解析、VVC side-data 标记、MP4 parse/remux 改动、video codec registry，以及 BVC2 外置后的最终状态。
- `xgplayer-mp4-loader` 的 GOP、segments、音画同步、负 DTS、首帧、内存和异常场景修复。
- `xgplayer-streaming-shared` 的 dynamic timeout、changeUrlRetry、RTT、网络错误上报和 MSE 队列相关改动。
- `xgplayer-mp4`、`xgplayer` 和 fixtures 中随功能线产生的配套改动。

## 分支关系

当前状态：

- 当前分支：`codex/split-bvc2-transmuxer`
- 当前 HEAD：`6e86feeb docs: add bvc2 main merge assessment`
- 功能线最后一个代码提交：`8c20e795 feat(transmuxer): make bvc2 codec registration external`
- `main`：`2a8b1362 add rtt`
- `origin/main`：`2a8b1362 add rtt`
- 与 `main` 的共同祖先：`cc2b768a fix(xgplayer): 修复playNext enter不隐藏问题`
- 共同祖先对应 tag：`v3.0.11-alpha.11`

从共同祖先开始的分叉情况：

- `main` 在 `cc2b768a` 之后有 507 个提交。
- 当前功能线在 `cc2b768a` 之后有 140 个提交，到 `8c20e795`。

当前分支是一条长期独立维护的 feature/release 线。合入方式应保留 Git 历史关系，让后续维护和审计都能明确这条功能线已经进入主干。

## 改动范围

以功能线终点 `8c20e795` 统计，当前分支相对共同祖先的代码规模为：

```text
40 files changed, 2440 insertions(+), 437 deletions(-)
```

高层改动范围：

- `packages/xgplayer-transmuxer`：BVC2/VVC、标准 VVC 支持、VVC side-data 标记、MP4 parse/remux 改动、codec registry、测试。
- `packages/xgplayer-mp4-loader`：GOP item、loader/config/utils 改动、分段解析、音画同步、首帧、内存和异常场景修复。
- `packages/xgplayer-streaming-shared`：dynamic timeout、changeUrlRetry、RTT、网络 task/fetch/xhr/mse 改动。
- `packages/xgplayer-mp4`：MP4 plugin 和错误处理改动。
- `packages/xgplayer`：poster/progress 的小改动。
- `fixtures`：MP4 和 xgplayer demo 改动。
- `yarn.lock`：依赖锁文件改动。

变更文件列表：

```text
fixtures/mp4/index.html
fixtures/xgplayer/index.html
fixtures/xgplayer/index.js
packages/xgplayer-mp4-loader/package.json
packages/xgplayer-mp4-loader/src/config.js
packages/xgplayer-mp4-loader/src/gopItem.js
packages/xgplayer-mp4-loader/src/loader.js
packages/xgplayer-mp4-loader/src/utils.js
packages/xgplayer-mp4/src/error.js
packages/xgplayer-mp4/src/mp4.js
packages/xgplayer-mp4/src/mp4Plugin.js
packages/xgplayer-streaming-shared/package.json
packages/xgplayer-streaming-shared/src/mse.js
packages/xgplayer-streaming-shared/src/net/config.js
packages/xgplayer-streaming-shared/src/net/dynamic-timeout.js
packages/xgplayer-streaming-shared/src/net/fetch.js
packages/xgplayer-streaming-shared/src/net/index.js
packages/xgplayer-streaming-shared/src/net/task.js
packages/xgplayer-streaming-shared/src/net/xhr.js
packages/xgplayer-streaming-shared/src/streaming-helper.js
packages/xgplayer-transmuxer/__tests__/codec/video-codec-registry.spec.js
packages/xgplayer-transmuxer/__tests__/codec/vvc.spec.js
packages/xgplayer-transmuxer/__tests__/model/video-sample.spec.js
packages/xgplayer-transmuxer/__tests__/mp4/mp4-demuxer.spec.js
packages/xgplayer-transmuxer/package.json
packages/xgplayer-transmuxer/src/codec/ExpGolomb.js
packages/xgplayer-transmuxer/src/codec/index.js
packages/xgplayer-transmuxer/src/codec/video-codec-registry.js
packages/xgplayer-transmuxer/src/codec/vvc.js
packages/xgplayer-transmuxer/src/index.js
packages/xgplayer-transmuxer/src/model/types.js
packages/xgplayer-transmuxer/src/model/video-sample.js
packages/xgplayer-transmuxer/src/mp4/fmp4-demuxer.js
packages/xgplayer-transmuxer/src/mp4/mp4-demuxer.js
packages/xgplayer-transmuxer/src/mp4/mp4-parser.js
packages/xgplayer-transmuxer/src/mp4/mp4.js
packages/xgplayer-transmuxer/src/utils/index.js
packages/xgplayer/src/plugins/poster/index.js
packages/xgplayer/src/plugins/progress/miniProgress.js
yarn.lock
```

## BVC2 最终状态

功能线最后的 BVC2 拆分提交为：

```text
8c20e795 feat(transmuxer): make bvc2 codec registration external
```

该提交将 `xgplayer-transmuxer` 收敛到以下状态：

- 标准 VVC 默认注册：`vvc1`、`vvi1`、`vvcC`。
- 对外导出 `registerVideoCodec` 和 `unregisterVideoCodec`。
- `xgplayer-transmuxer` 内不再内置 BVC2/BV2C 解析。
- 标准 VVC 解析和 sample side-data 标记作为公共处理逻辑保留。
- BVC2 由内网 `xgplayer-encrypt-mp4` 通过 registry 外部注册。

## 与 main 的差异

当前 `main` 的 `packages/xgplayer-transmuxer` 中没有 VVC/BVC2 实现。当前功能线合入后，标准 VVC、codec registry 和相关测试会进入 `main`。

包版本线存在明显差异：

| Package | 当前分支 | main |
| --- | --- | --- |
| `xgplayer-transmuxer` | `3.0.9-rc.17` | `3.0.24` |
| `xgplayer-mp4-loader` | `3.0.9-rc.34` | `3.0.25-rc.4` |
| `xgplayer-streaming-shared` | `3.0.11-rc.12` | `3.0.25-rc.6` |
| `xgplayer-mp4-loader` 依赖的 transmuxer | `3.0.9-rc.17` | `3.0.24` |

冲突解决时应以 main 的版本线为基础合入功能，避免把主干版本回退到旧 feature/release 线。

## 预合并结果

在临时克隆中从 `main` 执行：

```bash
git merge --no-commit --no-ff origin/codex/split-bvc2-transmuxer
```

Git 可以自动合并一部分文件，剩余 19 个冲突文件：

```text
fixtures/mp4/index.html
fixtures/xgplayer/index.html
fixtures/xgplayer/index.js
packages/xgplayer-mp4-loader/package.json
packages/xgplayer-mp4-loader/src/loader.js
packages/xgplayer-mp4-loader/src/utils.js
packages/xgplayer-mp4/src/mp4.js
packages/xgplayer-streaming-shared/package.json
packages/xgplayer-streaming-shared/src/mse.js
packages/xgplayer-streaming-shared/src/net/fetch.js
packages/xgplayer-streaming-shared/src/net/task.js
packages/xgplayer-streaming-shared/src/net/xhr.js
packages/xgplayer-transmuxer/package.json
packages/xgplayer-transmuxer/src/codec/index.js
packages/xgplayer-transmuxer/src/mp4/mp4-parser.js
packages/xgplayer-transmuxer/src/mp4/mp4.js
packages/xgplayer/src/plugins/poster/index.js
packages/xgplayer/src/plugins/progress/miniProgress.js
yarn.lock
```

自动合并后仍需重点复查的文件：

```text
packages/xgplayer-mp4-loader/src/config.js
packages/xgplayer-mp4-loader/src/gopItem.js
packages/xgplayer-streaming-shared/src/net/config.js
packages/xgplayer-streaming-shared/src/net/index.js
packages/xgplayer-streaming-shared/src/streaming-helper.js
packages/xgplayer-transmuxer/src/model/types.js
packages/xgplayer-transmuxer/src/mp4/fmp4-demuxer.js
packages/xgplayer-transmuxer/src/mp4/mp4-demuxer.js
packages/xgplayer-transmuxer/src/utils/index.js
```

## 合并风险

1. 包版本回退

   `package.json` 应保留 main 的版本和依赖关系，再合入功能所需的依赖变化。

2. 主干已有能力覆盖

   `main` 的 transmuxer 已包含 OPUS、MPEG、AV1 等后续能力。合并 `codec/index.js`、`model/types.js`、`utils/index.js` 时应保留这些能力，再叠加 VVC/registry。

3. 媒体核心逻辑冲突

   `mp4-loader`、`streaming-shared`、`transmuxer` 的冲突涉及运行时行为，需要逐文件合并：

   - 保留 main 的 fMP4/sidx 解析和错误对象改动。
   - 合入当前功能线的 GOP、segments 检查、memoryOpt、音画同步、负 DTS、首帧优化等修复。
   - 组合 main 的 RTT 改动与当前功能线的 dynamicTimeout/changeUrlRetry/网络错误时间上报。
   - 保持标准 VVC 和 registry 进入主干，BVC2 通过内网包外部注册。

4. VVC import 大小写

   当前分支 `vvc.js` 使用 `import ExpGolomb from './expGolomb'`，但文件名为 `ExpGolomb.js`。合入时应修正为稳定路径，优先复用 main 已有的 `utils/exp-golomb`。

5. 内网包联动

   BVC2 已迁移到 `xgplayer-encrypt-mp4`。主干合入后，应确认内网包依赖的 `xgplayer-transmuxer` 版本包含 `registerVideoCodec`。

## 推荐合并方案

推荐使用真实 merge commit 合入当前功能线。

建议步骤：

1. 从最新 `main` 新建集成分支，例如 `codex/merge-support-h266-main`。
2. 在集成分支执行 `git merge --no-ff codex/split-bvc2-transmuxer`。
3. 手动解决 19 个冲突文件。
4. `package.json` 和 `yarn.lock` 以 main 版本线为基础，只保留功能所需依赖变化。
5. 核心代码按模块复核：`xgplayer-mp4-loader`、`xgplayer-streaming-shared`、`xgplayer-transmuxer`。
6. 修正 VVC import 大小写问题。
7. 跑测试和构建验证后提交 merge commit。
8. 用该集成分支发 MR 到 `main`。

最低验证建议：

```bash
yarn test packages/xgplayer-transmuxer --runInBand
yarn test packages/xgplayer-mp4-loader --runInBand
yarn test packages/xgplayer-streaming-shared --runInBand
```

如果相关包没有独立测试，应至少跑 build，并用 MP4、fMP4、H264/H265/VVC、加密 BVC2 内网链路做回归验证。

## 结论

整条功能线合入 `main` 可行，风险集中在媒体核心链路冲突解决。

合并时应保留 main 已上线能力和版本线，叠加当前功能线的最终行为，并通过测试和重点媒体场景回归后再发 MR。
