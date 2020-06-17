const fs = require('fs');
const path = require('path');

async function mkdirs (dirpath, mode, callback) {
  if (fs.existsSync(dirpath)) {
    callback(dirpath);
  } else {
    mkdirs(path.dirname(dirpath), mode, function () {
      fs.mkdir(dirpath, mode, callback);
    });
  }
};

const copy = async (entry) => {
  const distDir = path.resolve(__dirname, `../browser/`);
  const srcDir = path.resolve(__dirname, `../dist/`);
  if (!fs.existsSync(distDir)) {
    await mkdirs(distDir, {
      recursive: true
    }, () => {});
  }
  await fs.writeFileSync(`${distDir}/${entry}`, fs.readFileSync(`${srcDir}/${entry}`));
};

const files = ['index.min.js', 'xgplayer.min.css'];

files.map(async item => {
  await copy(item);
});
