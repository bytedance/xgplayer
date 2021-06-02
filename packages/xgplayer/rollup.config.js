const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';
const svg = require('rollup-plugin-svg-import');

module.exports = commonRollup({
  name: 'Player',
  uglify: uglify,
  input: 'src/index-umd.js',
  targets: {
    'chrome': '58',
    'ie': '11'
  },
  // babel: {
  //   babelrc: false,
  // },
  plugins: [
    svg({
      // process SVG to DOM Node or String. Default: false
      stringify: false
    })
  ]
})
