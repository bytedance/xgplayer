const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

module.exports = commonRollup({
  name: 'Player',
  uglify: uglify,
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
  }
})