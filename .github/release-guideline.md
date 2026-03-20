# Release Guide

## CI Release (Recommended)

Releases are tag-driven. Push a version tag and CI handles everything.

Steps:

1. Create a version tag (must start with `v`; release from `main` or other branches; pick a version from: [xgplayer versions](https://www.npmjs.com/package/xgplayer?activeTab=versions) and [tags](https://github.com/bytedance/xgplayer/tags))
2. Push the tag to remote
3. Wait for CI to complete the release

Stable release:

```bash
git tag v3.2.1
git push origin v3.2.1
```

Prerelease:

```bash
git tag v3.2.1-rc.1
git push origin v3.2.1-rc.1
```

<!-- ## Local Manual Release (Optional)

The local workflow is only used to bump versions and create tags. The actual publishing is still done by CI.

Common commands:

```bash
# Auto-increment prerelease version with preid
yarn release --preid rc --yes
git push origin --tags
```

```bash
# Explicit version
yarn release --releaseVersion 3.2.1 --yes
git push origin --tags
```

Options:

| Option | Description |
| --- | --- |
| `--preid <id>` | Auto-increment prerelease with the given preid (e.g. `rc`, `beta`) |
| `--releaseVersion <ver>` | Release an explicit version (e.g. `3.2.1` or `3.2.1-rc.4`) |
| `--npmTag <tag>` | Override npm dist-tag (defaults to preid or `latest`) |
| `--yes` | Skip all confirmation prompts |
| `--skipBuild` | Skip build step |
| `--skipPublish` | Skip npm publish step | -->

## Stable vs Prerelease

- **Stable tag** (e.g. `v3.2.1`): publishes to npm, creates a GitHub Release, and commits version changes back to `main`
- **Prerelease tag** (e.g. `v3.2.1-rc.1`): publishes to npm, creates a GitHub Prerelease, and does not modify `main`

## CI Workflow

Workflow file: [.github/workflows/publish.yml](.github/workflows/publish.yml)

Trigger: `push.tags: v*`

Jobs:

1. `build`
   - Extracts the tag name
   - Determines whether it is a stable release
   - Sets the version and builds artifacts
2. `release_npm`
   - Downloads build artifacts
   - Publishes to npm
3. `release_github`
   - Creates GitHub Release from the tag (as Prerelease for non-stable tags)
4. `commit_to_main` _(stable only)_
   - Applies version changes
   - Commits and pushes to `main`
5. `release_summary`
   - Reports the overall release status
