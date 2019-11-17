const uglify = require('rollup-plugin-uglify-es')
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { string } = require('rollup-plugin-string')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'es/index.min.js',
      format: 'esm'
    }, {
      file: 'dist/index.min.js',
      name: 'Player',
      format: 'umd'
    }
  ],
  plugins: [
    uglify(),
    json({
      compact: true
    }),
    postcss({
      extensions: ['.css', '.scss', '.sass'],
      'postcss-cssnext': {
        browserslist: ['cover 99.5%']
      }
    }),
    babel({
      exclude: ['node_modules/**', '**/*.svg']
    }),
    resolve({
      extensions: [ '.mjs', '.js', '.jsx', '.json' ]
    }),
    string({
      include: '**/*.svg'
    }),
    commonjs({
      include: ['node_modules/**']
    })
  ]
};
