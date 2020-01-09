const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'FlvVodPlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  babel: {
    runtimeHelpers: true
  }
}

module.exports = commonRollup(config)
