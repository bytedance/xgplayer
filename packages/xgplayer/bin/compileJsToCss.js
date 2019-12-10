// const fs = require('fs');
const path = require('path');
const jss = require('jss').default
const preset = require('jss-preset-default').default
jss.setup(preset())
const jsFile = require(path.resolve(__dirname, '../src/skin/style/controls/pip.js'))

const sheet = jss.createStyleSheet(jsFile);
sheet.update({
  cursor: 'default'
})

sheet.update({
  cursor: 'relative'
})
console.log(sheet.toString())
