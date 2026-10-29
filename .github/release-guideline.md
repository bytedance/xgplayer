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

Prerelease channels are taken from the first SemVer prerelease identifier:

| Tag | npm dist-tag | GitHub Release |
| --- | --- | --- |
| `v3.2.1` | `latest` | Release |
| `v3.2.1-alpha.1` | `alpha` | Prerelease |
| `v3.2.1-beta.1` | `beta` | Prerelease |
| `v3.2.1-rc.1` | `rc` | Prerelease |
| `v3.2.1-next.1` | `next` | Prerelease |

Other named channels such as `canary` are supported. Invalid SemVer tags, numeric-only channels, and prereleases using `latest` are rejected. Build metadata (`+...`) is not supported as a distinct npm release version.

Version ordering is validated before release metadata is generated:

- Every release must be greater than the latest stable tag and must not downgrade the public package versions in the tagged source.
- A prerelease must also be greater than the latest existing tag in the same channel. Channels are independent, so `alpha`, `beta`, `rc`, `next`, `canary`, and other named channels do not block one another.
- The current tag and an identical package version are allowed when rerunning a failed release.

Before publishing each package, npm checks whether that exact version has already been published and skips it when rerunning failed jobs. Each package can publish as soon as its check completes.

npm uses the registry configured by the workflow's `registry-url`; release scripts do not override it.

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

## Release Notes

Release notes and package changelogs are generated once by the same repository command in `prepare_release`. Stable releases compare against the latest previous stable tag (`vX.Y.Z`), ignoring all SemVer prerelease tags regardless of channel, and commit package changelogs back to `main` before npm publishing. Prereleases compare against the nearest previous version tag, including prerelease tags when available, without modifying package changelogs.

The generator follows Angular Conventional Commits and prefers an explicit `Release note (<type>): ...` line in the commit body when present. Empty notes and `N/A` placeholders fall back to the commit header. Standard `git revert` commits cancel their original commits when both are within the release range.

All package changelogs use `# Changelog`, level-two version headings, level-three English change categories, and `-` lists. Categories follow a fixed order, with `Maintenance` for versions without user-facing changes. Write new release notes in English; preserve existing Chinese commit descriptions and historical code examples.

Run it locally with an explicit release range when reviewing or backfilling notes:

```bash
yarn changelog --from v3.0.25 --to v3.0.26 --releaseVersion 3.0.26
```

Rerunning the command refreshes only the requested version entry and preserves the other versions. Identical output leaves the file unchanged.

## CI Workflow

Workflow file: [.github/workflows/publish.yml](.github/workflows/publish.yml)

Trigger: `push.tags: v*`

Jobs:

1. `prepare_release`
   - Validates the tag and version ordering, then fixes the source SHA, compare range and public package list
   - Generates versions, stable changelogs and aggregate release notes
   - Saves `release.json`, `metadata.patch` and `release-notes.md` as one artifact
2. `build`
   - Checks out the fixed source SHA and applies the prepared metadata patch
   - Builds packages and creates `.tgz` archives
   - Checks package identity, version, CHANGELOG and built output, then records checksums
3. `commit_to_main` _(stable only)_
   - Applies the prepared patch to the latest `main` without regenerating metadata
   - Rejects conflicting patches and version downgrades; skips an already-applied patch
   - Uses a short-lived `xgplayer-release-bot` installation token to commit and push only release metadata
4. `release_npm`
   - Validates and publishes the exact `.tgz` files produced by `build`
   - Waits for the stable main commit; prereleases skip it
   - Skips package versions already published when rerunning failed jobs
5. `release_github`
   - Creates GitHub Release from the generated notes (as Prerelease for non-stable tags)
6. `release_summary`
   - Reports the overall release status

Private packages are excluded from version updates, changelogs and npm publishing. Dependencies on main are preserved by applying the prepared patch; changes overlapping release metadata stop the release for review. The original tag is never moved.

The stable metadata job requires repository variable `RELEASE_APP_ID`, repository secret `RELEASE_APP_PRIVATE_KEY`, and `xgplayer-release-bot` in the `main` branch protection bypass list. The App is installed only on this repository with `Contents: read and write`; the default `GITHUB_TOKEN` remains read-only.

Build failure prevents main writes. npm failure leaves the stable metadata commit on main; rerun failed jobs to reuse the prepared artifacts and finish publishing.
