const sass = require('node-sass');
const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const util = require('util');

const mkdirs = function(dirpath, mode, callback) {
  if (fs.existsSync(dirpath)) {
    callback(dirpath);
  } else {
    mkdirs(path.dirname(dirpath), mode, function(){
      fs.mkdir(dirpath, mode, callback);
    });
  }
};

const readdir = util.promisify(recursive)
const writeFile = util.promisify(fs.writeFile)
const mkdirsPromise = util.promisify(mkdirs)

const buildAllStyles = async () => {
  const ignoreFunc = (file, stats) => {
    const fileBase = path.basename(file)
    if (file.includes('skin')) {
      return true;
    }
    return !stats.isDirectory()  && !fileBase.endsWith('.scss');
  }
  try {
    const files = await readdir(path.resolve(__dirname, '../src'), [ignoreFunc]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const distPath = file.replace('src', 'es').replace(/.scss$/, '.css');
      const result = sass.renderSync({
        file,
        outFile: distPath
      })
      await mkdirsPromise(path.dirname(distPath), {
        recursive: true
      })
      await writeFile(distPath, result.css.toString(), 'utf-8');
    }
  } catch (e) {
    console.error('sass build error, detail: ' + e.message)
  }
}

buildAllStyles();
