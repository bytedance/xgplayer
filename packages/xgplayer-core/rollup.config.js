const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: './src/index.js',
  name: 'Player',
  uglify: uglify,
  babel: {},
  external: [],
  globals: {}
}
module.exports = commonRollup(config)
