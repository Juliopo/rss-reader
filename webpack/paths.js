const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
  alias: {
    components: path.join(__dirname, '../src/components'),
    containers: path.join(__dirname, '../src/containers'),
    actions: path.join(__dirname, '../src/redux/actions'),
    store: path.join(__dirname, '../src/redux/store'),
    helpers: path.join(__dirname, '../src/helpers'),
  },
};
