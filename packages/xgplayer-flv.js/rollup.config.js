const commonRollup = require('../../rollup.config')
const builtins = require('rollup-plugin-node-builtins')
const replace = require('@rollup/plugin-replace')
const { version } = require('./package.json')
const uglify = process.env.NODE_ENV === 'production'
console.log('builtins', builtins)
const config = {
  input: 'src/index.js',
  name: 'FlvJsPlugin',
  uglify: uglify,
  external: ['xgplayer', ''],
  babel: {
    babelrc: false,
    configFile: false
  },
  // targets: {
  //   'chrome': '58',
  //   'ie': '11'
  // },
  globals: {
    xgplayer: 'Player'
  },
  plugins: [
    builtins(),
    replace({
      preventAssignment: false,
      __XGPLAYER_DASH__: JSON.stringify(version)
    })
  ]
}

module.exports = commonRollup(config)
