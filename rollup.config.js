// https://github.com/rollup/plugins/tree/master/packages/babel
// https://github.com/TrySound/rollup-plugin-terser
// https://github.com/rollup/plugins/tree/master/packages/json
// https://github.com/egoist/rollup-plugin-postcss
// https://github.com/rollup/plugins/tree/master/packages/node-resolve
// https://github.com/rollup/plugins/tree/master/packages/commonjs
// https://github.com/darionco/rollup-plugin-web-worker-loader
// https://github.com/btd/rollup-plugin-visualizer

const { babel } = require('@rollup/plugin-babel');
const webWorkerLoader = require('rollup-plugin-web-worker-loader');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');
const { visualizer } = require('rollup-plugin-visualizer');
const sourcemap = process.env.NODE_ENV === 'production'

const defaultRollup = {
  input: 'src/index.js',
  name: 'Player',
  sourcemap: true,
  production: !sourcemap,
  exports: undefined,
  external: [],
  plugins: [],
  globals: {},
  commonjs: {},
  resolve: {},
  babel: {},
  watch: {}
};

const commonRollup = function (config = {}) {
  const rollupConfig = Object.assign({}, defaultRollup, config);
  return {
    input: rollupConfig.input,
    output: config.output || [
      {
        file: rollupConfig.uglify ? 'dist/index.min.js' : 'dist/index.js',
        name: rollupConfig.name,
        format: 'umd',
        sourcemap: rollupConfig.sourcemap,
        globals: rollupConfig.globals,
        exports: rollupConfig.exports || 'auto'
      }
    ],
    external: rollupConfig.external,
    plugins: [
      ...rollupConfig.plugins,
      rollupConfig.uglify ? terser() : undefined,
      json({
        compact: true
      }),
      postcss({
        extensions: ['.css', '.scss', '.sass'],
        'postcss-cssnext': {
          browserslist: ['cover 99.5%']
        }
      }),
      nodeResolve(),
      commonjs(),
      babel({
        exclude: [/core-js/,/worker.js/,/hevc-worker.js/,/hevc-worker-thread.js/,/node_modules/],
        babelHelpers: 'runtime',
        presets: [
          [
            '@babel/env',
            {
              // eslint-disable-next-line standard/object-curly-even-spacing
              targets: rollupConfig.targets || { chrome: '58'},
              'useBuiltIns': 'usage',
              'corejs': 3,
            },
          ]
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: false,
              helpers: true,
              regenerator: true
            }
          ]
        ],
        ...config.babel
      }),
      webWorkerLoader({
        targetPlatform: 'browser',
        sourcemap: false
      }),
      process.env.ANALYZE ? visualizer() : undefined
    ],
    watch: {
      ...config.watch
    }
  };
};
module.exports = commonRollup;
