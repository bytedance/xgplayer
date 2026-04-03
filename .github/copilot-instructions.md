# Project Guidelines

## Architecture
- This repository is a Yarn workspace monorepo (`workspaces: ["packages/*"]`). Most work happens under `packages/`.
- Core player logic is in `packages/xgplayer`. Format and feature plugins live in sibling packages such as `packages/xgplayer-hls`, `packages/xgplayer-flv`, `packages/xgplayer-mp4`, `packages/xgplayer-dash`, `packages/xgplayer-ads`, `packages/xgplayer-cast`, and `packages/xgplayer-music`.
- Streaming internals are shared across packages like `packages/xgplayer-transmuxer` and `packages/xgplayer-streaming-shared`. Prefer reusing shared logic instead of duplicating code in one plugin.
- Local manual verification uses fixture apps in `fixtures/` (for example `fixtures/xgplayer`, `fixtures/hls`, `fixtures/flv`).

## Build and Test
- Install deps: `yarn`
- Dev fixtures:
  - `yarn dev:xgplayer`
  - `yarn dev:hls` / `yarn dev:flv` / `yarn dev:mp4` / `yarn dev:dash` / `yarn dev:music` / `yarn dev:subtitle` / `yarn dev:ads` / `yarn dev:cast`
- Build:
  - `yarn build` (current package flow)
  - `yarn build:all` (all workspace packages)
- Test:
  - `yarn test`
  - `yarn test:coverage`
  - Note: Jest coverage/test matching is focused on `xgplayer-flv`, `xgplayer-hls`, and `xgplayer-transmuxer` in `jest.config.js`.
- Lint/format:
  - `yarn lint`
  - `yarn format`

## Code Style
- Follow `biome.json`:
  - 2-space indentation, single quotes, semicolons as needed, line width 90.
  - Prefer optional chaining where suitable.
  - Do not use `==` / `!=`; use strict equality.
- Keep existing module style (ESM `import`/`export`) and preserve current package APIs unless the task explicitly requires API changes.
- Match surrounding style in each package; avoid unrelated refactors or broad formatting churn.

## Conventions and Pitfalls
- Many plugin packages are consumed independently; check each package's `package.json` (`peerDependencies`, `files`, exports) when changing public behavior.
- Release is tag-driven CI (`.github/workflows/publish.yml`). Do not invent new release steps; follow `.github/release-guideline.md`.
- Avoid copying long docs into chat outputs or code comments. Link to authoritative docs instead.

## Key References
- Root overview: `README.md` and `README.zh-CN.md`
- Release process: `.github/release-guideline.md` and `.github/release-guideline.zh-CN.md`
- Testing scope/config: `jest.config.js`
- Build/dev command entry: `scripts/cli.js`
- Package-specific usage and constraints: each package `README.md` / `CHANGELOG.md` under `packages/`
