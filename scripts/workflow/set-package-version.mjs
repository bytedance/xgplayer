import { createRequire } from 'node:module'
import path from 'node:path'
import fs from 'fs-extra'

const require = createRequire(import.meta.url)
const { getReleasePackages } = require('./release-packages')
const { parseReleaseTag, updatePackageVersion } = require('./release-metadata')
const { version, npmTag } = parseReleaseTag(process.env.TAG)
const cwd = process.cwd()
const packages = getReleasePackages(cwd)
const names = packages.map((pkg) => pkg.name)

for (const pkg of packages) {
  const file = path.join(cwd, pkg.path, 'package.json')
  const updated = updatePackageVersion(await fs.readJson(file), version, npmTag, names)
  await fs.outputJson(file, updated, { spaces: 2 })
}
