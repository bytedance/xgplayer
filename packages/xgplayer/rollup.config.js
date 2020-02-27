const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

module.exports = commonRollup({
  name: 'Player',
  uglify: uglify,
  babel: {
    // runtimeHelpers: true,
    plugins: ['external-helpers'],
    babelrc: false,
    'presets': [
      [
        'env',
        {
          'targets': {
            'chrome': 58,
            'ie': 10
          },
          'modules': false,
          'useBuiltIns': 'usage',
          'corejs': 3
        }
      ]
    ]
    // externalHelpers: false
  }
})
