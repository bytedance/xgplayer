const babel  = require('rollup-plugin-babel');


module.exports = {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**' // 仅仅转译我们的源码
    })
  ],
  output: [{
    file: 'browser/index.js',
    format: 'umd',
    name: 'Render'
  },
    {
      file: 'dist/index.js',
      format: 'esm',
      name: 'Render'
    }]
};
