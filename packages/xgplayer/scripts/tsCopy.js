const fs = require('fs')
const recursive = require('recursive-readdir')
const path = require('path')
const util = require('util')

const mkdirs = function (dirpath, mode, callback) {
  if (fs.existsSync(dirpath)) {
    callback(dirpath)
  } else {
    mkdirs(path.dirname(dirpath), mode, function () {
      fs.mkdir(dirpath, mode, callback)
    })
  }
}

const readdir = util.promisify(recursive)
const mkdirsPromise = util.promisify(mkdirs)

const findTs = async () => {
  const files = await readdir(path.resolve(__dirname, '../src'), [])
  for (let i = 0; i < files.length; i++) {
    if (files[i].indexOf('.d.ts') > -1) {
      ['es', 'lib'].forEach((dir) => {
        const walk = async () => {
          const distFile = files[i].replace('src', dir)
          const distDir = path.dirname(distFile)
          if (!fs.existsSync(distDir)) {
            await mkdirsPromise(distDir, {
              recursive: true
            })
          }
          const readStream = fs.createReadStream(path.resolve(files[i]))
          const writeStream = fs.createWriteStream(distFile)
          readStream.pipe(writeStream)
        }
        walk()
      })
    }
  }
}

findTs()
