# 发布指南

## CI 发布（推荐）

核心原则：发布由 tag 驱动，push tag 后 CI 自动完成一切。

步骤：

1. 创建版本 tag（需以 `v` 开头，可在 `main` 或其他分支发布；版本号参考：[xgplayer versions](https://www.npmjs.com/package/xgplayer?activeTab=versions) 以及 [tags](https://github.com/bytedance/xgplayer/tags)）
2. push tag 到远端
3. 等待 CI 自动完成发布

稳定版示例：

```bash
git tag v3.2.1
git push origin v3.2.1
```

预发布示例：

```bash
git tag v3.2.1-rc.1
git push origin v3.2.1-rc.1
```

<!-- ## 本地手动发布（可选）

本地流程只用于辅助升级版本号和创建 tag，最终发布仍由 CI 完成。

常用命令：

```bash
# 自动递增预发布版本
yarn release --preid rc --yes
git push origin --tags
```

```bash
# 指定明确版本号
yarn release --releaseVersion 3.2.1 --yes
git push origin --tags
```

参数说明：

| 参数 | 说明 |
| --- | --- |
| `--preid <id>` | 自动递增预发布版本，指定 preid（如 `rc`、`beta`） |
| `--releaseVersion <ver>` | 指定明确版本号（如 `3.2.1` 或 `3.2.1-rc.4`） |
| `--npmTag <tag>` | 覆盖 npm dist-tag（默认为 preid 或 `latest`） |
| `--yes` | 跳过所有确认提示 |
| `--skipBuild` | 跳过构建步骤 |
| `--skipPublish` | 跳过 npm 发布步骤 | -->

## 稳定版与非稳定版结果

- **稳定版 tag**（如 `v3.2.1`）：发布 npm、创建 GitHub Release，并自动将版本变更 commit 到 `main`
- **非稳定版 tag**（如 `v3.2.1-rc.1`）：发布 npm、创建 GitHub Prerelease，不改动 `main`

## CI 工作流说明

执行文件：[.github/workflows/publish.yml](.github/workflows/publish.yml)

触发条件：`push.tags: v*`

工作流步骤：

1. `build`
   - 提取 tag 名称
   - 判断是否为稳定版
   - 设置版本号并构建产物
2. `release_npm`
   - 下载构建产物
   - 发布到 npm
3. `release_github`
   - 基于 tag 创建 GitHub Release（非稳定版为 Prerelease）
4. `commit_to_main`（仅稳定版执行）
   - 应用版本变更
   - commit 并 push 到 `main`
5. `release_summary`
   - 汇总并展示发布状态
