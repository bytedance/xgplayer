const commonRollup = require('../../rollup.config')
const uglify = process.env.NODE_ENV === 'production'
const svg = require('rollup-plugin-svg-import')
const umd = commonRollup({
  name: 'Music',
  uglify: uglify,
  input: 'src/index.js',
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
    })
  ]
})
module.exports = [umd]
