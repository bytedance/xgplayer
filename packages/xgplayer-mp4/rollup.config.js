const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'Mp4Player',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  babel: {
    runtimeHelpers: true
  }
  // commonjs: {
  //   include: ['node_modules/**']
  // }
}

module.exports = commonRollup(config)
