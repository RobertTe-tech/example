const path = require('path');

module.exports = {
  entry: './helper/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};