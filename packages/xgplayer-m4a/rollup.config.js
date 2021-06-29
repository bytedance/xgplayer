const commonRollup = require('../../rollup.config')
const uglify = process.env.NODE_ENV === 'production'
const replace = require('@rollup/plugin-replace')
const { version } = require('./package.json')

const config = {
  input: 'src/index.js',
  name: 'M4aPlayer',
  uglify: uglify,
  external: ['xgplayer'],
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
    replace({
      preventAssignment: false,
      __XGPLAYER_MP4__: JSON.stringify(version)
    })
  ]
}

module.exports = commonRollup(config)
