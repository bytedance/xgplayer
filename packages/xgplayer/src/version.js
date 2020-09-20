const fs = require('fs')
const path = require('path')
const {version} = require('../package.json')
const versionConfig = {
  version: version
}
fs.writeFileSync(path.join(__dirname, '../version.json'), JSON.stringify(versionConfig, null, 2))
