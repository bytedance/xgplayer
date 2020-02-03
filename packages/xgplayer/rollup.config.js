const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

module.exports = commonRollup({
  name: 'Player',
  uglify: uglify,
  babel: {
    runtimeHelpers: true
  }
})
