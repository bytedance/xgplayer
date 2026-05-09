# hls.js 本地补丁维护说明

这个目录维护 `xgplayer-hls.js` 对 `hls.js` 的本地补丁。这里的 apply / verify / regen 流程是通用机制，后续如果还需要修改 hls.js，也应复用这套流程。

整体思路：

1. 用源码级 patch 描述我们对 hls.js 源码的改动。
2. 从 hls.js tag 源码重新构建 dist。
3. 用 `patch-package` 生成最终应用到 `node_modules/hls.js` 的 `hls.js+<version>.patch`。
4. 安装后自动应用并校验，避免本地补丁静默失效。

## 补丁列表

| 补丁 | 目的 | 源码 patch | 校验点 |
| --- | --- | --- | --- |
| SEI 自定义 payload 透传 | 让 `Hls.Events.FRAG_PARSING_USERDATA` 除了上游已支持的 payloadType=4/5，也透传其他 payloadType 的 SEI sample。 | `../hlsjs-sei-patch/patches-src/hls.js+<version>/*.patch` | `hlsjs-sei-patch/verify.js` 检查 dist bundle、worker bundle 和类型声明中的关键产物。 |

新增 hls.js 本地改动时，在这里增加一行，说明补丁目的、源码 patch 位置和校验点。

## 目录说明

- `hls.js+<version>.patch`：`patch-package` 实际应用到 `node_modules/hls.js` 的补丁文件。
- `hlsjs-sei-patch/apply.js`：安装后应用补丁，并校验结果。
- `hlsjs-sei-patch/verify.js`：检查当前 `node_modules/hls.js/dist/*` 是否已经包含预期补丁。
- `hlsjs-sei-patch/regen.js`：从 hls.js tag 源码重新构建 dist，并再生 `hls.js+<version>.patch`。
- `hlsjs-sei-patch/sync-vendor.js`：把 patch 后的 `hls.js` / `hls.light.js` 同步到 `src/vendor/`，确保发布产物使用包内 patched hls.js。`src/vendor/` 是自动生成目录，不要手动修改。
- `hlsjs-sei-patch/build-package.js`：构建 `xgplayer-hls.js`，并把额外的 light 入口同步到 `es/index.light.js`。
- `../hlsjs-sei-patch/patches-src/hls.js+<version>/*.patch`：源码级 patch，用于 `regen` 阶段。

注意：源码级 patch 不放在本目录下，因为 `patch-package --patch-dir packages/xgplayer-hls.js/patches` 会递归扫描 `.patch` 文件；放在这里会被误当成 node_modules patch。

## 自动应用方式

仓库根目录的 `postinstall` 会执行：

```bash
yarn workspace xgplayer-hls.js hlsjs:patch:apply
```

这条命令会：

1. 读取当前安装的 `node_modules/hls.js/package.json`，得到 hls.js 版本。
2. 检查本目录下是否存在匹配的 `hls.js+<version>.patch`。
3. 使用 `patch-package` 把补丁应用到 `node_modules/hls.js/dist/*`。
4. 把 patch 后的 `hls.js` 和 `hls.light.js` 同步到 `packages/xgplayer-hls.js/src/vendor/`。
5. 运行 `hlsjs:patch:verify` 校验结果。

如果升级了 `hls.js` 但没有生成对应版本的 patch，`yarn install` 会直接失败，避免补丁能力静默丢失。

## 发布产物如何使用 patch 后的 hls.js

`xgplayer-hls.js` 发布包不依赖用户安装时再修改 `node_modules/hls.js`。安装脚本会把 patch 后的 hls.js bundle 同步到包内源码：

```text
packages/xgplayer-hls.js/src/vendor/hls.js
packages/xgplayer-hls.js/src/vendor/hls.light.js
```

`src/vendor/` 是自动生成目录，文件头部也会标识 `Auto-generated`。不要直接编辑这些文件；需要调整时应修改源码级 patch 后重新运行 `hlsjs:patch:regen` 或 `hlsjs:patch:apply`。

两个入口只负责选择不同的 Hls 实现，共用 `src/plugin.js` 中的插件主体逻辑：

