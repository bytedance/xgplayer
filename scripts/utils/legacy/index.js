const { DEFAULT_EXTENSIONS } = require('@babel/core')
const { createBabelInputPluginFactory } = require('@rollup/plugin-babel')

function tryRequire (name) {
  try {
    return require(name)
  } catch (error) {
    // ignore
  }
}

const coreVersion = tryRequire('core-js/package.json')?.version || 3

const plugin = createBabelInputPluginFactory(() => ({
  options ({ needPolyfills, exclude }) {
    if (needPolyfills) {
      exclude = exclude || []
      exclude.push('node_modules/core-js/**')
    }

    return {
      customOptions: { needPolyfills },
      pluginOptions: {
        exclude,
        extensions: [
          ...DEFAULT_EXTENSIONS,
          '.ts', '.tsx'
        ],
        babelHelpers: 'bundled'
      }
    }
  },
  config (config, { customOptions: { needPolyfills } }) {
    if (config.hasFilesystemConfig()) {
      return config.options
    }
    return {
      ...config.options,
      plugins: (config.options.plugins || []).filter(Boolean),
      presets: [
        ...(config.options.presets || []),
        [
          require('@babel/preset-env'),
          {
            modules: false,
            bugfixes: true,
            loose: false,
            useBuiltIns: needPolyfills ? 'usage' : false,
            corejs: needPolyfills
              ? {
                version: coreVersion,
                proposals: false
              }
              : undefined,
            shippedProposals: true
          }
        ]
      ]
    }
  }
}))

module.exports = (c) => ({
  ...plugin(c),
  enforce: 'post'
})
