const { version } = require('./package.json')
const presets = [
  [
    "@babel/preset-env",
    {
      "modules": false
    }
  ]
]

const plugins = [
  [
    "search-and-replace",
    {
      "rules": [
        {
          "search": '__XGPLAYER_MP4__',
          "searchTemplateStrings": true,
          "replace": version
        }
      ]
    }
  ]
]
module.exports = { presets, plugins }
