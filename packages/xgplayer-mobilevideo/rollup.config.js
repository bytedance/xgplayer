const commonRollup = require('../../rollup.config');
const bundleWorker = require('rollup-plugin-bundle-worker');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'MobileVideo',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  babel: {
    runtimeHelpers: true
  },
  plugins: [
    bundleWorker()
  ]
}

module.exports = commonRollup(config)
