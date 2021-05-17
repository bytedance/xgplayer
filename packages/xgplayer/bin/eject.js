const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = async (dir, name) => {
  const source = path.resolve(__dirname, '../src/skin')
  const target = path.resolve(dir, '.xgplayer/skin')
  await fs.copy(source, target)

  const skinIndex = path.resolve(target, './index.js')
  const skinIndexContent = await fs.readFile(skinIndex, 'utf-8')
  const skinIndexTransformed = [skinIndexContent, 'import "./style/index.scss"', `Player.install("xgplayer-skin-${name}", () => {})`].join('\n')
  await fs.writeFile(skinIndex, skinIndexTransformed)

  let startJs = path.resolve(target, `controls/start.js`)
  let startJsContent = await fs.readFile(startJs, 'utf-8')
  let startJsTransformed = startJsContent.replace(/xgplayer-skin-default/, `xgplayer-skin-${name}`)
  await fs.writeFile(startJs, startJsTransformed)

  await replaceStr('../src/skin/controls/', '.js', [{old: /Player.install/, new: 'Player.use'}, {old: /..\/..\/player/, new: 'xgplayer'}, {old: /..\/..\/utils/g, new: 'xgplayer/src/utils'}])

  await replaceStr('../src/skin/', 'index.js', [{old: /Player.installAll/, new: 'Player.useAll'}, {old: /..\/player/, new: 'xgplayer'}])

  await replaceStr('../src/skin/style/', '.scss', [{old: /xgplayer-skin-default/g, new: `xgplayer-skin-${name}`}])

  async function replaceStr(filePath, fileType, replaceList) {
    if(!fs.statSync(path.resolve(__dirname, filePath)).isDirectory()) return
    let styles = fs.readdirSync(path.resolve(__dirname, filePath))
    await styles.forEach(async item => {
      if(item.endsWith(fileType)) {
        let styleJs = path.resolve(target, `${filePath.slice(12)}${item}`)
        let styleJsContent = await fs.readFile(styleJs, 'utf-8')
        let styleJsTransformed = styleJsContent
        replaceList.forEach(rItem => {
          if(rItem.old && rItem.new) {
            styleJsTransformed = styleJsTransformed.replace(rItem.old, rItem.new)
          }
        })
        await fs.writeFile(styleJs, styleJsTransformed)
      } else {
        await replaceStr(`${filePath}${item}/`, fileType, replaceList)
      }
    })
  }

  console.log(`Copied default skin into ${chalk.cyan(target)}.`)
}
