const fs = require('fs')
const path = require('path')
const {version} = require('../package.json')
console.log('>>>> update version')
const js = `const version = '${version}'
export default version\n`
fs.writeFileSync(path.join(__dirname, '../src/version.js'), js)
