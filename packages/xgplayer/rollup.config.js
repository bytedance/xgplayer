const commonRollup = require('../../rollup.config')
const uglify = process.env.NODE_ENV === 'production'
const svg = require('rollup-plugin-svg-import')
const replace = require('@rollup/plugin-replace')
const { version } = require('./package.json')
const umd = commonRollup({
  name: 'Player',
  uglify: uglify,
  input: 'src/index-umd.js',
  targets: {
    chrome: '58',
    ie: '11'
  },
  babel: {
    babelrc: false,
    configFile: false
  },
  plugins: [
    svg({
      // process SVG to DOM Node or String. Default: false
      stringify: false
    }),
    replace({
      __XGPLAYER_VERSION__: JSON.stringify(version),
      preventAssignment: true
    })
  ]
})
module.exports = [umd]
