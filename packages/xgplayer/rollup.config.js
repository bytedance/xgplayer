const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';
const svg = require('rollup-plugin-svg-import');

module.exports = commonRollup({
  name: 'Player',
  uglify: uglify,
  input: 'src/index-umd.js',
  babel: {
    runtimeHelpers: true,
    plugins: [
      'transform-runtime',
      'external-helpers',
      'transform-class-properties',
      'transform-es2015-spread',
      'transform-object-assign'
    ],
    babelrc: false,
    'presets': [
      [
        'env',
        {
          'targets': ['IE 10', 'chrome > 57'],
          'modules': false,
          'useBuiltIns': 'usage',
          'corejs': 3
        }
      ]
    ]
    // externalHelpers: false
  },
  plugins: [
    svg({
      // process SVG to DOM Node or String. Default: false
      stringify: false
    })
  ]
})
