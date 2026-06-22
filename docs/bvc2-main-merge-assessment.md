# 当前分支合入 main 评估

## 合并目标

将 `codex/split-bvc2-transmuxer` 相对共同祖先的媒体功能线合入 `main`，让主干承接当前分支已经沉淀的 MP4、streaming-shared、transmuxer、标准 VVC 和 BVC2 外置能力，减少后续长期维护分支的成本。

当前合并范围已经剥离以下内容：

- 纯发布版本提交。
- `packages/xgplayer/` 的全部历史改动。
- `package.json`、所有子包 `package.json`、`yarn.lock` 的全部历史改动。
- `fixtures/xgplayer/` 的全部历史改动。

## 分支关系

- 当前分支：`codex/split-bvc2-transmuxer`
- `main`：`2a8b1362 add rtt`
- `origin/main`：`2a8b1362 add rtt`
- 与 `main` 的共同祖先：`cc2b768a fix(xgplayer): 修复playNext enter不隐藏问题`
- 共同祖先对应 tag：`v3.0.11-alpha.11`

## 历史清理结果

- 原功能线在共同祖先后有 140 个提交。
- 已删除 74 个只修改 `package.json` / `yarn.lock` 的发布或依赖版本提交。
- 在剩余提交中，已逐提交剥离 `packages/xgplayer/`、`package.json`、`yarn.lock`、`fixtures/xgplayer/` 的文件级改动。
- 当前分支相对共同祖先保留 68 个提交，其中 66 个为媒体功能代码提交，2 个为评估文档相关提交。
- 重写前备份分支：
  - `codex/split-bvc2-transmuxer-before-drop-releases`
  - `codex/split-bvc2-transmuxer-before-path-prune`

核验命令结果：

```bash
git diff --name-status cc2b768a..HEAD -- packages/xgplayer package.json ':(glob)**/package.json' yarn.lock fixtures/xgplayer
git log --oneline --no-merges --reverse cc2b768a..HEAD -- packages/xgplayer package.json ':(glob)**/package.json' yarn.lock fixtures/xgplayer
```

两条命令均无输出，表示这些路径已经没有最终 diff，也没有保留在当前分支提交历史中。

## 当前代码改动范围

不含评估文档，当前分支相对共同祖先的代码规模为：

```text
32 files changed, 2380 insertions(+), 286 deletions(-)
```

代码变更文件列表：

```text
fixtures/mp4/index.html
packages/xgplayer-mp4-loader/src/config.js
packages/xgplayer-mp4-loader/src/gopItem.js
packages/xgplayer-mp4-loader/src/loader.js
packages/xgplayer-mp4-loader/src/utils.js
packages/xgplayer-mp4/src/error.js
packages/xgplayer-mp4/src/mp4.js
packages/xgplayer-mp4/src/mp4Plugin.js
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
```

## 主要功能内容

- `xgplayer-transmuxer`：标准 VVC 解析、VVC side-data 标记、MP4 parse/remux 改动、video codec registry、相关单测。
- `xgplayer-mp4-loader`：GOP item、loader/config/utils 改动、分段解析、音画同步、首帧、内存和异常场景修复。
- `xgplayer-streaming-shared`：dynamic timeout、changeUrlRetry、RTT、网络 task/fetch/xhr/mse 改动。
- `xgplayer-mp4`：MP4 plugin 和错误处理改动。
- `fixtures/mp4`：MP4 demo 配套改动。

## BVC2 最终状态

BVC2 拆分提交将 `xgplayer-transmuxer` 收敛到以下状态：

- 标准 VVC 默认注册：`vvc1`、`vvi1`、`vvcC`。
- 对外导出 `registerVideoCodec` 和 `unregisterVideoCodec`。
- `xgplayer-transmuxer` 内不再内置 BVC2/BV2C 解析。
- 标准 VVC 解析和 sample side-data 标记作为公共处理逻辑保留。
- BVC2 由内网 `xgplayer-encrypt-mp4` 通过 registry 外部注册。

## 预合并结果

在临时克隆中从 `main` 执行：

```bash
git merge --no-commit --no-ff origin/codex/split-bvc2-transmuxer
```

Git 可以自动合并一部分文件，剩余 11 个冲突文件：

```text
fixtures/mp4/index.html
packages/xgplayer-mp4-loader/src/loader.js
packages/xgplayer-mp4-loader/src/utils.js
packages/xgplayer-mp4/src/mp4.js
packages/xgplayer-streaming-shared/src/mse.js
packages/xgplayer-streaming-shared/src/net/fetch.js
packages/xgplayer-streaming-shared/src/net/task.js
packages/xgplayer-streaming-shared/src/net/xhr.js
packages/xgplayer-transmuxer/src/codec/index.js
packages/xgplayer-transmuxer/src/mp4/mp4-parser.js
packages/xgplayer-transmuxer/src/mp4/mp4.js
```

自动合并后仍需重点复查的文件：

```text
packages/xgplayer-mp4-loader/src/config.js
packages/xgplayer-mp4-loader/src/gopItem.js
packages/xgplayer-mp4/src/mp4Plugin.js
packages/xgplayer-streaming-shared/src/net/config.js
packages/xgplayer-streaming-shared/src/net/index.js
packages/xgplayer-streaming-shared/src/streaming-helper.js
packages/xgplayer-transmuxer/src/model/types.js
packages/xgplayer-transmuxer/src/model/video-sample.js
packages/xgplayer-transmuxer/src/mp4/fmp4-demuxer.js
packages/xgplayer-transmuxer/src/mp4/mp4-demuxer.js
packages/xgplayer-transmuxer/src/utils/index.js
```

## 合并风险

1. `main` 的 transmuxer 已包含 OPUS、MPEG、AV1 等后续能力。合并 `codec/index.js`、`model/types.js`、`utils/index.js` 时需要保留这些能力，再叠加 VVC/registry。
2. `mp4-loader`、`streaming-shared`、`transmuxer` 的冲突涉及运行时行为，需要逐文件合并 GOP、segments 检查、memoryOpt、音画同步、负 DTS、首帧优化、dynamicTimeout、changeUrlRetry、RTT 和网络错误上报。
3. 当前分支 `vvc.js` 使用 `import ExpGolomb from './expGolomb'`，但文件名为 `ExpGolomb.js`。合入时应修正为稳定路径，优先复用 main 已有的 `utils/exp-golomb`。
4. BVC2 已迁移到 `xgplayer-encrypt-mp4`。主干合入后，需要确认内网包依赖的 `xgplayer-transmuxer` 版本包含 `registerVideoCodec`。

## 推荐合并方案

推荐使用真实 merge commit 合入当前功能线。

建议步骤：

1. 从最新 `main` 新建集成分支，例如 `codex/merge-support-h266-main`。
2. 在集成分支执行 `git merge --no-ff codex/split-bvc2-transmuxer`。
3. 手动解决 11 个冲突文件。
4. 保持 `package.json` 和 `yarn.lock` 不变。
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

当前分支合入 `main` 可行。纯发布版本提交已经删除，`packages/xgplayer/`、`package.json`、`yarn.lock`、`fixtures/xgplayer/` 已经从历史提交中剥离。后续合并风险集中在 11 个媒体核心链路冲突文件的手动解决和回归验证。
