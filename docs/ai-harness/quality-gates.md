# Quality Gates

Verification rules for engineering quality in this repository.

## Engineering Quality Gates

### TypeScript / Syntax

- Use the workspace toolchain with package project context; prefer package-level build, typecheck, or test commands.
- Do not use `tsc --noEmit <single-file>`; it ignores package context and can report misleading errors.
- Prefer `async` / `await`; use `return` or explicit promise chains only when clearer.

### Naming / Comments

- Prefer names that describe behavior or lifecycle boundaries over storage, retry, or helper mechanics.
- Use comments for non-obvious constraints, invariants, and tradeoffs; avoid repeating implementation details.
- When one comment covers multiple constraints, list the key points instead of narrating a step-by-step pipeline.

### Architecture / Maintainability

- Preserve the plugin-first design; keep feature logic out of core.
- Prefer shared modules, factories, and thin adapters over duplicated variant logic.

### Lint / Format

- Run Biome for touched JS/TS files.
- Prefer explicit touched file paths, or stage the intended files and run `yarn format:staged`.
- Keep lint and format scope narrow; avoid broad legacy cleanup in unrelated changes.
- Keep generated or vendored output separate and marked; exclude it from lint/format when needed.

### Compatibility / Public API

- Preserve entry points, options, events, config semantics, and exported types unless the change is explicitly breaking.
- Update affected downstream packages when shared APIs change.
- Update demos or docs when public behavior changes.

### Build / Generated Output

- For scripts that create published files, document the source, destination, and verification path.
- Do not mix generated output with source changes unless the generated files are explicitly requested.

### Tests

- Prefer focused tests for the touched behavior before broad fixture or manual checks.
- New executable files need meaningful tests unless type-only, generated, or explicitly unreachable in unit tests.
- When behavior spans runtime, protocol, source selection, fallback, or lifecycle boundaries, cover both local unit behavior and the integration path when feasible.
- Keep test scope honest: do not weaken assertions, skip affected cases, or move code out of coverage scope.
- For routine pass/fail checks, prefer targeted tests or quiet full runs with `--verbose=false --silent`; rerun verbose only when failures need full diagnostics.

### Coverage

- For coverage-sensitive changes, run `yarn test:coverage` or compare `coverage/coverage-summary.json` against the target branch, CI, or a pre-change local run.
- Statements, branches, functions, and lines should not drop for executable, test, or config changes unless explicitly accepted.
- Do not lower thresholds, shrink `collectCoverageFrom`, weaken `testMatch`, add broad ignores, or move code out of scope to hide a drop.
