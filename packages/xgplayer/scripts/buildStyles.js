const sass = require('node-sass');
const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const util = require('util');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const postcss = require('postcss');

const mkdirs = function (dirpath, mode, callback) {
  if (fs.existsSync(dirpath)) {
    callback(dirpath);
  } else {
    mkdirs(path.dirname(dirpath), mode, function () {
      fs.mkdir(dirpath, mode, callback);
    });
  }
};

const readdir = util.promisify(recursive);
const writeFile = util.promisify(fs.writeFile);
const mkdirsPromise = util.promisify(mkdirs);

// build css files for lib/es
const buildESStyles = async () => {
  const ignoreFunc = (file, stats) => {
    const fileBase = path.basename(file);
    if (file.includes('skin') || file.includes('style')) {
      return true;
    }
    return !stats.isDirectory() && !fileBase.endsWith('.scss');
  };

  try {
    const files = await readdir(path.resolve(__dirname, '../src'), [ignoreFunc]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const rawCss = sass.renderSync({
        file
      }).css.toString();

      const distCss = await postcss([autoprefixer]).process(rawCss, { from: 'undefined' }).then(result => {
        result.warnings().forEach(warn => {
          console.warn(warn.toString());
        });
        return result.css;
      });
      const distTypes = ['es', 'lib'];
      for (let i = 0; i < distTypes.length; i++) {
        const distType = distTypes[i];
        const distPath = file.replace('src', distType).replace(/.scss$/, '.css');
        const distDir = path.dirname(distPath);
        if (!fs.existsSync(distDir)) {
          await mkdirsPromise(distDir, {
            recursive: true
          });
        }

        await writeFile(distPath, distCss, 'utf-8');
      }
    }
  } catch (e) {
    console.error('sass build error, detail: ' + e.message);
  }
};

// build main css file
const buildDistStyle = async () => {
  const rawCss = sass.renderSync({
    file: path.resolve(__dirname, '../src/style/index.scss')
  }).css.toString();

  const distCss = await postcss([autoprefixer]).process(rawCss, { from: 'undefined' }).then(result => {
    result.warnings().forEach(warn => {
      console.warn(warn.toString());
    });
    return result.css;
  });

  const compressCss = await postcss([autoprefixer]).process(rawCss, { from: 'undefined' }).then(async (result) => {
    result.warnings().forEach(warn => {
      console.warn(warn.toString());
    });

    return cssnano.process(result.css, { from: 'undefined' }, { preset: 'default' });
  });

  const files = [distCss, compressCss];

  for (let i = 0, len = files.length; i < len; i++) {
    const isMinFile = i === 1;

    const distPath = path.resolve(__dirname, `../dist/xgplayer${isMinFile ? '.min' : ''}.css`);
    const cssToWrite = isMinFile ? compressCss : distCss;
    const distDir = path.dirname(distPath);
    if (!fs.existsSync(distDir)) {
      await mkdirsPromise(distDir, {
        recursive: true
      });
    }
    await writeFile(distPath, cssToWrite, 'utf-8');
  }

};

// entry
(async function main () {
  await buildESStyles();
  await buildDistStyle();
})();
