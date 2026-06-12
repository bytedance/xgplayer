# AGENTS.md

Global agent map for this repo. Keep package-specific design/background in package docs or package-level AGENTS.md files.

## Locate

| Need | Go to |
|------|-------|
| Package source | `packages/*/src/` |
| Package metadata/docs | `packages/*/{package.json,README.md,CHANGELOG.md}` |
| Build tooling | `scripts/{cli.js,commands/,workflow/}` |
| Demos/repros | `fixtures/<format>/` |
| Quality gates | `docs/ai-harness/quality-gates.md` |
| Repo commands | root `package.json` |
| Lint/test config | `biome.json`, `jest.config.js`, `jest.setup.js` |
| Release process | `.github/release-guideline.md` |

## Commands

| Intent | Command |
|--------|---------|
| Install | `yarn` |
| Demo | `yarn dev:<format>` |
| Build | `yarn build` / `yarn build:all` |
| Lint/format | `yarn lint` / `yarn format` |
| Staged format | `yarn format:staged` |
| Test | `yarn test` / `yarn test:ci` |
| Quiet test | `yarn test --verbose=false --silent` |

## Rules

- Package manager: Yarn 1.x only; only touch `yarn.lock`.
- Dependencies: keep pins deliberate; do not loosen/downgrade ad hoc.
- Commits: use meaningful conventional commit titles, `monorepo` or `*` for cross-package changes, and a short body for non-trivial changes covering problem and key change.
- CHANGELOG: only add entries for stable releases (patch/minor/major); skip prerelease tags (`rc`/`alpha`/`beta`) — fold their commits into the next stable entry.

## Never

- Release/publish/tag, modify `version`, force-push, or rewrite shared history.
- Commit `dist/`, `es/`, `node_modules/`, logs, or OS junk.
- Add unaudited runtime network calls or remote scripts.
- Switch package managers or regenerate lockfiles with other tools.

## Debug

| Symptom | Start here |
|---------|------------|
| Format-specific regression | `fixtures/<format>/`, `yarn dev:<format>` |
| HLS/FLV/DASH issue | shared streaming/transmuxing packages |
| Demo stale after source edit | rebuild relevant package `es/` output |
| Build pipeline issue | `scripts/commands/`, then `scripts/workflow/` |
