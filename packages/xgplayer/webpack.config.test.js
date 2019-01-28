const webpackConfigs = require('./webpack.config.js')

webpackConfigs[0].mode = 'development'
webpackConfigs[0].output = {
  filename: '[name].js',
}
const rules = [
  {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
          {
              loader: "url-loader",
              options: {
                  limit: 10000, // 小于10000kb自动转base64
                  name: "static/[name].[ext]"
              }
          }
      ]
  },
  {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: "url-loader",
      options: {
          limit: 10000,
          name: "static/[name].[ext]"
      }
  },
  {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
          limit: 10000,
          name: "static/[name].[ext]"
      }
  }
];

webpackConfigs[0].module.rules = webpackConfigs[0].module.rules.concat(rules);
module.exports = webpackConfigs[0]
