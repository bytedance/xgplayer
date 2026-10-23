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

预发布渠道取 SemVer 预发布版本的第一个标识：

| Tag | npm dist-tag | GitHub Release |
| --- | --- | --- |
| `v3.2.1` | `latest` | Release |
| `v3.2.1-alpha.1` | `alpha` | Prerelease |
| `v3.2.1-beta.1` | `beta` | Prerelease |
| `v3.2.1-rc.1` | `rc` | Prerelease |
| `v3.2.1-next.1` | `next` | Prerelease |

也支持 `canary` 等其他具名渠道。无效 SemVer、纯数字渠道以及使用 `latest` 的预发布 tag 会被拒绝；不使用构建元数据（`+...`）区分 npm 发布版本。

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

## Release Notes

Release Notes 和各包 CHANGELOG 在 `prepare_release` 中由仓库的同一个命令生成一次。正式版本比较当前版本之前最新的正式版 tag（`vX.Y.Z`），并在 npm 发布前将各包 CHANGELOG 回写 `main`。非正式版本比较最临近的上一个版本 tag，有可用的非正式版本 tag 时也会参与比较，但不会修改各包 CHANGELOG。

生成器遵循 Angular Conventional Commits；commit body 中存在 `Release note (<type>): ...` 时，优先使用该内容。空内容和 `N/A` 占位内容回退到 commit 标题；标准 `git revert` 与原提交同时位于发布区间内时，两者相互抵消。

所有包统一使用 `# Changelog`、二级版本标题、三级英文变更分类和 `-` 列表。分类采用固定顺序，无用户可见变更的版本归入 `Maintenance`。新增 Release Notes 使用英文；已有中文提交说明及历史代码示例保留原文。

本地审阅或回填日志时，应显式指定版本区间：

```bash
yarn changelog --from v3.0.25 --to v3.0.26 --releaseVersion 3.0.26
```

重复执行只刷新指定版本的条目，保留其他版本；生成内容相同时不写入文件。

## CI 工作流说明

执行文件：[.github/workflows/publish.yml](.github/workflows/publish.yml)

触发条件：`push.tags: v*`

工作流步骤：

1. `prepare_release`
   - 校验 tag，固定源提交 SHA、比较区间和公开包清单
   - 生成版本、正式版 CHANGELOG 和汇总 Release Notes
   - 将 `release.json`、`metadata.patch` 和 `release-notes.md` 保存为同一份 artifact
2. `build`
   - checkout 固定 SHA 并应用准备好的元数据补丁
   - 构建并生成 `.tgz` 归档
   - 校验包名、版本、CHANGELOG 和构建输出，并保存校验和
3. `commit_to_main`（仅稳定版执行）
   - 向最新 `main` 应用同一份补丁，不重新生成元数据
   - 拒绝冲突及版本回退，已应用的补丁自动跳过
   - 仅提交并推送发布元数据
4. `release_npm`
   - 校验并发布 `build` 生成的原始 `.tgz`
   - 正式版等待 main 提交成功，预发布跳过该提交
   - 重跑失败 job 时跳过已经发布的包版本
5. `release_github`
   - 使用生成的 Release Notes 创建 GitHub Release（非稳定版为 Prerelease）
6. `release_summary`
   - 汇总并展示发布状态

私有包不参与版本更新、CHANGELOG 生成和 npm 发布。通过应用准备好的补丁保留 main 后续依赖变更；若改动与发布元数据重叠则终止发布，等待处理。原始 tag 不会移动。

构建失败不会写入 main。npm 失败时正式版元数据提交会留在 main；重跑失败 job 可复用已生成的 artifact 继续发布。
