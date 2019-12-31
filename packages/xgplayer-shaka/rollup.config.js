const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'ShakaJsPlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  }
}

module.exports = commonRollup(config)
