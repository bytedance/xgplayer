const fs = require('fs-extra')
const path = require('node:path')

function getReleasePackages(cwd) {
  return fs
    .readdirSync(path.join(cwd, 'packages'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const packagePath = path.join('packages', entry.name)
      const file = path.join(cwd, packagePath, 'package.json')
      if (!fs.existsSync(file)) return []
      const pkg = fs.readJsonSync(file)
      if (pkg.private) return []
      return [{ name: pkg.name, path: packagePath }]
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

module.exports = { getReleasePackages }