```js
// src/index.js
import createHlsJsPlugin from './plugin'
import Hls from './vendor/hls.js'

export default createHlsJsPlugin(Hls)
```

如果业务需要 light 版本，可以使用 light 入口：

```js
import HlsJsPlugin from 'xgplayer-hls.js/es/index.light'
```

打包发布前建议使用包内构建脚本：

```bash
yarn workspace xgplayer-hls.js hlsjs:build
```

该脚本会先执行常规 `libd build xgplayer-hls.js`，再同步 `es/index.light.js` / `es/index.light.d.ts`，确保 light 入口也进入 npm 发布文件。

默认选择完整版本是为了和 `hls.js` 默认入口语义保持一致；light 入口用于明确需要更小包体积、且 hls.js light 能力足够的场景。两个入口都引用包内 vendor 文件，因此用户安装 `xgplayer-hls.js` 后会使用 patch 过的 hls.js，而不是用户项目里未 patch 的 `hls.js`。

## 当前 patch-package 覆盖范围

当前 `hls.js+<version>.patch` 会改动 `hls.js` 的以下 dist 文件：

- `dist/hls.js`, `dist/hls.mjs`
- `dist/hls.light.js`, `dist/hls.light.mjs`
- `dist/hls.worker.js`：worker 场景必须一起改，否则开启 worker 后不会生效。
- `dist/hls.d.ts`, `dist/hls.d.mts`：补充类型声明。

`dist/hls.worker.js` 是单行压缩产物，因此 `hls.js+<version>.patch` 体积会偏大，这是预期行为。

## 日常校验

如果只想确认当前 `node_modules` 是否已经打上补丁，运行：

```bash
yarn workspace xgplayer-hls.js hlsjs:patch:verify
```

后续新增 hls.js 本地改动时，也应同步扩展 `hlsjs-sei-patch/verify.js`，让安装链路能检查新增改动是否生效。

## 新增或升级补丁

升级 `hls.js` 或继续修改 hls.js 本地补丁时，按下面流程操作。

### 1. 准备干净依赖

如需升级 hls.js，先修改 `packages/xgplayer-hls.js/package.json` 中的 `hls.js` 版本。

然后在仓库根目录执行一次不跑脚本的安装，确保 `node_modules/hls.js` 是未打补丁的干净状态：

```bash
yarn install --ignore-scripts
```

### 2. 修改源码级 patch

修改或新增源码级 patch：

```text
packages/xgplayer-hls.js/hlsjs-sei-patch/patches-src/hls.js+<version>/*.patch
```

这些 patch 会应用到 hls.js tag 源码上，而不是直接修改 dist/minify 产物。新增改动时，建议按功能拆分 patch 文件，方便 review 和后续升级。

### 3. 更新补丁列表和校验逻辑

如果新增补丁改变了新的行为或产物，需要同步更新：

- 本文档的“补丁列表”。
- `packages/xgplayer-hls.js/patches/hlsjs-sei-patch/verify.js`。

校验应覆盖最关键、最容易在升级时丢失的结果，例如 dist bundle 中的关键字符串、worker 产物、类型声明等。

### 4. 再生 patch-package 补丁

运行：

```bash
yarn workspace xgplayer-hls.js hlsjs:patch:regen
```

脚本会依次完成：

1. 通过 GitHub codeload 下载 `video-dev/hls.js` 的 `v<version>` tag tarball。
2. 解压到临时目录。
3. 应用 `patches-src/hls.js+<version>/*.patch`。
4. 在临时 hls.js 源码目录执行 `npm ci` 和 `npm run build`。
5. 把关注的 dist 文件覆盖到 `node_modules/hls.js/dist/*`。
6. 调用 `patch-package hls.js` 生成或覆盖本目录下的 `hls.js+<version>.patch`。
7. 把 patch 后的 `hls.js` 和 `hls.light.js` 同步到 `src/vendor/`。
8. 运行 `hlsjs:patch:verify` 校验结果。

本机需要能使用 `curl`、`tar`、`git` 和 `npm`。

### 5. 验证安装链路

最后执行一次正常安装，确认 `postinstall` 能自动应用补丁：

```bash
yarn install
```
