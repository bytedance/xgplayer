# xgplayer Release Guide

本文档只保留最短发布路径。

## CI 发布（推荐）

核心原则：发布由 tag 驱动。

步骤：

1. 创建版本 tag（必须以 `v` 开头）
2. push tag 到远端
3. 等待 CI 自动完成发布

示例：

```bash
git tag v3.2.1
git push origin v3.2.1
```

预发布示例：

```bash
git tag v3.2.1-rc.1
git push origin v3.2.1-rc.1
```

## 本地手动发布（可选）

本地流程只用于辅助生成版本和 tag，最终发布仍由 CI 完成。

常用命令：

```bash
yarn release --preid rc --yes
git push origin --tags
```

```bash
yarn release --releaseVersion 3.2.1 --yes
git push origin --tags
```

## 稳定版与非稳定版结果

- 稳定版 tag（如 `v3.2.1`）：发布 npm，并自动提交版本变更到 `main`
- 非稳定版 tag（如 `v3.2.1-rc.1`）：只发布 npm，不改动 `main`

## CI 工作流说明

执行文件：[.github/workflows/publish.yml](.github/workflows/publish.yml)

触发条件：`push.tags: v*`

工作流步骤：

1. `build`
	- 提取 tag
	- 判断是否稳定版
	- 设置版本并构建产物
2. `release_npm`
	- 下载构建产物
	- 发布 npm
3. `commit_to_main`（仅稳定版执行）
	- 应用版本变更
	- commit 并 push 到 `main`
4. `release_summary`
	- 汇总发布状态
